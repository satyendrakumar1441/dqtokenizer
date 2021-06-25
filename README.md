# What is this?

Tokenizes a String with double quotes and escaped double quotes

# Installation

`npm i dqtokenizer --save`

Then...

```
const dqtokenizer = require('dqtokenizer');

const str = 'eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \\"90\\")" print nohia attributes "partNum"';
const tokens = dqtokenizer.tokenize(str, {
    includeDoubleQuote: false,
    removeBackslashOfInternalDoubleQuote: true,
    fillMissingLastDoubleQuote: true
});
console.log(`str: ${str}`);
console.log(`tokens: ${tokens}`);

// Output:
str: eval hie "SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == \"90\")" print nohia attributes "partNum"
tokens: eval,hie,SUBSET(?x, allComponents(SQ_Server_MTM), Leftstr(?x.partNum, 2) == "90"),print,nohia,attributes,partNum
```

## Options

dqtokenizer supports 3 options, all of which are optional:

* *includeDoubleQuote* - _boolean_ (Defaults to true)
* *removeBackslashOfInternalDoubleQuote* - _boolean_ (Defaults to false)
* *fillMissingLastDoubleQuote* - _boolean_ (Defaults to true)
