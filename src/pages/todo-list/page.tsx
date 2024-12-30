import { FC, startTransition, Suspense, useMemo, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { CreateTaskForm } from 'src/pages/todo-list/components/CreateTaskForm';
import { TaskList } from 'src/pages/todo-list/components/TaskList';
import { fetchTasks, Task } from 'src/shared/api';

export const TodoListPage: FC = () => {
  const { userId } = useParams();
  const [tasksPaginatedPromise, setTasksPaginatedPromise] = useState(() => {
    if (userId) {
      return fetchTasks({ filters: { userId } });
    }
  });

  const refetchTasks = () => {
    if (userId) {
      startTransition(() =>
        setTasksPaginatedPromise(fetchTasks({ filters: { userId } })),
      );
    }
  };

  const tasksPromise = useMemo(() => {
    return tasksPaginatedPromise?.then((task) => {
      return task;
    });
  }, [tasksPaginatedPromise]) as Promise<Task[]>;

  return (
    <div>
      <h1 className="font-black text-center text-4xl text-emerald-500">
        Tasks
      </h1>
      {userId && <CreateTaskForm refetchTasks={refetchTasks} userId={userId} />}
      <ErrorBoundary fallbackRender={() => <div>Error Tasks</div>}>
        <Suspense>
          <TaskList refetchTasks={refetchTasks} tasksPromise={tasksPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
