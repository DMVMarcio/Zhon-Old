const Discord = require("discord.js");
const fs = require('fs')
var database = require('../database.js')

exports.run = async ({ client, message, args, language, prefixo }, t) => {

  var comandos = []
  var files = fs.readdirSync('./comandos');
    
  files.forEach(file => {
    comandos.push({
      name: file.split(".")[0],
      desc: t(`help:${file.split(".")[0]}.desc`),
      category: parseInt(t(`help:${file.split(".")[0]}.category`))
    })
  })

  var pageUteis = comandos.filter(cmd => cmd.category === 1).map(cmd => `**${prefixo}${cmd.name}** ${cmd.desc}`)
  var pageMod = comandos.filter(cmd => cmd.category === 2).map(cmd => `**${prefixo}${cmd.name}** ${cmd.desc}`)
  var pageSocial = comandos.filter(cmd => cmd.category === 3).map(cmd => `**${prefixo}${cmd.name}** ${cmd.desc}`)
  var pageEco = '**z!coins** veja a quantidade de coins.\n**z!daily** coleta coins diários.\n**z!moneytop** veja os usuários mais ricos do seu servidor.\n**z!apostar** aposte uma quantidade de dinheiro com alguém.\n**z!doar** doe coins para alguém.'
  var pageFun = '**z!cat** mostra o gif de um gato aleatório.\n**z!dog** mostra o gif de um cachorro aleatório.\n**z!kiss** de um beijo em alguém.\n**z!hug** de um abraço em alguém.\n**z!slap** dê um tapa em alguém.\n**z!athenas** sem ninguem pra conversar? converse com Athenas.\n**z!ship** junte dois usuários e veja se eles dão certos juntos.'
  var pageMusic = '**z!play** inicia uma música.\n**z!queue** mostra sua playlist.\n**z!pause** pausa a música.\n**z!resume** resume a música.\n**z!stop** para as músicas.\n**z!np** mostra a música que está tocando.\n**z!skip** pula a música que está tocando.\n**z!summon** puxa o bot de um canal para outro.\n**z!repeat** faça com que a música fique se repetindo.\n**z!disconnect** me desconecta do canal de voz.\n**z!restart** reinicia a música que está tocando.'
  var pageFoto = '**z!invert** inverta a cor de uma imagem.\n**z!grey** remova a cor de uma imagem.\n**z!sepia** coloque o efeito sépia na imagem.'
  var inicio = `🔧 comandos úteis.\n` +
  `<:engrenagem:483327817388392448> comandos para moderação.\n` +
  `💬 comandos sociais.\n` +
  `💵 comandos de economia.\n` +
  `🎉 comandos de diversão.\n` +
  `🎶 comandos de músicas.\n` +
  `🖼 comandos de imagens.`

  var embed = new Discord.RichEmbed()
  .setColor("0xB22CBA")
  .setTitle("Info:")
  .setThumbnail("https://i.imgur.com/0DEF4PI.png")
  .setDescription(inicio)
  message.channel.send(embed).then(async msg => {
    await msg.react("🔧")
    await msg.react(":engrenagem:483327817388392448")
    await msg.react("💬")
    await msg.react("💵")
    await msg.react("🎉")
    await msg.react("🎶")
    await msg.react("🖼")
    await msg.react("↩")

    const CmdsUteis = msg.createReactionCollector((r, u) => r.emoji.name === "🔧" && u.id === message.author.id, { time: 120000 });
    const CmdsMod = msg.createReactionCollector((r, u) => r.emoji.id === "483327817388392448" && u.id === message.author.id, { time: 120000 });
    const CmdsSociais = msg.createReactionCollector((r, u) => r.emoji.name === "💬" && u.id === message.author.id, { time: 120000 });
    const CmdsEco = msg.createReactionCollector((r, u) => r.emoji.name === "💵" && u.id === message.author.id, { time: 120000 });
    const CmdsFun = msg.createReactionCollector((r, u) => r.emoji.name === "🎉" && u.id === message.author.id, { time: 120000 });
    const CmdsMusic = msg.createReactionCollector((r, u) => r.emoji.name === "🎶" && u.id === message.author.id, { time: 120000 });
    const CmdsFoto = msg.createReactionCollector((r, u) => r.emoji.name === "🖼" && u.id === message.author.id, { time: 120000 });
    const Voltar = msg.createReactionCollector((r, u) => r.emoji.name === "↩" && u.id === message.author.id, { time: 120000 });

    CmdsUteis.on("collect", async r => {
      r.remove(r.users.last().id)
      embed.setTitle(`Comandos úteis:`)
      embed.setDescription(pageUteis)
      embed.setThumbnail('https://cdn.discordapp.com/emojis/440261266934857728.gif?v=1')
      msg.edit(embed)
    })

    CmdsMod.on("collect", async r => {
      r.remove(r.users.last().id)
      embed.setTitle(`Comandos de moderação:`)
      embed.setDescription(pageMod)
      embed.setThumbnail(`https://cdn.discordapp.com/emojis/460499215882387482.png?v=1`)
      msg.edit(embed)
    })

    CmdsSociais.on("collect", async r => {
      r.remove(r.users.last().id)
      embed.setTitle(`Comandos sociais:`)
      embed.setDescription(pageSocial)
      embed.setThumbnail(`http://www.emoji.co.uk/files/twitter-emojis/smileys-people-twitter/10582-busts-in-silhouette.png`)
      msg.edit(embed)
    });

    CmdsEco.on("collect", async r => {
      r.remove(r.users.last().id)
      embed.setTitle(`Comandos de economia:`)
      embed.setDescription(pageEco)
      embed.setThumbnail(`https://cdn.discordapp.com/emojis/463789694036082689.png?v=1`)
      msg.edit(embed);
    })

    CmdsFun.on("collect", async r => {
      r.remove(r.users.last().id)
      embed.setTitle(`Comandos de diversão:`)
      embed.setDescription(pageFun)
      embed.setThumbnail(`https://cdn.discordapp.com/emojis/435209910175924235.gif?v=1`)
      msg.edit(embed)
    })

    CmdsMusic.on("collect", async r => {
      r.remove(r.users.last().id)
      embed.setTitle(`Comandos de música:`)
      embed.setDescription(pageMusic)
      embed.setThumbnail('https://images.emojiterra.com/mozilla/512px/1f3b6.png')
      msg.edit(embed);
    })

    CmdsFoto.on("collect", async r => {
      r.remove(r.users.last().id)
      embed.setTitle(`Comandos de manipulação de imagens:`)
      embed.setDescription(pageFoto)
      embed.setThumbnail('https://i.imgur.com/Q4kWf96.png')
      msg.edit(embed)
    })

    Voltar.on("collect", async r => {
      r.remove(r.users.last().id)
      embed.setTitle(`Info:`)
      embed.setDescription(inicio)
      embed.setThumbnail(`https://cdn.discordapp.com/emojis/460499215882387482.png?v=1`)
      msg.edit(embed)
    })

    Voltar.on("end", async r => {
      if(r.size >= 1) return;
      msg.delete();
    })      
  })
}