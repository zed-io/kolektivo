import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Text, View } from 'react-native'
import Button from 'src/components/Button'
import {
  navigate,
  navigateBack,
  navigateHome,
  navigateHomeAndThenToScreen,
  navigationRef,
  navigatorIsReadyRef,
} from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { getFeatureGate } from 'src/statsig'

const Stack = createNativeStackNavigator()

const TestScreen = ({ route }: NativeStackScreenProps<ParamListBase>) => (
  <View>
    <Text>Screen {route.name}</Text>
    <Button onPress={() => navigateBack()} text="Back" />
    <Button onPress={() => navigate(Screens.WithdrawSpend)} text="Go to Withdraw Spend" />
    <Button onPress={() => navigateHomeAndThenToScreen(Screens.Profile)} text="Go to Profile" />
    <Button onPress={() => navigateHome()} text="Go To Home" />
  </View>
)

const MockedNavigator = ({
  initialRoute,
}: {
  initialRoute: Screens.DrawerNavigator | Screens.TabNavigator
}) => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        navigatorIsReadyRef.current = true
      }}
    >
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name={Screens.DrawerNavigator} component={TestScreen} />
        <Stack.Screen name={Screens.TabNavigator} component={TestScreen} />
        <Stack.Screen name={Screens.Profile} component={TestScreen} />
        <Stack.Screen name={Screens.WithdrawSpend} component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

jest.unmock('src/navigator/NavigationService')
jest.unmock('@react-navigation/native')
jest.mock('src/statsig')

describe.each([{ useTabNavigator: true }, { useTabNavigator: false }])(
  'NavigationService (tabs: $useTabNavigator)',
  ({ useTabNavigator }) => {
    const homeScreen = useTabNavigator ? Screens.TabNavigator : Screens.DrawerNavigator
    beforeEach(() => {
      jest.mocked(getFeatureGate).mockReturnValue(useTabNavigator)
    })

    it('navigate and navigateHome works correctly', async () => {
      const { getByText } = render(<MockedNavigator initialRoute={homeScreen} />)
      fireEvent.press(getByText('Go to Withdraw Spend'))
      await waitFor(() => expect(getByText('Screen WithdrawSpend')).toBeTruthy())
      fireEvent.press(getByText('Go To Home'))
      await waitFor(() => expect(getByText(`Screen ${homeScreen}`)).toBeTruthy())
    })

    it('navigateBack works correctly', async () => {
      const { getByText } = render(<MockedNavigator initialRoute={homeScreen} />)
      // 2 screens on stack
      fireEvent.press(getByText('Go to Withdraw Spend'))
      await waitFor(() => expect(getByText('Screen WithdrawSpend')).toBeTruthy())
      fireEvent.press(getByText('Back'))
      await waitFor(() => expect(getByText(`Screen ${homeScreen}`)).toBeTruthy())

      // 3 screens on stack
      fireEvent.press(getByText('Go to Profile'))
      await waitFor(() => expect(getByText('Screen Profile')).toBeTruthy())
      fireEvent.press(getByText('Go to Withdraw Spend'))
      await waitFor(() => expect(getByText('Screen WithdrawSpend')).toBeTruthy())
      fireEvent.press(getByText('Back'))
      await waitFor(() => expect(getByText('Screen Profile')).toBeTruthy())
    })

    it('navigateHomeAndThenToScreen works correctly', async () => {
      const { getByText } = render(<MockedNavigator initialRoute={homeScreen} />)

      fireEvent.press(getByText('Go to Withdraw Spend'))
      await waitFor(() => expect(getByText('Screen WithdrawSpend')).toBeTruthy())
      fireEvent.press(getByText('Go to Profile'))
      await waitFor(() => expect(getByText('Screen Profile')).toBeTruthy())
      fireEvent.press(getByText('Back'))
      await waitFor(() => expect(getByText(`Screen ${homeScreen}`)).toBeTruthy())
    })
  }
)
