const express = require('express')
const { getAllUser, addUser, connectUser, getPanier, validatePanier, getUserByEmail, addToPanier,
    updateUser, deleteUser, getOrderHistory, updateOrderStatus } = require('../controller/user')
const auth = require('../middleware/auth')

const userRouter = express.Router()

userRouter.get('/users', auth, getAllUser)
userRouter.get('/:Email', getUserByEmail)
userRouter.post('/', addUser)
userRouter.post('/connect', connectUser)
userRouter.get('/commande/monPanier', auth, getPanier)
userRouter.post('/addToPanier', auth, addToPanier)
userRouter.put('/valider-panier', auth, validatePanier)
userRouter.put('/update', auth, updateUser)
userRouter.delete('/delete', auth, deleteUser)
userRouter.get('/order-history', auth, getOrderHistory)
userRouter.put('/update-status/:Status&CommandeId', auth, updateOrderStatus)

module.exports = userRouter
