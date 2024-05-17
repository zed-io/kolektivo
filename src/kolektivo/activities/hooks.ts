import { useMemo } from 'react'
import { ActivityDetail } from 'src/kolektivo/activities/types'

export const useDefaultActivities = () => {
  const activities: ActivityDetail[] = []

  activities.push({
    activityId: 'kol-tt-edu',
    title: 'Kolektivo Trinidad',
    activityHost: 'Zed Labs',
    activityDate: '2024-06-01',
    activityImageUri: 'https://via.placeholder.com/300',
  })

  activities.push({
    activityId: 'kol-tt-edu',
    title: 'Kolektivo Trinidad',
    activityHost: 'Zed Labs',
    activityDate: '2024-06-01',
    activityImageUri: 'https://via.placeholder.com/300',
  })

  return useMemo(() => {
    return activities
  }, [activities])
}
