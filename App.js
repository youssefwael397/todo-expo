"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var store_1 = __importDefault(require("./redux/store"));
var react_native_1 = require("react-native"); // Import StyleSheet and View from react-native
var TodoList_js_1 = __importDefault(require("./components/TodoList.js"));
// import TodoInput from './components/TodoInput';
function App() {
    return (<react_redux_1.Provider store={store_1.default}>
      <react_native_1.View>
        <TodoList_js_1.default />
        {/* <TodoInput /> */}
      </react_native_1.View>
    </react_redux_1.Provider>);
}
exports.default = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
