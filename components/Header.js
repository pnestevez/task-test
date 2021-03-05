import { useRouter } from 'next/router';
// Components
import styles from '../styles/Header.module.css';

export default function Header({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout');
    router.push('/auth');
  };

  return (
    <div className={styles.header}>
      {user
        ? (
          <img
            src="logout.svg"
            alt="logout"
            onClick={handleLogout}
          />
        )
        : null}
      <h1 className={styles.title}>
        <span>What</span>
        {' '}
        to do
      </h1>
      <h2 className={styles.subtitle}>Task Manager</h2>
    </div>
  );
}
