import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("trademm2")
    .setDescription("Trader: confirmar trade MM2"),

  async run(interaction) {
    const boton = new ButtonBuilder()
      .setCustomId("confirmar_mm2")
      .setStyle(ButtonStyle.Success)
      .setLabel("CONFIRMO");

    await interaction.reply({
      content: "¿Estás seguro? Las armas NO se pueden devolver.",
      components: [new ActionRowBuilder().addComponents(boton)]
    });
  }
};
