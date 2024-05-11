export const TokenTypes = {
  OR: "OR",
  AND: "AND",
  STRING: "STRING",
  L_PAREN: "L_PAREN",
  R_PAREN: "R_PAREN",
  EOF: "EOF",
};

function isValidString(char = "") {
  return (
    char.charCodeAt(0) !== 32 &&
    char.charCodeAt(0) !== 43 &&
    char.charCodeAt(0) !== 42 &&
    ((char.charCodeAt(0) >= 1040 && char.charCodeAt(0) <= 1103) ||
      (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) ||
      (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) ||
      (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57))
  );
}

export default class Lexer {
  #stream = "";
  #cursor = 0;

  constructor() {}

  #at() {
    return this.#stream[this.#cursor];
  }
  #createToken() {}
  tokenize(input = "") {
    this.#stream = input;
    this.#cursor = 0;
    const tokens = [];
    while (this.#cursor < this.#stream.length) {
      switch (this.#at()) {
        case " ":
        case "\n":
        case "\t":
          break;
        case "+":
          tokens.push({ type: TokenTypes.OR, value: "OR" });
          break;
        case "*":
          tokens.push({ type: TokenTypes.AND, value: "AND" });
          break;
        case "(":
          tokens.push({ type: TokenTypes.L_PAREN, value: "(" });
          break;
        case ")":
          tokens.push({ type: TokenTypes.R_PAREN, value: ")" });
          break;
        default:
          // Checking for valid string
          if (isValidString(this.#at())) {
            let str = "";
            // word1 + word2 + word3
            while (
              this.#cursor < this.#stream.length &&
              isValidString(this.#at())
            ) {
              str += this.#at();
              this.#cursor++;
            }
            tokens.push({ type: TokenTypes.STRING, value: str });
            this.#cursor--;
          } else {
            throw new Error(
              `This symbol is not accepted "${this.#stream[this.#cursor]}"`
            );
          }
          break;
      }
      this.#cursor++;
    }
    tokens.push({ type: TokenTypes.EOF, value: "EOF" });
    return tokens;
  }
}
