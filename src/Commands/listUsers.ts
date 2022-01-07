import { CommandInteractionOptionResolver, Interaction } from "discord.js";

import Client from "../Client";
import { Command } from "../Interfaces";

import MessageHelper from "../Helpers/MessageHelper";

import UserRepository from "../Repositories/UserRepository";
import moment from "moment";

export const command: Command = {
  name: "listar-usuarios",
  description: "Lista todos os usuários do banco de dados",
  options: [],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const repository = new UserRepository();
    const users = await repository.findAll();

    const messageHelper = new MessageHelper();
    const embed = messageHelper.createEmbedMessage({
      title: "Lista de usuários",
      description: `Segue abaixo a lista dos usuários encontrados no sistema.`,
      color: "#0099FF",
    });

    users.forEach((user) => {
      const updatedAtFormatted = moment(user.updatedAt).format("DD/MM/YYYY HH:mm:ss");

      embed.addField(
        `ID: ${user.id}`,
        `**Nome:** ${user.name}\n**CPF:** ${user.cpf}\n**Assinatura eletrônica:** ${user.electronicSignature}\n**Senha de acesso:** ${user.accessPassword}\n**Ultima atualização:** ${updatedAtFormatted}`,
      );
    });

    return {embeds: [embed]};
  },
};
