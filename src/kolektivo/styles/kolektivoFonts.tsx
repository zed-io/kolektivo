import { StyleSheet } from 'react-native'
import { typeScale as fonts } from 'src/styles/fonts'

const Inter = {
  Regular: 'Inter-Regular',
  Medium: 'Inter-Medium',
  SemiBold: 'Inter-SemiBold',
  Bold: 'Inter-Bold',
}

export const fontFamily = Inter.Regular

/**
 * Figma TypeScale Styles
 */
export const typeScale = StyleSheet.create({
  ...fonts,
  currencyLarge: {
    fontFamily: Inter.Medium,
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -2.4,
  },
})
