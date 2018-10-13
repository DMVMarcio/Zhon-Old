var database = require('../database.js')
exports.run = (client, member) => {
database.Guilds.findOne({
    '_id': member.guild.id
  }, function (erro, servidor) {
    if (servidor) {
      if (servidor.byebye) {
        if (member.guild.channels.get(servidor.byebyechannel)) {
          member.guild.channels.get(servidor.byebyechannel).createWebhook(member.guild.name, member.guild.iconURL).then(saida => {
            saida.sendMessage(servidor.byebyemsg.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`).replace(/{name}/g, `${member.user.username}`))
            setTimeout(() => {
              saida.delete()
            }, 2500)
          }).catch(err => {
            member.guild.channels.get(servidor.byebyechannel).sendMessage(servidor.byebyemsg.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`).replace(/{name}/g, `${member.user.username}`))
          })
        } else {
          servidor.byebye = false
          servidor.byebyechannel = 'None'
          servidor.byebyemsg = 'None'
          servidor.save()
        }
      } else {}
    } else {}
  })
}