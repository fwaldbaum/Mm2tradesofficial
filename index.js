import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// Load commands
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const cmd = (await import(`./commands/${file}`)).default;
  client.commands.set(cmd.data.name, cmd);
}

client.on("ready", () => {
  console.log(`Bot iniciado como ${client.user.tag}`);
});

// Slash commands & interactions
client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
    const cmd = client.commands.get(interaction.commandName);
    if (cmd) cmd.run(interaction, client);
  }
  if (interaction.isStringSelectMenu()) {
    const handler = (await import("./menus/selectMenuHandler.js")).default;
    handler(interaction);
  }
  if (interaction.isButton()) {
    const handler = (await import("./buttons/buttonHandler.js")).default;
    handler(interaction);
  }
});

// message triggers
client.on("messageCreate", async msg => {
  if (msg.author.bot) return;

  if (msg.content.startsWith("mm2:")) {
    const armas = msg.content.replace("mm2:", "").trim();
    msg.reply(
      `🗡 Armas: **${armas}**\n` +
      `💰 Precio estimado: **200 Robux**\n\n` +
      `Crea un pase y envíalo aquí.\n🔄 Contactando a un trader…`
    );
  }

  if (msg.content.startsWith("sab:")) {
    const brainrot = msg.content.replace("sab:", "").trim();
    msg.reply(`🧠 Brainrot: **${brainrot}**\n🔄 Contactando a un trader…`);
  }
});

client.login(process.env.TOKEN);
