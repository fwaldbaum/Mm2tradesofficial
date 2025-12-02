import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("trade")
    .setDescription("Inicia un trade en MM2 Trades"),

  async run(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("choose_game")
        .setPlaceholder("Selecciona el juego")
        .addOptions([
          { label: "Murder Mystery 2", value: "mm2" },
          { label: "Skibi Brainrots", value: "sab" }
        ])
    );

    await interaction.reply({
      content: "🛒 ¿Qué juego deseas tradear?",
      components: [row]
    });
  }
};
