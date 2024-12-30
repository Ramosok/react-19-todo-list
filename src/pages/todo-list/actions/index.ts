import { createTask, deleteTask } from 'src/shared/api';

type CreateActionsTaskState = {
  error?: string;
  title: string;
};

export type CreateTaskAction = (
  state: CreateActionsTaskState,
  formData: FormData,
) => Promise<CreateActionsTaskState>;

export const createTaskAction =
  ({
    refetchTasks,
    userId,
  }: {
    refetchTasks: () => void;
    userId: string;
  }): CreateTaskAction =>
  async (_prevState, formData) => {
    const title = formData.get('title') as string;

    if (!title) {
      return { error: 'Missing required fields.', title };
    }
    try {
      const task = {
        createdAt: Date.now(),
        done: false,
        userId,
        title,
        id: crypto.randomUUID(),
      };

      await createTask(task);
      refetchTasks();

      return {
        title: '',
      };
    } catch (error) {
      return {
        error: `Error creating task ${error}`,
        title,
      };
    }
  };

type DeleteTaskActionsState = {
  error?: string;
};

export type DeleteTaskActions = (
  state: DeleteTaskActionsState,
  formData: FormData,
) => Promise<DeleteTaskActionsState>;

export const deleteTaskAction = ({
  refetchTasks,
}: {
  refetchTasks: () => void;
}): DeleteTaskActions => {
  return async (_state, formData) => {
    const id = formData.get('id') as string;
    await deleteTask(id);

    try {
      refetchTasks();
      return {};
    } catch (error) {
      return {
        error: `Error deleting task ${id} ${error}`,
      };
    }
  };
};
