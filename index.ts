import Lexer from "./lexer";
import Parser from "./parser";
import ConverJSON from "./parseObject";
import { Convert } from "./convert";
import * as Util from "util";

export function createTree(str: string) {
  const validString = Convert(str);
  const lexer = new Lexer();
  if (validString) {
    const tokens = lexer.tokenize(validString);
    const parser = new Parser(tokens);
    const syntaxedTree = parser.parse();
    return syntaxedTree;
  } else {
    throw Error("No logic expressions was found");
  }
}

// function objForEach<T>(obj: T, f: (k: keyof T, v: T[keyof T]) => void): void {
//   for (let k in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, k)) {
//       f(k, obj[k]);
//     }
//   }
// }

const test1 = "word ИЛИ (it И (жопа И нежопа) ИЛИ then) ИЛИ word2";
console.log(test1);
const ast = createTree(test1);
const converter = new ConverJSON(ast);
console.log(converter.test());
// console.log(
//   Util.inspect(ast, { showHidden: false, depth: null, colors: true })
// );

// function iterateAttributesAndFormHTMLLabels(o: any) {
//   var s = "";
//   for (var a in o) {
//     if (typeof o[a] == "object") {
//       s += "<label><font color=green>" + a + ":</font></label><br />";
//       s += iterateAttributesAndFormHTMLLabels(o[a]);
//     } else {
//       s +=
//         "<label>" + a + ": <font color=blue>" + o[a] + "</font></label><br />";
//     } //end if
//   } //end for
//   return s;
// } //end function

// var html = iterateAttributesAndFormHTMLLabels(ast);
// console.log(html);
// // objForEach(ast, (k, v) => {
// //   console.log("key:", k, ",", "value", v);
// // });
