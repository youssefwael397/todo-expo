"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var react_native_1 = require("react-native");
// import { selectTodos, toggleTodo } from '../redux/todoSlice.js';
var TodoList = function () {
    //   const todos = useSelector(selectTodos);
    var dispatch = (0, react_redux_1.useDispatch)();
    return (<react_native_1.View>
      {todos.map(function (todo) { return (<react_native_1.View key={todo.id}>
          <react_native_1.Text style={{
                textDecorationLine: todo.completed ? 'line-through' : 'none',
            }}>
            {todo.text}
          </react_native_1.Text>
          <react_native_1.Button title={todo.completed ? 'Undo' : 'Complete'}/>
        </react_native_1.View>); })}
    </react_native_1.View>);
};
exports.default = TodoList;
