const { CLIENT_TOKEN, CLIENT_PREFIX } = require("./config/keys");

const Discord = require("discord.js");
const client = new Discord.Client();

const cmder = require("./lib/cmder");

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("Dreaming of electric deploybots");
});

client.on("message", msg => {
	if (msg.content.substr(0, 1) === CLIENT_PREFIX) {
		cmder.handle(msg, client);
	}
});

client.login(CLIENT_TOKEN);
