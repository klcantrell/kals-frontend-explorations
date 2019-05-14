const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

function update(msg, model) {
  const { SHOW_FORM } = MSGS;

  switch (msg.type) {
    case SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    }
    default: {
      return model;
    }
  }
}

export { MSGS };
export default update;
