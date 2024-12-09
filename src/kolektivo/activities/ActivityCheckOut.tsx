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

export default function ActivityCheckOutSheet({
  forwardedRef,
  activity,
  checkOut,
}: {
  forwardedRef: RefObject<BottomSheetRefType>
  activity: ActivityModel
  checkOut: () => void
}) {
  const { t } = useTranslation()

  const ActivityActionButton = useCallback(() => {
    return (
      <Button
        text={t('checkOut.title')}
        onPress={checkOut}
        testID={`CommunityEvent/CheckIn/CheckOut`}
        size={BtnSizes.FULL}
      />
    )
  }, [t])

  const { title, description, testId } = useMemo(() => {
    return {
      title: 'checkOut.title',
      description: 'checkOut.description',
      testId: 'CommunityEvent/CheckOutSheet',
    }
  }, [])

  return (
    <BottomSheet
      forwardedRef={forwardedRef}
      title={t(title)}
      description={t(description, {
        activityTitle: activity.title,
        activityDate: `${formatFeedDate(new Date(activity.start_date).getTime(), i18n)} ${formatFeedTime(new Date(activity.start_date).getTime(), i18n)}`,
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
