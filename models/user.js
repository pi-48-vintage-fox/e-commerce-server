'use strict'

const { Model } = require('sequelize')

const { hashPassword } = require('../helpers/auth')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )

  User.beforeCreate(async (user) => {
    const hash = hashPassword(user.password)

    user.password = hash
    user.email = user.email.toLowerCase()
    if (!user.avatarUrl) {
      user.avatarUrl = `https://avatars.dicebear.com/api/jdenticon/${user.email}.svg`
    }
  })

  User.beforeUpdate(async (user) => {
    const hash = hashPassword(user.password)

    user.password = hash
    user.email = user.email.toLowerCase()
    if (!user.avatarUrl) {
      user.avatarUrl = `https://avatars.dicebear.com/api/jdenticon/${user.email}.svg`
    }
  })

  // buat seeding
  User.beforeBulkCreate((users) => {
    users.map((user) => {
      const hash = hashPassword(user.password)

      user.password = hash
      user.email = user.email.toLowerCase()

      if (!user.avatarUrl) {
        user.avatarUrl = `https://avatars.dicebear.com/api/jdenticon/${user.email}.svg`
      }
    })
  })

  User.beforeFind((options) => {
    for (let key in options.where) {
      if (key === 'email' || key === 'username') {
        options.where[key] = options.where[key].toLowerCase()
      }
    }
  })

  return User
}
