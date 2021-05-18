import { useEffect } from 'react';
import './App.css';
// import * as math from 'mathjs';

function App() {
  const x0 = 0,
    y0 = 1,
    y1 = 1;
  const h = 0.5;
  const range = [0, 1];
  const eps = 10 ** -6;

  const rengeKytta2 = () => {
    let yArray = [[y0, y1]];
    let xArray = [x0];
    const yAnswers = [];
    const y1Answers = [];
    let newH = h;
    let i = 0;
    let answer;
    const finalTable = [];

    while (true) {
      i++;

      for (let i = range[0], j = 0; +i.toFixed(16) < range[1]; i += newH, j++) {
        let y = getY(xArray[j], yArray[j], newH);
        yArray.push(y);
        xArray.push(xArray[j] + newH);
        yAnswers[j] = y;
      }

      yArray = [[y0, y1]];
      xArray = [x0];

      for (let i = range[0], j = 0; +i.toFixed(16) < range[1]; i += newH / 2, j++) {
        let y = getY(xArray[j], yArray[j], newH);
        yArray.push(y);
        xArray.push(xArray[j] + newH);
        y1Answers[j] = y;
      }

      let isEps = checkEps(yAnswers, y1Answers, eps);

      if (isEps.flag) {
        answer = isEps.answer;
        break;
      }

      newH = newH / 2;
    }

    for (let i = 0, x = x0; i < yAnswers.length; i++, x += newH) {
      finalTable[i] = { x: x, y: yAnswers[i][0], "y'": yAnswers[i][1] };
    }

    // console.log('Y: ', yAnswers);
    // console.log('Y: ', finalTable);
    // console.log('Y1: ', y1Answers);
    console.log('Шаг: ', newH);
    console.log('Кол-во: ', i);
    console.log(finalTable);
    // console.table(finalTable);

    return answer;
  };

  function checkEps(answers, answers1, eps) {
    console.log('Compare');
    for (let i = 1; i < answers.length; i++) {
      if (Math.abs(answers[i][0] - answers1[i * 2][0]) >= eps * 3) {
        return { flag: false };
      } else {
        return { flag: true, answer: answers1[i * 2][0] };
      }
    }
  }

  function getY2(x, y1, y) {
    return [y1, (x + y1 + y) / 3];
  }

  function arraySum(first, second) {
    const newArr = [];
    for (let i = 0; i < first.length; i++) {
      newArr[i] = first[i] + second[i];
    }

    return newArr;
  }

  function getY(x, yArr, h) {
    let fxy = getY2(x, yArr[1], yArr[0]);
    let yReverse = arraySum(
      yArr,
      fxy.map(el => (el * h) / 2)
    );
    let fxy1 = getY2(x + h, yReverse[1], yReverse[0]);
    let y = arraySum(
      yArr,
      arraySum(fxy, fxy1).map(el => (el * h) / 2)
    );

    return y;
  }

  // const ryngePr = () => {
  //   console.group(
  //     '%cМетод Рунге-Кутта с усреднением по производной',
  //     'font-weight: bold; color: red; text-transform: uppercase'
  //   );

  //   const table = [[x0, y0]];
  //   const answers = [];
  //   const vych = [];

  //   for (let i = 0; i < hCount; i++) {
  //     const funcValue = getValue(table[i][0], table[i][1]);
  //     const yPol = table[i][1] + (h / 2) * funcValue;
  //     const funcValue1 = getValue(table[i][0] + h, yPol);
  //     const y = table[i][1] + (h / 2) * (funcValue + funcValue1);
  //     table[i + 1] = [table[i][0] + h, y];
  //     answers.push(y);
  //     vych.push({ funcValue: funcValue, yPol: yPol, newFuncValue: funcValue1, y: y });
  //   }

  //   console.log('Answers: ', answers);
  //   console.log('Table: ', answers);
  //   console.table(vych);
  //   console.groupEnd();
  // };

  // const eiler = () => {
  //   console.group('%cМетод Эйлера', 'font-weight: bold; color: red; text-transform: uppercase');
  //   const answers = [];
  //   const table = [[x0, y0]];
  //   const vych = [];
  //   for (let i = 0; i < hCount; i++) {
  //     const funcValue = getValue(table[i][0], table[i][1]);
  //     const y = table[i][1] + funcValue * h;
  //     const x = table[i][0] + h;
  //     table[i + 1] = [x, y];
  //     answers.push(y);
  //     vych.push({ funcValue: funcValue, y: y });
  //   }

  //   console.log('table: ', table);
  //   console.log('Answers: ', answers);
  //   console.table(vych);
  //   console.groupEnd();
  // };

  // const ryngeTime = () => {
  //   console.group(
  //     '%cМетод Рунге-Кутта с усреднением по времени',
  //     'font-weight: bold; color: red; text-transform: uppercase'
  //   );

  //   const table = [[x0, y0]];
  //   const answers = [];
  //   const vych = [];

  //   for (let i = 0; i < hCount; i++) {
  //     const funcValue = getValue(table[i][0], table[i][1]);
  //     const yPol = table[i][1] + (h / 2) * funcValue;
  //     const funcValue1 = getValue(table[i][0] + h / 2, yPol);
  //     const y = table[i][1] + h * funcValue1;
  //     table[i + 1] = [table[i][0] + h, y];
  //     answers.push(y);
  //     vych.push({ funcValue: funcValue, yPol: yPol, newFuncValue: funcValue1, y: y });
  //   }

  //   console.log('Answers: ', answers);
  //   console.log('Table: ', table);
  //   console.table(vych);

  //   console.groupEnd();
  // };

  useEffect(() => {
    console.log('Answer: ', rengeKytta2());
    // eiler();
    // ryngeTime();
    // ryngePr();
  }, []);

  return <div className="App"></div>;
}

export default App;
