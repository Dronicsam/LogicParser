// (word1 ИЛИ (word2 И word3))
// {
//   type: 'BinaryOperator',
//   operator: 'OR',
//   leftHandSide: { type: 'Element', value: 'word1' },
//   rightHandSide: {
//     type: 'BinaryOperator',
//     operator: 'AND',
//     leftHandSide: { type: 'Element', value: 'word2' },
//     rightHandSide: { type: 'Element', value: 'word3' }
//   }
// }
interface Token {
  type: string;
  value: string;
}

interface ParsedJSON {
  type: string;
  operator: string;
  leftHandSide: Token | ParsedJSON;
  rightHandSide: Token | ParsedJSON;
}

export default class ConverJSON {
  #jsontoparse;
  constructor(obj: ParsedJSON) {
    this.#jsontoparse = obj;
  }
  test() {
    return this.#jsontoparse;
  }
}
