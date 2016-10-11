"use strict";

var config = {
    plexSettings: {
        server: "http://brownsmart.asuscomm.com",
        token: "sUAcuYkioJWtzS4nhJEX",
        port: ":32400",
        xTokenPlex: "?X-Plex-Token="
    },
    plexEndPoints: {   //Change these according to your current plex setup!
        library: "/library/sections/",
        tvShows: "1",
        movies: "2",
        anime: "6",
        newest: "/newest",
        recentlyAdded: "/recentlyAdded",
        recentlyAired: "/recentlyAired",
        status: "/status/sessions",
        search: "/search?query="
    },
    createEndPointOptions: function (plexObj) {

        var match = plexObj.cmd;
        var uri = [];

        switch (match) {
            case "/tv":
                uri.push(config.plexEndPoints.library);
                uri.push(config.plexEndPoints.tvShows);
                uri.push(config.plexEndPoints.recentlyAdded);
                break;

            case "/movies":
                uri.push(config.plexEndPoints.library);
                uri.push(config.plexEndPoints.movies);
                uri.push(config.plexEndPoints.recentlyAdded);
                break;

            case "/anime":
                uri.push(config.plexEndPoints.library);
                uri.push(config.plexEndPoints.anime);
                uri.push(config.plexEndPoints.newest);
                break;

            case "/whoswatching":
                uri.push(config.plexEndPoints.status);
                break;

        }

        var endPoint = uri.join("");

        var plexRequestOptions = {
            fromId: plexObj.fromId,
            options: {
                uri: config.plexSettings.server + config.plexSettings.port + endPoint,
                qs: {
                    "X-Plex-Token": config.plexSettings.token
                },
                json: true
            },
        };

        return plexRequestOptions;

    }
};

module.exports = config;