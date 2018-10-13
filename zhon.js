console.log('Conectando...')
const Discord = require('discord.js')
const client = new Discord.Client({
  autoReconnect: true,
  messageCacheMaxSize: 2024,
  fetchAllMembers: true,
  disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking'],
  messageCacheLifetime: 1680,
  disableEveryone: false,
  messageSweepInterval: 1680
})
var database = require('./database.js')
const fs = require('fs')
const i18next = require('i18next')
const translationBackend = require('i18next-node-fs-backend')
var Jimp = require('jimp')
const os = require('os-utils')
var figlet = require('figlet')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')
const DBL = require('dblapi.js')
const dbl = new DBL(process.env.dbl, client)
const fortClient = require('fortnite')
const fortnite = new fortClient(process.env.fortnite)
var Dogeapi = require('dogeapi-module')
var doge = new Dogeapi()
var musicas = require('./queue.js')

const token = process.env.token
var id = '451155262431035393'

client.on("debug", debug => {
  console.log(`Shard ${(client.shard.id + 1)}: ${debug}`)
})

client.on('voiceStateUpdate', (oldMember, newMember) => {
  if (musicas.queue.get(oldMember.guild.id)) {
    if (oldMember.id === client.user.id) return;
      if (oldMember.guild.members.get(client.user.id).voiceChannel) {
        if (oldMember.guild.members.get(client.user.id).voiceChannel === oldMember.voiceChannel) {
          setTimeout(() => {
            if ((oldMember.guild.members.get(client.user.id).voiceChannel.members.size - 1) === 0) {
              musicas.queue.get(oldMember.guild.id).som.por = []
              musicas.queue.get(oldMember.guild.id).som.atividade = []
              musicas.queue.get(oldMember.guild.id).som.id = []
              musicas.queue.get(oldMember.guild.id).som.titulo = []
              client.guilds.get(oldMember.guild.id).channels.get(musicas.queue.get(oldMember.guild.id).canal).sendMessage(':disappointed_relieved: **O canal de voz ficou vazio e a playlist foi resetada.**')
              musicas.queue.get(oldMember.guild.id).connection.end()
            } else {}
          }, 20 * 1000)
        } else {}
      } else {}
  } else {}
})

fs.readdir("./eventos/", (err, files) => {
  if (err) return console.error("[ERRO] " + err);
  files.forEach(file => {
      let eventFunction = require(`./eventos/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.login(token).catch(err => {
  console.log(`Falha ao fazer login ao bot: ${err}`)
})