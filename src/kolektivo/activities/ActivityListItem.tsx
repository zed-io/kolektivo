import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import i18n from 'src/i18n'
import { ActivityModel, isActivityLive } from 'src/kolektivo/activities/utils'
import variables from 'src/kolektivo/styles/variables'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { default as Colors, default as colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { formatDistanceToNow, getDatetimeDisplayString } from 'src/utils/time'

type OwnProps = ActivityModel & {
  fullWidth?: boolean
}

export const ActivityListItem = ({ fullWidth = false, ...rest }: OwnProps) => {
  const activity = rest
  const { activity_hosts: host, start_date, banner_path, title } = rest
  const { t } = useTranslation()

  const handlePress = () => {
    // @todo implement navigation to activity detail
    navigate(Screens.ActivityDetailScreen, {
      activity,
    })
  }

  const dateTime = getDatetimeDisplayString(new Date(start_date).getTime(), i18n)

  const isEventLive = useMemo(() => {
    return isActivityLive(rest)
  }, [])

  const FloatingTime = useCallback(() => {
    if (isEventLive) {
      return (
        <View style={styles.fab}>
          <Text style={[styles.text, styles.small]}>{t('live')}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.fab}>
          <Text style={[styles.text, styles.small]}>{timeUntil}</Text>
        </View>
      )
    }
  }, [isEventLive])

  const timeUntil = formatDistanceToNow(new Date(start_date), i18n)
  return (
    <Pressable style={[styles.container, fullWidth && styles.fullWidth]} onPress={handlePress}>
      <Image
        source={{
          uri: banner_path,
        }}
        style={styles.image}
      />
      <FloatingTime />
      <View style={styles.content}>
        <Text style={[styles.text, styles.title]}>{title}</Text>
        <View style={[styles.details]}>
          <Text style={[styles.text, styles.host]}>{host.name}</Text>
          <Text style={[styles.text, styles.separator]}>•</Text>
          <Text style={[styles.text, styles.date]}>{dateTime}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: variables.borderRadius,
    marginHorizontal: variables.contentPadding / 2,
    width: 300,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
    height: 200,
    marginHorizontal: 0,
    marginBottom: variables.contentPadding,
  },
  image: {
    // Image fills background of the view
    ...StyleSheet.absoluteFillObject,
    borderRadius: variables.borderRadius,
  },
  fab: {
    zIndex: 1,
    position: 'absolute',
    top: variables.contentPadding,
    right: variables.contentPadding,
    backgroundColor: colors.warningDark,
    paddingHorizontal: variables.contentPadding / 2,
    borderRadius: variables.borderRadius,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: variables.contentPadding,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  text: {
    color: Colors.infoLight,
  },
  title: {
    ...typeScale.bodyMedium,
    fontWeight: 'bold',
  },
  small: {
    ...typeScale.bodyXSmall,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
  },
  host: {
    ...typeScale.bodySmall,
  },
  separator: {
    marginHorizontal: variables.contentPadding / 2,
  },
  date: {
    ...typeScale.bodySmall,
  },
})
