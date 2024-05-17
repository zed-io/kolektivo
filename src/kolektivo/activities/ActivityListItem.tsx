import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ActivityDetail } from 'src/kolektivo/activities/types'
import variables from 'src/kolektivo/styles/variables'
import Colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'

type OwnProps = ActivityDetail & {
  fullWidth?: boolean
}

export const ActivityListItem = ({
  title,
  activityHost,
  activityDate,
  activityImageUri,
  fullWidth = false,
}: OwnProps) => {
  const handlePress = () => {
    // @todo implement navigation to activity detail
  }

  return (
    <Pressable style={[styles.container, fullWidth && styles.fullWidth]} onPress={handlePress}>
      <Image source={{ uri: activityImageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.host}>{activityHost}</Text>
        <Text style={styles.date}>{activityDate}</Text>
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
  title: {
    ...typeScale.bodyMedium,
  },
  host: {
    ...typeScale.bodySmall,
    color: Colors.gray5,
  },
  date: {
    ...typeScale.bodySmall,
    color: Colors.gray5,
  },
})
