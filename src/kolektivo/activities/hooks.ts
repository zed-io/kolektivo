import { isEmpty } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { useAsync } from 'react-async-hook'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkInToActivity,
  getExistingCheckIn,
  getExistingRegistration,
  getRegisteredActivities,
  getUpcomingActivities,
  signInToActivity,
  signOutFromActivity,
} from 'src/kolektivo/activities/service'
import { ActivityDetail } from 'src/kolektivo/activities/types'
import { ActivityModel, getActivities } from 'src/kolektivo/activities/utils'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import Logger from 'src/utils/Logger'
import { currentAccountSelector } from 'src/web3/selectors'

export const useDefaultActivities = () => {
  const activities: ActivityDetail[] = []

  const dbActivities = useAsync(getActivities, [])

  return useMemo(() => {
    if (dbActivities.result) {
      return dbActivities.result
    } else {
      return [] as Activity[]
    }
  }, [activities, dbActivities, dbActivities.result])
}

export const useActivityEnrollment = () => {
  const enroll = (activity: Activity) => {
    navigate(Screens.QRNavigator, { screen: Screens.QRCode })
  }

  return { enroll }
}

export const useAvailableActivities = () => {
  const walletAddress = useSelector(currentAccountSelector)

  const availableActivities = useAsync(async () => {
    const activities = await getUpcomingActivities()
    return activities
  }, [])

  const myActivities = useAsync(async () => {
    if (!walletAddress) {
      return []
    }
    const activities = await getRegisteredActivities(walletAddress)
    return activities
  }, [])

  const completedActivities = useAsync(async () => {
    return [] as ActivityModel[]
  }, [])

  return {
    upcomingActivities: availableActivities,
    signedUpActivities: myActivities,
    completedActivities,
  }
}

export const useSignUpAndCancelActivityEnrollment = (activityId: string) => {
  const walletAddress = useSelector(currentAccountSelector)
  const [signedUp, setSignedUp] = useState(false)
  const [loading, setLoading] = useState(false)

  useAsync(async () => {
    setLoading(true)
    const result = await getExistingRegistration(activityId, walletAddress!)
    setSignedUp(!isEmpty(result))
    setLoading(false)
  }, [])

  const signUpForEvent = useCallback(async () => {
    try {
      setLoading(true)
      await signInToActivity(activityId, walletAddress!)
      setSignedUp(true)
    } catch (error: any) {
      Logger.error('Failed to sign up for event', error)
    }
    setLoading(false)
  }, [])

  const cancelEvent = useCallback(async () => {
    try {
      setLoading(true)
      await signOutFromActivity(activityId, walletAddress!)
      setSignedUp(false)
    } catch (error: any) {
      Logger.error('Failed to cancel event', error)
    }
    setLoading(false)
  }, [])

  return {
    loading,
    isSignedUp: signedUp,
    signUpForEvent,
    cancelEvent,
  }
}

export const useCheckInAndCheckOutOfActivity = (activityId: string) => {
  const dispatch = useDispatch()
  const walletAddress = useSelector(currentAccountSelector)
  const [checkedIn, setCheckedIn] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  useAsync(async () => {
    setLoading(true)
    const result = await getExistingCheckIn(activityId, walletAddress!)
    setCheckedIn(!isEmpty(result))
    setLoading(false)
  }, [])

  const checkIn = useCallback(async () => {
    setLoading(true)
    await checkInToActivity(activityId, walletAddress!)
    dispatch(activityStatusUpdate({ id: activityId } as ActivityModel, 'active'))
    setCheckedIn(true)
    setLoading(false)
  }, [])

  const checkOut = useCallback(() => {
    setLoading(true)
    dispatch(activityStatusUpdate({ id: activityId } as ActivityModel, 'complete'))
    setLoading(false)
  }, [])

  return {
    loading,
    checkedIn,
    completed,
    checkIn,
    checkOut,
  }
}
