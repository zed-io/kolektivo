import React, { RefObject, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import BottomSheet, { BottomSheetRefType } from 'src/components/BottomSheet'
import Button, { BtnSizes } from 'src/components/Button'
import i18n from 'src/i18n'
import { ActivityModel } from 'src/kolektivo/activities/utils'
import { Colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'
import { formatFeedDate, formatFeedTime } from 'src/utils/time'

export default function ActivityCheckInSheet({
  forwardedRef,
  activity,
  isSignedUp,
  isCheckedIn,
  checkInReady,
  signUp,
  cancel,
  checkIn,
  checkOut,
}: {
  forwardedRef: RefObject<BottomSheetRefType>
  activity: ActivityModel
  isSignedUp: boolean
  isCheckedIn: boolean
  checkInReady: boolean
  signUp: () => void
  cancel: () => void
  checkIn: () => void
  checkOut: () => void
}) {
  const { t } = useTranslation()

  const ActivityActionButton = useCallback(() => {
    forwardedRef.current?.close()
    if (isSignedUp) {
      if (checkInReady) {
        return (
          <Button
            text={t('checkIn.title')}
            onPress={checkIn}
            testID={`CommunityEvent/CheckIn/CheckIn`}
            size={BtnSizes.FULL}
          />
        )
      }
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
          text={t('signUp')}
          onPress={signUp}
          testID={`CommunityEvent/CheckIn/Continue`}
          size={BtnSizes.FULL}
        />
      )
    }
  }, [t, isSignedUp, signUp, cancel, checkInReady, isCheckedIn])

  const { title, description, testId } = useMemo(() => {
    if (isSignedUp) {
      if (checkInReady) {
        return {
          title: 'communityActivitySheet.checkIn.title',
          description: 'communityActivitySheet.checkIn.description',
          testId: 'CommunityEvent/CheckInSheet',
        }
      }
      return {
        title: 'communityActivitySheet.cancel.title',
        description: 'communityActivitySheet.cancel.description',
        testId: 'CommunityEvent/CancelSheet',
      }
    } else {
      return {
        title: 'communityActivitySheet.signUp.title',
        description: 'communityActivitySheet.signUp.description',
        testId: 'CommunityEvent/SignUpSheet',
      }
    }
  }, [isSignedUp, checkInReady])

  return (
    <BottomSheet
      forwardedRef={forwardedRef}
      title={t(title)}
      description={t(description, {
        activityTitle: activity.title,
        activityDate: `${formatFeedDate(new Date(activity.start_date).getTime(), i18n)} ${formatFeedTime(new Date(activity.start_date).getTime(), i18n)}`,
      })}
      testId={testId}
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
