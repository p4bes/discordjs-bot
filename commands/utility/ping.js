const { SlashCommandBuilder, LimitedCollection } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		let test = new LimitedCollection({
			maxSize: 3, keepOverLimit: value => value.name === 'a' || value.name === 'b'
		});
		test.set('c', {name: 'c'});
		test.set('d', {name: 'd'});
		test.set('a', {name: 'a'});
		test.set('b', {name: 'b'});
		test.set('e', {name: 'e'});
		console.log(test);

		await interaction.reply('Pong!');
	},
};