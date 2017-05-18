const express = require('express')
const router = express.Router()
const Notes = require('../models/notes')
const _ = require('lodash')

router.post('/Notes.insert', (req, res, next) => {
  let msg = ''
  let valuedator = false
  const title = req.body.args.title
  const content = req.body.args.content
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
