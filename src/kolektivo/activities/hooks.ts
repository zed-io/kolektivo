import { useMemo } from 'react'
import { ActivityDetail } from 'src/kolektivo/activities/types'

export const useDefaultActivities = () => {
  const activities: ActivityDetail[] = []

  activities.push({
    activityId: 'kol-tt-edu',
    title: 'Kolektivo Trinidad Event',
    activityHost: 'Zed Labs',
    activityDateTime: 1717434000,
    activityImageUri: 'https://via.placeholder.com/300',
  })

  return useMemo(() => {
    return activities
  }, [activities])
}
