"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Lexer_instances, _Lexer_stream, _Lexer_cursor, _Lexer_current, _Lexer_createToken;
Object.defineProperty(exports, "__esModule", { value: true });
const TokenTypes = {
    PLUS: "PLUS",
    MULTIPLY: "MULTIPLY",
    STRING: "STRING",
    EOF: "EOF",
};
function isValidString(char = "") {
    return (char.charCodeAt(0) !== 40 &&
        char.charCodeAt(0) !== 41 &&
        char.charCodeAt(0) !== 32 &&
        char.charCodeAt(0) !== 43 &&
        char.charCodeAt(0) !== 42);
}
class Lexer {
    constructor() {
        _Lexer_instances.add(this);
        _Lexer_stream.set(this, "");
        _Lexer_cursor.set(this, 0);
    }
    tokenize(input = "") {
        __classPrivateFieldSet(this, _Lexer_stream, input, "f");
        __classPrivateFieldSet(this, _Lexer_cursor, 0, "f");
        const tokens = [];
        while (__classPrivateFieldGet(this, _Lexer_cursor, "f") < __classPrivateFieldGet(this, _Lexer_stream, "f").length) {
            switch (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_current).call(this)) {
                case " ":
                case "\n":
                case "\t":
                    break;
                case "+":
                    tokens.push({ type: TokenTypes.PLUS, value: "+" });
                    break;
                case "*":
                    tokens.push({ type: TokenTypes.MULTIPLY, value: "*" });
                default:
                    // Checking for
                    break;
            }
        }
    }
}
_Lexer_stream = new WeakMap(), _Lexer_cursor = new WeakMap(), _Lexer_instances = new WeakSet(), _Lexer_current = function _Lexer_current() {
    return __classPrivateFieldGet(this, _Lexer_stream, "f")[__classPrivateFieldGet(this, _Lexer_cursor, "f")];
}, _Lexer_createToken = function _Lexer_createToken() { };
exports.default = Lexer;
