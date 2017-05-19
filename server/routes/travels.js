const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Travels = require('../models/travels')
const _ = require('lodash')
const moment = require('moment')

router.get('/Travels.query', (req, res, next) => {
  console.log('获取游记列表...')
  Travels.find({}).sort({date: -1})
    .then((travels) => {
      res.json({
        records: travels,
        success: true
      })
    })
    .catch((err) => {
      res.json({
        msg: '获取游记列表失败!',
        success: false
      })
    })
})

router.post('/Travels.insert', (req, res, next) => {
  console.log('新增游记...')
  let msg = ''
  let valuedator = false
  const type = req.body.args.type
  const place = req.body.args.place
  const viewSport = req.body.args.viewSport
  const text = req.body.args.text
  const date = req.body.args.date
  if(req.body.args) {
    _.mapKeys(req.body.args, (val, keys) => {
      if (_.isEmpty(val)) {
        msg = `${keys}`.concat(' ' + msg)
        return
      } else {
        msg = msg
      }
    })

    console.log(msg)

    if (_.isEmpty(msg)) {
      console.log('新增游记...')
      Travels.create({
        type: type,
        place: place,
        viewSport: viewSport,
        text: text,
        date: date
      })
      msg = '保存成功!'
      res.json({
        msg: msg,
        success: true
      })
    } else {
      msg = msg.concat(' 不能为空!')
      res.status(500).send(msg)
      res.json({
        success: false,
        msg: msg
      })
    }
  }
})

module.exports = router
