import { TokenTypes } from "./lexer";

interface Token {
  type: string;
  value: string;
}

type TokenType = Array<Token>;

type lhs = Token | any;

export default class Parser {
  #tokens: TokenType = [];
  #cursor = 0;

  #at() {
    return this.#tokens[this.#cursor];
  }

  // #peak(n = 1) {
  //   return this.#tokens[this.#cursor + n];
  // }

  #eatToken(tokenType: string) {
    if (tokenType == this.#at().type) {
      this.#cursor++;
    } else {
      throw Error(
        `Expected a token to be of type: ${tokenType} instead recieved: ${
          this.#at().type
        }`
      );
    }
  }
  // Higest precedence
  #parce_factor() {
    if (this.#at().type == TokenTypes.STRING) {
      let literal = { type: "Element", value: this.#at().value };
      this.#eatToken(TokenTypes.STRING);
      return literal;
    }
    if (this.#at().type == TokenTypes.L_PAREN) {
      this.#eatToken(TokenTypes.L_PAREN);
      let expr = this.#parse_expression();
      this.#eatToken(TokenTypes.R_PAREN);

      return expr;
    }
    throw Error(
      `Expected a Paranthesis token or a string input instead recieved: ${JSON.stringify(
        this.#at()
      )}`
    );
  }

  // Parcing AND
  #parse_term() {
    let leftHandSide: lhs = this.#parce_factor();
    while (this.#at().type == TokenTypes.AND) {
      const operator = this.#at().value;
      this.#eatToken(TokenTypes.AND);
      let rhs = this.#parce_factor();
      leftHandSide = {
        type: "BinaryOperator",
        operator,
        leftHandSide,
        rightHandSide: rhs,
      };
    }
    return leftHandSide;
  }

  // Parse OR
  #parse_expression() {
    let leftHandSide: lhs = this.#parse_term();
    while (this.#at().type == TokenTypes.OR) {
      const operator = this.#at().value;
      this.#eatToken(TokenTypes.OR);
      let rhs = this.#parse_term();
      leftHandSide = {
        type: "BinaryOperator",
        operator,
        leftHandSide,
        rightHandSide: rhs,
      };
    }
    return leftHandSide;
  }

  parse() {
    return this.#parse_expression();
  }

  constructor(tokens: TokenType) {
    this.#tokens = tokens;
  }
}
