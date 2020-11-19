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
      User.hasMany(models.Cart)
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: 'Email cannot be empty',
          notEmpty: 'Email cannot be empty',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: 'Password cannot be empty',
          notEmpty: 'Password cannot be empty',
        },
      },
      role: {
        type: DataTypes.STRING,
      },
      imageUrl: DataTypes.STRING,
      imageId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )

  User.beforeCreate(async (user) => {
    const hash = hashPassword(user.password)

    user.password = hash
    user.role = 'guest'
    user.email = user.email.toLowerCase()
    if (!user.imageUrl) {
      user.imageUrl = `https://avatars.dicebear.com/api/initials/${user.email}.svg`
    }
  })

  User.afterCreate((user) => {
    console.log('creating new cart for new user')
    user.sequelize.models.Cart.create({
      UserId: user.id,
      status: 'new',
    })
      .then(
        (cart) => console.log(cart.toJSON()),
        '<<<<<< new cart for new user'
      )
      .catch((err) =>
        console.log(err, '<<<< error creating new cart for new user')
      )
  })

  User.beforeUpdate(async (user) => {
    const hash = hashPassword(user.password)

    user.password = hash
    user.email = user.email.toLowerCase()
    if (!user.imageUrl) {
      user.imageUrl = `https://avatars.dicebear.com/api/initials/${user.email}.svg`
    }
  })

  // buat seeding
  User.beforeBulkCreate((users) => {
    users.map((user) => {
      const hash = hashPassword(user.password)

      user.password = hash
      user.role = 'guest'
      user.email = user.email.toLowerCase()

      if (!user.imageUrl) {
        user.imageUrl = `https://avatars.dicebear.com/api/initials/${user.email}.svg`
      }
    })
  })

  User.beforeFind((options) => {
    if (options.where && options.where.email) {
      options.where.email = options.where.email.toLowerCase()
    }
  })

  return User
}
