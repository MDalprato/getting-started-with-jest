const multiplyByThree = require("../src/multiplyByThree");

describe("Multiply by three function", () => {
  test("it should return a multiply of three", () => {
    const input = 1;
    const output = 3;

    const input_2 = 10;
    const output_2 = 30;

    expect(multiplyByThree(input)).toEqual(output);
    expect(multiplyByThree(input_2)).toEqual(output_2);

  });
});

