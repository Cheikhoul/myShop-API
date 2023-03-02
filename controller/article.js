const Article = require("../model/article");
const jwt = require('jsonwebtoken');
const Commande = require("../model/commande");

async function getAllArticles(req, res) {
    const articles = await Article.findAll();
    res.json(articles)
}
async function getArticleById(req, res) {
    const article = await Article.findOne({where: {id:req.params.id}});
    res.json(article)
}

async function getOrdersByStatus(req, res) {
    if (!req.params.Status){
        res.status(400).json({mess: "Champ obligatoire : Statut"})
    }
    if(req.user && req.user.dataValues.Admin){
        const commandes = await Commande.findAll({where: {Status: req.params.Status}})
        res.json(commandes)
    }
}

async function addArticle(req, res) {
    if (!req.body.ArticleName || !req.body.Description || !req.body.Price) {
        res.status(400).json({ mess: "Champs obligatoires : Nom, Description et Prix." })
        return
    }
    console.log(req.user)
    if (req.user.dataValues.Admin === true) {
        const article = await Article.create({
            ArticleName: req.body.ArticleName,
            Description: req.body.Description,
            Price: req.body.Price,
            photo: req.body.photo
        });
        res.json(article)
    }
    else {
        res.status(403).json({ mess: "Vous devez etre Admin." })
    }
}
async function updateArticle(req, res) {
    if (!req.body.ArticleName || !req.body.Description || !req.body.Price) {
        res.status(400).json({ mess: "Champs obligatoires : Nom, Description et Prix." })
        return
    }
    if (req.user.dataValues.Admin) {

        const article = await Article.findOne({where: {id:req.params.id }});
        if(!article){
            res.status(404).json({mess: "Article non trouvé."})
        }
        article.ArticleName = req.body.ArticleName
        article.Description = req.body.Description
        article.Price = req.body.Price
        if (req.body.photo) article.photo = req.body.photo
        article.save()
        res.json(article)
    }
    else {
        res.status(403).json({ mess: "Vous devez etre Admin." })
    }
}
async function deleteArticle(req, res) {
    if (req.user.dataValues.Admin) {

        const article = await Article.findOne({where: {id:req.params.id}});
        if(!article){
            res.status(404).json({mess: "Article non trouvé."})
        }
        article.destroy()
        res.json({ mess: "Article supprimé." })
    }
    else {
        res.status(403).json({ mess: "Vous devez etre Admin." })
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle, 
    getOrdersByStatus
}