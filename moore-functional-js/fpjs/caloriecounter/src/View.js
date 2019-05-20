import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';
import {
  showFormMsg,
  mealInputMsg,
  caloriesInputMsg,
  saveMealMsg,
  deleteMealMsg,
  editMealMsg,
} from './Update';

const {
  pre,
  div,
  h1,
  button,
  form,
  label,
  input,
  table,
  tbody,
  td,
  tr,
  th,
  thead,
  strong,
  i,
} = hh(h);

function fieldSet(labelText, inputValue, oninput) {
  return div([
    label({ className: 'db mb1' }, labelText),
    input({
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput,
    }),
  ]);
}

function buttonSet(dispatch) {
  return div([
    button(
      {
        className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
        type: 'submit',
      },
      'Save'
    ),
    button(
      {
        className: 'f3 pv2 ph3 bn bg-light-gray dim',
        type: 'button',
        onclick: () => dispatch(showFormMsg(false)),
      },
      'Cancel'
    ),
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if (showForm) {
    return form(
      {
        className: 'w-100 mv2',
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveMealMsg);
        },
      },
      [
        fieldSet('Meal', description, e =>
          dispatch(mealInputMsg(e.target.value))
        ),
        fieldSet('Calories', calories || '', e =>
          dispatch(caloriesInputMsg(e.target.value))
        ),
        buttonSet(dispatch),
      ]
    );
  }
  return button(
    {
      className: 'f3 pv2 ph3 bg-blue white bn',
      onclick: () => dispatch(showFormMsg(true)),
    },
    'Add Meal'
  );
}

function cell(tag, className, content) {
  return tag({ className }, content);
}

const curriedCell = R.curry(cell);

const basicRowCell = curriedCell(td);
const tableHeaderCell = curriedCell(th);

function mealRow(dispatch, className, meal) {
  return tr({ className }, [
    basicRowCell('pa2', meal.description),
    basicRowCell('pa2 tr', meal.calories),
    basicRowCell('pa2 tr', [
      i({
        className: 'ph1 fa fa-trash-o pointer',
        onclick: () => dispatch(deleteMealMsg(meal.id)),
      }),
      i({
        className: 'ph1 fa fa-pencil-square-o pointer',
        onclick: () => dispatch(editMealMsg(meal.id)),
      }),
    ]),
  ]);
}

function totalRow(meals) {
  const total = R.compose(
    String,
    val => val || '',
    R.reduce((acc, meal) => {
      return acc + meal.calories;
    }, 0)
  );

  return tr({ className: 'bt b' }, [
    basicRowCell('pa2 tr', 'Total'),
    basicRowCell('pa2 tr', total(meals)),
    basicRowCell('', ''),
  ]);
}

function mealsBody(dispatch, className, meals) {
  const rows = R.map(R.partial(mealRow, [dispatch, 'stripe-dark']), meals);
  const rowsWithTotal = [...rows, totalRow(meals)];
  return tbody({ className }, rowsWithTotal);
}

const tableHeader = thead(
  tr([
    tableHeaderCell('pa2 tl', 'Meal'),
    tableHeaderCell('pa2 tr', 'Calories'),
    tableHeaderCell('', ''),
  ])
);

function tableView(dispatch, meals) {
  return meals.length === 0
    ? div({ className: 'mv2 i black-50' }, 'No meals to display...')
    : table({ className: 'mv2 w-100 collapse' }, [
        tableHeader,
        mealsBody(dispatch, '', meals),
      ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Calorie Counter'),
    formView(dispatch, model),
    tableView(dispatch, model.meals),
    // pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
