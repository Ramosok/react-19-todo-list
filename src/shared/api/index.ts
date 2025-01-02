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

export type Task = {
  id: string;
  userId: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  page: number;
  next: string | null;
  pages: number;
  prev: string | null;
};

export const fetchTasks = ({
  page = 1,
  perPage = 10,
  sortBy = { createdAt: 'asc' },
  filters,
}: {
  page?: number;
  perPage?: number;
  sortBy?: { createdAt: 'asc' | 'desc' };
  filters: {
    userId: string;
  };
}): Promise<PaginatedResponse<Task[]>> => {
  return fetch(
    `http://localhost:3001/tasks?_page=${page}&_per_page=${perPage}&_sort=${sortBy.createdAt === 'asc' ? 'createdAt' : '-createdAt'}&userId=${filters.userId}`,
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return { ...res, page };
    });
};

export const createTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
  return fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};

export const deleteTask = (id: string) => {
  return fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
};

export const updateTask = (id: string, task: Partial<Task>) => {
  return fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};
