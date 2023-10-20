import { useEffect, useState } from 'react'
import { getHistory } from '../services/functions.js';
import { backURL, operators, numbers } from '../services/config.js';
import BeautifulScreen from "./BeautifulScreen";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";
import FunctionButton from './FunctionButton.jsx';
import EqualButton from "./EqualButton";
import Title from "./Title";
import '../style/calculator.css'
import ItsOverNineThousand from './ItsOverNineThousand';

function Calculator() {

    const [operation, setOperation] = useState("");
    const [inputs, setInputs] = useState([]);
    const [result, setResult] = useState(0);
    const [history, setHistory] = useState([]);
    const [historyLoaded, setHistoryLoaded] = useState(false);

    useEffect(() => {
        !historyLoaded && getHistory().then(data => {
            setHistory(data);
            setHistoryLoaded(true);
        });

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [operation, inputs]);

    

    const calculate = () => {

        if(operation === ""){return 0};

        try{
            let equation = (operation + inputs).replace(/[^0-9%^*\/()\-+.]/g, '');
            let res = eval((equation));

            setOperation("");
            setInputs(`${res}`);
            setResult(res);
            
            save(equation, res);
        }
        catch{
            alert("Invalid operation");
        }
    }

    const handleNumbers = (e) => {
        if (operation[operation.length-1] === ".") {
            if(e.target.textContent === ".") {return 0};
        }
        setInputs(inputs + e.target.textContent);
    }

    const handleOperators = (event) => {
        setOperation(operation + inputs + event.target.textContent);
        setInputs("");
    }

    const handleEqual = () => {
        calculate();
    }

    const handleKeyDown = (event) => {
        switch (true) {
            case event.key === "Enter":
                handleEqual();
                break;
            case operators.includes(event.key):
                setOperation(operation + inputs + event.key);
                setInputs("");
                break;
            case event.key === "Backspace":
                setInputs(inputs.slice(0, -1));
                break;
            case event.key === "Escape":
                clear();
                break;
            case event.key === "Delete":
                clearHistory();
                break;
            case numbers.includes(event.key):
                setInputs(inputs + event.key);
                break;
            default:
                break;
        }
    }

    const erase = () => {
        setInputs(inputs.slice(0, -1));
    }

    const clear = () => {
        setOperation("");
        setInputs("");
        setResult(0);
    }

    const save = (operation, result) => {
        fetch(backURL + "saveOperation.php", {
            method: "POST",
            body: JSON.stringify({
                equation: operation,
                result: result
            })
        })
        setHistory([...history, {
            equation: operation,
            result: result
        }]);
    }

    const clearHistory = () => {
        fetch(backURL + "clearHistory.php")
        setHistory([]);
    }

    return (
        <>
            <Title 
                title="Calculator 9000" 
            />
            <div className='calculator'>
                <ItsOverNineThousand value={result} />
                <BeautifulScreen 
                    equation={operation} 
                    inputs = {inputs}
                />
                <div className='buttons'>
                    <div className="tools">
                        <FunctionButton value="CE" onClick={clearHistory} />
                        <FunctionButton value="C" onClick={clear} />
                        <FunctionButton value="<-" onClick={erase} />
                    </div>
                    <div className="main-buttons">
                        <div className="numbers">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                                return <NumberButton key={index} value={item} onClick={handleNumbers} />
                            })}
                            <NumberButton value='.' onClick={handleNumbers} />
                            <NumberButton value={0} onClick={handleNumbers} />
                            <EqualButton onClick={handleEqual} />
                        </div>
                        <div className="operators">
                            {['+', '-', '*', '/'].map((item, index) => {
                                return <OperatorButton key={index} value={item} onClick={handleOperators} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="history">
                <h2>History</h2>
                {history && history.map((item, index) => {
                    return <div key={index}>{item.equation} = {item.result}</div>
                })}
            </div>
        </>
    )
}

export default Calculator;