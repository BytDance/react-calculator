import { useState } from 'react';
import './App.css';

function App() {
    const [display, setDisplay] = useState('0');
    const [history, setHistory] = useState('0');
    const [eq, setEq] = useState('0');
    const [reset, setRest] = useState(false);



    function digitBtnHandler(event) {
        let value = event.target.textContent;
        if (display === '0' || value === '-' || value === '.' || value === '+' || value === '*' || value === '/' || value === '=' || reset)
        { setDisplay(value); setHistory(value); setEq(value); setRest(false); }
        else { setDisplay(display + value); setHistory(history + value); setEq(eq+value);}
    }

    function acHandler() {
        setDisplay('0');
        setHistory('0');
        setEq('0');
        setRest (false);
    }

    function operatorBtnHandler(event) {
        let value = event.target.textContent;
        let lastDigit = history[history.length - 1];
        let secondLast = history[history.length-2];
        let currentEq = eq;
        let currentHistory = history;

        if (reset) { setRest(false); }
        
        if (lastDigit != '')
        {
            if (value !== '-' && (lastDigit === '.' || lastDigit === '+' || lastDigit === '*' || lastDigit === '/' || lastDigit === '-'))
            {
                if (history.length > 2) {
                    if (secondLast === '.' || secondLast === '+' || secondLast === '*' || secondLast === '/' || secondLast === '-') {
                        currentEq = (eq.slice(0, -1));
                        currentHistory = (history.slice(0, -1));
                        currentEq = (currentEq.slice(0, -1));
                        currentHistory = (currentHistory.slice(0, -1));
                    }
                    else {

                        currentEq = (eq.slice(0, -1));
                        currentHistory = (history.slice(0, -1));
                    }
                }
                else {

                    currentEq = (eq.slice(0, -1));
                    currentHistory = (history.slice(0, -1));
                }
            }
        }

        if (value === ".") {
            if (display.toString().includes('.')) {
                return;
            }
        }

        setHistory(currentHistory + value);
        setDisplay(value);
        setEq(currentEq + value);

    }


    function negativeHandler(x) {
        let count = 0;
        let newStr = '';
        for (let i = 0; i < x.length; i++) {
            if (x[i] === '-') {
                count++;
            }
            else
            {
                if (count != 0) {
                    newStr += (count % 2 === 0) ? '+' : '-';
                    count = 0;
                }
                newStr += x[i];
            }
        }

        return newStr;
    }

    function round(y) {
        let value = y.toString();
        if (value.includes('.')) {
            let decimalIndex = value.indexOf('.');
            let index = value.length - decimalIndex - 1;
            if ((index) > 5) {
                value = (parseFloat(value).toFixed(4));
            }
        }

        return value;
    }


    function onEqual(event) {
        let r = eval(negativeHandler(eq));
        r = round(r);
        let lastDigit = history[history.length - 1];
        setDisplay(r);
        setEq(r);
        if (lastDigit != ")") { setHistory(history + '=(' + r + ')'); }
        setRest(true);
    }

    function onDecimal(event) {
        let value = event.target.textContent;
        if (!display.toString().includes('.')) {
            if (reset) { setRest(false); }
            let lastDigit = eq[eq.length - 1];
            if (lastDigit === '-' || lastDigit === '.' || lastDigit === '+' || lastDigit === '*' || lastDigit === '/') { }
            setDisplay(display + value);
            setHistory(history + value);
            setEq(eq + value);
        }
    }

  return (
    <div className="App">
      <header className="App-header">
              <div className="calculator">

                  <div className="row" id="history" onClick={digitBtnHandler}>{history.slice(-18)}</div>
                  <div className="row" id="display" onClick={digitBtnHandler} >{ display.toString().slice(-10)}</div>
                  <div className="calculatorBtn" id="clear" onClick={acHandler}>AC</div>
                  <div className=" calculatorBtn regularCalBtn " id="seven" onClick={digitBtnHandler}>7</div>
                  <div className=" calculatorBtn regularCalBtn " id="eight" onClick={digitBtnHandler}>8</div>
                  <div className=" calculatorBtn regularCalBtn " id="nine" onClick={digitBtnHandler}>9</div>
                  <div className=" calculatorBtn regularCalBtn " id="multiply" onClick={operatorBtnHandler}>*</div>
                  <div className=" calculatorBtn regularCalBtn " id="four" onClick={digitBtnHandler}>4</div>
                  <div className=" calculatorBtn regularCalBtn " id="five" onClick={digitBtnHandler}>5</div>
                  <div className=" calculatorBtn regularCalBtn " id="six" onClick={digitBtnHandler}>6</div>
                  <div className=" calculatorBtn regularCalBtn " id="divide" onClick={operatorBtnHandler}>/</div>
                  <div className=" calculatorBtn regularCalBtn " id="one" onClick={digitBtnHandler}>1</div>
                  <div className=" calculatorBtn regularCalBtn " id="two" onClick={digitBtnHandler}>2</div>
                  <div className=" calculatorBtn regularCalBtn " id="three" onClick={digitBtnHandler}>3</div>
                  <div className=" calculatorBtn regularCalBtn " id="zero" onClick={digitBtnHandler}>0</div>
                  <div className=" calculatorBtn regularCalBtn " id="decimal" onClick={onDecimal}>.</div>
                  <div className=" calculatorBtn " id="equals" onClick={onEqual}>=</div>
                  <div className=" calculatorBtn regularCalBtn " id="subtract" onClick={operatorBtnHandler}>-</div>
                  <div className=" calculatorBtn " id="add" onClick={operatorBtnHandler}>+</div>
              </div>
      </header>
    </div>
  );
}

export default App;
