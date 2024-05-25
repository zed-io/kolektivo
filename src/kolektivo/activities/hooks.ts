import { useMemo } from 'react'
import { ActivityDetail } from 'src/kolektivo/activities/types'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'

export const useDefaultActivities = () => {
  const activities: ActivityDetail[] = []

  activities.push({
    activityId: 'kol-tt-permaculture-workshop-1',
    title: 'Intro to Permaculture Workshop',
    activityHost: 'Kolektivo',
    activityDateTime: 1717866000,
    activityEndDateTime: 1717873200,
    activityLocation: 'The Worx, 35b Wrightson Road, Port of Spain',
    activityImageUri:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    activityAbout:
      'A unique and engaging introduction to permaculture, designed specifically for the busy younger generation of Trinidad and Tobago. This 60 minute workshop will spark the youth interest in sustainable food systems and environmental responsibility. By incorporating interactive activities and innovative digital badges awarded via blockchain technology, this workshop ignites a passion for permaculture and empowers the youth to become eco-warriors',
  })

  return useMemo(() => {
    return activities
  }, [activities])
}

export const useActivityEnrollment = () => {
  const enroll = (activity: ActivityDetail) => {
    navigate(Screens.QRNavigator, { screen: Screens.QRCode })
  }

  return { enroll }
}
