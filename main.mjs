import { input } from './data.mjs';

const operators = ['+', '-', '*', '/'];

const counter = function (str, char) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count++;
        }
    }
    return count;
};

const validity = function (str) {
    const arr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '+',
        '-',
        '*',
        '/',
        '(',
        ')',
    ];

    for (let i = 0; i < str.length; i++) {
        if (arr.includes(str[i])) {
            continue;
        } else {
            return false;
        }
    }

    const firstChar = str[0];
    const lastChar = str[str.length - 1];

    if (
        operators.includes(firstChar) ||
        operators.includes(lastChar) ||
        firstChar === ')' ||
        lastChar === '('
    )
        return false;

    const count1 = counter(str, '(');
    const count2 = counter(str, ')');
    if (count1 !== count2) return false;

    const check = [
        '()',
        ')(',
        '(+',
        '(-',
        '(*',
        '(/',
        '+)',
        '-)',
        '*)',
        '/)',
        '++',
        '--',
        '**',
        '//',
        '+*',
        '+-',
        '+/',
        '-+',
        '-*',
        '-/',
        '*+',
        '*-',
        '*/',
        '/+',
        '/-',
        '/*',
    ];
    for (let i = 0; i < check.length; i++) {
        if (str.includes(check[i])) {
            return false;
        }
    }

    return true;
};

const infixToPostfix = function (str) {
    const temp = [];
    const postfix = [];
    let s = '';
    for (let i = 0; i < str.length; i++) {
        while (
            i < str.length &&
            (str[i] === '(' || operators.includes(str[i]))
        ) {
            temp.push(str[i]);
            i++;
            if (s) {
                const num = Number(s);
                postfix.push(num);
                s = '';
            }
        }
        if (str[i] === ')') {
            while (temp[temp.length - 1] !== '(') {
                if (s) {
                    const num = Number(s);
                    postfix.push(num);
                    s = '';
                }
                postfix.push(temp[temp.length - 1]);
                temp.pop();
            }
            temp.pop();
        } else {
            s += str[i];
            if (i === str.length - 1) {
                const num = Number(s);
                postfix.push(num);
                s = '';
            }
        }
    }
    while (temp.length !== 1) {
        postfix.push(temp[temp.length - 1]);
        temp.pop();
    }
    postfix.push(temp[0]);
    return postfix;
};

const opeation = function (arr) {
    const temp = [];
    let a = 0;
    let b = 0;
    let ans = 0;
    for (let i = 0; i < arr.length; i++) {
        if (operators.includes(arr[i])) {
            a = temp[temp.length - 1];
            temp.pop();
            b = temp[temp.length - 1];
            temp.pop();
            switch (arr[i]) {
                case '+':
                    temp.push(b + a);
                    break;
                case '-':
                    temp.push(b - a);
                    break;
                case '*':
                    temp.push(b * a);
                    break;
                case '/':
                    if (b / a === Infinity) throw Error('Invalid Input: ');
                    else temp.push(b / a);
                    break;
                default:
                    console.log('Error Occured');
            }
        } else {
            temp.push(arr[i]);
        }
    }
    ans = temp[temp.length - 1];
    return ans;
};

const calculator = function (str) {
    try {
        const valid = validity(str);
        if (valid) {
            const postfix = infixToPostfix(str);
            const ans = opeation(postfix);
            return ans;
        } else {
            throw Error('Invalid Input: ');
        }
    } catch (error) {
        // console.log(`${error.message} + ${str}`);
        return 'invalid';
    }
};

const inputFunc = function (input, calculator) {
    input.map((item, index) => {
        const infix = item[0].replaceAll(/\s/g, '');
        if (calculator(infix) === item[1]) {
            console.log(`Test case ${index + 1} Passed.`);
        } else {
            console.log(`Test case ${index + 1} Failed.`);
        }
    });
};

inputFunc(input, calculator);
