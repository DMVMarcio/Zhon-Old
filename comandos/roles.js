exports.run = ({ client, message, args, language }, t) => {

  var cargos = message.guild.roles.map(a => a).slice(0, 50).join(', ')

  message.channel.sendMessage({
    'embed': {
      'title': t('comandos:roles.roles', { guild: message.guild.name, roles: message.guild.roles.size }),
      'description': `${cargos}`,
      'color': 11676858,
      'timestamp': new Date(),
      'footer': {
        'icon_url': message.author.displayAvatarURL,
        'text': message.author.username
      }
    }
  })
}
