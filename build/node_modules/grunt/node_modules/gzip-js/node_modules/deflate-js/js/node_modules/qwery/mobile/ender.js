!function (doc, $) {
  var q = require('qwery')
    , table = 'table'
    , nodeMap = {
          thead: table
        , tbody: table
        , tfoot: table
        , tr: 'tbody'
        , th: 'tr'
        , td: 'tr'
        , fieldset: 'form'
        , option: 'select'
      }
  function create(node, root) {
    var tag = /^\s*<([^\s>]+)\s*/.exec(node)[1]
      , el = (root || doc).createElement(nodeMap[tag] || 'div'), els = []

    el.innerHTML = node
    var nodes = el.childNodes
    el = el.firstChild
    el.nodeType == 1 && els.push(el)
    while (el = el.nextSibling) (el.nodeType == 1) && els.push(el)
    return els
  }

  $._select = function (s, r) {
    return /^\s*</.test(s) ? create(s, r) : q(s, r)
  }

  $.pseudos = q.pseudos

  $.ender({
    find: function (s) {
      var r = [], i, l, j, k, els
      for (i = 0, l = this.length; i < l; i++) {
        els = q(s, this[i])
        for (j = 0, k = els.length; j < k; j++) r.push(els[j])
      }
      return $(q.uniq(r))
    }
    , and: function (s) {
      var plus = $(s)
      for (var i = this.length, j = 0, l = this.length + plus.length; i < l; i++, j++) {
        this[i] = plus[j]
      }
      return this
    }
    , is: function(s, r) {
      var i, l
      for (i = 0, l = this.length; i < l; i++) {
        if (q.is(this[i], s, r)) {
          return true
        }
      }
      return false
    }
  }, true)
}(document, ender);
