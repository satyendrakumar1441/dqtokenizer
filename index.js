const tokenize = (str, {
    additionalBoundaryChars = [',', ';'],
    singleCharTokens = ['(', ')', '{', '}', '[', ']', ':'],
    includeDoubleQuote = true,
    includeSingleQuote = true,
    removeBackslashOfInternalDoubleQuote = false,
    removeBackslashOfInternalSingleQuote = false,
    fillMissingLastDoubleQuote = true,
    fillMissingLastSingleQuote = true,
    debug = false
} = {}) => {
    // {
    //     additionalBoundaryChars,
    //     singleCharTokens,
    //     includeDoubleQuote,
    //     includeSingleQuote,
    //     removeBackslashOfInternalDoubleQuote,
    //     removeBackslashOfInternalSingleQuote,
    //     fillMissingLastDoubleQuote,
    //     fillMissingLastSingleQuote
    // }
    //     =
    //     {
    //         additionalBoundaryChars: [','],
    //         singleCharTokens: ['(', ')', '{', '}', '[', ']', ':'],
    //         includeDoubleQuote: true,
    //         includeSingleQuote: true,
    //         removeBackslashOfInternalDoubleQuote: false,
    //         removeBackslashOfInternalSingleQuote: false,
    //         fillMissingLastDoubleQuote: true,
    //         fillMissingLastSingleQuote: true
    //     }) ={
    if (debug) {
        const options = {
            additionalBoundaryChars,
            singleCharTokens,
            includeDoubleQuote,
            includeSingleQuote,
            removeBackslashOfInternalDoubleQuote,
            removeBackslashOfInternalSingleQuote,
            fillMissingLastDoubleQuote,
            fillMissingLastSingleQuote,
            debug
        }

        console.log('options:', JSON.stringify(options, null, 2));
    }
    let dqstart = false;
    let sqstart = false;
    let lastchar = null;
    let wordstart = false;
    let startIndex = -1;
    const tokens = [];
    const addToken = (token) => {
        if (removeBackslashOfInternalDoubleQuote) {
            tokens.push(token.replace(/\\"/g, '"'));
            return;
        }

        if (removeBackslashOfInternalSingleQuote) {
            tokens.push(token.replace(/\\'/g, `'`));
            return;
        }

        tokens.push(token);
    }

    const isSingleCharToken = (c) => {
        if (singleCharTokens === undefined || singleCharTokens === null) {
            return false;
        }

        return singleCharTokens.some(achar => achar === c);
    }

    const isBoundaryChar = (c) => {
        if (additionalBoundaryChars === undefined || additionalBoundaryChars === null) {
            return false;
        }

        return additionalBoundaryChars.some(achar => achar === c);
    }

    for (var i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        // Whitespace
        if (/\s/.test(c) || isBoundaryChar(c)) {
            if (!dqstart && !sqstart) {
                if (wordstart) {
                    wordstart = false;
                    addToken(str.substring(startIndex, i));
                }
            }
            // Double quote
        } else if (c === '"') {
            if (lastchar != null && lastchar === '\\') {
            } else if (sqstart) {
            } else if (dqstart) {
                dqstart = false;
                if (includeDoubleQuote) {
                    addToken(str.substring(startIndex, i + 1));
                } else {
                    addToken(str.substring(startIndex + 1, i));
                }
                wordstart = false;
            } else {
                if (wordstart) {
                    addToken(str.substring(startIndex, i));
                }
                dqstart = true;
                wordstart = true;
                startIndex = i;
            }
            // Single quote
        } else if (c === `'`) {
            if (lastchar != null && lastchar === '\\') {
            } else if (dqstart) {
            } else if (sqstart) {
                sqstart = false;
                if (includeSingleQuote) {
                    addToken(str.substring(startIndex, i + 1));
                } else {
                    addToken(str.substring(startIndex + 1, i));
                }
                wordstart = false;
            } else {
                if (wordstart) {
                    addToken(str.substring(startIndex, i));
                }
                sqstart = true;
                wordstart = true;
                startIndex = i;
            }
            // Non-whitespace or doublequote
        } else if (isSingleCharToken(c)) {
            if (sqstart || dqstart) {

            } else {
                if (wordstart) {
                    addToken(str.substring(startIndex, i));
                }

                wordstart = false;
                addToken(str.substring(i, i + 1));
            }
        } else {
            if (wordstart == false) {
                wordstart = true;
                startIndex = i;
            }
        }

        lastchar = c;

        // Handle end condition
        if (i == str.length - 1) {
            if (wordstart) {
                wordstart = false;
                addToken(str.substring(startIndex, i + 1));
            } else if (dqstart) {
                if (includeDoubleQuote) {
                    addToken(str.substring(startIndex, i + 1) + fillMissingLastDoubleQuote ? '"' : '');
                } else {
                    addToken(str.substring(startIndex + 1, i + 1));
                }
            } else if (sqstart) {
                if (includeSingleQuote) {
                    addToken(str.substring(startIndex, i + 1) + fillMissingLastSingleQuote ? `'` : '');
                } else {
                    addToken(str.substring(startIndex + 1, i + 1));
                }
            }
        }
    }

    return tokens;
}

const test = true;
if (test) {
    const testTokenize = (str, options) => {
        const tokens = tokenize(str, options);
        console.log();
        console.log(`str: ${str}`);
        console.log(`tokens:`);
        tokens.forEach((token, index) => console.log(`\t${index}: ${token}`));
    }

    testTokenize('eval,; hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \\"90\\")" print nohia attributes "partNum"');

    testTokenize('eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \\"90\\")" print nohia attributes "partNum"', {
        includeDoubleQuote: false,
        removeBackslashOfInternalDoubleQuote: true,
    });

    testTokenize(`{"letters" : '321"}{}"'}{'{}{{}"': "stack{}}{"}`, {
        additionalBoundaryChars: [],
        singleCharTokens: ['(', ')', '{', '}', '[', ']', ':'],
    });
}

exports.tokenize = tokenize;
