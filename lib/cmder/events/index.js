const fs = require("fs");

const events = fs.existsSync("./lib/cmder/events/store.json")
	? JSON.parse(require("./store.json"))
	: [];
/**
 * Creates an event object
 * @param  {string} title       Event's title
 * @param  {string} dateTime    Event's date
 * @param  {string} description Event's description
 * @param  {string} author      Event's author
 * @return {object}
 */

function createEvent(title, dateTime, description, author) {
	events.push({
		title: title,
		when: dateTime,
		description: description,
		created: new Date(),
		author: author
	});
	return { id: events.length - 1, e: events[events.length - 1] };
}

module.exports = {
	/**
	 * Processes mkEvent request
	 * @param  {array} params Array containing request parameters
	 * @param  {object} msg    Message object received from Discord.js api
	 * @return {null}
	 */
	mkEvent: (params, msg) => {
		console.log("Params: ", params);
		if (params.length == 0) {
			msg.reply("Params cannot be empty");
			return false;
		} else {
			const { e, id } = createEvent(
				params[0],
				params[1],
				params[2],
				msg.author.username
			);
			msg.channel.send(
				`_Created event entry ID: ${id}_\n` +
					"```JSON\n" +
					JSON.stringify(e, null, 4) +
					"\n```"
			);
		}
	},
	/**
	 * Saves all content from the events array into the store.json file
	 * @return {null}
	 */
	__saveAll: () => {
		fs.writeFileSync(
			"./lib/cmder/events/store.json",
			JSON.stringify(events)
		);
	}
};
