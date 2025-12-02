import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("trade")
    .setDescription("Inicia un trade con el bot de MM2 Trades"),

  async run(interaction) {
    const menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("choose_game")
        .setPlaceholder("Selecciona el juego...")
        .addOptions([
          { label: "Murder Mystery 2 (MM2)", value: "mm2" },
          { label: "Skibi Brainrots (SAB)", value: "sab" }
        ])
    );

    await interaction.reply({
      content: "🛒 ¿Qué juego deseas tradear?",
      components: [menu]
    });
  }
};
