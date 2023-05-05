const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const Article = require("../model/article");
const { expect } = chai;

chai.use(chaiHttp);

describe('Controllers', () => {
  let adminToken;

  before(async () => {
    const res = await chai
      .request(app)
      .post('/api/user/connect')
      .send({ Email: 'test@example.com', Password: 'test' });

    adminToken = res.body.token;
  });

  describe('getAllArticles', () => {
    it('should return all articles', async () => {
      const res = await chai.request(app).get('/api/article/articles')
      .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array');
    });
  });

  describe('getArticleById', () => {
    let articleId;

    before(async () => {
      // Create an article
      const article = await Article.create({
        ArticleName: "Ordinateur",
        Description: "Ordinateur portable",
        Price: "1000",
      });
      articleId = article.id;
    });

    it('should return an article by id', async () => {
      const res = await chai.request(app).get(`/api/article/${articleId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.id).to.equal(articleId);
    });
  });
});
