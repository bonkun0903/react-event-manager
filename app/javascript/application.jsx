// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';
import './controllers';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './components/App';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import Editor from './components/Editor';
import NotFound from './components/EventNotFound';

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route exact path="todos" element={<TodoList />} />
            <Route exact path="new" element={<AddTodo />} />
            <Route path="todos/:id/edit" element={<EditTodo />} />
          </Route>
          <Route path="/events/*" element={<Editor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </StrictMode>,
  );
});
