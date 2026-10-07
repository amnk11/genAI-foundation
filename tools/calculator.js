export async function calculator(operation, a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Both a and b should be numbers";
  }

  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) return "Can't divide by zero";
      return a / b;
    default:
      return "Unsupported operation. please use only +, -, *, /";
  }
}


export const calculateTool = {
  type: "function",
  function: {
    name: "calculator",
    description:
      "A simple calculator function that performs basic arithmetic operations.",
    parameters: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["+", "-", "*", "/"],
          description: "The arithmetic operation to perform.",
        },
        a: {
          type: "number",
          description: "The first number.",
        },
        b: {
          type: "number",
          description: "The second number.",
        },
      },
      required: ["operation", "a", "b"],
      additionalProperties: false,
    },
  },
};
