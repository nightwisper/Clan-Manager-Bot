const { CLIENT_TOKEN, CLIENT_PREFIX } = require("./config/keys");

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
	if (msg.content === "ping") {
		msg.reply("pong");
	}
});

client.login(CLIENT_TOKEN);
