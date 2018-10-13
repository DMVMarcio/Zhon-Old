var database = require('../database.js')

async function newDocDB (doc, res) {
    if(doc === "guild") {
      var servidor = new database.Guilds({
        _id: res.id,
        prefix: 'z!',
        lang: res.region === "sydney" || res.region === "us-south" || res.region === "us-west" || res.region === "us-central" || res.region === "us-east" ? "en-US" : "pt-BR",
        welcome: false,
        welcomechannel: 'None',
        welcomemsg: 'None',
        byebye: false,
        byebyechannel: 'None',
        byebyemsg: 'None',
        autorole: false,
        autoroleid: 'None',
        logs: false,
        logschannel: 'None',
        leveis: true,
        coins: true,
        box: true,
        roleshop: false,
        caixa: false,
        caixatipo: 'Comum',
        links: false,
        invites: false,
        words: [],
        customcmd: [],
        customfun: [],
        customresposta: [],
        cargos: [],
        cargospreço: [],
        cargosmsg: false,
        blackchannels: [],
        blackcmds: []
      })
      servidor.save()
    }
  }

exports.run = (client, guild) => {
    database.Guilds.findOne({
        '_id': guild.id
      }).then(servidor => {
        if(!servidor) {
          var doc = "guild"
          var res = guild
          newDocDB(doc, res);
        }
      })
}