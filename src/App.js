import { useEffect } from 'react';
import './App.css';
import * as math from 'mathjs';

function App() {
  // const [epsInput, setEpsInput] = useState(0.0001);
  // const [Mpd, setMPD] = useState();
  // const [CHORD, setCHORD] = useState();
  // const [NEWTON, setNEWTON] = useState();
  // const [input, setInput] = useState('x^2 - 3');
  // const [range, setRange] = useState([1, 2]);
  const input = 'x^2 - 3';
  const range = [1, 2];
  const eps = 0.001;

  // const onInputChange = e => {
  //   setInput(e.target.value);
  // };

  const getValue = (variable, value, string = input) => {
    const parser = math.parser();
    parser.set(variable, value);
    return parser.evaluate(string);
  };

  // const onClick = () => {
  //   setMPD(MPD(epsInput));
  //   setCHORD(chordMethod(epsInput));
  //   setNEWTON(newtoMethod(epsInput));
  // };

  const MPD = () => {
    let interval = [+range[0], +range[1]];
    let middleInterval;
    console.group(
      '%cМетод половинного деления',
      'font-weight: bold; color: red; text-transform: uppercase'
    );
    const answers = [];

    while (Math.abs(interval[1] - interval[0]) / 2 >= eps) {
      // for (let i = 0; i < 4; i++) {
      const fa = getValue('x', interval[0]);
      const fb = getValue('x', interval[1]);

      middleInterval = (interval[0] + interval[1]) / 2;
      const fMiddleInterval = getValue('x', middleInterval);
      const accuracy = Math.abs(interval[1] - interval[0]) / 2;

      answers.push({
        'Середина интервала': middleInterval,
        'Функция в середине интервала': fMiddleInterval,
        Точность: +accuracy.toFixed(10),
        Интервал: `${interval[0]}, ${interval[1]}`,
      });

      if (fa * fMiddleInterval < 0) {
        interval = [interval[0], middleInterval];
      } else if (fMiddleInterval * fb < 0) {
        interval = [middleInterval, interval[1]];
      }
    }
    console.table(answers);
    // console.log('Текущие значения: ', {
    //   'Середина интервала': (interval[0] + interval[1]) / 2,
    //   'Функция в середине интервала': getValue('x', (interval[0] + interval[1]) / 2),
    //   Точность: Math.abs(interval[1] - interval[0]) / 2,
    // });
    console.groupEnd();

    return middleInterval;
  };

  const chordMethod = () => {
    console.group('%cМетод хорд', 'font-weight: bold; color: red; text-transform: uppercase');

    let interval = [+range[0], +range[1]];
    let c, prevC, fa, fb, fc;
    c = range[0];
    prevC = range[1];
    const answers = [];

    let i = 0;
    while (Math.abs(c - prevC) >= eps) {
      fa = getValue('x', interval[0]);
      fb = getValue('x', interval[1]);
      [c, prevC] = [(interval[0] * fb - interval[1] * fa) / (fb - fa), c];
      fc = getValue('x', c);

      answers.push({
        c: c,
        Точность: +Math.abs(c - prevC).toFixed(10),
        Интервал: `${interval[0]}, ${interval[1]}`,
      });

      if (fa * fc < 0) {
        interval = [interval[0], c];
      }
      if (fc * fb < 0) {
        interval = [c, interval[1]];
      }

      // i++;
      // if (i === 4) {
      //   break;
      // }
    }
    console.table(answers);
    // console.log('Текущие значения: ', {
    //   c: (interval[0] * fb - interval[1] * fa) / (fb - fa),
    //   Точность: (interval[0] * fb - interval[1] * fa) / (fb - fa) - c,
    //   Интервал: `${interval[0]}, ${interval[1]}`,
    // });
    console.groupEnd();
    return c;
  };

  const newtoMethod = () => {
    let prevX, x;
    let pr1 = math.derivative(input, 'x').toString();
    let pr2 = math.derivative(pr1, 'x').toString();
    let isPositive = Number(pr2) > 0 ? true : false;

    const answers = [];

    console.group('%cМетод Ньютона', 'font-weight: bold; color: red; text-transform: uppercase');

    for (let i = 0; ; i++) {
      let value = getValue('x', i);
      let isValuePositive = value > 0 ? true : false;
      if (isValuePositive === isPositive) {
        prevX = i;
        break;
      }
    }

    x = prevX - getValue('x', prevX) / getValue('x', prevX, pr1);

    answers.push(
      ...[
        { x: +prevX.toFixed(6) },
        {
          x: +x.toFixed(6),
          Точность: Math.abs(prevX - x),
        },
      ]
    );

    let i = 0;
    while (Math.abs(prevX - x) >= eps) {
      prevX = x;
      const temp = getValue('x', prevX) / getValue('x', prevX, pr1);
      x = prevX - temp;
      answers.push({
        x: +x.toFixed(10),
        Точность: +Math.abs(prevX - x).toFixed(10),
      });
      // i++;
      // if (i === 4) {
      //   break;
      // }
    }

    console.table(answers);
    // console.log('Текущие значения: ', {
    //   x: prevX - getValue('x', prevX) / getValue('x', prevX, pr1),
    // });
    console.groupEnd();

    return x;
  };

  useEffect(() => {
    console.log('MPD: ', MPD());
    console.log('CHORD: ', chordMethod());
    console.log('Newton: ', newtoMethod());
  }, []);

  return (
    <div className="App">
      {/* <input type="text" value={input} onChange={onInputChange} />
      <button onClick={onClick}>Распарсить</button>
      <div>
        eps: <input type="text" value={epsInput} onChange={e => setEpsInput(e.target.value)} />
      </div>
      <div>
        Интервал:{' '}
        <input type="text" value={range[0]} onChange={e => setRange([e.target.value, range[1]])} />
        <input type="text" value={range[1]} onChange={e => setRange([range[0], e.target.value])} />
      </div>
      <div>
        <p>МПД: {Mpd}</p>
        <p>Метод хорд: {CHORD}</p>
        <p>Ньютон: {NEWTON}</p>
      </div> */}
    </div>
  );
}

export default App;
