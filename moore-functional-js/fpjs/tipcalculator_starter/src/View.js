import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  MSGS,
  billAmountInputActionCreator,
  billAmountBlurActionCreator,
  tipPercentInputActionCreator,
  tipPercentBlurActionCreator,
} from './Update';
import { toFloatAndRound } from './utils';

const { div, h1, input, label, pre, button, hr, p } = hh(h);

function fieldSet(labelText, value, oninput, onblur) {
  return div(
    {
      className: 'flex flex-column mv2',
    },
    [
      label(labelText),
      input({
        value,
        oninput,
        onblur,
      }),
    ]
  );
}

function basicButton(buttonText, onclick) {
  return button(
    {
      onclick,
    },
    buttonText
  );
}

const divider = hr();

function calculatedField(labelText, value) {
  const formattedValue = `${value}`;
  return div(
    {
      className: 'flex justify-between',
    },
    [
      p({ className: 'mh0 mv1' }, labelText),
      p({ className: 'mh0 mv1' }, formattedValue),
    ]
  );
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    fieldSet(
      'Bill amount',
      model.billAmountInput,
      e => dispatch(billAmountInputActionCreator(e.target.value)),
      e => dispatch(billAmountBlurActionCreator(e.target.value))
    ),
    fieldSet(
      'Tip %',
      model.tipPercentInput,
      e => dispatch(tipPercentInputActionCreator(e.target.value)),
      e => dispatch(tipPercentBlurActionCreator(e.target.value))
    ),
    basicButton('Calculate', () =>
      dispatch({
        type: MSGS.CALCULATE,
      })
    ),
    divider,
    calculatedField('Tip', model.tip),
    calculatedField('Total', model.total),
  ]);
}

export default view;
