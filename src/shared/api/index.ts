export interface User {
  id: string;
  email: string;
}

export const getUsers = (): Promise<User[]> => {
  return fetch('http://localhost:3001/users').then((res) => res.json());
};

export const createUser = (user: User): Promise<User> => {
  // throw new Error('Not implemented');
  return fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const deleteUser = (id: string): Promise<User> => {
  return fetch(`http://localhost:3001/users/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
};
