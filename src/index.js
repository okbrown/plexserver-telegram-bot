"use strict";

var request = require('request');

//Telegram
var telegramBot = require('node-telegram-bot-api');
var token = "Add Your Token Here";
var plexBot = new telegramBot(token, {polling: {interval: 2000, timeout: 10}});
var bot = require('./bot');

/*var hookOpt = {
    webHook: {
        port: 443,
        key: __dirname + '/key.pem',
        cert: __dirname + '/crt.pem'
    }
};

console.log(hookOpt.webHook.key);*/

var reg = /\/\w+|\w+/;

plexBot.onText(reg, function (msg, match) {

    var plexObj = {
        fromId: msg.chat.id,
        cmd: match[0]
    }

    bot.plexRequestMatch(plexObj);

});
