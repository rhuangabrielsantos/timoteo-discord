import { CommandInteractionOptionResolver, Interaction } from "discord.js";

import Client from "../Client";
import { Command } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "adicionar-piada",
  description: "Adiciona uma nova piada",
  options: [
    {
      name: "piada",
      type: "STRING" as const,
      description: "Piada engraçada (ou não) que será enviada para aprovação",
      required: true,
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const joke = options.get("piada")!.value! as string;

    const repository = new JokeRepository();
    await repository.create({
      message: joke,
      author: interaction.user.username,
      created_at: new Date().toISOString(),
    });

    return (
      `O usuário **${interaction.user.username}** adicionou a piada abaixo para aprovação:\n` +
      `- *${joke}*`
    );
  },
};
