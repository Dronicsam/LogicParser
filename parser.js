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
var _Parser_instances, _Parser_tokens, _Parser_cursor, _Parser_at, _Parser_eatToken, _Parser_parce_factor, _Parser_parse_term, _Parser_parse_expression;
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("./lexer");
class Parser {
    parse() {
        return __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_parse_expression).call(this);
    }
    constructor(tokens) {
        _Parser_instances.add(this);
        _Parser_tokens.set(this, []);
        _Parser_cursor.set(this, 0);
        __classPrivateFieldSet(this, _Parser_tokens, tokens, "f");
    }
}
_Parser_tokens = new WeakMap(), _Parser_cursor = new WeakMap(), _Parser_instances = new WeakSet(), _Parser_at = function _Parser_at() {
    return __classPrivateFieldGet(this, _Parser_tokens, "f")[__classPrivateFieldGet(this, _Parser_cursor, "f")];
}, _Parser_eatToken = function _Parser_eatToken(tokenType) {
    var _a;
    if (tokenType == __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).type) {
        __classPrivateFieldSet(this, _Parser_cursor, (_a = __classPrivateFieldGet(this, _Parser_cursor, "f"), _a++, _a), "f");
    }
    else {
        throw Error(`Expected a token to be of type: ${tokenType} instead recieved: ${__classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).type}`);
    }
}, _Parser_parce_factor = function _Parser_parce_factor() {
    if (__classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).type == lexer_1.TokenTypes.STRING) {
        let literal = { type: "Element", value: __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).value };
        __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_eatToken).call(this, lexer_1.TokenTypes.STRING);
        return literal;
    }
    if (__classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).type == lexer_1.TokenTypes.L_PAREN) {
        __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_eatToken).call(this, lexer_1.TokenTypes.L_PAREN);
        let expr = __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_parse_expression).call(this);
        __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_eatToken).call(this, lexer_1.TokenTypes.R_PAREN);
        return expr;
    }
    throw Error(`Expected a Paranthesis token or a string input instead recieved: ${JSON.stringify(__classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this))}`);
}, _Parser_parse_term = function _Parser_parse_term() {
    let leftHandSide = __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_parce_factor).call(this);
    while (__classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).type == lexer_1.TokenTypes.AND) {
        const operator = __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).value;
        __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_eatToken).call(this, lexer_1.TokenTypes.AND);
        let rhs = __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_parce_factor).call(this);
        leftHandSide = {
            type: "BinaryOperator",
            operator,
            leftHandSide,
            rightHandSide: rhs,
        };
    }
    return leftHandSide;
}, _Parser_parse_expression = function _Parser_parse_expression() {
    let leftHandSide = __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_parse_term).call(this);
    while (__classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).type == lexer_1.TokenTypes.OR) {
        const operator = __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_at).call(this).value;
        __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_eatToken).call(this, lexer_1.TokenTypes.OR);
        let rhs = __classPrivateFieldGet(this, _Parser_instances, "m", _Parser_parse_term).call(this);
        leftHandSide = {
            type: "BinaryOperator",
            operator,
            leftHandSide,
            rightHandSide: rhs,
        };
    }
    return leftHandSide;
};
exports.default = Parser;
