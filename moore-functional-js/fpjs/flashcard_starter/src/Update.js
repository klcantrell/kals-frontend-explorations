import * as R from 'ramda';

const MSGS = {
  CREATE_CARD: 'CARD_CARD',
  TOGGLE_EDIT_CARD: 'TOGGLE_EDIT_CARD',
  CARD_QUESTION_TEXT_INPUT: 'CARD_QUESTION_TEXT_INPUT',
  CARD_ANSWER_TEXT_INPUT: 'CARD_ANSWER_TEXT_INPUT',
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

function questionTextInputForCard(questionText, card) {
  return {
    ...card,
    questionText,
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
      const cards = R.pipe(
        R.clone,
        R.map(toggleEditMode)
      )(model.cards);
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
      const cards = R.pipe(
        R.clone,
        R.map(addQuestionText)
      )(model.cards);
      console.log(cards);
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
};
export default update;
