    interface IRomanNumerals {
        symbol: string;
        value: number;
    }

    const PreDefinedRN: IRomanNumerals[] = [
        {symbol: 'I', value: 1},
        {symbol: 'II', value: 2},
        {symbol: 'III', value: 3},
        {symbol: 'IV', value: 4},
        {symbol: 'V', value: 5},
        {symbol: 'VI', value: 6},
        {symbol: 'VII', value: 7},
        {symbol: 'VIII', value: 8},
        {symbol: 'IX', value: 9},
        {symbol: 'X', value: 10},
        {symbol: 'L', value: 50},
        {symbol: 'C', value: 100},
        {symbol: 'D', value: 500},
        {symbol: 'M', value: 1000},
        /* One less than fixed Roman Number */
        {symbol: 'IV', value: 4},
        {symbol: 'IX', value: 9},
        {symbol: 'XL', value: 40},
        {symbol: 'XC', value: 90},
        {symbol: 'CD', value: 400},
        {symbol: 'CM', value: 900},
    ]

    const TEN = 10;
    const HUNDRED = 100

    /* Take input from user range should be between 0 t0 4000*/
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    (function takeInput() {
        readline.question(`Enter number to get Roman Number : `, (num: number) => {
            /* Entered user number as input and console it's output */
         console.log(romanNumeralGenerator(num));
            readline.question(`Do you want to continue? Y/N: `, (answer: string) => {
                if ( answer.toUpperCase() === 'Y') {
                    takeInput();
                } else {
                    readline.close();
                } 
            })
            
        });  
    })();

    /***********************************************************BELOW IS THE MAIN PROGRAM ***************************************************** */

    /* Main function which generate the numeral number */
    const romanNumeralGenerator = (value: number) : string | undefined => {

        /* Checking for invalid number */
        if (isNaN(value) || (value < 1 || value > 3999)) {
            return "Invalid Number";
        }

        /* Checking for fixed value of Roman Numerals and returning it */
        let symbol = checkForPreDefinedRN(value);
        
        if (symbol) {
            return symbol;
        }

        /* Checking number from range 1 to 10 and returning it's symbol */
        if (value <= 10) {
            return checkForPreDefinedRN(value);
        }    

        /* Check for value lesser than one ten hundred with fixed roman number */
        symbol = checkForPreDefinedRN(value);

        if(!!symbol) {
            return symbol;
        }
        /* Generate Numerals for complex numbers */
        if (!(!!symbol)) {
            return getRomanNumerals(value);
        }
    }

    const getRomanNumerals = (value: number) => {

        /* Convert number to array to get the number of entered digits */
        let numArray = convertToArray(value);
        const  valueArrLen = numArray?.length;
        let generatedSymbol = '';

        /* This for loop check for every digit from 0th position to an end and convert it to Numerals */
        for (let i = 0; i < valueArrLen; i++) {
            const len =  numArray[i];
            const dividend = 10**(valueArrLen-1-i);

             if (len === 0) {continue} ; // will skip the loop if digit is 0;

                const preDefNumeral = checkForPreDefinedRN(len*dividend);
                if(!!preDefNumeral) {
                    generatedSymbol = generatedSymbol + preDefNumeral // get symbol from fixed roman numerals
                } else if (dividend < 10) {
                    generatedSymbol = generatedSymbol + checkForPreDefinedRN(len); // get symbol from inital 10 digits 
                } else if (len > 5) {
                    generatedSymbol = generatedSymbol + checkNumRange(len*dividend); // this function generate RN between ranges 50 to 100 and 500 to 1000
                } else {
                    for (let j = 0; j < len; j++) {
                        generatedSymbol = generatedSymbol + checkForPreDefinedRN(dividend);
                    }
                }
        }
        return generatedSymbol;
    }

    const checkNumRange = (num: number) => {

        if (num > 50 && num < 100) {
            let rnSymbol = checkForPreDefinedRN(50);
            let remVal = num - 50;
            return rnSymbol + checkTensOrHundreds(remVal, TEN);
        } else if (num > 500 && num < 1000) {
            let symbol = checkForPreDefinedRN(500);
            let remVal = num - 500;
            return symbol + checkTensOrHundreds(remVal, HUNDRED);
        }
    }

    const convertToArray = (value: number): number[] => {
        return value?.toString().split('').map(Number);
    }

    const checkTensOrHundreds = (value: number, pot: number) => {
        let rNumeral = '';
        let quot = value / pot;
        for (let i = 0; i < quot; i++) {
            rNumeral = rNumeral + checkForPreDefinedRN(pot);
        }
        return rNumeral;
   }
   
   const checkForPreDefinedRN = (value: number): string | undefined => {
        const preDefinedRomanNum: IRomanNumerals[] = PreDefinedRN;
        return preDefinedRomanNum.find(x => x?.value === Number(value))?.symbol;
   }
                