var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  database.Guilds.findOne({
    '_id': message.guild.id
  }, function (servro, servidor) {
    if (servidor) {
      if (!razaou.length < 1) {
        if (message.content.startsWith(servidor.prefix + 'cla criar')) {
          if (!razaod.length < 1) {
            var nome = args.slice(1).join(' ')

            database.Clas.findOne({'_id': nome}, function (err, exis) {
              if (!exis) {
                database.Clas.find({}, function (erro, documento) {
                  var resultados = documento.filter(a => a.dono === message.author.id || a.staffs.includes(message.author.id) || a.membros.includes(message.author.id))

                  if (resultados.length === 0) {
                    var cla = new database.Clas({
                      _id: nome,
                      dono: message.author.id,
                      foto: 'https://i.imgur.com/0DEF4PI.png',
                      proteção: 0,
                      staffs: [],
                      membros: [],
                      trofeus: 0,
                      liga: 'Bronze 3',
                      vitorias: 0,
                      derrotas: 0,
                      espera: []
                    })

                    cla.save()

                    message.channel.sendMessage(`:crossed_swords: Clã **${nome}** criado com sucesso por **${message.author.tag}**.`)
                  } else {
                    message.channel.sendMessage(':x: **Você já está um clã.**')
                  }
                })
              } else {
                message.channel.sendMessage(':x: **Já exise um clã com este nome.**')
              }
            })
          } else {
            message.channel.sendMessage(':x: **Diga um nome para o clã.**')
          }
        } else if (message.content.startsWith(servidor.prefix + 'cla deletar')) {
          database.Clas.findOne({'dono': message.author.id}, function (erro, documento) {
            if (documento) {
              var nome = documento._id
              database.Clas.deleteOne({'dono': message.author.id}, function (err, deletado) {
                message.channel.sendMessage(`:crossed_swords: Clã **${nome}** deletado com sucesso.`)
              })
            } else {
              message.channel.sendMessage(':x: **Você não é dono de nenhum clã.**')
            }
          })
        } else if (message.content.startsWith(servidor.prefix + 'cla info')) {

        }
      } else {
        message.channel.sendMessage({
          'embed': {
            'title': ':crossed_swords: Clã:',
            'description': `\`\`\`${servidor.prefix}cla criar <nome>\n${servidor.prefix}cla deletar\n${servidor.prefix}cla info <nome>\n${servidor.prefix}cla editar\n${servidor.prefix}cla entrar <nome>\n${servidor.prefix}cla sair\`\`\``,
            'color': 11676858,
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': message.author.username
            },
            'thumbnail': {
              'url': 'https://i.imgur.com/0DEF4PI.png'
            }
          }
        })
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
