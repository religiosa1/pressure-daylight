const onKbdField = function (cb, fieldName, fieldValue, {
  preventDefault = false,
  stopPropagation = false,
} = {}) {
  if (typeof cb !== "function") {
    throw new TypeError("Expecting to get a callback to decorate as the first arg!");
  }
  if (typeof fieldName !== "string" || !fieldName) {
    throw new TypeError("Expecting to get the name of the event field to check!");
  }
  return function(e) {
    if (!e || typeof e[fieldName] === "undefined") return;
    if (Array.isArray(fieldValue)) {
      if (fieldValue.every(i => i !== e[fieldName])) return;
    } else {
      if (fieldValue !== e[fieldName]) return;
    }
    if (preventDefault && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (stopPropagation && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    return cb.call(this, arguments);
  }
}

module.exports = {
  onKbdField,
  onKbdKey(cb, ...keys) { return onKbdField.call(this, cb, "key", ...keys); },
  onKbdKeycode(cb, ...keycodes) { return onKbdField.call(this, cb, "keycode", ...keycodes); },
  onKbdCode(cb, ...codes) { return onKbdField.call(this, cb, "code", ...codes); },
}
