import {
  createContext,
  FC,
  PropsWithChildren,
  startTransition,
  use,
  useState,
} from 'react';

import { getUsers, User } from 'src/shared/api';

type UsersContextType = {
  users: Promise<User[]>;
  refetchUsers: () => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

const userPromise = getUsers();

export const UsersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<Promise<User[]>>(userPromise);

  const refetchUsers = (): void => {
    startTransition(() => setUsers(getUsers()));
  };

  return (
    <UsersContext value={{ users, refetchUsers }}>{children}</UsersContext>
  );
};

export const useUsersContext = () => {
  const context = use(UsersContext);
  if (!context) {
    throw new Error('users contexts must be used within a useUsersContext');
  }

  return context;
};
