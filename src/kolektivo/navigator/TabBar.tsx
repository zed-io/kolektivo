import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import customVariables from 'src/kolektivo/styles/variables'
import Colors from 'src/styles/colors'
import variables from 'src/styles/variables'

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={[styles.wrapper, styles.wrapperShadow]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel !== undefined ? options.title : route.name
        const icon = options.tabBarIcon
        const isFocused = state.index === index
        const color = isFocused ? Colors.primary : '#B4B9BD'

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
          >
            {icon &&
              icon({
                focused: isFocused,
                color,
                size: 24,
              })}
            <Text style={{ color }}>{label && label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    flexDirection: 'row',
    borderTopLeftRadius: customVariables.borderRadius,
    borderTopRightRadius: customVariables.borderRadius,
    paddingHorizontal: variables.contentPadding,
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
  },
  wrapperShadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.22,

    elevation: 3,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
