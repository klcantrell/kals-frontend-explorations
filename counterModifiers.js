export const addCounter = list => {
  return [...list, 0];
};

export const removeCounter = (list, idx) => {
  return [...list.slice(0, idx), ...list.slice(idx + 1)];
};

export const incrementCounter = (list, idx) => {
  return [
    ...list.slice(0, idx), 
    list[idx] + 1,
    ...list.slice(idx + 1)
  ]
};
