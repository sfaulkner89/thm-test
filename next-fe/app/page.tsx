'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import { Button, TextField } from '@mui/material'
import TaskTable from './components/taskTable'
import { Task } from './types/Task'
import TaskModal from './components/taskModal'
import taskFetch from './taskFetch'
import SignInModal from './components/SignInModal'

export default function Home () {
  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState<Task | null>(null)
  const [search, setSearch] = useState<string>('')
  const [searchTasks, setSearchTasks] = useState<Task[]>([])
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    if (loggedIn) {
      const getTasks = async () => {
        const taskData = await taskFetch('/get-tasks')
        if (taskData.status === 200) {
          setTasks(await taskData.json())
        }
      }
      getTasks()
    }
  }, [task, loggedIn])

  const emptyTask: Task = {
    name: '',
    description: '',
    status: '',
    priority: '',
    assignee: ''
  }

  const searchHandler = async (search: string) => {
    const regex = new RegExp('.*' + search + '.*', 'i')
    setSearch(search)
    setSearchTasks([])
    tasks.map(task => {
      const taskString =
        task.name.toLowerCase() +
        ' ' +
        task.description.toLowerCase() +
        ' ' +
        task.status.toLowerCase() +
        ' ' +
        task.priority.toLowerCase() +
        ' ' +
        task.assignee.toLowerCase()
      regex.test(taskString) && setSearchTasks(prev => [...prev, task])
    })
  }

  if (!loggedIn) {
    return (
      <SignInModal
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setToken={setToken}
      />
    )
  }

  return (
    <main className={styles.main}>
      {task && <TaskModal task={task} setTask={setTask} />}
      <div className={styles.topline}>
        <TextField
          id='outlined-basic'
          label='Search'
          variant='outlined'
          color='primary'
          autoComplete='off'
          sx={{ width: '60%' }}
          onChange={e => searchHandler(e.target.value)}
        />
        <Button variant='contained' onClick={() => setTask(emptyTask)}>
          Create New Task
        </Button>
      </div>
      <div className={styles.body}>
        <TaskTable
          rows={search ? searchTasks : tasks || []}
          setTask={setTask}
          setTasks={setTasks}
        />
      </div>
    </main>
  )
}
