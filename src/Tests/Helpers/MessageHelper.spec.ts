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

  expect(embedMessage).toEqual(expectedEmbedMessage);
});
