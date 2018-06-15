module.exports = {
	handle: (msg, client) => {
		switch (msg.content.substr(1)) {
			case "ping":
				msg.reply("pong");
				break;
			case "off":
				client.destroy();
				break;
			default:
		}
	}
};
