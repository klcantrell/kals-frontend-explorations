import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { UNIT } from './Model';

const { div, h1, input, select, option, pre } = hh(h);

function temperatureInput(value, oninput) {
  return input(
    {
      className: 'mb2',
      oninput,
    },
    value
  );
}

function unitSelect(selectedOption, oninput) {
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

function formGroup(dispatch, data) {
  return div({ className: 'flex flex-column w-30' }, [
    temperatureInput(data.value, e => console.log(e.target.value)),
    unitSelect(data.unit, e => console.log(e.target.value)),
  ]);
}

const equalsDivider = div('=');

function calculatorBody(dispatch, model) {
  return div({ className: 'flex w-100 justify-around items-center' }, [
    formGroup(dispatch, { value: model.leftValue, unit: model.leftUnit }),
    equalsDivider,
    formGroup(dispatch, { value: model.rightValue, unit: model.rightUnit }),
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
