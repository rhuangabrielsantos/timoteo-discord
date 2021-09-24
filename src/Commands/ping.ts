import Client from "../Client";

import { Command } from "../Interfaces";

export const command: Command = {
  name: "ping",
  description: "Verifica o tempo de resposta do servidor.",
  options: [],
  run: async (client: Client) => {
    return `**Pong!** \nO servidor respondeu em ${client.ws.ping}ms!`;
  },
};
