const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
};

function update(msg, model) {
  const { SHOW_FORM } = MSGS;

  switch (msg) {
    case SHOW_FORM: {
      return { ...model, showForm: true };
    }
    default: {
      return model;
    }
  }
}

export { MSGS };
export default update;
