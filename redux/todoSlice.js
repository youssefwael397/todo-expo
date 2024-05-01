"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.addTask = exports.taskSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.taskSlice = (0, toolkit_1.createSlice)({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: function (state, _a) {
            var payload = _a.payload;
            var title = payload.title;
            var newTask = {
                title: title
            };
            state.push(newTask);
        },
        deleteTask: function (state, action) {
            console.log(action.payload.id);
            console.log(state);
            return state.filter(function (item) { return item.id !== action.payload.id; });
        },
    },
});
exports.addTask = (_a = exports.taskSlice.actions, _a.addTask), exports.deleteTask = _a.deleteTask;
exports.default = exports.taskSlice.reducer;
