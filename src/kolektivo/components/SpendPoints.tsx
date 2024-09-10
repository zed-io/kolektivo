import { t } from 'i18next'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import variables from 'src/kolektivo/styles/variables'
import { typeScale } from 'src/styles/fonts'

export default function SpendPoints() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{t('spendPoints.title')}</Text>
      </View>
      <View>
        <View></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: variables.contentPadding,
  },
  title: {
    ...typeScale.labelLarge,
  },
})
