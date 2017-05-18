const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Notes = require('../models/notes')
const _ = require('lodash')

router.post('/Notes.insert', (req, res, next) => {
  let msg = ''
  let valuedator = false
  const title = req.body.args.title
  const content = req.body.args.content
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

router.post('/Notes.update', (req, res, next) => {
  let msg = ''
  let valuedator = false
  const title = req.body.args.title
  const content = req.body.args.content
  const text = req.body.args.text
  const date = req.body.args.date
  const id = req.body.args.id

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
      console.log('修改文章...')

    }
  }
})

router.get('/Notes.query', (req, res, next) => {
  console.log('获取记事本列表...')
  console.log(_.isEmpty(req.query.id))
  if (_.isEmpty(req.query.id)) {
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
    console.log(`获取id为${req.query.id}的记事本...`)
    var id = mongoose.mongo.ObjectId(req.query.id)
    Notes.findOne({_id: id})
    .then((note) => {
      res.json({
        records: note,
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

router.post('/Notes.delete', (req, res, next) => {
  var id = mongoose.mongo.ObjectId(req.body.args.id)
  Notes.findByIdAndRemove(id)
    .then((note) => {
      res.json({
        msg: '删除成功!',
        success: true
      })
    }).catch((err) => {
      res.json({
        msg: `删除失败!
              原因: ${err}`,
        success: false
      })
    })
})

module.exports = router
