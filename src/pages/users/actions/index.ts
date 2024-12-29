import { createUser, deleteUser, User } from 'src/shared/api';

type CreateActionsState = {
  error?: string;
  email: string;
};

export type CreateUserAction = (
  state: CreateActionsState,
  formData: FormData,
) => Promise<CreateActionsState>;

export const createUserAction =
  ({
    refetchUsers,
    optimisticCreate,
  }: {
    refetchUsers: () => void;
    optimisticCreate: (user: User) => void;
  }): CreateUserAction =>
  async (_prevState, formData) => {
    const email = formData.get('email') as string;

    if (!email) {
      return { error: 'Missing required fields.', email };
    }
    try {
      const user = {
        email,
        id: crypto.randomUUID(),
      };

      optimisticCreate(user);
      await createUser(user);
      refetchUsers();

      return {
        email: '',
      };
    } catch (error) {
      return {
        error: `Error creating user ${error}`,
        email,
      };
    }
  };

type DeleteUserActionsState = {
  error?: string;
};

export type DeleteUserActions = (
  state: DeleteUserActionsState,
  formData: FormData,
) => Promise<DeleteUserActionsState>;

export const deleteUserAction = ({
  refetchUsers,
  optimisticDelete,
}: {
  refetchUsers: () => void;
  optimisticDelete: (id: string) => void;
}): DeleteUserActions => {
  return async (_state, formData) => {
    const id = formData.get('id') as string;
    optimisticDelete(id);
    await deleteUser(id);

    try {
      refetchUsers();
      return {};
    } catch (error) {
      return {
        error: `Error deleting user ${id} ${error}`,
      };
    }
  };
};
