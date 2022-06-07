const router = require('express').Router()
const passport = require('passport')
const emailCategoryRouter = require('./emailCategories.routes')
const categoryRouter = require('./category.routes')
const userRouter = require('./user.routes')

router.get('/', (req, res) => {
  res.send(
    'Welcome to the Assignment. Click the link to the <a href="http://165.22.220.209:3000/api">documentation</a>'
  )
})
router.use('/user', userRouter)
router.use(
  '/category',
  passport.authenticate('jwt', { session: false }),
  categoryRouter
)
router.use(
  '/email',
  passport.authenticate('jwt', { session: false }),
  emailCategoryRouter
)

module.exports = router
