i18n = {
    _l: null,
    _r: false,
    _p: {},
    init: function(l) {
        this._l = l;
        this._load();
    },
    _: function(key, args) {
        var t = this._p.hasOwnProperty(key) ? this._p[key] : key, a;
        if (args) {
            for (a in args) {
                t = t.replace(/%s/, args[a]);
            }
        }
        return t;
    },
    ready: function(cb) {
        var _t = this, i = setInterval(function() {
            if (_t._r) {
                cb();
                clearInterval(i);
            }
        }, 10);
    },
    _load: function() {
        var _t = this, x, lsa = 'localStorage' in window && window['localStorage'] !== null, cache = null;
        if (_t._l) {
            if (lsa) {
                cache = localStorage.getItem('i18n_' + _t._l);
                if (cache) {
                    _t._p = JSON.parse(cache);
                    _t._r = true;
                    return;
                }
            }

            x = new XMLHttpRequest();
            x.onreadystatechange = function() {
                if (x.readyState === 4) {
                    if (x.status === 200) {
                        localStorage.setItem('i18n_' + _t._l, x.responseText);
                        _t._p = JSON.parse(x.responseText);
                    } else {
                        console.error('Can not load JSON from ' + _t._l);
                    }
                    _t._r = true;
                }
            };
            x.open('GET', this._l, true);
            x.send();
        } else {
            _t._r = true;
        }
    }
};