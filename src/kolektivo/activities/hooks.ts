import { isEmpty } from 'lodash'
import { useCallback, useState } from 'react'
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
  uploadPhotoProofOfAttendance,
} from 'src/kolektivo/activities/service'
import { ActivityModel } from 'src/kolektivo/activities/utils'
import Logger from 'src/utils/Logger'
import { currentAccountSelector } from 'src/web3/selectors'

export const useAvailableActivities = () => {
  const walletAddress = useSelector(currentAccountSelector)
  const [loading, setLoading] = useState(false)

  const availableActivities = useAsync(async () => {
    setLoading(true)
    const activities = await getUpcomingActivities()
    setLoading(false)
    return activities
  }, [])

  const myActivities = useAsync(async () => {
    setLoading(true)
    if (!walletAddress) {
      return []
    }
    const activities = await getRegisteredActivities(walletAddress)
    setLoading(false)
    return activities
  }, [])

  const completedActivities = useAsync(async () => {
    return [] as ActivityModel[]
  }, [])

  const refresh = useCallback(async () => {
    await myActivities.execute()
    await availableActivities.execute()
  }, [myActivities, availableActivities])

  return {
    loading,
    upcomingActivities: availableActivities,
    signedUpActivities: myActivities,
    completedActivities,
    refresh: refresh,
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
  const [answer, setAnswer] = useState<string>('')

  useAsync(async () => {
    setLoading(true)
    const result = await getExistingCheckIn(activityId, walletAddress!)
    setCheckedIn(!isEmpty(result))
    setLoading(false)
  }, [])

  const checkIn = useCallback(async () => {
    setLoading(true)
    await checkInToActivity(activityId, walletAddress!)
    setCheckedIn(true)
    setLoading(false)
  }, [])

  const checkOut = useCallback(() => {
    setLoading(true)
    setLoading(false)
  }, [])

  const onChangeAnswer = useCallback((answer: string) => {
    setAnswer(answer)
  }, [])

  const onTakeSelfie = useCallback(async (uri: string) => {
    setLoading(true)
    const result = await fetch(uri)
    const blob = await result.blob()
    await uploadPhotoProofOfAttendance(activityId, walletAddress!, blob)
    setLoading(false)
  }, [])

  return {
    loading,
    checkedIn,
    completed,
    checkIn,
    checkOut,
    onChangeAnswer,
    onTakeSelfie,
  }
}
