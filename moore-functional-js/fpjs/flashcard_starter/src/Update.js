import * as R from 'ramda';

const MSGS = {
  CREATE_CARD: 'CARD_CARD',
  TOGGLE_EDIT_CARD: 'TOGGLE_EDIT_CARD',
  CARD_QUESTION_TEXT_INPUT: 'CARD_QUESTION_TEXT_INPUT',
  CARD_ANSWER_TEXT_INPUT: 'CARD_ANSWER_TEXT_INPUT',
  DELETE_CARD: 'DELETE_CARD',
  TOGGLE_ANSWER_HIDDEN: 'TOGGLE_ANSWER_HIDDEN',
};

const createCard = {
  type: MSGS.CREATE_CARD,
};

function cardQuestionTextInput(id, questionText) {
  return {
    type: MSGS.CARD_QUESTION_TEXT_INPUT,
    id,
    questionText,
  };
}

function cardAnswerTextInput(id, answerText) {
  return {
    type: MSGS.CARD_ANSWER_TEXT_INPUT,
    id,
    answerText,
  };
}

function toggleEditCard(id) {
  return {
    type: MSGS.TOGGLE_EDIT_CARD,
    id,
  };
}

function toggleAnswerHidden(id) {
  return {
    type: MSGS.TOGGLE_ANSWER_HIDDEN,
    id,
  };
}

function deleteCard(id) {
  return {
    type: MSGS.DELETE_CARD,
    id,
  };
}

function transformCardWithId(id, transformFn, card) {
  return card.id === id ? transformFn(card) : card;
}

function toggleEditModeForCard(card) {
  if (R.isEmpty(card.questionText) || R.isEmpty(card.answerText)) {
    return card;
  }
  return {
    ...card,
    edit: !card.edit,
  };
}

function toggleAnswerHiddenForCard(card) {
  return {
    ...card,
    answerHidden: !card.answerHidden,
  };
}

function questionTextInputForCard(questionText, card) {
  return {
    ...card,
    questionText,
  };
}

function answerTextInputForCard(answerText, card) {
  return {
    ...card,
    answerText,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.CREATE_CARD: {
      const cards = R.clone(model.cards);
      const id = model.nextId;
      cards.push({
        questionText: '',
        answerText: '',
        createdAt: new Date(),
        edit: true,
        score: 0,
        id,
      });
      return {
        ...model,
        cards,
        nextId: id + 1,
      };
    }
    case MSGS.TOGGLE_EDIT_CARD: {
      const toggleEditMode = R.partial(transformCardWithId, [
        msg.id,
        toggleEditModeForCard,
      ]);
      const cards = R.map(toggleEditMode, model.cards);
      return {
        ...model,
        cards,
      };
    }
    case MSGS.CARD_QUESTION_TEXT_INPUT: {
      const addQuestionText = R.partial(transformCardWithId, [
        msg.id,
        R.partial(questionTextInputForCard, [msg.questionText]),
      ]);
      const cards = R.map(addQuestionText, model.cards);
      return {
        ...model,
        cards,
      };
    }
    case MSGS.CARD_ANSWER_TEXT_INPUT: {
      const addAnswerText = R.partial(transformCardWithId, [
        msg.id,
        R.partial(answerTextInputForCard, [msg.answerText]),
      ]);
      const cards = R.map(addAnswerText, model.cards);
      return {
        ...model,
        cards,
      };
    }
    case MSGS.DELETE_CARD: {
      const cards = R.filter(c => c.id !== msg.id, model.cards);
      return {
        ...model,
        cards,
      };
    }
    case MSGS.TOGGLE_ANSWER_HIDDEN: {
      const toggleShowAnswer = R.partial(transformCardWithId, [
        msg.id,
        toggleAnswerHiddenForCard,
      ]);
      const cards = R.map(toggleShowAnswer, model.cards);
      return {
        ...model,
        cards,
      };
    }
    default: {
      return model;
    }
  }
}

export {
  createCard,
  toggleEditCard,
  cardQuestionTextInput,
  cardAnswerTextInput,
  deleteCard,
  toggleAnswerHidden,
};
export default update;
