import { backURL, operators } from "./config.js";

export const getHistory = async() => {
    let response = await fetch(backURL + "getHistory.php");
    let data = await response.json();

    return data.data;
}

export const splitOperation = (operation) => {
    let newOperation = operation.split("");
    let parsedOperation = [];
    let number = "";
    let operator = "";
    newOperation.forEach(item => {
        if (numbers.includes(item)) {
            number += item;
        }
        else if (operators.includes(item)) {
            parsedOperation.push(number);
            number = "";
            operator = item;
            parsedOperation.push(operator);
        }
    });
    parsedOperation.push(number);
    return parsedOperation;
}

// recursively parse operation array example ["1", "+", "2", "*", "3"] to ["1", "+", ["2", "*", "3"]]
export const parseOperation = (splitOperation) => {
    
    if (splitOperation.length <= 3) {
        return splitOperation;
    }

    let parsedOperation = [];
    let subOperation = [];
    
    let operator = "";

    for (let i = 0; i < splitOperation.length; i++) {
        if (operators.includes(splitOperation[i])) {

            operator = splitOperation[i];

            if (products.includes(operator)){
                subOperation.push(splitOperation[i - 1]);
                subOperation.push(operator);

            } else {
                parsedOperation.push(operator);
            }
        } else {

            if (products.includes(operator)){
                subOperation.push(splitOperation[i]);
            } else {
                parsedOperation.push(splitOperation[i]);
            }
        }

    }

    return parsedOperation;
}