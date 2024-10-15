import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ActivityListItem } from 'src/kolektivo/activities/ActivityListItem'
import { useDefaultActivities } from 'src/kolektivo/activities/hooks'
import variables from 'src/kolektivo/styles/variables'
import colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'

const UpcomingActivities = () => {
  const activities = useDefaultActivities()
  const { t } = useTranslation()

  return (
    <View>
      <Text style={styles.sectionTitle}>{t('upcomingActivities.title')}</Text>
      <ScrollView
        style={styles.horizontalList}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={true}
        scrollEventThrottle={16}
      >
        <View style={{ padding: 5 }} />
        {activities.map((activity) => (
          <ActivityListItem key={activity.id} {...activity} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  horizontalList: {
    flex: 1,
    flexDirection: 'row',
    height: 146,
  },
  sectionTitle: {
    ...typeScale.labelLarge,
    color: colors.black,
    marginHorizontal: Spacing.Smallest8,
    marginTop: Spacing.Smallest8,
    marginBottom: Spacing.Smallest8,
    marginLeft: variables.contentPadding,
  },
})

export default UpcomingActivities
