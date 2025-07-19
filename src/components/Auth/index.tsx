'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import ClosedEye from '@/assets/icons/ClosedEye';
import OpenedEye from '@/assets/icons/OpenedEye';
import ErrorToast from '@/components/ErrorToast';
import {
  useAuthErrorMessage,
  useClearError,
  useIsAuthError,
  useIsAuthenticated,
  useLogin,
  useLogout
} from '@/store/auth';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const login = useLogin();
  const router = useRouter();
  const errorMessage = useAuthErrorMessage();
  const isError = useIsAuthError();
  const clearError = useClearError();
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    await login({ username, password });
  };

  useEffect(() => {
    if (isError) setTimeout(clearError, 3500);
  }, [clearError, isError]);

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  return (
    <div className={styles.wrapper}>
      {!isAuthenticated ? (
        <div className={styles.container}>
          <input
            className={styles.loginInput}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <div className={styles.inputContainer}>
            <input
              className={styles.passwordInput}
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              className={styles.showPasswordButton}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
            </button>
          </div>

          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>
          <div className={styles.credentialsInfo}>
            <span>
              <i className={styles.infoText}>name: </i> <strong>emilys</strong>
            </span>
            <span>
              <i className={styles.infoText}>pass: </i>
              <strong>emilyspass</strong>
            </span>
          </div>
        </div>
      ) : (
        <button className={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      )}
      <ErrorToast
        message={errorMessage}
        onClose={clearError}
        visible={isError}
      />
    </div>
  );
};

export default Auth;
