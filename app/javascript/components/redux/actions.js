import axios from 'axios'

export const FETCH_TASKLIST = 'FETCH_TASKLIST'
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
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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
// ! FETCH_TASKLIST START
// ************************

export function fetchTasksList() {
  return dispatch => {
    return axios.get(`${config.url_taskhunt_no_cors}/hunted_tasks.json`)
      .then(response => {
        return response.data
      })
      .then(taskListTH => {
        dispatch(refreshTaskList(taskListTH, FETCH_TASKLIST))
      })
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
// ! FETCH_TASKLIST END
// ************************

// ************************
// ! HUNT_TASK START
// ************************

export function deleteTask(task, currentTaskList) {
  return dispatch => {
    axios.delete(`${config.url_taskhunt_no_cors}/hunted_tasks/${task.id}.json`)
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

export function announceAHunt(task, huntedList) {
  return dispatch => {
    const {
      id,
      author,
      description,
      estimated_hours,
      due_date,
      priority,
      status,
      project,
      subject
    } = task
    if (search(id, huntedList)) {
      // если уже поставлена в охоту
      alert("Этот таск уже ждет своего охотника...🔫")
      return false
    } else {
      // иначе пушим в базу данных
      axios.post(`${config.url_taskhunt_no_cors}/hunted_tasks.json`, {
        isHunted: 'false',
        TaskTitle: subject,
        TaskDesc: description,
        author: author,
        deadline: due_date,
        priority: priority,
        status: status,
        project: project,
        estimated_hours: estimated_hours,
        TaskId: id
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