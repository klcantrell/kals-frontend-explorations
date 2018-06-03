import deepFreeze from 'deep-freeze';
import { addCounter, removeCounter } from './counterModifiers';

test('returns a new copy of an array with an item added to it', () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(addCounter(listBefore)).toEqual(listAfter);
});

test('returns a new copy of an array with an item removed from it', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
});
