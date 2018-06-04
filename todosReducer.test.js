import deepFreeze from 'deep-freeze';
import todosReducer from './todosReducer';

test('on action of type "ADD_TODO", should return new state (array) with a todo (object) added', () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux',
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todosReducer(stateBefore, action)
  ).toEqual(
    stateAfter
  );
});