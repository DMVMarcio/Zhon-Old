var database = require('../database.js')

exports.run = ({ client, message, args, language }, t) => {
  message.channel.startTyping()
  database.Users.find({}, function (erro, documento) {
    var donos = documento.filter(a => a.owner).map(a => client.users.get(a._id) ? `**${client.users.get(a._id).tag}**` : '**Não encontrado**').join(', ')
    var subdonos = documento.filter(a => a.subowner).map(a => client.users.get(a._id) ? `**${client.users.get(a._id).tag}**` : '**Não encontrado**').join(', ')
    var programadores = documento.filter(a => a.dev).map(a => client.users.get(a._id) ? `**${client.users.get(a._id).tag}**` : '**Não encontrado**').join(', ')
    var supervisores = documento.filter(a => a.sup).map(a => client.users.get(a._id) ? `**${client.users.get(a._id).tag}**` : '**Não encontrado**').join(', ')
    var designers = documento.filter(a => a.dzn).map(a => client.users.get(a._id) ? `**${client.users.get(a._id).tag}**` : '**Não encontrado**').join(', ')

    message.channel.sendMessage({
      'embed': {
        'title': 'Staff:',
        'description': t('comandos:staff.description'),
        'color': 11676858,
        'timestamp': new Date(),
        'footer': {
          'icon_url': message.author.displayAvatarURL,
          'text': message.author.username
        },
        'thumbnail': {
          'url': 'https://i.imgur.com/0DEF4PI.png'
        },
        'fields': [
          {
            'name': t('comandos:staff.owners'),
            'value': donos,
            'inline': true
          },
          {
            'name': t('comandos:staff.subowners'),
            'value': subdonos,
            'inline': true
          },
          {
            'name': t('comandos:staff.programmers'),
            'value': programadores,
            'inline': true
          },
          {
            'name': t('comandos:staff.supervisors'),
            'value': supervisores,
            'inline': true
          },
          {
            'name': t('comandos:staff.designers'),
            'value': designers,
            'inline': true
          }
        ]
      }
    })
    message.channel.stopTyping();
  })
}
