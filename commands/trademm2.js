import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("trademm2")
    .setDescription("Confirmación de trade de MM2 (solo traders)"),

  async run(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("confirm_mm2")
        .setLabel("Confirmo el trade de MM2")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({
      content: "⚠️ **¿Estás seguro de hacer un trade de MM2?**\nLos ítems entregados **NO se pueden devolver**.",
      components: [row]
    });
  }
};
