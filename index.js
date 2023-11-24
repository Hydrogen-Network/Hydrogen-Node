const express = require('express');
const app = express();
const ejs = require("ejs");
const fs = require("fs");
app.set("view engine", "ejs");

const {createBareServer} = require("@tomphttp/bare-server-node");
const http = require("node:http");
const {uvPath} = require("@titaniumnetwork-dev/ultraviolet")

const main = () => {
    // fancy mumbo jumbo :)
    for(let [__, route] of Object.entries(fs.readdirSync("views"))) {
        route=route.slice(0,-4);
        app.get("/" + route, (_, res) => {
            res.render(route);
        });
    }
    app.get('', (_, res) => {
        res.render("index");
    });
    app.use(express.static("public/"));


    const bare = createBareServer("/bare/");
const httpServer = http.createServer();

httpServer.on("request", (req, res) => {
	if (bare.shouldRoute(req)) bare.routeRequest(req, res); else 
	app(req, res);
});

httpServer.on("error", (err) => console.log(err));
httpServer.on("upgrade", (req, socket, head) => {
	if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head); else socket.end();
});

httpServer.listen(8080, () => {
    console.log("hydrogen on port 8080");
});
}
main();

// some notes:
// the html is horrendously managed
// there's still a lot to do
// please make all the head files the same 😭 put the js files that are unique to the file at the bottom of the body
// i am a backend dev, not a front end, my head hurts when I look at html like this
// i don't wanna look at more html so you can do the rest of the partials if you would like 😊😊
