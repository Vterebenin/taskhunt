import { combineReducers } from 'redux'
import {
  FETCH_TASKLIST_R, 
  HUNT_TASK,
  FETCH_TASKLIST_REDMINE,
  ANNOUNCE_A_HUNT
} from './actions'

/* ********************************************** */

function taskList(state = {}, action) {
  switch (action.type) {
    case HUNT_TASK: 
    case ANNOUNCE_A_HUNT:
    case FETCH_TASKLIST_R:
      return Object.assign({}, state, {
        taskListTH: action.taskListTH,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function taskListRedmine(state = {}, action) {
  switch (action.type) {
    case FETCH_TASKLIST_REDMINE:
      return Object.assign({}, state, {
        loading: action.loading,
        userTaskList: action.userTaskList,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}


/* *********************************************** */

const rootReducer = combineReducers({
  taskList,
  taskListRedmine
})


export default rootReducer