import axios from 'axios'

export const FETCH_TASKLIST_R = 'FETCH_TASKLIST_R'
export const HUNT_TASK = 'HUNT_TASK'
export const FETCH_TASKLIST_REDMINE = 'FETCH_TASKLIST_REDMINE'
export const ANNOUNCE_A_HUNT = 'ANNOUNCE_A_HUNT'

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
    taskListTH: newTaskList,
    receivedAt: Date.now()
  }
}

function search(nameKey, obj) {
  for (let item in obj) {
    if (obj[item].TaskId === nameKey) {
      return true
    }
  }
  return false
}

// ************************
// ! FETCH_TASKLIST_R START
// ************************

export function fetchTasksList() {
  return dispatch => {
    return axios.get(`${config.url_taskhunt}/hunted_tasks.json`)
      .then(response => {
        return response.data
      })
      .then(taskListTH => dispatch(refreshTaskList(taskListTH, FETCH_TASKLIST_R)))
  }
}

function shouldFetchTaskList(state) {
  const { taskListTH } = state.taskList
  if (!taskListTH) {
    return true
  } else {
    return taskListTH.didInvalidate
  }
}

export function fetchTaskListIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTaskList(getState())) {
      return dispatch(fetchTasksList())
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

// ************************
// ! FETCH_TASKLIST_REDMINE START
// ************************

export function fetchUserTasks(event, username, pass) {
  return dispatch => {
    dispatch(setLoading(true))
    const basicAuth = 'Basic ' + btoa(username + ':' + pass);
    axios
      .get(`${config.url_redmine}/issues.json?assigned_to_id=me`, {
        headers: {
          "Authorization": basicAuth,
        }
      })
      .then(response => response.data)
      .then(data => {
        dispatch(setLoading(false))
        dispatch(receiveUserTasks(data.issues))
      })

    event.preventDefault();
  }

}
function setLoading(loading) {
  return {
    type: FETCH_TASKLIST_REDMINE,
    loading,
  }
}
function receiveUserTasks(userTaskList) {
  return {
    type: FETCH_TASKLIST_REDMINE,
    userTaskList,
    receivedAt: Date.now()
  }
}

// ************************
// ! FETCH_TASKLIST_REDMINE END
// ************************

// ************************
// ! ANNOUNCE_A_HUNT START
// ************************

export function announceAHunt(taskId, huntedList) {
  return dispatch => {

    if (search(taskId, huntedList)) {
      alert("Этот таск уже ждет своего охотника...🔫")
      return false
    } else {
      axios.post(`${config.url_taskhunt}/hunted_tasks.json`, {
        isHunted: 'false',
        TaskTitle: 'test1',
        TaskDesc: 'test2',
        TaskId: taskId
      })
        .then(function (refreshedTaskList) {
          dispatch(refreshTaskList(refreshedTaskList, ANNOUNCE_A_HUNT))
          dispatch(fetchTasksList())
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

}

// ************************
// ! ANNOUNCE_A_HUNT END
// ************************