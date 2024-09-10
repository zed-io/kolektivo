import { t } from 'i18next'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Touchable from 'src/components/Touchable'
import BadgeProgressTile from 'src/kolektivo/activities/badges/BadgeProgressTile'
import { BadgeDataResponse } from 'src/kolektivo/activities/badges/saga'
import Colors from 'src/kolektivo/styles/colors'
import variables from 'src/kolektivo/styles/variables'
import { typeScale } from 'src/styles/fonts'

export default function UserBadgesCarousel() {
  // @todo Sort two highest badges by progress

  const badges: BadgeDataResponse[] = [
    {
      title: 'Permaculture',
      stamps: { contractAddress: '0x123', amount: 10 },
    },
    {
      title: 'Clean-ups',
      stamps: { contractAddress: '0x456', amount: 20 },
    },
  ]

  const onBadgePress = (badge: BadgeDataResponse) => {
    // @todo Navigate to badge detail
  }

  const navigateToAllBadges = () => {
    // @todo Navigate to badge list
  }

  // horizontal scroll view of 5 most recent badges
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{t('badge.myBadges')}</Text>
        <Touchable onPress={navigateToAllBadges}>
          <Text style={styles.link}>{t('badge.more')}</Text>
        </Touchable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
        {badges.map((badge) => (
          <BadgeProgressTile key={badge.title} {...badge} onPress={onBadgePress} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: (variables.contentPadding * 2) / 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: variables.contentPadding,
  },
  title: {
    ...typeScale.labelLarge,
  },
  link: {
    ...typeScale.labelMedium,
    color: Colors.primary,
  },
})
