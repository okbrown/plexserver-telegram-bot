#PlexBot

#####Provide your leechers with some helpful info on what content has been recently added to your Plex Media Server.

Using <a href="https://core.telegram.org/bots/api" target="_blank">Telegram's Bot API</a>, and <a href="https://www.plex.tv/" target="_blank">Plex Media Server</a> API you can bring them together to send messages to your Telegram Bot which will then make a call to your Local Plex Server's API, as a `GET` request, which has many different endpoints, the most useful being `/recentlyAdded` and `newest `. Please see <a href="https://github.com/Arcanemagus/plex-api/wiki/Plex-Web-API-Overview" target="_blank">Plex Web API Overview</a> for more details on endpoints and what they do.

##Requirements
You will obviously need the chat app (Android, iOS, Windows, and Desktop) to use <a href="https://telegram.org/" target="_blank">Telegram</a> and also you will need to <a href="https://core.telegram.org/bots#3-how-do-i-create-a-bot" target="_blank">create a bot</a>.

**Personal Note:** if WhatsApp was not so 1990's when it came to messaging they would of thought about including some decent IRC, Slack, MSN style features to their app, but they didn't hence Telegram is simply the best chat app IMHO. Plus your contacts do not need to have your tel number in order for you to message you, you can use the @username option too. (BBM ¯\_(ツ)_/¯ much better privacy.)
 
 ###This project
 At the moment this is still in more of alpha state, and I have loads bits to fix and features to add, and will do so as and when I get time.
 
 **In the mean time here is what you need to know:**
 
 * The `gulpfile-git.js` that you see is to be renamed to just `gulpfile.js` the reason for this is because I use a different gulpfile that has a few more tasks I need to removes my `plex server address` and `tokens` from the project (rather than remember to delete it each time, i just run a gulp task) before I push it to github. If you need a copy of that task file let me know in case your interested.
 
 * I have tried to make it a little modular to start with so its easy to pick out what parts you need to add/replace, e.g. `tokens` etc.
 
 * Shout out to <a href="github.com/yagop/node-telegram-bot-api" target="_blank">Yagop</a> for `https://www.npmjs.com/package/node-telegram-bot-api` and also <a href="github.com/yagop/node-telegram-bot-api" target="_blank">Gochomugo</a> for  `https://www.npmjs.com/package/node-telegram-bot-api-latest` for their NPM versions of `node-telegram-bot-api` this was very helpful in me not having to reinvent the wheel. Thanks.
 
 ##Installation
 * `git clone https://github.com/okbrown/plexserver-telegram-bot` target="_blank">repo</a>
 * `npm install or npm i` (which ever you prefer)
 * `gulp develop` to start in dev mode
 
 #####Thats all for now, as thats as far as I have got myself, as I still need to clean up the way telegram displays the results it gets from the PMS API.