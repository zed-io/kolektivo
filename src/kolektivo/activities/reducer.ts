import { Actions } from 'src/kolektivo/activities/actions'

interface ActivityState {
  status: string
  loading: boolean
  error: string | null
}

const initialState: ActivityState = {
  status: '',
  loading: false,
  error: null,
}

export const activityReducer = (state = initialState, action: any): ActivityState => {
  switch (action.type) {
    case Actions.UPDATE_ACTIVITY_STATUS:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case Actions.UPDATE_ACTIVITY_STATUS_SUCCESS:
      return {
        ...state,
        status: action.payload,
        loading: false,
      }
    case Actions.UPDATE_ACTIVITY_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
