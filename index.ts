import Lexer from "./lexer";
import Parser from "./parser";

import * as Util from "util";

import { Convert } from "./convert";

const lexer = new Lexer();

let maths = "word И word2 ИЛИ word3";

const validString = Convert(maths);
const tokens = lexer.tokenize(validString);
const parser = new Parser(tokens);
const ast = parser.parse();
console.log(
  Util.inspect(ast, { showHidden: false, depth: null, colors: true })
);
