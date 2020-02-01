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

// field
app.get('/assets/images/field/background.png', (req, res) => {
    res.sendFile('background.png', { root: 'resources/assets/images/field/' });
});

app.get('/assets/images/field/field.png', (req, res) => {
    res.sendFile('field.png', { root: 'resources/assets/images/field/' });
});

// buttons
app.get('/assets/images/buttons/startButtonNormal.png', (req, res) => {
    res.sendFile('startButtonNormal.png', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/startButtonPress.png', (req, res) => {
    res.sendFile('startButtonPress.png', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/startButtonPress.png', (req, res) => {
    res.sendFile('startButtonPress.png', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl1Normal', (req, res) => {
    res.sendFile('lvl1Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl1Press', (req, res) => {
    res.sendFile('lvl1Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl2Normal', (req, res) => {
    res.sendFile('lvl2Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl2Press', (req, res) => {
    res.sendFile('lvl2Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl3Normal', (req, res) => {
    res.sendFile('lvl3Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl3Press', (req, res) => {
    res.sendFile('lvl3Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl4Normal', (req, res) => {
    res.sendFile('lvl4Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl4Press', (req, res) => {
    res.sendFile('lvl4Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl5Normal', (req, res) => {
    res.sendFile('lvl5Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl5Press', (req, res) => {
    res.sendFile('lvl5Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl6Normal', (req, res) => {
    res.sendFile('lvl6Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl6Press', (req, res) => {
    res.sendFile('lvl6Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl7Normal', (req, res) => {
    res.sendFile('lvl7Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lv7Press', (req, res) => {
    res.sendFile('lvl7Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl8Normal', (req, res) => {
    res.sendFile('lvl8Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl8Press', (req, res) => {
    res.sendFile('lvl8Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl9Normal', (req, res) => {
    res.sendFile('lvl9Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl9Press', (req, res) => {
    res.sendFile('lvl9Press', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl10Normal', (req, res) => {
    res.sendFile('lvl10Normal', { root: 'resources/assets/images/buttons/' });
});

app.get('/assets/images/buttons/lvl10Press', (req, res) => {
    res.sendFile('lvl10Press', { root: 'resources/assets/images/buttons/' });
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