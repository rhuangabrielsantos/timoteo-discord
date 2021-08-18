import Discord, { MessageEmbed } from "discord.js";
import { Message } from "../Interfaces";

class MessageHelper {
  private MessageEmbed = new Discord.MessageEmbed();

  public createEmbedMessage(message: Message): Discord.MessageEmbed {
    this.MessageEmbed.setTitle(message.title);
    this.MessageEmbed.setDescription(message.description);
    this.MessageEmbed.setColor(message.color);

    return this.MessageEmbed;
  }
}

export default MessageHelper;
