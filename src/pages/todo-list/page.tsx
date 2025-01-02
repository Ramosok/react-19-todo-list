import { FC, startTransition, Suspense, useMemo, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { CreateTaskForm } from 'src/pages/todo-list/components/CreateTaskForm';
import { Pagination } from 'src/pages/todo-list/components/Pagination';
import { TaskList } from 'src/pages/todo-list/components/TaskList';
import { UserPreview } from 'src/pages/todo-list/components/UserPreview';
import { fetchTasks, Task } from 'src/shared/api';

export const TodoListPage: FC = () => {
  const { userId } = useParams();

  const [task, setTask] = useState<Task | null>(null);

  const [tasksPaginatedPromise, setTasksPaginatedPromise] = useState(() => {
    if (userId) {
      return fetchTasks({ filters: { userId } });
    }
  });

  const refetchTasks = async () => {
    if (userId) {
      const tasks = await tasksPaginatedPromise;
      startTransition(() => {
        setTask(null);
        setTasksPaginatedPromise(
          fetchTasks({ filters: { userId }, page: tasks?.page }),
        );
      });
    }
  };

  const onPageChange = (newPage: number) => {
    if (userId) {
      startTransition(() =>
        setTasksPaginatedPromise(
          fetchTasks({ filters: { userId }, page: newPage }),
        ),
      );
    }
  };

  const tasksPromise = useMemo(() => {
    return tasksPaginatedPromise?.then((task) => {
      return task?.data;
    });
  }, [tasksPaginatedPromise]) as Promise<Task[]>;

  const handleEditTask = (task: Task): void => {
    setTask(task);
  };

  return (
    <main>
      <h1 className="font-black text-center text-4xl text-emerald-500">
        Tasks: <UserPreview userId={userId} />
      </h1>
      {userId && (
        <CreateTaskForm
          task={task}
          refetchTasks={refetchTasks}
          userId={userId}
        />
      )}
      <ErrorBoundary fallbackRender={() => <div>Error Tasks</div>}>
        <Suspense>
          <TaskList
            onEditTask={handleEditTask}
            refetchTasks={refetchTasks}
            tasksPromise={tasksPromise}
          />
          {tasksPaginatedPromise && (
            <Pagination
              onPageChange={onPageChange}
              tasksPaginated={tasksPaginatedPromise}
            />
          )}
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};
