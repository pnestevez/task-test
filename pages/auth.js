import { Magic } from 'magic-sdk';
import { useState } from 'react';
import { useRouter } from 'next/router';
// Components
import SyncLoader from 'react-spinners/SyncLoader';
import Header from '../components/Header';
import styles from '../styles/Auth.module.css';
import formStyles from '../styles/Form.module.css';
// Functions
import useFormInput from '../hooks/useFormInput';

export default function Auth() {
  const router = useRouter();

  // Handle email imput
  const email = useFormInput('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate not null input
    if (!email.value) return;

    setIsLoading(true);

    // Ask magic for the Decentralized ID
    const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY).auth.loginWithMagicLink({ email: email.value });

    // Login with our own API
    const user = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    });

    if (user.ok) router.push('/');
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleLogin} className={formStyles.container}>
          <input
            className={formStyles.text}
            type="email"
            placeholder="Type your email"
            value={email.value}
            onChange={email.handleChange}
          />
          {isLoading
            ? (
              <div className={styles.loader}>
                <SyncLoader
                  size={4}
                  margin={1}
                  color="rgb(0,0,0)"
                />
              </div>
            )
            : (
              <button
                type="submit"
                className={formStyles.submit}
                onClick={handleLogin}
              >
                Login
              </button>
            )}
        </form>
      </div>
    </>
  );
}
