import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { addCity, cityInput, deleteCity, clearError } from './Update';

const { div, h1, pre, form, label, input, button, p, h6, ul, li, i } = hh(h);

function addCityForm(dispatch, cityInput) {
  return form({ onsubmit: e => handleAddCity(e, dispatch) }, [
    label({ for: 'location', className: 'db f6 b mb2' }, 'Location'),
    input({
      id: 'location',
      autocomplete: 'off',
      className: 'pa2 w-60 mr1',
      oninput: e => handleCityInput(e, dispatch),
      value: cityInput,
    }),
    button({ className: 'pv2 ph3 br1' }, 'Add'),
  ]);
}

function cityRowElement(className, label, value) {
  return div({ className }, [
    h6({ className: 'f7 ma0' }, label),
    p({ className: 'ma0' }, value),
  ]);
}

function cityRow(dispatch, city) {
  const { name, currentTemp, lowTemp, highTemp, id } = city;
  return li(
    { className: 'pa3 bb b--light-silver flex justify-between relative' },
    [
      cityRowElement('w-60 tl', 'Location', name),
      cityRowElement('w-10 tc', 'Temp', currentTemp),
      cityRowElement('w-10 tc', 'Low', lowTemp),
      cityRowElement('w-10 tc', 'High', highTemp),
      removeButton(() => dispatch(deleteCity(id))),
    ]
  );
}

function cityList(dispatch, cities) {
  const cityRowWithDispatch = R.partial(cityRow, [dispatch]);
  return ul(
    { className: 'list pl0 ml0 ba b--light-silver br' },
    R.map(cityRowWithDispatch, cities)
  );
}

function error(message, clearErrorHandler) {
  return !R.isNil(message)
    ? div({ className: 'ba b--red bg-washed-red pa2' }, [
        message,
        removeButton(clearErrorHandler),
      ])
    : null;
}

function removeButton(onclick) {
  return i({
    className: 'absolute top-0 right-0 mt1 mr1 fa fa-remove pointer black-40',
    onclick,
  });
}

function view(dispatch, model) {
  return div({ className: 'mw6 center relative' }, [
    error(model.errorMessage, () => dispatch(clearError)),
    h1({ className: 'f2 pv2 bb' }, 'Weather'),
    addCityForm(dispatch, model.cityInput),
    cityList(dispatch, model.cities),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

function handleAddCity(e, dispatch) {
  e.preventDefault();
  dispatch(addCity);
}

function handleCityInput(e, dispatch) {
  dispatch(cityInput(e.target.value));
}

export default view;
