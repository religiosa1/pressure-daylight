const range = require("../src/functions/range.js");

test("Invalid values", () => {
  expect( () => range("asdfasdf") ).toThrow(TypeError);
  expect( () =>  range(3, "asdfdf") ).toThrow(TypeError);
  expect( () =>  range(3, 10, -1) ).toThrow(Error);
  expect( () =>  range(3, 10, 0) ).toThrow(Error);
  expect( range(5, 1) ).toEqual([]);
});

test("Simple usage", () => {
  expect( range(3) ).toEqual([0, 1, 2]);
});
test("Start value", () => {
  expect( range(1, 4) ).toEqual([1, 2, 3]);
});
test("Step", () => {
  expect( range(1, 11, 3) ).toEqual([1, 4, 7, 10]);
});
