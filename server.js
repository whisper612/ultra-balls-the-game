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
    res.sendFile('pixi.html', { root: 'resources/sources'});
});

// scripts
app.get('/resources/libs/pixi.js', (req, res) => {
    res.sendFile('pixi.js', { root: 'resources/libs' });
});

app.get('/resources/libs/require.js', (req, res) => {
    res.sendFile('require.js', { root: 'resources/libs' });
});

app.get('/scripts/main.js', (req, res) => {
    res.sendFile('main.js', { root: 'resources/scripts' });
});

app.get('/scripts/menu.js', (req, res) => {
    res.sendFile('menu.js', { root: 'resources/scripts' });
});

app.get('/scripts/game.js', (req, res) => {
    res.sendFile('game.js', { root: 'resources/scripts' });
});

app.get('/scripts/button.js', (req, res) => {
    res.sendFile('button.js', { root: 'resources/scripts' });
});

app.get('/scripts/map.js', (req, res) => {
    res.sendFile('map.js', { root: 'resources/scripts' });
});

app.get('/scripts/field.js', (req, res) => {
    res.sendFile('field.js', { root: 'resources/scripts' });
});

app.get('/scripts/tile.js', (req, res) => {
    res.sendFile('tile.js', { root: 'resources/scripts' });
});

// field
app.get('/assets/images/field/background.png', (req, res) => {
    res.sendFile('background.png', { root: 'resources/assets/images/field/' });
});

app.get('/assets/images/field/field.png', (req, res) => {
    res.sendFile('field.png', { root: 'resources/assets/images/field/' });
});

// buttons
app.get('/assets/images/buttons/menuButtonNormal.png', (req, res) => {
    res.sendFile('menuButtonNormal.png', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/menuButtonPress.png', (req, res) => {
    res.sendFile('menuButtonPress.png', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvlNormal.png', (req, res) => {
    res.sendFile('lvlNormal.png', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvlPress.png', (req, res) => {
    res.sendFile('lvlPress.png', { root: 'resources/assets/images/buttons/' });
});

// balls
app.get('/assets/images/balls/redBall.png', (req, res) => {
    res.sendFile('redBall.png', { root: 'resources/assets/images/balls/' });
});

app.get('/assets/images/balls/orangeBall.png', (req, res) => {
    res.sendFile('orangeBall.png', { root: 'resources/assets/images/balls/' });
});/resources/

app.get('/assets/images/balls/greenBall.png', (req, res) => {
    res.sendFile('greenBall.png', { root: 'resources/assets/images/balls/' });
});

app.get('/assets/images/balls/dkBlueBall.png', (req, res) => {
    res.sendFile('dkBlueBall.png', { root: 'resources/assets/images/balls/' });
});

app.get('/assets/images/balls/blueBall.png', (req, res) => {
    res.sendFile('blueBall.png', { root: 'resources/assets/images/balls/' });
});

app.get('/assets/images/balls/purpleBall.png', (req, res) => {
    res.sendFile('purpleBall.png', { root: 'resources/assets/images/balls/' });
});