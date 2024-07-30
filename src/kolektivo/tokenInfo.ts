import BigNumber from 'bignumber.js'
import erc20 from 'src/abis/IERC20'
import { Network } from 'src/transactions/types'
import Logger from 'src/utils/Logger'
import { ensureError } from 'src/utils/ensureError'
import { publicClient } from 'src/viem'
import { Address } from 'viem'

const TAG = 'kolektivo/tokenInfo'

export async function fetchKttdBalance({
  accountAddress,
  contractAdddress,
  network,
}: {
  accountAddress: Address
  contractAdddress: Address
  network: Network
}) {
  try {
    Logger.debug(TAG, 'Fetching KTTD Info', {
      accountAddress,
      contractAdddress,
      network,
    })
    const result = await publicClient[network].readContract({
      abi: erc20.abi,
      address: contractAdddress,
      functionName: 'balanceOf',
      args: [accountAddress],
    })

    Logger.debug(TAG, 'Fetched KTTD Info', result)

    return { balance: new BigNumber(result.toString()) }
  } catch (error) {
    const err = ensureError(error)
    Logger.error(TAG, 'Failed to fetch KTTD info', err)
    throw err
  }
}
