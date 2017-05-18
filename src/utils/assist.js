// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// watch DOM change
export const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false

// const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

function camelCase (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

// getStyle
export function getStyle (element, styleName) {
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

// Find components upward
function findComponentUpward (content, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = content.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
export {findComponentUpward}

// firstUpperCase
function firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1)
}
export {firstUpperCase}

// Warn
export function warnProp (component, prop, correctType, wrongType) {
  correctType = firstUpperCase(correctType)
  wrongType = firstUpperCase(wrongType)
    console.error(`[iView warn]: Invalid prop: type check failed for prop ${prop}. Expected ${correctType}, got ${wrongType}. (found in component: ${component})`);    // eslint-disable-line
}

function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

// deepCopy
function deepCopy (data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

export {deepCopy}
// Find components downward
function findComponentsDownward (content, componentName, components = []) {
  const childrens = content.$children

  if (childrens.length) {
    childrens.forEach(child => {
      const name = child.$options.name
      const childs = child.$children

      if (name === componentName) components.push(child)
      if (childs.length) {
        const findChilds = findComponentsDownward(child, componentName, components)
        if (findChilds) components.concat(findChilds)
      }
    })
  }
  return components
}
export {findComponentsDownward}
