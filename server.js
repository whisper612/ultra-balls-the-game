// Params
const express = require('express');
const app = express();
const PORT = (process.env.PORT || 5000);

// Server init
app.listen(PORT, (err) => {
    if (err) {
        return console.log('Ups, something went wrong')
    }
})

// Static files use
app.use('/resources', express.static('resources'));

// Router
app.get('/', (req, res) => {
    res.sendFile('pixi.html', { root: 'resources/sources'});
});

app.get('/pixi', (req, res) => {
    res.sendFile('pixi.html', { root: 'resources/sources' });
});