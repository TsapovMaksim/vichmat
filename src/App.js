import { useEffect } from 'react';
import './App.css';

function App() {
  let matrix = [
    [1, 43, 12, 10],
    [3, 46, 89, 32],
    [99, 12, 43, 20],
  ];

  const cloneMatrix = matrix => {
    let newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      newMatrix[i] = [...matrix[i]];
    }
    return newMatrix;
  };

  const gaus = matrix => {
    let newMatrix = cloneMatrix(matrix);

    // let maxElemIndex = 0;
    // for (let i = 1; i < newMatrix.length; i++) {
    //   if (newMatrix[i][0] > newMatrix[maxElemIndex][0]) {
    //     maxElemIndex = i;
    //   }
    // }

    // if (maxElemIndex !== 0) {
    //   [newMatrix[0], newMatrix[maxElemIndex]] = [newMatrix[maxElemIndex], newMatrix[0]];
    // }
    let matrixValues = [];
    for (let i = 0; i < newMatrix[0].length - 1; i++) {
      let maxElemIndex = 0;
      for (let j = i + 1; j < newMatrix.length - 1; j++) {
        if (Math.abs(newMatrix[i][0]) > Math.abs(newMatrix[maxElemIndex][0])) {
          maxElemIndex = i;
        }
      }

      if (maxElemIndex !== 0) {
        [newMatrix[0], newMatrix[maxElemIndex]] = [newMatrix[maxElemIndex], newMatrix[0]];
      }
      // for (let j = i + 1; j < newMatrix.length; j++) {
      for (let j = newMatrix.length - 1; j > i; j--) {
        let coef = parseFloat(newMatrix[j][i] / newMatrix[i][i]);
        for (let z = i; z < newMatrix[0].length; z++) {
          let newElem;
          if (i === z) {
            newElem = 0;
          } else {
            newElem = parseFloat(newMatrix[j][z] - newMatrix[i][z] * coef);
          }
          newMatrix[j][z] = newElem;
          matrixValues.push(cloneMatrix(newMatrix));
        }
      }
    }
    const n = newMatrix.length;
    const firstAnswer = newMatrix[n - 1][n] / newMatrix[n - 1][n - 1];
    let answers = [firstAnswer];
    let leftElem = newMatrix[n - 1].length - 3;
    for (let i = newMatrix.length - 2; i > -1; i--) {
      let sum = newMatrix[i][newMatrix[i].length - 1];
      let leftItem;
      for (let j = newMatrix[i].length - 2, k = answers.length - 1; j > leftElem; j--, k--) {
        sum -= newMatrix[i][j] * answers[k];
        leftItem = j;
      }
      answers = [parseFloat((sum / newMatrix[i][leftItem - 1]).toFixed(6)), ...answers];
      leftElem--;
    }

    for (let i = 0; i < answers.length; i++) {
      answers[i] = parseFloat(answers[i].toFixed(2));
    }

    console.log(matrixValues);
    return answers;
  };

  useEffect(() => {
    console.log('answers: ', gaus(matrix));
  }, []);

  return <div className="App"></div>;
}

export default App;
