import { FC, useActionState } from 'react';

import { DeleteUserActions } from 'src/pages/users/actions';

interface UserCardProps {
  id: string;
  email: string;
  deleteUserAction: DeleteUserActions;
}

export const UserCard: FC<UserCardProps> = ({
  id,
  email,
  deleteUserAction,
}) => {
  const [state, handleDelete, isPending] = useActionState(deleteUserAction, {});

  return (
    <div
      key={id}
      className="border font-bold items-center p-2 m-2 rounded bg-amber-200 flex gap-2"
    >
      {email}
      <form className="ml-auto" action={handleDelete}>
        <input type="hidden" name="id" value={id} />
        <button
          disabled={isPending}
          className="capitalize disabled:bg-gray-500 bg-amber-700 hover:bg-amber-800 p-2 text-amber-50 font-bold rounded ml-auto"
        >
          delete
        </button>
      </form>
      {state.error && <div>{state.error}</div>}
    </div>
  );
};
