import { Command } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "piada",
  description: "Leia uma piada aleatória bem divertida (ou não)",
  options: [],
  run: async () => {
    const jokes = await new JokeRepository().getAll();
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    const year = new Date(randomJoke.created_at).getFullYear();

    return `${randomJoke.message} \nAutor: **${randomJoke.author}**, ${year}`;
  },
};
