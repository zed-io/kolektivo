import React, { RefObject, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import BottomSheet, { BottomSheetRefType } from 'src/components/BottomSheet'
import Button, { BtnSizes } from 'src/components/Button'
import { ActivityModel } from 'src/kolektivo/activities/utils'
import { Colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'

export default function ActivityCheckInSheet({
  forwardedRef,
  activity,
  isSignedUp,
  signUp,
  cancel,
  checkIn,
  checkOut,
}: {
  forwardedRef: RefObject<BottomSheetRefType>
  activity: ActivityModel
  isSignedUp: boolean
  signUp: () => void
  cancel: () => void
  checkIn: () => void
  checkOut: () => void
}) {
  const { t } = useTranslation()

  const ActivityActionButton = useCallback(() => {
    if (isSignedUp) {
      return (
        <Button
          text={t('cancel')}
          onPress={cancel}
          testID={`CommunityEvent/CheckIn/Cancel`}
          size={BtnSizes.FULL}
        />
      )
    } else {
      return (
        <Button
          text={t('continue')}
          onPress={signUp}
          testID={`CommunityEvent/CheckIn/Continue`}
          size={BtnSizes.FULL}
        />
      )
    }
  }, [t, isSignedUp, signUp, cancel])

  return (
    <BottomSheet
      forwardedRef={forwardedRef}
      title={t('communityActivityConfirmationSheet.title')}
      description={t('communityActivityConfirmationSheet.description', {
        activityTitle: activity.title,
        activityDate: activity.start_date,
      })}
      testId={'CommunityEvent/CheckInSheet'}
      titleStyle={styles.title}
    >
      <View style={styles.actionsContainer}>
        <ActivityActionButton />
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
