import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");

  //reactのHooksの書き方でstateに持つよう書く
  //useStateを空の配列で持っておく→空の配列に何が入るかを型指定した。今回は自分で作ったTodo[]の三つのプロパティを更新する
  const [todos, setTodos] = useState<Todo[]>([]); //stateに焼く Todoの配列に持っておく

  //三つのプロパティを設定
  type Todo = {
    //todoの型を用意する
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //作成ボタンを押した際にページ全体をリロードしないようにする

    //新しいtoDoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length, //配列の長さでIDを指定
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    // console.log(newTodo);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo; //todoのinputValueを更新した状態でtodoをnewTodoに返す
    });

    setTodos(newTodo);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked; //反転させる
      }
      return todo; //todoのinputValueを更新した状態でtodoをnewTodoに返す
    });

    setTodos(newTodo);
  };

  const handleDeleted = (id: number) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    // 削除後、再度マップし、各TODOのIDを再設定する
    const updatedTodos = newTodo.map((todo, index) => ({ ...todo, id: index }));
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todolist with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        {/* タスク設定が完了したら */}
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input
                type="checkBox"
                onChange={(e) => handleChecked(todo.id, todo.checked)} //どのIDに対して判定させるか
              />
              <button onClick={(e) => handleDeleted(todo.id)}>消去</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
