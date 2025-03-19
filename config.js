const chalk = require("chalk")
const fs = require("fs")

//==========================
global.owner = ["2348102487241"]
global.botname = ['']
//==========================
global.prefa = ['']
global.thumb = { url: 'https://telegra.ph/file/c2e84a4776ee6c47aa3a5.jpg' }//ur thumb pic

//=================================================//
//cpanel
global.domain = "https://grey.nobodysey.me"
global.apikey = "ptla_Uro5ZQNrUZGC9b1RgleuVmGWOkLWS7t76AJjLOozGKt"
global.capikey = "ptlc_lcKNgY3kZEMEkS34YwsGc8EwjSp1FOkWMbLTgctONUD"
global.egg = "15"
global.loc = "1"

//==========================
global.mess = {
    succes: 'Successfully',
    owner: 'This feature could be used by owner only',
    group: 'Features Used Only For Groups!',
    private: 'Features Used Only For Private Chat!',
    bot: 'This feature could be used by bot only',
    wait: 'processing...',
    linkm: 'Where is the link?',
    Premium: 'command for premium users only',
    }
//==========================
    
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(`Update ${__filename}`);
delete require.cache[file];
require(file);
});