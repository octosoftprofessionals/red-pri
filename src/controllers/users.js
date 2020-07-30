const textVersion = require('textversionjs');
const sanitizeHtml = require('sanitize-html');
const User = require('../models/user');
const { sanitizeConfig } = require('../config');

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    const plainUsers = users.map((user) => ({
      _id: user._id,
      email: user.email,
      role: user.role,
    }));
    res.status(200).json(plainUsers);
  },

  newUser: async (req, res, next) => {
    const { email, password } = req.body;
    const newUser = await new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);

    const user = await newUser.save();
    res.status(201).json(user.secured());
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user.secured());
  },

  replaceUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const oldUser = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  updateUser: async (req, res, next) => {
    const { userId } = req.params;

    if (req.user.role === 'admin' || req.user._id === userId) {
      const newUser = {};
      if (req.body.email) newUser['email'] = req.body.email;
      if (req.body.password) newUser['password'] = req.body.password;
      if (req.body.role) newUser['role'] = req.body.role;
      if (req.body.picUrl) newUser['picUrl'] = req.body.picUrl;
      if (req.body.name) newUser['name'] = req.body.name;
      if (req.body.surname) newUser['surname'] = req.body.surname;
      if (req.body.username) newUser['username'] = req.body.username;
      if (req.body.matricula)
        newUser['matricula'] = req.body.matricula;
      if (req.body.title) newUser['title'] = req.body.title;
      if (req.body.about) newUser['about'] = req.body.about;
      if (req.body.specialities)
        newUser['specialities'] = req.body.specialities;
      if (req.body.themes) newUser['themes'] = req.body.themes;
      if (req.body.atentionType)
        newUser['atentionType'] = req.body.atentionType;
      if (req.body.practice) newUser['practice'] = req.body.practice;
      if (req.body.addressList)
        newUser['addressList'] = req.body.addressList;
      if (req.body.phoneList)
        newUser['phoneList'] = req.body.phoneList;

      const oldUser = await User.findByIdAndUpdate(userId, {
        $set: newUser,
      });
      const user = await User.findById(userId);
      res.status(200).json({ user: user.secured(), success: true });
    } else {
      res.status(401).json({
        success: false,
        error: 'El usuario no esta autorizado',
      });
    }
  },

  removeUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.deleteOne({ _id: userId });
    res.status(200).json({ user: user.secured(), success: true });
  },
};
