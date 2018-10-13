exports.run = ({ client, message, args, language }, t) => {
  let razaou = args.slice(0).join(' ')

  if (!razaou.length < 1) {
    if (parseInt(args[0]) >= 0 && parseInt(args[0]) <= 9999) {
      if (args[0].toString().length === 4) {
        if (client.users.find('discriminator', args[0])) {
          var usuarios = client.users.filter(a => a.discriminator === args[0]).map(a => a.tag).join('` **|** `').slice(0, 1024)
          message.channel.sendMessage({
            'embed': {
              'title': t('comandos:discrim.result', { shard: (client.shard.id + 1), shardCount: (client.shard.count) }),
              'description': `\`${usuarios}\``,
              'color': 11676858,
              'timestamp': new Date(),
              'footer': {
                'icon_url': message.author.displayAvatarURL,
                'text': message.author.username
              }
            }
          })
        } else {
          message.channel.sendMessage(t('comandos:discrim.notFound'))
        }
      } else {
        message.channel.sendMessage(t('comandos:discrim.character'))
      }
    } else {
      message.channel.sendMessage(t('comandos:discrim.invalidDiscriminator'))
    }
  } else {
    message.channel.sendMessage(t('comandos:discrim.noArgs'))
  }
}
