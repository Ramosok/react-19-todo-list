import { startTransition, use, useOptimistic, useState } from 'react';

import {
  CreateUserAction,
  createUserAction,
  deleteUserAction,
  DeleteUserActions,
} from 'src/pages/users/actions';
import { getUsers, User } from 'src/shared/api';

const userPromise = getUsers();

export const useUsers = (): {
  useUsersList: () => User[];
  createUserAction: CreateUserAction;
  deleteUserAction: DeleteUserActions;
} => {
  const [users, setUsers] = useState(userPromise);

  const refetchUsers = (): void => {
    startTransition(() => setUsers(getUsers()));
  };

  const [createdUsers, optimisticCreate] = useOptimistic(
    [] as User[],
    (createdUsers, user: User) => [...createdUsers, user],
  );
  const [deletedUserId, optimisticDelete] = useOptimistic(
    [] as string[],
    (deletedUser, id: string) => deletedUser.concat(id),
  );

  const useUsersList = () => {
    const usersList = use(users);

    return usersList
      .concat(createdUsers)
      .filter(({ id }) => !deletedUserId.includes(id));
  };

  return {
    createUserAction: createUserAction({ refetchUsers, optimisticCreate }),
    deleteUserAction: deleteUserAction({ refetchUsers, optimisticDelete }),
    useUsersList,
  } as const;
};
