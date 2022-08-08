import React from 'react';
import {
  Route, Link, Routes, Outlet,
} from 'react-router-dom';
import styled from 'styled-components';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import EditTodo from './EditTodo';
import EventList from './EventList';
import './App.css';

const Navbar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`;

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`;

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;

const App = () => (
  <>
    <Navbar>
      <Logo>
        Todo
      </Logo>
      <NavItems>
        <NavItem>
          <Link to="/todos">
            Todos
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/todos/new">
            Add New Todo
          </Link>
        </NavItem>
      </NavItems>
    </Navbar>
    <Wrapper>
      <Outlet />
    </Wrapper>
  </>
);

export default App;
