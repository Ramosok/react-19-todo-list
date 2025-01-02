import { FC, use } from 'react';

import { Task } from 'src/shared/api';

import { TaskCard } from './components/TaskCard';

interface TaskListProps {
  tasksPromise: Promise<Task[]>;
  refetchTasks: () => void;
}

export const TaskList: FC<TaskListProps> = ({ tasksPromise, refetchTasks }) => {
  const taskList = use(tasksPromise);

  return (
    <div className="flex flex-col">
      {taskList?.map((task) => {
        return (
          <TaskCard refetchTasks={refetchTasks} key={task.id} task={task} />
        );
      })}
    </div>
  );
};
