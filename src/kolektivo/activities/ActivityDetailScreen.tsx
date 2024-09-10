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
import { ActivityListItem } from 'src/kolektivo/activities/ActivityListItem'
import { useActivityEnrollment, useDefaultActivities } from 'src/kolektivo/activities/hooks'
import AchievementListItem from 'src/kolektivo/components/AchievementListItem'
import Button, { BtnSizes, BtnTypes } from 'src/kolektivo/components/Buttons'
import Directions from 'src/kolektivo/icons/Directions'
import Person from 'src/kolektivo/icons/Person'
import { HeaderTitleWithSubtitle, headerWithBackButton } from 'src/navigator/Headers'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import { default as colors, default as Colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import variables from 'src/styles/variables'
import { formatFeedDate, formatFeedTime } from 'src/utils/time'

type Props = NativeStackScreenProps<StackParamList, Screens.ActivityDetailScreen>

export const ActivityDetailScreen = ({ route }: Props) => {
  const { activity } = route.params
  const { t } = useTranslation()
  const activities = useDefaultActivities()
  const sections = []
  const onPressEarned = useCallback(() => {}, [])
  const onPressStamps = useCallback(() => {}, [])

  sections.push({
    data: activities,
  })

  //@ts-ignore @todo Remove this unused reference
  const { enroll } = useActivityEnrollment()

  const checkInConfirmationSheetRef = React.useRef<BottomSheetRefType>(null)

  const eventDate = formatFeedDate(new Date().getTime(), i18n)
  const eventTime = useMemo(() => {
    if (new Date().getTime()) {
      return `${formatFeedTime(new Date().getTime(), i18n)} - ${formatFeedTime(new Date().getTime(), i18n)}`
    } else {
      return formatFeedTime(new Date().getTime(), i18n)
    }
  }, [])

  const activityActionText =
    useMemo(() => {
      // eslint-disable-next-line no-constant-condition
      if (1) {
        return t('communityActivityDetail.signUp')
        // eslint-disable-next-line no-constant-condition
      } else if (2) {
        return t('communityActivityDetail.signUp')
        // eslint-disable-next-line no-constant-condition
      } else if (3) {
        return t('communityActivityDetail.checkIn')
      }
    }, []) ?? ''

  const onContinue = useCallback(() => {
    // eslint-disable-next-line no-constant-condition
    if (1) {
      onSignUp()
      // eslint-disable-next-line no-constant-condition
    } else if (2) {
      onCheckIn()
      // eslint-disable-next-line no-constant-condition
    } else if (3) {
      onCheckOut()
    }
  }, [])

  const onSignUp = () => {
    navigate(Screens.QRNavigator, {
      screen: Screens.QRScanner,
    })
  }

  const onCheckIn = () => {
    checkInConfirmationSheetRef.current?.snapToIndex(0)
  }

  const onCheckOut = () => {
    checkInConfirmationSheetRef.current?.snapToIndex(0)
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero]}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.image}
          />
          <Text style={styles.heroTitle}>{activity.title}</Text>
        </View>
        <View style={[styles.main]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button
              size={BtnSizes.FULL}
              onPress={onContinue}
              text={activityActionText}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              size={BtnSizes.SMALL}
              type={BtnTypes.INFORMATION}
              onPress={onContinue}
              icon={<Directions color={Colors.primary} />}
            />
          </View>
          <ActivityDetailListItem
            category="Location"
            content={activity.fullAddress}
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
            content={activity.activityHost.name}
            icon={<Person color={'#737373'} />}
          />
        </View>
        <Text style={styles.sectionTitle}>{t('activities.requirements')}</Text>
        <Text style={styles.sectionTitle}>{t('activities.rewards')}</Text>
        <View style={styles.rewardsContainer}>
          <AchievementListItem
            icon={<KolCurrency size={22} />}
            title={'Points'}
            subtitle={'25.00'}
            onPress={onPressEarned}
            borderColor={Colors.gray2}
          />
          <AchievementListItem
            icon={<Stamp size={22} />}
            title={'Permaculture Stamp'}
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
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} {...activity} />
          ))}
        </ScrollView>
        <ActivityCheckInSheet
          forwardedRef={checkInConfirmationSheetRef}
          activityDate={eventDate}
          activityTitle={activity.title}
        />
      </ScrollView>
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
    <HeaderTitleWithSubtitle title={activity.title} subTitle={activity.activityHost.name} />
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
    backgroundColor: 'red',
  },
  image: {
    flex: 1,
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
