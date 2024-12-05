import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { typeScale } from 'src/kolektivo/styles/kolektivoFonts'
import Colors from 'src/styles/colors'
import variables from 'src/styles/variables'

type Props = {
  selected: string
  toggle: (mode: string) => {}
}

export const ActivityCategorySwitcher = ({ selected, toggle }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={styles.row}>
      <Pressable
        style={[
          selected == 'signedup' && { ...styles.selected, ...styles.selectedLeft },
          styles.option,
        ]}
        onPress={() => toggle('signedup')}
      >
        <Text style={[selected == 'signedup' && { ...styles.selectedText }, styles.text]}>
          {t('signedUp')}
        </Text>
      </Pressable>
      <Pressable
        style={[
          selected == 'completed' && { ...styles.selected, ...styles.selectedRight },
          styles.option,
        ]}
        onPress={() => toggle('completed')}
      >
        <Text style={[selected == 'completed' && { ...styles.selectedText }, styles.text]}>
          {t('completed')}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: variables.contentPadding,
    borderRadius: variables.borderRadius,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: variables.contentPadding,
  },
  option: {
    flexGrow: 1,
    borderRadius: variables.borderRadius,
    padding: variables.contentPadding,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
  },
  selected: {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  selectedRight: {
    borderLeftWidth: 1,
  },
  selectedLeft: {
    borderRightWidth: 1,
  },
  text: {
    ...typeScale.labelSemiBoldMedium,
  },
  selectedText: {
    color: Colors.white,
  },
})
