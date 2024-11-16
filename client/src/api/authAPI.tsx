import { UserLogin } from '../interfaces/UserLogin';

export const login = async (credentials: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error in login:', err);
    return Promise.reject('Login failed');
  }
};