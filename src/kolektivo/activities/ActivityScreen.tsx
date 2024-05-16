import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshControl, SectionList, StyleSheet, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityListItem } from 'src/kolektivo/activities/ActivityListItem'
import { useDefaultActivities } from 'src/kolektivo/activities/hooks'
import { ActivityDetail } from 'src/kolektivo/activities/types'
import DrawerTopBar from 'src/navigator/DrawerTopBar'
import { typeScale } from 'src/styles/fonts'
import variables from 'src/styles/variables'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

const ActivityScreen = () => {
  const { t } = useTranslation()
  const scrollPosition = useRef(new Animated.Value(0)).current
  const activities = useDefaultActivities()
  const sections = []
  const others = []

  sections.push({
    data: activities,
  })

  others.push({
    data: activities,
  })

  return (
    <SafeAreaView testID="ActivityHome" style={styles.container} edges={['top']}>
      <DrawerTopBar leftElement={null} rightElement={null} scrollPosition={scrollPosition} />
      <AnimatedSectionList
        style={styles.horizontalList}
        sections={others}
        horizontal
        keyExtractor={(item) => (item as any).title}
        renderItem={({ item }) => <ActivityListItem {...(item as ActivityDetail)} />}
        refreshControl={<RefreshControl refreshing={false} tintColor={'transparent'} />}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPosition } } }], {
          useNativeDriver: true,
        })}
      />
      <Text style={styles.header}>{t('activities.more')}</Text>
      <AnimatedSectionList
        style={styles.verticalList}
        sections={sections}
        keyExtractor={(item) => (item as any).title}
        renderItem={({ item }) => <ActivityListItem {...(item as ActivityDetail)} fullWidth />}
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
