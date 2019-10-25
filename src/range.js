module.exports =  function(start, end, step = 1) {
  if (!Number.isInteger(start)) throw new TypeError("Expect to recieve an integer as the first arg of range");
  if (typeof end === "undefined" || end === null) {
    end = start;
    start = 0;
  } else if (!Number.isInteger(end)) {
    throw new TypeError("Expect the 'end' argument of a range to be either an integer or a null");
  }
  if (!Number.isInteger(step) || step <= 0) {
    throw new Error("Negative or zero step isn't supported in ranges");
  }
  const len = Math.ceil((end - start) / step);
  if (len <= 0) return [];
  return Array(len).fill().map((_, idx) => start + (idx * step));
};
