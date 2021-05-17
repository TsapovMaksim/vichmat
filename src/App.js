import './App.css';
import * as math from 'mathjs';
import { useEffect } from 'react';

function App() {
  const x = 1.69;
  const h = 0.5;
  const hCount = 4;
  const input = 'sqrt(x)';

  const getValue = (variable, value, string = input) => {
    const parser = math.parser();
    parser.set(variable, value);

    return parser.evaluate(string);
  };

  const newton = () => {
    const table = [];

    for (let i = 0; i < hCount; i++) {
      const x = 1 + h * i;
      const y = +getValue('x', x).toFixed(4);
      table[i] = [x, y];
    }

    const differenceTable = [];
    for (let i = 0; i < hCount - 1; i++) {
      differenceTable[i] = [];
    }

    for (let i = 0; i < hCount - 1; i++) {
      for (let j = 1; j < hCount - i; j++) {
        if (i > 0) {
          differenceTable[i][j - 1] = +(
            differenceTable[i - 1][j] - differenceTable[i - 1][j - 1]
          ).toFixed(4);
        } else {
          differenceTable[i][j - 1] = +(table[j][1] - table[j - 1][1]).toFixed(4);
        }
      }
    }

    const q1 = (x - table[0][0]) / h;
    const q2 = (x - table[hCount - 1][0]) / h;

    console.log('table: ', table);
    console.log('Difference table: ', differenceTable);

    let firstAnswer = table[0][1];
    let answers = [];
    for (let i = 0; i < hCount - 1; i++) {
      let answer = 0;
      answer += (differenceTable[i][0] / math.factorial(i + 1)) * q1;
      for (let j = 0; j < i; j++) {
        answer *= q1 - (j + 1);
      }
      answers.push(answer);
    }

    console.group('%cПервая формула', 'font-weight: bold; text-transform: uppercase; color: red');
    console.log('Q:', q1);
    console.log('Значения промежуточных вычислений: ', [firstAnswer, ...answers]);

    firstAnswer = answers.reduce((prev, cur) => prev + cur, firstAnswer);

    console.log('Ответ по первой формуле: ', +firstAnswer.toFixed(4));
    console.groupEnd();

    answers = [];
    let secondAnswer = table[hCount - 1][1];
    for (let i = hCount - 1; i > 0; i--) {
      let answer = 0;
      answer += (differenceTable[hCount - i - 1][i - 1] / math.factorial(hCount - i)) * q2;
      for (let j = 0; j < hCount - 1 - i; j++) {
        answer *= q2 + (j + 1);
      }
      answers.push(answer);
    }

    console.group('%cВторая формула', 'font-weight: bold; text-transform: uppercase; color: red');
    console.log('Q:', q2);
    console.log('Значения промежуточных вычислений: ', [secondAnswer, ...answers]);

    secondAnswer = answers.reduce((prev, current) => prev + current, secondAnswer);

    console.log('Ответ по второй формуле: ', +secondAnswer.toFixed(4));
    console.groupEnd();
  };

  useEffect(() => {
    newton();
  }, []);

  return <div className="App"></div>;
}

export default App;
