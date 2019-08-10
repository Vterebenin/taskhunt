import axios from 'axios'

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteTask, fetchTaskListIfNeeded } from '../../redux/actions'
import { withRouter } from 'react-router-dom';

function MainLayout(props) {
  const cors_hack = "https://cors-anywhere.herokuapp.com"
  const config = {
    url_redmine: `${cors_hack}/https://redmine.twinscom.ru`,
    url_taskhunt: `${cors_hack}/https://canape-taskhunt.herokuapp.com`,
    url_redmine_no_cors: `https://redmine.twinscom.ru`,
    url_taskhunt_no_cors: `https://canape-taskhunt.herokuapp.com`
  }

  const [tasks, setTasks] = useState(null)
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [hunted, setHunted] = useState(null)
  const [lastId, setLastId] = useState(0)

  const { dispatch } = props
  const { taskListR } = props

  useEffect(() => {
    // фетчим список тасков в данный момент
    dispatch(fetchTaskListIfNeeded())
    taskListR !== undefined ? setHunted(taskListR) : ''
  }, [taskListR])

  useEffect(() => {
    if ((hunted !== null) && (hunted.length > 0)) {
      setLastId(hunted[hunted.length - 1].id + 1)
    }
  }, [taskListR, hunted])

  function handleNameChange(event) {
    setUsername(event.target.value)
  }

  function handlePassChange(event) {
    setPass(event.target.value)
  }

  function handleSubmit(event) {
    var basicAuth = 'Basic ' + btoa(username + ':' + pass);
    setLoading(true);
    axios.get(`${config.url_redmine}/issues.json?assigned_to_id=me`, {
      headers: {
        "Authorization": basicAuth,
      }
    })
      .then(response => response.data)
      .then(data => { setLoading(false); setTasks(data.issues) })

    event.preventDefault();
  }

  function handleDestroyClick(task) {
    dispatch(deleteTask(task, props.taskListR))
  }

  function search(nameKey, obj) {
    for (let item in obj)  {
      if (obj[item].TaskId === nameKey) {
        return true
      }
    }
    return false
  }

  function handleTaskClick(taskId) {
    const taskObj = {
      id: lastId,
      TaskId: taskId
    }
    
    if (search(taskObj.TaskId, hunted)) {
      alert("Этот таск уже ждет своего охотника...🔫")
      return false
    } else {
      axios.post(`${config.url_taskhunt}/hunted_tasks.json`, {
        isHunted: 'false',
        TaskTitle: 'test1',
        TaskDesc: 'test2',
        TaskId: taskId
      })
        .then(function (response) {
          console.log(response, "response");
        })
        .catch(function (error) {
          console.log(error);
        })

      setHunted([...hunted, taskObj])
    }
    
  }

  const listOf = (tasks, canBeHunted = false, canBeDestroyed = false) => {
    return tasks.map((task) => {
      const idOfTask = task.TaskId || task.id || task
      return (
        <li key={task.id || idOfTask} >
          <a href={`${config.url_redmine_no_cors}/issues/${idOfTask}`}>{idOfTask}</a>
          {canBeHunted && <button onClick={() => handleTaskClick(idOfTask)}>Объявить охоту</button>}
          {canBeDestroyed && <a href={`${config.url_redmine_no_cors}/issues/${idOfTask}`} target="_blank"><button onClick={() => handleDestroyClick(task)}> начать охоту</button></a>}
        </li>
      )
    })
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Имя пользователя в редмайне:
          <input type="text" value={username} onChange={handleNameChange} />
        </label>
        <label>
          Редмайновский пасс:
          <input type="password" value={pass} onChange={handlePassChange} />
        </label>
        <div className="reminder">
          *Эти данные нигде не будут сохранены ( кроме текущей сессии, конечно :P )
        </div>
        <input type="submit" value="Войти" />
      </form>
      {tasks &&
        <React.Fragment>
          <h2>Твои  таски:</h2>
          <ul>
            {listOf(tasks, true)}
          </ul>
        </React.Fragment>
      }
      {hunted !== null && hunted.length > 0 &&
        <React.Fragment>
          <h2>Текущие таски поставленные в охоту:</h2>
          <ul>
            {listOf(hunted, false, true)}
          </ul>
        </React.Fragment>
      }
      {!tasks && loading &&
        <React.Fragment>
          <h1> Я тут фетчу вообще-та... </h1>
        </React.Fragment>
      }
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  const { taskListR } = state.taskListFromRedmine
  return {
      taskListR,
  }
}

export default connect(mapStateToProps)(withRouter(MainLayout)) 
