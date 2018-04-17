/*
Experimenting with solutions to the Advent of Code challenge 2015-1 (http://adventofcode.com/2015/day/1)

Created by Thimothé Lamoureux
April 16 2018


    Decomposed problem:
        Read input file
        Parse input file
            For each (, increment floor
            For each ), decrease floor
        Return final floor

    Considerations:
        Written in Node.js
        KISS, no over abstraction
        Order of parenthesis doesn't matter
        Processing speed does matter
        Infinity of floors and basements

    Proposed solutions
        1- Process all char sequentially and increment or decrement counter.
            1.1 What kind of Loop?
        2- Transform string into an array, use array.reduce
            2.1 If condition
            2.2 Switch condition
        3- Explore Regex (https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string)

 */



const fs = require('fs');
const puzzle = fs.readFile('./santa_input.txt', (err, data) => {
    if (err) throw err;

    let data_string = data.toString();

    console.time('1');
    console.log('1 You are at floor ', floorFinder1(data_string));
    console.timeEnd('1');

    console.time('21');
    console.log('21 You are at floor ', floorFinder21(data_string));
    console.timeEnd('21');

    console.time('22');
    console.log('22 You are at floor ', floorFinder22(data_string));
    console.timeEnd('22');

    console.time('23');
    console.log('23 You are at floor ', floorFinder23(data_string));
    console.timeEnd('23');

    console.time('3');
    console.log('3 You are at floor ', floorFinder3(data_string));
    console.timeEnd('3');
});

/**
 * Solution1 using a for loop
 *
 * @param data Input consisting in '(' or ')', all other characters are not considered. '(' raises floor, ')' lowers floor.
 *
 * @returns integer The final floor
 */
const floorFinder1 = (data) => {
    let floor = 0;

    for (let i = 0; i < data.length; i++) {
        let char = data.charAt(i);

        if (char === '(')
            floor++;
        else if (char === ')')
            floor--;
    }

    return floor;
}

/**Second solution, iteration 1 to compare speed of if statements with switch statements and ternary conditions
 * Easy to read
 *
 * @param {string} data collection of ( and ) to parse
 * @return {number} The final floor
 */
const floorFinder21 = (data) => {
    let data_array = data.split('');

    return data_array.reduce( (floor, char) => {

        if (char === '(')
            return ++floor;
        else if (char === ')')
            return --floor;

    }, 0);
};

/**Second solution, iteration 2 to compare speed of ternary conditions with if and switch statements
 * Could provide a cleaner solution if needed to be built upon
 *
 * @param {string} data collection of ( and ) to parse
 * @return {number} The final floor
 */
const floorFinder22 = (data) => {
    return data.split('').reduce( (floor, char) => {
        switch(char) {
            case '(':
                return ++floor;
            case ')':
                return --floor;
        }
    }, 0);
};

/**Second solution, iteration 3 to compare speed of ternary conditions with if and switch statements
 * It is not the most readable code...
 *
 * @param {string} data collection of ( and ) to parse
 * @return {number} The final floor
 */
const floorFinder23 = (data) => {
    let data_array = data.split('');

    return data_array.reduce( (floor, char) => {

        return char === '(' ? ++floor :
            char === ')' ? --floor : floor

    }, 0);
};

/**Third attempt at calculating the floor using regular expressions.
 * I am expecting this solution to be slower because it needs to parse the string twice.
 * Surprisingly, it fares much better than the for loop and is on par with solution 21 and 22
 *
 * @param {string} data collection of ( and ) to parse
 * @return {number} The final floor
 */
const floorFinder3 = (data) => {
    let count = (str, char) => str.match(new RegExp(char, 'g')).length;

    // Need to escape backslash and parenthesis
    return count(data, '\\(') - count(data, '\\)');
}