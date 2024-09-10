import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import KolCurrency from 'src/icons/KolCurrency'
import LinearBackground from 'src/kolektivo/components/LinearBackground'
import Clipboard from 'src/kolektivo/icons/Clipboard'
import { typeScale } from 'src/kolektivo/styles/kolektivoFonts'
import variables from 'src/kolektivo/styles/variables'

export default function UserWalletInfoSection() {
  return (
    <View style={styles.container}>
      <LinearBackground
        borderRadius={10}
        backgroundImage={require('src/kolektivo/images/UserWalletDetailsMask.png')}
      >
        <TouchableOpacity style={styles.addressClipboard}>
          <Text style={{ paddingRight: 8 }}>YolandaCW1</Text>
          <Clipboard />
        </TouchableOpacity>
        <View style={styles.currency}>
          <KolCurrency size={23} />
          <Text style={styles.currencyAmount}>173.90</Text>
        </View>
      </LinearBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 128,
    paddingHorizontal: variables.contentPadding,
  },
  addressClipboard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#BDE3E2',
    alignSelf: 'flex-start',
    flexShrink: 1,
    borderRadius: 10,
  },
  currency: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  currencyAmount: {
    marginLeft: 5,
    marginBottom: -7,
    ...typeScale.currencyLarge,
    color: '#FFFFFF',
  },
})
