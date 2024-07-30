import React, { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import BottomSheet, { BottomSheetRefType } from 'src/components/BottomSheet'
import Button, { BtnSizes } from 'src/components/Button'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { Colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'

export default function ActivityCheckInSheet({
  forwardedRef,
  activityTitle,
  activityDate,
}: {
  forwardedRef: RefObject<BottomSheetRefType>
  activityTitle: string
  activityDate: string
}) {
  const { t } = useTranslation()

  const onCheckIn = () => {
    navigate(Screens.QRNavigator, {
      screen: Screens.QRScanner,
    })
  }

  return (
    <BottomSheet
      forwardedRef={forwardedRef}
      title={t('communityActivityConfirmationSheet.title')}
      description={t('communityActivityConfirmationSheet.description', {
        activityTitle: activityTitle,
        activityDate: activityDate,
      })}
      testId={'CommunityEvent/CheckInSheet'}
      titleStyle={styles.title}
    >
      <View style={styles.actionsContainer}>
        <Button
          text={t('continue')}
          onPress={onCheckIn}
          testID={`CommunityEvent/CheckIn/Continue`}
          size={BtnSizes.FULL}
        />
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    gap: Spacing.Regular16,
    marginVertical: Spacing.Thick24,
  },
  title: {
    ...typeScale.titleSmall,
    color: Colors.black,
  },
})
