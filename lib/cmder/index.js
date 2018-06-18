const events = require("./events");

/**
 * Parses user message into command and parameters
 * @param  {string} str Message to be parsed
 * @return {object}     {Command, Parameters}, returns a command string
 *                          and an array of parameters]
 */
function cmdParser(str) {
	cmd = str.split(" ")[0].substr(1);
	params = str.replace("!" + cmd + " ", "").split(", ");

	console.log(params);
	return { cmd, params };
}

module.exports = {
	/**
	 * Determines which command was used and executes it.
	 * @param  {object} msg    Message object received from discord.js api
	 * @param  {object} client Client object received from app entrypoint.
	 * @return {null}
	 */
	handle: (msg, client) => {
		let { cmd, params } = cmdParser(msg.content);
		switch (cmd) {
			case "mkevent":
				events.mkEvent(params, msg);
				break;
			case "seevent":
				events.getEvents(params, msg);
				break;
			case "ping":
				msg.reply(client.ping);
				break;
			case "off":
				msg.channel.send("Initiating shutdown sequence");
				events.__saveAll();
				msg.channel.send("Saving events");

				setTimeout(() => {
					msg.channel.send(
						"So long, farewell, auf Wiedersehen, goodbye. I leave and heave a sigh and say goodbye (falsetto) -- Goodbye!"
					);
					client.destroy();
				}, 5000);

				break;
		}
	}
};
