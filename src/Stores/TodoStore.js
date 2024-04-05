import { observable, action } from 'mobx';

class TodoStore {
  todos = [
    "Todo 1",
    "Todo 2",
    "Todo 3"
  ];

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }
}

const store = new TodoStore();
export default store;