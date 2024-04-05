import { observable, action, makeAutoObservable } from "mobx";

class TodoStore {
  todos = [
    "Todo 1",
    "Todo 2",
    "Todo 3",
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  editTodo(index, newText) {
    this.todos[index] = newText;
  }
}

const store = new TodoStore();
export default store;
