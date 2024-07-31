import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, View } from 'react-native'
import Touchable from 'src/components/Touchable'
import { badgeImage } from 'src/images/Images'
import { BadgeDataResponse } from 'src/kolektivo/activities/badges/saga'
import Colors from 'src/kolektivo/styles/colors'
import variables from 'src/kolektivo/styles/variables'
import { typeScale } from 'src/styles/fonts'

export default function BadgeProgressTile({
  title,
  stamps,
  onPress,
  ...rest
}: BadgeDataResponse & { onPress: (badge: BadgeDataResponse) => void }) {
  const { contractAddress, amount } = stamps
  const { t } = useTranslation()

  const handlePress = () => {
    onPress?.({ title, ...rest, stamps })
  }

  return (
    <Touchable testID={`BadgeProgressTile/${title}`} style={[]} onPress={handlePress}>
      <View testID="BadgeProgressTile/BoundedBox" style={styles.wireframe}>
        <Image source={badgeImage} style={styles.image} />
        <View testID="BadgeProgressTile/Container" style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{t('badge.rank.0')}</Text>
          <ProgressBar progress={amount} total={50} />
        </View>
      </View>
    </Touchable>
  )
}

export function ProgressBar({ progress, total }: { progress: number; total: number }) {
  return (
    <View style={[styles.progressBoundingBox, { backgroundColor: Colors.gray2 }]}>
      <Text style={styles.progressText}>{`${progress}/${total}`}</Text>
      <View style={[styles.progressBar, { width: `${(100 * progress) / total}%` }]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  wireframe: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: variables.contentPadding / 3,
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: variables.contentPadding,
    borderRadius: variables.borderRadius / 2,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 195,
    height: 150,
    marginTop: -50,
    zIndex: 0,
  },
  title: {
    ...typeScale.labelSemiBoldSmall,
    color: Colors.gray4,
  },
  subtitle: {
    ...typeScale.bodySmall,
    color: Colors.gray3,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    zIndex: 1,
  },
  progressBoundingBox: {
    marginVertical: variables.contentPadding / 4,
    height: 25,
    width: '80%',
    borderRadius: variables.borderRadius / 2,
    borderWidth: variables.borderWidth,
    borderColor: Colors.primary,
  },
  progressBar: {
    height: 25,
    backgroundColor: Colors.primaryDisabled,
    borderRadius: variables.borderRadius,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  progressText: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    ...typeScale.labelSmall,
    color: Colors.gray4,
  },
})
