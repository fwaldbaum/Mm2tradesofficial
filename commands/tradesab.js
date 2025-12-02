import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("tradesab")
    .setDescription("Trader: confirmar trade SAB"),

  async run(interaction) {
    const boton = new ButtonBuilder()
      .setCustomId("confirmar_sab")
      .setStyle(ButtonStyle.Danger)
      .setLabel("CONFIRMO");

    await interaction.reply({
      content: "El bot NO devuelve brainrots. ¿Deseas continuar?",
      components: [new ActionRowBuilder().addComponents(boton)]
    });
  }
};
