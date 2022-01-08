import { CommandInteractionOptionResolver, Interaction } from "discord.js";
import moment from "moment-timezone";

import Client from "../Client";
import { Command } from "../Interfaces";

import MessageHelper from "../Helpers/MessageHelper";

import UserRepository from "../Repositories/UserRepository";

export const command: Command = {
  name: "adicionar-usuario",
  description: "Adiciona um usuário ao banco de dados",
  options: [
    {
      name: "nome",
      description: "Nome do usuário",
      type: "STRING",
      required: true,
    },
    {
      name: "cpf",
      description: "CPF do usuário",
      type: "STRING",
      required: true,
    },
    {
      name: "numero_conta",
      description: "Numero da conta do usuário",
      type: "STRING",
      required: true,
    },
    {
      name: "assinatura_eletrônica",
      description: "Assinatura eletrônica do usuário",
      type: "STRING",
      required: true,
    },
    {
      name: "senha_de_acesso",
      description: "Senha de acesso do usuário",
      type: "STRING",
      required: true,
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const name = options.get("nome")!.value! as string;
    const cpf = options.get("cpf")!.value! as string;
    const electronicSignature = options.get("assinatura_eletrônica")!
      .value! as string;
    const accessPassword = options.get("senha_de_acesso")!.value! as string;
    const accountNumber = options.get("numero_conta")!.value! as string;

    const repository = new UserRepository();
    await repository.create({
      name,
      cpf,
      accountNumber,
      electronicSignature,
      accessPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const messageHelper = new MessageHelper();
    const embed = messageHelper.createEmbedMessage({
      title: `Usuário adicionado com sucesso!`,
      description: `**Nome:** ${name}\n**CPF:** ${cpf}\n**Numero da Conta:** ${accountNumber}\n**Assinatura eletrônica:** ${electronicSignature}\n**Senha de acesso:** ${accessPassword}`,
      color: "#0099FF",
    });

    return { embeds: [embed] };
  },
};
