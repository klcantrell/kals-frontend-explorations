import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description,
  };
}

export const saveMealMsg = {
  type: MSGS.SAVE_MEAL,
};

export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories,
  };
}

function update(msg, model) {
  const { SHOW_FORM, MEAL_INPUT, CALORIES_INPUT, SAVE_MEAL } = MSGS;

  switch (msg.type) {
    case SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    }
    case MEAL_INPUT: {
      const { description } = msg;
      return {
        ...model,
        description,
      };
    }
    case CALORIES_INPUT: {
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(msg.calories);
      return {
        ...model,
        calories,
      };
    }
    case SAVE_MEAL: {
      return add(msg, model);
    }
    default: {
      return model;
    }
  }
}

function add(msg, model) {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories };
  const meals = [...model.meals, meal];
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false,
  };
}

export { MSGS };
export default update;
