// server init
const express = require('express');
const app = express();
const PORT = (process.env.PORT || 5000);

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Ups, something went wrong')
    }
})

// router
app.get('/pixi', (req, res) => {
    res.sendFile('pixi.html', { root: 'resources/'});
});

app.get('/scripts/pixi.min.js', (req, res) => {
    res.sendFile('pixi.min.js', { root: 'resources/scripts' });
});

app.get('/scripts/main.js', (req, res) => {
    res.sendFile('main.js', { root: 'resources/scripts' });
});

app.get('/assets/images/background.png', (req, res) => {
    res.sendFile('background.png', { root: 'resources/assets/images/' });
});

app.get('/assets/images/redBall.png', (req, res) => {
    res.sendFile('redBall.png', { root: 'resources/assets/images/' });
});

app.get('/assets/images/orangeBall.png', (req, res) => {
    res.sendFile('orangeBall.png', { root: 'resources/assets/images/' });
});/resources/

app.get('/assets/images/greenBall.png', (req, res) => {
    res.sendFile('greenBall.png', { root: 'resources/assets/images/' });
});

app.get('/assets/images/dkBlueBall.png', (req, res) => {
    res.sendFile('dkBlueBall.png', { root: 'resources/assets/images/' });
});

app.get('/assets/images/blueBall.png', (req, res) => {
    res.sendFile('blueBall.png', { root: 'resources/assets/images/' });
});

app.get('/assets/images/purpleBall.png', (req, res) => {
    res.sendFile('purpleBall.png', { root: 'resources/assets/images/' });
});

app.get('/assets/images/purpleBall.png', (req, res) => {
    res.sendFile('purpleBall.png', { root: 'resources/assets/images/' });
});