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

test('on action of type "TOGGLE_TODO", should return new state (array) with a todo (object) of a certain "id" value to have its "completed" value toggled', () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Learn React',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1,
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Learn React',
      completed: true
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