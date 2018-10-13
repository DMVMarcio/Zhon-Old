var database = require('../database.js')
exports.run = (client, member) => {
    database.Guilds.findOne({
        '_id': member.guild.id
      }, function (erro, servidor) {
        if (servidor) {
          if (servidor.welcome) {
            if (member.guild.channels.get(servidor.welcomechannel)) {
              member.guild.channels.get(servidor.welcomechannel).createWebhook(member.guild.name, member.guild.iconURL).then(bemvindo => {
                bemvindo.sendMessage(servidor.welcomemsg.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`).replace(/{name}/g, `${member.user.username}`).replace(/{users}/g, `${member.guild.members.size}`))
                setTimeout(() => {
                  bemvindo.delete()
                }, 2500)
              }).catch(err => {
                member.guild.channels.get(servidor.welcomechannel).sendMessage(servidor.welcomemsg.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`).replace(/{name}/g, `${member.user.username}`).replace(/{users}/g, `${member.guild.members.size}`))
              })
            } else {
              servidor.welcome = false
              servidor.welcomechannel = 'None'
              servidor.welcomemsg = 'None'
              servidor.save()
            }
          } else {}
    
          if (servidor.autorole) {
            if (member.guild.roles.get(servidor.autoroleid)) {
              member.guild.members.get(member.id).addRole(servidor.autoroleid).catch(err => {
                servidor.autorole = false
                servidor.autoroleid = 'None'
                servidor.save()
              })
            } else {
              servidor.autorole = false
              servidor.autoroleid = 'None'
              servidor.save()
            }
          } else {}
        } else {}
      })
}