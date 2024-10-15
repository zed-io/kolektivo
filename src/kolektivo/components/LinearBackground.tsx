import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import Svg, { Defs, Rect, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg'

const FROM_COLOR = 'rgba(42, 166, 161, 1)'
const TO_COLOR = 'rgba(42, 166, 161, 1)'

interface LinearBackgroundProps {
  children: React.ReactNode
  backgroundImage?: any // Change the type to any to handle the require statement
  borderRadius?: number // Add borderRadius prop
}

const LinearBackground = ({
  children,
  backgroundImage,
  borderRadius = 0,
}: LinearBackgroundProps) => {
  return (
    <View style={[{ flex: 1, borderRadius, overflow: 'hidden' }]}>
      {backgroundImage && (
        <ImageBackground source={backgroundImage} style={styles.image} resizeMode="cover">
          <View style={StyleSheet.absoluteFillObject} />
        </ImageBackground>
      )}
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor={FROM_COLOR} stopOpacity="1" />
            <Stop offset="0.2" stopColor={FROM_COLOR} stopOpacity="1" />
            <Stop offset="1" stopColor={TO_COLOR} stopOpacity="0.55" />
          </SvgLinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" rx={borderRadius} ry={borderRadius} />
      </Svg>
      <View style={[StyleSheet.absoluteFillObject, styles.children]}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image does not repeat
  },
  children: {
    padding: 15,
    justifyContent: 'space-between',
  },
})

export default LinearBackground
