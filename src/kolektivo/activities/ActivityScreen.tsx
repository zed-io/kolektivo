import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshControl, ScrollView, SectionList, StyleSheet, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityCategorySwitcher } from 'src/kolektivo/activities/ActivityCategorySwitcher'
import { ActivityListItem } from 'src/kolektivo/activities/ActivityListItem'
import { useAvailableActivities } from 'src/kolektivo/activities/hooks'
import { ActivityModel } from 'src/kolektivo/activities/utils'
import { typeScale } from 'src/styles/fonts'
import variables from 'src/styles/variables'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

const ActivityScreen = () => {
  const { t } = useTranslation()
  const scrollPosition = useRef(new Animated.Value(0)).current
  const { signedUpActivities, upcomingActivities, completedActivities } = useAvailableActivities()

  const [viewingCategory, setViewingCategory] = useState('signedup')

  // @ts-ignore
  const sections = []

  upcomingActivities.result &&
    sections.push({
      data: upcomingActivities.result,
    })

  return (
    <SafeAreaView testID="ActivityHome" style={styles.container} edges={[]}>
      <ActivityCategorySwitcher selected={viewingCategory} toggle={setViewingCategory} />
      {viewingCategory === 'signedup' && (
        <ScrollView
          style={styles.horizontalList}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={true}
          scrollEventThrottle={16}
        >
          {signedUpActivities.result &&
            signedUpActivities.result?.map((activity) => (
              <ActivityListItem key={activity.id} {...activity} />
            ))}
        </ScrollView>
      )}
      {viewingCategory === 'completed' && (
        <ScrollView
          style={styles.horizontalList}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={true}
          scrollEventThrottle={16}
        >
          {completedActivities.result &&
            completedActivities.result?.map((activity) => (
              <ActivityListItem key={activity.id} {...activity} />
            ))}
        </ScrollView>
      )}
      <Text style={styles.header}>{t('activities.more')}</Text>
      <AnimatedSectionList
        style={styles.verticalList}
        sections={sections}
        keyExtractor={(item) => (item as any).id}
        renderItem={({ item }) => <ActivityListItem {...(item as ActivityModel)} fullWidth />}
        refreshControl={<RefreshControl refreshing={false} tintColor={'transparent'} />}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPosition } } }], {
          useNativeDriver: true,
        })}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  horizontalList: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 180,
  },
  header: {
    display: 'flex',
    ...typeScale.bodyLarge,
    paddingHorizontal: variables.contentPadding,
    marginVertical: variables.contentPadding,
  },
  verticalList: {
    flex: 1,
    paddingHorizontal: variables.contentPadding,
  },
})

export default ActivityScreen
