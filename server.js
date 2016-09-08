const express = require('express');
const app = express();

app.use(express.static('build'));

app.get('/', (req, res) => {
    'use strict';

    res.sendFile('build/index.html');
})

app.listen(4444, () => {
    'use strict';

    console.log('app listening on 4444 port');
})