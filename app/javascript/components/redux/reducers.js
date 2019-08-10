import { combineReducers } from 'redux'
import {
  FETCH_TASKLIST_R, HUNT_TASK
} from './actions'

/* ********************************************** */

function taskListFromRedmine(state = {}, action) {
  switch (action.type) {
    case HUNT_TASK: 
    case FETCH_TASKLIST_R:
      return Object.assign({}, state, {
        taskListR: action.taskListR,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}


/* *********************************************** */

const rootReducer = combineReducers({
  taskListFromRedmine
})


export default rootReducer