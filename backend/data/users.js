import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('0(lr8JdtO=r?0$MQ@42Pu;1e+:mE6cjhO&aI0|t,h/Kw-?cRV~Vwn4YP0ZuvNU', 10),
    isAdmin: true,
  },
  {
    name: 'Test User',
    email: 'one@example.com',
    password: bcrypt.hashSync('==Uh6qeLQ|n5Sv,L|6]z#_+p5#~E#ew.qxP>h:]Ny$Ful(6uqVUQDwygH9Jb3', 10),
  },
]

export default users
