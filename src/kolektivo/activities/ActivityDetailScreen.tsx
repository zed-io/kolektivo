import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BottomSheetRefType } from 'src/components/BottomSheet'
import i18n from 'src/i18n'
import Calendar from 'src/icons/Calendar'
import Clock from 'src/icons/Clock'
import Exclamation from 'src/icons/Exclamation'
import KolCurrency from 'src/icons/KolCurrency'
import Pin from 'src/icons/Pin'
import Stamp from 'src/icons/Stamp'
import ActivityCheckInSheet from 'src/kolektivo/activities/ActivityCheckInConfirmation'
import ActivityCheckOutSheet from 'src/kolektivo/activities/ActivityCheckOut'
import { ActivityListItem } from 'src/kolektivo/activities/ActivityListItem'
import {
  useAvailableActivities,
  useCheckInAndCheckOutOfActivity,
  useSignUpAndCancelActivityEnrollment,
} from 'src/kolektivo/activities/hooks'
import { isActivityLive } from 'src/kolektivo/activities/utils'
import AchievementListItem from 'src/kolektivo/components/AchievementListItem'
import Button, { BtnSizes, BtnTypes } from 'src/kolektivo/components/Buttons'
import Directions from 'src/kolektivo/icons/Directions'
import Person from 'src/kolektivo/icons/Person'
import { HeaderTitleWithSubtitle, headerWithBackButton } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import { default as colors, default as Colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import variables from 'src/styles/variables'
import { formatDistanceToNow, formatFeedDate, formatFeedTime } from 'src/utils/time'

type Props = NativeStackScreenProps<StackParamList, Screens.ActivityDetailScreen>

export const ActivityDetailScreen = ({ route }: Props) => {
  const { activity } = route.params
  const { t } = useTranslation()
  const { upcomingActivities } = useAvailableActivities()
  const {
    isSignedUp,
    signUpForEvent,
    cancelEvent,
    loading: loadingPhase1,
  } = useSignUpAndCancelActivityEnrollment(activity.id)

  const {
    checkIn,
    checkOut,
    checkedIn,
    completed,
    onChangeAnswer,
    onTakeSelfie,
    loading: loadingPhase2,
    isCheckedOut,
    isEventCompleted,
  } = useCheckInAndCheckOutOfActivity(activity.id)

  const loading = useMemo(() => {
    return loadingPhase1 || loadingPhase2
  }, [loadingPhase1, loadingPhase2])

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressEarned = useCallback(() => {}, [])
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressStamps = useCallback(() => {}, [])

  const isEventLive = useMemo(() => {
    return isActivityLive(activity)
  }, [])

  const checkInConfirmationSheetRef = React.useRef<BottomSheetRefType>(null)
  const checkOutConfirmationSheetRef = React.useRef<BottomSheetRefType>(null)

  const eventDate = formatFeedDate(new Date(activity.start_date).getTime(), i18n)
  const eventTime = useMemo(() => {
    return `${formatFeedTime(new Date(activity.start_date).getTime(), i18n)} - ${formatFeedTime(new Date(activity.end_date).getTime(), i18n)}`
  }, [])

  const handleCheckInSheet = () => {
    checkInConfirmationSheetRef.current?.snapToIndex(0)
  }

  const handleCheckOutSheet = () => {
    checkOutConfirmationSheetRef.current?.snapToIndex(0)
  }

  const timeUntil = formatDistanceToNow(new Date(activity.start_date), i18n)

  const checkInReady = useMemo(() => {
    return new Date(activity.start_date) <= new Date() && new Date(activity.end_date) > new Date()
  }, [])

  const FloatingTime = useCallback(() => {
    if (isEventLive) {
      return (
        <View style={styles.fab}>
          <Text style={[styles.fabText]}>{t('live')}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.fab}>
          <Text style={[styles.fabText]}>{timeUntil}</Text>
        </View>
      )
    }
  }, [isEventLive])

  const isNotActionable = useMemo(() => {
    return isSignedUp && (isCheckedOut.result || isEventCompleted.result)
  }, [isSignedUp, isCheckedOut.result, isEventCompleted.result])

  const ActivityActionButton = useCallback(() => {
    if (isNotActionable) {
      return (
        <Button
          text={t('checkOut.activityCompleted')}
          onPress={handleCheckOutSheet}
          testID={`CommunityEvent/CheckIn/CheckOut`}
          size={BtnSizes.FULL}
          disabled
          style={{ flex: 1, marginRight: variables.contentPadding }}
        />
      )
    }
    if (isSignedUp) {
      if (checkedIn) {
        return (
          <Button
            text={t('checkOut.title')}
            onPress={handleCheckOutSheet}
            testID={`CommunityEvent/CheckIn/CheckOut`}
            size={BtnSizes.FULL}
            style={{ flex: 1, marginRight: variables.contentPadding }}
          />
        )
      }
      if (checkInReady) {
        return (
          <Button
            text={t('checkIn.title')}
            onPress={handleCheckInSheet}
            testID={`CommunityEvent/CheckIn/CheckIn`}
            size={BtnSizes.FULL}
            style={{ flex: 1, marginRight: variables.contentPadding }}
          />
        )
      }
      return (
        <Button
          text={t('cancel')}
          onPress={handleCheckInSheet}
          testID={`CommunityEvent/CheckIn/Cancel`}
          size={BtnSizes.FULL}
          type={BtnTypes.CANCEL}
          style={{ flex: 1, marginRight: variables.contentPadding }}
        />
      )
    } else {
      return (
        <Button
          text={t('signUp')}
          onPress={handleCheckInSheet}
          testID={`CommunityEvent/CheckIn/Continue`}
          size={BtnSizes.FULL}
          style={{ flex: 1, marginRight: variables.contentPadding }}
        />
      )
    }
  }, [isSignedUp, isNotActionable, cancelEvent, signUpForEvent, t, checkInReady, checkedIn])

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero]}>
          <Image
            source={{
              uri: activity.banner_path,
            }}
            style={styles.image}
          />
          <FloatingTime />
          <View style={styles.heroBackdrop}>
            <Text style={styles.heroTitle}>{activity.title}</Text>
          </View>
        </View>
        <View style={[styles.main]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <ActivityActionButton />
            <Button
              size={BtnSizes.SMALL}
              type={BtnTypes.INFORMATION}
              onPress={() => {}}
              icon={<Directions color={Colors.primary} />}
            />
          </View>
          <ActivityDetailListItem
            category="Location"
            content={activity.full_address}
            icon={<Pin color="#737373" />}
          />
          <ActivityDetailListItem
            category="Date"
            content={eventDate}
            icon={<Calendar color="#737373" />}
          />
          <ActivityDetailListItem
            category="Time"
            content={eventTime}
            icon={<Clock color={'#737373'} height={24} />}
          />
          <ActivityDetailListItem
            category="About Activity"
            content={activity.description}
            icon={<Exclamation color={'#737373'} />}
            showCategory={true}
          />
          <ActivityDetailListItem
            category="Host"
            content={activity.activity_hosts.name}
            icon={<Person color={'#737373'} />}
          />
        </View>
        <Text style={styles.sectionTitle}>{t('activities.rewards')}</Text>
        <View style={styles.rewardsContainer}>
          <AchievementListItem
            icon={<KolCurrency size={22} />}
            title={t('point')}
            subtitle={`${activity.points}`}
            onPress={onPressEarned}
            borderColor={Colors.gray2}
          />
          <AchievementListItem
            icon={<Stamp size={22} />}
            title={t('stampTitle', { stamp: activity.stamp })}
            subtitle={'1'}
            onPress={onPressStamps}
            borderColor={Colors.gray2}
          />
        </View>
        <Text style={styles.sectionTitle}>{t('activities.relatedActivities')}</Text>
        <ScrollView
          style={styles.horizontalList}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={true}
          scrollEventThrottle={16}
        >
          {upcomingActivities.result &&
            upcomingActivities.result.map((activity) => (
              <ActivityListItem key={activity.id} {...activity} />
            ))}
        </ScrollView>
      </ScrollView>
      <ActivityCheckInSheet
        forwardedRef={checkInConfirmationSheetRef}
        activity={activity}
        isSignedUp={isSignedUp}
        checkInReady={checkInReady}
        isCheckedIn={checkedIn}
        signUp={signUpForEvent}
        cancel={cancelEvent}
        checkIn={checkIn}
        checkOut={cancelEvent}
      />
      <ActivityCheckOutSheet
        forwardedRef={checkOutConfirmationSheetRef}
        activity={activity}
        checkOut={checkOut}
        onChangeAnswer={onChangeAnswer}
        onImageSelected={onTakeSelfie}
        loading={loading}
        completed={completed}
      />
    </SafeAreaView>
  )
}

type LineItemProps = {
  category: string
  content: string
  icon?: React.ReactNode | React.ReactNode[]
  showCategory?: boolean
}

const ActivityDetailListItem = ({
  category,
  content,
  icon,
  showCategory = false,
}: LineItemProps) => {
  return (
    <View style={[styles.detailRow]}>
      {icon}
      <View>
        {showCategory && (
          <Text style={[styles.detailText, styles.detailContent, styles.detailCategory]}>
            {category}
          </Text>
        )}
        <Text style={[styles.detailText, styles.detailContent]}>{content}</Text>
      </View>
    </View>
  )
}

ActivityDetailScreen.navigationOptions = ({
  route: {
    params: { activity },
  },
}: Props) => ({
  ...headerWithBackButton,
  headerTitle: () => (
    <HeaderTitleWithSubtitle title={activity.title} subTitle={activity.activity_hosts?.name} />
  ),
  gestureEnabled: false,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 35,
  },
  hero: {
    height: 200,
  },
  image: {
    flex: 1,
  },
  fab: {
    zIndex: 1,
    position: 'absolute',
    top: variables.contentPadding,
    right: variables.contentPadding,
    backgroundColor: Colors.primary,
    paddingHorizontal: variables.contentPadding / 2,
    borderRadius: variables.borderRadius,
  },
  fabText: {
    ...typeScale.bodyMedium,
    fontWeight: 'bold',
    color: Colors.white,
  },
  heroBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroTitle: {
    ...typeScale.titleSmall,
    color: Colors.infoLight,
    position: 'absolute',
    bottom: variables.contentPadding,
    left: variables.contentPadding,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: variables.contentPadding,
  },
  detailRow: {
    flexDirection: 'row',
    padding: variables.contentPadding,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  detailText: {
    ...typeScale.bodyMedium,
  },
  detailContent: {
    marginHorizontal: variables.contentPadding * 1.7,
    flex: 2,
  },
  detailCategory: {
    marginBottom: 8,
  },
  sectionTitle: {
    ...typeScale.titleSmall,
    color: colors.black,
    paddingHorizontal: variables.contentPadding,
    marginBottom: 10,
  },
  horizontalList: {
    flex: 1,
    flexDirection: 'row',
    height: 180,
    borderRadius: 8,
  },
  rewardsContainer: {
    // works like a 2x2 grid
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
})

export default ActivityDetailScreen
