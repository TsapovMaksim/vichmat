import { useEffect } from 'react';
import './App.css';
// import * as math from 'mathjs';

function App() {
  const x0 = 0,
    y0 = 1,
    y1 = 1;
  const h = 0.1;
  const range = [0, 1];
  const eps = 10 ** -4;

  const rengeKytta2 = () => {
    let yArray = [[y0, y1]];
    let xArray = [x0];
    const yAnswers = [];
    const y1Answers = [];
    let newH = h;
    let i = 0;
    let answer;
    const finalTable = [];
    finalTable.push({ x: x0, y: y0, "y'": y1 });

    while (true) {
      console.log('Шаг: ', newH);
      i++;
      y1Answers.length = 0;
      yAnswers.length = 0;

      for (let i = range[0], j = 0; +i.toFixed(8) < range[1]; i += newH, j++) {
        let y = getY(xArray[j], yArray[j], newH);
        yArray.push(y);
        xArray.push(xArray[j] + newH);
        yAnswers[j] = y;
      }

      yArray = [[y0, y1]];
      xArray = [x0];

      for (let i = range[0], j = 0; +i.toFixed(8) < range[1]; i += newH / 2, j++) {
        let y = getY(xArray[j], yArray[j], newH / 2);
        yArray.push(y);
        xArray.push(xArray[j] + newH / 2);
        y1Answers.push(y);
      }

      yArray = [[y0, y1]];
      xArray = [x0];

      let isEps = checkEps(yAnswers, y1Answers, eps);

      // if (isEps.flag) {
      //   break;
      // }
      if (isEps.flag) {
        break;
      }

      // if (i == 8) {
      //   break;
      // }
      newH = newH / 2;
    }

    for (let i = 0, x = 0; i < yAnswers.length; i++, x += newH) {
      finalTable.push({ x: +(x + newH).toFixed(8), y: yAnswers[i][0], "y'": yAnswers[i][1] });
    }

    console.log('Шаг: ', newH);
    console.log('Кол-во: ', i);
    console.log(finalTable);
    // console.table(finalTable);

    // let diff = [];
    // for (let i = 0; i < yAnswers.length; i++) {
    //   diff.push({
    //     diff: Math.abs(yAnswers[i][0] - y1Answers[i][0]),
    //     isEps:
    //       Math.abs(yAnswers[i][0] - y1Answers[i][0]) < eps * 3 ||
    //       Math.abs(yAnswers[i][1] - y1Answers[i][1]) < eps * 3,
    //   });
    // }
    // console.log(diff.filter(el => el.isEps));

    return answer;
  };

  function checkEps(answers, answers1, eps) {
    const n = answers.length;
    const n1 = answers1.length;
    for (let i = 1; i < answers.length; i++) {
      // if (Math.abs(answers[n - 1][0] - answers1[n1 - 1][0]) >= eps * 3) {
      if (Math.abs(answers[i][0] - answers1[i * 2][0]) >= eps * 3) {
        return { flag: false };
      }
    }
    return { flag: true };
  }

  function check(answers, eps) {
    for (let i = 0; i < answers.length; i++) {
      if (Math.abs(answers[i][0] - answers[i][1]) >= eps * 3) {
        return false;
      }
    }
    return true;
  }

  function getY2(x, y1, y) {
    return [y1, (Math.E ** x + y + y1) / 3];
    // return [y1, Math.sin(x * y) + y1];
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

  useEffect(() => {
    rengeKytta2();
  }, []);

  return <div className="App"></div>;
}

export default App;
