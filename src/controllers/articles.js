const path = require('path');
const fs = require('fs');
const imgur = require('imgur');
const textVersion = require('textversionjs');
const sanitizeHtml = require('sanitize-html');
const Article = require('../models/article');
const { sanitizeConfig } = require('../config');
const { isImage } = require('../utils');

imgur.setClientId(process.env.IMGUR_CLIENT);
imgur.setAPIUrl(process.env.IMGUR_API_URL);

module.exports = {
  index: async (req, res, next) => {
    const articles = await Article.find({}).populate('author');
    const plainArticles = articles.map((article) => ({
      _id: article._id,
      title: article.title,
      uid: article.uid,
      tags: article.tags,
      category: article.category,
      author: article.author,
      content: textVersion(article.content).substr(0, 500),
      updatedAt: article.updatedAt,
    }));
    res.status(200).json(plainArticles);
  },

  newArticle: async (req, res, next) => {
    const sanitized = {
      title: req.body.title,
      uid: await Article.getArticleUidFor(req.body.title),
      content: sanitizeHtml(req.body.content, sanitizeConfig),
      category: req.body.category,
      tags: req.body.tags,
      author: req.user.id,
    };
    const newArticle = new Article(sanitized);
    const article = await newArticle.save();
    res.status(201).json(article);
  },

  getArticle: async (req, res, next) => {
    const { articleId } = req.params;
    const article = await Article.findOne({
      uid: articleId,
    }).populate('author');
    res.status(200).json(article);
  },

  replaceArticle: async (req, res, next) => {
    const { articleId } = req.params;
    const newArticle = req.body;
    const oldArticle = await Article.findByIdAndUpdate(
      articleId,
      newArticle,
    );
    res.status(200).json({ success: true });
  },

  updateArticle: async (req, res, next) => {
    const { articleId } = req.params;
    const newArticle = {};
    if (req.body.title) {
      newArticle['title'] = req.body.title;
      newArticle['uid'] = await Article.getArticleUidFor(
        req.body.title,
      );
    }
    if (req.body.content) newArticle['content'] = req.body.content;

    const oldArticle = await Article.findByIdAndUpdate(articleId, {
      $set: newArticle,
    });
    res.status(200).json({ success: true });
  },
  removeArticle: async (req, res, next) => {
    const { articleId } = req.params;
    const article = await Article.deleteOne({ _id: articleId });
    res.status(200).json({ article, success: true });
  },
  uploadImage: async (req, res, next) => {
    if (req.file) {
      if (!isImage(req.file)) {
        return res.status(400).json({
          success: false,
          error: 'Tipo de imagen invalido',
        });
      }
      const filePath = path.join(
        __dirname,
        '../../uploads',
        req.file.filename,
      );
      // Upload new Image to Imgur
      const imgurRes = await imgur.uploadFile(filePath);

      // Delete temporal image server
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.status(200).json({
        location: imgurRes.data.link,
      });
    }

    return res.status(400).json({ success: false });
  },
};
