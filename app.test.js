import { counter } from './app';

test('action type "INCREMENT" should increase state count value by 1', () => {
  expect(counter({count: 0}, {type: 'INCREMENT'}).count).toEqual(1)
})

test('action type "INCREMENT" should increase state count value by 1', () => {
  expect(counter({count: 1}, {type: 'INCREMENT'}).count).toEqual(2)
})

test('action type "DECREMENT" should decrease state count value by 1', () => {
  expect(counter({count: 2}, {type: 'DECREMENT'}).count).toEqual(1)
})

test('an undefined action type should return the current state', () => {
  expect(counter({count: 1}, {type: 'SOME_UNDEFINED_ACTION'}).count).toEqual(1)
})

test('if previous state is undefined, the initial state should be used by default', () => {
  expect(counter(undefined, {type: 'INCREMENT'}).count).toEqual(1)
})