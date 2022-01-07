import Discord, { MessageEmbed } from "discord.js";
import { Message } from "../Interfaces";

class MessageHelper {
  private MessageEmbed = new Discord.MessageEmbed();

  public createEmbedMessage(message: Message): Discord.MessageEmbed {
    this.MessageEmbed.setTitle(message.title);
    this.MessageEmbed.setDescription(message.description);
    this.MessageEmbed.setColor(message.color);
    this.MessageEmbed.setTimestamp();
    this.MessageEmbed.setFooter("Copyright © 2022 Tobnit - Todos os direitos reservados.");
    this.MessageEmbed.setAuthor(message.author ?? 'Tobnit', 'https://cdn.discordapp.com/avatars/921463185335287848/ad44dec733f248fe8de6d8879ce4a5ae.png?size=256');

    return this.MessageEmbed;
  }
}

export default MessageHelper;
