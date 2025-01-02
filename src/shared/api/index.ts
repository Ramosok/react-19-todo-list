const BASE_URL = 'http://localhost:3001/';

export interface User {
  id: string;
  email: string;
}

export const getUsers = (): Promise<User[]> => {
  return fetch(`${BASE_URL}users`).then((res) => res.json());
};

export const createUser = (user: User): Promise<User> => {
  // throw new Error('Not implemented');
  return fetch(`${BASE_URL}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const deleteUser = (id: string): Promise<User> => {
  return fetch(`${BASE_URL}users/${id}`, {
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
    `${BASE_URL}tasks?_page=${page}&_per_page=${perPage}&_sort=${sortBy.createdAt === 'asc' ? 'createdAt' : '-createdAt'}&userId=${filters.userId}`,
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return { ...res, page };
    });
};

export const createTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
  return fetch(`${BASE_URL}tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};

export const deleteTask = (id: string) => {
  return fetch(`${BASE_URL}tasks/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
};

export const updateTask = (task: Partial<Task>) => {
  return fetch(`${BASE_URL}tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};
