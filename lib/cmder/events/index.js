const fs = require("fs");

const events = fs.existsSync("./lib/cmder/events/store.json")
	? JSON.parse(fs.readFileSync("./lib/cmder/events/store.json"))
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
		id: events.length,
		title: title,
		when: dateTime,
		description: description,
		created: new Date(),
		author: author
	});
	return { id: events.length - 1, e: events[events.length - 1] };
}

function queryEvents(search) {
	queryResults = [];

	if (parseInt(search)) {
		queryResults.push(events[parseInt(search)]);
	}
	console.log(queryResults);

	events.forEach(e => {
		if (!queryResults.includes(e)) {
			if (e.title.includes(search)) {
				queryResults.push(e);
			} else if (e.when.includes(search)) {
				queryResults.push(e);
			} else if (e.description.includes(search)) {
				queryResults.push(e);
			} else if (e.author.includes(search)) {
				queryResults.push(e);
			}
		}
	});

	if (queryResults.length == 0) {
		return events;
	}
	return queryResults;
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
	getEvents: (params, msg) => {
		const results = queryEvents(params);
		console.log(results);

		var response = `<@!${msg.author.id}> Here are your search results:`;
		results.forEach(e => {
			response += `\n\`\`\`JSON\n${JSON.stringify(e, null, 4)}\`\`\``;
		});

		msg.channel.send(response);
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
