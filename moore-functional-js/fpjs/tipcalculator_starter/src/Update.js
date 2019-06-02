import * as R from 'ramda';
import { toFloatAndRound, toFloat } from './utils';

const MSGS = {
  BILL_AMOUNT_INPUT: 'BILL_AMOUNT_INPUT',
  BILL_AMOUNT_BLUR: 'BILL_AMOUNT_BLUR',
  TIP_PERCENT_INPUT: 'TIP_PERCENT_INPUT',
  TIP_PERCENT_BLUR: 'TIP_PERCENT_BLUR',
  CALCULATE: 'CALCULATE',
};

function update(msg, model) {
  switch (msg.type) {
    case MSGS.BILL_AMOUNT_INPUT: {
      return {
        ...model,
        billAmountInput: msg.billAmountInput,
      };
    }
    case MSGS.BILL_AMOUNT_BLUR: {
      return {
        ...model,
        billAmountInput: toFloatAndRound(msg.billAmountInput || 0),
      };
    }
    case MSGS.TIP_PERCENT_INPUT: {
      return {
        ...model,
        tipPercentInput: msg.tipPercentInput,
      };
    }
    case MSGS.TIP_PERCENT_BLUR: {
      return {
        ...model,
        tipPercentInput: toFloatAndRound(msg.tipPercentInput || 0),
      };
    }
    case MSGS.CALCULATE: {
      const billAmountInput = toFloat(model.billAmountInput);
      const tipPercentInput = toFloat(model.tipPercentInput);
      const tip = toFloatAndRound(billAmountInput * (tipPercentInput / 100));
      const total = toFloatAndRound(toFloat(tip) + billAmountInput);
      return {
        ...model,
        tip,
        total,
      };
    }
    default: {
      return model;
    }
  }
}

function billAmountInputActionCreator(billAmountInput) {
  return {
    type: MSGS.BILL_AMOUNT_INPUT,
    billAmountInput,
  };
}

function billAmountBlurActionCreator(billAmountInput) {
  return {
    type: MSGS.BILL_AMOUNT_BLUR,
    billAmountInput,
  };
}

function tipPercentInputActionCreator(tipPercentInput) {
  return {
    type: MSGS.TIP_PERCENT_INPUT,
    tipPercentInput,
  };
}

function tipPercentBlurActionCreator(tipPercentInput) {
  return {
    type: MSGS.TIP_PERCENT_BLUR,
    tipPercentInput,
  };
}

export {
  MSGS,
  billAmountInputActionCreator,
  billAmountBlurActionCreator,
  tipPercentInputActionCreator,
  tipPercentBlurActionCreator,
};
export default update;
