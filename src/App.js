import { useEffect, useState } from 'react';
import './App.css';

import * as math from 'mathjs';

function App() {
  const input = 'sqrt(x)';
  // const [input, setInput] = useState('sqrt(x)');
  // const [h, setH] = useState(1);
  // const [hCount, setHCount] = useState(4);
  // const [x, setX] = useState(2.56);
  // const [lagrandgValue, setLagrandgValue] = useState();

  let h = 1;
  let hCount = 4;
  let x = 2.56;

  const getValue = (variable, value, string = input) => {
    const parser = math.parser();
    parser.set(variable, value);

    return parser.evaluate(string);
  };

  const lagrandg = () => {
    let table = [];
    for (let i = 0; i < hCount; i++) {
      // let x = (i + 1) * h;
      let x = 1 + i * h;
      let y = getValue('x', x);
      table[i] = [x, y];
    }

    console.log('Table: ', table);

    let answers = [];

    for (let i = 0; i < hCount; i++) {
      let y = table[i][1];

      let chisl = 1;
      for (let j = 0; j < hCount; j++) {
        if (j !== i) {
          chisl *= x - table[j][0];
        }
      }

      let znam = 1;
      for (let j = 0; j < hCount; j++) {
        if (i !== j) {
          znam *= table[i][0] - table[j][0];
        }
      }

      answers.push(y * (chisl / znam));
    }

    let M = 0;
    let pr = input;
    for (let i = 0; i < hCount; i++) {
      pr = math.derivative(pr, 'x').toString();
    }
    let max = [];
    for (let i = 0; i < hCount; i++) {
      max.push(Math.abs(getValue('x', table[i][0], pr)));
    }
    M = Math.max(...max);

    let Eyc = M / math.factorial(hCount);

    for (let i = 0; i < hCount; i++) {
      Eyc *= x - table[i][0];
    }

    let Eokr = 0.00005;
    let Erel = Eokr + +Eyc.toFixed(4);
    console.log('M: ', M);
    console.log('Eусеч: ', Eyc);
    console.log('Eокр: ', Eokr);
    console.log('Eреальное: ', Erel);

    console.log('Answers: ', answers);

    return answers.reduce((prev, current) => prev + current, 0);
  };

  useEffect(() => {
    console.log(lagrandg());
  });
  return (
    <div className="App">
      {/* <div style={{ marginTop: 20 }}>
        <p>
          x: <input type="text" value={x} onChange={e => setX(e.target.value)} />
        </p>
        <p>
          h: <input type="text" value={h} onChange={e => setH(e.target.value)} />
        </p>
        <p>
          кол-во шагов:{' '}
          <input type="text" value={hCount} onChange={e => setHCount(e.target.value)} />
        </p>
        <button
          onClick={() => {
            setLagrandgValue(lagrandg());
          }}
        >
          Посчитать
        </button>
        <div style={{ marginTop: 20 }}>{lagrandgValue}</div>
      </div> */}
    </div>
  );
}

export default App;
