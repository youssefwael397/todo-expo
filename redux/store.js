"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var todoSlice_1 = __importDefault(require("./todoSlice"));
var rootReducer = (0, toolkit_1.combineReducers)({
    tasks: todoSlice_1.default,
});
var store = (0, toolkit_1.configureStore)({
    reducer: rootReducer,
});
exports.default = store;
