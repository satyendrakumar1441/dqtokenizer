# What is this?

Tokenizes input string with double quote and single quote with rich set of options. Handles escaped quote within each. Supports single-char tokens and additional word boundaries.

# Installation

`npm i dqtokenizer --save`

Then...

* Example
```
const dqtokenizer = require('dqtokenizer');

const str = 'eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \\"90\\")" print nohia attributes "partNum"';
const tokens = dqtokenizer.tokenize(str, {
    includeDoubleQuote: false,
    removeBackslashOfInternalDoubleQuote: true
});
console.log(`str: ${str}`);
console.log(`tokens: ${tokens}`);

// Output:
str: eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \"90\")" print nohia attributes "partNum"
tokens: eval,hie,SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == "90"),print,nohia,attributes,partNum
```

* More Examples
```
    const dqtokenizer = require('dqtokenizer');

    const testTokenize = (str, options) => {
        const tokens = dqtokenizer.tokenize(str, options);
        console.log();
        console.log(`str: ${str}`);
        console.log(`tokens:`);
        tokens.forEach((token, index) => console.log(`\t${index}: ${token}`));
    }

    // Example 1
    testTokenize('eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \\"90\\")" print nohia attributes "partNum"');

    // Example 2
    testTokenize('eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \\"90\\")" print nohia attributes "partNum"', {
        includeDoubleQuote: false,
        removeBackslashOfInternalDoubleQuote: true,
    });

    // Example 3
    testTokenize(`{"letters" : '321"}{}"'}{'{}{{}"': "stack{}}{"}`, {
        additionalBoundaryChars: [],
        singleCharTokens: ['(', ')', '{', '}', '[', ']', ':'],
    });

// Output:
str: eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \"90\")" print nohia attributes "partNum"
tokens:
        0: eval
        1: hie
        2: "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \"90\")"
        3: print
        4: nohia
        5: attributes
        6: "partNum"

str: eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \"90\")" print nohia attributes "partNum"
tokens:
        0: eval
        1: hie
        2: SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == "90")
        3: print
        4: nohia
        5: attributes
        6: partNum

str: {"letters" : '321"}{}"'}{'{}{{}"': "stack{}}{"}
tokens:
        0: {
        1: "letters"
        2: :
        3: '321"}{}"'
        4: }
        5: {
        6: '{}{{}"'
        7: :
        8: "stack{}}{"
        9: }
```

## Options

dqtokenizer supports a second paramater, which is optional. It contains following options:

* *additionalBoundaryChars* - _array of chars (Defaults to [',', ';'])
* *singleCharTokens* - _array of chars (Defaults to ['(', ')', '{', '}', '[', ']', ':'])
* *includeDoubleQuote* - _boolean_ (Defaults to true)
* *includeSingleQuote* - _boolean_ (Defaults to true)
* *removeBackslashOfInternalDoubleQuote* - _boolean_ (Defaults to false)
* *removeBackslashOfInternalSingleQuote* - _boolean_ (Defaults to false)
* *fillMissingLastDoubleQuote* - _boolean_ (Defaults to true)
* *fillMissingLastSingleQuote* - _boolean_ (Defaults to true)
* *debug* - _boolean_ (Defaults to false)
