import { Router } from 'express'
import { register, login } from '../controllers/auth.controller.js'

const router = Router()

router.post('/register', register)

router.post('/login', login)

// router.get('/profile', profile)

// router.post('/logout', logout)

router.get('/', (req, res) => {
  res.send('Hello, this is auth endpoint.')
})

export default router
