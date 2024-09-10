import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { HomeEvents } from 'src/analytics/Events'
import ValoraAnalytics from 'src/analytics/ValoraAnalytics'
import Card from 'src/components/Card'
import Touchable from 'src/components/Touchable'
import { HomeActionName } from 'src/home/types'
import Receive from 'src/kolektivo/icons/Receive'
import Scan from 'src/kolektivo/icons/Scan'
import Send from 'src/kolektivo/icons/Send'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import Colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'

function ActionsCarousel() {
  const { t } = useTranslation()

  const actions = [
    {
      name: HomeActionName.Send,
      title: t('homeActions.send'),
      icon: <Send color={Colors.primaryDark} />,
      onPress: () => {
        navigate(Screens.SendSelectRecipient)
      },
    },
    {
      name: HomeActionName.Receive,
      title: t('homeActions.receive'),
      icon: <Receive color={Colors.primaryDark} />,
      onPress: () => {
        navigate(Screens.QRNavigator, {
          screen: Screens.QRCode,
        })
      },
    },
    {
      name: HomeActionName.Scan,
      title: t('homeActions.scan'),
      icon: <Scan color={Colors.primaryDark} />,
      onPress: () => {
        navigate(Screens.QRNavigator, {
          screen: Screens.QRCode,
        })
      },
    },
  ]

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-around',
        padding: 20,
      }}
      testID={'HomeActionsCarousel'}
    >
      {actions.map(({ name, title, icon, onPress }) => (
        <Card
          style={[styles.card]}
          shadow={null}
          key={`HomeAction-${name}`}
          testID={`HomeAction-${name}`}
        >
          <Touchable
            onPress={() => {
              ValoraAnalytics.track(HomeEvents.home_action_pressed, { action: name })
              onPress()
            }}
            style={styles.touchable}
            borderRadius={8}
            testID={`HomeActionTouchable-${name}`}
          >
            <>
              {icon}
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={styles.name}
                testID={`HomeAction/Title-${name}`}
              >
                {title}
              </Text>
            </>
          </Touchable>
        </Card>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
    flex: 1,
    maxHeight: 80,
  },
  touchable: {
    alignItems: 'center',
  },
  name: {
    ...typeScale.labelSmall,
    lineHeight: 17,
    paddingTop: Spacing.Smallest8,
    color: Colors.primaryDark,
  },
})

export default ActionsCarousel
