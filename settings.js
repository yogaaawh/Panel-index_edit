require("./all/module.js")

//========== Setting Owner ==========//
global.owner = "2347082703155"
global.namaowner = "SEYORI"

//======== Setting Bot & Link ========//
global.namabot = "Seyori's Panel Bot⚡"
global.idsaluran = "120363257033988496@newsletter"
global.linkgc = 'https://wa.me/qr/I2FJ6CU5TD22M1'
global.packname = "Seyori's official panel bot"
global.author = "Seyori's Panel Bot"

//========== Setting Event ==========//
global.welcome = false
global.autoread = false
global.anticall = false

//==== Waktu Jeda Jpm & Pushkon ====//
global.delaypushkontak = 5500
global.delayjpm = 5500

//========= Setting Url Foto =========//
global.image = "https://telegra.ph/file/61692288760b34605bfbe.jpg"

//========== Setting Panell ==========//
global.egg = "15"
global.loc = "1"
global.domain = "https://morfe.nobodysey.me"
global.apikey = "ptla_46KNOXtv7qS2n6WYdevSp2UAk1BQ501KGeIkIIT6nbv"
global.capikey = "ptlc_Vn5O6T9IQeVIZCA9crmSZPuDf4JaKZoMyIzgSfW2M5l"

//========= Setting Payment =========//
//Kalo Gak Ada Isi Aja jadi false
global.dana = "5548492121"
global.gopay = false
global.ovo = false
global.qris = "https://telegra.ph/file/61692288760b34605bfbe.jpg"


//=========== Api Domain ===========//
//========== Api Domain 1 ==========//
global.zone1 = "";
global.apitoken1 = "";
global.tld1 = "";

//========= Setting Message =========//
global.msg = {
    "error": "An error occurred",
    "done": "Successfully gotten data ✅",
    "wait": "🕧 Processing, Please Wait a Moment",
    "group": "This feature is only for groups❗",
    "private": "This feature is only for private chats❗",
    "admin": "This Feature Is Only For Group Admin❗",
    "adminbot": "This Feature Can Be Used When the Bot Becomes an Admin❗",
    "owner": "This feature is only for bot owners❗",
    "developer": "This Feature Is Only For Developers❗"
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})