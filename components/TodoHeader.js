"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_native_1 = require("react-native");
var todoSlice_1 = require("../redux/todoSlice");
var TodoHeader = function () {
    var _a = (0, react_1.useState)(''), todo = _a[0], setTodo = _a[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var onSubmitTask = function () {
        if (todo.trim().length === 0) {
            react_native_1.Alert.alert('You need to enter a task');
            setTodo('');
            return;
        }
        dispatch((0, todoSlice_1.addTask)({
            task: todo,
        }));
        setTodo('');
    };
    return (<react_native_1.View>
      <react_native_1.Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
        }}>
        Todo List
      </react_native_1.Text>
      <react_native_1.View style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        {/* TextInput */}
        <react_native_1.TextInput style={{
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            margin: 10,
            width: '90%',
            borderRadius: 5,
        }} placeholder="Add todo" onChangeText={setTodo} value={todo}/>
        {/* Button */}
        <react_native_1.TouchableOpacity style={{
            backgroundColor: 'black',
            padding: 10,
            margin: 10,
            width: '90%',
            borderRadius: 5,
            alignItems: 'center',
        }} onPress={onSubmitTask}>
          <react_native_1.Text style={{ color: 'white' }}>Add</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = TodoHeader;
var styles = react_native_1.StyleSheet.create({});
