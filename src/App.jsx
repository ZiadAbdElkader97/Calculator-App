import "./App.css";
import { useState, useEffect } from "react";
import logo from "./assets/logo.webp";

export default function App() {
  const [inputNum, setInputNum] = useState(0);
  const [calculatedNum, setCalculatedNum] = useState(0);
  const [operator, setOperator] = useState("");
  const [isDecimal, setIsDecimal] = useState(false);
  const [decimalCount, setDecimalCount] = useState(1);
  const [monitor, setMonitor] = useState("");

  useEffect(() => {
    setMonitor(inputNum);
  }, [inputNum]);

  useEffect(() => {
    setMonitor(calculatedNum);
  }, [calculatedNum]);

  // Take input number from keyboard
  const takeInputNum = (num) => {
    if (isDecimal) {
      num = num / Math.pow(10, decimalCount);
      setDecimalCount(decimalCount + 1);
      setInputNum(parseFloat((inputNum + num).toFixed(decimalCount)));
    } else {
      setInputNum(inputNum * 10 + num);
    }
  };

  // Take operator from keyboard
  const takeOperator = (operator) => {
    setOperator(operator);
    calculate();
    setInputNum(0);
  };

  // Do the calculation
  const calculate = () => {
    setIsDecimal(false);
    setDecimalCount(1);
    if (operator === "/" && inputNum === 0) {
      setCalculatedNum(NaN);
      setInputNum(0);
      return;
    }
    if (calculatedNum === 0 && inputNum === 0) {
      return;
    }
    switch (operator) {
      case "+":
        setCalculatedNum(calculatedNum + inputNum);
        break;
      case "-":
        setCalculatedNum(calculatedNum - inputNum);
        break;
      case "*":
        setCalculatedNum(calculatedNum * inputNum);
        break;
      case "/":
        setCalculatedNum(calculatedNum / inputNum);
        break;
    }
    if (operator === "") {
      setCalculatedNum(inputNum);
    } else {
      setInputNum(0);
    }
    return;
  };

  // Get the equation
  const getEqual = () => {
    calculate();
    setOperator("");
  };

  // Clear All
  const clear = () => {
    setInputNum(0);
    setCalculatedNum(0);
    setMonitor(0);
    setOperator("");
  };

  return (
    <>
      <div className="heading">
        <img src={logo} alt="Logo" title="Logo" />
        <h1>Calculator App</h1>
      </div>
      <div className="calculator">
        <section className="monitor">
          <p className="out-put">{monitor}</p>
        </section>
        <section className="keyboard">
          <div className="keyboard-row">
            <button onClick={() => clear()} className="one-block gray">
              AC
            </button>
            <button className="one-block gray">-/+</button>
            <button className="one-block gray">%</button>
            <button
              onClick={() => takeOperator("/")}
              className="one-block orange"
            >
              /
            </button>
          </div>

          <div className="keyboard-row">
            <button
              onClick={() => takeInputNum(7)}
              className="one-block dark-gray"
            >
              7
            </button>
            <button
              onClick={() => takeInputNum(8)}
              className="one-block dark-gray"
            >
              8
            </button>
            <button
              onClick={() => takeInputNum(9)}
              className="one-block dark-gray"
            >
              9
            </button>
            <button
              onClick={() => takeOperator("*")}
              className="one-block orange"
            >
              *
            </button>
          </div>

          <div className="keyboard-row">
            <button
              onClick={() => takeInputNum(4)}
              className="one-block dark-gray"
            >
              4
            </button>
            <button
              onClick={() => takeInputNum(5)}
              className="one-block dark-gray"
            >
              5
            </button>
            <button
              onClick={() => takeInputNum(6)}
              className="one-block dark-gray"
            >
              6
            </button>
            <button
              onClick={() => takeOperator("-")}
              className="one-block orange"
            >
              -
            </button>
          </div>

          <div className="keyboard-row">
            <button
              onClick={() => takeInputNum(1)}
              className="one-block dark-gray"
            >
              1
            </button>
            <button
              onClick={() => takeInputNum(2)}
              className="one-block dark-gray"
            >
              2
            </button>
            <button
              onClick={() => takeInputNum(3)}
              className="one-block dark-gray"
            >
              3
            </button>
            <button
              onClick={() => takeOperator("+")}
              className="one-block orange"
            >
              +
            </button>
          </div>

          <div className="keyboard-row">
            <button
              onClick={() => takeInputNum(0)}
              className="two-block dark-gray"
            >
              0
            </button>
            <button
              onClick={() => setIsDecimal(true)}
              className="one-block dark-gray"
            >
              .
            </button>
            <button onClick={() => getEqual()} className="one-block orange">
              =
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
