/*
Experimenting with solutions to the Advent of Code challenge 2015-1 (http://adventofcode.com/2015/day/1)
Use with command 'node santa_helper.js > console.txt' to get console output in a file.

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
        Explore different techniques
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
const inputFile = './santa_input.txt';
const outputFile = './results.txt';

/**Measures the execution time of a function, the Node.js way
 * TODO: use a reference to a time variable instead of returning an Object
 * 
 * @param {function} callback The function for which the execution time should be measured
 * @return {function(*=): {result: *, time: *|Array}}
 */
const timeProfiling = callback => param => {
    let  time = process.hrtime();

    return {
        result: callback(param),
        time: process.hrtime(time)
    }
};

/**Executes the solution named name and provided in callback. Logs the time using console.time
 *
 * @param name Name of the solution for logging purposes
 * @param callback Solution to be applied
 * @return {Function}
 */
const applySolution = (name, callback) => data => {
    console.time(name);
    let floor = callback(data);
    console.timeEnd(name);
    console.log(`${name} using console.time:\t\tYou are at floor ${floor}`);
}

/**
 *
 * @param {array} time output of hrtime
 * @return {string} human readable time string
 */
const humanReadableTime = time => `${time[0]} seconds and ${time[1]}ns`;


const helpSanta = fs.readFile(inputFile, (err, data) => {
    if (err) throw err;

    // Clear the output file
    fs.writeFile(outputFile, '', err => {
        if (err) throw err;
    });

    let data_string = data.toString();

    // TODO: Lots of repeating code === "BAD!". Would be better to create a wrapper.

    let floor1 = timeProfiling(floorFinder1)(data_string);
    fs.appendFile(outputFile, `Solution1:\t\tYou are at floor ${floor1.result} and it took ${humanReadableTime(floor1.time)}\n`, err => {
        if (err) throw err;
    });

    applySolution('Solution1', floorFinder1)(data_string);


    let floor21 = timeProfiling(floorFinder21)(data_string);
    fs.appendFile(outputFile, `Solution21:\t\tYou are at floor ${floor21.result} and it took ${humanReadableTime(floor21.time)}\n`, err => {
        if (err) throw err;
    });

    applySolution('Solution21', floorFinder21)(data_string);

    let floor22 = timeProfiling(floorFinder22)(data_string);
    fs.appendFile(outputFile, `Solution22:\t\tYou are at floor ${floor22.result} and it took ${humanReadableTime(floor22.time)}\n`, err => {
        if (err) throw err;
    });

    applySolution('Solution22', floorFinder22)(data_string);

    let floor23 = timeProfiling(floorFinder23)(data_string);
    fs.appendFile(outputFile, `Solution23:\t\tYou are at floor ${floor23.result} and it took ${humanReadableTime(floor23.time)}\n`, err => {
        if (err) throw err;
    });

    applySolution('Solution23', floorFinder23)(data_string);

    let floor3 = timeProfiling(floorFinder3)(data_string);
    fs.appendFile(outputFile, `Solution3:\t\tYou are at floor ${floor3.result} and it took ${humanReadableTime(floor3.time)}\n`, err => {
        if (err) throw err;
    });

    applySolution('Solution.', floorFinder3)(data_string);

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





const bonus = (data, floorToFind) => {

}