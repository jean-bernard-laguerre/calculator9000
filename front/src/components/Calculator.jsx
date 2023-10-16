import { useEffect, useState } from 'react'
import BeautifulScreen from "./BeautifulScreen";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";
import EqualButton from "./EqualButton";
import '../style/calculator.css'
import ItsOverNineThousand from './ItsOverNineThousand';

const backURL = "http://localhost:80/calculator9000/back/Route/";

function Calculator() {

    const [operation, setOperation] = useState("");
    const [result, setResult] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {}, [operation, result]);

    function calculate() {
        try{
            setOperation(eval(operation));
            setResult(eval(operation));
            save();
        }
        catch{
            alert("Invalid operation");
        }
    }

    function onClick(event) {
        setOperation(operation + event.target.textContent);
    }

    function erase() {
        setOperation(operation.slice(0, -1));
    }

    function clear() {
        setOperation("");
        setResult(0);
    }

    function save() {
        fetch(backURL + "saveOperation.php", {
            method: "POST",
            body: JSON.stringify({
                equation: operation,
                result: eval(operation)
            })
        })
        setHistory([...history, operation + "=" + result]);
    }

    return (
        <>
            <div className='calculator'>
                <ItsOverNineThousand value={result} />
                <BeautifulScreen value={operation} />
                <div>
                    <div className="tools">
                        <OperatorButton value="C" onClick={clear} />
                        <OperatorButton value="<-" onClick={erase} />
                    </div>
                    <div className="main-buttons">
                        <div className="numbers">
                            <NumberButton value={1} onClick={onClick} />
                            <NumberButton value={2} onClick={onClick} />
                            <NumberButton value={3} onClick={onClick} />
                            <NumberButton value={4} onClick={onClick} />
                            <NumberButton value={5} onClick={onClick} />
                            <NumberButton value={6} onClick={onClick} />
                            <NumberButton value={7} onClick={onClick} />
                            <NumberButton value={8} onClick={onClick} />
                            <NumberButton value={9} onClick={onClick} />
                            <NumberButton value={'.'} onClick={onClick} />
                            <NumberButton value={0} onClick={onClick} />
                            <EqualButton onClick={calculate} />
                        </div>
                        <div className="operators">
                            <OperatorButton value="+" onClick={onClick} />
                            <OperatorButton value="-" onClick={onClick} />
                            <OperatorButton value="*" onClick={onClick} />
                            <OperatorButton value="/" onClick={onClick} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="history">
                <h2>History</h2>
                {history.map((item, index) => {
                    return <p key={index}>{item}</p>
                })}
            </div>
        </>
    )
}

export default Calculator;