import React, {useEffect, useState} from "react";

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';

const generateRandomStringOfLength = (length) => {
    let random = "";
    for (let i = 0; i < length; i++) {
        random += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }
    return random;
};

const decodeString = (inputString, callback = console.log) => {
    const cycles = 3;
    let running = true;

    const decodeChar = (current, cycle) => {
        if (!running) return;

        const random = generateRandomStringOfLength(inputString.length - current.length);

        callback(current + random);

        if (current !== inputString) {
            if (cycle === 0) {

                setTimeout(() => decodeChar(current + inputString[current.length], cycles), 20);
            } else {

                setTimeout(() => decodeChar(current, cycle - 1), 20);
            }
        }
    };

    decodeChar("", cycles);
    return () => {
        running = false;
    };
};


export const ScrambledText = ({ text }) => {
    const [scrambled, setScrambled] = useState(text);

    useEffect(() => {
        decodeString(text, setScrambled);
    }, [text]);

    return <p>{scrambled}</p>;
};
