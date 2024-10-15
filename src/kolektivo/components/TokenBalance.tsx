import BigNumber from 'bignumber.js'
import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { hideWalletBalancesSelector } from 'src/app/selectors'
import { formatValueToDisplay } from 'src/components/TokenDisplay'
import TokenIcon, { IconSize } from 'src/components/TokenIcon'
import Colors from 'src/kolektivo/styles/colors'
import { useDollarsToLocalAmount } from 'src/localCurrency/hooks'
import { totalPositionsBalanceUsdSelector } from 'src/positions/selectors'
import { useSelector } from 'src/redux/hooks'
import fontStyles from 'src/styles/fonts'
import {
  useTokenPricesAreStale,
  useTokensWithUsdValue,
  useTotalTokenBalance,
} from 'src/tokens/hooks'
import { tokenFetchErrorSelector, tokenFetchLoadingSelector } from 'src/tokens/selectors'
import { getSupportedNetworkIdsForTokenBalances } from 'src/tokens/utils'

export function TokenBalance({
  style = styles.balance,
  singleTokenViewEnabled = true,
  showBalanceToggle = false,
}: {
  style?: StyleProp<TextStyle>
  singleTokenViewEnabled?: boolean
  showBalanceToggle?: boolean
}) {
  const supportedNetworkIds = getSupportedNetworkIdsForTokenBalances()
  const tokensWithUsdValue = useTokensWithUsdValue(supportedNetworkIds)
  const totalTokenBalanceLocal = useTotalTokenBalance()
  const tokenFetchLoading = useSelector(tokenFetchLoadingSelector)
  const tokenFetchError = useSelector(tokenFetchErrorSelector)
  const tokensAreStale = useTokenPricesAreStale(supportedNetworkIds)
  // TODO(ACT-1095): Update these to filter out unsupported networks once positions support non-Celo chains
  const totalPositionsBalanceUsd = useSelector(totalPositionsBalanceUsdSelector)
  const totalPositionsBalanceLocal = useDollarsToLocalAmount(totalPositionsBalanceUsd)
  const totalBalanceLocal =
    totalTokenBalanceLocal || totalPositionsBalanceLocal
      ? new BigNumber(totalTokenBalanceLocal ?? 0).plus(totalPositionsBalanceLocal ?? 0)
      : undefined
  // const { decimalSeparator } = getNumberFormatSettings()
  const decimalSeparator = '.'

  const hideWalletBalance = useSelector(hideWalletBalancesSelector)
  const hideBalance = showBalanceToggle && hideWalletBalance
  const balanceDisplay = hideBalance
    ? `XX${decimalSeparator}XX`
    : totalBalanceLocal?.toFormat(2, { decimalSeparator: '.' })
  const TotalTokenBalance = ({ balanceDisplay }: { balanceDisplay: string }) => {
    return (
      <View style={styles.row}>
        <Text style={style} testID={'TotalTokenBalance'}>
          {/* {!hideBalance && localCurrencySymbol} */}
          {balanceDisplay}
        </Text>
      </View>
    )
  }

  if (tokenFetchError || tokenFetchLoading || tokensAreStale) {
    // Show '-' if we haven't fetched the tokens yet or prices are stale
    return <TotalTokenBalance balanceDisplay={'-'} />
  } else if (
    singleTokenViewEnabled &&
    tokensWithUsdValue.length === 1 &&
    !totalPositionsBalanceLocal?.isGreaterThan(0)
  ) {
    const tokenBalance = tokensWithUsdValue[0].balance
    return (
      <View style={styles.oneBalance}>
        <TokenIcon
          token={tokensWithUsdValue[0]}
          size={IconSize.XLARGE}
          viewStyle={styles.tokenImgView}
        />
        <View style={styles.column}>
          <TotalTokenBalance balanceDisplay={balanceDisplay ?? '-'} />
          {!hideBalance && (
            <Text style={styles.tokenBalance}>
              {formatValueToDisplay(tokenBalance)} {tokensWithUsdValue[0].symbol}
            </Text>
          )}
        </View>
      </View>
    )
  } else {
    return <TotalTokenBalance balanceDisplay={balanceDisplay ?? new BigNumber(0).toFormat(2)} />
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oneBalance: {
    flexDirection: 'row',
  },
  tokenImgView: {
    borderRadius: 24,
    marginRight: 8,
  },
  column: {
    flexDirection: 'column',
  },
  tokenBalance: {
    ...fontStyles.label,
    color: Colors.gray4,
  },
  balance: {
    ...fontStyles.largeNumber,
  },
})
