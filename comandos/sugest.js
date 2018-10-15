var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')

  let razaod = args.slice(1).join(' ')

  if (message.guild.id === '451178258982240287') {
    if (!razaou.length < 1) {
      database.Guilds.findOne({
        '_id': message.guild.id
      }, function (servro, servidor) {
        if (servidor) {
          message.channel.sendMessage('<:check:438534229563801620> **Sugestao enviada.**')
          message.guild.channels.get('451225874365153290').sendMessage({
            'embed': {
              'title': 'Nova sugestão:',
              'description': `ㅤ\n**Por:** **${message.author}**\n${message.content.replace(`${servidor.prefix}sugest `, '')}`,
              'color': 11676858,
              'timestamp': new Date(),
              'footer': {
                'icon_url': message.author.displayAvatarURL,
                'text': message.author.username
              },
              'thumbnail': {
                'url': message.author.displayAvatarURL
              }
            }
          }).then(function (sugestao) {
            setTimeout(function () {
              sugestao.react('👍')
            }, 500)
            setTimeout(function () {
              sugestao.react('👎')
            }, 1000)
            setTimeout(function () {
              sugestao.react('❓')
            }, 1500)
            setTimeout(function () {
              sugestao.react('❌')
            }, 2000)
          })
        } else {
          message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
        }
      })
    } else {
      message.channel.sendMessage(':x: **Cite sua sugestão.**')
    }
  } else {}
}
