const TokenTypes = {
  PLUS: "PLUS",
  MULTIPLY: "MULTIPLY",
  STRING: "STRING",
  EOF: "EOF",
};

function isValidString(char = "") {
  return (
    char.charCodeAt(0) !== 40 &&
    char.charCodeAt(0) !== 41 &&
    char.charCodeAt(0) !== 32 &&
    char.charCodeAt(0) !== 43 &&
    char.charCodeAt(0) !== 42
  );
}

export default class Lexer {
  #stream = "";
  #cursor = 0;
  #current() {
    return this.#stream[this.#cursor];
  }
  #createToken() {}
  tokenize(input = "") {
    this.#stream = input;
    this.#cursor = 0;
    const tokens = [];
    while (this.#cursor < this.#stream.length) {
      switch (this.#current()) {
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
