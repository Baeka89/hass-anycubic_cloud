!function (t) {
  var e = function (t, i) {
    return e = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }, e(t, i);
  };
  function i(t, i) {
    if ("function" != typeof i && null !== i) throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
    function r() {
      this.constructor = t;
    }
    e(t, i), t.prototype = null === i ? Object.create(i) : (r.prototype = i.prototype, new r());
  }
  var r = function () {
    return r = Object.assign || function (t) {
      for (var e, i = 1, r = arguments.length; i < r; i++) for (var n in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return t;
    }, r.apply(this, arguments);
  };
  function n(t, e, i, r) {
    var n,
      s = arguments.length,
      o = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, r);else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (o = (s < 3 ? n(o) : s > 3 ? n(e, i, o) : n(e, i)) || o);
    return s > 3 && o && Object.defineProperty(e, i, o), o;
  }
  function s(t, e, i) {
    if (i || 2 === arguments.length) for (var r, n = 0, s = e.length; n < s; n++) !r && n in e || (r || (r = Array.prototype.slice.call(e, 0, n)), r[n] = e[n]);
    return t.concat(r || Array.prototype.slice.call(e));
  }
  "function" == typeof SuppressedError && SuppressedError;
  /**
       * @license
       * Copyright 2019 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const o = globalThis,
    a = o.ShadowRoot && (void 0 === o.ShadyCSS || o.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    l = Symbol(),
    c = new WeakMap();
  class h {
    constructor(t, e, i) {
      if (this._$cssResult$ = !0, i !== l) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t, this.t = e;
    }
    get styleSheet() {
      let t = this.o;
      const e = this.t;
      if (a && void 0 === t) {
        const i = void 0 !== e && 1 === e.length;
        i && (t = c.get(e)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && c.set(e, t));
      }
      return t;
    }
    toString() {
      return this.cssText;
    }
  }
  const d = t => new h("string" == typeof t ? t : t + "", void 0, l),
    p = (t, ...e) => {
      const i = 1 === t.length ? t[0] : e.reduce((e, i, r) => e + (t => {
        if (!0 === t._$cssResult$) return t.cssText;
        if ("number" == typeof t) return t;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(i) + t[r + 1], t[0]);
      return new h(i, t, l);
    },
    u = a ? t => t : t => t instanceof CSSStyleSheet ? (t => {
      let e = "";
      for (const i of t.cssRules) e += i.cssText;
      return d(e);
    })(t) : t
    /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */,
    {
      is: g,
      defineProperty: m,
      getOwnPropertyDescriptor: b,
      getOwnPropertyNames: _,
      getOwnPropertySymbols: v,
      getPrototypeOf: y
    } = Object,
    f = globalThis,
    x = f.trustedTypes,
    w = x ? x.emptyScript : "",
    E = f.reactiveElementPolyfillSupport,
    S = (t, e) => t,
    $ = {
      toAttribute(t, e) {
        switch (e) {
          case Boolean:
            t = t ? w : null;
            break;
          case Object:
          case Array:
            t = null == t ? t : JSON.stringify(t);
        }
        return t;
      },
      fromAttribute(t, e) {
        let i = t;
        switch (e) {
          case Boolean:
            i = null !== t;
            break;
          case Number:
            i = null === t ? null : Number(t);
            break;
          case Object:
          case Array:
            try {
              i = JSON.parse(t);
            } catch (t) {
              i = null;
            }
        }
        return i;
      }
    },
    P = (t, e) => !g(t, e),
    T = {
      attribute: !0,
      type: String,
      converter: $,
      reflect: !1,
      hasChanged: P
    };
  Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= new WeakMap();
  class A extends HTMLElement {
    static addInitializer(t) {
      this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t, e = T) {
      if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
        const i = Symbol(),
          r = this.getPropertyDescriptor(t, i, e);
        void 0 !== r && m(this.prototype, t, r);
      }
    }
    static getPropertyDescriptor(t, e, i) {
      const {
        get: r,
        set: n
      } = b(this.prototype, t) ?? {
        get() {
          return this[e];
        },
        set(t) {
          this[e] = t;
        }
      };
      return {
        get() {
          return r?.call(this);
        },
        set(e) {
          const s = r?.call(this);
          n.call(this, e), this.requestUpdate(t, s, i);
        },
        configurable: !0,
        enumerable: !0
      };
    }
    static getPropertyOptions(t) {
      return this.elementProperties.get(t) ?? T;
    }
    static _$Ei() {
      if (this.hasOwnProperty(S("elementProperties"))) return;
      const t = y(this);
      t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(S("finalized"))) return;
      if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
        const t = this.properties,
          e = [..._(t), ...v(t)];
        for (const i of e) this.createProperty(i, t[i]);
      }
      const t = this[Symbol.metadata];
      if (null !== t) {
        const e = litPropertyMetadata.get(t);
        if (void 0 !== e) for (const [t, i] of e) this.elementProperties.set(t, i);
      }
      this._$Eh = new Map();
      for (const [t, e] of this.elementProperties) {
        const i = this._$Eu(t, e);
        void 0 !== i && this._$Eh.set(i, t);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(t) {
      const e = [];
      if (Array.isArray(t)) {
        const i = new Set(t.flat(1 / 0).reverse());
        for (const t of i) e.unshift(u(t));
      } else void 0 !== t && e.push(u(t));
      return e;
    }
    static _$Eu(t, e) {
      const i = e.attribute;
      return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(t => t(this));
    }
    addController(t) {
      (this._$EO ??= new Set()).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
      this._$EO?.delete(t);
    }
    _$E_() {
      const t = new Map(),
        e = this.constructor.elementProperties;
      for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
      t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
      const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return ((t, e) => {
        if (a) t.adoptedStyleSheets = e.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet);else for (const i of e) {
          const e = document.createElement("style"),
            r = o.litNonce;
          void 0 !== r && e.setAttribute("nonce", r), e.textContent = i.cssText, t.appendChild(e);
        }
      })(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(t => t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
      this._$EO?.forEach(t => t.hostDisconnected?.());
    }
    attributeChangedCallback(t, e, i) {
      this._$AK(t, i);
    }
    _$EC(t, e) {
      const i = this.constructor.elementProperties.get(t),
        r = this.constructor._$Eu(t, i);
      if (void 0 !== r && !0 === i.reflect) {
        const n = (void 0 !== i.converter?.toAttribute ? i.converter : $).toAttribute(e, i.type);
        this._$Em = t, null == n ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
      }
    }
    _$AK(t, e) {
      const i = this.constructor,
        r = i._$Eh.get(t);
      if (void 0 !== r && this._$Em !== r) {
        const t = i.getPropertyOptions(r),
          n = "function" == typeof t.converter ? {
            fromAttribute: t.converter
          } : void 0 !== t.converter?.fromAttribute ? t.converter : $;
        this._$Em = r, this[r] = n.fromAttribute(e, t.type), this._$Em = null;
      }
    }
    requestUpdate(t, e, i) {
      if (void 0 !== t) {
        if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? P)(this[t], e)) return;
        this.P(t, e, i);
      }
      !1 === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t, e, i) {
      this._$AL.has(t) || this._$AL.set(t, e), !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set()).add(t);
    }
    async _$ET() {
      this.isUpdatePending = !0;
      try {
        await this._$ES;
      } catch (t) {
        Promise.reject(t);
      }
      const t = this.scheduleUpdate();
      return null != t && (await t), !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t, e] of this._$Ep) this[t] = e;
          this._$Ep = void 0;
        }
        const t = this.constructor.elementProperties;
        if (t.size > 0) for (const [e, i] of t) !0 !== i.wrapped || this._$AL.has(e) || void 0 === this[e] || this.P(e, this[e], i);
      }
      let t = !1;
      const e = this._$AL;
      try {
        t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(t => t.hostUpdate?.()), this.update(e)) : this._$EU();
      } catch (e) {
        throw t = !1, this._$EU(), e;
      }
      t && this._$AE(e);
    }
    willUpdate(t) {}
    _$AE(t) {
      this._$EO?.forEach(t => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$EU() {
      this._$AL = new Map(), this.isUpdatePending = !1;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t) {
      return !0;
    }
    update(t) {
      this._$Ej &&= this._$Ej.forEach(t => this._$EC(t, this[t])), this._$EU();
    }
    updated(t) {}
    firstUpdated(t) {}
  }
  A.elementStyles = [], A.shadowRootOptions = {
    mode: "open"
  }, A[S("elementProperties")] = new Map(), A[S("finalized")] = new Map(), E?.({
    ReactiveElement: A
  }), (f.reactiveElementVersions ??= []).push("2.0.4");
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const C = globalThis,
    D = C.trustedTypes,
    k = D ? D.createPolicy("lit-html", {
      createHTML: t => t
    }) : void 0,
    M = "$lit$",
    H = `lit$${Math.random().toFixed(9).slice(2)}$`,
    I = "?" + H,
    B = `<${I}>`,
    F = document,
    L = () => F.createComment(""),
    N = t => null === t || "object" != typeof t && "function" != typeof t,
    O = Array.isArray,
    R = t => O(t) || "function" == typeof t?.[Symbol.iterator],
    U = "[ \t\n\f\r]",
    z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    j = /-->/g,
    G = />/g,
    V = RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
    q = /'/g,
    Y = /"/g,
    W = /^(?:script|style|textarea|title)$/i,
    X = (t => (e, ...i) => ({
      _$litType$: t,
      strings: e,
      values: i
    }))(1),
    K = Symbol.for("lit-noChange"),
    Z = Symbol.for("lit-nothing"),
    Q = new WeakMap(),
    J = F.createTreeWalker(F, 129);
  function tt(t, e) {
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== k ? k.createHTML(e) : e;
  }
  const et = (t, e) => {
    const i = t.length - 1,
      r = [];
    let n,
      s = 2 === e ? "<svg>" : "",
      o = z;
    for (let e = 0; e < i; e++) {
      const i = t[e];
      let a,
        l,
        c = -1,
        h = 0;
      for (; h < i.length && (o.lastIndex = h, l = o.exec(i), null !== l);) h = o.lastIndex, o === z ? "!--" === l[1] ? o = j : void 0 !== l[1] ? o = G : void 0 !== l[2] ? (W.test(l[2]) && (n = RegExp("</" + l[2], "g")), o = V) : void 0 !== l[3] && (o = V) : o === V ? ">" === l[0] ? (o = n ?? z, c = -1) : void 0 === l[1] ? c = -2 : (c = o.lastIndex - l[2].length, a = l[1], o = void 0 === l[3] ? V : '"' === l[3] ? Y : q) : o === Y || o === q ? o = V : o === j || o === G ? o = z : (o = V, n = void 0);
      const d = o === V && t[e + 1].startsWith("/>") ? " " : "";
      s += o === z ? i + B : c >= 0 ? (r.push(a), i.slice(0, c) + M + i.slice(c) + H + d) : i + H + (-2 === c ? e : d);
    }
    return [tt(t, s + (t[i] || "<?>") + (2 === e ? "</svg>" : "")), r];
  };
  class it {
    constructor({
      strings: t,
      _$litType$: e
    }, i) {
      let r;
      this.parts = [];
      let n = 0,
        s = 0;
      const o = t.length - 1,
        a = this.parts,
        [l, c] = et(t, e);
      if (this.el = it.createElement(l, i), J.currentNode = this.el.content, 2 === e) {
        const t = this.el.content.firstChild;
        t.replaceWith(...t.childNodes);
      }
      for (; null !== (r = J.nextNode()) && a.length < o;) {
        if (1 === r.nodeType) {
          if (r.hasAttributes()) for (const t of r.getAttributeNames()) if (t.endsWith(M)) {
            const e = c[s++],
              i = r.getAttribute(t).split(H),
              o = /([.?@])?(.*)/.exec(e);
            a.push({
              type: 1,
              index: n,
              name: o[2],
              strings: i,
              ctor: "." === o[1] ? at : "?" === o[1] ? lt : "@" === o[1] ? ct : ot
            }), r.removeAttribute(t);
          } else t.startsWith(H) && (a.push({
            type: 6,
            index: n
          }), r.removeAttribute(t));
          if (W.test(r.tagName)) {
            const t = r.textContent.split(H),
              e = t.length - 1;
            if (e > 0) {
              r.textContent = D ? D.emptyScript : "";
              for (let i = 0; i < e; i++) r.append(t[i], L()), J.nextNode(), a.push({
                type: 2,
                index: ++n
              });
              r.append(t[e], L());
            }
          }
        } else if (8 === r.nodeType) if (r.data === I) a.push({
          type: 2,
          index: n
        });else {
          let t = -1;
          for (; -1 !== (t = r.data.indexOf(H, t + 1));) a.push({
            type: 7,
            index: n
          }), t += H.length - 1;
        }
        n++;
      }
    }
    static createElement(t, e) {
      const i = F.createElement("template");
      return i.innerHTML = t, i;
    }
  }
  function rt(t, e, i = t, r) {
    if (e === K) return e;
    let n = void 0 !== r ? i._$Co?.[r] : i._$Cl;
    const s = N(e) ? void 0 : e._$litDirective$;
    return n?.constructor !== s && (n?._$AO?.(!1), void 0 === s ? n = void 0 : (n = new s(t), n._$AT(t, i, r)), void 0 !== r ? (i._$Co ??= [])[r] = n : i._$Cl = n), void 0 !== n && (e = rt(t, n._$AS(t, e.values), n, r)), e;
  }
  class nt {
    constructor(t, e) {
      this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t) {
      const {
          el: {
            content: e
          },
          parts: i
        } = this._$AD,
        r = (t?.creationScope ?? F).importNode(e, !0);
      J.currentNode = r;
      let n = J.nextNode(),
        s = 0,
        o = 0,
        a = i[0];
      for (; void 0 !== a;) {
        if (s === a.index) {
          let e;
          2 === a.type ? e = new st(n, n.nextSibling, this, t) : 1 === a.type ? e = new a.ctor(n, a.name, a.strings, this, t) : 6 === a.type && (e = new ht(n, this, t)), this._$AV.push(e), a = i[++o];
        }
        s !== a?.index && (n = J.nextNode(), s++);
      }
      return J.currentNode = F, r;
    }
    p(t) {
      let e = 0;
      for (const i of this._$AV) void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
    }
  }
  class st {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, e, i, r) {
      this.type = 2, this._$AH = Z, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
    }
    get parentNode() {
      let t = this._$AA.parentNode;
      const e = this._$AM;
      return void 0 !== e && 11 === t?.nodeType && (t = e.parentNode), t;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t, e = this) {
      t = rt(this, t, e), N(t) ? t === Z || null == t || "" === t ? (this._$AH !== Z && this._$AR(), this._$AH = Z) : t !== this._$AH && t !== K && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : R(t) ? this.k(t) : this._(t);
    }
    S(t) {
      return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
      this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
    }
    _(t) {
      this._$AH !== Z && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(F.createTextNode(t)), this._$AH = t;
    }
    $(t) {
      const {
          values: e,
          _$litType$: i
        } = t,
        r = "number" == typeof i ? this._$AC(t) : (void 0 === i.el && (i.el = it.createElement(tt(i.h, i.h[0]), this.options)), i);
      if (this._$AH?._$AD === r) this._$AH.p(e);else {
        const t = new nt(r, this),
          i = t.u(this.options);
        t.p(e), this.T(i), this._$AH = t;
      }
    }
    _$AC(t) {
      let e = Q.get(t.strings);
      return void 0 === e && Q.set(t.strings, e = new it(t)), e;
    }
    k(t) {
      O(this._$AH) || (this._$AH = [], this._$AR());
      const e = this._$AH;
      let i,
        r = 0;
      for (const n of t) r === e.length ? e.push(i = new st(this.S(L()), this.S(L()), this, this.options)) : i = e[r], i._$AI(n), r++;
      r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
    }
    _$AR(t = this._$AA.nextSibling, e) {
      for (this._$AP?.(!1, !0, e); t && t !== this._$AB;) {
        const e = t.nextSibling;
        t.remove(), t = e;
      }
    }
    setConnected(t) {
      void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
    }
  }
  class ot {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t, e, i, r, n) {
      this.type = 1, this._$AH = Z, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = Z;
    }
    _$AI(t, e = this, i, r) {
      const n = this.strings;
      let s = !1;
      if (void 0 === n) t = rt(this, t, e, 0), s = !N(t) || t !== this._$AH && t !== K, s && (this._$AH = t);else {
        const r = t;
        let o, a;
        for (t = n[0], o = 0; o < n.length - 1; o++) a = rt(this, r[i + o], e, o), a === K && (a = this._$AH[o]), s ||= !N(a) || a !== this._$AH[o], a === Z ? t = Z : t !== Z && (t += (a ?? "") + n[o + 1]), this._$AH[o] = a;
      }
      s && !r && this.j(t);
    }
    j(t) {
      t === Z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
  }
  class at extends ot {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t) {
      this.element[this.name] = t === Z ? void 0 : t;
    }
  }
  class lt extends ot {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== Z);
    }
  }
  class ct extends ot {
    constructor(t, e, i, r, n) {
      super(t, e, i, r, n), this.type = 5;
    }
    _$AI(t, e = this) {
      if ((t = rt(this, t, e, 0) ?? Z) === K) return;
      const i = this._$AH,
        r = t === Z && i !== Z || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive,
        n = t !== Z && (i === Z || r);
      r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
  }
  class ht {
    constructor(t, e, i) {
      this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t) {
      rt(this, t);
    }
  }
  const dt = {
      P: M,
      A: H,
      C: I,
      M: 1,
      L: et,
      R: nt,
      D: R,
      V: rt,
      I: st,
      H: ot,
      N: lt,
      U: ct,
      B: at,
      F: ht
    },
    pt = C.litHtmlPolyfillSupport;
  pt?.(it, st), (C.litHtmlVersions ??= []).push("3.1.4");
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  class ut extends A {
    constructor() {
      super(...arguments), this.renderOptions = {
        host: this
      }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
      const e = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ((t, e, i) => {
        const r = i?.renderBefore ?? e;
        let n = r._$litPart$;
        if (void 0 === n) {
          const t = i?.renderBefore ?? null;
          r._$litPart$ = n = new st(e.insertBefore(L(), t), t, void 0, i ?? {});
        }
        return n._$AI(t), n;
      })(e, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
      return K;
    }
  }
  ut._$litElement$ = !0, ut.finalized = !0, globalThis.litElementHydrateSupport?.({
    LitElement: ut
  });
  const gt = globalThis.litElementPolyfillSupport;
  gt?.({
    LitElement: ut
  }), (globalThis.litElementVersions ??= []).push("4.0.6");
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const mt = t => (e, i) => {
      void 0 !== i ? i.addInitializer(() => {
        customElements.define(t, e);
      }) : customElements.define(t, e);
    }
    /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */,
    bt = {
      attribute: !0,
      type: String,
      converter: $,
      reflect: !1,
      hasChanged: P
    },
    _t = (t = bt, e, i) => {
      const {
        kind: r,
        metadata: n
      } = i;
      let s = globalThis.litPropertyMetadata.get(n);
      if (void 0 === s && globalThis.litPropertyMetadata.set(n, s = new Map()), s.set(i.name, t), "accessor" === r) {
        const {
          name: r
        } = i;
        return {
          set(i) {
            const n = e.get.call(this);
            e.set.call(this, i), this.requestUpdate(r, n, t);
          },
          init(e) {
            return void 0 !== e && this.P(r, void 0, t), e;
          }
        };
      }
      if ("setter" === r) {
        const {
          name: r
        } = i;
        return function (i) {
          const n = this[r];
          e.call(this, i), this.requestUpdate(r, n, t);
        };
      }
      throw Error("Unsupported decorator location: " + r);
    };
  function vt(t) {
    return (e, i) => "object" == typeof i ? _t(t, e, i) : ((t, e, i) => {
      const r = e.hasOwnProperty(i);
      return e.constructor.createProperty(i, r ? {
        ...t,
        wrapped: !0
      } : t), r ? Object.getOwnPropertyDescriptor(e, i) : void 0;
    })(t, e, i);
  }
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  function yt(t) {
    return vt({
      ...t,
      state: !0,
      attribute: !1
    });
  }
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const ft = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && "object" != typeof e && Object.defineProperty(t, e, i), i)
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */;
  function xt(t, e) {
    return (i, r, n) => {
      const s = e => e.renderRoot?.querySelector(t) ?? null;
      if (e) {
        const {
          get: t,
          set: e
        } = "object" == typeof r ? i : n ?? (() => {
          const t = Symbol();
          return {
            get() {
              return this[t];
            },
            set(e) {
              this[t] = e;
            }
          };
        })();
        return ft(i, r, {
          get() {
            let i = t.call(this);
            return void 0 === i && (i = s(this), (null !== i || this.hasUpdated) && e.call(this, i)), i;
          }
        });
      }
      return ft(i, r, {
        get() {
          return s(this);
        }
      });
    };
  }
  class wt extends Date {
    constructor() {
      super(), this.setTime(0 === arguments.length ? Date.now() : 1 === arguments.length ? "string" == typeof arguments[0] ? +new Date(arguments[0]) : arguments[0] : Date.UTC(...arguments));
    }
    getTimezoneOffset() {
      return 0;
    }
  }
  const Et = /^(get|set)(?!UTC)/;
  Object.getOwnPropertyNames(Date.prototype).forEach(t => {
    if (Et.test(t)) {
      const e = Date.prototype[t.replace(Et, "$1UTC")];
      e && (wt.prototype[t] = e);
    }
  });
  class St extends wt {
    toString() {
      return `${this.toDateString()} ${this.toTimeString()}`;
    }
    toDateString() {
      return `${$t.format(this)} ${Pt.format(this)} ${this.getFullYear()}`;
    }
    toTimeString() {
      return `${Tt.format(this)} GMT+0000 (Coordinated Universal Time)`;
    }
    toLocaleString(t, e) {
      return Date.prototype.toLocaleString.call(this, t, {
        timeZone: "UTC",
        ...e
      });
    }
    toLocaleDateString(t, e) {
      return Date.prototype.toLocaleDateString.call(this, t, {
        timeZone: "UTC",
        ...e
      });
    }
    toLocaleTimeString(t, e) {
      return Date.prototype.toLocaleTimeString.call(this, t, {
        timeZone: "UTC",
        ...e
      });
    }
  }
  var $t = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: "UTC"
    }),
    Pt = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC"
    }),
    Tt = new Intl.DateTimeFormat("en-GB", {
      hour12: !1,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC"
    });
  const At = t => new St(+new Date(t)),
    Ct = 6048e5,
    Dt = 864e5,
    kt = 6e4,
    Mt = 36e5,
    Ht = Symbol.for("constructDateFrom");
  function It(t, e) {
    return "function" == typeof t ? t(e) : t && "object" == typeof t && Ht in t ? t[Ht](e) : t instanceof Date ? new t.constructor(e) : new Date(e);
  }
  function Bt(t, e) {
    return It(e || t, t);
  }
  function Ft(t, e, i) {
    const {
        years: r = 0,
        months: n = 0,
        weeks: s = 0,
        days: o = 0,
        hours: a = 0,
        minutes: l = 0,
        seconds: c = 0
      } = e,
      h = Bt(t, i?.in),
      d = n || r ? function (t, e, i) {
        const r = Bt(t, i?.in);
        if (isNaN(e)) return It(i?.in || t, NaN);
        if (!e) return r;
        const n = r.getDate(),
          s = It(i?.in || t, r.getTime());
        return s.setMonth(r.getMonth() + e + 1, 0), n >= s.getDate() ? s : (r.setFullYear(s.getFullYear(), s.getMonth(), n), r);
      }(h, n + 12 * r) : h,
      p = o || s ? function (t, e, i) {
        const r = Bt(t, i?.in);
        return isNaN(e) ? It(i?.in || t, NaN) : e ? (r.setDate(r.getDate() + e), r) : r;
      }(d, o + 7 * s) : d,
      u = 1e3 * (c + 60 * (l + 60 * a));
    return It(i?.in || t, +p + u);
  }
  let Lt = {};
  function Nt() {
    return Lt;
  }
  function Ot(t, e) {
    const i = Nt(),
      r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? i.weekStartsOn ?? i.locale?.options?.weekStartsOn ?? 0,
      n = Bt(t, e?.in),
      s = n.getDay(),
      o = (s < r ? 7 : 0) + s - r;
    return n.setDate(n.getDate() - o), n.setHours(0, 0, 0, 0), n;
  }
  function Rt(t, e) {
    return Ot(t, {
      ...e,
      weekStartsOn: 1
    });
  }
  function Ut(t, e) {
    const i = Bt(t, e?.in),
      r = i.getFullYear(),
      n = It(i, 0);
    n.setFullYear(r + 1, 0, 4), n.setHours(0, 0, 0, 0);
    const s = Rt(n),
      o = It(i, 0);
    o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
    const a = Rt(o);
    return i.getTime() >= s.getTime() ? r + 1 : i.getTime() >= a.getTime() ? r : r - 1;
  }
  function zt(t) {
    const e = Bt(t),
      i = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
    return i.setUTCFullYear(e.getFullYear()), +t - +i;
  }
  function jt(t, ...e) {
    const i = It.bind(null, t || e.find(t => "object" == typeof t));
    return e.map(i);
  }
  function Gt(t, e) {
    const i = Bt(t, e?.in);
    return i.setHours(0, 0, 0, 0), i;
  }
  function Vt(t, e, i) {
    const [r, n] = jt(i?.in, t, e),
      s = Gt(r),
      o = Gt(n),
      a = +s - zt(s),
      l = +o - zt(o);
    return Math.round((a - l) / Dt);
  }
  function qt(t, e) {
    const i = +Bt(t) - +Bt(e);
    return i < 0 ? -1 : i > 0 ? 1 : i;
  }
  function Yt(t) {
    return !(!((e = t) instanceof Date || "object" == typeof e && "[object Date]" === Object.prototype.toString.call(e)) && "number" != typeof t || isNaN(+Bt(t)));
    var e;
  }
  function Wt(t, e) {
    const i = t.getFullYear() - e.getFullYear() || t.getMonth() - e.getMonth() || t.getDate() - e.getDate() || t.getHours() - e.getHours() || t.getMinutes() - e.getMinutes() || t.getSeconds() - e.getSeconds() || t.getMilliseconds() - e.getMilliseconds();
    return i < 0 ? -1 : i > 0 ? 1 : i;
  }
  function Xt(t) {
    return e => {
      const i = (t ? Math[t] : Math.trunc)(e);
      return 0 === i ? 0 : i;
    };
  }
  function Kt(t, e) {
    return +Bt(t) - +Bt(e);
  }
  function Zt(t, e) {
    const i = Bt(t, e?.in);
    return +function (t, e) {
      const i = Bt(t, e?.in);
      return i.setHours(23, 59, 59, 999), i;
    }(i, e) == +function (t, e) {
      const i = Bt(t, e?.in),
        r = i.getMonth();
      return i.setFullYear(i.getFullYear(), r + 1, 0), i.setHours(23, 59, 59, 999), i;
    }(i, e);
  }
  function Qt(t, e, i) {
    const [r, n, s] = jt(i?.in, t, t, e),
      o = qt(n, s),
      a = Math.abs(function (t, e, i) {
        const [r, n] = jt(i?.in, t, e);
        return 12 * (r.getFullYear() - n.getFullYear()) + (r.getMonth() - n.getMonth());
      }(n, s));
    if (a < 1) return 0;
    1 === n.getMonth() && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - o * a);
    let l = qt(n, s) === -o;
    Zt(r) && 1 === a && 1 === qt(r, s) && (l = !1);
    const c = o * (a - +l);
    return 0 === c ? 0 : c;
  }
  function Jt(t, e, i) {
    const [r, n] = jt(i?.in, t, e),
      s = qt(r, n),
      o = Math.abs(function (t, e, i) {
        const [r, n] = jt(i?.in, t, e);
        return r.getFullYear() - n.getFullYear();
      }(r, n));
    r.setFullYear(1584), n.setFullYear(1584);
    const a = s * (o - +(qt(r, n) === -s));
    return 0 === a ? 0 : a;
  }
  const te = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  function ee(t) {
    return (e = {}) => {
      const i = e.width ? String(e.width) : t.defaultWidth;
      return t.formats[i] || t.formats[t.defaultWidth];
    };
  }
  const ie = {
      date: ee({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy"
        },
        defaultWidth: "full"
      }),
      time: ee({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a"
        },
        defaultWidth: "full"
      }),
      dateTime: ee({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}"
        },
        defaultWidth: "full"
      })
    },
    re = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P"
    };
  function ne(t) {
    return (e, i) => {
      let r;
      if ("formatting" === (i?.context ? String(i.context) : "standalone") && t.formattingValues) {
        const e = t.defaultFormattingWidth || t.defaultWidth,
          n = i?.width ? String(i.width) : e;
        r = t.formattingValues[n] || t.formattingValues[e];
      } else {
        const e = t.defaultWidth,
          n = i?.width ? String(i.width) : t.defaultWidth;
        r = t.values[n] || t.values[e];
      }
      return r[t.argumentCallback ? t.argumentCallback(e) : e];
    };
  }
  function se(t) {
    return (e, i = {}) => {
      const r = i.width,
        n = r && t.matchPatterns[r] || t.matchPatterns[t.defaultMatchWidth],
        s = e.match(n);
      if (!s) return null;
      const o = s[0],
        a = r && t.parsePatterns[r] || t.parsePatterns[t.defaultParseWidth],
        l = Array.isArray(a) ? function (t, e) {
          for (let i = 0; i < t.length; i++) if (e(t[i])) return i;
          return;
        }(a, t => t.test(o)) : function (t, e) {
          for (const i in t) if (Object.prototype.hasOwnProperty.call(t, i) && e(t[i])) return i;
          return;
        }(a, t => t.test(o));
      let c;
      c = t.valueCallback ? t.valueCallback(l) : l, c = i.valueCallback ? i.valueCallback(c) : c;
      return {
        value: c,
        rest: e.slice(o.length)
      };
    };
  }
  var oe;
  const ae = {
    code: "en-US",
    formatDistance: (t, e, i) => {
      let r;
      const n = te[t];
      return r = "string" == typeof n ? n : 1 === e ? n.one : n.other.replace("{{count}}", e.toString()), i?.addSuffix ? i.comparison && i.comparison > 0 ? "in " + r : r + " ago" : r;
    },
    formatLong: ie,
    formatRelative: (t, e, i, r) => re[t],
    localize: {
      ordinalNumber: (t, e) => {
        const i = Number(t),
          r = i % 100;
        if (r > 20 || r < 10) switch (r % 10) {
          case 1:
            return i + "st";
          case 2:
            return i + "nd";
          case 3:
            return i + "rd";
        }
        return i + "th";
      },
      era: ne({
        values: {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"]
        },
        defaultWidth: "wide"
      }),
      quarter: ne({
        values: {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
        },
        defaultWidth: "wide",
        argumentCallback: t => t - 1
      }),
      month: ne({
        values: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        defaultWidth: "wide"
      }),
      day: ne({
        values: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        defaultWidth: "wide"
      }),
      dayPeriod: ne({
        values: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
          }
        },
        defaultWidth: "wide",
        formattingValues: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
          }
        },
        defaultFormattingWidth: "wide"
      })
    },
    match: {
      ordinalNumber: (oe = {
        matchPattern: /^(\d+)(th|st|nd|rd)?/i,
        parsePattern: /\d+/i,
        valueCallback: t => parseInt(t, 10)
      }, (t, e = {}) => {
        const i = t.match(oe.matchPattern);
        if (!i) return null;
        const r = i[0],
          n = t.match(oe.parsePattern);
        if (!n) return null;
        let s = oe.valueCallback ? oe.valueCallback(n[0]) : n[0];
        return s = e.valueCallback ? e.valueCallback(s) : s, {
          value: s,
          rest: t.slice(r.length)
        };
      }),
      era: se({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          any: [/^b/i, /^(a|c)/i]
        },
        defaultParseWidth: "any"
      }),
      quarter: se({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          any: [/1/i, /2/i, /3/i, /4/i]
        },
        defaultParseWidth: "any",
        valueCallback: t => t + 1
      }),
      month: se({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
          any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
        },
        defaultParseWidth: "any"
      }),
      day: se({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
        },
        defaultParseWidth: "any"
      }),
      dayPeriod: se({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
        },
        defaultMatchWidth: "any",
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i
          }
        },
        defaultParseWidth: "any"
      })
    },
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  function le(t, e) {
    const i = Bt(t, e?.in),
      r = Vt(i, function (t, e) {
        const i = Bt(t, e?.in);
        return i.setFullYear(i.getFullYear(), 0, 1), i.setHours(0, 0, 0, 0), i;
      }(i));
    return r + 1;
  }
  function ce(t, e) {
    const i = Bt(t, e?.in),
      r = +Rt(i) - +function (t, e) {
        const i = Ut(t, e),
          r = It(e?.in || t, 0);
        return r.setFullYear(i, 0, 4), r.setHours(0, 0, 0, 0), Rt(r);
      }(i);
    return Math.round(r / Ct) + 1;
  }
  function he(t, e) {
    const i = Bt(t, e?.in),
      r = i.getFullYear(),
      n = Nt(),
      s = e?.firstWeekContainsDate ?? e?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1,
      o = It(e?.in || t, 0);
    o.setFullYear(r + 1, 0, s), o.setHours(0, 0, 0, 0);
    const a = Ot(o, e),
      l = It(e?.in || t, 0);
    l.setFullYear(r, 0, s), l.setHours(0, 0, 0, 0);
    const c = Ot(l, e);
    return +i >= +a ? r + 1 : +i >= +c ? r : r - 1;
  }
  function de(t, e) {
    const i = Bt(t, e?.in),
      r = +Ot(i, e) - +function (t, e) {
        const i = Nt(),
          r = e?.firstWeekContainsDate ?? e?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1,
          n = he(t, e),
          s = It(e?.in || t, 0);
        return s.setFullYear(n, 0, r), s.setHours(0, 0, 0, 0), Ot(s, e);
      }(i, e);
    return Math.round(r / Ct) + 1;
  }
  function pe(t, e) {
    return (t < 0 ? "-" : "") + Math.abs(t).toString().padStart(e, "0");
  }
  const ue = {
      y(t, e) {
        const i = t.getFullYear(),
          r = i > 0 ? i : 1 - i;
        return pe("yy" === e ? r % 100 : r, e.length);
      },
      M(t, e) {
        const i = t.getMonth();
        return "M" === e ? String(i + 1) : pe(i + 1, 2);
      },
      d: (t, e) => pe(t.getDate(), e.length),
      a(t, e) {
        const i = t.getHours() / 12 >= 1 ? "pm" : "am";
        switch (e) {
          case "a":
          case "aa":
            return i.toUpperCase();
          case "aaa":
            return i;
          case "aaaaa":
            return i[0];
          default:
            return "am" === i ? "a.m." : "p.m.";
        }
      },
      h: (t, e) => pe(t.getHours() % 12 || 12, e.length),
      H: (t, e) => pe(t.getHours(), e.length),
      m: (t, e) => pe(t.getMinutes(), e.length),
      s: (t, e) => pe(t.getSeconds(), e.length),
      S(t, e) {
        const i = e.length,
          r = t.getMilliseconds();
        return pe(Math.trunc(r * Math.pow(10, i - 3)), e.length);
      }
    },
    ge = "midnight",
    me = "noon",
    be = "morning",
    _e = "afternoon",
    ve = "evening",
    ye = "night",
    fe = {
      G: function (t, e, i) {
        const r = t.getFullYear() > 0 ? 1 : 0;
        switch (e) {
          case "G":
          case "GG":
          case "GGG":
            return i.era(r, {
              width: "abbreviated"
            });
          case "GGGGG":
            return i.era(r, {
              width: "narrow"
            });
          default:
            return i.era(r, {
              width: "wide"
            });
        }
      },
      y: function (t, e, i) {
        if ("yo" === e) {
          const e = t.getFullYear(),
            r = e > 0 ? e : 1 - e;
          return i.ordinalNumber(r, {
            unit: "year"
          });
        }
        return ue.y(t, e);
      },
      Y: function (t, e, i, r) {
        const n = he(t, r),
          s = n > 0 ? n : 1 - n;
        if ("YY" === e) {
          return pe(s % 100, 2);
        }
        return "Yo" === e ? i.ordinalNumber(s, {
          unit: "year"
        }) : pe(s, e.length);
      },
      R: function (t, e) {
        return pe(Ut(t), e.length);
      },
      u: function (t, e) {
        return pe(t.getFullYear(), e.length);
      },
      Q: function (t, e, i) {
        const r = Math.ceil((t.getMonth() + 1) / 3);
        switch (e) {
          case "Q":
            return String(r);
          case "QQ":
            return pe(r, 2);
          case "Qo":
            return i.ordinalNumber(r, {
              unit: "quarter"
            });
          case "QQQ":
            return i.quarter(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "QQQQQ":
            return i.quarter(r, {
              width: "narrow",
              context: "formatting"
            });
          default:
            return i.quarter(r, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      q: function (t, e, i) {
        const r = Math.ceil((t.getMonth() + 1) / 3);
        switch (e) {
          case "q":
            return String(r);
          case "qq":
            return pe(r, 2);
          case "qo":
            return i.ordinalNumber(r, {
              unit: "quarter"
            });
          case "qqq":
            return i.quarter(r, {
              width: "abbreviated",
              context: "standalone"
            });
          case "qqqqq":
            return i.quarter(r, {
              width: "narrow",
              context: "standalone"
            });
          default:
            return i.quarter(r, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      M: function (t, e, i) {
        const r = t.getMonth();
        switch (e) {
          case "M":
          case "MM":
            return ue.M(t, e);
          case "Mo":
            return i.ordinalNumber(r + 1, {
              unit: "month"
            });
          case "MMM":
            return i.month(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "MMMMM":
            return i.month(r, {
              width: "narrow",
              context: "formatting"
            });
          default:
            return i.month(r, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      L: function (t, e, i) {
        const r = t.getMonth();
        switch (e) {
          case "L":
            return String(r + 1);
          case "LL":
            return pe(r + 1, 2);
          case "Lo":
            return i.ordinalNumber(r + 1, {
              unit: "month"
            });
          case "LLL":
            return i.month(r, {
              width: "abbreviated",
              context: "standalone"
            });
          case "LLLLL":
            return i.month(r, {
              width: "narrow",
              context: "standalone"
            });
          default:
            return i.month(r, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      w: function (t, e, i, r) {
        const n = de(t, r);
        return "wo" === e ? i.ordinalNumber(n, {
          unit: "week"
        }) : pe(n, e.length);
      },
      I: function (t, e, i) {
        const r = ce(t);
        return "Io" === e ? i.ordinalNumber(r, {
          unit: "week"
        }) : pe(r, e.length);
      },
      d: function (t, e, i) {
        return "do" === e ? i.ordinalNumber(t.getDate(), {
          unit: "date"
        }) : ue.d(t, e);
      },
      D: function (t, e, i) {
        const r = le(t);
        return "Do" === e ? i.ordinalNumber(r, {
          unit: "dayOfYear"
        }) : pe(r, e.length);
      },
      E: function (t, e, i) {
        const r = t.getDay();
        switch (e) {
          case "E":
          case "EE":
          case "EEE":
            return i.day(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "EEEEE":
            return i.day(r, {
              width: "narrow",
              context: "formatting"
            });
          case "EEEEEE":
            return i.day(r, {
              width: "short",
              context: "formatting"
            });
          default:
            return i.day(r, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      e: function (t, e, i, r) {
        const n = t.getDay(),
          s = (n - r.weekStartsOn + 8) % 7 || 7;
        switch (e) {
          case "e":
            return String(s);
          case "ee":
            return pe(s, 2);
          case "eo":
            return i.ordinalNumber(s, {
              unit: "day"
            });
          case "eee":
            return i.day(n, {
              width: "abbreviated",
              context: "formatting"
            });
          case "eeeee":
            return i.day(n, {
              width: "narrow",
              context: "formatting"
            });
          case "eeeeee":
            return i.day(n, {
              width: "short",
              context: "formatting"
            });
          default:
            return i.day(n, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      c: function (t, e, i, r) {
        const n = t.getDay(),
          s = (n - r.weekStartsOn + 8) % 7 || 7;
        switch (e) {
          case "c":
            return String(s);
          case "cc":
            return pe(s, e.length);
          case "co":
            return i.ordinalNumber(s, {
              unit: "day"
            });
          case "ccc":
            return i.day(n, {
              width: "abbreviated",
              context: "standalone"
            });
          case "ccccc":
            return i.day(n, {
              width: "narrow",
              context: "standalone"
            });
          case "cccccc":
            return i.day(n, {
              width: "short",
              context: "standalone"
            });
          default:
            return i.day(n, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      i: function (t, e, i) {
        const r = t.getDay(),
          n = 0 === r ? 7 : r;
        switch (e) {
          case "i":
            return String(n);
          case "ii":
            return pe(n, e.length);
          case "io":
            return i.ordinalNumber(n, {
              unit: "day"
            });
          case "iii":
            return i.day(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "iiiii":
            return i.day(r, {
              width: "narrow",
              context: "formatting"
            });
          case "iiiiii":
            return i.day(r, {
              width: "short",
              context: "formatting"
            });
          default:
            return i.day(r, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      a: function (t, e, i) {
        const r = t.getHours() / 12 >= 1 ? "pm" : "am";
        switch (e) {
          case "a":
          case "aa":
            return i.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "aaa":
            return i.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            }).toLowerCase();
          case "aaaaa":
            return i.dayPeriod(r, {
              width: "narrow",
              context: "formatting"
            });
          default:
            return i.dayPeriod(r, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      b: function (t, e, i) {
        const r = t.getHours();
        let n;
        switch (n = 12 === r ? me : 0 === r ? ge : r / 12 >= 1 ? "pm" : "am", e) {
          case "b":
          case "bb":
            return i.dayPeriod(n, {
              width: "abbreviated",
              context: "formatting"
            });
          case "bbb":
            return i.dayPeriod(n, {
              width: "abbreviated",
              context: "formatting"
            }).toLowerCase();
          case "bbbbb":
            return i.dayPeriod(n, {
              width: "narrow",
              context: "formatting"
            });
          default:
            return i.dayPeriod(n, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      B: function (t, e, i) {
        const r = t.getHours();
        let n;
        switch (n = r >= 17 ? ve : r >= 12 ? _e : r >= 4 ? be : ye, e) {
          case "B":
          case "BB":
          case "BBB":
            return i.dayPeriod(n, {
              width: "abbreviated",
              context: "formatting"
            });
          case "BBBBB":
            return i.dayPeriod(n, {
              width: "narrow",
              context: "formatting"
            });
          default:
            return i.dayPeriod(n, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      h: function (t, e, i) {
        if ("ho" === e) {
          let e = t.getHours() % 12;
          return 0 === e && (e = 12), i.ordinalNumber(e, {
            unit: "hour"
          });
        }
        return ue.h(t, e);
      },
      H: function (t, e, i) {
        return "Ho" === e ? i.ordinalNumber(t.getHours(), {
          unit: "hour"
        }) : ue.H(t, e);
      },
      K: function (t, e, i) {
        const r = t.getHours() % 12;
        return "Ko" === e ? i.ordinalNumber(r, {
          unit: "hour"
        }) : pe(r, e.length);
      },
      k: function (t, e, i) {
        let r = t.getHours();
        return 0 === r && (r = 24), "ko" === e ? i.ordinalNumber(r, {
          unit: "hour"
        }) : pe(r, e.length);
      },
      m: function (t, e, i) {
        return "mo" === e ? i.ordinalNumber(t.getMinutes(), {
          unit: "minute"
        }) : ue.m(t, e);
      },
      s: function (t, e, i) {
        return "so" === e ? i.ordinalNumber(t.getSeconds(), {
          unit: "second"
        }) : ue.s(t, e);
      },
      S: function (t, e) {
        return ue.S(t, e);
      },
      X: function (t, e, i) {
        const r = t.getTimezoneOffset();
        if (0 === r) return "Z";
        switch (e) {
          case "X":
            return we(r);
          case "XXXX":
          case "XX":
            return Ee(r);
          default:
            return Ee(r, ":");
        }
      },
      x: function (t, e, i) {
        const r = t.getTimezoneOffset();
        switch (e) {
          case "x":
            return we(r);
          case "xxxx":
          case "xx":
            return Ee(r);
          default:
            return Ee(r, ":");
        }
      },
      O: function (t, e, i) {
        const r = t.getTimezoneOffset();
        switch (e) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + xe(r, ":");
          default:
            return "GMT" + Ee(r, ":");
        }
      },
      z: function (t, e, i) {
        const r = t.getTimezoneOffset();
        switch (e) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + xe(r, ":");
          default:
            return "GMT" + Ee(r, ":");
        }
      },
      t: function (t, e, i) {
        return pe(Math.trunc(+t / 1e3), e.length);
      },
      T: function (t, e, i) {
        return pe(+t, e.length);
      }
    };
  function xe(t, e = "") {
    const i = t > 0 ? "-" : "+",
      r = Math.abs(t),
      n = Math.trunc(r / 60),
      s = r % 60;
    return 0 === s ? i + String(n) : i + String(n) + e + pe(s, 2);
  }
  function we(t, e) {
    if (t % 60 == 0) {
      return (t > 0 ? "-" : "+") + pe(Math.abs(t) / 60, 2);
    }
    return Ee(t, e);
  }
  function Ee(t, e = "") {
    const i = t > 0 ? "-" : "+",
      r = Math.abs(t);
    return i + pe(Math.trunc(r / 60), 2) + e + pe(r % 60, 2);
  }
  const Se = (t, e) => {
      switch (t) {
        case "P":
          return e.date({
            width: "short"
          });
        case "PP":
          return e.date({
            width: "medium"
          });
        case "PPP":
          return e.date({
            width: "long"
          });
        default:
          return e.date({
            width: "full"
          });
      }
    },
    $e = (t, e) => {
      switch (t) {
        case "p":
          return e.time({
            width: "short"
          });
        case "pp":
          return e.time({
            width: "medium"
          });
        case "ppp":
          return e.time({
            width: "long"
          });
        default:
          return e.time({
            width: "full"
          });
      }
    },
    Pe = {
      p: $e,
      P: (t, e) => {
        const i = t.match(/(P+)(p+)?/) || [],
          r = i[1],
          n = i[2];
        if (!n) return Se(t, e);
        let s;
        switch (r) {
          case "P":
            s = e.dateTime({
              width: "short"
            });
            break;
          case "PP":
            s = e.dateTime({
              width: "medium"
            });
            break;
          case "PPP":
            s = e.dateTime({
              width: "long"
            });
            break;
          default:
            s = e.dateTime({
              width: "full"
            });
        }
        return s.replace("{{date}}", Se(r, e)).replace("{{time}}", $e(n, e));
      }
    },
    Te = /^D+$/,
    Ae = /^Y+$/,
    Ce = ["D", "DD", "YY", "YYYY"];
  const De = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    ke = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    Me = /^'([^]*?)'?$/,
    He = /''/g,
    Ie = /[a-zA-Z]/;
  function Be(t, e, i) {
    const r = Nt(),
      n = i?.locale ?? r.locale ?? ae,
      s = i?.firstWeekContainsDate ?? i?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1,
      o = i?.weekStartsOn ?? i?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0,
      a = Bt(t, i?.in);
    if (!Yt(a)) throw new RangeError("Invalid time value");
    let l = e.match(ke).map(t => {
      const e = t[0];
      if ("p" === e || "P" === e) {
        return (0, Pe[e])(t, n.formatLong);
      }
      return t;
    }).join("").match(De).map(t => {
      if ("''" === t) return {
        isToken: !1,
        value: "'"
      };
      const e = t[0];
      if ("'" === e) return {
        isToken: !1,
        value: Fe(t)
      };
      if (fe[e]) return {
        isToken: !0,
        value: t
      };
      if (e.match(Ie)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + e + "`");
      return {
        isToken: !1,
        value: t
      };
    });
    n.localize.preprocessor && (l = n.localize.preprocessor(a, l));
    const c = {
      firstWeekContainsDate: s,
      weekStartsOn: o,
      locale: n
    };
    return l.map(r => {
      if (!r.isToken) return r.value;
      const s = r.value;
      (!i?.useAdditionalWeekYearTokens && function (t) {
        return Ae.test(t);
      }(s) || !i?.useAdditionalDayOfYearTokens && function (t) {
        return Te.test(t);
      }(s)) && function (t, e, i) {
        const r = function (t, e, i) {
          const r = "Y" === t[0] ? "years" : "days of the month";
          return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${i}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
        }(t, e, i);
        if (console.warn(r), Ce.includes(t)) throw new RangeError(r);
      }(s, e, String(t));
      return (0, fe[s[0]])(a, s, n.localize, c);
    }).join("");
  }
  function Fe(t) {
    const e = t.match(Me);
    return e ? e[1].replace(He, "'") : t;
  }
  function Le(t, e) {
    const {
        start: i,
        end: r
      } = function (t, e) {
        const [i, r] = jt(t, e.start, e.end);
        return {
          start: i,
          end: r
        };
      }(e?.in, t),
      n = {},
      s = Jt(r, i);
    s && (n.years = s);
    const o = Ft(i, {
        years: n.years
      }),
      a = Qt(r, o);
    a && (n.months = a);
    const l = Ft(o, {
        months: n.months
      }),
      c = function (t, e, i) {
        const [r, n] = jt(i?.in, t, e),
          s = Wt(r, n),
          o = Math.abs(Vt(r, n));
        r.setDate(r.getDate() - s * o);
        const a = s * (o - Number(Wt(r, n) === -s));
        return 0 === a ? 0 : a;
      }(r, l);
    c && (n.days = c);
    const h = Ft(l, {
        days: n.days
      }),
      d = function (t, e, i) {
        const [r, n] = jt(i?.in, t, e),
          s = (+r - +n) / Mt;
        return Xt(i?.roundingMethod)(s);
      }(r, h);
    d && (n.hours = d);
    const p = Ft(h, {
        hours: n.hours
      }),
      u = function (t, e, i) {
        const r = Kt(t, e) / kt;
        return Xt(i?.roundingMethod)(r);
      }(r, p);
    u && (n.minutes = u);
    const g = function (t, e, i) {
      const r = Kt(t, e) / 1e3;
      return Xt(i?.roundingMethod)(r);
    }(r, Ft(p, {
      minutes: n.minutes
    }));
    return g && (n.seconds = g), n;
  }
  const Ne = (t, e, i, r) => {
    const n = r || {},
      s = i ?? {},
      o = new Event(e, {
        bubbles: void 0 === n.bubbles || n.bubbles,
        cancelable: Boolean(n.cancelable),
        composed: void 0 === n.composed || n.composed
      });
    return o.detail = s, t.dispatchEvent(o), o;
  };
  var Oe;
  !function (t) {
    t.PRINTER = "printer", t.ACE = "ace", t.BRIDGE = "bridge";
  }(Oe || (Oe = {}));
  const Re = "Cloud API Bridge",
    Ue = "ACE Pro Multi-Color Box";
  var ze, je, Ge, Ve, qe, Ye;
  !function (t) {
    t.ETA = "ETA", t.Elapsed = "Elapsed", t.Remaining = "Remaining";
  }(ze || (ze = {})), function (t) {
    t.F = "F", t.C = "C";
  }(je || (je = {})), function (t) {
    t.Status = "Status", t.PrinterOnline = "Online", t.Availability = "Availability", t.ProjectName = "Project", t.CurrentLayer = "Layer";
  }(Ge || (Ge = {})), function (t) {
    t.HotendCurrent = "Hotend", t.BedCurrent = "Bed", t.HotendTarget = "T Hotend", t.BedTarget = "T Bed", t.DryingStatus = "Dry Status", t.DryingTime = "Dry Time", t.SpeedMode = "Speed Mode", t.FanSpeed = "Fan Speed";
  }(Ve || (Ve = {})), function (t) {
    t.DryingStatus = "Dry Status", t.DryingTime = "Dry Time", t.AceTempCurrent = "ACE Temp", t.AceTempTarget = "T ACE Temp";
  }(qe || (qe = {})), function (t) {
    t.OnTime = "On Time", t.OffTime = "Off Time", t.BottomTime = "Bottom Time", t.ModelHeight = "Model Height", t.BottomLayers = "Bottom Layers", t.ZUpHeight = "Z Up Height", t.ZUpSpeed = "Z Up Speed", t.ZDownSpeed = "Z Down Speed";
  }(Ye || (Ye = {}));
  const We = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ze), Ge), Ve), qe), Ye);
  var Xe, Ke;
  !function (t) {
    t.PLA = "PLA", t.PETG = "PETG", t.ABS = "ABS", t.PACF = "PACF", t.PC = "PC", t.ASA = "ASA", t.HIPS = "HIPS", t.PA = "PA", t.PLA_SE = "PLA_SE";
  }(Xe || (Xe = {})), function (t) {
    t.PAUSE = "pause", t.RESUME = "resume", t.CANCEL = "cancel";
  }(Ke || (Ke = {}));
  const Ze = ["width", "height", "left", "top"];
  function Qe(t, e) {
    Object.keys(e).forEach(t => {
      Ze.includes(t) && !isNaN(e[t]) && (e[t] = e[t].toString() + "px");
    }), t && Object.assign(t.style, e);
  }
  function Je(t) {
    return {
      state: t.state,
      attributes: t.attributes,
      entity_id: "invalid_domain.invalid_entity",
      last_changed: "",
      last_updated: "",
      context: {
        id: "",
        parent_id: null,
        user_id: null
      }
    };
  }
  function ti(t) {
    return t.toLowerCase().split(" ").map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
  }
  function ei(t, e) {
    return e ? t.states[e.entity_id] : void 0;
  }
  function ii(t, e) {
    const i = ei(t, e);
    return i ? String(i.state) : "";
  }
  function ri(t, e, i, r) {
    return "on" === ii(t, e) ? i : r;
  }
  function ni(t) {
    return t && t.model === Re ? Oe.BRIDGE : t && t.model === Ue ? Oe.ACE : Oe.PRINTER;
  }
  function si(t, e) {
    const i = {};
    if (e) for (const r in t.entities) {
      const n = t.entities[r];
      n.device_id === e && (i[n.entity_id] = n);
    }
    return i;
  }
  function oi(t, e, i) {
    for (const r in t) {
      const n = t[r],
        s = r.split("."),
        o = s[0],
        a = s[1];
      if (o === e && a.endsWith(i)) return n;
    }
  }
  function ai(t, e, i) {
    return e + "." + String(t) + i;
  }
  function li(t, e, i, r) {
    for (const e in t) {
      const n = t[e];
      if (e.split(".")[0] === i && n.translation_key === r) return n;
    }
    for (const e in t) {
      const n = t[e],
        s = e.split("."),
        o = s[0],
        a = s[1];
      if (o === i && a.endsWith(r)) return n;
    }
  }
  function ci(t, e, i) {
    for (const r in t) {
      const t = r.split("."),
        n = t[0],
        s = t[1];
      if (n === e && s.endsWith(i)) return s.split(i)[0];
    }
  }
  function hi(t) {
    return ci(t, "binary_sensor", "printer_online");
  }
  function di(t) {
    const e = [];
    for (const i in t) {
      const t = i.split(".");
      2 === t.length && t[1] && e.push(t[1]);
    }
    if (0 === e.length) return;
    let i = e[0];
    for (let t = 1; t < e.length; t++) {
      const r = e[t];
      for (; i.length > 0 && !r.startsWith(i);) i = i.slice(0, -1);
      if (0 === i.length) return;
    }
    const r = i.lastIndexOf("_");
    return -1 !== r ? i.slice(0, r + 1) : void 0;
  }
  function pi(t) {
    var e, i, r;
    return null !== (r = null !== (i = null !== (e = di(t)) && void 0 !== e ? e : ci(t, "sensor", "ace_current_temperature")) && void 0 !== i ? i : ci(t, "update", "ace_firmware")) && void 0 !== r ? r : ci(t, "switch", "ace_run_out_refill");
  }
  function ui(t) {
    var e, i;
    return null !== (i = null !== (e = di(t)) && void 0 !== e ? e : ci(t, "switch", "manual_mqtt_connection_enabled")) && void 0 !== i ? i : ci(t, "button", "refresh_mqtt_connection");
  }
  function gi(t, e, i, r) {
    return ei(t, li(e, 0, "switch", r));
  }
  function mi(t, e, i, r, n = "unavailable", s = {}) {
    return ei(t, li(e, 0, "button", r)) || Je({
      state: String(n),
      attributes: s
    });
  }
  function bi(t, e, i, r) {
    return mi(t, e, 0, r, "unavailable", {
      duration: 0,
      temperature: 0
    });
  }
  function _i(t) {
    return !["unavailable"].includes(t.state);
  }
  function vi(t, e, i, r) {
    const n = ei(t, li(e, 0, "image", r));
    return n ? function (t) {
      const e = t.attributes.access_token;
      return `${window.location.origin}/api/image_proxy/${t.entity_id}?token=${e}`;
    }(n) : void 0;
  }
  function yi(t, e, i, r, n = "unavailable", s = {}) {
    return ei(t, li(e, 0, "sensor", r)) || Je({
      state: String(n),
      attributes: s
    });
  }
  function fi(t, e, i, r) {
    const n = li(e, 0, "sensor", r);
    return n ? function (t, e) {
      const i = ei(t, e),
        r = i ? parseFloat(i.state) : 0;
      return isNaN(r) ? 0 : r;
    }(t, n) : void 0;
  }
  function xi(t, e, i, r, n, s, o = void 0) {
    const a = li(e, 0, "binary_sensor", r);
    return a ? ri(t, a, n, s) : o;
  }
  function wi(t, e, i, r, n = 0, s = {}) {
    return ei(t, li(e, 0, "number", r)) || Je({
      state: String(n),
      attributes: s
    });
  }
  function Ei(t, e, i, r) {
    const n = li(e, 0, "update", r);
    return n ? ri(t, n, "Update Available", "Up To Date") : void 0;
  }
  function Si(t, e, i) {
    return "Filament" === yi(t, e, 0, "current_status").attributes.material_type;
  }
  function $i(t) {
    const e = t.path.split("/");
    return e.length > 1 ? e[1] : void 0;
  }
  function Pi(t) {
    const e = t.path.split("/");
    return e.length > 2 ? e[2] : "main";
  }
  function Ti(t) {
    return ["printing", "preheating", "paused", "downloading", "checking"].includes(t);
  }
  const Ai = (t, e, i = !1) => {
    const r = t.route.prefix,
      n = $i(t.route),
      s = `${r}/${n ? `${n}/${e}` : ""}`;
    i ? history.replaceState(null, "", s) : history.pushState(null, "", s), Ne(window, "location-changed", {
      replace: i
    });
  };
  function Ci(t) {
    return e = 1e3 * t, Le({
      start: new Date(0),
      end: new Date(e)
    });
    var e;
  }
  const Di = (t, e) => {
      if (0 !== t && (!t || isNaN(t))) return "invalid duration";
      const i = Ci(e ? 60 * Math.ceil(Number(t) / 60) : Number(t));
      return `${i.days && i.days > 0 ? `${i.days}d` : ""}${i.hours && i.hours > 0 ? `${i.hours}h` : ""}${i.minutes && i.minutes > 0 ? `${i.minutes}m` : ""}${i.seconds && i.seconds > 0 ? `${i.seconds}s` : e ? "" : "0s"}`;
    },
    ki = (t, e, i = !1, r = !1) => {
      switch (e) {
        case ze.Remaining:
          return Di(t, i);
        case ze.ETA:
          return ((t, e, i) => {
            if (0 !== t && (!t || isNaN(t))) return "invalid time";
            const r = e ? "" : ":ss",
              n = i ? `HH:mm${r}` : `h:mm${r} a`,
              s = new Date();
            return s.setSeconds(s.getSeconds() + Number(t)), Be(s, n, {
              in: At
            });
          })(t, i, r);
        case ze.Elapsed:
          return Di(t, i);
        default:
          return "<unknown>";
      }
    };
  const Mi = {
      [je.C]: {
        [je.C]: t => t,
        [je.F]: t => 9 * t / 5 + 32
      },
      [je.F]: {
        [je.C]: t => 5 * (t - 32) / 9,
        [je.F]: t => t
      }
    },
    Hi = (t, e, i = !1) => {
      const r = parseFloat(t.state);
      if (Number.isNaN(r)) return "—";
      const n = (t => {
          switch (t.attributes.unit_of_measurement) {
            case "°C":
            default:
              return je.C;
            case "°F":
              return je.F;
          }
        })(t),
        s = (o = r, l = e || n, Mi[a = n] && Mi[a][l] ? Mi[a][l](o) : -1);
      var o, a, l;
      return `${i ? Math.round(s) : s.toFixed(2)}°${e || n}`;
    };
  function Ii() {
    return [We.Status, We.ETA, We.Elapsed, We.Remaining];
  }
  function Bi(t) {
    var e;
    return (null !== (e = t.attributes.available_modes) && void 0 !== e ? e : []).reduce((t, e) => Object.assign(Object.assign({}, t), {
      [e.mode]: e.description
    }), {});
  }
  function Fi(t) {
    return t && Object.values(Xe).includes(t) ? Xe[t.toUpperCase()] : void 0;
  }
  let Li = class extends ut {
    willUpdate(t) {
      super.willUpdate(t), t.has("selectedPrinterID") && (this.printerEntities = si(this.hass, this.selectedPrinterID));
    }
    render() {
      return X`
      <debug-data elevation="2">
        <p>There are ${Object.keys(this.hass.states).length} entities.</p>
        <p>The screen is${this.narrow ? "" : " not"} narrow.</p>
        Configured panel config
        <pre>${JSON.stringify(this.panel, void 0, 2)}</pre>
        Current route
        <pre>${JSON.stringify(this.route, void 0, 2)}</pre>
        Printers
        <pre>${JSON.stringify(this.printers, void 0, 2)}</pre>
        Printer Entities
        <pre>${JSON.stringify(this.printerEntities, void 0, 2)}</pre>
        Selected Printer
        <pre>${JSON.stringify(this.selectedPrinterDevice, void 0, 2)}</pre>
      </debug-data>
    `;
    }
    static get styles() {
      return p`
      :host {
        padding: 16px;
        display: block;
      }
      debug-data {
        padding: 16px;
        display: block;
        font-size: 18px;
        max-width: 600px;
        margin: 0 auto;
      }
    `;
    }
  };
  n([vt()], Li.prototype, "hass", void 0), n([vt()], Li.prototype, "language", void 0), n([vt({
    type: Boolean,
    reflect: !0
  })], Li.prototype, "narrow", void 0), n([vt()], Li.prototype, "route", void 0), n([vt()], Li.prototype, "panel", void 0), n([vt()], Li.prototype, "printers", void 0), n([vt({
    attribute: "selected-printer-id"
  })], Li.prototype, "selectedPrinterID", void 0), n([vt({
    attribute: "selected-printer-device"
  })], Li.prototype, "selectedPrinterDevice", void 0), n([yt()], Li.prototype, "printerEntities", void 0), Li = n([mt("anycubic-view-debug")], Li);
  var Ni,
    Oi,
    Ri,
    Ui = "Anycubic Cloud",
    zi = {
      actions: {
        cancel: "Cancel",
        pause: "Pause",
        print: "Print",
        resume: "Resume",
        yes: "Yes",
        no: "No",
        save: "Save"
      },
      messages: {
        mqtt_unsupported: "This feature requires MQTT to retrieve data but unfortunately MQTT is not supported with the configured authentication mode."
      },
      states: {
        unknown: "Unknown"
      }
    },
    ji = {
      buttons: {
        print_settings: "Print Settings",
        dry: "Dry",
        runout_refill: "Refill",
        ace_settings: "ACE Settings"
      },
      ace_settings: {
        heading: "ACE Settings",
        label_spools: "Spools",
        hint_spools_unavailable: "Live spool data isn't available right now (MQTT may not be connected) - you can still assign material and colour below, it will apply next time the box reports in."
      },
      configure: {
        tabs: {
          main: "Main",
          stats: "Stats",
          colours: "ACE Colour Presets"
        },
        labels: {
          printer_id: "Select Printer",
          vertical: "Vertical Layout?",
          round: "Round Stats?",
          use_24hr: "Use 24hr Time?",
          show_settings_button: "Always show print settings button?",
          always_show: "Always show card?",
          temperature_unit: "Temperature Unit",
          light_entity_id: "Light Entity",
          power_entity_id: "Power Entity",
          camera_entity_id: "Camera Entity",
          scale_factor: "Scale Factor",
          slot_colors: "Slot Colour Presets"
        }
      },
      print_settings: {
        confirm_message: "Are you sure you want to {action} the print?",
        label_nozzle_temp: "Nozzle Temperature",
        label_hotbed_temp: "Hotbed Temperature",
        label_fan_speed: "Fan Speed",
        label_aux_fan_speed: "AUX Fan Speed",
        label_box_fan_speed: "Box Fan Speed",
        print_pause: "Pause Print",
        print_resume: "Resume Print",
        print_cancel: "Cancel Print",
        print_finish_job: "Clear Completed Job",
        retract_filament: "Retract Filament",
        extrude_filament: "Extrude Filament",
        save_speed_mode: "Save Speed Mode",
        save_target_nozzle: "Save Target Nozzle",
        save_target_hotbed: "Save Target Hotbed",
        save_fan_speed: "Save Fan Speed",
        save_aux_fan_speed: "Save AUX Fan Speed",
        save_box_fan_speed: "Save Box Fan Speed"
      },
      drying_settings: {
        heading: "Drying Options",
        button_preset: "Preset",
        button_stop_drying: "Stop Drying",
        button_minutes: "Mins",
        custom_heading: "Custom Drying",
        custom_label_temp: "Temperature",
        custom_label_duration: "Duration (minutes)",
        custom_button_start: "Start Custom Drying",
        state_drying: "Drying",
        state_not_drying: "Not Drying",
        hint_nothing_available: "No drying controls are available right now - this usually means the ACE box isn't currently connected via MQTT. Check the MQTT connection mode in the integration options and whether the printer/ACE box is actually online."
      },
      spool_settings: {
        heading: "Editing Slot",
        label_select_material: "Select Material",
        label_select_colour: "Manually select colour",
        label_preset_colour: "Choose Preset Colour"
      },
      monitored_stats: {
        ETA: "ETA",
        Elapsed: "Elapsed",
        Remaining: "Remaining",
        Status: "Status",
        Online: "Online",
        Availability: "Availability",
        Project: "Project",
        Layer: "Layer",
        Hotend: "Hotend",
        Bed: "Bed",
        "T Hotend": "T Hotend",
        "T Bed": "T Bed",
        "Dry Status": "Dry Status",
        "Dry Time": "Dry Time",
        "Speed Mode": "Speed Mode",
        "Fan Speed": "Fan Speed",
        "ACE Temp": "ACE Temp",
        "T ACE Temp": "T ACE Temp",
        "On Time": "On Time",
        "Off Time": "Off Time",
        "Bottom Time": "Bottom Time",
        "Model Height": "Model Height",
        "Bottom Layers": "Bottom Layers",
        "Z Up Height": "Z Up Height",
        "Z Up Speed": "Z Up Speed",
        "Z Down Speed": "Z Down Speed"
      },
      bridge: {
        mqtt_connection: "MQTT Connection",
        refresh_connection: "Refresh Connection"
      },
      linked_devices: {
        go_to_printer: "Go to printer",
        go_to_ace: "Go to ACE Pro box"
      },
      badges: {
        update_available: "Update available"
      }
    },
    Gi = {
      initial: {
        printer_select: "Select a printer.",
        type_printer: "Printer",
        type_ace: "ACE Pro Box",
        type_bridge: "Cloud Connection"
      },
      main: {
        title: "Main",
        cards: {
          main: {
            description: "General information about the printer.",
            fields: {
              printer_name: "Name",
              printer_id: "ID",
              printer_mac: "MAC",
              printer_model: "Model",
              printer_fw_version: "FW Version",
              printer_fw_update_available: "FW Status",
              printer_online: "Online",
              printer_available: "Available",
              printer_mqtt_active: "MQTT Connection",
              curr_nozzle_temp: "Current Nozzle Temperature",
              curr_hotbed_temp: "Current Hotbed Temperature",
              target_nozzle_temp: "Target Nozzle Temperature",
              target_hotbed_temp: "Target Hotbed Temperature",
              job_state: "Job State",
              job_progress: "Job Progress",
              ace_fw_version: "ACE FW Version",
              ace_fw_update_available: "ACE FW Status",
              drying_active: "ACE Drying Status",
              drying_progress: "ACE Drying Progress"
            }
          }
        }
      },
      files_cloud: {
        title: "Cloud Files",
        cards: {}
      },
      files_local: {
        title: "Local Files",
        cards: {}
      },
      files_udisk: {
        title: "USB Files",
        cards: {}
      },
      print_save_in_cloud: {
        title: "Print (Save in user cloud)",
        cards: {}
      },
      print_no_cloud_save: {
        title: "Print (No Cloud Save)",
        cards: {}
      },
      debug: {
        title: "Debug",
        cards: {}
      }
    },
    Vi = {
      title: Ui,
      common: zi,
      card: ji,
      panels: Gi
    },
    qi = Object.freeze({
      __proto__: null,
      title: Ui,
      common: zi,
      card: ji,
      panels: Gi,
      default: Vi
    }),
    Yi = "Anycubic Cloud",
    Wi = {
      actions: {
        cancel: "Abbrechen",
        pause: "Pausieren",
        print: "Drucken",
        resume: "Fortsetzen",
        yes: "Ja",
        no: "Nein",
        save: "Speichern"
      },
      messages: {
        mqtt_unsupported: "Diese Funktion benötigt MQTT, um Daten abzurufen. MQTT wird mit dem konfigurierten Authentifizierungsmodus leider nicht unterstützt."
      },
      states: {
        unknown: "Unbekannt"
      }
    },
    Xi = {
      buttons: {
        print_settings: "Druckeinstellungen",
        dry: "Trocknen",
        runout_refill: "Nachfüllen",
        ace_settings: "ACE-Einstellungen"
      },
      ace_settings: {
        heading: "ACE-Einstellungen",
        label_spools: "Spulen",
        hint_spools_unavailable: "Live-Spulendaten sind aktuell nicht verfügbar (MQTT evtl. nicht verbunden) - Material und Farbe können trotzdem gesetzt werden, sie greifen dann, sobald die Box sich wieder meldet."
      },
      configure: {
        tabs: {
          main: "Allgemein",
          stats: "Statistiken",
          colours: "ACE-Farbvorgaben"
        },
        labels: {
          printer_id: "Drucker auswählen",
          vertical: "Vertikales Layout?",
          round: "Werte runden?",
          use_24hr: "24-Stunden-Format?",
          show_settings_button: "Druckeinstellungen-Button immer anzeigen?",
          always_show: "Karte immer anzeigen?",
          temperature_unit: "Temperatureinheit",
          light_entity_id: "Licht-Entität",
          power_entity_id: "Strom-Entität",
          camera_entity_id: "Kamera-Entität",
          scale_factor: "Skalierungsfaktor",
          slot_colors: "Slot-Farbvorgaben"
        }
      },
      print_settings: {
        confirm_message: "Möchtest du den Druck wirklich {action}?",
        label_nozzle_temp: "Solltemperatur Düse",
        label_hotbed_temp: "Solltemperatur Bett",
        label_fan_speed: "Lüftergeschwindigkeit",
        label_aux_fan_speed: "AUX-Lüftergeschwindigkeit",
        label_box_fan_speed: "Box-Lüftergeschwindigkeit",
        print_pause: "Druck pausieren",
        print_resume: "Druck fortsetzen",
        print_cancel: "Druck stoppen",
        print_finish_job: "Druckauftrag abschließen",
        retract_filament: "Filament Rückzug (Retract)",
        extrude_filament: "Filament Vorschub (Extrude)",
        save_speed_mode: "Geschwindigkeitsmodus speichern",
        save_target_nozzle: "Solltemp. Düse speichern",
        save_target_hotbed: "Solltemp. Bett speichern",
        save_fan_speed: "Lüftergeschwindigkeit speichern",
        save_aux_fan_speed: "AUX-Lüftergeschw. speichern",
        save_box_fan_speed: "Box-Lüftergeschw. speichern"
      },
      drying_settings: {
        heading: "Trocknungsoptionen",
        button_preset: "Preset",
        button_stop_drying: "Trocknung stoppen",
        button_minutes: "Min",
        custom_heading: "Benutzerdefinierte Trocknung",
        custom_label_temp: "Temperatur",
        custom_label_duration: "Dauer (Minuten)",
        custom_button_start: "Benutzerdefinierte Trocknung starten",
        state_drying: "Trocknet",
        state_not_drying: "Trocknet nicht",
        hint_nothing_available: "Aktuell stehen keine Trocknungs-Steuerelemente zur Verfügung - meist bedeutet das, dass die ACE-Box gerade nicht über MQTT verbunden ist. Prüfe den MQTT-Verbindungsmodus in den Integrationsoptionen und ob Drucker/ACE-Box wirklich online sind."
      },
      spool_settings: {
        heading: "Slot bearbeiten",
        label_select_material: "Material auswählen",
        label_select_colour: "Farbe manuell auswählen",
        label_preset_colour: "Vorgabefarbe wählen"
      },
      monitored_stats: {
        ETA: "Vorauss. Ende",
        Elapsed: "Verstrichen",
        Remaining: "Verbleibend",
        Status: "Status",
        Online: "Online",
        Availability: "Verfügbarkeit",
        Project: "Projekt",
        Layer: "Schicht",
        Hotend: "Düse",
        Bed: "Bett",
        "T Hotend": "Soll Düse",
        "T Bed": "Soll Bett",
        "Dry Status": "Trocknungsstatus",
        "Dry Time": "Trocknungszeit",
        "Speed Mode": "Geschw.-Modus",
        "Fan Speed": "Lüftergeschw.",
        "ACE Temp": "ACE Temp.",
        "T ACE Temp": "Soll ACE Temp.",
        "On Time": "Belichtung An",
        "Off Time": "Belichtung Aus",
        "Bottom Time": "Bodenschicht-Zeit",
        "Model Height": "Modellhöhe",
        "Bottom Layers": "Bodenschichten",
        "Z Up Height": "Z-Hub Höhe",
        "Z Up Speed": "Z-Hub Geschw. (Auf)",
        "Z Down Speed": "Z-Hub Geschw. (Ab)"
      },
      bridge: {
        mqtt_connection: "MQTT-Verbindung",
        refresh_connection: "Verbindung aktualisieren"
      },
      linked_devices: {
        go_to_printer: "Zum Drucker",
        go_to_ace: "Zur ACE Pro Box"
      },
      badges: {
        update_available: "Update verfügbar"
      }
    },
    Ki = {
      initial: {
        printer_select: "Wähle einen Drucker aus.",
        type_printer: "Drucker",
        type_ace: "ACE Pro Box",
        type_bridge: "Cloud-Verbindung"
      },
      main: {
        title: "Übersicht",
        cards: {
          main: {
            description: "Allgemeine Informationen über den Drucker.",
            fields: {
              printer_name: "Name",
              printer_id: "ID",
              printer_mac: "MAC",
              printer_model: "Modell",
              printer_fw_version: "FW-Version",
              printer_fw_update_available: "FW-Status",
              printer_online: "Online",
              printer_available: "Verfügbar",
              printer_mqtt_active: "MQTT-Verbindung",
              curr_nozzle_temp: "Aktuelle Düsentemperatur",
              curr_hotbed_temp: "Aktuelle Betttemperatur",
              target_nozzle_temp: "Solltemperatur Düse",
              target_hotbed_temp: "Solltemperatur Bett",
              job_state: "Auftragsstatus",
              job_progress: "Auftragsfortschritt",
              ace_fw_version: "ACE FW-Version",
              ace_fw_update_available: "ACE FW-Status",
              drying_active: "ACE Trocknungsstatus",
              drying_progress: "ACE Trocknungsfortschritt"
            }
          }
        }
      },
      files_cloud: {
        title: "Cloud-Dateien",
        cards: {}
      },
      files_local: {
        title: "Lokale Dateien",
        cards: {}
      },
      files_udisk: {
        title: "USB-Dateien",
        cards: {}
      },
      print_save_in_cloud: {
        title: "Drucken (in Cloud speichern)",
        cards: {}
      },
      print_no_cloud_save: {
        title: "Drucken (ohne Cloud-Speicherung)",
        cards: {}
      },
      debug: {
        title: "Debug",
        cards: {}
      }
    },
    Zi = {
      title: Yi,
      common: Wi,
      card: Xi,
      panels: Ki
    },
    Qi = Object.freeze({
      __proto__: null,
      title: Yi,
      common: Wi,
      card: Xi,
      panels: Ki,
      default: Zi
    });
  function Ji(t) {
    return t.type === Oi.literal;
  }
  function tr(t) {
    return t.type === Oi.argument;
  }
  function er(t) {
    return t.type === Oi.number;
  }
  function ir(t) {
    return t.type === Oi.date;
  }
  function rr(t) {
    return t.type === Oi.time;
  }
  function nr(t) {
    return t.type === Oi.select;
  }
  function sr(t) {
    return t.type === Oi.plural;
  }
  function or(t) {
    return t.type === Oi.pound;
  }
  function ar(t) {
    return t.type === Oi.tag;
  }
  function lr(t) {
    return !(!t || "object" != typeof t || t.type !== Ri.number);
  }
  function cr(t) {
    return !(!t || "object" != typeof t || t.type !== Ri.dateTime);
  }
  !function (t) {
    t[t.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", t[t.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", t[t.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", t[t.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", t[t.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", t[t.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", t[t.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", t[t.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", t[t.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", t[t.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", t[t.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", t[t.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", t[t.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", t[t.INVALID_TAG = 23] = "INVALID_TAG", t[t.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", t[t.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", t[t.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
  }(Ni || (Ni = {})), function (t) {
    t[t.literal = 0] = "literal", t[t.argument = 1] = "argument", t[t.number = 2] = "number", t[t.date = 3] = "date", t[t.time = 4] = "time", t[t.select = 5] = "select", t[t.plural = 6] = "plural", t[t.pound = 7] = "pound", t[t.tag = 8] = "tag";
  }(Oi || (Oi = {})), function (t) {
    t[t.number = 0] = "number", t[t.dateTime = 1] = "dateTime";
  }(Ri || (Ri = {}));
  var hr = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
    dr = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  function pr(t) {
    var e = {};
    return t.replace(dr, function (t) {
      var i = t.length;
      switch (t[0]) {
        case "G":
          e.era = 4 === i ? "long" : 5 === i ? "narrow" : "short";
          break;
        case "y":
          e.year = 2 === i ? "2-digit" : "numeric";
          break;
        case "Y":
        case "u":
        case "U":
        case "r":
          throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
        case "q":
        case "Q":
          throw new RangeError("`q/Q` (quarter) patterns are not supported");
        case "M":
        case "L":
          e.month = ["numeric", "2-digit", "short", "long", "narrow"][i - 1];
          break;
        case "w":
        case "W":
          throw new RangeError("`w/W` (week) patterns are not supported");
        case "d":
          e.day = ["numeric", "2-digit"][i - 1];
          break;
        case "D":
        case "F":
        case "g":
          throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
        case "E":
          e.weekday = 4 === i ? "long" : 5 === i ? "narrow" : "short";
          break;
        case "e":
          if (i < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
          e.weekday = ["short", "long", "narrow", "short"][i - 4];
          break;
        case "c":
          if (i < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
          e.weekday = ["short", "long", "narrow", "short"][i - 4];
          break;
        case "a":
          e.hour12 = !0;
          break;
        case "b":
        case "B":
          throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
        case "h":
          e.hourCycle = "h12", e.hour = ["numeric", "2-digit"][i - 1];
          break;
        case "H":
          e.hourCycle = "h23", e.hour = ["numeric", "2-digit"][i - 1];
          break;
        case "K":
          e.hourCycle = "h11", e.hour = ["numeric", "2-digit"][i - 1];
          break;
        case "k":
          e.hourCycle = "h24", e.hour = ["numeric", "2-digit"][i - 1];
          break;
        case "j":
        case "J":
        case "C":
          throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
        case "m":
          e.minute = ["numeric", "2-digit"][i - 1];
          break;
        case "s":
          e.second = ["numeric", "2-digit"][i - 1];
          break;
        case "S":
        case "A":
          throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
        case "z":
          e.timeZoneName = i < 4 ? "short" : "long";
          break;
        case "Z":
        case "O":
        case "v":
        case "V":
        case "X":
        case "x":
          throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
      }
      return "";
    }), e;
  }
  var ur = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
  var gr = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
    mr = /^(@+)?(\+|#+)?[rs]?$/g,
    br = /(\*)(0+)|(#+)(0+)|(0+)/g,
    _r = /^(0+)$/;
  function vr(t) {
    var e = {};
    return "r" === t[t.length - 1] ? e.roundingPriority = "morePrecision" : "s" === t[t.length - 1] && (e.roundingPriority = "lessPrecision"), t.replace(mr, function (t, i, r) {
      return "string" != typeof r ? (e.minimumSignificantDigits = i.length, e.maximumSignificantDigits = i.length) : "+" === r ? e.minimumSignificantDigits = i.length : "#" === i[0] ? e.maximumSignificantDigits = i.length : (e.minimumSignificantDigits = i.length, e.maximumSignificantDigits = i.length + ("string" == typeof r ? r.length : 0)), "";
    }), e;
  }
  function yr(t) {
    switch (t) {
      case "sign-auto":
        return {
          signDisplay: "auto"
        };
      case "sign-accounting":
      case "()":
        return {
          currencySign: "accounting"
        };
      case "sign-always":
      case "+!":
        return {
          signDisplay: "always"
        };
      case "sign-accounting-always":
      case "()!":
        return {
          signDisplay: "always",
          currencySign: "accounting"
        };
      case "sign-except-zero":
      case "+?":
        return {
          signDisplay: "exceptZero"
        };
      case "sign-accounting-except-zero":
      case "()?":
        return {
          signDisplay: "exceptZero",
          currencySign: "accounting"
        };
      case "sign-never":
      case "+_":
        return {
          signDisplay: "never"
        };
    }
  }
  function fr(t) {
    var e;
    if ("E" === t[0] && "E" === t[1] ? (e = {
      notation: "engineering"
    }, t = t.slice(2)) : "E" === t[0] && (e = {
      notation: "scientific"
    }, t = t.slice(1)), e) {
      var i = t.slice(0, 2);
      if ("+!" === i ? (e.signDisplay = "always", t = t.slice(2)) : "+?" === i && (e.signDisplay = "exceptZero", t = t.slice(2)), !_r.test(t)) throw new Error("Malformed concise eng/scientific notation");
      e.minimumIntegerDigits = t.length;
    }
    return e;
  }
  function xr(t) {
    var e = yr(t);
    return e || {};
  }
  function wr(t) {
    for (var e = {}, i = 0, n = t; i < n.length; i++) {
      var s = n[i];
      switch (s.stem) {
        case "percent":
        case "%":
          e.style = "percent";
          continue;
        case "%x100":
          e.style = "percent", e.scale = 100;
          continue;
        case "currency":
          e.style = "currency", e.currency = s.options[0];
          continue;
        case "group-off":
        case ",_":
          e.useGrouping = !1;
          continue;
        case "precision-integer":
        case ".":
          e.maximumFractionDigits = 0;
          continue;
        case "measure-unit":
        case "unit":
          e.style = "unit", e.unit = s.options[0].replace(/^(.*?)-/, "");
          continue;
        case "compact-short":
        case "K":
          e.notation = "compact", e.compactDisplay = "short";
          continue;
        case "compact-long":
        case "KK":
          e.notation = "compact", e.compactDisplay = "long";
          continue;
        case "scientific":
          e = r(r(r({}, e), {
            notation: "scientific"
          }), s.options.reduce(function (t, e) {
            return r(r({}, t), xr(e));
          }, {}));
          continue;
        case "engineering":
          e = r(r(r({}, e), {
            notation: "engineering"
          }), s.options.reduce(function (t, e) {
            return r(r({}, t), xr(e));
          }, {}));
          continue;
        case "notation-simple":
          e.notation = "standard";
          continue;
        case "unit-width-narrow":
          e.currencyDisplay = "narrowSymbol", e.unitDisplay = "narrow";
          continue;
        case "unit-width-short":
          e.currencyDisplay = "code", e.unitDisplay = "short";
          continue;
        case "unit-width-full-name":
          e.currencyDisplay = "name", e.unitDisplay = "long";
          continue;
        case "unit-width-iso-code":
          e.currencyDisplay = "symbol";
          continue;
        case "scale":
          e.scale = parseFloat(s.options[0]);
          continue;
        case "rounding-mode-floor":
          e.roundingMode = "floor";
          continue;
        case "rounding-mode-ceiling":
          e.roundingMode = "ceil";
          continue;
        case "rounding-mode-down":
          e.roundingMode = "trunc";
          continue;
        case "rounding-mode-up":
          e.roundingMode = "expand";
          continue;
        case "rounding-mode-half-even":
          e.roundingMode = "halfEven";
          continue;
        case "rounding-mode-half-down":
          e.roundingMode = "halfTrunc";
          continue;
        case "rounding-mode-half-up":
          e.roundingMode = "halfExpand";
          continue;
        case "integer-width":
          if (s.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
          s.options[0].replace(br, function (t, i, r, n, s, o) {
            if (i) e.minimumIntegerDigits = r.length;else {
              if (n && s) throw new Error("We currently do not support maximum integer digits");
              if (o) throw new Error("We currently do not support exact integer digits");
            }
            return "";
          });
          continue;
      }
      if (_r.test(s.stem)) e.minimumIntegerDigits = s.stem.length;else if (gr.test(s.stem)) {
        if (s.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
        s.stem.replace(gr, function (t, i, r, n, s, o) {
          return "*" === r ? e.minimumFractionDigits = i.length : n && "#" === n[0] ? e.maximumFractionDigits = n.length : s && o ? (e.minimumFractionDigits = s.length, e.maximumFractionDigits = s.length + o.length) : (e.minimumFractionDigits = i.length, e.maximumFractionDigits = i.length), "";
        });
        var o = s.options[0];
        "w" === o ? e = r(r({}, e), {
          trailingZeroDisplay: "stripIfInteger"
        }) : o && (e = r(r({}, e), vr(o)));
      } else if (mr.test(s.stem)) e = r(r({}, e), vr(s.stem));else {
        var a = yr(s.stem);
        a && (e = r(r({}, e), a));
        var l = fr(s.stem);
        l && (e = r(r({}, e), l));
      }
    }
    return e;
  }
  var Er,
    Sr = {
      "001": ["H", "h"],
      AC: ["H", "h", "hb", "hB"],
      AD: ["H", "hB"],
      AE: ["h", "hB", "hb", "H"],
      AF: ["H", "hb", "hB", "h"],
      AG: ["h", "hb", "H", "hB"],
      AI: ["H", "h", "hb", "hB"],
      AL: ["h", "H", "hB"],
      AM: ["H", "hB"],
      AO: ["H", "hB"],
      AR: ["H", "h", "hB", "hb"],
      AS: ["h", "H"],
      AT: ["H", "hB"],
      AU: ["h", "hb", "H", "hB"],
      AW: ["H", "hB"],
      AX: ["H"],
      AZ: ["H", "hB", "h"],
      BA: ["H", "hB", "h"],
      BB: ["h", "hb", "H", "hB"],
      BD: ["h", "hB", "H"],
      BE: ["H", "hB"],
      BF: ["H", "hB"],
      BG: ["H", "hB", "h"],
      BH: ["h", "hB", "hb", "H"],
      BI: ["H", "h"],
      BJ: ["H", "hB"],
      BL: ["H", "hB"],
      BM: ["h", "hb", "H", "hB"],
      BN: ["hb", "hB", "h", "H"],
      BO: ["H", "hB", "h", "hb"],
      BQ: ["H"],
      BR: ["H", "hB"],
      BS: ["h", "hb", "H", "hB"],
      BT: ["h", "H"],
      BW: ["H", "h", "hb", "hB"],
      BY: ["H", "h"],
      BZ: ["H", "h", "hb", "hB"],
      CA: ["h", "hb", "H", "hB"],
      CC: ["H", "h", "hb", "hB"],
      CD: ["hB", "H"],
      CF: ["H", "h", "hB"],
      CG: ["H", "hB"],
      CH: ["H", "hB", "h"],
      CI: ["H", "hB"],
      CK: ["H", "h", "hb", "hB"],
      CL: ["H", "h", "hB", "hb"],
      CM: ["H", "h", "hB"],
      CN: ["H", "hB", "hb", "h"],
      CO: ["h", "H", "hB", "hb"],
      CP: ["H"],
      CR: ["H", "h", "hB", "hb"],
      CU: ["H", "h", "hB", "hb"],
      CV: ["H", "hB"],
      CW: ["H", "hB"],
      CX: ["H", "h", "hb", "hB"],
      CY: ["h", "H", "hb", "hB"],
      CZ: ["H"],
      DE: ["H", "hB"],
      DG: ["H", "h", "hb", "hB"],
      DJ: ["h", "H"],
      DK: ["H"],
      DM: ["h", "hb", "H", "hB"],
      DO: ["h", "H", "hB", "hb"],
      DZ: ["h", "hB", "hb", "H"],
      EA: ["H", "h", "hB", "hb"],
      EC: ["H", "hB", "h", "hb"],
      EE: ["H", "hB"],
      EG: ["h", "hB", "hb", "H"],
      EH: ["h", "hB", "hb", "H"],
      ER: ["h", "H"],
      ES: ["H", "hB", "h", "hb"],
      ET: ["hB", "hb", "h", "H"],
      FI: ["H"],
      FJ: ["h", "hb", "H", "hB"],
      FK: ["H", "h", "hb", "hB"],
      FM: ["h", "hb", "H", "hB"],
      FO: ["H", "h"],
      FR: ["H", "hB"],
      GA: ["H", "hB"],
      GB: ["H", "h", "hb", "hB"],
      GD: ["h", "hb", "H", "hB"],
      GE: ["H", "hB", "h"],
      GF: ["H", "hB"],
      GG: ["H", "h", "hb", "hB"],
      GH: ["h", "H"],
      GI: ["H", "h", "hb", "hB"],
      GL: ["H", "h"],
      GM: ["h", "hb", "H", "hB"],
      GN: ["H", "hB"],
      GP: ["H", "hB"],
      GQ: ["H", "hB", "h", "hb"],
      GR: ["h", "H", "hb", "hB"],
      GT: ["H", "h", "hB", "hb"],
      GU: ["h", "hb", "H", "hB"],
      GW: ["H", "hB"],
      GY: ["h", "hb", "H", "hB"],
      HK: ["h", "hB", "hb", "H"],
      HN: ["H", "h", "hB", "hb"],
      HR: ["H", "hB"],
      HU: ["H", "h"],
      IC: ["H", "h", "hB", "hb"],
      ID: ["H"],
      IE: ["H", "h", "hb", "hB"],
      IL: ["H", "hB"],
      IM: ["H", "h", "hb", "hB"],
      IN: ["h", "H"],
      IO: ["H", "h", "hb", "hB"],
      IQ: ["h", "hB", "hb", "H"],
      IR: ["hB", "H"],
      IS: ["H"],
      IT: ["H", "hB"],
      JE: ["H", "h", "hb", "hB"],
      JM: ["h", "hb", "H", "hB"],
      JO: ["h", "hB", "hb", "H"],
      JP: ["H", "K", "h"],
      KE: ["hB", "hb", "H", "h"],
      KG: ["H", "h", "hB", "hb"],
      KH: ["hB", "h", "H", "hb"],
      KI: ["h", "hb", "H", "hB"],
      KM: ["H", "h", "hB", "hb"],
      KN: ["h", "hb", "H", "hB"],
      KP: ["h", "H", "hB", "hb"],
      KR: ["h", "H", "hB", "hb"],
      KW: ["h", "hB", "hb", "H"],
      KY: ["h", "hb", "H", "hB"],
      KZ: ["H", "hB"],
      LA: ["H", "hb", "hB", "h"],
      LB: ["h", "hB", "hb", "H"],
      LC: ["h", "hb", "H", "hB"],
      LI: ["H", "hB", "h"],
      LK: ["H", "h", "hB", "hb"],
      LR: ["h", "hb", "H", "hB"],
      LS: ["h", "H"],
      LT: ["H", "h", "hb", "hB"],
      LU: ["H", "h", "hB"],
      LV: ["H", "hB", "hb", "h"],
      LY: ["h", "hB", "hb", "H"],
      MA: ["H", "h", "hB", "hb"],
      MC: ["H", "hB"],
      MD: ["H", "hB"],
      ME: ["H", "hB", "h"],
      MF: ["H", "hB"],
      MG: ["H", "h"],
      MH: ["h", "hb", "H", "hB"],
      MK: ["H", "h", "hb", "hB"],
      ML: ["H"],
      MM: ["hB", "hb", "H", "h"],
      MN: ["H", "h", "hb", "hB"],
      MO: ["h", "hB", "hb", "H"],
      MP: ["h", "hb", "H", "hB"],
      MQ: ["H", "hB"],
      MR: ["h", "hB", "hb", "H"],
      MS: ["H", "h", "hb", "hB"],
      MT: ["H", "h"],
      MU: ["H", "h"],
      MV: ["H", "h"],
      MW: ["h", "hb", "H", "hB"],
      MX: ["H", "h", "hB", "hb"],
      MY: ["hb", "hB", "h", "H"],
      MZ: ["H", "hB"],
      NA: ["h", "H", "hB", "hb"],
      NC: ["H", "hB"],
      NE: ["H"],
      NF: ["H", "h", "hb", "hB"],
      NG: ["H", "h", "hb", "hB"],
      NI: ["H", "h", "hB", "hb"],
      NL: ["H", "hB"],
      NO: ["H", "h"],
      NP: ["H", "h", "hB"],
      NR: ["H", "h", "hb", "hB"],
      NU: ["H", "h", "hb", "hB"],
      NZ: ["h", "hb", "H", "hB"],
      OM: ["h", "hB", "hb", "H"],
      PA: ["h", "H", "hB", "hb"],
      PE: ["H", "hB", "h", "hb"],
      PF: ["H", "h", "hB"],
      PG: ["h", "H"],
      PH: ["h", "hB", "hb", "H"],
      PK: ["h", "hB", "H"],
      PL: ["H", "h"],
      PM: ["H", "hB"],
      PN: ["H", "h", "hb", "hB"],
      PR: ["h", "H", "hB", "hb"],
      PS: ["h", "hB", "hb", "H"],
      PT: ["H", "hB"],
      PW: ["h", "H"],
      PY: ["H", "h", "hB", "hb"],
      QA: ["h", "hB", "hb", "H"],
      RE: ["H", "hB"],
      RO: ["H", "hB"],
      RS: ["H", "hB", "h"],
      RU: ["H"],
      RW: ["H", "h"],
      SA: ["h", "hB", "hb", "H"],
      SB: ["h", "hb", "H", "hB"],
      SC: ["H", "h", "hB"],
      SD: ["h", "hB", "hb", "H"],
      SE: ["H"],
      SG: ["h", "hb", "H", "hB"],
      SH: ["H", "h", "hb", "hB"],
      SI: ["H", "hB"],
      SJ: ["H"],
      SK: ["H"],
      SL: ["h", "hb", "H", "hB"],
      SM: ["H", "h", "hB"],
      SN: ["H", "h", "hB"],
      SO: ["h", "H"],
      SR: ["H", "hB"],
      SS: ["h", "hb", "H", "hB"],
      ST: ["H", "hB"],
      SV: ["H", "h", "hB", "hb"],
      SX: ["H", "h", "hb", "hB"],
      SY: ["h", "hB", "hb", "H"],
      SZ: ["h", "hb", "H", "hB"],
      TA: ["H", "h", "hb", "hB"],
      TC: ["h", "hb", "H", "hB"],
      TD: ["h", "H", "hB"],
      TF: ["H", "h", "hB"],
      TG: ["H", "hB"],
      TH: ["H", "h"],
      TJ: ["H", "h"],
      TL: ["H", "hB", "hb", "h"],
      TM: ["H", "h"],
      TN: ["h", "hB", "hb", "H"],
      TO: ["h", "H"],
      TR: ["H", "hB"],
      TT: ["h", "hb", "H", "hB"],
      TW: ["hB", "hb", "h", "H"],
      TZ: ["hB", "hb", "H", "h"],
      UA: ["H", "hB", "h"],
      UG: ["hB", "hb", "H", "h"],
      UM: ["h", "hb", "H", "hB"],
      US: ["h", "hb", "H", "hB"],
      UY: ["H", "h", "hB", "hb"],
      UZ: ["H", "hB", "h"],
      VA: ["H", "h", "hB"],
      VC: ["h", "hb", "H", "hB"],
      VE: ["h", "H", "hB", "hb"],
      VG: ["h", "hb", "H", "hB"],
      VI: ["h", "hb", "H", "hB"],
      VN: ["H", "h"],
      VU: ["h", "H"],
      WF: ["H", "hB"],
      WS: ["h", "H"],
      XK: ["H", "hB", "h"],
      YE: ["h", "hB", "hb", "H"],
      YT: ["H", "hB"],
      ZA: ["H", "h", "hb", "hB"],
      ZM: ["h", "hb", "H", "hB"],
      ZW: ["H", "h"],
      "af-ZA": ["H", "h", "hB", "hb"],
      "ar-001": ["h", "hB", "hb", "H"],
      "ca-ES": ["H", "h", "hB"],
      "en-001": ["h", "hb", "H", "hB"],
      "es-BO": ["H", "h", "hB", "hb"],
      "es-BR": ["H", "h", "hB", "hb"],
      "es-EC": ["H", "h", "hB", "hb"],
      "es-ES": ["H", "h", "hB", "hb"],
      "es-GQ": ["H", "h", "hB", "hb"],
      "es-PE": ["H", "h", "hB", "hb"],
      "fr-CA": ["H", "h", "hB"],
      "gl-ES": ["H", "h", "hB"],
      "gu-IN": ["hB", "hb", "h", "H"],
      "hi-IN": ["hB", "h", "H"],
      "it-CH": ["H", "h", "hB"],
      "it-IT": ["H", "h", "hB"],
      "kn-IN": ["hB", "h", "H"],
      "ml-IN": ["hB", "h", "H"],
      "mr-IN": ["hB", "hb", "h", "H"],
      "pa-IN": ["hB", "hb", "h", "H"],
      "ta-IN": ["hB", "h", "hb", "H"],
      "te-IN": ["hB", "h", "H"],
      "zu-ZA": ["H", "hB", "hb", "h"]
    };
  function $r(t) {
    var e = t.hourCycle;
    if (void 0 === e && t.hourCycles && t.hourCycles.length && (e = t.hourCycles[0]), e) switch (e) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
    var i,
      r = t.language;
    return "root" !== r && (i = t.maximize().region), (Sr[i || ""] || Sr[r || ""] || Sr["".concat(r, "-001")] || Sr["001"])[0];
  }
  var Pr = new RegExp("^".concat(hr.source, "*")),
    Tr = new RegExp("".concat(hr.source, "*$"));
  function Ar(t, e) {
    return {
      start: t,
      end: e
    };
  }
  var Cr = !!String.prototype.startsWith && "_a".startsWith("a", 1),
    Dr = !!String.fromCodePoint,
    kr = !!Object.fromEntries,
    Mr = !!String.prototype.codePointAt,
    Hr = !!String.prototype.trimStart,
    Ir = !!String.prototype.trimEnd,
    Br = !!Number.isSafeInteger ? Number.isSafeInteger : function (t) {
      return "number" == typeof t && isFinite(t) && Math.floor(t) === t && Math.abs(t) <= 9007199254740991;
    },
    Fr = !0;
  try {
    Fr = "a" === (null === (Er = Gr("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu").exec("a")) || void 0 === Er ? void 0 : Er[0]);
  } catch (G) {
    Fr = !1;
  }
  var Lr,
    Nr = Cr ? function (t, e, i) {
      return t.startsWith(e, i);
    } : function (t, e, i) {
      return t.slice(i, i + e.length) === e;
    },
    Or = Dr ? String.fromCodePoint : function () {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      for (var i, r = "", n = t.length, s = 0; n > s;) {
        if ((i = t[s++]) > 1114111) throw RangeError(i + " is not a valid code point");
        r += i < 65536 ? String.fromCharCode(i) : String.fromCharCode(55296 + ((i -= 65536) >> 10), i % 1024 + 56320);
      }
      return r;
    },
    Rr = kr ? Object.fromEntries : function (t) {
      for (var e = {}, i = 0, r = t; i < r.length; i++) {
        var n = r[i],
          s = n[0],
          o = n[1];
        e[s] = o;
      }
      return e;
    },
    Ur = Mr ? function (t, e) {
      return t.codePointAt(e);
    } : function (t, e) {
      var i = t.length;
      if (!(e < 0 || e >= i)) {
        var r,
          n = t.charCodeAt(e);
        return n < 55296 || n > 56319 || e + 1 === i || (r = t.charCodeAt(e + 1)) < 56320 || r > 57343 ? n : r - 56320 + (n - 55296 << 10) + 65536;
      }
    },
    zr = Hr ? function (t) {
      return t.trimStart();
    } : function (t) {
      return t.replace(Pr, "");
    },
    jr = Ir ? function (t) {
      return t.trimEnd();
    } : function (t) {
      return t.replace(Tr, "");
    };
  function Gr(t, e) {
    return new RegExp(t, e);
  }
  if (Fr) {
    var Vr = Gr("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
    Lr = function (t, e) {
      var i;
      return Vr.lastIndex = e, null !== (i = Vr.exec(t)[1]) && void 0 !== i ? i : "";
    };
  } else Lr = function (t, e) {
    for (var i = [];;) {
      var r = Ur(t, e);
      if (void 0 === r || Xr(r) || Kr(r)) break;
      i.push(r), e += r >= 65536 ? 2 : 1;
    }
    return Or.apply(void 0, i);
  };
  var qr = function () {
    function t(t, e) {
      void 0 === e && (e = {}), this.message = t, this.position = {
        offset: 0,
        line: 1,
        column: 1
      }, this.ignoreTag = !!e.ignoreTag, this.locale = e.locale, this.requiresOtherClause = !!e.requiresOtherClause, this.shouldParseSkeletons = !!e.shouldParseSkeletons;
    }
    return t.prototype.parse = function () {
      if (0 !== this.offset()) throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, t.prototype.parseMessage = function (t, e, i) {
      for (var r = []; !this.isEOF();) {
        var n = this.char();
        if (123 === n) {
          if ((s = this.parseArgument(t, i)).err) return s;
          r.push(s.val);
        } else {
          if (125 === n && t > 0) break;
          if (35 !== n || "plural" !== e && "selectordinal" !== e) {
            if (60 === n && !this.ignoreTag && 47 === this.peek()) {
              if (i) break;
              return this.error(Ni.UNMATCHED_CLOSING_TAG, Ar(this.clonePosition(), this.clonePosition()));
            }
            if (60 === n && !this.ignoreTag && Yr(this.peek() || 0)) {
              if ((s = this.parseTag(t, e)).err) return s;
              r.push(s.val);
            } else {
              var s;
              if ((s = this.parseLiteral(t, e)).err) return s;
              r.push(s.val);
            }
          } else {
            var o = this.clonePosition();
            this.bump(), r.push({
              type: Oi.pound,
              location: Ar(o, this.clonePosition())
            });
          }
        }
      }
      return {
        val: r,
        err: null
      };
    }, t.prototype.parseTag = function (t, e) {
      var i = this.clonePosition();
      this.bump();
      var r = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>")) return {
        val: {
          type: Oi.literal,
          value: "<".concat(r, "/>"),
          location: Ar(i, this.clonePosition())
        },
        err: null
      };
      if (this.bumpIf(">")) {
        var n = this.parseMessage(t + 1, e, !0);
        if (n.err) return n;
        var s = n.val,
          o = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !Yr(this.char())) return this.error(Ni.INVALID_TAG, Ar(o, this.clonePosition()));
          var a = this.clonePosition();
          return r !== this.parseTagName() ? this.error(Ni.UNMATCHED_CLOSING_TAG, Ar(a, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: Oi.tag,
              value: r,
              children: s,
              location: Ar(i, this.clonePosition())
            },
            err: null
          } : this.error(Ni.INVALID_TAG, Ar(o, this.clonePosition())));
        }
        return this.error(Ni.UNCLOSED_TAG, Ar(i, this.clonePosition()));
      }
      return this.error(Ni.INVALID_TAG, Ar(i, this.clonePosition()));
    }, t.prototype.parseTagName = function () {
      var t = this.offset();
      for (this.bump(); !this.isEOF() && Wr(this.char());) this.bump();
      return this.message.slice(t, this.offset());
    }, t.prototype.parseLiteral = function (t, e) {
      for (var i = this.clonePosition(), r = "";;) {
        var n = this.tryParseQuote(e);
        if (n) r += n;else {
          var s = this.tryParseUnquoted(t, e);
          if (s) r += s;else {
            var o = this.tryParseLeftAngleBracket();
            if (!o) break;
            r += o;
          }
        }
      }
      var a = Ar(i, this.clonePosition());
      return {
        val: {
          type: Oi.literal,
          value: r,
          location: a
        },
        err: null
      };
    }, t.prototype.tryParseLeftAngleBracket = function () {
      return this.isEOF() || 60 !== this.char() || !this.ignoreTag && (Yr(t = this.peek() || 0) || 47 === t) ? null : (this.bump(), "<");
      var t;
    }, t.prototype.tryParseQuote = function (t) {
      if (this.isEOF() || 39 !== this.char()) return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if ("plural" === t || "selectordinal" === t) break;
          return null;
        default:
          return null;
      }
      this.bump();
      var e = [this.char()];
      for (this.bump(); !this.isEOF();) {
        var i = this.char();
        if (39 === i) {
          if (39 !== this.peek()) {
            this.bump();
            break;
          }
          e.push(39), this.bump();
        } else e.push(i);
        this.bump();
      }
      return Or.apply(void 0, e);
    }, t.prototype.tryParseUnquoted = function (t, e) {
      if (this.isEOF()) return null;
      var i = this.char();
      return 60 === i || 123 === i || 35 === i && ("plural" === e || "selectordinal" === e) || 125 === i && t > 0 ? null : (this.bump(), Or(i));
    }, t.prototype.parseArgument = function (t, e) {
      var i = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF()) return this.error(Ni.EXPECT_ARGUMENT_CLOSING_BRACE, Ar(i, this.clonePosition()));
      if (125 === this.char()) return this.bump(), this.error(Ni.EMPTY_ARGUMENT, Ar(i, this.clonePosition()));
      var r = this.parseIdentifierIfPossible().value;
      if (!r) return this.error(Ni.MALFORMED_ARGUMENT, Ar(i, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF()) return this.error(Ni.EXPECT_ARGUMENT_CLOSING_BRACE, Ar(i, this.clonePosition()));
      switch (this.char()) {
        case 125:
          return this.bump(), {
            val: {
              type: Oi.argument,
              value: r,
              location: Ar(i, this.clonePosition())
            },
            err: null
          };
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(Ni.EXPECT_ARGUMENT_CLOSING_BRACE, Ar(i, this.clonePosition())) : this.parseArgumentOptions(t, e, r, i);
        default:
          return this.error(Ni.MALFORMED_ARGUMENT, Ar(i, this.clonePosition()));
      }
    }, t.prototype.parseIdentifierIfPossible = function () {
      var t = this.clonePosition(),
        e = this.offset(),
        i = Lr(this.message, e),
        r = e + i.length;
      return this.bumpTo(r), {
        value: i,
        location: Ar(t, this.clonePosition())
      };
    }, t.prototype.parseArgumentOptions = function (t, e, i, n) {
      var s,
        o = this.clonePosition(),
        a = this.parseIdentifierIfPossible().value,
        l = this.clonePosition();
      switch (a) {
        case "":
          return this.error(Ni.EXPECT_ARGUMENT_TYPE, Ar(o, l));
        case "number":
        case "date":
        case "time":
          this.bumpSpace();
          var c = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var h = this.clonePosition();
            if ((v = this.parseSimpleArgStyleIfPossible()).err) return v;
            if (0 === (g = jr(v.val)).length) return this.error(Ni.EXPECT_ARGUMENT_STYLE, Ar(this.clonePosition(), this.clonePosition()));
            c = {
              style: g,
              styleLocation: Ar(h, this.clonePosition())
            };
          }
          if ((y = this.tryParseArgumentClose(n)).err) return y;
          var d = Ar(n, this.clonePosition());
          if (c && Nr(null == c ? void 0 : c.style, "::", 0)) {
            var p = zr(c.style.slice(2));
            if ("number" === a) return (v = this.parseNumberSkeletonFromString(p, c.styleLocation)).err ? v : {
              val: {
                type: Oi.number,
                value: i,
                location: d,
                style: v.val
              },
              err: null
            };
            if (0 === p.length) return this.error(Ni.EXPECT_DATE_TIME_SKELETON, d);
            var u = p;
            this.locale && (u = function (t, e) {
              for (var i = "", r = 0; r < t.length; r++) {
                var n = t.charAt(r);
                if ("j" === n) {
                  for (var s = 0; r + 1 < t.length && t.charAt(r + 1) === n;) s++, r++;
                  var o = 1 + (1 & s),
                    a = s < 2 ? 1 : 3 + (s >> 1),
                    l = $r(e);
                  for ("H" != l && "k" != l || (a = 0); a-- > 0;) i += "a";
                  for (; o-- > 0;) i = l + i;
                } else i += "J" === n ? "H" : n;
              }
              return i;
            }(p, this.locale));
            var g = {
              type: Ri.dateTime,
              pattern: u,
              location: c.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? pr(u) : {}
            };
            return {
              val: {
                type: "date" === a ? Oi.date : Oi.time,
                value: i,
                location: d,
                style: g
              },
              err: null
            };
          }
          return {
            val: {
              type: "number" === a ? Oi.number : "date" === a ? Oi.date : Oi.time,
              value: i,
              location: d,
              style: null !== (s = null == c ? void 0 : c.style) && void 0 !== s ? s : null
            },
            err: null
          };
        case "plural":
        case "selectordinal":
        case "select":
          var m = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(",")) return this.error(Ni.EXPECT_SELECT_ARGUMENT_OPTIONS, Ar(m, r({}, m)));
          this.bumpSpace();
          var b = this.parseIdentifierIfPossible(),
            _ = 0;
          if ("select" !== a && "offset" === b.value) {
            if (!this.bumpIf(":")) return this.error(Ni.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, Ar(this.clonePosition(), this.clonePosition()));
            var v;
            if (this.bumpSpace(), (v = this.tryParseDecimalInteger(Ni.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, Ni.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err) return v;
            this.bumpSpace(), b = this.parseIdentifierIfPossible(), _ = v.val;
          }
          var y,
            f = this.tryParsePluralOrSelectOptions(t, a, e, b);
          if (f.err) return f;
          if ((y = this.tryParseArgumentClose(n)).err) return y;
          var x = Ar(n, this.clonePosition());
          return "select" === a ? {
            val: {
              type: Oi.select,
              value: i,
              options: Rr(f.val),
              location: x
            },
            err: null
          } : {
            val: {
              type: Oi.plural,
              value: i,
              options: Rr(f.val),
              offset: _,
              pluralType: "plural" === a ? "cardinal" : "ordinal",
              location: x
            },
            err: null
          };
        default:
          return this.error(Ni.INVALID_ARGUMENT_TYPE, Ar(o, l));
      }
    }, t.prototype.tryParseArgumentClose = function (t) {
      return this.isEOF() || 125 !== this.char() ? this.error(Ni.EXPECT_ARGUMENT_CLOSING_BRACE, Ar(t, this.clonePosition())) : (this.bump(), {
        val: !0,
        err: null
      });
    }, t.prototype.parseSimpleArgStyleIfPossible = function () {
      for (var t = 0, e = this.clonePosition(); !this.isEOF();) {
        switch (this.char()) {
          case 39:
            this.bump();
            var i = this.clonePosition();
            if (!this.bumpUntil("'")) return this.error(Ni.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, Ar(i, this.clonePosition()));
            this.bump();
            break;
          case 123:
            t += 1, this.bump();
            break;
          case 125:
            if (!(t > 0)) return {
              val: this.message.slice(e.offset, this.offset()),
              err: null
            };
            t -= 1;
            break;
          default:
            this.bump();
        }
      }
      return {
        val: this.message.slice(e.offset, this.offset()),
        err: null
      };
    }, t.prototype.parseNumberSkeletonFromString = function (t, e) {
      var i = [];
      try {
        i = function (t) {
          if (0 === t.length) throw new Error("Number skeleton cannot be empty");
          for (var e = t.split(ur).filter(function (t) {
              return t.length > 0;
            }), i = [], r = 0, n = e; r < n.length; r++) {
            var s = n[r].split("/");
            if (0 === s.length) throw new Error("Invalid number skeleton");
            for (var o = s[0], a = s.slice(1), l = 0, c = a; l < c.length; l++) if (0 === c[l].length) throw new Error("Invalid number skeleton");
            i.push({
              stem: o,
              options: a
            });
          }
          return i;
        }(t);
      } catch (t) {
        return this.error(Ni.INVALID_NUMBER_SKELETON, e);
      }
      return {
        val: {
          type: Ri.number,
          tokens: i,
          location: e,
          parsedOptions: this.shouldParseSkeletons ? wr(i) : {}
        },
        err: null
      };
    }, t.prototype.tryParsePluralOrSelectOptions = function (t, e, i, r) {
      for (var n, s = !1, o = [], a = new Set(), l = r.value, c = r.location;;) {
        if (0 === l.length) {
          var h = this.clonePosition();
          if ("select" === e || !this.bumpIf("=")) break;
          var d = this.tryParseDecimalInteger(Ni.EXPECT_PLURAL_ARGUMENT_SELECTOR, Ni.INVALID_PLURAL_ARGUMENT_SELECTOR);
          if (d.err) return d;
          c = Ar(h, this.clonePosition()), l = this.message.slice(h.offset, this.offset());
        }
        if (a.has(l)) return this.error("select" === e ? Ni.DUPLICATE_SELECT_ARGUMENT_SELECTOR : Ni.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, c);
        "other" === l && (s = !0), this.bumpSpace();
        var p = this.clonePosition();
        if (!this.bumpIf("{")) return this.error("select" === e ? Ni.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : Ni.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, Ar(this.clonePosition(), this.clonePosition()));
        var u = this.parseMessage(t + 1, e, i);
        if (u.err) return u;
        var g = this.tryParseArgumentClose(p);
        if (g.err) return g;
        o.push([l, {
          value: u.val,
          location: Ar(p, this.clonePosition())
        }]), a.add(l), this.bumpSpace(), l = (n = this.parseIdentifierIfPossible()).value, c = n.location;
      }
      return 0 === o.length ? this.error("select" === e ? Ni.EXPECT_SELECT_ARGUMENT_SELECTOR : Ni.EXPECT_PLURAL_ARGUMENT_SELECTOR, Ar(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !s ? this.error(Ni.MISSING_OTHER_CLAUSE, Ar(this.clonePosition(), this.clonePosition())) : {
        val: o,
        err: null
      };
    }, t.prototype.tryParseDecimalInteger = function (t, e) {
      var i = 1,
        r = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (i = -1);
      for (var n = !1, s = 0; !this.isEOF();) {
        var o = this.char();
        if (!(o >= 48 && o <= 57)) break;
        n = !0, s = 10 * s + (o - 48), this.bump();
      }
      var a = Ar(r, this.clonePosition());
      return n ? Br(s *= i) ? {
        val: s,
        err: null
      } : this.error(e, a) : this.error(t, a);
    }, t.prototype.offset = function () {
      return this.position.offset;
    }, t.prototype.isEOF = function () {
      return this.offset() === this.message.length;
    }, t.prototype.clonePosition = function () {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    }, t.prototype.char = function () {
      var t = this.position.offset;
      if (t >= this.message.length) throw Error("out of bound");
      var e = Ur(this.message, t);
      if (void 0 === e) throw Error("Offset ".concat(t, " is at invalid UTF-16 code unit boundary"));
      return e;
    }, t.prototype.error = function (t, e) {
      return {
        val: null,
        err: {
          kind: t,
          message: this.message,
          location: e
        }
      };
    }, t.prototype.bump = function () {
      if (!this.isEOF()) {
        var t = this.char();
        10 === t ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += t < 65536 ? 1 : 2);
      }
    }, t.prototype.bumpIf = function (t) {
      if (Nr(this.message, t, this.offset())) {
        for (var e = 0; e < t.length; e++) this.bump();
        return !0;
      }
      return !1;
    }, t.prototype.bumpUntil = function (t) {
      var e = this.offset(),
        i = this.message.indexOf(t, e);
      return i >= 0 ? (this.bumpTo(i), !0) : (this.bumpTo(this.message.length), !1);
    }, t.prototype.bumpTo = function (t) {
      if (this.offset() > t) throw Error("targetOffset ".concat(t, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (t = Math.min(t, this.message.length);;) {
        var e = this.offset();
        if (e === t) break;
        if (e > t) throw Error("targetOffset ".concat(t, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF()) break;
      }
    }, t.prototype.bumpSpace = function () {
      for (; !this.isEOF() && Xr(this.char());) this.bump();
    }, t.prototype.peek = function () {
      if (this.isEOF()) return null;
      var t = this.char(),
        e = this.offset(),
        i = this.message.charCodeAt(e + (t >= 65536 ? 2 : 1));
      return null != i ? i : null;
    }, t;
  }();
  function Yr(t) {
    return t >= 97 && t <= 122 || t >= 65 && t <= 90;
  }
  function Wr(t) {
    return 45 === t || 46 === t || t >= 48 && t <= 57 || 95 === t || t >= 97 && t <= 122 || t >= 65 && t <= 90 || 183 == t || t >= 192 && t <= 214 || t >= 216 && t <= 246 || t >= 248 && t <= 893 || t >= 895 && t <= 8191 || t >= 8204 && t <= 8205 || t >= 8255 && t <= 8256 || t >= 8304 && t <= 8591 || t >= 11264 && t <= 12271 || t >= 12289 && t <= 55295 || t >= 63744 && t <= 64975 || t >= 65008 && t <= 65533 || t >= 65536 && t <= 983039;
  }
  function Xr(t) {
    return t >= 9 && t <= 13 || 32 === t || 133 === t || t >= 8206 && t <= 8207 || 8232 === t || 8233 === t;
  }
  function Kr(t) {
    return t >= 33 && t <= 35 || 36 === t || t >= 37 && t <= 39 || 40 === t || 41 === t || 42 === t || 43 === t || 44 === t || 45 === t || t >= 46 && t <= 47 || t >= 58 && t <= 59 || t >= 60 && t <= 62 || t >= 63 && t <= 64 || 91 === t || 92 === t || 93 === t || 94 === t || 96 === t || 123 === t || 124 === t || 125 === t || 126 === t || 161 === t || t >= 162 && t <= 165 || 166 === t || 167 === t || 169 === t || 171 === t || 172 === t || 174 === t || 176 === t || 177 === t || 182 === t || 187 === t || 191 === t || 215 === t || 247 === t || t >= 8208 && t <= 8213 || t >= 8214 && t <= 8215 || 8216 === t || 8217 === t || 8218 === t || t >= 8219 && t <= 8220 || 8221 === t || 8222 === t || 8223 === t || t >= 8224 && t <= 8231 || t >= 8240 && t <= 8248 || 8249 === t || 8250 === t || t >= 8251 && t <= 8254 || t >= 8257 && t <= 8259 || 8260 === t || 8261 === t || 8262 === t || t >= 8263 && t <= 8273 || 8274 === t || 8275 === t || t >= 8277 && t <= 8286 || t >= 8592 && t <= 8596 || t >= 8597 && t <= 8601 || t >= 8602 && t <= 8603 || t >= 8604 && t <= 8607 || 8608 === t || t >= 8609 && t <= 8610 || 8611 === t || t >= 8612 && t <= 8613 || 8614 === t || t >= 8615 && t <= 8621 || 8622 === t || t >= 8623 && t <= 8653 || t >= 8654 && t <= 8655 || t >= 8656 && t <= 8657 || 8658 === t || 8659 === t || 8660 === t || t >= 8661 && t <= 8691 || t >= 8692 && t <= 8959 || t >= 8960 && t <= 8967 || 8968 === t || 8969 === t || 8970 === t || 8971 === t || t >= 8972 && t <= 8991 || t >= 8992 && t <= 8993 || t >= 8994 && t <= 9e3 || 9001 === t || 9002 === t || t >= 9003 && t <= 9083 || 9084 === t || t >= 9085 && t <= 9114 || t >= 9115 && t <= 9139 || t >= 9140 && t <= 9179 || t >= 9180 && t <= 9185 || t >= 9186 && t <= 9254 || t >= 9255 && t <= 9279 || t >= 9280 && t <= 9290 || t >= 9291 && t <= 9311 || t >= 9472 && t <= 9654 || 9655 === t || t >= 9656 && t <= 9664 || 9665 === t || t >= 9666 && t <= 9719 || t >= 9720 && t <= 9727 || t >= 9728 && t <= 9838 || 9839 === t || t >= 9840 && t <= 10087 || 10088 === t || 10089 === t || 10090 === t || 10091 === t || 10092 === t || 10093 === t || 10094 === t || 10095 === t || 10096 === t || 10097 === t || 10098 === t || 10099 === t || 10100 === t || 10101 === t || t >= 10132 && t <= 10175 || t >= 10176 && t <= 10180 || 10181 === t || 10182 === t || t >= 10183 && t <= 10213 || 10214 === t || 10215 === t || 10216 === t || 10217 === t || 10218 === t || 10219 === t || 10220 === t || 10221 === t || 10222 === t || 10223 === t || t >= 10224 && t <= 10239 || t >= 10240 && t <= 10495 || t >= 10496 && t <= 10626 || 10627 === t || 10628 === t || 10629 === t || 10630 === t || 10631 === t || 10632 === t || 10633 === t || 10634 === t || 10635 === t || 10636 === t || 10637 === t || 10638 === t || 10639 === t || 10640 === t || 10641 === t || 10642 === t || 10643 === t || 10644 === t || 10645 === t || 10646 === t || 10647 === t || 10648 === t || t >= 10649 && t <= 10711 || 10712 === t || 10713 === t || 10714 === t || 10715 === t || t >= 10716 && t <= 10747 || 10748 === t || 10749 === t || t >= 10750 && t <= 11007 || t >= 11008 && t <= 11055 || t >= 11056 && t <= 11076 || t >= 11077 && t <= 11078 || t >= 11079 && t <= 11084 || t >= 11085 && t <= 11123 || t >= 11124 && t <= 11125 || t >= 11126 && t <= 11157 || 11158 === t || t >= 11159 && t <= 11263 || t >= 11776 && t <= 11777 || 11778 === t || 11779 === t || 11780 === t || 11781 === t || t >= 11782 && t <= 11784 || 11785 === t || 11786 === t || 11787 === t || 11788 === t || 11789 === t || t >= 11790 && t <= 11798 || 11799 === t || t >= 11800 && t <= 11801 || 11802 === t || 11803 === t || 11804 === t || 11805 === t || t >= 11806 && t <= 11807 || 11808 === t || 11809 === t || 11810 === t || 11811 === t || 11812 === t || 11813 === t || 11814 === t || 11815 === t || 11816 === t || 11817 === t || t >= 11818 && t <= 11822 || 11823 === t || t >= 11824 && t <= 11833 || t >= 11834 && t <= 11835 || t >= 11836 && t <= 11839 || 11840 === t || 11841 === t || 11842 === t || t >= 11843 && t <= 11855 || t >= 11856 && t <= 11857 || 11858 === t || t >= 11859 && t <= 11903 || t >= 12289 && t <= 12291 || 12296 === t || 12297 === t || 12298 === t || 12299 === t || 12300 === t || 12301 === t || 12302 === t || 12303 === t || 12304 === t || 12305 === t || t >= 12306 && t <= 12307 || 12308 === t || 12309 === t || 12310 === t || 12311 === t || 12312 === t || 12313 === t || 12314 === t || 12315 === t || 12316 === t || 12317 === t || t >= 12318 && t <= 12319 || 12320 === t || 12336 === t || 64830 === t || 64831 === t || t >= 65093 && t <= 65094;
  }
  function Zr(t) {
    t.forEach(function (t) {
      if (delete t.location, nr(t) || sr(t)) for (var e in t.options) delete t.options[e].location, Zr(t.options[e].value);else er(t) && lr(t.style) || (ir(t) || rr(t)) && cr(t.style) ? delete t.style.location : ar(t) && Zr(t.children);
    });
  }
  function Qr(t, e) {
    void 0 === e && (e = {}), e = r({
      shouldParseSkeletons: !0,
      requiresOtherClause: !0
    }, e);
    var i = new qr(t, e).parse();
    if (i.err) {
      var n = SyntaxError(Ni[i.err.kind]);
      throw n.location = i.err.location, n.originalMessage = i.err.message, n;
    }
    return (null == e ? void 0 : e.captureLocation) || Zr(i.val), i.val;
  }
  function Jr(t, e) {
    var i = e && e.cache ? e.cache : ln,
      r = e && e.serializer ? e.serializer : sn;
    return (e && e.strategy ? e.strategy : nn)(t, {
      cache: i,
      serializer: r
    });
  }
  function tn(t, e, i, r) {
    var n,
      s = null == (n = r) || "number" == typeof n || "boolean" == typeof n ? r : i(r),
      o = e.get(s);
    return void 0 === o && (o = t.call(this, r), e.set(s, o)), o;
  }
  function en(t, e, i) {
    var r = Array.prototype.slice.call(arguments, 3),
      n = i(r),
      s = e.get(n);
    return void 0 === s && (s = t.apply(this, r), e.set(n, s)), s;
  }
  function rn(t, e, i, r, n) {
    return i.bind(e, t, r, n);
  }
  function nn(t, e) {
    return rn(t, this, 1 === t.length ? tn : en, e.cache.create(), e.serializer);
  }
  var sn = function () {
    return JSON.stringify(arguments);
  };
  function on() {
    this.cache = Object.create(null);
  }
  on.prototype.get = function (t) {
    return this.cache[t];
  }, on.prototype.set = function (t, e) {
    this.cache[t] = e;
  };
  var an,
    ln = {
      create: function () {
        return new on();
      }
    },
    cn = {
      variadic: function (t, e) {
        return rn(t, this, en, e.cache.create(), e.serializer);
      },
      monadic: function (t, e) {
        return rn(t, this, tn, e.cache.create(), e.serializer);
      }
    };
  !function (t) {
    t.MISSING_VALUE = "MISSING_VALUE", t.INVALID_VALUE = "INVALID_VALUE", t.MISSING_INTL_API = "MISSING_INTL_API";
  }(an || (an = {}));
  var hn,
    dn = function (t) {
      function e(e, i, r) {
        var n = t.call(this, e) || this;
        return n.code = i, n.originalMessage = r, n;
      }
      return i(e, t), e.prototype.toString = function () {
        return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
      }, e;
    }(Error),
    pn = function (t) {
      function e(e, i, r, n) {
        return t.call(this, 'Invalid values for "'.concat(e, '": "').concat(i, '". Options are "').concat(Object.keys(r).join('", "'), '"'), an.INVALID_VALUE, n) || this;
      }
      return i(e, t), e;
    }(dn),
    un = function (t) {
      function e(e, i, r) {
        return t.call(this, 'Value for "'.concat(e, '" must be of type ').concat(i), an.INVALID_VALUE, r) || this;
      }
      return i(e, t), e;
    }(dn),
    gn = function (t) {
      function e(e, i) {
        return t.call(this, 'The intl string context variable "'.concat(e, '" was not provided to the string "').concat(i, '"'), an.MISSING_VALUE, i) || this;
      }
      return i(e, t), e;
    }(dn);
  function mn(t) {
    return "function" == typeof t;
  }
  function bn(t, e, i, r, n, s, o) {
    if (1 === t.length && Ji(t[0])) return [{
      type: hn.literal,
      value: t[0].value
    }];
    for (var a = [], l = 0, c = t; l < c.length; l++) {
      var h = c[l];
      if (Ji(h)) a.push({
        type: hn.literal,
        value: h.value
      });else if (or(h)) "number" == typeof s && a.push({
        type: hn.literal,
        value: i.getNumberFormat(e).format(s)
      });else {
        var d = h.value;
        if (!n || !(d in n)) throw new gn(d, o);
        var p = n[d];
        if (tr(h)) p && "string" != typeof p && "number" != typeof p || (p = "string" == typeof p || "number" == typeof p ? String(p) : ""), a.push({
          type: "string" == typeof p ? hn.literal : hn.object,
          value: p
        });else if (ir(h)) {
          var u = "string" == typeof h.style ? r.date[h.style] : cr(h.style) ? h.style.parsedOptions : void 0;
          a.push({
            type: hn.literal,
            value: i.getDateTimeFormat(e, u).format(p)
          });
        } else if (rr(h)) {
          u = "string" == typeof h.style ? r.time[h.style] : cr(h.style) ? h.style.parsedOptions : r.time.medium;
          a.push({
            type: hn.literal,
            value: i.getDateTimeFormat(e, u).format(p)
          });
        } else if (er(h)) {
          (u = "string" == typeof h.style ? r.number[h.style] : lr(h.style) ? h.style.parsedOptions : void 0) && u.scale && (p *= u.scale || 1), a.push({
            type: hn.literal,
            value: i.getNumberFormat(e, u).format(p)
          });
        } else {
          if (ar(h)) {
            var g = h.children,
              m = h.value,
              b = n[m];
            if (!mn(b)) throw new un(m, "function", o);
            var _ = b(bn(g, e, i, r, n, s).map(function (t) {
              return t.value;
            }));
            Array.isArray(_) || (_ = [_]), a.push.apply(a, _.map(function (t) {
              return {
                type: "string" == typeof t ? hn.literal : hn.object,
                value: t
              };
            }));
          }
          if (nr(h)) {
            if (!(v = h.options[p] || h.options.other)) throw new pn(h.value, p, Object.keys(h.options), o);
            a.push.apply(a, bn(v.value, e, i, r, n));
          } else if (sr(h)) {
            var v;
            if (!(v = h.options["=".concat(p)])) {
              if (!Intl.PluralRules) throw new dn('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', an.MISSING_INTL_API, o);
              var y = i.getPluralRules(e, {
                type: h.pluralType
              }).select(p - (h.offset || 0));
              v = h.options[y] || h.options.other;
            }
            if (!v) throw new pn(h.value, p, Object.keys(h.options), o);
            a.push.apply(a, bn(v.value, e, i, r, n, p - (h.offset || 0)));
          } else ;
        }
      }
    }
    return function (t) {
      return t.length < 2 ? t : t.reduce(function (t, e) {
        var i = t[t.length - 1];
        return i && i.type === hn.literal && e.type === hn.literal ? i.value += e.value : t.push(e), t;
      }, []);
    }(a);
  }
  function _n(t, e) {
    return e ? Object.keys(t).reduce(function (i, n) {
      var s, o;
      return i[n] = (s = t[n], (o = e[n]) ? r(r(r({}, s || {}), o || {}), Object.keys(s).reduce(function (t, e) {
        return t[e] = r(r({}, s[e]), o[e] || {}), t;
      }, {})) : s), i;
    }, r({}, t)) : t;
  }
  function vn(t) {
    return {
      create: function () {
        return {
          get: function (e) {
            return t[e];
          },
          set: function (e, i) {
            t[e] = i;
          }
        };
      }
    };
  }
  !function (t) {
    t[t.literal = 0] = "literal", t[t.object = 1] = "object";
  }(hn || (hn = {}));
  var yn = function () {
      function t(e, i, n, o) {
        var a,
          l = this;
        if (void 0 === i && (i = t.defaultLocale), this.formatterCache = {
          number: {},
          dateTime: {},
          pluralRules: {}
        }, this.format = function (t) {
          var e = l.formatToParts(t);
          if (1 === e.length) return e[0].value;
          var i = e.reduce(function (t, e) {
            return t.length && e.type === hn.literal && "string" == typeof t[t.length - 1] ? t[t.length - 1] += e.value : t.push(e.value), t;
          }, []);
          return i.length <= 1 ? i[0] || "" : i;
        }, this.formatToParts = function (t) {
          return bn(l.ast, l.locales, l.formatters, l.formats, t, void 0, l.message);
        }, this.resolvedOptions = function () {
          var t;
          return {
            locale: (null === (t = l.resolvedLocale) || void 0 === t ? void 0 : t.toString()) || Intl.NumberFormat.supportedLocalesOf(l.locales)[0]
          };
        }, this.getAst = function () {
          return l.ast;
        }, this.locales = i, this.resolvedLocale = t.resolveLocale(i), "string" == typeof e) {
          if (this.message = e, !t.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
          var c = o || {};
          c.formatters;
          var h = function (t, e) {
            var i = {};
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (i[r] = t[r]);
            if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
              var n = 0;
              for (r = Object.getOwnPropertySymbols(t); n < r.length; n++) e.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[n]) && (i[r[n]] = t[r[n]]);
            }
            return i;
          }(c, ["formatters"]);
          this.ast = t.__parse(e, r(r({}, h), {
            locale: this.resolvedLocale
          }));
        } else this.ast = e;
        if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
        this.formats = _n(t.formats, n), this.formatters = o && o.formatters || (void 0 === (a = this.formatterCache) && (a = {
          number: {},
          dateTime: {},
          pluralRules: {}
        }), {
          getNumberFormat: Jr(function () {
            for (var t, e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
            return new ((t = Intl.NumberFormat).bind.apply(t, s([void 0], e, !1)))();
          }, {
            cache: vn(a.number),
            strategy: cn.variadic
          }),
          getDateTimeFormat: Jr(function () {
            for (var t, e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
            return new ((t = Intl.DateTimeFormat).bind.apply(t, s([void 0], e, !1)))();
          }, {
            cache: vn(a.dateTime),
            strategy: cn.variadic
          }),
          getPluralRules: Jr(function () {
            for (var t, e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
            return new ((t = Intl.PluralRules).bind.apply(t, s([void 0], e, !1)))();
          }, {
            cache: vn(a.pluralRules),
            strategy: cn.variadic
          })
        });
      }
      return Object.defineProperty(t, "defaultLocale", {
        get: function () {
          return t.memoizedDefaultLocale || (t.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), t.memoizedDefaultLocale;
        },
        enumerable: !1,
        configurable: !0
      }), t.memoizedDefaultLocale = null, t.resolveLocale = function (t) {
        if (void 0 !== Intl.Locale) {
          var e = Intl.NumberFormat.supportedLocalesOf(t);
          return e.length > 0 ? new Intl.Locale(e[0]) : new Intl.Locale("string" == typeof t ? t : t[0]);
        }
      }, t.__parse = Qr, t.formats = {
        number: {
          integer: {
            maximumFractionDigits: 0
          },
          currency: {
            style: "currency"
          },
          percent: {
            style: "percent"
          }
        },
        date: {
          short: {
            month: "numeric",
            day: "numeric",
            year: "2-digit"
          },
          medium: {
            month: "short",
            day: "numeric",
            year: "numeric"
          },
          long: {
            month: "long",
            day: "numeric",
            year: "numeric"
          },
          full: {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
          }
        },
        time: {
          short: {
            hour: "numeric",
            minute: "numeric"
          },
          medium: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          },
          long: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
          },
          full: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
          }
        }
      }, t;
    }(),
    fn = yn,
    xn = {
      en: qi,
      de: Qi
    };
  function wn(t, e, ...i) {
    const r = e.replace(/['"]+/g, "");
    var n;
    try {
      n = t.split(".").reduce((t, e) => t[e], xn[r]);
    } catch (e) {
      n = t.split(".").reduce((t, e) => t[e], xn.en);
    }
    if (void 0 === n && (n = t.split(".").reduce((t, e) => t[e], xn.en)), !i.length) return n;
    const s = {};
    for (let t = 0; t < i.length; t += 2) {
      let e = i[t];
      e = e.replace(/^{([^}]+)?}$/, "$1"), s[e] = i[t + 1];
    }
    try {
      return new fn(n, e).format(s);
    } catch (t) {
      return "Translation " + t;
    }
  }
  var En = "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const Sn = 1,
    $n = 2,
    Pn = t => (...e) => ({
      _$litDirective$: t,
      values: e
    });
  class Tn {
    constructor(t) {}
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t, e, i) {
      this._$Ct = t, this._$AM = e, this._$Ci = i;
    }
    _$AS(t, e) {
      return this.update(t, e);
    }
    update(t, e) {
      return this.render(...e);
    }
  }
  /**
       * @license
       * Copyright 2018 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const An = Pn(class extends Tn {
    constructor(t) {
      if (super(t), t.type !== Sn || "class" !== t.name || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t) {
      return " " + Object.keys(t).filter(e => t[e]).join(" ") + " ";
    }
    update(t, [e]) {
      if (void 0 === this.st) {
        this.st = new Set(), void 0 !== t.strings && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(t => "" !== t)));
        for (const t in e) e[t] && !this.nt?.has(t) && this.st.add(t);
        return this.render(e);
      }
      const i = t.element.classList;
      for (const t of this.st) t in e || (i.remove(t), this.st.delete(t));
      for (const t in e) {
        const r = !!e[t];
        r === this.st.has(t) || this.nt?.has(t) || (r ? (i.add(t), this.st.add(t)) : (i.remove(t), this.st.delete(t)));
      }
      return K;
    }
  });
  /**
       * @license
       * Copyright 2021 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  function* Cn(t, e) {
    if (void 0 !== t) {
      let i = 0;
      for (const r of t) yield e(r, i++);
    }
  }
  /**
       * @license
       * Copyright 2018 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const Dn = "important",
    kn = " !" + Dn,
    Mn = Pn(class extends Tn {
      constructor(t) {
        if (super(t), t.type !== Sn || "style" !== t.name || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
      }
      render(t) {
        return Object.keys(t).reduce((e, i) => {
          const r = t[i];
          return null == r ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
        }, "");
      }
      update(t, [e]) {
        const {
          style: i
        } = t.element;
        if (void 0 === this.ft) return this.ft = new Set(Object.keys(e)), this.render(e);
        for (const t of this.ft) null == e[t] && (this.ft.delete(t), t.includes("-") ? i.removeProperty(t) : i[t] = null);
        for (const t in e) {
          const r = e[t];
          if (null != r) {
            this.ft.add(t);
            const e = "string" == typeof r && r.endsWith(kn);
            t.includes("-") || e ? i.setProperty(t, e ? r.slice(0, -11) : r, e ? Dn : "") : i[t] = r;
          }
        }
        return K;
      }
    }),
    {
      I: Hn
    } = dt,
    In = () => document.createComment(""),
    Bn = (t, e, i) => {
      const r = t._$AA.parentNode,
        n = void 0 === e ? t._$AB : e._$AA;
      if (void 0 === i) {
        const e = r.insertBefore(In(), n),
          s = r.insertBefore(In(), n);
        i = new Hn(e, s, t, t.options);
      } else {
        const e = i._$AB.nextSibling,
          s = i._$AM,
          o = s !== t;
        if (o) {
          let e;
          i._$AQ?.(t), i._$AM = t, void 0 !== i._$AP && (e = t._$AU) !== s._$AU && i._$AP(e);
        }
        if (e !== n || o) {
          let t = i._$AA;
          for (; t !== e;) {
            const e = t.nextSibling;
            r.insertBefore(t, n), t = e;
          }
        }
      }
      return i;
    },
    Fn = (t, e, i = t) => (t._$AI(e, i), t),
    Ln = {},
    Nn = t => {
      t._$AP?.(!1, !0);
      let e = t._$AA;
      const i = t._$AB.nextSibling;
      for (; e !== i;) {
        const t = e.nextSibling;
        e.remove(), e = t;
      }
    },
    On = (t, e) => {
      const i = t._$AN;
      if (void 0 === i) return !1;
      for (const t of i) t._$AO?.(e, !1), On(t, e);
      return !0;
    },
    Rn = t => {
      let e, i;
      do {
        if (void 0 === (e = t._$AM)) break;
        i = e._$AN, i.delete(t), t = e;
      } while (0 === i?.size);
    },
    Un = t => {
      for (let e; e = t._$AM; t = e) {
        let i = e._$AN;
        if (void 0 === i) e._$AN = i = new Set();else if (i.has(t)) break;
        i.add(t), Gn(e);
      }
    };
  /**
       * @license
       * Copyright 2020 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  function zn(t) {
    void 0 !== this._$AN ? (Rn(this), this._$AM = t, Un(this)) : this._$AM = t;
  }
  function jn(t, e = !1, i = 0) {
    const r = this._$AH,
      n = this._$AN;
    if (void 0 !== n && 0 !== n.size) if (e) {
      if (Array.isArray(r)) for (let t = i; t < r.length; t++) On(r[t], !1), Rn(r[t]);else null != r && (On(r, !1), Rn(r));
    } else On(this, t);
  }
  const Gn = t => {
    t.type == $n && (t._$AP ??= jn, t._$AQ ??= zn);
  };
  class Vn extends Tn {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(t, e, i) {
      super._$AT(t, e, i), Un(this), this.isConnected = t._$AU;
    }
    _$AO(t, e = !0) {
      t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (On(this, t), Rn(this));
    }
    setValue(t) {
      if ((t => void 0 === t.strings)(this._$Ct)) this._$Ct._$AI(t, this);else {
        const e = [...this._$Ct._$AH];
        e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
      }
    }
    disconnected() {}
    reconnected() {}
  }
  const qn = new WeakMap();
  let Yn = 0;
  const Wn = new Map(),
    Xn = new WeakSet(),
    Kn = () => new Promise(t => requestAnimationFrame(t)),
    Zn = (t, e) => {
      const i = t - e;
      return 0 === i ? void 0 : i;
    },
    Qn = (t, e) => {
      const i = t / e;
      return 1 === i ? void 0 : i;
    },
    Jn = {
      left: (t, e) => {
        const i = Zn(t, e);
        return {
          value: i,
          transform: null == i || isNaN(i) ? void 0 : `translateX(${i}px)`
        };
      },
      top: (t, e) => {
        const i = Zn(t, e);
        return {
          value: i,
          transform: null == i || isNaN(i) ? void 0 : `translateY(${i}px)`
        };
      },
      width: (t, e) => {
        let i;
        0 === e && (e = 1, i = {
          width: "1px"
        });
        const r = Qn(t, e);
        return {
          value: r,
          overrideFrom: i,
          transform: null == r || isNaN(r) ? void 0 : `scaleX(${r})`
        };
      },
      height: (t, e) => {
        let i;
        0 === e && (e = 1, i = {
          height: "1px"
        });
        const r = Qn(t, e);
        return {
          value: r,
          overrideFrom: i,
          transform: null == r || isNaN(r) ? void 0 : `scaleY(${r})`
        };
      }
    },
    ts = {
      duration: 333,
      easing: "ease-in-out"
    },
    es = ["left", "top", "width", "height", "opacity", "color", "background"],
    is = new WeakMap();
  const rs = Pn(class extends Vn {
      constructor(t) {
        if (super(t), this.t = !1, this.i = null, this.o = null, this.h = !0, this.shouldLog = !1, t.type === $n) throw Error("The `animate` directive must be used in attribute position.");
        this.createFinished();
      }
      createFinished() {
        this.resolveFinished?.(), this.finished = new Promise(t => {
          this.l = t;
        });
      }
      async resolveFinished() {
        this.l?.(), this.l = void 0;
      }
      render(t) {
        return Z;
      }
      getController() {
        return qn.get(this.u);
      }
      isDisabled() {
        return this.options.disabled || this.getController()?.disabled;
      }
      update(t, [e]) {
        const i = void 0 === this.u;
        return i && (this.u = t.options?.host, this.u.addController(this), this.u.updateComplete.then(t => this.t = !0), this.element = t.element, is.set(this.element, this)), this.optionsOrCallback = e, (i || "function" != typeof e) && this.p(e), this.render(e);
      }
      p(t) {
        t = t ?? {};
        const e = this.getController();
        void 0 !== e && ((t = {
          ...e.defaultOptions,
          ...t
        }).keyframeOptions = {
          ...e.defaultOptions.keyframeOptions,
          ...t.keyframeOptions
        }), t.properties ??= es, this.options = t;
      }
      m() {
        const t = {},
          e = this.element.getBoundingClientRect(),
          i = getComputedStyle(this.element);
        return this.options.properties.forEach(r => {
          const n = e[r] ?? (Jn[r] ? void 0 : i[r]),
            s = Number(n);
          t[r] = isNaN(s) ? n + "" : s;
        }), t;
      }
      v() {
        let t,
          e = !0;
        return this.options.guard && (t = this.options.guard(), e = ((t, e) => {
          if (Array.isArray(t)) {
            if (Array.isArray(e) && e.length === t.length && t.every((t, i) => t === e[i])) return !1;
          } else if (e === t) return !1;
          return !0;
        })(t, this._)), this.h = this.t && !this.isDisabled() && !this.isAnimating() && e && this.element.isConnected, this.h && (this._ = Array.isArray(t) ? Array.from(t) : t), this.h;
      }
      hostUpdate() {
        "function" == typeof this.optionsOrCallback && this.p(this.optionsOrCallback()), this.v() && (this.A = this.m(), this.i = this.i ?? this.element.parentNode, this.o = this.element.nextSibling);
      }
      async hostUpdated() {
        if (!this.h || !this.element.isConnected || this.options.skipInitial && !this.isHostRendered) return;
        let t;
        this.prepare(), await Kn;
        const e = this.O(),
          i = this.j(this.options.keyframeOptions, e),
          r = this.m();
        if (void 0 !== this.A) {
          const {
            from: i,
            to: n
          } = this.N(this.A, r, e);
          this.log("measured", [this.A, r, i, n]), t = this.calculateKeyframes(i, n);
        } else {
          const i = Wn.get(this.options.inId);
          if (i) {
            Wn.delete(this.options.inId);
            const {
              from: n,
              to: s
            } = this.N(i, r, e);
            t = this.calculateKeyframes(n, s), t = this.options.in ? [{
              ...this.options.in[0],
              ...t[0]
            }, ...this.options.in.slice(1), t[1]] : t, Yn++, t.forEach(t => t.zIndex = Yn);
          } else this.options.in && (t = [...this.options.in, {}]);
        }
        this.animate(t, i);
      }
      resetStyles() {
        void 0 !== this.P && (this.element.setAttribute("style", this.P ?? ""), this.P = void 0);
      }
      commitStyles() {
        this.P = this.element.getAttribute("style"), this.webAnimation?.commitStyles(), this.webAnimation?.cancel();
      }
      reconnected() {}
      async disconnected() {
        if (!this.h) return;
        if (void 0 !== this.options.id && Wn.set(this.options.id, this.A), void 0 === this.options.out) return;
        if (this.prepare(), await Kn(), this.i?.isConnected) {
          const t = this.o && this.o.parentNode === this.i ? this.o : null;
          if (this.i.insertBefore(this.element, t), this.options.stabilizeOut) {
            const t = this.m();
            this.log("stabilizing out");
            const e = this.A.left - t.left,
              i = this.A.top - t.top;
            !("static" === getComputedStyle(this.element).position) || 0 === e && 0 === i || (this.element.style.position = "relative"), 0 !== e && (this.element.style.left = e + "px"), 0 !== i && (this.element.style.top = i + "px");
          }
        }
        const t = this.j(this.options.keyframeOptions);
        await this.animate(this.options.out, t), this.element.remove();
      }
      prepare() {
        this.createFinished();
      }
      start() {
        this.options.onStart?.(this);
      }
      didFinish(t) {
        t && this.options.onComplete?.(this), this.A = void 0, this.animatingProperties = void 0, this.frames = void 0, this.resolveFinished();
      }
      O() {
        const t = [];
        for (let e = this.element.parentNode; e; e = e?.parentNode) {
          const i = is.get(e);
          i && !i.isDisabled() && i && t.push(i);
        }
        return t;
      }
      get isHostRendered() {
        const t = Xn.has(this.u);
        return t || this.u.updateComplete.then(() => {
          Xn.add(this.u);
        }), t;
      }
      j(t, e = this.O()) {
        const i = {
          ...ts
        };
        return e.forEach(t => Object.assign(i, t.options.keyframeOptions)), Object.assign(i, t), i;
      }
      N(t, e, i) {
        t = {
          ...t
        }, e = {
          ...e
        };
        const r = i.map(t => t.animatingProperties).filter(t => void 0 !== t);
        let n = 1,
          s = 1;
        return r.length > 0 && (r.forEach(t => {
          t.width && (n /= t.width), t.height && (s /= t.height);
        }), void 0 !== t.left && void 0 !== e.left && (t.left = n * t.left, e.left = n * e.left), void 0 !== t.top && void 0 !== e.top && (t.top = s * t.top, e.top = s * e.top)), {
          from: t,
          to: e
        };
      }
      calculateKeyframes(t, e, i = !1) {
        const r = {},
          n = {};
        let s = !1;
        const o = {};
        for (const i in e) {
          const a = t[i],
            l = e[i];
          if (i in Jn) {
            const t = Jn[i];
            if (void 0 === a || void 0 === l) continue;
            const e = t(a, l);
            void 0 !== e.transform && (o[i] = e.value, s = !0, r.transform = `${r.transform ?? ""} ${e.transform}`, void 0 !== e.overrideFrom && Object.assign(r, e.overrideFrom));
          } else a !== l && void 0 !== a && void 0 !== l && (s = !0, r[i] = a, n[i] = l);
        }
        return r.transformOrigin = n.transformOrigin = i ? "center center" : "top left", this.animatingProperties = o, s ? [r, n] : void 0;
      }
      async animate(t, e = this.options.keyframeOptions) {
        this.start(), this.frames = t;
        let i = !1;
        if (!this.isAnimating() && !this.isDisabled() && (this.options.onFrames && (this.frames = t = this.options.onFrames(this), this.log("modified frames", t)), void 0 !== t)) {
          this.log("animate", [t, e]), i = !0, this.webAnimation = this.element.animate(t, e);
          const r = this.getController();
          r?.add(this);
          try {
            await this.webAnimation.finished;
          } catch (t) {}
          r?.remove(this);
        }
        return this.didFinish(i), i;
      }
      isAnimating() {
        return "running" === this.webAnimation?.playState || this.webAnimation?.pending;
      }
      log(t, e) {
        this.shouldLog && !this.isDisabled() && console.log(t, this.options.id, e);
      }
    }),
    ns = t => e => "function" == typeof e ? ((t, e) => (window.customElements.get(t) || window.customElements.define(t, e), e))(t, e) : ((t, e) => {
      const {
        kind: i,
        elements: r
      } = e;
      return {
        kind: i,
        elements: r,
        finisher(e) {
          window.customElements.get(t) || window.customElements.define(t, e);
        }
      };
    })(t, e);
  let ss = class extends ut {
    constructor() {
      super(...arguments), this.camImgString = "none", this._handleToggleClick = () => {
        this.toggleVideo && this.toggleVideo();
      };
    }
    willUpdate(t) {
      super.willUpdate(t), (t.has("showVideo") || t.has("cameraEntity")) && (this.camImgString = this.showVideo && this.cameraEntity ? `url('${function (t) {
        const e = t.attributes.access_token;
        return `${window.location.origin}/api/camera_proxy_stream/${t.entity_id}?token=${e}`;
      }(this.cameraEntity)}')` : "none");
    }
    render() {
      const t = {
        display: this.showVideo ? "block" : "none"
      };
      return X`
      <div
        class="ac-printercard-cameraview"
        style=${Mn(t)}
        @click=${this._handleToggleClick}
      >
        ${this.showVideo ? this._renderInner() : Z}
      </div>
    `;
    }
    _renderInner() {
      const t = {
        "background-image": this.camImgString
      };
      return X` <div
      class="ac-camera-wrapper"
      style=${Mn(t)}
    ></div>`;
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }

      .ac-printercard-cameraview {
        background-color: black;
        cursor: pointer;
        width: 100%;
        height: 100%;
      }

      .ac-camera-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        background-size: cover;
        background-position: center;
      }
    `;
    }
  };
  n([vt({
    attribute: "show-video"
  })], ss.prototype, "showVideo", void 0), n([vt({
    attribute: "toggle-video"
  })], ss.prototype, "toggleVideo", void 0), n([vt({
    attribute: "camera-entity"
  })], ss.prototype, "cameraEntity", void 0), n([yt()], ss.prototype, "camImgString", void 0), ss = n([ns("anycubic-printercard-camera_view")], ss);
  let os = class extends ut {
    constructor() {
      super(...arguments), this.checked = !1, this.disabled = !1, this._handleClick = () => {
        this.disabled || Ne(this, "ac-toggle-change", {
          checked: !this.checked
        });
      };
    }
    render() {
      return X`
      <button
        class="ac-toggle ${this.checked ? "ac-toggle-on" : ""}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <span class="ac-toggle-knob"></span>
      </button>
    `;
    }
    static get styles() {
      return p`
      :host {
        display: inline-block;
      }

      .ac-toggle {
        box-sizing: border-box;
        width: 42px;
        height: 24px;
        border-radius: 12px;
        border: none;
        padding: 2px;
        background-color: var(--switch-unchecked-color, #939393);
        cursor: pointer;
        position: relative;
        transition: background-color 180ms ease-in-out;
      }

      .ac-toggle:disabled {
        opacity: 0.5;
        cursor: default;
      }

      .ac-toggle.ac-toggle-on {
        background-color: var(
          --switch-checked-color,
          var(--primary-color, #03a9f4)
        );
      }

      .ac-toggle-knob {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: white;
        transition: transform 180ms ease-in-out;
        transform: translateX(0);
      }

      .ac-toggle.ac-toggle-on .ac-toggle-knob {
        transform: translateX(18px);
      }
    `;
    }
  };
  n([vt({
    type: Boolean
  })], os.prototype, "checked", void 0), n([vt({
    type: Boolean
  })], os.prototype, "disabled", void 0), os = n([ns("anycubic-ui-toggle-switch")], os);
  const as = "secondary_",
    ls = "multi_color_box_runout_refill",
    cs = as + ls,
    hs = "ace_spools",
    ds = as + hs;
  let ps = class extends ut {
    constructor() {
      super(...arguments), this.box_id = 0, this._runoutRefillId = ls, this._spoolsEntityId = hs, this.spoolList = [], this.selectedIndex = -1, this.selectedMaterialType = "", this.selectedColor = [0, 0, 0], this._changingRunout = !1, this._openDryingModal = () => {
        Ne(this, "ac-mcbdry-modal", {
          modalOpen: !0,
          box_id: this.box_id
        });
      }, this._handleRunoutRefillChanged = t => {
        this._changingRunout || (this._changingRunout = !0, this.hass.callService("switch", "toggle", {
          entity_id: ai(this.printerEntityIdPart, "switch", this._runoutRefillId)
        }).then(() => {
          this._changingRunout = !1;
        }).catch(t => {
          this._changingRunout = !1;
        }));
      }, this._editSpool = t => {
        const e = t.currentTarget.index,
          i = t.currentTarget.material_type,
          r = t.currentTarget.color;
        Ne(this, "ac-mcb-modal", {
          modalOpen: !0,
          box_id: this.box_id,
          spool_index: e,
          material_type: i,
          color: r
        });
      };
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("language") && (this._buttonRefill = wn("card.buttons.runout_refill", this.language), this._buttonDry = wn("card.buttons.dry", this.language)), t.has("box_id") && (1 === this.box_id ? (this._runoutRefillId = cs, this._spoolsEntityId = ds) : (this._runoutRefillId = ls, this._spoolsEntityId = hs)), (t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) && (this.spoolList = yi(this.hass, this.printerEntities, this.printerEntityIdPart, this._spoolsEntityId, "not loaded", {
        spool_info: []
      }).attributes.spool_info, this._runoutRefillState = gi(this.hass, this.printerEntities, this.printerEntityIdPart, this._runoutRefillId));
    }
    render() {
      var t;
      return X`
      <div class="ac-printercard-mcbview">
        <div class="ac-printercard-mcbmenu ac-printercard-menuleft">
          <div class="ac-switch">
            <div class="ac-switch-label">${this._buttonRefill}</div>
            <anycubic-ui-toggle-switch
              .checked=${"on" === (null === (t = this._runoutRefillState) || void 0 === t ? void 0 : t.state)}
              .disabled=${this._changingRunout || !this._runoutRefillState || "unavailable" === this._runoutRefillState.state}
              @ac-toggle-change=${this._handleRunoutRefillChanged}
            ></anycubic-ui-toggle-switch>
          </div>
        </div>
        <div class="ac-printercard-spoolcont">${this._renderSpools()}</div>
        <div class="ac-printercard-mcbmenu ac-printercard-menuright">
          <ha-control-button @click=${this._openDryingModal}>
            <ha-svg-icon .path=${"M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2M6,14A1,1 0 0,0 5,15V17A1,1 0 0,0 6,18A1,1 0 0,0 7,17V15A1,1 0 0,0 6,14M10,14A1,1 0 0,0 9,15V17A1,1 0 0,0 10,18A1,1 0 0,0 11,17V15A1,1 0 0,0 10,14M14,14A1,1 0 0,0 13,15V17A1,1 0 0,0 14,18A1,1 0 0,0 15,17V15A1,1 0 0,0 14,14M18,14A1,1 0 0,0 17,15V17A1,1 0 0,0 18,18A1,1 0 0,0 19,17V15A1,1 0 0,0 18,14Z"}></ha-svg-icon>
            ${this._buttonDry}
          </ha-control-button>
        </div>
      </div>
    `;
    }
    _renderSpools() {
      return Cn(this.spoolList, (t, e) => {
        const i = {
          "background-color": t.spool_loaded ? `rgb(${t.color[0]}, ${t.color[1]}, ${t.color[2]})` : "#aaa"
        };
        return X`
          <div
            class="ac-spool-info"
            .index=${e}
            .material_type=${t.material_type}
            .color=${t.color}
            @click=${this._editSpool}
          >
            <div class="ac-spool-color-ring-cont">
              <div
                class="ac-spool-color-ring-inner"
                style=${Mn(i)}
              >
                <div class="ac-spool-color-num">${e + 1}</div>
              </div>
            </div>
            <div class="ac-spool-material-type">
              ${t.spool_loaded ? t.material_type : "---"}
            </div>
          </div>
        `;
      });
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }

      .ac-printercard-mcbview {
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
      }

      .ac-printercard-mcbmenu {
        height: 100%;
        position: relative;
        width: 10.42%;
      }

      .ac-printercard-spoolcont {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 62.5%;
      }

      .ac-spool-info {
        box-sizing: border-box;
        height: auto;
        cursor: pointer;
        width: 25%;
        padding: 5px;
      }

      .ac-spool-color-ring-cont {
        position: relative;
        width: 100%;
        box-sizing: border-box;
      }

      .ac-spool-color-ring-cont:before {
        content: "";
        display: block;
        padding-top: 100%;
      }

      .ac-spool-color-ring-inner {
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        background-color: #aaa;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .ac-spool-color-num {
        font-weight: 900;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: #eee;
        width: 46.5%;
        height: 46.5%;
        color: #222;
        text-align: center;
      }

      .ac-spool-color-num:before {
        content: "";
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        padding-top: 2.5px;
      }

      .ac-spool-material-type {
        height: auto;
        text-align: center;
        font-weight: 900;
      }

      .ac-printercard-mcbmenu ha-control-button {
        font-size: 12px;
        margin: 0px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        min-width: 48px;
        min-height: 48px;
        width: 100%;
      }

      .ac-printercard-menuright ha-control-button {
        right: 0px;
      }

      .ac-printercard-mcbmenu .ac-switch-label {
        font-size: 12px;
      }

      .ac-printercard-mcbmenu .ac-switch {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        margin: 0px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        box-sizing: border-box;
        padding: 4px 4px;
        justify-content: center;
        background-color: #8686862e;
        border-radius: 8px;
      }

      .ac-printercard-mcbmenu .ac-switch:hover {
        background-color: #86868669;
      }
    `;
    }
  };
  n([vt()], ps.prototype, "hass", void 0), n([vt()], ps.prototype, "language", void 0), n([vt({
    attribute: "printer-entities"
  })], ps.prototype, "printerEntities", void 0), n([vt({
    attribute: "printer-entity-id-part"
  })], ps.prototype, "printerEntityIdPart", void 0), n([vt()], ps.prototype, "box_id", void 0), n([yt()], ps.prototype, "_runoutRefillId", void 0), n([yt()], ps.prototype, "_spoolsEntityId", void 0), n([yt()], ps.prototype, "spoolList", void 0), n([yt()], ps.prototype, "selectedIndex", void 0), n([yt()], ps.prototype, "selectedMaterialType", void 0), n([yt()], ps.prototype, "selectedColor", void 0), n([yt()], ps.prototype, "_runoutRefillState", void 0), n([yt()], ps.prototype, "_buttonRefill", void 0), n([yt()], ps.prototype, "_buttonDry", void 0), n([yt()], ps.prototype, "_changingRunout", void 0), ps = n([ns("anycubic-printercard-multicolorbox_view")], ps);
  class us {
    constructor(t) {
      this.scale_factor = t;
    }
    val(t) {
      return this.scale_factor * t;
    }
    og(t) {
      return t / this.scale_factor;
    }
    scaleFactor() {
      return this.scale_factor;
    }
  }
  const gs = {
    top: {
      width: 340,
      height: 20
    },
    bottom: {
      width: 340,
      height: 52.3
    },
    left: {
      width: 30,
      height: 400
    },
    right: {
      width: 30,
      height: 380
    },
    buildplate: {
      maxWidth: 250,
      maxHeight: 260,
      verticalOffset: 55
    },
    xAxis: {
      stepper: !0,
      width: 400,
      offsetLeft: -30,
      height: 30,
      extruder: {
        width: 60,
        height: 100
      }
    }
  };
  class ms {
    constructor(t, {
      target: e,
      config: i,
      callback: r,
      skipInitial: n
    }) {
      this.t = new Set(), this.o = !1, this.i = !1, this.h = t, null !== e && this.t.add(e ?? t), this.l = i, this.o = n ?? this.o, this.callback = r, window.ResizeObserver ? (this.u = new ResizeObserver(t => {
        this.handleChanges(t), this.h.requestUpdate();
      }), t.addController(this)) : console.warn("ResizeController error: browser does not support ResizeObserver.");
    }
    handleChanges(t) {
      this.value = this.callback?.(t, this.u);
    }
    hostConnected() {
      for (const t of this.t) this.observe(t);
    }
    hostDisconnected() {
      this.disconnect();
    }
    async hostUpdated() {
      !this.o && this.i && this.handleChanges([]), this.i = !1;
    }
    observe(t) {
      this.t.add(t), this.u.observe(t, this.l), this.i = !0, this.h.requestUpdate();
    }
    unobserve(t) {
      this.t.delete(t), this.u.unobserve(t);
    }
    disconnect() {
      this.u.disconnect();
    }
  }
  const bs = {
      keyframeOptions: {
        duration: 2e3,
        direction: "alternate",
        composite: "add"
      },
      properties: ["left"]
    },
    _s = {
      keyframeOptions: {
        duration: 100,
        composite: "add"
      },
      properties: ["top"]
    };
  let vs = class extends ut {
    constructor() {
      super(...arguments), this._progressNum = 0, this.animKeyframeGantry = 0, this._isPrinting = !1, this._gantryAnimOptions = () => Object.assign(Object.assign({}, bs), {
        onComplete: this._moveGantry,
        disabled: !(this.dimensions && this._isPrinting)
      }), this._onResizeEvent = () => {
        if (this._rootElement) {
          const t = this._rootElement.clientHeight,
            e = this._rootElement.clientWidth;
          this._setDimensions(e, t);
        }
      }, this._moveGantry = () => {
        this.animKeyframeGantry = this._isPrinting ? Number(!this.animKeyframeGantry) : 0;
      };
    }
    connectedCallback() {
      super.connectedCallback(), this.resizeObserver = new ms(this, {
        callback: this._onResizeEvent
      }), this.dimensions && this._isPrinting && this._moveGantry();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
    }
    willUpdate(t) {
      if (super.willUpdate(t), t.has("scaleFactor") && this._onResizeEvent(), t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        const t = vi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_preview");
        this.imagePreviewUrl !== t && (this.imagePreviewUrl = t, this.imagePreviewBgUrl = this.imagePreviewUrl ? `url('${t}')` : void 0), this._progressNum = Number(yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_progress", 0).state) / 100;
        const e = Ti(yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_state").state.toLowerCase());
        this.dimensions && !this._isPrinting && e && this._moveGantry(), this._isPrinting = e;
      }
    }
    update(t) {
      if (super.update(t), (t.has("dimensions") || t.has("animKeyframeGantry") || t.has("hass")) && this.dimensions) {
        const e = -1 * this._progressNum * this.dimensions.BuildArea.height;
        Qe(this._elAcAPr_xaxis, Object.assign(Object.assign({}, this.dimensions.XAxis), {
          top: this.dimensions.XAxis.top + e
        })), Qe(this._elAcAPr_gantry, Object.assign(Object.assign({}, this.dimensions.Gantry), {
          left: 0 !== this.animKeyframeGantry ? this.dimensions.Gantry.left + this.dimensions.BuildPlate.width : this.dimensions.Gantry.left,
          top: this.dimensions.Gantry.top + e
        })), Qe(this._elAcAPr_animprint, {
          height: 100 * this._progressNum + "%"
        }), t.has("dimensions") && this.dimensions && (Qe(this._elAcAPr_scalable, Object.assign({}, this.dimensions.Scalable)), Qe(this._elAcAPr_frame, Object.assign({}, this.dimensions.Frame)), Qe(this._elAcAPr_hole, Object.assign({}, this.dimensions.Hole)), Qe(this._elAcAPr_buildarea, Object.assign({}, this.dimensions.BuildArea)), Qe(this._elAcAPr_buildplate, Object.assign({}, this.dimensions.BuildPlate)), Qe(this._elAcAPr_nozzle, Object.assign({}, this.dimensions.Nozzle)));
      }
    }
    render() {
      const t = {
        "background-image": this.imagePreviewBgUrl
      };
      return X`
      <div class="ac-printercard-animatedprinter">
        ${this.dimensions ? X` <div class="ac-apr-scalable">
              <div class="ac-apr-frame">
                <div class="ac-apr-hole"></div>
              </div>
              <div class="ac-apr-buildarea">
                <div class="ac-apr-animprint">
                  ${this.imagePreviewBgUrl ? X`
                        <div
                          class="ac-apr-imgprev"
                          style=${Mn(t)}
                        ></div>
                      ` : Z}
                </div>
              </div>
              <div class="ac-apr-buildplate"></div>
              <div
                class="ac-apr-xaxis"
                ${rs(Object.assign({}, _s))}
              ></div>
              <div
                class="ac-apr-gantry"
                ${rs(Object.assign({}, _s))}
                ${rs(this._gantryAnimOptions)}
              >
                <div class="ac-apr-nozzle"></div>
              </div>
            </div>` : Z}
      </div>
    `;
    }
    _setDimensions(t, e) {
      this.dimensions = function (t, e, i) {
        const r = e.height / (t.top.height + t.bottom.height + t.left.height),
          n = e.width / (t.top.width + t.left.width + t.right.width),
          s = new us(Math.min(r, n) * i),
          o = s.val(t.top.width),
          a = s.val(t.top.height + t.bottom.height + t.left.height),
          l = s.val(t.top.width - (t.left.width + t.right.width)),
          c = s.val(t.left.height),
          h = s.val(t.left.width),
          d = s.val(t.top.height),
          p = s.val(t.top.height - t.buildplate.verticalOffset) + c,
          u = p + s.val((t.xAxis.extruder.height - t.xAxis.height) / 2 - (t.xAxis.extruder.height + 12)),
          g = s.val(t.buildplate.maxWidth),
          m = s.val(t.buildplate.maxHeight),
          b = s.val(t.left.width + (s.og(l) - t.buildplate.maxWidth) / 2),
          _ = p - s.val(t.buildplate.maxHeight),
          v = g,
          y = b,
          f = p,
          x = s.val(t.xAxis.width),
          w = s.val(t.xAxis.height),
          E = s.val(t.xAxis.offsetLeft),
          S = x,
          $ = w,
          P = s.val(t.xAxis.extruder.width),
          T = s.val(t.xAxis.extruder.height),
          A = y - P / 2,
          C = A + g,
          D = s.val(12),
          k = s.val(12),
          M = f - T - k;
        return {
          Scalable: {
            width: o,
            height: a
          },
          Frame: {
            width: o,
            height: a
          },
          Hole: {
            width: l,
            height: c,
            left: h,
            top: d
          },
          BuildArea: {
            width: g,
            height: m,
            left: b,
            top: _
          },
          BuildPlate: {
            width: v,
            left: y,
            top: f
          },
          XAxis: {
            width: x,
            height: w,
            left: E,
            top: M + .7 * T - w / 2
          },
          Track: {
            width: S,
            height: $
          },
          Basis: {
            Y: p,
            X: u
          },
          Gantry: {
            width: P,
            height: T,
            left: A,
            top: M
          },
          Nozzle: {
            width: D,
            height: k,
            left: (P - D) / 2,
            top: T
          },
          GantryMaxLeft: C
        };
      }(this.printerConfig, {
        width: t,
        height: e
      }, this.scaleFactor || 1);
    }
    static get styles() {
      return p`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }

      .ac-printercard-animatedprinter {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .ac-apr-scalable {
        position: relative;
      }

      .ac-apr-frame {
        top: 0px;
        left: 0px;
        border-radius: 8px;
        background-color: #bbbbbb;
        position: absolute;
      }

      .ac-apr-hole {
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        border-radius: 8px;
      }

      .ac-apr-buildarea {
        background-color: rgba(0, 0, 0, 0.075);
        box-sizing: border-box;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        border-radius: 8px;
        overflow: hidden;
      }

      .ac-apr-buildplate {
        box-sizing: border-box;
        border-radius: 8px;
        position: absolute;
        background-color: #333333;
        height: 8px;
      }

      .ac-apr-xaxis {
        position: absolute;
        border-radius: 8px;
        background-color: #aaaaaa;
      }

      .ac-apr-animprint {
        background-color: var(--primary-text-color);
        width: 100%;
      }

      .ac-apr-imgprev {
        height: 100%;
        width: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position-y: 100%;
      }

      .ac-apr-gantry {
        background-color: #333333;
        border-radius: 4px;
        box-sizing: border-box;
        position: absolute;
      }

      .ac-apr-nozzle {
        background-color: #aaaaaa;
        position: absolute;
        width: 12px;
        height: 12px;
        clip-path: polygon(100% 0, 100% 50%, 50% 75%, 0 50%, 0 0);
      }
    `;
    }
  };
  n([xt(".ac-printercard-animatedprinter")], vs.prototype, "_rootElement", void 0), n([xt(".ac-apr-scalable")], vs.prototype, "_elAcAPr_scalable", void 0), n([xt(".ac-apr-frame")], vs.prototype, "_elAcAPr_frame", void 0), n([xt(".ac-apr-hole")], vs.prototype, "_elAcAPr_hole", void 0), n([xt(".ac-apr-buildarea")], vs.prototype, "_elAcAPr_buildarea", void 0), n([xt(".ac-apr-animprint")], vs.prototype, "_elAcAPr_animprint", void 0), n([xt(".ac-apr-buildplate")], vs.prototype, "_elAcAPr_buildplate", void 0), n([xt(".ac-apr-xaxis")], vs.prototype, "_elAcAPr_xaxis", void 0), n([xt(".ac-apr-gantry")], vs.prototype, "_elAcAPr_gantry", void 0), n([xt(".ac-apr-nozzle")], vs.prototype, "_elAcAPr_nozzle", void 0), n([vt()], vs.prototype, "hass", void 0), n([vt({
    attribute: "scale-factor"
  })], vs.prototype, "scaleFactor", void 0), n([vt({
    attribute: "printer-config"
  })], vs.prototype, "printerConfig", void 0), n([vt({
    attribute: "printer-entities"
  })], vs.prototype, "printerEntities", void 0), n([vt({
    attribute: "printer-entity-id-part"
  })], vs.prototype, "printerEntityIdPart", void 0), n([yt()], vs.prototype, "dimensions", void 0), n([yt()], vs.prototype, "resizeObserver", void 0), n([yt()], vs.prototype, "_progressNum", void 0), n([yt()], vs.prototype, "animKeyframeGantry", void 0), n([yt()], vs.prototype, "_isPrinting", void 0), n([yt()], vs.prototype, "imagePreviewUrl", void 0), n([yt()], vs.prototype, "imagePreviewBgUrl", void 0), vs = n([ns("anycubic-printercard-animated_printer")], vs);
  let ys = class extends ut {
    constructor() {
      super(...arguments), this._viewClick = () => {
        this.toggleVideo && this.toggleVideo();
      };
    }
    render() {
      return X`
      <div class="ac-printercard-printerview" @click=${this._viewClick}>
        <anycubic-printercard-animated_printer
          .hass=${this.hass}
          .scaleFactor=${this.scaleFactor}
          .printerEntities=${this.printerEntities}
          .printerEntityIdPart=${this.printerEntityIdPart}
          .printerConfig=${gs}
        ></anycubic-printercard-animated_printer>
      </div>
    `;
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }

      .ac-printercard-printerview {
        height: 100%;
        box-sizing: border-box;
      }
    `;
    }
  };
  n([vt()], ys.prototype, "hass", void 0), n([vt({
    attribute: "toggle-video",
    type: Function
  })], ys.prototype, "toggleVideo", void 0), n([vt({
    attribute: "printer-entities"
  })], ys.prototype, "printerEntities", void 0), n([vt({
    attribute: "printer-entity-id-part"
  })], ys.prototype, "printerEntityIdPart", void 0), n([vt({
    attribute: "scale-factor"
  })], ys.prototype, "scaleFactor", void 0), ys = n([ns("anycubic-printercard-printer_view")], ys);
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const fs = (t, e, i) => {
      const r = new Map();
      for (let n = e; n <= i; n++) r.set(t[n], n);
      return r;
    },
    xs = Pn(class extends Tn {
      constructor(t) {
        if (super(t), t.type !== $n) throw Error("repeat() can only be used in text expressions");
      }
      dt(t, e, i) {
        let r;
        void 0 === i ? i = e : void 0 !== e && (r = e);
        const n = [],
          s = [];
        let o = 0;
        for (const e of t) n[o] = r ? r(e, o) : o, s[o] = i(e, o), o++;
        return {
          values: s,
          keys: n
        };
      }
      render(t, e, i) {
        return this.dt(t, e, i).values;
      }
      update(t, [e, i, r]) {
        const n = (t => t._$AH)(t),
          {
            values: s,
            keys: o
          } = this.dt(e, i, r);
        if (!Array.isArray(n)) return this.ut = o, s;
        const a = this.ut ??= [],
          l = [];
        let c,
          h,
          d = 0,
          p = n.length - 1,
          u = 0,
          g = s.length - 1;
        for (; d <= p && u <= g;) if (null === n[d]) d++;else if (null === n[p]) p--;else if (a[d] === o[u]) l[u] = Fn(n[d], s[u]), d++, u++;else if (a[p] === o[g]) l[g] = Fn(n[p], s[g]), p--, g--;else if (a[d] === o[g]) l[g] = Fn(n[d], s[g]), Bn(t, l[g + 1], n[d]), d++, g--;else if (a[p] === o[u]) l[u] = Fn(n[p], s[u]), Bn(t, n[d], n[p]), p--, u++;else if (void 0 === c && (c = fs(o, u, g), h = fs(a, d, p)), c.has(a[d])) {
          if (c.has(a[p])) {
            const e = h.get(o[u]),
              i = void 0 !== e ? n[e] : null;
            if (null === i) {
              const e = Bn(t, n[d]);
              Fn(e, s[u]), l[u] = e;
            } else l[u] = Fn(i, s[u]), Bn(t, n[d], i), n[e] = null;
            u++;
          } else Nn(n[p]), p--;
        } else Nn(n[d]), d++;
        for (; u <= g;) {
          const e = Bn(t, l[g + 1]);
          Fn(e, s[u]), l[u++] = e;
        }
        for (; d <= p;) {
          const t = n[d++];
          null !== t && Nn(t);
        }
        return this.ut = o, ((t, e = Ln) => {
          t._$AH = e;
        })(t, l), K;
      }
    });
  let ws = class extends ut {
    render() {
      const t = {
        width: String(this.progress) + "%"
      };
      return X`
      <div class="ac-stat-line">
        <p class="ac-stat-heading">${this.name}</p>
        <div class="ac-stat-value">
          <div class="ac-progress-bar">
            <div class="ac-stat-text">${this.value}</div>
            <div
              class="ac-progress-line"
              style=${Mn(t)}
            ></div>
          </div>
        </div>
      </div>
    `;
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }

      .ac-stat-line {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 2px 0;
      }

      .ac-stat-value {
        margin: 0;
        display: inline-block;
        max-width: calc(100% - 120px);
        width: 100%;
        position: relative;
      }

      .ac-stat-text {
        margin: 0;
        font-size: 16px;
        display: block;
        position: relative;
        top: 3px;
        left: 0px;
        z-index: 1;
        text-align: center;
      }

      .ac-stat-heading {
        margin: 0;
        font-size: 16px;
        display: block;
        font-weight: bold;
      }

      .ac-progress-bar {
        display: block;
        width: 100%;
        height: 30px;
        background-color: #8b8b8b6e;
        position: relative;
      }

      .ac-progress-line {
        position: absolute;
        top: 0px;
        left: 0px;
        display: block;
        height: 100%;
        background-color: #ee8f36e6;
        border-right: 2px solid #ffd151e6;
        box-shadow: 4px 0px 6px 0px rgb(255 245 126 / 25%);
      }
    `;
    }
  };
  n([vt({
    type: String
  })], ws.prototype, "name", void 0), n([vt({
    type: Number
  })], ws.prototype, "value", void 0), n([vt({
    type: Number
  })], ws.prototype, "progress", void 0), ws = n([ns("anycubic-printercard-progress-line")], ws);
  let Es = class extends ut {
    constructor() {
      super(...arguments), this.unit = "";
    }
    render() {
      return X`
      <div class="ac-stat-line">
        <p class="ac-stat-text ac-stat-heading">${this.name}</p>
        <p class="ac-stat-text">${this.value}${this.unit}</p>
      </div>
    `;
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }

      .ac-stat-line {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 2px 0;
      }

      .ac-stat-text {
        margin: 0;
        font-size: 16px;
        display: inline-block;
        max-width: calc(100% - 120px);
        text-align: right;
        word-wrap: break-word;
      }

      .ac-stat-heading {
        font-weight: bold;
        max-width: unset;
        overflow: unset;
      }
    `;
    }
  };
  n([vt({
    type: String
  })], Es.prototype, "name", void 0), n([vt({
    type: String
  })], Es.prototype, "value", void 0), n([vt({
    type: String
  })], Es.prototype, "unit", void 0), Es = n([ns("anycubic-printercard-stat-line")], Es);
  let Ss = class extends ut {
    render() {
      return X`<anycubic-printercard-stat-line
      .name=${this.name}
      .value=${Hi(this.temperatureEntity, this.temperatureUnit, this.round)}
    ></anycubic-printercard-stat-line>`;
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }
    `;
    }
  };
  n([vt({
    type: String
  })], Ss.prototype, "name", void 0), n([vt({
    attribute: "temperature-entity"
  })], Ss.prototype, "temperatureEntity", void 0), n([vt({
    type: Boolean
  })], Ss.prototype, "round", void 0), n([vt({
    attribute: "temperature-unit",
    type: String
  })], Ss.prototype, "temperatureUnit", void 0), Ss = n([ns("anycubic-printercard-stat-temperature")], Ss);
  let $s = class extends ut {
    constructor() {
      super(...arguments), this.currentTime = 0, this.lastIntervalId = -1;
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("timeEntity") && (-1 !== this.lastIntervalId && clearInterval(this.lastIntervalId), this.currentTime = function (t, e = !1) {
        let i;
        if (t.state) {
          if (t.state.includes(", ")) {
            const [e, r] = t.state.split(", "),
              [n, s, o] = r.split(":"),
              a = e.match(/\d+/);
            i = 60 * +(a ? a[0] : 0) * 60 * 24 + 60 * +n * 60 + 60 * +s + +o;
          } else if (t.state.includes(":")) {
            const [e, r, n] = t.state.split(":");
            i = 60 * +e * 60 + 60 * +r + +n;
          } else i = e ? +t.state : 60 * +t.state;
        } else i = 0;
        return i;
      }(this.timeEntity), this.lastIntervalId = setInterval(() => {
        this._incTime();
      }, 1e3));
    }
    connectedCallback() {
      super.connectedCallback(), -1 === this.lastIntervalId && (this.lastIntervalId = setInterval(() => {
        this._incTime();
      }, 1e3));
    }
    disconnectedCallback() {
      super.disconnectedCallback(), -1 !== this.lastIntervalId && (clearInterval(this.lastIntervalId), this.lastIntervalId = -1);
    }
    render() {
      return X`<anycubic-printercard-stat-line
      .name=${this.name}
      .value=${ki(this.currentTime, this.timeType, this.round, this.use_24hr)}
    ></anycubic-printercard-stat-line>`;
    }
    _incTime() {
      (0 === this.currentTime || this.currentTime && !isNaN(this.currentTime)) && (this.currentTime = Number(this.currentTime) + this.direction);
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }
    `;
    }
  };
  n([vt({
    attribute: "time-entity"
  })], $s.prototype, "timeEntity", void 0), n([vt({
    attribute: "time-type"
  })], $s.prototype, "timeType", void 0), n([vt({
    type: String
  })], $s.prototype, "name", void 0), n([vt({
    type: Number
  })], $s.prototype, "direction", void 0), n([vt({
    type: Boolean
  })], $s.prototype, "round", void 0), n([vt({
    type: Boolean
  })], $s.prototype, "use_24hr", void 0), n([vt({
    attribute: "is-seconds",
    type: Boolean
  })], $s.prototype, "isSeconds", void 0), n([yt()], $s.prototype, "currentTime", void 0), n([yt()], $s.prototype, "lastIntervalId", void 0), $s = n([ns("anycubic-printercard-stat-time")], $s);
  let Ps = class extends ut {
    constructor() {
      super(...arguments), this.round = !0, this.temperatureUnit = je.C, this.progressPercent = 0, this._valDryProgress = 0;
    }
    willUpdate(t) {
      var e;
      if (super.willUpdate(t), t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        this._entETA = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_time_remaining"), this._entElapsed = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_time_elapsed"), this._entRemaining = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_time_remaining"), this._entBedCurrent = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "hotbed_temperature"), this._entHotendCurrent = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "nozzle_temperature"), this._entBedTarget = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_hotbed_temperature"), this._entHotendTarget = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_nozzle_temperature"), this._entAceTempCurrent = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "ace_current_temperature"), this._entAceTempTarget = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "dry_status_target_temperature"), this._valStatus = ti(yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_state").state), this._valOnline = xi(this.hass, this.printerEntities, this.printerEntityIdPart, "printer_online", "Online", "Offline", "unknown"), this._valAvailability = ti(yi(this.hass, this.printerEntities, this.printerEntityIdPart, "current_status").state), this._valJobName = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_name").state, this._valCurrentLayer = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_current_layer").state;
        const t = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_speed_mode", "", {
            available_modes: [],
            print_speed_mode_code: -1
          }),
          i = Bi(t),
          r = null !== (e = t.attributes.print_speed_mode_code) && void 0 !== e ? e : 0;
        this._valSpeedMode = r >= 0 && r in i ? i[r] : "Unknown", this._valFanSpeed = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "fan_speed", 0).state, this._valDryStatus = xi(this.hass, this.printerEntities, this.printerEntityIdPart, "dry_status_is_drying", this._labelDrying, this._labelNotDrying, this._labelUnknownState);
        const n = Number(yi(this.hass, this.printerEntities, this.printerEntityIdPart, "dry_status_total_duration", 0).state),
          s = Number(yi(this.hass, this.printerEntities, this.printerEntityIdPart, "dry_status_remaining_time", 0).state);
        this._valDryRemain = isNaN(s) ? "" : `${s} Mins`, this._valDryProgress = !isNaN(n) && n > 0 ? s / n * 100 : 0, this._valOnTime = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_on_time", 0).state, this._valOffTime = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_off_time", 0).state, this._valBottomTime = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_bottom_time", 0).state, this._valModelHeight = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_model_height", 0).state, this._valBottomLayers = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_bottom_layers", 0).state, this._valZUpHeight = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_z_up_height", 0).state, this._valZUpSpeed = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_z_up_speed", 0).state, this._valZDownSpeed = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_z_down_speed", 0).state;
      }
      (t.has("language") || t.has("monitoredStats")) && (this._statTranslations = this.monitoredStats.reduce((t, e) => (t[e] = wn(`card.monitored_stats.${e}`, this.language), t), {})), t.has("language") && (this._labelDrying = wn("card.drying_settings.state_drying", this.language), this._labelNotDrying = wn("card.drying_settings.state_not_drying", this.language), this._labelUnknownState = wn("common.states.unknown", this.language));
    }
    render() {
      return X`
      <div class="ac-stats-box ac-stats-section">
        ${this.showPercent ? X`
              <div class="ac-stats-box ac-stats-part-percent">
                <p class="ac-stats-part-percent-text">
                  ${this.round ? Math.round(this.progressPercent) : this.progressPercent}%
                </p>
              </div>
            ` : null}
        <div class="ac-stats-box ac-stats-section">${this._renderStats()}</div>
      </div>
    `;
    }
    _renderStats() {
      return xs(this.monitoredStats, t => t, (t, e) => {
        switch (t) {
          case We.Status:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valStatus}
              ></anycubic-printercard-stat-line>
            `;
          case We.ETA:
            return X`
              <anycubic-printercard-stat-time
                .timeEntity=${this._entETA}
                .timeType=${t}
                .name=${this._statTranslations[t]}
                .direction=${0}
                .round=${this.round}
                .use_24hr=${this.use_24hr}
              ></anycubic-printercard-stat-time>
            `;
          case We.Elapsed:
            return X`
              <anycubic-printercard-stat-time
                .timeEntity=${this._entElapsed}
                .timeType=${t}
                .name=${this._statTranslations[t]}
                .direction=${1}
                .round=${this.round}
                .use_24hr=${this.use_24hr}
              ></anycubic-printercard-stat-time>
            `;
          case We.Remaining:
            return X`
              <anycubic-printercard-stat-time
                .timeEntity=${this._entRemaining}
                .timeType=${t}
                .name=${this._statTranslations[t]}
                .direction=${-1}
                .round=${this.round}
                .use_24hr=${this.use_24hr}
              ></anycubic-printercard-stat-time>
            `;
          case We.BedCurrent:
            return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entBedCurrent}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;
          case We.HotendCurrent:
            return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entHotendCurrent}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;
          case We.BedTarget:
            return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entBedTarget}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;
          case We.HotendTarget:
            return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entHotendTarget}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;
          case We.AceTempCurrent:
            return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entAceTempCurrent}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;
          case We.AceTempTarget:
            return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entAceTempTarget}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;
          case We.PrinterOnline:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valOnline}
              ></anycubic-printercard-stat-line>
            `;
          case We.Availability:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valAvailability}
              ></anycubic-printercard-stat-line>
            `;
          case We.ProjectName:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valJobName}
              ></anycubic-printercard-stat-line>
            `;
          case We.CurrentLayer:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valCurrentLayer}
              ></anycubic-printercard-stat-line>
            `;
          case We.SpeedMode:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valSpeedMode}
              ></anycubic-printercard-stat-line>
            `;
          case We.FanSpeed:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valFanSpeed}
                .unit=${"%"}
              ></anycubic-printercard-stat-line>
            `;
          case We.DryingStatus:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valDryStatus}
              ></anycubic-printercard-stat-line>
            `;
          case We.DryingTime:
            return X`
              <anycubic-printercard-progress-line
                .name=${this._statTranslations[t]}
                .value=${this._valDryRemain}
                .progress=${this._valDryProgress}
              ></anycubic-printercard-progress-line>
            `;
          case We.OnTime:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valOnTime}
                .unit=${"s"}
              ></anycubic-printercard-stat-line>
            `;
          case We.OffTime:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valOffTime}
                .unit=${"s"}
              ></anycubic-printercard-stat-line>
            `;
          case We.BottomTime:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valBottomTime}
                .unit=${"s"}
              ></anycubic-printercard-stat-line>
            `;
          case We.ModelHeight:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valModelHeight}
                .unit=${"mm"}
              ></anycubic-printercard-stat-line>
            `;
          case We.BottomLayers:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valBottomLayers}
                .unit=${"layers"}
              ></anycubic-printercard-stat-line>
            `;
          case We.ZUpHeight:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valZUpHeight}
                .unit=${"mm"}
              ></anycubic-printercard-stat-line>
            `;
          case We.ZUpSpeed:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valZUpSpeed}
              ></anycubic-printercard-stat-line>
            `;
          case We.ZDownSpeed:
            return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valZDownSpeed}
              ></anycubic-printercard-stat-line>
            `;
          default:
            return X`
              <anycubic-printercard-stat-line
                .name=${"Unknown"}
                .value=${"<unknown>"}
              ></anycubic-printercard-stat-line>
            `;
        }
      });
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }

      .ac-stats-box {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .ac-stats-section {
        flex-direction: column;
        justify-content: center;
      }

      .ac-stats-part-percent {
        justify-content: center;
        margin-bottom: 20px;
      }
      .ac-stats-part-percent-text {
        margin: 0px;
        font-size: 42px;
        font-weight: bold;
        height: 44px;
        line-height: 44px;
      }
    `;
    }
  };
  n([vt()], Ps.prototype, "hass", void 0), n([vt()], Ps.prototype, "language", void 0), n([vt({
    attribute: "monitored-stats"
  })], Ps.prototype, "monitoredStats", void 0), n([vt({
    attribute: "show-percent",
    type: Boolean
  })], Ps.prototype, "showPercent", void 0), n([vt({
    type: Boolean
  })], Ps.prototype, "round", void 0), n([vt({
    type: Boolean
  })], Ps.prototype, "use_24hr", void 0), n([vt({
    attribute: "temperature-unit",
    type: String
  })], Ps.prototype, "temperatureUnit", void 0), n([vt({
    attribute: "printer-entities"
  })], Ps.prototype, "printerEntities", void 0), n([vt({
    attribute: "printer-entity-id-part"
  })], Ps.prototype, "printerEntityIdPart", void 0), n([vt({
    attribute: "progress-percent"
  })], Ps.prototype, "progressPercent", void 0), n([yt()], Ps.prototype, "_statTranslations", void 0), n([yt()], Ps.prototype, "_labelDrying", void 0), n([yt()], Ps.prototype, "_labelNotDrying", void 0), n([yt()], Ps.prototype, "_labelUnknownState", void 0), n([yt()], Ps.prototype, "_entETA", void 0), n([yt()], Ps.prototype, "_entElapsed", void 0), n([yt()], Ps.prototype, "_entRemaining", void 0), n([yt()], Ps.prototype, "_entBedCurrent", void 0), n([yt()], Ps.prototype, "_entHotendCurrent", void 0), n([yt()], Ps.prototype, "_entBedTarget", void 0), n([yt()], Ps.prototype, "_entHotendTarget", void 0), n([yt()], Ps.prototype, "_entAceTempCurrent", void 0), n([yt()], Ps.prototype, "_entAceTempTarget", void 0), n([yt()], Ps.prototype, "_valStatus", void 0), n([yt()], Ps.prototype, "_valOnline", void 0), n([yt()], Ps.prototype, "_valAvailability", void 0), n([yt()], Ps.prototype, "_valJobName", void 0), n([yt()], Ps.prototype, "_valCurrentLayer", void 0), n([yt()], Ps.prototype, "_valSpeedMode", void 0), n([yt()], Ps.prototype, "_valFanSpeed", void 0), n([yt()], Ps.prototype, "_valDryStatus", void 0), n([yt()], Ps.prototype, "_valDryRemain", void 0), n([yt()], Ps.prototype, "_valDryProgress", void 0), n([yt()], Ps.prototype, "_valOnTime", void 0), n([yt()], Ps.prototype, "_valOffTime", void 0), n([yt()], Ps.prototype, "_valBottomTime", void 0), n([yt()], Ps.prototype, "_valModelHeight", void 0), n([yt()], Ps.prototype, "_valBottomLayers", void 0), n([yt()], Ps.prototype, "_valZUpHeight", void 0), n([yt()], Ps.prototype, "_valZUpSpeed", void 0), n([yt()], Ps.prototype, "_valZDownSpeed", void 0), Ps = n([ns("anycubic-printercard-stats-component")], Ps);
  const Ts = p`
  :host {
    display: none;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(3px);
  }

  .ac-modal-container {
    border-radius: 16px;
    background-color: var(--primary-background-color);
    margin: auto;
    padding: 50px;
    width: 80%;
    min-height: 150px;
    max-width: 600px;
    margin-top: 50px;
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.3);
  }

  .ac-modal-card {
    padding: 20px;
  }
  .ac-modal-close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .ac-modal-close:hover,
  .ac-modal-close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .ac-modal-label {
  }

  @media (max-width: 599px) {
    .ac-modal-container {
      width: 95%;
      padding: 6px;
    }
  }
`;
  let As = class extends ut {
    constructor() {
      super(...arguments), this._isActive = !1, this._setActive = () => {
        this._isActive = !0;
      }, this._setInactive = () => {
        this._isActive = !1;
      };
    }
    render() {
      const t = {
        filter: this._isActive ? "brightness(80%)" : "brightness(100%)"
      };
      return X`
      <button
        class="ac-ui-seld-select"
        style=${Mn(t)}
        @mouseenter=${this._setActive}
        @mousedown=${this._setActive}
        @mouseup=${this._setInactive}
        @mouseleave=${this._setInactive}
      >
        ${this.item}
      </button>
    `;
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }

      .ac-ui-seld-select {
        width: 100%;
        border: none;
        outline: none;
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        padding: 0 16px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: bold;
        line-height: 48px;
        text-align: left;
        cursor: pointer;
        color: var(--primary-text-color);
      }
    `;
    }
  };
  n([vt()], As.prototype, "item", void 0), n([yt()], As.prototype, "_isActive", void 0), As = n([ns("anycubic-ui-select-dropdown-item")], As);
  let Cs = class extends ut {
    constructor() {
      super(...arguments), this._active = !1, this._hidden = !1, this._showOptions = () => {
        this._hidden = !1;
      }, this._hideOptions = () => {
        this._hidden = !0;
      }, this._setActive = () => {
        this._active = !0;
      }, this._setInactive = () => {
        this._active = !1;
      }, this._selectItem = t => {
        if (!this.availableOptions) return;
        const e = t.currentTarget.item_key;
        this._selectedItem = this.availableOptions[e], Ne(this, "ac-select-dropdown", {
          key: e,
          value: this.availableOptions[e]
        }), this._hidden = !0;
      };
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("initialItem") && (this._selectedItem = this.initialItem);
    }
    async firstUpdated() {
      this._hidden = !0, this._active = !1, this.requestUpdate();
    }
    render() {
      const t = {
          backgroundColor: this._active ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)"
        },
        e = {
          opacity: this._hidden ? 0 : 1,
          transform: this._hidden ? "scaleY(0.0)" : "scaleY(1.0)"
        };
      return this.availableOptions ? X`
          <button
            class="ac-ui-select-button"
            style=${Mn(t)}
            @click=${this._showOptions}
            @mouseenter=${this._setActive}
            @mouseleave=${this._setInactive}
          >
            ${this._selectedItem ? this._selectedItem : this.placeholder}
            <ha-svg-icon .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}></ha-svg-icon>
          </button>
          <div class="ac-ui-select-options" style=${Mn(e)}>
            ${this._renderOptions()}
          </div>
        ` : Z;
    }
    _renderOptions() {
      return Cn(Object.keys(this.availableOptions), (t, e) => X`
          <anycubic-ui-select-dropdown-item
            .item=${this.availableOptions[t]}
            .item_key=${t}
            @click=${this._selectItem}
          ></anycubic-ui-select-dropdown-item>
        `);
    }
    static get styles() {
      return p`
      :host {
        box-sizing: border-box;
        width: 100%;
        position: relative;
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        border-radius: 8px;
      }

      .ac-ui-select-button {
        width: 100%;
        border: none;
        outline: none;
        padding: 0 16px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: bold;
        line-height: 48px;
        border-radius: 8px;
        text-align: left;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: rgba(0, 0, 0, 0.05);
        align-items: center;
        color: var(--primary-text-color);
      }

      .ac-ui-select-options {
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        overflow: hidden;
        box-shadow:
          0px 10px 20px rgba(0, 0, 0, 0.19),
          0px 6px 6px rgba(0, 0, 0, 0.23);
        z-index: 11;
        opacity: 0;
        transform: scaleY(0);
        transform-origin: top center;
      }
    `;
    }
  };
  n([vt({
    attribute: "available-options"
  })], Cs.prototype, "availableOptions", void 0), n([vt()], Cs.prototype, "placeholder", void 0), n([vt({
    attribute: "initial-item"
  })], Cs.prototype, "initialItem", void 0), n([yt()], Cs.prototype, "_selectedItem", void 0), n([yt()], Cs.prototype, "_active", void 0), n([yt()], Cs.prototype, "_hidden", void 0), Cs = n([ns("anycubic-ui-select-dropdown")], Cs);
  const Ds = {
      keyframeOptions: {
        duration: 250,
        direction: "alternate",
        easing: "ease-in-out"
      },
      properties: ["height", "opacity", "scale"]
    },
    ks = "drying_start_preset_1",
    Ms = "drying_start_preset_2",
    Hs = "drying_start_preset_3",
    Is = "drying_start_preset_4",
    Bs = "drying_start_preset_5",
    Fs = "dry_stop",
    Ls = "drying_temperature_input",
    Ns = "drying_time_input",
    Os = "dry_start_custom",
    Rs = "secondary_",
    Us = Rs + ks,
    zs = Rs + Ms,
    js = Rs + Hs,
    Gs = Rs + Is,
    Vs = Rs + Bs,
    qs = Fs,
    Ys = Rs + Ls,
    Ws = Rs + Ns,
    Xs = Os;
  let Ks = class extends ut {
    constructor() {
      super(...arguments), this.inline = !1, this.box_id = 0, this._dryingPresetId1 = ks, this._dryingPresetId2 = Ms, this._dryingPresetId3 = Hs, this._dryingPresetId4 = Is, this._dryingPresetId5 = Bs, this._dryingStopId = Fs, this._customTempId = Ls, this._customDurationId = Ns, this._customStartId = Os, this._hasDryingPreset1 = !1, this._hasDryingPreset2 = !1, this._hasDryingPreset3 = !1, this._hasDryingPreset4 = !1, this._hasDryingPreset5 = !1, this._hasDryingStop = !1, this._hasCustomDrying = !1, this._dryingPresetTemp1 = "", this._dryingPresetDur1 = "", this._dryingPresetTemp2 = "", this._dryingPresetDur2 = "", this._dryingPresetTemp3 = "", this._dryingPresetDur3 = "", this._dryingPresetTemp4 = "", this._dryingPresetDur4 = "", this._dryingPresetTemp5 = "", this._dryingPresetDur5 = "", this._customTemp = 50, this._customTempMin = 40, this._customTempMax = 70, this._userEditCustomTemp = !1, this._customDuration = 240, this._customDurationMin = 30, this._customDurationMax = 480, this._userEditCustomDuration = !1, this._startingCustomDrying = !1, this._isOpen = !1, this._handleDryingPreset1 = () => {
        this._pressHassButton(this._dryingPresetId1), this._closeModal();
      }, this._handleDryingPreset2 = () => {
        this._pressHassButton(this._dryingPresetId2), this._closeModal();
      }, this._handleDryingPreset3 = () => {
        this._pressHassButton(this._dryingPresetId3), this._closeModal();
      }, this._handleDryingPreset4 = () => {
        this._pressHassButton(this._dryingPresetId4), this._closeModal();
      }, this._handleDryingPreset5 = () => {
        this._pressHassButton(this._dryingPresetId5), this._closeModal();
      }, this._handleDryingStop = () => {
        this._pressHassButton(this._dryingStopId), this._closeModal();
      }, this._handleCustomTempChange = t => {
        const e = t.currentTarget.value;
        this._customTemp = Number(e), this._userEditCustomTemp = !0;
      }, this._handleCustomDurationChange = t => {
        const e = t.currentTarget.value;
        this._customDuration = Number(e), this._userEditCustomDuration = !0;
      }, this._handleStartCustomDrying = () => {
        const t = li(this.printerEntities, this.printerEntityIdPart, "number", this._customTempId),
          e = li(this.printerEntities, this.printerEntityIdPart, "number", this._customDurationId);
        t && e && (this._startingCustomDrying = !0, Promise.all([this.hass.callService("number", "set_value", {
          entity_id: t.entity_id,
          value: this._customTemp
        }), this.hass.callService("number", "set_value", {
          entity_id: e.entity_id,
          value: this._customDuration
        })]).then(() => {
          this._pressHassButton(this._customStartId);
        }).then(() => {
          this._startingCustomDrying = !1, this._userEditCustomTemp = !1, this._userEditCustomDuration = !1;
        }).catch(t => {
          this._startingCustomDrying = !1;
        }), this._closeModal());
      }, this._handleModalEvent = t => {
        const e = t;
        e.stopPropagation(), e.detail.modalOpen && (this._isOpen = !0, this.box_id = Number(e.detail.box_id));
      }, this._closeModal = t => {
        t && t.stopPropagation(), this._isOpen = !1, this.box_id = 0;
      }, this._cardClick = t => {
        t.stopPropagation();
      };
    }
    async firstUpdated() {
      this.inline || this.addEventListener("click", t => {
        this._closeModal(t);
      });
    }
    connectedCallback() {
      var t;
      super.connectedCallback(), this.inline || null === (t = this.parentElement) || void 0 === t || t.addEventListener("ac-mcbdry-modal", this._handleModalEvent);
    }
    disconnectedCallback() {
      var t;
      this.inline || null === (t = this.parentElement) || void 0 === t || t.removeEventListener("ac-mcbdry-modal", this._handleModalEvent), super.disconnectedCallback();
    }
    willUpdate(t) {
      var e, i, r, n;
      if (super.willUpdate(t), t.has("language") && (this._heading = wn("card.drying_settings.heading", this.language), this._buttonTextPreset = wn("card.drying_settings.button_preset", this.language), this._buttonTextMinutes = wn("card.drying_settings.button_minutes", this.language), this._buttonStopDrying = wn("card.drying_settings.button_stop_drying", this.language), this._hintNothingAvailable = wn("card.drying_settings.hint_nothing_available", this.language), this._customHeading = wn("card.drying_settings.custom_heading", this.language), this._customLabelTemp = wn("card.drying_settings.custom_label_temp", this.language), this._customLabelDuration = wn("card.drying_settings.custom_label_duration", this.language), this._customButtonStart = wn("card.drying_settings.custom_button_start", this.language)), t.has("box_id") && (1 === this.box_id ? (this._dryingPresetId1 = Us, this._dryingPresetId2 = zs, this._dryingPresetId3 = js, this._dryingPresetId4 = Gs, this._dryingPresetId5 = Vs, this._dryingStopId = qs, this._customTempId = Ys, this._customDurationId = Ws, this._customStartId = Xs) : (this._dryingPresetId1 = ks, this._dryingPresetId2 = Ms, this._dryingPresetId3 = Hs, this._dryingPresetId4 = Is, this._dryingPresetId5 = Bs, this._dryingStopId = Fs, this._customTempId = Ls, this._customDurationId = Ns, this._customStartId = Os)), t.has("hass") || t.has("selectedPrinterDevice") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        const t = bi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId1);
        this._hasDryingPreset1 = _i(t), this._dryingPresetTemp1 = String(t.attributes.temperature), this._dryingPresetDur1 = String(t.attributes.duration);
        const s = bi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId2);
        this._hasDryingPreset2 = _i(s), this._dryingPresetTemp2 = String(s.attributes.temperature), this._dryingPresetDur2 = String(s.attributes.duration);
        const o = bi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId3);
        this._hasDryingPreset3 = _i(o), this._dryingPresetTemp3 = String(o.attributes.temperature), this._dryingPresetDur3 = String(o.attributes.duration);
        const a = bi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId4);
        this._hasDryingPreset4 = _i(a), this._dryingPresetTemp4 = String(a.attributes.temperature), this._dryingPresetDur4 = String(a.attributes.duration);
        const l = bi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId5);
        this._hasDryingPreset5 = _i(l), this._dryingPresetTemp5 = String(l.attributes.temperature), this._dryingPresetDur5 = String(l.attributes.duration);
        const c = bi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingStopId);
        this._hasDryingStop = _i(c);
        const h = bi(this.hass, this.printerEntities, this.printerEntityIdPart, this._customStartId);
        if (this._hasCustomDrying = _i(h), !this._userEditCustomTemp) {
          const t = wi(this.hass, this.printerEntities, this.printerEntityIdPart, this._customTempId, 50, {
            min: 40,
            max: 70
          });
          this._customTemp = Number(t.state), this._customTempMin = Number(null !== (e = t.attributes.min) && void 0 !== e ? e : 40), this._customTempMax = Number(null !== (i = t.attributes.max) && void 0 !== i ? i : 70);
        }
        if (!this._userEditCustomDuration) {
          const t = wi(this.hass, this.printerEntities, this.printerEntityIdPart, this._customDurationId, 240, {
            min: 30,
            max: 480
          });
          this._customDuration = Number(t.state), this._customDurationMin = Number(null !== (r = t.attributes.min) && void 0 !== r ? r : 30), this._customDurationMax = Number(null !== (n = t.attributes.max) && void 0 !== n ? n : 480);
        }
      }
    }
    update(t) {
      super.update(t), this.inline || this._isOpen ? this.style.display = "block" : this.style.display = "none";
    }
    render() {
      if (this.inline) return X`<div class="ac-drying-inline">${this._renderCard()}</div>`;
      return X`
      <div
        class="ac-modal-container"
        style=${Mn({
        height: "auto",
        opacity: 1,
        scale: 1
      })}
        ${rs(Object.assign({}, Ds))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this._renderCard()}
        </div>
      </div>
    `;
    }
    _renderCard() {
      const t = !(this._hasDryingPreset1 || this._hasDryingPreset2 || this._hasDryingPreset3 || this._hasDryingPreset4 || this._hasDryingPreset5 || this._hasDryingStop || this._hasCustomDrying);
      return X`
      <div>
        <div class="ac-drying-header">${this._heading}</div>
        ${t ? X`<p class="ac-drying-hint">${this._hintNothingAvailable}</p>` : Z}
        <div class="ac-drying-buttonscont">
          ${this._hasDryingPreset1 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset1}>
                    ${this._buttonTextPreset} 1<br />
                    ${this._dryingPresetDur1} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp1}°C
                  </ha-control-button>
                </div>
              ` : Z}
          ${this._hasDryingPreset2 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset2}>
                    ${this._buttonTextPreset} 2<br />
                    ${this._dryingPresetDur2} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp2}°C
                  </ha-control-button>
                </div>
              ` : Z}
          ${this._hasDryingPreset3 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset3}>
                    ${this._buttonTextPreset} 3<br />
                    ${this._dryingPresetDur3} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp3}°C
                  </ha-control-button>
                </div>
              ` : Z}
          ${this._hasDryingPreset4 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset4}>
                    ${this._buttonTextPreset} 4<br />
                    ${this._dryingPresetDur4} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp4}°C
                  </ha-control-button>
                </div>
              ` : Z}
          ${this._hasDryingPreset5 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset5}>
                    ${this._buttonTextPreset} 5<br />
                    ${this._dryingPresetDur5} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp5}°C
                  </ha-control-button>
                </div>
              ` : Z}
          ${this._hasDryingStop ? X`
                <div class="ac-flex-break"></div>
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingStop}>
                    ${this._buttonStopDrying}
                  </ha-control-button>
                </div>
              ` : Z}
        </div>
        ${this._hasCustomDrying ? this._renderCustomDrying() : Z}
      </div>
    `;
    }
    _renderCustomDrying() {
      return X`
      <div class="ac-flex-break"></div>
      <div class="ac-custom-drying-header">${this._customHeading}</div>
      <div class="ac-custom-drying-row">
        <div class="ac-input-group">
          <label class="ac-input-label">${this._customLabelTemp}</label>
          <input
            class="ac-number-input"
            type="number"
            min=${this._customTempMin}
            max=${this._customTempMax}
            .value=${String(this._customTemp)}
            placeholder=${this._customTemp}
            @input=${this._handleCustomTempChange}
          />
        </div>
        <div class="ac-input-group">
          <label class="ac-input-label">${this._customLabelDuration}</label>
          <input
            class="ac-number-input"
            type="number"
            min=${this._customDurationMin}
            max=${this._customDurationMax}
            .value=${String(this._customDuration)}
            placeholder=${this._customDuration}
            @input=${this._handleCustomDurationChange}
          />
        </div>
      </div>
      <div class="ac-custom-drying-row">
        <ha-control-button
          .disabled=${this._startingCustomDrying}
          @click=${this._handleStartCustomDrying}
        >
          ${this._customButtonStart}
        </ha-control-button>
      </div>
    `;
    }
    _pressHassButton(t) {
      const e = li(this.printerEntities, this.printerEntityIdPart, "button", t);
      e && this.hass.callService("button", "press", {
        entity_id: e.entity_id
      }).then().catch(t => {});
    }
    static get styles() {
      return p`
      ${Ts}

      :host([inline]) {
        display: block;
        position: static;
        z-index: auto;
        left: auto;
        top: auto;
        width: 100%;
        height: auto;
        overflow: visible;
        background-color: transparent;
        backdrop-filter: none;
      }

      .ac-drying-inline {
        width: 100%;
        box-sizing: border-box;
      }

      .ac-drying-inline .ac-drying-header {
        font-size: 16px;
        margin-bottom: 8px;
      }

      .ac-drying-hint {
        font-size: 13px;
        color: var(--secondary-text-color, #7f7f7f);
        margin: 0px 0px 12px 0px;
      }

      .ac-drying-inline .ac-drying-buttoncont {
        width: 100%;
        padding: 4px 0px;
      }

      .ac-drying-header {
        font-size: 24px;
        text-align: center;
        font-weight: 600;
      }

      ha-control-button {
        min-width: 150px;
        font-size: 14px;
        min-height: 55px;
        width: 100%;
        box-sizing: border-box;
      }

      .ac-flex-break {
        flex-basis: 100%;
        height: 0;
      }

      .ac-drying-buttonscont {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        align-items: center;
        justify-content: center;
      }

      .ac-drying-buttoncont {
        width: 50%;
        margin: 0;
        position: relative;
        box-sizing: border-box;
        padding: 10px;
      }

      .ac-custom-drying-header {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        margin: 20px 0px 10px 0px;
      }

      .ac-custom-drying-row {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-bottom: 10px;
      }

      .ac-custom-drying-row .ac-input-group {
        min-width: 120px;
      }

      .ac-custom-drying-row ha-control-button {
        width: 100%;
      }

      .ac-input-label {
        font-size: 12px;
        color: var(--secondary-text-color, #7f7f7f);
        margin-bottom: 4px;
        display: block;
      }

      .ac-number-input {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 0px 12px;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #ccc);
        background-color: var(
          --card-background-color,
          var(--primary-background-color, white)
        );
        color: var(--primary-text-color);
      }

      .ac-number-input:focus {
        outline: none;
        border-color: var(--primary-color, #03a9f4);
      }
    `;
    }
  };
  n([vt()], Ks.prototype, "hass", void 0), n([vt()], Ks.prototype, "language", void 0), n([vt({
    attribute: "selected-printer-device"
  })], Ks.prototype, "selectedPrinterDevice", void 0), n([vt({
    attribute: "printer-entities"
  })], Ks.prototype, "printerEntities", void 0), n([vt({
    attribute: "printer-entity-id-part"
  })], Ks.prototype, "printerEntityIdPart", void 0), n([vt({
    type: Boolean,
    reflect: !0
  })], Ks.prototype, "inline", void 0), n([vt({
    type: Number
  })], Ks.prototype, "box_id", void 0), n([yt()], Ks.prototype, "_dryingPresetId1", void 0), n([yt()], Ks.prototype, "_dryingPresetId2", void 0), n([yt()], Ks.prototype, "_dryingPresetId3", void 0), n([yt()], Ks.prototype, "_dryingPresetId4", void 0), n([yt()], Ks.prototype, "_dryingPresetId5", void 0), n([yt()], Ks.prototype, "_dryingStopId", void 0), n([yt()], Ks.prototype, "_customTempId", void 0), n([yt()], Ks.prototype, "_customDurationId", void 0), n([yt()], Ks.prototype, "_customStartId", void 0), n([yt()], Ks.prototype, "_hasDryingPreset1", void 0), n([yt()], Ks.prototype, "_hasDryingPreset2", void 0), n([yt()], Ks.prototype, "_hasDryingPreset3", void 0), n([yt()], Ks.prototype, "_hasDryingPreset4", void 0), n([yt()], Ks.prototype, "_hasDryingPreset5", void 0), n([yt()], Ks.prototype, "_hasDryingStop", void 0), n([yt()], Ks.prototype, "_hasCustomDrying", void 0), n([yt()], Ks.prototype, "_dryingPresetTemp1", void 0), n([yt()], Ks.prototype, "_dryingPresetDur1", void 0), n([yt()], Ks.prototype, "_dryingPresetTemp2", void 0), n([yt()], Ks.prototype, "_dryingPresetDur2", void 0), n([yt()], Ks.prototype, "_dryingPresetTemp3", void 0), n([yt()], Ks.prototype, "_dryingPresetDur3", void 0), n([yt()], Ks.prototype, "_dryingPresetTemp4", void 0), n([yt()], Ks.prototype, "_dryingPresetDur4", void 0), n([yt()], Ks.prototype, "_dryingPresetTemp5", void 0), n([yt()], Ks.prototype, "_dryingPresetDur5", void 0), n([yt()], Ks.prototype, "_customTemp", void 0), n([yt()], Ks.prototype, "_customTempMin", void 0), n([yt()], Ks.prototype, "_customTempMax", void 0), n([yt()], Ks.prototype, "_userEditCustomTemp", void 0), n([yt()], Ks.prototype, "_customDuration", void 0), n([yt()], Ks.prototype, "_customDurationMin", void 0), n([yt()], Ks.prototype, "_customDurationMax", void 0), n([yt()], Ks.prototype, "_userEditCustomDuration", void 0), n([yt()], Ks.prototype, "_startingCustomDrying", void 0), n([yt()], Ks.prototype, "_isOpen", void 0), n([yt()], Ks.prototype, "_heading", void 0), n([yt()], Ks.prototype, "_buttonTextPreset", void 0), n([yt()], Ks.prototype, "_buttonTextMinutes", void 0), n([yt()], Ks.prototype, "_buttonStopDrying", void 0), n([yt()], Ks.prototype, "_hintNothingAvailable", void 0), n([yt()], Ks.prototype, "_customHeading", void 0), n([yt()], Ks.prototype, "_customLabelTemp", void 0), n([yt()], Ks.prototype, "_customLabelDuration", void 0), n([yt()], Ks.prototype, "_customButtonStart", void 0), Ks = n([ns("anycubic-printercard-multicolorbox_modal_drying")], Ks);
  const Zs = t => to(255, Math.round(Number(t))),
    Qs = t => Zs(255 * t),
    Js = t => to(1, t / 255),
    to = (t, e) => Math.max(0, Math.min(t, e)),
    eo = t => void 0 === t ? 1 : ("string" == typeof t && t.indexOf("%") > 0 && (t = Number(t.split("%")[0]) / 100), t = Number(Number(t).toFixed(3)), isNaN(t) ? 1 : to(1, t)),
    io = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgrey: "#A9A9A9",
      darkgreen: "#006400",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      grey: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgrey: "#D3D3D3",
      lightgreen: "#90EE90",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32"
    };
  class ro {
    constructor(t, e, i, r) {
      return ro.isBaseConstructor(t) ? (this.r = Zs(t.r), this.g = Zs(t.g), this.b = Zs(t.b), void 0 !== t.a && (this.a = eo(t.a)), this) : ro.parse(t, e, i, r);
    }
    static parse(t, e, i, r) {
      if (ro.isBaseConstructor(t)) return new ro(t);
      if (void 0 !== e && void 0 !== i) {
        let n = Zs(t);
        return e = Zs(e), i = Zs(i), void 0 !== r && (r = eo(r)), new ro({
          r: n,
          g: e,
          b: i,
          a: r
        });
      }
      if (Array.isArray(t)) return ro.fromArray(t);
      if ("string" == typeof t) {
        let i;
        if (void 0 !== e && Number(e) <= 1 && Number(e) >= 0 && (i = Number(e)), t.startsWith("#")) return ro.fromHex(t, i);
        if (io[t.toLowerCase()]) return ro.fromNamed(t, i);
        if (t.startsWith("rgb")) return ro.fromRgbString(t);
        if ("transparent" === t) {
          let t, e, i, r;
          return t = e = i = r = 0, new ro({
            r: t,
            g: e,
            b: i,
            a: r
          });
        }
        return null;
      }
      if ("object" == typeof t) {
        if (void 0 !== t.a && (this.a = eo(t.a)), void 0 !== t.h) {
          let e = {};
          if (void 0 !== t.v) e = ro.fromHsv(t);else {
            if (void 0 === t.l) return ro.fromArray([0, 0, 0]);
            e = ro.fromHsl(t);
          }
          return e.a = void 0 !== t.a ? eo(t.a) : void 0, new ro(e);
        }
        return void 0 !== t.c ? ro.fromCMYK(t) : this;
      }
      return ro.fromArray([0, 0, 0]);
    }
    static isBaseConstructor(t) {
      return "object" == typeof t && void 0 !== t.r && void 0 !== t.g && void 0 !== t.b;
    }
    static fromNamed(t, e) {
      return ro.fromHex(io[t.toLowerCase()], e);
    }
    static fromArray(t) {
      t = t.filter(t => "" !== t && isFinite(t));
      const e = {
        r: Zs(t[0]),
        g: Zs(t[1]),
        b: Zs(t[2])
      };
      return void 0 !== t[3] && (e.a = eo(t[3])), new ro(e);
    }
    static fromHex(t, e) {
      3 !== (t = t.replace("#", "")).length && 4 !== t.length || (t = t.split("").map(t => t + t).join(""));
      let i = t.match(/[A-Za-z0-9]{2}/g).map(t => parseInt(t, 16));
      return 4 === i.length ? i[3] /= 255 : void 0 !== e && (i[3] = e), ro.fromArray(i);
    }
    static fromRgbString(t) {
      if (t.includes(",")) return ro.fromArray(t.split("(")[1].split(")")[0].split(","));
      const e = t.replace("/", " ").split("(")[1].replace(")", "").split(" ").filter(t => "" !== t && isFinite(Number(t)));
      return ro.fromArray(e);
    }
    static fromHsv({
      h: t,
      s: e,
      v: i
    }) {
      e /= 100, i /= 100;
      const r = Math.floor(t / 60 % 6),
        n = t / 60 - r,
        s = i * (1 - e),
        o = i * (1 - n * e),
        a = i * (1 - (1 - n) * e),
        l = [[i, a, s], [o, i, s], [s, i, a], [s, o, i], [a, s, i], [i, s, o]][r].map(t => Math.round(256 * t));
      return new ro({
        r: Zs(l[0]),
        g: Zs(l[1]),
        b: Zs(l[2])
      });
    }
    static fromHsl({
      h: t,
      s: e,
      l: i
    }) {
      e /= 100, i /= 100;
      const r = (1 - Math.abs(2 * i - 1)) * e,
        n = r * (1 - Math.abs(t / 60 % 2 - 1)),
        s = i - r / 2;
      let o = 0,
        a = 0,
        l = 0;
      return 0 <= t && t < 60 ? (o = r, a = n, l = 0) : 60 <= t && t < 120 ? (o = n, a = r, l = 0) : 120 <= t && t < 180 ? (o = 0, a = r, l = n) : 180 <= t && t < 240 ? (o = 0, a = n, l = r) : 240 <= t && t < 300 ? (o = n, a = 0, l = r) : 300 <= t && t < 360 && (o = r, a = 0, l = n), new ro({
        r: Qs(s + o),
        g: Qs(s + a),
        b: Qs(s + l)
      });
    }
    static fromCMYK({
      c: t,
      m: e,
      y: i,
      k: r,
      a: n
    }) {
      const s = t => Qs(1 - Math.min(1, t / 100 * (1 - r) + r));
      return new ro({
        r: s(t),
        b: s(e),
        g: s(i),
        a: n
      });
    }
    get alpha() {
      return void 0 === this.a ? 1 : this.a;
    }
    get rgb() {
      return [this.r, this.g, this.b];
    }
    get rgba() {
      return [this.r, this.g, this.b, this.alpha];
    }
    get rgbObj() {
      let {
        r: t,
        g: e,
        b: i
      } = this;
      return {
        r: t,
        g: e,
        b: i,
        a: this.alpha
      };
    }
    get css() {
      return this.rgbString;
    }
    get rgbString() {
      return void 0 === this.a ? `rgb(${this.rgb.join(",")})` : `rgba(${this.rgba.join(",")})`;
    }
    get rgbaString() {
      return `rgba(${this.rgba.join(",")})`;
    }
    get hex() {
      return `#${this.rgb.map(t => t.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
    }
    get hexa() {
      return this.rgbaHex;
    }
    get rgbaHex() {
      let t = this.rgba;
      return t[3] = Qs(t[3]), `#${t.map(t => t.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
    }
    get hsv() {
      const t = Js(this.r),
        e = Js(this.g),
        i = Js(this.b),
        r = Math.min(t, e, i),
        n = Math.max(t, e, i);
      let s;
      const o = n,
        a = n - r;
      s = 0 === a ? 0 : n === t ? (e - i) / a * 60 % 360 : n === e ? (i - t) / a * 60 + 120 : n === i ? (t - e) / a * 60 + 240 : 0, s < 0 && (s += 360);
      const l = 0 === n ? 0 : 1 - r / n;
      return {
        h: Math.round(s),
        s: Math.round(100 * l),
        v: Math.round(100 * o),
        a: this.alpha
      };
    }
    get hsl() {
      const t = Js(this.r),
        e = Js(this.g),
        i = Js(this.b),
        r = Math.max(t, e, i),
        n = Math.min(t, e, i);
      let s, o;
      const a = (r + n) / 2;
      if (r === n) s = o = 0;else {
        const l = r - n;
        switch (o = a > .5 ? l / (2 - r - n) : l / (r + n), r) {
          case t:
            s = (e - i) / l + (e < i ? 6 : 0);
            break;
          case e:
            s = (i - t) / l + 2;
            break;
          case i:
            s = (t - e) / l + 4;
        }
        s /= 6;
      }
      return {
        h: Math.round(360 * s),
        s: Math.round(100 * o),
        l: Math.round(100 * a),
        a: this.alpha
      };
    }
    get cmyk() {
      let t, e, i, r;
      const n = parseFloat(this.r) / 255,
        s = parseFloat(this.g) / 255,
        o = parseFloat(this.b) / 255;
      return r = 1 - Math.max(n, s, o), 1 === r ? t = e = i = 0 : (t = (1 - n - r) / (1 - r), e = (1 - s - r) / (1 - r), i = (1 - o - r) / (1 - r)), t = Math.round(100 * t), e = Math.round(100 * e), i = Math.round(100 * i), r = Math.round(100 * r), this.alpha ? {
        c: t,
        m: e,
        y: i,
        k: r,
        a: this.alpha
      } : {
        c: t,
        m: e,
        y: i,
        k: r
      };
    }
    get hslString() {
      const t = this.hsl;
      return `hsl(${t.h}, ${t.s}%, ${t.l}%)`;
    }
    get hslaString() {
      const t = this.hsl;
      return `hsla(${t.h}, ${t.s}%, ${t.l}%, ${t.a})`;
    }
    get cmykString() {
      const t = this.cmyk;
      return `cmyk(${t.c}%, ${t.m}%, ${t.y}%, ${t.k}%)`;
    }
    get cmykaString() {
      const t = this.cmyk;
      return `cmyka(${t.c}%, ${t.m}%, ${t.y}%, ${t.k}%, ${t.a})`;
    }
    toString(t = "rgb") {
      let e;
      switch (t) {
        case "rgb":
        default:
          e = this.rgbString;
          break;
        case "hex":
          e = this.hex;
          break;
        case "rgbaHex":
          e = this.hexa;
          break;
        case "hsl":
          e = this.hslString;
          break;
        case "hsla":
          e = this.hslaString;
          break;
        case "cmyk":
          e = this.cmykString;
          break;
        case "cmyka":
          e = this.cmykaString;
      }
      return e;
    }
    mix(t, e = .5) {
      const i = this.rgba;
      i[3] = Qs(i[3]);
      const r = new ro(t).rgba;
      r[3] = Qs(r[3]), e = eo(e);
      const n = i.map((t, i) => {
        const n = r[i],
          s = n < t,
          o = s ? t - n : n - t,
          a = Math.round(o * e);
        return s ? t - a : a + t;
      });
      return n[3] = Js(n[3]), ro.fromArray(n);
    }
    adjustSatLum(t, e, i) {
      const r = this.hsl;
      let n = r[t],
        s = (i ? n : 100 - n) * e;
      return r[t] = to(100, i ? n - s : n + s), r.a = this.a, new ro(r);
    }
    lighten(t, e = !1) {
      return this.adjustSatLum("l", t, e);
    }
    darken(t) {
      return this.lighten(t, !0);
    }
    saturate(t, e = !1) {
      return this.adjustSatLum("s", t, e);
    }
    desaturate(t) {
      return this.saturate(t, !0);
    }
    grayscale() {
      return this.desaturate(1);
    }
    rotate(t) {
      return this.hue(t);
    }
    hue(t) {
      const e = this.hsl;
      return e.h = Math.round(e.h + t) % 360, e.a = this.a, new ro(e);
    }
    fadeIn(t, e) {
      let i = this.alpha;
      const {
        r,
        g: n,
        b: s
      } = this;
      let o = (1 - i) * t;
      return i = e ? i - o : i + o, ro({
        r,
        g: n,
        b: s,
        a: i
      });
    }
    fadeOut(t) {
      return this.fadeIn(t, !0);
    }
    negate() {
      let t = this.rgb.map(t => 255 - t);
      return void 0 !== this.a && t.push(this.alpha), ro.fromArray(t);
    }
  }
  const no = (t, e, i = "color-update") => {
      const r = i.includes("color") ? {
          color: e
        } : e,
        n = new CustomEvent(i, {
          bubbles: !0,
          composed: !0,
          detail: r
        });
      t.dispatchEvent(n);
    },
    so = (t = 3, e) => {
      let i = 0,
        r = 100,
        n = 50,
        s = null,
        o = !1;
      e && (r = e.s, e.hasOwnProperty("v") ? (s = e.v, n = null, o = !0) : n = e.l);
      const a = [];
      let l, c;
      const h = (t, e) => `${t.css} ${(100 * e).toFixed(1)}%`;
      for (; i < 360;) l = ro.parse(o ? {
        h: i,
        s: r,
        v: s
      } : {
        h: i,
        s: r,
        l: n
      }), c = i / 360, a.push(h(l, c)), i += t;
      return i = 359, l = ro.parse(o ? {
        h: i,
        s: r,
        v: s
      } : {
        h: i,
        s: r,
        l: n
      }), c = 1, a.push(h(l, c)), a.join(", ");
    },
    oo = X`<svg
  stroke="currentColor"
  fill="none"
  stroke-width="0"
  viewBox="0 0 24 24"
>
  <path d="M13 7H7V5H13V7Z" fill="currentColor"></path>
  <path d="M13 11H7V9H13V11Z" fill="currentColor"></path>
  <path d="M7 15H13V13H7V15Z" fill="currentColor"></path>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z"
    fill="currentColor"
  ></path>
</svg>`;
  class ao extends ut {
    static properties = {
      hue: {
        type: Number
      },
      color: {
        type: Object
      },
      gradient: {
        type: String,
        attribute: !1
      },
      sliderStyle: {
        type: String,
        attribute: !1
      },
      sliderBounds: {
        type: Object
      },
      width: {
        type: Number,
        attribute: !1
      }
    };
    static styles = p`
    :host > div {
      display: block;
      width: ${d(this.width)}px;
      height: 15px;
      cursor: pointer;
      position: relative;
    }

    :host .slider {
      position: absolute;
      top: -1px;
      height: 17px;
      width: 8px;
      margin-left: -4px;
      box-shadow:
        0 0 3px #111,
        inset 0 0 2px white;
    }
  `;
    constructor() {
      super(), this.gradient = {
        backgroundImage: `linear-gradient(90deg, ${so(24)})`
      }, this.width = 400, this.sliderStyle = {
        display: "none"
      };
    }
    firstUpdated() {
      const t = this.renderRoot.querySelector("lit-movable");
      t.onmovestart = () => {
        no(this.renderRoot, {
          sliding: !0
        }, "sliding-hue");
      }, t.onmoveend = () => {
        no(this.renderRoot, {
          sliding: !1
        }, "sliding-hue");
      }, t.onmove = ({
        posLeft: t
      }) => this.selectHue({
        offsetX: t
      }), this.sliderStyle = this.sliderCss(this.hue);
    }
    get sliderBounds() {
      const t = this.width / 360,
        e = Number(this.hue) * t;
      return {
        min: 0 - e,
        max: this.width - e,
        posLeft: e
      };
    }
    get sliderCss() {
      return t => {
        this.color.hsx && (t = this.color.hsx.h), void 0 === t && (t = this.color.hsl.h);
        return {
          backgroundColor: ro.parse({
            h: t,
            s: 100,
            l: 50
          }).css
        };
      };
    }
    willUpdate(t) {
      if (t.get("hue") && isFinite(this.hue)) {
        if (this.color?.hsx) return;
        const t = this.hue;
        this.sliderStyle = this.sliderCss(t);
      }
    }
    selectHue(t) {
      const e = 360 / this.width,
        i = t.offsetX,
        r = Math.max(0, Math.min(359, Math.round(i * e))),
        n = this.renderRoot.querySelector("a"),
        s = new CustomEvent("hue-update", {
          bubbles: !0,
          composed: !0,
          detail: {
            h: r
          }
        });
      n.dispatchEvent(s), this.sliderStyle = this.sliderCss(r);
    }
    render() {
      return X` <div
      style=${Mn(this.gradient)}
      class="bar"
      @click="${this.selectHue}"
    >
      <lit-movable
        horizontal="${this.sliderBounds.min}, ${this.sliderBounds.max}"
        posLeft="${this.sliderBounds.posLeft}"
      >
        <a class="slider" style=${Mn(this.sliderCss(this.h))}></a>
      </lit-movable>
    </div>`;
    }
  }
  customElements.get("hue-bar") || customElements.define("hue-bar", ao);
  const lo = p`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.125) 25%,
      transparent 0,
      transparent 75%,
      rgba(0, 0, 0, 0.125) 0,
      rgba(0, 0, 0, 0.125) 0
    ),
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.125) 25%,
      transparent 0,
      transparent 75%,
      rgba(0, 0, 0, 0.125) 0,
      rgba(0, 0, 0, 0.125) 0
    ),
    #fff;
  background-repeat: repeat, repeat;
  background-position:
    0 0,
    6px 6px;
  background-size:
    12px 12px,
    12px 12px;
`,
    co = p`
  display: inline-block;
  width: 69px;
  padding: 0.325rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  appearance: none;
  background-color: var(--input-bg);
  background-clip: padding-box;
  border: 1px solid var(--form-border-color);
  border-radius: 3px;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
`,
    ho = p`
  color: var(--input-active-color);
  background-color: var(--input-active-bg);
  border-color: var(--input-active-border-color);
  outline: 0;
  box-shadow: var(--input-active-box-shadow);
`,
    po = p`
  :host {
    --font-fam: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
      "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --bg-color: rgb(30 41 59);
    --label-color: #ccc;
    --form-border-color: #495057;
    --input-active-border-color: #86b7fe;
    --input-bg: #020617;
    --input-active-bg: #4682b4;
    --input-color: #ccc;
    --input-active-color: #333;
    --input-active-box-shadow: 0 2px 5px #ccc;
    --button-active-bg: #0c5b9d;
    --button-active-color: white;
    --outer-box-shadow: 0 4px 12px #111;
  }
  :host > .outer {
    position: relative;
    background-color: var(--bg-color);
    height: 250px;
    width: 400px;
    display: block;
    padding: 10px;
    margin: 10px;
    box-shadow: var(--outer-box-shadow);
  }
  .d-flex {
    display: flex;
    width: 100%;
    margin-top: 15px;
  }
  .w-30 {
    width: 30%;
  }
  .w-40 {
    width: 40%;
    position: relative;
    height: 210px;
  }
  :host .form-control {
    ${co}
  }
  :host .form-control:focus {
    ${ho}
  }
  :host label {
    width: 12px;
    display: inline-block;
    color: var(--label-color);
    font-family: var(--font-fam);
  }
  :host .hsl-mode {
    padding-left: 16px;
    margin-top: 18px;
  }
  :host .button {
    padding: 0.325rem 0.5rem;
    background-color: var(--input-bg);
    border: 1px solid var(--form-border-color);
    font-family: var(--font-fam);
    color: var(--input-color);
    cursor: pointer;
    font-size: 0.9rem;
  }
  :host div.hex {
    margin-top: 27px;
    white-space: nowrap;
    position: relative;
  }
  :host dialog {
    opacity: 0;
    width: 177px;
    position: absolute;
    bottom: 30px;
    left: 0px;
    z-index: 3;
    border: 1px solid transparent;
    outline: transparent;
    box-shadow: var(--outer-box-shadow);
    background-color: var(--input-bg);
    transition: opacity 0.3s;
  }
  :host dialog.open {
    opacity: 1;
  }
  :host dialog * {
    color: var(--input-color);
  }
  :host dialog a.copy-item {
    margin-bottom: 5px;
    white-space: nowrap;
    display: block;
    width: 180px;
    cursor: pointer;
  }
  :host dialog input.form-control {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    width: 132px;
    padding-bottom: 2px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    pointer-events: none;
  }
  :host dialog button.button {
    display: inline-block;
    vertical-align: middle;
    margin-left: -5px;
    font-size: 12px;
    height: 27px;
    width: 27px;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    box-sizing: border-box;
    overflow: hidden;
    outline: none;
    background-color: transparent;
  }
  :host dialog a.copy-item:hover .button,
  :host dialog a.copy-item:hover input.form-control,
  :host dialog a.copy-item:hover path {
    color: var(--button-active-color);
    background-color: var(--button-active-bg);
    fill: var(--button-active-color);
    cursor: pointer;
  }
  :host dialog .button svg {
    height: 15px;
    width: 15px;
    margin-left: -3px;
  }
  :host div.hex input {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    vertical-align: middle;
    display: inline-block;
  }
  :host .button.copy {
    padding: 8px 6px 5px 5px;
    position: relative;
    position: relative;
    border-left: 0;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    height: 34px;
    display: inline-block;
    box-sizing: border-box;
    overflow: hidden;
    vertical-align: middle;
  }
  :host .button.copy svg {
    height: 16px;
    width: 15px;
    margin-right: -2px;
  }
  :host .button.copy span {
    font-size: 10px;
    position: relative;
    top: -3px;
  }
  :host a.button.l {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  :host a.button.r {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-left: none;
  }
  :host a.button.active {
    color: #eee;
    background-color: var(--button-active-bg);
    cursor: default;
  }
  :host .ok {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  :host .ok a {
    border-radius: 3px;
    padding: 6px 12px;
  }
  :host .swatch {
    height: 14px;
    width: 14px;
    display: inline-block;
    position: relative;
    top: 2px;
    margin-left: 3px;
  }
  :host .swatch span {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  :host .swatch span.checky {
    ${lo}
    z-index: 0;
  }
`,
    uo = p`
  :host > div {
    margin-bottom: 8px;
    display: block;
    position: relative;
  }

  :host label {
    width: 12px;
    display: inline-block;
    color: var(--label-color);
    font-family: var(--font-fam);
  }

  :host .form-control {
    ${co}
  }

  :host .form-control:focus {
    ${ho}
  }

  :host .preview-bar {
    height: 4px;
    width: 85.5px;
    position: absolute;
    bottom: 0px;
    right: 17.5px;
    --pct: 0;
    pointer-events: none;
    z-index: 2;
  }

  :host .preview-bar:after {
    position: absolute;
    content: "";
    background-image: var(--preview);
    background-color: transparent;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    box-shadow: inset 0 -1px 1px var(--form-border-color);
    height: 100%;
    width: 100%;
  }

  :host > div.active .preview-bar {
    width: 128px;
    bottom: -23px;
    right: -9px;
    height: 10px;
    border: 8px solid var(--input-bg);
    box-shadow: var(--input-active-box-shadow);
    pointer-events: all;
    z-index: 2;
    cursor: pointer;
  }
  :host > div.active .preview-bar:after {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  :host .preview-bar .pct {
    bottom: -3px;
    margin-top: -0.75px;
    position: absolute;
    width: 3px;
    height: 11px;
    background: 0 0;
    left: var(--pct);
    display: inline-block;
    z-index: 3;
    pointer-events: none;
  }

  :host .preview-bar .pct:before {
    content: "";
    height: 7px;
    width: 5px;
    position: absolute;
    left: -2.5px;
    top: 2.5px;
    background-color: #fff;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
  }
  :host .active .preview-bar .pct:before {
    width: 7px;
    height: 11px;
    left: -3.5px;
    top: -1px;
  }
  :host .transparent-checks {
    ${lo}
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  :host div.active .transparent-checks {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`,
    go = {
      r: "R (red) channel",
      g: "G (green) channel",
      b: "B (blue) channel",
      h: "H (hue) channel",
      s: "S (saturation) channel",
      v: "V (value / brightness) channel",
      l: "L (luminosity) channel",
      a: "A (alpha / opacity) channel"
    };
  class mo extends ut {
    static properties = {
      group: {
        type: String
      },
      channel: {
        type: String
      },
      color: {
        type: Object
      },
      isHsl: {
        type: Boolean
      },
      c: {
        type: Object,
        state: !0,
        attribute: !1
      },
      previewGradient: {
        type: Object,
        state: !0,
        attribute: !1
      },
      active: {
        type: Boolean,
        state: !0,
        attribute: !1
      },
      max: {
        type: Number,
        state: !0,
        attribute: !1
      },
      v: {
        type: Number,
        state: !0,
        attribute: !1
      }
    };
    static styles = uo;
    clickPreview(t) {
      const e = Math.max(0, Math.min(t.offsetX, 128));
      let i = Math.round(e / 128 * this.max);
      "a" === this.channel && (i = Number((e / 127).toFixed(2))), this.valueChange(null, i), this.setActive(!1);
    }
    valueChange = (t, e = null) => {
      e = e ?? Number(this.renderRoot.querySelector("input").value), "a" === this.channel && (e /= 100), this.c[this.channel] = e;
      const i = ro.parse(this.c);
      "rgb" !== this.group && (i.hsx = this.c), this.c = "rgb" === this.group ? this.color.rgbObj : this.isHsl ? this.color.hsl : this.color.hsv, no(this.renderRoot, i);
    };
    setActive(t) {
      this.active = t, t && this.renderRoot.querySelector("input").select();
    }
    constructor() {
      super();
    }
    setPreviewGradient() {
      let t;
      t = "rgb" === this.group ? this.color.rgbObj : this.color.hsx ? this.color.hsx : this.isHsl ? this.color.hsl : this.color.hsv, this.c = t;
      const e = this.group,
        i = this.channel,
        r = "a" === i;
      this.v = t[i], r && (this.v *= 100);
      let n,
        s,
        o = 255;
      if ("rgb" !== e || "a" === i) {
        if ("h" === i) return o = this.max = 359, void (this.previewGradient = {
          "--preview": `linear-gradient(90deg, ${so(24, t)})`,
          "--pct": t.h / o * 100 + "%"
        });
        o = r ? 1 : 100;
      }
      if (this.max = o, n = {
        ...t
      }, s = n, n[this.channel] = 0, n = ro.parse(n), s[this.channel] = o, s = ro.parse(s), "l" === this.channel) {
        const e = {
          ...t
        };
        e.l = 50, this.previewGradient = {
          "--preview": `linear-gradient(90deg, ${n.hex}, ${ro.parse(e).hex}, ${s.hex})`,
          "--pct": t[this.channel] / o * 100 + "%"
        };
      } else this.previewGradient = {
        "--preview": `linear-gradient(90deg, ${r ? n.css : n.hex}, ${r ? s.css : s.hex})`,
        "--pct": t[this.channel] / o * 100 + "%"
      };
    }
    willUpdate(t) {
      this.setPreviewGradient();
    }
    render() {
      const t = "a" === this.channel ? X`<div class="transparent-checks"></div>` : null,
        e = "a" === this.channel ? 100 : this.max;
      return X` <div class="${An({
        active: this.active
      })}">
      <label for="channel_${this.ch}">${this.channel.toUpperCase()}</label>
      <input
        id="channel_${this.ch}"
        aria-label="${go[this.channel]}"
        class="form-control"
        .value="${Math.round(this.v)}"
        type="number"
        min="0"
        max="${e}"
        @input="${this.valueChange}"
        @focus="${() => this.setActive(!0)}"
        @blur="${() => this.setActive(!1)}"
      />
      <div
        class="preview-bar"
        style="${Mn(this.previewGradient)}"
        @mousedown="${this.clickPreview}"
      >
        <div class="pct"></div>
        ${t}
      </div>
    </div>`;
    }
  }
  customElements.get("color-input-channel") || customElements.define("color-input-channel", mo);
  class bo extends ut {
    static properties = {
      color: {
        type: Object
      },
      isHsl: {
        type: Boolean
      },
      size: {
        type: Number
      },
      debounceMode: {
        type: Boolean
      },
      ctx: {
        type: Object,
        state: !0,
        attribute: !1
      },
      hsw: {
        type: Object,
        state: !0,
        attribute: !1
      },
      circlePos: {
        type: Object,
        state: !0,
        attribute: !1
      }
    };
    static styles = p`
    :host .outer {
      position: absolute;
      top: 0;
      right: 0;
    }

    :host .outer canvas {
      height: inherit;
      width: inherit;
      cursor: pointer;
    }

    :host .circle {
      height: 12px;
      width: 12px;
      border: solid 2px #eee;
      border-radius: 50%;
      box-shadow:
        0 0 3px #000,
        inset 0 0 1px #fff;
      position: absolute;
      margin: -8px;
      mix-blend-mode: difference;
    }
  `;
    constructor() {
      super(), this.isHsl = !0, this.circlePos = {
        top: 0,
        left: 0,
        bounds: {
          x: "",
          y: ""
        }
      }, this.size = 160;
    }
    setColor(t) {
      no(this.renderRoot, t);
    }
    setCircleCss(t, e) {
      const i = `${t}`,
        r = `${e}`,
        n = {
          x: `0, ${this.size}`,
          y: `0,${this.size}`
        };
      this.circlePos = {
        top: r,
        left: i,
        bounds: n
      };
    }
    pickCoord({
      offsetX: t,
      offsetY: e
    }) {
      const i = t,
        r = e,
        {
          size: n,
          hsw: s,
          isHsl: o,
          color: a
        } = this;
      let l = (n - r) / n;
      l = Math.round(100 * l);
      const c = Math.round(i / n * 100),
        h = {
          h: s.h,
          s: c,
          [o ? "l" : "v"]: l
        },
        d = o ? ro.fromHsl(h) : ro.fromHsv(h);
      this.setCircleCss(i, r), d.a = a.alpha, d.hsx = h, d.fromHSLCanvas = !0, this.setColor(d);
    }
    debouncePaintDetail(t) {
      clearTimeout(this.bouncer), this.bouncer = setTimeout(() => this.paintHSL(t, !0), 50), this.paintHSL(t, !1);
    }
    paintHSL(t, e = null) {
      if (this.debounceMode && null === e) return this.debouncePaintDetail(t);
      const {
        ctx: i,
        color: r,
        isHsl: n,
        size: s
      } = this;
      if (!i) return;
      const o = r;
      (t = t ?? n ? o.hsl : o.hsv).w = n ? t.l : t.v;
      const {
          h: a,
          s: l,
          w: c
        } = t,
        h = this.hsw = {
          h: a,
          s: l,
          w: c
        },
        d = s / 100,
        p = n ? (t, e, i) => `hsl(${t}, ${e}%, ${100 - i}%)` : (t, e, i) => ro.fromHsv({
          h: t,
          s: e,
          v: 100 - i
        }).hex,
        u = !1 === e ? 4 : 1;
      for (let t = 0; t < 100; t += u) for (let e = 0; e < 100; e += u) i.fillStyle = p(a, t, e), i.fillRect(t, e, t + u, e + u);
      this.setCircleCss(h.s * d, s - t.w * d);
    }
    willUpdate(t) {
      if (t.has("color") || t.has("isHsl")) {
        if (this.color?.hsx) return this.color.fromHSLCanvas ? void delete this.color.fromHSLCanvas : this.paintHSL(this.color.hsx);
        this.paintHSL();
      }
    }
    firstUpdated(t) {
      const e = this.renderRoot.querySelector("canvas");
      this.ctx = e.getContext("2d"), this.paintHSL();
    }
    circleMove({
      posTop: t,
      posLeft: e
    }) {
      this.pickCoord({
        offsetX: e,
        offsetY: t
      });
    }
    render() {
      const t = {
          height: this.size + "p",
          width: this.size + "px"
        },
        {
          top: e,
          left: i,
          bounds: r
        } = this.circlePos;
      return X` <div
      class="outer"
      @click="${this.pickCoord}"
      style="${Mn(t)}"
    >
      <canvas height="100" width="100"></canvas>
      <lit-movable
        boundsX="${r.x}"
        boundsY="${r.y}"
        posTop="${e}"
        posLeft="${i}"
        .onmove="${t => this.circleMove(t)}"
      >
        <div class="circle"></div>
      </lit-movable>
    </div>`;
    }
  }
  customElements.get("hsl-canvas") || customElements.define("hsl-canvas", bo);
  const _o = t => isFinite(t) ? Number(t) : Number(t.replace(/[^0-9.\-]/g, "")),
    vo = t => (t = Number(t), (isNaN(t) || [void 0, null].includes(t)) && (t = 0), t);
  class yo {
    constructor(t, e) {
      this.x = vo(t), this.y = vo(e);
    }
    static fromPointerEvent(t) {
      const {
        pageX: e,
        pageY: i
      } = t;
      return new yo(e, i);
    }
    static fromElementStyle(t) {
      const e = _o(t.style.left ?? 0),
        i = _o(t.style.top ?? 0);
      return new yo(e, i);
    }
    static fromObject({
      x: t,
      y: e
    }) {
      return new yo(t, e);
    }
    get top() {
      return this.y;
    }
    set top(t) {
      this.y = t;
    }
    get left() {
      return this.x;
    }
    set left(t) {
      this.x = t;
    }
  }
  class fo {
    constructor(t = -1 / 0, e = 1 / 0) {
      this.min = t, this.max = e, this.attr = "";
    }
    get constrained() {
      return this.min === this.max;
    }
    get unconstrained() {
      return this.min === -1 / 0 && this.max === 1 / 0;
    }
    static fromString(t = null, e = 0) {
      if (!t) return new fo();
      if ("null" === t) return new fo(0, 0);
      const [i, r] = t.split(",").map(t => Number(t.trim()) + e),
        n = new fo(i, r);
      return n.attr = t, n;
    }
  }
  class xo extends ut {
    _target;
    _targetSelector = null;
    _boundsX = new fo();
    _boundsY = new fo();
    isMoving = !1;
    moveState = {};
    _vertical = null;
    _horizontal = null;
    _posTop = null;
    _posLeft = null;
    _grid = 1;
    pointerId;
    constructor() {
      super();
    }
    get vertical() {
      return this._vertical;
    }
    set vertical(t) {
      this.boundsY = t, this.boundsX = "null", this._vertical = t;
    }
    get horizontal() {
      return this._horizontal;
    }
    set horizontal(t) {
      this.boundsX = t, this.boundsY = "null", this._horizontal = t;
    }
    set posTop(t) {
      t = Number(t), this._posTop = t, this.target && (this.target.style.top = t + "px");
    }
    get posTop() {
      return this._posTop;
    }
    set posLeft(t) {
      t = Number(t), this._posLeft = t, this.target && (this.target.style.left = t + "px");
    }
    get posLeft() {
      return this._posLeft;
    }
    get grid() {
      return this._grid;
    }
    set grid(t) {
      this._grid = t > 0 && t < 1 / 0 ? t : 1;
    }
    get bounds() {
      return {
        left: this._boundsX,
        top: this._boundsY
      };
    }
    set targetSelector(t) {
      this._targetSelector = t, this._retryTarget = null === document.querySelector(t), this._target = document.querySelector(t);
    }
    get targetSelector() {
      return this._targetSelector;
    }
    get target() {
      return this._target ?? this;
    }
    set target(t) {
      this._target = t;
    }
    get boundsX() {
      return this._boundsX;
    }
    set boundsX(t) {
      this._boundsX = fo.fromString(t, _o(this.target?.style.left ?? 0)), this.bounds.left = this._boundsX;
    }
    get boundsY() {
      return this._boundsY;
    }
    set boundsY(t) {
      this._boundsY = fo.fromString(t, _o(this.target?.style.top ?? 0)), this.bounds.top = this._boundsY;
    }
    static properties = {
      posLeft: {
        type: Number
      },
      posTop: {
        type: Number
      },
      target: {
        type: Object,
        attribute: !1,
        state: !0
      },
      targetSelector: {
        type: String
      },
      bounds: {
        type: Object,
        attribute: !1,
        state: !0
      },
      boundsX: {
        type: String
      },
      boundsY: {
        type: String
      },
      vertical: {
        type: String
      },
      horizontal: {
        type: String
      },
      grid: {
        type: Number
      },
      shiftBehavior: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      eventsOnly: {
        type: Boolean
      },
      listening: {
        type: Boolean
      },
      onmovestart: {
        type: Object
      },
      onmoveend: {
        type: Object
      },
      onmove: {
        type: Object
      }
    };
    firstUpdated(t) {
      this._retryTarget && (this.target = document.querySelector(this.targetSelector));
      const {
          bounds: e,
          target: i,
          posTop: r,
          posLeft: n
        } = this,
        {
          offsetLeft: s,
          offsetTop: o,
          style: {
            left: a,
            top: l
          }
        } = this.target;
      i.classList.add("--movable-base"), this.renderRoot.addEventListener("pointerdown", t => this.pointerdown(t)), i.style.position = "absolute", i.style.cursor = "pointer", n ? i.style.left = n + "px" : !a && s && (i.style.left = s + "px", e.left.constrained && (e.left.min = e.left.max = s)), r ? i.style.top = r + "px" : !l && o && (i.style.top = o + "px", e.top.constrained && (e.top.min = e.top.max = o));
    }
    reposition(t) {
      if ("object" == typeof t) {
        const {
          eventsOnly: e,
          target: i
        } = this;
        this.posTop = t.top, this.posLeft = t.left, i && !e && (i.style.left = t.left + "px", i.style.top = t.top + "px");
      } else this.isMoving = t;
    }
    moveInit(t) {
      const e = this.moveState,
        {
          target: i,
          bounds: r
        } = this;
      e.mouseCoord = yo.fromPointerEvent(t), e.startCoord = yo.fromElementStyle(i), e.moveDist = new yo(0, 0), e.totalDist = new yo(0, 0), e.clickOffset = (t => {
        const e = yo.fromPointerEvent(t),
          i = t.target.getBoundingClientRect(),
          r = e.x - (i.left + document.body.scrollLeft),
          n = e.y - (i.top + document.body.scrollTop);
        return new yo(r, n);
      })(t), e.coords = yo.fromObject(e.startCoord), e.maxX = isFinite(r.left.min) && isFinite(r.left.max) ? r.left.min + r.left.max : 1 / 0, e.maxY = isFinite(r.top.min) && isFinite(r.top.max) ? r.top.min + r.top.max : 1 / 0, this.isMoving = !0, this.reposition(!0), this.eventBroker("movestart", t);
    }
    eventBroker(t, e) {
      this.moveState.posTop = this.posTop, this.moveState.posLeft = this.posLeft;
      const i = new CustomEvent(t, {
        bubbles: !0,
        composed: !0,
        detail: {
          ...e,
          ...this.moveState,
          element: this
        }
      });
      this.renderRoot.dispatchEvent(i);
      const r = this[`on${t}`];
      r && r({
        ...e,
        ...this.moveState,
        me: this
      });
    }
    unbind(t) {
      this.pointerId = null, document.body.removeEventListener("pointermove", t => this.motionHandler(t)), this.moveEnd(t);
    }
    moveEnd(t) {
      this.isMoving && (this.isMoving = this.moveState.isMoving = !1, this.reposition(!1), this.eventBroker("moveend", t));
    }
    motionHandler(t) {
      t.stopPropagation();
      const e = yo.fromPointerEvent(t),
        i = this.moveState,
        {
          grid: r,
          bounds: n,
          shiftBehavior: s,
          boundsX: o,
          boundsY: a
        } = this;
      if (i.moveDist = yo.fromObject({
        x: e.x - i.mouseCoord.x,
        y: e.y - i.mouseCoord.y
      }), i.mouseCoord = e, i.totalDist = yo.fromObject({
        x: i.totalDist.x + i.moveDist.x,
        y: i.totalDist.y + i.moveDist.y
      }), i.coords = yo.fromObject({
        x: Math.round(i.totalDist.x / r) * r + i.startCoord.x,
        y: Math.round(i.totalDist.y / r) * r + i.startCoord.y
      }), s && t.shiftKey && o.unconstrained && a.unconstrained) {
        const {
          x: t,
          y: e
        } = i.totalDist;
        Math.abs(t) > Math.abs(e) ? i.coords.top = i.startCoord.y : i.coords.left = i.startCoord.x;
      } else i.coords.y = Math.min(Math.max(n.top.min, i.coords.top), n.top.max), i.coords.x = Math.min(Math.max(n.left.min, i.coords.left), n.left.max);
      isFinite(i.maxX) && (i.pctX = Math.max(n.left.min, i.coords.left) / i.maxX), isFinite(i.maxY) && (i.pctY = Math.max(n.top.min, i.coords.top) / i.maxY), this.reposition(i.coords), this.eventBroker("move", t);
    }
    pointerdown(t) {
      document.body.setPointerCapture(t.pointerId), t.preventDefault(), t.stopPropagation(), void 0 !== t.pointerId && (this.pointerId = t.pointerId), this.listening || (document.body.addEventListener("pointerup", t => {
        this.isMoving && this.unbind(t);
      }, !1), document.body.addEventListener("pointermove", t => {
        void 0 !== this.pointerId && t.pointerId === this.pointerId && this.motionHandler(t);
      }, !1)), this.listening = !0, this.moveInit(t);
    }
    render() {
      return X`<slot></slot>`;
    }
  }
  window.customElements.get("lit-movable") || window.customElements.define("lit-movable", xo);
  class wo extends ut {
    static properties = {
      color: {
        type: Object,
        state: !0,
        attribute: !1
      },
      hex: {
        type: String,
        state: !0,
        attribute: !1
      },
      value: {
        type: String
      },
      isHsl: {
        type: Boolean,
        state: !0,
        attribute: !1
      },
      copied: {
        type: String
      },
      debounceMode: {
        type: Boolean
      },
      buttonDisabled: {
        attribute: "button-disabled",
        type: Boolean
      }
    };
    static styles = po;
    _color;
    constructor() {
      super(), this._color = ro.parse(io.slateblue), this.isHsl = !0, this.buttonDisabled = !1;
    }
    firstUpdated(t) {
      this.debounceMode = !1, t.has("value") && (this.color = ro.parse(this.value));
    }
    updated(t) {
      if (t.has("value") && this.value) {
        const t = ro.parse(this.value);
        !t || this._color && t.hex === this._color.hex || (this.color = t);
      }
    }
    get color() {
      return this._color;
    }
    set color(t) {
      (t = t.hsx ? t : t.rgba ? ro.parse(...t.rgba) : ro.parse(t)) && (this.hex = t.hex, this._color = t, no(this.renderRoot, t, "colorchanged"));
    }
    updateColor({
      detail: {
        color: t
      }
    }) {
      this.color = t;
    }
    setColor(t) {
      const e = this.renderRoot.querySelector("input#hex").value,
        i = ro.parse(e);
      i ? this.color = i : console.log(`ignored unparsable input: ${e}`);
    }
    setHue({
      detail: {
        h: t
      }
    }) {
      let {
        s: e,
        l: i,
        a: r
      } = this.color.hsl;
      1 === r && (r = void 0), this.color = {
        h: t,
        s: e,
        l: i,
        a: r
      };
    }
    setHsl(t) {
      this.isHsl = t;
    }
    okColor() {
      no(this.renderRoot, this.color, "colorpicked");
    }
    showCopyDialog() {
      if (this.copied = null, this.dlg = this.dlg ?? this.renderRoot.querySelector("dialog"), this.dlg.open) return this.dlg.classList.remove("open"), this.dlg.close();
      this.dlg.show(), this.dlg.classList.add("open");
    }
    clipboard(t) {
      const e = this.color.toString(t);
      window.navigator.clipboard.writeText(e).then(() => {
        this.hideCopyDialog(e);
      });
    }
    hideCopyDialog(t) {
      if (t) return this.copied = t, setTimeout(() => this.dlg.classList.remove("open"), 400), void setTimeout(() => this.hideCopyDialog(), 1200);
      this.dlg.classList.remove("open"), this.dlg.close(), this.copied = null;
    }
    setSliding({
      detail: t
    }) {
      this.debounceMode = t.sliding;
    }
    render() {
      const t = this.isHsl ? ["h", "s", "l"] : ["h", "s", "v"],
        e = {
          button: !0,
          active: !this.isHsl,
          l: !0
        },
        i = {
          button: !0,
          active: this.isHsl,
          r: !0
        },
        r = {
          backgroundColor: this.color
        },
        n = this.copied ? {
          textAlign: "center",
          display: "block"
        } : {
          display: "none"
        },
        s = this.debounceMode;
      return X` <div class="outer">
      <hue-bar
        @sliding-hue="${this.setSliding}"
        hue="${this.color.hsx ? this.color.hsx.h : this.color.hsl.h}"
        @hue-update="${this.setHue}"
        .color="${this.color}"
      ></hue-bar>
      <div class="d-flex">
        <div class="col w-30">
          ${["r", "g", "b", "a"].map(t => X`
              <color-input-channel
                group="rgb"
                channel="${t}"
                isHsl="${this.isHsl}"
                .color="${this.color}"
                @color-update="${this.updateColor}"
              />
            `)}
          <div class="hex">
            <dialog @blur="${() => this.hideCopyDialog()}" tabindex="0">
              <sub class="copied" style="${Mn(n)}"
                >copied <em>${this.copied}</em></sub
              >
              ${this.copied ? X`` : X`
                    <a
                      class="copy-item"
                      @click=${t => this.clipboard("hex", t)}
                      id="copyHex"
                    >
                      <input
                        class="form-control"
                        disabled="disabled"
                        value="${this.color.hex}"
                      />
                      <button
                        title="Copy HEX String"
                        class="button"
                        tabindex="0"
                      >
                        ${oo}
                      </button>
                    </a>
                    <a
                      class="copy-item"
                      @click=${t => this.clipboard("css", t)}
                      id="copyRgb"
                    >
                      <input
                        class="form-control"
                        disabled="disabled"
                        value="${this.color.css}"
                      />
                      <button
                        title="Copy RGB String"
                        class="button"
                        tabindex="0"
                      >
                        ${oo}
                      </button>
                    </a>
                    <a
                      class="copy-item"
                      id="copyHsl"
                      @click=${t => this.clipboard(this.color.alpha < 1 ? "hsla" : "hsl", t)}
                    >
                      <input
                        class="form-control"
                        disabled="disabled"
                        value="${this.color.toString(this.color.alpha < 1 ? "hsla" : "hsl")}"
                      />
                      <button
                        title="Copy HSL String"
                        class="button"
                        tabindex="0"
                      >
                        ${oo}
                      </button>
                    </a>
                  `}
            </dialog>
            <label for="hex">#</label>
            <input
              aria-label="Hexadecimal value (editable - accepts any valid color string)"
              @input="${this.setColor}"
              class="form-control"
              id="hex"
              placeholder="Set color"
              value="${this.hex}"
            /><a
              title="Show copy to clipboard menu"
              @click="${this.showCopyDialog}"
              class="button copy"
            >
              ${oo}
              <span>&#11205;</span>
            </a>
          </div>
        </div>
        <div class="col w-30">
          ${t.map(t => X`
              <color-input-channel
                group="hsl"
                channel="${t}"
                .isHsl="${this.isHsl}"
                .color="${this.color}"
                @color-update="${this.updateColor}"
              />
            `)}
          <div class="hsl-mode">
            <a
              title="Use hue / saturation / value (brightness) mode"
              class="${An(e)}"
              @click="${() => this.setHsl(!1)}"
              >HSV</a
            ><a
              title="Use hue / saturation / luminosity mode"
              class="${An(i)}"
              @click="${() => this.setHsl(!0)}"
              >HSL</a
            >
          </div>
        </div>
        <div class="w-40">
          <hsl-canvas
            .debounceMode="${s}"
            size="${160}"
            .isHsl="${this.isHsl}"
            .color="${this.color}"
            @color-update="${this.updateColor}"
          ></hsl-canvas>
          <div class="ok">
            <a
              class="button"
              .disabled=${this.buttonDisabled}
              @click="${this.okColor}"
              >OK
              <span class="swatch">
                <span style="${Mn(r)}"></span>
                <span class="checky"></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    }
  }
  window.customElements.get("color-picker") || window.customElements.define("color-picker", wo);
  const Eo = "anycubic_cloud",
    So = {
      keyframeOptions: {
        duration: 250,
        direction: "alternate",
        easing: "ease-in-out"
      },
      properties: ["height", "opacity", "scale"]
    },
    $o = ["#ffffff", "#000000", "#c0c0c0", "#ff0000", "#ff8000", "#ffff00", "#00a000", "#00c0c0", "#0000ff", "#8000ff", "#ff00ff", "#8b4513"];
  let Po = class extends ut {
    constructor() {
      super(...arguments), this.box_id = 0, this.spoolList = [], this.spool_index = -1, this._isOpen = !1, this._changingSlot = !1, this._colourPresetChange = t => {
        this.color = t.currentTarget.preset, this._elColorPicker && (this._elColorPicker.color = this.color);
      }, this._handleModalEvent = t => {
        var e;
        const i = t;
        i.stopPropagation(), i.detail.modalOpen && (this._isOpen = !0, this.box_id = Number(i.detail.box_id), this.spool_index = Number(i.detail.spool_index), this.material_type = null !== (e = Fi(i.detail.material_type)) && void 0 !== e ? e : Xe.PLA, this.color = i.detail.color);
      }, this._handleDropdownEvent = t => {
        const e = t;
        e.stopPropagation(), e.detail.value && (this.material_type = Fi(e.detail.value));
      }, this._handleColourEvent = t => {
        const e = t;
        e.stopPropagation(), e.detail.color && (this.color = e.detail.color.rgb);
      }, this._handleColourPickEvent = t => {
        this._handleColourEvent(t), this._changingSlot || this._submitSlotChanges();
      }, this._handleSaveButton = () => {
        this._submitSlotChanges();
      }, this._closeModal = t => {
        t && t.stopPropagation(), this._isOpen = !1, this.spool_index = -1, this.material_type = void 0, this.color = void 0, this.box_id = 0;
      }, this._cardClick = t => {
        t.stopPropagation();
      };
    }
    async firstUpdated() {
      this.addEventListener("click", t => {
        this._closeModal(t);
      }), this.addEventListener("ac-select-dropdown", this._handleDropdownEvent), this.addEventListener("colorchanged", this._handleColourEvent), this.addEventListener("colorpicked", this._handleColourPickEvent);
    }
    connectedCallback() {
      var t;
      super.connectedCallback(), null === (t = this.parentElement) || void 0 === t || t.addEventListener("ac-mcb-modal", this._handleModalEvent);
    }
    disconnectedCallback() {
      var t;
      null === (t = this.parentElement) || void 0 === t || t.removeEventListener("ac-mcb-modal", this._handleModalEvent), super.disconnectedCallback();
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("language") && (this._heading = wn("card.spool_settings.heading", this.language), this._labelSelectMaterial = wn("card.spool_settings.label_select_material", this.language), this._labelSelectColour = wn("card.spool_settings.label_select_colour", this.language), this._labelPresetColour = wn("card.spool_settings.label_preset_colour", this.language), this._buttonSave = wn("common.actions.save", this.language));
    }
    update(t) {
      super.update(t), this._isOpen ? this.style.display = "block" : this.style.display = "none";
    }
    render() {
      return X`
      <div
        class="ac-modal-container"
        style=${Mn({
        height: "auto",
        opacity: 1,
        scale: 1
      })}
        ${rs(Object.assign({}, So))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this.color ? this._renderCard() : Z}
        </div>
      </div>
    `;
    }
    _renderCard() {
      return this.spool_index >= 0 ? X`
          <div>
            <div class="ac-slot-title">
              ${this._heading}: ${this.spool_index + 1}
            </div>
            <div>
              <div>
                <p class="ac-modal-label">${this._labelSelectMaterial}:</p>
                <anycubic-ui-select-dropdown
                  .availableOptions=${Xe}
                  .placeholder=${Xe.PLA}
                  .initialItem=${this.material_type}
                ></anycubic-ui-select-dropdown>
              </div>
              ${this._renderPresets()}
              <div>
                <p class="ac-modal-label">${this._labelSelectColour}:</p>
                <color-picker .value=${this.color}></color-picker>
              </div>
            </div>
            <div class="ac-save-settings">
              <ha-control-button
                .disabled=${this._changingSlot}
                @click=${this._handleSaveButton}
              >
                ${this._buttonSave}
              </ha-control-button>
            </div>
          </div>
        ` : Z;
    }
    _renderPresets() {
      var t;
      return X`
      <div>
        <p class="ac-modal-label">${this._labelPresetColour}:</p>
        <div class="ac-mcb-presets">
          ${Cn(null !== (t = this.slotColors) && void 0 !== t ? t : $o, (t, e) => X`
              <div
                class="ac-mcb-preset-color"
                style=${Mn({
        "background-color": t
      })}
                .preset=${t}
                @click=${this._colourPresetChange}
              >
                &nbsp;
              </div>
            `)}
        </div>
      </div>
    `;
    }
    _submitSlotChanges() {
      if (this.selectedPrinterDevice && this.material_type && this.spool_index >= 0 && this.color && this.color.length >= 3) {
        const t = `multi_color_box_set_slot_${this.material_type.toLowerCase()}`;
        this._changingSlot = !0, this.hass.callService(Eo, t, {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          box_id: this.box_id,
          slot_number: this.spool_index + 1,
          slot_color_red: this.color[0],
          slot_color_green: this.color[1],
          slot_color_blue: this.color[2]
        }).then(() => {
          this._changingSlot = !1;
        }).catch(t => {
          this._changingSlot = !1;
        }), this._closeModal();
      }
    }
    static get styles() {
      return p`
      ${Ts}

      .ac-slot-title {
        font-size: 24px;
        text-align: center;
        font-weight: 600;
      }

      .ac-mcb-presets {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      .ac-mcb-preset-color {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin: 20px 10px;
      }

      ha-control-button {
        min-width: 150px;
        margin: 30px auto 0px;
        font-size: 14px;
      }

      color-picker {
        --font-fam: var(--token-font-family-primary);
        --bg-color: var(--ha-card-background);
        --label-color: var(--secondary-text-color);
        --form-border-color: var(--ha-card-background);
        --input-active-border-color: var(--primary-color);
        --input-bg: var(--primary-background-color);
        --input-active-bg: var(--ha-card-background);
        --input-color: var(--secondary-text-color);
        --input-active-color: var(--primary-text-color);
        --input-active-box-shadow: 0 2px 5px #ccc;
        --button-active-bg: var(--state-active-color);
        --button-active-color: var(--token-color-icon-primary);
        --outer-box-shadow: 0 4px 12px #111;
      }
    `;
    }
  };
  n([xt("color-picker")], Po.prototype, "_elColorPicker", void 0), n([vt()], Po.prototype, "hass", void 0), n([vt()], Po.prototype, "language", void 0), n([vt({
    attribute: "selected-printer-device"
  })], Po.prototype, "selectedPrinterDevice", void 0), n([vt({
    attribute: "slot-colors"
  })], Po.prototype, "slotColors", void 0), n([yt()], Po.prototype, "box_id", void 0), n([yt()], Po.prototype, "spoolList", void 0), n([yt()], Po.prototype, "spool_index", void 0), n([yt()], Po.prototype, "material_type", void 0), n([yt()], Po.prototype, "color", void 0), n([yt()], Po.prototype, "_isOpen", void 0), n([yt()], Po.prototype, "_heading", void 0), n([yt()], Po.prototype, "_labelSelectMaterial", void 0), n([yt()], Po.prototype, "_labelSelectColour", void 0), n([yt()], Po.prototype, "_labelPresetColour", void 0), n([yt()], Po.prototype, "_buttonSave", void 0), n([yt()], Po.prototype, "_changingSlot", void 0), Po = n([ns("anycubic-printercard-multicolorbox_modal_spool")], Po);
  const To = {
      keyframeOptions: {
        duration: 250,
        direction: "alternate",
        easing: "ease-in-out"
      },
      properties: ["height", "opacity", "scale"]
    },
    Ao = "multi_color_box_runout_refill";
  let Co = class extends ut {
    constructor() {
      super(...arguments), this.box_id = 0, this.spoolList = [], this._spoolsUnavailable = !1, this._changingRunout = !1, this._isOpen = !1, this._handleRunoutRefillChanged = t => {
        if (this._changingRunout) return;
        const e = li(this.printerEntities, this.printerEntityIdPart, "switch", Ao);
        e && (this._changingRunout = !0, this.hass.callService("switch", "toggle", {
          entity_id: e.entity_id
        }).then(() => {
          this._changingRunout = !1;
        }).catch(t => {
          this._changingRunout = !1;
        }));
      }, this._editSpool = t => {
        const e = t.currentTarget.index,
          i = t.currentTarget.material_type,
          r = t.currentTarget.color;
        this._isOpen = !1, Ne(this, "ac-mcb-modal", {
          modalOpen: !0,
          box_id: this.box_id,
          spool_index: e,
          material_type: i,
          color: r
        });
      }, this._handleModalEvent = t => {
        const e = t;
        e.stopPropagation(), e.detail.modalOpen && (this._isOpen = !0, this.box_id = Number(e.detail.box_id));
      }, this._closeModal = t => {
        t && t.stopPropagation(), this._isOpen = !1;
      }, this._cardClick = t => {
        t.stopPropagation();
      };
    }
    async firstUpdated() {
      this.addEventListener("click", t => {
        this._closeModal(t);
      });
    }
    connectedCallback() {
      var t;
      super.connectedCallback(), null === (t = this.parentElement) || void 0 === t || t.addEventListener("ac-mcbsettings-modal", this._handleModalEvent);
    }
    disconnectedCallback() {
      var t;
      null === (t = this.parentElement) || void 0 === t || t.removeEventListener("ac-mcbsettings-modal", this._handleModalEvent), super.disconnectedCallback();
    }
    willUpdate(t) {
      if (super.willUpdate(t), t.has("language") && (this._heading = wn("card.ace_settings.heading", this.language), this._labelRunoutRefill = wn("card.buttons.runout_refill", this.language), this._labelSpools = wn("card.ace_settings.label_spools", this.language), this._hintSpoolsUnavailable = wn("card.ace_settings.hint_spools_unavailable", this.language)), t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        const t = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "ace_spools", "not loaded", {
          spool_info: []
        });
        this.spoolList = t.attributes.spool_info, this._spoolsUnavailable = 0 === this.spoolList.length, this._runoutRefillState = gi(this.hass, this.printerEntities, this.printerEntityIdPart, Ao);
      }
    }
    update(t) {
      super.update(t), this._isOpen ? this.style.display = "block" : this.style.display = "none";
    }
    render() {
      return X`
      <div
        class="ac-modal-container"
        style=${Mn({
        height: "auto",
        opacity: 1,
        scale: 1
      })}
        ${rs(Object.assign({}, To))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this._isOpen ? this._renderCard() : Z}
        </div>
      </div>
    `;
    }
    _renderCard() {
      var t;
      return X`
      <div class="ac-slot-title">${this._heading}</div>
      <div class="ac-settings-switch-row">
        <span>${this._labelRunoutRefill}</span>
        <anycubic-ui-toggle-switch
          .checked=${"on" === (null === (t = this._runoutRefillState) || void 0 === t ? void 0 : t.state)}
          .disabled=${this._changingRunout || !this._runoutRefillState || "unavailable" === this._runoutRefillState.state}
          @ac-toggle-change=${this._handleRunoutRefillChanged}
        ></anycubic-ui-toggle-switch>
      </div>
      <p class="ac-modal-label">${this._labelSpools}</p>
      ${this._spoolsUnavailable ? X`<p class="ac-settings-hint">${this._hintSpoolsUnavailable}</p>` : Z}
      <div class="ac-settings-spool-list">
        ${Cn(this._displaySpoolList(), (t, e) => {
        const i = {
          "background-color": t.spool_loaded ? `rgb(${t.color[0]}, ${t.color[1]}, ${t.color[2]})` : "#aaa"
        };
        return X`
              <button
                class="ac-settings-spool-row"
                .index=${e}
                .material_type=${t.material_type}
                .color=${t.color}
                @click=${this._editSpool}
              >
                <span
                  class="ac-settings-spool-ring"
                  style=${Mn(i)}
                  >${e + 1}</span
                >
                <span class="ac-settings-spool-material">
                  ${t.spool_loaded ? t.material_type : "---"}
                </span>
              </button>
            `;
      })}
      </div>
    `;
    }
    _displaySpoolList() {
      return this.spoolList.length > 0 ? this.spoolList : [0, 1, 2, 3].map(() => ({
        material_type: "PLA",
        color: [170, 170, 170],
        status: 0,
        spool_loaded: !1
      }));
    }
    static get styles() {
      return p`
      ${Ts}

      .ac-slot-title {
        font-size: 22px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 16px;
      }

      .ac-settings-switch-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color, #ccc3);
        margin-bottom: 12px;
      }

      .ac-settings-spool-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .ac-settings-hint {
        font-size: 13px;
        color: var(--secondary-text-color, #7f7f7f);
        margin: 0px 0px 10px 0px;
      }

      .ac-settings-spool-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--divider-color, #ccc3);
        border-radius: 10px;
        background: transparent;
        padding: 10px 14px;
        cursor: pointer;
        font-size: 15px;
        color: var(--primary-text-color);
      }

      .ac-settings-spool-row:hover {
        background-color: #7f7f7f24;
      }

      .ac-settings-spool-ring {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 14px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 700;
        color: white;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
      }

      .ac-settings-spool-material {
        text-align: left;
      }
    `;
    }
  };
  n([vt()], Co.prototype, "hass", void 0), n([vt()], Co.prototype, "language", void 0), n([vt({
    attribute: "printer-entities"
  })], Co.prototype, "printerEntities", void 0), n([vt({
    attribute: "printer-entity-id-part"
  })], Co.prototype, "printerEntityIdPart", void 0), n([vt()], Co.prototype, "box_id", void 0), n([yt()], Co.prototype, "spoolList", void 0), n([yt()], Co.prototype, "_spoolsUnavailable", void 0), n([yt()], Co.prototype, "_runoutRefillState", void 0), n([yt()], Co.prototype, "_changingRunout", void 0), n([yt()], Co.prototype, "_isOpen", void 0), n([yt()], Co.prototype, "_heading", void 0), n([yt()], Co.prototype, "_labelRunoutRefill", void 0), n([yt()], Co.prototype, "_labelSpools", void 0), n([yt()], Co.prototype, "_hintSpoolsUnavailable", void 0), Co = n([ns("anycubic-printercard-multicolorbox_modal_settings")], Co);
  const Do = {
    keyframeOptions: {
      duration: 250,
      direction: "alternate",
      easing: "ease-in-out"
    },
    properties: ["height", "opacity", "scale"]
  };
  let ko = class extends ut {
    constructor() {
      super(...arguments), this.availableSpeedModes = {}, this.isFDM = !1, this.currentSpeedModeKey = 0, this.currentSpeedModeDescr = void 0, this._userEditSpeedMode = !1, this.currentFanSpeed = 0, this._userEditFanSpeed = !1, this.currentAuxFanSpeed = 0, this._userEditAuxFanSpeed = !1, this.currentBoxFanSpeed = 0, this._userEditBoxFanSpeed = !1, this.currentTargetTempNozzle = 0, this.minTargetTempNozzle = 0, this.maxTargetTempNozzle = 0, this._userEditTargetTempNozzle = !1, this.currentTargetTempHotbed = 0, this.minTargetTempHotbed = 0, this.maxTargetTempHotbed = 0, this._userEditTargetTempHotbed = !1, this._isOpen = !1, this._pressingRetract = !1, this._pressingExtrude = !1, this._pressingFinishJob = !1, this._changingSettings = !1, this._setConfirmationMode = t => {
        this._confirmationType = t.currentTarget.confirmation_type, this._confirmMessage = wn("card.print_settings.confirm_message", this.language, "action", wn("common.actions." + this._confirmationType, this.language));
      }, this._pressFinishJob = () => {
        this._pressingFinishJob = !0, this.hass.callService("button", "press", {
          entity_id: ai(this.printerEntityIdPart, "button", "clear_completed_print_job")
        }).then(() => {
          this._pressingFinishJob = !1;
        }).catch(t => {
          this._pressingFinishJob = !1;
        });
      }, this._pressRetractFilament = () => {
        this._pressingRetract = !0, this.hass.callService("button", "press", {
          entity_id: ai(this.printerEntityIdPart, "button", "retract_filament")
        }).then(() => {
          this._pressingRetract = !1;
        }).catch(t => {
          this._pressingRetract = !1;
        });
      }, this._pressExtrudeFilament = () => {
        this._pressingExtrude = !0, this.hass.callService("button", "press", {
          entity_id: ai(this.printerEntityIdPart, "button", "extrude_filament")
        }).then(() => {
          this._pressingExtrude = !1;
        }).catch(t => {
          this._pressingExtrude = !1;
        });
      }, this._handleConfirmApprove = () => {
        switch (this._confirmationType) {
          case Ke.PAUSE:
            this._pressHassButton("pause_print");
            break;
          case Ke.RESUME:
            this._pressHassButton("resume_print");
            break;
          case Ke.CANCEL:
            this._pressHassButton("stop_print");
        }
        this._confirmationType = void 0, this._closeModal();
      }, this._handleConfirmCancel = () => {
        this._confirmationType = void 0;
      }, this._handleFanSpeedChange = t => {
        const e = t.currentTarget.value;
        this.currentFanSpeed = Number(e), this._userEditFanSpeed = !0;
      }, this._handleAuxFanSpeedChange = t => {
        const e = t.currentTarget.value;
        this.currentAuxFanSpeed = Number(e), this._userEditAuxFanSpeed = !0;
      }, this._handleBoxFanSpeedChange = t => {
        const e = t.currentTarget.value;
        this.currentBoxFanSpeed = Number(e), this._userEditBoxFanSpeed = !0;
      }, this._handleFanSpeedKeyDown = t => {
        "Enter" === t.code ? (t.preventDefault(), this._submitChangedFanSpeed()) : this._userEditFanSpeed = !0;
      }, this._handleAuxFanSpeedKeyDown = t => {
        "Enter" === t.code ? (t.preventDefault(), this._submitChangedAuxFanSpeed()) : this._userEditAuxFanSpeed = !0;
      }, this._handleBoxFanSpeedKeyDown = t => {
        "Enter" === t.code ? (t.preventDefault(), this._submitChangedBoxFanSpeed()) : this._userEditBoxFanSpeed = !0;
      }, this._handleTargetTempNozzleChange = t => {
        const e = t.currentTarget.value;
        this.currentTargetTempNozzle = Number(e), this._userEditTargetTempNozzle = !0;
      }, this._handleTargetTempHotbedChange = t => {
        const e = t.currentTarget.value;
        this.currentTargetTempHotbed = Number(e), this._userEditTargetTempHotbed = !0;
      }, this._handleTargetTempNozzleKeyDown = t => {
        "Enter" === t.code ? (t.preventDefault(), this._submitChangedTargetTempNozzle()) : this._userEditTargetTempNozzle = !0;
      }, this._handleTargetTempHotbedKeyDown = t => {
        "Enter" === t.code ? (t.preventDefault(), this._submitChangedTargetTempHotbed()) : this._userEditTargetTempHotbed = !0;
      }, this._handleModalEvent = t => {
        const e = t;
        e.stopPropagation(), e.detail.modalOpen && (this._isOpen = !0, this._resetUserEdits());
      }, this._handleDropdownEvent = t => {
        const e = t;
        e.stopPropagation(), this._userEditSpeedMode = !0, void 0 !== e.detail.key && (this.currentSpeedModeKey = e.detail.key, this.currentSpeedModeDescr = this.currentSpeedModeKey >= 0 && this.currentSpeedModeKey in this.availableSpeedModes ? this.availableSpeedModes[this.currentSpeedModeKey] : void 0);
      }, this._handleSaveFanSpeedButton = () => {
        this._submitChangedFanSpeed(), this._resetUserEdits();
      }, this._handleSaveAuxFanSpeedButton = () => {
        this._submitChangedAuxFanSpeed(), this._resetUserEdits();
      }, this._handleSaveBoxFanSpeedButton = () => {
        this._submitChangedBoxFanSpeed(), this._resetUserEdits();
      }, this._handleSaveSpeedModeButton = () => {
        this._submitChangedSpeedMode(), this._resetUserEdits();
      }, this._handleSaveTargetTempNozzleButton = () => {
        this._submitChangedTargetTempNozzle(), this._resetUserEdits();
      }, this._handleSaveTargetTempHotbedButton = () => {
        this._submitChangedTargetTempHotbed(), this._resetUserEdits();
      }, this._closeModal = t => {
        t && t.stopPropagation(), this._isOpen = !1, this._resetUserEdits();
      }, this._cardClick = t => {
        t.stopPropagation();
      };
    }
    async firstUpdated() {
      this.addEventListener("ac-select-dropdown", this._handleDropdownEvent), this.addEventListener("click", t => {
        this._closeModal(t);
      });
    }
    connectedCallback() {
      var t;
      super.connectedCallback(), null === (t = this.parentElement) || void 0 === t || t.addEventListener("ac-printset-modal", this._handleModalEvent);
    }
    disconnectedCallback() {
      var t;
      null === (t = this.parentElement) || void 0 === t || t.removeEventListener("ac-printset-modal", this._handleModalEvent), super.disconnectedCallback();
    }
    willUpdate(t) {
      if (super.willUpdate(t), t.has("language") && (this._labelNozzleTemperature = wn("card.print_settings.label_nozzle_temp", this.language), this._labelHotbedTemperature = wn("card.print_settings.label_hotbed_temp", this.language), this._labelFanSpeed = wn("card.print_settings.label_fan_speed", this.language), this._labelAuxFanSpeed = wn("card.print_settings.label_aux_fan_speed", this.language), this._labelBoxFanSpeed = wn("card.print_settings.label_box_fan_speed", this.language), this._buttonYes = wn("common.actions.yes", this.language), this._buttonNo = wn("common.actions.no", this.language), this._buttonPrintPause = wn("card.print_settings.print_pause", this.language), this._buttonPrintResume = wn("card.print_settings.print_resume", this.language), this._buttonPrintCancel = wn("card.print_settings.print_cancel", this.language), this._buttonFinishJob = wn("card.print_settings.print_finish_job", this.language), this._buttonRetractFilament = wn("card.print_settings.retract_filament", this.language), this._buttonExtrudeFilament = wn("card.print_settings.extrude_filament", this.language), this._buttonSaveSpeedMode = wn("card.print_settings.save_speed_mode", this.language), this._buttonSaveTargetNozzle = wn("card.print_settings.save_target_nozzle", this.language), this._buttonSaveTargetHotbed = wn("card.print_settings.save_target_hotbed", this.language), this._buttonSaveFanSpeed = wn("card.print_settings.save_fan_speed", this.language), this._buttonSaveAuxFanSpeed = wn("card.print_settings.save_aux_fan_speed", this.language), this._buttonSaveBoxFanSpeed = wn("card.print_settings.save_box_fan_speed", this.language)), t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        if (this.isFDM = Si(this.hass, this.printerEntities, this.printerEntityIdPart), this._userEditFanSpeed || (this.currentFanSpeed = Number(yi(this.hass, this.printerEntities, this.printerEntityIdPart, "fan_speed", 0).state)), !this._userEditTargetTempNozzle) {
          const t = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_nozzle_temperature", 0, {
            limit_min: 0,
            limit_max: 0
          });
          this.currentTargetTempNozzle = Number(t.state), this.minTargetTempNozzle = t.attributes.limit_min, this.maxTargetTempNozzle = t.attributes.limit_max;
        }
        if (!this._userEditTargetTempHotbed) {
          const t = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_hotbed_temperature", 0, {
            limit_min: 0,
            limit_max: 0
          });
          this.currentTargetTempHotbed = Number(t.state), this.minTargetTempHotbed = t.attributes.limit_min, this.maxTargetTempHotbed = t.attributes.limit_max;
        }
        if (!this._userEditSpeedMode) {
          const t = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_speed_mode", "", {
            available_modes: [],
            job_speed_mode_code: -1
          });
          this.availableSpeedModes = Bi(t), this.currentSpeedModeKey = t.attributes.print_speed_mode_code, this.currentSpeedModeDescr = this.currentSpeedModeKey >= 0 && this.currentSpeedModeKey in this.availableSpeedModes ? this.availableSpeedModes[this.currentSpeedModeKey] : void 0;
        }
      }
    }
    update(t) {
      super.update(t), this._isOpen ? this.style.display = "block" : this.style.display = "none";
    }
    render() {
      return X`
      <div
        class="ac-modal-container"
        style=${Mn({
        height: "auto",
        opacity: 1,
        scale: 1
      })}
        ${rs(Object.assign({}, Do))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this._renderCard()}
        </div>
      </div>
    `;
    }
    _renderCard() {
      return this._confirmationType ? this._renderConfirm() : this._renderSettings();
    }
    _renderConfirm() {
      return X`
      <div>
        <div class="ac-settings-header">Confirm Action</div>
        <div>
          <div class="ac-confirm-description">${this._confirmMessage}</div>
          <div class="ac-confirm-buttons">
            <ha-control-button
              @click=${this._handleConfirmApprove}
              .disabled=${this._changingSettings}
            >
              ${this._buttonYes}
            </ha-control-button>
            <ha-control-button @click=${this._handleConfirmCancel}>
              ${this._buttonNo}
            </ha-control-button>
          </div>
        </div>
      </div>
    `;
    }
    _renderSettings() {
      return X`
      <div>
        <div class="ac-settings-header">Print Settings</div>
        <div>
          <div class="ac-settings-row ac-settings-buttonrow">
            <ha-control-button
              .confirmation_type=${Ke.PAUSE}
              @click=${this._setConfirmationMode}
            >
              ${this._buttonPrintPause}
            </ha-control-button>
          </div>
          <div class="ac-settings-row ac-settings-buttonrow">
            <ha-control-button
              .confirmation_type=${Ke.RESUME}
              @click=${this._setConfirmationMode}
            >
              ${this._buttonPrintResume}
            </ha-control-button>
          </div>
          <div class="ac-settings-row ac-settings-buttonrow">
            <ha-control-button
              .confirmation_type=${Ke.CANCEL}
              @click=${this._setConfirmationMode}
            >
              ${this._buttonPrintCancel}
            </ha-control-button>
          </div>
          ${this.isFDM ? X`
                <div class="ac-settings-row ac-settings-buttonrow">
                  <ha-control-button
                    .disabled=${this._pressingFinishJob}
                    @click=${this._pressFinishJob}
                  >
                    ${this._buttonFinishJob}
                  </ha-control-button>
                </div>
                <div class="ac-settings-row ac-settings-buttonrow-split">
                  <ha-control-button
                    .disabled=${this._pressingRetract}
                    @click=${this._pressRetractFilament}
                  >
                    ${this._buttonRetractFilament}
                  </ha-control-button>
                  <ha-control-button
                    .disabled=${this._pressingExtrude}
                    @click=${this._pressExtrudeFilament}
                  >
                    ${this._buttonExtrudeFilament}
                  </ha-control-button>
                </div>
              ` : Z}
          ${this.isFDM ? X`
                <div class="ac-settings-row">
                  <anycubic-ui-select-dropdown
                    .availableOptions=${this.availableSpeedModes}
                    .placeholder=${this.currentSpeedModeDescr}
                    .initialItem=${this.currentSpeedModeDescr}
                  ></anycubic-ui-select-dropdown>
                  <ha-control-button
                    .disabled=${this._changingSettings}
                    @click=${this._handleSaveSpeedModeButton}
                  >
                    ${this._buttonSaveSpeedMode}
                  </ha-control-button>
                </div>
                <div class="ac-settings-row">
                  <div class="ac-input-group">
                    <label class="ac-input-label"
                      >${this._labelNozzleTemperature}</label
                    >
                    <input
                      class="ac-number-input"
                      type="number"
                      min=${this.minTargetTempNozzle}
                      max=${this.maxTargetTempNozzle}
                      .value=${String(this.currentTargetTempNozzle)}
                      placeholder=${this.currentTargetTempNozzle}
                      @input=${this._handleTargetTempNozzleChange}
                      @keydown=${this._handleTargetTempNozzleKeyDown}
                    />
                  </div>
                  <ha-control-button
                    .disabled=${this._changingSettings}
                    @click=${this._handleSaveTargetTempNozzleButton}
                  >
                    ${this._buttonSaveTargetNozzle}
                  </ha-control-button>
                </div>
                <div class="ac-settings-row">
                  <div class="ac-input-group">
                    <label class="ac-input-label"
                      >${this._labelHotbedTemperature}</label
                    >
                    <input
                      class="ac-number-input"
                      type="number"
                      min=${this.minTargetTempHotbed}
                      max=${this.maxTargetTempHotbed}
                      .value=${String(this.currentTargetTempHotbed)}
                      placeholder=${this.currentTargetTempHotbed}
                      @input=${this._handleTargetTempHotbedChange}
                      @keydown=${this._handleTargetTempHotbedKeyDown}
                    />
                  </div>
                  <ha-control-button
                    .disabled=${this._changingSettings}
                    @click=${this._handleSaveTargetTempHotbedButton}
                  >
                    ${this._buttonSaveTargetHotbed}
                  </ha-control-button>
                </div>
                <div class="ac-settings-row">
                  <div class="ac-input-group">
                    <label class="ac-input-label">${this._labelFanSpeed}</label>
                    <input
                      class="ac-number-input"
                      type="number"
                      .value=${String(this.currentFanSpeed)}
                      placeholder=${this.currentFanSpeed}
                      min="0"
                      max="100"
                      @input=${this._handleFanSpeedChange}
                      @keydown=${this._handleFanSpeedKeyDown}
                    />
                  </div>
                  <ha-control-button
                    .disabled=${this._changingSettings}
                    @click=${this._handleSaveFanSpeedButton}
                  >
                    ${this._buttonSaveFanSpeed}
                  </ha-control-button>
                </div>
                <div class="ac-settings-row ac-disabled-feature">
                  <ha-textfield
                    .value=${this.currentAuxFanSpeed}
                    .placeholder=${this.currentAuxFanSpeed}
                    .label=${this._labelAuxFanSpeed}
                    .type=${"number"}
                    .min=${0}
                    .max=${100}
                    @input=${this._handleAuxFanSpeedChange}
                    @keydown=${this._handleAuxFanSpeedKeyDown}
                  ></ha-textfield>
                  <ha-control-button
                    .disabled=${this._changingSettings}
                    @click=${this._handleSaveAuxFanSpeedButton}
                  >
                    ${this._buttonSaveAuxFanSpeed}
                  </ha-control-button>
                </div>
                <div class="ac-settings-row ac-disabled-feature">
                  <ha-textfield
                    .value=${this.currentBoxFanSpeed}
                    .placeholder=${this.currentBoxFanSpeed}
                    .label=${this._labelBoxFanSpeed}
                    .type=${"number"}
                    .min=${0}
                    .max=${100}
                    @input=${this._handleBoxFanSpeedChange}
                    @keydown=${this._handleBoxFanSpeedKeyDown}
                  ></ha-textfield>
                  <ha-control-button
                    .disabled=${this._changingSettings}
                    @click=${this._handleSaveBoxFanSpeedButton}
                  >
                    ${this._buttonSaveBoxFanSpeed}
                  </ha-control-button>
                </div>
              ` : Z}
        </div>
      </div>
    `;
    }
    _pressHassButton(t) {
      this._changingSettings = !0, this.hass.callService("button", "press", {
        entity_id: ai(this.printerEntityIdPart, "button", t)
      }).then(() => {
        this._changingSettings = !1;
      }).catch(t => {
        this._changingSettings = !1;
      });
    }
    _resetUserEdits() {
      this._userEditFanSpeed = !1, this._userEditAuxFanSpeed = !1, this._userEditBoxFanSpeed = !1, this._userEditTargetTempNozzle = !1, this._userEditTargetTempHotbed = !1, this._userEditSpeedMode = !1;
    }
    _submitChangedSpeedMode() {
      if (this._userEditSpeedMode && this.selectedPrinterDevice) {
        const t = "change_print_speed_mode";
        this._changingSettings = !0, this.hass.callService(Eo, t, {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          speed_mode: this.currentSpeedModeKey
        }).then(() => {
          this._changingSettings = !1;
        }).catch(t => {
          this._changingSettings = !1;
        }), this._closeModal();
      }
    }
    _submitChangedFanSpeed() {
      if (this._userEditFanSpeed && this.selectedPrinterDevice) {
        const t = "change_print_fan_speed";
        this._changingSettings = !0, this.hass.callService(Eo, t, {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          speed: this.currentFanSpeed
        }).then(() => {
          this._changingSettings = !1;
        }).catch(t => {
          this._changingSettings = !1;
        }), this._closeModal();
      }
    }
    _submitChangedAuxFanSpeed() {
      if (this._userEditAuxFanSpeed && this.selectedPrinterDevice) {
        const t = "change_print_aux_fan_speed";
        this._changingSettings = !0, this.hass.callService(Eo, t, {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          speed: this.currentAuxFanSpeed
        }).then(() => {
          this._changingSettings = !1;
        }).catch(t => {
          this._changingSettings = !1;
        }), this._closeModal();
      }
    }
    _submitChangedBoxFanSpeed() {
      if (this._userEditBoxFanSpeed && this.selectedPrinterDevice) {
        const t = "change_print_box_fan_speed";
        this._changingSettings = !0, this.hass.callService(Eo, t, {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          speed: this.currentBoxFanSpeed
        }).then(() => {
          this._changingSettings = !1;
        }).catch(t => {
          this._changingSettings = !1;
        }), this._closeModal();
      }
    }
    _submitChangedTargetTempNozzle() {
      if (this._userEditTargetTempNozzle && this.selectedPrinterDevice) {
        const t = "change_print_target_nozzle_temperature";
        this._changingSettings = !0, this.hass.callService(Eo, t, {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          temperature: this.currentTargetTempNozzle
        }).then(() => {
          this._changingSettings = !1;
        }).catch(t => {
          this._changingSettings = !1;
        }), this._closeModal();
      }
    }
    _submitChangedTargetTempHotbed() {
      if (this._userEditTargetTempHotbed && this.selectedPrinterDevice) {
        const t = "change_print_target_hotbed_temperature";
        this._changingSettings = !0, this.hass.callService(Eo, t, {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          temperature: this.currentTargetTempHotbed
        }).then(() => {
          this._changingSettings = !1;
        }).catch(t => {
          this._changingSettings = !1;
        }), this._closeModal();
      }
    }
    static get styles() {
      return p`
      ${Ts}

      .ac-settings-header {
        font-size: 24px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .ac-settings-row {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
      }

      .ac-disabled-feature {
        display: none;
      }

      ha-textfield {
        min-width: 150px;
        width: 100%;
      }

      .ac-input-group {
        min-width: 150px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      .ac-input-label {
        font-size: 12px;
        color: var(--secondary-text-color, #7f7f7f);
        margin-bottom: 4px;
      }

      .ac-number-input {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 0px 12px;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #ccc);
        background-color: var(
          --card-background-color,
          var(--primary-background-color, white)
        );
        color: var(--primary-text-color);
      }

      .ac-number-input:focus {
        outline: none;
        border-color: var(--primary-color, #03a9f4);
      }

      ha-control-button {
        min-width: 150px;
        margin: 8px 0px 0px 8px;
        font-size: 14px;
      }

      .ac-settings-buttonrow ha-control-button {
        min-width: 100%;
        margin: 8px 0px 0px 8px;
        font-size: 14px;
      }

      .ac-settings-buttonrow-split {
        display: flex;
        flex-direction: row;
        gap: 8px;
      }

      .ac-settings-buttonrow-split ha-control-button {
        flex: 1 1 0;
        min-width: 0;
        margin: 8px 0px 0px 0px;
        font-size: 14px;
      }

      .ac-confirm-description {
        font-size: 16px;
        text-align: center;
      }

      .ac-confirm-buttons {
        display: flex;
        justify-content: center;
      }

      .ac-confirm-buttons ha-control-button {
        margin: 20px 30px 0px 30px;
      }
    `;
    }
  };
  n([vt()], ko.prototype, "hass", void 0), n([vt()], ko.prototype, "language", void 0), n([vt({
    attribute: "selected-printer-device"
  })], ko.prototype, "selectedPrinterDevice", void 0), n([vt({
    attribute: "printer-entities"
  })], ko.prototype, "printerEntities", void 0), n([vt({
    attribute: "printer-entity-id-part"
  })], ko.prototype, "printerEntityIdPart", void 0), n([yt()], ko.prototype, "availableSpeedModes", void 0), n([yt()], ko.prototype, "isFDM", void 0), n([yt()], ko.prototype, "currentSpeedModeKey", void 0), n([yt()], ko.prototype, "currentSpeedModeDescr", void 0), n([yt()], ko.prototype, "_userEditSpeedMode", void 0), n([yt()], ko.prototype, "currentFanSpeed", void 0), n([yt()], ko.prototype, "_userEditFanSpeed", void 0), n([yt()], ko.prototype, "currentAuxFanSpeed", void 0), n([yt()], ko.prototype, "_userEditAuxFanSpeed", void 0), n([yt()], ko.prototype, "currentBoxFanSpeed", void 0), n([yt()], ko.prototype, "_userEditBoxFanSpeed", void 0), n([yt()], ko.prototype, "currentTargetTempNozzle", void 0), n([yt()], ko.prototype, "minTargetTempNozzle", void 0), n([yt()], ko.prototype, "maxTargetTempNozzle", void 0), n([yt()], ko.prototype, "_userEditTargetTempNozzle", void 0), n([yt()], ko.prototype, "currentTargetTempHotbed", void 0), n([yt()], ko.prototype, "minTargetTempHotbed", void 0), n([yt()], ko.prototype, "maxTargetTempHotbed", void 0), n([yt()], ko.prototype, "_userEditTargetTempHotbed", void 0), n([yt()], ko.prototype, "_confirmationType", void 0), n([yt()], ko.prototype, "_isOpen", void 0), n([yt()], ko.prototype, "_confirmMessage", void 0), n([yt()], ko.prototype, "_labelNozzleTemperature", void 0), n([yt()], ko.prototype, "_labelHotbedTemperature", void 0), n([yt()], ko.prototype, "_labelFanSpeed", void 0), n([yt()], ko.prototype, "_labelAuxFanSpeed", void 0), n([yt()], ko.prototype, "_labelBoxFanSpeed", void 0), n([yt()], ko.prototype, "_buttonYes", void 0), n([yt()], ko.prototype, "_buttonNo", void 0), n([yt()], ko.prototype, "_buttonPrintPause", void 0), n([yt()], ko.prototype, "_buttonPrintResume", void 0), n([yt()], ko.prototype, "_buttonPrintCancel", void 0), n([yt()], ko.prototype, "_buttonFinishJob", void 0), n([yt()], ko.prototype, "_buttonRetractFilament", void 0), n([yt()], ko.prototype, "_buttonExtrudeFilament", void 0), n([yt()], ko.prototype, "_pressingRetract", void 0), n([yt()], ko.prototype, "_pressingExtrude", void 0), n([yt()], ko.prototype, "_pressingFinishJob", void 0), n([yt()], ko.prototype, "_buttonSaveSpeedMode", void 0), n([yt()], ko.prototype, "_buttonSaveTargetNozzle", void 0), n([yt()], ko.prototype, "_buttonSaveTargetHotbed", void 0), n([yt()], ko.prototype, "_buttonSaveFanSpeed", void 0), n([yt()], ko.prototype, "_buttonSaveAuxFanSpeed", void 0), n([yt()], ko.prototype, "_buttonSaveBoxFanSpeed", void 0), n([yt()], ko.prototype, "_changingSettings", void 0), ko = n([ns("anycubic-printercard-printsettings_modal")], ko);
  const Mo = {
      keyframeOptions: {
        duration: 250,
        direction: "normal",
        easing: "ease-in-out"
      },
      properties: ["height", "opacity", "scale"]
    },
    Ho = Ii(),
    Io = [We.DryingStatus, We.AceTempCurrent, We.AceTempTarget, We.DryingTime];
  let Bo = class extends ut {
    constructor() {
      super(...arguments), this.monitoredStats = Ho, this.round = !0, this.temperatureUnit = je.C, this._showVideo = !1, this.cameraEntityState = void 0, this.isHidden = !1, this.isPrinting = !1, this.hiddenOverride = !1, this.lightIsOn = !1, this.statusColor = "#ffc107", this.progressPercent = 0, this._togglingLight = !1, this._togglingPower = !1, this.deviceType = Oe.PRINTER, this.linkedDevices = [], this._fwUpdateAvailable = !1, this._togglingBridgeMqtt = !1, this._refreshingBridge = !1, this._toggleVideo = () => {
        this._showVideo = !(!this.cameraEntityState || this._showVideo);
      }, this._openPrintSettingsModal = () => {
        Ne(this._printerCardContainer, "ac-printset-modal", {
          modalOpen: !0
        });
      }, this._openAceSettingsModal = () => {
        Ne(this._printerCardContainer, "ac-mcbsettings-modal", {
          modalOpen: !0,
          box_id: 0
        });
      }, this._toggleLightEntity = () => {
        this._effectiveLightEntityId && (this._togglingLight = !0, this.hass.callService("homeassistant", "toggle", {
          entity_id: this._effectiveLightEntityId
        }).then(() => {
          this._togglingLight = !1;
        }).catch(t => {
          this._togglingLight = !1;
        }));
      }, this._togglePowerEntity = () => {
        this.powerEntityId && (this._togglingPower = !0, this.hass.callService("homeassistant", "toggle", {
          entity_id: this.powerEntityId
        }).then(() => {
          this._togglingPower = !1;
        }).catch(t => {
          this._togglingPower = !1;
        }));
      }, this._toggleHiddenOveride = () => {
        this.hiddenOverride = !this.hiddenOverride;
      }, this._toggleBridgeMqtt = () => {
        const t = li(this.printerEntities, this.printerEntityIdPart, "switch", "manual_mqtt_connection_enabled");
        t && (this._togglingBridgeMqtt = !0, this.hass.callService("switch", "toggle", {
          entity_id: t.entity_id
        }).then(() => {
          this._togglingBridgeMqtt = !1;
        }).catch(t => {
          this._togglingBridgeMqtt = !1;
        }));
      }, this._pressBridgeRefresh = () => {
        const t = li(this.printerEntities, this.printerEntityIdPart, "button", "manual_mqtt_connection_refresh");
        t && (this._refreshingBridge = !0, this.hass.callService("button", "press", {
          entity_id: t.entity_id
        }).then(() => {
          this._refreshingBridge = !1;
        }).catch(t => {
          this._refreshingBridge = !1;
        }));
      }, this._handleLinkedDeviceClick = t => {
        if (!this.route) return;
        const e = t.currentTarget.printer_id,
          i = this.route.prefix;
        history.pushState(null, "", `${i}/${e}/main`), Ne(window, "location-changed", {
          replace: !1
        });
      };
    }
    willUpdate(t) {
      var e, i;
      super.willUpdate(t), t.has("language") && (this._buttonPrintSettings = wn("card.buttons.print_settings", this.language), this._labelBridgeMqtt = wn("card.bridge.mqtt_connection", this.language), this._labelBridgeRefresh = wn("card.bridge.refresh_connection", this.language), this._labelGoToPrinter = wn("card.linked_devices.go_to_printer", this.language), this._labelGoToAce = wn("card.linked_devices.go_to_ace", this.language), this._labelUpdateAvailable = wn("card.badges.update_available", this.language), this._buttonAceSettings = wn("card.buttons.ace_settings", this.language)), t.has("monitoredStats") && (this.monitoredStats = (e = this.monitoredStats, i = Ho, void 0 === e ? i : e)), (t.has("selectedPrinterDevice") || t.has("selectedPrinterID")) && (this.deviceType = ni(this.selectedPrinterDevice)), (t.has("selectedPrinterID") || t.has("selectedPrinterDevice")) && (this.printerEntities = si(this.hass, this.selectedPrinterID), this.deviceType === Oe.ACE ? this.printerEntityIdPart = pi(this.printerEntities) : this.deviceType === Oe.BRIDGE ? this.printerEntityIdPart = ui(this.printerEntities) : this.printerEntityIdPart = hi(this.printerEntities)), (t.has("printers") || t.has("selectedPrinterDevice")) && (this.linkedDevices = function (t, e) {
        if (!t || !e) return [];
        if (ni(e) === Oe.ACE) {
          const i = e.via_device_id ? t[e.via_device_id] : void 0;
          return i ? [i] : [];
        }
        return Object.values(t).filter(t => t.via_device_id === e.id);
      }(this.printers, this.selectedPrinterDevice)), (t.has("hass") || t.has("alwaysShow") || t.has("hiddenOverride") || t.has("selectedPrinterID") || t.has("selectedPrinterDevice")) && (this.deviceType === Oe.BRIDGE ? this._willUpdateBridge() : this.deviceType === Oe.ACE ? this._willUpdateAce() : this._willUpdatePrinter());
    }
    _willUpdatePrinter() {
      var t, e, i;
      this.progressPercent = this._percentComplete(), this.cameraEntityId && (this.cameraEntityState = ei(this.hass, {
        entity_id: this.cameraEntityId
      }));
      const r = this.printerEntityIdPart ? ai(this.printerEntityIdPart, "light", "printer_light") : void 0,
        n = !!r && !!ei(this.hass, {
          entity_id: r
        });
      this._effectiveLightEntityId = null !== (t = this.lightEntityId) && void 0 !== t ? t : n ? r : void 0, this.lightIsOn = ri(this.hass, {
        entity_id: null !== (e = this._effectiveLightEntityId) && void 0 !== e ? e : ""
      }, !0, !1);
      const s = yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_state", "unknown").state.toLowerCase();
      this.isPrinting = Ti(s);
      const o = null === (i = this.alwaysShow) || void 0 === i || i;
      this.isHidden = !o && !this.hiddenOverride && !this.isPrinting, this.statusColor = function (t) {
        return "preheating" === t ? "#ffc107" : Ti(t) ? "#4caf50" : "unknown" === t ? "#f44336" : "operational" === t || "finished" === t ? "#00bcd4" : "#f44336";
      }(s), this._fwUpdateAvailable = "Update Available" === Ei(this.hass, this.printerEntities, this.printerEntityIdPart, "printer_firmware");
    }
    _willUpdateAce() {
      this.isHidden = !1, this._fwUpdateAvailable = "Update Available" === Ei(this.hass, this.printerEntities, this.printerEntityIdPart, "ace_firmware");
      const t = xi(this.hass, this.printerEntities, this.printerEntityIdPart, "drying_active", !0, !1, !1);
      this.statusColor = t ? "#4caf50" : "#8a8a8a";
    }
    _willUpdateBridge() {
      this.isHidden = !1, this._bridgeMqttState = gi(this.hass, this.printerEntities, this.printerEntityIdPart, "manual_mqtt_connection_enabled"), this._bridgeRefreshState = mi(this.hass, this.printerEntities, this.printerEntityIdPart, "manual_mqtt_connection_refresh"), this.statusColor = this._bridgeMqttState && "on" === this._bridgeMqttState.state ? "#4caf50" : "#8a8a8a";
    }
    render() {
      switch (this.deviceType) {
        case Oe.BRIDGE:
          return this._renderBridgeCard();
        case Oe.ACE:
          return this._renderAceCard();
        default:
          return this._renderPrinterCard();
      }
    }
    _renderPrinterCard() {
      const t = {
        "ac-hidden": !this._showVideo
      };
      return X`
      <div class="ac-printer-card">
        <div class="ac-printer-card-mainview">
          ${this._renderHeader()} ${this._renderPrinterContainer()}
          ${this._renderLinkedDevicesRow()}
        </div>
        <anycubic-printercard-camera_view
          class=${An(t)}
          .showVideo=${this._showVideo}
          .toggleVideo=${this._toggleVideo}
          .cameraEntity=${this.cameraEntityState}
        ></anycubic-printercard-camera_view>
        <anycubic-printercard-multicolorbox_modal_spool
          .hass=${this.hass}
          .language=${this.language}
          .selectedPrinterDevice=${this.selectedPrinterDevice}
          .slotColors=${this.slotColors}
        ></anycubic-printercard-multicolorbox_modal_spool>
        <anycubic-printercard-printsettings_modal
          .hass=${this.hass}
          .language=${this.language}
          .selectedPrinterDevice=${this.selectedPrinterDevice}
          .printerEntities=${this.printerEntities}
          .printerEntityIdPart=${this.printerEntityIdPart}
        ></anycubic-printercard-printsettings_modal>
      </div>
    `;
    }
    _renderAceCard() {
      var t;
      const e = {
        "background-color": this.statusColor
      };
      return X`
      <div class="ac-printer-card ac-simple-card">
        <div class="ac-printer-card-mainview">
          <div class="ac-printer-card-header ac-h-justifycenter">
            <div
              class="ac-printer-card-header-status-dot"
              style=${Mn(e)}
            ></div>
            <p class="ac-printer-card-header-status-text">
              ${null === (t = this.selectedPrinterDevice) || void 0 === t ? void 0 : t.name}
            </p>
            ${this._renderFwBadge()}
          </div>
          <div
            class="ac-printer-card-infocontainer"
            ${rs(Object.assign({}, Mo))}
          >
            <div
              class="ac-printer-card-info-animcontainer ac-ace-visualcontainer"
            >
              <anycubic-printercard-multicolorbox_modal_drying
                .hass=${this.hass}
                .language=${this.language}
                .selectedPrinterDevice=${this.selectedPrinterDevice}
                .printerEntities=${this.printerEntities}
                .printerEntityIdPart=${this.printerEntityIdPart}
                .box_id=${0}
                .inline=${!0}
              ></anycubic-printercard-multicolorbox_modal_drying>
            </div>
            <div class="ac-printer-card-info-statscontainer">
              <anycubic-printercard-stats-component
                .hass=${this.hass}
                .language=${this.language}
                .monitoredStats=${Io}
                .printerEntities=${this.printerEntities}
                .printerEntityIdPart=${this.printerEntityIdPart}
                .showPercent=${!1}
                .round=${this.round}
                .use_24hr=${this.use_24hr}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stats-component>
            </div>
          </div>
          <div class="ac-printer-card-infocontainer">
            <div class="ac-printer-card-settingssection">
              <button
                class="ac-printer-card-button-settings"
                @click=${this._openAceSettingsModal}
              >
                <ha-svg-icon .path=${En}></ha-svg-icon>
                ${this._buttonAceSettings}
              </button>
            </div>
          </div>
          ${this._renderLinkedDevicesRow()}
        </div>
        <anycubic-printercard-multicolorbox_modal_spool
          .hass=${this.hass}
          .language=${this.language}
          .selectedPrinterDevice=${this.selectedPrinterDevice}
          .slotColors=${this.slotColors}
        ></anycubic-printercard-multicolorbox_modal_spool>
        <anycubic-printercard-multicolorbox_modal_settings
          .hass=${this.hass}
          .language=${this.language}
          .printerEntities=${this.printerEntities}
          .printerEntityIdPart=${this.printerEntityIdPart}
          .box_id=${0}
        ></anycubic-printercard-multicolorbox_modal_settings>
      </div>
    `;
    }
    _renderBridgeCard() {
      var t, e;
      const i = {
        "background-color": this.statusColor
      };
      return X`
      <div class="ac-printer-card ac-simple-card">
        <div class="ac-printer-card-mainview">
          <div class="ac-printer-card-header ac-h-justifycenter">
            <div
              class="ac-printer-card-header-status-dot"
              style=${Mn(i)}
            ></div>
            <p class="ac-printer-card-header-status-text">
              ${null === (t = this.selectedPrinterDevice) || void 0 === t ? void 0 : t.name}
            </p>
          </div>
          <div class="ac-bridge-card-body">
            <div class="ac-switch-row">
              <span class="ac-switch-row-label">${this._labelBridgeMqtt}</span>
              <anycubic-ui-toggle-switch
                .checked=${"on" === (null === (e = this._bridgeMqttState) || void 0 === e ? void 0 : e.state)}
                .disabled=${this._togglingBridgeMqtt || !this._bridgeMqttState || "unavailable" === this._bridgeMqttState.state}
                @ac-toggle-change=${this._toggleBridgeMqtt}
              ></anycubic-ui-toggle-switch>
            </div>
            <ha-control-button
              .disabled=${this._refreshingBridge || !this._bridgeRefreshState || "unavailable" === this._bridgeRefreshState.state}
              @click=${this._pressBridgeRefresh}
            >
              <ha-svg-icon .path=${"M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"}></ha-svg-icon>
              ${this._labelBridgeRefresh}
            </ha-control-button>
          </div>
          ${this._renderLinkedDevicesRow()}
        </div>
      </div>
    `;
    }
    _renderFwBadge() {
      return this._fwUpdateAvailable ? X`<span class="ac-badge-update">${this._labelUpdateAvailable}</span>` : Z;
    }
    _renderLinkedDevicesRow() {
      if (!this.linkedDevices.length) return Z;
      const t = this.deviceType === Oe.ACE ? this._labelGoToPrinter : this._labelGoToAce;
      return X`
      <div class="ac-linked-devices">
        ${Cn(this.linkedDevices, e => X`
            <button
              class="ac-linked-chip"
              .disabled=${!this.route}
              .printer_id=${e.id}
              title=${t}
              @click=${this._handleLinkedDeviceClick}
            >
              ${e.name}
            </button>
          `)}
      </div>
    `;
    }
    _renderHeader() {
      var t;
      const e = {
          "ac-h-justifycenter": !(this.powerEntityId && this._effectiveLightEntityId)
        },
        i = {
          "background-color": this.statusColor
        };
      return X`
      <div class="ac-printer-card-header ${An(e)}">
        ${this.powerEntityId ? X`
              <button
                class="ac-printer-card-button-small"
                .disabled=${this._togglingPower}
                @click=${this._togglePowerEntity}
              >
                <ha-svg-icon .path=${"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13"}></ha-svg-icon>
              </button>
            ` : Z}

        <button
          class="ac-printer-card-button-name"
          @click=${this._toggleHiddenOveride}
        >
          <div
            class="ac-printer-card-header-status-dot"
            style=${Mn(i)}
          ></div>
          <p class="ac-printer-card-header-status-text">
            ${null === (t = this.selectedPrinterDevice) || void 0 === t ? void 0 : t.name}
          </p>
          ${this._renderFwBadge()}
        </button>
        ${this._effectiveLightEntityId ? X`
              <button
                class="ac-printer-card-button-small"
                .disabled=${this._togglingLight}
                @click=${this._toggleLightEntity}
              >
                <ha-svg-icon
                  .path=${this.lightIsOn ? "M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z" : "M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z"}
                ></ha-svg-icon>
              </button>
            ` : Z}
      </div>
    `;
    }
    _renderPrinterContainer() {
      const t = {
          "ac-card-vertical": !!this.vertical
        },
        e = {
          height: this.isHidden ? "1px" : "auto",
          opacity: this.isHidden ? 0 : 1,
          scale: this.isHidden ? 0 : 1
        },
        i = {
          width: this.vertical ? "100%" : this.scaleFactor ? String(50 * this.scaleFactor) + "%" : "50%"
        },
        r = {
          width: this.vertical ? "100%" : this.scaleFactor ? String(50 / this.scaleFactor) + "%" : "50%"
        };
      return X`
      <div
        class="ac-printer-card-infocontainer ${An(t)}"
        style=${Mn(e)}
        ${rs(Object.assign({}, Mo))}
      >
        <div
          class="ac-printer-card-info-animcontainer ${An(t)}"
          style=${Mn(i)}
        >
          <anycubic-printercard-printer_view
            .hass=${this.hass}
            .printerEntities=${this.printerEntities}
            .printerEntityIdPart=${this.printerEntityIdPart}
            .scaleFactor=${this.scaleFactor}
            .toggleVideo=${this._toggleVideo}
          ></anycubic-printercard-printer_view>
          ${this.vertical ? X`<p class="ac-printer-card-info-vertprog">
                ${this.round ? Math.round(this.progressPercent) : this.progressPercent}%
              </p>` : Z}
        </div>
        <div
          class="ac-printer-card-info-statscontainer ${An(t)}"
          style=${Mn(r)}
        >
          <anycubic-printercard-stats-component
            .hass=${this.hass}
            .language=${this.language}
            .monitoredStats=${this.monitoredStats}
            .printerEntities=${this.printerEntities}
            .printerEntityIdPart=${this.printerEntityIdPart}
            .progressPercent=${this.progressPercent}
            .showPercent=${!this.vertical}
            .round=${this.round}
            .use_24hr=${this.use_24hr}
            .temperatureUnit=${this.temperatureUnit}
          ></anycubic-printercard-stats-component>
        </div>
      </div>
      ${this._renderPrintSettingsContainer()}
    `;
    }
    _renderPrintSettingsContainer() {
      const t = {
          "ac-card-vertical": !!this.vertical
        },
        e = {
          height: this.isHidden ? "1px" : "auto",
          opacity: this.isHidden ? 0 : 1,
          scale: this.isHidden ? 0 : 1
        };
      return this.showSettingsButton || this.isPrinting ? X`
          <div
            class="ac-printer-card-infocontainer ${An(t)}"
            style=${Mn(e)}
            ${rs(Object.assign({}, Mo))}
          >
            <div
              class="ac-printer-card-settingssection ${An(t)}"
            >
              <button
                class="ac-printer-card-button-settings"
                @click=${this._openPrintSettingsModal}
              >
                <ha-svg-icon .path=${En}></ha-svg-icon>
                ${this._buttonPrintSettings}
              </button>
            </div>
          </div>
        ` : Z;
    }
    _percentComplete() {
      return Number(yi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_progress", -1).state);
    }
    static get styles() {
      return p`
      :host {
        display: block;
      }

      .ac-printer-card {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        box-sizing: border-box;
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        position: relative;
        overflow: hidden;
        border-radius: 16px;
        margin: 0px;
        box-shadow: var(
          --ha-card-box-shadow,
          0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          0px 1px 3px 0px rgba(0, 0, 0, 0.12)
        );
      }

      .ac-simple-card {
        padding-bottom: 16px;
      }

      .ac-printer-card-mainview {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
      }

      .ac-printer-card-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        justify-content: space-between;
      }

      .ac-h-justifycenter {
        justify-content: center;
      }

      .ac-printer-card-button-small {
        border: none;
        outline: none;
        background-color: transparent;
        width: 32px;
        height: 32px;
        font-size: 22px;
        line-height: 22px;
        box-sizing: border-box;
        padding: 0px;
        margin-right: 24px;
        margin-left: 24px;
        cursor: pointer;
        color: var(--primary-text-color);
      }

      .ac-printer-card-button-settings {
        border: none;
        border-radius: 6px;
        outline: none;
        background-color: transparent;
        font-size: 18px;
        box-sizing: border-box;
        padding: 4px 12px;
        margin-right: 24px;
        margin-left: 24px;
        cursor: pointer;
        color: var(--primary-text-color);
      }

      .ac-printer-card-button-settings:hover {
        background-color: #7f7f7f36;
      }

      .ac-printer-card-button-settings:active {
        background-color: #7f7f7f5e;
      }

      .ac-printer-card-button-name {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: none;
        outline: none;
        background-color: transparent;
        padding: 24px;
      }
      .ac-printer-card-header-status-dot {
        margin: 0px 10px;
        height: 10px;
        width: 10px;
        border-radius: 5px;
        box-sizing: border-box;
        flex-shrink: 0;
      }

      .ac-printer-card-header-status-text {
        font-weight: bold;
        font-size: 22px;
        margin: 0px;
        color: var(--primary-text-color);
      }

      .ac-badge-update {
        margin-left: 12px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        color: white;
        background-color: #ff9800;
        border-radius: 10px;
        padding: 3px 8px;
      }

      .ac-printer-card-infocontainer {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }

      .ac-printer-card-infocontainer.ac-card-vertical {
        flex-direction: column;
      }

      .ac-printer-card-info-animcontainer {
        box-sizing: border-box;
        padding: 0px 8px 32px 8px;
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .ac-printer-card-info-animcontainer.ac-card-vertical {
        width: 100%;
        height: auto;
        padding-left: 64px;
        padding-right: 64px;
      }

      anycubic-printercard-printer_view {
        width: 100%;
        flex-grow: 1;
      }

      .ac-printer-card-info-vertprog {
        width: 50%;
        font-size: 36px;
        text-align: center;
        font-weight: bold;
      }

      anycubic-printercard-printer_view.ac-card-vertical {
        width: auto;
      }

      .ac-printer-card-info-statscontainer {
        box-sizing: border-box;
        padding: 0px 16px 32px 8px;
        width: 50%;
        height: 100%;
      }

      .ac-printer-card-info-statscontainer.ac-card-vertical {
        padding-left: 32px;
        padding-right: 32px;
        width: 100%;
        height: auto;
      }

      .ac-ace-visualcontainer {
        min-height: 160px;
        align-items: flex-start;
      }

      .ac-ace-visualcontainer anycubic-printercard-multicolorbox_modal_drying {
        width: 100%;
      }

      .ac-bridge-card-body {
        box-sizing: border-box;
        padding: 8px 24px 16px 24px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 340px;
        margin: 0 auto;
      }

      .ac-switch-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .ac-switch-row-label {
        font-size: 15px;
        color: var(--primary-text-color);
      }

      .ac-bridge-card-body ha-control-button {
        min-height: 48px;
      }

      .ac-linked-devices {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        padding: 0px 16px 20px 16px;
        width: 100%;
        box-sizing: border-box;
      }

      .ac-linked-chip {
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 20px;
        background-color: transparent;
        padding: 6px 16px;
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .ac-linked-chip:disabled {
        cursor: default;
        opacity: 0.7;
      }

      .ac-linked-chip:not(:disabled):hover {
        background-color: #7f7f7f24;
      }

      .ac-hidden {
        display: none;
      }
    `;
    }
  };
  n([xt(".ac-printer-card")], Bo.prototype, "_printerCardContainer", void 0), n([vt()], Bo.prototype, "hass", void 0), n([vt()], Bo.prototype, "language", void 0), n([vt({
    attribute: "monitored-stats"
  })], Bo.prototype, "monitoredStats", void 0), n([vt({
    attribute: "selected-printer-id"
  })], Bo.prototype, "selectedPrinterID", void 0), n([vt({
    attribute: "selected-printer-device"
  })], Bo.prototype, "selectedPrinterDevice", void 0), n([vt()], Bo.prototype, "printers", void 0), n([vt()], Bo.prototype, "route", void 0), n([vt({
    type: Boolean
  })], Bo.prototype, "round", void 0), n([vt({
    type: Boolean
  })], Bo.prototype, "use_24hr", void 0), n([vt({
    attribute: "show-settings-button",
    type: Boolean
  })], Bo.prototype, "showSettingsButton", void 0), n([vt({
    attribute: "always-show",
    type: Boolean
  })], Bo.prototype, "alwaysShow", void 0), n([vt({
    attribute: "temperature-unit",
    type: String
  })], Bo.prototype, "temperatureUnit", void 0), n([vt({
    attribute: "light-entity-id",
    type: String
  })], Bo.prototype, "lightEntityId", void 0), n([vt({
    attribute: "power-entity-id",
    type: String
  })], Bo.prototype, "powerEntityId", void 0), n([vt({
    attribute: "camera-entity-id",
    type: String
  })], Bo.prototype, "cameraEntityId", void 0), n([vt({
    type: Boolean
  })], Bo.prototype, "vertical", void 0), n([vt({
    attribute: "scale-factor"
  })], Bo.prototype, "scaleFactor", void 0), n([vt({
    attribute: "slot-colors"
  })], Bo.prototype, "slotColors", void 0), n([yt()], Bo.prototype, "_showVideo", void 0), n([yt()], Bo.prototype, "cameraEntityState", void 0), n([yt()], Bo.prototype, "isHidden", void 0), n([yt()], Bo.prototype, "isPrinting", void 0), n([yt()], Bo.prototype, "hiddenOverride", void 0), n([yt()], Bo.prototype, "lightIsOn", void 0), n([yt()], Bo.prototype, "statusColor", void 0), n([yt()], Bo.prototype, "printerEntities", void 0), n([yt()], Bo.prototype, "printerEntityIdPart", void 0), n([yt()], Bo.prototype, "progressPercent", void 0), n([yt()], Bo.prototype, "_buttonPrintSettings", void 0), n([yt()], Bo.prototype, "_togglingLight", void 0), n([yt()], Bo.prototype, "_togglingPower", void 0), n([yt()], Bo.prototype, "deviceType", void 0), n([yt()], Bo.prototype, "linkedDevices", void 0), n([yt()], Bo.prototype, "_effectiveLightEntityId", void 0), n([yt()], Bo.prototype, "_fwUpdateAvailable", void 0), n([yt()], Bo.prototype, "_bridgeMqttState", void 0), n([yt()], Bo.prototype, "_bridgeRefreshState", void 0), n([yt()], Bo.prototype, "_togglingBridgeMqtt", void 0), n([yt()], Bo.prototype, "_refreshingBridge", void 0), n([yt()], Bo.prototype, "_labelBridgeMqtt", void 0), n([yt()], Bo.prototype, "_labelBridgeRefresh", void 0), n([yt()], Bo.prototype, "_labelGoToPrinter", void 0), n([yt()], Bo.prototype, "_labelGoToAce", void 0), n([yt()], Bo.prototype, "_labelUpdateAvailable", void 0), n([yt()], Bo.prototype, "_buttonAceSettings", void 0), Bo = n([ns("anycubic-printercard-card")], Bo);
  const Fo = [...Ii(), We.PrinterOnline, We.Availability, We.ProjectName, We.CurrentLayer],
    Lo = [...Ii(), We.HotendCurrent, We.BedCurrent, We.HotendTarget, We.BedTarget, We.SpeedMode, We.FanSpeed, We.PrinterOnline, We.Availability, We.ProjectName, We.CurrentLayer],
    No = [We.DryingStatus, We.AceTempCurrent, We.AceTempTarget, We.DryingTime],
    Oo = ["printer_name", "printer_id", "printer_mac", "printer_model", "printer_fw_version", "printer_fw_update_available", "printer_online", "printer_available", "printer_mqtt_active", "curr_nozzle_temp", "curr_hotbed_temp", "target_nozzle_temp", "target_hotbed_temp", "job_state", "job_progress"],
    Ro = ["printer_name", "printer_model", "ace_fw_version", "ace_fw_update_available", "drying_active", "drying_progress"],
    Uo = ["printer_name", "printer_model"],
    zo = Array.from(new Set([...Oo, ...Ro, ...Uo]));
  let jo = class extends ut {
    constructor() {
      super(...arguments), this.deviceType = Oe.PRINTER, this.isFDM = !1, this.monitoredStats = Fo, this.infoFieldKeys = Oo;
    }
    willUpdate(t) {
      var e;
      super.willUpdate(t), t.has("language") && (this._statTranslations = zo.reduce((t, e) => (t[e] = wn(`panels.main.cards.main.fields.${e}`, this.language), t), {})), (t.has("selectedPrinterDevice") || t.has("selectedPrinterID")) && (this.deviceType = ni(this.selectedPrinterDevice), this.printerID = (e = this.selectedPrinterDevice) ? e.serial_number : void 0, this.printerMAC = function (t) {
        return t && t.connections.length > 0 && t.connections[0].length > 1 ? t.connections[0][1] : null;
      }(this.selectedPrinterDevice)), (t.has("selectedPrinterID") || t.has("selectedPrinterDevice")) && (this.printerEntities = si(this.hass, this.selectedPrinterID), this.deviceType === Oe.ACE ? (this.printerEntityIdPart = pi(this.printerEntities), this.infoFieldKeys = Ro) : this.deviceType === Oe.BRIDGE ? (this.printerEntityIdPart = ui(this.printerEntities), this.infoFieldKeys = Uo) : (this.printerEntityIdPart = hi(this.printerEntities), this.infoFieldKeys = Oo)), (t.has("hass") || t.has("selectedPrinterID") || t.has("selectedPrinterDevice")) && (this.deviceType === Oe.ACE ? (this._updateAceInfo(), this.monitoredStats = No) : this.deviceType === Oe.BRIDGE ? this.monitoredStats = Fo : (this._updatePrinterInfo(), this.monitoredStats = this.isFDM ? Lo : Fo));
    }
    _updatePrinterInfo() {
      this.isFDM = Si(this.hass, this.printerEntities, this.printerEntityIdPart), this.printerStateFwUpdateAvailable = Ei(this.hass, this.printerEntities, this.printerEntityIdPart, "printer_firmware"), this.printerStateAvailable = xi(this.hass, this.printerEntities, this.printerEntityIdPart, "is_available", "Available", "Unavailable"), this.printerStateOnline = xi(this.hass, this.printerEntities, this.printerEntityIdPart, "printer_online", "Online", "Offline"), this.printerStateMqttActive = xi(this.hass, this.printerEntities, this.printerEntityIdPart, "mqtt_connection_active", "Active", "Inactive", "unknown"), this.printerStateCurrNozzleTemp = fi(this.hass, this.printerEntities, this.printerEntityIdPart, "nozzle_temperature"), this.printerStateCurrHotbedTemp = fi(this.hass, this.printerEntities, this.printerEntityIdPart, "hotbed_temperature"), this.printerStateTargetNozzleTemp = fi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_nozzle_temperature"), this.printerStateTargetHotbedTemp = fi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_hotbed_temperature");
      const t = fi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_progress");
      this.jobStateProgress = void 0 !== t ? `${t}%` : "0%", this.jobStatePrintState = function (t, e, i, r, n = !1) {
        const s = li(e, 0, "sensor", r);
        if (s) {
          const e = ii(t, s);
          return n ? ti(e) : e;
        }
      }(this.hass, this.printerEntities, this.printerEntityIdPart, "job_state", !0);
    }
    _updateAceInfo() {
      var t;
      this.aceStateFwVersion = null === (t = this.selectedPrinterDevice) || void 0 === t ? void 0 : t.sw_version, this.aceStateFwUpdateAvailable = Ei(this.hass, this.printerEntities, this.printerEntityIdPart, "ace_firmware"), this.aceStateDryingActive = xi(this.hass, this.printerEntities, this.printerEntityIdPart, "drying_active", "Drying", "Not Drying"), this.aceStateDryingRemaining = fi(this.hass, this.printerEntities, this.printerEntityIdPart, "drying_remaining_time"), this.aceStateDryingTotal = fi(this.hass, this.printerEntities, this.printerEntityIdPart, "drying_total_duration"), this.aceDryingProgress = void 0 !== this.aceStateDryingRemaining && void 0 !== this.aceStateDryingTotal ? String((this.aceStateDryingTotal > 0 ? Math.round(1e4 * (1 - this.aceStateDryingRemaining / this.aceStateDryingTotal)) / 100 : 0).toFixed(2)) + "%" : void 0;
    }
    _renderInfoRow(t, e) {
      return X`
      <div class="info-row">
        <span class="info-heading"> ${this._statTranslations[t]}:</span>
        <span class="info-detail">${e}</span>
      </div>
    `;
    }
    _renderOptionalInfoRow(t, e) {
      return void 0 !== e ? this._renderInfoRow(t, e) : null;
    }
    _renderExtraInfo() {
      return this.deviceType === Oe.BRIDGE ? X`
        ${this._renderInfoRow("printer_name", this.selectedPrinterDevice ? this.selectedPrinterDevice.name : null)}
        ${this._renderInfoRow("printer_model", this.selectedPrinterDevice ? this.selectedPrinterDevice.model : null)}
      ` : this.deviceType === Oe.ACE ? X`
        ${this._renderInfoRow("printer_name", this.selectedPrinterDevice ? this.selectedPrinterDevice.name : null)}
        ${this._renderInfoRow("printer_model", this.selectedPrinterDevice ? this.selectedPrinterDevice.model : null)}
        ${this._renderOptionalInfoRow("ace_fw_version", this.aceStateFwVersion)}
        ${this._renderOptionalInfoRow("ace_fw_update_available", this.aceStateFwUpdateAvailable)}
        ${this._renderOptionalInfoRow("drying_active", this.aceStateDryingActive)}
        ${this._renderOptionalInfoRow("drying_progress", this.aceDryingProgress)}
      ` : X`
      ${this._renderInfoRow("printer_name", this.selectedPrinterDevice ? this.selectedPrinterDevice.name : null)}
      ${this._renderInfoRow("printer_id", this.printerID)}
      ${this._renderInfoRow("printer_mac", this.printerMAC)}
      ${this._renderInfoRow("printer_model", this.selectedPrinterDevice ? this.selectedPrinterDevice.model : null)}
      ${this._renderInfoRow("printer_fw_version", this.selectedPrinterDevice ? this.selectedPrinterDevice.sw_version : null)}
      ${this._renderInfoRow("printer_fw_update_available", this.printerStateFwUpdateAvailable)}
      ${this._renderInfoRow("printer_online", this.printerStateOnline)}
      ${this._renderInfoRow("printer_available", this.printerStateAvailable)}
      ${this._renderOptionalInfoRow("printer_mqtt_active", this.printerStateMqttActive)}
      ${this.isFDM ? X`
            ${this._renderInfoRow("curr_nozzle_temp", this.printerStateCurrNozzleTemp)}
            ${this._renderInfoRow("curr_hotbed_temp", this.printerStateCurrHotbedTemp)}
            ${this._renderInfoRow("target_nozzle_temp", this.printerStateTargetNozzleTemp)}
            ${this._renderInfoRow("target_hotbed_temp", this.printerStateTargetHotbedTemp)}
          ` : Z}
      ${this._renderInfoRow("job_state", this.jobStatePrintState)}
      ${this._renderInfoRow("job_progress", this.jobStateProgress)}
    `;
    }
    render() {
      var t, e, i, r, n;
      return X`
      <printer-card elevation="2">
        <anycubic-printercard-card
          .hass=${this.hass}
          .language=${this.language}
          .printers=${this.printers}
          .route=${this.route}
          .selectedPrinterID=${this.selectedPrinterID}
          .selectedPrinterDevice=${this.selectedPrinterDevice}
          .vertical=${null !== (t = this.panel.config.vertical) && void 0 !== t && t}
          .round=${null !== (e = this.panel.config.round) && void 0 !== e && e}
          .use_24hr=${null === (i = this.panel.config.use_24hr) || void 0 === i || i}
          .temperatureUnit=${this.panel.config.temperatureUnit}
          .lightEntityId=${this.panel.config.lightEntityId}
          .powerEntityId=${this.panel.config.powerEntityId}
          .cameraEntityId=${this.panel.config.cameraEntityId}
          .monitoredStats=${null !== (r = this.panel.config.monitoredStats) && void 0 !== r ? r : this.monitoredStats}
          .scaleFactor=${this.panel.config.scaleFactor}
          .slotColors=${this.panel.config.slotColors}
          .showSettingsButton=${null === (n = this.panel.config.showSettingsButton) || void 0 === n || n}
          .alwaysShow=${this.panel.config.alwaysShow}
        ></anycubic-printercard-card>
        <div class="ac-extra-printer-info">${this._renderExtraInfo()}</div>
      </printer-card>
    `;
    }
    static get styles() {
      return p`
      :host {
        padding: 16px;
        display: block;
      }
      printer-card {
        padding: 16px;
        display: block;
        font-size: 18px;
        max-width: 600px;
        margin: 0 auto;
      }

      anycubic-printercard-card {
        margin: 24px;
      }

      .ac-extra-printer-info {
        padding: 20px 40px;
      }

      .info-row {
        margin-bottom: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        box-sizing: border-box;
        width: 100%;
      }

      .info-heading {
        margin-right: 10px;
        font-size: 0.85em;
      }

      .info-detail {
        font-weight: 700;
      }
    `;
    }
  };
  n([vt()], jo.prototype, "hass", void 0), n([vt()], jo.prototype, "language", void 0), n([vt({
    type: Boolean,
    reflect: !0
  })], jo.prototype, "narrow", void 0), n([vt()], jo.prototype, "route", void 0), n([vt()], jo.prototype, "panel", void 0), n([vt()], jo.prototype, "printers", void 0), n([vt({
    attribute: "selected-printer-id"
  })], jo.prototype, "selectedPrinterID", void 0), n([vt({
    attribute: "selected-printer-device"
  })], jo.prototype, "selectedPrinterDevice", void 0), n([yt()], jo.prototype, "deviceType", void 0), n([yt()], jo.prototype, "printerEntities", void 0), n([yt()], jo.prototype, "printerEntityIdPart", void 0), n([yt()], jo.prototype, "printerID", void 0), n([yt()], jo.prototype, "printerMAC", void 0), n([yt()], jo.prototype, "printerStateFwUpdateAvailable", void 0), n([yt()], jo.prototype, "printerStateAvailable", void 0), n([yt()], jo.prototype, "printerStateOnline", void 0), n([yt()], jo.prototype, "printerStateMqttActive", void 0), n([yt()], jo.prototype, "printerStateCurrNozzleTemp", void 0), n([yt()], jo.prototype, "printerStateCurrHotbedTemp", void 0), n([yt()], jo.prototype, "printerStateTargetNozzleTemp", void 0), n([yt()], jo.prototype, "printerStateTargetHotbedTemp", void 0), n([yt()], jo.prototype, "jobStateProgress", void 0), n([yt()], jo.prototype, "jobStatePrintState", void 0), n([yt()], jo.prototype, "aceStateFwVersion", void 0), n([yt()], jo.prototype, "aceStateFwUpdateAvailable", void 0), n([yt()], jo.prototype, "aceStateDryingActive", void 0), n([yt()], jo.prototype, "aceStateDryingRemaining", void 0), n([yt()], jo.prototype, "aceStateDryingTotal", void 0), n([yt()], jo.prototype, "aceDryingProgress", void 0), n([yt()], jo.prototype, "isFDM", void 0), n([yt()], jo.prototype, "monitoredStats", void 0), n([yt()], jo.prototype, "infoFieldKeys", void 0), n([yt()], jo.prototype, "_statTranslations", void 0), jo = n([mt("anycubic-view-main")], jo);
  const Go = p`
  :host {
    padding: 16px;
    display: block;
  }

  .files-card {
    padding: 16px;
    display: block;
    font-size: 18px;
    margin: 0 auto;
    text-align: center;
  }

  .files-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }

  .file-info {
    display: flex;
    min-height: 20px;
    min-width: 250px;
    border: 2px solid #ccc3;
    border-radius: 16px;
    padding: 16px 32px;
    line-height: 20px;
    text-align: center;
    font-weight: 900;
    margin: 6px;
    width: 100%;
    justify-content: space-between;
  }

  .file-name {
    display: block;
    line-height: 20px;
    text-align: center;
    font-weight: 900;
    margin: 6px;
    word-wrap: break-word;
    max-width: calc(100% - 58px);
  }

  .file-info:hover {
    background-color: #ccc3;
    border-color: #ccc9;
  }

  .file-refresh-button {
    padding: 10px;
    margin-bottom: 20px;
  }

  .file-refresh-icon {
    --mdc-icon-size: 50px;
  }

  .file-delete-button {
    padding: 4px;
    margin-left: 10px;
  }

  .file-delete-icon {
  }

  .no-mqtt-msg {
  }

  @media (max-width: 599px) {
    :host {
      padding: 6px;
    }

    .files-card {
      padding: 0px;
    }

    .file-info {
      padding: 6px 6px;
      margin: 6px 0px;
    }
  }
`;
  class Vo extends ut {
    constructor() {
      super(...arguments), this._isRefreshing = !1, this._supportsMQTT = !1, this._httpResponse = !1, this.refreshList = () => {
        this._listRefreshEntity && (this._isRefreshing = !0, this.hass.callService("button", "press", {
          entity_id: this._listRefreshEntity.entity_id
        }).then(() => {
          this._isRefreshing = !1;
        }).catch(t => {
          this._isRefreshing = !1;
        }));
      }, this.deleteFile = t => {};
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("language") && (this._noMqttMessage = wn("common.messages.mqtt_unsupported", this.language)), (t.has("hass") || t.has("selectedPrinterID")) && (this.printerEntities = si(this.hass, this.selectedPrinterID), this.printerEntityIdPart = hi(this.printerEntities), this._supportsMQTT = function (t, e) {
        const i = ei(t, li(e, 0, "binary_sensor", "mqtt_connection_active"));
        return !!i && !!i.attributes.supports_mqtt_login;
      }(this.hass, this.printerEntities, this.printerEntityIdPart));
    }
    render() {
      return X`
      <div class="files-card" elevation="2">
        <button
          .disabled=${!this._httpResponse && !this._supportsMQTT || this._isRefreshing}
          class="file-refresh-button"
          @click=${this.refreshList}
        >
          <ha-icon
            class="file-refresh-icon"
            icon="mdi:refresh"
          >
          </ha-icon>
        </button>
        ${this._httpResponse || this._supportsMQTT ? Z : X` <div class="no-mqtt-msg">${this._noMqttMessage}</div> `}
        <ul class="files-container">
        ${this._fileArray ? this._fileArray.map(t => X`
                  <li class="file-info">
                    <div class="file-name">${t.name}</div>
                    <button
                      class="file-delete-button"
                      .disabled=${this._isDeleting}
                      .file_info=${t}
                      @click=${this.deleteFile}
                    >
                      <ha-icon
                        class="file-delete-icon"
                        icon="mdi:delete"
                      ></ha-icon>
                    </button>
                  </li>
                `) : null}
      </div>
    `;
    }
    static get styles() {
      return p`
      ${Go}
    `;
    }
  }
  n([vt()], Vo.prototype, "hass", void 0), n([vt()], Vo.prototype, "language", void 0), n([vt({
    type: Boolean,
    reflect: !0
  })], Vo.prototype, "narrow", void 0), n([vt()], Vo.prototype, "route", void 0), n([vt()], Vo.prototype, "panel", void 0), n([vt({
    attribute: "selected-printer-id"
  })], Vo.prototype, "selectedPrinterID", void 0), n([vt({
    attribute: "selected-printer-device"
  })], Vo.prototype, "selectedPrinterDevice", void 0), n([yt()], Vo.prototype, "printerEntities", void 0), n([yt()], Vo.prototype, "printerEntityIdPart", void 0), n([yt()], Vo.prototype, "_fileArray", void 0), n([yt()], Vo.prototype, "_listRefreshEntity", void 0), n([yt()], Vo.prototype, "_isRefreshing", void 0), n([yt()], Vo.prototype, "_isDeleting", void 0), n([yt()], Vo.prototype, "_noMqttMessage", void 0), n([yt()], Vo.prototype, "_supportsMQTT", void 0), n([yt()], Vo.prototype, "_httpResponse", void 0);
  let qo = class extends Vo {
    constructor() {
      super(...arguments), this._httpResponse = !0, this.deleteFile = t => {
        const e = t.currentTarget.file_info;
        this.selectedPrinterDevice && e.id && (this._isDeleting = !0, this.hass.callService(Eo, "delete_file_cloud", {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          file_id: e.id
        }).then(() => {
          this._isDeleting = !1;
        }).catch(t => {
          this._isDeleting = !1;
        }));
      };
    }
    willUpdate(t) {
      if (super.willUpdate(t), t.has("hass") || t.has("selectedPrinterID")) {
        const t = ei(this.hass, oi(this.printerEntities, "sensor", "file_list_cloud"));
        this._fileArray = t ? t.attributes.file_info : void 0, this._listRefreshEntity = function (t) {
          return oi(t, "button", "request_file_list_cloud");
        }(this.printerEntities);
      }
    }
  };
  n([yt()], qo.prototype, "_fileArray", void 0), n([yt()], qo.prototype, "_httpResponse", void 0), qo = n([mt("anycubic-view-files_cloud")], qo);
  let Yo = class extends Vo {
    constructor() {
      super(...arguments), this.deleteFile = t => {
        const e = t.currentTarget.file_info;
        this.selectedPrinterDevice && e.name && (this._isDeleting = !0, this.hass.callService(Eo, "delete_file_local", {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          filename: e.name
        }).then(() => {
          this._isDeleting = !1;
        }).catch(t => {
          this._isDeleting = !1;
        }));
      };
    }
    willUpdate(t) {
      if (super.willUpdate(t), t.has("hass") || t.has("selectedPrinterID")) {
        const t = ei(this.hass, oi(this.printerEntities, "sensor", "file_list_local"));
        this._fileArray = t ? t.attributes.file_info : void 0, this._listRefreshEntity = function (t) {
          return oi(t, "button", "request_file_list_local");
        }(this.printerEntities);
      }
    }
  };
  Yo = n([mt("anycubic-view-files_local")], Yo);
  let Wo = class extends Vo {
    constructor() {
      super(...arguments), this.deleteFile = t => {
        const e = t.currentTarget.file_info;
        this.selectedPrinterDevice && e.name && (this._isDeleting = !0, this.hass.callService(Eo, "delete_file_udisk", {
          config_entry: this.selectedPrinterDevice.primary_config_entry,
          device_id: this.selectedPrinterDevice.id,
          filename: e.name
        }).then(() => {
          this._isDeleting = !1;
        }).catch(t => {
          this._isDeleting = !1;
        }));
      };
    }
    willUpdate(t) {
      if (super.willUpdate(t), t.has("hass") || t.has("selectedPrinterID")) {
        const t = ei(this.hass, oi(this.printerEntities, "sensor", "file_list_udisk"));
        this._fileArray = t ? t.attributes.file_info : void 0, this._listRefreshEntity = function (t) {
          return oi(t, "button", "request_file_list_udisk");
        }(this.printerEntities);
      }
    }
  };
  Wo = n([mt("anycubic-view-files_udisk")], Wo);
  const Xo = p`
  :host {
    padding: 16px;
    display: block;
  }
  ac-print-view {
    padding: 16px;
    display: block;
    font-size: 18px;
    max-width: 1024px;
    margin: 0 auto;
  }

  ha-alert {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .print-button {
    margin: auto;
    width: 100px;
    height: 40px;
    display: block;
    margin-top: 20px;
  }
`;
  var Ko;
  !function (t) {
    t.Light = "light", t.Medium = "medium", t.Heavy = "heavy";
  }(Ko || (Ko = {}));
  class Zo extends ut {
    constructor() {
      super(...arguments), this._scriptData = {}, this._serviceName = "", this._buttonProgress = !1, this._scriptDataChanged = t => {
        this._scriptData = Object.assign(Object.assign({}, this._scriptData), t.detail.value), this._error = void 0;
      }, this._runScript = t => {
        const e = t.currentTarget;
        this._error = void 0, t.stopPropagation(), this._buttonProgress = !0, ((t = Ko.Medium) => {
          const e = new Event("haptic");
          e.detail = t, window && window.dispatchEvent(e);
        })(), this.hass.callService(Eo, this._serviceName, this._scriptData.data).then(() => {
          e.actionSuccess(), this._buttonProgress = !1;
        }).catch(t => {
          this._error = t.message, e.actionError(), this._buttonProgress = !1;
        });
      };
    }
    async firstUpdated() {
      await (async () => {
        var t, e, i, r, n, s, o, a;
        if (customElements.get("ha-service-control")) return;
        const l = document.createElement("partial-panel-resolver").getRoutes([{
          component_name: "developer-tools",
          url_path: "a"
        }]);
        await (null === (i = null === (e = null === (t = null == l ? void 0 : l.routes) || void 0 === t ? void 0 : t.a) || void 0 === e ? void 0 : e.load) || void 0 === i ? void 0 : i.call(e));
        const c = document.createElement("developer-tools-router"),
          h = null === (r = null == c ? void 0 : c.routerOptions) || void 0 === r ? void 0 : r.routes;
        (null == h ? void 0 : h.service) && (await (null === (s = null === (n = null == h ? void 0 : h.service) || void 0 === n ? void 0 : n.load) || void 0 === s ? void 0 : s.call(n))), (null == h ? void 0 : h.action) && (await (null === (a = null === (o = null == h ? void 0 : h.action) || void 0 === o ? void 0 : o.load) || void 0 === a ? void 0 : a.call(o)));
      })();
    }
    willUpdate(t) {
      if (super.willUpdate(t), t.has("language") && (this._buttonPrint = wn("common.actions.print", this.language)), t.has("selectedPrinterDevice") && this.selectedPrinterDevice) {
        const t = `${Eo}.${this._serviceName}`;
        this._scriptData = Object.assign(Object.assign({}, this._scriptData), {
          action: t,
          service: t,
          data: Object.assign(Object.assign({}, this._scriptData.data || {}), {
            config_entry: this.selectedPrinterDevice.primary_config_entry,
            device_id: this.selectedPrinterDevice.id
          })
        });
      }
    }
    render() {
      return X`
      <ac-print-view elevation="2">
        <ha-service-control
          hidePicker
          .hass=${this.hass}
          .value=${this._scriptData}
          .showAdvanced=${!0}
          .narrow=${this.narrow}
          @value-changed=${this._scriptDataChanged}
        ></ha-service-control>
        ${void 0 !== this._error ? X`<ha-alert alert-type="error">${this._error}</ha-alert>` : Z}
        <ha-progress-button
          class="print-button"
          raised
          @click=${this._runScript}
          .progress=${this._buttonProgress}
        >
          <ha-svg-icon .path=${"M8,5.14V19.14L19,12.14L8,5.14Z"}></ha-svg-icon>
          ${this._buttonPrint}
        </ha-progress-button>
      </ac-print-view>
    `;
    }
    static get styles() {
      return p`
      ${Xo}
    `;
    }
  }
  n([vt({
    attribute: !1
  })], Zo.prototype, "hass", void 0), n([vt()], Zo.prototype, "language", void 0), n([vt({
    type: Boolean,
    reflect: !0
  })], Zo.prototype, "narrow", void 0), n([vt()], Zo.prototype, "route", void 0), n([vt()], Zo.prototype, "panel", void 0), n([vt({
    attribute: "selected-printer-id"
  })], Zo.prototype, "selectedPrinterID", void 0), n([vt({
    attribute: "selected-printer-device"
  })], Zo.prototype, "selectedPrinterDevice", void 0), n([yt()], Zo.prototype, "_scriptData", void 0), n([yt()], Zo.prototype, "_error", void 0), n([yt()], Zo.prototype, "_serviceName", void 0), n([yt()], Zo.prototype, "_buttonPrint", void 0), n([yt()], Zo.prototype, "_buttonProgress", void 0);
  let Qo = class extends Zo {
    constructor() {
      super(...arguments), this._serviceName = "print_and_upload_no_cloud_save";
    }
  };
  n([yt()], Qo.prototype, "_serviceName", void 0), Qo = n([mt("anycubic-view-print-no_cloud_save")], Qo);
  let Jo = class extends Zo {
    constructor() {
      super(...arguments), this._serviceName = "print_and_upload_save_in_cloud";
    }
  };
  n([yt()], Jo.prototype, "_serviceName", void 0), Jo = n([mt("anycubic-view-print-save_in_cloud")], Jo);
  var ta = "0.9.0";
  window.console.info(`%c ANYCUBIC-PANEL %c v${ta} `, "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray"), t.AnycubicCloudPanel = class extends ut {
    constructor() {
      super(...arguments), this.selectedPage = "main", this.deviceType = Oe.PRINTER, this._handleLocationChange = () => {
        window.location.pathname.includes("anycubic-cloud") && this.requestUpdate();
      }, this._handlePrinterClick = t => {
        ((t, e, i = !1) => {
          const r = `${t.route.prefix}/${e ? `${e}/main` : ""}`;
          i ? history.replaceState(null, "", r) : history.pushState(null, "", r), Ne(window, "location-changed", {
            replace: i
          });
        })(this, t.currentTarget.printer_id), this.requestUpdate();
      }, this.handlePageSelected = t => {
        const e = t.detail.item.getAttribute("page-name");
        e !== Pi(this.route) ? (Ai(this, e), this.requestUpdate()) : scrollTo(0, 0);
      };
    }
    connectedCallback() {
      super.connectedCallback(), window.addEventListener("location-changed", this._handleLocationChange);
    }
    disconnectedCallback() {
      window.removeEventListener("location-changed", this._handleLocationChange), super.disconnectedCallback();
    }
    willUpdate(t) {
      var e, i;
      super.willUpdate(t), t.has("hass") && this.hass.language !== this.language && (this.language = this.hass.language, this._tabMain = wn("panels.main.title", this.language), this._tabFilesLocal = wn("panels.files_local.title", this.language), this._tabFilesUdisk = wn("panels.files_udisk.title", this.language), this._tabFilesCloud = wn("panels.files_cloud.title", this.language), this._tabPrintNoSave = wn("panels.print_no_cloud_save.title", this.language), this._tabPrintSave = wn("panels.print_save_in_cloud.title", this.language), this._tabDebug = wn("panels.debug.title", this.language), this._mainTitle = wn("title", this.language), this._selectPrinter = wn("panels.initial.printer_select", this.language), this._typeLabelPrinter = wn("panels.initial.type_printer", this.language), this._typeLabelAce = wn("panels.initial.type_ace", this.language), this._typeLabelBridge = wn("panels.initial.type_bridge", this.language)), t.has("route") && (this.printers = function (t) {
        const e = {};
        for (const i in t.devices) {
          const r = t.devices[i];
          "Anycubic" === r.manufacturer && ni(r) !== Oe.BRIDGE && (e[r.id] = r);
        }
        return e;
      }(this.hass), this.selectedPage = Pi(this.route), this.selectedPrinterID = $i(this.route), this.selectedPrinterDevice = (e = this.printers, i = this.selectedPrinterID, e && i ? e[i] : void 0), this.deviceType = ni(this.selectedPrinterDevice), this.deviceType !== Oe.PRINTER && "main" !== this.selectedPage && "debug" !== this.selectedPage && (this.selectedPage = "main", Ai(this, "main")));
    }
    render() {
      return this.getInitialView();
    }
    renderPrinterPage() {
      return X`
      <div class="header">
        ${this.renderToolbar()}
        <ha-tabs
          scrollable
          attr-for-selected="page-name"
          .selected=${this.selectedPage}
          @iron-activate=${this.handlePageSelected}
        >
          <paper-tab page-name="main"> ${this._tabMain} </paper-tab>
          ${this.deviceType === Oe.PRINTER ? X`
                <paper-tab page-name="local-files">
                  ${this._tabFilesLocal}
                </paper-tab>
                <paper-tab page-name="udisk-files">
                  ${this._tabFilesUdisk}
                </paper-tab>
                <paper-tab page-name="cloud-files">
                  ${this._tabFilesCloud}
                </paper-tab>
                <paper-tab page-name="print-no_cloud_save">
                  ${this._tabPrintNoSave}
                </paper-tab>
                <paper-tab page-name="print-save_in_cloud">
                  ${this._tabPrintSave}
                </paper-tab>
              ` : null}
          ${null}
        </ha-tabs>
      </div>
      <div class="view">${this.getView(this.route)}</div>
    `;
    }
    _deviceTypeLabel(t) {
      const e = ni(t);
      return e === Oe.ACE ? this._typeLabelAce : e === Oe.BRIDGE ? this._typeLabelBridge : this._typeLabelPrinter;
    }
    renderToolbar() {
      return X`
      <div class="toolbar">
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div class="main-title">${this._mainTitle}</div>
        <div class="version">v${ta}</div>
      </div>
    `;
    }
    getInitialView() {
      return this.selectedPrinterID ? this.renderPrinterPage() : X`
        <div class="header">${this.renderToolbar()}</div>
        <printer-select elevation="2">
          <p>${this._selectPrinter}</p>
          <ul class="printers-container">
            ${this.printers ? Object.keys(this.printers).map(t => {
        const e = this.printers;
        return X`<li
                    class="printer-select-box"
                    .printer_id=${t}
                    @click=${this._handlePrinterClick}
                  >
                    <div class="printer-select-name">
                      ${e[t].name}
                    </div>
                    <div class="printer-select-type">
                      ${this._deviceTypeLabel(e[t])}
                    </div>
                  </li>`;
      }) : null}
          </ul>
        </printer-select>
      `;
    }
    getView(t) {
      switch (this.selectedPage) {
        case "local-files":
          return X`
          <anycubic-view-files_local
            class="ac_wide_view"
            .hass=${this.hass}
            .language=${this.language}
            .narrow=${this.narrow}
            .route=${t}
            .panel=${this.panel}
            .selectedPrinterID=${this.selectedPrinterID}
            .selectedPrinterDevice=${this.selectedPrinterDevice}
          ></anycubic-view-files_local>
        `;
        case "udisk-files":
          return X`
          <anycubic-view-files_udisk
            class="ac_wide_view"
            .hass=${this.hass}
            .language=${this.language}
            .narrow=${this.narrow}
            .route=${t}
            .panel=${this.panel}
            .selectedPrinterID=${this.selectedPrinterID}
            .selectedPrinterDevice=${this.selectedPrinterDevice}
          ></anycubic-view-files_udisk>
        `;
        case "cloud-files":
          return X`
          <anycubic-view-files_cloud
            class="ac_wide_view"
            .hass=${this.hass}
            .language=${this.language}
            .narrow=${this.narrow}
            .route=${t}
            .panel=${this.panel}
            .selectedPrinterID=${this.selectedPrinterID}
            .selectedPrinterDevice=${this.selectedPrinterDevice}
          ></anycubic-view-files_cloud>
        `;
        case "print-no_cloud_save":
          return X`
          <anycubic-view-print-no_cloud_save
            class="ac_wide_view"
            .hass=${this.hass}
            .language=${this.language}
            .narrow=${this.narrow}
            .route=${t}
            .panel=${this.panel}
            .selectedPrinterID=${this.selectedPrinterID}
            .selectedPrinterDevice=${this.selectedPrinterDevice}
          ></anycubic-view-print-no_cloud_save>
        `;
        case "print-save_in_cloud":
          return X`
          <anycubic-view-print-save_in_cloud
            class="ac_wide_view"
            .hass=${this.hass}
            .language=${this.language}
            .narrow=${this.narrow}
            .route=${t}
            .panel=${this.panel}
            .selectedPrinterID=${this.selectedPrinterID}
            .selectedPrinterDevice=${this.selectedPrinterDevice}
          ></anycubic-view-print-save_in_cloud>
        `;
        case "main":
          return X`
          <anycubic-view-main
            .hass=${this.hass}
            .language=${this.language}
            .narrow=${this.narrow}
            .route=${t}
            .panel=${this.panel}
            .printers=${this.printers}
            .selectedPrinterID=${this.selectedPrinterID}
            .selectedPrinterDevice=${this.selectedPrinterDevice}
          ></anycubic-view-main>
        `;
        case "debug":
          return X`
          <anycubic-view-debug
            .hass=${this.hass}
            .language=${this.language}
            .narrow=${this.narrow}
            .route=${t}
            .panel=${this.panel}
            .printers=${this.printers}
            .selectedPrinterID=${this.selectedPrinterID}
            .selectedPrinterDevice=${this.selectedPrinterDevice}
          ></anycubic-view-debug>
        `;
        default:
          return X`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a
              page from the menu above to continue.
            </div>
          </ha-card>
        `;
      }
    }
    static get styles() {
      return p`
      :host {
        padding: 16px;
        display: block;
      }
      .header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
      }
      .toolbar {
        height: var(--header-height);
        display: flex;
        align-items: center;
        font-size: 20px;
        padding: 0 16px;
        font-weight: 400;
        box-sizing: border-box;
      }
      .main-title {
        margin: 0 0 0 24px;
        line-height: 20px;
        flex-grow: 1;
      }
      ha-tabs {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --paper-tabs-selection-bar-color: var(
          --app-header-selection-bar-color,
          var(--app-header-text-color, #fff)
        );
        text-transform: uppercase;
      }

      .version {
        font-size: 14px;
        font-weight: 500;
        color: rgba(var(--rgb-text-primary-color), 0.9);
      }

      printer-select {
        padding: 16px;
        display: block;
        font-size: 18px;
        max-width: 1024px;
        margin: 0 auto;
      }

      .view {
        height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
      }

      .view > * {
        min-width: 600px;
        max-width: 1024px;
      }

      .view > *:last-child {
        margin-bottom: 20px;
      }

      .ac_wide_view {
        width: 100%;
      }

      .printers-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .printer-select-box {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 60px;
        min-width: 250px;
        border: 2px solid #ccc3;
        border-radius: 16px;
        padding: 16px;
        text-align: center;
        font-weight: 900;
      }

      .printer-select-name {
        font-weight: 900;
      }

      .printer-select-type {
        font-weight: 400;
        font-size: 0.75em;
        opacity: 0.7;
        margin-top: 4px;
      }

      .printer-select-box:hover {
        background-color: #ccc3;
        border-color: #ccc9;
      }
      @media (max-width: 599px) {
        .view > * {
          min-width: 100%;
          max-width: 100%;
        }
      }
    `;
    }
  }, n([vt()], t.AnycubicCloudPanel.prototype, "hass", void 0), n([vt({
    type: Boolean,
    reflect: !0
  })], t.AnycubicCloudPanel.prototype, "narrow", void 0), n([vt()], t.AnycubicCloudPanel.prototype, "route", void 0), n([vt()], t.AnycubicCloudPanel.prototype, "panel", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "printers", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "selectedPage", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "selectedPrinterID", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "selectedPrinterDevice", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "deviceType", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "language", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_tabMain", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_tabFilesLocal", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_tabFilesUdisk", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_tabFilesCloud", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_tabPrintNoSave", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_tabPrintSave", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_tabDebug", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_mainTitle", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_selectPrinter", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_typeLabelPrinter", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_typeLabelAce", void 0), n([yt()], t.AnycubicCloudPanel.prototype, "_typeLabelBridge", void 0), t.AnycubicCloudPanel = n([mt("anycubic-cloud-panel")], t.AnycubicCloudPanel), Object.defineProperty(t, "__esModule", {
    value: !0
  });
}({});
