import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import i18n from 'src/i18n'
import { Activity } from 'src/kolektivo/activities/utils'
import variables from 'src/kolektivo/styles/variables'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import Colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { getDatetimeDisplayString } from 'src/utils/time'

type OwnProps = Activity & {
  fullWidth?: boolean
}

export const ActivityListItem = ({ fullWidth = false, ...rest }: OwnProps) => {
  const {
    activityHost,
    startDate,
    endDate,
    title,
    description,
    fullAddress,
    badgeContractAddress,
  } = rest

  const handlePress = () => {
    // @todo implement navigation to activity detail
    navigate(Screens.ActivityDetailScreen, {
      activity: {
        activityHostId: activityHost.id,
        startDate,
        endDate,
        title,
        description,
        fullAddress,
        badgeContractAddress,
        activityHost,
      },
    })
  }

  const dateTime = getDatetimeDisplayString(new Date().getTime(), i18n)

  return (
    <Pressable style={[styles.container, fullWidth && styles.fullWidth]} onPress={handlePress}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={[styles.text, styles.title]}>{title}</Text>
        <View style={[styles.details]}>
          <Text style={[styles.text, styles.host]}>{activityHost.name}</Text>
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
