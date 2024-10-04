import Logger from 'src/utils/Logger'
import { call, put, takeEvery } from 'typed-redux-saga'

// Simulate a function to store the activity status (could be an API call or local storage)
function* storeActivityStatus(status: string) {
  try {
    // Here you could perform any async operation to store the status, like calling an API
    Logger.info('Storing activity status', status)
    yield* call([localStorage, 'setItem'], 'activityStatus', status)
    yield* put(updateActivityStatusSuccess())
  } catch (error) {
    Logger.error('Error storing activity status', String(error))
    yield* put(updateActivityStatusFailure('Failed to store activity status'))
  }
}

// Saga to listen to activity status updates
function* watchActivityStatus() {
  yield* takeEvery(UPDATE_ACTIVITY_STATUS, function* (action: { type: string; payload: string }) {
    yield* storeActivityStatus(action.payload)
  })
}

export function* activitySaga() {
  yield* watchActivityStatus()
}
