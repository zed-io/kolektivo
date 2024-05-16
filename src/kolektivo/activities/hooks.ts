import { useMemo } from 'react'
import { ActivityDetail } from 'src/kolektivo/activities/types'

export const useDefaultActivities = () => {
  const activities: ActivityDetail[] = []

  activities.push({
    activityId: '1',
    title: 'Activity 1',
    activityHost: 'Host 1',
    activityDate: '2022-01-01',
    activityImageUri: 'https://via.placeholder.com/150',
  })

  activities.push({
    activityId: '2',
    title: 'Activity 2',
    activityHost: 'Host 2',
    activityDate: '2022-01-02',
    activityImageUri: 'https://via.placeholder.com/150',
  })

  activities.push({
    activityId: '3',
    title: 'Activity 3',
    activityHost: 'Host 3',
    activityDate: '2022-01-03',
    activityImageUri: 'https://via.placeholder.com/150',
  })

  activities.push({
    activityId: '4',
    title: 'Activity 4',
    activityHost: 'Host 4',
    activityDate: '2022-01-04',
    activityImageUri: 'https://via.placeholder.com/150',
  })

  return useMemo(() => {
    return activities
  }, [activities])
}
