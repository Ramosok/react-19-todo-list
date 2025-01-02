import { use, useOptimistic } from 'react';

import { useUsersContext } from 'src/entities/user';
import {
  CreateUserAction,
  createUserAction,
  deleteUserAction,
  DeleteUserActions,
} from 'src/pages/users/actions';
import { User } from 'src/shared/api';

export const useUsers = (): {
  useUsersList: () => User[];
  createUserAction: CreateUserAction;
  deleteUserAction: DeleteUserActions;
} => {
  const { users, refetchUsers } = useUsersContext();

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
