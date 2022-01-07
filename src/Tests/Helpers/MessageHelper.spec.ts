import Discord from "discord.js";
import MessageHelper from "../../Helpers/MessageHelper";
import { Message } from "../../Interfaces";

test("Given a message to createEmbedMessage method, Should create embed message", () => {
  const message: Message = {
    title: "Simple text",
    description: "Simple description",
    color: "BLUE",
  };
  const embedMessage = new MessageHelper().createEmbedMessage(message);

  const expectedEmbedMessage = new Discord.MessageEmbed();
  expectedEmbedMessage.setTitle(message.title);
  expectedEmbedMessage.setDescription(message.description);
  expectedEmbedMessage.setColor(message.color);
  expectedEmbedMessage.setTimestamp();
  expectedEmbedMessage.setAuthor('Tobnit', 'https://cdn.discordapp.com/avatars/921463185335287848/ad44dec733f248fe8de6d8879ce4a5ae.png?size=256');
  expectedEmbedMessage.setFooter("Copyright © 2022 Tobnit - Todos os direitos reservados.");

  expect(embedMessage).toEqual(expectedEmbedMessage);
});
