import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { config } from '../helpers/Index'
import {
  deleteTask,
  fetchTaskListIfNeeded,
  fetchUserTasks,
  announceAHunt
} from '../../redux/actions'
import { withRouter } from 'react-router-dom';

function MainLayout(props) {

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const { dispatch, loading, userTaskList, taskListTH } = props

  useEffect(() => {
    dispatch(fetchTaskListIfNeeded())
  }, [taskListTH])

  function handleNameChange(event) {
    setUsername(event.target.value)
  }

  function handlePassChange(event) {
    setPass(event.target.value)
  }

  function handleSubmit(event) {
    dispatch(fetchUserTasks(event, username, pass))
  }

  function huntClick(task) {
    dispatch(deleteTask(task, taskListTH))
  }

  function announceAHuntClick(taskId) {
    dispatch(announceAHunt(taskId, taskListTH))

  }

  const listOf = (tasks, canBeHunted = false, canBeDestroyed = false) => {
    return tasks.map((task) => {
      const idOfTask = task.TaskId || task.id
      return (
        <li key={idOfTask} >
          <a href={`${config.url_redmine_no_cors}/issues/${idOfTask}`}>{idOfTask}</a>
          {canBeHunted &&
            <button onClick={() => announceAHuntClick(idOfTask)}>Объявить охоту</button>
          }
          {canBeDestroyed &&
            <a href={`${config.url_redmine_no_cors}/issues/${idOfTask}`} target="_blank" rel="noopener noreferrer">
              <button onClick={() => huntClick(task)}>Начать охоту</button>
            </a>
          }
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
      {userTaskList &&
        <React.Fragment>
          <h2>Твои  таски:</h2>
          <ul>
            {listOf(userTaskList, true)}
          </ul>
        </React.Fragment>
      }
      {taskListTH && taskListTH.length > 0 &&
        <React.Fragment>
          <h2>Текущие таски поставленные в охоту:</h2>
          <ul>
            {listOf(taskListTH, false, true)}
          </ul>
        </React.Fragment>
      }
      {!userTaskList && loading &&
        <React.Fragment>
          <h1> Я тут фетчу вообще-та... </h1>
        </React.Fragment>
      }
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  const { taskListTH } = state.taskList
  const { loading, userTaskList } = state.taskListRedmine
  return {
    taskListTH,
    loading,
    userTaskList
  }
}

export default connect(mapStateToProps)(withRouter(MainLayout)) 
