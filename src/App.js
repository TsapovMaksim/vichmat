import { useEffect, useState } from 'react';
import './App.css';

import * as math from 'mathjs';

const getValue = (variable, value, string) => {
  const parser = math.parser();
  parser.set(variable, value);

  return parser.evaluate(string);
};

function App() {
  const [input, setInput] = useState('x^2 - 6*x');
  const [eps, setEps] = useState(/* 0.00000001 */ 10 ** -8);
  const [value, setValue] = useState();
  const [range, setRange] = useState([0, 5]);

  const goldenRatio = eps => {
    let interval = [+range[0], +range[1]];
    let h, u, fh, fu;
    let i = 0;
    let answers = [];

    h = interval[0] + 0.382 * (interval[1] - interval[0]);
    u = interval[0] + 0.618 * (interval[1] - interval[0]);
    fh = getValue('x', h, input);
    fu = getValue('x', u, input);

    answers.push({
      a: interval[0],
      b: interval[1],
      diff: interval[1] - interval[0],
      h,
      u,
      fh,
      fu,
    });
    // console.log('h1,h2,fh1,fh2: ', h1, h2, fh1, fh2);

    while (Math.abs(interval[1] - interval[0]) > +eps) {
      ++i;
      if (fh < fu) {
        interval[1] = u;
        u = h;
        h = interval[0] + 0.382 * (interval[1] - interval[0]);
        fu = fh;
        fh = getValue('x', h, input);
      } else {
        interval[0] = h;
        h = u;
        u = interval[0] + 0.618 * (interval[1] - interval[0]);
        fh = fu;
        fu = getValue('x', u, input);
      }

      answers.push({
        a: interval[0],
        b: interval[1],
        diff: interval[1] - interval[0],
        h,
        u,
        fh,
        fu,
      });
    }

    let x = (interval[0] + interval[1]) / 2;
    let fx = parseFloat(getValue('x', x, input));

    console.table(answers);
    // console.log(answers);

    return { x, fx };
  };

  const onInputChange = e => {
    setInput(e.target.value);
  };

  useEffect(() => {
    console.log('Answer: ', goldenRatio(eps));
  }, []);
  return (
    <div className="App">
      {/* <div style={{ marginTop: 20 }}>
        Функция: <input type="text" value={input} onChange={onInputChange} />
      </div>
      <div>
        Точность: <input type="text" value={eps} onChange={e => setEps(e.target.value)} />
      </div>
      <div>
        интервал: <input value={range[0]} onChange={e => setRange([e.target.value, range[1]])} />{' '}
        <input value={range[1]} onChange={e => setRange([range[0], e.target.value])} />
      </div>
      <button onClick={() => setValue(goldenRatio(eps))}>Посчитать</button>
      <div style={{ marginTop: 20 }}>
        x: {value?.x}
        <br />
        fx: {value?.fx}
      </div> */}
    </div>
  );
}

export default App;
