import { Route, Routes } from 'react-router-dom';
import { TodoListPage } from 'src/pages/todo-list';
import { UsersPage } from 'src/pages/users';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/:userId/tasks" element={<TodoListPage />} />
    </Routes>
  );
};
