import { CommandInteractionOptionResolver, Interaction } from "discord.js";
import Client from "../Client";

import { Command } from "../Interfaces";

export const command: Command = {
  name: "rolar",
  description: "Rolar dados.",
  options: [
    {
      name: "dado",
      description: "Qual dado você quer rolar?",
      type: "STRING" as const,
      required: true,
      choices: [
        {
          name: "d4",
          value: "4",
        },
        {
          name: "d6",
          value: "6",
        },
        {
          name: "d8",
          value: "8",
        },
        {
          name: "d10",
          value: "10",
        },
        {
          name: "d12",
          value: "12",
        },
        {
          name: "d20",
          value: "20",
        },
        {
          name: "d100",
          value: "100",
        },
      ],
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const dice = options.get("dado")!.value! as number;
    const randomNumber = Math.floor(Math.random() * dice) + 1;

    return `Você rolou um \`d${dice}\` e tirou \`${randomNumber}\``;
  },
};
