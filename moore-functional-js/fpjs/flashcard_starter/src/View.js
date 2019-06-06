import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  createCard,
  toggleEditCard,
  cardQuestionTextInput,
  cardAnswerTextInput,
  deleteCard,
  toggleAnswerHidden,
} from './Update';

const { div, h1, pre, p, textarea, button, i } = hh(h);

function card(dispatch, { questionText, answerText, edit, answerHidden, id }) {
  const toggleEditForThisCard = R.partial(dispatch, [toggleEditCard(id)]);
  const handleQuestionInput = e =>
    dispatch(cardQuestionTextInput(id, e.target.value));
  const handleAnswerInput = e =>
    dispatch(cardAnswerTextInput(id, e.target.value));
  return div(
    { className: 'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5' },
    [
      p({ className: 'b f6 mv1 underline' }, 'Question'),
      editableField(
        toggleEditForThisCard,
        handleQuestionInput,
        questionText,
        edit
      ),
      p(
        {
          className: 'b f6 mv1 underline pointer w-10',
          onclick: () => dispatch(toggleAnswerHidden(id)),
        },
        !edit && answerHidden ? 'Show Answer' : 'Answer'
      ),
      !edit && answerHidden
        ? null
        : editableField(
            toggleEditForThisCard,
            handleAnswerInput,
            answerText,
            edit
          ),
      i({
        onclick: () => dispatch(deleteCard(id)),
        className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer',
      }),
    ]
  );
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
          className: 'bg-animate hover-bg-near-white pointer',
          onclick: toggleEditCard,
        },
        text
      );
}

function addCard(onclick) {
  return button(
    {
      className: 'pa2 br1 mv2 bg-green bn white',
      onclick,
    },
    [i({ className: 'fa fa-plus ph1' }), 'Add flashcard']
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
