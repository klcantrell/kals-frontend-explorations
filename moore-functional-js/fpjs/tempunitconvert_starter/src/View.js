import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { UNIT } from './Model';

const { div, h1, input, select, option, pre } = hh(h);

function temperatureInput(value, oninput) {
  return input(
    {
      oninput,
    },
    value
  );
}

function unitSelect(selectedOption, oninput) {
  const options = R.map(opt => {
    if (opt === selectedOption) {
      return option(
        {
          value: opt,
          selected: true,
          oninput,
        },
        opt
      );
    }
    return option(
      {
        value: opt,
        oninput,
      },
      opt
    );
  }, R.values(UNIT));
  return select(options);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    unitSelect(UNIT.CELSIUS, () => console.log('sup')),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
