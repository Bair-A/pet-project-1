'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import { useForm } from 'react-hook-form';

import {
  useAuthErrorMessage,
  useClearError,
  useIsAuthError,
  useIsAuthenticated,
  useLogin,
  useLogout
} from '@/app/store/auth';

import ClosedEye from '@/shared/assets/icons/ClosedEye';
import OpenedEye from '@/shared/assets/icons/OpenedEye';
import { AuthCredentials } from '@/shared/types';

import ErrorToast from '../ErrorToast';

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthCredentials>();

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

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  return (
    <div className={styles.wrapper}>
      {!isAuthenticated ? (
        <div className={styles.container}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(data => login(data))}
          >
            <input className={styles.loginInput} {...register('username')} />
            <div className={styles.inputContainer}>
              <input
                className={styles.passwordInput}
                type={isPasswordVisible ? 'text' : 'password'}
                {...register('password', {
                  required: 'Please enter your password',
                  minLength: { value: 8, message: 'Minimum 8 characters' },
                  maxLength: { value: 20, message: 'Maximum 20 characters' }
                })}
              />
              <button
                className={styles.showPasswordButton}
                type='button'
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
              </button>
            </div>
            <div className={styles.errorContainer}>
              {' '}
              {errors.password && (
                <p style={{ color: 'red' }}>{errors.password.message}</p>
              )}
            </div>

            <button className={styles.loginButton} type='submit'>
              Login
            </button>
          </form>
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
