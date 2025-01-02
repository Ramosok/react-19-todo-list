import { Route, Routes } from 'react-router-dom';
import { UsersProvider } from 'src/entities/user';
import { TodoListPage } from 'src/pages/todo-list';
import { UsersPage } from 'src/pages/users';

export const App = () => {
  return (
    <UsersProvider>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/:userId/tasks" element={<TodoListPage />} />
      </Routes>
    </UsersProvider>
  );
};
