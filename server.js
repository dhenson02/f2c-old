'use strict';
const fs = require('fs');
const express = require('express');
const bp = require('body-parser');
const path = require('path');
const Server = express();
const graphQLHTTP = require('express-graphql');
const schema = require('./server/schema');

Server.use(bp.json());
Server.use(bp.urlencoded({ extended: true }));
Server.use(express.static('dist'));
Server.use(graphQLHTTP({
    schema,
    graphiql: true
}));

Server.use('/js/app.js', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'dist/js/app.js'));
});

Server.use('/css/styles.js', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'dist/css/styles.css'));
});

Server.use('*', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const server = require('http').createServer(Server);


const io = require('socket.io')(server);
io.on('connection', function ( socket ) {
    console.log(`socket.io got a connection from: `, socket.id);

    let timer = null;

    socket.on("load league settings", () => {
        if ( timer ) clearTimeout(timer);
        timer = setTimeout(() => {
            let settings = league.getSettings();
            socket.emit("league settings loaded", settings);
        }, 400);
    });
/*

    socket.on("load franchise", id => {
        if ( timer ) clearTimeout(timer);
        timer = setTimeout(() => {
            socket.emit("franchise loaded", league.getFranchise(id), id);
        }, 800);
    });

    socket.on("load player injury", id => {
        let injury = players.getInjury(id);
        socket.emit("player injury loaded", injury, id);
    });

    socket.on("load roster", id => {
        socket.emit("roster loaded", rosters.getRoster(id), id);
    });

    socket.on("load starting lineup", ( id, withScores ) => {
        let lineup = withScores ?
                     results.getLineupWithScores(id) :
                     results.getLineup(id);
        socket.emit("starting lineup loaded", lineup, id);
    });

    socket.on("load live scoring", ( week, index ) => {
        if ( week ) {
            // Get that week
        }

        let result = index ?
                     liveScoring.getMatch(index) :
                     liveScoring.getAllMatches();
        socket.emit("live scoring loaded", result, index);
    });

    /!**
     * Changing stuff
     *!/

    socket.on("change lineup", ( id, status ) => {
        socket.emit("lineup changed", id, status);
    });
*/

    socket.on("disconnect", () => console.log("D/C'd dang"));
});

server.listen(5000, () => console.log("Server listening on port 5000"));
