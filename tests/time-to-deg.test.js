const timeToDeg = require("../src/time-to-deg.js");

test("Valid values", () => {
  expect( timeToDeg(new Date('1995-12-17T00:00:00')) ).toBe(0);
  expect( timeToDeg(new Date('1995-12-17T06:00:00')) ).toBeCloseTo(90);
  expect( timeToDeg(new Date('1995-12-17T12:00:00')) ).toBeCloseTo(180);
  expect( timeToDeg(new Date('1995-12-17T18:00:00')) ).toBeCloseTo(270);
});

test("Invalid values", () => {
  expect( timeToDeg() ).toBe(NaN);
  expect( timeToDeg("asdfsd") ).toBe(NaN);
  expect( timeToDeg(new Date("asdfsd")) ).toBe(NaN);
})
