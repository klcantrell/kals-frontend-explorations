const $on = (target, event, handler) => {
  return target.addEventListener(event, handler);
};

const $hashTo = (hash) => {
	window.location.hash = hash;
}

export { $on, $hashTo };