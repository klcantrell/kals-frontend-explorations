import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { UNIT } from './Model';
import {
  leftValueMsg,
  rightValueMsg,
  leftUnitMsg,
  rightUnitMsg,
} from './Update';

const { div, h1, input, select, option, pre } = hh(h);

function temperatureInput(oninput, value) {
  return input({
    type: 'text',
    className: 'mb2',
    oninput,
    value,
  });
}

function unitSelect(oninput, selectedOption) {
  const options = R.map(opt => {
    return option(
      {
        value: opt,
        selected: selectedOption === opt,
      },
      opt
    );
  }, R.values(UNIT));
  return select({ oninput }, options);
}

function formGroup(handleTemperatureInput, handleUnitSelect, data) {
  return div({ className: 'flex flex-column w-30' }, [
    temperatureInput(handleTemperatureInput, data.value),
    unitSelect(handleUnitSelect, data.unit),
  ]);
}

const equalsDivider = div('=');

function calculatorBody(dispatch, model) {
  return div({ className: 'flex w-100 justify-around items-center' }, [
    formGroup(
      e => dispatch(leftValueMsg(e.target.value)),
      e => dispatch(leftUnitMsg(e.target.value)),
      {
        value: model.leftValue,
        unit: model.leftUnit,
      }
    ),
    equalsDivider,
    formGroup(
      e => dispatch(rightValueMsg(e.target.value)),
      e => dispatch(rightUnitMsg(e.target.value)),
      {
        value: model.rightValue,
        unit: model.rightUnit,
      }
    ),
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    calculatorBody(dispatch, model),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
