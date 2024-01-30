import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('todo component', () => {
  test('render static elements', () => {
    render(<App />);
    const title = screen.getByText("Todo list");
    const button = screen.getByTestId("add-todo");
  
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('add new item to the todo list', () => {
    render(<App />);

    const input = screen.getByTestId("input-task");
    const addButton = screen.getByTestId("add-todo");

    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(addButton);

    const newItem = screen.getByText('new task');
    expect(newItem).toBeInTheDocument();
  });

  test('delete item to the todo list', () => {
    render(<App />);

    const input = screen.getByTestId("input-task");
    const addButton = screen.getByTestId("add-todo");

    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(addButton);

    const deleteButtons = screen.getAllByText('Delete');
    const deleteButton = deleteButtons[0];

    fireEvent.click(deleteButton);

    const deletedItem = screen.queryByText('new task');
    expect(deletedItem).toBeNull();
  });
});
