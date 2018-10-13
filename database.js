var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.connect(process.env.database, { useNewUrlParser: true }, (err) => {
  if (err) return console.log('Erro ao conectar no database!')
  console.log('Conectado ao BANCO DE DADOS!')
})

var User = new Schema({
  _id: {
    type: String
  },
  level: {
    type: Number,
    default: 0
  },
  xp: {
    type: Number,
    default: 0
  },
  coins: {
    type: Number,
    default: 0
  },
  sobre: {
    type: String,
    default: 'Use z!sobremim para poder alterar está mensagem.'
  },
  rep: {
    type: Number,
    default: 0
  },
  caixas: {
    type: Array,
    default: []
  },
  background: {
    type: String,
    default: 'https://i.imgur.com/CJ8fmrT.png'
  },
  vip: {
    type: Boolean,
    default: false
  },
  dev: {
    type: Boolean,
    default: false
  },
  sup: {
    type: Boolean,
    default: false
  },
  dzn: {
    type: Boolean,
    default: false
  },
  owner: {
    type: Boolean,
    default: false
  },
  subowner: {
    type: Boolean,
    default: false
  },
  ban: {
    type: Boolean,
    default: false
  },
  timevip: {
    type: String,
    default: '0000000000000'
  },
  timedaily: {
    type: String,
    default: '0000000000000'
  },
  timerep: {
    type: String,
    default: '0000000000000'
  }
})

var Guild = new Schema({
  _id: {
    type: String
  },
  prefix: {
    type: String,
    default: 'z!'
  },
  lang: {
    type: String,
    default: 'pt-BR'
  },
  welcome: {
    type: Boolean,
    default: false
  },
  welcomechannel: {
    type: String,
    default: 'Nenhum'
  },
  welcomemsg: {
    type: String,
    default: 'Nenhuma'
  },
  byebye: {
    type: Boolean,
    default: false
  },
  byebyechannel: {
    type: String,
    default: 'Nenhum'
  },
  byebyemsg: {
    type: String,
    default: 'Nenhuma'
  },
  autorole: {
    type: Boolean,
    default: false
  },
  autoroleid: {
    type: String,
    dafault: 'Nenhum'
  },
  logs: {
    type: Boolean,
    default: false
  },
  logschannel: {
    type: String,
    dafault: 'Nenhum'
  },
  leveis: {
    type: Boolean,
    default: true
  },
  coins: {
    type: Boolean,
    default: true
  },
  box: {
    type: Boolean,
    default: true
  },
  roleshop: {
    type: Boolean,
    default: false
  },
  caixa: {
    type: Boolean,
    default: false
  },
  caixatipo: {
    type: String,
    default: 'Comum'
  },
  links: {
    type: Boolean,
    default: false
  },
  invites: {
    type: Boolean,
    default: false
  },
  words: {
    type: Array,
    default: []
  },
  customcmd: {
    type: Array,
    default: []
  },
  customfun: {
    type: Array,
    default: []
  },
  customresposta: {
    type: Array,
    default: []
  },
  cargos: {
    type: Array,
    default: []
  },
  cargospreço: {
    type: Array,
    default: []
  },
  cargosmsg: {
    type: Boolean,
    default: false
  },
  blackchannels: {
    type: Array,
    default: []
  },
  blackcmds: {
    type: Array,
    default: []
  }
})

var Athena = new Schema({
  _id: {
    type: String
  },
  respostas: {
    type: Array,
    default: []
  }
})

var Comando = new Schema({
  _id: {
    type: String
  },
  usos: {
    type: Number,
    default: 0
  },
  manutenção: {
    type: Boolean,
    default: false
  },
  lastError: {
    type: String,
    default: "Nenhum"
  }
})

var Cla = new Schema({
  _id: {
    type: String
  },
  dono: {
    type: String
  },
  foto: {
    type: String,
    default: 'https://i.imgur.com/0DEF4PI.png'
  },
  proteção: {
    type: Number,
    default: 0
  },
  staffs: {
    type: Array,
    default: []
  },
  membros: {
    type: Array,
    default: []
  },
  trofeus: {
    type: Number,
    default: 0
  },
  liga: {
    type: String,
    default: 'Bronze 3'
  },
  vitorias: {
    type: Number,
    default: 0
  },
  derrotas: {
    type: Number,
    default: 0
  },
  espera: {
    type: Array,
    default: []
  }
})

var Ship = new Schema({
  _id: {
    type: String
  },
  _id1: {
    type: String
  },
  _id2: {
    type: String
  },
  porcentagem: {
    type: Number,
    default: 0
  }
})

var Ships = mongoose.model('Ships', Ship)
var Clas = mongoose.model('Clas', Cla)
var Comandos = mongoose.model('Comandos', Comando)
var Athenas = mongoose.model('Athenas', Athena)
var Guilds = mongoose.model('Guilds', Guild)
var Users = mongoose.model('Users', User)
exports.Ships = Ships
exports.Clas = Clas
exports.Comandos = Comandos
exports.Athenas = Athenas
exports.Guilds = Guilds
exports.Users = Users
