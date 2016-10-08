"use strict";

var request = require('request');
var plexRequestCall = require('request-promise');
var config = require('./plex-config');

//Telegram
var telegramBot = require('node-telegram-bot-api-latest');
var token = "telegram-token-here";
var plexBot = new telegramBot(token, {polling: true});
var reg = /\/\w+|\w+/;

plexBot.onText(reg, function (msg, match) {

    var plexObj = {
        fromId: msg.from.id,
        cmd: match[0]
    }

    plexRequestMatch(plexObj);

});

function plexRequestMatch (plexObj) {

    var match = plexObj.cmd;

    switch (match) {

        case "/tv":
            var options = getEndPoint(plexObj);
            plexGetRequest(options);
            break;

        case "/movies":
            var options = getEndPoint(plexObj);
            plexGetRequest(options);
            break;

        case "/anime":
            var options = getEndPoint(plexObj);
            plexGetRequest(options);
            break;

        case "/whoswatching":
            var options = getEndPoint(plexObj);
            plexGetRequest(options);
            break;

        default:
            var plexResponse = "I'm, not a person... Use commands:\n/tv \n/movies \n/anime \n/whoswatching";
            plexBot.sendMessage(plexObj.fromId, plexResponse);
            break;
    }

};

function getEndPoint(plexObj) {
    var options = config.createEndPointOptions(plexObj);
    console.log(options);
    return options;
};

function plexGetRequest(options) {

    var requestOptions = options.options;
    var fromId = options.fromId;

    plexRequestCall(requestOptions)
        .then(function (plexResults) {
            return sortRequestData(plexResults, fromId);
        })
        .then(function (plexData) {

            var fromId = plexData[0];
            var message = plexData[1];

            plexBot.sendMessage(fromId, message);
        })
        .catch(function (err) {
            console.log("PLEX API ERROR: ", err);
            return Promise.reject(err);
        });
};

function sortRequestData (plexResults, fromId){

    for (var media in plexResults){
        if (media == '_children'){
            var show = plexResults[media];

            var content = show.map(function (shows) {
                return shows.grandparentTitle;
            });

            var contentList = JSON.stringify(content.splice(0,5));
        }
    }
    var plexData = [fromId, contentList];
    return plexData;
};