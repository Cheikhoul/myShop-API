const express = require('express')
const { getAllArticles, addArticle, getArticleById, 
    updateArticle, deleteArticle, getOrdersByStatus 
} = require('../controller/article')
const auth = require('../middleware/auth')

const articleRouter = express.Router()

articleRouter.get('/articles', getAllArticles)
articleRouter.get('/:id', getArticleById)
articleRouter.post('/', auth, addArticle)
articleRouter.put('/:id', auth, updateArticle)
articleRouter.delete('/:id', auth, deleteArticle)
articleRouter.get('/:Status', auth, getOrdersByStatus)

module.exports = articleRouter