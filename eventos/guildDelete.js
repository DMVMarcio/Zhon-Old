var database = require('../database.js')
exports.run = (client, guild) => {
    database.Guilds.deleteOne({
        '_id': guild.id
      })
}