import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("tradesab")
    .setDescription("Confirmación de trade SAB"),

  async run(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("confirm_sab")
        .setLabel("Confirmo el trade SAB")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      content: "⚠️ **Los brainrots entregados no se pueden devolver.**",
      components: [row]
    });
  }
};
