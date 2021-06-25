const tokenize = (str,
    { includeDoubleQuote, removeBackslashOfInternalDoubleQuote, fillMissingLastDoubleQuote }
        =
        {
            includeDoubleQuote: true, removeBackslashOfInternalDoubleQuote: false, fillMissingLastDoubleQuote: true
        }) => {
    let dqstart = false;
    let lastchar = null;
    let wordstart = true;
    let startIndex = -1;
    const tokens = [];
    const addToken = (token) => {
        if (removeBackslashOfInternalDoubleQuote) {
            tokens.push(token.replace(/\\"/g, '"'));
        } else {
            tokens.push(token);
        }
    }

    for (var i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        // Whitespace
        if (/\s/.test(c)) {
            if (dqstart) {

            } else {
                if (wordstart) {
                    wordstart = false;
                    addToken(str.substring(startIndex, i));
                }
            }
            // Double quote
        } else if (c === '"') {
            if (lastchar != null && lastchar === '\\') {
            } else if (dqstart) {
                dqstart = false;
                if (includeDoubleQuote) {
                    addToken(str.substring(startIndex, i + 1));
                } else {
                    addToken(str.substring(startIndex + 1, i));
                }
                wordstart = false;
            } else {
                dqstart = true;
                wordstart = true;
                startIndex = i;
            }
            // Non-whitespace or doublequote
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
            }
        }
    }

    return tokens;
}

const str = 'eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \\"90\\")" print nohia attributes "partNum"';
const tokens = tokenize(str, {
    includeDoubleQuote: false,
    removeBackslashOfInternalDoubleQuote: true,
    fillMissingLastDoubleQuote: true
});
console.log(`str: ${str}`);
console.log(`tokens: ${tokens}`);

exports.tokenize = tokenize;
