export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { Bot, webhookCallback } from "grammy";

const token = "7815956692:AAGNc1joV3IE4PpVTuKBt4hbfmaCJ2_7pQM";

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
bot.on("message:text", async (ctx) => {
  await ctx.reply(ctx.message.text);
});

export const POST = webhookCallback(bot, "std/http");
