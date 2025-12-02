import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("trade")
    .setDescription("Inicia un trade de MM2 o SAB"),

  async run(interaction) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("selector_juego")
      .setPlaceholder("Selecciona un juego")
      .addOptions(
        { label: "MM2", value: "mm2" },
        { label: "SAB (Brainrot)", value: "sab" }
      );

    await interaction.reply({
      content: "¿Qué juego deseas tradear?",
      components: [new ActionRowBuilder().addComponents(menu)]
    });
  }
};
