import { FC, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useUsers } from 'src/pages/users/hooks/useUsers';

import { CreateUserForm } from './components/CreateUserForm';
import { UserList } from './components/UserList';

export const UsersPage: FC = () => {
  const { useUsersList, createUserAction, deleteUserAction } = useUsers();

  return (
    <div className="ml-auto p-10">
      <CreateUserForm createUserAction={createUserAction} />
      <ErrorBoundary fallbackRender={() => <div>Error</div>}>
        <Suspense fallback={<div>Loading.........</div>}>
          <UserList users={useUsersList} deleteUserAction={deleteUserAction} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
