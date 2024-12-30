import { FC, useActionState } from 'react';

import { deleteTaskAction } from 'src/pages/todo-list/actions';

interface UserCardProps {
  id: string;
  title: string;
  refetchTasks: () => void;
}

export const TaskCard: FC<UserCardProps> = ({ id, title, refetchTasks }) => {
  const [state, handleDelete, isPending] = useActionState(
    deleteTaskAction({ refetchTasks }),
    {},
  );

  return (
    <div
      key={id}
      className="border font-bold items-center p-2 m-2 rounded bg-amber-200 flex gap-2"
    >
      {title}
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
