module.exports = {
	mkEvent: (params, msg) => {
		console.log("Params: ", params);
		if (params.length == 0) {
			msg.reply("Params cannot be empty");
		} else {
			msg.reply(params);
		}
	}
};
