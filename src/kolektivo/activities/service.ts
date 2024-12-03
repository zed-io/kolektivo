/**
 * @description Get a specific activity by ID
 * @param _activityId The ID of the activity to retrieve
 * @returns {} The activity object
 */
export const getActivityById = async (_activityId: string): Promise<any> => {
  return {} as any
}

/**
 * @description Get a list of active activities.
 * i.e. Future activities and activities that are currently ongoing
 * @returns {} The list of activities
 */
export const getUpcomingActivities = async (): Promise<any[]> => {
  return [] as any[]
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
  return [] as any[]
}

/**
 * @description Get a list of activities related to a specific host
 * @param _hostId The ID of the host to retrieve activities for
 * @returns {} The list of activities
 */
export const getActivitiesByHost = async (_hostId: string): Promise<any[]> => {
  return [] as any[]
}

/**
 * @description Sign a user in to an activity
 * @param _activityId The ID of the activity to sign in to
 * @returns {} The list of activities
 */
export const signInToActivity = async (_activityId: string): Promise<any> => {
  return {} as any
}

/**
 * @description Check in to an activity
 * @param _activityId The ID of the activity to check in to
 * @returns {} The result of check-in
 */
export const checkInToActivity = async (_activityId: string): Promise<any> => {
  return {} as any
}

/**
 * @description Check out from an activity
 * @param _activityId The ID of the activity to check out from
 * @returns {} The result of check-out
 */
export const checkOutFromActivity = async (_activityId: string): Promise<any> => {
  return {} as any
}
