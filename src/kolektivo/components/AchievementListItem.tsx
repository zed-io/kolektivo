import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Touchable from 'src/components/Touchable'
import colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import variables from 'src/styles/variables'

export default function AchievementListItem({
  title,
  subtitle,
  icon,
  onPress,
  borderColor = colors.primary,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  borderColor?: string
  onPress: () => void
}) {
  return (
    <Touchable style={[styles.itemContainer, { borderColor }]} onPress={onPress}>
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
