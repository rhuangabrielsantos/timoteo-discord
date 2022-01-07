import { CommandInteractionOptionResolver, Interaction } from "discord.js";

import Client from "../Client";
import { Command, User } from "../Interfaces";

import MessageHelper from "../Helpers/MessageHelper";

import UserRepository from "../Repositories/UserRepository";

export const command: Command = {
  name: "atualizar-usuario",
  description: "Atualiza os dados de um usuário no banco de dados",
  options: [
    {
      name: "id",
      description: "Id do usuário",
      type: "STRING",
      required: true,
    },
    {
      name: "nome",
      description: "Nome do usuário",
      type: "STRING",
      required: false,
    },
    {
      name: "cpf",
      description: "CPF do usuário",
      type: "STRING",
      required: false,
    },
    {
      name: "assinatura_eletrônica",
      description: "Assinatura eletrônica do usuário",
      type: "STRING",
      required: false,
    },
    {
      name: "senha_de_acesso",
      description: "Senha de acesso do usuário",
      type: "STRING",
      required: false,
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const id = options.get("id")!.value! as string;
    const name = options.get("nome")?.value! as string || undefined;
    const cpf = options.get("cpf")?.value! as string || undefined;
    const electronicSignature = options.get("assinatura_eletrônica")?.value! as string || undefined;
    const accessPassword = options.get("senha_de_acesso")?.value! as string || undefined;

    const repository = new UserRepository();
    const user = await repository.findOneById(id);

    if (!user) {
      return { content: "Usuário não encontrado" };
    }

    const newUser = <User>{
      id,
      name: name || user.name,
      cpf: cpf || user.cpf,
      electronicSignature: electronicSignature || user.electronicSignature,
      accessPassword: accessPassword || user.accessPassword,
      updatedAt: new Date(),
    };

    await repository.update(newUser);

    const messageHelper = new MessageHelper();
    const embed = messageHelper.createEmbedMessage({
      title: `Usuário atualizado com sucesso!`,
      description: `**Nome:** ${newUser.name}\n**CPF:** ${newUser.cpf}\n**Assinatura eletrônica:** ${newUser.electronicSignature}\n**Senha de acesso:** ${newUser.accessPassword}`,
      color: "#0099FF",
    });

    return {embeds: [embed]};
  },
};
