import { useRef } from "react";
import useTodoStore from "../store/useTodoStore";
function TodoList() {
  const { todos, add, remove, edit } = useTodoStore();
  const nameRef = useRef();
  const emailRef = useRef();
  const imageRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const image = imageRef.current.value;
    let todo = {
      name: name,
      email: email,
      image: image,
      id: Date.now(),
    };
    add(todo);
    nameRef.current.value = "";
    emailRef.current.value = "";
    imageRef.current.value = "";
  }

  function handleDelete(id) {
    let conf = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (conf) {
      remove(id);
    }
  }
  function handleEdit(id) {
    let data = {
      name: prompt("yangi ism"),
      id,
      email: prompt("yangi narx"),
    };
    edit(data);
  }
  return (
    <>
      <div className="max-w-[400px] w-full bg-white p-5 rounded-md mb-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
          <input
            required
            className="border border-black rounded-md w-full py-1 px-2 outline-0"
            type="text"
            placeholder="Enter name..."
            ref={nameRef}
          />
          <input
            required
            className="border border-black rounded-md w-full py-1 px-2 outline-0"
            type="email"
            placeholder="Enter email..."
            ref={emailRef}
          />
          <input
            required
            className="border border-black rounded-md w-full py-1 px-2 outline-0"
            type="text"
            placeholder="Enter image url..."
            ref={imageRef}
          />
          <button
            className="bg-green-500 text-white px-2 py-1 rounded-md  tracking-wide cursor-pointer
"
          >
            Add
          </button>
        </form>
      </div>

      <ul>
        {todos.length > 0 &&
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-10 justify-between border-1 border-gray-900 rounded-md p-2  mb-4"
            >
              <div>
                <h3 className="text-lg tracking-wide text-white">
                  {todo.name}
                </h3>
                <h3 className="text-lg tracking-wide text-white">
                  {todo.email}
                </h3>
                <img
                  src={
                    todo.image ? todo.image : "https://picsum.photos/200/300"
                  }
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    handleEdit(todo.id);
                  }}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg text-base font-semibold cursor-pointer active:scale-95"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg text-base font-semibold cursor-pointer active:scale-95"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
export default TodoList;
