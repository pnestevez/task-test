import { useState } from 'react';
import useSWR from 'swr';
import jwt from 'jsonwebtoken';
// Components
import Header from '../components/Header';
import Panel from '../components/Panel';
import Tasks from '../components/Tasks';
import styles from '../styles/Home.module.css';
// Functions
import fetcher from '../utils';
import { getTokenCookie, removeTokenCookie } from '../lib/cookie';

export default function Home(props) {
  // Stale while revalidate strategy for all tasks
  const { data: tasks } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/tasks`, props.Authorization],
    fetcher,
    {
      initialData: props.tasks,
    },
  );

  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className={styles.container}>
      <Header user={props.user.email} />

      <Panel
        user={props.user}
        Authorization={props.Authorization}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />

      <Tasks
        Authorization={props.Authorization}
        tasks={tasks}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const unauthorized = () => {
    removeTokenCookie(context.res);
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  };

  const Authorization = getTokenCookie(context.req);
  if (!Authorization) return unauthorized();

  const JWTTokenArray = Authorization.split(' ');
  const token = JWTTokenArray[1];

  let user;
  try {
    user = await jwt.decode(token);
  } catch (e) {
    user = false;
  }
  if (!user) return unauthorized();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    headers: { Authorization },
  });
  if (res.status === 401) return unauthorized();

  return {
    props: {
      user,
      Authorization,
      tasks: await res.json(),
    },
  };
}
