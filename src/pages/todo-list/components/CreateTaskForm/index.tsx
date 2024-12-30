import { FC, useActionState } from 'react';

import { createTaskAction } from 'src/pages/todo-list/actions';

interface CreateTaskFormProps {
  userId: string;
  refetchTasks: () => void;
}

export const CreateTaskForm: FC<CreateTaskFormProps> = ({
  userId,
  refetchTasks,
}) => {
  const [state, dispatch, isPending] = useActionState(
    createTaskAction({ refetchTasks, userId }),
    { title: '' },
  );

  return (
    <form action={dispatch} className="flex w-full justify-center gap-2">
      <input
        defaultValue={state.title}
        name="title"
        disabled={isPending}
        className="border px-3 py-2 border-blue-300 rounded"
        type="text"
      />
      <button
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-700 text-amber-50 p-2 font-bold rounded disabled:bg-gray-500"
        type="submit"
      >
        add task
      </button>
      {state?.error && <div className="text-red-500">{state?.error}</div>}
    </form>
  );
};
