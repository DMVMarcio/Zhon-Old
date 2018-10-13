const Discord = require('discord.js')
const client = new Discord.Client({})
const DBL = require('dblapi.js')
const dbl = new DBL(process.env.dbl, client)
exports.run = (client) => {

  console.log(`Conectado !`)
  setTimeout(function () {
    console.log(`         ---=== ZHON ===---   \n\nServers: (${client.guilds.size}):\n\n${client.guilds.map(a => `- ${a.name} ( ${a.members.size} users )`).join(",\n")}`)
  }, 2000)
  if ((client.shard.id + 1) === (client.shard.count)) {
    gameSet()
    setInterval(() => {
      gameSet()
    }, 1 * 60 * 1000)
    client.shard.fetchClientValues('guilds.size').then(servidores => {
      dbl.postStats(servidores.reduce((prev, val) => prev + val, 0))
      setInterval(() => {
        dbl.postStats(servidores.reduce((prev, val) => prev + val, 0))
      }, 1800000)
    }).catch(console.error)
  }

async function gameSet () {
  client.shard.fetchClientValues('guilds.size').then(servidores => {
    client.shard.fetchClientValues('users.size').then(usuarios => {
      client.shard.fetchClientValues('channels.size').then(canais => {
        try {
        var games = [{
          content: `Zhon - ${usuarios.reduce((prev, val) => prev + val, 0)} membros em ${servidores.reduce((prev, val) => prev + val, 0)} guilds com ${canais.reduce((prev, val) => prev + val, 0)} canais.`,
          type: 1,
          url: "https://www.twitch.tv/zmarciogod"
        }, {
          content: `${usuarios.reduce((prev, val) => prev + val, 0)} usuários.`,
          type: 3,
          url: false
        }, {
          content: `${usuarios.reduce((prev, val) => prev + val, 0)} pessoas fazerem suas coisas.`,
          type: 2,
          url: false
        }]
        var random = Math.round(Math.random() * (games.length - 1))
        random = games[random]
        if(client.user.presence.game ? random.content === client.user.presence.game.name ? false : true : true) {
          if(random.url) {
            client.user.setPresence({ game: { name: random.content, type: random.type, url: random.url } });
            console.log(`Content: ${random.content} Type: ${random.type} Url: ${random.url}`);
          } else {
            client.user.setPresence({ game: { name: random.content, type: random.type } });
            console.log(`Content: ${random.content} Type: ${random.type}`);
          }
        } else {
          console.log('Deu false aqui ó.')
          console.log(`- Content: ${random.content} Type: ${random.type}`);
        }
      } catch (e) {
        console.error(e)
      }
      }).catch(console.error)
    }).catch(console.error)
  }).catch(console.error)
}

}