var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  database.Guilds.findOne({
    '_id': message.guild.id
  }, function (servro, servidor) {
    if (servidor) {
      if (!razaou.length < 1) {
        if (message.content.startsWith(servidor.prefix + 'box view')) {
          let usuario = message.mentions.users.first() ? message.mentions.users.first() : message.author

          database.Users.findOne({
            '_id': usuario.id
          }, function (erro, documento) {
            if (documento) {
              if (documento.caixas.length > 0) {
                var caixas = documento.caixas.join('` **|** `caixa ')

                message.channel.sendMessage({
                  'embed': {
                    'title': `:gift: Caixas de ${usuario.username}:`,
                    'description': `\`caixa ${caixas}\``,
                    'color': 11676858,
                    'timestamp': new Date(),
                    'footer': {
                      'icon_url': message.author.displayAvatarURL,
                      'text': message.author.username
                    }
                  }
                })
              } else {
                message.channel.sendMessage(`:x: **${(usuario.id === message.author.id ? 'Você' : 'Este usuário')} não possui caixas.**`)
              }
            } else {
              message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
            }
          })
        } else if (message.content.startsWith(servidor.prefix + 'box open')) {
          if (!razaod.length < 1) {
            var caixaTP = args[1].toLowerCase()

            if (caixaTP === 'comum' || caixaTP === 'rara' || caixaTP === 'epica' || caixaTP === 'lendaria') {
              database.Users.findOne({
                '_id': message.author.id
              }, function (erro, documento) {
                if (documento) {
                  if (documento.caixas.includes(caixaTP)) {
                    var num = caixaTP === 'comum' ? 1200 : caixaTP === 'rara' ? 2000 : caixaTP === 'epica' ? 2900 : caixaTP === 'lendaria' ? 4100 : 0
                    var random = Math.round(Math.random() * num)
                    var xp = random
                    random = Math.round(Math.random() * num)
                    var coins = random
                    documento.xp += xp
                    documento.coins += coins
                    documento.caixas.splice(documento.caixas.indexOf(caixaTP), 1)
                    documento.save()
                    message.channel.sendMessage(`:sunglasses: ${message.author}, Você abriu uma caixa \`${caixaTP}\` e obteve **${Number(coins).toLocaleString()}** coins e **${Number(xp).toLocaleString()}** de xp.`)
                  } else {
                    message.channel.sendMessage(`:x: **Voce não possui uma caixa \`${caixaTP}\`.**`)
                  }
                } else {
                  message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
                }
              })
            } else {
              message.channel.sendMessage(':x: **Caixa inválida.**')
            }
          } else {
            message.channel.sendMessage(':x: **Diga que caixa quer abrir: `comum`, `rara`, `epica` ou `lendaria`.**')
          }
        } else {
          message.channel.sendMessage(':x: **Argumento inválido.**')
        }
      } else {
        message.channel.sendMessage({
          'embed': {
            'title': ':gift: Caixas:',
            'description': `\`\`\`${servidor.prefix}box view\n${servidor.prefix}box open\`\`\``,
            'color': 11676858,
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': message.author.username
            }
          }
        })
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
