'use-strict';

var telegramBot = require('node-telegram-bot-api');
var token = "119356191:AAHKRaMreYs_VFIFxTqIC68f3RB_i1k4UmY";
var plexBot = new telegramBot(token, {polling: {interval: 2000, timeout: 10}});
var plexRequestCall = require('request-promise');
var plex = require('../plex');

var bot = {

    plexRequestMatch: function (plexObj) {

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

    }
}

function getEndPoint(plexObj) {
    var options = plex.createEndPointOptions(plexObj);
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
            var format = {
                "parse_mode": "HTML"
            }

            plexBot.sendMessage(fromId, message, format);
        })
        .catch(function (err) {
            console.log("PLEX API ERROR: ", err);
            return Promise.reject(err);
        });
};

function sortRequestData (plexResults, fromId) {

    for (var media in plexResults){

        if (media == '_children') {
            var show = plexResults[media];
            var content = show.map(function (shows) {

                var plexContent = "";

                if (shows.type == 'episode') {

                    plexContent =
                        "\n" + "<b>" + shows.grandparentTitle + "</b>" +
                        ", \n" + shows.title + "\n(S:" + shows.index +
                        " E:" + shows.parentIndex + ")\n";

                    return plexContent;
                }
                else if (shows.type == 'movie') {

                    plexContent = "\n"+ "<b>" + shows.title + "</b>" + "\nStudio: " + shows.studio + "\nRating: " + shows.rating + "\n";
                    return plexContent;
                }
            });

            var contentList = content.splice(0,10).join("");
        }
    }
    var plexData = [fromId, contentList];
    return plexData;
};

module.exports = bot;