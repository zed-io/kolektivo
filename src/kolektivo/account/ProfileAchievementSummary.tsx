import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Touchable from 'src/components/Touchable'
import variables from 'src/kolektivo/styles/variables'
import colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'

import Badge from 'src/icons/Badge'
import KolCurrency from 'src/icons/KolCurrency'
import Stamp from 'src/icons/Stamp'

export default function ProfileAchievementSummary() {
  const onPressEarned = useCallback(() => {}, [])
  const onPressDonated = useCallback(() => {}, [])
  const onPressStamps = useCallback(() => {}, [])
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

function AchievementListItem({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  onPress: () => void
}) {
  return (
    <Touchable style={styles.itemContainer} onPress={onPress}>
      <React.Fragment>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.itemInnerContainer}>
          {icon}
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </React.Fragment>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    // works like a 2x2 grid
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  itemContainer: {
    minWidth: '45%',
    flexDirection: 'column',
    marginHorizontal: variables.contentPadding / 2,
    marginVertical: variables.contentPadding / 2,
    paddingVertical: variables.contentPadding / 2,
    paddingHorizontal: variables.contentPadding,
    borderRadius: variables.borderRadius / 2,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  itemInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: variables.contentPadding / 2,
  },
  title: {
    ...typeScale.labelSemiBoldSmall,
    color: colors.gray4,
  },
  subtitle: {
    ...typeScale.bodyMedium,
    color: colors.gray4,
    marginLeft: variables.contentPadding / 2,
  },
})
