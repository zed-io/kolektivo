import { decode } from 'base64-arraybuffer'
import { isEmpty } from 'lodash'
import * as RNFS from 'react-native-fs'
import { ActivityModel } from 'src/kolektivo/activities/utils'
import { supabase } from 'src/kolektivo/config/services'

const ACTIVITY_BASE_FIELDS = `
*,
activity_hosts!inner(id, name, wallet_address)
`

/**
 * @description Get a specific activity by ID
 * @param _activityId The ID of the activity to retrieve
 * @returns {} The activity object
 */
export const getActivityById = async (_activityId: string): Promise<any> => {
  const { data, error } = await supabase
    .from('activities')
    .select(`${ACTIVITY_BASE_FIELDS}`)
    .eq('id', _activityId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Add public URL for banner
  return {
    ...data,
    banner_path: getStoragePublicUrl(data.banner_path),
  }
}

/**
 * @description Get a list of active activities.
 * i.e. Future activities and activities that are currently ongoing
 * @returns {} The list of activities
 */
export const getUpcomingActivities = async (walletAddress?: string): Promise<ActivityModel[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select(`${ACTIVITY_BASE_FIELDS}`)
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  // Map through the activities and add public URLs for banners
  return data.map((activity) => ({
    ...activity,
    banner_path: getStoragePublicUrl(activity.banner_path),
  }))
}

/**
 * @description Get a list of completed activities that a user has attended or signed up for.
 * @returns {} The list of activities
 */
export const getCompletedActivities = async (walletAddress?: string): Promise<ActivityModel[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select(`${ACTIVITY_BASE_FIELDS}`)
    .eq('activity_registrations.wallet_address', walletAddress)
    .lte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  // Map through the activities and add public URLs for banners
  return data.map((activity) => ({
    ...activity,
    banner_path: getStoragePublicUrl(activity.banner_path),
  }))
}

/**
 * @description Get a list of past and future activities related to a specific activity.
 * @param _activityId The ID of the activity to retrieve related activities for
 * @returns {} The list of related activities
 */
export const getRelatedActivities = async (_activityId: string): Promise<any[]> => {
  return [] as any[]
}

/**
 * @description Get a list of community hosts
 * @returns {} The list of community hosts
 */
export const getCommunityHosts = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from('activity_hosts')
    .select()
    .order('name', { ascending: true })
  if (error) {
    throw new Error(error.message)
  }
  return data
}

/**
 * @description Get a list of activities related to a specific host
 * @param _hostId The ID of the host to retrieve activities for
 * @returns {} The list of activities
 */
export const getActivitiesByHost = async (_hostId: string): Promise<ActivityModel[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select()
    .eq('activity_host_id', _hostId)
    .order('start_date', { ascending: true })
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const getRegisteredActivities = async (walletAddress: string): Promise<ActivityModel[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `
      ${ACTIVITY_BASE_FIELDS},
      activity_registrations!inner(wallet_address, status)
    `
    )
    .eq('activity_registrations.wallet_address', walletAddress)
    .eq('activity_registrations.status', 'active')
    .order('start_date', { ascending: true })
    .gte('end_date', new Date().toISOString())

  if (error) {
    throw new Error(error.message)
  }
  return data.map((activity) => ({
    ...activity,
    banner_path: getStoragePublicUrl(activity.banner_path),
  }))
}

export const getExistingRegistration = async (
  _activityId: string,
  walletAddress: string
): Promise<ActivityModel> => {
  const { data, error } = await supabase
    .from('activity_registrations')
    .select()
    .eq('activity_id', _activityId)
    .eq('wallet_address', walletAddress)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

/**
 * @description Sign a user in to an activity
 * @param _activityId The ID of the activity to sign in to
 * @returns {} The list of activities
 */
export const signInToActivity = async (
  _activityId: string,
  walletAddress: string
): Promise<any> => {
  const registration = await getExistingRegistration(_activityId, walletAddress)
  if (!isEmpty(registration)) {
    const { data, error } = await supabase
      .from('activity_registrations')
      .update({ signed_up_at: new Date().toISOString(), status: 'active' })
      .eq('activity_id', _activityId)
      .eq('wallet_address', walletAddress)

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  const { data, error } = await supabase.from('activity_registrations').insert({
    activity_id: _activityId,
    wallet_address: walletAddress,
  })
  if (error) {
    throw new Error(error.message)
  }
  return data
}

/**
 * @description Sign a user out of an activity
 * @param _activityId The ID of the activity to sign out from
 * @param walletAddress The wallet address of the user to sign out
 * @returns {} The result of sign-out
 */
export const signOutFromActivity = async (
  _activityId: string,
  walletAddress: string
): Promise<any> => {
  const registration = await getExistingRegistration(_activityId, walletAddress)
  if (!registration) {
    return
  }
  const { data, error } = await supabase
    .from('activity_registrations')
    .update({ status: 'inactive' })
    .eq('activity_id', _activityId)
    .eq('wallet_address', walletAddress)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

/**
 * @description Check in to an activity
 * @param _activityId The ID of the activity to check in to
 * @returns {} The result of check-in
 */
export const checkInToActivity = async (
  _activityId: string,
  walletAddress: string
): Promise<any> => {
  const { data, error } = await supabase.from('attendance_requests').insert({
    check_in: new Date().toISOString(),
    activity_id: _activityId,
    wallet_address: walletAddress,
    state: 'in_progress',
  })

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const getExistingCheckIn = async (
  _activityId: string,
  walletAddress: string
): Promise<any> => {
  const { data, error } = await supabase
    .from('attendance_requests')
    .select()
    .eq('activity_id', _activityId)
    .eq('wallet_address', walletAddress)
    .eq('state', 'in_progress')
    .single()
  if (error) {
    throw new Error(error.message)
  }
  return data
}

/**
 * @description Check out from an activity
 * @param _activityId The ID of the activity to check out from
 * @returns {} The result of check-out
 */
export const checkOutFromActivity = async (
  _activityId: string,
  walletAddress: string,
  payload: any
): Promise<any> => {
  const { data: checkIn } = await supabase
    .from('attendance_requests')
    .select()
    .eq('activity_id', _activityId)
    .eq('wallet_address', walletAddress)
    .eq('state', 'in_progress')
    .single()

  if (!checkIn) {
    throw new Error('Check-in not found')
  }

  const { data, error } = await supabase
    .from('attendance_requests')
    .upsert({
      id: checkIn.id,
      ...payload,
    })
    .eq('activity_id', _activityId)
    .eq('wallet_address', walletAddress)
    .select()

  if (error) {
    console.error('Error checking out from activity:', error)
    throw new Error(error.message)
  }

  console.log('checkOut', data)
  return data
}

export const uploadPhotoProofOfAttendance = async (
  _activityId: string,
  _walletAddress: string,
  _uri: string
): Promise<any> => {
  try {
    const base64 = await RNFS.readFile(_uri, 'base64')
    const payload = decode(base64)
    const { data, error } = await supabase.storage
      .from('kolektivo-resources')
      .upload(`activities/attendanceProofs/${_activityId}/${_walletAddress}.jpg`, payload, {
        contentType: 'image/jpeg',
        upsert: true,
      })

    if (error) {
      console.error('Upload error:', error)
      throw new Error(error.message)
    }

    await checkOutFromActivity(_activityId, _walletAddress, {
      proof_image_path: data.path,
      state: 'in_progress',
    })

    return data
  } catch (error) {
    console.error('Error processing image:', error)
    throw error
  }
}

// Add this helper function to get public URLs for Supabase storage items
export const getStoragePublicUrl = (path: string): string => {
  if (!path) return ''

  const {
    data: { publicUrl },
  } = supabase.storage.from('kolektivo-resources').getPublicUrl(path)
  return publicUrl
}

export const isActivityCompleted = async (_activityId: string): Promise<boolean> => {
  const { data, error } = await supabase.from('activities').select().eq('id', _activityId).single()

  if (error) {
    throw new Error(error.message)
  }

  return data.end_date < new Date().toISOString()
}

export const hasCheckedOut = async (
  _activityId: string,
  _walletAddress: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from('attendance_requests')
    .select()
    .eq('activity_id', _activityId)
    .eq('wallet_address', _walletAddress)
    .eq('state', 'submitted')

  if (error) {
    console.error('Error checking out from activity:', error)
    throw new Error(error.message)
  }

  return !isEmpty(data)
}
