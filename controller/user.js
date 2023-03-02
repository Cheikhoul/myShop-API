const User = require("../model/user");
const Commande = require("../model/commande");
const LigneCommande = require("../model/ligne_commande");
const jwt = require('jsonwebtoken');

async function getAllUser(req, res) {
    const users = await User.findAll();
    res.json(users)
}

async function getPanier(req, res){
    if(req.user){
        const panier = await Commande.findOne({where: {Status: 0, UserId: req.user.dataValues.Id}});
        const lignes_panier = await LigneCommande.findAll({where: {CommandeId: panier.Id}});
        res.json(lignes_panier)
    }
    res.status(401).json({mess: "Veuillez vous connecter."})
}

async function addToPanier(req, res){
    if(req.user){
        const ligne_commande = await LigneCommande.create({
            ArticleId: req.body.ArticleId,
            CommandeId: req.body.CommandeId,
            Quantity: req.body.Quantity
        });
        if(!ligne_commande){
            const commande = await Commande.findOne({where: {Statut: 0, UserId: req.user.dataValues.Id}})
        }
    }
}

async function getOrderHistory(req, res){
    if(req.user){
        const orderHistory = await Commande.findAll({where: {UserId: req.user.dataValues.Id}})
        res.json(orderHistory)
    }
    res.status(401).json({mess: "Veuillez vous connecter."})
}

async function validatePanier(req, res){
    const panier = await Commande.findOne({where: {Status: 0, UserId: req.user.dataValues.Id}});
    const lignes_commandes = await LigneCommande.findOne({where: {CommandeId: panier.Id}});
    if(lignes_commande){
        panier.Status = 1;
        panier.save();
        await Commande.create({
        UserId: panier.UserId,
        Status: 0
    })
    res.json(panier)
    }
}

async function updateOrderStatus(req, res){
    if (!req.param.Status || !req.param.CommandeId){
        res.status(400).json({mess: "Champs obligatoire: Statut."})
    }
    if(req.user && req.user.dataValues.Admin){
        const commande = await Commande.findOne({where: {Id: req.param.CommandeId}})
        if(!commande){
            res.status(404).json({mess: "Commande non trouvée."})
        }
        commande.Status = req.param.Status
        commande.save()
        res.json(commande)
    }
    else{
        res.status(403).json({ mess: "Vous devez etre Admin." })
    }
}

async function addUser(req, res) {
    if (!req.body.Email || !req.body.Password || !req.body.Name || !req.body.Surname || !req.body.Admin) {
        res.status(400).json({ mess: "Champs obligatoires : Email, Mot de passe, Prenom, Nom et Role." })
        return
    }
    const user = await User.create({
        Email: req.body.Email,
        Password: req.body.Password,
        Name: req.body.Name,
        Surname: req.body.Surname,
        Address: req.body.Address,
        Admin: req.body.Admin
    });
    await Commande.create({
        UserId: user.Id,
        Status: 0
    })
    res.json(user)
}

async function updateUser(req, res){
    if (!req.user || !req.body.Email || !req.body.Password || !req.body.Name || !req.body.Surname || !req.body.Admin) {
        res.status(400).json({ mess: "Champs obligatoires : Email, Mot de passe, Prenom, Nom et Role." })
        return
    }
    const user = await User.update({
        Email: req.body.Email,
        Password: req.body.Password,
        Name: req.body.Name,
        Surname: req.body.Surname,
        Address: req.body.Address,
        Admin: req.body.Admin
    });
    res.json(user)
}

async function deleteUser(res, req){
    if (req.user){
        const user = await User.findOne({where: {Id: req.user.dataValues.Id}})
        user.destroy()
        res.json({mess: "Utilisateur supprimé."})
    }
    res.status(401).json({mess: "Veuillez vous connecter."})
}

async function connectUser(req, res) {
    if (!req.body.Email || !req.body.Password) {
        res.status(400).json({ mess: "Champs obligatoires : Email et Password." })
        return
    }
    const user = await User.findOne({ where: { Email: req.body.Email } });
    if (!user || user.Password != req.body.Password) {
        res.status(403).json({ mess: "Utilisateur ou mot de passe incorrect." })
        return
    }
    var token = jwt.sign({ ...user }, 'ma cle');
    res.json({ token })
}
module.exports = { getAllUser, addUser, connectUser, getPanier,
     validatePanier, updateUser, deleteUser, getOrderHistory,
     updateOrderStatus}