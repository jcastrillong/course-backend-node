const { Router } = require('express')
const passport = require('passport')

const UsersService = require('../services/users.service')
const validatorHandler = require('../middlewares/validator.handler')
const { checkRoles } = require('./../middlewares/auth.handler')
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/users.schema')

const router = Router()
const service = new UsersService()

/* Tipo query
  * son parámetros opcionales, en el navegador se usan
  de la sigte manera "/users?limit=10&offset=200" */
router.get('/', async (req, res) => {
  const data = await service.find()
  res.json(data)
})

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await service.findOne(id)
      res.json(user)
    } catch (e) {
      next(e)
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await service.create(body)
      res.status(201).json({
        message: 'Created',
        data: newUser
      })
    } catch (e) {
      next(e)
    }
  })

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const user = await service.update(id, body)
      res.json({
        message: 'Updated',
        data: user
      })
    } catch (e) {
      next(e)
    }
  })

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await service.delete(id)
      res.json({
        message: 'Deleted',
        data: user
      })
    } catch (e) {
      next(e)
    }
  })

module.exports = router
