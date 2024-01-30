import React, { useReducer, useState } from 'react';
import todoReducer from './reducers/todoReducer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding-top: 60px;
`;

const Row = styled.div`
  width: 500px;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const Input = styled.input`
  color: #787878;
  font-size: 1em;
  border: 2px solid #787878;
  border-radius: 3px;
  margin: "1em";
  padding: "1em";
`;

const List = styled.ul`
  padding-left: 0;
  text-align: left;
`;

const ItemList = styled.li`
  list-style: none;
`;

const SpanText = styled.span`
  font-size: 24px;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  color: ${(props) => (props.completed ? 'red' : 'black')};
`;

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if(task.trim() === '') return;
    dispatch({type: 'ADD_TODO', payload: task});
    setTask('');
  };

  const toggleTodo = (id) => {
    dispatch({type: 'TOGGLE_TODO', payload: id});
  };

  const deleteTodo = (id) => {
    dispatch({type: 'DELETE_TODO', payload: id})
  };

  return (
    <Container className="App">
      <Row>
        <h3>Todo list</h3>
        <Input data-testid="input-task" type='text' placeholder='new task' value={task} onChange={(e) => setTask(e.target.value)} />
        <Button data-testid="add-todo" onClick={addTodo}>Add Task</Button>
      </Row>
      <Row>
        <List>
          {
            todos.map((todo) => (
            <ItemList key={todo.id}>
              <input style={{marginRight: '10px'}} type='checkbox' checked={todo.completed} onChange={() => toggleTodo(todo.id)}/>
              <SpanText
                completed={todo.completed}
              >
                {todo.text}
              </SpanText>
              <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
            </ItemList>
          ))}
        </List>
      </Row>
    </Container>
  );
}

export default App;
