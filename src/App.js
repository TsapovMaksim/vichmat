import './App.css';

import * as math from 'mathjs';
import { useEffect, useState } from 'react';

const getValue = (variable, value, string) => {
  const parser = math.parser();
  parser.set(variable, value);

  return parser.evaluate(string);
};

function App() {
  const [input, setInput] = useState('1/x');
  const [range, setRange] = useState([1, 2]);
  const [h, setH] = useState(0.1);
  const [trapeciaVal, setTrapeciaVal] = useState();
  const [simpsonVal, setSimpsonVal] = useState();
  const eps = 10 ** -4;

  const trapecia = eps => {
    console.group('%cTrapecia', 'font-weight: bold; text-transform: uppercase; color: red');

    let interval = [+range[0], +range[1]];
    let table = [];
    let newH = h;
    const answers = [];

    for (let i = interval[0], k = 0; i.toFixed(12) <= interval[1]; i += h, k++) {
      table[k] = [i, getValue('x', i, input)];
    }

    let answer = doubleCountingTrapecia(table);
    let Ireal = Math.log(interval[1]) - Math.log(interval[0]);
    // let count = 1;
    console.log('Ireal: ', Ireal);
    answers.push({ H: newH, Значение: answer, Точность: answer - Ireal });

    while (Math.abs(answer - Ireal) >= eps) {
      // console.log(`Итерация: ${count + 1}`);
      // console.log('Текущая: ', Math.abs(answer - Ireal));
      // console.log('Answer: ', answer);

      newH /= 2;
      table = [];
      for (let i = interval[0], k = 0; i.toFixed(12) <= interval[1]; i += newH, k++) {
        table[k] = [i, getValue('x', i, input)];
      }

      // count++;
      answer = doubleCountingTrapecia(table);
      // console.log(`Result=`, answer);
      // console.log(`h=`, newH);
      answers.push({
        H: newH,
        Значение: answer,
        Точность: answer - Ireal,
      });
    }

    console.table(answers);

    console.groupEnd();

    return answer;
  };

  const simpson = eps => {
    let newH = h;
    let interval = [+range[0], +range[1]];
    let table = [];

    for (let i = interval[0], k = 0; i.toFixed(12) <= interval[1]; i += h, k++) {
      table[k] = [i, getValue('x', i, input)];
    }

    let Ireal = Math.log(interval[1]) - Math.log(interval[0]);

    let answer = doubleCountingSimpson(table);
    // let count = 1;
    const answers = [];

    console.group('%cSimpson', 'font-weight: bold; text-transform: uppercase; color: red');

    // console.log('Ireal and answer and dif', Ireal, answer, answer - Ireal);
    console.log('Ireal: ', Ireal);
    answers.push({ H: newH, Значение: answer, Точность: Math.abs(answer - Ireal) });

    while (Math.abs(answer - Ireal) >= eps) {
      // console.log('In cicle');
      // console.log(`Итерация: ${count + 1}`);
      // console.log('Текущая: ', Math.abs(answer - Ireal));
      newH /= 2;

      table = [];
      for (let i = interval[0], k = 0; i.toFixed(12) <= interval[1]; i += newH, k++) {
        table[k] = [i, getValue('x', i, input)];
      }

      // count++;
      answer = doubleCountingSimpson(table);
      answers.push({ H: newH, Значение: answer, Точность: Math.abs(answer - Ireal) });
      // console.log(`Result=`, answer);
      // console.log(`h=`, newH);
    }

    // console.log('Count: ', count);
    console.table(answers);
    console.groupEnd();
    return answer;
  };

  let doubleCountingTrapecia = values => {
    let answer = 0;
    for (let i = 1; i < values.length; i++) {
      let x1 = values[i][0];
      let x = values[i - 1][0];
      let y1 = values[i][1];
      let y = values[i - 1][1];
      answer += (x1 - x) * (y / 2 + y1 / 2);
    }

    return answer;
  };

  let doubleCountingSimpson = values => {
    let answer = 0;
    for (let i = 2, k = 0; i < values.length; i += 2, k++) {
      let x2 = values[i][0];
      let x = values[i - 2][0];
      let y2 = values[i][1];
      let y1 = values[i - 1][1];
      let y = values[i - 2][1];

      answer += (x2 - x) * (y / 6 + (2 * y1) / 3 + y2 / 6);
    }

    return answer;
  };

  // const onClick = () => {
  //   setTrapeciaVal(trapecia(eps));
  //   setSimpsonVal(simpson(eps));
  // };

  useEffect(() => {
    console.log('Трапеция: ', trapecia(eps));
    console.log('Симпсон: ', simpson(eps));
  }, []);
  return (
    <div className="App">
      {/* <div>
        Функция: <input value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <div>
        Интервал: <input value={range[0]} onChange={e => setRange([e.target.value, range[1]])} />
        <input value={range[1]} onChange={e => setRange([range[0], e.target.value])} />
      </div>
      <div>
        Шаг: <input type="number" value={h} onChange={e => setH(+e.target.value)} />
      </div>
      <button onClick={onClick}>Посчитать</button>
      <div>
        Трапеция: {trapeciaVal}
        <br />
        Симпсон: {simpsonVal}
      </div> */}
    </div>
  );
}

export default App;
