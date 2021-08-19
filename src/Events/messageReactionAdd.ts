import { Event } from "../Interfaces";

export const event: Event = {
  name: "messageReactionAdd",
  run: (client, reaction, user) => {
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

    reactions.forEach(emoji => {
      const role = guild?.roles.cache.find(role => role.name === emoji.name);

      if (!role) {
        reaction.message.reply(
          `Não foi possível encontrar o cargo ${emoji.name}, por favor, crie o cargo com o nome ${emoji.name}.`
        );

        return;
      }

      guild?.members.cache.get(user.id)?.roles.remove(role.id);

      if (emoji.symbol === emojiReaction) {
        guild?.members.cache.get(user.id)?.roles.add(role.id);
        reaction.message.delete();

        reaction.message.channel.send("Status alterado com sucesso!");
      }
    });
  },
};
