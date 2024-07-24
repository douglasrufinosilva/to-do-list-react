/* eslint-disable prettier/prettier */
import { PlusCircle } from '@phosphor-icons/react'
import { useState } from 'react'

import styles from './App.module.css'

import { Button } from './components/Button'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { Empty } from './components/Empty'
import { Header as ListHeader } from './components/TaskHeader'
import { Item } from './components/Item'

export interface ITask {
  id: number
  taskTitle: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputNewTask, setInputNewTask] = useState('')

  const checkedTasks = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  function handleAddTask() {
    if (!inputNewTask) {
      return
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      taskTitle: inputNewTask,
      isChecked: false,
    }

    setTasks((state) => [...state, newTask])
    setInputNewTask('')
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    if (!confirm('Excluir essa tarefa?')) {
      return
    }

    setTasks(filteredTasks)
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(ev) => setInputNewTask(ev.target.value)}
            value={inputNewTask}
          />
          <Button onClick={handleAddTask}>
            Criar
            <PlusCircle 
              size={16}
              color="#f2f2f2"
              weight="bold" 
            />
          </Button>
        </div>

        <div className={styles.tasksList}>
          <ListHeader
            tasksCounter={tasks.length}
            checkedTasks={checkedTasks}
          />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={handleToggleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  )
}
