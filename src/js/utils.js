const $on = (target, event, handler) => {
  return target.addEventListener(event, handler);
};

const $hashTo = (hash) => {
	window.location.hash = hash;
}

const html = (literals, ...customs) => {
  let result = '';
  customs.forEach((custom, i) => {
    let lit = literals[i];
    if (Array.isArray(custom)) {
      custom = custom.join('');
    }
    result += lit;
    result += custom;
  });
  result += literals[literals.length - 1];
  return result;
};

const $math = {
  round: function(num) {
    return (Math.round(num * 100000) / 100000);
  }
}

export { $on, $hashTo, html, $math };