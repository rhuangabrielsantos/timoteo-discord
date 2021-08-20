import { MessageReaction, User } from "discord.js";
import Client from "../Client";
import { Event } from "../Interfaces";

export const event: Event = {
  name: "messageReactionAdd",
  run: async (client: Client, reaction: MessageReaction, user: User) => {
    if (user?.bot) return;

    const reactions = [
      {
        name: "Disponível",
        symbol: "✅",
      },
      {
        name: "Ocupado",
        symbol: "⛔",
      },
      {
        name: "Café",
        symbol: "☕",
      },
    ];

    const emojiReaction = reaction?.emoji?.name;
    const guildId = reaction?.message?.guild?.id
      ? reaction.message.guild.id
      : "";

    const guild = client.guilds.cache.get(guildId);

    await reactions.forEach(async emoji => {
      const role = guild?.roles.cache.find(role => role.name === emoji.name);

      if (!role) {
        await reaction.message.reply(
          `Não foi possível encontrar o cargo ${emoji.name}, por favor, crie o cargo com o nome ${emoji.name}.`
        );

        return;
      }

      await guild?.members.cache.get(user.id)?.roles.remove(role.id);

      if (emoji.symbol === emojiReaction) {
        await guild?.members.cache.get(user.id)?.roles.add(role.id);

        if (guild?.ownerId !== user.id) {
          const nickName =
            user.username.includes(reactions[0].symbol) ||
            user.username.includes(reactions[1].symbol) ||
            user.username.includes(reactions[2].symbol)
              ? user.username.replace(reactions[0].symbol, "")
              : user.username;

          await guild?.members.cache
            .get(user.id)
            ?.setNickname(emoji.symbol + " " + nickName);
        }

        await reaction.message.channel.send("Status alterado com sucesso!");
        await reaction.message.delete();
      }
    });
  },
};
