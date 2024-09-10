import React from 'react'
import { useTranslation } from 'react-i18next'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import KolCurrency from 'src/icons/KolCurrency'
import Members from 'src/kolektivo/icons/Members'
import variables from 'src/kolektivo/styles/variables'
import { typeScale } from 'src/styles/fonts'

export default function MyCommunity() {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('myCommunity.title')}</Text>
      <TouchableOpacity style={styles.block}>
        <ImageBackground
          source={require('src/kolektivo/images/Flag.png')} // Adjust the path to your image
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.communityContainer}>
            <Text style={styles.communityTitle}>Kolektivo Trinidad</Text>
            <View style={styles.communityInfo}>
              <View style={styles.iconContainer}>
                <View style={styles.icon}>
                  <Members color="white" />
                </View>
                <Text style={styles.blockText}>123</Text>
              </View>
              <View style={styles.iconContainer}>
                <View style={styles.icon}>
                  <KolCurrency size={23} />
                </View>
                <Text style={styles.blockText}>3475</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    borderRadius: 10, // Add borderRadius style
    overflow: 'hidden', // Ensure the borderRadius is applied correctly
  },
  container: {
    flex: 1,
    padding: variables.contentPadding,
  },
  title: {
    ...typeScale.labelLarge,
    marginBottom: 17,
  },
  communityTitle: {
    ...typeScale.labelMedium,
    color: '#fff',
  },
  block: {
    borderRadius: 10,
    height: 96,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  blockText: {
    color: '#fff',
  },
  communityContainer: {
    padding: 11,
    height: '100%',
    justifyContent: 'space-between',
  },
  communityInfo: {
    justifyContent: 'flex-end',
  },
})
