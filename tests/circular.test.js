const circular = require("../src/utils/circular");

test("Simple usage", () => {
  const initial = [1, 2, 3, 4, 5];
  const expected = [3, 4, 5, 1, 2];

  expect( Array.from(circular(initial, 2)) ).toEqual(expected);
});

test("Ommiting", () => {
  const initial = [1, 2, 3, 4, 5];
  const expected = [4, 5, 1, 2];

  expect( Array.from(circular(initial, 2, { omitFirst: true })) ).toEqual(expected);
});

test("Empty results", () => {
  const initial = [1];
  const expected = [];

  expect( Array.from(circular(initial, 0, { omitFirst: true })) ).toEqual(expected);
});

test("Range checks", () => {
  const initial = [];

  expect( () => Array.from(circular(initial, 0)) ).toThrow(RangeError);
});

test("Non-array call", () => {
  const initial = NaN;

  expect( () => Array.from(circular(initial, 0)) ).toThrow(TypeError);
});
