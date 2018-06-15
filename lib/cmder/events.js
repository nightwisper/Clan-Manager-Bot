/**
 * Creates an event object
 * @param  {string} title       Event's title
 * @param  {string} dateTime    Event's date
 * @param  {string} description Event's description
 * @param  {string} author      Event's author
 * @return {object}
 */

function createEvent(title, dateTime, description, author) {
	return {
		title: title,
		when: dateTime,
		description: description,
		created: new Date(),
		author: author
	};
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
			e = createEvent(
				params[0],
				params[1],
				params[2],
				msg.author.username
			);
			console.log(e);
			msg.reply("```JSON\n" + JSON.stringify(e, null, 4) + "\n```");
		}
	}
};
