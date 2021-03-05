import { useEffect, useState } from 'react';
import { mutate } from 'swr';
// Components
import SyncLoader from 'react-spinners/SyncLoader';
import Form from './Form';
import Commands from './Commands';
import styles from '../styles/Panel.module.css';
// Functions
import useFormInput from '../hooks/useFormInput';

export default function Sidebar({
  user, Authorization, selectedTask, setSelectedTask,
}) {
  const title = useFormInput('');
  const description = useFormInput('');
  const color = useFormInput('#000000');
  const [complete, setComplete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate not null input
    if (!title.value) return;
    setIsLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        color: color.value,
        complete,
        author: user.email,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
    });
    // Mutate data through api request
    await mutate([`${process.env.NEXT_PUBLIC_API_URL}/tasks`, Authorization]);

    title.reset();
    description.reset();
    color.reset('');
    setIsLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate not null input
    if (!title.value) return;
    setIsLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${selectedTask.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        color: color.value,
        complete,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
    });

    // Mutate data through api request
    await mutate([`${process.env.NEXT_PUBLIC_API_URL}/tasks`, Authorization]);

    setSelectedTask(null);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${selectedTask.id}`, {
      method: 'DELETE',
      headers: {
        Authorization,
      },
    });

    // Mutate data through api request
    await mutate([`${process.env.NEXT_PUBLIC_API_URL}/tasks`, Authorization]);

    setSelectedTask(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedTask) {
      title.set(selectedTask.title);
      description.set(selectedTask.description);
      color.set(selectedTask.color);
      setComplete(selectedTask.complete);
    } else {
      title.reset();
      description.reset();
      color.reset();
      setComplete(false);
    }
  }, [selectedTask]);

  return (
    <div className={styles.panel}>
      {isLoading
        ? (
          <div className={styles.loader}>
            <SyncLoader
              size={4}
              margin={1}
            />
          </div>
        )
        : (
          <>
            <div className={styles.header}>
              {selectedTask
                ? (
                  <>
                    <h3>
                      Update
                      {' '}
                      <span>task</span>
                    </h3>
                    <img
                      src="close.svg"
                      alt="close"
                      onClick={() => {
                        setSelectedTask(null);
                      }}
                    />
                  </>
                )
                : (
                  <h3>
                    Add a
                    {' '}
                    <span>new task</span>
                  </h3>
                )}
            </div>

            <Form
              title={title}
              color={color}
              description={description}
              handleSubmit={selectedTask ? handleUpdate : handleSubmit}
            />

            <Commands
              selectedTask={!!selectedTask}
              complete={complete}
              setComplete={setComplete}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </>
        )}
    </div>
  );
}
