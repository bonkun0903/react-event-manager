import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { AiFillEdit } from 'react-icons/ai';

const SearchAndbutton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`;

const RemoveAllbutton = styled.button`
  width:16%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`;
const TodoName = styled.span`
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`;

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`;

const UncheckdBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`;

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchName, setSearchName] = useState('');

  // TodoListが描画された際に１度だけ呼ばれる。
  useEffect(() => {
    axios.get('/api/v1/todos.json')
      .then((resp) => {
        console.log(resp.data);
        setTodos(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const removeAllTodos = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete('/api/v1/todos/destroy_all')
        .then((resp) => {
          setTodos([]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const updateIsCompleted = (index, val) => {
    const data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed,
    };
    axios.patch(`/api/v1/todos/${val.id}`, data)
      .then((resp) => {
        const newTodos = [...todos];
        newTodos[index].is_completed = resp.data.is_completed;
        setTodos(newTodos);
      });
  };

  return (
    <>
      <h1>Todo List</h1>
      <SearchAndbutton>
        <SearchForm
          type="text"
          placeholder="Search todo..."
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
        <RemoveAllbutton onClick={removeAllTodos}>
          Remove All
        </RemoveAllbutton>
      </SearchAndbutton>

      <div>
        {todos.filter((val) => {
          if (searchName === '') {
            return val;
          } if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
            return val;
          }
        }).map((val, key) => (
          <Row key={key}>
            {val.is_completed ? (
              <CheckedBox>
                <ImCheckboxChecked onClick={() => updateIsCompleted(key, val)} />
              </CheckedBox>
            ) : (
              <UncheckdBox>
                <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, val)} />
              </UncheckdBox>
            )}
            <TodoName is_completed={val.is_completed}>
              {val.name}
            </TodoName>
            <Link to={`/todos/${val.id}/edit`}>
              <EditButton>
                <AiFillEdit />
              </EditButton>
            </Link>
          </Row>
        ))}
      </div>
    </>
  );
};

export default TodoList;
