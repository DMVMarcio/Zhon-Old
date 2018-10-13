var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')

  database.Guilds.findOne({
    '_id': message.guild.id
  }, function (rro, servidor) {
    if (servidor) {
      database.Users.findOne({
        '_id': message.author.id
      }, function (erro, documento) {
        if (documento) {
          if (documento.sup || documento.vip || documento.dev) {
            if (!razaou.length < 1) {
              if (args[0].includes('http://') || args[0].includes('https://')) {
                if (args[0].includes('.png') || args[0].includes('.jpg') || args[0].includes('.jpeg')) {
                  documento.background = args[0]
                  documento.save()
                  message.channel.sendMessage('<:check:438534229563801620> **Background setado com sucesso..**')
                } else {
                  message.channel.sendMessage(':x: **Isto não é um link de imagem.**')
                }
              } else {
                message.channel.sendMessage(':x: **Isto não é um link.**')
              }
            } else {
              message.channel.sendMessage(':x: **Por favor, mande o link do background**')
            }
          } else {
            message.channel.sendMessage(`:x: **Você precisa ser um usuário \`VIP\`, Adquira usando \`${servidor.prefix}vip\`**`)
          }
        } else {
          message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
        }
      })
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
