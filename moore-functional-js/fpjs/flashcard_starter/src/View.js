import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { createCard, toggleEditCard, cardQuestionTextInput } from './Update';

const { div, h1, pre, p, textarea, button } = hh(h);

function card(dispatch, { questionText, answerText, edit, id }) {
  const toggleEditForThisCard = R.partial(dispatch, [toggleEditCard(id)]);
  const handleQuestionInputForThisCard = e =>
    dispatch(cardQuestionTextInput(id, e.target.value));
  return div([
    p('Question'),
    editableField(
      toggleEditForThisCard,
      handleQuestionInputForThisCard,
      questionText,
      edit
    ),
    p('Answer'),
    editableField(
      toggleEditForThisCard,
      () => console.log('add a real handler here'),
      answerText,
      edit
    ),
  ]);
}

function editableField(toggleEditCard, handleInput, text, edit) {
  return edit
    ? textarea(
        {
          onblur: toggleEditCard,
          oninput: handleInput,
        },
        text
      )
    : p(
        {
          onclick: toggleEditCard,
        },
        text
      );
}

function addCard(onclick) {
  return button(
    {
      onclick,
    },
    'Add flashcard'
  );
}

function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    addCard(R.partial(dispatch, [createCard])),
    ...renderCards(dispatch, model.cards),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

function renderCards(dispatch, cards) {
  const cardWithDispatch = R.curry(card)(dispatch);
  return R.map(cardWithDispatch, cards);
}

export default view;
