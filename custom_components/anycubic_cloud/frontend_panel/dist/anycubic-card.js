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
      for (var e, i = 1, r = arguments.length; i < r; i++) for (var s in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
      return t;
    }, r.apply(this, arguments);
  };
  function s(t, e, i, r) {
    var s,
      n = arguments.length,
      o = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, r);else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, i, o) : s(e, i)) || o);
    return n > 3 && o && Object.defineProperty(e, i, o), o;
  }
  function n(t, e, i) {
    if (i || 2 === arguments.length) for (var r, s = 0, n = e.length; s < n; s++) !r && s in e || (r || (r = Array.prototype.slice.call(e, 0, s)), r[s] = e[s]);
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
    u = (t, ...e) => {
      const i = 1 === t.length ? t[0] : e.reduce((e, i, r) => e + (t => {
        if (!0 === t._$cssResult$) return t.cssText;
        if ("number" == typeof t) return t;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(i) + t[r + 1], t[0]);
      return new h(i, t, l);
    },
    p = a ? t => t : t => t instanceof CSSStyleSheet ? (t => {
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
      getOwnPropertySymbols: y,
      getPrototypeOf: v
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
    C = (t, e) => !g(t, e),
    A = {
      attribute: !0,
      type: String,
      converter: $,
      reflect: !1,
      hasChanged: C
    };
  Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= new WeakMap();
  class T extends HTMLElement {
    static addInitializer(t) {
      this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t, e = A) {
      if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
        const i = Symbol(),
          r = this.getPropertyDescriptor(t, i, e);
        void 0 !== r && m(this.prototype, t, r);
      }
    }
    static getPropertyDescriptor(t, e, i) {
      const {
        get: r,
        set: s
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
          const n = r?.call(this);
          s.call(this, e), this.requestUpdate(t, n, i);
        },
        configurable: !0,
        enumerable: !0
      };
    }
    static getPropertyOptions(t) {
      return this.elementProperties.get(t) ?? A;
    }
    static _$Ei() {
      if (this.hasOwnProperty(S("elementProperties"))) return;
      const t = v(this);
      t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(S("finalized"))) return;
      if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
        const t = this.properties,
          e = [..._(t), ...y(t)];
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
        for (const t of i) e.unshift(p(t));
      } else void 0 !== t && e.push(p(t));
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
        const s = (void 0 !== i.converter?.toAttribute ? i.converter : $).toAttribute(e, i.type);
        this._$Em = t, null == s ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
      }
    }
    _$AK(t, e) {
      const i = this.constructor,
        r = i._$Eh.get(t);
      if (void 0 !== r && this._$Em !== r) {
        const t = i.getPropertyOptions(r),
          s = "function" == typeof t.converter ? {
            fromAttribute: t.converter
          } : void 0 !== t.converter?.fromAttribute ? t.converter : $;
        this._$Em = r, this[r] = s.fromAttribute(e, t.type), this._$Em = null;
      }
    }
    requestUpdate(t, e, i) {
      if (void 0 !== t) {
        if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? C)(this[t], e)) return;
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
  T.elementStyles = [], T.shadowRootOptions = {
    mode: "open"
  }, T[S("elementProperties")] = new Map(), T[S("finalized")] = new Map(), E?.({
    ReactiveElement: T
  }), (f.reactiveElementVersions ??= []).push("2.0.4");
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const P = globalThis,
    k = P.trustedTypes,
    M = k ? k.createPolicy("lit-html", {
      createHTML: t => t
    }) : void 0,
    D = "$lit$",
    H = `lit$${Math.random().toFixed(9).slice(2)}$`,
    B = "?" + H,
    I = `<${B}>`,
    F = document,
    L = () => F.createComment(""),
    O = t => null === t || "object" != typeof t && "function" != typeof t,
    N = Array.isArray,
    U = t => N(t) || "function" == typeof t?.[Symbol.iterator],
    R = "[ \t\n\f\r]",
    z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    j = /-->/g,
    G = />/g,
    V = RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
    Y = /'/g,
    q = /"/g,
    W = /^(?:script|style|textarea|title)$/i,
    X = (t => (e, ...i) => ({
      _$litType$: t,
      strings: e,
      values: i
    }))(1),
    Z = Symbol.for("lit-noChange"),
    K = Symbol.for("lit-nothing"),
    Q = new WeakMap(),
    J = F.createTreeWalker(F, 129);
  function tt(t, e) {
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== M ? M.createHTML(e) : e;
  }
  const et = (t, e) => {
    const i = t.length - 1,
      r = [];
    let s,
      n = 2 === e ? "<svg>" : "",
      o = z;
    for (let e = 0; e < i; e++) {
      const i = t[e];
      let a,
        l,
        c = -1,
        h = 0;
      for (; h < i.length && (o.lastIndex = h, l = o.exec(i), null !== l);) h = o.lastIndex, o === z ? "!--" === l[1] ? o = j : void 0 !== l[1] ? o = G : void 0 !== l[2] ? (W.test(l[2]) && (s = RegExp("</" + l[2], "g")), o = V) : void 0 !== l[3] && (o = V) : o === V ? ">" === l[0] ? (o = s ?? z, c = -1) : void 0 === l[1] ? c = -2 : (c = o.lastIndex - l[2].length, a = l[1], o = void 0 === l[3] ? V : '"' === l[3] ? q : Y) : o === q || o === Y ? o = V : o === j || o === G ? o = z : (o = V, s = void 0);
      const d = o === V && t[e + 1].startsWith("/>") ? " " : "";
      n += o === z ? i + I : c >= 0 ? (r.push(a), i.slice(0, c) + D + i.slice(c) + H + d) : i + H + (-2 === c ? e : d);
    }
    return [tt(t, n + (t[i] || "<?>") + (2 === e ? "</svg>" : "")), r];
  };
  class it {
    constructor({
      strings: t,
      _$litType$: e
    }, i) {
      let r;
      this.parts = [];
      let s = 0,
        n = 0;
      const o = t.length - 1,
        a = this.parts,
        [l, c] = et(t, e);
      if (this.el = it.createElement(l, i), J.currentNode = this.el.content, 2 === e) {
        const t = this.el.content.firstChild;
        t.replaceWith(...t.childNodes);
      }
      for (; null !== (r = J.nextNode()) && a.length < o;) {
        if (1 === r.nodeType) {
          if (r.hasAttributes()) for (const t of r.getAttributeNames()) if (t.endsWith(D)) {
            const e = c[n++],
              i = r.getAttribute(t).split(H),
              o = /([.?@])?(.*)/.exec(e);
            a.push({
              type: 1,
              index: s,
              name: o[2],
              strings: i,
              ctor: "." === o[1] ? at : "?" === o[1] ? lt : "@" === o[1] ? ct : ot
            }), r.removeAttribute(t);
          } else t.startsWith(H) && (a.push({
            type: 6,
            index: s
          }), r.removeAttribute(t));
          if (W.test(r.tagName)) {
            const t = r.textContent.split(H),
              e = t.length - 1;
            if (e > 0) {
              r.textContent = k ? k.emptyScript : "";
              for (let i = 0; i < e; i++) r.append(t[i], L()), J.nextNode(), a.push({
                type: 2,
                index: ++s
              });
              r.append(t[e], L());
            }
          }
        } else if (8 === r.nodeType) if (r.data === B) a.push({
          type: 2,
          index: s
        });else {
          let t = -1;
          for (; -1 !== (t = r.data.indexOf(H, t + 1));) a.push({
            type: 7,
            index: s
          }), t += H.length - 1;
        }
        s++;
      }
    }
    static createElement(t, e) {
      const i = F.createElement("template");
      return i.innerHTML = t, i;
    }
  }
  function rt(t, e, i = t, r) {
    if (e === Z) return e;
    let s = void 0 !== r ? i._$Co?.[r] : i._$Cl;
    const n = O(e) ? void 0 : e._$litDirective$;
    return s?.constructor !== n && (s?._$AO?.(!1), void 0 === n ? s = void 0 : (s = new n(t), s._$AT(t, i, r)), void 0 !== r ? (i._$Co ??= [])[r] = s : i._$Cl = s), void 0 !== s && (e = rt(t, s._$AS(t, e.values), s, r)), e;
  }
  class st {
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
      let s = J.nextNode(),
        n = 0,
        o = 0,
        a = i[0];
      for (; void 0 !== a;) {
        if (n === a.index) {
          let e;
          2 === a.type ? e = new nt(s, s.nextSibling, this, t) : 1 === a.type ? e = new a.ctor(s, a.name, a.strings, this, t) : 6 === a.type && (e = new ht(s, this, t)), this._$AV.push(e), a = i[++o];
        }
        n !== a?.index && (s = J.nextNode(), n++);
      }
      return J.currentNode = F, r;
    }
    p(t) {
      let e = 0;
      for (const i of this._$AV) void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
    }
  }
  class nt {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, e, i, r) {
      this.type = 2, this._$AH = K, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
      t = rt(this, t, e), O(t) ? t === K || null == t || "" === t ? (this._$AH !== K && this._$AR(), this._$AH = K) : t !== this._$AH && t !== Z && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : U(t) ? this.k(t) : this._(t);
    }
    S(t) {
      return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
      this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
    }
    _(t) {
      this._$AH !== K && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(F.createTextNode(t)), this._$AH = t;
    }
    $(t) {
      const {
          values: e,
          _$litType$: i
        } = t,
        r = "number" == typeof i ? this._$AC(t) : (void 0 === i.el && (i.el = it.createElement(tt(i.h, i.h[0]), this.options)), i);
      if (this._$AH?._$AD === r) this._$AH.p(e);else {
        const t = new st(r, this),
          i = t.u(this.options);
        t.p(e), this.T(i), this._$AH = t;
      }
    }
    _$AC(t) {
      let e = Q.get(t.strings);
      return void 0 === e && Q.set(t.strings, e = new it(t)), e;
    }
    k(t) {
      N(this._$AH) || (this._$AH = [], this._$AR());
      const e = this._$AH;
      let i,
        r = 0;
      for (const s of t) r === e.length ? e.push(i = new nt(this.S(L()), this.S(L()), this, this.options)) : i = e[r], i._$AI(s), r++;
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
    constructor(t, e, i, r, s) {
      this.type = 1, this._$AH = K, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = s, i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = K;
    }
    _$AI(t, e = this, i, r) {
      const s = this.strings;
      let n = !1;
      if (void 0 === s) t = rt(this, t, e, 0), n = !O(t) || t !== this._$AH && t !== Z, n && (this._$AH = t);else {
        const r = t;
        let o, a;
        for (t = s[0], o = 0; o < s.length - 1; o++) a = rt(this, r[i + o], e, o), a === Z && (a = this._$AH[o]), n ||= !O(a) || a !== this._$AH[o], a === K ? t = K : t !== K && (t += (a ?? "") + s[o + 1]), this._$AH[o] = a;
      }
      n && !r && this.j(t);
    }
    j(t) {
      t === K ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
  }
  class at extends ot {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t) {
      this.element[this.name] = t === K ? void 0 : t;
    }
  }
  class lt extends ot {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== K);
    }
  }
  class ct extends ot {
    constructor(t, e, i, r, s) {
      super(t, e, i, r, s), this.type = 5;
    }
    _$AI(t, e = this) {
      if ((t = rt(this, t, e, 0) ?? K) === Z) return;
      const i = this._$AH,
        r = t === K && i !== K || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive,
        s = t !== K && (i === K || r);
      r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
      P: D,
      A: H,
      C: B,
      M: 1,
      L: et,
      R: st,
      D: U,
      V: rt,
      I: nt,
      H: ot,
      N: lt,
      U: ct,
      B: at,
      F: ht
    },
    ut = P.litHtmlPolyfillSupport;
  ut?.(it, nt), (P.litHtmlVersions ??= []).push("3.1.4");
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  class pt extends T {
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
        let s = r._$litPart$;
        if (void 0 === s) {
          const t = i?.renderBefore ?? null;
          r._$litPart$ = s = new nt(e.insertBefore(L(), t), t, void 0, i ?? {});
        }
        return s._$AI(t), s;
      })(e, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
      return Z;
    }
  }
  pt._$litElement$ = !0, pt.finalized = !0, globalThis.litElementHydrateSupport?.({
    LitElement: pt
  });
  const gt = globalThis.litElementPolyfillSupport;
  gt?.({
    LitElement: pt
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
      hasChanged: C
    },
    _t = (t = bt, e, i) => {
      const {
        kind: r,
        metadata: s
      } = i;
      let n = globalThis.litPropertyMetadata.get(s);
      if (void 0 === n && globalThis.litPropertyMetadata.set(s, n = new Map()), n.set(i.name, t), "accessor" === r) {
        const {
          name: r
        } = i;
        return {
          set(i) {
            const s = e.get.call(this);
            e.set.call(this, i), this.requestUpdate(r, s, t);
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
          const s = this[r];
          e.call(this, i), this.requestUpdate(r, s, t);
        };
      }
      throw Error("Unsupported decorator location: " + r);
    };
  function yt(t) {
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
  function vt(t) {
    return yt({
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
    return (i, r, s) => {
      const n = e => e.renderRoot?.querySelector(t) ?? null;
      if (e) {
        const {
          get: t,
          set: e
        } = "object" == typeof r ? i : s ?? (() => {
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
            return void 0 === i && (i = n(this), (null !== i || this.hasUpdated) && e.call(this, i)), i;
          }
        });
      }
      return ft(i, r, {
        get() {
          return n(this);
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
      return `${$t.format(this)} ${Ct.format(this)} ${this.getFullYear()}`;
    }
    toTimeString() {
      return `${At.format(this)} GMT+0000 (Coordinated Universal Time)`;
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
    Ct = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC"
    }),
    At = new Intl.DateTimeFormat("en-GB", {
      hour12: !1,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC"
    });
  const Tt = t => new St(+new Date(t)),
    Pt = 6048e5,
    kt = 864e5,
    Mt = 6e4,
    Dt = 36e5,
    Ht = Symbol.for("constructDateFrom");
  function Bt(t, e) {
    return "function" == typeof t ? t(e) : t && "object" == typeof t && Ht in t ? t[Ht](e) : t instanceof Date ? new t.constructor(e) : new Date(e);
  }
  function It(t, e) {
    return Bt(e || t, t);
  }
  function Ft(t, e, i) {
    const {
        years: r = 0,
        months: s = 0,
        weeks: n = 0,
        days: o = 0,
        hours: a = 0,
        minutes: l = 0,
        seconds: c = 0
      } = e,
      h = It(t, i?.in),
      d = s || r ? function (t, e, i) {
        const r = It(t, i?.in);
        if (isNaN(e)) return Bt(i?.in || t, NaN);
        if (!e) return r;
        const s = r.getDate(),
          n = Bt(i?.in || t, r.getTime());
        return n.setMonth(r.getMonth() + e + 1, 0), s >= n.getDate() ? n : (r.setFullYear(n.getFullYear(), n.getMonth(), s), r);
      }(h, s + 12 * r) : h,
      u = o || n ? function (t, e, i) {
        const r = It(t, i?.in);
        return isNaN(e) ? Bt(i?.in || t, NaN) : e ? (r.setDate(r.getDate() + e), r) : r;
      }(d, o + 7 * n) : d,
      p = 1e3 * (c + 60 * (l + 60 * a));
    return Bt(i?.in || t, +u + p);
  }
  let Lt = {};
  function Ot() {
    return Lt;
  }
  function Nt(t, e) {
    const i = Ot(),
      r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? i.weekStartsOn ?? i.locale?.options?.weekStartsOn ?? 0,
      s = It(t, e?.in),
      n = s.getDay(),
      o = (n < r ? 7 : 0) + n - r;
    return s.setDate(s.getDate() - o), s.setHours(0, 0, 0, 0), s;
  }
  function Ut(t, e) {
    return Nt(t, {
      ...e,
      weekStartsOn: 1
    });
  }
  function Rt(t, e) {
    const i = It(t, e?.in),
      r = i.getFullYear(),
      s = Bt(i, 0);
    s.setFullYear(r + 1, 0, 4), s.setHours(0, 0, 0, 0);
    const n = Ut(s),
      o = Bt(i, 0);
    o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
    const a = Ut(o);
    return i.getTime() >= n.getTime() ? r + 1 : i.getTime() >= a.getTime() ? r : r - 1;
  }
  function zt(t) {
    const e = It(t),
      i = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
    return i.setUTCFullYear(e.getFullYear()), +t - +i;
  }
  function jt(t, ...e) {
    const i = Bt.bind(null, t || e.find(t => "object" == typeof t));
    return e.map(i);
  }
  function Gt(t, e) {
    const i = It(t, e?.in);
    return i.setHours(0, 0, 0, 0), i;
  }
  function Vt(t, e, i) {
    const [r, s] = jt(i?.in, t, e),
      n = Gt(r),
      o = Gt(s),
      a = +n - zt(n),
      l = +o - zt(o);
    return Math.round((a - l) / kt);
  }
  function Yt(t, e) {
    const i = +It(t) - +It(e);
    return i < 0 ? -1 : i > 0 ? 1 : i;
  }
  function qt(t) {
    return !(!((e = t) instanceof Date || "object" == typeof e && "[object Date]" === Object.prototype.toString.call(e)) && "number" != typeof t || isNaN(+It(t)));
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
  function Zt(t, e) {
    return +It(t) - +It(e);
  }
  function Kt(t, e) {
    const i = It(t, e?.in);
    return +function (t, e) {
      const i = It(t, e?.in);
      return i.setHours(23, 59, 59, 999), i;
    }(i, e) == +function (t, e) {
      const i = It(t, e?.in),
        r = i.getMonth();
      return i.setFullYear(i.getFullYear(), r + 1, 0), i.setHours(23, 59, 59, 999), i;
    }(i, e);
  }
  function Qt(t, e, i) {
    const [r, s, n] = jt(i?.in, t, t, e),
      o = Yt(s, n),
      a = Math.abs(function (t, e, i) {
        const [r, s] = jt(i?.in, t, e);
        return 12 * (r.getFullYear() - s.getFullYear()) + (r.getMonth() - s.getMonth());
      }(s, n));
    if (a < 1) return 0;
    1 === s.getMonth() && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - o * a);
    let l = Yt(s, n) === -o;
    Kt(r) && 1 === a && 1 === Yt(r, n) && (l = !1);
    const c = o * (a - +l);
    return 0 === c ? 0 : c;
  }
  function Jt(t, e, i) {
    const [r, s] = jt(i?.in, t, e),
      n = Yt(r, s),
      o = Math.abs(function (t, e, i) {
        const [r, s] = jt(i?.in, t, e);
        return r.getFullYear() - s.getFullYear();
      }(r, s));
    r.setFullYear(1584), s.setFullYear(1584);
    const a = n * (o - +(Yt(r, s) === -n));
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
  function se(t) {
    return (e, i) => {
      let r;
      if ("formatting" === (i?.context ? String(i.context) : "standalone") && t.formattingValues) {
        const e = t.defaultFormattingWidth || t.defaultWidth,
          s = i?.width ? String(i.width) : e;
        r = t.formattingValues[s] || t.formattingValues[e];
      } else {
        const e = t.defaultWidth,
          s = i?.width ? String(i.width) : t.defaultWidth;
        r = t.values[s] || t.values[e];
      }
      return r[t.argumentCallback ? t.argumentCallback(e) : e];
    };
  }
  function ne(t) {
    return (e, i = {}) => {
      const r = i.width,
        s = r && t.matchPatterns[r] || t.matchPatterns[t.defaultMatchWidth],
        n = e.match(s);
      if (!n) return null;
      const o = n[0],
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
      const s = te[t];
      return r = "string" == typeof s ? s : 1 === e ? s.one : s.other.replace("{{count}}", e.toString()), i?.addSuffix ? i.comparison && i.comparison > 0 ? "in " + r : r + " ago" : r;
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
      era: se({
        values: {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"]
        },
        defaultWidth: "wide"
      }),
      quarter: se({
        values: {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
        },
        defaultWidth: "wide",
        argumentCallback: t => t - 1
      }),
      month: se({
        values: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        defaultWidth: "wide"
      }),
      day: se({
        values: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        defaultWidth: "wide"
      }),
      dayPeriod: se({
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
          s = t.match(oe.parsePattern);
        if (!s) return null;
        let n = oe.valueCallback ? oe.valueCallback(s[0]) : s[0];
        return n = e.valueCallback ? e.valueCallback(n) : n, {
          value: n,
          rest: t.slice(r.length)
        };
      }),
      era: ne({
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
      quarter: ne({
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
      month: ne({
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
      day: ne({
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
      dayPeriod: ne({
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
    const i = It(t, e?.in),
      r = Vt(i, function (t, e) {
        const i = It(t, e?.in);
        return i.setFullYear(i.getFullYear(), 0, 1), i.setHours(0, 0, 0, 0), i;
      }(i));
    return r + 1;
  }
  function ce(t, e) {
    const i = It(t, e?.in),
      r = +Ut(i) - +function (t, e) {
        const i = Rt(t, e),
          r = Bt(e?.in || t, 0);
        return r.setFullYear(i, 0, 4), r.setHours(0, 0, 0, 0), Ut(r);
      }(i);
    return Math.round(r / Pt) + 1;
  }
  function he(t, e) {
    const i = It(t, e?.in),
      r = i.getFullYear(),
      s = Ot(),
      n = e?.firstWeekContainsDate ?? e?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1,
      o = Bt(e?.in || t, 0);
    o.setFullYear(r + 1, 0, n), o.setHours(0, 0, 0, 0);
    const a = Nt(o, e),
      l = Bt(e?.in || t, 0);
    l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0);
    const c = Nt(l, e);
    return +i >= +a ? r + 1 : +i >= +c ? r : r - 1;
  }
  function de(t, e) {
    const i = It(t, e?.in),
      r = +Nt(i, e) - +function (t, e) {
        const i = Ot(),
          r = e?.firstWeekContainsDate ?? e?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1,
          s = he(t, e),
          n = Bt(e?.in || t, 0);
        return n.setFullYear(s, 0, r), n.setHours(0, 0, 0, 0), Nt(n, e);
      }(i, e);
    return Math.round(r / Pt) + 1;
  }
  function ue(t, e) {
    return (t < 0 ? "-" : "") + Math.abs(t).toString().padStart(e, "0");
  }
  const pe = {
      y(t, e) {
        const i = t.getFullYear(),
          r = i > 0 ? i : 1 - i;
        return ue("yy" === e ? r % 100 : r, e.length);
      },
      M(t, e) {
        const i = t.getMonth();
        return "M" === e ? String(i + 1) : ue(i + 1, 2);
      },
      d: (t, e) => ue(t.getDate(), e.length),
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
      h: (t, e) => ue(t.getHours() % 12 || 12, e.length),
      H: (t, e) => ue(t.getHours(), e.length),
      m: (t, e) => ue(t.getMinutes(), e.length),
      s: (t, e) => ue(t.getSeconds(), e.length),
      S(t, e) {
        const i = e.length,
          r = t.getMilliseconds();
        return ue(Math.trunc(r * Math.pow(10, i - 3)), e.length);
      }
    },
    ge = "midnight",
    me = "noon",
    be = "morning",
    _e = "afternoon",
    ye = "evening",
    ve = "night",
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
        return pe.y(t, e);
      },
      Y: function (t, e, i, r) {
        const s = he(t, r),
          n = s > 0 ? s : 1 - s;
        if ("YY" === e) {
          return ue(n % 100, 2);
        }
        return "Yo" === e ? i.ordinalNumber(n, {
          unit: "year"
        }) : ue(n, e.length);
      },
      R: function (t, e) {
        return ue(Rt(t), e.length);
      },
      u: function (t, e) {
        return ue(t.getFullYear(), e.length);
      },
      Q: function (t, e, i) {
        const r = Math.ceil((t.getMonth() + 1) / 3);
        switch (e) {
          case "Q":
            return String(r);
          case "QQ":
            return ue(r, 2);
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
            return ue(r, 2);
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
            return pe.M(t, e);
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
            return ue(r + 1, 2);
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
        const s = de(t, r);
        return "wo" === e ? i.ordinalNumber(s, {
          unit: "week"
        }) : ue(s, e.length);
      },
      I: function (t, e, i) {
        const r = ce(t);
        return "Io" === e ? i.ordinalNumber(r, {
          unit: "week"
        }) : ue(r, e.length);
      },
      d: function (t, e, i) {
        return "do" === e ? i.ordinalNumber(t.getDate(), {
          unit: "date"
        }) : pe.d(t, e);
      },
      D: function (t, e, i) {
        const r = le(t);
        return "Do" === e ? i.ordinalNumber(r, {
          unit: "dayOfYear"
        }) : ue(r, e.length);
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
        const s = t.getDay(),
          n = (s - r.weekStartsOn + 8) % 7 || 7;
        switch (e) {
          case "e":
            return String(n);
          case "ee":
            return ue(n, 2);
          case "eo":
            return i.ordinalNumber(n, {
              unit: "day"
            });
          case "eee":
            return i.day(s, {
              width: "abbreviated",
              context: "formatting"
            });
          case "eeeee":
            return i.day(s, {
              width: "narrow",
              context: "formatting"
            });
          case "eeeeee":
            return i.day(s, {
              width: "short",
              context: "formatting"
            });
          default:
            return i.day(s, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      c: function (t, e, i, r) {
        const s = t.getDay(),
          n = (s - r.weekStartsOn + 8) % 7 || 7;
        switch (e) {
          case "c":
            return String(n);
          case "cc":
            return ue(n, e.length);
          case "co":
            return i.ordinalNumber(n, {
              unit: "day"
            });
          case "ccc":
            return i.day(s, {
              width: "abbreviated",
              context: "standalone"
            });
          case "ccccc":
            return i.day(s, {
              width: "narrow",
              context: "standalone"
            });
          case "cccccc":
            return i.day(s, {
              width: "short",
              context: "standalone"
            });
          default:
            return i.day(s, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      i: function (t, e, i) {
        const r = t.getDay(),
          s = 0 === r ? 7 : r;
        switch (e) {
          case "i":
            return String(s);
          case "ii":
            return ue(s, e.length);
          case "io":
            return i.ordinalNumber(s, {
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
        let s;
        switch (s = 12 === r ? me : 0 === r ? ge : r / 12 >= 1 ? "pm" : "am", e) {
          case "b":
          case "bb":
            return i.dayPeriod(s, {
              width: "abbreviated",
              context: "formatting"
            });
          case "bbb":
            return i.dayPeriod(s, {
              width: "abbreviated",
              context: "formatting"
            }).toLowerCase();
          case "bbbbb":
            return i.dayPeriod(s, {
              width: "narrow",
              context: "formatting"
            });
          default:
            return i.dayPeriod(s, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      B: function (t, e, i) {
        const r = t.getHours();
        let s;
        switch (s = r >= 17 ? ye : r >= 12 ? _e : r >= 4 ? be : ve, e) {
          case "B":
          case "BB":
          case "BBB":
            return i.dayPeriod(s, {
              width: "abbreviated",
              context: "formatting"
            });
          case "BBBBB":
            return i.dayPeriod(s, {
              width: "narrow",
              context: "formatting"
            });
          default:
            return i.dayPeriod(s, {
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
        return pe.h(t, e);
      },
      H: function (t, e, i) {
        return "Ho" === e ? i.ordinalNumber(t.getHours(), {
          unit: "hour"
        }) : pe.H(t, e);
      },
      K: function (t, e, i) {
        const r = t.getHours() % 12;
        return "Ko" === e ? i.ordinalNumber(r, {
          unit: "hour"
        }) : ue(r, e.length);
      },
      k: function (t, e, i) {
        let r = t.getHours();
        return 0 === r && (r = 24), "ko" === e ? i.ordinalNumber(r, {
          unit: "hour"
        }) : ue(r, e.length);
      },
      m: function (t, e, i) {
        return "mo" === e ? i.ordinalNumber(t.getMinutes(), {
          unit: "minute"
        }) : pe.m(t, e);
      },
      s: function (t, e, i) {
        return "so" === e ? i.ordinalNumber(t.getSeconds(), {
          unit: "second"
        }) : pe.s(t, e);
      },
      S: function (t, e) {
        return pe.S(t, e);
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
        return ue(Math.trunc(+t / 1e3), e.length);
      },
      T: function (t, e, i) {
        return ue(+t, e.length);
      }
    };
  function xe(t, e = "") {
    const i = t > 0 ? "-" : "+",
      r = Math.abs(t),
      s = Math.trunc(r / 60),
      n = r % 60;
    return 0 === n ? i + String(s) : i + String(s) + e + ue(n, 2);
  }
  function we(t, e) {
    if (t % 60 == 0) {
      return (t > 0 ? "-" : "+") + ue(Math.abs(t) / 60, 2);
    }
    return Ee(t, e);
  }
  function Ee(t, e = "") {
    const i = t > 0 ? "-" : "+",
      r = Math.abs(t);
    return i + ue(Math.trunc(r / 60), 2) + e + ue(r % 60, 2);
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
    Ce = {
      p: $e,
      P: (t, e) => {
        const i = t.match(/(P+)(p+)?/) || [],
          r = i[1],
          s = i[2];
        if (!s) return Se(t, e);
        let n;
        switch (r) {
          case "P":
            n = e.dateTime({
              width: "short"
            });
            break;
          case "PP":
            n = e.dateTime({
              width: "medium"
            });
            break;
          case "PPP":
            n = e.dateTime({
              width: "long"
            });
            break;
          default:
            n = e.dateTime({
              width: "full"
            });
        }
        return n.replace("{{date}}", Se(r, e)).replace("{{time}}", $e(s, e));
      }
    },
    Ae = /^D+$/,
    Te = /^Y+$/,
    Pe = ["D", "DD", "YY", "YYYY"];
  const ke = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    Me = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    De = /^'([^]*?)'?$/,
    He = /''/g,
    Be = /[a-zA-Z]/;
  function Ie(t, e, i) {
    const r = Ot(),
      s = i?.locale ?? r.locale ?? ae,
      n = i?.firstWeekContainsDate ?? i?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1,
      o = i?.weekStartsOn ?? i?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0,
      a = It(t, i?.in);
    if (!qt(a)) throw new RangeError("Invalid time value");
    let l = e.match(Me).map(t => {
      const e = t[0];
      if ("p" === e || "P" === e) {
        return (0, Ce[e])(t, s.formatLong);
      }
      return t;
    }).join("").match(ke).map(t => {
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
      if (e.match(Be)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + e + "`");
      return {
        isToken: !1,
        value: t
      };
    });
    s.localize.preprocessor && (l = s.localize.preprocessor(a, l));
    const c = {
      firstWeekContainsDate: n,
      weekStartsOn: o,
      locale: s
    };
    return l.map(r => {
      if (!r.isToken) return r.value;
      const n = r.value;
      (!i?.useAdditionalWeekYearTokens && function (t) {
        return Te.test(t);
      }(n) || !i?.useAdditionalDayOfYearTokens && function (t) {
        return Ae.test(t);
      }(n)) && function (t, e, i) {
        const r = function (t, e, i) {
          const r = "Y" === t[0] ? "years" : "days of the month";
          return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${i}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
        }(t, e, i);
        if (console.warn(r), Pe.includes(t)) throw new RangeError(r);
      }(n, e, String(t));
      return (0, fe[n[0]])(a, n, s.localize, c);
    }).join("");
  }
  function Fe(t) {
    const e = t.match(De);
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
      s = {},
      n = Jt(r, i);
    n && (s.years = n);
    const o = Ft(i, {
        years: s.years
      }),
      a = Qt(r, o);
    a && (s.months = a);
    const l = Ft(o, {
        months: s.months
      }),
      c = function (t, e, i) {
        const [r, s] = jt(i?.in, t, e),
          n = Wt(r, s),
          o = Math.abs(Vt(r, s));
        r.setDate(r.getDate() - n * o);
        const a = n * (o - Number(Wt(r, s) === -n));
        return 0 === a ? 0 : a;
      }(r, l);
    c && (s.days = c);
    const h = Ft(l, {
        days: s.days
      }),
      d = function (t, e, i) {
        const [r, s] = jt(i?.in, t, e),
          n = (+r - +s) / Dt;
        return Xt(i?.roundingMethod)(n);
      }(r, h);
    d && (s.hours = d);
    const u = Ft(h, {
        hours: s.hours
      }),
      p = function (t, e, i) {
        const r = Zt(t, e) / Mt;
        return Xt(i?.roundingMethod)(r);
      }(r, u);
    p && (s.minutes = p);
    const g = function (t, e, i) {
      const r = Zt(t, e) / 1e3;
      return Xt(i?.roundingMethod)(r);
    }(r, Ft(u, {
      minutes: s.minutes
    }));
    return g && (s.seconds = g), s;
  }
  const Oe = (t, e, i, r) => {
    const s = r || {},
      n = i ?? {},
      o = new Event(e, {
        bubbles: void 0 === s.bubbles || s.bubbles,
        cancelable: Boolean(s.cancelable),
        composed: void 0 === s.composed || s.composed
      });
    return o.detail = n, t.dispatchEvent(o), o;
  };
  var Ne;
  !function (t) {
    t.PRINTER = "printer", t.ACE = "ace", t.BRIDGE = "bridge";
  }(Ne || (Ne = {}));
  const Ue = "Cloud API Bridge",
    Re = "ACE Pro Multi-Color Box";
  var ze, je, Ge, Ve, Ye, qe;
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
  }(Ye || (Ye = {})), function (t) {
    t.OnTime = "On Time", t.OffTime = "Off Time", t.BottomTime = "Bottom Time", t.ModelHeight = "Model Height", t.BottomLayers = "Bottom Layers", t.ZUpHeight = "Z Up Height", t.ZUpSpeed = "Z Up Speed", t.ZDownSpeed = "Z Down Speed";
  }(qe || (qe = {}));
  const We = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ze), Ge), Ve), Ye), qe);
  var Xe, Ze;
  !function (t) {
    t.PLA = "PLA", t.PETG = "PETG", t.ABS = "ABS", t.PACF = "PACF", t.PC = "PC", t.ASA = "ASA", t.HIPS = "HIPS", t.PA = "PA", t.PLA_SE = "PLA_SE";
  }(Xe || (Xe = {})), function (t) {
    t.PAUSE = "pause", t.RESUME = "resume", t.CANCEL = "cancel";
  }(Ze || (Ze = {}));
  const Ke = ["width", "height", "left", "top"];
  function Qe(t, e) {
    Object.keys(e).forEach(t => {
      Ke.includes(t) && !isNaN(e[t]) && (e[t] = e[t].toString() + "px");
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
  function ii(t, e, i, r) {
    const s = function (t, e) {
      const i = ei(t, e);
      return i ? String(i.state) : "";
    }(t, e);
    return "on" === s ? i : r;
  }
  function ri(t) {
    return t && t.model === Ue ? Ne.BRIDGE : t && t.model === Re ? Ne.ACE : Ne.PRINTER;
  }
  function si(t) {
    const e = {};
    for (const i in t.devices) {
      const r = t.devices[i];
      "Anycubic" === r.manufacturer && ri(r) !== Ne.BRIDGE && (e[r.id] = r);
    }
    return e;
  }
  function ni(t, e) {
    const i = {};
    if (e) for (const r in t.entities) {
      const s = t.entities[r];
      s.device_id === e && (i[s.entity_id] = s);
    }
    return i;
  }
  function oi(t, e, i) {
    return e + "." + String(t) + i;
  }
  function ai(t, e, i, r) {
    for (const e in t) {
      const s = t[e];
      if (e.split(".")[0] === i && s.translation_key === r) return s;
    }
    for (const e in t) {
      const s = t[e],
        n = e.split("."),
        o = n[0],
        a = n[1];
      if (o === i && a.endsWith(r)) return s;
    }
  }
  function li(t, e, i) {
    for (const r in t) {
      const t = r.split("."),
        s = t[0],
        n = t[1];
      if (s === e && n.endsWith(i)) return n.split(i)[0];
    }
  }
  function ci(t) {
    return li(t, "binary_sensor", "printer_online");
  }
  function hi(t) {
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
  function di(t, e, i, r) {
    return ei(t, ai(e, 0, "switch", r));
  }
  function ui(t, e, i, r, s = "unavailable", n = {}) {
    return ei(t, ai(e, 0, "button", r)) || Je({
      state: String(s),
      attributes: n
    });
  }
  function pi(t, e, i, r) {
    return ui(t, e, 0, r, "unavailable", {
      duration: 0,
      temperature: 0
    });
  }
  function gi(t) {
    return !["unavailable"].includes(t.state);
  }
  function mi(t, e, i, r) {
    const s = ei(t, ai(e, 0, "image", r));
    return s ? function (t) {
      const e = t.attributes.access_token;
      return `${window.location.origin}/api/image_proxy/${t.entity_id}?token=${e}`;
    }(s) : void 0;
  }
  function bi(t, e, i, r, s = "unavailable", n = {}) {
    return ei(t, ai(e, 0, "sensor", r)) || Je({
      state: String(s),
      attributes: n
    });
  }
  function _i(t, e, i, r, s, n, o = void 0) {
    const a = ai(e, 0, "binary_sensor", r);
    return a ? ii(t, a, s, n) : o;
  }
  function yi(t, e, i, r, s = 0, n = {}) {
    return ei(t, ai(e, 0, "number", r)) || Je({
      state: String(s),
      attributes: n
    });
  }
  function vi(t, e, i, r) {
    const s = ai(e, 0, "update", r);
    return s ? ii(t, s, "Update Available", "Up To Date") : void 0;
  }
  function fi(t) {
    return ["printing", "preheating", "paused", "downloading", "checking"].includes(t);
  }
  function xi(t) {
    return e = 1e3 * t, Le({
      start: new Date(0),
      end: new Date(e)
    });
    var e;
  }
  const wi = (t, e) => {
      if (0 !== t && (!t || isNaN(t))) return "invalid duration";
      const i = xi(e ? 60 * Math.ceil(Number(t) / 60) : Number(t));
      return `${i.days && i.days > 0 ? `${i.days}d` : ""}${i.hours && i.hours > 0 ? `${i.hours}h` : ""}${i.minutes && i.minutes > 0 ? `${i.minutes}m` : ""}${i.seconds && i.seconds > 0 ? `${i.seconds}s` : e ? "" : "0s"}`;
    },
    Ei = (t, e, i = !1, r = !1) => {
      switch (e) {
        case ze.Remaining:
          return wi(t, i);
        case ze.ETA:
          return ((t, e, i) => {
            if (0 !== t && (!t || isNaN(t))) return "invalid time";
            const r = e ? "" : ":ss",
              s = i ? `HH:mm${r}` : `h:mm${r} a`,
              n = new Date();
            return n.setSeconds(n.getSeconds() + Number(t)), Ie(n, s, {
              in: Tt
            });
          })(t, i, r);
        case ze.Elapsed:
          return wi(t, i);
        default:
          return "<unknown>";
      }
    };
  const Si = {
      [je.C]: {
        [je.C]: t => t,
        [je.F]: t => 9 * t / 5 + 32
      },
      [je.F]: {
        [je.C]: t => 5 * (t - 32) / 9,
        [je.F]: t => t
      }
    },
    $i = (t, e, i = !1) => {
      const r = parseFloat(t.state);
      if (Number.isNaN(r)) return "—";
      const s = (t => {
          switch (t.attributes.unit_of_measurement) {
            case "°C":
            default:
              return je.C;
            case "°F":
              return je.F;
          }
        })(t),
        n = (o = r, l = e || s, Si[a = s] && Si[a][l] ? Si[a][l](o) : -1);
      var o, a, l;
      return `${i ? Math.round(n) : n.toFixed(2)}°${e || s}`;
    };
  function Ci() {
    return [We.Status, We.ETA, We.Elapsed, We.Remaining];
  }
  function Ai() {
    return {
      vertical: !1,
      round: !1,
      use_24hr: !0,
      temperatureUnit: je.C,
      monitoredStats: Ci(),
      scaleFactor: 1,
      slotColors: [],
      showSettingsButton: !1,
      alwaysShow: !1
    };
  }
  function Ti(t, e) {
    return void 0 === t ? e : t;
  }
  function Pi(t) {
    var e;
    return (null !== (e = t.attributes.available_modes) && void 0 !== e ? e : []).reduce((t, e) => Object.assign(Object.assign({}, t), {
      [e.mode]: e.description
    }), {});
  }
  function ki(t) {
    return t && Object.values(Xe).includes(t) ? Xe[t.toUpperCase()] : void 0;
  }
  var Mi = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
    Di = "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const Hi = 1,
    Bi = 2,
    Ii = t => (...e) => ({
      _$litDirective$: t,
      values: e
    });
  class Fi {
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
  const Li = Ii(class extends Fi {
    constructor(t) {
      if (super(t), t.type !== Hi || "class" !== t.name || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
      return Z;
    }
  });
  /**
       * @license
       * Copyright 2021 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  function* Oi(t, e) {
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
  const Ni = "important",
    Ui = " !" + Ni,
    Ri = Ii(class extends Fi {
      constructor(t) {
        if (super(t), t.type !== Hi || "style" !== t.name || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
            const e = "string" == typeof r && r.endsWith(Ui);
            t.includes("-") || e ? i.setProperty(t, e ? r.slice(0, -11) : r, e ? Ni : "") : i[t] = r;
          }
        }
        return Z;
      }
    }),
    {
      I: zi
    } = dt,
    ji = () => document.createComment(""),
    Gi = (t, e, i) => {
      const r = t._$AA.parentNode,
        s = void 0 === e ? t._$AB : e._$AA;
      if (void 0 === i) {
        const e = r.insertBefore(ji(), s),
          n = r.insertBefore(ji(), s);
        i = new zi(e, n, t, t.options);
      } else {
        const e = i._$AB.nextSibling,
          n = i._$AM,
          o = n !== t;
        if (o) {
          let e;
          i._$AQ?.(t), i._$AM = t, void 0 !== i._$AP && (e = t._$AU) !== n._$AU && i._$AP(e);
        }
        if (e !== s || o) {
          let t = i._$AA;
          for (; t !== e;) {
            const e = t.nextSibling;
            r.insertBefore(t, s), t = e;
          }
        }
      }
      return i;
    },
    Vi = (t, e, i = t) => (t._$AI(e, i), t),
    Yi = {},
    qi = t => {
      t._$AP?.(!1, !0);
      let e = t._$AA;
      const i = t._$AB.nextSibling;
      for (; e !== i;) {
        const t = e.nextSibling;
        e.remove(), e = t;
      }
    },
    Wi = (t, e) => {
      const i = t._$AN;
      if (void 0 === i) return !1;
      for (const t of i) t._$AO?.(e, !1), Wi(t, e);
      return !0;
    },
    Xi = t => {
      let e, i;
      do {
        if (void 0 === (e = t._$AM)) break;
        i = e._$AN, i.delete(t), t = e;
      } while (0 === i?.size);
    },
    Zi = t => {
      for (let e; e = t._$AM; t = e) {
        let i = e._$AN;
        if (void 0 === i) e._$AN = i = new Set();else if (i.has(t)) break;
        i.add(t), Ji(e);
      }
    };
  /**
       * @license
       * Copyright 2020 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  function Ki(t) {
    void 0 !== this._$AN ? (Xi(this), this._$AM = t, Zi(this)) : this._$AM = t;
  }
  function Qi(t, e = !1, i = 0) {
    const r = this._$AH,
      s = this._$AN;
    if (void 0 !== s && 0 !== s.size) if (e) {
      if (Array.isArray(r)) for (let t = i; t < r.length; t++) Wi(r[t], !1), Xi(r[t]);else null != r && (Wi(r, !1), Xi(r));
    } else Wi(this, t);
  }
  const Ji = t => {
    t.type == Bi && (t._$AP ??= Qi, t._$AQ ??= Ki);
  };
  class tr extends Fi {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(t, e, i) {
      super._$AT(t, e, i), Zi(this), this.isConnected = t._$AU;
    }
    _$AO(t, e = !0) {
      t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (Wi(this, t), Xi(this));
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
  const er = new WeakMap();
  let ir = 0;
  const rr = new Map(),
    sr = new WeakSet(),
    nr = () => new Promise(t => requestAnimationFrame(t)),
    or = (t, e) => {
      const i = t - e;
      return 0 === i ? void 0 : i;
    },
    ar = (t, e) => {
      const i = t / e;
      return 1 === i ? void 0 : i;
    },
    lr = {
      left: (t, e) => {
        const i = or(t, e);
        return {
          value: i,
          transform: null == i || isNaN(i) ? void 0 : `translateX(${i}px)`
        };
      },
      top: (t, e) => {
        const i = or(t, e);
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
        const r = ar(t, e);
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
        const r = ar(t, e);
        return {
          value: r,
          overrideFrom: i,
          transform: null == r || isNaN(r) ? void 0 : `scaleY(${r})`
        };
      }
    },
    cr = {
      duration: 333,
      easing: "ease-in-out"
    },
    hr = ["left", "top", "width", "height", "opacity", "color", "background"],
    dr = new WeakMap();
  const ur = Ii(class extends tr {
    constructor(t) {
      if (super(t), this.t = !1, this.i = null, this.o = null, this.h = !0, this.shouldLog = !1, t.type === Bi) throw Error("The `animate` directive must be used in attribute position.");
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
      return K;
    }
    getController() {
      return er.get(this.u);
    }
    isDisabled() {
      return this.options.disabled || this.getController()?.disabled;
    }
    update(t, [e]) {
      const i = void 0 === this.u;
      return i && (this.u = t.options?.host, this.u.addController(this), this.u.updateComplete.then(t => this.t = !0), this.element = t.element, dr.set(this.element, this)), this.optionsOrCallback = e, (i || "function" != typeof e) && this.p(e), this.render(e);
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
      }), t.properties ??= hr, this.options = t;
    }
    m() {
      const t = {},
        e = this.element.getBoundingClientRect(),
        i = getComputedStyle(this.element);
      return this.options.properties.forEach(r => {
        const s = e[r] ?? (lr[r] ? void 0 : i[r]),
          n = Number(s);
        t[r] = isNaN(n) ? s + "" : n;
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
      this.prepare(), await nr;
      const e = this.O(),
        i = this.j(this.options.keyframeOptions, e),
        r = this.m();
      if (void 0 !== this.A) {
        const {
          from: i,
          to: s
        } = this.N(this.A, r, e);
        this.log("measured", [this.A, r, i, s]), t = this.calculateKeyframes(i, s);
      } else {
        const i = rr.get(this.options.inId);
        if (i) {
          rr.delete(this.options.inId);
          const {
            from: s,
            to: n
          } = this.N(i, r, e);
          t = this.calculateKeyframes(s, n), t = this.options.in ? [{
            ...this.options.in[0],
            ...t[0]
          }, ...this.options.in.slice(1), t[1]] : t, ir++, t.forEach(t => t.zIndex = ir);
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
      if (void 0 !== this.options.id && rr.set(this.options.id, this.A), void 0 === this.options.out) return;
      if (this.prepare(), await nr(), this.i?.isConnected) {
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
        const i = dr.get(e);
        i && !i.isDisabled() && i && t.push(i);
      }
      return t;
    }
    get isHostRendered() {
      const t = sr.has(this.u);
      return t || this.u.updateComplete.then(() => {
        sr.add(this.u);
      }), t;
    }
    j(t, e = this.O()) {
      const i = {
        ...cr
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
      let s = 1,
        n = 1;
      return r.length > 0 && (r.forEach(t => {
        t.width && (s /= t.width), t.height && (n /= t.height);
      }), void 0 !== t.left && void 0 !== e.left && (t.left = s * t.left, e.left = s * e.left), void 0 !== t.top && void 0 !== e.top && (t.top = n * t.top, e.top = n * e.top)), {
        from: t,
        to: e
      };
    }
    calculateKeyframes(t, e, i = !1) {
      const r = {},
        s = {};
      let n = !1;
      const o = {};
      for (const i in e) {
        const a = t[i],
          l = e[i];
        if (i in lr) {
          const t = lr[i];
          if (void 0 === a || void 0 === l) continue;
          const e = t(a, l);
          void 0 !== e.transform && (o[i] = e.value, n = !0, r.transform = `${r.transform ?? ""} ${e.transform}`, void 0 !== e.overrideFrom && Object.assign(r, e.overrideFrom));
        } else a !== l && void 0 !== a && void 0 !== l && (n = !0, r[i] = a, s[i] = l);
      }
      return r.transformOrigin = s.transformOrigin = i ? "center center" : "top left", this.animatingProperties = o, n ? [r, s] : void 0;
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
  });
  var pr,
    gr,
    mr,
    br = "Anycubic Cloud",
    _r = {
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
    yr = {
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
    vr = {
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
    fr = {
      title: br,
      common: _r,
      card: yr,
      panels: vr
    },
    xr = Object.freeze({
      __proto__: null,
      title: br,
      common: _r,
      card: yr,
      panels: vr,
      default: fr
    }),
    wr = "Anycubic Cloud",
    Er = {
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
    Sr = {
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
    $r = {
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
    Cr = {
      title: wr,
      common: Er,
      card: Sr,
      panels: $r
    },
    Ar = Object.freeze({
      __proto__: null,
      title: wr,
      common: Er,
      card: Sr,
      panels: $r,
      default: Cr
    });
  function Tr(t) {
    return t.type === gr.literal;
  }
  function Pr(t) {
    return t.type === gr.argument;
  }
  function kr(t) {
    return t.type === gr.number;
  }
  function Mr(t) {
    return t.type === gr.date;
  }
  function Dr(t) {
    return t.type === gr.time;
  }
  function Hr(t) {
    return t.type === gr.select;
  }
  function Br(t) {
    return t.type === gr.plural;
  }
  function Ir(t) {
    return t.type === gr.pound;
  }
  function Fr(t) {
    return t.type === gr.tag;
  }
  function Lr(t) {
    return !(!t || "object" != typeof t || t.type !== mr.number);
  }
  function Or(t) {
    return !(!t || "object" != typeof t || t.type !== mr.dateTime);
  }
  !function (t) {
    t[t.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", t[t.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", t[t.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", t[t.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", t[t.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", t[t.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", t[t.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", t[t.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", t[t.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", t[t.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", t[t.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", t[t.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", t[t.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", t[t.INVALID_TAG = 23] = "INVALID_TAG", t[t.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", t[t.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", t[t.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
  }(pr || (pr = {})), function (t) {
    t[t.literal = 0] = "literal", t[t.argument = 1] = "argument", t[t.number = 2] = "number", t[t.date = 3] = "date", t[t.time = 4] = "time", t[t.select = 5] = "select", t[t.plural = 6] = "plural", t[t.pound = 7] = "pound", t[t.tag = 8] = "tag";
  }(gr || (gr = {})), function (t) {
    t[t.number = 0] = "number", t[t.dateTime = 1] = "dateTime";
  }(mr || (mr = {}));
  var Nr = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
    Ur = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  function Rr(t) {
    var e = {};
    return t.replace(Ur, function (t) {
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
  var zr = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
  var jr = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
    Gr = /^(@+)?(\+|#+)?[rs]?$/g,
    Vr = /(\*)(0+)|(#+)(0+)|(0+)/g,
    Yr = /^(0+)$/;
  function qr(t) {
    var e = {};
    return "r" === t[t.length - 1] ? e.roundingPriority = "morePrecision" : "s" === t[t.length - 1] && (e.roundingPriority = "lessPrecision"), t.replace(Gr, function (t, i, r) {
      return "string" != typeof r ? (e.minimumSignificantDigits = i.length, e.maximumSignificantDigits = i.length) : "+" === r ? e.minimumSignificantDigits = i.length : "#" === i[0] ? e.maximumSignificantDigits = i.length : (e.minimumSignificantDigits = i.length, e.maximumSignificantDigits = i.length + ("string" == typeof r ? r.length : 0)), "";
    }), e;
  }
  function Wr(t) {
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
  function Xr(t) {
    var e;
    if ("E" === t[0] && "E" === t[1] ? (e = {
      notation: "engineering"
    }, t = t.slice(2)) : "E" === t[0] && (e = {
      notation: "scientific"
    }, t = t.slice(1)), e) {
      var i = t.slice(0, 2);
      if ("+!" === i ? (e.signDisplay = "always", t = t.slice(2)) : "+?" === i && (e.signDisplay = "exceptZero", t = t.slice(2)), !Yr.test(t)) throw new Error("Malformed concise eng/scientific notation");
      e.minimumIntegerDigits = t.length;
    }
    return e;
  }
  function Zr(t) {
    var e = Wr(t);
    return e || {};
  }
  function Kr(t) {
    for (var e = {}, i = 0, s = t; i < s.length; i++) {
      var n = s[i];
      switch (n.stem) {
        case "percent":
        case "%":
          e.style = "percent";
          continue;
        case "%x100":
          e.style = "percent", e.scale = 100;
          continue;
        case "currency":
          e.style = "currency", e.currency = n.options[0];
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
          e.style = "unit", e.unit = n.options[0].replace(/^(.*?)-/, "");
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
          }), n.options.reduce(function (t, e) {
            return r(r({}, t), Zr(e));
          }, {}));
          continue;
        case "engineering":
          e = r(r(r({}, e), {
            notation: "engineering"
          }), n.options.reduce(function (t, e) {
            return r(r({}, t), Zr(e));
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
          e.scale = parseFloat(n.options[0]);
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
          if (n.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
          n.options[0].replace(Vr, function (t, i, r, s, n, o) {
            if (i) e.minimumIntegerDigits = r.length;else {
              if (s && n) throw new Error("We currently do not support maximum integer digits");
              if (o) throw new Error("We currently do not support exact integer digits");
            }
            return "";
          });
          continue;
      }
      if (Yr.test(n.stem)) e.minimumIntegerDigits = n.stem.length;else if (jr.test(n.stem)) {
        if (n.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
        n.stem.replace(jr, function (t, i, r, s, n, o) {
          return "*" === r ? e.minimumFractionDigits = i.length : s && "#" === s[0] ? e.maximumFractionDigits = s.length : n && o ? (e.minimumFractionDigits = n.length, e.maximumFractionDigits = n.length + o.length) : (e.minimumFractionDigits = i.length, e.maximumFractionDigits = i.length), "";
        });
        var o = n.options[0];
        "w" === o ? e = r(r({}, e), {
          trailingZeroDisplay: "stripIfInteger"
        }) : o && (e = r(r({}, e), qr(o)));
      } else if (Gr.test(n.stem)) e = r(r({}, e), qr(n.stem));else {
        var a = Wr(n.stem);
        a && (e = r(r({}, e), a));
        var l = Xr(n.stem);
        l && (e = r(r({}, e), l));
      }
    }
    return e;
  }
  var Qr,
    Jr = {
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
  function ts(t) {
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
    return "root" !== r && (i = t.maximize().region), (Jr[i || ""] || Jr[r || ""] || Jr["".concat(r, "-001")] || Jr["001"])[0];
  }
  var es = new RegExp("^".concat(Nr.source, "*")),
    is = new RegExp("".concat(Nr.source, "*$"));
  function rs(t, e) {
    return {
      start: t,
      end: e
    };
  }
  var ss = !!String.prototype.startsWith && "_a".startsWith("a", 1),
    ns = !!String.fromCodePoint,
    os = !!Object.fromEntries,
    as = !!String.prototype.codePointAt,
    ls = !!String.prototype.trimStart,
    cs = !!String.prototype.trimEnd,
    hs = !!Number.isSafeInteger ? Number.isSafeInteger : function (t) {
      return "number" == typeof t && isFinite(t) && Math.floor(t) === t && Math.abs(t) <= 9007199254740991;
    },
    ds = !0;
  try {
    ds = "a" === (null === (Qr = vs("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu").exec("a")) || void 0 === Qr ? void 0 : Qr[0]);
  } catch (G) {
    ds = !1;
  }
  var us,
    ps = ss ? function (t, e, i) {
      return t.startsWith(e, i);
    } : function (t, e, i) {
      return t.slice(i, i + e.length) === e;
    },
    gs = ns ? String.fromCodePoint : function () {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      for (var i, r = "", s = t.length, n = 0; s > n;) {
        if ((i = t[n++]) > 1114111) throw RangeError(i + " is not a valid code point");
        r += i < 65536 ? String.fromCharCode(i) : String.fromCharCode(55296 + ((i -= 65536) >> 10), i % 1024 + 56320);
      }
      return r;
    },
    ms = os ? Object.fromEntries : function (t) {
      for (var e = {}, i = 0, r = t; i < r.length; i++) {
        var s = r[i],
          n = s[0],
          o = s[1];
        e[n] = o;
      }
      return e;
    },
    bs = as ? function (t, e) {
      return t.codePointAt(e);
    } : function (t, e) {
      var i = t.length;
      if (!(e < 0 || e >= i)) {
        var r,
          s = t.charCodeAt(e);
        return s < 55296 || s > 56319 || e + 1 === i || (r = t.charCodeAt(e + 1)) < 56320 || r > 57343 ? s : r - 56320 + (s - 55296 << 10) + 65536;
      }
    },
    _s = ls ? function (t) {
      return t.trimStart();
    } : function (t) {
      return t.replace(es, "");
    },
    ys = cs ? function (t) {
      return t.trimEnd();
    } : function (t) {
      return t.replace(is, "");
    };
  function vs(t, e) {
    return new RegExp(t, e);
  }
  if (ds) {
    var fs = vs("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
    us = function (t, e) {
      var i;
      return fs.lastIndex = e, null !== (i = fs.exec(t)[1]) && void 0 !== i ? i : "";
    };
  } else us = function (t, e) {
    for (var i = [];;) {
      var r = bs(t, e);
      if (void 0 === r || Ss(r) || $s(r)) break;
      i.push(r), e += r >= 65536 ? 2 : 1;
    }
    return gs.apply(void 0, i);
  };
  var xs = function () {
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
        var s = this.char();
        if (123 === s) {
          if ((n = this.parseArgument(t, i)).err) return n;
          r.push(n.val);
        } else {
          if (125 === s && t > 0) break;
          if (35 !== s || "plural" !== e && "selectordinal" !== e) {
            if (60 === s && !this.ignoreTag && 47 === this.peek()) {
              if (i) break;
              return this.error(pr.UNMATCHED_CLOSING_TAG, rs(this.clonePosition(), this.clonePosition()));
            }
            if (60 === s && !this.ignoreTag && ws(this.peek() || 0)) {
              if ((n = this.parseTag(t, e)).err) return n;
              r.push(n.val);
            } else {
              var n;
              if ((n = this.parseLiteral(t, e)).err) return n;
              r.push(n.val);
            }
          } else {
            var o = this.clonePosition();
            this.bump(), r.push({
              type: gr.pound,
              location: rs(o, this.clonePosition())
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
          type: gr.literal,
          value: "<".concat(r, "/>"),
          location: rs(i, this.clonePosition())
        },
        err: null
      };
      if (this.bumpIf(">")) {
        var s = this.parseMessage(t + 1, e, !0);
        if (s.err) return s;
        var n = s.val,
          o = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !ws(this.char())) return this.error(pr.INVALID_TAG, rs(o, this.clonePosition()));
          var a = this.clonePosition();
          return r !== this.parseTagName() ? this.error(pr.UNMATCHED_CLOSING_TAG, rs(a, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: gr.tag,
              value: r,
              children: n,
              location: rs(i, this.clonePosition())
            },
            err: null
          } : this.error(pr.INVALID_TAG, rs(o, this.clonePosition())));
        }
        return this.error(pr.UNCLOSED_TAG, rs(i, this.clonePosition()));
      }
      return this.error(pr.INVALID_TAG, rs(i, this.clonePosition()));
    }, t.prototype.parseTagName = function () {
      var t = this.offset();
      for (this.bump(); !this.isEOF() && Es(this.char());) this.bump();
      return this.message.slice(t, this.offset());
    }, t.prototype.parseLiteral = function (t, e) {
      for (var i = this.clonePosition(), r = "";;) {
        var s = this.tryParseQuote(e);
        if (s) r += s;else {
          var n = this.tryParseUnquoted(t, e);
          if (n) r += n;else {
            var o = this.tryParseLeftAngleBracket();
            if (!o) break;
            r += o;
          }
        }
      }
      var a = rs(i, this.clonePosition());
      return {
        val: {
          type: gr.literal,
          value: r,
          location: a
        },
        err: null
      };
    }, t.prototype.tryParseLeftAngleBracket = function () {
      return this.isEOF() || 60 !== this.char() || !this.ignoreTag && (ws(t = this.peek() || 0) || 47 === t) ? null : (this.bump(), "<");
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
      return gs.apply(void 0, e);
    }, t.prototype.tryParseUnquoted = function (t, e) {
      if (this.isEOF()) return null;
      var i = this.char();
      return 60 === i || 123 === i || 35 === i && ("plural" === e || "selectordinal" === e) || 125 === i && t > 0 ? null : (this.bump(), gs(i));
    }, t.prototype.parseArgument = function (t, e) {
      var i = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF()) return this.error(pr.EXPECT_ARGUMENT_CLOSING_BRACE, rs(i, this.clonePosition()));
      if (125 === this.char()) return this.bump(), this.error(pr.EMPTY_ARGUMENT, rs(i, this.clonePosition()));
      var r = this.parseIdentifierIfPossible().value;
      if (!r) return this.error(pr.MALFORMED_ARGUMENT, rs(i, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF()) return this.error(pr.EXPECT_ARGUMENT_CLOSING_BRACE, rs(i, this.clonePosition()));
      switch (this.char()) {
        case 125:
          return this.bump(), {
            val: {
              type: gr.argument,
              value: r,
              location: rs(i, this.clonePosition())
            },
            err: null
          };
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(pr.EXPECT_ARGUMENT_CLOSING_BRACE, rs(i, this.clonePosition())) : this.parseArgumentOptions(t, e, r, i);
        default:
          return this.error(pr.MALFORMED_ARGUMENT, rs(i, this.clonePosition()));
      }
    }, t.prototype.parseIdentifierIfPossible = function () {
      var t = this.clonePosition(),
        e = this.offset(),
        i = us(this.message, e),
        r = e + i.length;
      return this.bumpTo(r), {
        value: i,
        location: rs(t, this.clonePosition())
      };
    }, t.prototype.parseArgumentOptions = function (t, e, i, s) {
      var n,
        o = this.clonePosition(),
        a = this.parseIdentifierIfPossible().value,
        l = this.clonePosition();
      switch (a) {
        case "":
          return this.error(pr.EXPECT_ARGUMENT_TYPE, rs(o, l));
        case "number":
        case "date":
        case "time":
          this.bumpSpace();
          var c = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var h = this.clonePosition();
            if ((y = this.parseSimpleArgStyleIfPossible()).err) return y;
            if (0 === (g = ys(y.val)).length) return this.error(pr.EXPECT_ARGUMENT_STYLE, rs(this.clonePosition(), this.clonePosition()));
            c = {
              style: g,
              styleLocation: rs(h, this.clonePosition())
            };
          }
          if ((v = this.tryParseArgumentClose(s)).err) return v;
          var d = rs(s, this.clonePosition());
          if (c && ps(null == c ? void 0 : c.style, "::", 0)) {
            var u = _s(c.style.slice(2));
            if ("number" === a) return (y = this.parseNumberSkeletonFromString(u, c.styleLocation)).err ? y : {
              val: {
                type: gr.number,
                value: i,
                location: d,
                style: y.val
              },
              err: null
            };
            if (0 === u.length) return this.error(pr.EXPECT_DATE_TIME_SKELETON, d);
            var p = u;
            this.locale && (p = function (t, e) {
              for (var i = "", r = 0; r < t.length; r++) {
                var s = t.charAt(r);
                if ("j" === s) {
                  for (var n = 0; r + 1 < t.length && t.charAt(r + 1) === s;) n++, r++;
                  var o = 1 + (1 & n),
                    a = n < 2 ? 1 : 3 + (n >> 1),
                    l = ts(e);
                  for ("H" != l && "k" != l || (a = 0); a-- > 0;) i += "a";
                  for (; o-- > 0;) i = l + i;
                } else i += "J" === s ? "H" : s;
              }
              return i;
            }(u, this.locale));
            var g = {
              type: mr.dateTime,
              pattern: p,
              location: c.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? Rr(p) : {}
            };
            return {
              val: {
                type: "date" === a ? gr.date : gr.time,
                value: i,
                location: d,
                style: g
              },
              err: null
            };
          }
          return {
            val: {
              type: "number" === a ? gr.number : "date" === a ? gr.date : gr.time,
              value: i,
              location: d,
              style: null !== (n = null == c ? void 0 : c.style) && void 0 !== n ? n : null
            },
            err: null
          };
        case "plural":
        case "selectordinal":
        case "select":
          var m = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(",")) return this.error(pr.EXPECT_SELECT_ARGUMENT_OPTIONS, rs(m, r({}, m)));
          this.bumpSpace();
          var b = this.parseIdentifierIfPossible(),
            _ = 0;
          if ("select" !== a && "offset" === b.value) {
            if (!this.bumpIf(":")) return this.error(pr.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, rs(this.clonePosition(), this.clonePosition()));
            var y;
            if (this.bumpSpace(), (y = this.tryParseDecimalInteger(pr.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, pr.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err) return y;
            this.bumpSpace(), b = this.parseIdentifierIfPossible(), _ = y.val;
          }
          var v,
            f = this.tryParsePluralOrSelectOptions(t, a, e, b);
          if (f.err) return f;
          if ((v = this.tryParseArgumentClose(s)).err) return v;
          var x = rs(s, this.clonePosition());
          return "select" === a ? {
            val: {
              type: gr.select,
              value: i,
              options: ms(f.val),
              location: x
            },
            err: null
          } : {
            val: {
              type: gr.plural,
              value: i,
              options: ms(f.val),
              offset: _,
              pluralType: "plural" === a ? "cardinal" : "ordinal",
              location: x
            },
            err: null
          };
        default:
          return this.error(pr.INVALID_ARGUMENT_TYPE, rs(o, l));
      }
    }, t.prototype.tryParseArgumentClose = function (t) {
      return this.isEOF() || 125 !== this.char() ? this.error(pr.EXPECT_ARGUMENT_CLOSING_BRACE, rs(t, this.clonePosition())) : (this.bump(), {
        val: !0,
        err: null
      });
    }, t.prototype.parseSimpleArgStyleIfPossible = function () {
      for (var t = 0, e = this.clonePosition(); !this.isEOF();) {
        switch (this.char()) {
          case 39:
            this.bump();
            var i = this.clonePosition();
            if (!this.bumpUntil("'")) return this.error(pr.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, rs(i, this.clonePosition()));
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
          for (var e = t.split(zr).filter(function (t) {
              return t.length > 0;
            }), i = [], r = 0, s = e; r < s.length; r++) {
            var n = s[r].split("/");
            if (0 === n.length) throw new Error("Invalid number skeleton");
            for (var o = n[0], a = n.slice(1), l = 0, c = a; l < c.length; l++) if (0 === c[l].length) throw new Error("Invalid number skeleton");
            i.push({
              stem: o,
              options: a
            });
          }
          return i;
        }(t);
      } catch (t) {
        return this.error(pr.INVALID_NUMBER_SKELETON, e);
      }
      return {
        val: {
          type: mr.number,
          tokens: i,
          location: e,
          parsedOptions: this.shouldParseSkeletons ? Kr(i) : {}
        },
        err: null
      };
    }, t.prototype.tryParsePluralOrSelectOptions = function (t, e, i, r) {
      for (var s, n = !1, o = [], a = new Set(), l = r.value, c = r.location;;) {
        if (0 === l.length) {
          var h = this.clonePosition();
          if ("select" === e || !this.bumpIf("=")) break;
          var d = this.tryParseDecimalInteger(pr.EXPECT_PLURAL_ARGUMENT_SELECTOR, pr.INVALID_PLURAL_ARGUMENT_SELECTOR);
          if (d.err) return d;
          c = rs(h, this.clonePosition()), l = this.message.slice(h.offset, this.offset());
        }
        if (a.has(l)) return this.error("select" === e ? pr.DUPLICATE_SELECT_ARGUMENT_SELECTOR : pr.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, c);
        "other" === l && (n = !0), this.bumpSpace();
        var u = this.clonePosition();
        if (!this.bumpIf("{")) return this.error("select" === e ? pr.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : pr.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, rs(this.clonePosition(), this.clonePosition()));
        var p = this.parseMessage(t + 1, e, i);
        if (p.err) return p;
        var g = this.tryParseArgumentClose(u);
        if (g.err) return g;
        o.push([l, {
          value: p.val,
          location: rs(u, this.clonePosition())
        }]), a.add(l), this.bumpSpace(), l = (s = this.parseIdentifierIfPossible()).value, c = s.location;
      }
      return 0 === o.length ? this.error("select" === e ? pr.EXPECT_SELECT_ARGUMENT_SELECTOR : pr.EXPECT_PLURAL_ARGUMENT_SELECTOR, rs(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !n ? this.error(pr.MISSING_OTHER_CLAUSE, rs(this.clonePosition(), this.clonePosition())) : {
        val: o,
        err: null
      };
    }, t.prototype.tryParseDecimalInteger = function (t, e) {
      var i = 1,
        r = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (i = -1);
      for (var s = !1, n = 0; !this.isEOF();) {
        var o = this.char();
        if (!(o >= 48 && o <= 57)) break;
        s = !0, n = 10 * n + (o - 48), this.bump();
      }
      var a = rs(r, this.clonePosition());
      return s ? hs(n *= i) ? {
        val: n,
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
      var e = bs(this.message, t);
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
      if (ps(this.message, t, this.offset())) {
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
      for (; !this.isEOF() && Ss(this.char());) this.bump();
    }, t.prototype.peek = function () {
      if (this.isEOF()) return null;
      var t = this.char(),
        e = this.offset(),
        i = this.message.charCodeAt(e + (t >= 65536 ? 2 : 1));
      return null != i ? i : null;
    }, t;
  }();
  function ws(t) {
    return t >= 97 && t <= 122 || t >= 65 && t <= 90;
  }
  function Es(t) {
    return 45 === t || 46 === t || t >= 48 && t <= 57 || 95 === t || t >= 97 && t <= 122 || t >= 65 && t <= 90 || 183 == t || t >= 192 && t <= 214 || t >= 216 && t <= 246 || t >= 248 && t <= 893 || t >= 895 && t <= 8191 || t >= 8204 && t <= 8205 || t >= 8255 && t <= 8256 || t >= 8304 && t <= 8591 || t >= 11264 && t <= 12271 || t >= 12289 && t <= 55295 || t >= 63744 && t <= 64975 || t >= 65008 && t <= 65533 || t >= 65536 && t <= 983039;
  }
  function Ss(t) {
    return t >= 9 && t <= 13 || 32 === t || 133 === t || t >= 8206 && t <= 8207 || 8232 === t || 8233 === t;
  }
  function $s(t) {
    return t >= 33 && t <= 35 || 36 === t || t >= 37 && t <= 39 || 40 === t || 41 === t || 42 === t || 43 === t || 44 === t || 45 === t || t >= 46 && t <= 47 || t >= 58 && t <= 59 || t >= 60 && t <= 62 || t >= 63 && t <= 64 || 91 === t || 92 === t || 93 === t || 94 === t || 96 === t || 123 === t || 124 === t || 125 === t || 126 === t || 161 === t || t >= 162 && t <= 165 || 166 === t || 167 === t || 169 === t || 171 === t || 172 === t || 174 === t || 176 === t || 177 === t || 182 === t || 187 === t || 191 === t || 215 === t || 247 === t || t >= 8208 && t <= 8213 || t >= 8214 && t <= 8215 || 8216 === t || 8217 === t || 8218 === t || t >= 8219 && t <= 8220 || 8221 === t || 8222 === t || 8223 === t || t >= 8224 && t <= 8231 || t >= 8240 && t <= 8248 || 8249 === t || 8250 === t || t >= 8251 && t <= 8254 || t >= 8257 && t <= 8259 || 8260 === t || 8261 === t || 8262 === t || t >= 8263 && t <= 8273 || 8274 === t || 8275 === t || t >= 8277 && t <= 8286 || t >= 8592 && t <= 8596 || t >= 8597 && t <= 8601 || t >= 8602 && t <= 8603 || t >= 8604 && t <= 8607 || 8608 === t || t >= 8609 && t <= 8610 || 8611 === t || t >= 8612 && t <= 8613 || 8614 === t || t >= 8615 && t <= 8621 || 8622 === t || t >= 8623 && t <= 8653 || t >= 8654 && t <= 8655 || t >= 8656 && t <= 8657 || 8658 === t || 8659 === t || 8660 === t || t >= 8661 && t <= 8691 || t >= 8692 && t <= 8959 || t >= 8960 && t <= 8967 || 8968 === t || 8969 === t || 8970 === t || 8971 === t || t >= 8972 && t <= 8991 || t >= 8992 && t <= 8993 || t >= 8994 && t <= 9e3 || 9001 === t || 9002 === t || t >= 9003 && t <= 9083 || 9084 === t || t >= 9085 && t <= 9114 || t >= 9115 && t <= 9139 || t >= 9140 && t <= 9179 || t >= 9180 && t <= 9185 || t >= 9186 && t <= 9254 || t >= 9255 && t <= 9279 || t >= 9280 && t <= 9290 || t >= 9291 && t <= 9311 || t >= 9472 && t <= 9654 || 9655 === t || t >= 9656 && t <= 9664 || 9665 === t || t >= 9666 && t <= 9719 || t >= 9720 && t <= 9727 || t >= 9728 && t <= 9838 || 9839 === t || t >= 9840 && t <= 10087 || 10088 === t || 10089 === t || 10090 === t || 10091 === t || 10092 === t || 10093 === t || 10094 === t || 10095 === t || 10096 === t || 10097 === t || 10098 === t || 10099 === t || 10100 === t || 10101 === t || t >= 10132 && t <= 10175 || t >= 10176 && t <= 10180 || 10181 === t || 10182 === t || t >= 10183 && t <= 10213 || 10214 === t || 10215 === t || 10216 === t || 10217 === t || 10218 === t || 10219 === t || 10220 === t || 10221 === t || 10222 === t || 10223 === t || t >= 10224 && t <= 10239 || t >= 10240 && t <= 10495 || t >= 10496 && t <= 10626 || 10627 === t || 10628 === t || 10629 === t || 10630 === t || 10631 === t || 10632 === t || 10633 === t || 10634 === t || 10635 === t || 10636 === t || 10637 === t || 10638 === t || 10639 === t || 10640 === t || 10641 === t || 10642 === t || 10643 === t || 10644 === t || 10645 === t || 10646 === t || 10647 === t || 10648 === t || t >= 10649 && t <= 10711 || 10712 === t || 10713 === t || 10714 === t || 10715 === t || t >= 10716 && t <= 10747 || 10748 === t || 10749 === t || t >= 10750 && t <= 11007 || t >= 11008 && t <= 11055 || t >= 11056 && t <= 11076 || t >= 11077 && t <= 11078 || t >= 11079 && t <= 11084 || t >= 11085 && t <= 11123 || t >= 11124 && t <= 11125 || t >= 11126 && t <= 11157 || 11158 === t || t >= 11159 && t <= 11263 || t >= 11776 && t <= 11777 || 11778 === t || 11779 === t || 11780 === t || 11781 === t || t >= 11782 && t <= 11784 || 11785 === t || 11786 === t || 11787 === t || 11788 === t || 11789 === t || t >= 11790 && t <= 11798 || 11799 === t || t >= 11800 && t <= 11801 || 11802 === t || 11803 === t || 11804 === t || 11805 === t || t >= 11806 && t <= 11807 || 11808 === t || 11809 === t || 11810 === t || 11811 === t || 11812 === t || 11813 === t || 11814 === t || 11815 === t || 11816 === t || 11817 === t || t >= 11818 && t <= 11822 || 11823 === t || t >= 11824 && t <= 11833 || t >= 11834 && t <= 11835 || t >= 11836 && t <= 11839 || 11840 === t || 11841 === t || 11842 === t || t >= 11843 && t <= 11855 || t >= 11856 && t <= 11857 || 11858 === t || t >= 11859 && t <= 11903 || t >= 12289 && t <= 12291 || 12296 === t || 12297 === t || 12298 === t || 12299 === t || 12300 === t || 12301 === t || 12302 === t || 12303 === t || 12304 === t || 12305 === t || t >= 12306 && t <= 12307 || 12308 === t || 12309 === t || 12310 === t || 12311 === t || 12312 === t || 12313 === t || 12314 === t || 12315 === t || 12316 === t || 12317 === t || t >= 12318 && t <= 12319 || 12320 === t || 12336 === t || 64830 === t || 64831 === t || t >= 65093 && t <= 65094;
  }
  function Cs(t) {
    t.forEach(function (t) {
      if (delete t.location, Hr(t) || Br(t)) for (var e in t.options) delete t.options[e].location, Cs(t.options[e].value);else kr(t) && Lr(t.style) || (Mr(t) || Dr(t)) && Or(t.style) ? delete t.style.location : Fr(t) && Cs(t.children);
    });
  }
  function As(t, e) {
    void 0 === e && (e = {}), e = r({
      shouldParseSkeletons: !0,
      requiresOtherClause: !0
    }, e);
    var i = new xs(t, e).parse();
    if (i.err) {
      var s = SyntaxError(pr[i.err.kind]);
      throw s.location = i.err.location, s.originalMessage = i.err.message, s;
    }
    return (null == e ? void 0 : e.captureLocation) || Cs(i.val), i.val;
  }
  function Ts(t, e) {
    var i = e && e.cache ? e.cache : Fs,
      r = e && e.serializer ? e.serializer : Hs;
    return (e && e.strategy ? e.strategy : Ds)(t, {
      cache: i,
      serializer: r
    });
  }
  function Ps(t, e, i, r) {
    var s,
      n = null == (s = r) || "number" == typeof s || "boolean" == typeof s ? r : i(r),
      o = e.get(n);
    return void 0 === o && (o = t.call(this, r), e.set(n, o)), o;
  }
  function ks(t, e, i) {
    var r = Array.prototype.slice.call(arguments, 3),
      s = i(r),
      n = e.get(s);
    return void 0 === n && (n = t.apply(this, r), e.set(s, n)), n;
  }
  function Ms(t, e, i, r, s) {
    return i.bind(e, t, r, s);
  }
  function Ds(t, e) {
    return Ms(t, this, 1 === t.length ? Ps : ks, e.cache.create(), e.serializer);
  }
  var Hs = function () {
    return JSON.stringify(arguments);
  };
  function Bs() {
    this.cache = Object.create(null);
  }
  Bs.prototype.get = function (t) {
    return this.cache[t];
  }, Bs.prototype.set = function (t, e) {
    this.cache[t] = e;
  };
  var Is,
    Fs = {
      create: function () {
        return new Bs();
      }
    },
    Ls = {
      variadic: function (t, e) {
        return Ms(t, this, ks, e.cache.create(), e.serializer);
      },
      monadic: function (t, e) {
        return Ms(t, this, Ps, e.cache.create(), e.serializer);
      }
    };
  !function (t) {
    t.MISSING_VALUE = "MISSING_VALUE", t.INVALID_VALUE = "INVALID_VALUE", t.MISSING_INTL_API = "MISSING_INTL_API";
  }(Is || (Is = {}));
  var Os,
    Ns = function (t) {
      function e(e, i, r) {
        var s = t.call(this, e) || this;
        return s.code = i, s.originalMessage = r, s;
      }
      return i(e, t), e.prototype.toString = function () {
        return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
      }, e;
    }(Error),
    Us = function (t) {
      function e(e, i, r, s) {
        return t.call(this, 'Invalid values for "'.concat(e, '": "').concat(i, '". Options are "').concat(Object.keys(r).join('", "'), '"'), Is.INVALID_VALUE, s) || this;
      }
      return i(e, t), e;
    }(Ns),
    Rs = function (t) {
      function e(e, i, r) {
        return t.call(this, 'Value for "'.concat(e, '" must be of type ').concat(i), Is.INVALID_VALUE, r) || this;
      }
      return i(e, t), e;
    }(Ns),
    zs = function (t) {
      function e(e, i) {
        return t.call(this, 'The intl string context variable "'.concat(e, '" was not provided to the string "').concat(i, '"'), Is.MISSING_VALUE, i) || this;
      }
      return i(e, t), e;
    }(Ns);
  function js(t) {
    return "function" == typeof t;
  }
  function Gs(t, e, i, r, s, n, o) {
    if (1 === t.length && Tr(t[0])) return [{
      type: Os.literal,
      value: t[0].value
    }];
    for (var a = [], l = 0, c = t; l < c.length; l++) {
      var h = c[l];
      if (Tr(h)) a.push({
        type: Os.literal,
        value: h.value
      });else if (Ir(h)) "number" == typeof n && a.push({
        type: Os.literal,
        value: i.getNumberFormat(e).format(n)
      });else {
        var d = h.value;
        if (!s || !(d in s)) throw new zs(d, o);
        var u = s[d];
        if (Pr(h)) u && "string" != typeof u && "number" != typeof u || (u = "string" == typeof u || "number" == typeof u ? String(u) : ""), a.push({
          type: "string" == typeof u ? Os.literal : Os.object,
          value: u
        });else if (Mr(h)) {
          var p = "string" == typeof h.style ? r.date[h.style] : Or(h.style) ? h.style.parsedOptions : void 0;
          a.push({
            type: Os.literal,
            value: i.getDateTimeFormat(e, p).format(u)
          });
        } else if (Dr(h)) {
          p = "string" == typeof h.style ? r.time[h.style] : Or(h.style) ? h.style.parsedOptions : r.time.medium;
          a.push({
            type: Os.literal,
            value: i.getDateTimeFormat(e, p).format(u)
          });
        } else if (kr(h)) {
          (p = "string" == typeof h.style ? r.number[h.style] : Lr(h.style) ? h.style.parsedOptions : void 0) && p.scale && (u *= p.scale || 1), a.push({
            type: Os.literal,
            value: i.getNumberFormat(e, p).format(u)
          });
        } else {
          if (Fr(h)) {
            var g = h.children,
              m = h.value,
              b = s[m];
            if (!js(b)) throw new Rs(m, "function", o);
            var _ = b(Gs(g, e, i, r, s, n).map(function (t) {
              return t.value;
            }));
            Array.isArray(_) || (_ = [_]), a.push.apply(a, _.map(function (t) {
              return {
                type: "string" == typeof t ? Os.literal : Os.object,
                value: t
              };
            }));
          }
          if (Hr(h)) {
            if (!(y = h.options[u] || h.options.other)) throw new Us(h.value, u, Object.keys(h.options), o);
            a.push.apply(a, Gs(y.value, e, i, r, s));
          } else if (Br(h)) {
            var y;
            if (!(y = h.options["=".concat(u)])) {
              if (!Intl.PluralRules) throw new Ns('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', Is.MISSING_INTL_API, o);
              var v = i.getPluralRules(e, {
                type: h.pluralType
              }).select(u - (h.offset || 0));
              y = h.options[v] || h.options.other;
            }
            if (!y) throw new Us(h.value, u, Object.keys(h.options), o);
            a.push.apply(a, Gs(y.value, e, i, r, s, u - (h.offset || 0)));
          } else ;
        }
      }
    }
    return function (t) {
      return t.length < 2 ? t : t.reduce(function (t, e) {
        var i = t[t.length - 1];
        return i && i.type === Os.literal && e.type === Os.literal ? i.value += e.value : t.push(e), t;
      }, []);
    }(a);
  }
  function Vs(t, e) {
    return e ? Object.keys(t).reduce(function (i, s) {
      var n, o;
      return i[s] = (n = t[s], (o = e[s]) ? r(r(r({}, n || {}), o || {}), Object.keys(n).reduce(function (t, e) {
        return t[e] = r(r({}, n[e]), o[e] || {}), t;
      }, {})) : n), i;
    }, r({}, t)) : t;
  }
  function Ys(t) {
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
  }(Os || (Os = {}));
  var qs = function () {
      function t(e, i, s, o) {
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
            return t.length && e.type === Os.literal && "string" == typeof t[t.length - 1] ? t[t.length - 1] += e.value : t.push(e.value), t;
          }, []);
          return i.length <= 1 ? i[0] || "" : i;
        }, this.formatToParts = function (t) {
          return Gs(l.ast, l.locales, l.formatters, l.formats, t, void 0, l.message);
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
              var s = 0;
              for (r = Object.getOwnPropertySymbols(t); s < r.length; s++) e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[s]) && (i[r[s]] = t[r[s]]);
            }
            return i;
          }(c, ["formatters"]);
          this.ast = t.__parse(e, r(r({}, h), {
            locale: this.resolvedLocale
          }));
        } else this.ast = e;
        if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
        this.formats = Vs(t.formats, s), this.formatters = o && o.formatters || (void 0 === (a = this.formatterCache) && (a = {
          number: {},
          dateTime: {},
          pluralRules: {}
        }), {
          getNumberFormat: Ts(function () {
            for (var t, e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
            return new ((t = Intl.NumberFormat).bind.apply(t, n([void 0], e, !1)))();
          }, {
            cache: Ys(a.number),
            strategy: Ls.variadic
          }),
          getDateTimeFormat: Ts(function () {
            for (var t, e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
            return new ((t = Intl.DateTimeFormat).bind.apply(t, n([void 0], e, !1)))();
          }, {
            cache: Ys(a.dateTime),
            strategy: Ls.variadic
          }),
          getPluralRules: Ts(function () {
            for (var t, e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
            return new ((t = Intl.PluralRules).bind.apply(t, n([void 0], e, !1)))();
          }, {
            cache: Ys(a.pluralRules),
            strategy: Ls.variadic
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
      }, t.__parse = As, t.formats = {
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
    Ws = qs,
    Xs = {
      en: xr,
      de: Ar
    };
  function Zs(t, e, ...i) {
    const r = e.replace(/['"]+/g, "");
    var s;
    try {
      s = t.split(".").reduce((t, e) => t[e], Xs[r]);
    } catch (e) {
      s = t.split(".").reduce((t, e) => t[e], Xs.en);
    }
    if (void 0 === s && (s = t.split(".").reduce((t, e) => t[e], Xs.en)), !i.length) return s;
    const n = {};
    for (let t = 0; t < i.length; t += 2) {
      let e = i[t];
      e = e.replace(/^{([^}]+)?}$/, "$1"), n[e] = i[t + 1];
    }
    try {
      return new Ws(s, e).format(n);
    } catch (t) {
      return "Translation " + t;
    }
  }
  const Ks = t => e => "function" == typeof e ? ((t, e) => (window.customElements.get(t) || window.customElements.define(t, e), e))(t, e) : ((t, e) => {
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
  let Qs = class extends pt {
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
        style=${Ri(t)}
        @click=${this._handleToggleClick}
      >
        ${this.showVideo ? this._renderInner() : K}
      </div>
    `;
    }
    _renderInner() {
      const t = {
        "background-image": this.camImgString
      };
      return X` <div
      class="ac-camera-wrapper"
      style=${Ri(t)}
    ></div>`;
    }
    static get styles() {
      return u`
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
  s([yt({
    attribute: "show-video"
  })], Qs.prototype, "showVideo", void 0), s([yt({
    attribute: "toggle-video"
  })], Qs.prototype, "toggleVideo", void 0), s([yt({
    attribute: "camera-entity"
  })], Qs.prototype, "cameraEntity", void 0), s([vt()], Qs.prototype, "camImgString", void 0), Qs = s([Ks("anycubic-printercard-camera_view")], Qs);
  let Js = class extends pt {
    constructor() {
      super(...arguments), this.checked = !1, this.disabled = !1, this._handleClick = () => {
        this.disabled || Oe(this, "ac-toggle-change", {
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
      return u`
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
  s([yt({
    type: Boolean
  })], Js.prototype, "checked", void 0), s([yt({
    type: Boolean
  })], Js.prototype, "disabled", void 0), Js = s([Ks("anycubic-ui-toggle-switch")], Js);
  const tn = "secondary_",
    en = "multi_color_box_runout_refill",
    rn = tn + en,
    sn = "ace_spools",
    nn = tn + sn;
  let on = class extends pt {
    constructor() {
      super(...arguments), this.box_id = 0, this._runoutRefillId = en, this._spoolsEntityId = sn, this.spoolList = [], this.selectedIndex = -1, this.selectedMaterialType = "", this.selectedColor = [0, 0, 0], this._changingRunout = !1, this._openDryingModal = () => {
        Oe(this, "ac-mcbdry-modal", {
          modalOpen: !0,
          box_id: this.box_id
        });
      }, this._handleRunoutRefillChanged = t => {
        this._changingRunout || (this._changingRunout = !0, this.hass.callService("switch", "toggle", {
          entity_id: oi(this.printerEntityIdPart, "switch", this._runoutRefillId)
        }).then(() => {
          this._changingRunout = !1;
        }).catch(t => {
          this._changingRunout = !1;
        }));
      }, this._editSpool = t => {
        const e = t.currentTarget.index,
          i = t.currentTarget.material_type,
          r = t.currentTarget.color;
        Oe(this, "ac-mcb-modal", {
          modalOpen: !0,
          box_id: this.box_id,
          spool_index: e,
          material_type: i,
          color: r
        });
      };
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("language") && (this._buttonRefill = Zs("card.buttons.runout_refill", this.language), this._buttonDry = Zs("card.buttons.dry", this.language)), t.has("box_id") && (1 === this.box_id ? (this._runoutRefillId = rn, this._spoolsEntityId = nn) : (this._runoutRefillId = en, this._spoolsEntityId = sn)), (t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) && (this.spoolList = bi(this.hass, this.printerEntities, this.printerEntityIdPart, this._spoolsEntityId, "not loaded", {
        spool_info: []
      }).attributes.spool_info, this._runoutRefillState = di(this.hass, this.printerEntities, this.printerEntityIdPart, this._runoutRefillId));
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
      return Oi(this.spoolList, (t, e) => {
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
                style=${Ri(i)}
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
      return u`
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
  s([yt()], on.prototype, "hass", void 0), s([yt()], on.prototype, "language", void 0), s([yt({
    attribute: "printer-entities"
  })], on.prototype, "printerEntities", void 0), s([yt({
    attribute: "printer-entity-id-part"
  })], on.prototype, "printerEntityIdPart", void 0), s([yt()], on.prototype, "box_id", void 0), s([vt()], on.prototype, "_runoutRefillId", void 0), s([vt()], on.prototype, "_spoolsEntityId", void 0), s([vt()], on.prototype, "spoolList", void 0), s([vt()], on.prototype, "selectedIndex", void 0), s([vt()], on.prototype, "selectedMaterialType", void 0), s([vt()], on.prototype, "selectedColor", void 0), s([vt()], on.prototype, "_runoutRefillState", void 0), s([vt()], on.prototype, "_buttonRefill", void 0), s([vt()], on.prototype, "_buttonDry", void 0), s([vt()], on.prototype, "_changingRunout", void 0), on = s([Ks("anycubic-printercard-multicolorbox_view")], on);
  class an {
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
  const ln = {
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
  class cn {
    constructor(t, {
      target: e,
      config: i,
      callback: r,
      skipInitial: s
    }) {
      this.t = new Set(), this.o = !1, this.i = !1, this.h = t, null !== e && this.t.add(e ?? t), this.l = i, this.o = s ?? this.o, this.callback = r, window.ResizeObserver ? (this.u = new ResizeObserver(t => {
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
  const hn = {
      keyframeOptions: {
        duration: 2e3,
        direction: "alternate",
        composite: "add"
      },
      properties: ["left"]
    },
    dn = {
      keyframeOptions: {
        duration: 100,
        composite: "add"
      },
      properties: ["top"]
    };
  let un = class extends pt {
    constructor() {
      super(...arguments), this._progressNum = 0, this.animKeyframeGantry = 0, this._isPrinting = !1, this._gantryAnimOptions = () => Object.assign(Object.assign({}, hn), {
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
      super.connectedCallback(), this.resizeObserver = new cn(this, {
        callback: this._onResizeEvent
      }), this.dimensions && this._isPrinting && this._moveGantry();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
    }
    willUpdate(t) {
      if (super.willUpdate(t), t.has("scaleFactor") && this._onResizeEvent(), t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        const t = mi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_preview");
        this.imagePreviewUrl !== t && (this.imagePreviewUrl = t, this.imagePreviewBgUrl = this.imagePreviewUrl ? `url('${t}')` : void 0), this._progressNum = Number(bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_progress", 0).state) / 100;
        const e = fi(bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_state").state.toLowerCase());
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
                          style=${Ri(t)}
                        ></div>
                      ` : K}
                </div>
              </div>
              <div class="ac-apr-buildplate"></div>
              <div
                class="ac-apr-xaxis"
                ${ur(Object.assign({}, dn))}
              ></div>
              <div
                class="ac-apr-gantry"
                ${ur(Object.assign({}, dn))}
                ${ur(this._gantryAnimOptions)}
              >
                <div class="ac-apr-nozzle"></div>
              </div>
            </div>` : K}
      </div>
    `;
    }
    _setDimensions(t, e) {
      this.dimensions = function (t, e, i) {
        const r = e.height / (t.top.height + t.bottom.height + t.left.height),
          s = e.width / (t.top.width + t.left.width + t.right.width),
          n = new an(Math.min(r, s) * i),
          o = n.val(t.top.width),
          a = n.val(t.top.height + t.bottom.height + t.left.height),
          l = n.val(t.top.width - (t.left.width + t.right.width)),
          c = n.val(t.left.height),
          h = n.val(t.left.width),
          d = n.val(t.top.height),
          u = n.val(t.top.height - t.buildplate.verticalOffset) + c,
          p = u + n.val((t.xAxis.extruder.height - t.xAxis.height) / 2 - (t.xAxis.extruder.height + 12)),
          g = n.val(t.buildplate.maxWidth),
          m = n.val(t.buildplate.maxHeight),
          b = n.val(t.left.width + (n.og(l) - t.buildplate.maxWidth) / 2),
          _ = u - n.val(t.buildplate.maxHeight),
          y = g,
          v = b,
          f = u,
          x = n.val(t.xAxis.width),
          w = n.val(t.xAxis.height),
          E = n.val(t.xAxis.offsetLeft),
          S = x,
          $ = w,
          C = n.val(t.xAxis.extruder.width),
          A = n.val(t.xAxis.extruder.height),
          T = v - C / 2,
          P = T + g,
          k = n.val(12),
          M = n.val(12),
          D = f - A - M;
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
            width: y,
            left: v,
            top: f
          },
          XAxis: {
            width: x,
            height: w,
            left: E,
            top: D + .7 * A - w / 2
          },
          Track: {
            width: S,
            height: $
          },
          Basis: {
            Y: u,
            X: p
          },
          Gantry: {
            width: C,
            height: A,
            left: T,
            top: D
          },
          Nozzle: {
            width: k,
            height: M,
            left: (C - k) / 2,
            top: A
          },
          GantryMaxLeft: P
        };
      }(this.printerConfig, {
        width: t,
        height: e
      }, this.scaleFactor || 1);
    }
    static get styles() {
      return u`
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
  s([xt(".ac-printercard-animatedprinter")], un.prototype, "_rootElement", void 0), s([xt(".ac-apr-scalable")], un.prototype, "_elAcAPr_scalable", void 0), s([xt(".ac-apr-frame")], un.prototype, "_elAcAPr_frame", void 0), s([xt(".ac-apr-hole")], un.prototype, "_elAcAPr_hole", void 0), s([xt(".ac-apr-buildarea")], un.prototype, "_elAcAPr_buildarea", void 0), s([xt(".ac-apr-animprint")], un.prototype, "_elAcAPr_animprint", void 0), s([xt(".ac-apr-buildplate")], un.prototype, "_elAcAPr_buildplate", void 0), s([xt(".ac-apr-xaxis")], un.prototype, "_elAcAPr_xaxis", void 0), s([xt(".ac-apr-gantry")], un.prototype, "_elAcAPr_gantry", void 0), s([xt(".ac-apr-nozzle")], un.prototype, "_elAcAPr_nozzle", void 0), s([yt()], un.prototype, "hass", void 0), s([yt({
    attribute: "scale-factor"
  })], un.prototype, "scaleFactor", void 0), s([yt({
    attribute: "printer-config"
  })], un.prototype, "printerConfig", void 0), s([yt({
    attribute: "printer-entities"
  })], un.prototype, "printerEntities", void 0), s([yt({
    attribute: "printer-entity-id-part"
  })], un.prototype, "printerEntityIdPart", void 0), s([vt()], un.prototype, "dimensions", void 0), s([vt()], un.prototype, "resizeObserver", void 0), s([vt()], un.prototype, "_progressNum", void 0), s([vt()], un.prototype, "animKeyframeGantry", void 0), s([vt()], un.prototype, "_isPrinting", void 0), s([vt()], un.prototype, "imagePreviewUrl", void 0), s([vt()], un.prototype, "imagePreviewBgUrl", void 0), un = s([Ks("anycubic-printercard-animated_printer")], un);
  let pn = class extends pt {
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
          .printerConfig=${ln}
        ></anycubic-printercard-animated_printer>
      </div>
    `;
    }
    static get styles() {
      return u`
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
  s([yt()], pn.prototype, "hass", void 0), s([yt({
    attribute: "toggle-video",
    type: Function
  })], pn.prototype, "toggleVideo", void 0), s([yt({
    attribute: "printer-entities"
  })], pn.prototype, "printerEntities", void 0), s([yt({
    attribute: "printer-entity-id-part"
  })], pn.prototype, "printerEntityIdPart", void 0), s([yt({
    attribute: "scale-factor"
  })], pn.prototype, "scaleFactor", void 0), pn = s([Ks("anycubic-printercard-printer_view")], pn);
  /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
  const gn = (t, e, i) => {
      const r = new Map();
      for (let s = e; s <= i; s++) r.set(t[s], s);
      return r;
    },
    mn = Ii(class extends Fi {
      constructor(t) {
        if (super(t), t.type !== Bi) throw Error("repeat() can only be used in text expressions");
      }
      dt(t, e, i) {
        let r;
        void 0 === i ? i = e : void 0 !== e && (r = e);
        const s = [],
          n = [];
        let o = 0;
        for (const e of t) s[o] = r ? r(e, o) : o, n[o] = i(e, o), o++;
        return {
          values: n,
          keys: s
        };
      }
      render(t, e, i) {
        return this.dt(t, e, i).values;
      }
      update(t, [e, i, r]) {
        const s = (t => t._$AH)(t),
          {
            values: n,
            keys: o
          } = this.dt(e, i, r);
        if (!Array.isArray(s)) return this.ut = o, n;
        const a = this.ut ??= [],
          l = [];
        let c,
          h,
          d = 0,
          u = s.length - 1,
          p = 0,
          g = n.length - 1;
        for (; d <= u && p <= g;) if (null === s[d]) d++;else if (null === s[u]) u--;else if (a[d] === o[p]) l[p] = Vi(s[d], n[p]), d++, p++;else if (a[u] === o[g]) l[g] = Vi(s[u], n[g]), u--, g--;else if (a[d] === o[g]) l[g] = Vi(s[d], n[g]), Gi(t, l[g + 1], s[d]), d++, g--;else if (a[u] === o[p]) l[p] = Vi(s[u], n[p]), Gi(t, s[d], s[u]), u--, p++;else if (void 0 === c && (c = gn(o, p, g), h = gn(a, d, u)), c.has(a[d])) {
          if (c.has(a[u])) {
            const e = h.get(o[p]),
              i = void 0 !== e ? s[e] : null;
            if (null === i) {
              const e = Gi(t, s[d]);
              Vi(e, n[p]), l[p] = e;
            } else l[p] = Vi(i, n[p]), Gi(t, s[d], i), s[e] = null;
            p++;
          } else qi(s[u]), u--;
        } else qi(s[d]), d++;
        for (; p <= g;) {
          const e = Gi(t, l[g + 1]);
          Vi(e, n[p]), l[p++] = e;
        }
        for (; d <= u;) {
          const t = s[d++];
          null !== t && qi(t);
        }
        return this.ut = o, ((t, e = Yi) => {
          t._$AH = e;
        })(t, l), Z;
      }
    });
  let bn = class extends pt {
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
              style=${Ri(t)}
            ></div>
          </div>
        </div>
      </div>
    `;
    }
    static get styles() {
      return u`
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
  s([yt({
    type: String
  })], bn.prototype, "name", void 0), s([yt({
    type: Number
  })], bn.prototype, "value", void 0), s([yt({
    type: Number
  })], bn.prototype, "progress", void 0), bn = s([Ks("anycubic-printercard-progress-line")], bn);
  let _n = class extends pt {
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
      return u`
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
  s([yt({
    type: String
  })], _n.prototype, "name", void 0), s([yt({
    type: String
  })], _n.prototype, "value", void 0), s([yt({
    type: String
  })], _n.prototype, "unit", void 0), _n = s([Ks("anycubic-printercard-stat-line")], _n);
  let yn = class extends pt {
    render() {
      return X`<anycubic-printercard-stat-line
      .name=${this.name}
      .value=${$i(this.temperatureEntity, this.temperatureUnit, this.round)}
    ></anycubic-printercard-stat-line>`;
    }
    static get styles() {
      return u`
      :host {
        box-sizing: border-box;
        width: 100%;
      }
    `;
    }
  };
  s([yt({
    type: String
  })], yn.prototype, "name", void 0), s([yt({
    attribute: "temperature-entity"
  })], yn.prototype, "temperatureEntity", void 0), s([yt({
    type: Boolean
  })], yn.prototype, "round", void 0), s([yt({
    attribute: "temperature-unit",
    type: String
  })], yn.prototype, "temperatureUnit", void 0), yn = s([Ks("anycubic-printercard-stat-temperature")], yn);
  let vn = class extends pt {
    constructor() {
      super(...arguments), this.currentTime = 0, this.lastIntervalId = -1;
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("timeEntity") && (-1 !== this.lastIntervalId && clearInterval(this.lastIntervalId), this.currentTime = function (t, e = !1) {
        let i;
        if (t.state) {
          if (t.state.includes(", ")) {
            const [e, r] = t.state.split(", "),
              [s, n, o] = r.split(":"),
              a = e.match(/\d+/);
            i = 60 * +(a ? a[0] : 0) * 60 * 24 + 60 * +s * 60 + 60 * +n + +o;
          } else if (t.state.includes(":")) {
            const [e, r, s] = t.state.split(":");
            i = 60 * +e * 60 + 60 * +r + +s;
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
      .value=${Ei(this.currentTime, this.timeType, this.round, this.use_24hr)}
    ></anycubic-printercard-stat-line>`;
    }
    _incTime() {
      (0 === this.currentTime || this.currentTime && !isNaN(this.currentTime)) && (this.currentTime = Number(this.currentTime) + this.direction);
    }
    static get styles() {
      return u`
      :host {
        box-sizing: border-box;
        width: 100%;
      }
    `;
    }
  };
  s([yt({
    attribute: "time-entity"
  })], vn.prototype, "timeEntity", void 0), s([yt({
    attribute: "time-type"
  })], vn.prototype, "timeType", void 0), s([yt({
    type: String
  })], vn.prototype, "name", void 0), s([yt({
    type: Number
  })], vn.prototype, "direction", void 0), s([yt({
    type: Boolean
  })], vn.prototype, "round", void 0), s([yt({
    type: Boolean
  })], vn.prototype, "use_24hr", void 0), s([yt({
    attribute: "is-seconds",
    type: Boolean
  })], vn.prototype, "isSeconds", void 0), s([vt()], vn.prototype, "currentTime", void 0), s([vt()], vn.prototype, "lastIntervalId", void 0), vn = s([Ks("anycubic-printercard-stat-time")], vn);
  let fn = class extends pt {
    constructor() {
      super(...arguments), this.round = !0, this.temperatureUnit = je.C, this.progressPercent = 0, this._valDryProgress = 0;
    }
    willUpdate(t) {
      var e;
      if (super.willUpdate(t), t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        this._entETA = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_time_remaining"), this._entElapsed = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_time_elapsed"), this._entRemaining = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_time_remaining"), this._entBedCurrent = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "hotbed_temperature"), this._entHotendCurrent = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "nozzle_temperature"), this._entBedTarget = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_hotbed_temperature"), this._entHotendTarget = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_nozzle_temperature"), this._entAceTempCurrent = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "ace_current_temperature"), this._entAceTempTarget = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "dry_status_target_temperature"), this._valStatus = ti(bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_state").state), this._valOnline = _i(this.hass, this.printerEntities, this.printerEntityIdPart, "printer_online", "Online", "Offline", "unknown"), this._valAvailability = ti(bi(this.hass, this.printerEntities, this.printerEntityIdPart, "current_status").state), this._valJobName = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_name").state, this._valCurrentLayer = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_current_layer").state;
        const t = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_speed_mode", "", {
            available_modes: [],
            print_speed_mode_code: -1
          }),
          i = Pi(t),
          r = null !== (e = t.attributes.print_speed_mode_code) && void 0 !== e ? e : 0;
        this._valSpeedMode = r >= 0 && r in i ? i[r] : "Unknown", this._valFanSpeed = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "fan_speed", 0).state, this._valDryStatus = _i(this.hass, this.printerEntities, this.printerEntityIdPart, "dry_status_is_drying", this._labelDrying, this._labelNotDrying, this._labelUnknownState);
        const s = Number(bi(this.hass, this.printerEntities, this.printerEntityIdPart, "dry_status_total_duration", 0).state),
          n = Number(bi(this.hass, this.printerEntities, this.printerEntityIdPart, "dry_status_remaining_time", 0).state);
        this._valDryRemain = isNaN(n) ? "" : `${n} Mins`, this._valDryProgress = !isNaN(s) && s > 0 ? n / s * 100 : 0, this._valOnTime = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_on_time", 0).state, this._valOffTime = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_off_time", 0).state, this._valBottomTime = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_bottom_time", 0).state, this._valModelHeight = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_model_height", 0).state, this._valBottomLayers = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_bottom_layers", 0).state, this._valZUpHeight = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_z_up_height", 0).state, this._valZUpSpeed = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_z_up_speed", 0).state, this._valZDownSpeed = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_z_down_speed", 0).state;
      }
      (t.has("language") || t.has("monitoredStats")) && (this._statTranslations = this.monitoredStats.reduce((t, e) => (t[e] = Zs(`card.monitored_stats.${e}`, this.language), t), {})), t.has("language") && (this._labelDrying = Zs("card.drying_settings.state_drying", this.language), this._labelNotDrying = Zs("card.drying_settings.state_not_drying", this.language), this._labelUnknownState = Zs("common.states.unknown", this.language));
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
      return mn(this.monitoredStats, t => t, (t, e) => {
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
      return u`
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
  s([yt()], fn.prototype, "hass", void 0), s([yt()], fn.prototype, "language", void 0), s([yt({
    attribute: "monitored-stats"
  })], fn.prototype, "monitoredStats", void 0), s([yt({
    attribute: "show-percent",
    type: Boolean
  })], fn.prototype, "showPercent", void 0), s([yt({
    type: Boolean
  })], fn.prototype, "round", void 0), s([yt({
    type: Boolean
  })], fn.prototype, "use_24hr", void 0), s([yt({
    attribute: "temperature-unit",
    type: String
  })], fn.prototype, "temperatureUnit", void 0), s([yt({
    attribute: "printer-entities"
  })], fn.prototype, "printerEntities", void 0), s([yt({
    attribute: "printer-entity-id-part"
  })], fn.prototype, "printerEntityIdPart", void 0), s([yt({
    attribute: "progress-percent"
  })], fn.prototype, "progressPercent", void 0), s([vt()], fn.prototype, "_statTranslations", void 0), s([vt()], fn.prototype, "_labelDrying", void 0), s([vt()], fn.prototype, "_labelNotDrying", void 0), s([vt()], fn.prototype, "_labelUnknownState", void 0), s([vt()], fn.prototype, "_entETA", void 0), s([vt()], fn.prototype, "_entElapsed", void 0), s([vt()], fn.prototype, "_entRemaining", void 0), s([vt()], fn.prototype, "_entBedCurrent", void 0), s([vt()], fn.prototype, "_entHotendCurrent", void 0), s([vt()], fn.prototype, "_entBedTarget", void 0), s([vt()], fn.prototype, "_entHotendTarget", void 0), s([vt()], fn.prototype, "_entAceTempCurrent", void 0), s([vt()], fn.prototype, "_entAceTempTarget", void 0), s([vt()], fn.prototype, "_valStatus", void 0), s([vt()], fn.prototype, "_valOnline", void 0), s([vt()], fn.prototype, "_valAvailability", void 0), s([vt()], fn.prototype, "_valJobName", void 0), s([vt()], fn.prototype, "_valCurrentLayer", void 0), s([vt()], fn.prototype, "_valSpeedMode", void 0), s([vt()], fn.prototype, "_valFanSpeed", void 0), s([vt()], fn.prototype, "_valDryStatus", void 0), s([vt()], fn.prototype, "_valDryRemain", void 0), s([vt()], fn.prototype, "_valDryProgress", void 0), s([vt()], fn.prototype, "_valOnTime", void 0), s([vt()], fn.prototype, "_valOffTime", void 0), s([vt()], fn.prototype, "_valBottomTime", void 0), s([vt()], fn.prototype, "_valModelHeight", void 0), s([vt()], fn.prototype, "_valBottomLayers", void 0), s([vt()], fn.prototype, "_valZUpHeight", void 0), s([vt()], fn.prototype, "_valZUpSpeed", void 0), s([vt()], fn.prototype, "_valZDownSpeed", void 0), fn = s([Ks("anycubic-printercard-stats-component")], fn);
  const xn = u`
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
  let wn = class extends pt {
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
        style=${Ri(t)}
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
      return u`
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
  s([yt()], wn.prototype, "item", void 0), s([vt()], wn.prototype, "_isActive", void 0), wn = s([Ks("anycubic-ui-select-dropdown-item")], wn);
  let En = class extends pt {
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
        this._selectedItem = this.availableOptions[e], Oe(this, "ac-select-dropdown", {
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
            style=${Ri(t)}
            @click=${this._showOptions}
            @mouseenter=${this._setActive}
            @mouseleave=${this._setInactive}
          >
            ${this._selectedItem ? this._selectedItem : this.placeholder}
            <ha-svg-icon .path=${Mi}></ha-svg-icon>
          </button>
          <div class="ac-ui-select-options" style=${Ri(e)}>
            ${this._renderOptions()}
          </div>
        ` : K;
    }
    _renderOptions() {
      return Oi(Object.keys(this.availableOptions), (t, e) => X`
          <anycubic-ui-select-dropdown-item
            .item=${this.availableOptions[t]}
            .item_key=${t}
            @click=${this._selectItem}
          ></anycubic-ui-select-dropdown-item>
        `);
    }
    static get styles() {
      return u`
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
  s([yt({
    attribute: "available-options"
  })], En.prototype, "availableOptions", void 0), s([yt()], En.prototype, "placeholder", void 0), s([yt({
    attribute: "initial-item"
  })], En.prototype, "initialItem", void 0), s([vt()], En.prototype, "_selectedItem", void 0), s([vt()], En.prototype, "_active", void 0), s([vt()], En.prototype, "_hidden", void 0), En = s([Ks("anycubic-ui-select-dropdown")], En);
  const Sn = {
      keyframeOptions: {
        duration: 250,
        direction: "alternate",
        easing: "ease-in-out"
      },
      properties: ["height", "opacity", "scale"]
    },
    $n = "drying_start_preset_1",
    Cn = "drying_start_preset_2",
    An = "drying_start_preset_3",
    Tn = "drying_start_preset_4",
    Pn = "drying_start_preset_5",
    kn = "dry_stop",
    Mn = "drying_temperature_input",
    Dn = "drying_time_input",
    Hn = "dry_start_custom",
    Bn = "secondary_",
    In = Bn + $n,
    Fn = Bn + Cn,
    Ln = Bn + An,
    On = Bn + Tn,
    Nn = Bn + Pn,
    Un = kn,
    Rn = Bn + Mn,
    zn = Bn + Dn,
    jn = Hn;
  let Gn = class extends pt {
    constructor() {
      super(...arguments), this.inline = !1, this.box_id = 0, this._dryingPresetId1 = $n, this._dryingPresetId2 = Cn, this._dryingPresetId3 = An, this._dryingPresetId4 = Tn, this._dryingPresetId5 = Pn, this._dryingStopId = kn, this._customTempId = Mn, this._customDurationId = Dn, this._customStartId = Hn, this._hasDryingPreset1 = !1, this._hasDryingPreset2 = !1, this._hasDryingPreset3 = !1, this._hasDryingPreset4 = !1, this._hasDryingPreset5 = !1, this._hasDryingStop = !1, this._hasCustomDrying = !1, this._dryingPresetTemp1 = "", this._dryingPresetDur1 = "", this._dryingPresetTemp2 = "", this._dryingPresetDur2 = "", this._dryingPresetTemp3 = "", this._dryingPresetDur3 = "", this._dryingPresetTemp4 = "", this._dryingPresetDur4 = "", this._dryingPresetTemp5 = "", this._dryingPresetDur5 = "", this._customTemp = 50, this._customTempMin = 40, this._customTempMax = 70, this._userEditCustomTemp = !1, this._customDuration = 240, this._customDurationMin = 30, this._customDurationMax = 480, this._userEditCustomDuration = !1, this._startingCustomDrying = !1, this._isOpen = !1, this._handleDryingPreset1 = () => {
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
        const t = ai(this.printerEntities, this.printerEntityIdPart, "number", this._customTempId),
          e = ai(this.printerEntities, this.printerEntityIdPart, "number", this._customDurationId);
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
      var e, i, r, s;
      if (super.willUpdate(t), t.has("language") && (this._heading = Zs("card.drying_settings.heading", this.language), this._buttonTextPreset = Zs("card.drying_settings.button_preset", this.language), this._buttonTextMinutes = Zs("card.drying_settings.button_minutes", this.language), this._buttonStopDrying = Zs("card.drying_settings.button_stop_drying", this.language), this._hintNothingAvailable = Zs("card.drying_settings.hint_nothing_available", this.language), this._customHeading = Zs("card.drying_settings.custom_heading", this.language), this._customLabelTemp = Zs("card.drying_settings.custom_label_temp", this.language), this._customLabelDuration = Zs("card.drying_settings.custom_label_duration", this.language), this._customButtonStart = Zs("card.drying_settings.custom_button_start", this.language)), t.has("box_id") && (1 === this.box_id ? (this._dryingPresetId1 = In, this._dryingPresetId2 = Fn, this._dryingPresetId3 = Ln, this._dryingPresetId4 = On, this._dryingPresetId5 = Nn, this._dryingStopId = Un, this._customTempId = Rn, this._customDurationId = zn, this._customStartId = jn) : (this._dryingPresetId1 = $n, this._dryingPresetId2 = Cn, this._dryingPresetId3 = An, this._dryingPresetId4 = Tn, this._dryingPresetId5 = Pn, this._dryingStopId = kn, this._customTempId = Mn, this._customDurationId = Dn, this._customStartId = Hn)), t.has("hass") || t.has("selectedPrinterDevice") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        const t = pi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId1);
        this._hasDryingPreset1 = gi(t), this._dryingPresetTemp1 = String(t.attributes.temperature), this._dryingPresetDur1 = String(t.attributes.duration);
        const n = pi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId2);
        this._hasDryingPreset2 = gi(n), this._dryingPresetTemp2 = String(n.attributes.temperature), this._dryingPresetDur2 = String(n.attributes.duration);
        const o = pi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId3);
        this._hasDryingPreset3 = gi(o), this._dryingPresetTemp3 = String(o.attributes.temperature), this._dryingPresetDur3 = String(o.attributes.duration);
        const a = pi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId4);
        this._hasDryingPreset4 = gi(a), this._dryingPresetTemp4 = String(a.attributes.temperature), this._dryingPresetDur4 = String(a.attributes.duration);
        const l = pi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingPresetId5);
        this._hasDryingPreset5 = gi(l), this._dryingPresetTemp5 = String(l.attributes.temperature), this._dryingPresetDur5 = String(l.attributes.duration);
        const c = pi(this.hass, this.printerEntities, this.printerEntityIdPart, this._dryingStopId);
        this._hasDryingStop = gi(c);
        const h = pi(this.hass, this.printerEntities, this.printerEntityIdPart, this._customStartId);
        if (this._hasCustomDrying = gi(h), !this._userEditCustomTemp) {
          const t = yi(this.hass, this.printerEntities, this.printerEntityIdPart, this._customTempId, 50, {
            min: 40,
            max: 70
          });
          this._customTemp = Number(t.state), this._customTempMin = Number(null !== (e = t.attributes.min) && void 0 !== e ? e : 40), this._customTempMax = Number(null !== (i = t.attributes.max) && void 0 !== i ? i : 70);
        }
        if (!this._userEditCustomDuration) {
          const t = yi(this.hass, this.printerEntities, this.printerEntityIdPart, this._customDurationId, 240, {
            min: 30,
            max: 480
          });
          this._customDuration = Number(t.state), this._customDurationMin = Number(null !== (r = t.attributes.min) && void 0 !== r ? r : 30), this._customDurationMax = Number(null !== (s = t.attributes.max) && void 0 !== s ? s : 480);
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
        style=${Ri({
        height: "auto",
        opacity: 1,
        scale: 1
      })}
        ${ur(Object.assign({}, Sn))}
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
        ${t ? X`<p class="ac-drying-hint">${this._hintNothingAvailable}</p>` : K}
        <div class="ac-drying-buttonscont">
          ${this._hasDryingPreset1 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset1}>
                    ${this._buttonTextPreset} 1<br />
                    ${this._dryingPresetDur1} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp1}°C
                  </ha-control-button>
                </div>
              ` : K}
          ${this._hasDryingPreset2 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset2}>
                    ${this._buttonTextPreset} 2<br />
                    ${this._dryingPresetDur2} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp2}°C
                  </ha-control-button>
                </div>
              ` : K}
          ${this._hasDryingPreset3 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset3}>
                    ${this._buttonTextPreset} 3<br />
                    ${this._dryingPresetDur3} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp3}°C
                  </ha-control-button>
                </div>
              ` : K}
          ${this._hasDryingPreset4 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset4}>
                    ${this._buttonTextPreset} 4<br />
                    ${this._dryingPresetDur4} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp4}°C
                  </ha-control-button>
                </div>
              ` : K}
          ${this._hasDryingPreset5 ? X`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset5}>
                    ${this._buttonTextPreset} 5<br />
                    ${this._dryingPresetDur5} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp5}°C
                  </ha-control-button>
                </div>
              ` : K}
          ${this._hasDryingStop ? X`
                <div class="ac-flex-break"></div>
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingStop}>
                    ${this._buttonStopDrying}
                  </ha-control-button>
                </div>
              ` : K}
        </div>
        ${this._hasCustomDrying ? this._renderCustomDrying() : K}
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
      const e = ai(this.printerEntities, this.printerEntityIdPart, "button", t);
      e && this.hass.callService("button", "press", {
        entity_id: e.entity_id
      }).then().catch(t => {});
    }
    static get styles() {
      return u`
      ${xn}

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
  s([yt()], Gn.prototype, "hass", void 0), s([yt()], Gn.prototype, "language", void 0), s([yt({
    attribute: "selected-printer-device"
  })], Gn.prototype, "selectedPrinterDevice", void 0), s([yt({
    attribute: "printer-entities"
  })], Gn.prototype, "printerEntities", void 0), s([yt({
    attribute: "printer-entity-id-part"
  })], Gn.prototype, "printerEntityIdPart", void 0), s([yt({
    type: Boolean,
    reflect: !0
  })], Gn.prototype, "inline", void 0), s([yt({
    type: Number
  })], Gn.prototype, "box_id", void 0), s([vt()], Gn.prototype, "_dryingPresetId1", void 0), s([vt()], Gn.prototype, "_dryingPresetId2", void 0), s([vt()], Gn.prototype, "_dryingPresetId3", void 0), s([vt()], Gn.prototype, "_dryingPresetId4", void 0), s([vt()], Gn.prototype, "_dryingPresetId5", void 0), s([vt()], Gn.prototype, "_dryingStopId", void 0), s([vt()], Gn.prototype, "_customTempId", void 0), s([vt()], Gn.prototype, "_customDurationId", void 0), s([vt()], Gn.prototype, "_customStartId", void 0), s([vt()], Gn.prototype, "_hasDryingPreset1", void 0), s([vt()], Gn.prototype, "_hasDryingPreset2", void 0), s([vt()], Gn.prototype, "_hasDryingPreset3", void 0), s([vt()], Gn.prototype, "_hasDryingPreset4", void 0), s([vt()], Gn.prototype, "_hasDryingPreset5", void 0), s([vt()], Gn.prototype, "_hasDryingStop", void 0), s([vt()], Gn.prototype, "_hasCustomDrying", void 0), s([vt()], Gn.prototype, "_dryingPresetTemp1", void 0), s([vt()], Gn.prototype, "_dryingPresetDur1", void 0), s([vt()], Gn.prototype, "_dryingPresetTemp2", void 0), s([vt()], Gn.prototype, "_dryingPresetDur2", void 0), s([vt()], Gn.prototype, "_dryingPresetTemp3", void 0), s([vt()], Gn.prototype, "_dryingPresetDur3", void 0), s([vt()], Gn.prototype, "_dryingPresetTemp4", void 0), s([vt()], Gn.prototype, "_dryingPresetDur4", void 0), s([vt()], Gn.prototype, "_dryingPresetTemp5", void 0), s([vt()], Gn.prototype, "_dryingPresetDur5", void 0), s([vt()], Gn.prototype, "_customTemp", void 0), s([vt()], Gn.prototype, "_customTempMin", void 0), s([vt()], Gn.prototype, "_customTempMax", void 0), s([vt()], Gn.prototype, "_userEditCustomTemp", void 0), s([vt()], Gn.prototype, "_customDuration", void 0), s([vt()], Gn.prototype, "_customDurationMin", void 0), s([vt()], Gn.prototype, "_customDurationMax", void 0), s([vt()], Gn.prototype, "_userEditCustomDuration", void 0), s([vt()], Gn.prototype, "_startingCustomDrying", void 0), s([vt()], Gn.prototype, "_isOpen", void 0), s([vt()], Gn.prototype, "_heading", void 0), s([vt()], Gn.prototype, "_buttonTextPreset", void 0), s([vt()], Gn.prototype, "_buttonTextMinutes", void 0), s([vt()], Gn.prototype, "_buttonStopDrying", void 0), s([vt()], Gn.prototype, "_hintNothingAvailable", void 0), s([vt()], Gn.prototype, "_customHeading", void 0), s([vt()], Gn.prototype, "_customLabelTemp", void 0), s([vt()], Gn.prototype, "_customLabelDuration", void 0), s([vt()], Gn.prototype, "_customButtonStart", void 0), Gn = s([Ks("anycubic-printercard-multicolorbox_modal_drying")], Gn);
  const Vn = t => Wn(255, Math.round(Number(t))),
    Yn = t => Vn(255 * t),
    qn = t => Wn(1, t / 255),
    Wn = (t, e) => Math.max(0, Math.min(t, e)),
    Xn = t => void 0 === t ? 1 : ("string" == typeof t && t.indexOf("%") > 0 && (t = Number(t.split("%")[0]) / 100), t = Number(Number(t).toFixed(3)), isNaN(t) ? 1 : Wn(1, t)),
    Zn = {
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
  class Kn {
    constructor(t, e, i, r) {
      return Kn.isBaseConstructor(t) ? (this.r = Vn(t.r), this.g = Vn(t.g), this.b = Vn(t.b), void 0 !== t.a && (this.a = Xn(t.a)), this) : Kn.parse(t, e, i, r);
    }
    static parse(t, e, i, r) {
      if (Kn.isBaseConstructor(t)) return new Kn(t);
      if (void 0 !== e && void 0 !== i) {
        let s = Vn(t);
        return e = Vn(e), i = Vn(i), void 0 !== r && (r = Xn(r)), new Kn({
          r: s,
          g: e,
          b: i,
          a: r
        });
      }
      if (Array.isArray(t)) return Kn.fromArray(t);
      if ("string" == typeof t) {
        let i;
        if (void 0 !== e && Number(e) <= 1 && Number(e) >= 0 && (i = Number(e)), t.startsWith("#")) return Kn.fromHex(t, i);
        if (Zn[t.toLowerCase()]) return Kn.fromNamed(t, i);
        if (t.startsWith("rgb")) return Kn.fromRgbString(t);
        if ("transparent" === t) {
          let t, e, i, r;
          return t = e = i = r = 0, new Kn({
            r: t,
            g: e,
            b: i,
            a: r
          });
        }
        return null;
      }
      if ("object" == typeof t) {
        if (void 0 !== t.a && (this.a = Xn(t.a)), void 0 !== t.h) {
          let e = {};
          if (void 0 !== t.v) e = Kn.fromHsv(t);else {
            if (void 0 === t.l) return Kn.fromArray([0, 0, 0]);
            e = Kn.fromHsl(t);
          }
          return e.a = void 0 !== t.a ? Xn(t.a) : void 0, new Kn(e);
        }
        return void 0 !== t.c ? Kn.fromCMYK(t) : this;
      }
      return Kn.fromArray([0, 0, 0]);
    }
    static isBaseConstructor(t) {
      return "object" == typeof t && void 0 !== t.r && void 0 !== t.g && void 0 !== t.b;
    }
    static fromNamed(t, e) {
      return Kn.fromHex(Zn[t.toLowerCase()], e);
    }
    static fromArray(t) {
      t = t.filter(t => "" !== t && isFinite(t));
      const e = {
        r: Vn(t[0]),
        g: Vn(t[1]),
        b: Vn(t[2])
      };
      return void 0 !== t[3] && (e.a = Xn(t[3])), new Kn(e);
    }
    static fromHex(t, e) {
      3 !== (t = t.replace("#", "")).length && 4 !== t.length || (t = t.split("").map(t => t + t).join(""));
      let i = t.match(/[A-Za-z0-9]{2}/g).map(t => parseInt(t, 16));
      return 4 === i.length ? i[3] /= 255 : void 0 !== e && (i[3] = e), Kn.fromArray(i);
    }
    static fromRgbString(t) {
      if (t.includes(",")) return Kn.fromArray(t.split("(")[1].split(")")[0].split(","));
      const e = t.replace("/", " ").split("(")[1].replace(")", "").split(" ").filter(t => "" !== t && isFinite(Number(t)));
      return Kn.fromArray(e);
    }
    static fromHsv({
      h: t,
      s: e,
      v: i
    }) {
      e /= 100, i /= 100;
      const r = Math.floor(t / 60 % 6),
        s = t / 60 - r,
        n = i * (1 - e),
        o = i * (1 - s * e),
        a = i * (1 - (1 - s) * e),
        l = [[i, a, n], [o, i, n], [n, i, a], [n, o, i], [a, n, i], [i, n, o]][r].map(t => Math.round(256 * t));
      return new Kn({
        r: Vn(l[0]),
        g: Vn(l[1]),
        b: Vn(l[2])
      });
    }
    static fromHsl({
      h: t,
      s: e,
      l: i
    }) {
      e /= 100, i /= 100;
      const r = (1 - Math.abs(2 * i - 1)) * e,
        s = r * (1 - Math.abs(t / 60 % 2 - 1)),
        n = i - r / 2;
      let o = 0,
        a = 0,
        l = 0;
      return 0 <= t && t < 60 ? (o = r, a = s, l = 0) : 60 <= t && t < 120 ? (o = s, a = r, l = 0) : 120 <= t && t < 180 ? (o = 0, a = r, l = s) : 180 <= t && t < 240 ? (o = 0, a = s, l = r) : 240 <= t && t < 300 ? (o = s, a = 0, l = r) : 300 <= t && t < 360 && (o = r, a = 0, l = s), new Kn({
        r: Yn(n + o),
        g: Yn(n + a),
        b: Yn(n + l)
      });
    }
    static fromCMYK({
      c: t,
      m: e,
      y: i,
      k: r,
      a: s
    }) {
      const n = t => Yn(1 - Math.min(1, t / 100 * (1 - r) + r));
      return new Kn({
        r: n(t),
        b: n(e),
        g: n(i),
        a: s
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
      return t[3] = Yn(t[3]), `#${t.map(t => t.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
    }
    get hsv() {
      const t = qn(this.r),
        e = qn(this.g),
        i = qn(this.b),
        r = Math.min(t, e, i),
        s = Math.max(t, e, i);
      let n;
      const o = s,
        a = s - r;
      n = 0 === a ? 0 : s === t ? (e - i) / a * 60 % 360 : s === e ? (i - t) / a * 60 + 120 : s === i ? (t - e) / a * 60 + 240 : 0, n < 0 && (n += 360);
      const l = 0 === s ? 0 : 1 - r / s;
      return {
        h: Math.round(n),
        s: Math.round(100 * l),
        v: Math.round(100 * o),
        a: this.alpha
      };
    }
    get hsl() {
      const t = qn(this.r),
        e = qn(this.g),
        i = qn(this.b),
        r = Math.max(t, e, i),
        s = Math.min(t, e, i);
      let n, o;
      const a = (r + s) / 2;
      if (r === s) n = o = 0;else {
        const l = r - s;
        switch (o = a > .5 ? l / (2 - r - s) : l / (r + s), r) {
          case t:
            n = (e - i) / l + (e < i ? 6 : 0);
            break;
          case e:
            n = (i - t) / l + 2;
            break;
          case i:
            n = (t - e) / l + 4;
        }
        n /= 6;
      }
      return {
        h: Math.round(360 * n),
        s: Math.round(100 * o),
        l: Math.round(100 * a),
        a: this.alpha
      };
    }
    get cmyk() {
      let t, e, i, r;
      const s = parseFloat(this.r) / 255,
        n = parseFloat(this.g) / 255,
        o = parseFloat(this.b) / 255;
      return r = 1 - Math.max(s, n, o), 1 === r ? t = e = i = 0 : (t = (1 - s - r) / (1 - r), e = (1 - n - r) / (1 - r), i = (1 - o - r) / (1 - r)), t = Math.round(100 * t), e = Math.round(100 * e), i = Math.round(100 * i), r = Math.round(100 * r), this.alpha ? {
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
      i[3] = Yn(i[3]);
      const r = new Kn(t).rgba;
      r[3] = Yn(r[3]), e = Xn(e);
      const s = i.map((t, i) => {
        const s = r[i],
          n = s < t,
          o = n ? t - s : s - t,
          a = Math.round(o * e);
        return n ? t - a : a + t;
      });
      return s[3] = qn(s[3]), Kn.fromArray(s);
    }
    adjustSatLum(t, e, i) {
      const r = this.hsl;
      let s = r[t],
        n = (i ? s : 100 - s) * e;
      return r[t] = Wn(100, i ? s - n : s + n), r.a = this.a, new Kn(r);
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
      return e.h = Math.round(e.h + t) % 360, e.a = this.a, new Kn(e);
    }
    fadeIn(t, e) {
      let i = this.alpha;
      const {
        r,
        g: s,
        b: n
      } = this;
      let o = (1 - i) * t;
      return i = e ? i - o : i + o, Kn({
        r,
        g: s,
        b: n,
        a: i
      });
    }
    fadeOut(t) {
      return this.fadeIn(t, !0);
    }
    negate() {
      let t = this.rgb.map(t => 255 - t);
      return void 0 !== this.a && t.push(this.alpha), Kn.fromArray(t);
    }
  }
  const Qn = (t, e, i = "color-update") => {
      const r = i.includes("color") ? {
          color: e
        } : e,
        s = new CustomEvent(i, {
          bubbles: !0,
          composed: !0,
          detail: r
        });
      t.dispatchEvent(s);
    },
    Jn = (t = 3, e) => {
      let i = 0,
        r = 100,
        s = 50,
        n = null,
        o = !1;
      e && (r = e.s, e.hasOwnProperty("v") ? (n = e.v, s = null, o = !0) : s = e.l);
      const a = [];
      let l, c;
      const h = (t, e) => `${t.css} ${(100 * e).toFixed(1)}%`;
      for (; i < 360;) l = Kn.parse(o ? {
        h: i,
        s: r,
        v: n
      } : {
        h: i,
        s: r,
        l: s
      }), c = i / 360, a.push(h(l, c)), i += t;
      return i = 359, l = Kn.parse(o ? {
        h: i,
        s: r,
        v: n
      } : {
        h: i,
        s: r,
        l: s
      }), c = 1, a.push(h(l, c)), a.join(", ");
    },
    to = X`<svg
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
  class eo extends pt {
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
    static styles = u`
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
        backgroundImage: `linear-gradient(90deg, ${Jn(24)})`
      }, this.width = 400, this.sliderStyle = {
        display: "none"
      };
    }
    firstUpdated() {
      const t = this.renderRoot.querySelector("lit-movable");
      t.onmovestart = () => {
        Qn(this.renderRoot, {
          sliding: !0
        }, "sliding-hue");
      }, t.onmoveend = () => {
        Qn(this.renderRoot, {
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
          backgroundColor: Kn.parse({
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
        s = this.renderRoot.querySelector("a"),
        n = new CustomEvent("hue-update", {
          bubbles: !0,
          composed: !0,
          detail: {
            h: r
          }
        });
      s.dispatchEvent(n), this.sliderStyle = this.sliderCss(r);
    }
    render() {
      return X` <div
      style=${Ri(this.gradient)}
      class="bar"
      @click="${this.selectHue}"
    >
      <lit-movable
        horizontal="${this.sliderBounds.min}, ${this.sliderBounds.max}"
        posLeft="${this.sliderBounds.posLeft}"
      >
        <a class="slider" style=${Ri(this.sliderCss(this.h))}></a>
      </lit-movable>
    </div>`;
    }
  }
  customElements.get("hue-bar") || customElements.define("hue-bar", eo);
  const io = u`
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
    ro = u`
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
    so = u`
  color: var(--input-active-color);
  background-color: var(--input-active-bg);
  border-color: var(--input-active-border-color);
  outline: 0;
  box-shadow: var(--input-active-box-shadow);
`,
    no = u`
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
    ${ro}
  }
  :host .form-control:focus {
    ${so}
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
    ${io}
    z-index: 0;
  }
`,
    oo = u`
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
    ${ro}
  }

  :host .form-control:focus {
    ${so}
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
    ${io}
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  :host div.active .transparent-checks {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`,
    ao = {
      r: "R (red) channel",
      g: "G (green) channel",
      b: "B (blue) channel",
      h: "H (hue) channel",
      s: "S (saturation) channel",
      v: "V (value / brightness) channel",
      l: "L (luminosity) channel",
      a: "A (alpha / opacity) channel"
    };
  class lo extends pt {
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
    static styles = oo;
    clickPreview(t) {
      const e = Math.max(0, Math.min(t.offsetX, 128));
      let i = Math.round(e / 128 * this.max);
      "a" === this.channel && (i = Number((e / 127).toFixed(2))), this.valueChange(null, i), this.setActive(!1);
    }
    valueChange = (t, e = null) => {
      e = e ?? Number(this.renderRoot.querySelector("input").value), "a" === this.channel && (e /= 100), this.c[this.channel] = e;
      const i = Kn.parse(this.c);
      "rgb" !== this.group && (i.hsx = this.c), this.c = "rgb" === this.group ? this.color.rgbObj : this.isHsl ? this.color.hsl : this.color.hsv, Qn(this.renderRoot, i);
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
      let s,
        n,
        o = 255;
      if ("rgb" !== e || "a" === i) {
        if ("h" === i) return o = this.max = 359, void (this.previewGradient = {
          "--preview": `linear-gradient(90deg, ${Jn(24, t)})`,
          "--pct": t.h / o * 100 + "%"
        });
        o = r ? 1 : 100;
      }
      if (this.max = o, s = {
        ...t
      }, n = s, s[this.channel] = 0, s = Kn.parse(s), n[this.channel] = o, n = Kn.parse(n), "l" === this.channel) {
        const e = {
          ...t
        };
        e.l = 50, this.previewGradient = {
          "--preview": `linear-gradient(90deg, ${s.hex}, ${Kn.parse(e).hex}, ${n.hex})`,
          "--pct": t[this.channel] / o * 100 + "%"
        };
      } else this.previewGradient = {
        "--preview": `linear-gradient(90deg, ${r ? s.css : s.hex}, ${r ? n.css : n.hex})`,
        "--pct": t[this.channel] / o * 100 + "%"
      };
    }
    willUpdate(t) {
      this.setPreviewGradient();
    }
    render() {
      const t = "a" === this.channel ? X`<div class="transparent-checks"></div>` : null,
        e = "a" === this.channel ? 100 : this.max;
      return X` <div class="${Li({
        active: this.active
      })}">
      <label for="channel_${this.ch}">${this.channel.toUpperCase()}</label>
      <input
        id="channel_${this.ch}"
        aria-label="${ao[this.channel]}"
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
        style="${Ri(this.previewGradient)}"
        @mousedown="${this.clickPreview}"
      >
        <div class="pct"></div>
        ${t}
      </div>
    </div>`;
    }
  }
  customElements.get("color-input-channel") || customElements.define("color-input-channel", lo);
  class co extends pt {
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
    static styles = u`
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
      Qn(this.renderRoot, t);
    }
    setCircleCss(t, e) {
      const i = `${t}`,
        r = `${e}`,
        s = {
          x: `0, ${this.size}`,
          y: `0,${this.size}`
        };
      this.circlePos = {
        top: r,
        left: i,
        bounds: s
      };
    }
    pickCoord({
      offsetX: t,
      offsetY: e
    }) {
      const i = t,
        r = e,
        {
          size: s,
          hsw: n,
          isHsl: o,
          color: a
        } = this;
      let l = (s - r) / s;
      l = Math.round(100 * l);
      const c = Math.round(i / s * 100),
        h = {
          h: n.h,
          s: c,
          [o ? "l" : "v"]: l
        },
        d = o ? Kn.fromHsl(h) : Kn.fromHsv(h);
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
        isHsl: s,
        size: n
      } = this;
      if (!i) return;
      const o = r;
      (t = t ?? s ? o.hsl : o.hsv).w = s ? t.l : t.v;
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
        d = n / 100,
        u = s ? (t, e, i) => `hsl(${t}, ${e}%, ${100 - i}%)` : (t, e, i) => Kn.fromHsv({
          h: t,
          s: e,
          v: 100 - i
        }).hex,
        p = !1 === e ? 4 : 1;
      for (let t = 0; t < 100; t += p) for (let e = 0; e < 100; e += p) i.fillStyle = u(a, t, e), i.fillRect(t, e, t + p, e + p);
      this.setCircleCss(h.s * d, n - t.w * d);
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
      style="${Ri(t)}"
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
  customElements.get("hsl-canvas") || customElements.define("hsl-canvas", co);
  const ho = t => isFinite(t) ? Number(t) : Number(t.replace(/[^0-9.\-]/g, "")),
    uo = t => (t = Number(t), (isNaN(t) || [void 0, null].includes(t)) && (t = 0), t);
  class po {
    constructor(t, e) {
      this.x = uo(t), this.y = uo(e);
    }
    static fromPointerEvent(t) {
      const {
        pageX: e,
        pageY: i
      } = t;
      return new po(e, i);
    }
    static fromElementStyle(t) {
      const e = ho(t.style.left ?? 0),
        i = ho(t.style.top ?? 0);
      return new po(e, i);
    }
    static fromObject({
      x: t,
      y: e
    }) {
      return new po(t, e);
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
  class go {
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
      if (!t) return new go();
      if ("null" === t) return new go(0, 0);
      const [i, r] = t.split(",").map(t => Number(t.trim()) + e),
        s = new go(i, r);
      return s.attr = t, s;
    }
  }
  class mo extends pt {
    _target;
    _targetSelector = null;
    _boundsX = new go();
    _boundsY = new go();
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
      this._boundsX = go.fromString(t, ho(this.target?.style.left ?? 0)), this.bounds.left = this._boundsX;
    }
    get boundsY() {
      return this._boundsY;
    }
    set boundsY(t) {
      this._boundsY = go.fromString(t, ho(this.target?.style.top ?? 0)), this.bounds.top = this._boundsY;
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
          posLeft: s
        } = this,
        {
          offsetLeft: n,
          offsetTop: o,
          style: {
            left: a,
            top: l
          }
        } = this.target;
      i.classList.add("--movable-base"), this.renderRoot.addEventListener("pointerdown", t => this.pointerdown(t)), i.style.position = "absolute", i.style.cursor = "pointer", s ? i.style.left = s + "px" : !a && n && (i.style.left = n + "px", e.left.constrained && (e.left.min = e.left.max = n)), r ? i.style.top = r + "px" : !l && o && (i.style.top = o + "px", e.top.constrained && (e.top.min = e.top.max = o));
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
      e.mouseCoord = po.fromPointerEvent(t), e.startCoord = po.fromElementStyle(i), e.moveDist = new po(0, 0), e.totalDist = new po(0, 0), e.clickOffset = (t => {
        const e = po.fromPointerEvent(t),
          i = t.target.getBoundingClientRect(),
          r = e.x - (i.left + document.body.scrollLeft),
          s = e.y - (i.top + document.body.scrollTop);
        return new po(r, s);
      })(t), e.coords = po.fromObject(e.startCoord), e.maxX = isFinite(r.left.min) && isFinite(r.left.max) ? r.left.min + r.left.max : 1 / 0, e.maxY = isFinite(r.top.min) && isFinite(r.top.max) ? r.top.min + r.top.max : 1 / 0, this.isMoving = !0, this.reposition(!0), this.eventBroker("movestart", t);
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
      const e = po.fromPointerEvent(t),
        i = this.moveState,
        {
          grid: r,
          bounds: s,
          shiftBehavior: n,
          boundsX: o,
          boundsY: a
        } = this;
      if (i.moveDist = po.fromObject({
        x: e.x - i.mouseCoord.x,
        y: e.y - i.mouseCoord.y
      }), i.mouseCoord = e, i.totalDist = po.fromObject({
        x: i.totalDist.x + i.moveDist.x,
        y: i.totalDist.y + i.moveDist.y
      }), i.coords = po.fromObject({
        x: Math.round(i.totalDist.x / r) * r + i.startCoord.x,
        y: Math.round(i.totalDist.y / r) * r + i.startCoord.y
      }), n && t.shiftKey && o.unconstrained && a.unconstrained) {
        const {
          x: t,
          y: e
        } = i.totalDist;
        Math.abs(t) > Math.abs(e) ? i.coords.top = i.startCoord.y : i.coords.left = i.startCoord.x;
      } else i.coords.y = Math.min(Math.max(s.top.min, i.coords.top), s.top.max), i.coords.x = Math.min(Math.max(s.left.min, i.coords.left), s.left.max);
      isFinite(i.maxX) && (i.pctX = Math.max(s.left.min, i.coords.left) / i.maxX), isFinite(i.maxY) && (i.pctY = Math.max(s.top.min, i.coords.top) / i.maxY), this.reposition(i.coords), this.eventBroker("move", t);
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
  window.customElements.get("lit-movable") || window.customElements.define("lit-movable", mo);
  class bo extends pt {
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
    static styles = no;
    _color;
    constructor() {
      super(), this._color = Kn.parse(Zn.slateblue), this.isHsl = !0, this.buttonDisabled = !1;
    }
    firstUpdated(t) {
      this.debounceMode = !1, t.has("value") && (this.color = Kn.parse(this.value));
    }
    updated(t) {
      if (t.has("value") && this.value) {
        const t = Kn.parse(this.value);
        !t || this._color && t.hex === this._color.hex || (this.color = t);
      }
    }
    get color() {
      return this._color;
    }
    set color(t) {
      (t = t.hsx ? t : t.rgba ? Kn.parse(...t.rgba) : Kn.parse(t)) && (this.hex = t.hex, this._color = t, Qn(this.renderRoot, t, "colorchanged"));
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
        i = Kn.parse(e);
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
      Qn(this.renderRoot, this.color, "colorpicked");
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
        s = this.copied ? {
          textAlign: "center",
          display: "block"
        } : {
          display: "none"
        },
        n = this.debounceMode;
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
              <sub class="copied" style="${Ri(s)}"
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
                        ${to}
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
                        ${to}
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
                        ${to}
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
              ${to}
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
              class="${Li(e)}"
              @click="${() => this.setHsl(!1)}"
              >HSV</a
            ><a
              title="Use hue / saturation / luminosity mode"
              class="${Li(i)}"
              @click="${() => this.setHsl(!0)}"
              >HSL</a
            >
          </div>
        </div>
        <div class="w-40">
          <hsl-canvas
            .debounceMode="${n}"
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
                <span style="${Ri(r)}"></span>
                <span class="checky"></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    }
  }
  window.customElements.get("color-picker") || window.customElements.define("color-picker", bo);
  const _o = "anycubic_cloud",
    yo = ["light"],
    vo = ["switch"],
    fo = ["camera"],
    xo = {
      keyframeOptions: {
        duration: 250,
        direction: "alternate",
        easing: "ease-in-out"
      },
      properties: ["height", "opacity", "scale"]
    },
    wo = ["#ffffff", "#000000", "#c0c0c0", "#ff0000", "#ff8000", "#ffff00", "#00a000", "#00c0c0", "#0000ff", "#8000ff", "#ff00ff", "#8b4513"];
  let Eo = class extends pt {
    constructor() {
      super(...arguments), this.box_id = 0, this.spoolList = [], this.spool_index = -1, this._isOpen = !1, this._changingSlot = !1, this._colourPresetChange = t => {
        this.color = t.currentTarget.preset, this._elColorPicker && (this._elColorPicker.color = this.color);
      }, this._handleModalEvent = t => {
        var e;
        const i = t;
        i.stopPropagation(), i.detail.modalOpen && (this._isOpen = !0, this.box_id = Number(i.detail.box_id), this.spool_index = Number(i.detail.spool_index), this.material_type = null !== (e = ki(i.detail.material_type)) && void 0 !== e ? e : Xe.PLA, this.color = i.detail.color);
      }, this._handleDropdownEvent = t => {
        const e = t;
        e.stopPropagation(), e.detail.value && (this.material_type = ki(e.detail.value));
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
      super.willUpdate(t), t.has("language") && (this._heading = Zs("card.spool_settings.heading", this.language), this._labelSelectMaterial = Zs("card.spool_settings.label_select_material", this.language), this._labelSelectColour = Zs("card.spool_settings.label_select_colour", this.language), this._labelPresetColour = Zs("card.spool_settings.label_preset_colour", this.language), this._buttonSave = Zs("common.actions.save", this.language));
    }
    update(t) {
      super.update(t), this._isOpen ? this.style.display = "block" : this.style.display = "none";
    }
    render() {
      return X`
      <div
        class="ac-modal-container"
        style=${Ri({
        height: "auto",
        opacity: 1,
        scale: 1
      })}
        ${ur(Object.assign({}, xo))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this.color ? this._renderCard() : K}
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
        ` : K;
    }
    _renderPresets() {
      var t;
      return X`
      <div>
        <p class="ac-modal-label">${this._labelPresetColour}:</p>
        <div class="ac-mcb-presets">
          ${Oi(null !== (t = this.slotColors) && void 0 !== t ? t : wo, (t, e) => X`
              <div
                class="ac-mcb-preset-color"
                style=${Ri({
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
        this._changingSlot = !0, this.hass.callService(_o, t, {
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
      return u`
      ${xn}

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
  s([xt("color-picker")], Eo.prototype, "_elColorPicker", void 0), s([yt()], Eo.prototype, "hass", void 0), s([yt()], Eo.prototype, "language", void 0), s([yt({
    attribute: "selected-printer-device"
  })], Eo.prototype, "selectedPrinterDevice", void 0), s([yt({
    attribute: "slot-colors"
  })], Eo.prototype, "slotColors", void 0), s([vt()], Eo.prototype, "box_id", void 0), s([vt()], Eo.prototype, "spoolList", void 0), s([vt()], Eo.prototype, "spool_index", void 0), s([vt()], Eo.prototype, "material_type", void 0), s([vt()], Eo.prototype, "color", void 0), s([vt()], Eo.prototype, "_isOpen", void 0), s([vt()], Eo.prototype, "_heading", void 0), s([vt()], Eo.prototype, "_labelSelectMaterial", void 0), s([vt()], Eo.prototype, "_labelSelectColour", void 0), s([vt()], Eo.prototype, "_labelPresetColour", void 0), s([vt()], Eo.prototype, "_buttonSave", void 0), s([vt()], Eo.prototype, "_changingSlot", void 0), Eo = s([Ks("anycubic-printercard-multicolorbox_modal_spool")], Eo);
  const So = {
      keyframeOptions: {
        duration: 250,
        direction: "alternate",
        easing: "ease-in-out"
      },
      properties: ["height", "opacity", "scale"]
    },
    $o = "multi_color_box_runout_refill";
  let Co = class extends pt {
    constructor() {
      super(...arguments), this.box_id = 0, this.spoolList = [], this._spoolsUnavailable = !1, this._changingRunout = !1, this._isOpen = !1, this._handleRunoutRefillChanged = t => {
        if (this._changingRunout) return;
        const e = ai(this.printerEntities, this.printerEntityIdPart, "switch", $o);
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
        this._isOpen = !1, Oe(this, "ac-mcb-modal", {
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
      if (super.willUpdate(t), t.has("language") && (this._heading = Zs("card.ace_settings.heading", this.language), this._labelRunoutRefill = Zs("card.buttons.runout_refill", this.language), this._labelSpools = Zs("card.ace_settings.label_spools", this.language), this._hintSpoolsUnavailable = Zs("card.ace_settings.hint_spools_unavailable", this.language)), t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        const t = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "ace_spools", "not loaded", {
          spool_info: []
        });
        this.spoolList = t.attributes.spool_info, this._spoolsUnavailable = 0 === this.spoolList.length, this._runoutRefillState = di(this.hass, this.printerEntities, this.printerEntityIdPart, $o);
      }
    }
    update(t) {
      super.update(t), this._isOpen ? this.style.display = "block" : this.style.display = "none";
    }
    render() {
      return X`
      <div
        class="ac-modal-container"
        style=${Ri({
        height: "auto",
        opacity: 1,
        scale: 1
      })}
        ${ur(Object.assign({}, So))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this._isOpen ? this._renderCard() : K}
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
      ${this._spoolsUnavailable ? X`<p class="ac-settings-hint">${this._hintSpoolsUnavailable}</p>` : K}
      <div class="ac-settings-spool-list">
        ${Oi(this._displaySpoolList(), (t, e) => {
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
                  style=${Ri(i)}
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
      return u`
      ${xn}

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
  s([yt()], Co.prototype, "hass", void 0), s([yt()], Co.prototype, "language", void 0), s([yt({
    attribute: "printer-entities"
  })], Co.prototype, "printerEntities", void 0), s([yt({
    attribute: "printer-entity-id-part"
  })], Co.prototype, "printerEntityIdPart", void 0), s([yt()], Co.prototype, "box_id", void 0), s([vt()], Co.prototype, "spoolList", void 0), s([vt()], Co.prototype, "_spoolsUnavailable", void 0), s([vt()], Co.prototype, "_runoutRefillState", void 0), s([vt()], Co.prototype, "_changingRunout", void 0), s([vt()], Co.prototype, "_isOpen", void 0), s([vt()], Co.prototype, "_heading", void 0), s([vt()], Co.prototype, "_labelRunoutRefill", void 0), s([vt()], Co.prototype, "_labelSpools", void 0), s([vt()], Co.prototype, "_hintSpoolsUnavailable", void 0), Co = s([Ks("anycubic-printercard-multicolorbox_modal_settings")], Co);
  const Ao = {
    keyframeOptions: {
      duration: 250,
      direction: "alternate",
      easing: "ease-in-out"
    },
    properties: ["height", "opacity", "scale"]
  };
  let To = class extends pt {
    constructor() {
      super(...arguments), this.availableSpeedModes = {}, this.isFDM = !1, this.currentSpeedModeKey = 0, this.currentSpeedModeDescr = void 0, this._userEditSpeedMode = !1, this.currentFanSpeed = 0, this._userEditFanSpeed = !1, this.currentAuxFanSpeed = 0, this._userEditAuxFanSpeed = !1, this.currentBoxFanSpeed = 0, this._userEditBoxFanSpeed = !1, this.currentTargetTempNozzle = 0, this.minTargetTempNozzle = 0, this.maxTargetTempNozzle = 0, this._userEditTargetTempNozzle = !1, this.currentTargetTempHotbed = 0, this.minTargetTempHotbed = 0, this.maxTargetTempHotbed = 0, this._userEditTargetTempHotbed = !1, this._isOpen = !1, this._pressingRetract = !1, this._pressingExtrude = !1, this._pressingFinishJob = !1, this._changingSettings = !1, this._setConfirmationMode = t => {
        this._confirmationType = t.currentTarget.confirmation_type, this._confirmMessage = Zs("card.print_settings.confirm_message", this.language, "action", Zs("common.actions." + this._confirmationType, this.language));
      }, this._pressFinishJob = () => {
        this._pressingFinishJob = !0, this.hass.callService("button", "press", {
          entity_id: oi(this.printerEntityIdPart, "button", "clear_completed_print_job")
        }).then(() => {
          this._pressingFinishJob = !1;
        }).catch(t => {
          this._pressingFinishJob = !1;
        });
      }, this._pressRetractFilament = () => {
        this._pressingRetract = !0, this.hass.callService("button", "press", {
          entity_id: oi(this.printerEntityIdPart, "button", "retract_filament")
        }).then(() => {
          this._pressingRetract = !1;
        }).catch(t => {
          this._pressingRetract = !1;
        });
      }, this._pressExtrudeFilament = () => {
        this._pressingExtrude = !0, this.hass.callService("button", "press", {
          entity_id: oi(this.printerEntityIdPart, "button", "extrude_filament")
        }).then(() => {
          this._pressingExtrude = !1;
        }).catch(t => {
          this._pressingExtrude = !1;
        });
      }, this._handleConfirmApprove = () => {
        switch (this._confirmationType) {
          case Ze.PAUSE:
            this._pressHassButton("pause_print");
            break;
          case Ze.RESUME:
            this._pressHassButton("resume_print");
            break;
          case Ze.CANCEL:
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
      if (super.willUpdate(t), t.has("language") && (this._labelNozzleTemperature = Zs("card.print_settings.label_nozzle_temp", this.language), this._labelHotbedTemperature = Zs("card.print_settings.label_hotbed_temp", this.language), this._labelFanSpeed = Zs("card.print_settings.label_fan_speed", this.language), this._labelAuxFanSpeed = Zs("card.print_settings.label_aux_fan_speed", this.language), this._labelBoxFanSpeed = Zs("card.print_settings.label_box_fan_speed", this.language), this._buttonYes = Zs("common.actions.yes", this.language), this._buttonNo = Zs("common.actions.no", this.language), this._buttonPrintPause = Zs("card.print_settings.print_pause", this.language), this._buttonPrintResume = Zs("card.print_settings.print_resume", this.language), this._buttonPrintCancel = Zs("card.print_settings.print_cancel", this.language), this._buttonFinishJob = Zs("card.print_settings.print_finish_job", this.language), this._buttonRetractFilament = Zs("card.print_settings.retract_filament", this.language), this._buttonExtrudeFilament = Zs("card.print_settings.extrude_filament", this.language), this._buttonSaveSpeedMode = Zs("card.print_settings.save_speed_mode", this.language), this._buttonSaveTargetNozzle = Zs("card.print_settings.save_target_nozzle", this.language), this._buttonSaveTargetHotbed = Zs("card.print_settings.save_target_hotbed", this.language), this._buttonSaveFanSpeed = Zs("card.print_settings.save_fan_speed", this.language), this._buttonSaveAuxFanSpeed = Zs("card.print_settings.save_aux_fan_speed", this.language), this._buttonSaveBoxFanSpeed = Zs("card.print_settings.save_box_fan_speed", this.language)), t.has("hass") || t.has("printerEntities") || t.has("printerEntityIdPart")) {
        if (this.isFDM = (e = this.hass, i = this.printerEntities, this.printerEntityIdPart, "Filament" === bi(e, i, 0, "current_status").attributes.material_type), this._userEditFanSpeed || (this.currentFanSpeed = Number(bi(this.hass, this.printerEntities, this.printerEntityIdPart, "fan_speed", 0).state)), !this._userEditTargetTempNozzle) {
          const t = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_nozzle_temperature", 0, {
            limit_min: 0,
            limit_max: 0
          });
          this.currentTargetTempNozzle = Number(t.state), this.minTargetTempNozzle = t.attributes.limit_min, this.maxTargetTempNozzle = t.attributes.limit_max;
        }
        if (!this._userEditTargetTempHotbed) {
          const t = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "target_hotbed_temperature", 0, {
            limit_min: 0,
            limit_max: 0
          });
          this.currentTargetTempHotbed = Number(t.state), this.minTargetTempHotbed = t.attributes.limit_min, this.maxTargetTempHotbed = t.attributes.limit_max;
        }
        if (!this._userEditSpeedMode) {
          const t = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_speed_mode", "", {
            available_modes: [],
            job_speed_mode_code: -1
          });
          this.availableSpeedModes = Pi(t), this.currentSpeedModeKey = t.attributes.print_speed_mode_code, this.currentSpeedModeDescr = this.currentSpeedModeKey >= 0 && this.currentSpeedModeKey in this.availableSpeedModes ? this.availableSpeedModes[this.currentSpeedModeKey] : void 0;
        }
      }
      var e, i;
    }
    update(t) {
      super.update(t), this._isOpen ? this.style.display = "block" : this.style.display = "none";
    }
    render() {
      return X`
      <div
        class="ac-modal-container"
        style=${Ri({
        height: "auto",
        opacity: 1,
        scale: 1
      })}
        ${ur(Object.assign({}, Ao))}
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
              .confirmation_type=${Ze.PAUSE}
              @click=${this._setConfirmationMode}
            >
              ${this._buttonPrintPause}
            </ha-control-button>
          </div>
          <div class="ac-settings-row ac-settings-buttonrow">
            <ha-control-button
              .confirmation_type=${Ze.RESUME}
              @click=${this._setConfirmationMode}
            >
              ${this._buttonPrintResume}
            </ha-control-button>
          </div>
          <div class="ac-settings-row ac-settings-buttonrow">
            <ha-control-button
              .confirmation_type=${Ze.CANCEL}
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
              ` : K}
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
              ` : K}
        </div>
      </div>
    `;
    }
    _pressHassButton(t) {
      this._changingSettings = !0, this.hass.callService("button", "press", {
        entity_id: oi(this.printerEntityIdPart, "button", t)
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
        this._changingSettings = !0, this.hass.callService(_o, t, {
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
        this._changingSettings = !0, this.hass.callService(_o, t, {
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
        this._changingSettings = !0, this.hass.callService(_o, t, {
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
        this._changingSettings = !0, this.hass.callService(_o, t, {
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
        this._changingSettings = !0, this.hass.callService(_o, t, {
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
        this._changingSettings = !0, this.hass.callService(_o, t, {
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
      return u`
      ${xn}

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
  s([yt()], To.prototype, "hass", void 0), s([yt()], To.prototype, "language", void 0), s([yt({
    attribute: "selected-printer-device"
  })], To.prototype, "selectedPrinterDevice", void 0), s([yt({
    attribute: "printer-entities"
  })], To.prototype, "printerEntities", void 0), s([yt({
    attribute: "printer-entity-id-part"
  })], To.prototype, "printerEntityIdPart", void 0), s([vt()], To.prototype, "availableSpeedModes", void 0), s([vt()], To.prototype, "isFDM", void 0), s([vt()], To.prototype, "currentSpeedModeKey", void 0), s([vt()], To.prototype, "currentSpeedModeDescr", void 0), s([vt()], To.prototype, "_userEditSpeedMode", void 0), s([vt()], To.prototype, "currentFanSpeed", void 0), s([vt()], To.prototype, "_userEditFanSpeed", void 0), s([vt()], To.prototype, "currentAuxFanSpeed", void 0), s([vt()], To.prototype, "_userEditAuxFanSpeed", void 0), s([vt()], To.prototype, "currentBoxFanSpeed", void 0), s([vt()], To.prototype, "_userEditBoxFanSpeed", void 0), s([vt()], To.prototype, "currentTargetTempNozzle", void 0), s([vt()], To.prototype, "minTargetTempNozzle", void 0), s([vt()], To.prototype, "maxTargetTempNozzle", void 0), s([vt()], To.prototype, "_userEditTargetTempNozzle", void 0), s([vt()], To.prototype, "currentTargetTempHotbed", void 0), s([vt()], To.prototype, "minTargetTempHotbed", void 0), s([vt()], To.prototype, "maxTargetTempHotbed", void 0), s([vt()], To.prototype, "_userEditTargetTempHotbed", void 0), s([vt()], To.prototype, "_confirmationType", void 0), s([vt()], To.prototype, "_isOpen", void 0), s([vt()], To.prototype, "_confirmMessage", void 0), s([vt()], To.prototype, "_labelNozzleTemperature", void 0), s([vt()], To.prototype, "_labelHotbedTemperature", void 0), s([vt()], To.prototype, "_labelFanSpeed", void 0), s([vt()], To.prototype, "_labelAuxFanSpeed", void 0), s([vt()], To.prototype, "_labelBoxFanSpeed", void 0), s([vt()], To.prototype, "_buttonYes", void 0), s([vt()], To.prototype, "_buttonNo", void 0), s([vt()], To.prototype, "_buttonPrintPause", void 0), s([vt()], To.prototype, "_buttonPrintResume", void 0), s([vt()], To.prototype, "_buttonPrintCancel", void 0), s([vt()], To.prototype, "_buttonFinishJob", void 0), s([vt()], To.prototype, "_buttonRetractFilament", void 0), s([vt()], To.prototype, "_buttonExtrudeFilament", void 0), s([vt()], To.prototype, "_pressingRetract", void 0), s([vt()], To.prototype, "_pressingExtrude", void 0), s([vt()], To.prototype, "_pressingFinishJob", void 0), s([vt()], To.prototype, "_buttonSaveSpeedMode", void 0), s([vt()], To.prototype, "_buttonSaveTargetNozzle", void 0), s([vt()], To.prototype, "_buttonSaveTargetHotbed", void 0), s([vt()], To.prototype, "_buttonSaveFanSpeed", void 0), s([vt()], To.prototype, "_buttonSaveAuxFanSpeed", void 0), s([vt()], To.prototype, "_buttonSaveBoxFanSpeed", void 0), s([vt()], To.prototype, "_changingSettings", void 0), To = s([Ks("anycubic-printercard-printsettings_modal")], To);
  const Po = {
      keyframeOptions: {
        duration: 250,
        direction: "normal",
        easing: "ease-in-out"
      },
      properties: ["height", "opacity", "scale"]
    },
    ko = Ci(),
    Mo = [We.DryingStatus, We.AceTempCurrent, We.AceTempTarget, We.DryingTime];
  let Do = class extends pt {
    constructor() {
      super(...arguments), this.monitoredStats = ko, this.round = !0, this.temperatureUnit = je.C, this._showVideo = !1, this.cameraEntityState = void 0, this.isHidden = !1, this.isPrinting = !1, this.hiddenOverride = !1, this.lightIsOn = !1, this.statusColor = "#ffc107", this.progressPercent = 0, this._togglingLight = !1, this._togglingPower = !1, this.deviceType = Ne.PRINTER, this.linkedDevices = [], this._fwUpdateAvailable = !1, this._togglingBridgeMqtt = !1, this._refreshingBridge = !1, this._toggleVideo = () => {
        this._showVideo = !(!this.cameraEntityState || this._showVideo);
      }, this._openPrintSettingsModal = () => {
        Oe(this._printerCardContainer, "ac-printset-modal", {
          modalOpen: !0
        });
      }, this._openAceSettingsModal = () => {
        Oe(this._printerCardContainer, "ac-mcbsettings-modal", {
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
        const t = ai(this.printerEntities, this.printerEntityIdPart, "switch", "manual_mqtt_connection_enabled");
        t && (this._togglingBridgeMqtt = !0, this.hass.callService("switch", "toggle", {
          entity_id: t.entity_id
        }).then(() => {
          this._togglingBridgeMqtt = !1;
        }).catch(t => {
          this._togglingBridgeMqtt = !1;
        }));
      }, this._pressBridgeRefresh = () => {
        const t = ai(this.printerEntities, this.printerEntityIdPart, "button", "manual_mqtt_connection_refresh");
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
        history.pushState(null, "", `${i}/${e}/main`), Oe(window, "location-changed", {
          replace: !1
        });
      };
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("language") && (this._buttonPrintSettings = Zs("card.buttons.print_settings", this.language), this._labelBridgeMqtt = Zs("card.bridge.mqtt_connection", this.language), this._labelBridgeRefresh = Zs("card.bridge.refresh_connection", this.language), this._labelGoToPrinter = Zs("card.linked_devices.go_to_printer", this.language), this._labelGoToAce = Zs("card.linked_devices.go_to_ace", this.language), this._labelUpdateAvailable = Zs("card.badges.update_available", this.language), this._buttonAceSettings = Zs("card.buttons.ace_settings", this.language)), t.has("monitoredStats") && (this.monitoredStats = Ti(this.monitoredStats, ko)), (t.has("selectedPrinterDevice") || t.has("selectedPrinterID")) && (this.deviceType = ri(this.selectedPrinterDevice)), (t.has("selectedPrinterID") || t.has("selectedPrinterDevice")) && (this.printerEntities = ni(this.hass, this.selectedPrinterID), this.deviceType === Ne.ACE ? this.printerEntityIdPart = function (t) {
        var e, i, r;
        return null !== (r = null !== (i = null !== (e = hi(t)) && void 0 !== e ? e : li(t, "sensor", "ace_current_temperature")) && void 0 !== i ? i : li(t, "update", "ace_firmware")) && void 0 !== r ? r : li(t, "switch", "ace_run_out_refill");
      }(this.printerEntities) : this.deviceType === Ne.BRIDGE ? this.printerEntityIdPart = function (t) {
        var e, i;
        return null !== (i = null !== (e = hi(t)) && void 0 !== e ? e : li(t, "switch", "manual_mqtt_connection_enabled")) && void 0 !== i ? i : li(t, "button", "refresh_mqtt_connection");
      }(this.printerEntities) : this.printerEntityIdPart = ci(this.printerEntities)), (t.has("printers") || t.has("selectedPrinterDevice")) && (this.linkedDevices = function (t, e) {
        if (!t || !e) return [];
        if (ri(e) === Ne.ACE) {
          const i = e.via_device_id ? t[e.via_device_id] : void 0;
          return i ? [i] : [];
        }
        return Object.values(t).filter(t => t.via_device_id === e.id);
      }(this.printers, this.selectedPrinterDevice)), (t.has("hass") || t.has("alwaysShow") || t.has("hiddenOverride") || t.has("selectedPrinterID") || t.has("selectedPrinterDevice")) && (this.deviceType === Ne.BRIDGE ? this._willUpdateBridge() : this.deviceType === Ne.ACE ? this._willUpdateAce() : this._willUpdatePrinter());
    }
    _willUpdatePrinter() {
      var t, e, i;
      this.progressPercent = this._percentComplete(), this.cameraEntityId && (this.cameraEntityState = ei(this.hass, {
        entity_id: this.cameraEntityId
      }));
      const r = this.printerEntityIdPart ? oi(this.printerEntityIdPart, "light", "printer_light") : void 0,
        s = !!r && !!ei(this.hass, {
          entity_id: r
        });
      this._effectiveLightEntityId = null !== (t = this.lightEntityId) && void 0 !== t ? t : s ? r : void 0, this.lightIsOn = ii(this.hass, {
        entity_id: null !== (e = this._effectiveLightEntityId) && void 0 !== e ? e : ""
      }, !0, !1);
      const n = bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_state", "unknown").state.toLowerCase();
      this.isPrinting = fi(n);
      const o = null === (i = this.alwaysShow) || void 0 === i || i;
      this.isHidden = !o && !this.hiddenOverride && !this.isPrinting, this.statusColor = function (t) {
        return "preheating" === t ? "#ffc107" : fi(t) ? "#4caf50" : "unknown" === t ? "#f44336" : "operational" === t || "finished" === t ? "#00bcd4" : "#f44336";
      }(n), this._fwUpdateAvailable = "Update Available" === vi(this.hass, this.printerEntities, this.printerEntityIdPart, "printer_firmware");
    }
    _willUpdateAce() {
      this.isHidden = !1, this._fwUpdateAvailable = "Update Available" === vi(this.hass, this.printerEntities, this.printerEntityIdPart, "ace_firmware");
      const t = _i(this.hass, this.printerEntities, this.printerEntityIdPart, "drying_active", !0, !1, !1);
      this.statusColor = t ? "#4caf50" : "#8a8a8a";
    }
    _willUpdateBridge() {
      this.isHidden = !1, this._bridgeMqttState = di(this.hass, this.printerEntities, this.printerEntityIdPart, "manual_mqtt_connection_enabled"), this._bridgeRefreshState = ui(this.hass, this.printerEntities, this.printerEntityIdPart, "manual_mqtt_connection_refresh"), this.statusColor = this._bridgeMqttState && "on" === this._bridgeMqttState.state ? "#4caf50" : "#8a8a8a";
    }
    render() {
      switch (this.deviceType) {
        case Ne.BRIDGE:
          return this._renderBridgeCard();
        case Ne.ACE:
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
          class=${Li(t)}
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
              style=${Ri(e)}
            ></div>
            <p class="ac-printer-card-header-status-text">
              ${null === (t = this.selectedPrinterDevice) || void 0 === t ? void 0 : t.name}
            </p>
            ${this._renderFwBadge()}
          </div>
          <div
            class="ac-printer-card-infocontainer"
            ${ur(Object.assign({}, Po))}
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
                .monitoredStats=${Mo}
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
                <ha-svg-icon .path=${Di}></ha-svg-icon>
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
              style=${Ri(i)}
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
      return this._fwUpdateAvailable ? X`<span class="ac-badge-update">${this._labelUpdateAvailable}</span>` : K;
    }
    _renderLinkedDevicesRow() {
      if (!this.linkedDevices.length) return K;
      const t = this.deviceType === Ne.ACE ? this._labelGoToPrinter : this._labelGoToAce;
      return X`
      <div class="ac-linked-devices">
        ${Oi(this.linkedDevices, e => X`
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
      <div class="ac-printer-card-header ${Li(e)}">
        ${this.powerEntityId ? X`
              <button
                class="ac-printer-card-button-small"
                .disabled=${this._togglingPower}
                @click=${this._togglePowerEntity}
              >
                <ha-svg-icon .path=${"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13"}></ha-svg-icon>
              </button>
            ` : K}

        <button
          class="ac-printer-card-button-name"
          @click=${this._toggleHiddenOveride}
        >
          <div
            class="ac-printer-card-header-status-dot"
            style=${Ri(i)}
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
            ` : K}
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
        class="ac-printer-card-infocontainer ${Li(t)}"
        style=${Ri(e)}
        ${ur(Object.assign({}, Po))}
      >
        <div
          class="ac-printer-card-info-animcontainer ${Li(t)}"
          style=${Ri(i)}
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
              </p>` : K}
        </div>
        <div
          class="ac-printer-card-info-statscontainer ${Li(t)}"
          style=${Ri(r)}
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
            class="ac-printer-card-infocontainer ${Li(t)}"
            style=${Ri(e)}
            ${ur(Object.assign({}, Po))}
          >
            <div
              class="ac-printer-card-settingssection ${Li(t)}"
            >
              <button
                class="ac-printer-card-button-settings"
                @click=${this._openPrintSettingsModal}
              >
                <ha-svg-icon .path=${Di}></ha-svg-icon>
                ${this._buttonPrintSettings}
              </button>
            </div>
          </div>
        ` : K;
    }
    _percentComplete() {
      return Number(bi(this.hass, this.printerEntities, this.printerEntityIdPart, "job_progress", -1).state);
    }
    static get styles() {
      return u`
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
  s([xt(".ac-printer-card")], Do.prototype, "_printerCardContainer", void 0), s([yt()], Do.prototype, "hass", void 0), s([yt()], Do.prototype, "language", void 0), s([yt({
    attribute: "monitored-stats"
  })], Do.prototype, "monitoredStats", void 0), s([yt({
    attribute: "selected-printer-id"
  })], Do.prototype, "selectedPrinterID", void 0), s([yt({
    attribute: "selected-printer-device"
  })], Do.prototype, "selectedPrinterDevice", void 0), s([yt()], Do.prototype, "printers", void 0), s([yt()], Do.prototype, "route", void 0), s([yt({
    type: Boolean
  })], Do.prototype, "round", void 0), s([yt({
    type: Boolean
  })], Do.prototype, "use_24hr", void 0), s([yt({
    attribute: "show-settings-button",
    type: Boolean
  })], Do.prototype, "showSettingsButton", void 0), s([yt({
    attribute: "always-show",
    type: Boolean
  })], Do.prototype, "alwaysShow", void 0), s([yt({
    attribute: "temperature-unit",
    type: String
  })], Do.prototype, "temperatureUnit", void 0), s([yt({
    attribute: "light-entity-id",
    type: String
  })], Do.prototype, "lightEntityId", void 0), s([yt({
    attribute: "power-entity-id",
    type: String
  })], Do.prototype, "powerEntityId", void 0), s([yt({
    attribute: "camera-entity-id",
    type: String
  })], Do.prototype, "cameraEntityId", void 0), s([yt({
    type: Boolean
  })], Do.prototype, "vertical", void 0), s([yt({
    attribute: "scale-factor"
  })], Do.prototype, "scaleFactor", void 0), s([yt({
    attribute: "slot-colors"
  })], Do.prototype, "slotColors", void 0), s([vt()], Do.prototype, "_showVideo", void 0), s([vt()], Do.prototype, "cameraEntityState", void 0), s([vt()], Do.prototype, "isHidden", void 0), s([vt()], Do.prototype, "isPrinting", void 0), s([vt()], Do.prototype, "hiddenOverride", void 0), s([vt()], Do.prototype, "lightIsOn", void 0), s([vt()], Do.prototype, "statusColor", void 0), s([vt()], Do.prototype, "printerEntities", void 0), s([vt()], Do.prototype, "printerEntityIdPart", void 0), s([vt()], Do.prototype, "progressPercent", void 0), s([vt()], Do.prototype, "_buttonPrintSettings", void 0), s([vt()], Do.prototype, "_togglingLight", void 0), s([vt()], Do.prototype, "_togglingPower", void 0), s([vt()], Do.prototype, "deviceType", void 0), s([vt()], Do.prototype, "linkedDevices", void 0), s([vt()], Do.prototype, "_effectiveLightEntityId", void 0), s([vt()], Do.prototype, "_fwUpdateAvailable", void 0), s([vt()], Do.prototype, "_bridgeMqttState", void 0), s([vt()], Do.prototype, "_bridgeRefreshState", void 0), s([vt()], Do.prototype, "_togglingBridgeMqtt", void 0), s([vt()], Do.prototype, "_refreshingBridge", void 0), s([vt()], Do.prototype, "_labelBridgeMqtt", void 0), s([vt()], Do.prototype, "_labelBridgeRefresh", void 0), s([vt()], Do.prototype, "_labelGoToPrinter", void 0), s([vt()], Do.prototype, "_labelGoToAce", void 0), s([vt()], Do.prototype, "_labelUpdateAvailable", void 0), s([vt()], Do.prototype, "_buttonAceSettings", void 0), Do = s([Ks("anycubic-printercard-card")], Do);
  let Ho = class extends pt {
    constructor() {
      super(...arguments), this._toggle_item = () => {
        this.toggle(this.item);
      }, this._reorder_item = t => {
        this._isActive && this.reorder(this.item, t.currentTarget.direction);
      };
    }
    willUpdate(t) {
      super.willUpdate(t), (t.has("selectedItems") || t.has("item")) && (this._isActive = this.selectedItems.includes(this.item));
    }
    update(t) {
      super.update(t), (t.has("_isActive") || t.has("selectedItems") || t.has("unusedItems") || t.has("item")) && (this.style.top = String(this._isActive ? 56 * this.selectedItems.indexOf(this.item) : 56 * (this.selectedItems.length + this.unusedItems.indexOf(this.item))) + "px");
    }
    render() {
      const t = {
        "ac-ui-deselected": !this._isActive
      };
      return X`
      <button class="ac-ui-msr-select" @click=${this._toggle_item}>
        ${this._isActive ? X`<ha-svg-icon .path=${"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}></ha-svg-icon>` : K}
      </button>
      <p class="ac-ui-msr-itemtext ${Li(t)}">
        ${this.item}
      </p>
      <div>
        <button
          class="ac-ui-msr-position"
          .direction=${1}
          @click=${this._reorder_item}
        >
          <ha-svg-icon .path=${Mi}></ha-svg-icon>
        </button>
        <button
          class="ac-ui-msr-position"
          .direction=${-1}
          @click=${this._reorder_item}
        >
          <ha-svg-icon .path=${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"}></ha-svg-icon>
        </button>
      </div>
    `;
    }
    static get styles() {
      return u`
      :host {
        box-sizing: border-box;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .ac-ui-msr-itemtext {
        flex-grow: 1;
        font-size: 16px;
        font-weight: bold;
        line-height: 24px;
      }

      .ac-ui-msr-select {
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.1);
        outline: none;
        border: none;
        margin-right: 16px;
        padding: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .ac-ui-msr-position {
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        border-radius: 8px;
        background-color: transparent;
        outline: none;
        border: none;
        margin-left: 16px;
        color: var(--primary-text-color);
        cursor: pointer;
      }
    `;
    }
  };
  s([yt()], Ho.prototype, "item", void 0), s([yt({
    attribute: "selected-items"
  })], Ho.prototype, "selectedItems", void 0), s([yt({
    attribute: "unused-items"
  })], Ho.prototype, "unusedItems", void 0), s([yt()], Ho.prototype, "reorder", void 0), s([yt()], Ho.prototype, "toggle", void 0), s([vt()], Ho.prototype, "_isActive", void 0), Ho = s([Ks("anycubic-ui-multi-select-reorder-item")], Ho);
  let Bo = class extends pt {
    constructor() {
      super(...arguments), this._reorder = (t, e) => {
        const i = this._selectedItems.indexOf(t),
          r = i + e;
        if (r < 0 || r > this._selectedItems.length - 1) return;
        const s = this._selectedItems.slice(0),
          n = s[r];
        s[r] = t, s[i] = n, this._setSelectedItems(s);
      }, this._toggle = t => {
        if (this._selectedItems.includes(t)) {
          const e = this._selectedItems.indexOf(t);
          this._setSelectedItems([...this._selectedItems.slice(0, e), ...this._selectedItems.slice(e + 1)]), this._unusedItems = [t, ...this._unusedItems];
        } else {
          const e = this._unusedItems.indexOf(t);
          this._unusedItems = [...this._unusedItems.slice(0, e), ...this._unusedItems.slice(e + 1)], this._setSelectedItems([...this._selectedItems, t]);
        }
      };
    }
    async firstUpdated() {
      this._allOptions = Object.values(this.availableOptions), this._setSelectedItems([...this.initialItems].filter(t => this._allOptions.includes(t))), this._unusedItems = this._allOptions.filter(t => !this.initialItems.includes(t)), this.requestUpdate();
    }
    willUpdate(t) {
      super.willUpdate(t);
    }
    render() {
      const t = {
        height: this._allOptions ? String(56 * this._allOptions.length) + "px" : "0px"
      };
      return this._allOptions ? X`
          <div style=${Ri(t)}>
            ${Oi(this._allOptions, (t, e) => X`
                <anycubic-ui-multi-select-reorder-item
                  .item=${t}
                  .selectedItems=${this._selectedItems}
                  .unusedItems=${this._unusedItems}
                  .reorder=${this._reorder}
                  .toggle=${this._toggle}
                ></anycubic-ui-multi-select-reorder-item>
              `)}
          </div>
        ` : K;
    }
    _setSelectedItems(t) {
      this._selectedItems = t, this.onChange(this._selectedItems);
    }
    static get styles() {
      return u`
      :host {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
      }
    `;
    }
  };
  s([yt({
    attribute: "available-options"
  })], Bo.prototype, "availableOptions", void 0), s([yt({
    attribute: "initial-items"
  })], Bo.prototype, "initialItems", void 0), s([yt({
    attribute: "on-change"
  })], Bo.prototype, "onChange", void 0), s([vt()], Bo.prototype, "_allOptions", void 0), s([vt()], Bo.prototype, "_selectedItems", void 0), s([vt()], Bo.prototype, "_unusedItems", void 0), Bo = s([Ks("anycubic-ui-multi-select-reorder")], Bo);
  const Io = Ai();
  let Fo = class extends pt {
    constructor() {
      super(...arguments), this.configPage = "main", this.availableStats = {}, this.formSchemaMain = [], this.formSchemaColours = [], this.hasColorbox = !1, this.isLCD = !1, this._handlePageSelected = t => {
        const e = t.detail.item.getAttribute("page-name");
        e !== this.configPage && (this.configPage = e);
      }, this._selectedStatsChanged = t => {
        this.cardConfig.monitoredStats = t, this._configChanged(this.cardConfig);
      }, this._formValueChanged = t => {
        this.cardConfig = t.detail.value, this._configChanged(this.cardConfig);
      }, this._computeLabel = t => {
        switch (t.name) {
          case "printer_id":
          default:
            return this._labelPrinter_id;
          case "vertical":
            return this._labelVertical;
          case "round":
            return this._labelRound;
          case "use_24hr":
            return this._labelUse_24hr;
          case "showSettingsButton":
            return this._labelShowSettingsButton;
          case "alwaysShow":
            return this._labelAlwaysShow;
          case "temperatureUnit":
            return this._labelTemperatureUnit;
          case "lightEntityId":
            return this._labelLightEntityId;
          case "powerEntityId":
            return this._labelPowerEntityId;
          case "cameraEntityId":
            return this._labelCameraEntityId;
          case "scaleFactor":
            return this._labelScaleFactor;
          case "slotColors":
            return this._labelSlotColors;
        }
      };
    }
    willUpdate(t) {
      var e, i;
      super.willUpdate(t), t.has("language") && (this._tabMain = Zs("card.configure.tabs.main", this.language), this._tabStats = Zs("card.configure.tabs.stats", this.language), this._tabColours = Zs("card.configure.tabs.colours", this.language), this._labelPrinter_id = Zs("card.configure.labels.printer_id", this.language), this._labelVertical = Zs("card.configure.labels.vertical", this.language), this._labelRound = Zs("card.configure.labels.round", this.language), this._labelUse_24hr = Zs("card.configure.labels.use_24hr", this.language), this._labelShowSettingsButton = Zs("card.configure.labels.show_settings_button", this.language), this._labelAlwaysShow = Zs("card.configure.labels.always_show", this.language), this._labelTemperatureUnit = Zs("card.configure.labels.temperature_unit", this.language), this._labelLightEntityId = Zs("card.configure.labels.light_entity_id", this.language), this._labelPowerEntityId = Zs("card.configure.labels.power_entity_id", this.language), this._labelCameraEntityId = Zs("card.configure.labels.camera_entity_id", this.language), this._labelScaleFactor = Zs("card.configure.labels.scale_factor", this.language), this._labelSlotColors = Zs("card.configure.labels.slot_colors", this.language)), (t.has("hass") || t.has("cardConfig")) && (this.printerEntities = ni(this.hass, this.cardConfig.printer_id), this.printerEntityIdPart = ci(this.printerEntities), this.isLCD = (e = this.hass, i = this.printerEntities, this.printerEntityIdPart, "Resin" === bi(e, i, 0, "current_status").attributes.material_type), this.hasColorbox = "active" === bi(this.hass, this.printerEntities, this.printerEntityIdPart, "ace_spools", "inactive").state, this.availableStats = Object.assign(Object.assign({}, Ge), ze), this.isLCD ? this.availableStats = Object.assign(Object.assign({}, this.availableStats), qe) : this.availableStats = Object.assign(Object.assign({}, this.availableStats), Ve), this.hasColorbox && (this.availableStats = Object.assign(Object.assign({}, this.availableStats), Ye))), (t.has("printers") || t.has("language")) && (this.formSchemaMain = this._computeSchemaMain(), this.formSchemaColours = this._computeSchemaColours());
    }
    render() {
      return X`
      <div class="ac-printer-card-configure-cont">
        ${this._renderMenu()} ${this._renderConfMain()}
        ${this._renderConfColours()} ${this._renderConfStats()}
      </div>
    `;
    }
    _renderConfMain() {
      return "main" === this.configPage ? X`
          <div class="ac-printer-card-configure-conf">
            <ha-form
              .hass=${this.hass}
              .data=${this.cardConfig}
              .schema=${this.formSchemaMain}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._formValueChanged}
            ></ha-form>
          </div>
        ` : K;
    }
    _renderConfStats() {
      return "stats" === this.configPage ? X`
          <div class="ac-printer-card-configure-conf">
            <p class="ac-cconf-label">Choose Monitored Stats</p>
            <anycubic-ui-multi-select-reorder
              .availableOptions=${this.availableStats}
              .initialItems=${this.cardConfig.monitoredStats}
              .onChange=${this._selectedStatsChanged}
            ></anycubic-ui-multi-select-reorder>
          </div>
        ` : K;
    }
    _renderConfColours() {
      return "colours" === this.configPage ? X`
          <div class="ac-printer-card-configure-conf">
            <ha-form
              .hass=${this.hass}
              .data=${this.cardConfig}
              .schema=${this.formSchemaColours}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._formValueChanged}
            ></ha-form>
          </div>
        ` : K;
    }
    _renderMenu() {
      return X`
      <div class="header">
        <ha-tabs
          scrollable
          attr-for-selected="page-name"
          .selected=${this.configPage}
          @iron-activate=${this._handlePageSelected}
        >
          <paper-tab page-name="main">${this._tabMain}</paper-tab>
          <paper-tab page-name="stats">${this._tabStats}</paper-tab>
          ${this.hasColorbox ? X`<paper-tab page-name="colours">
                ${this._tabColours}
              </paper-tab>` : K}
        </ha-tabs>
      </div>
    `;
    }
    _configChanged(t) {
      const e = Object.keys(t).filter(e => t[e] !== Io[e]).reduce((e, i) => (e[i] = t[i], e), {});
      Oe(this, "config-changed", {
        config: e
      });
    }
    _computeSchemaMain() {
      if (!this.printers) return [];
      return [{
        name: "printer_id",
        selector: {
          select: {
            options: Object.keys(this.printers).map((t, e) => ({
              value: t,
              label: this.printers[t].name
            })),
            mode: "dropdown",
            multiple: !1
          }
        }
      }, {
        name: "vertical",
        selector: {
          boolean: {}
        }
      }, {
        name: "round",
        selector: {
          boolean: {}
        }
      }, {
        name: "use_24hr",
        selector: {
          boolean: {}
        }
      }, {
        name: "temperatureUnit",
        selector: {
          select: {
            options: [{
              value: je.C,
              label: `°${je.C}`
            }, {
              value: je.F,
              label: `°${je.F}`
            }],
            mode: "list",
            multiple: !1
          }
        }
      }, {
        name: "alwaysShow",
        selector: {
          boolean: {}
        }
      }, {
        name: "showSettingsButton",
        selector: {
          boolean: {}
        }
      }, {
        name: "scaleFactor",
        selector: {
          select: {
            options: [{
              value: 1,
              label: "1"
            }, {
              value: .75,
              label: "0.75"
            }, {
              value: .5,
              label: "0.5"
            }],
            mode: "list",
            multiple: !1
          }
        }
      }, {
        name: "lightEntityId",
        selector: {
          entity: {
            domain: yo
          }
        }
      }, {
        name: "powerEntityId",
        selector: {
          entity: {
            domain: vo
          }
        }
      }, {
        name: "cameraEntityId",
        selector: {
          entity: {
            domain: fo
          }
        }
      }];
    }
    _computeSchemaColours() {
      return this.printers ? [{
        name: "slotColors",
        selector: {
          text: {
            multiple: !0
          }
        }
      }] : [];
    }
    static get styles() {
      return u`
      :host {
        display: block;
      }

      .header {
        color: var(--primary-text-color);
      }

      ha-tabs {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --paper-tabs-selection-bar-color: var(--primary-color);
        text-transform: uppercase;
      }

      .ac-printer-card-configure-conf {
        margin-top: 10px;
      }

      .ac-cconf-label {
        margin-bottom: 4px;
        font-weight: bold;
        font-size: 14px;
      }
    `;
    }
  };
  s([yt()], Fo.prototype, "hass", void 0), s([yt()], Fo.prototype, "language", void 0), s([yt({
    attribute: "card-config"
  })], Fo.prototype, "cardConfig", void 0), s([yt()], Fo.prototype, "printers", void 0), s([vt()], Fo.prototype, "configPage", void 0), s([vt()], Fo.prototype, "availableStats", void 0), s([vt()], Fo.prototype, "formSchemaMain", void 0), s([vt()], Fo.prototype, "formSchemaColours", void 0), s([vt()], Fo.prototype, "printerEntities", void 0), s([vt()], Fo.prototype, "printerEntityIdPart", void 0), s([vt()], Fo.prototype, "hasColorbox", void 0), s([vt()], Fo.prototype, "isLCD", void 0), s([vt()], Fo.prototype, "_tabMain", void 0), s([vt()], Fo.prototype, "_tabStats", void 0), s([vt()], Fo.prototype, "_tabColours", void 0), s([vt()], Fo.prototype, "_labelPrinter_id", void 0), s([vt()], Fo.prototype, "_labelVertical", void 0), s([vt()], Fo.prototype, "_labelRound", void 0), s([vt()], Fo.prototype, "_labelUse_24hr", void 0), s([vt()], Fo.prototype, "_labelShowSettingsButton", void 0), s([vt()], Fo.prototype, "_labelAlwaysShow", void 0), s([vt()], Fo.prototype, "_labelTemperatureUnit", void 0), s([vt()], Fo.prototype, "_labelLightEntityId", void 0), s([vt()], Fo.prototype, "_labelPowerEntityId", void 0), s([vt()], Fo.prototype, "_labelCameraEntityId", void 0), s([vt()], Fo.prototype, "_labelScaleFactor", void 0), s([vt()], Fo.prototype, "_labelSlotColors", void 0), Fo = s([mt("anycubic-printercard-configure")], Fo), window.console.info("%c ANYCUBIC-CARD %c v0.9.0 ", "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray");
  const Lo = Ai();
  t.AnycubicPrintercardEditor = class extends pt {
    constructor() {
      super(...arguments), this.config = {};
    }
    async firstUpdated() {
      this.printers = si(this.hass);
    }
    willUpdate(t) {
      super.willUpdate(t), t.has("hass") && this.hass.language !== this.language && (this.language = this.hass.language), t.has("config") && (this.config.vertical = Ti(this.config.vertical, Lo.vertical), this.config.round = Ti(this.config.round, Lo.round), this.config.use_24hr = Ti(this.config.use_24hr, Lo.use_24hr), this.config.alwaysShow = Ti(this.config.alwaysShow, Lo.alwaysShow), this.config.showSettingsButton = Ti(this.config.showSettingsButton, Lo.showSettingsButton), this.config.temperatureUnit = Ti(this.config.temperatureUnit, Lo.temperatureUnit), this.config.monitoredStats = Ti(this.config.monitoredStats, Lo.monitoredStats), this.config.slotColors = Ti(this.config.slotColors, Lo.slotColors), this.config.scaleFactor = Ti(this.config.scaleFactor, Lo.scaleFactor));
    }
    setConfig(t) {
      this.config = t;
    }
    render() {
      return X`
      <anycubic-printercard-configure
        .hass=${this.hass}
        .language=${this.language}
        .printers=${this.printers}
        .cardConfig=${this.config}
      ></anycubic-printercard-configure>
    `;
    }
  }, s([yt()], t.AnycubicPrintercardEditor.prototype, "hass", void 0), s([yt()], t.AnycubicPrintercardEditor.prototype, "config", void 0), s([vt()], t.AnycubicPrintercardEditor.prototype, "printers", void 0), s([vt()], t.AnycubicPrintercardEditor.prototype, "language", void 0), t.AnycubicPrintercardEditor = s([mt("anycubic-card-editor")], t.AnycubicPrintercardEditor), t.AnycubicCard = class extends pt {
    constructor() {
      super(...arguments), this.config = {};
    }
    async firstUpdated() {
      this.printers = si(this.hass), this.requestUpdate();
    }
    willUpdate(t) {
      var e, i;
      super.willUpdate(t), t.has("hass") && this.hass.language !== this.language && (this.language = this.hass.language), (t.has("config") || t.has("printers")) && (this.vertical = Ti(this.config.vertical, Lo.vertical), this.round = Ti(this.config.round, Lo.round), this.use_24hr = Ti(this.config.use_24hr, Lo.use_24hr), this.alwaysShow = Ti(this.config.alwaysShow, Lo.alwaysShow), this.showSettingsButton = Ti(this.config.showSettingsButton, Lo.showSettingsButton), this.temperatureUnit = Ti(this.config.temperatureUnit, Lo.temperatureUnit), this.lightEntityId = this.config.lightEntityId, this.powerEntityId = this.config.powerEntityId, this.cameraEntityId = this.config.cameraEntityId, this.scaleFactor = this.config.scaleFactor, this.slotColors = this.config.slotColors, this.monitoredStats = this.config.monitoredStats, this.config.printer_id && this.printers && (this.selectedPrinterID = this.config.printer_id, this.selectedPrinterDevice = (e = this.printers, i = this.config.printer_id, e && i ? e[i] : void 0)));
    }
    setConfig(t) {
      this.config = t;
    }
    render() {
      return X`
      <anycubic-printercard-card
        .hass=${this.hass}
        .language=${this.language}
        .monitoredStats=${this.config.monitoredStats}
        .printers=${this.printers}
        .selectedPrinterID=${this.selectedPrinterID}
        .selectedPrinterDevice=${this.selectedPrinterDevice}
        .vertical=${this.vertical}
        .round=${this.round}
        .use_24hr=${this.use_24hr}
        .showSettingsButton=${this.showSettingsButton}
        .alwaysShow=${this.alwaysShow}
        .temperatureUnit=${this.temperatureUnit}
        .lightEntityId=${this.lightEntityId}
        .powerEntityId=${this.powerEntityId}
        .cameraEntityId=${this.cameraEntityId}
        .scaleFactor=${this.scaleFactor}
        .slotColors=${this.slotColors}
      ></anycubic-printercard-card>
    `;
    }
    getCardSize() {
      return 2;
    }
    static getConfigElement() {
      return document.createElement("anycubic-card-editor");
    }
    static getStubConfig(t, e, i) {
      return {
        printer_id: Object.keys(si(t))[0]
      };
    }
  }, s([yt()], t.AnycubicCard.prototype, "hass", void 0), s([yt()], t.AnycubicCard.prototype, "config", void 0), s([vt()], t.AnycubicCard.prototype, "printers", void 0), s([vt()], t.AnycubicCard.prototype, "language", void 0), s([vt()], t.AnycubicCard.prototype, "selectedPrinterID", void 0), s([vt()], t.AnycubicCard.prototype, "selectedPrinterDevice", void 0), s([vt()], t.AnycubicCard.prototype, "vertical", void 0), s([vt()], t.AnycubicCard.prototype, "round", void 0), s([vt()], t.AnycubicCard.prototype, "use_24hr", void 0), s([vt()], t.AnycubicCard.prototype, "showSettingsButton", void 0), s([vt()], t.AnycubicCard.prototype, "alwaysShow", void 0), s([vt()], t.AnycubicCard.prototype, "temperatureUnit", void 0), s([vt()], t.AnycubicCard.prototype, "lightEntityId", void 0), s([vt()], t.AnycubicCard.prototype, "powerEntityId", void 0), s([vt()], t.AnycubicCard.prototype, "cameraEntityId", void 0), s([vt()], t.AnycubicCard.prototype, "scaleFactor", void 0), s([vt()], t.AnycubicCard.prototype, "slotColors", void 0), s([vt()], t.AnycubicCard.prototype, "monitoredStats", void 0), t.AnycubicCard = s([mt("anycubic-card")], t.AnycubicCard);
  const Oo = window;
  Oo.customCards = Oo.customCards || [], Oo.customCards.push({
    type: "anycubic-card",
    name: "Anycubic Card",
    preview: !0,
    description: "Anycubic Cloud Integration Card"
  }), Object.defineProperty(t, "__esModule", {
    value: !0
  });
}({});
