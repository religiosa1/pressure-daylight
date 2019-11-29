const range = require("../src/functions/range");

test("Invalid values", () => {
  expect( () => range("asdfasdf").next() ).toThrow(TypeError);
  expect( () =>  range(3, "asdfdf").next() ).toThrow(TypeError);
  expect( () =>  range(3, 10, -1).next() ).toThrow(Error);
  expect( () =>  range(3, 10, 0).next() ).toThrow(Error);
  expect( Array.from(range(5, 1)) ).toEqual([]);
});

test("Simple usage", () => {
  expect( Array.from(range(3)) ).toEqual([0, 1, 2]);
});
test("Start value", () => {
  expect( Array.from(range(1, 4)) ).toEqual([1, 2, 3]);
});
test("Step", () => {
  expect( Array.from(range(1, 11, 3)) ).toEqual([1, 4, 7, 10]);
});
