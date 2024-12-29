import { FC } from 'react';

import { DeleteUserActions } from 'src/pages/users/actions';
import { User } from 'src/shared/api';

import { UserCard } from './components/UserCard';

interface UserListProps {
  users: () => User[];
  deleteUserAction: DeleteUserActions;
}

export const UserList: FC<UserListProps> = ({ users, deleteUserAction }) => {
  const userList = users();

  return (
    <div className="flex flex-col">
      {userList.map(({ id, email }) => {
        return (
          <UserCard
            key={id}
            id={id}
            email={email}
            deleteUserAction={deleteUserAction}
          />
        );
      })}
    </div>
  );
};
