import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button, { BtnSizes } from 'src/components/Button'
import i18n from 'src/i18n'
import Calendar from 'src/icons/Calendar'
import Clock from 'src/icons/Clock'
import Pin from 'src/icons/Pin'
import { useActivityEnrollment } from 'src/kolektivo/activities/hooks'
import { HeaderTitleWithSubtitle, headerWithBackButton } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import Colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import variables from 'src/styles/variables'
import { formatFeedDate, formatFeedTime } from 'src/utils/time'

type Props = NativeStackScreenProps<StackParamList, Screens.ActivityDetailScreen>

export const ActivityDetailScreen = ({ route }: Props) => {
  const { activity } = route.params
  const { t } = useTranslation()
  const { enroll } = useActivityEnrollment()

  const eventDate = formatFeedDate(activity.activityDateTime, i18n)
  const eventTime = useMemo(() => {
    if (activity.activityEndDateTime) {
      return `${formatFeedTime(activity.activityDateTime, i18n)} - ${formatFeedTime(activity.activityEndDateTime, i18n)}`
    } else {
      return formatFeedTime(activity.activityDateTime, i18n)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero]}>
          <Image source={{ uri: activity.activityImageUri }} style={styles.image} />
          <Text style={styles.heroTitle}>{activity.title}</Text>
        </View>
        <View style={[styles.main]}>
          <Button size={BtnSizes.FULL} text={t('connect')} onPress={() => enroll(activity)} />
          <ActivityDetailListItem
            category="Location"
            content={activity.activityLocation}
            icon={<Pin />}
          />
          <ActivityDetailListItem category="Date" content={eventDate} icon={<Calendar />} />
          <ActivityDetailListItem
            category="Time"
            content={eventTime}
            icon={<Clock color={Colors.black} height={24} />}
          />
          <View style={[styles.content]}>
            <Text style={[styles.detailLabel]}>About</Text>
            <Text style={[styles.detailAbout]}>{activity.activityAbout}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

type LineItemProps = {
  category: string
  content: string
  icon?: React.ReactNode | React.ReactNode[]
}

const ActivityDetailListItem = ({ category, content, icon }: LineItemProps) => {
  return (
    <View style={[styles.detailRow]}>
      {icon}
      <Text style={[styles.detailText, styles.detailCategory]}>{category}</Text>
      <Text style={[styles.detailText, styles.detailContent]}>{content}</Text>
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
    <HeaderTitleWithSubtitle title={activity.title} subTitle={activity.activityHost} />
  ),
  gestureEnabled: false,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center',
    padding: variables.contentPadding,
  },
  detailText: {
    ...typeScale.bodyMedium,
  },
  detailLabel: {
    ...typeScale.labelLarge,
  },
  detailCategory: {
    display: 'none',
  },
  content: {
    marginVertical: variables.contentPadding,
  },
  detailContent: {
    marginLeft: variables.contentPadding * 2,
    flex: 2,
  },
  detailAbout: {
    ...typeScale.bodyMedium,
    marginTop: variables.contentPadding,
  },
})

export default ActivityDetailScreen
