import { CommandInteractionOptionResolver, GuildMemberRoleManager, Interaction } from "discord.js";

import Client from "../Client";
import { Command } from "../Interfaces";

import MessageHelper from "../Helpers/MessageHelper";

export const command: Command = {
  name: "update",
  description: "Envia mensagens de atualizações do bot",
  options: [
    {
      name: "title",
      description: "TItulo da atualização",
      type: "STRING",
      required: true,
    },
    {
      name: "description",
      description: "Mensagem de atualização",
      type: "STRING",
      required: true,
    }
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const memberRoles = interaction.member.roles as GuildMemberRoleManager;

    if (!memberRoles.cache.has('914875483773075456')) {
      return 'Você não possui permissão para executar este comando!';
    }

    const title = options.get("title")!.value! as string;
    const description = options.get("description")!.value! as string;

    const messageHelper = new MessageHelper();
    const embed = messageHelper.createEmbedMessage({
      author: 'Novas melhorias disponíveis!',
      title,  
      description: description.replace(/\\n/g, "\n"),
      color: "#0099FF",
    });

    try {
      await client.channels.cache.get('929038625323245568').send({
        embeds: [embed],
      });
    } catch (error) {
      return { content: `Erro ao enviar mensagem de atualização:\n\n${error}` };
    }

    return { content: 'Mensagem de atualização enviada com sucesso!'};
  },
};
