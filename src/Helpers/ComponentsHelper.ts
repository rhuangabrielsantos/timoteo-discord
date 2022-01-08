import {
  Interaction,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  MessageSelectOptionData,
} from "discord.js";

import { GenerateToken } from "../Interfaces";
import UserRepository from "../Repositories/UserRepository";

export async function generateComponentsToToken(
  generateToken: GenerateToken
): Promise<MessageActionRow[]> {
  const options = <MessageSelectOptionData[]>[];
  const repository = new UserRepository();
  const users = await repository.findAll();

  users.forEach(user => {
    options.push({
      label: user.name,
      value: user.id,
      description: `${user.cpf} ${user.accessPassword} ${user.accountNumber}`,
      emoji: "👤",
      default: generateToken.selectedUser === user.id,
    });
  });

  const selectUsers = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId("users")
      .setPlaceholder("Usuários")
      .addOptions(options)
  );

  const selectType = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId("type")
      .setPlaceholder("Tipos de Token")
      .addOptions(
        {
          label: "PIX",
          value: "pix",
          description: "Token de acesso ao Pix",
          emoji: "🔑",
          default: generateToken.tokenType === "pix",
        },
        {
          label: "Gateway",
          value: "gateway",
          description: "Token de acesso ao Gateway",
          emoji: "🔑",
          default: generateToken.tokenType === "gateway",
        }
      )
  );

  const buttons = new MessageActionRow().addComponents([
    new MessageButton()
      .setCustomId("finish")
      .setLabel("Concluir")
      .setStyle("SUCCESS"),
    new MessageButton()
      .setCustomId("cancel")
      .setLabel("Cancelar")
      .setStyle("DANGER"),
  ]);

  return [selectUsers, selectType, buttons];
}
