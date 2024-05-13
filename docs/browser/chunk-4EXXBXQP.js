var Kp = Object.create;
var Si = Object.defineProperty,
    Yp = Object.defineProperties,
    Zp = Object.getOwnPropertyDescriptor,
    Jp = Object.getOwnPropertyDescriptors,
    Xp = Object.getOwnPropertyNames,
    Dr = Object.getOwnPropertySymbols,
    em = Object.getPrototypeOf,
    Ti = Object.prototype.hasOwnProperty,
    Cl = Object.prototype.propertyIsEnumerable;
var _l = (t, e, n) =>
        e in t
            ? Si(t, e, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: n,
              })
            : (t[e] = n),
    Se = (t, e) => {
        for (var n in (e ||= {})) Ti.call(e, n) && _l(t, n, e[n]);
        if (Dr) for (var n of Dr(e)) Cl.call(e, n) && _l(t, n, e[n]);
        return t;
    },
    It = (t, e) => Yp(t, Jp(e));
var Sl = (t, e) => {
    var n = {};
    for (var r in t) Ti.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
    if (t != null && Dr)
        for (var r of Dr(t)) e.indexOf(r) < 0 && Cl.call(t, r) && (n[r] = t[r]);
    return n;
};
var aC = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var tm = (t, e, n, r) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
        for (let o of Xp(e))
            !Ti.call(t, o) &&
                o !== n &&
                Si(t, o, {
                    get: () => e[o],
                    enumerable: !(r = Zp(e, o)) || r.enumerable,
                });
    return t;
};
var uC = (t, e, n) => (
    (n = t != null ? Kp(em(t)) : {}),
    tm(
        e || !t || !t.__esModule
            ? Si(n, 'default', { value: t, enumerable: !0 })
            : n,
        t,
    )
);
var nm = (t, e, n) =>
    new Promise((r, o) => {
        var i = (u) => {
                try {
                    a(n.next(u));
                } catch (l) {
                    o(l);
                }
            },
            s = (u) => {
                try {
                    a(n.throw(u));
                } catch (l) {
                    o(l);
                }
            },
            a = (u) =>
                u.done ? r(u.value) : Promise.resolve(u.value).then(i, s);
        a((n = n.apply(t, e)).next());
    });
function Tl(t, e) {
    return Object.is(t, e);
}
var J = null,
    Er = !1,
    wr = 1,
    st = Symbol('SIGNAL');
function L(t) {
    let e = J;
    return (J = t), e;
}
var Ir = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: !1,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: !1,
    consumerIsAlwaysLive: !1,
    producerMustRecompute: () => !1,
    producerRecomputeValue: () => {},
    consumerMarkedDirty: () => {},
    consumerOnSignalRead: () => {},
};
function Ni(t) {
    if (Er) throw new Error('');
    if (J === null) return;
    J.consumerOnSignalRead(t);
    let e = J.nextProducerIndex++;
    if (
        (Zt(J), e < J.producerNode.length && J.producerNode[e] !== t && Fn(J))
    ) {
        let n = J.producerNode[e];
        _r(n, J.producerIndexOfThis[e]);
    }
    J.producerNode[e] !== t &&
        ((J.producerNode[e] = t),
        (J.producerIndexOfThis[e] = Fn(J) ? Ol(t, J, e) : 0)),
        (J.producerLastReadVersion[e] = t.version);
}
function rm() {
    wr++;
}
function Ml(t) {
    if (!(Fn(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === wr)) {
        if (!t.producerMustRecompute(t) && !Fi(t)) {
            (t.dirty = !1), (t.lastCleanEpoch = wr);
            return;
        }
        t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = wr);
    }
}
function xl(t) {
    if (t.liveConsumerNode === void 0) return;
    let e = Er;
    Er = !0;
    try {
        for (let n of t.liveConsumerNode) n.dirty || om(n);
    } finally {
        Er = e;
    }
}
function Nl() {
    return J?.consumerAllowSignalWrites !== !1;
}
function om(t) {
    (t.dirty = !0), xl(t), t.consumerMarkedDirty?.(t);
}
function Ai(t) {
    return t && (t.nextProducerIndex = 0), L(t);
}
function Oi(t, e) {
    if (
        (L(e),
        !(
            !t ||
            t.producerNode === void 0 ||
            t.producerIndexOfThis === void 0 ||
            t.producerLastReadVersion === void 0
        ))
    ) {
        if (Fn(t))
            for (let n = t.nextProducerIndex; n < t.producerNode.length; n++)
                _r(t.producerNode[n], t.producerIndexOfThis[n]);
        for (; t.producerNode.length > t.nextProducerIndex; )
            t.producerNode.pop(),
                t.producerLastReadVersion.pop(),
                t.producerIndexOfThis.pop();
    }
}
function Fi(t) {
    Zt(t);
    for (let e = 0; e < t.producerNode.length; e++) {
        let n = t.producerNode[e],
            r = t.producerLastReadVersion[e];
        if (r !== n.version || (Ml(n), r !== n.version)) return !0;
    }
    return !1;
}
function Al(t) {
    if ((Zt(t), Fn(t)))
        for (let e = 0; e < t.producerNode.length; e++)
            _r(t.producerNode[e], t.producerIndexOfThis[e]);
    (t.producerNode.length =
        t.producerLastReadVersion.length =
        t.producerIndexOfThis.length =
            0),
        t.liveConsumerNode &&
            (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function Ol(t, e, n) {
    if ((Fl(t), Zt(t), t.liveConsumerNode.length === 0))
        for (let r = 0; r < t.producerNode.length; r++)
            t.producerIndexOfThis[r] = Ol(t.producerNode[r], t, r);
    return t.liveConsumerIndexOfThis.push(n), t.liveConsumerNode.push(e) - 1;
}
function _r(t, e) {
    if ((Fl(t), Zt(t), t.liveConsumerNode.length === 1))
        for (let r = 0; r < t.producerNode.length; r++)
            _r(t.producerNode[r], t.producerIndexOfThis[r]);
    let n = t.liveConsumerNode.length - 1;
    if (
        ((t.liveConsumerNode[e] = t.liveConsumerNode[n]),
        (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[n]),
        t.liveConsumerNode.length--,
        t.liveConsumerIndexOfThis.length--,
        e < t.liveConsumerNode.length)
    ) {
        let r = t.liveConsumerIndexOfThis[e],
            o = t.liveConsumerNode[e];
        Zt(o), (o.producerIndexOfThis[r] = e);
    }
}
function Fn(t) {
    return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function Zt(t) {
    (t.producerNode ??= []),
        (t.producerIndexOfThis ??= []),
        (t.producerLastReadVersion ??= []);
}
function Fl(t) {
    (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function Pl(t) {
    let e = Object.create(im);
    e.computation = t;
    let n = () => {
        if ((Ml(e), Ni(e), e.value === br)) throw e.error;
        return e.value;
    };
    return (n[st] = e), n;
}
var Mi = Symbol('UNSET'),
    xi = Symbol('COMPUTING'),
    br = Symbol('ERRORED'),
    im = It(Se({}, Ir), {
        value: Mi,
        dirty: !0,
        error: null,
        equal: Tl,
        producerMustRecompute(t) {
            return t.value === Mi || t.value === xi;
        },
        producerRecomputeValue(t) {
            if (t.value === xi)
                throw new Error('Detected cycle in computations.');
            let e = t.value;
            t.value = xi;
            let n = Ai(t),
                r;
            try {
                r = t.computation();
            } catch (o) {
                (r = br), (t.error = o);
            } finally {
                Oi(t, n);
            }
            if (e !== Mi && e !== br && r !== br && t.equal(e, r)) {
                t.value = e;
                return;
            }
            (t.value = r), t.version++;
        },
    });
function sm() {
    throw new Error();
}
var Rl = sm;
function kl() {
    Rl();
}
function Ll(t) {
    Rl = t;
}
var am = null;
function jl(t) {
    let e = Object.create(Bl);
    e.value = t;
    let n = () => (Ni(e), e.value);
    return (n[st] = e), n;
}
function Pi(t, e) {
    Nl() || kl(), t.equal(t.value, e) || ((t.value = e), um(t));
}
function Vl(t, e) {
    Nl() || kl(), Pi(t, e(t.value));
}
var Bl = It(Se({}, Ir), { equal: Tl, value: void 0 });
function um(t) {
    t.version++, rm(), xl(t), am?.();
}
function I(t) {
    return typeof t == 'function';
}
function at(t) {
    let n = t((r) => {
        Error.call(r), (r.stack = new Error().stack);
    });
    return (
        (n.prototype = Object.create(Error.prototype)),
        (n.prototype.constructor = n),
        n
    );
}
var Cr = at(
    (t) =>
        function (n) {
            t(this),
                (this.message = n
                    ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
                    : ''),
                (this.name = 'UnsubscriptionError'),
                (this.errors = n);
        },
);
function _t(t, e) {
    if (t) {
        let n = t.indexOf(e);
        0 <= n && t.splice(n, 1);
    }
}
var G = class t {
    constructor(e) {
        (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
    }
    unsubscribe() {
        let e;
        if (!this.closed) {
            this.closed = !0;
            let { _parentage: n } = this;
            if (n)
                if (((this._parentage = null), Array.isArray(n)))
                    for (let i of n) i.remove(this);
                else n.remove(this);
            let { initialTeardown: r } = this;
            if (I(r))
                try {
                    r();
                } catch (i) {
                    e = i instanceof Cr ? i.errors : [i];
                }
            let { _finalizers: o } = this;
            if (o) {
                this._finalizers = null;
                for (let i of o)
                    try {
                        $l(i);
                    } catch (s) {
                        (e = e ?? []),
                            s instanceof Cr
                                ? (e = [...e, ...s.errors])
                                : e.push(s);
                    }
            }
            if (e) throw new Cr(e);
        }
    }
    add(e) {
        var n;
        if (e && e !== this)
            if (this.closed) $l(e);
            else {
                if (e instanceof t) {
                    if (e.closed || e._hasParent(this)) return;
                    e._addParent(this);
                }
                (this._finalizers =
                    (n = this._finalizers) !== null && n !== void 0
                        ? n
                        : []).push(e);
            }
    }
    _hasParent(e) {
        let { _parentage: n } = this;
        return n === e || (Array.isArray(n) && n.includes(e));
    }
    _addParent(e) {
        let { _parentage: n } = this;
        this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
    }
    _removeParent(e) {
        let { _parentage: n } = this;
        n === e ? (this._parentage = null) : Array.isArray(n) && _t(n, e);
    }
    remove(e) {
        let { _finalizers: n } = this;
        n && _t(n, e), e instanceof t && e._removeParent(this);
    }
};
G.EMPTY = (() => {
    let t = new G();
    return (t.closed = !0), t;
})();
var Ri = G.EMPTY;
function Sr(t) {
    return (
        t instanceof G ||
        (t && 'closed' in t && I(t.remove) && I(t.add) && I(t.unsubscribe))
    );
}
function $l(t) {
    I(t) ? t() : t.unsubscribe();
}
var Te = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1,
};
var Jt = {
    setTimeout(t, e, ...n) {
        let { delegate: r } = Jt;
        return r?.setTimeout
            ? r.setTimeout(t, e, ...n)
            : setTimeout(t, e, ...n);
    },
    clearTimeout(t) {
        let { delegate: e } = Jt;
        return (e?.clearTimeout || clearTimeout)(t);
    },
    delegate: void 0,
};
function Tr(t) {
    Jt.setTimeout(() => {
        let { onUnhandledError: e } = Te;
        if (e) e(t);
        else throw t;
    });
}
function Ct() {}
var Hl = ki('C', void 0, void 0);
function Ul(t) {
    return ki('E', void 0, t);
}
function zl(t) {
    return ki('N', t, void 0);
}
function ki(t, e, n) {
    return { kind: t, value: e, error: n };
}
var St = null;
function Xt(t) {
    if (Te.useDeprecatedSynchronousErrorHandling) {
        let e = !St;
        if ((e && (St = { errorThrown: !1, error: null }), t(), e)) {
            let { errorThrown: n, error: r } = St;
            if (((St = null), n)) throw r;
        }
    } else t();
}
function ql(t) {
    Te.useDeprecatedSynchronousErrorHandling &&
        St &&
        ((St.errorThrown = !0), (St.error = t));
}
var Tt = class extends G {
        constructor(e) {
            super(),
                (this.isStopped = !1),
                e
                    ? ((this.destination = e), Sr(e) && e.add(this))
                    : (this.destination = dm);
        }
        static create(e, n, r) {
            return new qe(e, n, r);
        }
        next(e) {
            this.isStopped ? ji(zl(e), this) : this._next(e);
        }
        error(e) {
            this.isStopped
                ? ji(Ul(e), this)
                : ((this.isStopped = !0), this._error(e));
        }
        complete() {
            this.isStopped
                ? ji(Hl, this)
                : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
            this.closed ||
                ((this.isStopped = !0),
                super.unsubscribe(),
                (this.destination = null));
        }
        _next(e) {
            this.destination.next(e);
        }
        _error(e) {
            try {
                this.destination.error(e);
            } finally {
                this.unsubscribe();
            }
        }
        _complete() {
            try {
                this.destination.complete();
            } finally {
                this.unsubscribe();
            }
        }
    },
    lm = Function.prototype.bind;
function Li(t, e) {
    return lm.call(t, e);
}
var Vi = class {
        constructor(e) {
            this.partialObserver = e;
        }
        next(e) {
            let { partialObserver: n } = this;
            if (n.next)
                try {
                    n.next(e);
                } catch (r) {
                    Mr(r);
                }
        }
        error(e) {
            let { partialObserver: n } = this;
            if (n.error)
                try {
                    n.error(e);
                } catch (r) {
                    Mr(r);
                }
            else Mr(e);
        }
        complete() {
            let { partialObserver: e } = this;
            if (e.complete)
                try {
                    e.complete();
                } catch (n) {
                    Mr(n);
                }
        }
    },
    qe = class extends Tt {
        constructor(e, n, r) {
            super();
            let o;
            if (I(e) || !e)
                o = {
                    next: e ?? void 0,
                    error: n ?? void 0,
                    complete: r ?? void 0,
                };
            else {
                let i;
                this && Te.useDeprecatedNextContext
                    ? ((i = Object.create(e)),
                      (i.unsubscribe = () => this.unsubscribe()),
                      (o = {
                          next: e.next && Li(e.next, i),
                          error: e.error && Li(e.error, i),
                          complete: e.complete && Li(e.complete, i),
                      }))
                    : (o = e);
            }
            this.destination = new Vi(o);
        }
    };
function Mr(t) {
    Te.useDeprecatedSynchronousErrorHandling ? ql(t) : Tr(t);
}
function cm(t) {
    throw t;
}
function ji(t, e) {
    let { onStoppedNotification: n } = Te;
    n && Jt.setTimeout(() => n(t, e));
}
var dm = { closed: !0, next: Ct, error: cm, complete: Ct };
var en = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function X(t) {
    return t;
}
function fm(...t) {
    return Bi(t);
}
function Bi(t) {
    return t.length === 0
        ? X
        : t.length === 1
          ? t[0]
          : function (n) {
                return t.reduce((r, o) => o(r), n);
            };
}
var F = (() => {
    class t {
        constructor(n) {
            n && (this._subscribe = n);
        }
        lift(n) {
            let r = new t();
            return (r.source = this), (r.operator = n), r;
        }
        subscribe(n, r, o) {
            let i = pm(n) ? n : new qe(n, r, o);
            return (
                Xt(() => {
                    let { operator: s, source: a } = this;
                    i.add(
                        s
                            ? s.call(i, a)
                            : a
                              ? this._subscribe(i)
                              : this._trySubscribe(i),
                    );
                }),
                i
            );
        }
        _trySubscribe(n) {
            try {
                return this._subscribe(n);
            } catch (r) {
                n.error(r);
            }
        }
        forEach(n, r) {
            return (
                (r = Gl(r)),
                new r((o, i) => {
                    let s = new qe({
                        next: (a) => {
                            try {
                                n(a);
                            } catch (u) {
                                i(u), s.unsubscribe();
                            }
                        },
                        error: i,
                        complete: o,
                    });
                    this.subscribe(s);
                })
            );
        }
        _subscribe(n) {
            var r;
            return (r = this.source) === null || r === void 0
                ? void 0
                : r.subscribe(n);
        }
        [en]() {
            return this;
        }
        pipe(...n) {
            return Bi(n)(this);
        }
        toPromise(n) {
            return (
                (n = Gl(n)),
                new n((r, o) => {
                    let i;
                    this.subscribe(
                        (s) => (i = s),
                        (s) => o(s),
                        () => r(i),
                    );
                })
            );
        }
    }
    return (t.create = (e) => new t(e)), t;
})();
function Gl(t) {
    var e;
    return (e = t ?? Te.Promise) !== null && e !== void 0 ? e : Promise;
}
function hm(t) {
    return t && I(t.next) && I(t.error) && I(t.complete);
}
function pm(t) {
    return (t && t instanceof Tt) || (hm(t) && Sr(t));
}
function $i(t) {
    return I(t?.lift);
}
function D(t) {
    return (e) => {
        if ($i(e))
            return e.lift(function (n) {
                try {
                    return t(n, this);
                } catch (r) {
                    this.error(r);
                }
            });
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
function v(t, e, n, r, o) {
    return new Hi(t, e, n, r, o);
}
var Hi = class extends Tt {
    constructor(e, n, r, o, i, s) {
        super(e),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
                ? function (a) {
                      try {
                          n(a);
                      } catch (u) {
                          e.error(u);
                      }
                  }
                : super._next),
            (this._error = o
                ? function (a) {
                      try {
                          o(a);
                      } catch (u) {
                          e.error(u);
                      } finally {
                          this.unsubscribe();
                      }
                  }
                : super._error),
            (this._complete = r
                ? function () {
                      try {
                          r();
                      } catch (a) {
                          e.error(a);
                      } finally {
                          this.unsubscribe();
                      }
                  }
                : super._complete);
    }
    unsubscribe() {
        var e;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let { closed: n } = this;
            super.unsubscribe(),
                !n &&
                    ((e = this.onFinalize) === null ||
                        e === void 0 ||
                        e.call(this));
        }
    }
};
function Ui() {
    return D((t, e) => {
        let n = null;
        t._refCount++;
        let r = v(e, void 0, void 0, void 0, () => {
            if (!t || t._refCount <= 0 || 0 < --t._refCount) {
                n = null;
                return;
            }
            let o = t._connection,
                i = n;
            (n = null),
                o && (!i || o === i) && o.unsubscribe(),
                e.unsubscribe();
        });
        t.subscribe(r), r.closed || (n = t.connect());
    });
}
var zi = class extends F {
    constructor(e, n) {
        super(),
            (this.source = e),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            $i(e) && (this.lift = e.lift);
    }
    _subscribe(e) {
        return this.getSubject().subscribe(e);
    }
    getSubject() {
        let e = this._subject;
        return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
        );
    }
    _teardown() {
        this._refCount = 0;
        let { _connection: e } = this;
        (this._subject = this._connection = null), e?.unsubscribe();
    }
    connect() {
        let e = this._connection;
        if (!e) {
            e = this._connection = new G();
            let n = this.getSubject();
            e.add(
                this.source.subscribe(
                    v(
                        n,
                        void 0,
                        () => {
                            this._teardown(), n.complete();
                        },
                        (r) => {
                            this._teardown(), n.error(r);
                        },
                        () => this._teardown(),
                    ),
                ),
            ),
                e.closed && ((this._connection = null), (e = G.EMPTY));
        }
        return e;
    }
    refCount() {
        return Ui()(this);
    }
};
var Wl = at(
    (t) =>
        function () {
            t(this),
                (this.name = 'ObjectUnsubscribedError'),
                (this.message = 'object unsubscribed');
        },
);
var le = (() => {
        class t extends F {
            constructor() {
                super(),
                    (this.closed = !1),
                    (this.currentObservers = null),
                    (this.observers = []),
                    (this.isStopped = !1),
                    (this.hasError = !1),
                    (this.thrownError = null);
            }
            lift(n) {
                let r = new xr(this, this);
                return (r.operator = n), r;
            }
            _throwIfClosed() {
                if (this.closed) throw new Wl();
            }
            next(n) {
                Xt(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        this.currentObservers ||
                            (this.currentObservers = Array.from(
                                this.observers,
                            ));
                        for (let r of this.currentObservers) r.next(n);
                    }
                });
            }
            error(n) {
                Xt(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        (this.hasError = this.isStopped = !0),
                            (this.thrownError = n);
                        let { observers: r } = this;
                        for (; r.length; ) r.shift().error(n);
                    }
                });
            }
            complete() {
                Xt(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        this.isStopped = !0;
                        let { observers: n } = this;
                        for (; n.length; ) n.shift().complete();
                    }
                });
            }
            unsubscribe() {
                (this.isStopped = this.closed = !0),
                    (this.observers = this.currentObservers = null);
            }
            get observed() {
                var n;
                return (
                    ((n = this.observers) === null || n === void 0
                        ? void 0
                        : n.length) > 0
                );
            }
            _trySubscribe(n) {
                return this._throwIfClosed(), super._trySubscribe(n);
            }
            _subscribe(n) {
                return (
                    this._throwIfClosed(),
                    this._checkFinalizedStatuses(n),
                    this._innerSubscribe(n)
                );
            }
            _innerSubscribe(n) {
                let { hasError: r, isStopped: o, observers: i } = this;
                return r || o
                    ? Ri
                    : ((this.currentObservers = null),
                      i.push(n),
                      new G(() => {
                          (this.currentObservers = null), _t(i, n);
                      }));
            }
            _checkFinalizedStatuses(n) {
                let { hasError: r, thrownError: o, isStopped: i } = this;
                r ? n.error(o) : i && n.complete();
            }
            asObservable() {
                let n = new F();
                return (n.source = this), n;
            }
        }
        return (t.create = (e, n) => new xr(e, n)), t;
    })(),
    xr = class extends le {
        constructor(e, n) {
            super(), (this.destination = e), (this.source = n);
        }
        next(e) {
            var n, r;
            (r =
                (n = this.destination) === null || n === void 0
                    ? void 0
                    : n.next) === null ||
                r === void 0 ||
                r.call(n, e);
        }
        error(e) {
            var n, r;
            (r =
                (n = this.destination) === null || n === void 0
                    ? void 0
                    : n.error) === null ||
                r === void 0 ||
                r.call(n, e);
        }
        complete() {
            var e, n;
            (n =
                (e = this.destination) === null || e === void 0
                    ? void 0
                    : e.complete) === null ||
                n === void 0 ||
                n.call(e);
        }
        _subscribe(e) {
            var n, r;
            return (r =
                (n = this.source) === null || n === void 0
                    ? void 0
                    : n.subscribe(e)) !== null && r !== void 0
                ? r
                : Ri;
        }
    };
var Pn = class extends le {
    constructor(e) {
        super(), (this._value = e);
    }
    get value() {
        return this.getValue();
    }
    _subscribe(e) {
        let n = super._subscribe(e);
        return !n.closed && e.next(this._value), n;
    }
    getValue() {
        let { hasError: e, thrownError: n, _value: r } = this;
        if (e) throw n;
        return this._throwIfClosed(), r;
    }
    next(e) {
        super.next((this._value = e));
    }
};
var Rn = {
    now() {
        return (Rn.delegate || Date).now();
    },
    delegate: void 0,
};
var kn = class extends le {
    constructor(e = 1 / 0, n = 1 / 0, r = Rn) {
        super(),
            (this._bufferSize = e),
            (this._windowTime = n),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = n === 1 / 0),
            (this._bufferSize = Math.max(1, e)),
            (this._windowTime = Math.max(1, n));
    }
    next(e) {
        let {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s,
        } = this;
        n || (r.push(e), !o && r.push(i.now() + s)),
            this._trimBuffer(),
            super.next(e);
    }
    _subscribe(e) {
        this._throwIfClosed(), this._trimBuffer();
        let n = this._innerSubscribe(e),
            { _infiniteTimeWindow: r, _buffer: o } = this,
            i = o.slice();
        for (let s = 0; s < i.length && !e.closed; s += r ? 1 : 2) e.next(i[s]);
        return this._checkFinalizedStatuses(e), n;
    }
    _trimBuffer() {
        let {
                _bufferSize: e,
                _timestampProvider: n,
                _buffer: r,
                _infiniteTimeWindow: o,
            } = this,
            i = (o ? 1 : 2) * e;
        if ((e < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
            let s = n.now(),
                a = 0;
            for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u;
            a && r.splice(0, a + 1);
        }
    }
};
var Nr = class extends G {
    constructor(e, n) {
        super();
    }
    schedule(e, n = 0) {
        return this;
    }
};
var Ln = {
    setInterval(t, e, ...n) {
        let { delegate: r } = Ln;
        return r?.setInterval
            ? r.setInterval(t, e, ...n)
            : setInterval(t, e, ...n);
    },
    clearInterval(t) {
        let { delegate: e } = Ln;
        return (e?.clearInterval || clearInterval)(t);
    },
    delegate: void 0,
};
var tn = class extends Nr {
    constructor(e, n) {
        super(e, n), (this.scheduler = e), (this.work = n), (this.pending = !1);
    }
    schedule(e, n = 0) {
        var r;
        if (this.closed) return this;
        this.state = e;
        let o = this.id,
            i = this.scheduler;
        return (
            o != null && (this.id = this.recycleAsyncId(i, o, n)),
            (this.pending = !0),
            (this.delay = n),
            (this.id =
                (r = this.id) !== null && r !== void 0
                    ? r
                    : this.requestAsyncId(i, this.id, n)),
            this
        );
    }
    requestAsyncId(e, n, r = 0) {
        return Ln.setInterval(e.flush.bind(e, this), r);
    }
    recycleAsyncId(e, n, r = 0) {
        if (r != null && this.delay === r && this.pending === !1) return n;
        n != null && Ln.clearInterval(n);
    }
    execute(e, n) {
        if (this.closed) return new Error('executing a cancelled action');
        this.pending = !1;
        let r = this._execute(e, n);
        if (r) return r;
        this.pending === !1 &&
            this.id != null &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
    }
    _execute(e, n) {
        let r = !1,
            o;
        try {
            this.work(e);
        } catch (i) {
            (r = !0),
                (o = i || new Error('Scheduled action threw falsy error'));
        }
        if (r) return this.unsubscribe(), o;
    }
    unsubscribe() {
        if (!this.closed) {
            let { id: e, scheduler: n } = this,
                { actions: r } = n;
            (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                _t(r, this),
                e != null && (this.id = this.recycleAsyncId(n, e, null)),
                (this.delay = null),
                super.unsubscribe();
        }
    }
};
var nn = class t {
    constructor(e, n = t.now) {
        (this.schedulerActionCtor = e), (this.now = n);
    }
    schedule(e, n = 0, r) {
        return new this.schedulerActionCtor(this, e).schedule(r, n);
    }
};
nn.now = Rn.now;
var rn = class extends nn {
    constructor(e, n = nn.now) {
        super(e, n), (this.actions = []), (this._active = !1);
    }
    flush(e) {
        let { actions: n } = this;
        if (this._active) {
            n.push(e);
            return;
        }
        let r;
        this._active = !0;
        do if ((r = e.execute(e.state, e.delay))) break;
        while ((e = n.shift()));
        if (((this._active = !1), r)) {
            for (; (e = n.shift()); ) e.unsubscribe();
            throw r;
        }
    }
};
var Ge = new rn(tn),
    Ql = Ge;
var Ar = class extends tn {
    constructor(e, n) {
        super(e, n), (this.scheduler = e), (this.work = n);
    }
    schedule(e, n = 0) {
        return n > 0
            ? super.schedule(e, n)
            : ((this.delay = n),
              (this.state = e),
              this.scheduler.flush(this),
              this);
    }
    execute(e, n) {
        return n > 0 || this.closed ? super.execute(e, n) : this._execute(e, n);
    }
    requestAsyncId(e, n, r = 0) {
        return (r != null && r > 0) || (r == null && this.delay > 0)
            ? super.requestAsyncId(e, n, r)
            : (e.flush(this), 0);
    }
};
var Or = class extends rn {};
var mm = new Or(Ar);
var We = new F((t) => t.complete());
function Fr(t) {
    return t && I(t.schedule);
}
function qi(t) {
    return t[t.length - 1];
}
function on(t) {
    return I(qi(t)) ? t.pop() : void 0;
}
function ke(t) {
    return Fr(qi(t)) ? t.pop() : void 0;
}
function Kl(t, e) {
    return typeof qi(t) == 'number' ? t.pop() : e;
}
function J0(t, e) {
    var n = {};
    for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) &&
            e.indexOf(r) < 0 &&
            (n[r] = t[r]);
    if (t != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var o = 0, r = Object.getOwnPropertySymbols(t); o < r.length; o++)
            e.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
                (n[r[o]] = t[r[o]]);
    return n;
}
function X0(t, e, n, r) {
    var o = arguments.length,
        i =
            o < 3
                ? e
                : r === null
                  ? (r = Object.getOwnPropertyDescriptor(e, n))
                  : r,
        s;
    if (typeof Reflect == 'object' && typeof Reflect.decorate == 'function')
        i = Reflect.decorate(t, e, n, r);
    else
        for (var a = t.length - 1; a >= 0; a--)
            (s = t[a]) &&
                (i = (o < 3 ? s(i) : o > 3 ? s(e, n, i) : s(e, n)) || i);
    return o > 3 && i && Object.defineProperty(e, n, i), i;
}
function Zl(t, e, n, r) {
    function o(i) {
        return i instanceof n
            ? i
            : new n(function (s) {
                  s(i);
              });
    }
    return new (n || (n = Promise))(function (i, s) {
        function a(c) {
            try {
                l(r.next(c));
            } catch (d) {
                s(d);
            }
        }
        function u(c) {
            try {
                l(r.throw(c));
            } catch (d) {
                s(d);
            }
        }
        function l(c) {
            c.done ? i(c.value) : o(c.value).then(a, u);
        }
        l((r = r.apply(t, e || [])).next());
    });
}
function Yl(t) {
    var e = typeof Symbol == 'function' && Symbol.iterator,
        n = e && t[e],
        r = 0;
    if (n) return n.call(t);
    if (t && typeof t.length == 'number')
        return {
            next: function () {
                return (
                    t && r >= t.length && (t = void 0),
                    { value: t && t[r++], done: !t }
                );
            },
        };
    throw new TypeError(
        e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
    );
}
function Mt(t) {
    return this instanceof Mt ? ((this.v = t), this) : new Mt(t);
}
function Jl(t, e, n) {
    if (!Symbol.asyncIterator)
        throw new TypeError('Symbol.asyncIterator is not defined.');
    var r = n.apply(t, e || []),
        o,
        i = [];
    return (
        (o = {}),
        s('next'),
        s('throw'),
        s('return'),
        (o[Symbol.asyncIterator] = function () {
            return this;
        }),
        o
    );
    function s(h) {
        r[h] &&
            (o[h] = function (f) {
                return new Promise(function (p, m) {
                    i.push([h, f, p, m]) > 1 || a(h, f);
                });
            });
    }
    function a(h, f) {
        try {
            u(r[h](f));
        } catch (p) {
            d(i[0][3], p);
        }
    }
    function u(h) {
        h.value instanceof Mt
            ? Promise.resolve(h.value.v).then(l, c)
            : d(i[0][2], h);
    }
    function l(h) {
        a('next', h);
    }
    function c(h) {
        a('throw', h);
    }
    function d(h, f) {
        h(f), i.shift(), i.length && a(i[0][0], i[0][1]);
    }
}
function Xl(t) {
    if (!Symbol.asyncIterator)
        throw new TypeError('Symbol.asyncIterator is not defined.');
    var e = t[Symbol.asyncIterator],
        n;
    return e
        ? e.call(t)
        : ((t = typeof Yl == 'function' ? Yl(t) : t[Symbol.iterator]()),
          (n = {}),
          r('next'),
          r('throw'),
          r('return'),
          (n[Symbol.asyncIterator] = function () {
              return this;
          }),
          n);
    function r(i) {
        n[i] =
            t[i] &&
            function (s) {
                return new Promise(function (a, u) {
                    (s = t[i](s)), o(a, u, s.done, s.value);
                });
            };
    }
    function o(i, s, a, u) {
        Promise.resolve(u).then(function (l) {
            i({ value: l, done: a });
        }, s);
    }
}
var sn = (t) => t && typeof t.length == 'number' && typeof t != 'function';
function Pr(t) {
    return I(t?.then);
}
function Rr(t) {
    return I(t[en]);
}
function kr(t) {
    return Symbol.asyncIterator && I(t?.[Symbol.asyncIterator]);
}
function Lr(t) {
    return new TypeError(
        `You provided ${t !== null && typeof t == 'object' ? 'an invalid object' : `'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
    );
}
function gm() {
    return typeof Symbol != 'function' || !Symbol.iterator
        ? '@@iterator'
        : Symbol.iterator;
}
var jr = gm();
function Vr(t) {
    return I(t?.[jr]);
}
function Br(t) {
    return Jl(this, arguments, function* () {
        let n = t.getReader();
        try {
            for (;;) {
                let { value: r, done: o } = yield Mt(n.read());
                if (o) return yield Mt(void 0);
                yield yield Mt(r);
            }
        } finally {
            n.releaseLock();
        }
    });
}
function $r(t) {
    return I(t?.getReader);
}
function A(t) {
    if (t instanceof F) return t;
    if (t != null) {
        if (Rr(t)) return ym(t);
        if (sn(t)) return vm(t);
        if (Pr(t)) return Dm(t);
        if (kr(t)) return ec(t);
        if (Vr(t)) return Em(t);
        if ($r(t)) return wm(t);
    }
    throw Lr(t);
}
function ym(t) {
    return new F((e) => {
        let n = t[en]();
        if (I(n.subscribe)) return n.subscribe(e);
        throw new TypeError(
            'Provided object does not correctly implement Symbol.observable',
        );
    });
}
function vm(t) {
    return new F((e) => {
        for (let n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
        e.complete();
    });
}
function Dm(t) {
    return new F((e) => {
        t.then(
            (n) => {
                e.closed || (e.next(n), e.complete());
            },
            (n) => e.error(n),
        ).then(null, Tr);
    });
}
function Em(t) {
    return new F((e) => {
        for (let n of t) if ((e.next(n), e.closed)) return;
        e.complete();
    });
}
function ec(t) {
    return new F((e) => {
        bm(t, e).catch((n) => e.error(n));
    });
}
function wm(t) {
    return ec(Br(t));
}
function bm(t, e) {
    var n, r, o, i;
    return Zl(this, void 0, void 0, function* () {
        try {
            for (n = Xl(t); (r = yield n.next()), !r.done; ) {
                let s = r.value;
                if ((e.next(s), e.closed)) return;
            }
        } catch (s) {
            o = { error: s };
        } finally {
            try {
                r && !r.done && (i = n.return) && (yield i.call(n));
            } finally {
                if (o) throw o.error;
            }
        }
        e.complete();
    });
}
function re(t, e, n, r = 0, o = !1) {
    let i = e.schedule(function () {
        n(), o ? t.add(this.schedule(null, r)) : this.unsubscribe();
    }, r);
    if ((t.add(i), !o)) return i;
}
function jn(t, e = 0) {
    return D((n, r) => {
        n.subscribe(
            v(
                r,
                (o) => re(r, t, () => r.next(o), e),
                () => re(r, t, () => r.complete(), e),
                (o) => re(r, t, () => r.error(o), e),
            ),
        );
    });
}
function Hr(t, e = 0) {
    return D((n, r) => {
        r.add(t.schedule(() => n.subscribe(r), e));
    });
}
function tc(t, e) {
    return A(t).pipe(Hr(e), jn(e));
}
function nc(t, e) {
    return A(t).pipe(Hr(e), jn(e));
}
function rc(t, e) {
    return new F((n) => {
        let r = 0;
        return e.schedule(function () {
            r === t.length
                ? n.complete()
                : (n.next(t[r++]), n.closed || this.schedule());
        });
    });
}
function oc(t, e) {
    return new F((n) => {
        let r;
        return (
            re(n, e, () => {
                (r = t[jr]()),
                    re(
                        n,
                        e,
                        () => {
                            let o, i;
                            try {
                                ({ value: o, done: i } = r.next());
                            } catch (s) {
                                n.error(s);
                                return;
                            }
                            i ? n.complete() : n.next(o);
                        },
                        0,
                        !0,
                    );
            }),
            () => I(r?.return) && r.return()
        );
    });
}
function Ur(t, e) {
    if (!t) throw new Error('Iterable cannot be null');
    return new F((n) => {
        re(n, e, () => {
            let r = t[Symbol.asyncIterator]();
            re(
                n,
                e,
                () => {
                    r.next().then((o) => {
                        o.done ? n.complete() : n.next(o.value);
                    });
                },
                0,
                !0,
            );
        });
    });
}
function ic(t, e) {
    return Ur(Br(t), e);
}
function sc(t, e) {
    if (t != null) {
        if (Rr(t)) return tc(t, e);
        if (sn(t)) return rc(t, e);
        if (Pr(t)) return nc(t, e);
        if (kr(t)) return Ur(t, e);
        if (Vr(t)) return oc(t, e);
        if ($r(t)) return ic(t, e);
    }
    throw Lr(t);
}
function Le(t, e) {
    return e ? sc(t, e) : A(t);
}
function Im(...t) {
    let e = ke(t);
    return Le(t, e);
}
function _m(t, e) {
    let n = I(t) ? t : () => t,
        r = (o) => o.error(n());
    return new F(e ? (o) => e.schedule(r, 0, o) : r);
}
function Cm(t) {
    return !!t && (t instanceof F || (I(t.lift) && I(t.subscribe)));
}
var xt = at(
    (t) =>
        function () {
            t(this),
                (this.name = 'EmptyError'),
                (this.message = 'no elements in sequence');
        },
);
function zr(t) {
    return t instanceof Date && !isNaN(t);
}
var Sm = at(
    (t) =>
        function (n = null) {
            t(this),
                (this.message = 'Timeout has occurred'),
                (this.name = 'TimeoutError'),
                (this.info = n);
        },
);
function Tm(t, e) {
    let {
        first: n,
        each: r,
        with: o = Mm,
        scheduler: i = e ?? Ge,
        meta: s = null,
    } = zr(t) ? { first: t } : typeof t == 'number' ? { each: t } : t;
    if (n == null && r == null) throw new TypeError('No timeout provided.');
    return D((a, u) => {
        let l,
            c,
            d = null,
            h = 0,
            f = (p) => {
                c = re(
                    u,
                    i,
                    () => {
                        try {
                            l.unsubscribe(),
                                A(
                                    o({ meta: s, lastValue: d, seen: h }),
                                ).subscribe(u);
                        } catch (m) {
                            u.error(m);
                        }
                    },
                    p,
                );
            };
        (l = a.subscribe(
            v(
                u,
                (p) => {
                    c?.unsubscribe(), h++, u.next((d = p)), r > 0 && f(r);
                },
                void 0,
                void 0,
                () => {
                    c?.closed || c?.unsubscribe(), (d = null);
                },
            ),
        )),
            !h && f(n != null ? (typeof n == 'number' ? n : +n - i.now()) : r);
    });
}
function Mm(t) {
    throw new Sm(t);
}
function we(t, e) {
    return D((n, r) => {
        let o = 0;
        n.subscribe(
            v(r, (i) => {
                r.next(t.call(e, i, o++));
            }),
        );
    });
}
var { isArray: xm } = Array;
function Nm(t, e) {
    return xm(e) ? t(...e) : t(e);
}
function an(t) {
    return we((e) => Nm(t, e));
}
var { isArray: Am } = Array,
    { getPrototypeOf: Om, prototype: Fm, keys: Pm } = Object;
function qr(t) {
    if (t.length === 1) {
        let e = t[0];
        if (Am(e)) return { args: e, keys: null };
        if (Rm(e)) {
            let n = Pm(e);
            return { args: n.map((r) => e[r]), keys: n };
        }
    }
    return { args: t, keys: null };
}
function Rm(t) {
    return t && typeof t == 'object' && Om(t) === Fm;
}
function Gr(t, e) {
    return t.reduce((n, r, o) => ((n[r] = e[o]), n), {});
}
function km(...t) {
    let e = ke(t),
        n = on(t),
        { args: r, keys: o } = qr(t);
    if (r.length === 0) return Le([], e);
    let i = new F(Lm(r, e, o ? (s) => Gr(o, s) : X));
    return n ? i.pipe(an(n)) : i;
}
function Lm(t, e, n = X) {
    return (r) => {
        ac(
            e,
            () => {
                let { length: o } = t,
                    i = new Array(o),
                    s = o,
                    a = o;
                for (let u = 0; u < o; u++)
                    ac(
                        e,
                        () => {
                            let l = Le(t[u], e),
                                c = !1;
                            l.subscribe(
                                v(
                                    r,
                                    (d) => {
                                        (i[u] = d),
                                            c || ((c = !0), a--),
                                            a || r.next(n(i.slice()));
                                    },
                                    () => {
                                        --s || r.complete();
                                    },
                                ),
                            );
                        },
                        r,
                    );
            },
            r,
        );
    };
}
function ac(t, e, n) {
    t ? re(n, t, e) : e();
}
function uc(t, e, n, r, o, i, s, a) {
    let u = [],
        l = 0,
        c = 0,
        d = !1,
        h = () => {
            d && !u.length && !l && e.complete();
        },
        f = (m) => (l < r ? p(m) : u.push(m)),
        p = (m) => {
            i && e.next(m), l++;
            let b = !1;
            A(n(m, c++)).subscribe(
                v(
                    e,
                    (w) => {
                        o?.(w), i ? f(w) : e.next(w);
                    },
                    () => {
                        b = !0;
                    },
                    void 0,
                    () => {
                        if (b)
                            try {
                                for (l--; u.length && l < r; ) {
                                    let w = u.shift();
                                    s ? re(e, s, () => p(w)) : p(w);
                                }
                                h();
                            } catch (w) {
                                e.error(w);
                            }
                    },
                ),
            );
        };
    return (
        t.subscribe(
            v(e, f, () => {
                (d = !0), h();
            }),
        ),
        () => {
            a?.();
        }
    );
}
function Qe(t, e, n = 1 / 0) {
    return I(e)
        ? Qe((r, o) => we((i, s) => e(r, i, o, s))(A(t(r, o))), n)
        : (typeof e == 'number' && (n = e), D((r, o) => uc(r, o, t, n)));
}
function Vn(t = 1 / 0) {
    return Qe(X, t);
}
function lc() {
    return Vn(1);
}
function Wr(...t) {
    return lc()(Le(t, ke(t)));
}
function jm(t) {
    return new F((e) => {
        A(t()).subscribe(e);
    });
}
function Vm(...t) {
    let e = on(t),
        { args: n, keys: r } = qr(t),
        o = new F((i) => {
            let { length: s } = n;
            if (!s) {
                i.complete();
                return;
            }
            let a = new Array(s),
                u = s,
                l = s;
            for (let c = 0; c < s; c++) {
                let d = !1;
                A(n[c]).subscribe(
                    v(
                        i,
                        (h) => {
                            d || ((d = !0), l--), (a[c] = h);
                        },
                        () => u--,
                        void 0,
                        () => {
                            (!u || !d) &&
                                (l || i.next(r ? Gr(r, a) : a), i.complete());
                        },
                    ),
                );
            }
        });
    return e ? o.pipe(an(e)) : o;
}
var Bm = ['addListener', 'removeListener'],
    $m = ['addEventListener', 'removeEventListener'],
    Hm = ['on', 'off'];
function Gi(t, e, n, r) {
    if ((I(n) && ((r = n), (n = void 0)), r)) return Gi(t, e, n).pipe(an(r));
    let [o, i] = qm(t)
        ? $m.map((s) => (a) => t[s](e, a, n))
        : Um(t)
          ? Bm.map(cc(t, e))
          : zm(t)
            ? Hm.map(cc(t, e))
            : [];
    if (!o && sn(t)) return Qe((s) => Gi(s, e, n))(A(t));
    if (!o) throw new TypeError('Invalid event target');
    return new F((s) => {
        let a = (...u) => s.next(1 < u.length ? u : u[0]);
        return o(a), () => i(a);
    });
}
function cc(t, e) {
    return (n) => (r) => t[n](e, r);
}
function Um(t) {
    return I(t.addListener) && I(t.removeListener);
}
function zm(t) {
    return I(t.on) && I(t.off);
}
function qm(t) {
    return I(t.addEventListener) && I(t.removeEventListener);
}
function Nt(t = 0, e, n = Ql) {
    let r = -1;
    return (
        e != null && (Fr(e) ? (n = e) : (r = e)),
        new F((o) => {
            let i = zr(t) ? +t - n.now() : t;
            i < 0 && (i = 0);
            let s = 0;
            return n.schedule(function () {
                o.closed ||
                    (o.next(s++),
                    0 <= r ? this.schedule(void 0, r) : o.complete());
            }, i);
        })
    );
}
function Gm(t = 0, e = Ge) {
    return t < 0 && (t = 0), Nt(t, t, e);
}
function Wm(...t) {
    let e = ke(t),
        n = Kl(t, 1 / 0),
        r = t;
    return r.length ? (r.length === 1 ? A(r[0]) : Vn(n)(Le(r, e))) : We;
}
function At(t, e) {
    return D((n, r) => {
        let o = 0;
        n.subscribe(v(r, (i) => t.call(e, i, o++) && r.next(i)));
    });
}
function dc(t) {
    return D((e, n) => {
        let r = null,
            o = !1,
            i;
        (r = e.subscribe(
            v(n, void 0, void 0, (s) => {
                (i = A(t(s, dc(t)(e)))),
                    r
                        ? (r.unsubscribe(), (r = null), i.subscribe(n))
                        : (o = !0);
            }),
        )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
    });
}
function fc(t, e, n, r, o) {
    return (i, s) => {
        let a = n,
            u = e,
            l = 0;
        i.subscribe(
            v(
                s,
                (c) => {
                    let d = l++;
                    (u = a ? t(u, c, d) : ((a = !0), c)), r && s.next(u);
                },
                o &&
                    (() => {
                        a && s.next(u), s.complete();
                    }),
            ),
        );
    };
}
function Qm(t, e) {
    return I(e) ? Qe(t, e, 1) : Qe(t, 1);
}
function hc(t, e = Ge) {
    return D((n, r) => {
        let o = null,
            i = null,
            s = null,
            a = () => {
                if (o) {
                    o.unsubscribe(), (o = null);
                    let l = i;
                    (i = null), r.next(l);
                }
            };
        function u() {
            let l = s + t,
                c = e.now();
            if (c < l) {
                (o = this.schedule(void 0, l - c)), r.add(o);
                return;
            }
            a();
        }
        n.subscribe(
            v(
                r,
                (l) => {
                    (i = l),
                        (s = e.now()),
                        o || ((o = e.schedule(u, t)), r.add(o));
                },
                () => {
                    a(), r.complete();
                },
                void 0,
                () => {
                    i = o = null;
                },
            ),
        );
    });
}
function Bn(t) {
    return D((e, n) => {
        let r = !1;
        e.subscribe(
            v(
                n,
                (o) => {
                    (r = !0), n.next(o);
                },
                () => {
                    r || n.next(t), n.complete();
                },
            ),
        );
    });
}
function Qr(t) {
    return t <= 0
        ? () => We
        : D((e, n) => {
              let r = 0;
              e.subscribe(
                  v(n, (o) => {
                      ++r <= t && (n.next(o), t <= r && n.complete());
                  }),
              );
          });
}
function Km(t) {
    return we(() => t);
}
function Ym(t, e = X) {
    return (
        (t = t ?? Zm),
        D((n, r) => {
            let o,
                i = !0;
            n.subscribe(
                v(r, (s) => {
                    let a = e(s);
                    (i || !t(o, a)) && ((i = !1), (o = a), r.next(s));
                }),
            );
        })
    );
}
function Zm(t, e) {
    return t === e;
}
function Kr(t = Jm) {
    return D((e, n) => {
        let r = !1;
        e.subscribe(
            v(
                n,
                (o) => {
                    (r = !0), n.next(o);
                },
                () => (r ? n.complete() : n.error(t())),
            ),
        );
    });
}
function Jm() {
    return new xt();
}
function Xm(t) {
    return D((e, n) => {
        try {
            e.subscribe(n);
        } finally {
            n.add(t);
        }
    });
}
function Wi(t, e) {
    let n = arguments.length >= 2;
    return (r) =>
        r.pipe(
            t ? At((o, i) => t(o, i, r)) : X,
            Qr(1),
            n ? Bn(e) : Kr(() => new xt()),
        );
}
function Qi(t) {
    return t <= 0
        ? () => We
        : D((e, n) => {
              let r = [];
              e.subscribe(
                  v(
                      n,
                      (o) => {
                          r.push(o), t < r.length && r.shift();
                      },
                      () => {
                          for (let o of r) n.next(o);
                          n.complete();
                      },
                      void 0,
                      () => {
                          r = null;
                      },
                  ),
              );
          });
}
function eg(t, e) {
    let n = arguments.length >= 2;
    return (r) =>
        r.pipe(
            t ? At((o, i) => t(o, i, r)) : X,
            Qi(1),
            n ? Bn(e) : Kr(() => new xt()),
        );
}
function tg() {
    return D((t, e) => {
        let n,
            r = !1;
        t.subscribe(
            v(e, (o) => {
                let i = n;
                (n = o), r && e.next([i, o]), (r = !0);
            }),
        );
    });
}
function ng(...t) {
    let e = t.length;
    if (e === 0) throw new Error('list of properties cannot be empty.');
    return we((n) => {
        let r = n;
        for (let o = 0; o < e; o++) {
            let i = r?.[t[o]];
            if (typeof i < 'u') r = i;
            else return;
        }
        return r;
    });
}
function rg(t) {
    let e = 1 / 0,
        n;
    return (
        t != null &&
            (typeof t == 'object'
                ? ({ count: e = 1 / 0, delay: n } = t)
                : (e = t)),
        e <= 0
            ? () => We
            : D((r, o) => {
                  let i = 0,
                      s,
                      a = () => {
                          if ((s?.unsubscribe(), (s = null), n != null)) {
                              let l = typeof n == 'number' ? Nt(n) : A(n(i)),
                                  c = v(o, () => {
                                      c.unsubscribe(), u();
                                  });
                              l.subscribe(c);
                          } else u();
                      },
                      u = () => {
                          let l = !1;
                          (s = r.subscribe(
                              v(o, void 0, () => {
                                  ++i < e ? (s ? a() : (l = !0)) : o.complete();
                              }),
                          )),
                              l && a();
                      };
                  u();
              })
    );
}
function og(t) {
    return D((e, n) => {
        let r,
            o = !1,
            i,
            s = !1,
            a = !1,
            u = () => a && s && (n.complete(), !0),
            l = () => (
                i ||
                    ((i = new le()),
                    A(t(i)).subscribe(
                        v(
                            n,
                            () => {
                                r ? c() : (o = !0);
                            },
                            () => {
                                (s = !0), u();
                            },
                        ),
                    )),
                i
            ),
            c = () => {
                (a = !1),
                    (r = e.subscribe(
                        v(n, void 0, () => {
                            (a = !0), !u() && l().next();
                        }),
                    )),
                    o && (r.unsubscribe(), (r = null), (o = !1), c());
            };
        c();
    });
}
function ig(t, e) {
    return D(fc(t, e, arguments.length >= 2, !0));
}
function Yi(t = {}) {
    let {
        connector: e = () => new le(),
        resetOnError: n = !0,
        resetOnComplete: r = !0,
        resetOnRefCountZero: o = !0,
    } = t;
    return (i) => {
        let s,
            a,
            u,
            l = 0,
            c = !1,
            d = !1,
            h = () => {
                a?.unsubscribe(), (a = void 0);
            },
            f = () => {
                h(), (s = u = void 0), (c = d = !1);
            },
            p = () => {
                let m = s;
                f(), m?.unsubscribe();
            };
        return D((m, b) => {
            l++, !d && !c && h();
            let w = (u = u ?? e());
            b.add(() => {
                l--, l === 0 && !d && !c && (a = Ki(p, o));
            }),
                w.subscribe(b),
                !s &&
                    l > 0 &&
                    ((s = new qe({
                        next: (N) => w.next(N),
                        error: (N) => {
                            (d = !0), h(), (a = Ki(f, n, N)), w.error(N);
                        },
                        complete: () => {
                            (c = !0), h(), (a = Ki(f, r)), w.complete();
                        },
                    })),
                    A(m).subscribe(s));
        })(i);
    };
}
function Ki(t, e, ...n) {
    if (e === !0) {
        t();
        return;
    }
    if (e === !1) return;
    let r = new qe({
        next: () => {
            r.unsubscribe(), t();
        },
    });
    return A(e(...n)).subscribe(r);
}
function sg(t, e, n) {
    let r,
        o = !1;
    return (
        t && typeof t == 'object'
            ? ({
                  bufferSize: r = 1 / 0,
                  windowTime: e = 1 / 0,
                  refCount: o = !1,
                  scheduler: n,
              } = t)
            : (r = t ?? 1 / 0),
        Yi({
            connector: () => new kn(r, e, n),
            resetOnError: !0,
            resetOnComplete: !1,
            resetOnRefCountZero: o,
        })
    );
}
function ag(t) {
    return At((e, n) => t <= n);
}
function ug(...t) {
    let e = ke(t);
    return D((n, r) => {
        (e ? Wr(t, n, e) : Wr(t, n)).subscribe(r);
    });
}
function pc(t, e) {
    return D((n, r) => {
        let o = null,
            i = 0,
            s = !1,
            a = () => s && !o && r.complete();
        n.subscribe(
            v(
                r,
                (u) => {
                    o?.unsubscribe();
                    let l = 0,
                        c = i++;
                    A(t(u, c)).subscribe(
                        (o = v(
                            r,
                            (d) => r.next(e ? e(u, d, c, l++) : d),
                            () => {
                                (o = null), a();
                            },
                        )),
                    );
                },
                () => {
                    (s = !0), a();
                },
            ),
        );
    });
}
function mc(t) {
    return D((e, n) => {
        A(t).subscribe(v(n, () => n.complete(), Ct)),
            !n.closed && e.subscribe(n);
    });
}
function lg(t, e = !1) {
    return D((n, r) => {
        let o = 0;
        n.subscribe(
            v(r, (i) => {
                let s = t(i, o++);
                (s || e) && r.next(i), !s && r.complete();
            }),
        );
    });
}
function cg(t, e, n) {
    let r = I(t) || e || n ? { next: t, error: e, complete: n } : t;
    return r
        ? D((o, i) => {
              var s;
              (s = r.subscribe) === null || s === void 0 || s.call(r);
              let a = !0;
              o.subscribe(
                  v(
                      i,
                      (u) => {
                          var l;
                          (l = r.next) === null || l === void 0 || l.call(r, u),
                              i.next(u);
                      },
                      () => {
                          var u;
                          (a = !1),
                              (u = r.complete) === null ||
                                  u === void 0 ||
                                  u.call(r),
                              i.complete();
                      },
                      (u) => {
                          var l;
                          (a = !1),
                              (l = r.error) === null ||
                                  l === void 0 ||
                                  l.call(r, u),
                              i.error(u);
                      },
                      () => {
                          var u, l;
                          a &&
                              ((u = r.unsubscribe) === null ||
                                  u === void 0 ||
                                  u.call(r)),
                              (l = r.finalize) === null ||
                                  l === void 0 ||
                                  l.call(r);
                      },
                  ),
              );
          })
        : X;
}
function gc(t, e) {
    return D((n, r) => {
        let { leading: o = !0, trailing: i = !1 } = e ?? {},
            s = !1,
            a = null,
            u = null,
            l = !1,
            c = () => {
                u?.unsubscribe(), (u = null), i && (f(), l && r.complete());
            },
            d = () => {
                (u = null), l && r.complete();
            },
            h = (p) => (u = A(t(p)).subscribe(v(r, c, d))),
            f = () => {
                if (s) {
                    s = !1;
                    let p = a;
                    (a = null), r.next(p), !l && h(p);
                }
            };
        n.subscribe(
            v(
                r,
                (p) => {
                    (s = !0), (a = p), !(u && !u.closed) && (o ? f() : h(p));
                },
                () => {
                    (l = !0), !(i && s && u && !u.closed) && r.complete();
                },
            ),
        );
    });
}
function dg(t, e = Ge, n) {
    let r = Nt(t, e);
    return gc(() => r, n);
}
function fg(...t) {
    let e = on(t);
    return D((n, r) => {
        let o = t.length,
            i = new Array(o),
            s = t.map(() => !1),
            a = !1;
        for (let u = 0; u < o; u++)
            A(t[u]).subscribe(
                v(
                    r,
                    (l) => {
                        (i[u] = l),
                            !a &&
                                !s[u] &&
                                ((s[u] = !0), (a = s.every(X)) && (s = null));
                    },
                    Ct,
                ),
            );
        n.subscribe(
            v(r, (u) => {
                if (a) {
                    let l = [u, ...i];
                    r.next(e ? e(...l) : l);
                }
            }),
        );
    });
}
var sd = 'https://g.co/ng/security#xss',
    g = class extends Error {
        constructor(e, n) {
            super(ad(e, n)), (this.code = e);
        }
    };
function ad(t, e) {
    return `${`NG0${Math.abs(t)}`}${e ? ': ' + e : ''}`;
}
function nr(t) {
    return { toString: t }.toString();
}
var Yr = '__parameters__';
function hg(t) {
    return function (...n) {
        if (t) {
            let r = t(...n);
            for (let o in r) this[o] = r[o];
        }
    };
}
function _a(t, e, n) {
    return nr(() => {
        let r = hg(e);
        function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            let s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
                let d = u.hasOwnProperty(Yr)
                    ? u[Yr]
                    : Object.defineProperty(u, Yr, { value: [] })[Yr];
                for (; d.length <= c; ) d.push(null);
                return (d[c] = d[c] || []).push(s), u;
            }
        }
        return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = t),
            (o.annotationCls = o),
            o
        );
    });
}
var be = globalThis;
function V(t) {
    for (let e in t) if (t[e] === V) return e;
    throw Error('Could not find renamed property on target object.');
}
function pg(t, e) {
    for (let n in e)
        e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
}
function ae(t) {
    if (typeof t == 'string') return t;
    if (Array.isArray(t)) return '[' + t.map(ae).join(', ') + ']';
    if (t == null) return '' + t;
    if (t.overriddenName) return `${t.overriddenName}`;
    if (t.name) return `${t.name}`;
    let e = t.toString();
    if (e == null) return '' + e;
    let n = e.indexOf(`
`);
    return n === -1 ? e : e.substring(0, n);
}
function ms(t, e) {
    return t == null || t === ''
        ? e === null
            ? ''
            : e
        : e == null || e === ''
          ? t
          : t + ' ' + e;
}
var mg = V({ __forward_ref__: V });
function ud(t) {
    return (
        (t.__forward_ref__ = ud),
        (t.toString = function () {
            return ae(this());
        }),
        t
    );
}
function ie(t) {
    return ld(t) ? t() : t;
}
function ld(t) {
    return (
        typeof t == 'function' &&
        t.hasOwnProperty(mg) &&
        t.__forward_ref__ === ud
    );
}
function $(t) {
    return {
        token: t.token,
        providedIn: t.providedIn || null,
        factory: t.factory,
        value: void 0,
    };
}
function cd(t) {
    return { providers: t.providers || [], imports: t.imports || [] };
}
function Po(t) {
    return yc(t, dd) || yc(t, fd);
}
function TO(t) {
    return Po(t) !== null;
}
function yc(t, e) {
    return t.hasOwnProperty(e) ? t[e] : null;
}
function gg(t) {
    let e = t && (t[dd] || t[fd]);
    return e || null;
}
function vc(t) {
    return t && (t.hasOwnProperty(Dc) || t.hasOwnProperty(yg)) ? t[Dc] : null;
}
var dd = V({ ɵprov: V }),
    Dc = V({ ɵinj: V }),
    fd = V({ ngInjectableDef: V }),
    yg = V({ ngInjectorDef: V }),
    B = class {
        constructor(e, n) {
            (this._desc = e),
                (this.ngMetadataName = 'InjectionToken'),
                (this.ɵprov = void 0),
                typeof n == 'number'
                    ? (this.__NG_ELEMENT_ID__ = n)
                    : n !== void 0 &&
                      (this.ɵprov = $({
                          token: this,
                          providedIn: n.providedIn || 'root',
                          factory: n.factory,
                      }));
        }
        get multi() {
            return this;
        }
        toString() {
            return `InjectionToken ${this._desc}`;
        }
    };
function hd(t) {
    return t && !!t.ɵproviders;
}
var vg = V({ ɵcmp: V }),
    Dg = V({ ɵdir: V }),
    Eg = V({ ɵpipe: V }),
    wg = V({ ɵmod: V }),
    co = V({ ɵfac: V }),
    Hn = V({ __NG_ELEMENT_ID__: V }),
    Ec = V({ __NG_ENV_ID__: V });
function Rt(t) {
    return typeof t == 'string' ? t : t == null ? '' : String(t);
}
function bg(t) {
    return typeof t == 'function'
        ? t.name || t.toString()
        : typeof t == 'object' && t != null && typeof t.type == 'function'
          ? t.type.name || t.type.toString()
          : Rt(t);
}
function Ig(t, e) {
    let n = e ? `. Dependency path: ${e.join(' > ')} > ${t}` : '';
    throw new g(-200, t);
}
function Ca(t, e) {
    throw new g(-201, !1);
}
var P = (function (t) {
        return (
            (t[(t.Default = 0)] = 'Default'),
            (t[(t.Host = 1)] = 'Host'),
            (t[(t.Self = 2)] = 'Self'),
            (t[(t.SkipSelf = 4)] = 'SkipSelf'),
            (t[(t.Optional = 8)] = 'Optional'),
            t
        );
    })(P || {}),
    gs;
function pd() {
    return gs;
}
function ce(t) {
    let e = gs;
    return (gs = t), e;
}
function md(t, e, n) {
    let r = Po(t);
    if (r && r.providedIn == 'root')
        return r.value === void 0 ? (r.value = r.factory()) : r.value;
    if (n & P.Optional) return null;
    if (e !== void 0) return e;
    Ca(t, 'Injector');
}
var _g = {},
    Un = _g,
    ys = '__NG_DI_FLAG__',
    fo = 'ngTempTokenPath',
    Cg = 'ngTokenPath',
    Sg = /\n/gm,
    Tg = '\u0275',
    wc = '__source',
    fn;
function Mg() {
    return fn;
}
function ut(t) {
    let e = fn;
    return (fn = t), e;
}
function xg(t, e = P.Default) {
    if (fn === void 0) throw new g(-203, !1);
    return fn === null
        ? md(t, void 0, e)
        : fn.get(t, e & P.Optional ? null : void 0, e);
}
function oe(t, e = P.Default) {
    return (pd() || xg)(ie(t), e);
}
function O(t, e = P.Default) {
    return oe(t, Ro(e));
}
function Ro(t) {
    return typeof t > 'u' || typeof t == 'number'
        ? t
        : 0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4);
}
function vs(t) {
    let e = [];
    for (let n = 0; n < t.length; n++) {
        let r = ie(t[n]);
        if (Array.isArray(r)) {
            if (r.length === 0) throw new g(900, !1);
            let o,
                i = P.Default;
            for (let s = 0; s < r.length; s++) {
                let a = r[s],
                    u = Ng(a);
                typeof u == 'number'
                    ? u === -1
                        ? (o = a.token)
                        : (i |= u)
                    : (o = a);
            }
            e.push(oe(o, i));
        } else e.push(oe(r));
    }
    return e;
}
function Sa(t, e) {
    return (t[ys] = e), (t.prototype[ys] = e), t;
}
function Ng(t) {
    return t[ys];
}
function Ag(t, e, n, r) {
    let o = t[fo];
    throw (
        (e[wc] && o.unshift(e[wc]),
        (t.message = Og(
            `
` + t.message,
            o,
            n,
            r,
        )),
        (t[Cg] = o),
        (t[fo] = null),
        t)
    );
}
function Og(t, e, n, r = null) {
    t =
        t &&
        t.charAt(0) ===
            `
` &&
        t.charAt(1) == Tg
            ? t.slice(2)
            : t;
    let o = ae(e);
    if (Array.isArray(e)) o = e.map(ae).join(' -> ');
    else if (typeof e == 'object') {
        let i = [];
        for (let s in e)
            if (e.hasOwnProperty(s)) {
                let a = e[s];
                i.push(
                    s +
                        ':' +
                        (typeof a == 'string' ? JSON.stringify(a) : ae(a)),
                );
            }
        o = `{${i.join(', ')}}`;
    }
    return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${t.replace(
        Sg,
        `
  `,
    )}`;
}
var MO = Sa(
        _a('Inject', (t) => ({ token: t })),
        -1,
    ),
    gd = Sa(_a('Optional'), 8);
var yd = Sa(_a('SkipSelf'), 4);
function kt(t, e) {
    let n = t.hasOwnProperty(co);
    return n ? t[co] : null;
}
function Fg(t, e, n) {
    if (t.length !== e.length) return !1;
    for (let r = 0; r < t.length; r++) {
        let o = t[r],
            i = e[r];
        if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
    }
    return !0;
}
function Pg(t) {
    return t.flat(Number.POSITIVE_INFINITY);
}
function Ta(t, e) {
    t.forEach((n) => (Array.isArray(n) ? Ta(n, e) : e(n)));
}
function vd(t, e, n) {
    e >= t.length ? t.push(n) : t.splice(e, 0, n);
}
function ho(t, e) {
    return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function Rg(t, e) {
    let n = [];
    for (let r = 0; r < t; r++) n.push(e);
    return n;
}
function kg(t, e, n, r) {
    let o = t.length;
    if (o == e) t.push(n, r);
    else if (o === 1) t.push(r, t[0]), (t[0] = n);
    else {
        for (o--, t.push(t[o - 1], t[o]); o > e; ) {
            let i = o - 2;
            (t[o] = t[i]), o--;
        }
        (t[e] = n), (t[e + 1] = r);
    }
}
function Ma(t, e, n) {
    let r = rr(t, e);
    return r >= 0 ? (t[r | 1] = n) : ((r = ~r), kg(t, r, e, n)), r;
}
function Zi(t, e) {
    let n = rr(t, e);
    if (n >= 0) return t[n | 1];
}
function rr(t, e) {
    return Lg(t, e, 1);
}
function Lg(t, e, n) {
    let r = 0,
        o = t.length >> n;
    for (; o !== r; ) {
        let i = r + ((o - r) >> 1),
            s = t[i << n];
        if (e === s) return i << n;
        s > e ? (o = i) : (r = i + 1);
    }
    return ~(o << n);
}
var pn = {},
    se = [],
    zn = new B(''),
    Dd = new B('', -1),
    Ed = new B(''),
    po = class {
        get(e, n = Un) {
            if (n === Un) {
                let r = new Error(
                    `NullInjectorError: No provider for ${ae(e)}!`,
                );
                throw ((r.name = 'NullInjectorError'), r);
            }
            return n;
        }
    },
    wd = (function (t) {
        return (
            (t[(t.OnPush = 0)] = 'OnPush'), (t[(t.Default = 1)] = 'Default'), t
        );
    })(wd || {}),
    qn = (function (t) {
        return (
            (t[(t.Emulated = 0)] = 'Emulated'),
            (t[(t.None = 2)] = 'None'),
            (t[(t.ShadowDom = 3)] = 'ShadowDom'),
            t
        );
    })(qn || {}),
    ct = (function (t) {
        return (
            (t[(t.None = 0)] = 'None'),
            (t[(t.SignalBased = 1)] = 'SignalBased'),
            (t[(t.HasDecoratorInputTransform = 2)] =
                'HasDecoratorInputTransform'),
            t
        );
    })(ct || {});
function jg(t, e, n) {
    let r = t.length;
    for (;;) {
        let o = t.indexOf(e, n);
        if (o === -1) return o;
        if (o === 0 || t.charCodeAt(o - 1) <= 32) {
            let i = e.length;
            if (o + i === r || t.charCodeAt(o + i) <= 32) return o;
        }
        n = o + 1;
    }
}
function Ds(t, e, n) {
    let r = 0;
    for (; r < n.length; ) {
        let o = n[r];
        if (typeof o == 'number') {
            if (o !== 0) break;
            r++;
            let i = n[r++],
                s = n[r++],
                a = n[r++];
            t.setAttribute(e, s, a, i);
        } else {
            let i = o,
                s = n[++r];
            Vg(i) ? t.setProperty(e, i, s) : t.setAttribute(e, i, s), r++;
        }
    }
    return r;
}
function bd(t) {
    return t === 3 || t === 4 || t === 6;
}
function Vg(t) {
    return t.charCodeAt(0) === 64;
}
function Gn(t, e) {
    if (!(e === null || e.length === 0))
        if (t === null || t.length === 0) t = e.slice();
        else {
            let n = -1;
            for (let r = 0; r < e.length; r++) {
                let o = e[r];
                typeof o == 'number'
                    ? (n = o)
                    : n === 0 ||
                      (n === -1 || n === 2
                          ? bc(t, n, o, null, e[++r])
                          : bc(t, n, o, null, null));
            }
        }
    return t;
}
function bc(t, e, n, r, o) {
    let i = 0,
        s = t.length;
    if (e === -1) s = -1;
    else
        for (; i < t.length; ) {
            let a = t[i++];
            if (typeof a == 'number') {
                if (a === e) {
                    s = -1;
                    break;
                } else if (a > e) {
                    s = i - 1;
                    break;
                }
            }
        }
    for (; i < t.length; ) {
        let a = t[i];
        if (typeof a == 'number') break;
        if (a === n) {
            if (r === null) {
                o !== null && (t[i + 1] = o);
                return;
            } else if (r === t[i + 1]) {
                t[i + 2] = o;
                return;
            }
        }
        i++, r !== null && i++, o !== null && i++;
    }
    s !== -1 && (t.splice(s, 0, e), (i = s + 1)),
        t.splice(i++, 0, n),
        r !== null && t.splice(i++, 0, r),
        o !== null && t.splice(i++, 0, o);
}
var Id = 'ng-template';
function Bg(t, e, n, r) {
    let o = 0;
    if (r) {
        for (; o < e.length && typeof e[o] == 'string'; o += 2)
            if (e[o] === 'class' && jg(e[o + 1].toLowerCase(), n, 0) !== -1)
                return !0;
    } else if (xa(t)) return !1;
    if (((o = e.indexOf(1, o)), o > -1)) {
        let i;
        for (; ++o < e.length && typeof (i = e[o]) == 'string'; )
            if (i.toLowerCase() === n) return !0;
    }
    return !1;
}
function xa(t) {
    return t.type === 4 && t.value !== Id;
}
function $g(t, e, n) {
    let r = t.type === 4 && !n ? Id : t.value;
    return e === r;
}
function Hg(t, e, n) {
    let r = 4,
        o = t.attrs,
        i = o !== null ? qg(o) : 0,
        s = !1;
    for (let a = 0; a < e.length; a++) {
        let u = e[a];
        if (typeof u == 'number') {
            if (!s && !Me(r) && !Me(u)) return !1;
            if (s && Me(u)) continue;
            (s = !1), (r = u | (r & 1));
            continue;
        }
        if (!s)
            if (r & 4) {
                if (
                    ((r = 2 | (r & 1)),
                    (u !== '' && !$g(t, u, n)) || (u === '' && e.length === 1))
                ) {
                    if (Me(r)) return !1;
                    s = !0;
                }
            } else if (r & 8) {
                if (o === null || !Bg(t, o, u, n)) {
                    if (Me(r)) return !1;
                    s = !0;
                }
            } else {
                let l = e[++a],
                    c = Ug(u, o, xa(t), n);
                if (c === -1) {
                    if (Me(r)) return !1;
                    s = !0;
                    continue;
                }
                if (l !== '') {
                    let d;
                    if (
                        (c > i ? (d = '') : (d = o[c + 1].toLowerCase()),
                        r & 2 && l !== d)
                    ) {
                        if (Me(r)) return !1;
                        s = !0;
                    }
                }
            }
    }
    return Me(r) || s;
}
function Me(t) {
    return (t & 1) === 0;
}
function Ug(t, e, n, r) {
    if (e === null) return -1;
    let o = 0;
    if (r || !n) {
        let i = !1;
        for (; o < e.length; ) {
            let s = e[o];
            if (s === t) return o;
            if (s === 3 || s === 6) i = !0;
            else if (s === 1 || s === 2) {
                let a = e[++o];
                for (; typeof a == 'string'; ) a = e[++o];
                continue;
            } else {
                if (s === 4) break;
                if (s === 0) {
                    o += 4;
                    continue;
                }
            }
            o += i ? 1 : 2;
        }
        return -1;
    } else return Gg(e, t);
}
function _d(t, e, n = !1) {
    for (let r = 0; r < e.length; r++) if (Hg(t, e[r], n)) return !0;
    return !1;
}
function zg(t) {
    let e = t.attrs;
    if (e != null) {
        let n = e.indexOf(5);
        if (!(n & 1)) return e[n + 1];
    }
    return null;
}
function qg(t) {
    for (let e = 0; e < t.length; e++) {
        let n = t[e];
        if (bd(n)) return e;
    }
    return t.length;
}
function Gg(t, e) {
    let n = t.indexOf(4);
    if (n > -1)
        for (n++; n < t.length; ) {
            let r = t[n];
            if (typeof r == 'number') return -1;
            if (r === e) return n;
            n++;
        }
    return -1;
}
function Wg(t, e) {
    e: for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (t.length === r.length) {
            for (let o = 0; o < t.length; o++) if (t[o] !== r[o]) continue e;
            return !0;
        }
    }
    return !1;
}
function Ic(t, e) {
    return t ? ':not(' + e.trim() + ')' : e;
}
function Qg(t) {
    let e = t[0],
        n = 1,
        r = 2,
        o = '',
        i = !1;
    for (; n < t.length; ) {
        let s = t[n];
        if (typeof s == 'string')
            if (r & 2) {
                let a = t[++n];
                o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
            } else r & 8 ? (o += '.' + s) : r & 4 && (o += ' ' + s);
        else
            o !== '' && !Me(s) && ((e += Ic(i, o)), (o = '')),
                (r = s),
                (i = i || !Me(r));
        n++;
    }
    return o !== '' && (e += Ic(i, o)), e;
}
function Kg(t) {
    return t.map(Qg).join(',');
}
function Yg(t) {
    let e = [],
        n = [],
        r = 1,
        o = 2;
    for (; r < t.length; ) {
        let i = t[r];
        if (typeof i == 'string')
            o === 2 ? i !== '' && e.push(i, t[++r]) : o === 8 && n.push(i);
        else {
            if (!Me(o)) break;
            o = i;
        }
        r++;
    }
    return { attrs: e, classes: n };
}
function xO(t) {
    return nr(() => {
        let e = xd(t),
            n = It(Se({}, e), {
                decls: t.decls,
                vars: t.vars,
                template: t.template,
                consts: t.consts || null,
                ngContentSelectors: t.ngContentSelectors,
                onPush: t.changeDetection === wd.OnPush,
                directiveDefs: null,
                pipeDefs: null,
                dependencies: (e.standalone && t.dependencies) || null,
                getStandaloneInjector: null,
                signals: t.signals ?? !1,
                data: t.data || {},
                encapsulation: t.encapsulation || qn.Emulated,
                styles: t.styles || se,
                _: null,
                schemas: t.schemas || null,
                tView: null,
                id: '',
            });
        Nd(n);
        let r = t.dependencies;
        return (
            (n.directiveDefs = Cc(r, !1)),
            (n.pipeDefs = Cc(r, !0)),
            (n.id = ey(n)),
            n
        );
    });
}
function Zg(t) {
    return dt(t) || Sd(t);
}
function Jg(t) {
    return t !== null;
}
function Cd(t) {
    return nr(() => ({
        type: t.type,
        bootstrap: t.bootstrap || se,
        declarations: t.declarations || se,
        imports: t.imports || se,
        exports: t.exports || se,
        transitiveCompileScopes: null,
        schemas: t.schemas || null,
        id: t.id || null,
    }));
}
function _c(t, e) {
    if (t == null) return pn;
    let n = {};
    for (let r in t)
        if (t.hasOwnProperty(r)) {
            let o = t[r],
                i,
                s,
                a = ct.None;
            Array.isArray(o)
                ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
                : ((i = o), (s = o)),
                e
                    ? ((n[i] = a !== ct.None ? [r, a] : r), (e[i] = s))
                    : (n[i] = r);
        }
    return n;
}
function wn(t) {
    return nr(() => {
        let e = xd(t);
        return Nd(e), e;
    });
}
function ko(t) {
    return {
        type: t.type,
        name: t.name,
        factory: null,
        pure: t.pure !== !1,
        standalone: t.standalone === !0,
        onDestroy: t.type.prototype.ngOnDestroy || null,
    };
}
function dt(t) {
    return t[vg] || null;
}
function Sd(t) {
    return t[Dg] || null;
}
function Td(t) {
    return t[Eg] || null;
}
function Xg(t) {
    let e = dt(t) || Sd(t) || Td(t);
    return e !== null ? e.standalone : !1;
}
function Md(t, e) {
    let n = t[wg] || null;
    if (!n && e === !0)
        throw new Error(`Type ${ae(t)} does not have '\u0275mod' property.`);
    return n;
}
function xd(t) {
    let e = {};
    return {
        type: t.type,
        providersResolver: null,
        factory: null,
        hostBindings: t.hostBindings || null,
        hostVars: t.hostVars || 0,
        hostAttrs: t.hostAttrs || null,
        contentQueries: t.contentQueries || null,
        declaredInputs: e,
        inputTransforms: null,
        inputConfig: t.inputs || pn,
        exportAs: t.exportAs || null,
        standalone: t.standalone === !0,
        signals: t.signals === !0,
        selectors: t.selectors || se,
        viewQuery: t.viewQuery || null,
        features: t.features || null,
        setInput: null,
        findHostDirectiveDefs: null,
        hostDirectives: null,
        inputs: _c(t.inputs, e),
        outputs: _c(t.outputs),
        debugInfo: null,
    };
}
function Nd(t) {
    t.features?.forEach((e) => e(t));
}
function Cc(t, e) {
    if (!t) return null;
    let n = e ? Td : Zg;
    return () => (typeof t == 'function' ? t() : t).map((r) => n(r)).filter(Jg);
}
function ey(t) {
    let e = 0,
        n = [
            t.selectors,
            t.ngContentSelectors,
            t.hostVars,
            t.hostAttrs,
            t.consts,
            t.vars,
            t.decls,
            t.encapsulation,
            t.standalone,
            t.signals,
            t.exportAs,
            JSON.stringify(t.inputs),
            JSON.stringify(t.outputs),
            Object.getOwnPropertyNames(t.type.prototype),
            !!t.contentQueries,
            !!t.viewQuery,
        ].join('|');
    for (let o of n) e = (Math.imul(31, e) + o.charCodeAt(0)) << 0;
    return (e += 2147483648), 'c' + e;
}
function Ad(t) {
    return { ɵproviders: t };
}
function ty(...t) {
    return { ɵproviders: Od(!0, t), ɵfromNgModule: !0 };
}
function Od(t, ...e) {
    let n = [],
        r = new Set(),
        o,
        i = (s) => {
            n.push(s);
        };
    return (
        Ta(e, (s) => {
            let a = s;
            Es(a, i, [], r) && ((o ||= []), o.push(a));
        }),
        o !== void 0 && Fd(o, i),
        n
    );
}
function Fd(t, e) {
    for (let n = 0; n < t.length; n++) {
        let { ngModule: r, providers: o } = t[n];
        Na(o, (i) => {
            e(i, r);
        });
    }
}
function Es(t, e, n, r) {
    if (((t = ie(t)), !t)) return !1;
    let o = null,
        i = vc(t),
        s = !i && dt(t);
    if (!i && !s) {
        let u = t.ngModule;
        if (((i = vc(u)), i)) o = u;
        else return !1;
    } else {
        if (s && !s.standalone) return !1;
        o = t;
    }
    let a = r.has(o);
    if (s) {
        if (a) return !1;
        if ((r.add(o), s.dependencies)) {
            let u =
                typeof s.dependencies == 'function'
                    ? s.dependencies()
                    : s.dependencies;
            for (let l of u) Es(l, e, n, r);
        }
    } else if (i) {
        if (i.imports != null && !a) {
            r.add(o);
            let l;
            try {
                Ta(i.imports, (c) => {
                    Es(c, e, n, r) && ((l ||= []), l.push(c));
                });
            } finally {
            }
            l !== void 0 && Fd(l, e);
        }
        if (!a) {
            let l = kt(o) || (() => new o());
            e({ provide: o, useFactory: l, deps: se }, o),
                e({ provide: Ed, useValue: o, multi: !0 }, o),
                e({ provide: zn, useValue: () => oe(o), multi: !0 }, o);
        }
        let u = i.providers;
        if (u != null && !a) {
            let l = t;
            Na(u, (c) => {
                e(c, l);
            });
        }
    } else return !1;
    return o !== t && t.providers !== void 0;
}
function Na(t, e) {
    for (let n of t)
        hd(n) && (n = n.ɵproviders), Array.isArray(n) ? Na(n, e) : e(n);
}
var ny = V({ provide: String, useValue: V });
function Pd(t) {
    return t !== null && typeof t == 'object' && ny in t;
}
function ry(t) {
    return !!(t && t.useExisting);
}
function oy(t) {
    return !!(t && t.useFactory);
}
function mn(t) {
    return typeof t == 'function';
}
function iy(t) {
    return !!t.useClass;
}
var Rd = new B(''),
    oo = {},
    sy = {},
    Ji;
function Aa() {
    return Ji === void 0 && (Ji = new po()), Ji;
}
var ft = class {},
    Wn = class extends ft {
        get destroyed() {
            return this._destroyed;
        }
        constructor(e, n, r, o) {
            super(),
                (this.parent = n),
                (this.source = r),
                (this.scopes = o),
                (this.records = new Map()),
                (this._ngOnDestroyHooks = new Set()),
                (this._onDestroyHooks = []),
                (this._destroyed = !1),
                bs(e, (s) => this.processProvider(s)),
                this.records.set(Dd, un(void 0, this)),
                o.has('environment') && this.records.set(ft, un(void 0, this));
            let i = this.records.get(Rd);
            i != null && typeof i.value == 'string' && this.scopes.add(i.value),
                (this.injectorDefTypes = new Set(this.get(Ed, se, P.Self)));
        }
        destroy() {
            this.assertNotDestroyed(), (this._destroyed = !0);
            let e = L(null);
            try {
                for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
                let n = this._onDestroyHooks;
                this._onDestroyHooks = [];
                for (let r of n) r();
            } finally {
                this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear(),
                    L(e);
            }
        }
        onDestroy(e) {
            return (
                this.assertNotDestroyed(),
                this._onDestroyHooks.push(e),
                () => this.removeOnDestroy(e)
            );
        }
        runInContext(e) {
            this.assertNotDestroyed();
            let n = ut(this),
                r = ce(void 0),
                o;
            try {
                return e();
            } finally {
                ut(n), ce(r);
            }
        }
        get(e, n = Un, r = P.Default) {
            if ((this.assertNotDestroyed(), e.hasOwnProperty(Ec)))
                return e[Ec](this);
            r = Ro(r);
            let o,
                i = ut(this),
                s = ce(void 0);
            try {
                if (!(r & P.SkipSelf)) {
                    let u = this.records.get(e);
                    if (u === void 0) {
                        let l = dy(e) && Po(e);
                        l && this.injectableDefInScope(l)
                            ? (u = un(ws(e), oo))
                            : (u = null),
                            this.records.set(e, u);
                    }
                    if (u != null) return this.hydrate(e, u);
                }
                let a = r & P.Self ? Aa() : this.parent;
                return (n = r & P.Optional && n === Un ? null : n), a.get(e, n);
            } catch (a) {
                if (a.name === 'NullInjectorError') {
                    if (((a[fo] = a[fo] || []).unshift(ae(e)), i)) throw a;
                    return Ag(a, e, 'R3InjectorError', this.source);
                } else throw a;
            } finally {
                ce(s), ut(i);
            }
        }
        resolveInjectorInitializers() {
            let e = L(null),
                n = ut(this),
                r = ce(void 0),
                o;
            try {
                let i = this.get(zn, se, P.Self);
                for (let s of i) s();
            } finally {
                ut(n), ce(r), L(e);
            }
        }
        toString() {
            let e = [],
                n = this.records;
            for (let r of n.keys()) e.push(ae(r));
            return `R3Injector[${e.join(', ')}]`;
        }
        assertNotDestroyed() {
            if (this._destroyed) throw new g(205, !1);
        }
        processProvider(e) {
            e = ie(e);
            let n = mn(e) ? e : ie(e && e.provide),
                r = uy(e);
            if (!mn(e) && e.multi === !0) {
                let o = this.records.get(n);
                o ||
                    ((o = un(void 0, oo, !0)),
                    (o.factory = () => vs(o.multi)),
                    this.records.set(n, o)),
                    (n = e),
                    o.multi.push(e);
            }
            this.records.set(n, r);
        }
        hydrate(e, n) {
            let r = L(null);
            try {
                return (
                    n.value === oo && ((n.value = sy), (n.value = n.factory())),
                    typeof n.value == 'object' &&
                        n.value &&
                        cy(n.value) &&
                        this._ngOnDestroyHooks.add(n.value),
                    n.value
                );
            } finally {
                L(r);
            }
        }
        injectableDefInScope(e) {
            if (!e.providedIn) return !1;
            let n = ie(e.providedIn);
            return typeof n == 'string'
                ? n === 'any' || this.scopes.has(n)
                : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(e) {
            let n = this._onDestroyHooks.indexOf(e);
            n !== -1 && this._onDestroyHooks.splice(n, 1);
        }
    };
function ws(t) {
    let e = Po(t),
        n = e !== null ? e.factory : kt(t);
    if (n !== null) return n;
    if (t instanceof B) throw new g(204, !1);
    if (t instanceof Function) return ay(t);
    throw new g(204, !1);
}
function ay(t) {
    if (t.length > 0) throw new g(204, !1);
    let n = gg(t);
    return n !== null ? () => n.factory(t) : () => new t();
}
function uy(t) {
    if (Pd(t)) return un(void 0, t.useValue);
    {
        let e = kd(t);
        return un(e, oo);
    }
}
function kd(t, e, n) {
    let r;
    if (mn(t)) {
        let o = ie(t);
        return kt(o) || ws(o);
    } else if (Pd(t)) r = () => ie(t.useValue);
    else if (oy(t)) r = () => t.useFactory(...vs(t.deps || []));
    else if (ry(t)) r = () => oe(ie(t.useExisting));
    else {
        let o = ie(t && (t.useClass || t.provide));
        if (ly(t)) r = () => new o(...vs(t.deps));
        else return kt(o) || ws(o);
    }
    return r;
}
function un(t, e, n = !1) {
    return { factory: t, value: e, multi: n ? [] : void 0 };
}
function ly(t) {
    return !!t.deps;
}
function cy(t) {
    return (
        t !== null && typeof t == 'object' && typeof t.ngOnDestroy == 'function'
    );
}
function dy(t) {
    return typeof t == 'function' || (typeof t == 'object' && t instanceof B);
}
function bs(t, e) {
    for (let n of t)
        Array.isArray(n) ? bs(n, e) : n && hd(n) ? bs(n.ɵproviders, e) : e(n);
}
function fy(t, e) {
    t instanceof Wn && t.assertNotDestroyed();
    let n,
        r = ut(t),
        o = ce(void 0);
    try {
        return e();
    } finally {
        ut(r), ce(o);
    }
}
function Ld() {
    return pd() !== void 0 || Mg() != null;
}
function hy(t) {
    if (!Ld()) throw new g(-203, !1);
}
function py(t) {
    return typeof t == 'function';
}
var pe = 0,
    S = 1,
    C = 2,
    ee = 3,
    Ne = 4,
    ge = 5,
    Ie = 6,
    Qn = 7,
    Ae = 8,
    gn = 9,
    Oe = 10,
    H = 11,
    Kn = 12,
    Sc = 13,
    bn = 14,
    me = 15,
    or = 16,
    ln = 17,
    Ye = 18,
    Lo = 19,
    jd = 20,
    lt = 21,
    Xi = 22,
    Lt = 23,
    W = 25,
    Vd = 1,
    Yn = 6,
    Ze = 7,
    mo = 8,
    yn = 9,
    de = 10,
    Oa = (function (t) {
        return (
            (t[(t.None = 0)] = 'None'),
            (t[(t.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
            t
        );
    })(Oa || {});
function Ke(t) {
    return Array.isArray(t) && typeof t[Vd] == 'object';
}
function Be(t) {
    return Array.isArray(t) && t[Vd] === !0;
}
function Fa(t) {
    return (t.flags & 4) !== 0;
}
function ir(t) {
    return t.componentOffset > -1;
}
function jo(t) {
    return (t.flags & 1) === 1;
}
function ht(t) {
    return !!t.template;
}
function Bd(t) {
    return (t[C] & 512) !== 0;
}
var Is = class {
    constructor(e, n, r) {
        (this.previousValue = e),
            (this.currentValue = n),
            (this.firstChange = r);
    }
    isFirstChange() {
        return this.firstChange;
    }
};
function $d(t, e, n, r) {
    e !== null ? e.applyValueToInputSignal(e, r) : (t[n] = r);
}
function Pa() {
    return Hd;
}
function Hd(t) {
    return t.type.prototype.ngOnChanges && (t.setInput = gy), my;
}
Pa.ngInherit = !0;
function my() {
    let t = zd(this),
        e = t?.current;
    if (e) {
        let n = t.previous;
        if (n === pn) t.previous = e;
        else for (let r in e) n[r] = e[r];
        (t.current = null), this.ngOnChanges(e);
    }
}
function gy(t, e, n, r, o) {
    let i = this.declaredInputs[r],
        s = zd(t) || yy(t, { previous: pn, current: null }),
        a = s.current || (s.current = {}),
        u = s.previous,
        l = u[i];
    (a[i] = new Is(l && l.currentValue, n, u === pn)), $d(t, e, o, n);
}
var Ud = '__ngSimpleChanges__';
function zd(t) {
    return t[Ud] || null;
}
function yy(t, e) {
    return (t[Ud] = e);
}
var Tc = null;
var je = function (t, e, n) {
        Tc?.(t, e, n);
    },
    qd = 'svg',
    vy = 'math',
    Dy = !1;
function Ey() {
    return Dy;
}
function Fe(t) {
    for (; Array.isArray(t); ) t = t[pe];
    return t;
}
function Gd(t, e) {
    return Fe(e[t]);
}
function ye(t, e) {
    return Fe(e[t.index]);
}
function Wd(t, e) {
    return t.data[e];
}
function Ra(t, e) {
    return t[e];
}
function gt(t, e) {
    let n = e[t];
    return Ke(n) ? n : n[pe];
}
function wy(t) {
    return (t[C] & 4) === 4;
}
function ka(t) {
    return (t[C] & 128) === 128;
}
function by(t) {
    return Be(t[ee]);
}
function vn(t, e) {
    return e == null ? null : t[e];
}
function Qd(t) {
    t[ln] = 0;
}
function Iy(t) {
    t[C] & 1024 || ((t[C] |= 1024), ka(t) && Zn(t));
}
function _y(t, e) {
    for (; t > 0; ) (e = e[bn]), t--;
    return e;
}
function La(t) {
    return !!(t[C] & 9216 || t[Lt]?.dirty);
}
function _s(t) {
    t[Oe].changeDetectionScheduler?.notify(1),
        La(t)
            ? Zn(t)
            : t[C] & 64 &&
              (Ey()
                  ? ((t[C] |= 1024), Zn(t))
                  : t[Oe].changeDetectionScheduler?.notify());
}
function Zn(t) {
    t[Oe].changeDetectionScheduler?.notify();
    let e = Jn(t);
    for (; e !== null && !(e[C] & 8192 || ((e[C] |= 8192), !ka(e))); )
        e = Jn(e);
}
function Kd(t, e) {
    if ((t[C] & 256) === 256) throw new g(911, !1);
    t[lt] === null && (t[lt] = []), t[lt].push(e);
}
function Cy(t, e) {
    if (t[lt] === null) return;
    let n = t[lt].indexOf(e);
    n !== -1 && t[lt].splice(n, 1);
}
function Jn(t) {
    let e = t[ee];
    return Be(e) ? e[ee] : e;
}
var T = { lFrame: tf(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function Sy() {
    return T.lFrame.elementDepthCount;
}
function Ty() {
    T.lFrame.elementDepthCount++;
}
function My() {
    T.lFrame.elementDepthCount--;
}
function Yd() {
    return T.bindingsEnabled;
}
function In() {
    return T.skipHydrationRootTNode !== null;
}
function xy(t) {
    return T.skipHydrationRootTNode === t;
}
function Ny(t) {
    T.skipHydrationRootTNode = t;
}
function Ay() {
    T.skipHydrationRootTNode = null;
}
function x() {
    return T.lFrame.lView;
}
function Q() {
    return T.lFrame.tView;
}
function NO(t) {
    return (T.lFrame.contextLView = t), t[Ae];
}
function AO(t) {
    return (T.lFrame.contextLView = null), t;
}
function ue() {
    let t = Zd();
    for (; t !== null && t.type === 64; ) t = t.parent;
    return t;
}
function Zd() {
    return T.lFrame.currentTNode;
}
function Oy() {
    let t = T.lFrame,
        e = t.currentTNode;
    return t.isParent ? e : e.parent;
}
function qt(t, e) {
    let n = T.lFrame;
    (n.currentTNode = t), (n.isParent = e);
}
function ja() {
    return T.lFrame.isParent;
}
function Va() {
    T.lFrame.isParent = !1;
}
function Fy() {
    return T.lFrame.contextLView;
}
function _n() {
    let t = T.lFrame,
        e = t.bindingRootIndex;
    return e === -1 && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e;
}
function Py() {
    return T.lFrame.bindingIndex;
}
function Ry(t) {
    return (T.lFrame.bindingIndex = t);
}
function Ba() {
    return T.lFrame.bindingIndex++;
}
function $a(t) {
    let e = T.lFrame,
        n = e.bindingIndex;
    return (e.bindingIndex = e.bindingIndex + t), n;
}
function ky() {
    return T.lFrame.inI18n;
}
function Ly(t, e) {
    let n = T.lFrame;
    (n.bindingIndex = n.bindingRootIndex = t), Cs(e);
}
function jy() {
    return T.lFrame.currentDirectiveIndex;
}
function Cs(t) {
    T.lFrame.currentDirectiveIndex = t;
}
function Vy(t) {
    let e = T.lFrame.currentDirectiveIndex;
    return e === -1 ? null : t[e];
}
function Jd() {
    return T.lFrame.currentQueryIndex;
}
function Ha(t) {
    T.lFrame.currentQueryIndex = t;
}
function By(t) {
    let e = t[S];
    return e.type === 2 ? e.declTNode : e.type === 1 ? t[ge] : null;
}
function Xd(t, e, n) {
    if (n & P.SkipSelf) {
        let o = e,
            i = t;
        for (; (o = o.parent), o === null && !(n & P.Host); )
            if (((o = By(i)), o === null || ((i = i[bn]), o.type & 10))) break;
        if (o === null) return !1;
        (e = o), (t = i);
    }
    let r = (T.lFrame = ef());
    return (r.currentTNode = e), (r.lView = t), !0;
}
function Ua(t) {
    let e = ef(),
        n = t[S];
    (T.lFrame = e),
        (e.currentTNode = n.firstChild),
        (e.lView = t),
        (e.tView = n),
        (e.contextLView = t),
        (e.bindingIndex = n.bindingStartIndex),
        (e.inI18n = !1);
}
function ef() {
    let t = T.lFrame,
        e = t === null ? null : t.child;
    return e === null ? tf(t) : e;
}
function tf(t) {
    let e = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: t,
        child: null,
        inI18n: !1,
    };
    return t !== null && (t.child = e), e;
}
function nf() {
    let t = T.lFrame;
    return (T.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var rf = nf;
function za() {
    let t = nf();
    (t.isParent = !0),
        (t.tView = null),
        (t.selectedIndex = -1),
        (t.contextLView = null),
        (t.elementDepthCount = 0),
        (t.currentDirectiveIndex = -1),
        (t.currentNamespace = null),
        (t.bindingRootIndex = -1),
        (t.bindingIndex = -1),
        (t.currentQueryIndex = 0);
}
function $y(t) {
    return (T.lFrame.contextLView = _y(t, T.lFrame.contextLView))[Ae];
}
function yt() {
    return T.lFrame.selectedIndex;
}
function jt(t) {
    T.lFrame.selectedIndex = t;
}
function of() {
    let t = T.lFrame;
    return Wd(t.tView, t.selectedIndex);
}
function OO() {
    T.lFrame.currentNamespace = qd;
}
function sf() {
    return T.lFrame.currentNamespace;
}
var af = !0;
function Vo() {
    return af;
}
function $e(t) {
    af = t;
}
function Hy(t, e, n) {
    let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = e.type.prototype;
    if (r) {
        let s = Hd(e);
        (n.preOrderHooks ??= []).push(t, s),
            (n.preOrderCheckHooks ??= []).push(t, s);
    }
    o && (n.preOrderHooks ??= []).push(0 - t, o),
        i &&
            ((n.preOrderHooks ??= []).push(t, i),
            (n.preOrderCheckHooks ??= []).push(t, i));
}
function Bo(t, e) {
    for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
        let i = t.data[n].type.prototype,
            {
                ngAfterContentInit: s,
                ngAfterContentChecked: a,
                ngAfterViewInit: u,
                ngAfterViewChecked: l,
                ngOnDestroy: c,
            } = i;
        s && (t.contentHooks ??= []).push(-n, s),
            a &&
                ((t.contentHooks ??= []).push(n, a),
                (t.contentCheckHooks ??= []).push(n, a)),
            u && (t.viewHooks ??= []).push(-n, u),
            l &&
                ((t.viewHooks ??= []).push(n, l),
                (t.viewCheckHooks ??= []).push(n, l)),
            c != null && (t.destroyHooks ??= []).push(n, c);
    }
}
function io(t, e, n) {
    uf(t, e, 3, n);
}
function so(t, e, n, r) {
    (t[C] & 3) === n && uf(t, e, n, r);
}
function es(t, e) {
    let n = t[C];
    (n & 3) === e && ((n &= 16383), (n += 1), (t[C] = n));
}
function uf(t, e, n, r) {
    let o = r !== void 0 ? t[ln] & 65535 : 0,
        i = r ?? -1,
        s = e.length - 1,
        a = 0;
    for (let u = o; u < s; u++)
        if (typeof e[u + 1] == 'number') {
            if (((a = e[u]), r != null && a >= r)) break;
        } else
            e[u] < 0 && (t[ln] += 65536),
                (a < i || i == -1) &&
                    (Uy(t, n, e, u), (t[ln] = (t[ln] & 4294901760) + u + 2)),
                u++;
}
function Mc(t, e) {
    je(4, t, e);
    let n = L(null);
    try {
        e.call(t);
    } finally {
        L(n), je(5, t, e);
    }
}
function Uy(t, e, n, r) {
    let o = n[r] < 0,
        i = n[r + 1],
        s = o ? -n[r] : n[r],
        a = t[s];
    o
        ? t[C] >> 14 < t[ln] >> 16 &&
          (t[C] & 3) === e &&
          ((t[C] += 16384), Mc(a, i))
        : Mc(a, i);
}
var hn = -1,
    Vt = class {
        constructor(e, n, r) {
            (this.factory = e),
                (this.resolving = !1),
                (this.canSeeViewProviders = n),
                (this.injectImpl = r);
        }
    };
function zy(t) {
    return t instanceof Vt;
}
function qy(t) {
    return (t.flags & 8) !== 0;
}
function Gy(t) {
    return (t.flags & 16) !== 0;
}
function lf(t) {
    return t !== hn;
}
function go(t) {
    return t & 32767;
}
function Wy(t) {
    return t >> 16;
}
function yo(t, e) {
    let n = Wy(t),
        r = e;
    for (; n > 0; ) (r = r[bn]), n--;
    return r;
}
var Ss = !0;
function vo(t) {
    let e = Ss;
    return (Ss = t), e;
}
var Qy = 256,
    cf = Qy - 1,
    df = 5,
    Ky = 0,
    Ve = {};
function Yy(t, e, n) {
    let r;
    typeof n == 'string'
        ? (r = n.charCodeAt(0) || 0)
        : n.hasOwnProperty(Hn) && (r = n[Hn]),
        r == null && (r = n[Hn] = Ky++);
    let o = r & cf,
        i = 1 << o;
    e.data[t + (o >> df)] |= i;
}
function Do(t, e) {
    let n = ff(t, e);
    if (n !== -1) return n;
    let r = e[S];
    r.firstCreatePass &&
        ((t.injectorIndex = e.length),
        ts(r.data, t),
        ts(e, null),
        ts(r.blueprint, null));
    let o = qa(t, e),
        i = t.injectorIndex;
    if (lf(o)) {
        let s = go(o),
            a = yo(o, e),
            u = a[S].data;
        for (let l = 0; l < 8; l++) e[i + l] = a[s + l] | u[s + l];
    }
    return (e[i + 8] = o), i;
}
function ts(t, e) {
    t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function ff(t, e) {
    return t.injectorIndex === -1 ||
        (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
        e[t.injectorIndex + 8] === null
        ? -1
        : t.injectorIndex;
}
function qa(t, e) {
    if (t.parent && t.parent.injectorIndex !== -1)
        return t.parent.injectorIndex;
    let n = 0,
        r = null,
        o = e;
    for (; o !== null; ) {
        if (((r = yf(o)), r === null)) return hn;
        if ((n++, (o = o[bn]), r.injectorIndex !== -1))
            return r.injectorIndex | (n << 16);
    }
    return hn;
}
function Ts(t, e, n) {
    Yy(t, e, n);
}
function Zy(t, e) {
    if (e === 'class') return t.classes;
    if (e === 'style') return t.styles;
    let n = t.attrs;
    if (n) {
        let r = n.length,
            o = 0;
        for (; o < r; ) {
            let i = n[o];
            if (bd(i)) break;
            if (i === 0) o = o + 2;
            else if (typeof i == 'number')
                for (o++; o < r && typeof n[o] == 'string'; ) o++;
            else {
                if (i === e) return n[o + 1];
                o = o + 2;
            }
        }
    }
    return null;
}
function hf(t, e, n) {
    if (n & P.Optional || t !== void 0) return t;
    Ca(e, 'NodeInjector');
}
function pf(t, e, n, r) {
    if (
        (n & P.Optional && r === void 0 && (r = null), !(n & (P.Self | P.Host)))
    ) {
        let o = t[gn],
            i = ce(void 0);
        try {
            return o ? o.get(e, r, n & P.Optional) : md(e, r, n & P.Optional);
        } finally {
            ce(i);
        }
    }
    return hf(r, e, n);
}
function mf(t, e, n, r = P.Default, o) {
    if (t !== null) {
        if (e[C] & 2048 && !(r & P.Self)) {
            let s = tv(t, e, n, r, Ve);
            if (s !== Ve) return s;
        }
        let i = gf(t, e, n, r, Ve);
        if (i !== Ve) return i;
    }
    return pf(e, n, r, o);
}
function gf(t, e, n, r, o) {
    let i = Xy(n);
    if (typeof i == 'function') {
        if (!Xd(e, t, r)) return r & P.Host ? hf(o, n, r) : pf(e, n, r, o);
        try {
            let s;
            if (((s = i(r)), s == null && !(r & P.Optional))) Ca(n);
            else return s;
        } finally {
            rf();
        }
    } else if (typeof i == 'number') {
        let s = null,
            a = ff(t, e),
            u = hn,
            l = r & P.Host ? e[me][ge] : null;
        for (
            (a === -1 || r & P.SkipSelf) &&
            ((u = a === -1 ? qa(t, e) : e[a + 8]),
            u === hn || !Nc(r, !1)
                ? (a = -1)
                : ((s = e[S]), (a = go(u)), (e = yo(u, e))));
            a !== -1;

        ) {
            let c = e[S];
            if (xc(i, a, c.data)) {
                let d = Jy(a, e, n, s, r, l);
                if (d !== Ve) return d;
            }
            (u = e[a + 8]),
                u !== hn && Nc(r, e[S].data[a + 8] === l) && xc(i, a, e)
                    ? ((s = c), (a = go(u)), (e = yo(u, e)))
                    : (a = -1);
        }
    }
    return o;
}
function Jy(t, e, n, r, o, i) {
    let s = e[S],
        a = s.data[t + 8],
        u = r == null ? ir(a) && Ss : r != s && (a.type & 3) !== 0,
        l = o & P.Host && i === a,
        c = ao(a, s, n, u, l);
    return c !== null ? Bt(e, s, c, a) : Ve;
}
function ao(t, e, n, r, o) {
    let i = t.providerIndexes,
        s = e.data,
        a = i & 1048575,
        u = t.directiveStart,
        l = t.directiveEnd,
        c = i >> 20,
        d = r ? a : a + c,
        h = o ? a + c : l;
    for (let f = d; f < h; f++) {
        let p = s[f];
        if ((f < u && n === p) || (f >= u && p.type === n)) return f;
    }
    if (o) {
        let f = s[u];
        if (f && ht(f) && f.type === n) return u;
    }
    return null;
}
function Bt(t, e, n, r) {
    let o = t[n],
        i = e.data;
    if (zy(o)) {
        let s = o;
        s.resolving && Ig(bg(i[n]));
        let a = vo(s.canSeeViewProviders);
        s.resolving = !0;
        let u,
            l = s.injectImpl ? ce(s.injectImpl) : null,
            c = Xd(t, r, P.Default);
        try {
            (o = t[n] = s.factory(void 0, i, t, r)),
                e.firstCreatePass && n >= r.directiveStart && Hy(n, i[n], e);
        } finally {
            l !== null && ce(l), vo(a), (s.resolving = !1), rf();
        }
    }
    return o;
}
function Xy(t) {
    if (typeof t == 'string') return t.charCodeAt(0) || 0;
    let e = t.hasOwnProperty(Hn) ? t[Hn] : void 0;
    return typeof e == 'number' ? (e >= 0 ? e & cf : ev) : e;
}
function xc(t, e, n) {
    let r = 1 << t;
    return !!(n[e + (t >> df)] & r);
}
function Nc(t, e) {
    return !(t & P.Self) && !(t & P.Host && e);
}
var Pt = class {
    constructor(e, n) {
        (this._tNode = e), (this._lView = n);
    }
    get(e, n, r) {
        return mf(this._tNode, this._lView, e, Ro(r), n);
    }
};
function ev() {
    return new Pt(ue(), x());
}
function FO(t) {
    return nr(() => {
        let e = t.prototype.constructor,
            n = e[co] || Ms(e),
            r = Object.prototype,
            o = Object.getPrototypeOf(t.prototype).constructor;
        for (; o && o !== r; ) {
            let i = o[co] || Ms(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
        }
        return (i) => new i();
    });
}
function Ms(t) {
    return ld(t)
        ? () => {
              let e = Ms(ie(t));
              return e && e();
          }
        : kt(t);
}
function tv(t, e, n, r, o) {
    let i = t,
        s = e;
    for (; i !== null && s !== null && s[C] & 2048 && !(s[C] & 512); ) {
        let a = gf(i, s, n, r | P.Self, Ve);
        if (a !== Ve) return a;
        let u = i.parent;
        if (!u) {
            let l = s[jd];
            if (l) {
                let c = l.get(n, Ve, r);
                if (c !== Ve) return c;
            }
            (u = yf(s)), (s = s[bn]);
        }
        i = u;
    }
    return o;
}
function yf(t) {
    let e = t[S],
        n = e.type;
    return n === 2 ? e.declTNode : n === 1 ? t[ge] : null;
}
function nv(t) {
    return Zy(ue(), t);
}
function Ac(t, e = null, n = null, r) {
    let o = vf(t, e, n, r);
    return o.resolveInjectorInitializers(), o;
}
function vf(t, e = null, n = null, r, o = new Set()) {
    let i = [n || se, ty(t)];
    return (
        (r = r || (typeof t == 'object' ? void 0 : ae(t))),
        new Wn(i, e || Aa(), r || null, o)
    );
}
var Cn = (() => {
    let e = class e {
        static create(r, o) {
            if (Array.isArray(r)) return Ac({ name: '' }, o, r, '');
            {
                let i = r.name ?? '';
                return Ac({ name: i }, r.parent, r.providers, i);
            }
        }
    };
    (e.THROW_IF_NOT_FOUND = Un),
        (e.NULL = new po()),
        (e.ɵprov = $({ token: e, providedIn: 'any', factory: () => oe(Dd) })),
        (e.__NG_ELEMENT_ID__ = -1);
    let t = e;
    return t;
})();
var rv = 'ngOriginalError';
function ns(t) {
    return t[rv];
}
var $t = class {
        constructor() {
            this._console = console;
        }
        handleError(e) {
            let n = this._findOriginalError(e);
            this._console.error('ERROR', e),
                n && this._console.error('ORIGINAL ERROR', n);
        }
        _findOriginalError(e) {
            let n = e && ns(e);
            for (; n && ns(n); ) n = ns(n);
            return n || null;
        }
    },
    Df = new B('', {
        providedIn: 'root',
        factory: () => O($t).handleError.bind(void 0),
    }),
    Ga = (() => {
        let e = class e {};
        (e.__NG_ELEMENT_ID__ = ov), (e.__NG_ENV_ID__ = (r) => r);
        let t = e;
        return t;
    })(),
    xs = class extends Ga {
        constructor(e) {
            super(), (this._lView = e);
        }
        onDestroy(e) {
            return Kd(this._lView, e), () => Cy(this._lView, e);
        }
    };
function ov() {
    return new xs(x());
}
function iv() {
    return Sn(ue(), x());
}
function Sn(t, e) {
    return new vt(ye(t, e));
}
var vt = (() => {
    let e = class e {
        constructor(r) {
            this.nativeElement = r;
        }
    };
    e.__NG_ELEMENT_ID__ = iv;
    let t = e;
    return t;
})();
function sv(t) {
    return t instanceof vt ? t.nativeElement : t;
}
var Ns = class extends le {
    constructor(e = !1) {
        super(),
            (this.destroyRef = void 0),
            (this.__isAsync = e),
            Ld() && (this.destroyRef = O(Ga, { optional: !0 }) ?? void 0);
    }
    emit(e) {
        let n = L(null);
        try {
            super.next(e);
        } finally {
            L(n);
        }
    }
    subscribe(e, n, r) {
        let o = e,
            i = n || (() => null),
            s = r;
        if (e && typeof e == 'object') {
            let u = e;
            (o = u.next?.bind(u)),
                (i = u.error?.bind(u)),
                (s = u.complete?.bind(u));
        }
        this.__isAsync && ((i = rs(i)), o && (o = rs(o)), s && (s = rs(s)));
        let a = super.subscribe({ next: o, error: i, complete: s });
        return e instanceof G && e.add(a), a;
    }
};
function rs(t) {
    return (e) => {
        setTimeout(t, void 0, e);
    };
}
var Ft = Ns;
function av() {
    return this._results[Symbol.iterator]();
}
var As = class t {
        get changes() {
            return (this._changes ??= new Ft());
        }
        constructor(e = !1) {
            (this._emitDistinctChangesOnly = e),
                (this.dirty = !0),
                (this._onDirty = void 0),
                (this._results = []),
                (this._changesDetected = !1),
                (this._changes = void 0),
                (this.length = 0),
                (this.first = void 0),
                (this.last = void 0);
            let n = t.prototype;
            n[Symbol.iterator] || (n[Symbol.iterator] = av);
        }
        get(e) {
            return this._results[e];
        }
        map(e) {
            return this._results.map(e);
        }
        filter(e) {
            return this._results.filter(e);
        }
        find(e) {
            return this._results.find(e);
        }
        reduce(e, n) {
            return this._results.reduce(e, n);
        }
        forEach(e) {
            this._results.forEach(e);
        }
        some(e) {
            return this._results.some(e);
        }
        toArray() {
            return this._results.slice();
        }
        toString() {
            return this._results.toString();
        }
        reset(e, n) {
            this.dirty = !1;
            let r = Pg(e);
            (this._changesDetected = !Fg(this._results, r, n)) &&
                ((this._results = r),
                (this.length = r.length),
                (this.last = r[this.length - 1]),
                (this.first = r[0]));
        }
        notifyOnChanges() {
            this._changes !== void 0 &&
                (this._changesDetected || !this._emitDistinctChangesOnly) &&
                this._changes.emit(this);
        }
        onDirty(e) {
            this._onDirty = e;
        }
        setDirty() {
            (this.dirty = !0), this._onDirty?.();
        }
        destroy() {
            this._changes !== void 0 &&
                (this._changes.complete(), this._changes.unsubscribe());
        }
    },
    uv = 'ngSkipHydration',
    lv = 'ngskiphydration';
function Ef(t) {
    let e = t.mergedAttrs;
    if (e === null) return !1;
    for (let n = 0; n < e.length; n += 2) {
        let r = e[n];
        if (typeof r == 'number') return !1;
        if (typeof r == 'string' && r.toLowerCase() === lv) return !0;
    }
    return !1;
}
function wf(t) {
    return t.hasAttribute(uv);
}
function Eo(t) {
    return (t.flags & 128) === 128;
}
function cv(t) {
    if (Eo(t)) return !0;
    let e = t.parent;
    for (; e; ) {
        if (Eo(t) || Ef(e)) return !0;
        e = e.parent;
    }
    return !1;
}
var Os;
function PO(t) {
    Os = t;
}
function sr() {
    if (Os !== void 0) return Os;
    if (typeof document < 'u') return document;
    throw new g(210, !1);
}
var dv = new B('', { providedIn: 'root', factory: () => fv }),
    fv = 'ng',
    hv = new B(''),
    $o = new B('', { providedIn: 'platform', factory: () => 'unknown' });
var RO = new B(''),
    kO = new B('', {
        providedIn: 'root',
        factory: () =>
            sr()
                .body?.querySelector('[ngCspNonce]')
                ?.getAttribute('ngCspNonce') || null,
    });
function pv() {
    let t = new Wa();
    return O($o) === 'browser' && (t.store = mv(sr(), O(dv))), t;
}
var Wa = (() => {
    let e = class e {
        constructor() {
            (this.store = {}), (this.onSerializeCallbacks = {});
        }
        get(r, o) {
            return this.store[r] !== void 0 ? this.store[r] : o;
        }
        set(r, o) {
            this.store[r] = o;
        }
        remove(r) {
            delete this.store[r];
        }
        hasKey(r) {
            return this.store.hasOwnProperty(r);
        }
        get isEmpty() {
            return Object.keys(this.store).length === 0;
        }
        onSerialize(r, o) {
            this.onSerializeCallbacks[r] = o;
        }
        toJson() {
            for (let r in this.onSerializeCallbacks)
                if (this.onSerializeCallbacks.hasOwnProperty(r))
                    try {
                        this.store[r] = this.onSerializeCallbacks[r]();
                    } catch (o) {
                        console.warn('Exception in onSerialize callback: ', o);
                    }
            return JSON.stringify(this.store).replace(/</g, '\\u003C');
        }
    };
    e.ɵprov = $({ token: e, providedIn: 'root', factory: pv });
    let t = e;
    return t;
})();
function mv(t, e) {
    let n = t.getElementById(e + '-state');
    if (n?.textContent)
        try {
            return JSON.parse(n.textContent);
        } catch (r) {
            console.warn(
                'Exception while restoring TransferState for app ' + e,
                r,
            );
        }
    return {};
}
var bf = 'h',
    If = 'b',
    Fs = (function (t) {
        return (t.FirstChild = 'f'), (t.NextSibling = 'n'), t;
    })(Fs || {}),
    gv = 'e',
    yv = 't',
    Qa = 'c',
    _f = 'x',
    wo = 'r',
    vv = 'i',
    Dv = 'n',
    Ev = 'd',
    wv = '__nghData__',
    Cf = wv,
    os = 'ngh',
    bv = 'nghm',
    Sf = () => null;
function Iv(t, e, n = !1) {
    let r = t.getAttribute(os);
    if (r == null) return null;
    let [o, i] = r.split('|');
    if (((r = n ? i : o), !r)) return null;
    let s = i ? `|${i}` : '',
        a = n ? o : s,
        u = {};
    if (r !== '') {
        let c = e.get(Wa, null, { optional: !0 });
        c !== null && (u = c.get(Cf, [])[Number(r)]);
    }
    let l = { data: u, firstChild: t.firstChild ?? null };
    return (
        n && ((l.firstChild = t), Ho(l, 0, t.nextSibling)),
        a ? t.setAttribute(os, a) : t.removeAttribute(os),
        l
    );
}
function _v() {
    Sf = Iv;
}
function Ka(t, e, n = !1) {
    return Sf(t, e, n);
}
function Cv(t) {
    let e = t._lView;
    return e[S].type === 2 ? null : (Bd(e) && (e = e[W]), e);
}
function Sv(t) {
    return t.textContent?.replace(/\s/gm, '');
}
function Tv(t) {
    let e = sr(),
        n = e.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
            acceptNode(i) {
                let s = Sv(i);
                return s === 'ngetn' || s === 'ngtns'
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            },
        }),
        r,
        o = [];
    for (; (r = n.nextNode()); ) o.push(r);
    for (let i of o)
        i.textContent === 'ngetn'
            ? i.replaceWith(e.createTextNode(''))
            : i.remove();
}
function Ho(t, e, n) {
    (t.segmentHeads ??= {}), (t.segmentHeads[e] = n);
}
function Ps(t, e) {
    return t.segmentHeads?.[e] ?? null;
}
function Mv(t, e) {
    let n = t.data,
        r = n[gv]?.[e] ?? null;
    return r === null && n[Qa]?.[e] && (r = Ya(t, e)), r;
}
function Tf(t, e) {
    return t.data[Qa]?.[e] ?? null;
}
function Ya(t, e) {
    let n = Tf(t, e) ?? [],
        r = 0;
    for (let o of n) r += o[wo] * (o[_f] ?? 1);
    return r;
}
function Uo(t, e) {
    if (typeof t.disconnectedNodes > 'u') {
        let n = t.data[Ev];
        t.disconnectedNodes = n ? new Set(n) : null;
    }
    return !!t.disconnectedNodes?.has(e);
}
var Zr = new B(''),
    Mf = !1,
    xf = new B('', { providedIn: 'root', factory: () => Mf }),
    xv = new B(''),
    Jr;
function Nf() {
    if (Jr === void 0 && ((Jr = null), be.trustedTypes))
        try {
            Jr = be.trustedTypes.createPolicy('angular', {
                createHTML: (t) => t,
                createScript: (t) => t,
                createScriptURL: (t) => t,
            });
        } catch {}
    return Jr;
}
function zo(t) {
    return Nf()?.createHTML(t) || t;
}
function Nv(t) {
    return Nf()?.createScriptURL(t) || t;
}
var Xr;
function Af() {
    if (Xr === void 0 && ((Xr = null), be.trustedTypes))
        try {
            Xr = be.trustedTypes.createPolicy('angular#unsafe-bypass', {
                createHTML: (t) => t,
                createScript: (t) => t,
                createScriptURL: (t) => t,
            });
        } catch {}
    return Xr;
}
function Oc(t) {
    return Af()?.createHTML(t) || t;
}
function Fc(t) {
    return Af()?.createScriptURL(t) || t;
}
var Je = class {
        constructor(e) {
            this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
            return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${sd})`;
        }
    },
    Rs = class extends Je {
        getTypeName() {
            return 'HTML';
        }
    },
    ks = class extends Je {
        getTypeName() {
            return 'Style';
        }
    },
    Ls = class extends Je {
        getTypeName() {
            return 'Script';
        }
    },
    js = class extends Je {
        getTypeName() {
            return 'URL';
        }
    },
    Vs = class extends Je {
        getTypeName() {
            return 'ResourceURL';
        }
    };
function Tn(t) {
    return t instanceof Je ? t.changingThisBreaksApplicationSecurity : t;
}
function Za(t, e) {
    let n = Av(t);
    if (n != null && n !== e) {
        if (n === 'ResourceURL' && e === 'URL') return !0;
        throw new Error(`Required a safe ${e}, got a ${n} (see ${sd})`);
    }
    return n === e;
}
function Av(t) {
    return (t instanceof Je && t.getTypeName()) || null;
}
function LO(t) {
    return new Rs(t);
}
function jO(t) {
    return new ks(t);
}
function VO(t) {
    return new Ls(t);
}
function BO(t) {
    return new js(t);
}
function $O(t) {
    return new Vs(t);
}
function Ov(t) {
    let e = new $s(t);
    return Fv() ? new Bs(e) : e;
}
var Bs = class {
        constructor(e) {
            this.inertDocumentHelper = e;
        }
        getInertBodyElement(e) {
            e = '<body><remove></remove>' + e;
            try {
                let n = new window.DOMParser().parseFromString(
                    zo(e),
                    'text/html',
                ).body;
                return n === null
                    ? this.inertDocumentHelper.getInertBodyElement(e)
                    : (n.removeChild(n.firstChild), n);
            } catch {
                return null;
            }
        }
    },
    $s = class {
        constructor(e) {
            (this.defaultDoc = e),
                (this.inertDocument =
                    this.defaultDoc.implementation.createHTMLDocument(
                        'sanitization-inert',
                    ));
        }
        getInertBodyElement(e) {
            let n = this.inertDocument.createElement('template');
            return (n.innerHTML = zo(e)), n;
        }
    };
function Fv() {
    try {
        return !!new window.DOMParser().parseFromString(zo(''), 'text/html');
    } catch {
        return !1;
    }
}
var Pv = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Of(t) {
    return (t = String(t)), t.match(Pv) ? t : 'unsafe:' + t;
}
function et(t) {
    let e = {};
    for (let n of t.split(',')) e[n] = !0;
    return e;
}
function ar(...t) {
    let e = {};
    for (let n of t) for (let r in n) n.hasOwnProperty(r) && (e[r] = !0);
    return e;
}
var Ff = et('area,br,col,hr,img,wbr'),
    Pf = et('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
    Rf = et('rp,rt'),
    Rv = ar(Rf, Pf),
    kv = ar(
        Pf,
        et(
            'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul',
        ),
    ),
    Lv = ar(
        Rf,
        et(
            'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video',
        ),
    ),
    Pc = ar(Ff, kv, Lv, Rv),
    kf = et('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
    jv = et(
        'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width',
    ),
    Vv = et(
        'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext',
    ),
    Bv = ar(kf, jv, Vv),
    $v = et('script,style,template'),
    Hs = class {
        constructor() {
            (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(e) {
            let n = e.firstChild,
                r = !0,
                o = [];
            for (; n; ) {
                if (
                    (n.nodeType === Node.ELEMENT_NODE
                        ? (r = this.startElement(n))
                        : n.nodeType === Node.TEXT_NODE
                          ? this.chars(n.nodeValue)
                          : (this.sanitizedSomething = !0),
                    r && n.firstChild)
                ) {
                    o.push(n), (n = zv(n));
                    continue;
                }
                for (; n; ) {
                    n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                    let i = Uv(n);
                    if (i) {
                        n = i;
                        break;
                    }
                    n = o.pop();
                }
            }
            return this.buf.join('');
        }
        startElement(e) {
            let n = Rc(e).toLowerCase();
            if (!Pc.hasOwnProperty(n))
                return (this.sanitizedSomething = !0), !$v.hasOwnProperty(n);
            this.buf.push('<'), this.buf.push(n);
            let r = e.attributes;
            for (let o = 0; o < r.length; o++) {
                let i = r.item(o),
                    s = i.name,
                    a = s.toLowerCase();
                if (!Bv.hasOwnProperty(a)) {
                    this.sanitizedSomething = !0;
                    continue;
                }
                let u = i.value;
                kf[a] && (u = Of(u)), this.buf.push(' ', s, '="', kc(u), '"');
            }
            return this.buf.push('>'), !0;
        }
        endElement(e) {
            let n = Rc(e).toLowerCase();
            Pc.hasOwnProperty(n) &&
                !Ff.hasOwnProperty(n) &&
                (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
        }
        chars(e) {
            this.buf.push(kc(e));
        }
    };
function Hv(t, e) {
    return (
        (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
        Node.DOCUMENT_POSITION_CONTAINED_BY
    );
}
function Uv(t) {
    let e = t.nextSibling;
    if (e && t !== e.previousSibling) throw Lf(e);
    return e;
}
function zv(t) {
    let e = t.firstChild;
    if (e && Hv(t, e)) throw Lf(e);
    return e;
}
function Rc(t) {
    let e = t.nodeName;
    return typeof e == 'string' ? e : 'FORM';
}
function Lf(t) {
    return new Error(
        `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`,
    );
}
var qv = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    Gv = /([^\#-~ |!])/g;
function kc(t) {
    return t
        .replace(/&/g, '&amp;')
        .replace(qv, function (e) {
            let n = e.charCodeAt(0),
                r = e.charCodeAt(1);
            return '&#' + ((n - 55296) * 1024 + (r - 56320) + 65536) + ';';
        })
        .replace(Gv, function (e) {
            return '&#' + e.charCodeAt(0) + ';';
        })
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
var eo;
function Wv(t, e) {
    let n = null;
    try {
        eo = eo || Ov(t);
        let r = e ? String(e) : '';
        n = eo.getInertBodyElement(r);
        let o = 5,
            i = r;
        do {
            if (o === 0)
                throw new Error(
                    'Failed to sanitize html because the input is unstable',
                );
            o--, (r = i), (i = n.innerHTML), (n = eo.getInertBodyElement(r));
        } while (r !== i);
        let a = new Hs().sanitizeChildren(Lc(n) || n);
        return zo(a);
    } finally {
        if (n) {
            let r = Lc(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
        }
    }
}
function Lc(t) {
    return 'content' in t && Qv(t) ? t.content : null;
}
function Qv(t) {
    return t.nodeType === Node.ELEMENT_NODE && t.nodeName === 'TEMPLATE';
}
var qo = (function (t) {
    return (
        (t[(t.NONE = 0)] = 'NONE'),
        (t[(t.HTML = 1)] = 'HTML'),
        (t[(t.STYLE = 2)] = 'STYLE'),
        (t[(t.SCRIPT = 3)] = 'SCRIPT'),
        (t[(t.URL = 4)] = 'URL'),
        (t[(t.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        t
    );
})(qo || {});
function HO(t) {
    let e = Ja();
    return e
        ? Oc(e.sanitize(qo.HTML, t) || '')
        : Za(t, 'HTML')
          ? Oc(Tn(t))
          : Wv(sr(), Rt(t));
}
function Kv(t) {
    let e = Ja();
    return e ? e.sanitize(qo.URL, t) || '' : Za(t, 'URL') ? Tn(t) : Of(Rt(t));
}
function Yv(t) {
    let e = Ja();
    if (e) return Fc(e.sanitize(qo.RESOURCE_URL, t) || '');
    if (Za(t, 'ResourceURL')) return Fc(Tn(t));
    throw new g(904, !1);
}
function UO(t) {
    return Nv(t[0]);
}
function Zv(t, e) {
    return (e === 'src' &&
        (t === 'embed' ||
            t === 'frame' ||
            t === 'iframe' ||
            t === 'media' ||
            t === 'script')) ||
        (e === 'href' && (t === 'base' || t === 'link'))
        ? Yv
        : Kv;
}
function zO(t, e, n) {
    return Zv(e, n)(t);
}
function Ja() {
    let t = x();
    return t && t[Oe].sanitizer;
}
var Jv = /^>|^->|<!--|-->|--!>|<!-$/g,
    Xv = /(<|>)/g,
    eD = '\u200B$1\u200B';
function tD(t) {
    return t.replace(Jv, (e) => e.replace(Xv, eD));
}
var jf = new Map(),
    nD = 0;
function rD() {
    return nD++;
}
function oD(t) {
    jf.set(t[Lo], t);
}
function iD(t) {
    jf.delete(t[Lo]);
}
var jc = '__ngContext__';
function pt(t, e) {
    Ke(e) ? ((t[jc] = e[Lo]), oD(e)) : (t[jc] = e);
}
function qO(t) {
    return t.ownerDocument;
}
function sD(t) {
    return t.ownerDocument.body;
}
function Vf(t) {
    return t instanceof Function ? t() : t;
}
function $n(t) {
    return (t ?? O(Cn)).get($o) === 'browser';
}
var Xn = (function (t) {
        return (
            (t[(t.Important = 1)] = 'Important'),
            (t[(t.DashCase = 2)] = 'DashCase'),
            t
        );
    })(Xn || {}),
    aD;
function Xa(t, e) {
    return aD(t, e);
}
function cn(t, e, n, r, o) {
    if (r != null) {
        let i,
            s = !1;
        Be(r) ? (i = r) : Ke(r) && ((s = !0), (r = r[pe]));
        let a = Fe(r);
        t === 0 && n !== null
            ? o == null
                ? zf(e, n, a)
                : bo(e, n, a, o || null, !0)
            : t === 1 && n !== null
              ? bo(e, n, a, o || null, !0)
              : t === 2
                ? ru(e, a, s)
                : t === 3 && e.destroyNode(a),
            i != null && bD(e, t, i, n, o);
    }
}
function eu(t, e) {
    return t.createText(e);
}
function uD(t, e, n) {
    t.setValue(e, n);
}
function tu(t, e) {
    return t.createComment(tD(e));
}
function Go(t, e, n) {
    return t.createElement(e, n);
}
function lD(t, e) {
    Bf(t, e), (e[pe] = null), (e[ge] = null);
}
function cD(t, e, n, r, o, i) {
    (r[pe] = o), (r[ge] = e), Qo(t, r, n, 1, o, i);
}
function Bf(t, e) {
    e[Oe].changeDetectionScheduler?.notify(1), Qo(t, e, e[H], 2, null, null);
}
function dD(t) {
    let e = t[Kn];
    if (!e) return is(t[S], t);
    for (; e; ) {
        let n = null;
        if (Ke(e)) n = e[Kn];
        else {
            let r = e[de];
            r && (n = r);
        }
        if (!n) {
            for (; e && !e[Ne] && e !== t; ) Ke(e) && is(e[S], e), (e = e[ee]);
            e === null && (e = t), Ke(e) && is(e[S], e), (n = e && e[Ne]);
        }
        e = n;
    }
}
function fD(t, e, n, r) {
    let o = de + r,
        i = n.length;
    r > 0 && (n[o - 1][Ne] = e),
        r < i - de
            ? ((e[Ne] = n[o]), vd(n, de + r, e))
            : (n.push(e), (e[Ne] = null)),
        (e[ee] = n);
    let s = e[or];
    s !== null && n !== s && hD(s, e);
    let a = e[Ye];
    a !== null && a.insertView(t), _s(e), (e[C] |= 128);
}
function hD(t, e) {
    let n = t[yn],
        o = e[ee][ee][me];
    e[me] !== o && (t[C] |= Oa.HasTransplantedViews),
        n === null ? (t[yn] = [e]) : n.push(e);
}
function $f(t, e) {
    let n = t[yn],
        r = n.indexOf(e);
    n.splice(r, 1);
}
function Us(t, e) {
    if (t.length <= de) return;
    let n = de + e,
        r = t[n];
    if (r) {
        let o = r[or];
        o !== null && o !== t && $f(o, r), e > 0 && (t[n - 1][Ne] = r[Ne]);
        let i = ho(t, de + e);
        lD(r[S], r);
        let s = i[Ye];
        s !== null && s.detachView(i[S]),
            (r[ee] = null),
            (r[Ne] = null),
            (r[C] &= -129);
    }
    return r;
}
function Hf(t, e) {
    if (!(e[C] & 256)) {
        let n = e[H];
        n.destroyNode && Qo(t, e, n, 3, null, null), dD(e);
    }
}
function is(t, e) {
    if (e[C] & 256) return;
    let n = L(null);
    try {
        (e[C] &= -129),
            (e[C] |= 256),
            e[Lt] && Al(e[Lt]),
            mD(t, e),
            pD(t, e),
            e[S].type === 1 && e[H].destroy();
        let r = e[or];
        if (r !== null && Be(e[ee])) {
            r !== e[ee] && $f(r, e);
            let o = e[Ye];
            o !== null && o.detachView(t);
        }
        iD(e);
    } finally {
        L(n);
    }
}
function pD(t, e) {
    let n = t.cleanup,
        r = e[Qn];
    if (n !== null)
        for (let i = 0; i < n.length - 1; i += 2)
            if (typeof n[i] == 'string') {
                let s = n[i + 3];
                s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
            } else {
                let s = r[n[i + 1]];
                n[i].call(s);
            }
    r !== null && (e[Qn] = null);
    let o = e[lt];
    if (o !== null) {
        e[lt] = null;
        for (let i = 0; i < o.length; i++) {
            let s = o[i];
            s();
        }
    }
}
function mD(t, e) {
    let n;
    if (t != null && (n = t.destroyHooks) != null)
        for (let r = 0; r < n.length; r += 2) {
            let o = e[n[r]];
            if (!(o instanceof Vt)) {
                let i = n[r + 1];
                if (Array.isArray(i))
                    for (let s = 0; s < i.length; s += 2) {
                        let a = o[i[s]],
                            u = i[s + 1];
                        je(4, a, u);
                        try {
                            u.call(a);
                        } finally {
                            je(5, a, u);
                        }
                    }
                else {
                    je(4, o, i);
                    try {
                        i.call(o);
                    } finally {
                        je(5, o, i);
                    }
                }
            }
        }
}
function Uf(t, e, n) {
    return gD(t, e.parent, n);
}
function gD(t, e, n) {
    let r = e;
    for (; r !== null && r.type & 40; ) (e = r), (r = e.parent);
    if (r === null) return n[pe];
    {
        let { componentOffset: o } = r;
        if (o > -1) {
            let { encapsulation: i } = t.data[r.directiveStart + o];
            if (i === qn.None || i === qn.Emulated) return null;
        }
        return ye(r, n);
    }
}
function bo(t, e, n, r, o) {
    t.insertBefore(e, n, r, o);
}
function zf(t, e, n) {
    t.appendChild(e, n);
}
function Vc(t, e, n, r, o) {
    r !== null ? bo(t, e, n, r, o) : zf(t, e, n);
}
function yD(t, e, n, r) {
    t.removeChild(e, n, r);
}
function nu(t, e) {
    return t.parentNode(e);
}
function vD(t, e) {
    return t.nextSibling(e);
}
function qf(t, e, n) {
    return ED(t, e, n);
}
function DD(t, e, n) {
    return t.type & 40 ? ye(t, n) : null;
}
var ED = DD,
    Bc;
function Wo(t, e, n, r) {
    let o = Uf(t, r, e),
        i = e[H],
        s = r.parent || e[ge],
        a = qf(s, r, e);
    if (o != null)
        if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Vc(i, o, n[u], a, !1);
        else Vc(i, o, n, a, !1);
    Bc !== void 0 && Bc(i, r, e, n, o);
}
function uo(t, e) {
    if (e !== null) {
        let n = e.type;
        if (n & 3) return ye(e, t);
        if (n & 4) return zs(-1, t[e.index]);
        if (n & 8) {
            let r = e.child;
            if (r !== null) return uo(t, r);
            {
                let o = t[e.index];
                return Be(o) ? zs(-1, o) : Fe(o);
            }
        } else {
            if (n & 32) return Xa(e, t)() || Fe(t[e.index]);
            {
                let r = Gf(t, e);
                if (r !== null) {
                    if (Array.isArray(r)) return r[0];
                    let o = Jn(t[me]);
                    return uo(o, r);
                } else return uo(t, e.next);
            }
        }
    }
    return null;
}
function Gf(t, e) {
    if (e !== null) {
        let r = t[me][ge],
            o = e.projection;
        return r.projection[o];
    }
    return null;
}
function zs(t, e) {
    let n = de + t + 1;
    if (n < e.length) {
        let r = e[n],
            o = r[S].firstChild;
        if (o !== null) return uo(r, o);
    }
    return e[Ze];
}
function ru(t, e, n) {
    let r = nu(t, e);
    r && yD(t, r, e, n);
}
function Wf(t) {
    t.textContent = '';
}
function ou(t, e, n, r, o, i, s) {
    for (; n != null; ) {
        let a = r[n.index],
            u = n.type;
        if (
            (s && e === 0 && (a && pt(Fe(a), r), (n.flags |= 2)),
            (n.flags & 32) !== 32)
        )
            if (u & 8) ou(t, e, n.child, r, o, i, !1), cn(e, t, o, a, i);
            else if (u & 32) {
                let l = Xa(n, r),
                    c;
                for (; (c = l()); ) cn(e, t, o, c, i);
                cn(e, t, o, a, i);
            } else u & 16 ? Qf(t, e, r, n, o, i) : cn(e, t, o, a, i);
        n = s ? n.projectionNext : n.next;
    }
}
function Qo(t, e, n, r, o, i) {
    ou(n, r, t.firstChild, e, o, i, !1);
}
function wD(t, e, n) {
    let r = e[H],
        o = Uf(t, n, e),
        i = n.parent || e[ge],
        s = qf(i, n, e);
    Qf(r, 0, e, n, o, s);
}
function Qf(t, e, n, r, o, i) {
    let s = n[me],
        u = s[ge].projection[r.projection];
    if (Array.isArray(u))
        for (let l = 0; l < u.length; l++) {
            let c = u[l];
            cn(e, t, o, c, i);
        }
    else {
        let l = u,
            c = s[ee];
        Eo(r) && (l.flags |= 128), ou(t, e, l, c, o, i, !0);
    }
}
function bD(t, e, n, r, o) {
    let i = n[Ze],
        s = Fe(n);
    i !== s && cn(e, t, r, i, o);
    for (let a = de; a < n.length; a++) {
        let u = n[a];
        Qo(u[S], u, t, e, r, i);
    }
}
function ID(t, e, n, r, o) {
    if (e) o ? t.addClass(n, r) : t.removeClass(n, r);
    else {
        let i = r.indexOf('-') === -1 ? void 0 : Xn.DashCase;
        o == null
            ? t.removeStyle(n, r, i)
            : (typeof o == 'string' &&
                  o.endsWith('!important') &&
                  ((o = o.slice(0, -10)), (i |= Xn.Important)),
              t.setStyle(n, r, o, i));
    }
}
function _D(t, e, n) {
    t.setAttribute(e, 'style', n);
}
function Kf(t, e, n) {
    n === '' ? t.removeAttribute(e, 'class') : t.setAttribute(e, 'class', n);
}
function Yf(t, e, n) {
    let { mergedAttrs: r, classes: o, styles: i } = n;
    r !== null && Ds(t, e, r),
        o !== null && Kf(t, e, o),
        i !== null && _D(t, e, i);
}
var _e = {};
function GO(t = 1) {
    Zf(Q(), x(), yt() + t, !1);
}
function Zf(t, e, n, r) {
    if (!r)
        if ((e[C] & 3) === 3) {
            let i = t.preOrderCheckHooks;
            i !== null && io(e, i, n);
        } else {
            let i = t.preOrderHooks;
            i !== null && so(e, i, 0, n);
        }
    jt(n);
}
function K(t, e = P.Default) {
    let n = x();
    if (n === null) return oe(t, e);
    let r = ue();
    return mf(r, n, ie(t), e);
}
function WO() {
    let t = 'invalid';
    throw new Error(t);
}
function Jf(t, e, n, r, o, i) {
    let s = L(null);
    try {
        let a = null;
        o & ct.SignalBased && (a = e[r][st]),
            a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
            o & ct.HasDecoratorInputTransform &&
                (i = t.inputTransforms[r].call(e, i)),
            t.setInput !== null ? t.setInput(e, a, i, n, r) : $d(e, a, r, i);
    } finally {
        L(s);
    }
}
function CD(t, e) {
    let n = t.hostBindingOpCodes;
    if (n !== null)
        try {
            for (let r = 0; r < n.length; r++) {
                let o = n[r];
                if (o < 0) jt(~o);
                else {
                    let i = o,
                        s = n[++r],
                        a = n[++r];
                    Ly(s, i);
                    let u = e[i];
                    a(2, u);
                }
            }
        } finally {
            jt(-1);
        }
}
function Ko(t, e, n, r, o, i, s, a, u, l, c) {
    let d = e.blueprint.slice();
    return (
        (d[pe] = o),
        (d[C] = r | 4 | 128 | 8 | 64),
        (l !== null || (t && t[C] & 2048)) && (d[C] |= 2048),
        Qd(d),
        (d[ee] = d[bn] = t),
        (d[Ae] = n),
        (d[Oe] = s || (t && t[Oe])),
        (d[H] = a || (t && t[H])),
        (d[gn] = u || (t && t[gn]) || null),
        (d[ge] = i),
        (d[Lo] = rD()),
        (d[Ie] = c),
        (d[jd] = l),
        (d[me] = e.type == 2 ? t[me] : d),
        d
    );
}
function Mn(t, e, n, r, o) {
    let i = t.data[e];
    if (i === null) (i = SD(t, e, n, r, o)), ky() && (i.flags |= 32);
    else if (i.type & 64) {
        (i.type = n), (i.value = r), (i.attrs = o);
        let s = Oy();
        i.injectorIndex = s === null ? -1 : s.injectorIndex;
    }
    return qt(i, !0), i;
}
function SD(t, e, n, r, o) {
    let i = Zd(),
        s = ja(),
        a = s ? i : i && i.parent,
        u = (t.data[e] = FD(t, a, n, e, r, o));
    return (
        t.firstChild === null && (t.firstChild = u),
        i !== null &&
            (s
                ? i.child == null && u.parent !== null && (i.child = u)
                : i.next === null && ((i.next = u), (u.prev = i))),
        u
    );
}
function Xf(t, e, n, r) {
    if (n === 0) return -1;
    let o = e.length;
    for (let i = 0; i < n; i++)
        e.push(r), t.blueprint.push(r), t.data.push(null);
    return o;
}
function eh(t, e, n, r, o) {
    let i = yt(),
        s = r & 2;
    try {
        jt(-1), s && e.length > W && Zf(t, e, W, !1), je(s ? 2 : 0, o), n(r, o);
    } finally {
        jt(i), je(s ? 3 : 1, o);
    }
}
function iu(t, e, n) {
    if (Fa(e)) {
        let r = L(null);
        try {
            let o = e.directiveStart,
                i = e.directiveEnd;
            for (let s = o; s < i; s++) {
                let a = t.data[s];
                if (a.contentQueries) {
                    let u = n[s];
                    a.contentQueries(1, u, s);
                }
            }
        } finally {
            L(r);
        }
    }
}
function su(t, e, n) {
    Yd() && (BD(t, e, n, ye(n, e)), (n.flags & 64) === 64 && oh(t, e, n));
}
function au(t, e, n = ye) {
    let r = e.localNames;
    if (r !== null) {
        let o = e.index + 1;
        for (let i = 0; i < r.length; i += 2) {
            let s = r[i + 1],
                a = s === -1 ? n(e, t) : t[s];
            t[o++] = a;
        }
    }
}
function th(t) {
    let e = t.tView;
    return e === null || e.incompleteFirstPass
        ? (t.tView = uu(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts,
              t.id,
          ))
        : e;
}
function uu(t, e, n, r, o, i, s, a, u, l, c) {
    let d = W + r,
        h = d + o,
        f = TD(d, h),
        p = typeof l == 'function' ? l() : l;
    return (f[S] = {
        type: t,
        blueprint: f,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: e,
        data: f.slice().fill(null, d),
        bindingStartIndex: d,
        expandoStartIndex: h,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof i == 'function' ? i() : i,
        pipeRegistry: typeof s == 'function' ? s() : s,
        firstChild: null,
        schemas: u,
        consts: p,
        incompleteFirstPass: !1,
        ssrId: c,
    });
}
function TD(t, e) {
    let n = [];
    for (let r = 0; r < e; r++) n.push(r < t ? null : _e);
    return n;
}
function MD(t, e, n, r) {
    let i = r.get(xf, Mf) || n === qn.ShadowDom,
        s = t.selectRootElement(e, i);
    return xD(s), s;
}
function xD(t) {
    nh(t);
}
var nh = () => null;
function ND(t) {
    wf(t) ? Wf(t) : Tv(t);
}
function AD() {
    nh = ND;
}
function OD(t, e, n, r) {
    let o = ah(e);
    o.push(n), t.firstCreatePass && uh(t).push(r, o.length - 1);
}
function FD(t, e, n, r, o, i) {
    let s = e ? e.injectorIndex : -1,
        a = 0;
    return (
        In() && (a |= 128),
        {
            type: n,
            index: r,
            insertBeforeIndex: null,
            injectorIndex: s,
            directiveStart: -1,
            directiveEnd: -1,
            directiveStylingLast: -1,
            componentOffset: -1,
            propertyBindings: null,
            flags: a,
            providerIndexes: 0,
            value: o,
            attrs: i,
            mergedAttrs: null,
            localNames: null,
            initialInputs: void 0,
            inputs: null,
            outputs: null,
            tView: null,
            next: null,
            prev: null,
            projectionNext: null,
            child: null,
            parent: e,
            projection: null,
            styles: null,
            stylesWithoutHost: null,
            residualStyles: void 0,
            classes: null,
            classesWithoutHost: null,
            residualClasses: void 0,
            classBindings: 0,
            styleBindings: 0,
        }
    );
}
function $c(t, e, n, r, o) {
    for (let i in e) {
        if (!e.hasOwnProperty(i)) continue;
        let s = e[i];
        if (s === void 0) continue;
        r ??= {};
        let a,
            u = ct.None;
        Array.isArray(s) ? ((a = s[0]), (u = s[1])) : (a = s);
        let l = i;
        if (o !== null) {
            if (!o.hasOwnProperty(i)) continue;
            l = o[i];
        }
        t === 0 ? Hc(r, n, l, a, u) : Hc(r, n, l, a);
    }
    return r;
}
function Hc(t, e, n, r, o) {
    let i;
    t.hasOwnProperty(n) ? (i = t[n]).push(e, r) : (i = t[n] = [e, r]),
        o !== void 0 && i.push(o);
}
function PD(t, e, n) {
    let r = e.directiveStart,
        o = e.directiveEnd,
        i = t.data,
        s = e.attrs,
        a = [],
        u = null,
        l = null;
    for (let c = r; c < o; c++) {
        let d = i[c],
            h = n ? n.get(d) : null,
            f = h ? h.inputs : null,
            p = h ? h.outputs : null;
        (u = $c(0, d.inputs, c, u, f)), (l = $c(1, d.outputs, c, l, p));
        let m = u !== null && s !== null && !xa(e) ? ZD(u, c, s) : null;
        a.push(m);
    }
    u !== null &&
        (u.hasOwnProperty('class') && (e.flags |= 8),
        u.hasOwnProperty('style') && (e.flags |= 16)),
        (e.initialInputs = a),
        (e.inputs = u),
        (e.outputs = l);
}
function RD(t) {
    return t === 'class'
        ? 'className'
        : t === 'for'
          ? 'htmlFor'
          : t === 'formaction'
            ? 'formAction'
            : t === 'innerHtml'
              ? 'innerHTML'
              : t === 'readonly'
                ? 'readOnly'
                : t === 'tabindex'
                  ? 'tabIndex'
                  : t;
}
function kD(t, e, n, r, o, i, s, a) {
    let u = ye(e, n),
        l = e.inputs,
        c;
    !a && l != null && (c = l[r])
        ? (cu(t, n, c, r, o), ir(e) && LD(n, e.index))
        : e.type & 3
          ? ((r = RD(r)),
            (o = s != null ? s(o, e.value || '', r) : o),
            i.setProperty(u, r, o))
          : e.type & 12;
}
function LD(t, e) {
    let n = gt(e, t);
    n[C] & 16 || (n[C] |= 64);
}
function lu(t, e, n, r) {
    if (Yd()) {
        let o = r === null ? null : { '': -1 },
            i = HD(t, n),
            s,
            a;
        i === null ? (s = a = null) : ([s, a] = i),
            s !== null && rh(t, e, n, s, o, a),
            o && UD(n, r, o);
    }
    n.mergedAttrs = Gn(n.mergedAttrs, n.attrs);
}
function rh(t, e, n, r, o, i) {
    for (let l = 0; l < r.length; l++) Ts(Do(n, e), t, r[l].type);
    qD(n, t.data.length, r.length);
    for (let l = 0; l < r.length; l++) {
        let c = r[l];
        c.providersResolver && c.providersResolver(c);
    }
    let s = !1,
        a = !1,
        u = Xf(t, e, r.length, null);
    for (let l = 0; l < r.length; l++) {
        let c = r[l];
        (n.mergedAttrs = Gn(n.mergedAttrs, c.hostAttrs)),
            GD(t, n, e, u, c),
            zD(u, c, o),
            c.contentQueries !== null && (n.flags |= 4),
            (c.hostBindings !== null ||
                c.hostAttrs !== null ||
                c.hostVars !== 0) &&
                (n.flags |= 64);
        let d = c.type.prototype;
        !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((t.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
                (d.ngOnChanges || d.ngDoCheck) &&
                ((t.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
    }
    PD(t, n, i);
}
function jD(t, e, n, r, o) {
    let i = o.hostBindings;
    if (i) {
        let s = t.hostBindingOpCodes;
        s === null && (s = t.hostBindingOpCodes = []);
        let a = ~e.index;
        VD(s) != a && s.push(a), s.push(n, r, i);
    }
}
function VD(t) {
    let e = t.length;
    for (; e > 0; ) {
        let n = t[--e];
        if (typeof n == 'number' && n < 0) return n;
    }
    return 0;
}
function BD(t, e, n, r) {
    let o = n.directiveStart,
        i = n.directiveEnd;
    ir(n) && WD(e, n, t.data[o + n.componentOffset]),
        t.firstCreatePass || Do(n, e),
        pt(r, e);
    let s = n.initialInputs;
    for (let a = o; a < i; a++) {
        let u = t.data[a],
            l = Bt(e, t, a, n);
        if ((pt(l, e), s !== null && YD(e, a - o, l, u, n, s), ht(u))) {
            let c = gt(n.index, e);
            c[Ae] = Bt(e, t, a, n);
        }
    }
}
function oh(t, e, n) {
    let r = n.directiveStart,
        o = n.directiveEnd,
        i = n.index,
        s = jy();
    try {
        jt(i);
        for (let a = r; a < o; a++) {
            let u = t.data[a],
                l = e[a];
            Cs(a),
                (u.hostBindings !== null ||
                    u.hostVars !== 0 ||
                    u.hostAttrs !== null) &&
                    $D(u, l);
        }
    } finally {
        jt(-1), Cs(s);
    }
}
function $D(t, e) {
    t.hostBindings !== null && t.hostBindings(1, e);
}
function HD(t, e) {
    let n = t.directiveRegistry,
        r = null,
        o = null;
    if (n)
        for (let i = 0; i < n.length; i++) {
            let s = n[i];
            if (_d(e, s.selectors, !1))
                if ((r || (r = []), ht(s)))
                    if (s.findHostDirectiveDefs !== null) {
                        let a = [];
                        (o = o || new Map()),
                            s.findHostDirectiveDefs(s, a, o),
                            r.unshift(...a, s);
                        let u = a.length;
                        qs(t, e, u);
                    } else r.unshift(s), qs(t, e, 0);
                else
                    (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
        }
    return r === null ? null : [r, o];
}
function qs(t, e, n) {
    (e.componentOffset = n), (t.components ??= []).push(e.index);
}
function UD(t, e, n) {
    if (e) {
        let r = (t.localNames = []);
        for (let o = 0; o < e.length; o += 2) {
            let i = n[e[o + 1]];
            if (i == null) throw new g(-301, !1);
            r.push(e[o], i);
        }
    }
}
function zD(t, e, n) {
    if (n) {
        if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
        ht(e) && (n[''] = t);
    }
}
function qD(t, e, n) {
    (t.flags |= 1),
        (t.directiveStart = e),
        (t.directiveEnd = e + n),
        (t.providerIndexes = e);
}
function GD(t, e, n, r, o) {
    t.data[r] = o;
    let i = o.factory || (o.factory = kt(o.type, !0)),
        s = new Vt(i, ht(o), K);
    (t.blueprint[r] = s), (n[r] = s), jD(t, e, r, Xf(t, n, o.hostVars, _e), o);
}
function WD(t, e, n) {
    let r = ye(e, t),
        o = th(n),
        i = t[Oe].rendererFactory,
        s = 16;
    n.signals ? (s = 4096) : n.onPush && (s = 64);
    let a = Yo(
        t,
        Ko(t, o, null, s, r, e, null, i.createRenderer(r, n), null, null, null),
    );
    t[e.index] = a;
}
function QD(t, e, n, r, o, i) {
    let s = ye(t, e);
    KD(e[H], s, i, t.value, n, r, o);
}
function KD(t, e, n, r, o, i, s) {
    if (i == null) t.removeAttribute(e, o, n);
    else {
        let a = s == null ? Rt(i) : s(i, r || '', o);
        t.setAttribute(e, o, a, n);
    }
}
function YD(t, e, n, r, o, i) {
    let s = i[e];
    if (s !== null)
        for (let a = 0; a < s.length; ) {
            let u = s[a++],
                l = s[a++],
                c = s[a++],
                d = s[a++];
            Jf(r, n, u, l, c, d);
        }
}
function ZD(t, e, n) {
    let r = null,
        o = 0;
    for (; o < n.length; ) {
        let i = n[o];
        if (i === 0) {
            o += 4;
            continue;
        } else if (i === 5) {
            o += 2;
            continue;
        }
        if (typeof i == 'number') break;
        if (t.hasOwnProperty(i)) {
            r === null && (r = []);
            let s = t[i];
            for (let a = 0; a < s.length; a += 3)
                if (s[a] === e) {
                    r.push(i, s[a + 1], s[a + 2], n[o + 1]);
                    break;
                }
        }
        o += 2;
    }
    return r;
}
function ih(t, e, n, r) {
    return [t, !0, 0, e, null, r, null, n, null, null];
}
function sh(t, e) {
    let n = t.contentQueries;
    if (n !== null) {
        let r = L(null);
        try {
            for (let o = 0; o < n.length; o += 2) {
                let i = n[o],
                    s = n[o + 1];
                if (s !== -1) {
                    let a = t.data[s];
                    Ha(i), a.contentQueries(2, e[s], s);
                }
            }
        } finally {
            L(r);
        }
    }
}
function Yo(t, e) {
    return t[Kn] ? (t[Sc][Ne] = e) : (t[Kn] = e), (t[Sc] = e), e;
}
function Gs(t, e, n) {
    Ha(0);
    let r = L(null);
    try {
        e(t, n);
    } finally {
        L(r);
    }
}
function ah(t) {
    return t[Qn] || (t[Qn] = []);
}
function uh(t) {
    return t.cleanup || (t.cleanup = []);
}
function lh(t, e) {
    let n = t[gn],
        r = n ? n.get($t, null) : null;
    r && r.handleError(e);
}
function cu(t, e, n, r, o) {
    for (let i = 0; i < n.length; ) {
        let s = n[i++],
            a = n[i++],
            u = n[i++],
            l = e[s],
            c = t.data[s];
        Jf(c, l, r, a, u, o);
    }
}
function ch(t, e, n) {
    let r = Gd(e, t);
    uD(t[H], r, n);
}
function JD(t, e) {
    let n = gt(e, t),
        r = n[S];
    XD(r, n);
    let o = n[pe];
    o !== null && n[Ie] === null && (n[Ie] = Ka(o, n[gn])), du(r, n, n[Ae]);
}
function XD(t, e) {
    for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n]);
}
function du(t, e, n) {
    Ua(e);
    try {
        let r = t.viewQuery;
        r !== null && Gs(1, r, n);
        let o = t.template;
        o !== null && eh(t, e, o, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            e[Ye]?.finishViewCreation(t),
            t.staticContentQueries && sh(t, e),
            t.staticViewQueries && Gs(2, t.viewQuery, n);
        let i = t.components;
        i !== null && eE(e, i);
    } catch (r) {
        throw (
            (t.firstCreatePass &&
                ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            r)
        );
    } finally {
        (e[C] &= -5), za();
    }
}
function eE(t, e) {
    for (let n = 0; n < e.length; n++) JD(t, e[n]);
}
function tE(t, e, n, r) {
    let o = L(null);
    try {
        let i = e.tView,
            a = t[C] & 4096 ? 4096 : 16,
            u = Ko(
                t,
                i,
                n,
                a,
                null,
                e,
                null,
                null,
                null,
                r?.injector ?? null,
                r?.dehydratedView ?? null,
            ),
            l = t[e.index];
        u[or] = l;
        let c = t[Ye];
        return c !== null && (u[Ye] = c.createEmbeddedView(i)), du(i, u, n), u;
    } finally {
        L(o);
    }
}
function Uc(t, e) {
    return !e || e.firstChild === null || Eo(t);
}
function nE(t, e, n, r = !0) {
    let o = e[S];
    if ((fD(o, e, t, n), r)) {
        let s = zs(n, t),
            a = e[H],
            u = nu(a, t[Ze]);
        u !== null && cD(o, t[ge], a, e, u, s);
    }
    let i = e[Ie];
    i !== null && i.firstChild !== null && (i.firstChild = null);
}
function Io(t, e, n, r, o = !1) {
    for (; n !== null; ) {
        let i = e[n.index];
        i !== null && r.push(Fe(i)), Be(i) && rE(i, r);
        let s = n.type;
        if (s & 8) Io(t, e, n.child, r);
        else if (s & 32) {
            let a = Xa(n, e),
                u;
            for (; (u = a()); ) r.push(u);
        } else if (s & 16) {
            let a = Gf(e, n);
            if (Array.isArray(a)) r.push(...a);
            else {
                let u = Jn(e[me]);
                Io(u[S], u, a, r, !0);
            }
        }
        n = o ? n.projectionNext : n.next;
    }
    return r;
}
function rE(t, e) {
    for (let n = de; n < t.length; n++) {
        let r = t[n],
            o = r[S].firstChild;
        o !== null && Io(r[S], r, o, e);
    }
    t[Ze] !== t[pe] && e.push(t[Ze]);
}
var dh = [];
function oE(t) {
    return t[Lt] ?? iE(t);
}
function iE(t) {
    let e = dh.pop() ?? Object.create(aE);
    return (e.lView = t), e;
}
function sE(t) {
    t.lView[Lt] !== t && ((t.lView = null), dh.push(t));
}
var aE = It(Se({}, Ir), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
        Zn(t.lView);
    },
    consumerOnSignalRead() {
        this.lView[Lt] = this;
    },
});
function fh(t) {
    return ph(t[Kn]);
}
function hh(t) {
    return ph(t[Ne]);
}
function ph(t) {
    for (; t !== null && !Be(t); ) t = t[Ne];
    return t;
}
var mh = 100;
function gh(t, e = !0, n = 0) {
    let r = t[Oe],
        o = r.rendererFactory,
        i = !1;
    i || o.begin?.();
    try {
        uE(t, n);
    } catch (s) {
        throw (e && lh(t, s), s);
    } finally {
        i || (o.end?.(), r.inlineEffectRunner?.flush());
    }
}
function uE(t, e) {
    Ws(t, e);
    let n = 0;
    for (; La(t); ) {
        if (n === mh) throw new g(103, !1);
        n++, Ws(t, 1);
    }
}
function lE(t, e, n, r) {
    let o = e[C];
    if ((o & 256) === 256) return;
    let i = !1;
    !i && e[Oe].inlineEffectRunner?.flush(), Ua(e);
    let s = null,
        a = null;
    !i && cE(t) && ((a = oE(e)), (s = Ai(a)));
    try {
        Qd(e), Ry(t.bindingStartIndex), n !== null && eh(t, e, n, 2, r);
        let u = (o & 3) === 3;
        if (!i)
            if (u) {
                let d = t.preOrderCheckHooks;
                d !== null && io(e, d, null);
            } else {
                let d = t.preOrderHooks;
                d !== null && so(e, d, 0, null), es(e, 0);
            }
        if ((dE(e), yh(e, 0), t.contentQueries !== null && sh(t, e), !i))
            if (u) {
                let d = t.contentCheckHooks;
                d !== null && io(e, d);
            } else {
                let d = t.contentHooks;
                d !== null && so(e, d, 1), es(e, 1);
            }
        CD(t, e);
        let l = t.components;
        l !== null && Dh(e, l, 0);
        let c = t.viewQuery;
        if ((c !== null && Gs(2, c, r), !i))
            if (u) {
                let d = t.viewCheckHooks;
                d !== null && io(e, d);
            } else {
                let d = t.viewHooks;
                d !== null && so(e, d, 2), es(e, 2);
            }
        if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[Xi])) {
            for (let d of e[Xi]) d();
            e[Xi] = null;
        }
        i || (e[C] &= -73);
    } catch (u) {
        throw (Zn(e), u);
    } finally {
        a !== null && (Oi(a, s), sE(a)), za();
    }
}
function cE(t) {
    return t.type !== 2;
}
function yh(t, e) {
    for (let n = fh(t); n !== null; n = hh(n))
        for (let r = de; r < n.length; r++) {
            let o = n[r];
            vh(o, e);
        }
}
function dE(t) {
    for (let e = fh(t); e !== null; e = hh(e)) {
        if (!(e[C] & Oa.HasTransplantedViews)) continue;
        let n = e[yn];
        for (let r = 0; r < n.length; r++) {
            let o = n[r],
                i = o[ee];
            Iy(o);
        }
    }
}
function fE(t, e, n) {
    let r = gt(e, t);
    vh(r, n);
}
function vh(t, e) {
    ka(t) && Ws(t, e);
}
function Ws(t, e) {
    let r = t[S],
        o = t[C],
        i = t[Lt],
        s = !!(e === 0 && o & 16);
    if (
        ((s ||= !!(o & 64 && e === 0)),
        (s ||= !!(o & 1024)),
        (s ||= !!(i?.dirty && Fi(i))),
        i && (i.dirty = !1),
        (t[C] &= -9217),
        s)
    )
        lE(r, t, r.template, t[Ae]);
    else if (o & 8192) {
        yh(t, 1);
        let a = r.components;
        a !== null && Dh(t, a, 1);
    }
}
function Dh(t, e, n) {
    for (let r = 0; r < e.length; r++) fE(t, e[r], n);
}
function fu(t) {
    for (t[Oe].changeDetectionScheduler?.notify(); t; ) {
        t[C] |= 64;
        let e = Jn(t);
        if (Bd(t) && !e) return t;
        t = e;
    }
    return null;
}
var Ht = class {
        get rootNodes() {
            let e = this._lView,
                n = e[S];
            return Io(n, e, n.firstChild, []);
        }
        constructor(e, n, r = !0) {
            (this._lView = e),
                (this._cdRefInjectingView = n),
                (this.notifyErrorHandler = r),
                (this._appRef = null),
                (this._attachedToViewContainer = !1);
        }
        get context() {
            return this._lView[Ae];
        }
        set context(e) {
            this._lView[Ae] = e;
        }
        get destroyed() {
            return (this._lView[C] & 256) === 256;
        }
        destroy() {
            if (this._appRef) this._appRef.detachView(this);
            else if (this._attachedToViewContainer) {
                let e = this._lView[ee];
                if (Be(e)) {
                    let n = e[mo],
                        r = n ? n.indexOf(this) : -1;
                    r > -1 && (Us(e, r), ho(n, r));
                }
                this._attachedToViewContainer = !1;
            }
            Hf(this._lView[S], this._lView);
        }
        onDestroy(e) {
            Kd(this._lView, e);
        }
        markForCheck() {
            fu(this._cdRefInjectingView || this._lView);
        }
        detach() {
            this._lView[C] &= -129;
        }
        reattach() {
            _s(this._lView), (this._lView[C] |= 128);
        }
        detectChanges() {
            (this._lView[C] |= 1024), gh(this._lView, this.notifyErrorHandler);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
            if (this._appRef) throw new g(902, !1);
            this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
            (this._appRef = null), Bf(this._lView[S], this._lView);
        }
        attachToAppRef(e) {
            if (this._attachedToViewContainer) throw new g(902, !1);
            (this._appRef = e), _s(this._lView);
        }
    },
    Ut = (() => {
        let e = class e {};
        e.__NG_ELEMENT_ID__ = mE;
        let t = e;
        return t;
    })(),
    hE = Ut,
    pE = class extends hE {
        constructor(e, n, r) {
            super(),
                (this._declarationLView = e),
                (this._declarationTContainer = n),
                (this.elementRef = r);
        }
        get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
        }
        createEmbeddedView(e, n) {
            return this.createEmbeddedViewImpl(e, n);
        }
        createEmbeddedViewImpl(e, n, r) {
            let o = tE(this._declarationLView, this._declarationTContainer, e, {
                injector: n,
                dehydratedView: r,
            });
            return new Ht(o);
        }
    };
function mE() {
    return Zo(ue(), x());
}
function Zo(t, e) {
    return t.type & 4 ? new pE(e, t, Sn(t, e)) : null;
}
function Eh(t) {
    let e = t[Yn] ?? [],
        r = t[ee][H];
    for (let o of e) gE(o, r);
    t[Yn] = se;
}
function gE(t, e) {
    let n = 0,
        r = t.firstChild;
    if (r) {
        let o = t.data[wo];
        for (; n < o; ) {
            let i = r.nextSibling;
            ru(e, r, !1), (r = i), n++;
        }
    }
}
function wh(t) {
    Eh(t);
    for (let e = de; e < t.length; e++) _o(t[e]);
}
function yE(t) {
    let e = t[Ie]?.i18nNodes;
    if (e) {
        let n = t[H];
        for (let r of e.values()) ru(n, r, !1);
        t[Ie].i18nNodes = void 0;
    }
}
function _o(t) {
    yE(t);
    let e = t[S];
    for (let n = W; n < e.bindingStartIndex; n++)
        if (Be(t[n])) {
            let r = t[n];
            wh(r);
        } else Ke(t[n]) && _o(t[n]);
}
function vE(t) {
    let e = t._views;
    for (let n of e) {
        let r = Cv(n);
        if (r !== null && r[pe] !== null)
            if (Ke(r)) _o(r);
            else {
                let o = r[pe];
                _o(o), wh(r);
            }
    }
}
var DE = new RegExp(`^(\\d+)*(${If}|${bf})*(.*)`);
function EE(t) {
    let e = t.match(DE),
        [n, r, o, i] = e,
        s = r ? parseInt(r, 10) : o,
        a = [];
    for (let [u, l, c] of i.matchAll(/(f|n)(\d*)/g)) {
        let d = parseInt(c, 10) || 1;
        a.push(l, d);
    }
    return [s, ...a];
}
function wE(t) {
    return !t.prev && t.parent?.type === 8;
}
function ss(t) {
    return t.index - W;
}
function bE(t, e) {
    let n = t.i18nNodes;
    if (n) {
        let r = n.get(e);
        return r && n.delete(e), r;
    }
    return null;
}
function Jo(t, e, n, r) {
    let o = ss(r),
        i = bE(t, o);
    if (!i) {
        let s = t.data[Dv];
        if (s?.[o]) i = _E(s[o], n);
        else if (e.firstChild === r) i = t.firstChild;
        else {
            let a = r.prev === null,
                u = r.prev ?? r.parent;
            if (wE(r)) {
                let l = ss(r.parent);
                i = Ps(t, l);
            } else {
                let l = ye(u, n);
                if (a) i = l.firstChild;
                else {
                    let c = ss(u),
                        d = Ps(t, c);
                    if (u.type === 2 && d) {
                        let f = Ya(t, c) + 1;
                        i = Xo(f, d);
                    } else i = l.nextSibling;
                }
            }
        }
    }
    return i;
}
function Xo(t, e) {
    let n = e;
    for (let r = 0; r < t; r++) n = n.nextSibling;
    return n;
}
function IE(t, e) {
    let n = t;
    for (let r = 0; r < e.length; r += 2) {
        let o = e[r],
            i = e[r + 1];
        for (let s = 0; s < i; s++)
            switch (o) {
                case Fs.FirstChild:
                    n = n.firstChild;
                    break;
                case Fs.NextSibling:
                    n = n.nextSibling;
                    break;
            }
    }
    return n;
}
function _E(t, e) {
    let [n, ...r] = EE(t),
        o;
    if (n === bf) o = e[me][pe];
    else if (n === If) o = sD(e[me][pe]);
    else {
        let i = Number(n);
        o = Fe(e[i + W]);
    }
    return IE(o, r);
}
function CE(t, e) {
    let n = [];
    for (let r of e)
        for (let o = 0; o < (r[_f] ?? 1); o++) {
            let i = { data: r, firstChild: null };
            r[wo] > 0 && ((i.firstChild = t), (t = Xo(r[wo], t))), n.push(i);
        }
    return [t, n];
}
var bh = () => null;
function SE(t, e) {
    let n = t[Yn];
    return !e || n === null || n.length === 0
        ? null
        : n[0].data[vv] === e
          ? n.shift()
          : (Eh(t), null);
}
function TE() {
    bh = SE;
}
function zc(t, e) {
    return bh(t, e);
}
var Co = class {},
    Qs = class {},
    So = class {};
function ME(t) {
    let e = Error(`No component factory found for ${ae(t)}.`);
    return (e[xE] = t), e;
}
var xE = 'ngComponent';
var Ks = class {
        resolveComponentFactory(e) {
            throw ME(e);
        }
    },
    ei = (() => {
        let e = class e {};
        e.NULL = new Ks();
        let t = e;
        return t;
    })(),
    Ys = class {},
    ti = (() => {
        let e = class e {
            constructor() {
                this.destroyNode = null;
            }
        };
        e.__NG_ELEMENT_ID__ = () => NE();
        let t = e;
        return t;
    })();
function NE() {
    let t = x(),
        e = ue(),
        n = gt(e.index, t);
    return (Ke(n) ? n : t)[H];
}
var AE = (() => {
        let e = class e {};
        e.ɵprov = $({ token: e, providedIn: 'root', factory: () => null });
        let t = e;
        return t;
    })(),
    as = {};
var qc = new Set();
function xn(t) {
    qc.has(t) ||
        (qc.add(t),
        performance?.mark?.('mark_feature_usage', { detail: { feature: t } }));
}
function Gc(...t) {}
function OE() {
    let t = typeof be.requestAnimationFrame == 'function',
        e = be[t ? 'requestAnimationFrame' : 'setTimeout'],
        n = be[t ? 'cancelAnimationFrame' : 'clearTimeout'];
    if (typeof Zone < 'u' && e && n) {
        let r = e[Zone.__symbol__('OriginalDelegate')];
        r && (e = r);
        let o = n[Zone.__symbol__('OriginalDelegate')];
        o && (n = o);
    }
    return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: n };
}
var he = class t {
        constructor({
            enableLongStackTrace: e = !1,
            shouldCoalesceEventChangeDetection: n = !1,
            shouldCoalesceRunChangeDetection: r = !1,
        }) {
            if (
                ((this.hasPendingMacrotasks = !1),
                (this.hasPendingMicrotasks = !1),
                (this.isStable = !0),
                (this.onUnstable = new Ft(!1)),
                (this.onMicrotaskEmpty = new Ft(!1)),
                (this.onStable = new Ft(!1)),
                (this.onError = new Ft(!1)),
                typeof Zone > 'u')
            )
                throw new g(908, !1);
            Zone.assertZonePatched();
            let o = this;
            (o._nesting = 0),
                (o._outer = o._inner = Zone.current),
                Zone.TaskTrackingZoneSpec &&
                    (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
                e &&
                    Zone.longStackTraceZoneSpec &&
                    (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
                (o.shouldCoalesceEventChangeDetection = !r && n),
                (o.shouldCoalesceRunChangeDetection = r),
                (o.lastRequestAnimationFrameId = -1),
                (o.nativeRequestAnimationFrame =
                    OE().nativeRequestAnimationFrame),
                RE(o);
        }
        static isInAngularZone() {
            return (
                typeof Zone < 'u' && Zone.current.get('isAngularZone') === !0
            );
        }
        static assertInAngularZone() {
            if (!t.isInAngularZone()) throw new g(909, !1);
        }
        static assertNotInAngularZone() {
            if (t.isInAngularZone()) throw new g(909, !1);
        }
        run(e, n, r) {
            return this._inner.run(e, n, r);
        }
        runTask(e, n, r, o) {
            let i = this._inner,
                s = i.scheduleEventTask('NgZoneEvent: ' + o, e, FE, Gc, Gc);
            try {
                return i.runTask(s, n, r);
            } finally {
                i.cancelTask(s);
            }
        }
        runGuarded(e, n, r) {
            return this._inner.runGuarded(e, n, r);
        }
        runOutsideAngular(e) {
            return this._outer.run(e);
        }
    },
    FE = {};
function hu(t) {
    if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
        try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
        } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
                try {
                    t.runOutsideAngular(() => t.onStable.emit(null));
                } finally {
                    t.isStable = !0;
                }
        }
}
function PE(t) {
    t.isCheckStableRunning ||
        t.lastRequestAnimationFrameId !== -1 ||
        ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
            be,
            () => {
                t.fakeTopEventTask ||
                    (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                        'fakeTopEventTask',
                        () => {
                            (t.lastRequestAnimationFrameId = -1),
                                Zs(t),
                                (t.isCheckStableRunning = !0),
                                hu(t),
                                (t.isCheckStableRunning = !1);
                        },
                        void 0,
                        () => {},
                        () => {},
                    )),
                    t.fakeTopEventTask.invoke();
            },
        )),
        Zs(t));
}
function RE(t) {
    let e = () => {
        PE(t);
    };
    t._inner = t._inner.fork({
        name: 'angular',
        properties: { isAngularZone: !0 },
        onInvokeTask: (n, r, o, i, s, a) => {
            if (kE(a)) return n.invokeTask(o, i, s, a);
            try {
                return Wc(t), n.invokeTask(o, i, s, a);
            } finally {
                ((t.shouldCoalesceEventChangeDetection &&
                    i.type === 'eventTask') ||
                    t.shouldCoalesceRunChangeDetection) &&
                    e(),
                    Qc(t);
            }
        },
        onInvoke: (n, r, o, i, s, a, u) => {
            try {
                return Wc(t), n.invoke(o, i, s, a, u);
            } finally {
                t.shouldCoalesceRunChangeDetection && e(), Qc(t);
            }
        },
        onHasTask: (n, r, o, i) => {
            n.hasTask(o, i),
                r === o &&
                    (i.change == 'microTask'
                        ? ((t._hasPendingMicrotasks = i.microTask),
                          Zs(t),
                          hu(t))
                        : i.change == 'macroTask' &&
                          (t.hasPendingMacrotasks = i.macroTask));
        },
        onHandleError: (n, r, o, i) => (
            n.handleError(o, i),
            t.runOutsideAngular(() => t.onError.emit(i)),
            !1
        ),
    });
}
function Zs(t) {
    t._hasPendingMicrotasks ||
    ((t.shouldCoalesceEventChangeDetection ||
        t.shouldCoalesceRunChangeDetection) &&
        t.lastRequestAnimationFrameId !== -1)
        ? (t.hasPendingMicrotasks = !0)
        : (t.hasPendingMicrotasks = !1);
}
function Wc(t) {
    t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function Qc(t) {
    t._nesting--, hu(t);
}
function kE(t) {
    return !Array.isArray(t) || t.length !== 1
        ? !1
        : t[0].data?.__ignore_ng_zone__ === !0;
}
var dn = (function (t) {
        return (
            (t[(t.EarlyRead = 0)] = 'EarlyRead'),
            (t[(t.Write = 1)] = 'Write'),
            (t[(t.MixedReadWrite = 2)] = 'MixedReadWrite'),
            (t[(t.Read = 3)] = 'Read'),
            t
        );
    })(dn || {}),
    LE = { destroy() {} };
function jE(t, e) {
    !e && hy(jE);
    let n = e?.injector ?? O(Cn);
    if (!$n(n)) return LE;
    xn('NgAfterNextRender');
    let r = n.get(pu),
        o = (r.handler ??= new Xs()),
        i = e?.phase ?? dn.MixedReadWrite,
        s = () => {
            o.unregister(u), a();
        },
        a = n.get(Ga).onDestroy(s),
        u = fy(
            n,
            () =>
                new Js(i, () => {
                    s(), t();
                }),
        );
    return o.register(u), { destroy: s };
}
var Js = class {
        constructor(e, n) {
            (this.phase = e),
                (this.callbackFn = n),
                (this.zone = O(he)),
                (this.errorHandler = O($t, { optional: !0 })),
                O(Co, { optional: !0 })?.notify(1);
        }
        invoke() {
            try {
                this.zone.runOutsideAngular(this.callbackFn);
            } catch (e) {
                this.errorHandler?.handleError(e);
            }
        }
    },
    Xs = class {
        constructor() {
            (this.executingCallbacks = !1),
                (this.buckets = {
                    [dn.EarlyRead]: new Set(),
                    [dn.Write]: new Set(),
                    [dn.MixedReadWrite]: new Set(),
                    [dn.Read]: new Set(),
                }),
                (this.deferredCallbacks = new Set());
        }
        register(e) {
            (this.executingCallbacks
                ? this.deferredCallbacks
                : this.buckets[e.phase]
            ).add(e);
        }
        unregister(e) {
            this.buckets[e.phase].delete(e), this.deferredCallbacks.delete(e);
        }
        execute() {
            this.executingCallbacks = !0;
            for (let e of Object.values(this.buckets))
                for (let n of e) n.invoke();
            this.executingCallbacks = !1;
            for (let e of this.deferredCallbacks) this.buckets[e.phase].add(e);
            this.deferredCallbacks.clear();
        }
        destroy() {
            for (let e of Object.values(this.buckets)) e.clear();
            this.deferredCallbacks.clear();
        }
    },
    pu = (() => {
        let e = class e {
            constructor() {
                (this.handler = null), (this.internalCallbacks = []);
            }
            execute() {
                this.executeInternalCallbacks(), this.handler?.execute();
            }
            executeInternalCallbacks() {
                let r = [...this.internalCallbacks];
                this.internalCallbacks.length = 0;
                for (let o of r) o();
            }
            ngOnDestroy() {
                this.handler?.destroy(),
                    (this.handler = null),
                    (this.internalCallbacks.length = 0);
            }
        };
        e.ɵprov = $({ token: e, providedIn: 'root', factory: () => new e() });
        let t = e;
        return t;
    })();
function To(t, e, n) {
    let r = n ? t.styles : null,
        o = n ? t.classes : null,
        i = 0;
    if (e !== null)
        for (let s = 0; s < e.length; s++) {
            let a = e[s];
            if (typeof a == 'number') i = a;
            else if (i == 1) o = ms(o, a);
            else if (i == 2) {
                let u = a,
                    l = e[++s];
                r = ms(r, u + ': ' + l + ';');
            }
        }
    n ? (t.styles = r) : (t.stylesWithoutHost = r),
        n ? (t.classes = o) : (t.classesWithoutHost = o);
}
var Mo = class extends ei {
    constructor(e) {
        super(), (this.ngModule = e);
    }
    resolveComponentFactory(e) {
        let n = dt(e);
        return new Dn(n, this.ngModule);
    }
};
function Kc(t) {
    let e = [];
    for (let n in t) {
        if (!t.hasOwnProperty(n)) continue;
        let r = t[n];
        r !== void 0 &&
            e.push({ propName: Array.isArray(r) ? r[0] : r, templateName: n });
    }
    return e;
}
function VE(t) {
    let e = t.toLowerCase();
    return e === 'svg' ? qd : e === 'math' ? vy : null;
}
var ea = class {
        constructor(e, n) {
            (this.injector = e), (this.parentInjector = n);
        }
        get(e, n, r) {
            r = Ro(r);
            let o = this.injector.get(e, as, r);
            return o !== as || n === as ? o : this.parentInjector.get(e, n, r);
        }
    },
    Dn = class extends So {
        get inputs() {
            let e = this.componentDef,
                n = e.inputTransforms,
                r = Kc(e.inputs);
            if (n !== null)
                for (let o of r)
                    n.hasOwnProperty(o.propName) &&
                        (o.transform = n[o.propName]);
            return r;
        }
        get outputs() {
            return Kc(this.componentDef.outputs);
        }
        constructor(e, n) {
            super(),
                (this.componentDef = e),
                (this.ngModule = n),
                (this.componentType = e.type),
                (this.selector = Kg(e.selectors)),
                (this.ngContentSelectors = e.ngContentSelectors
                    ? e.ngContentSelectors
                    : []),
                (this.isBoundToModule = !!n);
        }
        create(e, n, r, o) {
            let i = L(null);
            try {
                o = o || this.ngModule;
                let s = o instanceof ft ? o : o?.injector;
                s &&
                    this.componentDef.getStandaloneInjector !== null &&
                    (s = this.componentDef.getStandaloneInjector(s) || s);
                let a = s ? new ea(e, s) : e,
                    u = a.get(Ys, null);
                if (u === null) throw new g(407, !1);
                let l = a.get(AE, null),
                    c = a.get(pu, null),
                    d = a.get(Co, null),
                    h = {
                        rendererFactory: u,
                        sanitizer: l,
                        inlineEffectRunner: null,
                        afterRenderEventManager: c,
                        changeDetectionScheduler: d,
                    },
                    f = u.createRenderer(null, this.componentDef),
                    p = this.componentDef.selectors[0][0] || 'div',
                    m = r
                        ? MD(f, r, this.componentDef.encapsulation, a)
                        : Go(f, p, VE(p)),
                    b = 512;
                this.componentDef.signals
                    ? (b |= 4096)
                    : this.componentDef.onPush || (b |= 16);
                let w = null;
                m !== null && (w = Ka(m, a, !0));
                let N = uu(
                        0,
                        null,
                        null,
                        1,
                        0,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                    ),
                    R = Ko(null, N, null, b, null, null, h, f, a, null, w);
                Ua(R);
                let j, te;
                try {
                    let z = this.componentDef,
                        q,
                        Y = null;
                    z.findHostDirectiveDefs
                        ? ((q = []),
                          (Y = new Map()),
                          z.findHostDirectiveDefs(z, q, Y),
                          q.push(z))
                        : (q = [z]);
                    let ze = BE(R, m),
                        ot = $E(ze, m, z, q, R, h, f);
                    (te = Wd(N, W)),
                        m && zE(f, z, m, r),
                        n !== void 0 && qE(te, this.ngContentSelectors, n),
                        (j = UE(ot, z, q, Y, R, [GE])),
                        du(N, R, null);
                } finally {
                    za();
                }
                return new ta(this.componentType, j, Sn(te, R), R, te);
            } finally {
                L(i);
            }
        }
    },
    ta = class extends Qs {
        constructor(e, n, r, o, i) {
            super(),
                (this.location = r),
                (this._rootLView = o),
                (this._tNode = i),
                (this.previousInputValues = null),
                (this.instance = n),
                (this.hostView = this.changeDetectorRef =
                    new Ht(o, void 0, !1)),
                (this.componentType = e);
        }
        setInput(e, n) {
            let r = this._tNode.inputs,
                o;
            if (r !== null && (o = r[e])) {
                if (
                    ((this.previousInputValues ??= new Map()),
                    this.previousInputValues.has(e) &&
                        Object.is(this.previousInputValues.get(e), n))
                )
                    return;
                let i = this._rootLView;
                cu(i[S], i, o, e, n), this.previousInputValues.set(e, n);
                let s = gt(this._tNode.index, i);
                fu(s);
            }
        }
        get injector() {
            return new Pt(this._tNode, this._rootLView);
        }
        destroy() {
            this.hostView.destroy();
        }
        onDestroy(e) {
            this.hostView.onDestroy(e);
        }
    };
function BE(t, e) {
    let n = t[S],
        r = W;
    return (t[r] = e), Mn(n, r, 2, '#host', null);
}
function $E(t, e, n, r, o, i, s) {
    let a = o[S];
    HE(r, t, e, s);
    let u = null;
    e !== null && (u = Ka(e, o[gn]));
    let l = i.rendererFactory.createRenderer(e, n),
        c = 16;
    n.signals ? (c = 4096) : n.onPush && (c = 64);
    let d = Ko(o, th(n), null, c, o[t.index], t, i, l, null, null, u);
    return (
        a.firstCreatePass && qs(a, t, r.length - 1), Yo(o, d), (o[t.index] = d)
    );
}
function HE(t, e, n, r) {
    for (let o of t) e.mergedAttrs = Gn(e.mergedAttrs, o.hostAttrs);
    e.mergedAttrs !== null &&
        (To(e, e.mergedAttrs, !0), n !== null && Yf(r, n, e));
}
function UE(t, e, n, r, o, i) {
    let s = ue(),
        a = o[S],
        u = ye(s, o);
    rh(a, o, s, n, null, r);
    for (let c = 0; c < n.length; c++) {
        let d = s.directiveStart + c,
            h = Bt(o, a, d, s);
        pt(h, o);
    }
    oh(a, o, s), u && pt(u, o);
    let l = Bt(o, a, s.directiveStart + s.componentOffset, s);
    if (((t[Ae] = o[Ae] = l), i !== null)) for (let c of i) c(l, e);
    return iu(a, s, o), l;
}
function zE(t, e, n, r) {
    if (r) Ds(t, n, ['ng-version', '17.3.0']);
    else {
        let { attrs: o, classes: i } = Yg(e.selectors[0]);
        o && Ds(t, n, o), i && i.length > 0 && Kf(t, n, i.join(' '));
    }
}
function qE(t, e, n) {
    let r = (t.projection = []);
    for (let o = 0; o < e.length; o++) {
        let i = n[o];
        r.push(i != null ? Array.from(i) : null);
    }
}
function GE() {
    let t = ue();
    Bo(x()[S], t);
}
var Gt = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = WE;
    let t = e;
    return t;
})();
function WE() {
    let t = ue();
    return _h(t, x());
}
var QE = Gt,
    Ih = class extends QE {
        constructor(e, n, r) {
            super(),
                (this._lContainer = e),
                (this._hostTNode = n),
                (this._hostLView = r);
        }
        get element() {
            return Sn(this._hostTNode, this._hostLView);
        }
        get injector() {
            return new Pt(this._hostTNode, this._hostLView);
        }
        get parentInjector() {
            let e = qa(this._hostTNode, this._hostLView);
            if (lf(e)) {
                let n = yo(e, this._hostLView),
                    r = go(e),
                    o = n[S].data[r + 8];
                return new Pt(o, n);
            } else return new Pt(null, this._hostLView);
        }
        clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
        }
        get(e) {
            let n = Yc(this._lContainer);
            return (n !== null && n[e]) || null;
        }
        get length() {
            return this._lContainer.length - de;
        }
        createEmbeddedView(e, n, r) {
            let o, i;
            typeof r == 'number'
                ? (o = r)
                : r != null && ((o = r.index), (i = r.injector));
            let s = zc(this._lContainer, e.ssrId),
                a = e.createEmbeddedViewImpl(n || {}, i, s);
            return this.insertImpl(a, o, Uc(this._hostTNode, s)), a;
        }
        createComponent(e, n, r, o, i) {
            let s = e && !py(e),
                a;
            if (s) a = n;
            else {
                let p = n || {};
                (a = p.index),
                    (r = p.injector),
                    (o = p.projectableNodes),
                    (i = p.environmentInjector || p.ngModuleRef);
            }
            let u = s ? e : new Dn(dt(e)),
                l = r || this.parentInjector;
            if (!i && u.ngModule == null) {
                let m = (s ? l : this.parentInjector).get(ft, null);
                m && (i = m);
            }
            let c = dt(u.componentType ?? {}),
                d = zc(this._lContainer, c?.id ?? null),
                h = d?.firstChild ?? null,
                f = u.create(l, o, h, i);
            return this.insertImpl(f.hostView, a, Uc(this._hostTNode, d)), f;
        }
        insert(e, n) {
            return this.insertImpl(e, n, !0);
        }
        insertImpl(e, n, r) {
            let o = e._lView;
            if (by(o)) {
                let a = this.indexOf(e);
                if (a !== -1) this.detach(a);
                else {
                    let u = o[ee],
                        l = new Ih(u, u[ge], u[ee]);
                    l.detach(l.indexOf(e));
                }
            }
            let i = this._adjustIndex(n),
                s = this._lContainer;
            return (
                nE(s, o, i, r), e.attachToViewContainerRef(), vd(us(s), i, e), e
            );
        }
        move(e, n) {
            return this.insert(e, n);
        }
        indexOf(e) {
            let n = Yc(this._lContainer);
            return n !== null ? n.indexOf(e) : -1;
        }
        remove(e) {
            let n = this._adjustIndex(e, -1),
                r = Us(this._lContainer, n);
            r && (ho(us(this._lContainer), n), Hf(r[S], r));
        }
        detach(e) {
            let n = this._adjustIndex(e, -1),
                r = Us(this._lContainer, n);
            return r && ho(us(this._lContainer), n) != null ? new Ht(r) : null;
        }
        _adjustIndex(e, n = 0) {
            return e ?? this.length + n;
        }
    };
function Yc(t) {
    return t[mo];
}
function us(t) {
    return t[mo] || (t[mo] = []);
}
function _h(t, e) {
    let n,
        r = e[t.index];
    return (
        Be(r) ? (n = r) : ((n = ih(r, e, null, t)), (e[t.index] = n), Yo(e, n)),
        Ch(n, e, t, r),
        new Ih(n, t, e)
    );
}
function KE(t, e) {
    let n = t[H],
        r = n.createComment(''),
        o = ye(e, t),
        i = nu(n, o);
    return bo(n, i, r, vD(n, o), !1), r;
}
var Ch = Sh,
    mu = () => !1;
function YE(t, e, n) {
    return mu(t, e, n);
}
function Sh(t, e, n, r) {
    if (t[Ze]) return;
    let o;
    n.type & 8 ? (o = Fe(r)) : (o = KE(e, n)), (t[Ze] = o);
}
function ZE(t, e, n) {
    if (t[Ze] && t[Yn]) return !0;
    let r = n[Ie],
        o = e.index - W;
    if (!r || cv(e) || Uo(r, o)) return !1;
    let s = Ps(r, o),
        a = r.data[Qa]?.[o],
        [u, l] = CE(s, a);
    return (t[Ze] = u), (t[Yn] = l), !0;
}
function JE(t, e, n, r) {
    mu(t, n, e) || Sh(t, e, n, r);
}
function XE() {
    (Ch = JE), (mu = ZE);
}
var na = class t {
        constructor(e) {
            (this.queryList = e), (this.matches = null);
        }
        clone() {
            return new t(this.queryList);
        }
        setDirty() {
            this.queryList.setDirty();
        }
    },
    ra = class t {
        constructor(e = []) {
            this.queries = e;
        }
        createEmbeddedView(e) {
            let n = e.queries;
            if (n !== null) {
                let r =
                        e.contentQueries !== null
                            ? e.contentQueries[0]
                            : n.length,
                    o = [];
                for (let i = 0; i < r; i++) {
                    let s = n.getByIndex(i),
                        a = this.queries[s.indexInDeclarationView];
                    o.push(a.clone());
                }
                return new t(o);
            }
            return null;
        }
        insertView(e) {
            this.dirtyQueriesWithMatches(e);
        }
        detachView(e) {
            this.dirtyQueriesWithMatches(e);
        }
        finishViewCreation(e) {
            this.dirtyQueriesWithMatches(e);
        }
        dirtyQueriesWithMatches(e) {
            for (let n = 0; n < this.queries.length; n++)
                gu(e, n).matches !== null && this.queries[n].setDirty();
        }
    },
    xo = class {
        constructor(e, n, r = null) {
            (this.flags = n),
                (this.read = r),
                typeof e == 'string'
                    ? (this.predicate = aw(e))
                    : (this.predicate = e);
        }
    },
    oa = class t {
        constructor(e = []) {
            this.queries = e;
        }
        elementStart(e, n) {
            for (let r = 0; r < this.queries.length; r++)
                this.queries[r].elementStart(e, n);
        }
        elementEnd(e) {
            for (let n = 0; n < this.queries.length; n++)
                this.queries[n].elementEnd(e);
        }
        embeddedTView(e) {
            let n = null;
            for (let r = 0; r < this.length; r++) {
                let o = n !== null ? n.length : 0,
                    i = this.getByIndex(r).embeddedTView(e, o);
                i &&
                    ((i.indexInDeclarationView = r),
                    n !== null ? n.push(i) : (n = [i]));
            }
            return n !== null ? new t(n) : null;
        }
        template(e, n) {
            for (let r = 0; r < this.queries.length; r++)
                this.queries[r].template(e, n);
        }
        getByIndex(e) {
            return this.queries[e];
        }
        get length() {
            return this.queries.length;
        }
        track(e) {
            this.queries.push(e);
        }
    },
    ia = class t {
        constructor(e, n = -1) {
            (this.metadata = e),
                (this.matches = null),
                (this.indexInDeclarationView = -1),
                (this.crossesNgTemplate = !1),
                (this._appliesToNextNode = !0),
                (this._declarationNodeIndex = n);
        }
        elementStart(e, n) {
            this.isApplyingToNode(n) && this.matchTNode(e, n);
        }
        elementEnd(e) {
            this._declarationNodeIndex === e.index &&
                (this._appliesToNextNode = !1);
        }
        template(e, n) {
            this.elementStart(e, n);
        }
        embeddedTView(e, n) {
            return this.isApplyingToNode(e)
                ? ((this.crossesNgTemplate = !0),
                  this.addMatch(-e.index, n),
                  new t(this.metadata))
                : null;
        }
        isApplyingToNode(e) {
            if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
                let n = this._declarationNodeIndex,
                    r = e.parent;
                for (; r !== null && r.type & 8 && r.index !== n; )
                    r = r.parent;
                return n === (r !== null ? r.index : -1);
            }
            return this._appliesToNextNode;
        }
        matchTNode(e, n) {
            let r = this.metadata.predicate;
            if (Array.isArray(r))
                for (let o = 0; o < r.length; o++) {
                    let i = r[o];
                    this.matchTNodeWithReadOption(e, n, ew(n, i)),
                        this.matchTNodeWithReadOption(
                            e,
                            n,
                            ao(n, e, i, !1, !1),
                        );
                }
            else
                r === Ut
                    ? n.type & 4 && this.matchTNodeWithReadOption(e, n, -1)
                    : this.matchTNodeWithReadOption(e, n, ao(n, e, r, !1, !1));
        }
        matchTNodeWithReadOption(e, n, r) {
            if (r !== null) {
                let o = this.metadata.read;
                if (o !== null)
                    if (o === vt || o === Gt || (o === Ut && n.type & 4))
                        this.addMatch(n.index, -2);
                    else {
                        let i = ao(n, e, o, !1, !1);
                        i !== null && this.addMatch(n.index, i);
                    }
                else this.addMatch(n.index, r);
            }
        }
        addMatch(e, n) {
            this.matches === null
                ? (this.matches = [e, n])
                : this.matches.push(e, n);
        }
    };
function ew(t, e) {
    let n = t.localNames;
    if (n !== null) {
        for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
    }
    return null;
}
function tw(t, e) {
    return t.type & 11 ? Sn(t, e) : t.type & 4 ? Zo(t, e) : null;
}
function nw(t, e, n, r) {
    return n === -1 ? tw(e, t) : n === -2 ? rw(t, e, r) : Bt(t, t[S], n, e);
}
function rw(t, e, n) {
    if (n === vt) return Sn(e, t);
    if (n === Ut) return Zo(e, t);
    if (n === Gt) return _h(e, t);
}
function Th(t, e, n, r) {
    let o = e[Ye].queries[r];
    if (o.matches === null) {
        let i = t.data,
            s = n.matches,
            a = [];
        for (let u = 0; s !== null && u < s.length; u += 2) {
            let l = s[u];
            if (l < 0) a.push(null);
            else {
                let c = i[l];
                a.push(nw(e, c, s[u + 1], n.metadata.read));
            }
        }
        o.matches = a;
    }
    return o.matches;
}
function sa(t, e, n, r) {
    let o = t.queries.getByIndex(n),
        i = o.matches;
    if (i !== null) {
        let s = Th(t, e, o, n);
        for (let a = 0; a < i.length; a += 2) {
            let u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
                let l = i[a + 1],
                    c = e[-u];
                for (let d = de; d < c.length; d++) {
                    let h = c[d];
                    h[or] === h[ee] && sa(h[S], h, l, r);
                }
                if (c[yn] !== null) {
                    let d = c[yn];
                    for (let h = 0; h < d.length; h++) {
                        let f = d[h];
                        sa(f[S], f, l, r);
                    }
                }
            }
        }
    }
    return r;
}
function ow(t, e) {
    return t[Ye].queries[e].queryList;
}
function Mh(t, e, n) {
    let r = new As((n & 4) === 4);
    return (
        OD(t, e, r, r.destroy), (e[Ye] ??= new ra()).queries.push(new na(r)) - 1
    );
}
function iw(t, e, n) {
    let r = Q();
    return (
        r.firstCreatePass &&
            (xh(r, new xo(t, e, n), -1),
            (e & 2) === 2 && (r.staticViewQueries = !0)),
        Mh(r, x(), e)
    );
}
function sw(t, e, n, r) {
    let o = Q();
    if (o.firstCreatePass) {
        let i = ue();
        xh(o, new xo(e, n, r), i.index),
            uw(o, t),
            (n & 2) === 2 && (o.staticContentQueries = !0);
    }
    return Mh(o, x(), n);
}
function aw(t) {
    return t.split(',').map((e) => e.trim());
}
function xh(t, e, n) {
    t.queries === null && (t.queries = new oa()), t.queries.track(new ia(e, n));
}
function uw(t, e) {
    let n = t.contentQueries || (t.contentQueries = []),
        r = n.length ? n[n.length - 1] : -1;
    e !== r && n.push(t.queries.length - 1, e);
}
function gu(t, e) {
    return t.queries.getByIndex(e);
}
function lw(t, e) {
    let n = t[S],
        r = gu(n, e);
    return r.crossesNgTemplate ? sa(n, t, e, []) : Th(n, t, r, e);
}
function YO(t, e) {
    xn('NgSignals');
    let n = jl(t),
        r = n[st];
    return (
        e?.equal && (r.equal = e.equal),
        (n.set = (o) => Pi(r, o)),
        (n.update = (o) => Vl(r, o)),
        (n.asReadonly = cw.bind(n)),
        n
    );
}
function cw() {
    let t = this[st];
    if (t.readonlyFn === void 0) {
        let e = () => this();
        (e[st] = t), (t.readonlyFn = e);
    }
    return t.readonlyFn;
}
function dw(t) {
    return Object.getPrototypeOf(t.prototype).constructor;
}
function fw(t) {
    let e = dw(t.type),
        n = !0,
        r = [t];
    for (; e; ) {
        let o;
        if (ht(t)) o = e.ɵcmp || e.ɵdir;
        else {
            if (e.ɵcmp) throw new g(903, !1);
            o = e.ɵdir;
        }
        if (o) {
            if (n) {
                r.push(o);
                let s = t;
                (s.inputs = to(t.inputs)),
                    (s.inputTransforms = to(t.inputTransforms)),
                    (s.declaredInputs = to(t.declaredInputs)),
                    (s.outputs = to(t.outputs));
                let a = o.hostBindings;
                a && yw(t, a);
                let u = o.viewQuery,
                    l = o.contentQueries;
                if (
                    (u && mw(t, u),
                    l && gw(t, l),
                    hw(t, o),
                    pg(t.outputs, o.outputs),
                    ht(o) && o.data.animation)
                ) {
                    let c = t.data;
                    c.animation = (c.animation || []).concat(o.data.animation);
                }
            }
            let i = o.features;
            if (i)
                for (let s = 0; s < i.length; s++) {
                    let a = i[s];
                    a && a.ngInherit && a(t), a === fw && (n = !1);
                }
        }
        e = Object.getPrototypeOf(e);
    }
    pw(r);
}
function hw(t, e) {
    for (let n in e.inputs) {
        if (!e.inputs.hasOwnProperty(n) || t.inputs.hasOwnProperty(n)) continue;
        let r = e.inputs[n];
        if (
            r !== void 0 &&
            ((t.inputs[n] = r),
            (t.declaredInputs[n] = e.declaredInputs[n]),
            e.inputTransforms !== null)
        ) {
            let o = Array.isArray(r) ? r[0] : r;
            if (!e.inputTransforms.hasOwnProperty(o)) continue;
            (t.inputTransforms ??= {}),
                (t.inputTransforms[o] = e.inputTransforms[o]);
        }
    }
}
function pw(t) {
    let e = 0,
        n = null;
    for (let r = t.length - 1; r >= 0; r--) {
        let o = t[r];
        (o.hostVars = e += o.hostVars),
            (o.hostAttrs = Gn(o.hostAttrs, (n = Gn(n, o.hostAttrs))));
    }
}
function to(t) {
    return t === pn ? {} : t === se ? [] : t;
}
function mw(t, e) {
    let n = t.viewQuery;
    n
        ? (t.viewQuery = (r, o) => {
              e(r, o), n(r, o);
          })
        : (t.viewQuery = e);
}
function gw(t, e) {
    let n = t.contentQueries;
    n
        ? (t.contentQueries = (r, o, i) => {
              e(r, o, i), n(r, o, i);
          })
        : (t.contentQueries = e);
}
function yw(t, e) {
    let n = t.hostBindings;
    n
        ? (t.hostBindings = (r, o) => {
              e(r, o), n(r, o);
          })
        : (t.hostBindings = e);
}
function vw(t) {
    let e = t.inputConfig,
        n = {};
    for (let r in e)
        if (e.hasOwnProperty(r)) {
            let o = e[r];
            Array.isArray(o) && o[3] && (n[r] = o[3]);
        }
    t.inputTransforms = n;
}
var mt = class {},
    aa = class {};
var ua = class extends mt {
        constructor(e, n, r) {
            super(),
                (this._parent = n),
                (this._bootstrapComponents = []),
                (this.destroyCbs = []),
                (this.componentFactoryResolver = new Mo(this));
            let o = Md(e);
            (this._bootstrapComponents = Vf(o.bootstrap)),
                (this._r3Injector = vf(
                    e,
                    n,
                    [
                        { provide: mt, useValue: this },
                        {
                            provide: ei,
                            useValue: this.componentFactoryResolver,
                        },
                        ...r,
                    ],
                    ae(e),
                    new Set(['environment']),
                )),
                this._r3Injector.resolveInjectorInitializers(),
                (this.instance = this._r3Injector.get(e));
        }
        get injector() {
            return this._r3Injector;
        }
        destroy() {
            let e = this._r3Injector;
            !e.destroyed && e.destroy(),
                this.destroyCbs.forEach((n) => n()),
                (this.destroyCbs = null);
        }
        onDestroy(e) {
            this.destroyCbs.push(e);
        }
    },
    la = class extends aa {
        constructor(e) {
            super(), (this.moduleType = e);
        }
        create(e) {
            return new ua(this.moduleType, e, []);
        }
    };
var No = class extends mt {
    constructor(e) {
        super(),
            (this.componentFactoryResolver = new Mo(this)),
            (this.instance = null);
        let n = new Wn(
            [
                ...e.providers,
                { provide: mt, useValue: this },
                { provide: ei, useValue: this.componentFactoryResolver },
            ],
            e.parent || Aa(),
            e.debugName,
            new Set(['environment']),
        );
        (this.injector = n),
            e.runEnvironmentInitializers && n.resolveInjectorInitializers();
    }
    destroy() {
        this.injector.destroy();
    }
    onDestroy(e) {
        this.injector.onDestroy(e);
    }
};
function Dw(t, e, n = null) {
    return new No({
        providers: t,
        parent: e,
        debugName: n,
        runEnvironmentInitializers: !0,
    }).injector;
}
var Nh = (() => {
    let e = class e {
        constructor() {
            (this.taskId = 0),
                (this.pendingTasks = new Set()),
                (this.hasPendingTasks = new Pn(!1));
        }
        get _hasPendingTasks() {
            return this.hasPendingTasks.value;
        }
        add() {
            this._hasPendingTasks || this.hasPendingTasks.next(!0);
            let r = this.taskId++;
            return this.pendingTasks.add(r), r;
        }
        remove(r) {
            this.pendingTasks.delete(r),
                this.pendingTasks.size === 0 &&
                    this._hasPendingTasks &&
                    this.hasPendingTasks.next(!1);
        }
        ngOnDestroy() {
            this.pendingTasks.clear(),
                this._hasPendingTasks && this.hasPendingTasks.next(!1);
        }
    };
    (e.ɵfac = function (o) {
        return new (o || e)();
    }),
        (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
function Ah(t) {
    return yu(t)
        ? Array.isArray(t) || (!(t instanceof Map) && Symbol.iterator in t)
        : !1;
}
function Ew(t, e) {
    if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n]);
    else {
        let n = t[Symbol.iterator](),
            r;
        for (; !(r = n.next()).done; ) e(r.value);
    }
}
function yu(t) {
    return t !== null && (typeof t == 'function' || typeof t == 'object');
}
function ur(t, e, n) {
    return (t[e] = n);
}
function ww(t, e) {
    return t[e];
}
function Xe(t, e, n) {
    let r = t[e];
    return Object.is(r, n) ? !1 : ((t[e] = n), !0);
}
function er(t, e, n, r) {
    let o = Xe(t, e, n);
    return Xe(t, e + 1, r) || o;
}
function bw(t, e, n, r, o) {
    let i = er(t, e, n, r);
    return Xe(t, e + 2, o) || i;
}
function Iw(t, e, n, r, o, i) {
    let s = er(t, e, n, r);
    return er(t, e + 2, o, i) || s;
}
function lr(t) {
    return (t.flags & 32) === 32;
}
function _w(t, e, n, r, o, i, s, a, u) {
    let l = e.consts,
        c = Mn(e, t, 4, s || null, vn(l, a));
    lu(e, n, c, vn(l, u)), Bo(e, c);
    let d = (c.tView = uu(
        2,
        c,
        r,
        o,
        i,
        e.directiveRegistry,
        e.pipeRegistry,
        null,
        e.schemas,
        l,
        null,
    ));
    return (
        e.queries !== null &&
            (e.queries.template(e, c),
            (d.queries = e.queries.embeddedTView(c))),
        c
    );
}
function Cw(t, e, n, r, o, i, s, a) {
    let u = x(),
        l = Q(),
        c = t + W,
        d = l.firstCreatePass ? _w(c, l, u, e, n, r, o, i, s) : l.data[c];
    qt(d, !1);
    let h = Oh(l, u, d, t);
    Vo() && Wo(l, u, h, d), pt(h, u);
    let f = ih(h, u, h, d);
    return (
        (u[c] = f),
        Yo(u, f),
        YE(f, d, u),
        jo(d) && su(l, u, d),
        s != null && au(u, d, a),
        Cw
    );
}
var Oh = Fh;
function Fh(t, e, n, r) {
    return $e(!0), e[H].createComment('');
}
function Sw(t, e, n, r) {
    let o = e[Ie],
        i = !o || In() || lr(n) || Uo(o, r);
    if (($e(i), i)) return Fh(t, e, n, r);
    let s = o.data[yv]?.[r] ?? null;
    s !== null &&
        n.tView !== null &&
        n.tView.ssrId === null &&
        (n.tView.ssrId = s);
    let a = Jo(o, t, e, n);
    Ho(o, r, a);
    let u = Ya(o, r);
    return Xo(u, a);
}
function Tw() {
    Oh = Sw;
}
function Mw(t, e, n, r) {
    let o = x(),
        i = Ba();
    if (Xe(o, i, e)) {
        let s = Q(),
            a = of();
        QD(a, o, t, e, n, r);
    }
    return Mw;
}
function xw(t, e, n, r) {
    return Xe(t, Ba(), n) ? e + Rt(n) + r : _e;
}
function Nw(t, e, n, r, o, i) {
    let s = Py(),
        a = er(t, s, n, o);
    return $a(2), a ? e + Rt(n) + r + Rt(o) + i : _e;
}
function no(t, e) {
    return (t << 17) | (e << 2);
}
function zt(t) {
    return (t >> 17) & 32767;
}
function Aw(t) {
    return (t & 2) == 2;
}
function Ow(t, e) {
    return (t & 131071) | (e << 17);
}
function ca(t) {
    return t | 2;
}
function En(t) {
    return (t & 131068) >> 2;
}
function ls(t, e) {
    return (t & -131069) | (e << 2);
}
function Fw(t) {
    return (t & 1) === 1;
}
function da(t) {
    return t | 1;
}
function Pw(t, e, n, r, o, i) {
    let s = i ? e.classBindings : e.styleBindings,
        a = zt(s),
        u = En(s);
    t[r] = n;
    let l = !1,
        c;
    if (Array.isArray(n)) {
        let d = n;
        (c = d[1]), (c === null || rr(d, c) > 0) && (l = !0);
    } else c = n;
    if (o)
        if (u !== 0) {
            let h = zt(t[a + 1]);
            (t[r + 1] = no(h, a)),
                h !== 0 && (t[h + 1] = ls(t[h + 1], r)),
                (t[a + 1] = Ow(t[a + 1], r));
        } else
            (t[r + 1] = no(a, 0)),
                a !== 0 && (t[a + 1] = ls(t[a + 1], r)),
                (a = r);
    else
        (t[r + 1] = no(u, 0)),
            a === 0 ? (a = r) : (t[u + 1] = ls(t[u + 1], r)),
            (u = r);
    l && (t[r + 1] = ca(t[r + 1])),
        Zc(t, c, r, !0),
        Zc(t, c, r, !1),
        Rw(e, c, t, r, i),
        (s = no(a, u)),
        i ? (e.classBindings = s) : (e.styleBindings = s);
}
function Rw(t, e, n, r, o) {
    let i = o ? t.residualClasses : t.residualStyles;
    i != null &&
        typeof e == 'string' &&
        rr(i, e) >= 0 &&
        (n[r + 1] = da(n[r + 1]));
}
function Zc(t, e, n, r) {
    let o = t[n + 1],
        i = e === null,
        s = r ? zt(o) : En(o),
        a = !1;
    for (; s !== 0 && (a === !1 || i); ) {
        let u = t[s],
            l = t[s + 1];
        kw(u, e) && ((a = !0), (t[s + 1] = r ? da(l) : ca(l))),
            (s = r ? zt(l) : En(l));
    }
    a && (t[n + 1] = r ? ca(o) : da(o));
}
function kw(t, e) {
    return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
        ? !0
        : Array.isArray(t) && typeof e == 'string'
          ? rr(t, e) >= 0
          : !1;
}
var xe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function Lw(t) {
    return t.substring(xe.key, xe.keyEnd);
}
function jw(t) {
    return Vw(t), Ph(t, Rh(t, 0, xe.textEnd));
}
function Ph(t, e) {
    let n = xe.textEnd;
    return n === e
        ? -1
        : ((e = xe.keyEnd = Bw(t, (xe.key = e), n)), Rh(t, e, n));
}
function Vw(t) {
    (xe.key = 0),
        (xe.keyEnd = 0),
        (xe.value = 0),
        (xe.valueEnd = 0),
        (xe.textEnd = t.length);
}
function Rh(t, e, n) {
    for (; e < n && t.charCodeAt(e) <= 32; ) e++;
    return e;
}
function Bw(t, e, n) {
    for (; e < n && t.charCodeAt(e) > 32; ) e++;
    return e;
}
function $w(t, e, n) {
    let r = x(),
        o = Ba();
    if (Xe(r, o, e)) {
        let i = Q(),
            s = of();
        kD(i, s, r, t, e, r[H], n, !1);
    }
    return $w;
}
function fa(t, e, n, r, o) {
    let i = e.inputs,
        s = o ? 'class' : 'style';
    cu(t, n, i[s], s, r);
}
function kh(t, e, n) {
    return Lh(t, e, n, !1), kh;
}
function Hw(t, e) {
    return Lh(t, e, null, !0), Hw;
}
function ZO(t) {
    zw(Yw, Uw, t, !0);
}
function Uw(t, e) {
    for (let n = jw(e); n >= 0; n = Ph(e, n)) Ma(t, Lw(e), !0);
}
function Lh(t, e, n, r) {
    let o = x(),
        i = Q(),
        s = $a(2);
    if ((i.firstUpdatePass && Vh(i, t, s, r), e !== _e && Xe(o, s, e))) {
        let a = i.data[yt()];
        Bh(i, a, o, o[H], t, (o[s + 1] = Jw(e, n)), r, s);
    }
}
function zw(t, e, n, r) {
    let o = Q(),
        i = $a(2);
    o.firstUpdatePass && Vh(o, null, i, r);
    let s = x();
    if (n !== _e && Xe(s, i, n)) {
        let a = o.data[yt()];
        if ($h(a, r) && !jh(o, i)) {
            let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
            u !== null && (n = ms(u, n || '')), fa(o, a, s, n, r);
        } else Zw(o, a, s, s[H], s[i + 1], (s[i + 1] = Kw(t, e, n)), r, i);
    }
}
function jh(t, e) {
    return e >= t.expandoStartIndex;
}
function Vh(t, e, n, r) {
    let o = t.data;
    if (o[n + 1] === null) {
        let i = o[yt()],
            s = jh(t, n);
        $h(i, r) && e === null && !s && (e = !1),
            (e = qw(o, i, e, r)),
            Pw(o, i, e, n, s, r);
    }
}
function qw(t, e, n, r) {
    let o = Vy(t),
        i = r ? e.residualClasses : e.residualStyles;
    if (o === null)
        (r ? e.classBindings : e.styleBindings) === 0 &&
            ((n = cs(null, t, e, n, r)), (n = tr(n, e.attrs, r)), (i = null));
    else {
        let s = e.directiveStylingLast;
        if (s === -1 || t[s] !== o)
            if (((n = cs(o, t, e, n, r)), i === null)) {
                let u = Gw(t, e, r);
                u !== void 0 &&
                    Array.isArray(u) &&
                    ((u = cs(null, t, e, u[1], r)),
                    (u = tr(u, e.attrs, r)),
                    Ww(t, e, r, u));
            } else i = Qw(t, e, r);
    }
    return (
        i !== void 0 && (r ? (e.residualClasses = i) : (e.residualStyles = i)),
        n
    );
}
function Gw(t, e, n) {
    let r = n ? e.classBindings : e.styleBindings;
    if (En(r) !== 0) return t[zt(r)];
}
function Ww(t, e, n, r) {
    let o = n ? e.classBindings : e.styleBindings;
    t[zt(o)] = r;
}
function Qw(t, e, n) {
    let r,
        o = e.directiveEnd;
    for (let i = 1 + e.directiveStylingLast; i < o; i++) {
        let s = t[i].hostAttrs;
        r = tr(r, s, n);
    }
    return tr(r, e.attrs, n);
}
function cs(t, e, n, r, o) {
    let i = null,
        s = n.directiveEnd,
        a = n.directiveStylingLast;
    for (
        a === -1 ? (a = n.directiveStart) : a++;
        a < s && ((i = e[a]), (r = tr(r, i.hostAttrs, o)), i !== t);

    )
        a++;
    return t !== null && (n.directiveStylingLast = a), r;
}
function tr(t, e, n) {
    let r = n ? 1 : 2,
        o = -1;
    if (e !== null)
        for (let i = 0; i < e.length; i++) {
            let s = e[i];
            typeof s == 'number'
                ? (o = s)
                : o === r &&
                  (Array.isArray(t) || (t = t === void 0 ? [] : ['', t]),
                  Ma(t, s, n ? !0 : e[++i]));
        }
    return t === void 0 ? null : t;
}
function Kw(t, e, n) {
    if (n == null || n === '') return se;
    let r = [],
        o = Tn(n);
    if (Array.isArray(o)) for (let i = 0; i < o.length; i++) t(r, o[i], !0);
    else if (typeof o == 'object')
        for (let i in o) o.hasOwnProperty(i) && t(r, i, o[i]);
    else typeof o == 'string' && e(r, o);
    return r;
}
function Yw(t, e, n) {
    let r = String(e);
    r !== '' && !r.includes(' ') && Ma(t, r, n);
}
function Zw(t, e, n, r, o, i, s, a) {
    o === _e && (o = se);
    let u = 0,
        l = 0,
        c = 0 < o.length ? o[0] : null,
        d = 0 < i.length ? i[0] : null;
    for (; c !== null || d !== null; ) {
        let h = u < o.length ? o[u + 1] : void 0,
            f = l < i.length ? i[l + 1] : void 0,
            p = null,
            m;
        c === d
            ? ((u += 2), (l += 2), h !== f && ((p = d), (m = f)))
            : d === null || (c !== null && c < d)
              ? ((u += 2), (p = c))
              : ((l += 2), (p = d), (m = f)),
            p !== null && Bh(t, e, n, r, p, m, s, a),
            (c = u < o.length ? o[u] : null),
            (d = l < i.length ? i[l] : null);
    }
}
function Bh(t, e, n, r, o, i, s, a) {
    if (!(e.type & 3)) return;
    let u = t.data,
        l = u[a + 1],
        c = Fw(l) ? Jc(u, e, n, o, En(l), s) : void 0;
    if (!Ao(c)) {
        Ao(i) || (Aw(l) && (i = Jc(u, null, n, o, a, s)));
        let d = Gd(yt(), n);
        ID(r, s, d, o, i);
    }
}
function Jc(t, e, n, r, o, i) {
    let s = e === null,
        a;
    for (; o > 0; ) {
        let u = t[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = c === null,
            h = n[o + 1];
        h === _e && (h = d ? se : void 0);
        let f = d ? Zi(h, r) : c === r ? h : void 0;
        if ((l && !Ao(f) && (f = Zi(u, r)), Ao(f) && ((a = f), s))) return a;
        let p = t[o + 1];
        o = s ? zt(p) : En(p);
    }
    if (e !== null) {
        let u = i ? e.residualClasses : e.residualStyles;
        u != null && (a = Zi(u, r));
    }
    return a;
}
function Ao(t) {
    return t !== void 0;
}
function Jw(t, e) {
    return (
        t == null ||
            t === '' ||
            (typeof e == 'string'
                ? (t = t + e)
                : typeof t == 'object' && (t = ae(Tn(t)))),
        t
    );
}
function $h(t, e) {
    return (t.flags & (e ? 8 : 16)) !== 0;
}
function Xw(t, e, n, r, o, i) {
    let s = e.consts,
        a = vn(s, o),
        u = Mn(e, t, 2, r, a);
    return (
        lu(e, n, u, vn(s, i)),
        u.attrs !== null && To(u, u.attrs, !1),
        u.mergedAttrs !== null && To(u, u.mergedAttrs, !0),
        e.queries !== null && e.queries.elementStart(e, u),
        u
    );
}
function Hh(t, e, n, r) {
    let o = x(),
        i = Q(),
        s = W + t,
        a = o[H],
        u = i.firstCreatePass ? Xw(s, i, o, e, n, r) : i.data[s],
        l = zh(i, o, u, a, e, t);
    o[s] = l;
    let c = jo(u);
    return (
        qt(u, !0),
        Yf(a, l, u),
        !lr(u) && Vo() && Wo(i, o, l, u),
        Sy() === 0 && pt(l, o),
        Ty(),
        c && (su(i, o, u), iu(i, u, o)),
        r !== null && au(o, u),
        Hh
    );
}
function Uh() {
    let t = ue();
    ja() ? Va() : ((t = t.parent), qt(t, !1));
    let e = t;
    xy(e) && Ay(), My();
    let n = Q();
    return (
        n.firstCreatePass && (Bo(n, t), Fa(t) && n.queries.elementEnd(t)),
        e.classesWithoutHost != null &&
            qy(e) &&
            fa(n, e, x(), e.classesWithoutHost, !0),
        e.stylesWithoutHost != null &&
            Gy(e) &&
            fa(n, e, x(), e.stylesWithoutHost, !1),
        Uh
    );
}
function eb(t, e, n, r) {
    return Hh(t, e, n, r), Uh(), eb;
}
var zh = (t, e, n, r, o, i) => ($e(!0), Go(r, o, sf()));
function tb(t, e, n, r, o, i) {
    let s = e[Ie],
        a = !s || In() || lr(n) || Uo(s, i);
    if (($e(a), a)) return Go(r, o, sf());
    let u = Jo(s, t, e, n);
    return (
        Tf(s, i) && Ho(s, i, u.nextSibling),
        s && (Ef(n) || wf(u)) && ir(n) && (Ny(n), Wf(u)),
        u
    );
}
function nb() {
    zh = tb;
}
function rb(t, e, n, r, o) {
    let i = e.consts,
        s = vn(i, r),
        a = Mn(e, t, 8, 'ng-container', s);
    s !== null && To(a, s, !0);
    let u = vn(i, o);
    return (
        lu(e, n, a, u), e.queries !== null && e.queries.elementStart(e, a), a
    );
}
function qh(t, e, n) {
    let r = x(),
        o = Q(),
        i = t + W,
        s = o.firstCreatePass ? rb(i, o, r, e, n) : o.data[i];
    qt(s, !0);
    let a = Wh(o, r, s, t);
    return (
        (r[i] = a),
        Vo() && Wo(o, r, a, s),
        pt(a, r),
        jo(s) && (su(o, r, s), iu(o, s, r)),
        n != null && au(r, s),
        qh
    );
}
function Gh() {
    let t = ue(),
        e = Q();
    return (
        ja() ? Va() : ((t = t.parent), qt(t, !1)),
        e.firstCreatePass && (Bo(e, t), Fa(t) && e.queries.elementEnd(t)),
        Gh
    );
}
function ob(t, e, n) {
    return qh(t, e, n), Gh(), ob;
}
var Wh = (t, e, n, r) => ($e(!0), tu(e[H], ''));
function ib(t, e, n, r) {
    let o,
        i = e[Ie],
        s = !i || In() || lr(n);
    if (($e(s), s)) return tu(e[H], '');
    let a = Jo(i, t, e, n),
        u = Mv(i, r);
    return Ho(i, r, a), (o = Xo(u, a)), o;
}
function sb() {
    Wh = ib;
}
function JO() {
    return x();
}
var Ot = void 0;
function ab(t) {
    let e = t,
        n = Math.floor(Math.abs(t)),
        r = t.toString().replace(/^[^.]*\.?/, '').length;
    return n === 1 && r === 0 ? 1 : 5;
}
var ub = [
        'en',
        [['a', 'p'], ['AM', 'PM'], Ot],
        [['AM', 'PM'], Ot, Ot],
        [
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        Ot,
        [
            ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
        ],
        Ot,
        [
            ['B', 'A'],
            ['BC', 'AD'],
            ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', Ot, "{1} 'at' {0}", Ot],
        [
            '.',
            ',',
            ';',
            '%',
            '+',
            '-',
            'E',
            '\xD7',
            '\u2030',
            '\u221E',
            'NaN',
            ':',
        ],
        ['#,##0.###', '#,##0%', '\xA4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        ab,
    ],
    ds = {};
function ni(t) {
    let e = lb(t),
        n = Xc(e);
    if (n) return n;
    let r = e.split('-')[0];
    if (((n = Xc(r)), n)) return n;
    if (r === 'en') return ub;
    throw new g(701, !1);
}
function Xc(t) {
    return (
        t in ds ||
            (ds[t] =
                be.ng &&
                be.ng.common &&
                be.ng.common.locales &&
                be.ng.common.locales[t]),
        ds[t]
    );
}
var Wt = (function (t) {
    return (
        (t[(t.LocaleId = 0)] = 'LocaleId'),
        (t[(t.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
        (t[(t.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
        (t[(t.DaysFormat = 3)] = 'DaysFormat'),
        (t[(t.DaysStandalone = 4)] = 'DaysStandalone'),
        (t[(t.MonthsFormat = 5)] = 'MonthsFormat'),
        (t[(t.MonthsStandalone = 6)] = 'MonthsStandalone'),
        (t[(t.Eras = 7)] = 'Eras'),
        (t[(t.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
        (t[(t.WeekendRange = 9)] = 'WeekendRange'),
        (t[(t.DateFormat = 10)] = 'DateFormat'),
        (t[(t.TimeFormat = 11)] = 'TimeFormat'),
        (t[(t.DateTimeFormat = 12)] = 'DateTimeFormat'),
        (t[(t.NumberSymbols = 13)] = 'NumberSymbols'),
        (t[(t.NumberFormats = 14)] = 'NumberFormats'),
        (t[(t.CurrencyCode = 15)] = 'CurrencyCode'),
        (t[(t.CurrencySymbol = 16)] = 'CurrencySymbol'),
        (t[(t.CurrencyName = 17)] = 'CurrencyName'),
        (t[(t.Currencies = 18)] = 'Currencies'),
        (t[(t.Directionality = 19)] = 'Directionality'),
        (t[(t.PluralCase = 20)] = 'PluralCase'),
        (t[(t.ExtraData = 21)] = 'ExtraData'),
        t
    );
})(Wt || {});
function lb(t) {
    return t.toLowerCase().replace(/_/g, '-');
}
var Oo = 'en-US',
    cb = 'USD';
var db = Oo;
function fb(t) {
    typeof t == 'string' && (db = t.toLowerCase().replace(/_/g, '-'));
}
function Qh(t, e, n) {
    let r = t[H];
    switch (n) {
        case Node.COMMENT_NODE:
            return tu(r, e);
        case Node.TEXT_NODE:
            return eu(r, e);
        case Node.ELEMENT_NODE:
            return Go(r, e, null);
    }
}
var hb = (t, e, n, r) => ($e(!0), Qh(t, n, r));
function pb(t, e, n, r) {
    return $e(!0), Qh(t, n, r);
}
function mb() {
    hb = pb;
}
function gb(t, e, n, r) {
    let o = x(),
        i = Q(),
        s = ue();
    return vb(i, o, o[H], s, t, e, r), gb;
}
function yb(t, e, n, r) {
    let o = t.cleanup;
    if (o != null)
        for (let i = 0; i < o.length - 1; i += 2) {
            let s = o[i];
            if (s === n && o[i + 1] === r) {
                let a = e[Qn],
                    u = o[i + 2];
                return a.length > u ? a[u] : null;
            }
            typeof s == 'string' && (i += 2);
        }
    return null;
}
function vb(t, e, n, r, o, i, s) {
    let a = jo(r),
        l = t.firstCreatePass && uh(t),
        c = e[Ae],
        d = ah(e),
        h = !0;
    if (r.type & 3 || s) {
        let m = ye(r, e),
            b = s ? s(m) : m,
            w = d.length,
            N = s ? (j) => s(Fe(j[r.index])) : r.index,
            R = null;
        if ((!s && a && (R = yb(t, e, o, r.index)), R !== null)) {
            let j = R.__ngLastListenerFn__ || R;
            (j.__ngNextListenerFn__ = i),
                (R.__ngLastListenerFn__ = i),
                (h = !1);
        } else {
            i = td(r, e, c, i, !1);
            let j = n.listen(b, o, i);
            d.push(i, j), l && l.push(o, N, w, w + 1);
        }
    } else i = td(r, e, c, i, !1);
    let f = r.outputs,
        p;
    if (h && f !== null && (p = f[o])) {
        let m = p.length;
        if (m)
            for (let b = 0; b < m; b += 2) {
                let w = p[b],
                    N = p[b + 1],
                    te = e[w][N].subscribe(i),
                    z = d.length;
                d.push(i, te), l && l.push(o, r.index, z, -(z + 1));
            }
    }
}
function ed(t, e, n, r) {
    let o = L(null);
    try {
        return je(6, e, n), n(r) !== !1;
    } catch (i) {
        return lh(t, i), !1;
    } finally {
        je(7, e, n), L(o);
    }
}
function td(t, e, n, r, o) {
    return function i(s) {
        if (s === Function) return r;
        let a = t.componentOffset > -1 ? gt(t.index, e) : e;
        fu(a);
        let u = ed(e, n, r, s),
            l = i.__ngNextListenerFn__;
        for (; l; ) (u = ed(e, n, l, s) && u), (l = l.__ngNextListenerFn__);
        return o && u === !1 && s.preventDefault(), u;
    };
}
function XO(t = 1) {
    return $y(t);
}
function Db(t, e) {
    let n = null,
        r = zg(t);
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        if (i === '*') {
            n = o;
            continue;
        }
        if (r === null ? _d(t, i, !0) : Wg(r, i)) return o;
    }
    return n;
}
function eF(t) {
    let e = x()[me][ge];
    if (!e.projection) {
        let n = t ? t.length : 1,
            r = (e.projection = Rg(n, null)),
            o = r.slice(),
            i = e.child;
        for (; i !== null; ) {
            let s = t ? Db(i, t) : 0;
            s !== null &&
                (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i)),
                (i = i.next);
        }
    }
}
function tF(t, e = 0, n) {
    let r = x(),
        o = Q(),
        i = Mn(o, W + t, 16, null, n || null);
    i.projection === null && (i.projection = e),
        Va(),
        (!r[Ie] || In()) && (i.flags & 32) !== 32 && wD(o, r, i);
}
function nF(t, e, n, r) {
    sw(t, e, n, r);
}
function rF(t, e, n) {
    iw(t, e, n);
}
function oF(t) {
    let e = x(),
        n = Q(),
        r = Jd();
    Ha(r + 1);
    let o = gu(n, r);
    if (t.dirty && wy(e) === ((o.metadata.flags & 2) === 2)) {
        if (o.matches === null) t.reset([]);
        else {
            let i = lw(e, r);
            t.reset(i, sv), t.notifyOnChanges();
        }
        return !0;
    }
    return !1;
}
function iF() {
    return ow(x(), Jd());
}
function Eb(t, e, n, r) {
    n >= t.data.length && ((t.data[n] = null), (t.blueprint[n] = null)),
        (e[n] = r);
}
function sF(t) {
    let e = Fy();
    return Ra(e, W + t);
}
function aF(t, e = '') {
    let n = x(),
        r = Q(),
        o = t + W,
        i = r.firstCreatePass ? Mn(r, o, 1, e, null) : r.data[o],
        s = Kh(r, n, i, e, t);
    (n[o] = s), Vo() && Wo(r, n, s, i), qt(i, !1);
}
var Kh = (t, e, n, r, o) => ($e(!0), eu(e[H], r));
function wb(t, e, n, r, o) {
    let i = e[Ie],
        s = !i || In() || lr(n) || Uo(i, o);
    return $e(s), s ? eu(e[H], r) : Jo(i, t, e, n);
}
function bb() {
    Kh = wb;
}
function Ib(t) {
    return Yh('', t, ''), Ib;
}
function Yh(t, e, n) {
    let r = x(),
        o = xw(r, t, e, n);
    return o !== _e && ch(r, yt(), o), Yh;
}
function _b(t, e, n, r, o) {
    let i = x(),
        s = Nw(i, t, e, n, r, o);
    return s !== _e && ch(i, yt(), s), _b;
}
function Cb(t, e, n) {
    let r = Q();
    if (r.firstCreatePass) {
        let o = ht(t);
        ha(n, r.data, r.blueprint, o, !0), ha(e, r.data, r.blueprint, o, !1);
    }
}
function ha(t, e, n, r, o) {
    if (((t = ie(t)), Array.isArray(t)))
        for (let i = 0; i < t.length; i++) ha(t[i], e, n, r, o);
    else {
        let i = Q(),
            s = x(),
            a = ue(),
            u = mn(t) ? t : ie(t.provide),
            l = kd(t),
            c = a.providerIndexes & 1048575,
            d = a.directiveStart,
            h = a.providerIndexes >> 20;
        if (mn(t) || !t.multi) {
            let f = new Vt(l, o, K),
                p = hs(u, e, o ? c : c + h, d);
            p === -1
                ? (Ts(Do(a, s), i, u),
                  fs(i, t, e.length),
                  e.push(u),
                  a.directiveStart++,
                  a.directiveEnd++,
                  o && (a.providerIndexes += 1048576),
                  n.push(f),
                  s.push(f))
                : ((n[p] = f), (s[p] = f));
        } else {
            let f = hs(u, e, c + h, d),
                p = hs(u, e, c, c + h),
                m = f >= 0 && n[f],
                b = p >= 0 && n[p];
            if ((o && !b) || (!o && !m)) {
                Ts(Do(a, s), i, u);
                let w = Mb(o ? Tb : Sb, n.length, o, r, l);
                !o && b && (n[p].providerFactory = w),
                    fs(i, t, e.length, 0),
                    e.push(u),
                    a.directiveStart++,
                    a.directiveEnd++,
                    o && (a.providerIndexes += 1048576),
                    n.push(w),
                    s.push(w);
            } else {
                let w = Zh(n[o ? p : f], l, !o && r);
                fs(i, t, f > -1 ? f : p, w);
            }
            !o && r && b && n[p].componentProviders++;
        }
    }
}
function fs(t, e, n, r) {
    let o = mn(e),
        i = iy(e);
    if (o || i) {
        let u = (i ? ie(e.useClass) : e).prototype.ngOnDestroy;
        if (u) {
            let l = t.destroyHooks || (t.destroyHooks = []);
            if (!o && e.multi) {
                let c = l.indexOf(n);
                c === -1 ? l.push(n, [r, u]) : l[c + 1].push(r, u);
            } else l.push(n, u);
        }
    }
}
function Zh(t, e, n) {
    return n && t.componentProviders++, t.multi.push(e) - 1;
}
function hs(t, e, n, r) {
    for (let o = n; o < r; o++) if (e[o] === t) return o;
    return -1;
}
function Sb(t, e, n, r) {
    return pa(this.multi, []);
}
function Tb(t, e, n, r) {
    let o = this.multi,
        i;
    if (this.providerFactory) {
        let s = this.providerFactory.componentProviders,
            a = Bt(n, n[S], this.providerFactory.index, r);
        (i = a.slice(0, s)), pa(o, i);
        for (let u = s; u < a.length; u++) i.push(a[u]);
    } else (i = []), pa(o, i);
    return i;
}
function pa(t, e) {
    for (let n = 0; n < t.length; n++) {
        let r = t[n];
        e.push(r());
    }
    return e;
}
function Mb(t, e, n, r, o) {
    let i = new Vt(t, n, K);
    return (
        (i.multi = []),
        (i.index = e),
        (i.componentProviders = 0),
        Zh(i, o, r && !n),
        i
    );
}
function uF(t, e = []) {
    return (n) => {
        n.providersResolver = (r, o) => Cb(r, o ? o(t) : t, e);
    };
}
var xb = (() => {
    let e = class e {
        constructor(r) {
            (this._injector = r), (this.cachedInjectors = new Map());
        }
        getOrCreateStandaloneInjector(r) {
            if (!r.standalone) return null;
            if (!this.cachedInjectors.has(r)) {
                let o = Od(!1, r.type),
                    i =
                        o.length > 0
                            ? Dw(
                                  [o],
                                  this._injector,
                                  `Standalone[${r.type.name}]`,
                              )
                            : null;
                this.cachedInjectors.set(r, i);
            }
            return this.cachedInjectors.get(r);
        }
        ngOnDestroy() {
            try {
                for (let r of this.cachedInjectors.values())
                    r !== null && r.destroy();
            } finally {
                this.cachedInjectors.clear();
            }
        }
    };
    e.ɵprov = $({
        token: e,
        providedIn: 'environment',
        factory: () => new e(oe(ft)),
    });
    let t = e;
    return t;
})();
function lF(t) {
    xn('NgStandalone'),
        (t.getStandaloneInjector = (e) =>
            e.get(xb).getOrCreateStandaloneInjector(t));
}
function cF(t, e, n) {
    let r = _n() + t,
        o = x();
    return o[r] === _e ? ur(o, r, n ? e.call(n) : e()) : ww(o, r);
}
function dF(t, e, n, r) {
    return Jh(x(), _n(), t, e, n, r);
}
function fF(t, e, n, r, o) {
    return Nb(x(), _n(), t, e, n, r, o);
}
function hF(t, e, n, r, o, i) {
    return Ab(x(), _n(), t, e, n, r, o, i);
}
function ri(t, e) {
    let n = t[e];
    return n === _e ? void 0 : n;
}
function Jh(t, e, n, r, o, i) {
    let s = e + n;
    return Xe(t, s, o) ? ur(t, s + 1, i ? r.call(i, o) : r(o)) : ri(t, s + 1);
}
function Nb(t, e, n, r, o, i, s) {
    let a = e + n;
    return er(t, a, o, i)
        ? ur(t, a + 2, s ? r.call(s, o, i) : r(o, i))
        : ri(t, a + 2);
}
function Ab(t, e, n, r, o, i, s, a) {
    let u = e + n;
    return bw(t, u, o, i, s)
        ? ur(t, u + 3, a ? r.call(a, o, i, s) : r(o, i, s))
        : ri(t, u + 3);
}
function Ob(t, e, n, r, o, i, s, a, u) {
    let l = e + n;
    return Iw(t, l, o, i, s, a)
        ? ur(t, l + 4, u ? r.call(u, o, i, s, a) : r(o, i, s, a))
        : ri(t, l + 4);
}
function pF(t, e) {
    let n = Q(),
        r,
        o = t + W;
    n.firstCreatePass
        ? ((r = Fb(e, n.pipeRegistry)),
          (n.data[o] = r),
          r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
        : (r = n.data[o]);
    let i = r.factory || (r.factory = kt(r.type, !0)),
        s,
        a = ce(K);
    try {
        let u = vo(!1),
            l = i();
        return vo(u), Eb(n, x(), o, l), l;
    } finally {
        ce(a);
    }
}
function Fb(t, e) {
    if (e)
        for (let n = e.length - 1; n >= 0; n--) {
            let r = e[n];
            if (t === r.name) return r;
        }
}
function mF(t, e, n) {
    let r = t + W,
        o = x(),
        i = Ra(o, r);
    return Xh(o, r) ? Jh(o, _n(), e, i.transform, n, i) : i.transform(n);
}
function gF(t, e, n, r, o, i) {
    let s = t + W,
        a = x(),
        u = Ra(a, s);
    return Xh(a, s)
        ? Ob(a, _n(), e, u.transform, n, r, o, i, u)
        : u.transform(n, r, o, i);
}
function Xh(t, e) {
    return t[S].data[e].pure;
}
function yF(t, e) {
    return Zo(t, e);
}
var vF = (() => {
    let e = class e {
        log(r) {
            console.log(r);
        }
        warn(r) {
            console.warn(r);
        }
    };
    (e.ɵfac = function (o) {
        return new (o || e)();
    }),
        (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
    let t = e;
    return t;
})();
var Pb = new B('');
function oi(t) {
    return !!t && typeof t.then == 'function';
}
function vu(t) {
    return !!t && typeof t.subscribe == 'function';
}
var Rb = new B(''),
    ep = (() => {
        let e = class e {
            constructor() {
                (this.initialized = !1),
                    (this.done = !1),
                    (this.donePromise = new Promise((r, o) => {
                        (this.resolve = r), (this.reject = o);
                    })),
                    (this.appInits = O(Rb, { optional: !0 }) ?? []);
            }
            runInitializers() {
                if (this.initialized) return;
                let r = [];
                for (let i of this.appInits) {
                    let s = i();
                    if (oi(s)) r.push(s);
                    else if (vu(s)) {
                        let a = new Promise((u, l) => {
                            s.subscribe({ complete: u, error: l });
                        });
                        r.push(a);
                    }
                }
                let o = () => {
                    (this.done = !0), this.resolve();
                };
                Promise.all(r)
                    .then(() => {
                        o();
                    })
                    .catch((i) => {
                        this.reject(i);
                    }),
                    r.length === 0 && o(),
                    (this.initialized = !0);
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)();
        }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })(),
    tp = new B('');
function kb() {
    Ll(() => {
        throw new g(600, !1);
    });
}
function Lb(t) {
    return t.isBoundToModule;
}
function jb(t, e, n) {
    try {
        let r = n();
        return oi(r)
            ? r.catch((o) => {
                  throw (e.runOutsideAngular(() => t.handleError(o)), o);
              })
            : r;
    } catch (r) {
        throw (e.runOutsideAngular(() => t.handleError(r)), r);
    }
}
var Du = (() => {
    let e = class e {
        constructor() {
            (this._bootstrapListeners = []),
                (this._runningTick = !1),
                (this._destroyed = !1),
                (this._destroyListeners = []),
                (this._views = []),
                (this.internalErrorHandler = O(Df)),
                (this.afterRenderEffectManager = O(pu)),
                (this.externalTestViews = new Set()),
                (this.beforeRender = new le()),
                (this.afterTick = new le()),
                (this.componentTypes = []),
                (this.components = []),
                (this.isStable = O(Nh).hasPendingTasks.pipe(we((r) => !r))),
                (this._injector = O(ft));
        }
        get destroyed() {
            return this._destroyed;
        }
        get injector() {
            return this._injector;
        }
        bootstrap(r, o) {
            let i = r instanceof So;
            if (!this._injector.get(ep).done) {
                let f = !i && Xg(r),
                    p = !1;
                throw new g(405, p);
            }
            let a;
            i
                ? (a = r)
                : (a = this._injector.get(ei).resolveComponentFactory(r)),
                this.componentTypes.push(a.componentType);
            let u = Lb(a) ? void 0 : this._injector.get(mt),
                l = o || a.selector,
                c = a.create(Cn.NULL, [], l, u),
                d = c.location.nativeElement,
                h = c.injector.get(Pb, null);
            return (
                h?.registerApplication(d),
                c.onDestroy(() => {
                    this.detachView(c.hostView),
                        ps(this.components, c),
                        h?.unregisterApplication(d);
                }),
                this._loadComponent(c),
                c
            );
        }
        tick() {
            this._tick(!0);
        }
        _tick(r) {
            if (this._runningTick) throw new g(101, !1);
            let o = L(null);
            try {
                (this._runningTick = !0), this.detectChangesInAttachedViews(r);
            } catch (i) {
                this.internalErrorHandler(i);
            } finally {
                this.afterTick.next(), (this._runningTick = !1), L(o);
            }
        }
        detectChangesInAttachedViews(r) {
            let o = 0,
                i = this.afterRenderEffectManager;
            for (;;) {
                if (o === mh) throw new g(103, !1);
                if (r) {
                    let s = o === 0;
                    this.beforeRender.next(s);
                    for (let { _lView: a, notifyErrorHandler: u } of this
                        ._views)
                        Bb(a, s, u);
                }
                if (
                    (o++,
                    i.executeInternalCallbacks(),
                    ![...this.externalTestViews.keys(), ...this._views].some(
                        ({ _lView: s }) => ma(s),
                    ) &&
                        (i.execute(),
                        ![
                            ...this.externalTestViews.keys(),
                            ...this._views,
                        ].some(({ _lView: s }) => ma(s))))
                )
                    break;
            }
        }
        attachView(r) {
            let o = r;
            this._views.push(o), o.attachToAppRef(this);
        }
        detachView(r) {
            let o = r;
            ps(this._views, o), o.detachFromAppRef();
        }
        _loadComponent(r) {
            this.attachView(r.hostView), this.tick(), this.components.push(r);
            let o = this._injector.get(tp, []);
            [...this._bootstrapListeners, ...o].forEach((i) => i(r));
        }
        ngOnDestroy() {
            if (!this._destroyed)
                try {
                    this._destroyListeners.forEach((r) => r()),
                        this._views.slice().forEach((r) => r.destroy());
                } finally {
                    (this._destroyed = !0),
                        (this._views = []),
                        (this._bootstrapListeners = []),
                        (this._destroyListeners = []);
                }
        }
        onDestroy(r) {
            return (
                this._destroyListeners.push(r),
                () => ps(this._destroyListeners, r)
            );
        }
        destroy() {
            if (this._destroyed) throw new g(406, !1);
            let r = this._injector;
            r.destroy && !r.destroyed && r.destroy();
        }
        get viewCount() {
            return this._views.length;
        }
        warnIfDestroyed() {}
    };
    (e.ɵfac = function (o) {
        return new (o || e)();
    }),
        (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
function ps(t, e) {
    let n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
}
var ro;
function Vb(t) {
    ro ??= new WeakMap();
    let e = ro.get(t);
    if (e) return e;
    let n = t.isStable
        .pipe(Wi((r) => r))
        .toPromise()
        .then(() => {});
    return ro.set(t, n), t.onDestroy(() => ro?.delete(t)), n;
}
function Bb(t, e, n) {
    (!e && !ma(t)) || $b(t, n, e);
}
function ma(t) {
    return La(t);
}
function $b(t, e, n) {
    let r;
    n ? ((r = 0), (t[C] |= 1024)) : t[C] & 64 ? (r = 0) : (r = 1), gh(t, e, r);
}
var ga = class {
        constructor(e, n) {
            (this.ngModuleFactory = e), (this.componentFactories = n);
        }
    },
    DF = (() => {
        let e = class e {
            compileModuleSync(r) {
                return new la(r);
            }
            compileModuleAsync(r) {
                return Promise.resolve(this.compileModuleSync(r));
            }
            compileModuleAndAllComponentsSync(r) {
                let o = this.compileModuleSync(r),
                    i = Md(r),
                    s = Vf(i.declarations).reduce((a, u) => {
                        let l = dt(u);
                        return l && a.push(new Dn(l)), a;
                    }, []);
                return new ga(o, s);
            }
            compileModuleAndAllComponentsAsync(r) {
                return Promise.resolve(
                    this.compileModuleAndAllComponentsSync(r),
                );
            }
            clearCache() {}
            clearCacheFor(r) {}
            getModuleId(r) {}
        };
        (e.ɵfac = function (o) {
            return new (o || e)();
        }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })();
var Hb = (() => {
    let e = class e {
        constructor() {
            (this.zone = O(he)), (this.applicationRef = O(Du));
        }
        initialize() {
            this._onMicrotaskEmptySubscription ||
                (this._onMicrotaskEmptySubscription =
                    this.zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this.zone.run(() => {
                                this.applicationRef.tick();
                            });
                        },
                    }));
        }
        ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
        }
    };
    (e.ɵfac = function (o) {
        return new (o || e)();
    }),
        (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
function Ub(t) {
    return [
        { provide: he, useFactory: t },
        {
            provide: zn,
            multi: !0,
            useFactory: () => {
                let e = O(Hb, { optional: !0 });
                return () => e.initialize();
            },
        },
        {
            provide: zn,
            multi: !0,
            useFactory: () => {
                let e = O(Wb);
                return () => {
                    e.initialize();
                };
            },
        },
        { provide: Df, useFactory: zb },
    ];
}
function zb() {
    let t = O(he),
        e = O($t);
    return (n) => t.runOutsideAngular(() => e.handleError(n));
}
function qb(t) {
    let e = Ub(() => new he(Gb(t)));
    return Ad([[], e]);
}
function Gb(t) {
    return {
        enableLongStackTrace: !1,
        shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
        shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
    };
}
var Wb = (() => {
    let e = class e {
        constructor() {
            (this.subscription = new G()),
                (this.initialized = !1),
                (this.zone = O(he)),
                (this.pendingTasks = O(Nh));
        }
        initialize() {
            if (this.initialized) return;
            this.initialized = !0;
            let r = null;
            !this.zone.isStable &&
                !this.zone.hasPendingMacrotasks &&
                !this.zone.hasPendingMicrotasks &&
                (r = this.pendingTasks.add()),
                this.zone.runOutsideAngular(() => {
                    this.subscription.add(
                        this.zone.onStable.subscribe(() => {
                            he.assertNotInAngularZone(),
                                queueMicrotask(() => {
                                    r !== null &&
                                        !this.zone.hasPendingMacrotasks &&
                                        !this.zone.hasPendingMicrotasks &&
                                        (this.pendingTasks.remove(r),
                                        (r = null));
                                });
                        }),
                    );
                }),
                this.subscription.add(
                    this.zone.onUnstable.subscribe(() => {
                        he.assertInAngularZone(),
                            (r ??= this.pendingTasks.add());
                    }),
                );
        }
        ngOnDestroy() {
            this.subscription.unsubscribe();
        }
    };
    (e.ɵfac = function (o) {
        return new (o || e)();
    }),
        (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
function Qb() {
    return (typeof $localize < 'u' && $localize.locale) || Oo;
}
var ii = new B('', {
        providedIn: 'root',
        factory: () => O(ii, P.Optional | P.SkipSelf) || Qb(),
    }),
    np = new B('', { providedIn: 'root', factory: () => cb });
var rp = new B('');
var lo = null;
function Kb(t = [], e) {
    return Cn.create({
        name: e,
        providers: [
            { provide: Rd, useValue: 'platform' },
            { provide: rp, useValue: new Set([() => (lo = null)]) },
            ...t,
        ],
    });
}
function Yb(t = []) {
    if (lo) return lo;
    let e = Kb(t);
    return (lo = e), kb(), Zb(e), e;
}
function Zb(t) {
    t.get(hv, null)?.forEach((n) => n());
}
function EF() {
    return !1;
}
var Eu = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = Jb;
    let t = e;
    return t;
})();
function Jb(t) {
    return Xb(ue(), x(), (t & 16) === 16);
}
function Xb(t, e, n) {
    if (ir(t) && !n) {
        let r = gt(t.index, e);
        return new Ht(r, r);
    } else if (t.type & 47) {
        let r = e[me];
        return new Ht(r, e);
    }
    return null;
}
var ya = class {
        constructor() {}
        supports(e) {
            return Ah(e);
        }
        create(e) {
            return new va(e);
        }
    },
    eI = (t, e) => e,
    va = class {
        constructor(e) {
            (this.length = 0),
                (this._linkedRecords = null),
                (this._unlinkedRecords = null),
                (this._previousItHead = null),
                (this._itHead = null),
                (this._itTail = null),
                (this._additionsHead = null),
                (this._additionsTail = null),
                (this._movesHead = null),
                (this._movesTail = null),
                (this._removalsHead = null),
                (this._removalsTail = null),
                (this._identityChangesHead = null),
                (this._identityChangesTail = null),
                (this._trackByFn = e || eI);
        }
        forEachItem(e) {
            let n;
            for (n = this._itHead; n !== null; n = n._next) e(n);
        }
        forEachOperation(e) {
            let n = this._itHead,
                r = this._removalsHead,
                o = 0,
                i = null;
            for (; n || r; ) {
                let s = !r || (n && n.currentIndex < nd(r, o, i)) ? n : r,
                    a = nd(s, o, i),
                    u = s.currentIndex;
                if (s === r) o--, (r = r._nextRemoved);
                else if (((n = n._next), s.previousIndex == null)) o++;
                else {
                    i || (i = []);
                    let l = a - o,
                        c = u - o;
                    if (l != c) {
                        for (let h = 0; h < l; h++) {
                            let f = h < i.length ? i[h] : (i[h] = 0),
                                p = f + h;
                            c <= p && p < l && (i[h] = f + 1);
                        }
                        let d = s.previousIndex;
                        i[d] = c - l;
                    }
                }
                a !== u && e(s, a, u);
            }
        }
        forEachPreviousItem(e) {
            let n;
            for (n = this._previousItHead; n !== null; n = n._nextPrevious)
                e(n);
        }
        forEachAddedItem(e) {
            let n;
            for (n = this._additionsHead; n !== null; n = n._nextAdded) e(n);
        }
        forEachMovedItem(e) {
            let n;
            for (n = this._movesHead; n !== null; n = n._nextMoved) e(n);
        }
        forEachRemovedItem(e) {
            let n;
            for (n = this._removalsHead; n !== null; n = n._nextRemoved) e(n);
        }
        forEachIdentityChange(e) {
            let n;
            for (
                n = this._identityChangesHead;
                n !== null;
                n = n._nextIdentityChange
            )
                e(n);
        }
        diff(e) {
            if ((e == null && (e = []), !Ah(e))) throw new g(900, !1);
            return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
            this._reset();
            let n = this._itHead,
                r = !1,
                o,
                i,
                s;
            if (Array.isArray(e)) {
                this.length = e.length;
                for (let a = 0; a < this.length; a++)
                    (i = e[a]),
                        (s = this._trackByFn(a, i)),
                        n === null || !Object.is(n.trackById, s)
                            ? ((n = this._mismatch(n, i, s, a)), (r = !0))
                            : (r && (n = this._verifyReinsertion(n, i, s, a)),
                              Object.is(n.item, i) ||
                                  this._addIdentityChange(n, i)),
                        (n = n._next);
            } else
                (o = 0),
                    Ew(e, (a) => {
                        (s = this._trackByFn(o, a)),
                            n === null || !Object.is(n.trackById, s)
                                ? ((n = this._mismatch(n, a, s, o)), (r = !0))
                                : (r &&
                                      (n = this._verifyReinsertion(n, a, s, o)),
                                  Object.is(n.item, a) ||
                                      this._addIdentityChange(n, a)),
                            (n = n._next),
                            o++;
                    }),
                    (this.length = o);
            return this._truncate(n), (this.collection = e), this.isDirty;
        }
        get isDirty() {
            return (
                this._additionsHead !== null ||
                this._movesHead !== null ||
                this._removalsHead !== null ||
                this._identityChangesHead !== null
            );
        }
        _reset() {
            if (this.isDirty) {
                let e;
                for (
                    e = this._previousItHead = this._itHead;
                    e !== null;
                    e = e._next
                )
                    e._nextPrevious = e._next;
                for (e = this._additionsHead; e !== null; e = e._nextAdded)
                    e.previousIndex = e.currentIndex;
                for (
                    this._additionsHead = this._additionsTail = null,
                        e = this._movesHead;
                    e !== null;
                    e = e._nextMoved
                )
                    e.previousIndex = e.currentIndex;
                (this._movesHead = this._movesTail = null),
                    (this._removalsHead = this._removalsTail = null),
                    (this._identityChangesHead = this._identityChangesTail =
                        null);
            }
        }
        _mismatch(e, n, r, o) {
            let i;
            return (
                e === null
                    ? (i = this._itTail)
                    : ((i = e._prev), this._remove(e)),
                (e =
                    this._unlinkedRecords === null
                        ? null
                        : this._unlinkedRecords.get(r, null)),
                e !== null
                    ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                      this._reinsertAfter(e, i, o))
                    : ((e =
                          this._linkedRecords === null
                              ? null
                              : this._linkedRecords.get(r, o)),
                      e !== null
                          ? (Object.is(e.item, n) ||
                                this._addIdentityChange(e, n),
                            this._moveAfter(e, i, o))
                          : (e = this._addAfter(new Da(n, r), i, o))),
                e
            );
        }
        _verifyReinsertion(e, n, r, o) {
            let i =
                this._unlinkedRecords === null
                    ? null
                    : this._unlinkedRecords.get(r, null);
            return (
                i !== null
                    ? (e = this._reinsertAfter(i, e._prev, o))
                    : e.currentIndex != o &&
                      ((e.currentIndex = o), this._addToMoves(e, o)),
                e
            );
        }
        _truncate(e) {
            for (; e !== null; ) {
                let n = e._next;
                this._addToRemovals(this._unlink(e)), (e = n);
            }
            this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
                this._additionsTail !== null &&
                    (this._additionsTail._nextAdded = null),
                this._movesTail !== null && (this._movesTail._nextMoved = null),
                this._itTail !== null && (this._itTail._next = null),
                this._removalsTail !== null &&
                    (this._removalsTail._nextRemoved = null),
                this._identityChangesTail !== null &&
                    (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, n, r) {
            this._unlinkedRecords !== null && this._unlinkedRecords.remove(e);
            let o = e._prevRemoved,
                i = e._nextRemoved;
            return (
                o === null ? (this._removalsHead = i) : (o._nextRemoved = i),
                i === null ? (this._removalsTail = o) : (i._prevRemoved = o),
                this._insertAfter(e, n, r),
                this._addToMoves(e, r),
                e
            );
        }
        _moveAfter(e, n, r) {
            return (
                this._unlink(e),
                this._insertAfter(e, n, r),
                this._addToMoves(e, r),
                e
            );
        }
        _addAfter(e, n, r) {
            return (
                this._insertAfter(e, n, r),
                this._additionsTail === null
                    ? (this._additionsTail = this._additionsHead = e)
                    : (this._additionsTail = this._additionsTail._nextAdded =
                          e),
                e
            );
        }
        _insertAfter(e, n, r) {
            let o = n === null ? this._itHead : n._next;
            return (
                (e._next = o),
                (e._prev = n),
                o === null ? (this._itTail = e) : (o._prev = e),
                n === null ? (this._itHead = e) : (n._next = e),
                this._linkedRecords === null &&
                    (this._linkedRecords = new Fo()),
                this._linkedRecords.put(e),
                (e.currentIndex = r),
                e
            );
        }
        _remove(e) {
            return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
            this._linkedRecords !== null && this._linkedRecords.remove(e);
            let n = e._prev,
                r = e._next;
            return (
                n === null ? (this._itHead = r) : (n._next = r),
                r === null ? (this._itTail = n) : (r._prev = n),
                e
            );
        }
        _addToMoves(e, n) {
            return (
                e.previousIndex === n ||
                    (this._movesTail === null
                        ? (this._movesTail = this._movesHead = e)
                        : (this._movesTail = this._movesTail._nextMoved = e)),
                e
            );
        }
        _addToRemovals(e) {
            return (
                this._unlinkedRecords === null &&
                    (this._unlinkedRecords = new Fo()),
                this._unlinkedRecords.put(e),
                (e.currentIndex = null),
                (e._nextRemoved = null),
                this._removalsTail === null
                    ? ((this._removalsTail = this._removalsHead = e),
                      (e._prevRemoved = null))
                    : ((e._prevRemoved = this._removalsTail),
                      (this._removalsTail = this._removalsTail._nextRemoved =
                          e)),
                e
            );
        }
        _addIdentityChange(e, n) {
            return (
                (e.item = n),
                this._identityChangesTail === null
                    ? (this._identityChangesTail = this._identityChangesHead =
                          e)
                    : (this._identityChangesTail =
                          this._identityChangesTail._nextIdentityChange =
                              e),
                e
            );
        }
    },
    Da = class {
        constructor(e, n) {
            (this.item = e),
                (this.trackById = n),
                (this.currentIndex = null),
                (this.previousIndex = null),
                (this._nextPrevious = null),
                (this._prev = null),
                (this._next = null),
                (this._prevDup = null),
                (this._nextDup = null),
                (this._prevRemoved = null),
                (this._nextRemoved = null),
                (this._nextAdded = null),
                (this._nextMoved = null),
                (this._nextIdentityChange = null);
        }
    },
    Ea = class {
        constructor() {
            (this._head = null), (this._tail = null);
        }
        add(e) {
            this._head === null
                ? ((this._head = this._tail = e),
                  (e._nextDup = null),
                  (e._prevDup = null))
                : ((this._tail._nextDup = e),
                  (e._prevDup = this._tail),
                  (e._nextDup = null),
                  (this._tail = e));
        }
        get(e, n) {
            let r;
            for (r = this._head; r !== null; r = r._nextDup)
                if (
                    (n === null || n <= r.currentIndex) &&
                    Object.is(r.trackById, e)
                )
                    return r;
            return null;
        }
        remove(e) {
            let n = e._prevDup,
                r = e._nextDup;
            return (
                n === null ? (this._head = r) : (n._nextDup = r),
                r === null ? (this._tail = n) : (r._prevDup = n),
                this._head === null
            );
        }
    },
    Fo = class {
        constructor() {
            this.map = new Map();
        }
        put(e) {
            let n = e.trackById,
                r = this.map.get(n);
            r || ((r = new Ea()), this.map.set(n, r)), r.add(e);
        }
        get(e, n) {
            let r = e,
                o = this.map.get(r);
            return o ? o.get(e, n) : null;
        }
        remove(e) {
            let n = e.trackById;
            return this.map.get(n).remove(e) && this.map.delete(n), e;
        }
        get isEmpty() {
            return this.map.size === 0;
        }
        clear() {
            this.map.clear();
        }
    };
function nd(t, e, n) {
    let r = t.previousIndex;
    if (r === null) return r;
    let o = 0;
    return n && r < n.length && (o = n[r]), r + e + o;
}
var wa = class {
        constructor() {}
        supports(e) {
            return e instanceof Map || yu(e);
        }
        create() {
            return new ba();
        }
    },
    ba = class {
        constructor() {
            (this._records = new Map()),
                (this._mapHead = null),
                (this._appendAfter = null),
                (this._previousMapHead = null),
                (this._changesHead = null),
                (this._changesTail = null),
                (this._additionsHead = null),
                (this._additionsTail = null),
                (this._removalsHead = null),
                (this._removalsTail = null);
        }
        get isDirty() {
            return (
                this._additionsHead !== null ||
                this._changesHead !== null ||
                this._removalsHead !== null
            );
        }
        forEachItem(e) {
            let n;
            for (n = this._mapHead; n !== null; n = n._next) e(n);
        }
        forEachPreviousItem(e) {
            let n;
            for (n = this._previousMapHead; n !== null; n = n._nextPrevious)
                e(n);
        }
        forEachChangedItem(e) {
            let n;
            for (n = this._changesHead; n !== null; n = n._nextChanged) e(n);
        }
        forEachAddedItem(e) {
            let n;
            for (n = this._additionsHead; n !== null; n = n._nextAdded) e(n);
        }
        forEachRemovedItem(e) {
            let n;
            for (n = this._removalsHead; n !== null; n = n._nextRemoved) e(n);
        }
        diff(e) {
            if (!e) e = new Map();
            else if (!(e instanceof Map || yu(e))) throw new g(900, !1);
            return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
            this._reset();
            let n = this._mapHead;
            if (
                ((this._appendAfter = null),
                this._forEach(e, (r, o) => {
                    if (n && n.key === o)
                        this._maybeAddToChanges(n, r),
                            (this._appendAfter = n),
                            (n = n._next);
                    else {
                        let i = this._getOrCreateRecordForKey(o, r);
                        n = this._insertBeforeOrAppend(n, i);
                    }
                }),
                n)
            ) {
                n._prev && (n._prev._next = null), (this._removalsHead = n);
                for (let r = n; r !== null; r = r._nextRemoved)
                    r === this._mapHead && (this._mapHead = null),
                        this._records.delete(r.key),
                        (r._nextRemoved = r._next),
                        (r.previousValue = r.currentValue),
                        (r.currentValue = null),
                        (r._prev = null),
                        (r._next = null);
            }
            return (
                this._changesTail && (this._changesTail._nextChanged = null),
                this._additionsTail && (this._additionsTail._nextAdded = null),
                this.isDirty
            );
        }
        _insertBeforeOrAppend(e, n) {
            if (e) {
                let r = e._prev;
                return (
                    (n._next = e),
                    (n._prev = r),
                    (e._prev = n),
                    r && (r._next = n),
                    e === this._mapHead && (this._mapHead = n),
                    (this._appendAfter = e),
                    e
                );
            }
            return (
                this._appendAfter
                    ? ((this._appendAfter._next = n),
                      (n._prev = this._appendAfter))
                    : (this._mapHead = n),
                (this._appendAfter = n),
                null
            );
        }
        _getOrCreateRecordForKey(e, n) {
            if (this._records.has(e)) {
                let o = this._records.get(e);
                this._maybeAddToChanges(o, n);
                let i = o._prev,
                    s = o._next;
                return (
                    i && (i._next = s),
                    s && (s._prev = i),
                    (o._next = null),
                    (o._prev = null),
                    o
                );
            }
            let r = new Ia(e);
            return (
                this._records.set(e, r),
                (r.currentValue = n),
                this._addToAdditions(r),
                r
            );
        }
        _reset() {
            if (this.isDirty) {
                let e;
                for (
                    this._previousMapHead = this._mapHead,
                        e = this._previousMapHead;
                    e !== null;
                    e = e._next
                )
                    e._nextPrevious = e._next;
                for (e = this._changesHead; e !== null; e = e._nextChanged)
                    e.previousValue = e.currentValue;
                for (e = this._additionsHead; e != null; e = e._nextAdded)
                    e.previousValue = e.currentValue;
                (this._changesHead = this._changesTail = null),
                    (this._additionsHead = this._additionsTail = null),
                    (this._removalsHead = null);
            }
        }
        _maybeAddToChanges(e, n) {
            Object.is(n, e.currentValue) ||
                ((e.previousValue = e.currentValue),
                (e.currentValue = n),
                this._addToChanges(e));
        }
        _addToAdditions(e) {
            this._additionsHead === null
                ? (this._additionsHead = this._additionsTail = e)
                : ((this._additionsTail._nextAdded = e),
                  (this._additionsTail = e));
        }
        _addToChanges(e) {
            this._changesHead === null
                ? (this._changesHead = this._changesTail = e)
                : ((this._changesTail._nextChanged = e),
                  (this._changesTail = e));
        }
        _forEach(e, n) {
            e instanceof Map
                ? e.forEach(n)
                : Object.keys(e).forEach((r) => n(e[r], r));
        }
    },
    Ia = class {
        constructor(e) {
            (this.key = e),
                (this.previousValue = null),
                (this.currentValue = null),
                (this._nextPrevious = null),
                (this._next = null),
                (this._prev = null),
                (this._nextAdded = null),
                (this._nextRemoved = null),
                (this._nextChanged = null);
        }
    };
function rd() {
    return new wu([new ya()]);
}
var wu = (() => {
    let e = class e {
        constructor(r) {
            this.factories = r;
        }
        static create(r, o) {
            if (o != null) {
                let i = o.factories.slice();
                r = r.concat(i);
            }
            return new e(r);
        }
        static extend(r) {
            return {
                provide: e,
                useFactory: (o) => e.create(r, o || rd()),
                deps: [[e, new yd(), new gd()]],
            };
        }
        find(r) {
            let o = this.factories.find((i) => i.supports(r));
            if (o != null) return o;
            throw new g(901, !1);
        }
    };
    e.ɵprov = $({ token: e, providedIn: 'root', factory: rd });
    let t = e;
    return t;
})();
function od() {
    return new bu([new wa()]);
}
var bu = (() => {
    let e = class e {
        constructor(r) {
            this.factories = r;
        }
        static create(r, o) {
            if (o) {
                let i = o.factories.slice();
                r = r.concat(i);
            }
            return new e(r);
        }
        static extend(r) {
            return {
                provide: e,
                useFactory: (o) => e.create(r, o || od()),
                deps: [[e, new yd(), new gd()]],
            };
        }
        find(r) {
            let o = this.factories.find((i) => i.supports(r));
            if (o) return o;
            throw new g(901, !1);
        }
    };
    e.ɵprov = $({ token: e, providedIn: 'root', factory: od });
    let t = e;
    return t;
})();
function wF(t) {
    try {
        let { rootComponent: e, appProviders: n, platformProviders: r } = t,
            o = Yb(r),
            i = [qb(), ...(n || [])],
            a = new No({
                providers: i,
                parent: o,
                debugName: '',
                runEnvironmentInitializers: !1,
            }).injector,
            u = a.get(he);
        return u.run(() => {
            a.resolveInjectorInitializers();
            let l = a.get($t, null),
                c;
            u.runOutsideAngular(() => {
                c = u.onError.subscribe({
                    next: (f) => {
                        l.handleError(f);
                    },
                });
            });
            let d = () => a.destroy(),
                h = o.get(rp);
            return (
                h.add(d),
                a.onDestroy(() => {
                    c.unsubscribe(), h.delete(d);
                }),
                jb(l, u, () => {
                    let f = a.get(ep);
                    return (
                        f.runInitializers(),
                        f.donePromise.then(() => {
                            let p = a.get(ii, Oo);
                            fb(p || Oo);
                            let m = a.get(Du);
                            return e !== void 0 && m.bootstrap(e), m;
                        })
                    );
                })
            );
        });
    } catch (e) {
        return Promise.reject(e);
    }
}
var id = !1,
    tI = !1;
function nI() {
    id || ((id = !0), _v(), nb(), bb(), sb(), Tw(), XE(), TE(), AD(), mb());
}
function rI(t, e) {
    return Vb(t);
}
function bF() {
    return Ad([
        {
            provide: Zr,
            useFactory: () => {
                let t = !0;
                return (
                    $n() && (t = !!O(Wa, { optional: !0 })?.get(Cf, null)),
                    t && xn('NgHydration'),
                    t
                );
            },
        },
        {
            provide: zn,
            useValue: () => {
                (tI = !!O(xv, { optional: !0 })), $n() && O(Zr) && (oI(), nI());
            },
            multi: !0,
        },
        { provide: xf, useFactory: () => $n() && O(Zr) },
        {
            provide: tp,
            useFactory: () => {
                if ($n() && O(Zr)) {
                    let t = O(Du),
                        e = O(Cn);
                    return () => {
                        rI(t, e).then(() => {
                            he.assertInAngularZone(), vE(t);
                        });
                    };
                }
                return () => {};
            },
            multi: !0,
        },
    ]);
}
function oI() {
    let t = sr(),
        e;
    for (let n of t.body.childNodes)
        if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === bv) {
            e = n;
            break;
        }
    if (!e) throw new g(-507, !1);
}
function iI(t) {
    return typeof t == 'boolean' ? t : t != null && t !== 'false';
}
function IF(t, e) {
    xn('NgSignals');
    let n = Pl(t);
    return e?.equal && (n[st].equal = e.equal), n;
}
function Iu(t) {
    let e = L(null);
    try {
        return t();
    } finally {
        L(e);
    }
}
function _F(t) {
    let e = dt(t);
    if (!e) return null;
    let n = new Dn(e);
    return {
        get selector() {
            return n.selector;
        },
        get type() {
            return n.componentType;
        },
        get inputs() {
            return n.inputs;
        },
        get outputs() {
            return n.outputs;
        },
        get ngContentSelectors() {
            return n.ngContentSelectors;
        },
        get isStandalone() {
            return e.standalone;
        },
        get isSignal() {
            return e.signals;
        },
    };
}
var pp = null;
function _u() {
    return pp;
}
function zF(t) {
    pp ??= t;
}
var ip = class {};
var Pu = new B(''),
    Ru = (() => {
        let e = class e {
            historyGo(r) {
                throw new Error('');
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)();
        }),
            (e.ɵprov = $({
                token: e,
                factory: () => O(sI),
                providedIn: 'platform',
            }));
        let t = e;
        return t;
    })(),
    qF = new B(''),
    sI = (() => {
        let e = class e extends Ru {
            constructor() {
                super(),
                    (this._doc = O(Pu)),
                    (this._location = window.location),
                    (this._history = window.history);
            }
            getBaseHrefFromDOM() {
                return _u().getBaseHref(this._doc);
            }
            onPopState(r) {
                let o = _u().getGlobalEventTarget(this._doc, 'window');
                return (
                    o.addEventListener('popstate', r, !1),
                    () => o.removeEventListener('popstate', r)
                );
            }
            onHashChange(r) {
                let o = _u().getGlobalEventTarget(this._doc, 'window');
                return (
                    o.addEventListener('hashchange', r, !1),
                    () => o.removeEventListener('hashchange', r)
                );
            }
            get href() {
                return this._location.href;
            }
            get protocol() {
                return this._location.protocol;
            }
            get hostname() {
                return this._location.hostname;
            }
            get port() {
                return this._location.port;
            }
            get pathname() {
                return this._location.pathname;
            }
            get search() {
                return this._location.search;
            }
            get hash() {
                return this._location.hash;
            }
            set pathname(r) {
                this._location.pathname = r;
            }
            pushState(r, o, i) {
                this._history.pushState(r, o, i);
            }
            replaceState(r, o, i) {
                this._history.replaceState(r, o, i);
            }
            forward() {
                this._history.forward();
            }
            back() {
                this._history.back();
            }
            historyGo(r = 0) {
                this._history.go(r);
            }
            getState() {
                return this._history.state;
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)();
        }),
            (e.ɵprov = $({
                token: e,
                factory: () => new e(),
                providedIn: 'platform',
            }));
        let t = e;
        return t;
    })();
function ku(t, e) {
    if (t.length == 0) return e;
    if (e.length == 0) return t;
    let n = 0;
    return (
        t.endsWith('/') && n++,
        e.startsWith('/') && n++,
        n == 2 ? t + e.substring(1) : n == 1 ? t + e : t + '/' + e
    );
}
function sp(t) {
    let e = t.match(/#|\?|$/),
        n = (e && e.index) || t.length,
        r = n - (t[n - 1] === '/' ? 1 : 0);
    return t.slice(0, r) + t.slice(n);
}
function tt(t) {
    return t && t[0] !== '?' ? '?' + t : t;
}
var ai = (() => {
        let e = class e {
            historyGo(r) {
                throw new Error('');
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)();
        }),
            (e.ɵprov = $({
                token: e,
                factory: () => O(aI),
                providedIn: 'root',
            }));
        let t = e;
        return t;
    })(),
    mp = new B(''),
    aI = (() => {
        let e = class e extends ai {
            constructor(r, o) {
                super(),
                    (this._platformLocation = r),
                    (this._removeListenerFns = []),
                    (this._baseHref =
                        o ??
                        this._platformLocation.getBaseHrefFromDOM() ??
                        O(Pu).location?.origin ??
                        '');
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length; )
                    this._removeListenerFns.pop()();
            }
            onPopState(r) {
                this._removeListenerFns.push(
                    this._platformLocation.onPopState(r),
                    this._platformLocation.onHashChange(r),
                );
            }
            getBaseHref() {
                return this._baseHref;
            }
            prepareExternalUrl(r) {
                return ku(this._baseHref, r);
            }
            path(r = !1) {
                let o =
                        this._platformLocation.pathname +
                        tt(this._platformLocation.search),
                    i = this._platformLocation.hash;
                return i && r ? `${o}${i}` : o;
            }
            pushState(r, o, i, s) {
                let a = this.prepareExternalUrl(i + tt(s));
                this._platformLocation.pushState(r, o, a);
            }
            replaceState(r, o, i, s) {
                let a = this.prepareExternalUrl(i + tt(s));
                this._platformLocation.replaceState(r, o, a);
            }
            forward() {
                this._platformLocation.forward();
            }
            back() {
                this._platformLocation.back();
            }
            getState() {
                return this._platformLocation.getState();
            }
            historyGo(r = 0) {
                this._platformLocation.historyGo?.(r);
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)(oe(Ru), oe(mp, 8));
        }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })(),
    GF = (() => {
        let e = class e extends ai {
            constructor(r, o) {
                super(),
                    (this._platformLocation = r),
                    (this._baseHref = ''),
                    (this._removeListenerFns = []),
                    o != null && (this._baseHref = o);
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length; )
                    this._removeListenerFns.pop()();
            }
            onPopState(r) {
                this._removeListenerFns.push(
                    this._platformLocation.onPopState(r),
                    this._platformLocation.onHashChange(r),
                );
            }
            getBaseHref() {
                return this._baseHref;
            }
            path(r = !1) {
                let o = this._platformLocation.hash ?? '#';
                return o.length > 0 ? o.substring(1) : o;
            }
            prepareExternalUrl(r) {
                let o = ku(this._baseHref, r);
                return o.length > 0 ? '#' + o : o;
            }
            pushState(r, o, i, s) {
                let a = this.prepareExternalUrl(i + tt(s));
                a.length == 0 && (a = this._platformLocation.pathname),
                    this._platformLocation.pushState(r, o, a);
            }
            replaceState(r, o, i, s) {
                let a = this.prepareExternalUrl(i + tt(s));
                a.length == 0 && (a = this._platformLocation.pathname),
                    this._platformLocation.replaceState(r, o, a);
            }
            forward() {
                this._platformLocation.forward();
            }
            back() {
                this._platformLocation.back();
            }
            getState() {
                return this._platformLocation.getState();
            }
            historyGo(r = 0) {
                this._platformLocation.historyGo?.(r);
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)(oe(Ru), oe(mp, 8));
        }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    uI = (() => {
        let e = class e {
            constructor(r) {
                (this._subject = new Ft()),
                    (this._urlChangeListeners = []),
                    (this._urlChangeSubscription = null),
                    (this._locationStrategy = r);
                let o = this._locationStrategy.getBaseHref();
                (this._basePath = dI(sp(ap(o)))),
                    this._locationStrategy.onPopState((i) => {
                        this._subject.emit({
                            url: this.path(!0),
                            pop: !0,
                            state: i.state,
                            type: i.type,
                        });
                    });
            }
            ngOnDestroy() {
                this._urlChangeSubscription?.unsubscribe(),
                    (this._urlChangeListeners = []);
            }
            path(r = !1) {
                return this.normalize(this._locationStrategy.path(r));
            }
            getState() {
                return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(r, o = '') {
                return this.path() == this.normalize(r + tt(o));
            }
            normalize(r) {
                return e.stripTrailingSlash(cI(this._basePath, ap(r)));
            }
            prepareExternalUrl(r) {
                return (
                    r && r[0] !== '/' && (r = '/' + r),
                    this._locationStrategy.prepareExternalUrl(r)
                );
            }
            go(r, o = '', i = null) {
                this._locationStrategy.pushState(i, '', r, o),
                    this._notifyUrlChangeListeners(
                        this.prepareExternalUrl(r + tt(o)),
                        i,
                    );
            }
            replaceState(r, o = '', i = null) {
                this._locationStrategy.replaceState(i, '', r, o),
                    this._notifyUrlChangeListeners(
                        this.prepareExternalUrl(r + tt(o)),
                        i,
                    );
            }
            forward() {
                this._locationStrategy.forward();
            }
            back() {
                this._locationStrategy.back();
            }
            historyGo(r = 0) {
                this._locationStrategy.historyGo?.(r);
            }
            onUrlChange(r) {
                return (
                    this._urlChangeListeners.push(r),
                    (this._urlChangeSubscription ??= this.subscribe((o) => {
                        this._notifyUrlChangeListeners(o.url, o.state);
                    })),
                    () => {
                        let o = this._urlChangeListeners.indexOf(r);
                        this._urlChangeListeners.splice(o, 1),
                            this._urlChangeListeners.length === 0 &&
                                (this._urlChangeSubscription?.unsubscribe(),
                                (this._urlChangeSubscription = null));
                    }
                );
            }
            _notifyUrlChangeListeners(r = '', o) {
                this._urlChangeListeners.forEach((i) => i(r, o));
            }
            subscribe(r, o, i) {
                return this._subject.subscribe({
                    next: r,
                    error: o,
                    complete: i,
                });
            }
        };
        (e.normalizeQueryParams = tt),
            (e.joinWithSlash = ku),
            (e.stripTrailingSlash = sp),
            (e.ɵfac = function (o) {
                return new (o || e)(oe(ai));
            }),
            (e.ɵprov = $({
                token: e,
                factory: () => lI(),
                providedIn: 'root',
            }));
        let t = e;
        return t;
    })();
function lI() {
    return new uI(oe(ai));
}
function cI(t, e) {
    if (!t || !e.startsWith(t)) return e;
    let n = e.substring(t.length);
    return n === '' || ['/', ';', '?', '#'].includes(n[0]) ? n : e;
}
function ap(t) {
    return t.replace(/\/index.html$/, '');
}
function dI(t) {
    if (new RegExp('^(https?:)?//').test(t)) {
        let [, n] = t.split(/\/\/[^\/]+/);
        return n;
    }
    return t;
}
var gp = {
        ADP: [void 0, void 0, 0],
        AFN: [void 0, '\u060B', 0],
        ALL: [void 0, void 0, 0],
        AMD: [void 0, '\u058F', 2],
        AOA: [void 0, 'Kz'],
        ARS: [void 0, '$'],
        AUD: ['A$', '$'],
        AZN: [void 0, '\u20BC'],
        BAM: [void 0, 'KM'],
        BBD: [void 0, '$'],
        BDT: [void 0, '\u09F3'],
        BHD: [void 0, void 0, 3],
        BIF: [void 0, void 0, 0],
        BMD: [void 0, '$'],
        BND: [void 0, '$'],
        BOB: [void 0, 'Bs'],
        BRL: ['R$'],
        BSD: [void 0, '$'],
        BWP: [void 0, 'P'],
        BYN: [void 0, void 0, 2],
        BYR: [void 0, void 0, 0],
        BZD: [void 0, '$'],
        CAD: ['CA$', '$', 2],
        CHF: [void 0, void 0, 2],
        CLF: [void 0, void 0, 4],
        CLP: [void 0, '$', 0],
        CNY: ['CN\xA5', '\xA5'],
        COP: [void 0, '$', 2],
        CRC: [void 0, '\u20A1', 2],
        CUC: [void 0, '$'],
        CUP: [void 0, '$'],
        CZK: [void 0, 'K\u010D', 2],
        DJF: [void 0, void 0, 0],
        DKK: [void 0, 'kr', 2],
        DOP: [void 0, '$'],
        EGP: [void 0, 'E\xA3'],
        ESP: [void 0, '\u20A7', 0],
        EUR: ['\u20AC'],
        FJD: [void 0, '$'],
        FKP: [void 0, '\xA3'],
        GBP: ['\xA3'],
        GEL: [void 0, '\u20BE'],
        GHS: [void 0, 'GH\u20B5'],
        GIP: [void 0, '\xA3'],
        GNF: [void 0, 'FG', 0],
        GTQ: [void 0, 'Q'],
        GYD: [void 0, '$', 2],
        HKD: ['HK$', '$'],
        HNL: [void 0, 'L'],
        HRK: [void 0, 'kn'],
        HUF: [void 0, 'Ft', 2],
        IDR: [void 0, 'Rp', 2],
        ILS: ['\u20AA'],
        INR: ['\u20B9'],
        IQD: [void 0, void 0, 0],
        IRR: [void 0, void 0, 0],
        ISK: [void 0, 'kr', 0],
        ITL: [void 0, void 0, 0],
        JMD: [void 0, '$'],
        JOD: [void 0, void 0, 3],
        JPY: ['\xA5', void 0, 0],
        KHR: [void 0, '\u17DB'],
        KMF: [void 0, 'CF', 0],
        KPW: [void 0, '\u20A9', 0],
        KRW: ['\u20A9', void 0, 0],
        KWD: [void 0, void 0, 3],
        KYD: [void 0, '$'],
        KZT: [void 0, '\u20B8'],
        LAK: [void 0, '\u20AD', 0],
        LBP: [void 0, 'L\xA3', 0],
        LKR: [void 0, 'Rs'],
        LRD: [void 0, '$'],
        LTL: [void 0, 'Lt'],
        LUF: [void 0, void 0, 0],
        LVL: [void 0, 'Ls'],
        LYD: [void 0, void 0, 3],
        MGA: [void 0, 'Ar', 0],
        MGF: [void 0, void 0, 0],
        MMK: [void 0, 'K', 0],
        MNT: [void 0, '\u20AE', 2],
        MRO: [void 0, void 0, 0],
        MUR: [void 0, 'Rs', 2],
        MXN: ['MX$', '$'],
        MYR: [void 0, 'RM'],
        NAD: [void 0, '$'],
        NGN: [void 0, '\u20A6'],
        NIO: [void 0, 'C$'],
        NOK: [void 0, 'kr', 2],
        NPR: [void 0, 'Rs'],
        NZD: ['NZ$', '$'],
        OMR: [void 0, void 0, 3],
        PHP: ['\u20B1'],
        PKR: [void 0, 'Rs', 2],
        PLN: [void 0, 'z\u0142'],
        PYG: [void 0, '\u20B2', 0],
        RON: [void 0, 'lei'],
        RSD: [void 0, void 0, 0],
        RUB: [void 0, '\u20BD'],
        RWF: [void 0, 'RF', 0],
        SBD: [void 0, '$'],
        SEK: [void 0, 'kr', 2],
        SGD: [void 0, '$'],
        SHP: [void 0, '\xA3'],
        SLE: [void 0, void 0, 2],
        SLL: [void 0, void 0, 0],
        SOS: [void 0, void 0, 0],
        SRD: [void 0, '$'],
        SSP: [void 0, '\xA3'],
        STD: [void 0, void 0, 0],
        STN: [void 0, 'Db'],
        SYP: [void 0, '\xA3', 0],
        THB: [void 0, '\u0E3F'],
        TMM: [void 0, void 0, 0],
        TND: [void 0, void 0, 3],
        TOP: [void 0, 'T$'],
        TRL: [void 0, void 0, 0],
        TRY: [void 0, '\u20BA'],
        TTD: [void 0, '$'],
        TWD: ['NT$', '$', 2],
        TZS: [void 0, void 0, 2],
        UAH: [void 0, '\u20B4'],
        UGX: [void 0, void 0, 0],
        USD: ['$'],
        UYI: [void 0, void 0, 0],
        UYU: [void 0, '$'],
        UYW: [void 0, void 0, 4],
        UZS: [void 0, void 0, 2],
        VEF: [void 0, 'Bs', 2],
        VND: ['\u20AB', void 0, 0],
        VUV: [void 0, void 0, 0],
        XAF: ['FCFA', void 0, 0],
        XCD: ['EC$', '$'],
        XOF: ['F\u202FCFA', void 0, 0],
        XPF: ['CFPF', void 0, 0],
        XXX: ['\xA4'],
        YER: [void 0, void 0, 0],
        ZAR: [void 0, 'R'],
        ZMK: [void 0, void 0, 0],
        ZMW: [void 0, 'ZK'],
        ZWD: [void 0, void 0, 0],
    },
    yp = (function (t) {
        return (
            (t[(t.Decimal = 0)] = 'Decimal'),
            (t[(t.Percent = 1)] = 'Percent'),
            (t[(t.Currency = 2)] = 'Currency'),
            (t[(t.Scientific = 3)] = 'Scientific'),
            t
        );
    })(yp || {});
var nt = {
    Decimal: 0,
    Group: 1,
    List: 2,
    PercentSign: 3,
    PlusSign: 4,
    MinusSign: 5,
    Exponential: 6,
    SuperscriptingExponent: 7,
    PerMille: 8,
    Infinity: 9,
    NaN: 10,
    TimeSeparator: 11,
    CurrencyDecimal: 12,
    CurrencyGroup: 13,
};
function cr(t, e) {
    let n = ni(t),
        r = n[Wt.NumberSymbols][e];
    if (typeof r > 'u') {
        if (e === nt.CurrencyDecimal) return n[Wt.NumberSymbols][nt.Decimal];
        if (e === nt.CurrencyGroup) return n[Wt.NumberSymbols][nt.Group];
    }
    return r;
}
function fI(t, e) {
    return ni(t)[Wt.NumberFormats][e];
}
function hI(t) {
    return ni(t)[Wt.Currencies];
}
function pI(t, e, n = 'en') {
    let r = hI(n)[t] || gp[t] || [],
        o = r[1];
    return e === 'narrow' && typeof o == 'string' ? o : r[0] || t;
}
var mI = 2;
function gI(t) {
    let e,
        n = gp[t];
    return n && (e = n[2]), typeof e == 'number' ? e : mI;
}
var yI = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
    up = 22,
    si = '.',
    dr = '0',
    vI = ';',
    DI = ',',
    Cu = '#',
    lp = '\xA4';
function EI(t, e, n, r, o, i, s = !1) {
    let a = '',
        u = !1;
    if (!isFinite(t)) a = cr(n, nt.Infinity);
    else {
        let l = _I(t);
        s && (l = II(l));
        let c = e.minInt,
            d = e.minFrac,
            h = e.maxFrac;
        if (i) {
            let N = i.match(yI);
            if (N === null) throw new Error(`${i} is not a valid digit info`);
            let R = N[1],
                j = N[3],
                te = N[5];
            R != null && (c = Su(R)),
                j != null && (d = Su(j)),
                te != null ? (h = Su(te)) : j != null && d > h && (h = d);
        }
        CI(l, d, h);
        let f = l.digits,
            p = l.integerLen,
            m = l.exponent,
            b = [];
        for (u = f.every((N) => !N); p < c; p++) f.unshift(0);
        for (; p < 0; p++) f.unshift(0);
        p > 0 ? (b = f.splice(p, f.length)) : ((b = f), (f = [0]));
        let w = [];
        for (
            f.length >= e.lgSize &&
            w.unshift(f.splice(-e.lgSize, f.length).join(''));
            f.length > e.gSize;

        )
            w.unshift(f.splice(-e.gSize, f.length).join(''));
        f.length && w.unshift(f.join('')),
            (a = w.join(cr(n, r))),
            b.length && (a += cr(n, o) + b.join('')),
            m && (a += cr(n, nt.Exponential) + '+' + m);
    }
    return (
        t < 0 && !u
            ? (a = e.negPre + a + e.negSuf)
            : (a = e.posPre + a + e.posSuf),
        a
    );
}
function wI(t, e, n, r, o) {
    let i = fI(e, yp.Currency),
        s = bI(i, cr(e, nt.MinusSign));
    return (
        (s.minFrac = gI(r)),
        (s.maxFrac = s.minFrac),
        EI(t, s, e, nt.CurrencyGroup, nt.CurrencyDecimal, o)
            .replace(lp, n)
            .replace(lp, '')
            .trim()
    );
}
function bI(t, e = '-') {
    let n = {
            minInt: 1,
            minFrac: 0,
            maxFrac: 0,
            posPre: '',
            posSuf: '',
            negPre: '',
            negSuf: '',
            gSize: 0,
            lgSize: 0,
        },
        r = t.split(vI),
        o = r[0],
        i = r[1],
        s =
            o.indexOf(si) !== -1
                ? o.split(si)
                : [
                      o.substring(0, o.lastIndexOf(dr) + 1),
                      o.substring(o.lastIndexOf(dr) + 1),
                  ],
        a = s[0],
        u = s[1] || '';
    n.posPre = a.substring(0, a.indexOf(Cu));
    for (let c = 0; c < u.length; c++) {
        let d = u.charAt(c);
        d === dr
            ? (n.minFrac = n.maxFrac = c + 1)
            : d === Cu
              ? (n.maxFrac = c + 1)
              : (n.posSuf += d);
    }
    let l = a.split(DI);
    if (
        ((n.gSize = l[1] ? l[1].length : 0),
        (n.lgSize = l[2] || l[1] ? (l[2] || l[1]).length : 0),
        i)
    ) {
        let c = o.length - n.posPre.length - n.posSuf.length,
            d = i.indexOf(Cu);
        (n.negPre = i.substring(0, d).replace(/'/g, '')),
            (n.negSuf = i.slice(d + c).replace(/'/g, ''));
    } else (n.negPre = e + n.posPre), (n.negSuf = n.posSuf);
    return n;
}
function II(t) {
    if (t.digits[0] === 0) return t;
    let e = t.digits.length - t.integerLen;
    return (
        t.exponent
            ? (t.exponent += 2)
            : (e === 0 ? t.digits.push(0, 0) : e === 1 && t.digits.push(0),
              (t.integerLen += 2)),
        t
    );
}
function _I(t) {
    let e = Math.abs(t) + '',
        n = 0,
        r,
        o,
        i,
        s,
        a;
    for (
        (o = e.indexOf(si)) > -1 && (e = e.replace(si, '')),
            (i = e.search(/e/i)) > 0
                ? (o < 0 && (o = i),
                  (o += +e.slice(i + 1)),
                  (e = e.substring(0, i)))
                : o < 0 && (o = e.length),
            i = 0;
        e.charAt(i) === dr;
        i++
    );
    if (i === (a = e.length)) (r = [0]), (o = 1);
    else {
        for (a--; e.charAt(a) === dr; ) a--;
        for (o -= i, r = [], s = 0; i <= a; i++, s++)
            r[s] = Number(e.charAt(i));
    }
    return (
        o > up && ((r = r.splice(0, up - 1)), (n = o - 1), (o = 1)),
        { digits: r, exponent: n, integerLen: o }
    );
}
function CI(t, e, n) {
    if (e > n)
        throw new Error(
            `The minimum number of digits after fraction (${e}) is higher than the maximum (${n}).`,
        );
    let r = t.digits,
        o = r.length - t.integerLen,
        i = Math.min(Math.max(e, o), n),
        s = i + t.integerLen,
        a = r[s];
    if (s > 0) {
        r.splice(Math.max(t.integerLen, s));
        for (let d = s; d < r.length; d++) r[d] = 0;
    } else {
        (o = Math.max(0, o)),
            (t.integerLen = 1),
            (r.length = Math.max(1, (s = i + 1))),
            (r[0] = 0);
        for (let d = 1; d < s; d++) r[d] = 0;
    }
    if (a >= 5)
        if (s - 1 < 0) {
            for (let d = 0; d > s; d--) r.unshift(0), t.integerLen++;
            r.unshift(1), t.integerLen++;
        } else r[s - 1]++;
    for (; o < Math.max(0, i); o++) r.push(0);
    let u = i !== 0,
        l = e + t.integerLen,
        c = r.reduceRight(function (d, h, f, p) {
            return (
                (h = h + d),
                (p[f] = h < 10 ? h : h - 10),
                u && (p[f] === 0 && f >= l ? p.pop() : (u = !1)),
                h >= 10 ? 1 : 0
            );
        }, 0);
    c && (r.unshift(c), t.integerLen++);
}
function Su(t) {
    let e = parseInt(t);
    if (isNaN(e)) throw new Error('Invalid integer literal when parsing ' + t);
    return e;
}
function WF(t, e) {
    e = encodeURIComponent(e);
    for (let n of t.split(';')) {
        let r = n.indexOf('='),
            [o, i] = r == -1 ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
        if (o.trim() === e) return decodeURIComponent(i);
    }
    return null;
}
var Tu = /\s+/,
    cp = [],
    QF = (() => {
        let e = class e {
            constructor(r, o) {
                (this._ngEl = r),
                    (this._renderer = o),
                    (this.initialClasses = cp),
                    (this.stateMap = new Map());
            }
            set klass(r) {
                this.initialClasses = r != null ? r.trim().split(Tu) : cp;
            }
            set ngClass(r) {
                this.rawClass = typeof r == 'string' ? r.trim().split(Tu) : r;
            }
            ngDoCheck() {
                for (let o of this.initialClasses) this._updateState(o, !0);
                let r = this.rawClass;
                if (Array.isArray(r) || r instanceof Set)
                    for (let o of r) this._updateState(o, !0);
                else if (r != null)
                    for (let o of Object.keys(r)) this._updateState(o, !!r[o]);
                this._applyStateDiff();
            }
            _updateState(r, o) {
                let i = this.stateMap.get(r);
                i !== void 0
                    ? (i.enabled !== o && ((i.changed = !0), (i.enabled = o)),
                      (i.touched = !0))
                    : this.stateMap.set(r, {
                          enabled: o,
                          changed: !0,
                          touched: !0,
                      });
            }
            _applyStateDiff() {
                for (let r of this.stateMap) {
                    let o = r[0],
                        i = r[1];
                    i.changed
                        ? (this._toggleClass(o, i.enabled), (i.changed = !1))
                        : i.touched ||
                          (i.enabled && this._toggleClass(o, !1),
                          this.stateMap.delete(o)),
                        (i.touched = !1);
                }
            }
            _toggleClass(r, o) {
                (r = r.trim()),
                    r.length > 0 &&
                        r.split(Tu).forEach((i) => {
                            o
                                ? this._renderer.addClass(
                                      this._ngEl.nativeElement,
                                      i,
                                  )
                                : this._renderer.removeClass(
                                      this._ngEl.nativeElement,
                                      i,
                                  );
                        });
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)(K(vt), K(ti));
        }),
            (e.ɵdir = wn({
                type: e,
                selectors: [['', 'ngClass', '']],
                inputs: {
                    klass: [ct.None, 'class', 'klass'],
                    ngClass: 'ngClass',
                },
                standalone: !0,
            }));
        let t = e;
        return t;
    })();
var Mu = class {
        constructor(e, n, r, o) {
            (this.$implicit = e),
                (this.ngForOf = n),
                (this.index = r),
                (this.count = o);
        }
        get first() {
            return this.index === 0;
        }
        get last() {
            return this.index === this.count - 1;
        }
        get even() {
            return this.index % 2 === 0;
        }
        get odd() {
            return !this.even;
        }
    },
    KF = (() => {
        let e = class e {
            set ngForOf(r) {
                (this._ngForOf = r), (this._ngForOfDirty = !0);
            }
            set ngForTrackBy(r) {
                this._trackByFn = r;
            }
            get ngForTrackBy() {
                return this._trackByFn;
            }
            constructor(r, o, i) {
                (this._viewContainer = r),
                    (this._template = o),
                    (this._differs = i),
                    (this._ngForOf = null),
                    (this._ngForOfDirty = !0),
                    (this._differ = null);
            }
            set ngForTemplate(r) {
                r && (this._template = r);
            }
            ngDoCheck() {
                if (this._ngForOfDirty) {
                    this._ngForOfDirty = !1;
                    let r = this._ngForOf;
                    if (!this._differ && r)
                        if (0)
                            try {
                            } catch {}
                        else
                            this._differ = this._differs
                                .find(r)
                                .create(this.ngForTrackBy);
                }
                if (this._differ) {
                    let r = this._differ.diff(this._ngForOf);
                    r && this._applyChanges(r);
                }
            }
            _applyChanges(r) {
                let o = this._viewContainer;
                r.forEachOperation((i, s, a) => {
                    if (i.previousIndex == null)
                        o.createEmbeddedView(
                            this._template,
                            new Mu(i.item, this._ngForOf, -1, -1),
                            a === null ? void 0 : a,
                        );
                    else if (a == null) o.remove(s === null ? void 0 : s);
                    else if (s !== null) {
                        let u = o.get(s);
                        o.move(u, a), dp(u, i);
                    }
                });
                for (let i = 0, s = o.length; i < s; i++) {
                    let u = o.get(i).context;
                    (u.index = i), (u.count = s), (u.ngForOf = this._ngForOf);
                }
                r.forEachIdentityChange((i) => {
                    let s = o.get(i.currentIndex);
                    dp(s, i);
                });
            }
            static ngTemplateContextGuard(r, o) {
                return !0;
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)(K(Gt), K(Ut), K(wu));
        }),
            (e.ɵdir = wn({
                type: e,
                selectors: [['', 'ngFor', '', 'ngForOf', '']],
                inputs: {
                    ngForOf: 'ngForOf',
                    ngForTrackBy: 'ngForTrackBy',
                    ngForTemplate: 'ngForTemplate',
                },
                standalone: !0,
            }));
        let t = e;
        return t;
    })();
function dp(t, e) {
    t.context.$implicit = e.item;
}
var YF = (() => {
        let e = class e {
            constructor(r, o) {
                (this._viewContainer = r),
                    (this._context = new xu()),
                    (this._thenTemplateRef = null),
                    (this._elseTemplateRef = null),
                    (this._thenViewRef = null),
                    (this._elseViewRef = null),
                    (this._thenTemplateRef = o);
            }
            set ngIf(r) {
                (this._context.$implicit = this._context.ngIf = r),
                    this._updateView();
            }
            set ngIfThen(r) {
                fp('ngIfThen', r),
                    (this._thenTemplateRef = r),
                    (this._thenViewRef = null),
                    this._updateView();
            }
            set ngIfElse(r) {
                fp('ngIfElse', r),
                    (this._elseTemplateRef = r),
                    (this._elseViewRef = null),
                    this._updateView();
            }
            _updateView() {
                this._context.$implicit
                    ? this._thenViewRef ||
                      (this._viewContainer.clear(),
                      (this._elseViewRef = null),
                      this._thenTemplateRef &&
                          (this._thenViewRef =
                              this._viewContainer.createEmbeddedView(
                                  this._thenTemplateRef,
                                  this._context,
                              )))
                    : this._elseViewRef ||
                      (this._viewContainer.clear(),
                      (this._thenViewRef = null),
                      this._elseTemplateRef &&
                          (this._elseViewRef =
                              this._viewContainer.createEmbeddedView(
                                  this._elseTemplateRef,
                                  this._context,
                              )));
            }
            static ngTemplateContextGuard(r, o) {
                return !0;
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)(K(Gt), K(Ut));
        }),
            (e.ɵdir = wn({
                type: e,
                selectors: [['', 'ngIf', '']],
                inputs: {
                    ngIf: 'ngIf',
                    ngIfThen: 'ngIfThen',
                    ngIfElse: 'ngIfElse',
                },
                standalone: !0,
            }));
        let t = e;
        return t;
    })(),
    xu = class {
        constructor() {
            (this.$implicit = null), (this.ngIf = null);
        }
    };
function fp(t, e) {
    if (!!!(!e || e.createEmbeddedView))
        throw new Error(`${t} must be a TemplateRef, but received '${ae(e)}'.`);
}
var ZF = (() => {
        let e = class e {
            constructor(r, o, i) {
                (this._ngEl = r),
                    (this._differs = o),
                    (this._renderer = i),
                    (this._ngStyle = null),
                    (this._differ = null);
            }
            set ngStyle(r) {
                (this._ngStyle = r),
                    !this._differ &&
                        r &&
                        (this._differ = this._differs.find(r).create());
            }
            ngDoCheck() {
                if (this._differ) {
                    let r = this._differ.diff(this._ngStyle);
                    r && this._applyChanges(r);
                }
            }
            _setStyle(r, o) {
                let [i, s] = r.split('.'),
                    a = i.indexOf('-') === -1 ? void 0 : Xn.DashCase;
                o != null
                    ? this._renderer.setStyle(
                          this._ngEl.nativeElement,
                          i,
                          s ? `${o}${s}` : o,
                          a,
                      )
                    : this._renderer.removeStyle(
                          this._ngEl.nativeElement,
                          i,
                          a,
                      );
            }
            _applyChanges(r) {
                r.forEachRemovedItem((o) => this._setStyle(o.key, null)),
                    r.forEachAddedItem((o) =>
                        this._setStyle(o.key, o.currentValue),
                    ),
                    r.forEachChangedItem((o) =>
                        this._setStyle(o.key, o.currentValue),
                    );
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)(K(vt), K(bu), K(ti));
        }),
            (e.ɵdir = wn({
                type: e,
                selectors: [['', 'ngStyle', '']],
                inputs: { ngStyle: 'ngStyle' },
                standalone: !0,
            }));
        let t = e;
        return t;
    })(),
    JF = (() => {
        let e = class e {
            constructor(r) {
                (this._viewContainerRef = r),
                    (this._viewRef = null),
                    (this.ngTemplateOutletContext = null),
                    (this.ngTemplateOutlet = null),
                    (this.ngTemplateOutletInjector = null);
            }
            ngOnChanges(r) {
                if (this._shouldRecreateView(r)) {
                    let o = this._viewContainerRef;
                    if (
                        (this._viewRef && o.remove(o.indexOf(this._viewRef)),
                        !this.ngTemplateOutlet)
                    ) {
                        this._viewRef = null;
                        return;
                    }
                    let i = this._createContextForwardProxy();
                    this._viewRef = o.createEmbeddedView(
                        this.ngTemplateOutlet,
                        i,
                        { injector: this.ngTemplateOutletInjector ?? void 0 },
                    );
                }
            }
            _shouldRecreateView(r) {
                return !!r.ngTemplateOutlet || !!r.ngTemplateOutletInjector;
            }
            _createContextForwardProxy() {
                return new Proxy(
                    {},
                    {
                        set: (r, o, i) =>
                            this.ngTemplateOutletContext
                                ? Reflect.set(
                                      this.ngTemplateOutletContext,
                                      o,
                                      i,
                                  )
                                : !1,
                        get: (r, o, i) => {
                            if (this.ngTemplateOutletContext)
                                return Reflect.get(
                                    this.ngTemplateOutletContext,
                                    o,
                                    i,
                                );
                        },
                    },
                );
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)(K(Gt));
        }),
            (e.ɵdir = wn({
                type: e,
                selectors: [['', 'ngTemplateOutlet', '']],
                inputs: {
                    ngTemplateOutletContext: 'ngTemplateOutletContext',
                    ngTemplateOutlet: 'ngTemplateOutlet',
                    ngTemplateOutletInjector: 'ngTemplateOutletInjector',
                },
                standalone: !0,
                features: [Pa],
            }));
        let t = e;
        return t;
    })();
function Lu(t, e) {
    return new g(2100, !1);
}
var Nu = class {
        createSubscription(e, n) {
            return Iu(() =>
                e.subscribe({
                    next: n,
                    error: (r) => {
                        throw r;
                    },
                }),
            );
        }
        dispose(e) {
            Iu(() => e.unsubscribe());
        }
    },
    Au = class {
        createSubscription(e, n) {
            return e.then(n, (r) => {
                throw r;
            });
        }
        dispose(e) {}
    },
    SI = new Au(),
    TI = new Nu(),
    XF = (() => {
        let e = class e {
            constructor(r) {
                (this._latestValue = null),
                    (this.markForCheckOnValueUpdate = !0),
                    (this._subscription = null),
                    (this._obj = null),
                    (this._strategy = null),
                    (this._ref = r);
            }
            ngOnDestroy() {
                this._subscription && this._dispose(), (this._ref = null);
            }
            transform(r) {
                if (!this._obj) {
                    if (r)
                        try {
                            (this.markForCheckOnValueUpdate = !1),
                                this._subscribe(r);
                        } finally {
                            this.markForCheckOnValueUpdate = !0;
                        }
                    return this._latestValue;
                }
                return r !== this._obj
                    ? (this._dispose(), this.transform(r))
                    : this._latestValue;
            }
            _subscribe(r) {
                (this._obj = r),
                    (this._strategy = this._selectStrategy(r)),
                    (this._subscription = this._strategy.createSubscription(
                        r,
                        (o) => this._updateLatestValue(r, o),
                    ));
            }
            _selectStrategy(r) {
                if (oi(r)) return SI;
                if (vu(r)) return TI;
                throw Lu(e, r);
            }
            _dispose() {
                this._strategy.dispose(this._subscription),
                    (this._latestValue = null),
                    (this._subscription = null),
                    (this._obj = null);
            }
            _updateLatestValue(r, o) {
                r === this._obj &&
                    ((this._latestValue = o),
                    this.markForCheckOnValueUpdate &&
                        this._ref?.markForCheck());
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)(K(Eu, 16));
        }),
            (e.ɵpipe = ko({
                name: 'async',
                type: e,
                pure: !1,
                standalone: !0,
            }));
        let t = e;
        return t;
    })();
var eP = (() => {
    let e = class e {
        transform(r) {
            if (r == null) return null;
            if (typeof r != 'string') throw Lu(e, r);
            return r.toUpperCase();
        }
    };
    (e.ɵfac = function (o) {
        return new (o || e)();
    }),
        (e.ɵpipe = ko({
            name: 'uppercase',
            type: e,
            pure: !0,
            standalone: !0,
        }));
    let t = e;
    return t;
})();
var tP = (() => {
    let e = class e {
        constructor(r, o = 'USD') {
            (this._locale = r), (this._defaultCurrencyCode = o);
        }
        transform(r, o = this._defaultCurrencyCode, i = 'symbol', s, a) {
            if (!MI(r)) return null;
            (a ||= this._locale),
                typeof i == 'boolean' && (i = i ? 'symbol' : 'code');
            let u = o || this._defaultCurrencyCode;
            i !== 'code' &&
                (i === 'symbol' || i === 'symbol-narrow'
                    ? (u = pI(u, i === 'symbol' ? 'wide' : 'narrow', a))
                    : (u = i));
            try {
                let l = xI(r);
                return wI(l, a, u, o, s);
            } catch (l) {
                throw Lu(e, l.message);
            }
        }
    };
    (e.ɵfac = function (o) {
        return new (o || e)(K(ii, 16), K(np, 16));
    }),
        (e.ɵpipe = ko({ name: 'currency', type: e, pure: !0, standalone: !0 }));
    let t = e;
    return t;
})();
function MI(t) {
    return !(t == null || t === '' || t !== t);
}
function xI(t) {
    if (typeof t == 'string' && !isNaN(Number(t) - parseFloat(t)))
        return Number(t);
    if (typeof t != 'number') throw new Error(`${t} is not a number`);
    return t;
}
var nP = (() => {
        let e = class e {};
        (e.ɵfac = function (o) {
            return new (o || e)();
        }),
            (e.ɵmod = Cd({ type: e })),
            (e.ɵinj = cd({}));
        let t = e;
        return t;
    })(),
    NI = 'browser',
    AI = 'server';
function OI(t) {
    return t === NI;
}
function rP(t) {
    return t === AI;
}
var oP = (() => {
        let e = class e {};
        e.ɵprov = $({
            token: e,
            providedIn: 'root',
            factory: () => (OI(O($o)) ? new Ou(O(Pu), window) : new Fu()),
        });
        let t = e;
        return t;
    })(),
    Ou = class {
        constructor(e, n) {
            (this.document = e),
                (this.window = n),
                (this.offset = () => [0, 0]);
        }
        setOffset(e) {
            Array.isArray(e) ? (this.offset = () => e) : (this.offset = e);
        }
        getScrollPosition() {
            return [this.window.scrollX, this.window.scrollY];
        }
        scrollToPosition(e) {
            this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
            let n = FI(this.document, e);
            n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(e) {
            this.window.history.scrollRestoration = e;
        }
        scrollToElement(e) {
            let n = e.getBoundingClientRect(),
                r = n.left + this.window.pageXOffset,
                o = n.top + this.window.pageYOffset,
                i = this.offset();
            this.window.scrollTo(r - i[0], o - i[1]);
        }
    };
function FI(t, e) {
    let n = t.getElementById(e) || t.getElementsByName(e)[0];
    if (n) return n;
    if (
        typeof t.createTreeWalker == 'function' &&
        t.body &&
        typeof t.body.attachShadow == 'function'
    ) {
        let r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
            o = r.currentNode;
        for (; o; ) {
            let i = o.shadowRoot;
            if (i) {
                let s = i.getElementById(e) || i.querySelector(`[name="${e}"]`);
                if (s) return s;
            }
            o = r.nextNode();
        }
    }
    return null;
}
var Fu = class {
        setOffset(e) {}
        getScrollPosition() {
            return [0, 0];
        }
        scrollToPosition(e) {}
        scrollToAnchor(e) {}
        setHistoryScrollRestoration(e) {}
    },
    hp = class {};
var M = (function (t) {
        return (
            (t[(t.State = 0)] = 'State'),
            (t[(t.Transition = 1)] = 'Transition'),
            (t[(t.Sequence = 2)] = 'Sequence'),
            (t[(t.Group = 3)] = 'Group'),
            (t[(t.Animate = 4)] = 'Animate'),
            (t[(t.Keyframes = 5)] = 'Keyframes'),
            (t[(t.Style = 6)] = 'Style'),
            (t[(t.Trigger = 7)] = 'Trigger'),
            (t[(t.Reference = 8)] = 'Reference'),
            (t[(t.AnimateChild = 9)] = 'AnimateChild'),
            (t[(t.AnimateRef = 10)] = 'AnimateRef'),
            (t[(t.Query = 11)] = 'Query'),
            (t[(t.Stagger = 12)] = 'Stagger'),
            t
        );
    })(M || {}),
    He = '*';
function aP(t, e) {
    return { type: M.Trigger, name: t, definitions: e, options: {} };
}
function vp(t, e = null) {
    return { type: M.Sequence, steps: t, options: e };
}
function ju(t) {
    return { type: M.Style, styles: t, offset: null };
}
function uP(t, e, n = null) {
    return { type: M.Transition, expr: t, animation: e, options: n };
}
function lP(t = null) {
    return { type: M.AnimateChild, options: t };
}
function cP(t, e, n = null) {
    return { type: M.Query, selector: t, animation: e, options: n };
}
var Dt = class {
        constructor(e = 0, n = 0) {
            (this._onDoneFns = []),
                (this._onStartFns = []),
                (this._onDestroyFns = []),
                (this._originalOnDoneFns = []),
                (this._originalOnStartFns = []),
                (this._started = !1),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._position = 0),
                (this.parentPlayer = null),
                (this.totalTime = e + n);
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        onStart(e) {
            this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
            this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        hasStarted() {
            return this._started;
        }
        init() {}
        play() {
            this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
                (this._started = !0);
        }
        triggerMicrotask() {
            queueMicrotask(() => this._onFinish());
        }
        _onStart() {
            this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
            this._onFinish();
        }
        destroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this.hasStarted() || this._onStart(),
                this.finish(),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        reset() {
            (this._started = !1),
                (this._finished = !1),
                (this._onStartFns = this._originalOnStartFns),
                (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(e) {
            this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
            return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
            let n = e == 'start' ? this._onStartFns : this._onDoneFns;
            n.forEach((r) => r()), (n.length = 0);
        }
    },
    fr = class {
        constructor(e) {
            (this._onDoneFns = []),
                (this._onStartFns = []),
                (this._finished = !1),
                (this._started = !1),
                (this._destroyed = !1),
                (this._onDestroyFns = []),
                (this.parentPlayer = null),
                (this.totalTime = 0),
                (this.players = e);
            let n = 0,
                r = 0,
                o = 0,
                i = this.players.length;
            i == 0
                ? queueMicrotask(() => this._onFinish())
                : this.players.forEach((s) => {
                      s.onDone(() => {
                          ++n == i && this._onFinish();
                      }),
                          s.onDestroy(() => {
                              ++r == i && this._onDestroy();
                          }),
                          s.onStart(() => {
                              ++o == i && this._onStart();
                          });
                  }),
                (this.totalTime = this.players.reduce(
                    (s, a) => Math.max(s, a.totalTime),
                    0,
                ));
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        init() {
            this.players.forEach((e) => e.init());
        }
        onStart(e) {
            this._onStartFns.push(e);
        }
        _onStart() {
            this.hasStarted() ||
                ((this._started = !0),
                this._onStartFns.forEach((e) => e()),
                (this._onStartFns = []));
        }
        onDone(e) {
            this._onDoneFns.push(e);
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        hasStarted() {
            return this._started;
        }
        play() {
            this.parentPlayer || this.init(),
                this._onStart(),
                this.players.forEach((e) => e.play());
        }
        pause() {
            this.players.forEach((e) => e.pause());
        }
        restart() {
            this.players.forEach((e) => e.restart());
        }
        finish() {
            this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
            this._onDestroy();
        }
        _onDestroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this._onFinish(),
                this.players.forEach((e) => e.destroy()),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        reset() {
            this.players.forEach((e) => e.reset()),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._started = !1);
        }
        setPosition(e) {
            let n = e * this.totalTime;
            this.players.forEach((r) => {
                let o = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
                r.setPosition(o);
            });
        }
        getPosition() {
            let e = this.players.reduce(
                (n, r) => (n === null || r.totalTime > n.totalTime ? r : n),
                null,
            );
            return e != null ? e.getPosition() : 0;
        }
        beforeDestroy() {
            this.players.forEach((e) => {
                e.beforeDestroy && e.beforeDestroy();
            });
        }
        triggerCallback(e) {
            let n = e == 'start' ? this._onStartFns : this._onDoneFns;
            n.forEach((r) => r()), (n.length = 0);
        }
    },
    ui = '!';
function Dp(t) {
    return new g(3e3, !1);
}
function PI() {
    return new g(3100, !1);
}
function RI() {
    return new g(3101, !1);
}
function kI(t) {
    return new g(3001, !1);
}
function LI(t) {
    return new g(3003, !1);
}
function jI(t) {
    return new g(3004, !1);
}
function VI(t, e) {
    return new g(3005, !1);
}
function BI() {
    return new g(3006, !1);
}
function $I() {
    return new g(3007, !1);
}
function HI(t, e) {
    return new g(3008, !1);
}
function UI(t) {
    return new g(3002, !1);
}
function zI(t, e, n, r, o) {
    return new g(3010, !1);
}
function qI() {
    return new g(3011, !1);
}
function GI() {
    return new g(3012, !1);
}
function WI() {
    return new g(3200, !1);
}
function QI() {
    return new g(3202, !1);
}
function KI() {
    return new g(3013, !1);
}
function YI(t) {
    return new g(3014, !1);
}
function ZI(t) {
    return new g(3015, !1);
}
function JI(t) {
    return new g(3016, !1);
}
function XI(t) {
    return new g(3500, !1);
}
function e_(t) {
    return new g(3501, !1);
}
function t_(t, e) {
    return new g(3404, !1);
}
function n_(t) {
    return new g(3502, !1);
}
function r_(t) {
    return new g(3503, !1);
}
function o_() {
    return new g(3300, !1);
}
function i_(t) {
    return new g(3504, !1);
}
function s_(t) {
    return new g(3301, !1);
}
function a_(t, e) {
    return new g(3302, !1);
}
function u_(t) {
    return new g(3303, !1);
}
function l_(t, e) {
    return new g(3400, !1);
}
function c_(t) {
    return new g(3401, !1);
}
function d_(t) {
    return new g(3402, !1);
}
function f_(t, e) {
    return new g(3505, !1);
}
var h_ = new Set([
    '-moz-outline-radius',
    '-moz-outline-radius-bottomleft',
    '-moz-outline-radius-bottomright',
    '-moz-outline-radius-topleft',
    '-moz-outline-radius-topright',
    '-ms-grid-columns',
    '-ms-grid-rows',
    '-webkit-line-clamp',
    '-webkit-text-fill-color',
    '-webkit-text-stroke',
    '-webkit-text-stroke-color',
    'accent-color',
    'all',
    'backdrop-filter',
    'background',
    'background-color',
    'background-position',
    'background-size',
    'block-size',
    'border',
    'border-block-end',
    'border-block-end-color',
    'border-block-end-width',
    'border-block-start',
    'border-block-start-color',
    'border-block-start-width',
    'border-bottom',
    'border-bottom-color',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-bottom-width',
    'border-color',
    'border-end-end-radius',
    'border-end-start-radius',
    'border-image-outset',
    'border-image-slice',
    'border-image-width',
    'border-inline-end',
    'border-inline-end-color',
    'border-inline-end-width',
    'border-inline-start',
    'border-inline-start-color',
    'border-inline-start-width',
    'border-left',
    'border-left-color',
    'border-left-width',
    'border-radius',
    'border-right',
    'border-right-color',
    'border-right-width',
    'border-start-end-radius',
    'border-start-start-radius',
    'border-top',
    'border-top-color',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-top-width',
    'border-width',
    'bottom',
    'box-shadow',
    'caret-color',
    'clip',
    'clip-path',
    'color',
    'column-count',
    'column-gap',
    'column-rule',
    'column-rule-color',
    'column-rule-width',
    'column-width',
    'columns',
    'filter',
    'flex',
    'flex-basis',
    'flex-grow',
    'flex-shrink',
    'font',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-variation-settings',
    'font-weight',
    'gap',
    'grid-column-gap',
    'grid-gap',
    'grid-row-gap',
    'grid-template-columns',
    'grid-template-rows',
    'height',
    'inline-size',
    'input-security',
    'inset',
    'inset-block',
    'inset-block-end',
    'inset-block-start',
    'inset-inline',
    'inset-inline-end',
    'inset-inline-start',
    'left',
    'letter-spacing',
    'line-clamp',
    'line-height',
    'margin',
    'margin-block-end',
    'margin-block-start',
    'margin-bottom',
    'margin-inline-end',
    'margin-inline-start',
    'margin-left',
    'margin-right',
    'margin-top',
    'mask',
    'mask-border',
    'mask-position',
    'mask-size',
    'max-block-size',
    'max-height',
    'max-inline-size',
    'max-lines',
    'max-width',
    'min-block-size',
    'min-height',
    'min-inline-size',
    'min-width',
    'object-position',
    'offset',
    'offset-anchor',
    'offset-distance',
    'offset-path',
    'offset-position',
    'offset-rotate',
    'opacity',
    'order',
    'outline',
    'outline-color',
    'outline-offset',
    'outline-width',
    'padding',
    'padding-block-end',
    'padding-block-start',
    'padding-bottom',
    'padding-inline-end',
    'padding-inline-start',
    'padding-left',
    'padding-right',
    'padding-top',
    'perspective',
    'perspective-origin',
    'right',
    'rotate',
    'row-gap',
    'scale',
    'scroll-margin',
    'scroll-margin-block',
    'scroll-margin-block-end',
    'scroll-margin-block-start',
    'scroll-margin-bottom',
    'scroll-margin-inline',
    'scroll-margin-inline-end',
    'scroll-margin-inline-start',
    'scroll-margin-left',
    'scroll-margin-right',
    'scroll-margin-top',
    'scroll-padding',
    'scroll-padding-block',
    'scroll-padding-block-end',
    'scroll-padding-block-start',
    'scroll-padding-bottom',
    'scroll-padding-inline',
    'scroll-padding-inline-end',
    'scroll-padding-inline-start',
    'scroll-padding-left',
    'scroll-padding-right',
    'scroll-padding-top',
    'scroll-snap-coordinate',
    'scroll-snap-destination',
    'scrollbar-color',
    'shape-image-threshold',
    'shape-margin',
    'shape-outside',
    'tab-size',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-thickness',
    'text-emphasis',
    'text-emphasis-color',
    'text-indent',
    'text-shadow',
    'text-underline-offset',
    'top',
    'transform',
    'transform-origin',
    'translate',
    'vertical-align',
    'visibility',
    'width',
    'word-spacing',
    'z-index',
    'zoom',
]);
function Et(t) {
    switch (t.length) {
        case 0:
            return new Dt();
        case 1:
            return t[0];
        default:
            return new fr(t);
    }
}
function Lp(t, e, n = new Map(), r = new Map()) {
    let o = [],
        i = [],
        s = -1,
        a = null;
    if (
        (e.forEach((u) => {
            let l = u.get('offset'),
                c = l == s,
                d = (c && a) || new Map();
            u.forEach((h, f) => {
                let p = f,
                    m = h;
                if (f !== 'offset')
                    switch (((p = t.normalizePropertyName(p, o)), m)) {
                        case ui:
                            m = n.get(f);
                            break;
                        case He:
                            m = r.get(f);
                            break;
                        default:
                            m = t.normalizeStyleValue(f, p, m, o);
                            break;
                    }
                d.set(p, m);
            }),
                c || i.push(d),
                (a = d),
                (s = l);
        }),
        o.length)
    )
        throw n_(o);
    return i;
}
function cl(t, e, n, r) {
    switch (e) {
        case 'start':
            t.onStart(() => r(n && Vu(n, 'start', t)));
            break;
        case 'done':
            t.onDone(() => r(n && Vu(n, 'done', t)));
            break;
        case 'destroy':
            t.onDestroy(() => r(n && Vu(n, 'destroy', t)));
            break;
    }
}
function Vu(t, e, n) {
    let r = n.totalTime,
        o = !!n.disabled,
        i = dl(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            r ?? t.totalTime,
            o,
        ),
        s = t._data;
    return s != null && (i._data = s), i;
}
function dl(t, e, n, r, o = '', i = 0, s) {
    return {
        element: t,
        triggerName: e,
        fromState: n,
        toState: r,
        phaseName: o,
        totalTime: i,
        disabled: !!s,
    };
}
function De(t, e, n) {
    let r = t.get(e);
    return r || t.set(e, (r = n)), r;
}
function Ep(t) {
    let e = t.indexOf(':'),
        n = t.substring(1, e),
        r = t.slice(e + 1);
    return [n, r];
}
var p_ = typeof document > 'u' ? null : document.documentElement;
function fl(t) {
    let e = t.parentNode || t.host || null;
    return e === p_ ? null : e;
}
function m_(t) {
    return t.substring(1, 6) == 'ebkit';
}
var Qt = null,
    wp = !1;
function g_(t) {
    Qt ||
        ((Qt = y_() || {}),
        (wp = Qt.style ? 'WebkitAppearance' in Qt.style : !1));
    let e = !0;
    return (
        Qt.style &&
            !m_(t) &&
            ((e = t in Qt.style),
            !e &&
                wp &&
                (e =
                    'Webkit' + t.charAt(0).toUpperCase() + t.slice(1) in
                    Qt.style)),
        e
    );
}
function mP(t) {
    return h_.has(t);
}
function y_() {
    return typeof document < 'u' ? document.body : null;
}
function jp(t, e) {
    for (; e; ) {
        if (e === t) return !0;
        e = fl(e);
    }
    return !1;
}
function Vp(t, e, n) {
    if (n) return Array.from(t.querySelectorAll(e));
    let r = t.querySelector(e);
    return r ? [r] : [];
}
var Bp = (() => {
        let e = class e {
            validateStyleProperty(r) {
                return g_(r);
            }
            matchesElement(r, o) {
                return !1;
            }
            containsElement(r, o) {
                return jp(r, o);
            }
            getParentElement(r) {
                return fl(r);
            }
            query(r, o, i) {
                return Vp(r, o, i);
            }
            computeStyle(r, o, i) {
                return i || '';
            }
            animate(r, o, i, s, a, u = [], l) {
                return new Dt(i, s);
            }
        };
        (e.ɵfac = function (o) {
            return new (o || e)();
        }),
            (e.ɵprov = $({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    Dl = class Dl {};
Dl.NOOP = new Bp();
var bp = Dl,
    qu = class {},
    Gu = class {
        normalizePropertyName(e, n) {
            return e;
        }
        normalizeStyleValue(e, n, r, o) {
            return r;
        }
    },
    v_ = 1e3,
    $p = '{{',
    D_ = '}}',
    hl = 'ng-enter',
    pi = 'ng-leave',
    li = 'ng-trigger',
    mi = '.ng-trigger',
    Ip = 'ng-animating',
    Wu = '.ng-animating';
function rt(t) {
    if (typeof t == 'number') return t;
    let e = t.match(/^(-?[\.\d]+)(m?s)/);
    return !e || e.length < 2 ? 0 : Qu(parseFloat(e[1]), e[2]);
}
function Qu(t, e) {
    switch (e) {
        case 's':
            return t * v_;
        default:
            return t;
    }
}
function gi(t, e, n) {
    return t.hasOwnProperty('duration') ? t : E_(t, e, n);
}
function E_(t, e, n) {
    let r =
            /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
        o,
        i = 0,
        s = '';
    if (typeof t == 'string') {
        let a = t.match(r);
        if (a === null)
            return e.push(Dp(t)), { duration: 0, delay: 0, easing: '' };
        o = Qu(parseFloat(a[1]), a[2]);
        let u = a[3];
        u != null && (i = Qu(parseFloat(u), a[4]));
        let l = a[5];
        l && (s = l);
    } else o = t;
    if (!n) {
        let a = !1,
            u = e.length;
        o < 0 && (e.push(PI()), (a = !0)),
            i < 0 && (e.push(RI()), (a = !0)),
            a && e.splice(u, 0, Dp(t));
    }
    return { duration: o, delay: i, easing: s };
}
function w_(t) {
    return t.length
        ? t[0] instanceof Map
            ? t
            : t.map((e) => new Map(Object.entries(e)))
        : [];
}
function _p(t) {
    return Array.isArray(t) ? new Map(...t) : new Map(t);
}
function Ue(t, e, n) {
    e.forEach((r, o) => {
        let i = pl(o);
        n && !n.has(o) && n.set(o, t.style[i]), (t.style[i] = r);
    });
}
function Yt(t, e) {
    e.forEach((n, r) => {
        let o = pl(r);
        t.style[o] = '';
    });
}
function hr(t) {
    return Array.isArray(t) ? (t.length == 1 ? t[0] : vp(t)) : t;
}
function b_(t, e, n) {
    let r = e.params || {},
        o = Hp(t);
    o.length &&
        o.forEach((i) => {
            r.hasOwnProperty(i) || n.push(kI(i));
        });
}
var Ku = new RegExp(`${$p}\\s*(.+?)\\s*${D_}`, 'g');
function Hp(t) {
    let e = [];
    if (typeof t == 'string') {
        let n;
        for (; (n = Ku.exec(t)); ) e.push(n[1]);
        Ku.lastIndex = 0;
    }
    return e;
}
function mr(t, e, n) {
    let r = `${t}`,
        o = r.replace(Ku, (i, s) => {
            let a = e[s];
            return a == null && (n.push(LI(s)), (a = '')), a.toString();
        });
    return o == r ? t : o;
}
var I_ = /-+([a-z0-9])/g;
function pl(t) {
    return t.replace(I_, (...e) => e[1].toUpperCase());
}
function gP(t) {
    return t.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function __(t, e) {
    return t === 0 || e === 0;
}
function C_(t, e, n) {
    if (n.size && e.length) {
        let r = e[0],
            o = [];
        if (
            (n.forEach((i, s) => {
                r.has(s) || o.push(s), r.set(s, i);
            }),
            o.length)
        )
            for (let i = 1; i < e.length; i++) {
                let s = e[i];
                o.forEach((a) => s.set(a, ml(t, a)));
            }
    }
    return e;
}
function ve(t, e, n) {
    switch (e.type) {
        case M.Trigger:
            return t.visitTrigger(e, n);
        case M.State:
            return t.visitState(e, n);
        case M.Transition:
            return t.visitTransition(e, n);
        case M.Sequence:
            return t.visitSequence(e, n);
        case M.Group:
            return t.visitGroup(e, n);
        case M.Animate:
            return t.visitAnimate(e, n);
        case M.Keyframes:
            return t.visitKeyframes(e, n);
        case M.Style:
            return t.visitStyle(e, n);
        case M.Reference:
            return t.visitReference(e, n);
        case M.AnimateChild:
            return t.visitAnimateChild(e, n);
        case M.AnimateRef:
            return t.visitAnimateRef(e, n);
        case M.Query:
            return t.visitQuery(e, n);
        case M.Stagger:
            return t.visitStagger(e, n);
        default:
            throw jI(e.type);
    }
}
function ml(t, e) {
    return window.getComputedStyle(t)[e];
}
var S_ = new Set([
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'left',
        'top',
        'bottom',
        'right',
        'fontSize',
        'outlineWidth',
        'outlineOffset',
        'paddingTop',
        'paddingLeft',
        'paddingBottom',
        'paddingRight',
        'marginTop',
        'marginLeft',
        'marginBottom',
        'marginRight',
        'borderRadius',
        'borderWidth',
        'borderTopWidth',
        'borderLeftWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'textIndent',
        'perspective',
    ]),
    Yu = class extends qu {
        normalizePropertyName(e, n) {
            return pl(e);
        }
        normalizeStyleValue(e, n, r, o) {
            let i = '',
                s = r.toString().trim();
            if (S_.has(n) && r !== 0 && r !== '0')
                if (typeof r == 'number') i = 'px';
                else {
                    let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
                    a && a[1].length == 0 && o.push(VI(e, r));
                }
            return s + i;
        }
    };
var yi = '*';
function T_(t, e) {
    let n = [];
    return (
        typeof t == 'string'
            ? t.split(/\s*,\s*/).forEach((r) => M_(r, n, e))
            : n.push(t),
        n
    );
}
function M_(t, e, n) {
    if (t[0] == ':') {
        let u = x_(t, n);
        if (typeof u == 'function') {
            e.push(u);
            return;
        }
        t = u;
    }
    let r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (r == null || r.length < 4) return n.push(ZI(t)), e;
    let o = r[1],
        i = r[2],
        s = r[3];
    e.push(Cp(o, s));
    let a = o == yi && s == yi;
    i[0] == '<' && !a && e.push(Cp(s, o));
}
function x_(t, e) {
    switch (t) {
        case ':enter':
            return 'void => *';
        case ':leave':
            return '* => void';
        case ':increment':
            return (n, r) => parseFloat(r) > parseFloat(n);
        case ':decrement':
            return (n, r) => parseFloat(r) < parseFloat(n);
        default:
            return e.push(JI(t)), '* => *';
    }
}
var ci = new Set(['true', '1']),
    di = new Set(['false', '0']);
function Cp(t, e) {
    let n = ci.has(t) || di.has(t),
        r = ci.has(e) || di.has(e);
    return (o, i) => {
        let s = t == yi || t == o,
            a = e == yi || e == i;
        return (
            !s && n && typeof o == 'boolean' && (s = o ? ci.has(t) : di.has(t)),
            !a && r && typeof i == 'boolean' && (a = i ? ci.has(e) : di.has(e)),
            s && a
        );
    };
}
var Up = ':self',
    N_ = new RegExp(`s*${Up}s*,?`, 'g');
function gl(t, e, n, r) {
    return new Zu(t).build(e, n, r);
}
var Sp = '',
    Zu = class {
        constructor(e) {
            this._driver = e;
        }
        build(e, n, r) {
            let o = new Ju(n);
            return this._resetContextStyleTimingState(o), ve(this, hr(e), o);
        }
        _resetContextStyleTimingState(e) {
            (e.currentQuerySelector = Sp),
                (e.collectedStyles = new Map()),
                e.collectedStyles.set(Sp, new Map()),
                (e.currentTime = 0);
        }
        visitTrigger(e, n) {
            let r = (n.queryCount = 0),
                o = (n.depCount = 0),
                i = [],
                s = [];
            return (
                e.name.charAt(0) == '@' && n.errors.push(BI()),
                e.definitions.forEach((a) => {
                    if (
                        (this._resetContextStyleTimingState(n),
                        a.type == M.State)
                    ) {
                        let u = a,
                            l = u.name;
                        l
                            .toString()
                            .split(/\s*,\s*/)
                            .forEach((c) => {
                                (u.name = c), i.push(this.visitState(u, n));
                            }),
                            (u.name = l);
                    } else if (a.type == M.Transition) {
                        let u = this.visitTransition(a, n);
                        (r += u.queryCount), (o += u.depCount), s.push(u);
                    } else n.errors.push($I());
                }),
                {
                    type: M.Trigger,
                    name: e.name,
                    states: i,
                    transitions: s,
                    queryCount: r,
                    depCount: o,
                    options: null,
                }
            );
        }
        visitState(e, n) {
            let r = this.visitStyle(e.styles, n),
                o = (e.options && e.options.params) || null;
            if (r.containsDynamicStyles) {
                let i = new Set(),
                    s = o || {};
                r.styles.forEach((a) => {
                    a instanceof Map &&
                        a.forEach((u) => {
                            Hp(u).forEach((l) => {
                                s.hasOwnProperty(l) || i.add(l);
                            });
                        });
                }),
                    i.size && n.errors.push(HI(e.name, [...i.values()]));
            }
            return {
                type: M.State,
                name: e.name,
                style: r,
                options: o ? { params: o } : null,
            };
        }
        visitTransition(e, n) {
            (n.queryCount = 0), (n.depCount = 0);
            let r = ve(this, hr(e.animation), n),
                o = T_(e.expr, n.errors);
            return {
                type: M.Transition,
                matchers: o,
                animation: r,
                queryCount: n.queryCount,
                depCount: n.depCount,
                options: Kt(e.options),
            };
        }
        visitSequence(e, n) {
            return {
                type: M.Sequence,
                steps: e.steps.map((r) => ve(this, r, n)),
                options: Kt(e.options),
            };
        }
        visitGroup(e, n) {
            let r = n.currentTime,
                o = 0,
                i = e.steps.map((s) => {
                    n.currentTime = r;
                    let a = ve(this, s, n);
                    return (o = Math.max(o, n.currentTime)), a;
                });
            return (
                (n.currentTime = o),
                { type: M.Group, steps: i, options: Kt(e.options) }
            );
        }
        visitAnimate(e, n) {
            let r = P_(e.timings, n.errors);
            n.currentAnimateTimings = r;
            let o,
                i = e.styles ? e.styles : ju({});
            if (i.type == M.Keyframes) o = this.visitKeyframes(i, n);
            else {
                let s = e.styles,
                    a = !1;
                if (!s) {
                    a = !0;
                    let l = {};
                    r.easing && (l.easing = r.easing), (s = ju(l));
                }
                n.currentTime += r.duration + r.delay;
                let u = this.visitStyle(s, n);
                (u.isEmptyStep = a), (o = u);
            }
            return (
                (n.currentAnimateTimings = null),
                { type: M.Animate, timings: r, style: o, options: null }
            );
        }
        visitStyle(e, n) {
            let r = this._makeStyleAst(e, n);
            return this._validateStyleAst(r, n), r;
        }
        _makeStyleAst(e, n) {
            let r = [],
                o = Array.isArray(e.styles) ? e.styles : [e.styles];
            for (let a of o)
                typeof a == 'string'
                    ? a === He
                        ? r.push(a)
                        : n.errors.push(UI(a))
                    : r.push(new Map(Object.entries(a)));
            let i = !1,
                s = null;
            return (
                r.forEach((a) => {
                    if (
                        a instanceof Map &&
                        (a.has('easing') &&
                            ((s = a.get('easing')), a.delete('easing')),
                        !i)
                    ) {
                        for (let u of a.values())
                            if (u.toString().indexOf($p) >= 0) {
                                i = !0;
                                break;
                            }
                    }
                }),
                {
                    type: M.Style,
                    styles: r,
                    easing: s,
                    offset: e.offset,
                    containsDynamicStyles: i,
                    options: null,
                }
            );
        }
        _validateStyleAst(e, n) {
            let r = n.currentAnimateTimings,
                o = n.currentTime,
                i = n.currentTime;
            r && i > 0 && (i -= r.duration + r.delay),
                e.styles.forEach((s) => {
                    typeof s != 'string' &&
                        s.forEach((a, u) => {
                            let l = n.collectedStyles.get(
                                    n.currentQuerySelector,
                                ),
                                c = l.get(u),
                                d = !0;
                            c &&
                                (i != o &&
                                    i >= c.startTime &&
                                    o <= c.endTime &&
                                    (n.errors.push(
                                        zI(u, c.startTime, c.endTime, i, o),
                                    ),
                                    (d = !1)),
                                (i = c.startTime)),
                                d && l.set(u, { startTime: i, endTime: o }),
                                n.options && b_(a, n.options, n.errors);
                        });
                });
        }
        visitKeyframes(e, n) {
            let r = { type: M.Keyframes, styles: [], options: null };
            if (!n.currentAnimateTimings) return n.errors.push(qI()), r;
            let o = 1,
                i = 0,
                s = [],
                a = !1,
                u = !1,
                l = 0,
                c = e.steps.map((w) => {
                    let N = this._makeStyleAst(w, n),
                        R = N.offset != null ? N.offset : F_(N.styles),
                        j = 0;
                    return (
                        R != null && (i++, (j = N.offset = R)),
                        (u = u || j < 0 || j > 1),
                        (a = a || j < l),
                        (l = j),
                        s.push(j),
                        N
                    );
                });
            u && n.errors.push(GI()), a && n.errors.push(WI());
            let d = e.steps.length,
                h = 0;
            i > 0 && i < d ? n.errors.push(QI()) : i == 0 && (h = o / (d - 1));
            let f = d - 1,
                p = n.currentTime,
                m = n.currentAnimateTimings,
                b = m.duration;
            return (
                c.forEach((w, N) => {
                    let R = h > 0 ? (N == f ? 1 : h * N) : s[N],
                        j = R * b;
                    (n.currentTime = p + m.delay + j),
                        (m.duration = j),
                        this._validateStyleAst(w, n),
                        (w.offset = R),
                        r.styles.push(w);
                }),
                r
            );
        }
        visitReference(e, n) {
            return {
                type: M.Reference,
                animation: ve(this, hr(e.animation), n),
                options: Kt(e.options),
            };
        }
        visitAnimateChild(e, n) {
            return (
                n.depCount++, { type: M.AnimateChild, options: Kt(e.options) }
            );
        }
        visitAnimateRef(e, n) {
            return {
                type: M.AnimateRef,
                animation: this.visitReference(e.animation, n),
                options: Kt(e.options),
            };
        }
        visitQuery(e, n) {
            let r = n.currentQuerySelector,
                o = e.options || {};
            n.queryCount++, (n.currentQuery = e);
            let [i, s] = A_(e.selector);
            (n.currentQuerySelector = r.length ? r + ' ' + i : i),
                De(n.collectedStyles, n.currentQuerySelector, new Map());
            let a = ve(this, hr(e.animation), n);
            return (
                (n.currentQuery = null),
                (n.currentQuerySelector = r),
                {
                    type: M.Query,
                    selector: i,
                    limit: o.limit || 0,
                    optional: !!o.optional,
                    includeSelf: s,
                    animation: a,
                    originalSelector: e.selector,
                    options: Kt(e.options),
                }
            );
        }
        visitStagger(e, n) {
            n.currentQuery || n.errors.push(KI());
            let r =
                e.timings === 'full'
                    ? { duration: 0, delay: 0, easing: 'full' }
                    : gi(e.timings, n.errors, !0);
            return {
                type: M.Stagger,
                animation: ve(this, hr(e.animation), n),
                timings: r,
                options: null,
            };
        }
    };
function A_(t) {
    let e = !!t.split(/\s*,\s*/).find((n) => n == Up);
    return (
        e && (t = t.replace(N_, '')),
        (t = t
            .replace(/@\*/g, mi)
            .replace(/@\w+/g, (n) => mi + '-' + n.slice(1))
            .replace(/:animating/g, Wu)),
        [t, e]
    );
}
function O_(t) {
    return t ? Se({}, t) : null;
}
var Ju = class {
    constructor(e) {
        (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
    }
};
function F_(t) {
    if (typeof t == 'string') return null;
    let e = null;
    if (Array.isArray(t))
        t.forEach((n) => {
            if (n instanceof Map && n.has('offset')) {
                let r = n;
                (e = parseFloat(r.get('offset'))), r.delete('offset');
            }
        });
    else if (t instanceof Map && t.has('offset')) {
        let n = t;
        (e = parseFloat(n.get('offset'))), n.delete('offset');
    }
    return e;
}
function P_(t, e) {
    if (t.hasOwnProperty('duration')) return t;
    if (typeof t == 'number') {
        let i = gi(t, e).duration;
        return Bu(i, 0, '');
    }
    let n = t;
    if (n.split(/\s+/).some((i) => i.charAt(0) == '{' && i.charAt(1) == '{')) {
        let i = Bu(0, 0, '');
        return (i.dynamic = !0), (i.strValue = n), i;
    }
    let o = gi(n, e);
    return Bu(o.duration, o.delay, o.easing);
}
function Kt(t) {
    return (
        t ? ((t = Se({}, t)), t.params && (t.params = O_(t.params))) : (t = {}),
        t
    );
}
function Bu(t, e, n) {
    return { duration: t, delay: e, easing: n };
}
function yl(t, e, n, r, o, i, s = null, a = !1) {
    return {
        type: 1,
        element: t,
        keyframes: e,
        preStyleProps: n,
        postStyleProps: r,
        duration: o,
        delay: i,
        totalTime: o + i,
        easing: s,
        subTimeline: a,
    };
}
var On = class {
        constructor() {
            this._map = new Map();
        }
        get(e) {
            return this._map.get(e) || [];
        }
        append(e, n) {
            let r = this._map.get(e);
            r || this._map.set(e, (r = [])), r.push(...n);
        }
        has(e) {
            return this._map.has(e);
        }
        clear() {
            this._map.clear();
        }
    },
    R_ = 1,
    k_ = ':enter',
    L_ = new RegExp(k_, 'g'),
    j_ = ':leave',
    V_ = new RegExp(j_, 'g');
function vl(t, e, n, r, o, i = new Map(), s = new Map(), a, u, l = []) {
    return new Xu().buildKeyframes(t, e, n, r, o, i, s, a, u, l);
}
var Xu = class {
        buildKeyframes(e, n, r, o, i, s, a, u, l, c = []) {
            l = l || new On();
            let d = new el(e, n, l, o, i, c, []);
            d.options = u;
            let h = u.delay ? rt(u.delay) : 0;
            d.currentTimeline.delayNextStep(h),
                d.currentTimeline.setStyles([s], null, d.errors, u),
                ve(this, r, d);
            let f = d.timelines.filter((p) => p.containsAnimation());
            if (f.length && a.size) {
                let p;
                for (let m = f.length - 1; m >= 0; m--) {
                    let b = f[m];
                    if (b.element === n) {
                        p = b;
                        break;
                    }
                }
                p &&
                    !p.allowOnlyTimelineStyles() &&
                    p.setStyles([a], null, d.errors, u);
            }
            return f.length
                ? f.map((p) => p.buildKeyframes())
                : [yl(n, [], [], [], 0, h, '', !1)];
        }
        visitTrigger(e, n) {}
        visitState(e, n) {}
        visitTransition(e, n) {}
        visitAnimateChild(e, n) {
            let r = n.subInstructions.get(n.element);
            if (r) {
                let o = n.createSubContext(e.options),
                    i = n.currentTimeline.currentTime,
                    s = this._visitSubInstructions(r, o, o.options);
                i != s && n.transformIntoNewTimeline(s);
            }
            n.previousNode = e;
        }
        visitAnimateRef(e, n) {
            let r = n.createSubContext(e.options);
            r.transformIntoNewTimeline(),
                this._applyAnimationRefDelays(
                    [e.options, e.animation.options],
                    n,
                    r,
                ),
                this.visitReference(e.animation, r),
                n.transformIntoNewTimeline(r.currentTimeline.currentTime),
                (n.previousNode = e);
        }
        _applyAnimationRefDelays(e, n, r) {
            for (let o of e) {
                let i = o?.delay;
                if (i) {
                    let s =
                        typeof i == 'number'
                            ? i
                            : rt(mr(i, o?.params ?? {}, n.errors));
                    r.delayNextStep(s);
                }
            }
        }
        _visitSubInstructions(e, n, r) {
            let i = n.currentTimeline.currentTime,
                s = r.duration != null ? rt(r.duration) : null,
                a = r.delay != null ? rt(r.delay) : null;
            return (
                s !== 0 &&
                    e.forEach((u) => {
                        let l = n.appendInstructionToTimeline(u, s, a);
                        i = Math.max(i, l.duration + l.delay);
                    }),
                i
            );
        }
        visitReference(e, n) {
            n.updateOptions(e.options, !0),
                ve(this, e.animation, n),
                (n.previousNode = e);
        }
        visitSequence(e, n) {
            let r = n.subContextCount,
                o = n,
                i = e.options;
            if (
                i &&
                (i.params || i.delay) &&
                ((o = n.createSubContext(i)),
                o.transformIntoNewTimeline(),
                i.delay != null)
            ) {
                o.previousNode.type == M.Style &&
                    (o.currentTimeline.snapshotCurrentStyles(),
                    (o.previousNode = vi));
                let s = rt(i.delay);
                o.delayNextStep(s);
            }
            e.steps.length &&
                (e.steps.forEach((s) => ve(this, s, o)),
                o.currentTimeline.applyStylesToKeyframe(),
                o.subContextCount > r && o.transformIntoNewTimeline()),
                (n.previousNode = e);
        }
        visitGroup(e, n) {
            let r = [],
                o = n.currentTimeline.currentTime,
                i = e.options && e.options.delay ? rt(e.options.delay) : 0;
            e.steps.forEach((s) => {
                let a = n.createSubContext(e.options);
                i && a.delayNextStep(i),
                    ve(this, s, a),
                    (o = Math.max(o, a.currentTimeline.currentTime)),
                    r.push(a.currentTimeline);
            }),
                r.forEach((s) =>
                    n.currentTimeline.mergeTimelineCollectedStyles(s),
                ),
                n.transformIntoNewTimeline(o),
                (n.previousNode = e);
        }
        _visitTiming(e, n) {
            if (e.dynamic) {
                let r = e.strValue,
                    o = n.params ? mr(r, n.params, n.errors) : r;
                return gi(o, n.errors);
            } else
                return {
                    duration: e.duration,
                    delay: e.delay,
                    easing: e.easing,
                };
        }
        visitAnimate(e, n) {
            let r = (n.currentAnimateTimings = this._visitTiming(e.timings, n)),
                o = n.currentTimeline;
            r.delay && (n.incrementTime(r.delay), o.snapshotCurrentStyles());
            let i = e.style;
            i.type == M.Keyframes
                ? this.visitKeyframes(i, n)
                : (n.incrementTime(r.duration),
                  this.visitStyle(i, n),
                  o.applyStylesToKeyframe()),
                (n.currentAnimateTimings = null),
                (n.previousNode = e);
        }
        visitStyle(e, n) {
            let r = n.currentTimeline,
                o = n.currentAnimateTimings;
            !o && r.hasCurrentStyleProperties() && r.forwardFrame();
            let i = (o && o.easing) || e.easing;
            e.isEmptyStep
                ? r.applyEmptyStep(i)
                : r.setStyles(e.styles, i, n.errors, n.options),
                (n.previousNode = e);
        }
        visitKeyframes(e, n) {
            let r = n.currentAnimateTimings,
                o = n.currentTimeline.duration,
                i = r.duration,
                a = n.createSubContext().currentTimeline;
            (a.easing = r.easing),
                e.styles.forEach((u) => {
                    let l = u.offset || 0;
                    a.forwardTime(l * i),
                        a.setStyles(u.styles, u.easing, n.errors, n.options),
                        a.applyStylesToKeyframe();
                }),
                n.currentTimeline.mergeTimelineCollectedStyles(a),
                n.transformIntoNewTimeline(o + i),
                (n.previousNode = e);
        }
        visitQuery(e, n) {
            let r = n.currentTimeline.currentTime,
                o = e.options || {},
                i = o.delay ? rt(o.delay) : 0;
            i &&
                (n.previousNode.type === M.Style ||
                    (r == 0 &&
                        n.currentTimeline.hasCurrentStyleProperties())) &&
                (n.currentTimeline.snapshotCurrentStyles(),
                (n.previousNode = vi));
            let s = r,
                a = n.invokeQuery(
                    e.selector,
                    e.originalSelector,
                    e.limit,
                    e.includeSelf,
                    !!o.optional,
                    n.errors,
                );
            n.currentQueryTotal = a.length;
            let u = null;
            a.forEach((l, c) => {
                n.currentQueryIndex = c;
                let d = n.createSubContext(e.options, l);
                i && d.delayNextStep(i),
                    l === n.element && (u = d.currentTimeline),
                    ve(this, e.animation, d),
                    d.currentTimeline.applyStylesToKeyframe();
                let h = d.currentTimeline.currentTime;
                s = Math.max(s, h);
            }),
                (n.currentQueryIndex = 0),
                (n.currentQueryTotal = 0),
                n.transformIntoNewTimeline(s),
                u &&
                    (n.currentTimeline.mergeTimelineCollectedStyles(u),
                    n.currentTimeline.snapshotCurrentStyles()),
                (n.previousNode = e);
        }
        visitStagger(e, n) {
            let r = n.parentContext,
                o = n.currentTimeline,
                i = e.timings,
                s = Math.abs(i.duration),
                a = s * (n.currentQueryTotal - 1),
                u = s * n.currentQueryIndex;
            switch (i.duration < 0 ? 'reverse' : i.easing) {
                case 'reverse':
                    u = a - u;
                    break;
                case 'full':
                    u = r.currentStaggerTime;
                    break;
            }
            let c = n.currentTimeline;
            u && c.delayNextStep(u);
            let d = c.currentTime;
            ve(this, e.animation, n),
                (n.previousNode = e),
                (r.currentStaggerTime =
                    o.currentTime -
                    d +
                    (o.startTime - r.currentTimeline.startTime));
        }
    },
    vi = {},
    el = class t {
        constructor(e, n, r, o, i, s, a, u) {
            (this._driver = e),
                (this.element = n),
                (this.subInstructions = r),
                (this._enterClassName = o),
                (this._leaveClassName = i),
                (this.errors = s),
                (this.timelines = a),
                (this.parentContext = null),
                (this.currentAnimateTimings = null),
                (this.previousNode = vi),
                (this.subContextCount = 0),
                (this.options = {}),
                (this.currentQueryIndex = 0),
                (this.currentQueryTotal = 0),
                (this.currentStaggerTime = 0),
                (this.currentTimeline = u || new Di(this._driver, n, 0)),
                a.push(this.currentTimeline);
        }
        get params() {
            return this.options.params;
        }
        updateOptions(e, n) {
            if (!e) return;
            let r = e,
                o = this.options;
            r.duration != null && (o.duration = rt(r.duration)),
                r.delay != null && (o.delay = rt(r.delay));
            let i = r.params;
            if (i) {
                let s = o.params;
                s || (s = this.options.params = {}),
                    Object.keys(i).forEach((a) => {
                        (!n || !s.hasOwnProperty(a)) &&
                            (s[a] = mr(i[a], s, this.errors));
                    });
            }
        }
        _copyOptions() {
            let e = {};
            if (this.options) {
                let n = this.options.params;
                if (n) {
                    let r = (e.params = {});
                    Object.keys(n).forEach((o) => {
                        r[o] = n[o];
                    });
                }
            }
            return e;
        }
        createSubContext(e = null, n, r) {
            let o = n || this.element,
                i = new t(
                    this._driver,
                    o,
                    this.subInstructions,
                    this._enterClassName,
                    this._leaveClassName,
                    this.errors,
                    this.timelines,
                    this.currentTimeline.fork(o, r || 0),
                );
            return (
                (i.previousNode = this.previousNode),
                (i.currentAnimateTimings = this.currentAnimateTimings),
                (i.options = this._copyOptions()),
                i.updateOptions(e),
                (i.currentQueryIndex = this.currentQueryIndex),
                (i.currentQueryTotal = this.currentQueryTotal),
                (i.parentContext = this),
                this.subContextCount++,
                i
            );
        }
        transformIntoNewTimeline(e) {
            return (
                (this.previousNode = vi),
                (this.currentTimeline = this.currentTimeline.fork(
                    this.element,
                    e,
                )),
                this.timelines.push(this.currentTimeline),
                this.currentTimeline
            );
        }
        appendInstructionToTimeline(e, n, r) {
            let o = {
                    duration: n ?? e.duration,
                    delay:
                        this.currentTimeline.currentTime + (r ?? 0) + e.delay,
                    easing: '',
                },
                i = new tl(
                    this._driver,
                    e.element,
                    e.keyframes,
                    e.preStyleProps,
                    e.postStyleProps,
                    o,
                    e.stretchStartingKeyframe,
                );
            return this.timelines.push(i), o;
        }
        incrementTime(e) {
            this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
            e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, n, r, o, i, s) {
            let a = [];
            if ((o && a.push(this.element), e.length > 0)) {
                (e = e.replace(L_, '.' + this._enterClassName)),
                    (e = e.replace(V_, '.' + this._leaveClassName));
                let u = r != 1,
                    l = this._driver.query(this.element, e, u);
                r !== 0 &&
                    (l =
                        r < 0
                            ? l.slice(l.length + r, l.length)
                            : l.slice(0, r)),
                    a.push(...l);
            }
            return !i && a.length == 0 && s.push(YI(n)), a;
        }
    },
    Di = class t {
        constructor(e, n, r, o) {
            (this._driver = e),
                (this.element = n),
                (this.startTime = r),
                (this._elementTimelineStylesLookup = o),
                (this.duration = 0),
                (this.easing = null),
                (this._previousKeyframe = new Map()),
                (this._currentKeyframe = new Map()),
                (this._keyframes = new Map()),
                (this._styleSummary = new Map()),
                (this._localTimelineStyles = new Map()),
                (this._pendingStyles = new Map()),
                (this._backFill = new Map()),
                (this._currentEmptyStepKeyframe = null),
                this._elementTimelineStylesLookup ||
                    (this._elementTimelineStylesLookup = new Map()),
                (this._globalTimelineStyles =
                    this._elementTimelineStylesLookup.get(n)),
                this._globalTimelineStyles ||
                    ((this._globalTimelineStyles = this._localTimelineStyles),
                    this._elementTimelineStylesLookup.set(
                        n,
                        this._localTimelineStyles,
                    )),
                this._loadKeyframe();
        }
        containsAnimation() {
            switch (this._keyframes.size) {
                case 0:
                    return !1;
                case 1:
                    return this.hasCurrentStyleProperties();
                default:
                    return !0;
            }
        }
        hasCurrentStyleProperties() {
            return this._currentKeyframe.size > 0;
        }
        get currentTime() {
            return this.startTime + this.duration;
        }
        delayNextStep(e) {
            let n = this._keyframes.size === 1 && this._pendingStyles.size;
            this.duration || n
                ? (this.forwardTime(this.currentTime + e),
                  n && this.snapshotCurrentStyles())
                : (this.startTime += e);
        }
        fork(e, n) {
            return (
                this.applyStylesToKeyframe(),
                new t(
                    this._driver,
                    e,
                    n || this.currentTime,
                    this._elementTimelineStylesLookup,
                )
            );
        }
        _loadKeyframe() {
            this._currentKeyframe &&
                (this._previousKeyframe = this._currentKeyframe),
                (this._currentKeyframe = this._keyframes.get(this.duration)),
                this._currentKeyframe ||
                    ((this._currentKeyframe = new Map()),
                    this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
            (this.duration += R_), this._loadKeyframe();
        }
        forwardTime(e) {
            this.applyStylesToKeyframe(),
                (this.duration = e),
                this._loadKeyframe();
        }
        _updateStyle(e, n) {
            this._localTimelineStyles.set(e, n),
                this._globalTimelineStyles.set(e, n),
                this._styleSummary.set(e, { time: this.currentTime, value: n });
        }
        allowOnlyTimelineStyles() {
            return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
            e && this._previousKeyframe.set('easing', e);
            for (let [n, r] of this._globalTimelineStyles)
                this._backFill.set(n, r || He),
                    this._currentKeyframe.set(n, He);
            this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(e, n, r, o) {
            n && this._previousKeyframe.set('easing', n);
            let i = (o && o.params) || {},
                s = B_(e, this._globalTimelineStyles);
            for (let [a, u] of s) {
                let l = mr(u, i, r);
                this._pendingStyles.set(a, l),
                    this._localTimelineStyles.has(a) ||
                        this._backFill.set(
                            a,
                            this._globalTimelineStyles.get(a) ?? He,
                        ),
                    this._updateStyle(a, l);
            }
        }
        applyStylesToKeyframe() {
            this._pendingStyles.size != 0 &&
                (this._pendingStyles.forEach((e, n) => {
                    this._currentKeyframe.set(n, e);
                }),
                this._pendingStyles.clear(),
                this._localTimelineStyles.forEach((e, n) => {
                    this._currentKeyframe.has(n) ||
                        this._currentKeyframe.set(n, e);
                }));
        }
        snapshotCurrentStyles() {
            for (let [e, n] of this._localTimelineStyles)
                this._pendingStyles.set(e, n), this._updateStyle(e, n);
        }
        getFinalKeyframe() {
            return this._keyframes.get(this.duration);
        }
        get properties() {
            let e = [];
            for (let n in this._currentKeyframe) e.push(n);
            return e;
        }
        mergeTimelineCollectedStyles(e) {
            e._styleSummary.forEach((n, r) => {
                let o = this._styleSummary.get(r);
                (!o || n.time > o.time) && this._updateStyle(r, n.value);
            });
        }
        buildKeyframes() {
            this.applyStylesToKeyframe();
            let e = new Set(),
                n = new Set(),
                r = this._keyframes.size === 1 && this.duration === 0,
                o = [];
            this._keyframes.forEach((a, u) => {
                let l = new Map([...this._backFill, ...a]);
                l.forEach((c, d) => {
                    c === ui ? e.add(d) : c === He && n.add(d);
                }),
                    r || l.set('offset', u / this.duration),
                    o.push(l);
            });
            let i = [...e.values()],
                s = [...n.values()];
            if (r) {
                let a = o[0],
                    u = new Map(a);
                a.set('offset', 0), u.set('offset', 1), (o = [a, u]);
            }
            return yl(
                this.element,
                o,
                i,
                s,
                this.duration,
                this.startTime,
                this.easing,
                !1,
            );
        }
    },
    tl = class extends Di {
        constructor(e, n, r, o, i, s, a = !1) {
            super(e, n, s.delay),
                (this.keyframes = r),
                (this.preStyleProps = o),
                (this.postStyleProps = i),
                (this._stretchStartingKeyframe = a),
                (this.timings = {
                    duration: s.duration,
                    delay: s.delay,
                    easing: s.easing,
                });
        }
        containsAnimation() {
            return this.keyframes.length > 1;
        }
        buildKeyframes() {
            let e = this.keyframes,
                { delay: n, duration: r, easing: o } = this.timings;
            if (this._stretchStartingKeyframe && n) {
                let i = [],
                    s = r + n,
                    a = n / s,
                    u = new Map(e[0]);
                u.set('offset', 0), i.push(u);
                let l = new Map(e[0]);
                l.set('offset', Tp(a)), i.push(l);
                let c = e.length - 1;
                for (let d = 1; d <= c; d++) {
                    let h = new Map(e[d]),
                        f = h.get('offset'),
                        p = n + f * r;
                    h.set('offset', Tp(p / s)), i.push(h);
                }
                (r = s), (n = 0), (o = ''), (e = i);
            }
            return yl(
                this.element,
                e,
                this.preStyleProps,
                this.postStyleProps,
                r,
                n,
                o,
                !0,
            );
        }
    };
function Tp(t, e = 3) {
    let n = Math.pow(10, e - 1);
    return Math.round(t * n) / n;
}
function B_(t, e) {
    let n = new Map(),
        r;
    return (
        t.forEach((o) => {
            if (o === '*') {
                r ??= e.keys();
                for (let i of r) n.set(i, He);
            } else for (let [i, s] of o) n.set(i, s);
        }),
        n
    );
}
function Mp(t, e, n, r, o, i, s, a, u, l, c, d, h) {
    return {
        type: 0,
        element: t,
        triggerName: e,
        isRemovalTransition: o,
        fromState: n,
        fromStyles: i,
        toState: r,
        toStyles: s,
        timelines: a,
        queriedElements: u,
        preStyleProps: l,
        postStyleProps: c,
        totalTime: d,
        errors: h,
    };
}
var $u = {},
    Ei = class {
        constructor(e, n, r) {
            (this._triggerName = e), (this.ast = n), (this._stateStyles = r);
        }
        match(e, n, r, o) {
            return $_(this.ast.matchers, e, n, r, o);
        }
        buildStyles(e, n, r) {
            let o = this._stateStyles.get('*');
            return (
                e !== void 0 && (o = this._stateStyles.get(e?.toString()) || o),
                o ? o.buildStyles(n, r) : new Map()
            );
        }
        build(e, n, r, o, i, s, a, u, l, c) {
            let d = [],
                h = (this.ast.options && this.ast.options.params) || $u,
                f = (a && a.params) || $u,
                p = this.buildStyles(r, f, d),
                m = (u && u.params) || $u,
                b = this.buildStyles(o, m, d),
                w = new Set(),
                N = new Map(),
                R = new Map(),
                j = o === 'void',
                te = { params: zp(m, h), delay: this.ast.options?.delay },
                z = c ? [] : vl(e, n, this.ast.animation, i, s, p, b, te, l, d),
                q = 0;
            return (
                z.forEach((Y) => {
                    q = Math.max(Y.duration + Y.delay, q);
                }),
                d.length
                    ? Mp(
                          n,
                          this._triggerName,
                          r,
                          o,
                          j,
                          p,
                          b,
                          [],
                          [],
                          N,
                          R,
                          q,
                          d,
                      )
                    : (z.forEach((Y) => {
                          let ze = Y.element,
                              ot = De(N, ze, new Set());
                          Y.preStyleProps.forEach((wt) => ot.add(wt));
                          let El = De(R, ze, new Set());
                          Y.postStyleProps.forEach((wt) => El.add(wt)),
                              ze !== n && w.add(ze);
                      }),
                      Mp(
                          n,
                          this._triggerName,
                          r,
                          o,
                          j,
                          p,
                          b,
                          z,
                          [...w.values()],
                          N,
                          R,
                          q,
                      ))
            );
        }
    };
function $_(t, e, n, r, o) {
    return t.some((i) => i(e, n, r, o));
}
function zp(t, e) {
    let n = Se({}, e);
    return (
        Object.entries(t).forEach(([r, o]) => {
            o != null && (n[r] = o);
        }),
        n
    );
}
var nl = class {
    constructor(e, n, r) {
        (this.styles = e), (this.defaultParams = n), (this.normalizer = r);
    }
    buildStyles(e, n) {
        let r = new Map(),
            o = zp(e, this.defaultParams);
        return (
            this.styles.styles.forEach((i) => {
                typeof i != 'string' &&
                    i.forEach((s, a) => {
                        s && (s = mr(s, o, n));
                        let u = this.normalizer.normalizePropertyName(a, n);
                        (s = this.normalizer.normalizeStyleValue(a, u, s, n)),
                            r.set(a, s);
                    });
            }),
            r
        );
    }
};
function H_(t, e, n) {
    return new rl(t, e, n);
}
var rl = class {
    constructor(e, n, r) {
        (this.name = e),
            (this.ast = n),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = new Map()),
            n.states.forEach((o) => {
                let i = (o.options && o.options.params) || {};
                this.states.set(o.name, new nl(o.style, i, r));
            }),
            xp(this.states, 'true', '1'),
            xp(this.states, 'false', '0'),
            n.transitions.forEach((o) => {
                this.transitionFactories.push(new Ei(e, o, this.states));
            }),
            (this.fallbackTransition = U_(e, this.states, this._normalizer));
    }
    get containsQueries() {
        return this.ast.queryCount > 0;
    }
    matchTransition(e, n, r, o) {
        return (
            this.transitionFactories.find((s) => s.match(e, n, r, o)) || null
        );
    }
    matchStyles(e, n, r) {
        return this.fallbackTransition.buildStyles(e, n, r);
    }
};
function U_(t, e, n) {
    let r = [(s, a) => !0],
        o = { type: M.Sequence, steps: [], options: null },
        i = {
            type: M.Transition,
            animation: o,
            matchers: r,
            options: null,
            queryCount: 0,
            depCount: 0,
        };
    return new Ei(t, i, e);
}
function xp(t, e, n) {
    t.has(e) ? t.has(n) || t.set(n, t.get(e)) : t.has(n) && t.set(e, t.get(n));
}
var z_ = new On(),
    ol = class {
        constructor(e, n, r) {
            (this.bodyNode = e),
                (this._driver = n),
                (this._normalizer = r),
                (this._animations = new Map()),
                (this._playersById = new Map()),
                (this.players = []);
        }
        register(e, n) {
            let r = [],
                o = [],
                i = gl(this._driver, n, r, o);
            if (r.length) throw r_(r);
            o.length && void 0, this._animations.set(e, i);
        }
        _buildPlayer(e, n, r) {
            let o = e.element,
                i = Lp(this._normalizer, e.keyframes, n, r);
            return this._driver.animate(
                o,
                i,
                e.duration,
                e.delay,
                e.easing,
                [],
                !0,
            );
        }
        create(e, n, r = {}) {
            let o = [],
                i = this._animations.get(e),
                s,
                a = new Map();
            if (
                (i
                    ? ((s = vl(
                          this._driver,
                          n,
                          i,
                          hl,
                          pi,
                          new Map(),
                          new Map(),
                          r,
                          z_,
                          o,
                      )),
                      s.forEach((c) => {
                          let d = De(a, c.element, new Map());
                          c.postStyleProps.forEach((h) => d.set(h, null));
                      }))
                    : (o.push(o_()), (s = [])),
                o.length)
            )
                throw i_(o);
            a.forEach((c, d) => {
                c.forEach((h, f) => {
                    c.set(f, this._driver.computeStyle(d, f, He));
                });
            });
            let u = s.map((c) => {
                    let d = a.get(c.element);
                    return this._buildPlayer(c, new Map(), d);
                }),
                l = Et(u);
            return (
                this._playersById.set(e, l),
                l.onDestroy(() => this.destroy(e)),
                this.players.push(l),
                l
            );
        }
        destroy(e) {
            let n = this._getPlayer(e);
            n.destroy(), this._playersById.delete(e);
            let r = this.players.indexOf(n);
            r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(e) {
            let n = this._playersById.get(e);
            if (!n) throw s_(e);
            return n;
        }
        listen(e, n, r, o) {
            let i = dl(n, '', '', '');
            return cl(this._getPlayer(e), r, i, o), () => {};
        }
        command(e, n, r, o) {
            if (r == 'register') {
                this.register(e, o[0]);
                return;
            }
            if (r == 'create') {
                let s = o[0] || {};
                this.create(e, n, s);
                return;
            }
            let i = this._getPlayer(e);
            switch (r) {
                case 'play':
                    i.play();
                    break;
                case 'pause':
                    i.pause();
                    break;
                case 'reset':
                    i.reset();
                    break;
                case 'restart':
                    i.restart();
                    break;
                case 'finish':
                    i.finish();
                    break;
                case 'init':
                    i.init();
                    break;
                case 'setPosition':
                    i.setPosition(parseFloat(o[0]));
                    break;
                case 'destroy':
                    this.destroy(e);
                    break;
            }
        }
    },
    Np = 'ng-animate-queued',
    q_ = '.ng-animate-queued',
    Hu = 'ng-animate-disabled',
    G_ = '.ng-animate-disabled',
    W_ = 'ng-star-inserted',
    Q_ = '.ng-star-inserted',
    K_ = [],
    qp = {
        namespaceId: '',
        setForRemoval: !1,
        setForMove: !1,
        hasAnimation: !1,
        removedBeforeQueried: !1,
    },
    Y_ = {
        namespaceId: '',
        setForMove: !1,
        setForRemoval: !1,
        hasAnimation: !1,
        removedBeforeQueried: !0,
    },
    Pe = '__ng_removed',
    gr = class {
        get params() {
            return this.options.params;
        }
        constructor(e, n = '') {
            this.namespaceId = n;
            let r = e && e.hasOwnProperty('value'),
                o = r ? e.value : e;
            if (((this.value = J_(o)), r)) {
                let i = e,
                    { value: s } = i,
                    a = Sl(i, ['value']);
                this.options = a;
            } else this.options = {};
            this.options.params || (this.options.params = {});
        }
        absorbOptions(e) {
            let n = e.params;
            if (n) {
                let r = this.options.params;
                Object.keys(n).forEach((o) => {
                    r[o] == null && (r[o] = n[o]);
                });
            }
        }
    },
    pr = 'void',
    Uu = new gr(pr),
    il = class {
        constructor(e, n, r) {
            (this.id = e),
                (this.hostElement = n),
                (this._engine = r),
                (this.players = []),
                (this._triggers = new Map()),
                (this._queue = []),
                (this._elementListeners = new Map()),
                (this._hostClassName = 'ng-tns-' + e),
                Ce(n, this._hostClassName);
        }
        listen(e, n, r, o) {
            if (!this._triggers.has(n)) throw a_(r, n);
            if (r == null || r.length == 0) throw u_(n);
            if (!X_(r)) throw l_(r, n);
            let i = De(this._elementListeners, e, []),
                s = { name: n, phase: r, callback: o };
            i.push(s);
            let a = De(this._engine.statesByElement, e, new Map());
            return (
                a.has(n) || (Ce(e, li), Ce(e, li + '-' + n), a.set(n, Uu)),
                () => {
                    this._engine.afterFlush(() => {
                        let u = i.indexOf(s);
                        u >= 0 && i.splice(u, 1),
                            this._triggers.has(n) || a.delete(n);
                    });
                }
            );
        }
        register(e, n) {
            return this._triggers.has(e) ? !1 : (this._triggers.set(e, n), !0);
        }
        _getTrigger(e) {
            let n = this._triggers.get(e);
            if (!n) throw c_(e);
            return n;
        }
        trigger(e, n, r, o = !0) {
            let i = this._getTrigger(n),
                s = new yr(this.id, n, e),
                a = this._engine.statesByElement.get(e);
            a ||
                (Ce(e, li),
                Ce(e, li + '-' + n),
                this._engine.statesByElement.set(e, (a = new Map())));
            let u = a.get(n),
                l = new gr(r, this.id);
            if (
                (!(r && r.hasOwnProperty('value')) &&
                    u &&
                    l.absorbOptions(u.options),
                a.set(n, l),
                u || (u = Uu),
                !(l.value === pr) && u.value === l.value)
            ) {
                if (!nC(u.params, l.params)) {
                    let m = [],
                        b = i.matchStyles(u.value, u.params, m),
                        w = i.matchStyles(l.value, l.params, m);
                    m.length
                        ? this._engine.reportError(m)
                        : this._engine.afterFlush(() => {
                              Yt(e, b), Ue(e, w);
                          });
                }
                return;
            }
            let h = De(this._engine.playersByElement, e, []);
            h.forEach((m) => {
                m.namespaceId == this.id &&
                    m.triggerName == n &&
                    m.queued &&
                    m.destroy();
            });
            let f = i.matchTransition(u.value, l.value, e, l.params),
                p = !1;
            if (!f) {
                if (!o) return;
                (f = i.fallbackTransition), (p = !0);
            }
            return (
                this._engine.totalQueuedPlayers++,
                this._queue.push({
                    element: e,
                    triggerName: n,
                    transition: f,
                    fromState: u,
                    toState: l,
                    player: s,
                    isFallbackTransition: p,
                }),
                p ||
                    (Ce(e, Np),
                    s.onStart(() => {
                        Nn(e, Np);
                    })),
                s.onDone(() => {
                    let m = this.players.indexOf(s);
                    m >= 0 && this.players.splice(m, 1);
                    let b = this._engine.playersByElement.get(e);
                    if (b) {
                        let w = b.indexOf(s);
                        w >= 0 && b.splice(w, 1);
                    }
                }),
                this.players.push(s),
                h.push(s),
                s
            );
        }
        deregister(e) {
            this._triggers.delete(e),
                this._engine.statesByElement.forEach((n) => n.delete(e)),
                this._elementListeners.forEach((n, r) => {
                    this._elementListeners.set(
                        r,
                        n.filter((o) => o.name != e),
                    );
                });
        }
        clearElementCache(e) {
            this._engine.statesByElement.delete(e),
                this._elementListeners.delete(e);
            let n = this._engine.playersByElement.get(e);
            n &&
                (n.forEach((r) => r.destroy()),
                this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, n) {
            let r = this._engine.driver.query(e, mi, !0);
            r.forEach((o) => {
                if (o[Pe]) return;
                let i = this._engine.fetchNamespacesByElement(o);
                i.size
                    ? i.forEach((s) => s.triggerLeaveAnimation(o, n, !1, !0))
                    : this.clearElementCache(o);
            }),
                this._engine.afterFlushAnimationsDone(() =>
                    r.forEach((o) => this.clearElementCache(o)),
                );
        }
        triggerLeaveAnimation(e, n, r, o) {
            let i = this._engine.statesByElement.get(e),
                s = new Map();
            if (i) {
                let a = [];
                if (
                    (i.forEach((u, l) => {
                        if ((s.set(l, u.value), this._triggers.has(l))) {
                            let c = this.trigger(e, l, pr, o);
                            c && a.push(c);
                        }
                    }),
                    a.length)
                )
                    return (
                        this._engine.markElementAsRemoved(this.id, e, !0, n, s),
                        r &&
                            Et(a).onDone(() =>
                                this._engine.processLeaveNode(e),
                            ),
                        !0
                    );
            }
            return !1;
        }
        prepareLeaveAnimationListeners(e) {
            let n = this._elementListeners.get(e),
                r = this._engine.statesByElement.get(e);
            if (n && r) {
                let o = new Set();
                n.forEach((i) => {
                    let s = i.name;
                    if (o.has(s)) return;
                    o.add(s);
                    let u = this._triggers.get(s).fallbackTransition,
                        l = r.get(s) || Uu,
                        c = new gr(pr),
                        d = new yr(this.id, s, e);
                    this._engine.totalQueuedPlayers++,
                        this._queue.push({
                            element: e,
                            triggerName: s,
                            transition: u,
                            fromState: l,
                            toState: c,
                            player: d,
                            isFallbackTransition: !0,
                        });
                });
            }
        }
        removeNode(e, n) {
            let r = this._engine;
            if (
                (e.childElementCount &&
                    this._signalRemovalForInnerTriggers(e, n),
                this.triggerLeaveAnimation(e, n, !0))
            )
                return;
            let o = !1;
            if (r.totalAnimations) {
                let i = r.players.length
                    ? r.playersByQueriedElement.get(e)
                    : [];
                if (i && i.length) o = !0;
                else {
                    let s = e;
                    for (; (s = s.parentNode); )
                        if (r.statesByElement.get(s)) {
                            o = !0;
                            break;
                        }
                }
            }
            if ((this.prepareLeaveAnimationListeners(e), o))
                r.markElementAsRemoved(this.id, e, !1, n);
            else {
                let i = e[Pe];
                (!i || i === qp) &&
                    (r.afterFlush(() => this.clearElementCache(e)),
                    r.destroyInnerAnimations(e),
                    r._onRemovalComplete(e, n));
            }
        }
        insertNode(e, n) {
            Ce(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
            let n = [];
            return (
                this._queue.forEach((r) => {
                    let o = r.player;
                    if (o.destroyed) return;
                    let i = r.element,
                        s = this._elementListeners.get(i);
                    s &&
                        s.forEach((a) => {
                            if (a.name == r.triggerName) {
                                let u = dl(
                                    i,
                                    r.triggerName,
                                    r.fromState.value,
                                    r.toState.value,
                                );
                                (u._data = e),
                                    cl(r.player, a.phase, u, a.callback);
                            }
                        }),
                        o.markedForDestroy
                            ? this._engine.afterFlush(() => {
                                  o.destroy();
                              })
                            : n.push(r);
                }),
                (this._queue = []),
                n.sort((r, o) => {
                    let i = r.transition.ast.depCount,
                        s = o.transition.ast.depCount;
                    return i == 0 || s == 0
                        ? i - s
                        : this._engine.driver.containsElement(
                                r.element,
                                o.element,
                            )
                          ? 1
                          : -1;
                })
            );
        }
        destroy(e) {
            this.players.forEach((n) => n.destroy()),
                this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
    },
    sl = class {
        _onRemovalComplete(e, n) {
            this.onRemovalComplete(e, n);
        }
        constructor(e, n, r, o) {
            (this.bodyNode = e),
                (this.driver = n),
                (this._normalizer = r),
                (this.scheduler = o),
                (this.players = []),
                (this.newHostElements = new Map()),
                (this.playersByElement = new Map()),
                (this.playersByQueriedElement = new Map()),
                (this.statesByElement = new Map()),
                (this.disabledNodes = new Set()),
                (this.totalAnimations = 0),
                (this.totalQueuedPlayers = 0),
                (this._namespaceLookup = {}),
                (this._namespaceList = []),
                (this._flushFns = []),
                (this._whenQuietFns = []),
                (this.namespacesByHostElement = new Map()),
                (this.collectedEnterElements = []),
                (this.collectedLeaveElements = []),
                (this.onRemovalComplete = (i, s) => {});
        }
        get queuedPlayers() {
            let e = [];
            return (
                this._namespaceList.forEach((n) => {
                    n.players.forEach((r) => {
                        r.queued && e.push(r);
                    });
                }),
                e
            );
        }
        createNamespace(e, n) {
            let r = new il(e, n, this);
            return (
                this.bodyNode && this.driver.containsElement(this.bodyNode, n)
                    ? this._balanceNamespaceList(r, n)
                    : (this.newHostElements.set(n, r),
                      this.collectEnterElement(n)),
                (this._namespaceLookup[e] = r)
            );
        }
        _balanceNamespaceList(e, n) {
            let r = this._namespaceList,
                o = this.namespacesByHostElement;
            if (r.length - 1 >= 0) {
                let s = !1,
                    a = this.driver.getParentElement(n);
                for (; a; ) {
                    let u = o.get(a);
                    if (u) {
                        let l = r.indexOf(u);
                        r.splice(l + 1, 0, e), (s = !0);
                        break;
                    }
                    a = this.driver.getParentElement(a);
                }
                s || r.unshift(e);
            } else r.push(e);
            return o.set(n, e), e;
        }
        register(e, n) {
            let r = this._namespaceLookup[e];
            return r || (r = this.createNamespace(e, n)), r;
        }
        registerTrigger(e, n, r) {
            let o = this._namespaceLookup[e];
            o && o.register(n, r) && this.totalAnimations++;
        }
        destroy(e, n) {
            e &&
                (this.afterFlush(() => {}),
                this.afterFlushAnimationsDone(() => {
                    let r = this._fetchNamespace(e);
                    this.namespacesByHostElement.delete(r.hostElement);
                    let o = this._namespaceList.indexOf(r);
                    o >= 0 && this._namespaceList.splice(o, 1),
                        r.destroy(n),
                        delete this._namespaceLookup[e];
                }));
        }
        _fetchNamespace(e) {
            return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
            let n = new Set(),
                r = this.statesByElement.get(e);
            if (r) {
                for (let o of r.values())
                    if (o.namespaceId) {
                        let i = this._fetchNamespace(o.namespaceId);
                        i && n.add(i);
                    }
            }
            return n;
        }
        trigger(e, n, r, o) {
            if (fi(n)) {
                let i = this._fetchNamespace(e);
                if (i) return i.trigger(n, r, o), !0;
            }
            return !1;
        }
        insertNode(e, n, r, o) {
            if (!fi(n)) return;
            let i = n[Pe];
            if (i && i.setForRemoval) {
                (i.setForRemoval = !1), (i.setForMove = !0);
                let s = this.collectedLeaveElements.indexOf(n);
                s >= 0 && this.collectedLeaveElements.splice(s, 1);
            }
            if (e) {
                let s = this._fetchNamespace(e);
                s && s.insertNode(n, r);
            }
            o && this.collectEnterElement(n);
        }
        collectEnterElement(e) {
            this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, n) {
            n
                ? this.disabledNodes.has(e) ||
                  (this.disabledNodes.add(e), Ce(e, Hu))
                : this.disabledNodes.has(e) &&
                  (this.disabledNodes.delete(e), Nn(e, Hu));
        }
        removeNode(e, n, r) {
            if (fi(n)) {
                this.scheduler?.notify();
                let o = e ? this._fetchNamespace(e) : null;
                o ? o.removeNode(n, r) : this.markElementAsRemoved(e, n, !1, r);
                let i = this.namespacesByHostElement.get(n);
                i && i.id !== e && i.removeNode(n, r);
            } else this._onRemovalComplete(n, r);
        }
        markElementAsRemoved(e, n, r, o, i) {
            this.collectedLeaveElements.push(n),
                (n[Pe] = {
                    namespaceId: e,
                    setForRemoval: o,
                    hasAnimation: r,
                    removedBeforeQueried: !1,
                    previousTriggersValues: i,
                });
        }
        listen(e, n, r, o, i) {
            return fi(n)
                ? this._fetchNamespace(e).listen(n, r, o, i)
                : () => {};
        }
        _buildInstruction(e, n, r, o, i) {
            return e.transition.build(
                this.driver,
                e.element,
                e.fromState.value,
                e.toState.value,
                r,
                o,
                e.fromState.options,
                e.toState.options,
                n,
                i,
            );
        }
        destroyInnerAnimations(e) {
            let n = this.driver.query(e, mi, !0);
            n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
                this.playersByQueriedElement.size != 0 &&
                    ((n = this.driver.query(e, Wu, !0)),
                    n.forEach((r) =>
                        this.finishActiveQueriedAnimationOnElement(r),
                    ));
        }
        destroyActiveAnimationsForElement(e) {
            let n = this.playersByElement.get(e);
            n &&
                n.forEach((r) => {
                    r.queued ? (r.markedForDestroy = !0) : r.destroy();
                });
        }
        finishActiveQueriedAnimationOnElement(e) {
            let n = this.playersByQueriedElement.get(e);
            n && n.forEach((r) => r.finish());
        }
        whenRenderingDone() {
            return new Promise((e) => {
                if (this.players.length)
                    return Et(this.players).onDone(() => e());
                e();
            });
        }
        processLeaveNode(e) {
            let n = e[Pe];
            if (n && n.setForRemoval) {
                if (((e[Pe] = qp), n.namespaceId)) {
                    this.destroyInnerAnimations(e);
                    let r = this._fetchNamespace(n.namespaceId);
                    r && r.clearElementCache(e);
                }
                this._onRemovalComplete(e, n.setForRemoval);
            }
            e.classList?.contains(Hu) && this.markElementAsDisabled(e, !1),
                this.driver.query(e, G_, !0).forEach((r) => {
                    this.markElementAsDisabled(r, !1);
                });
        }
        flush(e = -1) {
            let n = [];
            if (
                (this.newHostElements.size &&
                    (this.newHostElements.forEach((r, o) =>
                        this._balanceNamespaceList(r, o),
                    ),
                    this.newHostElements.clear()),
                this.totalAnimations && this.collectedEnterElements.length)
            )
                for (let r = 0; r < this.collectedEnterElements.length; r++) {
                    let o = this.collectedEnterElements[r];
                    Ce(o, W_);
                }
            if (
                this._namespaceList.length &&
                (this.totalQueuedPlayers || this.collectedLeaveElements.length)
            ) {
                let r = [];
                try {
                    n = this._flushAnimations(r, e);
                } finally {
                    for (let o = 0; o < r.length; o++) r[o]();
                }
            } else
                for (let r = 0; r < this.collectedLeaveElements.length; r++) {
                    let o = this.collectedLeaveElements[r];
                    this.processLeaveNode(o);
                }
            if (
                ((this.totalQueuedPlayers = 0),
                (this.collectedEnterElements.length = 0),
                (this.collectedLeaveElements.length = 0),
                this._flushFns.forEach((r) => r()),
                (this._flushFns = []),
                this._whenQuietFns.length)
            ) {
                let r = this._whenQuietFns;
                (this._whenQuietFns = []),
                    n.length
                        ? Et(n).onDone(() => {
                              r.forEach((o) => o());
                          })
                        : r.forEach((o) => o());
            }
        }
        reportError(e) {
            throw d_(e);
        }
        _flushAnimations(e, n) {
            let r = new On(),
                o = [],
                i = new Map(),
                s = [],
                a = new Map(),
                u = new Map(),
                l = new Map(),
                c = new Set();
            this.disabledNodes.forEach((y) => {
                c.add(y);
                let E = this.driver.query(y, q_, !0);
                for (let _ = 0; _ < E.length; _++) c.add(E[_]);
            });
            let d = this.bodyNode,
                h = Array.from(this.statesByElement.keys()),
                f = Fp(h, this.collectedEnterElements),
                p = new Map(),
                m = 0;
            f.forEach((y, E) => {
                let _ = hl + m++;
                p.set(E, _), y.forEach((k) => Ce(k, _));
            });
            let b = [],
                w = new Set(),
                N = new Set();
            for (let y = 0; y < this.collectedLeaveElements.length; y++) {
                let E = this.collectedLeaveElements[y],
                    _ = E[Pe];
                _ &&
                    _.setForRemoval &&
                    (b.push(E),
                    w.add(E),
                    _.hasAnimation
                        ? this.driver.query(E, Q_, !0).forEach((k) => w.add(k))
                        : N.add(E));
            }
            let R = new Map(),
                j = Fp(h, Array.from(w));
            j.forEach((y, E) => {
                let _ = pi + m++;
                R.set(E, _), y.forEach((k) => Ce(k, _));
            }),
                e.push(() => {
                    f.forEach((y, E) => {
                        let _ = p.get(E);
                        y.forEach((k) => Nn(k, _));
                    }),
                        j.forEach((y, E) => {
                            let _ = R.get(E);
                            y.forEach((k) => Nn(k, _));
                        }),
                        b.forEach((y) => {
                            this.processLeaveNode(y);
                        });
                });
            let te = [],
                z = [];
            for (let y = this._namespaceList.length - 1; y >= 0; y--)
                this._namespaceList[y]
                    .drainQueuedTransitions(n)
                    .forEach((_) => {
                        let k = _.player,
                            Z = _.element;
                        if ((te.push(k), this.collectedEnterElements.length)) {
                            let ne = Z[Pe];
                            if (ne && ne.setForMove) {
                                if (
                                    ne.previousTriggersValues &&
                                    ne.previousTriggersValues.has(_.triggerName)
                                ) {
                                    let bt = ne.previousTriggersValues.get(
                                            _.triggerName,
                                        ),
                                        Ee = this.statesByElement.get(
                                            _.element,
                                        );
                                    if (Ee && Ee.has(_.triggerName)) {
                                        let vr = Ee.get(_.triggerName);
                                        (vr.value = bt),
                                            Ee.set(_.triggerName, vr);
                                    }
                                }
                                k.destroy();
                                return;
                            }
                        }
                        let Re = !d || !this.driver.containsElement(d, Z),
                            fe = R.get(Z),
                            it = p.get(Z),
                            U = this._buildInstruction(_, r, it, fe, Re);
                        if (U.errors && U.errors.length) {
                            z.push(U);
                            return;
                        }
                        if (Re) {
                            k.onStart(() => Yt(Z, U.fromStyles)),
                                k.onDestroy(() => Ue(Z, U.toStyles)),
                                o.push(k);
                            return;
                        }
                        if (_.isFallbackTransition) {
                            k.onStart(() => Yt(Z, U.fromStyles)),
                                k.onDestroy(() => Ue(Z, U.toStyles)),
                                o.push(k);
                            return;
                        }
                        let Il = [];
                        U.timelines.forEach((ne) => {
                            (ne.stretchStartingKeyframe = !0),
                                this.disabledNodes.has(ne.element) ||
                                    Il.push(ne);
                        }),
                            (U.timelines = Il),
                            r.append(Z, U.timelines);
                        let Qp = { instruction: U, player: k, element: Z };
                        s.push(Qp),
                            U.queriedElements.forEach((ne) =>
                                De(a, ne, []).push(k),
                            ),
                            U.preStyleProps.forEach((ne, bt) => {
                                if (ne.size) {
                                    let Ee = u.get(bt);
                                    Ee || u.set(bt, (Ee = new Set())),
                                        ne.forEach((vr, Ci) => Ee.add(Ci));
                                }
                            }),
                            U.postStyleProps.forEach((ne, bt) => {
                                let Ee = l.get(bt);
                                Ee || l.set(bt, (Ee = new Set())),
                                    ne.forEach((vr, Ci) => Ee.add(Ci));
                            });
                    });
            if (z.length) {
                let y = [];
                z.forEach((E) => {
                    y.push(f_(E.triggerName, E.errors));
                }),
                    te.forEach((E) => E.destroy()),
                    this.reportError(y);
            }
            let q = new Map(),
                Y = new Map();
            s.forEach((y) => {
                let E = y.element;
                r.has(E) &&
                    (Y.set(E, E),
                    this._beforeAnimationBuild(
                        y.player.namespaceId,
                        y.instruction,
                        q,
                    ));
            }),
                o.forEach((y) => {
                    let E = y.element;
                    this._getPreviousPlayers(
                        E,
                        !1,
                        y.namespaceId,
                        y.triggerName,
                        null,
                    ).forEach((k) => {
                        De(q, E, []).push(k), k.destroy();
                    });
                });
            let ze = b.filter((y) => Pp(y, u, l)),
                ot = new Map();
            Op(ot, this.driver, N, l, He).forEach((y) => {
                Pp(y, u, l) && ze.push(y);
            });
            let wt = new Map();
            f.forEach((y, E) => {
                Op(wt, this.driver, new Set(y), u, ui);
            }),
                ze.forEach((y) => {
                    let E = ot.get(y),
                        _ = wt.get(y);
                    ot.set(
                        y,
                        new Map([
                            ...(E?.entries() ?? []),
                            ...(_?.entries() ?? []),
                        ]),
                    );
                });
            let _i = [],
                wl = [],
                bl = {};
            s.forEach((y) => {
                let { element: E, player: _, instruction: k } = y;
                if (r.has(E)) {
                    if (c.has(E)) {
                        _.onDestroy(() => Ue(E, k.toStyles)),
                            (_.disabled = !0),
                            _.overrideTotalTime(k.totalTime),
                            o.push(_);
                        return;
                    }
                    let Z = bl;
                    if (Y.size > 1) {
                        let fe = E,
                            it = [];
                        for (; (fe = fe.parentNode); ) {
                            let U = Y.get(fe);
                            if (U) {
                                Z = U;
                                break;
                            }
                            it.push(fe);
                        }
                        it.forEach((U) => Y.set(U, Z));
                    }
                    let Re = this._buildAnimation(
                        _.namespaceId,
                        k,
                        q,
                        i,
                        wt,
                        ot,
                    );
                    if ((_.setRealPlayer(Re), Z === bl)) _i.push(_);
                    else {
                        let fe = this.playersByElement.get(Z);
                        fe && fe.length && (_.parentPlayer = Et(fe)), o.push(_);
                    }
                } else
                    Yt(E, k.fromStyles),
                        _.onDestroy(() => Ue(E, k.toStyles)),
                        wl.push(_),
                        c.has(E) && o.push(_);
            }),
                wl.forEach((y) => {
                    let E = i.get(y.element);
                    if (E && E.length) {
                        let _ = Et(E);
                        y.setRealPlayer(_);
                    }
                }),
                o.forEach((y) => {
                    y.parentPlayer
                        ? y.syncPlayerEvents(y.parentPlayer)
                        : y.destroy();
                });
            for (let y = 0; y < b.length; y++) {
                let E = b[y],
                    _ = E[Pe];
                if ((Nn(E, pi), _ && _.hasAnimation)) continue;
                let k = [];
                if (a.size) {
                    let Re = a.get(E);
                    Re && Re.length && k.push(...Re);
                    let fe = this.driver.query(E, Wu, !0);
                    for (let it = 0; it < fe.length; it++) {
                        let U = a.get(fe[it]);
                        U && U.length && k.push(...U);
                    }
                }
                let Z = k.filter((Re) => !Re.destroyed);
                Z.length ? eC(this, E, Z) : this.processLeaveNode(E);
            }
            return (
                (b.length = 0),
                _i.forEach((y) => {
                    this.players.push(y),
                        y.onDone(() => {
                            y.destroy();
                            let E = this.players.indexOf(y);
                            this.players.splice(E, 1);
                        }),
                        y.play();
                }),
                _i
            );
        }
        afterFlush(e) {
            this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
            this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, n, r, o, i) {
            let s = [];
            if (n) {
                let a = this.playersByQueriedElement.get(e);
                a && (s = a);
            } else {
                let a = this.playersByElement.get(e);
                if (a) {
                    let u = !i || i == pr;
                    a.forEach((l) => {
                        l.queued || (!u && l.triggerName != o) || s.push(l);
                    });
                }
            }
            return (
                (r || o) &&
                    (s = s.filter(
                        (a) =>
                            !(
                                (r && r != a.namespaceId) ||
                                (o && o != a.triggerName)
                            ),
                    )),
                s
            );
        }
        _beforeAnimationBuild(e, n, r) {
            let o = n.triggerName,
                i = n.element,
                s = n.isRemovalTransition ? void 0 : e,
                a = n.isRemovalTransition ? void 0 : o;
            for (let u of n.timelines) {
                let l = u.element,
                    c = l !== i,
                    d = De(r, l, []);
                this._getPreviousPlayers(l, c, s, a, n.toState).forEach((f) => {
                    let p = f.getRealPlayer();
                    p.beforeDestroy && p.beforeDestroy(),
                        f.destroy(),
                        d.push(f);
                });
            }
            Yt(i, n.fromStyles);
        }
        _buildAnimation(e, n, r, o, i, s) {
            let a = n.triggerName,
                u = n.element,
                l = [],
                c = new Set(),
                d = new Set(),
                h = n.timelines.map((p) => {
                    let m = p.element;
                    c.add(m);
                    let b = m[Pe];
                    if (b && b.removedBeforeQueried)
                        return new Dt(p.duration, p.delay);
                    let w = m !== u,
                        N = tC(
                            (r.get(m) || K_).map((q) => q.getRealPlayer()),
                        ).filter((q) => {
                            let Y = q;
                            return Y.element ? Y.element === m : !1;
                        }),
                        R = i.get(m),
                        j = s.get(m),
                        te = Lp(this._normalizer, p.keyframes, R, j),
                        z = this._buildPlayer(p, te, N);
                    if ((p.subTimeline && o && d.add(m), w)) {
                        let q = new yr(e, a, m);
                        q.setRealPlayer(z), l.push(q);
                    }
                    return z;
                });
            l.forEach((p) => {
                De(this.playersByQueriedElement, p.element, []).push(p),
                    p.onDone(() =>
                        Z_(this.playersByQueriedElement, p.element, p),
                    );
            }),
                c.forEach((p) => Ce(p, Ip));
            let f = Et(h);
            return (
                f.onDestroy(() => {
                    c.forEach((p) => Nn(p, Ip)), Ue(u, n.toStyles);
                }),
                d.forEach((p) => {
                    De(o, p, []).push(f);
                }),
                f
            );
        }
        _buildPlayer(e, n, r) {
            return n.length > 0
                ? this.driver.animate(
                      e.element,
                      n,
                      e.duration,
                      e.delay,
                      e.easing,
                      r,
                  )
                : new Dt(e.duration, e.delay);
        }
    },
    yr = class {
        constructor(e, n, r) {
            (this.namespaceId = e),
                (this.triggerName = n),
                (this.element = r),
                (this._player = new Dt()),
                (this._containsRealPlayer = !1),
                (this._queuedCallbacks = new Map()),
                (this.destroyed = !1),
                (this.parentPlayer = null),
                (this.markedForDestroy = !1),
                (this.disabled = !1),
                (this.queued = !0),
                (this.totalTime = 0);
        }
        setRealPlayer(e) {
            this._containsRealPlayer ||
                ((this._player = e),
                this._queuedCallbacks.forEach((n, r) => {
                    n.forEach((o) => cl(e, r, void 0, o));
                }),
                this._queuedCallbacks.clear(),
                (this._containsRealPlayer = !0),
                this.overrideTotalTime(e.totalTime),
                (this.queued = !1));
        }
        getRealPlayer() {
            return this._player;
        }
        overrideTotalTime(e) {
            this.totalTime = e;
        }
        syncPlayerEvents(e) {
            let n = this._player;
            n.triggerCallback && e.onStart(() => n.triggerCallback('start')),
                e.onDone(() => this.finish()),
                e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, n) {
            De(this._queuedCallbacks, e, []).push(n);
        }
        onDone(e) {
            this.queued && this._queueEvent('done', e), this._player.onDone(e);
        }
        onStart(e) {
            this.queued && this._queueEvent('start', e),
                this._player.onStart(e);
        }
        onDestroy(e) {
            this.queued && this._queueEvent('destroy', e),
                this._player.onDestroy(e);
        }
        init() {
            this._player.init();
        }
        hasStarted() {
            return this.queued ? !1 : this._player.hasStarted();
        }
        play() {
            !this.queued && this._player.play();
        }
        pause() {
            !this.queued && this._player.pause();
        }
        restart() {
            !this.queued && this._player.restart();
        }
        finish() {
            this._player.finish();
        }
        destroy() {
            (this.destroyed = !0), this._player.destroy();
        }
        reset() {
            !this.queued && this._player.reset();
        }
        setPosition(e) {
            this.queued || this._player.setPosition(e);
        }
        getPosition() {
            return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
            let n = this._player;
            n.triggerCallback && n.triggerCallback(e);
        }
    };
function Z_(t, e, n) {
    let r = t.get(e);
    if (r) {
        if (r.length) {
            let o = r.indexOf(n);
            r.splice(o, 1);
        }
        r.length == 0 && t.delete(e);
    }
    return r;
}
function J_(t) {
    return t ?? null;
}
function fi(t) {
    return t && t.nodeType === 1;
}
function X_(t) {
    return t == 'start' || t == 'done';
}
function Ap(t, e) {
    let n = t.style.display;
    return (t.style.display = e ?? 'none'), n;
}
function Op(t, e, n, r, o) {
    let i = [];
    n.forEach((u) => i.push(Ap(u)));
    let s = [];
    r.forEach((u, l) => {
        let c = new Map();
        u.forEach((d) => {
            let h = e.computeStyle(l, d, o);
            c.set(d, h), (!h || h.length == 0) && ((l[Pe] = Y_), s.push(l));
        }),
            t.set(l, c);
    });
    let a = 0;
    return n.forEach((u) => Ap(u, i[a++])), s;
}
function Fp(t, e) {
    let n = new Map();
    if ((t.forEach((a) => n.set(a, [])), e.length == 0)) return n;
    let r = 1,
        o = new Set(e),
        i = new Map();
    function s(a) {
        if (!a) return r;
        let u = i.get(a);
        if (u) return u;
        let l = a.parentNode;
        return (
            n.has(l) ? (u = l) : o.has(l) ? (u = r) : (u = s(l)), i.set(a, u), u
        );
    }
    return (
        e.forEach((a) => {
            let u = s(a);
            u !== r && n.get(u).push(a);
        }),
        n
    );
}
function Ce(t, e) {
    t.classList?.add(e);
}
function Nn(t, e) {
    t.classList?.remove(e);
}
function eC(t, e, n) {
    Et(n).onDone(() => t.processLeaveNode(e));
}
function tC(t) {
    let e = [];
    return Gp(t, e), e;
}
function Gp(t, e) {
    for (let n = 0; n < t.length; n++) {
        let r = t[n];
        r instanceof fr ? Gp(r.players, e) : e.push(r);
    }
}
function nC(t, e) {
    let n = Object.keys(t),
        r = Object.keys(e);
    if (n.length != r.length) return !1;
    for (let o = 0; o < n.length; o++) {
        let i = n[o];
        if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1;
    }
    return !0;
}
function Pp(t, e, n) {
    let r = n.get(t);
    if (!r) return !1;
    let o = e.get(t);
    return o ? r.forEach((i) => o.add(i)) : e.set(t, r), n.delete(t), !0;
}
var wi = class {
    constructor(e, n, r, o) {
        (this._driver = n),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (i, s) => {}),
            (this._transitionEngine = new sl(e.body, n, r, o)),
            (this._timelineEngine = new ol(e.body, n, r)),
            (this._transitionEngine.onRemovalComplete = (i, s) =>
                this.onRemovalComplete(i, s));
    }
    registerTrigger(e, n, r, o, i) {
        let s = e + '-' + o,
            a = this._triggerCache[s];
        if (!a) {
            let u = [],
                l = [],
                c = gl(this._driver, i, u, l);
            if (u.length) throw t_(o, u);
            l.length && void 0,
                (a = H_(o, c, this._normalizer)),
                (this._triggerCache[s] = a);
        }
        this._transitionEngine.registerTrigger(n, o, a);
    }
    register(e, n) {
        this._transitionEngine.register(e, n);
    }
    destroy(e, n) {
        this._transitionEngine.destroy(e, n);
    }
    onInsert(e, n, r, o) {
        this._transitionEngine.insertNode(e, n, r, o);
    }
    onRemove(e, n, r) {
        this._transitionEngine.removeNode(e, n, r);
    }
    disableAnimations(e, n) {
        this._transitionEngine.markElementAsDisabled(e, n);
    }
    process(e, n, r, o) {
        if (r.charAt(0) == '@') {
            let [i, s] = Ep(r),
                a = o;
            this._timelineEngine.command(i, n, s, a);
        } else this._transitionEngine.trigger(e, n, r, o);
    }
    listen(e, n, r, o, i) {
        if (r.charAt(0) == '@') {
            let [s, a] = Ep(r);
            return this._timelineEngine.listen(s, n, a, i);
        }
        return this._transitionEngine.listen(e, n, r, o, i);
    }
    flush(e = -1) {
        this._transitionEngine.flush(e);
    }
    get players() {
        return [
            ...this._transitionEngine.players,
            ...this._timelineEngine.players,
        ];
    }
    whenRenderingDone() {
        return this._transitionEngine.whenRenderingDone();
    }
    afterFlushAnimationsDone(e) {
        this._transitionEngine.afterFlushAnimationsDone(e);
    }
};
function rC(t, e) {
    let n = null,
        r = null;
    return (
        Array.isArray(e) && e.length
            ? ((n = zu(e[0])), e.length > 1 && (r = zu(e[e.length - 1])))
            : e instanceof Map && (n = zu(e)),
        n || r ? new al(t, n, r) : null
    );
}
var An = class An {
    constructor(e, n, r) {
        (this._element = e),
            (this._startStyles = n),
            (this._endStyles = r),
            (this._state = 0);
        let o = An.initialStylesByElement.get(e);
        o || An.initialStylesByElement.set(e, (o = new Map())),
            (this._initialStyles = o);
    }
    start() {
        this._state < 1 &&
            (this._startStyles &&
                Ue(this._element, this._startStyles, this._initialStyles),
            (this._state = 1));
    }
    finish() {
        this.start(),
            this._state < 2 &&
                (Ue(this._element, this._initialStyles),
                this._endStyles &&
                    (Ue(this._element, this._endStyles),
                    (this._endStyles = null)),
                (this._state = 1));
    }
    destroy() {
        this.finish(),
            this._state < 3 &&
                (An.initialStylesByElement.delete(this._element),
                this._startStyles &&
                    (Yt(this._element, this._startStyles),
                    (this._endStyles = null)),
                this._endStyles &&
                    (Yt(this._element, this._endStyles),
                    (this._endStyles = null)),
                Ue(this._element, this._initialStyles),
                (this._state = 3));
    }
};
An.initialStylesByElement = new WeakMap();
var al = An;
function zu(t) {
    let e = null;
    return (
        t.forEach((n, r) => {
            oC(r) && ((e = e || new Map()), e.set(r, n));
        }),
        e
    );
}
function oC(t) {
    return t === 'display' || t === 'position';
}
var bi = class {
        constructor(e, n, r, o) {
            (this.element = e),
                (this.keyframes = n),
                (this.options = r),
                (this._specialStyles = o),
                (this._onDoneFns = []),
                (this._onStartFns = []),
                (this._onDestroyFns = []),
                (this._initialized = !1),
                (this._finished = !1),
                (this._started = !1),
                (this._destroyed = !1),
                (this._originalOnDoneFns = []),
                (this._originalOnStartFns = []),
                (this.time = 0),
                (this.parentPlayer = null),
                (this.currentSnapshot = new Map()),
                (this._duration = r.duration),
                (this._delay = r.delay || 0),
                (this.time = this._duration + this._delay);
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        init() {
            this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
            if (this._initialized) return;
            this._initialized = !0;
            let e = this.keyframes;
            (this.domPlayer = this._triggerWebAnimation(
                this.element,
                e,
                this.options,
            )),
                (this._finalKeyframe = e.length ? e[e.length - 1] : new Map());
            let n = () => this._onFinish();
            this.domPlayer.addEventListener('finish', n),
                this.onDestroy(() => {
                    this.domPlayer.removeEventListener('finish', n);
                });
        }
        _preparePlayerBeforeStart() {
            this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(e) {
            let n = [];
            return (
                e.forEach((r) => {
                    n.push(Object.fromEntries(r));
                }),
                n
            );
        }
        _triggerWebAnimation(e, n, r) {
            return e.animate(this._convertKeyframesToObject(n), r);
        }
        onStart(e) {
            this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
            this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        play() {
            this._buildPlayer(),
                this.hasStarted() ||
                    (this._onStartFns.forEach((e) => e()),
                    (this._onStartFns = []),
                    (this._started = !0),
                    this._specialStyles && this._specialStyles.start()),
                this.domPlayer.play();
        }
        pause() {
            this.init(), this.domPlayer.pause();
        }
        finish() {
            this.init(),
                this._specialStyles && this._specialStyles.finish(),
                this._onFinish(),
                this.domPlayer.finish();
        }
        reset() {
            this._resetDomPlayerState(),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._started = !1),
                (this._onStartFns = this._originalOnStartFns),
                (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
            this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
            this.reset(), this.play();
        }
        hasStarted() {
            return this._started;
        }
        destroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this._resetDomPlayerState(),
                this._onFinish(),
                this._specialStyles && this._specialStyles.destroy(),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        setPosition(e) {
            this.domPlayer === void 0 && this.init(),
                (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
            return +(this.domPlayer.currentTime ?? 0) / this.time;
        }
        get totalTime() {
            return this._delay + this._duration;
        }
        beforeDestroy() {
            let e = new Map();
            this.hasStarted() &&
                this._finalKeyframe.forEach((r, o) => {
                    o !== 'offset' &&
                        e.set(o, this._finished ? r : ml(this.element, o));
                }),
                (this.currentSnapshot = e);
        }
        triggerCallback(e) {
            let n = e === 'start' ? this._onStartFns : this._onDoneFns;
            n.forEach((r) => r()), (n.length = 0);
        }
    },
    ul = class {
        validateStyleProperty(e) {
            return !0;
        }
        validateAnimatableStyleProperty(e) {
            return !0;
        }
        matchesElement(e, n) {
            return !1;
        }
        containsElement(e, n) {
            return jp(e, n);
        }
        getParentElement(e) {
            return fl(e);
        }
        query(e, n, r) {
            return Vp(e, n, r);
        }
        computeStyle(e, n, r) {
            return ml(e, n);
        }
        animate(e, n, r, o, i, s = []) {
            let a = o == 0 ? 'both' : 'forwards',
                u = { duration: r, delay: o, fill: a };
            i && (u.easing = i);
            let l = new Map(),
                c = s.filter((f) => f instanceof bi);
            __(r, o) &&
                c.forEach((f) => {
                    f.currentSnapshot.forEach((p, m) => l.set(m, p));
                });
            let d = w_(n).map((f) => new Map(f));
            d = C_(e, d, l);
            let h = rC(e, d);
            return new bi(e, d, u, h);
        }
    };
function yP(t, e, n) {
    return t === 'noop'
        ? new wi(e, new Bp(), new Gu(), n)
        : new wi(e, new ul(), new Yu(), n);
}
var Rp = class {
        constructor(e, n) {
            this._driver = e;
            let r = [],
                o = [],
                i = gl(e, n, r, o);
            if (r.length) throw XI(r);
            o.length && void 0, (this._animationAst = i);
        }
        buildTimelines(e, n, r, o, i) {
            let s = Array.isArray(n) ? _p(n) : n,
                a = Array.isArray(r) ? _p(r) : r,
                u = [];
            i = i || new On();
            let l = vl(
                this._driver,
                e,
                this._animationAst,
                hl,
                pi,
                s,
                a,
                o,
                i,
                u,
            );
            if (u.length) throw e_(u);
            return l;
        }
    },
    hi = '@',
    Wp = '@.disabled',
    Ii = class {
        constructor(e, n, r, o) {
            (this.namespaceId = e),
                (this.delegate = n),
                (this.engine = r),
                (this._onDestroy = o),
                (this.ɵtype = 0);
        }
        get data() {
            return this.delegate.data;
        }
        destroyNode(e) {
            this.delegate.destroyNode?.(e);
        }
        destroy() {
            this.engine.destroy(this.namespaceId, this.delegate),
                this.engine.afterFlushAnimationsDone(() => {
                    queueMicrotask(() => {
                        this.delegate.destroy();
                    });
                }),
                this._onDestroy?.();
        }
        createElement(e, n) {
            return this.delegate.createElement(e, n);
        }
        createComment(e) {
            return this.delegate.createComment(e);
        }
        createText(e) {
            return this.delegate.createText(e);
        }
        appendChild(e, n) {
            this.delegate.appendChild(e, n),
                this.engine.onInsert(this.namespaceId, n, e, !1);
        }
        insertBefore(e, n, r, o = !0) {
            this.delegate.insertBefore(e, n, r),
                this.engine.onInsert(this.namespaceId, n, e, o);
        }
        removeChild(e, n, r) {
            this.engine.onRemove(this.namespaceId, n, this.delegate);
        }
        selectRootElement(e, n) {
            return this.delegate.selectRootElement(e, n);
        }
        parentNode(e) {
            return this.delegate.parentNode(e);
        }
        nextSibling(e) {
            return this.delegate.nextSibling(e);
        }
        setAttribute(e, n, r, o) {
            this.delegate.setAttribute(e, n, r, o);
        }
        removeAttribute(e, n, r) {
            this.delegate.removeAttribute(e, n, r);
        }
        addClass(e, n) {
            this.delegate.addClass(e, n);
        }
        removeClass(e, n) {
            this.delegate.removeClass(e, n);
        }
        setStyle(e, n, r, o) {
            this.delegate.setStyle(e, n, r, o);
        }
        removeStyle(e, n, r) {
            this.delegate.removeStyle(e, n, r);
        }
        setProperty(e, n, r) {
            n.charAt(0) == hi && n == Wp
                ? this.disableAnimations(e, !!r)
                : this.delegate.setProperty(e, n, r);
        }
        setValue(e, n) {
            this.delegate.setValue(e, n);
        }
        listen(e, n, r) {
            return this.delegate.listen(e, n, r);
        }
        disableAnimations(e, n) {
            this.engine.disableAnimations(e, n);
        }
    },
    ll = class extends Ii {
        constructor(e, n, r, o, i) {
            super(n, r, o, i), (this.factory = e), (this.namespaceId = n);
        }
        setProperty(e, n, r) {
            n.charAt(0) == hi
                ? n.charAt(1) == '.' && n == Wp
                    ? ((r = r === void 0 ? !0 : !!r),
                      this.disableAnimations(e, r))
                    : this.engine.process(this.namespaceId, e, n.slice(1), r)
                : this.delegate.setProperty(e, n, r);
        }
        listen(e, n, r) {
            if (n.charAt(0) == hi) {
                let o = iC(e),
                    i = n.slice(1),
                    s = '';
                return (
                    i.charAt(0) != hi && ([i, s] = sC(i)),
                    this.engine.listen(this.namespaceId, o, i, s, (a) => {
                        let u = a._data || -1;
                        this.factory.scheduleListenerCallback(u, r, a);
                    })
                );
            }
            return this.delegate.listen(e, n, r);
        }
    };
function iC(t) {
    switch (t) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return t;
    }
}
function sC(t) {
    let e = t.indexOf('.'),
        n = t.substring(0, e),
        r = t.slice(e + 1);
    return [n, r];
}
var kp = class {
    constructor(e, n, r) {
        (this.delegate = e),
            (this.engine = n),
            (this._zone = r),
            (this._currentId = 0),
            (this._microtaskId = 1),
            (this._animationCallbacksBuffer = []),
            (this._rendererCache = new Map()),
            (this._cdRecurDepth = 0),
            (n.onRemovalComplete = (o, i) => {
                let s = i?.parentNode(o);
                s && i.removeChild(s, o);
            });
    }
    createRenderer(e, n) {
        let r = '',
            o = this.delegate.createRenderer(e, n);
        if (!e || !n?.data?.animation) {
            let l = this._rendererCache,
                c = l.get(o);
            if (!c) {
                let d = () => l.delete(o);
                (c = new Ii(r, o, this.engine, d)), l.set(o, c);
            }
            return c;
        }
        let i = n.id,
            s = n.id + '-' + this._currentId;
        this._currentId++, this.engine.register(s, e);
        let a = (l) => {
            Array.isArray(l)
                ? l.forEach(a)
                : this.engine.registerTrigger(i, s, e, l.name, l);
        };
        return n.data.animation.forEach(a), new ll(this, s, o, this.engine);
    }
    begin() {
        this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
    }
    _scheduleCountTask() {
        queueMicrotask(() => {
            this._microtaskId++;
        });
    }
    scheduleListenerCallback(e, n, r) {
        if (e >= 0 && e < this._microtaskId) {
            this._zone.run(() => n(r));
            return;
        }
        let o = this._animationCallbacksBuffer;
        o.length == 0 &&
            queueMicrotask(() => {
                this._zone.run(() => {
                    o.forEach((i) => {
                        let [s, a] = i;
                        s(a);
                    }),
                        (this._animationCallbacksBuffer = []);
                });
            }),
            o.push([n, r]);
    }
    end() {
        this._cdRecurDepth--,
            this._cdRecurDepth == 0 &&
                this._zone.runOutsideAngular(() => {
                    this._scheduleCountTask(),
                        this.engine.flush(this._microtaskId);
                }),
            this.delegate.end && this.delegate.end();
    }
    whenRenderingDone() {
        return this.engine.whenRenderingDone();
    }
};
export {
    Se as a,
    It as b,
    Sl as c,
    aC as d,
    uC as e,
    nm as f,
    G as g,
    X as h,
    fm as i,
    F as j,
    v as k,
    Ui as l,
    zi as m,
    le as n,
    Pn as o,
    kn as p,
    mm as q,
    We as r,
    J0 as s,
    X0 as t,
    Zl as u,
    A as v,
    jn as w,
    Le as x,
    Im as y,
    _m as z,
    Cm as A,
    xt as B,
    Tm as C,
    we as D,
    km as E,
    Qe as F,
    Vn as G,
    Wr as H,
    jm as I,
    Vm as J,
    Gi as K,
    Nt as L,
    Gm as M,
    Wm as N,
    At as O,
    dc as P,
    Qm as Q,
    hc as R,
    Bn as S,
    Qr as T,
    Km as U,
    Ym as V,
    Xm as W,
    Wi as X,
    Qi as Y,
    eg as Z,
    tg as _,
    ng as $,
    rg as aa,
    og as ba,
    ig as ca,
    Yi as da,
    sg as ea,
    ag as fa,
    ug as ga,
    pc as ha,
    mc as ia,
    lg as ja,
    cg as ka,
    dg as la,
    fg as ma,
    g as na,
    ud as oa,
    $ as pa,
    cd as qa,
    TO as ra,
    B as sa,
    P as ta,
    oe as ua,
    O as va,
    MO as wa,
    gd as xa,
    yd as ya,
    qn as za,
    ct as Aa,
    xO as Ba,
    Cd as Ca,
    wn as Da,
    Ad as Ea,
    ty as Fa,
    Rd as Ga,
    ft as Ha,
    fy as Ia,
    hy as Ja,
    Pa as Ka,
    NO as La,
    AO as Ma,
    OO as Na,
    FO as Oa,
    nv as Pa,
    Cn as Qa,
    $t as Ra,
    Ga as Sa,
    vt as Ta,
    Ft as Ua,
    As as Va,
    PO as Wa,
    dv as Xa,
    hv as Ya,
    $o as Za,
    RO as _a,
    kO as $a,
    Wa as ab,
    Tn as bb,
    Za as cb,
    LO as db,
    jO as eb,
    VO as fb,
    BO as gb,
    $O as hb,
    Of as ib,
    Wv as jb,
    qo as kb,
    HO as lb,
    Kv as mb,
    UO as nb,
    zO as ob,
    qO as pb,
    Xn as qb,
    GO as rb,
    K as sb,
    WO as tb,
    Ut as ub,
    Co as vb,
    Ys as wb,
    ti as xb,
    xn as yb,
    he as zb,
    jE as Ab,
    Gt as Bb,
    YO as Cb,
    fw as Db,
    vw as Eb,
    aa as Fb,
    Dw as Gb,
    Nh as Hb,
    Cw as Ib,
    Mw as Jb,
    $w as Kb,
    kh as Lb,
    Hw as Mb,
    ZO as Nb,
    Hh as Ob,
    Uh as Pb,
    eb as Qb,
    qh as Rb,
    Gh as Sb,
    ob as Tb,
    JO as Ub,
    gb as Vb,
    XO as Wb,
    eF as Xb,
    tF as Yb,
    nF as Zb,
    rF as _b,
    oF as $b,
    iF as ac,
    sF as bc,
    aF as cc,
    Ib as dc,
    Yh as ec,
    _b as fc,
    uF as gc,
    lF as hc,
    cF as ic,
    dF as jc,
    fF as kc,
    hF as lc,
    pF as mc,
    mF as nc,
    gF as oc,
    yF as pc,
    vF as qc,
    oi as rc,
    Rb as sc,
    tp as tc,
    Du as uc,
    Vb as vc,
    DF as wc,
    EF as xc,
    Eu as yc,
    wF as zc,
    bF as Ac,
    iI as Bc,
    IF as Cc,
    _F as Dc,
    _u as Ec,
    zF as Fc,
    ip as Gc,
    Pu as Hc,
    qF as Ic,
    ai as Jc,
    aI as Kc,
    GF as Lc,
    uI as Mc,
    WF as Nc,
    QF as Oc,
    KF as Pc,
    YF as Qc,
    ZF as Rc,
    JF as Sc,
    XF as Tc,
    eP as Uc,
    tP as Vc,
    nP as Wc,
    NI as Xc,
    OI as Yc,
    rP as Zc,
    oP as _c,
    hp as $c,
    aP as ad,
    uP as bd,
    lP as cd,
    cP as dd,
    fl as ed,
    g_ as fd,
    mP as gd,
    jp as hd,
    Vp as id,
    Bp as jd,
    bp as kd,
    qu as ld,
    Gu as md,
    w_ as nd,
    gP as od,
    __ as pd,
    Yu as qd,
    wi as rd,
    bi as sd,
    ul as td,
    yP as ud,
    Rp as vd,
    Ii as wd,
    ll as xd,
    kp as yd,
};
