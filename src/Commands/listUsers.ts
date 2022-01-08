import {
  CommandInteractionOptionResolver,
  Interaction,
  MessageEmbed,
} from "discord.js";
import moment from "moment";

import Client from "../Client";
import { Command } from "../Interfaces";

import MessageHelper from "../Helpers/MessageHelper";

import UserRepository from "../Repositories/UserRepository";

export const command: Command = {
  name: "listar-usuarios",
  description: "Lista todos os usuários do banco de dados",
  options: [],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const embeds = <MessageEmbed[]>[];

    const repository = new UserRepository();
    const messageHelper = new MessageHelper();

    const users = await repository.findAll();
    users.forEach(user => {
      const updatedAtFormatted = moment(user.updatedAt).format(
        "DD/MM/YYYY HH:mm:ss"
      );

      const embed = messageHelper.createEmbedMessage({
        author: "Dados do Usuário",
        title: `Id: ${user.id}`,
        description: `**Nome:** ${user.name}\n**CPF:** ${user.cpf}\n**Assinatura eletrônica:** ${user.electronicSignature}\n**Senha de acesso:** ${user.accessPassword}\n**Ultima atualização:** ${updatedAtFormatted}`,
        color: "#0099FF",
      });

      embeds.push(embed);
    });

    return { content: "Lista de usuários", embeds };
  },
};
