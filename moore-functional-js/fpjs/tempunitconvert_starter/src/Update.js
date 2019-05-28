import * as R from 'ramda';
import { UNIT } from './Model';

const toInt = R.pipe(
  parseInt,
  R.defaultTo(0)
);

const MSGS = {
  LEFT_VALUE_INPUT: 'LEFT_VALUE_INPUT',
  RIGHT_VALUE_INPUT: 'RIGHT_VALUE_INPUT',
  LEFT_UNIT_OPTION: 'LEFT_UNIT_OPTION',
  RIGHT_UNIT_OPTION: 'RIGHT_UNIT_OPTION',
};

function leftValueMsg(leftValue) {
  return {
    type: MSGS.LEFT_VALUE_INPUT,
    leftValue,
  };
}

function rightValueMsg(rightValue) {
  return {
    type: MSGS.RIGHT_VALUE_INPUT,
    rightValue,
  };
}

function leftUnitMsg(leftUnit) {
  return {
    type: MSGS.LEFT_UNIT_OPTION,
    leftUnit,
  };
}

function rightUnitMsg(rightUnit) {
  return {
    type: MSGS.RIGHT_UNIT_OPTION,
    rightUnit,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_VALUE_INPUT: {
      const { leftValue } = msg;
      if (leftValue === '') {
        return {
          ...model,
          sourceLeft: true,
          leftValue: '',
          rightValue: '',
        };
      }
      const leftValueInt = toInt(leftValue);
      const rightValueInt = convertTemperature(
        model.leftUnit,
        model.rightUnit,
        leftValueInt
      );

      return {
        ...model,
        sourceLeft: true,
        leftValue: leftValueInt,
        rightValue: rightValueInt,
      };
    }
    case MSGS.RIGHT_VALUE_INPUT: {
      const { rightValue } = msg;
      if (rightValue === '') {
        return {
          ...model,
          sourceLeft: false,
          leftValue: '',
          rightValue: '',
        };
      }
      const rightValueInt = toInt(rightValue);
      const leftValueInt = convertTemperature(
        model.rightUnit,
        model.leftUnit,
        rightValueInt
      );

      return {
        ...model,
        sourceLeft: false,
        leftValue: leftValueInt,
        rightValue: rightValueInt,
      };
    }
    case MSGS.LEFT_UNIT_OPTION: {
      const { leftUnit } = msg;
      const rightValueInt = convertTemperature(
        leftUnit,
        model.rightUnit,
        model.leftValue
      );
      return {
        ...model,
        sourceLeft: true,
        leftUnit,
        rightValue: rightValueInt,
      };
    }
    case MSGS.RIGHT_UNIT_OPTION: {
      const { rightUnit } = msg;
      const leftValueInt = convertTemperature(
        rightUnit,
        model.leftUnit,
        model.rightValue
      );
      return {
        ...model,
        sourceLeft: false,
        rightUnit,
        leftValue: leftValueInt,
      };
    }
    default: {
      return model;
    }
  }
}

function round(num) {
  return Math.round(num * 10) / 10;
}

function convertTemperature(fromUnit, toUnit, fromValue) {
  const convertFn = R.pathOr(R.identity, [fromUnit, toUnit], UnitConverstions);

  return R.pipe(
    convertFn,
    round
  )(fromValue);
}

function FtoC(temp) {
  return (5 / 9) * (temp - 32);
}

function CtoF(temp) {
  return (9 / 5) * temp + 32;
}

function KtoC(temp) {
  return temp - 273.15;
}

function CtoK(temp) {
  return temp + 273.15;
}

const FtoK = R.pipe(
  FtoC,
  CtoK
);
const KtoF = R.pipe(
  KtoC,
  CtoF
);

const UnitConverstions = {
  [UNIT.CELSIUS]: {
    [UNIT.FAHRENHEIT]: CtoF,
    [UNIT.KELVIN]: CtoK,
  },
  [UNIT.FAHRENHEIT]: {
    [UNIT.CELSIUS]: FtoC,
    [UNIT.KELVIN]: FtoK,
  },
  [UNIT.KELVIN]: {
    [UNIT.CELSIUS]: KtoC,
    [UNIT.FAHRENHEIT]: KtoF,
  },
};

export { leftValueMsg, rightValueMsg, leftUnitMsg, rightUnitMsg };
export default update;
