function cmdParser(str) {
	cmd = str.split()[0].substr(1);
	params = str.split().slice(1);

	return { cmd, params };
}

module.exports = {
	/**
	 * Determines which command was used and executes it.
	 * @param  {[object]} msg    [Message object received from discord.js api]
	 * @param  {[object]} client [Client object received from app entrypoint.]
	 * @return {[null]}        []
	 */
	handle: (msg, client) => {
		let { cmd, params } = cmdParser(msg.content);
		switch (cmd) {
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
