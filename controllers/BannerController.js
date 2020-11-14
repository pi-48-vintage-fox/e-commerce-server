const { Banner } = require('../models')

class BannerController {
  static banners(req, res, next) {
    console.log('getting banners')
    console.log(req.query, '<<< banner query')

    // if (req.query.category) {
    //   Banner.findAll({
    //     order: [['id']],
    //     include: 'BannerCategory',
    //     where: {
    //       BannerCategoryId: req.query.category,
    //     },
    //   })
    //     .then((banners) => {
    //       res.status(200).json(banners)
    //     })

    //     .catch((err) => {
    //       console.log(err)
    //       next(err)
    //     })
    // } else {
      Banner.findAll({
        order: [['id']],
      })
        .then((banners) => {
          res.status(200).json(banners)
        })

        .catch((err) => {
          console.log(err)
          next(err)
        })
    // }
  }

  static findBannerById(req, res, next) {
    console.log('getting banner details')
    console.log(req.params, '<<< req.params')

    Banner.findByPk(req.params.BannerId)
      .then((banner) => {
        console.log(banner)
        res.status(200).json(banner)
      })

      .catch((err) => {
        console.log(err)
        next(err)
      })
  }

  static addBanner(req, res, next) {
    const {
      title,
      status,
      imageUrl,
      imageId,
    } = req.body

    let input = {
      title,
      status,
      imageUrl,
      imageId,
    }


    Banner.findOne({
      where: {
         title,
      },
    })
    .then(banner => {
      if (banner) {
        throw {
          status: 409,
          msg:
            'Banner with the same title already exists, please choose another title',
        }
      } else {
  
      console.log({ input })
  
      return Banner.create(input)
      
      }
      
    })
    .then((banner) => {
      // console.log(banner.toJSON())
      res.status(201).json(banner)
    })
    .catch((err) => {
      console.log(err, '<<<< error add banner (controller)')
      next(err)
    })

  }

  static deleteBanner(req, res, next) {
    console.log(req.params, '<<<< req params delete banner controller')
    Banner.destroy({
      where: {
        id: req.params.BannerId,
      },
    })
      .then((result) => {
        if (result === 0) {
          throw { status: 404, msg: 'Banner was not found' }
        }

        res.status(200).json({ msg: 'Banner was deleted successfully' })
      })

      .catch((err) => {
        console.log(err)
        next(err)
      })
  }

  static putBanner(req, res, next) {
    console.log(req.body, '<<<<<<<<<< putBanner')

    if (Object.entries(req.body).length === 0) {
      return res.status(200).json({ msg: 'Nothing was modified' })
    }

    // console.log({ input })
    Banner.update(req.body, {
      where: {
        id: req.params.BannerId,
      },
    })
      .then((result) => {
        res.status(200).json({ msg: 'Banner was modified successfully' })
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = BannerController
