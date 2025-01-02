import { FC, use } from 'react';

import { useUsersContext } from 'src/entities/user';

interface UserPreviewProps {
  userId: string | undefined;
}

export const UserPreview: FC<UserPreviewProps> = ({ userId }) => {
  const { users } = useUsersContext();

  const userList = use(users);

  const currentUser = userList.find((user) => user.id === userId);

  return (
    <div className="text-yellow-900 font-bold mb-4">{currentUser?.email}</div>
  );
};
