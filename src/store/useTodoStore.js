import { create } from "zustand";

function createTodoStore(set) {
  return {
    todos: [],
    add: (value) => {
      set((state) => {
        let copied = [...state.todos];
        copied.push(value);
        return { todos: copied };
      });
    },
    remove: (id) => {
      set((state) => {
        let copied = [...state.todos];
        copied = copied.filter((item) => item.id !== id);
        return { todos: copied };
      });
    },
    edit: function (value) {
      set(function (state) {
        let copied = [...state.todos];
        copied = copied.map((c) => {
          if (c.id == value.id) {
            c = value;
          }
          return c;
        });
        return { todos: copied };
      });
    },
  };
}

const useTodoStore = create(createTodoStore);
export default useTodoStore;
