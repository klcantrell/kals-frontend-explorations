const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (const rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      case 'hasValue':
        isValid = isValid && hasValueValidator(val);
        break;
      default:
        isValid = false;
    }
  }
  return isValid;
};

const emailValidator = val => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  );
};

const hasValueValidator = val => {
  return val.trim() !== '';
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const equalToValidator = (val, checkVal) => {
  return val === checkVal;
};

export default validate;
