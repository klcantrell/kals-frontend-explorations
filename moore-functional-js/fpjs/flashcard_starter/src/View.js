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
  badAnswerRating,
  goodAnswerRating,
  greatAnswerRating,
} from './Update';

const { div, h1, pre, p, textarea, button, i } = hh(h);

function card(dispatch, { questionText, answerText, edit, answerHidden, id }) {
  const toggleEditForThisCard = R.partial(dispatch, [toggleEditCard(id)]);
  const toggleAnswerHiddenForThisCard = R.partial(dispatch, [
    toggleAnswerHidden(id),
  ]);
  const deleteThisCard = R.partial(dispatch, [deleteCard(id)]);
  const handleQuestionInput = e =>
    dispatch(cardQuestionTextInput(id, e.target.value));
  const handleAnswerInput = e =>
    dispatch(cardAnswerTextInput(id, e.target.value));
  return div(
    { className: 'w-30 pa2 bg-light-yellow shadow-1 ma2 relative pb5' },
    [
      questionHeader,
      editableField(
        toggleEditForThisCard,
        handleQuestionInput,
        questionText,
        edit
      ),
      answerHeader(!edit && answerHidden, toggleAnswerHiddenForThisCard),
      !edit && answerHidden
        ? null
        : editableField(
            toggleEditForThisCard,
            handleAnswerInput,
            answerText,
            edit
          ),
      actionButtons({
        badHandler: () => dispatch(badAnswerRating(id)),
        goodHandler: () => dispatch(goodAnswerRating(id)),
        greatHandler: () => dispatch(greatAnswerRating(id)),
      }),
      deleteCardButton(deleteThisCard),
    ]
  );
}

const questionHeader = p({ className: 'b f6 mv1 underline' }, 'Question');

function answerHeader(hideAnswer, onclick) {
  return p(
    {
      className: 'b f6 mv1 underline pointer w-10',
      onclick,
    },
    hideAnswer ? 'Show Answer' : 'Answer'
  );
}

function deleteCardButton(onclick) {
  return i({
    onclick,
    className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer',
  });
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

function actionButton(color, message, onclick) {
  return button(
    {
      className: `bg-${color} f4 ph3 pv2 bn white br1`,
      onclick,
    },
    message
  );
}

function actionButtons({ badHandler, goodHandler, greatHandler }) {
  return div(
    { className: 'absolute bottom-0 left-0 w-100 pa2' },
    flexContainer(
      [
        actionButton('red', 'Bad', badHandler),
        actionButton('blue', 'Good', goodHandler),
        actionButton('green', 'Great', greatHandler),
      ],
      'between'
    )
  );
}

function flexContainer(content, justifyMode) {
  return div(
    { className: `flex flex-wrap justify-${justifyMode} w-100 center` },
    content
  );
}

function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    addCard(R.partial(dispatch, [createCard])),
    flexContainer(renderCards(dispatch, model.cards), 'start'),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

function renderCards(dispatch, cards) {
  const cardWithDispatch = R.curry(card)(dispatch);
  return R.pipe(
    R.reverse,
    R.map(cardWithDispatch)
  )(cards);
}

export default view;
