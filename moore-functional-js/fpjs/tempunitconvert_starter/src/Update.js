import * as R from 'ramda';

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
      return {
        ...model,
        sourceLeft: true,
        leftValue: leftValueInt,
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
      return {
        ...model,
        sourceLeft: false,
        rightValue: rightValueInt,
      };
    }
    case MSGS.LEFT_UNIT_OPTION: {
      const { leftUnit } = msg;
      return {
        ...model,
        sourceLeft: true,
        leftUnit,
      };
    }
    case MSGS.RIGHT_UNIT_OPTION: {
      const { rightUnit } = msg;
      return {
        ...model,
        sourceLeft: false,
        rightUnit,
      };
    }
    default: {
      return model;
    }
  }
}

export { leftValueMsg, rightValueMsg, leftUnitMsg, rightUnitMsg };
export default update;
