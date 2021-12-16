import { CommandInteractionOptionResolver, Interaction } from "discord.js";

import Client from "../Client";

import { Command } from "../Interfaces";
import ThoughtRepository from "../Repositories/ThoughtRepository";

export const command: Command = {
  name: "adicionar-pensamento",
  description: "Adiciona um novo pensamento",
  options: [
    {
      name: "pensamento",
      type: "STRING" as const,
      description:
        "Pensamento motivacional (ou não) que será enviado para aprovação",
      required: true,
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const thought = options.get("pensamento")!.value! as string;

    const repository = new ThoughtRepository();
    await repository.create({
      message: thought,
      author: interaction.user.username,
      created_at: new Date().toISOString(),
    });

    return (
      `O usuário **${interaction.user.username}** adicionou o pensamento abaixo para aprovação: \n` +
      `- *${thought}*`
    );
  },
};
