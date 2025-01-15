/*
 * Base By Ednut
 * Created On 11/10/2024
 * Contact Me on wa.me/2348102487241
*/

require('./config')
const { modul } = require('./module')
const { util, baileys, chalk, speed } = modul
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType } = baileys
const { bytesToSize, getRandomFile, smsg, checkBandwidth, sleep, formatSize, getRandom, format, getBuffer, isUrl, jsonformat, nganuin, pickRandom, runtime, shorturl, formatp, fetchJson, color, getGroupAdmins } = require("./lib/myfunc");
//==========================
const os = require('os')
const axios = require('axios')
const dylux = require('api-dylux')
const fs = require('fs')
const path = require('path')
//==========================
module.exports = ednut = async (ednut, m, chatUpdate, mek, store) => {
try {
const { type, quotedMsg } = m
const body = (m.mtype === 'interactiveResponseMessage') 
? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id 
: (m.mtype === 'conversation') 
? m.message.conversation 
: (m.mtype === 'imageMessage') 
? m.message.imageMessage.caption 
: (m.mtype === 'videoMessage') 
? m.message.videoMessage.caption 
: (m.mtype === 'extendedTextMessage') 
? m.message.extendedTextMessage.text 
: (m.mtype === 'buttonsResponseMessage') 
? m.message.buttonsResponseMessage.selectedButtonId 
: (m.mtype === 'listResponseMessage') 
? m.message.listResponseMessage.singleSelectReply.selectedRowId 
: (m.mtype === 'templateButtonReplyMessage') 
? m.message.templateButtonReplyMessage.selectedId 
: (m.mtype === 'documentMessage') 
? m.message.documentMessage.caption 
: (m.mtype === 'messageContextInfo') 
? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) 
: "";
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const pes = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text: ''
const messagesC = pes.slice(0).trim()
const content = JSON.stringify(m.message)
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await ednut.decodeJid(ednut.user.id)
const text = q = args.join(" ")
const isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isGroup = from.endsWith('@g.us')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const senderNumber = sender.split('@')[0]
const groupMetadata = m.isGroup ? await ednut.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const { util, promisify } = require("util");  
//chat counter (console log)
if (isCmd && m.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); 
}
if (isCmd && isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); 
}

    const reply = (teks) => {
ednut.sendMessage(from, { text: teks ,
contextInfo:{
forwardingScore: 9999999, 
isForwarded: true
}
}, { quoted : m })
}

const contacts = JSON.parse(fs.readFileSync("./database/contacts.json"))
const reseller = JSON.parse(fs.readFileSync("./database/reseller.json"))
const arch = fs.readFileSync(path.resolve(__dirname, './lib/arch.mp3'))
const isReseller = reseller.includes(m.sender)

const { 
getRegisteredRandomId, 
addRegisteredUser, 
createSerial, 
checkRegisteredUser 
} = require('./lib/register.js')

const contact = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': botname, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${botname},;;;\nFN:${botname}\nitem1.TEL;waid=23481xxxxx:23481xxxxx\nitem1.X-ABLabel:Mobile\nEND:VCARD`, 'jpegThumbnail': thumb, thumbnail: thumb,sendEphemeral: true}}}


//====== Menu
const timestamp = speed()
const latensi = speed() - timestamp
const mark = "0@s.whatsapp.net"

switch (command) {
        
case 'menu': {
const owned = `${owner}@s.whatsapp.net`
let text = `*Hi @${sender.split("@")[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
𝓒𝓹𝓪𝓷𝓮𝓵 𝓟𝓾𝓼𝓱 𝓬𝓸𝓷𝓽𝓪𝓬𝓽 𝓦𝓪 𝓐𝓼𝓼𝓲𝓼𝓽𝓪𝓷𝓽 ❂
━━━━━━━━━━━━━━━━━━━━━━━━
*ping* :- ${latensi.toFixed(4)}
━━━━━━━━━━━━━━━━━━━━━━━━
panelmenu
broadcastmenu
pushcontactmenu
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 
`
ednut.sendMessage(m.chat, {
text: text,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: botname,
body: '𝓔𝓭𝓷𝓾𝓽 𝓓𝓮𝓿',
thumbnailUrl: 'https://files.catbox.moe/oqxtbn.jpg',
sourceUrl: 'https://whatsapp.com/channel/0029VamspnPB4hdUnvLaIX17',
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: m})
}
break

case 'panelmenu': {
let me = ` *Hi @${sender.split("@")[0]} 👋*
━━━━━━━━━━━━━━━━━━━
*ping:- ${latensi.toFixed(4)}*
*runtime:- ${runtime(process.uptime())}*
━━━━━━━━━━━━━━━━━━━
*1gb <prem>*
*2gb <prem>*
*3gb <prem>*
*4gb <prem>*
*5gb <prem>*
*6gb <prem>*
*7gb <prem>*
*8gb <prem>*
*9gb <prem>*
*10gb <prem>*
*Unli <owner>*
*listpanel <owner>*
*delpanel <owner>*
*listserver <owner>*
*delserver <owner>*
━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 
`
    ednut.sendMessage(m.chat, {
                        video: { url: `https://files.catbox.moe/0ymdbk.mp4`},
                        caption: me,
                        gifPlayback: true
                    }, {
                        quoted: m
                    })
                    }
                    await ednut.sendMessage(m.chat, {
audio: arch,
mimetype: 'audio/mpeg',
seconds: 99999999,
ptt: true
}, { quoted: m
})
break

// === Push Menu

case 'pushcontact': {
if (!isOwner) return reply(mess.owner)
if (!isGroup) return reply(mess.group)
if (!q) return m.reply(`*where is the text ?*`)
let mem = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
let teksnye = `${q}`
m.reply(`*Sending message to ${mem.length} person, completion time ${mem.length * 8} seconds*`)
for (let geek of mem) {
await sleep(7000) // sleep time
ednut.sendMessage(geek, {text: `${teksnye}`}, {quoted:m})
}
m.reply(`*Successfully sent message to ${mem.length} person*`)
}
break

case 'pushcontact-gcid': {
if (!isOwner) return reply(mess.owner)
let idgc = text.split("|")[0]
let pesan = text.split("|")[1]
if (!idgc && !pesan) return m.reply(`*use: ${prefix+command} idgc|message*`)
let metaDATA = await ednut.groupMetadata(idgc).catch((e) => m.reply(e))
let getDATA = await metaDATA.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
let count = getDATA.length;
let sentCount = 0;
m.reply(`*Pushcontact-gcid Sending message to ${getDATA.length} person, completion time ${getDATA.length * 8} seconds*`)
for (let i = 0; i < getDATA.length; i++) {
setTimeout(function() {
ednut.sendMessage(getDATA[i], { text: pesan });
count--;
sentCount++;
if (count === 0) {
m.reply(`*All messages have been sent!\nNumber of messages sent: ${sentCount}*`);
}}, i * 7000); // sleeptime
}}
break

case "pushcontactv3": {
if (!isOwner) return m.reply(mess.owner)
if (!text) return m.reply("*group id|message*\n*type .listgc to see all group id lists*")
if (!text.split("|")) return m.reply("*use: pushcontactv3 group id|message*\n*type .listgc to see all group id lists*")
if (!text.split("")) return m.reply("*use: pushcontactv3 group id|message*\n*type .listgc to see all group id lists*")

var [idnya, teks] = text.split("|")
var groupMetadataa
try {
groupMetadataa = await ednut.groupMetadata(`${idnya}`)
} catch (e) {
return m.reply("*ID Group not valid!*")
}
const participants = await groupMetadataa.participants
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
m.reply(`*Processing Sending Message To ${halls.length} Member Group*`)
for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
await fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
await ednut.sendMessage(mem, {text: teks}, {quoted:m})
await sleep(7000)
}}
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n")
return vcard }).join("")
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`*Successfully Sent Message To ${halls.length} Group Member, Contact File Successfully Sent To Private Chat*`)
await ednut.sendMessage(m.sender, { document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", caption: "*Contact File Successfully Created✅*", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
await fs.writeFileSync("./database/contacts.vcf", "")
}}
break

// === Panel Menu

case "addseller": case "addprem": case "addsell":{
if (!isOwner) return reply(mess.owner)
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (reseller.includes(orang)) return reply(`*User @${orang.split('@')[0]} already existed in the Reseller Panel Database!*`)
await reseller.push(orang)
await fs.writeFileSync("./database/reseller.json", JSON.stringify(reseller))
reply(`*Successfully added @${orang.split('@')[0]} As reseller panel*`)
} else {
return reply(`*use ${prefix + command} @tag/234XX*`)
}}
break

case "delseller": {
if (!isOwner) return reply(mess.owner)
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (!reseller.includes(orang)) return reply(`*User @${orang.split('@')[0]} does not exist in seller database before*!`)
let indx = reseller.indexOf(orang)
await reseller.splice(indx, 1)
await fs.writeFileSync("./database/reseller.json", JSON.stringify(reseller))
reply(`*User @${orang.split('@')[0]} successfully deleted from reseller database*`)
} else {
return reply(`*use ${prefix + command} @tag/234XXX*`)
}}
break

case "listseller": {
if (!isOwner) return reply(mess.owner)
if (reseller.length < 1) return reply("*no one has been added to reseller panel*")
let teksnya = `*Here is resellers panel list 👇*\n`
reseller.forEach(e => teksnya += `*@${e.split("@")[0]}*\n`)
ednut.sendMessage(m.chat, {text: teksnya, mentions: [...reseller]}, {quoted: m})
}
break

case "1gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "1024"
let cpu = "30"
let disk = "1024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "2gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "2024"
let cpu = "40"
let disk = "2024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "3gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "3024"
let cpu = "50"
let disk = "3024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "4gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "4024"
let cpu = "50"
let disk = "4024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "5gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "5024"
let cpu = "60"
let disk = "5024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "6gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "6024"
let cpu = "70"
let disk = "6024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "7gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "7024"
let cpu = "80"
let disk = "7024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "8gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "8024"
let cpu = "90"
let disk = "8024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "9gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "9024"
let cpu = "90"
let disk = "9024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "10gb": {
if (!isOwner && !isReseller) return reply(mess.premium)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "10024"
let cpu = "100"
let disk = "10024"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "unli": {
if (!isOwner) return reply(mess.owner)
let t = text.split('|');
if (t.length < 2) return reply(`*wrong format!!*\n*use: ${prefix + command} name|number*`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://files.catbox.moe/q6wqbi.jpg" 
if (!u) return
let d = (await ednut.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "2006"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": username + "2006"
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*User Id created successfully, user id number ${user.id}*\n*bot currently creating server*`)
ctf = `*Hello @${u.split`@`[0]} 👋*
━━━━━━━━━━━━━━━━━━━━━━━━
*Username :- ${user.username}*
*Password :- ${password}*
*Domain :- ${domain}*
━━━━━━━━━━━━━━━━━━━━━━━━
            *Rules* 👇
━━━━━━━━━━━━━━━━━━━━━━━━
*1. Using ddos on the server link is highly prohibited it kills domain and stop all server from working.* 

*2. Keep your logs safely and drop a clear screenshot after logged in*

*3. If having trouble in logging in please contact seller immediately*

*4. Dont spam bot*
━━━━━━━━━━━━━━━━━━━━━━━━
© 𝓔𝓭𝓷𝓾𝓽 `
ednut.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*Server created successfully logs sent directly to the given number server id ${server.id}*\n
© 𝓔𝓭𝓷𝓾𝓽`)
}
break

case "listsvr": case "listser": case "listserver": {
if (!isOwner) return reply(mess.owner)
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
});
let res = await f.json();
let servers = res.data;
if (servers.length < 1) return reply("*No server created yet*")
let messageText = "*Heres a list of server created 👇*\n"
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
let status = data.attributes ? data.attributes.current_state : s.status;
messageText += `*┌ ◦* Server id *${s.id}*\n`;
messageText += `*│ ◦* Server Name *${s.name}*\n`
messageText += `*│ ◦* Ram *${s.limits.memory == 0 ? "Unlimited" : s.limits.memory.length > 3 ? s.limits.memory.toString().charAt(1) + "GB" : s.limits.memory.toString().charAt(0) + "GB"}*\n`
messageText += `*│ ◦* CPU *${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}*\n`;
messageText += `*└ ◦* Storage *${s.limits.disk == 0 ? "Unlimited" : s.limits.disk.length > 3 ? s.limits.disk.toString().charAt(1) + "GB" : s.limits.disk.toString().charAt(0) + "GB"}*\n`
}

messageText += `*Total Server: ${res.meta.pagination.count} Server*`;
  
  await ednut.sendMessage(m.chat, { text: messageText }, { quoted: m })
}
break

case "server-list": {
if (!isOwner) return reply(mess.owner);
let page = args[0] ? args[0] : '1';
let f = await fetch(domain + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
});
let res = await f.json();
let servers = res.data;
let sections = [];
  
for (let server of servers) {
let s = server.attributes;
    
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
});
    
let data = await f3.json();
var status = data.attributes ? data.attributes.current_state : s.status;  

}
  
ednut.sendList(m.chat, `*Page: ${res.meta.pagination.current_page}*/*${res.meta.pagination.total_pages}*`, "© 𝓔𝓭𝓷𝓾𝓽", {
title: `*Total Server: ${res.meta.pagination.count}*`, sections: [{
title: "Servers in panel",
rows: servers.map(a => ({
title: `ID: ${a.attributes.id} - Status: ${status}`,
description: a.attributes.name,
id: `.delsrv ${a.attributes.id}`
}))
}]
})
                
if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
reply(`*Use the command ${prefix}server-list ${res.meta.pagination.current_page + 1} to see the next page..*`);
}
}
break;

default:
if (budy.startsWith('>')) {
if (!isOwner) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
reply(String(err))
}
}

if (m.chat.endsWith('@s.whatsapp.net') && !isCmd) {
let room = Object.values(anon.anonymous).find(p => p.state == "CHATTING" && p.check(sender))
if (room) {
let other = room.other(sender)
m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
contextInfo: {
...m.msg.contextInfo,
forwardingScore: 0,
isForwarded: true,
participant: other
}
} : {})
}
}
}
} catch (err) {
console.log(util.format(err))
let e = String(err)
ednut.sendMessage(`${owner}@s.whatsapp.net`, { text: "Hello developer, there seems to be an error, please fix it " + util.format(e), 
contextInfo:{
forwardingScore: 9999999, 
isForwarded: true
}})
}
}

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})