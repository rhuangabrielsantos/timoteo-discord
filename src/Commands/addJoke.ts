import { Command } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "add-joke",
  aliases: ["j"],
  description: "Add a new joke",
  run: async (client, message, args) => {
    const joke = args.join(" ");
    const repository = new JokeRepository();
    await repository.create({ text: joke });

    await message.channel.send(`${joke} has been added!`);
  },
};
