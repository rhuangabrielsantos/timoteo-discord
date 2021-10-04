import { readdirSync } from "fs";
import path from "path";
import { Event } from "../Interfaces";

export const event: Event = {
  name: "ready",
  run: async client => {
    console.log(`${client?.user?.tag} is online!`);

    client.guilds.cache.forEach(async guild => {
      try {
        const commandsToDeploy = [];

        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach(async file => {
          const { command } = require(`${commandPath}/${file}`);

          const commandFormatted = {
            name: command.name,
            description: command.description,
            options: command.options,
          };

          commandsToDeploy.push(commandFormatted);
        });

        await guild.commands.set(commandsToDeploy);

        console.log(`${guild.name} has been deployed!`);
      } catch (error) {
        client.users.cache
          .get(guild.ownerId)
          .send(
            "Olá, para o bot funcionar corretamente em seu servidor, você deve atribuir a permissão de criar comandos, remova o bot e convide ele novamente através do link: https://discord.com/api/oauth2/authorize?client_id=791505973591146516&permissions=8&scope=bot%20applications.commands"
          );

        console.log(`${guild.name} Error!`);
      }
    });
  },
};
