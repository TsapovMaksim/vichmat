import { useEffect, useState } from 'react';
import './App.css';
import * as math from 'mathjs';

function App() {
  const [input, setInput] = useState('x^2 - 3');
  const onInputChange = e => {
    setInput(e.target.value);
  };

  const main = value => {
    if (value.name) {
    }
  };

  const eps = 0.0001;

  const range = [1, 2];

  const getValue = (variable, value, string = input) => {
    const parser = math.parser();
    parser.set(variable, value);
    return parser.evaluate(string);
  };

  const getProductFunctions = interval => {
    let firstValue = getValue('x', interval[0]);
    let secondValue = getValue('x', interval[1]);

    return firstValue * secondValue;
  };

  const onClick = () => {};

  const MPD = eps => {
    let interval = [...range];

    do {
      let fa = getValue('x', interval[0]);
      let fb = getValue('x', interval[1]);

      let c = (interval[0] + interval[1]) / 2;
      let fc = getValue('x', c);

      if (fa * fc < 0) {
        interval = [interval[0], c];
      }
      if (fc * fb < 0) {
        interval = [c, interval[1]];
      }
    } while (Math.abs(interval[1] - interval[0]) > eps);

    return Math.abs(interval[1] + interval[0]) / 2;
  };

  const chordMethod = eps => {
    let interval = [...range];
    let c;
    do {
      let fa = getValue('x', interval[0]);
      let fb = getValue('x', interval[1]);
      c = (interval[0] * fb - interval[1] * fa) / (fb - fa);
      let fc = getValue('x', c);

      if (fa * fc < 0) {
        interval = [interval[0], c];
      }
      if (fc * fb < 0) {
        interval = [c, interval[1]];
      }
    } while (Math.abs(interval[1] - interval[0]) >= eps);

    return Math.abs(interval[1] + interval[0]) / 2;
  };

  const newtoMethod = eps => {
    let prevX, x;
    let pr1 = math.derivative(input, 'x').toString();
    let pr2 = math.derivative(pr1, 'x').toString();
    let isPositive = Number(pr2) > 0 ? true : false;

    for (let i = 0; ; i++) {
      let value = getValue('x', i);
      let isValuePositive = value > 0 ? true : false;
      if (isValuePositive === isPositive) {
        prevX = i;
        break;
      }
    }

    x = prevX - getValue('x', prevX) / getValue('x', prevX, pr1);

    while (Math.abs(prevX - x) >= eps) {
      prevX = x;
      x = prevX - getValue('x', prevX) / getValue('x', prevX, pr1);
    }

    return x;
  };

  useEffect(() => {
    console.log('MPD: ', MPD(0.0001));
    console.log('CHORD: ', chordMethod(0.0001));
    console.log('Newton: ', newtoMethod(0.0001));
  }, []);

  return (
    <div className="App">
      <input type="text" value={input} onChange={onInputChange} />
      <button onClick={onClick}>Распарсить</button>
    </div>
  );
}

export default App;
