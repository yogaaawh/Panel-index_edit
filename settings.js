//base by DGXeon (Xeon Bot Inc.)
//re-upload? recode? copy code? give credit ya :)
//YouTube: @DGXeon
//Instagram: unicorn_xeon13
//Telegram: @DGXeon
//GitHub: @DGXeon
//WhatsApp: +916909137213
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@DGXeon
//telegram channel: https://t.me/+WEsVdEN2B9w4ZjA9

const fs = require("fs");
const chalk = require("chalk")

global.BOT_TOKEN = "7637828567:AAG1-taIaODBtn7WSmWpBgEEVUexCUXGUkM" // create bot here https://t.me/Botfather and get bot token
global.BOT_NAME = "Greyplanker" //your bot name
global.OWNER_NAME = "@IAMXDA_01" //your name with sign @
global.OWNER = ["https://t.me/+WEsVdEN2B9w4ZjA9", "https://youtube.com/@dgxeon?si=Ogk_T5DMcDjTQjNF"] // Make sure the username is correct so that the special owner features can be used.
global.DEVELOPER = ["6516704660"] //developer telegram id to operate addprem delprem and listprem
global.pp = 'https://telegra.ph/file/c5cd34db4564750eee3f0.jpg' //your bot pp

global.owner = global.owner = ['2349125932419'] //owner whatsapp

const {
   english
} = require("./lib");
global.language = english
global.lang = language

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
