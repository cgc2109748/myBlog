const express = require('express')
const router = express.Router()
const Notes = require('../models/notes')
const _ = require('lodash')

router.post('/Notes.insert', (req, res, next) => {
  let msg = ''
  let valuedator = false
  const title = req.body.args.title
  const content = req.body.args.content
  const text = req.body.args.text
  const date = req.body.args.date
  console.log(req.body.args)
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
      console.log('新增文章...')
      Notes.create({
        title: title,
        content: content,
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

router.get('/Notes.query', (req, res, next) => {
  console.log('获取记事本列表...')
  console.log(req.body)
  if (_.isEmpty(req.body)) {
    console.log('获取全部记事本...')
    Notes.find({})
    .then((notes) => {
      notes = notes.reverse()
      res.json({
        records: notes,
        success: true
      })
    }).catch((err) => {
      console.log(err)
      res.json({
        msg: '获取记事本列表失败!',
        success: false
      })
    })
  } else {
    console.log(req.body._id)
    console.log(`获取${req.body._id}的记事本...`)
    Notes.find({_id: req.body.id})
    .then((notes) => {
      notes = notes.reverse()
      res.json({
        records: notes,
        success: true
      })
    }).catch((err) => {
      console.log(err)
      res.json({
        msg: '获取记事本列表失败!',
        success: false
      })
    })
  }
})

module.exports = router
