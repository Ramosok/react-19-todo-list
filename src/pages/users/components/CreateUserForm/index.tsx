import { FC, useActionState } from 'react';

import { CreateUserAction } from 'src/pages/users/actions';

export const CreateUserForm: FC<{
  createUserAction: CreateUserAction;
}> = ({ createUserAction }) => {
  const [state, dispatch, isPending] = useActionState(createUserAction, {
    email: '',
  });

  return (
    <form action={dispatch} className="flex w-full justify-center gap-2">
      <input
        defaultValue={state.email}
        name="email"
        disabled={isPending}
        className="border px-3 py-2 border-blue-300 rounded"
        type="email"
      />
      <button
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-700 text-amber-50 p-2 font-bold rounded disabled:bg-gray-500"
        type="submit"
      >
        add user
      </button>
      {state?.error && <div className="text-red-500">{state?.error}</div>}
    </form>
  );
};
