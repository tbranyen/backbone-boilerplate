!function ($) {

  var b = require('bonzo')
  b.setQueryEngine($)
  $.ender(b)
  $.ender(b(), true)
  $.ender({
    create: function (node) {
      return $(b.create(node))
    }
  })

  $.id = function (id) {
    return $([document.getElementById(id)])
  }

  function indexOf(ar, val) {
    for (var i = 0; i < ar.length; i++) {
      if (ar[i] === val) return i
    }
    return -1
  }

  function uniq(ar) {
    var a = [], i, j
    label:
    for (i = 0; i < ar.length; i++) {
      for (j = 0; j < a.length; j++) {
        if (a[j] == ar[i]) {
          continue label
        }
      }
      a[a.length] = ar[i]
    }
    return a
  }

  $.ender({
    parents: function (selector, closest) {
      var collection = $(selector), j, k, p, r = []
      for (j = 0, k = this.length; j < k; j++) {
        p = this[j]
        while (p = p.parentNode) {
          if (~indexOf(collection, p)) {
            r.push(p)
            if (closest) break;
          }
        }
      }
      return $(uniq(r))
    },

    closest: function (selector) {
      return this.parents(selector, true)
    },

    first: function () {
      return $(this.length ? this[0] : this)
    },

    last: function () {
      return $(this.length ? this[this.length - 1] : [])
    },

    next: function () {
      return $(b(this).next())
    },

    previous: function () {
      return $(b(this).previous())
    },

    appendTo: function (t) {
      return b(this.selector).appendTo(t, this)
    },

    prependTo: function (t) {
      return b(this.selector).prependTo(t, this)
    },

    insertAfter: function (t) {
      return b(this.selector).insertAfter(t, this)
    },

    insertBefore: function (t) {
      return b(this.selector).insertBefore(t, this)
    },

    siblings: function () {
      var i, l, p, r = []
      for (i = 0, l = this.length; i < l; i++) {
        p = this[i]
        while (p = p.previousSibling) p.nodeType == 1 && r.push(p)
        p = this[i]
        while (p = p.nextSibling) p.nodeType == 1 && r.push(p)
      }
      return $(r)
    },

    children: function () {
      var i, el, r = []
      for (i = 0, l = this.length; i < l; i++) {
        if (!(el = b.firstChild(this[i]))) continue;
        r.push(el)
        while (el = el.nextSibling) el.nodeType == 1 && r.push(el)
      }
      return $(uniq(r))
    },

    height: function (v) {
      return dimension(v, this, 'height')
    },

    width: function (v) {
      return dimension(v, this, 'width')
    }
  }, true)

  function dimension(v, self, which) {
    return v ?
      self.css(which, v) :
      function (r) {
        if (!self[0]) return 0
        r = parseInt(self.css(which), 10);
        return isNaN(r) ? self[0]['offset' + which.replace(/^\w/, function (m) {return m.toUpperCase()})] : r
      }()
  }

}(ender);
