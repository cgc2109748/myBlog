import Vue from 'vue'
let MessageConstructor = Vue.extend(require('./message.vue'))
// import MessageConstructor from './message.vue'

let instance
let instances = []
let seed = 1

var Message = function (options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let userOnClose = options.onClose
  let id = 'message_' + seed++

  options.onClose = function () {
    Message.close(id, userOnClose)
  }

  instance = new MessageConstructor({
    data: options
  })
  instance.id = options.id || id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  instances.push(instance)
}

// Success Warning Info Error
const types = ['success', 'warning', 'info', 'error', 'loading']
types.forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    if (type === 'loading') {
      options.id = 'loading'
      options.duration = 0
    }
    return Message(options)
  }
})

Message.close = function (id = '', userOnClose) {
  _.remove(instances, (value, index, array) => {
    if (value.id === id) {
      if (typeof userOnClose === 'function') {
        userOnClose(value)
      }
      value.closed = true
      return true
    } else {
      return false
    }
  })
}

export default Message
