import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import Badge from 'src/icons/Badge'
import KolCurrency from 'src/icons/KolCurrency'
import Stamp from 'src/icons/Stamp'
import AchievementListItem from 'src/kolektivo/components/AchievementListItem'

export default function ProfileAchievementSummary() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressEarned = useCallback(() => {}, [])
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressDonated = useCallback(() => {}, [])
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressStamps = useCallback(() => {}, [])
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressBadges = useCallback(() => {}, [])

  return (
    <View testID="Profile/AchievementSummary" style={styles.container}>
      <AchievementListItem
        icon={<KolCurrency size={22} />}
        title={'Earned'}
        subtitle={'1000'}
        onPress={onPressEarned}
      />
      <AchievementListItem
        icon={<KolCurrency size={22} />}
        title={'Donated'}
        subtitle={'260'}
        onPress={onPressDonated}
      />
      <AchievementListItem
        icon={<Stamp size={22} />}
        title={'Stamps'}
        subtitle={'10'}
        onPress={onPressStamps}
      />
      <AchievementListItem
        icon={<Badge size={22} />}
        title={'Badges'}
        subtitle={'5'}
        onPress={onPressBadges}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // works like a 2x2 grid
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
})
