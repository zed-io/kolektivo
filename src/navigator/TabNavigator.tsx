import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import TabHome from 'src/home/TabHome'
import Logo from 'src/icons/Logo'
import Wallet from 'src/icons/navigator/Wallet'
import ActivityScreen from 'src/kolektivo/activities/ActivityScreen'
import { Activity } from 'src/kolektivo/icons/Activity'
import { tabHeader } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import Colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'
import variables from 'src/styles/variables'
import TabWallet from 'src/tokens/TabWallet'

const Tab = createBottomTabNavigator()

type Props = NativeStackScreenProps<StackParamList, Screens.TabNavigator>

export default function TabNavigator({ route }: Props) {
  const initialScreen = route.params?.initialScreen ?? Screens.TabHome
  const { t } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAllowFontScaling: false,
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.gray3,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.tabBarItem,
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          height: variables.height * 0.1,
        },
        ...(tabHeader as NativeStackHeaderProps),
      }}
    >
      <Tab.Screen
        name={Screens.TabWallet}
        component={TabWallet}
        options={{
          tabBarLabel: t('bottomTabsNavigator.wallet.tabName') as string,
          tabBarIcon: Wallet,
          tabBarTestID: 'Tab/Wallet',
        }}
      />
      <Tab.Screen
        name={Screens.TabHome}
        component={TabHome}
        options={{
          freezeOnBlur: false,
          lazy: false,
          tabBarLabel: t('bottomTabsNavigator.home.tabName') as string,
          tabBarIcon: Logo,
          tabBarTestID: 'Tab/Home',
          headerTitle: t('bottomTabsNavigator.home.tabName') as string,
        }}
      />
      <Tab.Screen
        name={Screens.ActivityScreen}
        component={ActivityScreen}
        options={{
          freezeOnBlur: false,
          lazy: false,
          tabBarLabel: t('bottomTabsNavigator.activities.tabName') as string,
          tabBarIcon: Activity,
          tabBarTestID: 'Tab/Activities',
          headerTitle: t('bottomTabsNavigator.activities.tabName') as string,
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  label: {
    ...typeScale.labelSemiBoldSmall,
  },
  tabBarItem: {
    paddingVertical: Spacing.Smallest8,
  },
})
