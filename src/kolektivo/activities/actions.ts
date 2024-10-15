export enum ActivityCheckinActions {
  ACTIVITY_CHECKIN = 'ACTIVITY_CHECKIN/ACTIVITY_CHECKIN',
  ACTIVITY_CHECKIN_SUCCESS = 'ACTIVITY_CHECKIN/ACTIVITY_CHECKIN_SUCCESS',
  ACTIVITY_CHECKIN_FAILURE = 'ACTIVITY_CHECKIN/ACTIVITY_CHECKIN_FAILURE',
}

// Action for initiating the checkin
export const activityCheckin = (status: string) => ({
  type: ActivityCheckinActions.ACTIVITY_CHECKIN,
  status,
})

// Action for successful checkin
export const activityCheckinSuccess = () => ({
  type: ActivityCheckinActions.ACTIVITY_CHECKIN_SUCCESS,
})

// Action for failed checkin
export const activityCheckinFailure = (error: string) => ({
  type: ActivityCheckinActions.ACTIVITY_CHECKIN_FAILURE,
  error,
})

interface ActivityCheckinState {
  isCheckingIn: boolean
  status: string
  error: string | null
}

const initialActivityCheckinState: ActivityCheckinState = {
  isCheckingIn: false,
  status: '',
  error: null,
}

export const activityCheckinReducer = (
  state: ActivityCheckinState = initialActivityCheckinState,
  action: any
): ActivityCheckinState => {
  switch (action.type) {
    case ActivityCheckinActions.ACTIVITY_CHECKIN:
      return {
        ...state,
        isCheckingIn: true,
        status: action.status,
        error: null,
      }
    case ActivityCheckinActions.ACTIVITY_CHECKIN_SUCCESS:
      return {
        ...state,
        isCheckingIn: false,
        error: null,
      }
    case ActivityCheckinActions.ACTIVITY_CHECKIN_FAILURE:
      return {
        ...state,
        isCheckingIn: false,
        error: action.error,
      }
    default:
      return state
  }
}
