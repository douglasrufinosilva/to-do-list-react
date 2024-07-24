import styles from './TaskHeader.module.css'

interface HeaderProps {
  tasksCounter: number
  checkedTasks: number
}

export function Header({ tasksCounter, checkedTasks }: HeaderProps) {
  return (
    <header className={styles.container}>
      <aside>
        <p>Tarefas criadas</p>
        <span>{tasksCounter}</span>
      </aside>

      <aside>
        <p>Concluídas</p>
        <span>
          {tasksCounter === 0
            ? tasksCounter
            : `${checkedTasks} de ${tasksCounter}`}
        </span>
      </aside>
    </header>
  )
}
