import deepFreeze from 'deep-freeze';
import { toggleTodo } from './todosModifiers';

test('should return a new todo object with its "completed" boolean flipped', () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  deepFreeze(todoBefore);

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
})