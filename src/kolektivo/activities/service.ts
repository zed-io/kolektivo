import { isEmpty } from 'lodash'
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
  const { data, error } = await supabase.from('activities').select().eq('id', _activityId)
  if (error) {
    throw new Error(error.message)
  }
  return data
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

  return data
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

  if (error) {
    throw new Error(error.message)
  }
  return data
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
export const checkOutFromActivity = async (_activityId: string): Promise<any> => {
  return {} as any
}

export const uploadPhotoProofOfAttendance = async (
  _activityId: string,
  _walletAddress: string,
  _blob: Blob
): Promise<any> => {
  const { data, error } = await supabase.storage
    .from('kolektivo-resources')
    .upload(`activities/attendanceProofs/${_activityId}/${_walletAddress}.jpg`, _blob, {
      upsert: true,
    })
  if (error) {
    throw new Error(error.message)
  }
  return data
}
