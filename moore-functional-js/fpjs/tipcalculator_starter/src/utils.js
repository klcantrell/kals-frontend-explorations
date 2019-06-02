import * as R from 'ramda';

function toFloat(string) {
  return Number.parseFloat(string);
}

function toFixedFloat(number) {
  return Number.parseFloat(number).toFixed(2);
}

function round(number) {
  return Math.round(number * 100) / 100;
}

const toFloatAndRound = value => {
  return R.compose(
    toFixedFloat,
    round,
    toFloat
  )(value);
};

export { toString, toFloat, round, toFloatAndRound };
