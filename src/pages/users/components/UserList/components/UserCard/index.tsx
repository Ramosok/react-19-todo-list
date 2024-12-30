import { FC, useActionState } from 'react';

import { Link } from 'react-router-dom';
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
      <form className="ml-auto flex items-center" action={handleDelete}>
        <input type="hidden" name="id" value={id} />
        <Link
          to={`/${id}/tasks`}
          className="capitalize disabled:bg-gray-500 bg-amber-500 h-10 mr-3 hover:bg-amber-400 p-2 text-amber-50 font-bold rounded ml-auto"
        >
          Tasks
        </Link>
        <button
          disabled={isPending}
          className="capitalize disabled:bg-gray-500 bg-amber-700 h-10 hover:bg-amber-800 p-2 text-amber-50 font-bold rounded ml-auto"
        >
          delete
        </button>
      </form>
      {state.error && <div>{state.error}</div>}
    </div>
  );
};
