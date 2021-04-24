import { useEffect } from 'react';
import './App.css';

function App() {
  const matrix = [
    [5, -1, 2],
    [-2, -10, 3],
    [1, 2, 5],
    // [5, -1, -1],
    // [-1, -3, 0],
    // [1, 1, 4],
  ];

  const B = [3, -4, 12];
  // const B = [3, -7, 3];
  const eps = 10 ** -3;

  const matrixMultiplication = (first, second) => {
    const answers = [];

    for (let i = 0; i < first.length; i++) {
      let newElem = 0;
      for (let j = 0; j < first[i].length; j++) {
        newElem += parseFloat((first[i][j] * second[j]).toFixed(8));
      }
      answers[i] = newElem;
    }

    return answers;
  };

  const minusMatrix = (first, second) => {
    const answers = [];

    for (let i = 0; i < first.length; i++) {
      answers[i] = first[i] - second[i];
    }

    return answers;
  };

  const cloneMatrix = matrix => {
    const clonedMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      clonedMatrix[i] = [...matrix[i]];
    }

    return clonedMatrix;
  };

  const matrixSum = matrix => {
    let sum = [];
    for (let i = 0; i < matrix.length; i++) {
      sum[i] = 0;
      for (let j = 0; j < matrix[i].length; j++) {
        sum[i] += Math.abs(matrix[i][j]);
      }
    }

    return Math.max(...sum);
  };

  const MPI = (matrix, answers) => {
    const newMatrix = cloneMatrix(matrix);
    const newAnswers = [...answers];

    // Получаем единицы по главной диагонали
    for (let i = 0; i < newMatrix.length; i++) {
      let coef = newMatrix[i][i];
      for (let j = 0; j < newMatrix[i].length; j++) {
        newMatrix[i][j] = parseFloat(newMatrix[i][j] / coef);
      }
      newAnswers[i] = parseFloat(newAnswers[i] / coef);
    }

    let unitMatrix = [];
    for (let i = 0; i < newMatrix.length; i++) {
      unitMatrix[i] = [];
      for (let j = 0; j < newMatrix[i].length; j++) {
        unitMatrix[i][j] = j === i ? 1 : 0;
      }
    }

    let matrixDiagonalZero = [];
    for (let i = 0; i < newMatrix.length; i++) {
      matrixDiagonalZero[i] = [];
      for (let j = 0; j < newMatrix[i].length; j++) {
        matrixDiagonalZero[i][j] = i === j ? 0 : newMatrix[i][j];
      }
    }

    const vectors = new Array(newMatrix.length + 1).fill(new Array(newMatrix.length));
    vectors[0].fill(0);
    vectors[1] = [...newAnswers];
    let moduleC = matrixSum(matrixDiagonalZero);
    let moduleB = Math.max(...newAnswers);
    console.log('|C| =', moduleC);
    console.log('|B| =', moduleB);
    let N = Math.log((eps * (1 - moduleC)) / moduleB) / Math.log(moduleC) + 1;
    console.log(`Необходимое кол-во шагов для достижения точности ${eps}: `, N);

    for (let i = 2; i < newMatrix.length + 1; i++) {
      vectors[i] = minusMatrix(
        newAnswers,
        matrixMultiplication(matrixDiagonalZero, vectors[i - 1])
      );
    }

    for (let i = 0; i < vectors.length; i++) {
      for (let j = 0; j < vectors[i].length; j++) {
        vectors[i][j] = parseFloat(vectors[i][j].toFixed(3));
      }
    }

    return vectors;
  };

  const Zeidel = (matrix, answers) => {
    const vectors = [];
    for (let i = 0; i < matrix.length + 1; i++) {
      vectors[i] = [];
      for (let j = 0; j < matrix.length; j++) {
        vectors[i][j] = 0;
      }
    }

    const newAnswers = [...answers];
    const newMatrix = cloneMatrix(matrix);

    // Получаем единицы по главной диагонали
    for (let i = 0; i < newMatrix.length; i++) {
      let coef = newMatrix[i][i];
      newAnswers[i] = newAnswers[i] / coef;
      for (let j = 0; j < newMatrix[i].length; j++) {
        newMatrix[i][j] = newMatrix[i][j] / coef;
      }
    }

    let matrixDiagonalZero = [];
    for (let i = 0; i < newMatrix.length; i++) {
      matrixDiagonalZero[i] = [];
      for (let j = 0; j < newMatrix[i].length; j++) {
        matrixDiagonalZero[i][j] = i === j ? 0 : newMatrix[i][j];
      }
    }

    let moduleC = matrixSum(matrixDiagonalZero);
    let moduleB = Math.max(...newAnswers);
    console.log('|C| =', moduleC);
    console.log('|B| =', moduleB);
    let N = Math.log((eps * (1 - moduleC)) / moduleB) / Math.log(moduleC) + 1;
    console.log(`Необходимое кол-во шагов для достижения точности ${eps}: `, N);

    for (let i = 0; i < newMatrix.length; i++) {
      for (let j = 0; j < newMatrix[i].length; j++) {
        let minusElem = 0;

        for (let z = 0; z < newMatrix[i].length; z++) {
          if (j === z) {
            continue;
          }
          if ((i > 0 || j > 0) && z < j) {
            minusElem += newMatrix[j][z] * vectors[i + 1][z];
          } else {
            minusElem += newMatrix[j][z] * vectors[i][z];
          }
        }

        vectors[i + 1][j] = parseFloat((newAnswers[j] - minusElem).toFixed(4));
      }
    }

    return vectors;
  };

  useEffect(() => {
    console.log('MPI answers: ', MPI(matrix, B));
    console.log('Zeidel answers: ', Zeidel(matrix, B));
  }, []);
  return <div className="App"></div>;
}

export default App;
