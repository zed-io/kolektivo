import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import i18n from 'src/i18n'
import { ActivityDetail } from 'src/kolektivo/activities/types'
import variables from 'src/kolektivo/styles/variables'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import Colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { getDatetimeDisplayString } from 'src/utils/time'

type OwnProps = ActivityDetail & {
  fullWidth?: boolean
}

export const ActivityListItem = ({
  title,
  activityHost,
  activityDateTime,
  activityImageUri,
  fullWidth = false,
  ...rest
}: OwnProps) => {
  const handlePress = () => {
    // @todo implement navigation to activity detail
    navigate(Screens.ActivityDetailScreen, {
      activity: {
        title,
        activityHost,
        activityDateTime,
        activityImageUri,
        ...rest,
      },
    })
  }

  const dateTime = getDatetimeDisplayString(activityDateTime, i18n)

  return (
    <Pressable style={[styles.container, fullWidth && styles.fullWidth]} onPress={handlePress}>
      <Image source={{ uri: activityImageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.text, styles.title]}>{title}</Text>
        <View style={[styles.details]}>
          <Text style={[styles.text, styles.host]}>{activityHost}</Text>
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
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: variables.contentPadding,
  },
  text: {
    color: Colors.infoLight,
  },
  title: {
    ...typeScale.bodyMedium,
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
