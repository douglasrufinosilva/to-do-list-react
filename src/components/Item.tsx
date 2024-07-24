/* eslint-disable prettier/prettier */
import { Trash, Check } from '@phosphor-icons/react'

import { ITask } from '../App'

import styles from './Item.module.css'

interface Props {
  data: ITask
  removeTask: (id: number) => void
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
  function handleTaskToggle() {
    toggleTaskStatus({ id: data.id, value: !data.isChecked })
  }

  function handleRemove() {
    removeTask(data.id)
  }

  const checkboxChecked = data.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']

  const paragraphChecked = data.isChecked
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleTaskToggle}>
          <input readOnly type="checkbox" checked={data.isChecked} />
          <span className={`${styles.checkbox} ${checkboxChecked}`}>
            {data.isChecked && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphChecked}`}>
            {data.taskTitle}
          </p>
        </label>
      </div>

      <button onClick={handleRemove}>
        <Trash
          size={16}
          color="#808080"
        />
      </button>
    </div>
  )
}
