import { FC, useActionState } from 'react';

import {
  createTaskAction,
  updateTaskAction,
} from 'src/pages/todo-list/actions';
import { Task } from 'src/shared/api';

interface CreateTaskFormProps {
  userId: string;
  refetchTasks: () => void;
  task: Task | null;
}

export const CreateTaskForm: FC<CreateTaskFormProps> = ({
  userId,
  refetchTasks,
  task,
}) => {
  const action = task?.id
    ? updateTaskAction({ refetchTasks, task })
    : createTaskAction({ refetchTasks, userId });

  const [state, dispatch, isPending] = useActionState(action, { title: '' });

  return (
    <form action={dispatch} className="flex w-full justify-center gap-2">
      <input
        defaultValue={state?.title || task?.title}
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
        {task?.id ? 'Update task' : 'add task'}
      </button>
      {state?.error && <div className="text-red-500">{state?.error}</div>}
    </form>
  );
};
