import { toFloatAndRound } from './utils';

const initModel = {
  billAmountInput: toFloatAndRound(10),
  tipPercentInput: toFloatAndRound(15),
  tip: toFloatAndRound(1.5),
  total: toFloatAndRound(11.5),
};

export default initModel;
