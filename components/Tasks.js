import { mutate } from 'swr';
// Components
import { useState } from 'react';
import styles from '../styles/Tasks.module.css';
// Functions

export default function Main({ Authorization, tasks, setSelectedTask }) {
  const [todo, setTodo] = useState(true);

  const handleComplete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        complete: true,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
    });

    // Mutate data through api request
    mutate([`${process.env.NEXT_PUBLIC_API_URL}/tasks`, Authorization]);
  };

  const filteredTasks = tasks.filter(task => task.complete !== todo);
  const sortedTasks = filteredTasks.sort((a, b) => b.created - a.created);

  return (
    <div className={styles.tasks}>
      <div className={styles.header}>
        {todo
          ? (
            <h2>
              You have
              {' '}
              <span>{sortedTasks.length}</span>
              {' '}
              things to do!
            </h2>
          )
          : (
            <h2>
              You have done
              {' '}
              <span>{sortedTasks.length}</span>
              {' '}
              tasks.
            </h2>
          )}
        <img
          src="exchange.svg"
          alt="exchange"
          onClick={() => {
            setTodo(!todo);
          }}
        />
      </div>

      <div className={styles.list}>
        {sortedTasks.map((task, i) => (
          <div
            key={task.id}
            className={styles.task}
            style={i % 2 ? { backgroundColor: 'whitesmoke' } : null}
          >
            <div
              className={styles.info}
              onClick={() => setSelectedTask(task)}
            >
              <div
                className={styles.color}
                style={{ backgroundColor: task.color }}
              />
              <div className={styles.title}>{task.title}</div>
            </div>

            {todo
              ? (
                <img
                  src="complete.svg"
                  alt="complete"
                  onClick={() => handleComplete(task.id)}
                />
              )
              : null}
          </div>
        ))}
      </div>
    </div>
  );
}
