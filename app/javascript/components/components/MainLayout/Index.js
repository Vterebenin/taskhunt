import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MainLayout() {
  const config = {
    url: "https://cors-anywhere.herokuapp.com/https://redmine.twinscom.ru"
  }

  const [tasks, setTasks] = useState(null)
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialTasks, setinitialTasks] = useState(null)
  const [hunted, setHunted] = useState(null)

  function fetchTasks() {
    let tasks = axios.get(`http://localhost:3000/hunted_tasks.json`)
      .then(response => {
        return response.data
       
      })
    tasks.then(tasks => {
      hunted !== tasks ? setHunted(tasks) : false
      // initialTasks !== tasks ? setinitialTasks(tasks) : false
      return true
    })
    console.log(initialTasks, "initial")
    console.log(hunted, "hunted");
  }

  useEffect(() => {
    // фетчим список тасков в данный момент
    fetchTasks()
  }, [initialTasks])

  useEffect(() => {
    console.log(hunted, "new hunted")
  }, [hunted])

  function handleNameChange(event) {
    setUsername(event.target.value)
  }

  function handlePassChange(event) {
    setPass(event.target.value)
  }

  function handleSubmit(event) {
    var basicAuth = 'Basic ' + btoa(username + ':' + pass);
    setLoading(true);
    axios.get(`${config.url}/issues.json?assigned_to_id=me`, {
      headers: {
        "Authorization": basicAuth,
      }
    })
      .then(response => response.data)
      .then(data => { setLoading(false); setTasks(data.issues) })

    event.preventDefault();
  }

  function handleDestroyClick(idOfTask) {
    axios.delete(`http://localhost:3000/hunted_tasks/${idOfTask}.json`)
        .then(function (response) {
          console.log(response, "response");
        })
        .catch(function (error) {
          console.log(error);
        })
        fetchTasks();
  }

  function handleTaskClick(taskId) {
    const taskObj = {
      TaskId: taskId
    }
    if (hunted.includes(taskId)) {
      return false

    } else {
      axios.post('http://localhost:3000/hunted_tasks.json', {
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
          <a href={`https://redmine.twinscom.ru/issues/${idOfTask}`}>{idOfTask}</a>
          {canBeHunted && <button onClick={() => handleTaskClick(idOfTask)}>Назначить охоту</button>}
          {canBeDestroyed && <button onClick={() => handleDestroyClick(task.id)}> начать охоту</button>} 
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

export default MainLayout
