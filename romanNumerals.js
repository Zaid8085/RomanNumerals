var PreDefinedRN = [
    { symbol: 'I', value: 1 },
    { symbol: 'II', value: 2 },
    { symbol: 'III', value: 3 },
    { symbol: 'IV', value: 4 },
    { symbol: 'V', value: 5 },
    { symbol: 'VI', value: 6 },
    { symbol: 'VII', value: 7 },
    { symbol: 'VIII', value: 8 },
    { symbol: 'IX', value: 9 },
    { symbol: 'X', value: 10 },
    { symbol: 'L', value: 50 },
    { symbol: 'C', value: 100 },
    { symbol: 'D', value: 500 },
    { symbol: 'M', value: 1000 },
    /* One less than fixed Roman Number */
    { symbol: 'IV', value: 4 },
    { symbol: 'IX', value: 9 },
    { symbol: 'XL', value: 40 },
    { symbol: 'XC', value: 90 },
    { symbol: 'CD', value: 400 },
    { symbol: 'CM', value: 900 },
];
var TEN = 10;
var HUNDRED = 100;
/* Take input from user range should be between 0 t0 4000*/
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
(function takeInput() {
    readline.question("Enter number to get Roman Number : ", function (num) {
        /* Entered user number as input and console it's output */
        console.log(romanNumeralGenerator(num));
        readline.question("Do you want to continue? Y/N: ", function (answer) {
            if (answer.toUpperCase() === 'Y') {
                takeInput();
            }
            else {
                readline.close();
            }
        });
    });
})();
/***********************************************************BELOW IS THE MAIN PROGRAM ***************************************************** */
/* Main function which generate the numeral number */
var romanNumeralGenerator = function (value) {
    /* Checking for invalid number */
    if (isNaN(value) || (value < 1 || value > 3999)) {
        return "Invalid Number";
    }
    /* Checking for fixed value of Roman Numerals and returning it */
    var symbol = checkForPreDefinedRN(value);
    if (symbol) {
        return symbol;
    }
    /* Checking number from range 1 to 10 and returning it's symbol */
    if (value <= 10) {
        return checkForPreDefinedRN(value);
    }
    /* Check for value lesser than one ten hundred with fixed roman number */
    symbol = checkForPreDefinedRN(value);
    if (!!symbol) {
        return symbol;
    }
    /* Generate Numerals for complex numbers */
    if (!(!!symbol)) {
        return getRomanNumerals(value);
    }
};
var getRomanNumerals = function (value) {
    /* Convert number to array to get the number of entered digits */
    var numArray = convertToArray(value);
    var valueArrLen = numArray === null || numArray === void 0 ? void 0 : numArray.length;
    var generatedSymbol = '';
    /* This for loop check for every digit from 0th position to an end and convert it to Numerals */
    for (var i = 0; i < valueArrLen; i++) {
        var len = numArray[i];
        var dividend = Math.pow(10, (valueArrLen - 1 - i));
        if (len === 0) {
            continue;
        }
        ; // will skip the loop if digit is 0;
        var preDefNumeral = checkForPreDefinedRN(len * dividend);
        if (!!preDefNumeral) {
            generatedSymbol = generatedSymbol + preDefNumeral; // get symbol from fixed roman numerals
        }
        else if (dividend < 10) {
            generatedSymbol = generatedSymbol + checkForPreDefinedRN(len); // get symbol from inital 10 digits 
        }
        else if (len > 5) {
            generatedSymbol = generatedSymbol + checkNumRange(len * dividend); // this function generate RN between ranges 50 to 100 and 500 to 1000
        }
        else {
            for (var j = 0; j < len; j++) {
                generatedSymbol = generatedSymbol + checkForPreDefinedRN(dividend);
            }
        }
    }
    return generatedSymbol;
};
var checkNumRange = function (num) {
    if (num > 50 && num < 100) {
        var rnSymbol = checkForPreDefinedRN(50);
        var remVal = num - 50;
        return rnSymbol + checkTensOrHundreds(remVal, TEN);
    }
    else if (num > 500 && num < 1000) {
        var symbol = checkForPreDefinedRN(500);
        var remVal = num - 500;
        return symbol + checkTensOrHundreds(remVal, HUNDRED);
    }
};
var convertToArray = function (value) {
    return value === null || value === void 0 ? void 0 : value.toString().split('').map(Number);
};
var checkTensOrHundreds = function (value, pot) {
    var rNumeral = '';
    var quot = value / pot;
    for (var i = 0; i < quot; i++) {
        rNumeral = rNumeral + checkForPreDefinedRN(pot);
    }
    return rNumeral;
};
var checkForPreDefinedRN = function (value) {
    var _a;
    var preDefinedRomanNum = PreDefinedRN;
    return (_a = preDefinedRomanNum.find(function (x) { return (x === null || x === void 0 ? void 0 : x.value) === Number(value); })) === null || _a === void 0 ? void 0 : _a.symbol;
};
