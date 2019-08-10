import axios from 'axios'

export const FETCH_TASKLIST_R = 'FETCH_TASKLIST_R'
export const HUNT_TASK = 'HUNT_TASK'


const cors_hack = "https://cors-anywhere.herokuapp.com"
const config = {
  url_redmine: `${cors_hack}/https://redmine.twinscom.ru`,
  url_taskhunt: `${cors_hack}/https://canape-taskhunt.herokuapp.com`,
  url_redmine_no_cors: `https://redmine.twinscom.ru`,
  url_taskhunt_no_cors: `https://canape-taskhunt.herokuapp.com`
}

function refreshTaskList(newTaskList, type) {
  return {
    type,
    taskListR: newTaskList,
    receivedAt: Date.now()
  }
}

// ************************
// ! FETCH_TASKLIST_R START
// ************************

export function fetchTasksListR() {
  return dispatch => {
    return axios.get(`${config.url_taskhunt}/hunted_tasks.json`)
      .then(response => {
        return response.data
      })
      .then(taskListR => dispatch(refreshTaskList(taskListR, FETCH_TASKLIST_R)))
  }
}

function shouldFetchTaskList(state) {
  const { taskListR } = state.taskListFromRedmine
  if (!taskListR) {
    return true
  } else {
    return taskListR.didInvalidate
  }
}

export function fetchTaskListIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTaskList(getState())) {
      return dispatch(fetchTasksListR())
    }
  }
}

// ************************
// ! FETCH_TASKLIST_R END
// ************************

// ************************
// ! HUNT_TASK START
// ************************

export function deleteTask(task, currentTaskList) {
  return dispatch => {
    axios.delete(`${config.url_taskhunt}/hunted_tasks/${task.id}.json`)
      .then(function (response) {
        console.log(response, "response");
      })
      .catch(function (error) {
        console.log(error);
      })

    let array = [...currentTaskList]; // make a separate copy of the array
    const index = array.indexOf(task)

    array.splice(index, 1);
    return dispatch(refreshTaskList(array, HUNT_TASK))
  }
}

// ************************
// ! HUNT_TASK END
// ************************

