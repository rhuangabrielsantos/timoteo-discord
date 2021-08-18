import { Command } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "joke",
  aliases: ["j"],
  description: "Get a random joke",
  run: async (client, message, args) => {
    const jokes = await new JokeRepository().getAll();
    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    await message.channel.send(joke.text);
  },
};
