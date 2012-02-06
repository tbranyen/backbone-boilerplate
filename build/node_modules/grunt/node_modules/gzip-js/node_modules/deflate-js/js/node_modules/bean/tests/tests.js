if (!window.console) {
  window.console = { log: function () {}}
}

sink('add', function (test, ok) {

  test('add: should return the element passed in', 1, function () {
    var el = document.getElementById('input');
    var returned = bean.add(el, 'click', function () {});
    ok(el == returned, 'returns the element passed in');
    bean.remove(el);
  });

  test('add: should be able to add single events to elements', 1, function () {
    var el = document.getElementById('input');
    bean.add(el, 'click', function () {
      bean.remove(el);
      ok(true, 'adds single events to elements');
    });
    Syn.click(el);
  });

  test('add: should be able to add single events to objects', 1, function () {
    var obj = {};
    bean.add(obj, 'complete', function () {
      ok(true, 'adds single events to objects');
    });
    bean.fire(obj, 'complete');
    bean.remove(obj);
    bean.fire(obj, 'complete');
  });

  test('add: scope should be equal to element', 1, function () {
    var el = document.getElementById('input');
    bean.add(el, 'click', function (e) {
      bean.remove(el);
      ok(this == el, 'equal to element')
    });
    Syn.click(el);
  });

  test('add: should recieve an event method', 1, function () {
    var el = document.getElementById('input');
    bean.add(el, 'click', function (e) {
      bean.remove(el);
      ok(e != null, 'recieves an event method')
    });
    Syn.click(el);
  });

  test('add: should be able to pass x amount of additional arguments', 4, function () {
    var el = document.getElementById('input');
        handler = function (e, foo, bar, baz) {
          bean.remove(el);
          ok(e != null, 'listener was called with event');
          ok(foo === 1, 'listener was called with correct argument');
          ok(bar === 2, 'listener was called with correct argument');
          ok(baz === 3, 'listener was called with correct argument');
        };
    bean.add(el, 'click', handler, 1, 2, 3);
    Syn.click(el);
  });

  test('add: should be able to add multiple events by space seperating them', 2, function () {
    var el = document.getElementById('input');
    bean.add(el, 'click keypress', function () {
      ok(true, 'adds multiple events by space seperating them');
    });
    Syn.click(el).key('j');
  });

  test('add: should add same event only one time', 1, function () {
    var el = document.getElementById('input');
    bean.remove(el);
    var handler = function () {ok(true, 'adds same event only one time')};
    bean.add(el, 'click', handler);
    bean.add(el, 'click', handler);
    bean.add(el, 'click', handler);
    Syn.click(el);
  });

  test('add: should be able to add multiple events of the same type', 3, function () {
    var el = document.getElementById('input');
    bean.remove(el);
    bean.add(el, 'click', function () {ok(true, 'adds multiple events of the same type 1')});
    bean.add(el, 'click', function () {ok(true, 'adds multiple events of the same type 2')});
    bean.add(el, 'click', function () {ok(true, 'adds multiple events of the same type 3')});
    Syn.click(el);
  });

  test('add: should be able to add multiple events simultaneously with an object literal', 2, function () {
    var el = document.getElementById('input');
    bean.remove(el);
    bean.add(el, {
      click: function () {
        ok(true, 'adds multiple events simultaneously with an object literal 1');
      },
      keydown: function () {
        ok(true, 'adds multiple events simultaneously with an object literal 2');
        bean.remove(el);
      }
    });
    Syn.click(el).key('j');
  });

  test('add: should bubble up dom', 1, function () {
    var el1 = document.getElementById('foo');
    var el2 = document.getElementById('bar');
    bean.add(el1, 'click', function () {ok(true, 'bubbles up dom')});
    Syn.click(el2);
  });

  test('add: shouldn\'t trigger event when adding additional custom event listeners', 0, function () {
    var el = document.getElementById('input');
    bean.add(el, 'foo', function () {ok(true, 'additional custom event listeners trigger event 1')});
    bean.add(el, 'foo', function () {ok(true, 'additional custom event listeners trigger event 2')});
  });

})

sink('fire', function (test, ok) {

  test('fire: should be able to fire an event', 1, function () {
    var el = document.getElementById('input');
    bean.remove(el);
    bean.add(el, 'click', function () {ok(true, 'fires an event')});
    bean.fire(el, 'click');
  });

  test('fire: should be able to fire multiple events by space seperation', 2, function () {
    var el = document.getElementById('input');
    bean.remove(el);
    bean.add(el, 'mousedown', function () {ok(true, 'fires multiple events by space seperation 1')});
    bean.add(el, 'mouseup', function () {ok(true, 'fires multiple events by space seperation 2')});
    bean.fire(el, 'mousedown mouseup');
  });

  test('fire: should be able to pass multiple arguments to custom event', 4, function () {
    // jquery like array syntax
    var el = document.getElementById('input');
    bean.remove(el);
    bean.add(el, 'foo', function (one, two, three) {
      ok(arguments.length == 3, 'fires an event with 3 arguments')
      ok(one == 1, 'value should equal 1')
      ok(two == 2, 'value should equal 2')
      ok(three == 3, 'value should equal 3')
    });
    bean.fire(el, 'foo', [1, 2, 3]);
  });

})

sink('custom', function (test, ok) {

  test('custom: should be able to add single custom events', 1, function () {
    var el = document.getElementById('input');
    bean.remove(el);
    bean.add(el, 'partytime', function () {
      ok(true, 'add single custom events');
    });
    bean.fire(el, 'partytime');
  });

  test('custom: should bubble up dom like traditional events', 1, function () {
    if (!window.addEventListener) {
      //dean edwards onpropertychange hack doesn't bubble unfortunately :(
      return ok(true, 'internet explorer is not a bubler, turns out.')
    }
    var el1 = document.getElementById('foo');
    var el2 = document.getElementById('bar');
    bean.add(el1, 'partytime', function () {ok(true, 'bubbles up dom like traditional events')});
    bean.fire(el2, 'partytime');
  });

})

sink('event object', function (test, ok) {

  test('event: should have correct target', 1, function () {
    var el1 = document.getElementById('foo');
    var el2 = document.getElementById('bar');
    bean.remove(el1, 'click');
    bean.add(el1, 'click', function (e) {ok(e.target == el2, 'has correct target')});
    Syn.click(el2);
  });

  test('event: should have stop propagation method', 1, function () {
    var el = document.getElementById('foo');
    bean.remove(el);
    bean.add(el, 'click', function (e) {ok(e.stopPropagation != null, 'has stop propagation')});
    Syn.click(el);
  });

  test('event: should have preventDefault method', 1, function () {
    var el = document.getElementById('foo');
    bean.remove(el);
    bean.add(el, 'click', function (e) {ok(e.preventDefault != null, 'has prevent default method')});
    Syn.click(el);
  });

  test('event: should have stop propagation method on custom event', 1, function () {
    var el = document.getElementById('foo');
    bean.remove(el);
    bean.add(el, 'customEvent', function (e) {ok(e.stopPropagation != null, 'has stop propagation')});
    bean.fire(el, 'customEvent');
  });

  test('event: should have preventDefault method on custom event', 1, function () {
    var el = document.getElementById('foo');
    bean.remove(el);
    bean.add(el, 'customEvent', function (e) {ok(e.preventDefault != null, 'has prevent default method')});
    bean.fire(el, 'customEvent');
  });

  test('event: should have keyCode', 1, function () {
    var el = document.getElementById('input');
    bean.add(el, 'keypress', function (e) {
      bean.remove(el);
      ok(e.keyCode != null, 'has keycode');
    });
    Syn.key(el, 'f');
  });

})

sink('remove', function (test, ok) {

  test('remove: should return the element passed in', 1, function () {
    var el = document.getElementById('foo');
    bean.remove(el);
    var handler = function () {};
    bean.add(el, 'click', handler);
    var returned = bean.remove(el, 'click', handler);
    ok(el == returned, 'returns the element passed in');
  });

  test('remove: should be able to remove a single event', 1, function () {
    var el = document.getElementById('foo');
    bean.remove(el);
    var handler = function () {
      ok(true, 'remove a single event');
      bean.remove(el, 'click', handler);
      Syn.click(el);
    }
    bean.add(el, 'click', handler);
    Syn.click(el)
  });

  test('remove: should be able to remove mulitple events with an object literal', 1, function () {
    var el = document.getElementById('input'),
        handler1 = function () {
          ok(true, 'remove mulitple events with an object literal1');
          bean.remove(el, {
            click: handler1,
            keydown: handler2
          });
          Syn.click(el).key('j');
        },
        handler2 = function () {
          ok(true, 'remove mulitple events with an object literal2');
        };
    bean.add(el, 'click', handler1);
    bean.add(el, 'keydown', handler2);
    Syn.click(el);
  });

  test('remove: should be able to remove all events of a specific type', 2, function () {
    var el = document.getElementById('input');
    bean.remove(el);
    var handler1 = function () {
        ok(true, 'removes all events of a specific type 1');
      },
      handler2 = function () {
        ok(true, 'removes all events of a specific type 2');
        bean.remove(el, 'click');
        Syn.click(el);
      };
    bean.add(el, 'click', handler1);
    bean.add(el, 'click', handler2);
    Syn.click(el);
  });

  test('remove: should be able to remove all events of a specific type', 2, function () {
    var el = document.getElementById('input');
    bean.remove(el);
    var handler1 = function () {
        ok(true, 'removes all events of a specific type 1');
      },
      handler2 = function () {
        ok(true, 'remove all events of a specific type 2');
        bean.remove(el, 'mousedown mouseup');
        Syn.click(el);
      };
    bean.add(el, 'mousedown', handler1);
    bean.add(el, 'mouseup', handler2);
    Syn.click(el);
  });

  test('remove: should be able to remove all events', 1, function () {
    var el = document.getElementById('input'),
        handler1 = function () {
          ok(true, 'remove all events 1');
          bean.remove(el);
          Syn.click(el).key('j');
        },
        handler2 = function () {
          ok(true, 'remove all events 2');
        };
    bean.add(el, 'click', handler1);
    bean.add(el, 'keydown', handler2);
    Syn.click(el);
  });

  test('remove: should be able to remove all events of a certain namespace', 1, function () {
    var el = document.getElementById('input'),
        handler1 = function () {
          ok(true, 'remove all events 1');
          bean.remove(el, '.foo');
          Syn.click(el).key('j');
        },
        handler2 = function () {
          ok(true, 'remove all events 2');
        };
    bean.add(el, 'click.foo', handler1);
    bean.add(el, 'click.foo', handler1);
    bean.add(el, 'keydown.foo', handler2);
    Syn.click(el);
  });

})

sink('clone', function (test, ok, before) {

  var el1 = document.getElementById('input');
  var el2 = document.getElementById('input2');

  before(function () {
    bean.remove(el1);
    bean.remove(el2);
  })

  test('clone: should be able to clone events of a specific type from one element to another', 2, function () {
    bean.add(el2, 'click', function () {ok(true, 'clones events of a specific type from one element to another 1')});
    bean.add(el2, 'click', function () {
      ok(true, 'clone events of a specific type from one element to another 2');
      bean.remove(el1);
    });
    bean.add(el2, 'keydown', function () {
      ok(true, 'clone events of a specific type from one element to another 3');
      bean.remove(el1);
    });
    bean.clone(el1, el2, 'click');
    Syn.click(el1).key('j');
  });

  test('clone: should be able to clone all events from one element to another', 3, function () {
    bean.add(el2, 'keypress', function () {ok(true, 'clones all events from one element to another 1');});
    bean.add(el2, 'click', function () {ok(true, 'clones all events from one element to another 2');});
    bean.add(el2, 'click', function () {ok(true, 'clonesall events from one element to another 3');});
    bean.clone(el1, el2);
    Syn.click(el1).key('j');
  });

  test('clone: should firere cloned event in scope of new element', 1, function () {
    bean.add(el1, 'click', function () {
      ok(this == el2, 'scope of "this" is the element that cloned the event')
    })
    bean.clone(el2, el1)
    Syn.click(el2)
  });

})

sink('delegation', function (test, ok) {

  test('delegate: should be able to delegate on selectors', 4, function () {
    var el1 = document.getElementById('foo');
    var el2 = document.getElementById('bar');
    var el3 = document.getElementById('baz');
    var el4 = document.getElementById('bang');
    bean.remove(el1);
    bean.remove(el2);
    bean.remove(el3);
    bean.add(el1, '.bar', 'click', function () {
      ok(true, 'delegation on selectors 1');
      ok(this == el2, 'delegation on selectors, context was set to delegated element 2');
    }, qwery);
    Syn.click(el2);
    Syn.click(el3);
    Syn.click(el4);
  });

  test('delegate: should be able to delegate on arary', 4, function () {
    var el1 = document.getElementById('foo');
    var el2 = document.getElementById('bar');
    var el3 = document.getElementById('baz');
    var el4 = document.getElementById('bang');
    bean.remove(el1);
    bean.remove(el2);
    bean.remove(el3);
    bean.add(el1, [el2], 'click', function () {
      ok(true, 'delegation on arary 1');
      ok(this == el2, 'delegation on arary, context was set to delegated element 1');
    }, qwery);
    Syn.click(el2);
    Syn.click(el3);
    Syn.click(el4);
  });
})

sink('namespaces', function (test, ok) {

  test('namespace: should be able to name handlers', 1, function () {
    var el1 = document.getElementById('foo');
    bean.remove(el1);
    bean.add(el1, 'click.fat', function () {ok(true, 'bubbles up dom')});
    Syn.click(el1);
  });

  test('namespace: should be able to add multiple handlers under the same namespace to the same element', 2, function () {
    var el1 = document.getElementById('foo');
    bean.remove(el1);
    bean.add(el1, 'click.fat', function () {ok(true, 'bubbles up dom')});
    bean.add(el1, 'click.fat', function () {ok(true, 'bubbles up dom')});
    Syn.click(el1);
  });

  test('namespace: should be able to fire an event without handlers', 1, function () {
    var el1 = document.getElementById('foo'), succ;
    bean.remove(el1);
    try {
      bean.fire(el1, 'click.fat');
      succ = true;
    } catch (exc) {
      succ = false;
    }
    ok(succ, 'fire namespaced event with no handlers');
  });

  test('namespace: should be able to target namespaced event handlers with fire', 1, function () {
    var el1 = document.getElementById('foo');
    bean.remove(el1);
    bean.add(el1, 'click.fat', function () {ok(true, 'targets namespaced event handlers with fire')});
    bean.add(el1, 'click', function () {ok(true, 'targets namespaced event handlers with fire')});
    bean.fire(el1, 'click.fat');
  });

  test('namespace: should be able to target multiple namespaced event handlers with fire', 2, function () {
    var el1 = document.getElementById('foo');
    bean.remove(el1);
    bean.add(el1, 'click.fat', function () {ok(true, 'target multiple namespaced event handlers with fire')});
    bean.add(el1, 'click.ded', function () {ok(true, 'targets multiple namespaced event handlers with fire')});
    bean.add(el1, 'click', function () {ok(true, 'targets multiple namespaced event handlers with fire')});
    bean.fire(el1, 'click.fat.ded');
  });

  test('namespace: should be able to remove handlers based on name', 1, function () {
    var el1 = document.getElementById('foo');
    bean.remove(el1);
    bean.add(el1, 'click.ded', function () {ok(true, 'removes handlers based on name')});
    bean.add(el1, 'click', function () {ok(true, 'removes handlers based on name')});
    bean.remove(el1, 'click.ded');
    Syn.click(el1);
  });

  test('namespace: should be able to remove multiple handlers based on name', 1, function () {
    var el1 = document.getElementById('foo');
    bean.remove(el1);
    bean.add(el1, 'click.fat', function () {ok(true, 'removes multiple handlers based on name')});
    bean.add(el1, 'click.ded', function () {ok(true, 'removes multiple handlers based on name')});
    bean.add(el1, 'click', function () {ok(true, 'removes multiple handlers based on name')});
    bean.remove(el1, 'click.ded.fat');
    Syn.click(el1);
  });

});

window.onload = start;