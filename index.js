require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on("messageCreate", function(message) {
   if (message.author.bot) return;
   if (!message.mentions.has(client.user.id)) return;
   var msg = message.content.replace(/<(.*?)>/g, '').trim();
   //console.log(msg);
   try {
	   (async () => {
			const gptResponse = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: msg,
				max_tokens: 500,
				temperature: 0.9,
				presence_penalty: 0,
				frequency_penalty: 0,
			  });
			return message.reply(`${gptResponse.data.choices[0].text}`);
			//prompt += `${gptResponse.data.choices[0].text}\n`;
		})();
    } catch(err) {
	  return message.reply("program exception");
	}

});
        
client.login(process.env.BOT_TOKEN);