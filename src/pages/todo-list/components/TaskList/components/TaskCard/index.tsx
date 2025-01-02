import { FC, useActionState } from 'react';

import { deleteTaskAction } from 'src/pages/todo-list/actions';
import { Task } from 'src/shared/api';

interface UserCardProps {
  task: Task;
  refetchTasks: () => void;
  onEditTask: (task: Task) => void;
}

export const TaskCard: FC<UserCardProps> = ({
  task,
  refetchTasks,
  onEditTask,
}) => {
  const [state, handleDelete, isPending] = useActionState(
    deleteTaskAction({ refetchTasks }),
    {},
  );

  const handleEditTask = () => {
    onEditTask(task);
  };

  return (
    <div className="border font-bold items-center p-2 m-2 rounded bg-amber-200 flex gap-2">
      {task.title}
      <form className="ml-auto" action={handleDelete}>
        <input type="hidden" name="id" value={task.id} />
        <button
          type="button"
          onClick={handleEditTask}
          className="capitalize disabled:bg-gray-500 bg-green-400 hover:bg-green-500 mr-2 p-2 text-amber-50 font-bold rounded ml-auto"
        >
          Edit
        </button>
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
