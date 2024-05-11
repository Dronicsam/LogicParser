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
var _Lexer_instances, _Lexer_stream, _Lexer_cursor, _Lexer_at, _Lexer_createToken;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTypes = void 0;
exports.TokenTypes = {
    OR: "OR",
    AND: "AND",
    STRING: "STRING",
    L_PAREN: "L_PAREN",
    R_PAREN: "R_PAREN",
    EOF: "EOF",
};
function isValidString(char = "") {
    return (char.charCodeAt(0) !== 32 &&
        char.charCodeAt(0) !== 43 &&
        char.charCodeAt(0) !== 42 &&
        ((char.charCodeAt(0) >= 1040 && char.charCodeAt(0) <= 1103) ||
            (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) ||
            (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) ||
            (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57)));
}
class Lexer {
    constructor() {
        _Lexer_instances.add(this);
        _Lexer_stream.set(this, "");
        _Lexer_cursor.set(this, 0);
    }
    tokenize(input = "") {
        var _a, _b, _c;
        __classPrivateFieldSet(this, _Lexer_stream, input, "f");
        __classPrivateFieldSet(this, _Lexer_cursor, 0, "f");
        const tokens = [];
        while (__classPrivateFieldGet(this, _Lexer_cursor, "f") < __classPrivateFieldGet(this, _Lexer_stream, "f").length) {
            switch (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_at).call(this)) {
                case " ":
                case "\n":
                case "\t":
                    break;
                case "+":
                    tokens.push({ type: exports.TokenTypes.OR, value: "OR" });
                    break;
                case "*":
                    tokens.push({ type: exports.TokenTypes.AND, value: "AND" });
                    break;
                case "(":
                    tokens.push({ type: exports.TokenTypes.L_PAREN, value: "(" });
                    break;
                case ")":
                    tokens.push({ type: exports.TokenTypes.R_PAREN, value: ")" });
                    break;
                default:
                    // Checking for valid string
                    if (isValidString(__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_at).call(this))) {
                        let str = "";
                        // word1 + word2 + word3
                        while (__classPrivateFieldGet(this, _Lexer_cursor, "f") < __classPrivateFieldGet(this, _Lexer_stream, "f").length &&
                            isValidString(__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_at).call(this))) {
                            str += __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_at).call(this);
                            __classPrivateFieldSet(this, _Lexer_cursor, (_a = __classPrivateFieldGet(this, _Lexer_cursor, "f"), _a++, _a), "f");
                        }
                        tokens.push({ type: exports.TokenTypes.STRING, value: str });
                        __classPrivateFieldSet(this, _Lexer_cursor, (_b = __classPrivateFieldGet(this, _Lexer_cursor, "f"), _b--, _b), "f");
                    }
                    else {
                        throw new Error(`This symbol is not accepted "${__classPrivateFieldGet(this, _Lexer_stream, "f")[__classPrivateFieldGet(this, _Lexer_cursor, "f")]}"`);
                    }
                    break;
            }
            __classPrivateFieldSet(this, _Lexer_cursor, (_c = __classPrivateFieldGet(this, _Lexer_cursor, "f"), _c++, _c), "f");
        }
        tokens.push({ type: exports.TokenTypes.EOF, value: "EOF" });
        return tokens;
    }
}
_Lexer_stream = new WeakMap(), _Lexer_cursor = new WeakMap(), _Lexer_instances = new WeakSet(), _Lexer_at = function _Lexer_at() {
    return __classPrivateFieldGet(this, _Lexer_stream, "f")[__classPrivateFieldGet(this, _Lexer_cursor, "f")];
}, _Lexer_createToken = function _Lexer_createToken() { };
exports.default = Lexer;
