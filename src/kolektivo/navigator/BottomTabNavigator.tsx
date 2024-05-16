import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import WalletHome from 'src/home/WalletHome'
import { Home } from 'src/icons/Home'
import Pin from 'src/icons/Pin'
import ActivityScreen from 'src/kolektivo/activities/ActivityScreen'
import MapScreen from 'src/kolektivo/map/MapScreen'
import { TabBar } from 'src/kolektivo/navigator/TabBar'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'

const Tab = createBottomTabNavigator()

type Props = NativeStackScreenProps<StackParamList, Screens.TabNavigator>
export default function BottomTabNavigator() {
  const { t } = useTranslation()
  return (
    <Tab.Navigator detachInactiveScreens tabBar={TabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={Screens.WalletHome}
        component={WalletHome}
        options={{
          title: t('home') ?? undefined,
          tabBarLabel: t('home') ?? undefined,
          tabBarIcon: Home,
        }}
      />
      <Tab.Screen
        name={Screens.ActivityScreen}
        component={ActivityScreen}
        options={{
          title: t('activity') ?? undefined,
          tabBarLabel: t('activity') ?? undefined,
          tabBarIcon: null,
        }}
      />
      <Tab.Screen
        name={Screens.MapScreen}
        // @ts-ignore
        component={MapScreen}
        options={{
          title: t('explore') ?? undefined,
          tabBarLabel: t('explore') ?? undefined,
          tabBarIcon: Pin,
        }}
      />
    </Tab.Navigator>
  )
}
