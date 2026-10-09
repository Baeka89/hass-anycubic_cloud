!function(t){var e=function(t,i){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},e(t,i)};function i(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}var r=function(){return r=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var s in e=arguments[i])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t},r.apply(this,arguments)};function s(t,e,i,r){var s,n=arguments.length,o=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(n<3?s(o):n>3?s(e,i,o):s(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}function n(t,e,i){if(i||2===arguments.length)for(var r,s=0,n=e.length;s<n;s++)!r&&s in e||(r||(r=Array.prototype.slice.call(e,0,s)),r[s]=e[s]);return t.concat(r||Array.prototype.slice.call(e))}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const o=globalThis,a=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),h=new WeakMap;let c=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=h.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&h.set(e,t))}return t}toString(){return this.cssText}};const d=t=>new c("string"==typeof t?t:t+"",void 0,l),p=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new c(i,t,l)},u=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return d(e)})(t):t,{is:g,defineProperty:_,getOwnPropertyDescriptor:b,getOwnPropertyNames:m,getOwnPropertySymbols:v,getPrototypeOf:y}=Object,f=globalThis,x=f.trustedTypes,E=x?x.emptyScript:"",w=f.reactiveElementPolyfillSupport,$=(t,e)=>t,S={toAttribute(t,e){switch(e){case Boolean:t=t?E:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},P=(t,e)=>!g(t,e),A={attribute:!0,type:String,converter:S,reflect:!1,useDefault:!1,hasChanged:P};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let T=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&_(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=b(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??A}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=y(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...m(t),...v(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=o.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:S).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:S;this._$Em=r;const n=s.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const n=this.constructor;if(!1===r&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??P)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[$("elementProperties")]=new Map,T[$("finalized")]=new Map,w?.({ReactiveElement:T}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const C=globalThis,D=t=>t,k=C.trustedTypes,I=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,H="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+B,F=`<${M}>`,L=document,O=()=>L.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,G=/>/g,V=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,K=/"/g,Z=/^(?:script|style|textarea|title)$/i,X=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Y=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),J=new WeakMap,Q=L.createTreeWalker(L,129);function tt(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==I?I.createHTML(e):e}class et{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const o=t.length-1,a=this.parts,[l,h]=((t,e)=>{const i=t.length-1,r=[];let s,n=2===e?"<svg>":3===e?"<math>":"",o=z;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===z?"!--"===l[1]?o=j:void 0!==l[1]?o=G:void 0!==l[2]?(Z.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=V):void 0!==l[3]&&(o=V):o===V?">"===l[0]?(o=s??z,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?V:'"'===l[3]?K:q):o===K||o===q?o=V:o===j||o===G?o=z:(o=V,s=void 0);const d=o===V&&t[e+1].startsWith("/>")?" ":"";n+=o===z?i+F:h>=0?(r.push(a),i.slice(0,h)+H+i.slice(h)+B+d):i+B+(-2===h?e:d)}return[tt(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]})(t,e);if(this.el=et.createElement(l,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Q.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(H)){const e=h[n++],i=r.getAttribute(t).split(B),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?ot:"?"===o[1]?at:"@"===o[1]?lt:nt}),r.removeAttribute(t)}else t.startsWith(B)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(Z.test(r.tagName)){const t=r.textContent.split(B),e=t.length-1;if(e>0){r.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],O()),Q.nextNode(),a.push({type:2,index:++s});r.append(t[e],O())}}}else if(8===r.nodeType)if(r.data===M)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(B,t+1));)a.push({type:7,index:s}),t+=B.length-1}s++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}}function it(t,e,i=t,r){if(e===Y)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=N(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=it(t,s._$AS(t,e.values),s,r)),e}class rt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??L).importNode(e,!0);Q.currentNode=r;let s=Q.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new st(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ht(s,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(s=Q.nextNode(),n++)}return Q.currentNode=L,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class st{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),N(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=et.createElement(tt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new rt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new et(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new st(this.O(O()),this.O(O()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=D(t).nextSibling;D(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class nt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(void 0===s)t=it(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==Y,n&&(this._$AH=t);else{const r=t;let o,a;for(t=s[0],o=0;o<s.length-1;o++)a=it(this,r[i+o],e,o),a===Y&&(a=this._$AH[o]),n||=!N(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class at extends nt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class lt extends nt{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=it(this,t,e,0)??W)===Y)return;const i=this._$AH,r=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ht{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}}const ct={I:st},dt=C.litHtmlPolyfillSupport;dt?.(et,st),(C.litHtmlVersions??=[]).push("3.3.3");const pt=globalThis;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */let ut=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new st(e.insertBefore(O(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}};ut._$litElement$=!0,ut.finalized=!0,pt.litElementHydrateSupport?.({LitElement:ut});const gt=pt.litElementPolyfillSupport;gt?.({LitElement:ut}),(pt.litElementVersions??=[]).push("4.2.2");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const _t=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},bt={attribute:!0,type:String,converter:S,reflect:!1,hasChanged:P},mt=(t=bt,e,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function vt(t){return(e,i)=>"object"==typeof i?mt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function yt(t){return vt({...t,state:!0,attribute:!1})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
function ft(t,e){return(e,i,r)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const xt=(t,e,i,r)=>{const s={},n=i??{},o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=n,t.dispatchEvent(o),o};var Et;!function(t){t.PRINTER="printer",t.ACE="ace",t.BRIDGE="bridge"}(Et||(Et={}));var wt,$t,St,Pt,At,Tt;!function(t){t.ETA="ETA",t.Elapsed="Elapsed",t.Remaining="Remaining"}(wt||(wt={})),function(t){t.F="F",t.C="C"}($t||($t={})),function(t){t.Status="Status",t.PrinterOnline="Online",t.Availability="Availability",t.ProjectName="Project",t.CurrentLayer="Layer"}(St||(St={})),function(t){t.HotendCurrent="Hotend",t.BedCurrent="Bed",t.HotendTarget="T Hotend",t.BedTarget="T Bed",t.DryingStatus="Dry Status",t.DryingTime="Dry Time",t.SpeedMode="Speed Mode",t.FanSpeed="Fan Speed"}(Pt||(Pt={})),function(t){t.DryingStatus="Dry Status",t.DryingTime="Dry Time",t.AceTempCurrent="ACE Temp",t.AceTempTarget="T ACE Temp"}(At||(At={})),function(t){t.OnTime="On Time",t.OffTime="Off Time",t.BottomTime="Bottom Time",t.ModelHeight="Model Height",t.BottomLayers="Bottom Layers",t.ZUpHeight="Z Up Height",t.ZUpSpeed="Z Up Speed",t.ZDownSpeed="Z Down Speed"}(Tt||(Tt={}));const Ct=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},wt),St),Pt),At),Tt);var Dt,kt;!function(t){t.PLA="PLA",t.PETG="PETG",t.ABS="ABS",t.PACF="PACF",t.PC="PC",t.ASA="ASA",t.HIPS="HIPS",t.PA="PA",t.PLA_SE="PLA_SE"}(Dt||(Dt={})),function(t){t.PAUSE="pause",t.RESUME="resume",t.CANCEL="cancel"}(kt||(kt={}));const It=["width","height","left","top"];function Ht(t,e){Object.keys(e).forEach(t=>{It.includes(t)&&!isNaN(e[t])&&(e[t]=e[t].toString()+"px")}),t&&Object.assign(t.style,e)}function Bt(t){return{state:t.state,attributes:t.attributes,entity_id:"invalid_domain.invalid_entity",last_changed:"",last_updated:"",context:{id:"",parent_id:null,user_id:null}}}function Mt(t){return t.toLowerCase().split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function Ft(t,e){return e?t.states[e.entity_id]:void 0}function Lt(t,e){const i=Ft(t,e);return i?i.state:""}function Ot(t,e,i,r){return"on"===Lt(t,e)?i:r}function Nt(t){return t&&"Cloud API Bridge"===t.model?Et.BRIDGE:t&&"ACE Pro Multi-Color Box"===t.model?Et.ACE:Et.PRINTER}function Rt(t,e){const i={};if(e)for(const r in t.entities){const s=t.entities[r];s.device_id===e&&(i[s.entity_id]=s)}return i}function Ut(t){return Object.values(t).some(t=>{var e;return null===(e=t.translation_key)||void 0===e?void 0:e.startsWith("secondary_")})?1:0}const zt={nozzle_temperature:"curr_nozzle_temp",hotbed_temperature:"curr_hotbed_temp",target_nozzle_temperature:"target_nozzle_temp",target_hotbed_temperature:"target_hotbed_temp",fan_speed:"fan_speed_pct",printer_firmware:"fw_version",ace_firmware:"multi_color_box_fw_version",ace_run_out_refill:"multi_color_box_runout_refill",drying_active:"dry_status_is_drying",drying_remaining_time:"dry_status_remaining_time",drying_total_duration:"dry_status_total_duration",refresh_mqtt_connection:"manual_mqtt_connection_refresh",pause_print:"print_pause",resume_print:"print_resume",stop_print:"print_stop"};function jt(t,e,i,r){var s;const n=null!==(s=zt[r])&&void 0!==s?s:r,o=[n,`secondary_${n}`];for(const e of o)for(const r of Object.values(t))if(r.entity_id.split(".")[0]===i&&r.translation_key===e)return r;for(const e of[n,r])for(const r of Object.values(t))if(!r.translation_key&&r.entity_id.split(".")[0]===i&&r.entity_id.split(".")[1].endsWith(`_${e}`))return r}function Gt(t,e,i){return jt(t,0,e,i)}function Vt(t,e,i){var r;return null===(r=jt(t,0,e,i))||void 0===r?void 0:r.entity_id}function qt(t,e,i){for(const r in t){const t=r.split("."),s=t[0],n=t[1];if(s===e&&n.endsWith(i))return n.split(i)[0]}}function Kt(t){const e=[];for(const i in t){const t=i.split(".");2===t.length&&t[1]&&e.push(t[1])}if(0===e.length)return;let i=e[0];for(let t=1;t<e.length;t++){const r=e[t];for(;i.length>0&&!r.startsWith(i);)i=i.slice(0,-1);if(0===i.length)return}const r=i.lastIndexOf("_");return-1!==r?i.slice(0,r+1):void 0}function Zt(t){var e;return null!==(e=Kt(t))&&void 0!==e?e:qt(t,"binary_sensor","printer_online")}function Xt(t){var e,i,r;return null!==(r=null!==(i=null!==(e=Kt(t))&&void 0!==e?e:qt(t,"sensor","ace_current_temperature"))&&void 0!==i?i:qt(t,"update","ace_firmware"))&&void 0!==r?r:qt(t,"switch","ace_run_out_refill")}function Yt(t){var e,i;return null!==(i=null!==(e=Kt(t))&&void 0!==e?e:qt(t,"switch","manual_mqtt_connection_enabled"))&&void 0!==i?i:qt(t,"button","refresh_mqtt_connection")}function Wt(t,e,i,r){return Ft(t,jt(e,0,"switch",r))}function Jt(t,e,i,r,s="unavailable",n={}){return Ft(t,jt(e,0,"button",r))||Bt({state:String(s),attributes:n})}function Qt(t,e,i,r){return Jt(t,e,0,r,"unavailable",{duration:0,temperature:0})}function te(t){return!["unavailable"].includes(t.state)}function ee(t,e,i,r){const s=Ft(t,jt(e,0,"image",r));return s?function(t){const e=t.attributes.access_token;return`${window.location.origin}/api/image_proxy/${t.entity_id}?token=${e}&v=${encodeURIComponent(t.state)}`}(s):void 0}function ie(t,e,i,r,s="unavailable",n={}){return Ft(t,jt(e,0,"sensor",r))||Bt({state:String(s),attributes:n})}function re(t,e,i,r){const s=jt(e,0,"sensor",r);return s?function(t,e){const i=Ft(t,e),r=i?parseFloat(i.state):0;return isNaN(r)?0:r}(t,s):void 0}function se(t,e,i,r,s,n,o){const a=jt(e,0,"binary_sensor",r);return a?Ot(t,a,s,n):o}function ne(t,e,i,r,s=0,n={}){return Ft(t,jt(e,0,"number",r))||Bt({state:String(s),attributes:n})}function oe(t,e,i,r){const s=jt(e,0,"update",r);return s?Ot(t,s,"Update Available","Up To Date"):void 0}function ae(t,e,i){return"Filament"===ie(t,e,0,"current_status").attributes.material_type}function le(t){const e=t.path.split("/");return e.length>1?e[1]:void 0}function he(t){const e=t.path.split("/");return e.length>2?e[2]:"main"}function ce(t){return["printing","preheating","paused","downloading","checking"].includes(t)}const de=(t,e,i=!1)=>{const r=t.route.prefix,s=le(t.route),n=`${r}/${s?`${s}/${e}`:""}`;i?history.replaceState(null,"",n):history.pushState(null,"",n),xt(window,"location-changed",{replace:i})};function pe(t){return function(t){const e=Math.max(0,Math.floor(t/1e3));return{days:Math.floor(e/86400),hours:Math.floor(e%86400/3600),minutes:Math.floor(e%3600/60),seconds:e%60}}(1e3*t)}const ue=(t,e)=>{if(0!==t&&(!t||isNaN(t)))return"invalid duration";const i=pe(e?60*Math.ceil(Number(t)/60):Number(t));return`${i.days&&i.days>0?`${i.days}d`:""}${i.hours&&i.hours>0?`${i.hours}h`:""}${i.minutes&&i.minutes>0?`${i.minutes}m`:""}${i.seconds&&i.seconds>0?`${i.seconds}s`:e?"":"0s"}`},ge=(t,e,i=!1,r=!1,s)=>{switch(e){case wt.Remaining:return ue(t,i);case wt.ETA:return((t,e,i,r)=>{if(0!==t&&(!t||isNaN(t)))return"invalid time";const s=new Date(Date.now()+1e3*Number(t));return new Intl.DateTimeFormat("en-GB",Object.assign(Object.assign({timeZone:r,hour:"2-digit",minute:"2-digit"},e?{}:{second:"2-digit"}),{hourCycle:i?"h23":"h12"})).format(s)})(t,i,r,s);case wt.Elapsed:return ue(t,i);default:return"<unknown>"}};const _e={[$t.C]:{[$t.C]:t=>t,[$t.F]:t=>9*t/5+32},[$t.F]:{[$t.C]:t=>5*(t-32)/9,[$t.F]:t=>t}},be=(t,e,i=!1)=>{const r=parseFloat(t.state);if(Number.isNaN(r))return"—";const s=(t=>{switch(t.attributes.unit_of_measurement){case"°C":default:return $t.C;case"°F":return $t.F}})(t),n=(o=r,l=e||s,_e[a=s]&&_e[a][l]?_e[a][l](o):-1);var o,a,l;return`${i?Math.round(n):n.toFixed(2)}°${e||s}`};function me(){return[Ct.Status,Ct.ETA,Ct.Elapsed,Ct.Remaining]}function ve(t){var e;return(null!==(e=t.attributes.available_modes)&&void 0!==e?e:[]).reduce((t,e)=>Object.assign(Object.assign({},t),{[e.mode]:e.description}),{})}function ye(t){return Object.values(Dt).find(e=>e===t)}let fe=class extends ut{willUpdate(t){super.willUpdate(t),(t.has("selectedPrinterID")||t.has("hass"))&&(this.printerEntities=Rt(this.hass,this.selectedPrinterID))}render(){return X`
      <debug-data elevation="2">
        <p>There are ${Object.keys(this.hass.states).length} entities.</p>
        <p>The screen is${this.narrow?"":" not"} narrow.</p>
        Configured panel config
        <pre>${JSON.stringify(this.panel,void 0,2)}</pre>
        Current route
        <pre>${JSON.stringify(this.route,void 0,2)}</pre>
        Printers
        <pre>${JSON.stringify(this.printers,void 0,2)}</pre>
        Printer Entities
        <pre>${JSON.stringify(this.printerEntities,void 0,2)}</pre>
        Selected Printer
        <pre>${JSON.stringify(this.selectedPrinterDevice,void 0,2)}</pre>
      </debug-data>
    `}static get styles(){return p`
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
    `}};s([vt()],fe.prototype,"hass",void 0),s([vt()],fe.prototype,"language",void 0),s([vt({type:Boolean,reflect:!0})],fe.prototype,"narrow",void 0),s([vt()],fe.prototype,"route",void 0),s([vt()],fe.prototype,"panel",void 0),s([vt()],fe.prototype,"printers",void 0),s([vt({attribute:"selected-printer-id"})],fe.prototype,"selectedPrinterID",void 0),s([vt({attribute:"selected-printer-device"})],fe.prototype,"selectedPrinterDevice",void 0),s([yt()],fe.prototype,"printerEntities",void 0),fe=s([_t("anycubic-view-debug")],fe);var xe="Anycubic Cloud",Ee={actions:{cancel:"Cancel",pause:"Pause",print:"Print",resume:"Resume",yes:"Yes",no:"No",save:"Save"},messages:{mqtt_unsupported:"This feature requires MQTT to retrieve data but unfortunately MQTT is not supported with the configured authentication mode."},states:{unknown:"Unknown"}},we={buttons:{print_settings:"Print Settings",dry:"Dry",runout_refill:"Refill",ace_settings:"ACE Settings"},ace_settings:{heading:"ACE Settings",label_spools:"Spools",hint_spools_unavailable:"Live spool data isn't available right now (MQTT may not be connected) - you can still assign material and colour below, it will apply next time the box reports in."},configure:{tabs:{main:"Main",stats:"Stats",colours:"ACE Colour Presets"},labels:{printer_id:"Select Printer",vertical:"Vertical Layout?",round:"Round Stats?",use_24hr:"Use 24hr Time?",show_settings_button:"Always show print settings button?",always_show:"Always show card?",temperature_unit:"Temperature Unit",light_entity_id:"Light Entity",power_entity_id:"Power Entity",camera_entity_id:"Camera Entity",scale_factor:"Scale Factor",slot_colors:"Slot Colour Presets"}},print_settings:{confirm_message:"Are you sure you want to {action} the print?",label_nozzle_temp:"Nozzle Temperature",label_hotbed_temp:"Hotbed Temperature",label_fan_speed:"Fan Speed",label_aux_fan_speed:"AUX Fan Speed",label_box_fan_speed:"Box Fan Speed",print_pause:"Pause Print",print_resume:"Resume Print",print_cancel:"Cancel Print",print_finish_job:"Clear Completed Job",retract_filament:"Retract Filament",extrude_filament:"Extrude Filament",save_speed_mode:"Save Speed Mode",save_target_nozzle:"Save Target Nozzle",save_target_hotbed:"Save Target Hotbed",save_fan_speed:"Save Fan Speed",save_aux_fan_speed:"Save AUX Fan Speed",save_box_fan_speed:"Save Box Fan Speed"},drying_settings:{heading:"Drying Options",button_preset:"Preset",button_stop_drying:"Stop Drying",button_minutes:"Mins",custom_heading:"Custom Drying",custom_label_temp:"Temperature",custom_label_duration:"Duration (minutes)",custom_button_start:"Start Custom Drying",state_drying:"Drying",state_not_drying:"Not Drying",hint_nothing_available:"No drying controls are available right now - this usually means the ACE box isn't currently connected via MQTT. Check the MQTT connection mode in the integration options and whether the printer/ACE box is actually online."},spool_settings:{heading:"Editing Slot",label_select_material:"Select Material",label_select_colour:"Manually select colour",label_preset_colour:"Choose Preset Colour"},monitored_stats:{ETA:"ETA",Elapsed:"Elapsed",Remaining:"Remaining",Status:"Status",Online:"Online",Availability:"Availability",Project:"Project",Layer:"Layer",Hotend:"Hotend",Bed:"Bed","T Hotend":"T Hotend","T Bed":"T Bed","Dry Status":"Dry Status","Dry Time":"Dry Time","Speed Mode":"Speed Mode","Fan Speed":"Fan Speed","ACE Temp":"ACE Temp","T ACE Temp":"T ACE Temp","On Time":"On Time","Off Time":"Off Time","Bottom Time":"Bottom Time","Model Height":"Model Height","Bottom Layers":"Bottom Layers","Z Up Height":"Z Up Height","Z Up Speed":"Z Up Speed","Z Down Speed":"Z Down Speed"},bridge:{mqtt_connection:"MQTT Connection",refresh_connection:"Refresh Connection"},linked_devices:{go_to_printer:"Go to printer",go_to_ace:"Go to ACE Pro box"},badges:{update_available:"Update available"}},$e={initial:{printer_select:"Select a printer.",type_printer:"Printer",type_ace:"ACE Pro Box",type_bridge:"Cloud Connection"},main:{title:"Main",cards:{main:{description:"General information about the printer.",fields:{printer_name:"Name",printer_id:"ID",printer_mac:"MAC",printer_model:"Model",printer_fw_version:"FW Version",printer_fw_update_available:"FW Status",printer_online:"Online",printer_available:"Available",printer_mqtt_active:"MQTT Connection",curr_nozzle_temp:"Current Nozzle Temperature",curr_hotbed_temp:"Current Hotbed Temperature",target_nozzle_temp:"Target Nozzle Temperature",target_hotbed_temp:"Target Hotbed Temperature",job_state:"Job State",job_progress:"Job Progress",ace_fw_version:"ACE FW Version",ace_fw_update_available:"ACE FW Status",drying_active:"ACE Drying Status",drying_progress:"ACE Drying Progress"}}}},files_cloud:{title:"Cloud Files",cards:{}},files_local:{title:"Local Files",cards:{}},files_udisk:{title:"USB Files",cards:{}},print_save_in_cloud:{title:"Print (Save in user cloud)",cards:{}},print_no_cloud_save:{title:"Print (No Cloud Save)",cards:{}},debug:{title:"Debug",cards:{}}},Se={title:xe,common:Ee,card:we,panels:$e},Pe=Object.freeze({__proto__:null,card:we,common:Ee,default:Se,panels:$e,title:xe}),Ae="Anycubic Cloud",Te={actions:{cancel:"Abbrechen",pause:"Pausieren",print:"Drucken",resume:"Fortsetzen",yes:"Ja",no:"Nein",save:"Speichern"},messages:{mqtt_unsupported:"Diese Funktion benötigt MQTT, um Daten abzurufen. MQTT wird mit dem konfigurierten Authentifizierungsmodus leider nicht unterstützt."},states:{unknown:"Unbekannt"}},Ce={buttons:{print_settings:"Druckeinstellungen",dry:"Trocknen",runout_refill:"Nachfüllen",ace_settings:"ACE-Einstellungen"},ace_settings:{heading:"ACE-Einstellungen",label_spools:"Spulen",hint_spools_unavailable:"Live-Spulendaten sind aktuell nicht verfügbar (MQTT evtl. nicht verbunden) - Material und Farbe können trotzdem gesetzt werden, sie greifen dann, sobald die Box sich wieder meldet."},configure:{tabs:{main:"Allgemein",stats:"Statistiken",colours:"ACE-Farbvorgaben"},labels:{printer_id:"Drucker auswählen",vertical:"Vertikales Layout?",round:"Werte runden?",use_24hr:"24-Stunden-Format?",show_settings_button:"Druckeinstellungen-Button immer anzeigen?",always_show:"Karte immer anzeigen?",temperature_unit:"Temperatureinheit",light_entity_id:"Licht-Entität",power_entity_id:"Strom-Entität",camera_entity_id:"Kamera-Entität",scale_factor:"Skalierungsfaktor",slot_colors:"Slot-Farbvorgaben"}},print_settings:{confirm_message:"Möchtest du den Druck wirklich {action}?",label_nozzle_temp:"Solltemperatur Düse",label_hotbed_temp:"Solltemperatur Bett",label_fan_speed:"Lüftergeschwindigkeit",label_aux_fan_speed:"AUX-Lüftergeschwindigkeit",label_box_fan_speed:"Box-Lüftergeschwindigkeit",print_pause:"Druck pausieren",print_resume:"Druck fortsetzen",print_cancel:"Druck stoppen",print_finish_job:"Druckauftrag abschließen",retract_filament:"Filament Rückzug (Retract)",extrude_filament:"Filament Vorschub (Extrude)",save_speed_mode:"Geschwindigkeitsmodus speichern",save_target_nozzle:"Solltemp. Düse speichern",save_target_hotbed:"Solltemp. Bett speichern",save_fan_speed:"Lüftergeschwindigkeit speichern",save_aux_fan_speed:"AUX-Lüftergeschw. speichern",save_box_fan_speed:"Box-Lüftergeschw. speichern"},drying_settings:{heading:"Trocknungsoptionen",button_preset:"Preset",button_stop_drying:"Trocknung stoppen",button_minutes:"Min",custom_heading:"Benutzerdefinierte Trocknung",custom_label_temp:"Temperatur",custom_label_duration:"Dauer (Minuten)",custom_button_start:"Benutzerdefinierte Trocknung starten",state_drying:"Trocknet",state_not_drying:"Trocknet nicht",hint_nothing_available:"Aktuell stehen keine Trocknungs-Steuerelemente zur Verfügung - meist bedeutet das, dass die ACE-Box gerade nicht über MQTT verbunden ist. Prüfe den MQTT-Verbindungsmodus in den Integrationsoptionen und ob Drucker/ACE-Box wirklich online sind."},spool_settings:{heading:"Slot bearbeiten",label_select_material:"Material auswählen",label_select_colour:"Farbe manuell auswählen",label_preset_colour:"Vorgabefarbe wählen"},monitored_stats:{ETA:"Vorauss. Ende",Elapsed:"Verstrichen",Remaining:"Verbleibend",Status:"Status",Online:"Online",Availability:"Verfügbarkeit",Project:"Projekt",Layer:"Schicht",Hotend:"Düse",Bed:"Bett","T Hotend":"Soll Düse","T Bed":"Soll Bett","Dry Status":"Trocknungsstatus","Dry Time":"Trocknungszeit","Speed Mode":"Geschw.-Modus","Fan Speed":"Lüftergeschw.","ACE Temp":"ACE Temp.","T ACE Temp":"Soll ACE Temp.","On Time":"Belichtung An","Off Time":"Belichtung Aus","Bottom Time":"Bodenschicht-Zeit","Model Height":"Modellhöhe","Bottom Layers":"Bodenschichten","Z Up Height":"Z-Hub Höhe","Z Up Speed":"Z-Hub Geschw. (Auf)","Z Down Speed":"Z-Hub Geschw. (Ab)"},bridge:{mqtt_connection:"MQTT-Verbindung",refresh_connection:"Verbindung aktualisieren"},linked_devices:{go_to_printer:"Zum Drucker",go_to_ace:"Zur ACE Pro Box"},badges:{update_available:"Update verfügbar"}},De={initial:{printer_select:"Wähle einen Drucker aus.",type_printer:"Drucker",type_ace:"ACE Pro Box",type_bridge:"Cloud-Verbindung"},main:{title:"Übersicht",cards:{main:{description:"Allgemeine Informationen über den Drucker.",fields:{printer_name:"Name",printer_id:"ID",printer_mac:"MAC",printer_model:"Modell",printer_fw_version:"FW-Version",printer_fw_update_available:"FW-Status",printer_online:"Online",printer_available:"Verfügbar",printer_mqtt_active:"MQTT-Verbindung",curr_nozzle_temp:"Aktuelle Düsentemperatur",curr_hotbed_temp:"Aktuelle Betttemperatur",target_nozzle_temp:"Solltemperatur Düse",target_hotbed_temp:"Solltemperatur Bett",job_state:"Auftragsstatus",job_progress:"Auftragsfortschritt",ace_fw_version:"ACE FW-Version",ace_fw_update_available:"ACE FW-Status",drying_active:"ACE Trocknungsstatus",drying_progress:"ACE Trocknungsfortschritt"}}}},files_cloud:{title:"Cloud-Dateien",cards:{}},files_local:{title:"Lokale Dateien",cards:{}},files_udisk:{title:"USB-Dateien",cards:{}},print_save_in_cloud:{title:"Drucken (in Cloud speichern)",cards:{}},print_no_cloud_save:{title:"Drucken (ohne Cloud-Speicherung)",cards:{}},debug:{title:"Debug",cards:{}}},ke={title:Ae,common:Te,card:Ce,panels:De},Ie=Object.freeze({__proto__:null,card:Ce,common:Te,default:ke,panels:De,title:Ae});function He(t,e){var i=e&&e.cache?e.cache:je,r=e&&e.serializer?e.serializer:Ue;return(e&&e.strategy?e.strategy:Le)(t,{cache:i,serializer:r})}function Be(t,e,i,r){var s,n=null==(s=r)||"number"==typeof s||"boolean"==typeof s?r:i(r),o=e.get(n);return void 0===o&&(o=t.call(this,r),e.set(n,o)),o}function Me(t,e,i){var r=Array.prototype.slice.call(arguments,3),s=i(r),n=e.get(s);return void 0===n&&(n=t.apply(this,r),e.set(s,n)),n}function Fe(t,e,i,r,s){return i.bind(e,t,r,s)}function Le(t,e){return Fe(t,this,1===t.length?Be:Me,e.cache.create(),e.serializer)}var Oe,Ne,Re,Ue=function(){return JSON.stringify(arguments)},ze=function(){function t(){this.cache=Object.create(null)}return t.prototype.get=function(t){return this.cache[t]},t.prototype.set=function(t,e){this.cache[t]=e},t}(),je={create:function(){return new ze}},Ge={variadic:function(t,e){return Fe(t,this,Me,e.cache.create(),e.serializer)}};function Ve(t){return t.type===Ne.literal}function qe(t){return t.type===Ne.argument}function Ke(t){return t.type===Ne.number}function Ze(t){return t.type===Ne.date}function Xe(t){return t.type===Ne.time}function Ye(t){return t.type===Ne.select}function We(t){return t.type===Ne.plural}function Je(t){return t.type===Ne.pound}function Qe(t){return t.type===Ne.tag}function ti(t){return!(!t||"object"!=typeof t||t.type!==Re.number)}function ei(t){return!(!t||"object"!=typeof t||t.type!==Re.dateTime)}!function(t){t[t.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",t[t.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",t[t.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",t[t.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",t[t.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",t[t.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",t[t.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",t[t.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",t[t.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",t[t.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",t[t.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",t[t.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",t[t.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",t[t.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",t[t.INVALID_TAG=23]="INVALID_TAG",t[t.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",t[t.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",t[t.UNCLOSED_TAG=27]="UNCLOSED_TAG"}(Oe||(Oe={})),function(t){t[t.literal=0]="literal",t[t.argument=1]="argument",t[t.number=2]="number",t[t.date=3]="date",t[t.time=4]="time",t[t.select=5]="select",t[t.plural=6]="plural",t[t.pound=7]="pound",t[t.tag=8]="tag"}(Ne||(Ne={})),function(t){t[t.number=0]="number",t[t.dateTime=1]="dateTime"}(Re||(Re={}));var ii=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,ri=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function si(t){var e={};return t.replace(ri,function(t){var i=t.length;switch(t[0]){case"G":e.era=4===i?"long":5===i?"narrow":"short";break;case"y":e.year=2===i?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":e.month=["numeric","2-digit","short","long","narrow"][i-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":e.day=["numeric","2-digit"][i-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":e.weekday=4===i?"long":5===i?"narrow":"short";break;case"e":if(i<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");e.weekday=["short","long","narrow","short"][i-4];break;case"c":if(i<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");e.weekday=["short","long","narrow","short"][i-4];break;case"a":e.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":e.hourCycle="h12",e.hour=["numeric","2-digit"][i-1];break;case"H":e.hourCycle="h23",e.hour=["numeric","2-digit"][i-1];break;case"K":e.hourCycle="h11",e.hour=["numeric","2-digit"][i-1];break;case"k":e.hourCycle="h24",e.hour=["numeric","2-digit"][i-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":e.minute=["numeric","2-digit"][i-1];break;case"s":e.second=["numeric","2-digit"][i-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":e.timeZoneName=i<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""}),e}var ni=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;function oi(t){return t.replace(/^(.*?)-/,"")}var ai=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,li=/^(@+)?(\+|#+)?[rs]?$/g,hi=/(\*)(0+)|(#+)(0+)|(0+)/g,ci=/^(0+)$/;function di(t){var e={};return"r"===t[t.length-1]?e.roundingPriority="morePrecision":"s"===t[t.length-1]&&(e.roundingPriority="lessPrecision"),t.replace(li,function(t,i,r){return"string"!=typeof r?(e.minimumSignificantDigits=i.length,e.maximumSignificantDigits=i.length):"+"===r?e.minimumSignificantDigits=i.length:"#"===i[0]?e.maximumSignificantDigits=i.length:(e.minimumSignificantDigits=i.length,e.maximumSignificantDigits=i.length+("string"==typeof r?r.length:0)),""}),e}function pi(t){switch(t){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function ui(t){var e;if("E"===t[0]&&"E"===t[1]?(e={notation:"engineering"},t=t.slice(2)):"E"===t[0]&&(e={notation:"scientific"},t=t.slice(1)),e){var i=t.slice(0,2);if("+!"===i?(e.signDisplay="always",t=t.slice(2)):"+?"===i&&(e.signDisplay="exceptZero",t=t.slice(2)),!ci.test(t))throw new Error("Malformed concise eng/scientific notation");e.minimumIntegerDigits=t.length}return e}function gi(t){var e=pi(t);return e||{}}function _i(t){for(var e={},i=0,s=t;i<s.length;i++){var n=s[i];switch(n.stem){case"percent":case"%":e.style="percent";continue;case"%x100":e.style="percent",e.scale=100;continue;case"currency":e.style="currency",e.currency=n.options[0];continue;case"group-off":case",_":e.useGrouping=!1;continue;case"precision-integer":case".":e.maximumFractionDigits=0;continue;case"measure-unit":case"unit":e.style="unit",e.unit=oi(n.options[0]);continue;case"compact-short":case"K":e.notation="compact",e.compactDisplay="short";continue;case"compact-long":case"KK":e.notation="compact",e.compactDisplay="long";continue;case"scientific":e=r(r(r({},e),{notation:"scientific"}),n.options.reduce(function(t,e){return r(r({},t),gi(e))},{}));continue;case"engineering":e=r(r(r({},e),{notation:"engineering"}),n.options.reduce(function(t,e){return r(r({},t),gi(e))},{}));continue;case"notation-simple":e.notation="standard";continue;case"unit-width-narrow":e.currencyDisplay="narrowSymbol",e.unitDisplay="narrow";continue;case"unit-width-short":e.currencyDisplay="code",e.unitDisplay="short";continue;case"unit-width-full-name":e.currencyDisplay="name",e.unitDisplay="long";continue;case"unit-width-iso-code":e.currencyDisplay="symbol";continue;case"scale":e.scale=parseFloat(n.options[0]);continue;case"rounding-mode-floor":e.roundingMode="floor";continue;case"rounding-mode-ceiling":e.roundingMode="ceil";continue;case"rounding-mode-down":e.roundingMode="trunc";continue;case"rounding-mode-up":e.roundingMode="expand";continue;case"rounding-mode-half-even":e.roundingMode="halfEven";continue;case"rounding-mode-half-down":e.roundingMode="halfTrunc";continue;case"rounding-mode-half-up":e.roundingMode="halfExpand";continue;case"integer-width":if(n.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");n.options[0].replace(hi,function(t,i,r,s,n,o){if(i)e.minimumIntegerDigits=r.length;else{if(s&&n)throw new Error("We currently do not support maximum integer digits");if(o)throw new Error("We currently do not support exact integer digits")}return""});continue}if(ci.test(n.stem))e.minimumIntegerDigits=n.stem.length;else if(ai.test(n.stem)){if(n.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");n.stem.replace(ai,function(t,i,r,s,n,o){return"*"===r?e.minimumFractionDigits=i.length:s&&"#"===s[0]?e.maximumFractionDigits=s.length:n&&o?(e.minimumFractionDigits=n.length,e.maximumFractionDigits=n.length+o.length):(e.minimumFractionDigits=i.length,e.maximumFractionDigits=i.length),""});var o=n.options[0];"w"===o?e=r(r({},e),{trailingZeroDisplay:"stripIfInteger"}):o&&(e=r(r({},e),di(o)))}else if(li.test(n.stem))e=r(r({},e),di(n.stem));else{var a=pi(n.stem);a&&(e=r(r({},e),a));var l=ui(n.stem);l&&(e=r(r({},e),l))}}return e}var bi,mi={"001":["H","h"],419:["h","H","hB","hb"],AC:["H","h","hb","hB"],AD:["H","hB"],AE:["h","hB","hb","H"],AF:["H","hb","hB","h"],AG:["h","hb","H","hB"],AI:["H","h","hb","hB"],AL:["h","H","hB"],AM:["H","hB"],AO:["H","hB"],AR:["h","H","hB","hb"],AS:["h","H"],AT:["H","hB"],AU:["h","hb","H","hB"],AW:["H","hB"],AX:["H"],AZ:["H","hB","h"],BA:["H","hB","h"],BB:["h","hb","H","hB"],BD:["h","hB","H"],BE:["H","hB"],BF:["H","hB"],BG:["H","hB","h"],BH:["h","hB","hb","H"],BI:["H","h"],BJ:["H","hB"],BL:["H","hB"],BM:["h","hb","H","hB"],BN:["hb","hB","h","H"],BO:["h","H","hB","hb"],BQ:["H"],BR:["H","hB"],BS:["h","hb","H","hB"],BT:["h","H"],BW:["H","h","hb","hB"],BY:["H","h"],BZ:["H","h","hb","hB"],CA:["h","hb","H","hB"],CC:["H","h","hb","hB"],CD:["hB","H"],CF:["H","h","hB"],CG:["H","hB"],CH:["H","hB","h"],CI:["H","hB"],CK:["H","h","hb","hB"],CL:["h","H","hB","hb"],CM:["H","h","hB"],CN:["H","hB","hb","h"],CO:["h","H","hB","hb"],CP:["H"],CR:["h","H","hB","hb"],CU:["h","H","hB","hb"],CV:["H","hB"],CW:["H","hB"],CX:["H","h","hb","hB"],CY:["h","H","hb","hB"],CZ:["H"],DE:["H","hB"],DG:["H","h","hb","hB"],DJ:["h","H"],DK:["H"],DM:["h","hb","H","hB"],DO:["h","H","hB","hb"],DZ:["h","hB","hb","H"],EA:["H","h","hB","hb"],EC:["h","H","hB","hb"],EE:["H","hB"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],ER:["h","H"],ES:["H","hB","h","hb"],ET:["hB","hb","h","H"],FI:["H"],FJ:["h","hb","H","hB"],FK:["H","h","hb","hB"],FM:["h","hb","H","hB"],FO:["H","h"],FR:["H","hB"],GA:["H","hB"],GB:["H","h","hb","hB"],GD:["h","hb","H","hB"],GE:["H","hB","h"],GF:["H","hB"],GG:["H","h","hb","hB"],GH:["h","H"],GI:["H","h","hb","hB"],GL:["H","h"],GM:["h","hb","H","hB"],GN:["H","hB"],GP:["H","hB"],GQ:["H","hB","h","hb"],GR:["h","H","hb","hB"],GT:["h","H","hB","hb"],GU:["h","hb","H","hB"],GW:["H","hB"],GY:["h","hb","H","hB"],HK:["h","hB","hb","H"],HN:["h","H","hB","hb"],HR:["H","hB"],HU:["H","h"],IC:["H","h","hB","hb"],ID:["H"],IE:["H","h","hb","hB"],IL:["H","hB"],IM:["H","h","hb","hB"],IN:["h","H"],IO:["H","h","hb","hB"],IQ:["h","hB","hb","H"],IR:["hB","H"],IS:["H"],IT:["H","hB"],JE:["H","h","hb","hB"],JM:["h","hb","H","hB"],JO:["h","hB","hb","H"],JP:["H","K","h"],KE:["hB","hb","H","h"],KG:["H","h","hB","hb"],KH:["hB","h","H","hb"],KI:["h","hb","H","hB"],KM:["H","h","hB","hb"],KN:["h","hb","H","hB"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],KW:["h","hB","hb","H"],KY:["h","hb","H","hB"],KZ:["H","hB"],LA:["H","hb","hB","h"],LB:["h","hB","hb","H"],LC:["h","hb","H","hB"],LI:["H","hB","h"],LK:["H","h","hB","hb"],LR:["h","hb","H","hB"],LS:["h","H"],LT:["H","h","hb","hB"],LU:["H","h","hB"],LV:["H","hB","hb","h"],LY:["h","hB","hb","H"],MA:["H","h","hB","hb"],MC:["H","hB"],MD:["H","hB"],ME:["H","hB","h"],MF:["H","hB"],MG:["H","h"],MH:["h","hb","H","hB"],MK:["H","h","hb","hB"],ML:["H"],MM:["hB","hb","H","h"],MN:["H","h","hb","hB"],MO:["h","hB","hb","H"],MP:["h","hb","H","hB"],MQ:["H","hB"],MR:["h","hB","hb","H"],MS:["H","h","hb","hB"],MT:["H","h"],MU:["H","h"],MV:["H","h"],MW:["h","hb","H","hB"],MX:["h","H","hB","hb"],MY:["hb","hB","h","H"],MZ:["H","hB"],NA:["h","H","hB","hb"],NC:["H","hB"],NE:["H"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NI:["h","H","hB","hb"],NL:["H","hB"],NO:["H","h"],NP:["H","h","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],NZ:["h","hb","H","hB"],OM:["h","hB","hb","H"],PA:["h","H","hB","hb"],PE:["h","H","hB","hb"],PF:["H","h","hB"],PG:["h","H"],PH:["h","hB","hb","H"],PK:["h","hB","H"],PL:["H","h"],PM:["H","hB"],PN:["H","h","hb","hB"],PR:["h","H","hB","hb"],PS:["h","hB","hb","H"],PT:["H","hB"],PW:["h","H"],PY:["h","H","hB","hb"],QA:["h","hB","hb","H"],RE:["H","hB"],RO:["H","hB"],RS:["H","hB","h"],RU:["H"],RW:["H","h"],SA:["h","hB","hb","H"],SB:["h","hb","H","hB"],SC:["H","h","hB"],SD:["h","hB","hb","H"],SE:["H"],SG:["h","hb","H","hB"],SH:["H","h","hb","hB"],SI:["H","hB"],SJ:["H"],SK:["H"],SL:["h","hb","H","hB"],SM:["H","h","hB"],SN:["H","h","hB"],SO:["h","H"],SR:["H","hB"],SS:["h","hb","H","hB"],ST:["H","hB"],SV:["h","H","hB","hb"],SX:["H","h","hb","hB"],SY:["h","hB","hb","H"],SZ:["h","hb","H","hB"],TA:["H","h","hb","hB"],TC:["h","hb","H","hB"],TD:["h","H","hB"],TF:["H","h","hB"],TG:["H","hB"],TH:["H","h"],TJ:["H","h"],TL:["H","hB","hb","h"],TM:["H","h"],TN:["h","hB","hb","H"],TO:["h","H"],TR:["H","hB"],TT:["h","hb","H","hB"],TW:["hB","hb","h","H"],TZ:["hB","hb","H","h"],UA:["H","hB","h"],UG:["hB","hb","H","h"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],UY:["h","H","hB","hb"],UZ:["H","hB","h"],VA:["H","h","hB"],VC:["h","hb","H","hB"],VE:["h","H","hB","hb"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],VN:["H","h"],VU:["h","H"],WF:["H","hB"],WS:["h","H"],XK:["H","hB","h"],YE:["h","hB","hb","H"],YT:["H","hB"],ZA:["H","h","hb","hB"],ZM:["h","hb","H","hB"],ZW:["H","h"],"af-ZA":["H","h","hB","hb"],"ar-001":["h","hB","hb","H"],"ca-ES":["H","h","hB"],"en-001":["h","hb","H","hB"],"en-HK":["h","hb","H","hB"],"en-IL":["H","h","hb","hB"],"en-MY":["h","hb","H","hB"],"es-BR":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"gu-IN":["hB","hb","h","H"],"hi-IN":["hB","h","H"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],"ta-IN":["hB","h","hb","H"],"te-IN":["hB","h","H"],"zu-ZA":["H","hB","hb","h"]};function vi(t){var e=t.hourCycle;if(void 0===e&&t.hourCycles&&t.hourCycles.length&&(e=t.hourCycles[0]),e)switch(e){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var i,r=t.language;return"root"!==r&&(i=t.maximize().region),(mi[i||""]||mi[r||""]||mi["".concat(r,"-001")]||mi["001"])[0]}var yi=new RegExp("^".concat(ii.source,"*")),fi=new RegExp("".concat(ii.source,"*$"));function xi(t,e){return{start:t,end:e}}var Ei=!!String.prototype.startsWith&&"_a".startsWith("a",1),wi=!!String.fromCodePoint,$i=!!Object.fromEntries,Si=!!String.prototype.codePointAt,Pi=!!String.prototype.trimStart,Ai=!!String.prototype.trimEnd,Ti=!!Number.isSafeInteger?Number.isSafeInteger:function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t&&Math.abs(t)<=9007199254740991},Ci=!0;try{Ci="a"===(null===(bi=Li("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu").exec("a"))||void 0===bi?void 0:bi[0])}catch(j){Ci=!1}var Di,ki=Ei?function(t,e,i){return t.startsWith(e,i)}:function(t,e,i){return t.slice(i,i+e.length)===e},Ii=wi?String.fromCodePoint:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var i,r="",s=t.length,n=0;s>n;){if((i=t[n++])>1114111)throw RangeError(i+" is not a valid code point");r+=i<65536?String.fromCharCode(i):String.fromCharCode(55296+((i-=65536)>>10),i%1024+56320)}return r},Hi=$i?Object.fromEntries:function(t){for(var e={},i=0,r=t;i<r.length;i++){var s=r[i],n=s[0],o=s[1];e[n]=o}return e},Bi=Si?function(t,e){return t.codePointAt(e)}:function(t,e){var i=t.length;if(!(e<0||e>=i)){var r,s=t.charCodeAt(e);return s<55296||s>56319||e+1===i||(r=t.charCodeAt(e+1))<56320||r>57343?s:r-56320+(s-55296<<10)+65536}},Mi=Pi?function(t){return t.trimStart()}:function(t){return t.replace(yi,"")},Fi=Ai?function(t){return t.trimEnd()}:function(t){return t.replace(fi,"")};function Li(t,e){return new RegExp(t,e)}if(Ci){var Oi=Li("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu");Di=function(t,e){var i;return Oi.lastIndex=e,null!==(i=Oi.exec(t)[1])&&void 0!==i?i:""}}else Di=function(t,e){for(var i=[];;){var r=Bi(t,e);if(void 0===r||ji(r)||Gi(r))break;i.push(r),e+=r>=65536?2:1}return Ii.apply(void 0,i)};var Ni,Ri=function(){function t(t,e){void 0===e&&(e={}),this.message=t,this.position={offset:0,line:1,column:1},this.ignoreTag=!!e.ignoreTag,this.locale=e.locale,this.requiresOtherClause=!!e.requiresOtherClause,this.shouldParseSkeletons=!!e.shouldParseSkeletons}return t.prototype.parse=function(){if(0!==this.offset())throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},t.prototype.parseMessage=function(t,e,i){for(var r=[];!this.isEOF();){var s=this.char();if(123===s){if((n=this.parseArgument(t,i)).err)return n;r.push(n.val)}else{if(125===s&&t>0)break;if(35!==s||"plural"!==e&&"selectordinal"!==e){if(60===s&&!this.ignoreTag&&47===this.peek()){if(i)break;return this.error(Oe.UNMATCHED_CLOSING_TAG,xi(this.clonePosition(),this.clonePosition()))}if(60===s&&!this.ignoreTag&&Ui(this.peek()||0)){if((n=this.parseTag(t,e)).err)return n;r.push(n.val)}else{var n;if((n=this.parseLiteral(t,e)).err)return n;r.push(n.val)}}else{var o=this.clonePosition();this.bump(),r.push({type:Ne.pound,location:xi(o,this.clonePosition())})}}}return{val:r,err:null}},t.prototype.parseTag=function(t,e){var i=this.clonePosition();this.bump();var r=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:Ne.literal,value:"<".concat(r,"/>"),location:xi(i,this.clonePosition())},err:null};if(this.bumpIf(">")){var s=this.parseMessage(t+1,e,!0);if(s.err)return s;var n=s.val,o=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!Ui(this.char()))return this.error(Oe.INVALID_TAG,xi(o,this.clonePosition()));var a=this.clonePosition();return r!==this.parseTagName()?this.error(Oe.UNMATCHED_CLOSING_TAG,xi(a,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:Ne.tag,value:r,children:n,location:xi(i,this.clonePosition())},err:null}:this.error(Oe.INVALID_TAG,xi(o,this.clonePosition())))}return this.error(Oe.UNCLOSED_TAG,xi(i,this.clonePosition()))}return this.error(Oe.INVALID_TAG,xi(i,this.clonePosition()))},t.prototype.parseTagName=function(){var t=this.offset();for(this.bump();!this.isEOF()&&zi(this.char());)this.bump();return this.message.slice(t,this.offset())},t.prototype.parseLiteral=function(t,e){for(var i=this.clonePosition(),r="";;){var s=this.tryParseQuote(e);if(s)r+=s;else{var n=this.tryParseUnquoted(t,e);if(n)r+=n;else{var o=this.tryParseLeftAngleBracket();if(!o)break;r+=o}}}var a=xi(i,this.clonePosition());return{val:{type:Ne.literal,value:r,location:a},err:null}},t.prototype.tryParseLeftAngleBracket=function(){return this.isEOF()||60!==this.char()||!this.ignoreTag&&(Ui(t=this.peek()||0)||47===t)?null:(this.bump(),"<");var t},t.prototype.tryParseQuote=function(t){if(this.isEOF()||39!==this.char())return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if("plural"===t||"selectordinal"===t)break;return null;default:return null}this.bump();var e=[this.char()];for(this.bump();!this.isEOF();){var i=this.char();if(39===i){if(39!==this.peek()){this.bump();break}e.push(39),this.bump()}else e.push(i);this.bump()}return Ii.apply(void 0,e)},t.prototype.tryParseUnquoted=function(t,e){if(this.isEOF())return null;var i=this.char();return 60===i||123===i||35===i&&("plural"===e||"selectordinal"===e)||125===i&&t>0?null:(this.bump(),Ii(i))},t.prototype.parseArgument=function(t,e){var i=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(Oe.EXPECT_ARGUMENT_CLOSING_BRACE,xi(i,this.clonePosition()));if(125===this.char())return this.bump(),this.error(Oe.EMPTY_ARGUMENT,xi(i,this.clonePosition()));var r=this.parseIdentifierIfPossible().value;if(!r)return this.error(Oe.MALFORMED_ARGUMENT,xi(i,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(Oe.EXPECT_ARGUMENT_CLOSING_BRACE,xi(i,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:Ne.argument,value:r,location:xi(i,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(Oe.EXPECT_ARGUMENT_CLOSING_BRACE,xi(i,this.clonePosition())):this.parseArgumentOptions(t,e,r,i);default:return this.error(Oe.MALFORMED_ARGUMENT,xi(i,this.clonePosition()))}},t.prototype.parseIdentifierIfPossible=function(){var t=this.clonePosition(),e=this.offset(),i=Di(this.message,e),r=e+i.length;return this.bumpTo(r),{value:i,location:xi(t,this.clonePosition())}},t.prototype.parseArgumentOptions=function(t,e,i,s){var n,o=this.clonePosition(),a=this.parseIdentifierIfPossible().value,l=this.clonePosition();switch(a){case"":return this.error(Oe.EXPECT_ARGUMENT_TYPE,xi(o,l));case"number":case"date":case"time":this.bumpSpace();var h=null;if(this.bumpIf(",")){this.bumpSpace();var c=this.clonePosition();if((v=this.parseSimpleArgStyleIfPossible()).err)return v;if(0===(g=Fi(v.val)).length)return this.error(Oe.EXPECT_ARGUMENT_STYLE,xi(this.clonePosition(),this.clonePosition()));h={style:g,styleLocation:xi(c,this.clonePosition())}}if((y=this.tryParseArgumentClose(s)).err)return y;var d=xi(s,this.clonePosition());if(h&&ki(null==h?void 0:h.style,"::",0)){var p=Mi(h.style.slice(2));if("number"===a)return(v=this.parseNumberSkeletonFromString(p,h.styleLocation)).err?v:{val:{type:Ne.number,value:i,location:d,style:v.val},err:null};if(0===p.length)return this.error(Oe.EXPECT_DATE_TIME_SKELETON,d);var u=p;this.locale&&(u=function(t,e){for(var i="",r=0;r<t.length;r++){var s=t.charAt(r);if("j"===s){for(var n=0;r+1<t.length&&t.charAt(r+1)===s;)n++,r++;var o=1+(1&n),a=n<2?1:3+(n>>1),l=vi(e);for("H"!=l&&"k"!=l||(a=0);a-- >0;)i+="a";for(;o-- >0;)i=l+i}else i+="J"===s?"H":s}return i}(p,this.locale));var g={type:Re.dateTime,pattern:u,location:h.styleLocation,parsedOptions:this.shouldParseSkeletons?si(u):{}};return{val:{type:"date"===a?Ne.date:Ne.time,value:i,location:d,style:g},err:null}}return{val:{type:"number"===a?Ne.number:"date"===a?Ne.date:Ne.time,value:i,location:d,style:null!==(n=null==h?void 0:h.style)&&void 0!==n?n:null},err:null};case"plural":case"selectordinal":case"select":var _=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(Oe.EXPECT_SELECT_ARGUMENT_OPTIONS,xi(_,r({},_)));this.bumpSpace();var b=this.parseIdentifierIfPossible(),m=0;if("select"!==a&&"offset"===b.value){if(!this.bumpIf(":"))return this.error(Oe.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,xi(this.clonePosition(),this.clonePosition()));var v;if(this.bumpSpace(),(v=this.tryParseDecimalInteger(Oe.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,Oe.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err)return v;this.bumpSpace(),b=this.parseIdentifierIfPossible(),m=v.val}var y,f=this.tryParsePluralOrSelectOptions(t,a,e,b);if(f.err)return f;if((y=this.tryParseArgumentClose(s)).err)return y;var x=xi(s,this.clonePosition());return"select"===a?{val:{type:Ne.select,value:i,options:Hi(f.val),location:x},err:null}:{val:{type:Ne.plural,value:i,options:Hi(f.val),offset:m,pluralType:"plural"===a?"cardinal":"ordinal",location:x},err:null};default:return this.error(Oe.INVALID_ARGUMENT_TYPE,xi(o,l))}},t.prototype.tryParseArgumentClose=function(t){return this.isEOF()||125!==this.char()?this.error(Oe.EXPECT_ARGUMENT_CLOSING_BRACE,xi(t,this.clonePosition())):(this.bump(),{val:!0,err:null})},t.prototype.parseSimpleArgStyleIfPossible=function(){for(var t=0,e=this.clonePosition();!this.isEOF();){switch(this.char()){case 39:this.bump();var i=this.clonePosition();if(!this.bumpUntil("'"))return this.error(Oe.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,xi(i,this.clonePosition()));this.bump();break;case 123:t+=1,this.bump();break;case 125:if(!(t>0))return{val:this.message.slice(e.offset,this.offset()),err:null};t-=1;break;default:this.bump()}}return{val:this.message.slice(e.offset,this.offset()),err:null}},t.prototype.parseNumberSkeletonFromString=function(t,e){var i=[];try{i=function(t){if(0===t.length)throw new Error("Number skeleton cannot be empty");for(var e=t.split(ni).filter(function(t){return t.length>0}),i=[],r=0,s=e;r<s.length;r++){var n=s[r].split("/");if(0===n.length)throw new Error("Invalid number skeleton");for(var o=n[0],a=n.slice(1),l=0,h=a;l<h.length;l++)if(0===h[l].length)throw new Error("Invalid number skeleton");i.push({stem:o,options:a})}return i}(t)}catch(t){return this.error(Oe.INVALID_NUMBER_SKELETON,e)}return{val:{type:Re.number,tokens:i,location:e,parsedOptions:this.shouldParseSkeletons?_i(i):{}},err:null}},t.prototype.tryParsePluralOrSelectOptions=function(t,e,i,r){for(var s,n=!1,o=[],a=new Set,l=r.value,h=r.location;;){if(0===l.length){var c=this.clonePosition();if("select"===e||!this.bumpIf("="))break;var d=this.tryParseDecimalInteger(Oe.EXPECT_PLURAL_ARGUMENT_SELECTOR,Oe.INVALID_PLURAL_ARGUMENT_SELECTOR);if(d.err)return d;h=xi(c,this.clonePosition()),l=this.message.slice(c.offset,this.offset())}if(a.has(l))return this.error("select"===e?Oe.DUPLICATE_SELECT_ARGUMENT_SELECTOR:Oe.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,h);"other"===l&&(n=!0),this.bumpSpace();var p=this.clonePosition();if(!this.bumpIf("{"))return this.error("select"===e?Oe.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:Oe.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,xi(this.clonePosition(),this.clonePosition()));var u=this.parseMessage(t+1,e,i);if(u.err)return u;var g=this.tryParseArgumentClose(p);if(g.err)return g;o.push([l,{value:u.val,location:xi(p,this.clonePosition())}]),a.add(l),this.bumpSpace(),l=(s=this.parseIdentifierIfPossible()).value,h=s.location}return 0===o.length?this.error("select"===e?Oe.EXPECT_SELECT_ARGUMENT_SELECTOR:Oe.EXPECT_PLURAL_ARGUMENT_SELECTOR,xi(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!n?this.error(Oe.MISSING_OTHER_CLAUSE,xi(this.clonePosition(),this.clonePosition())):{val:o,err:null}},t.prototype.tryParseDecimalInteger=function(t,e){var i=1,r=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(i=-1);for(var s=!1,n=0;!this.isEOF();){var o=this.char();if(!(o>=48&&o<=57))break;s=!0,n=10*n+(o-48),this.bump()}var a=xi(r,this.clonePosition());return s?Ti(n*=i)?{val:n,err:null}:this.error(e,a):this.error(t,a)},t.prototype.offset=function(){return this.position.offset},t.prototype.isEOF=function(){return this.offset()===this.message.length},t.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},t.prototype.char=function(){var t=this.position.offset;if(t>=this.message.length)throw Error("out of bound");var e=Bi(this.message,t);if(void 0===e)throw Error("Offset ".concat(t," is at invalid UTF-16 code unit boundary"));return e},t.prototype.error=function(t,e){return{val:null,err:{kind:t,message:this.message,location:e}}},t.prototype.bump=function(){if(!this.isEOF()){var t=this.char();10===t?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=t<65536?1:2)}},t.prototype.bumpIf=function(t){if(ki(this.message,t,this.offset())){for(var e=0;e<t.length;e++)this.bump();return!0}return!1},t.prototype.bumpUntil=function(t){var e=this.offset(),i=this.message.indexOf(t,e);return i>=0?(this.bumpTo(i),!0):(this.bumpTo(this.message.length),!1)},t.prototype.bumpTo=function(t){if(this.offset()>t)throw Error("targetOffset ".concat(t," must be greater than or equal to the current offset ").concat(this.offset()));for(t=Math.min(t,this.message.length);;){var e=this.offset();if(e===t)break;if(e>t)throw Error("targetOffset ".concat(t," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},t.prototype.bumpSpace=function(){for(;!this.isEOF()&&ji(this.char());)this.bump()},t.prototype.peek=function(){if(this.isEOF())return null;var t=this.char(),e=this.offset(),i=this.message.charCodeAt(e+(t>=65536?2:1));return null!=i?i:null},t}();function Ui(t){return t>=97&&t<=122||t>=65&&t<=90}function zi(t){return 45===t||46===t||t>=48&&t<=57||95===t||t>=97&&t<=122||t>=65&&t<=90||183==t||t>=192&&t<=214||t>=216&&t<=246||t>=248&&t<=893||t>=895&&t<=8191||t>=8204&&t<=8205||t>=8255&&t<=8256||t>=8304&&t<=8591||t>=11264&&t<=12271||t>=12289&&t<=55295||t>=63744&&t<=64975||t>=65008&&t<=65533||t>=65536&&t<=983039}function ji(t){return t>=9&&t<=13||32===t||133===t||t>=8206&&t<=8207||8232===t||8233===t}function Gi(t){return t>=33&&t<=35||36===t||t>=37&&t<=39||40===t||41===t||42===t||43===t||44===t||45===t||t>=46&&t<=47||t>=58&&t<=59||t>=60&&t<=62||t>=63&&t<=64||91===t||92===t||93===t||94===t||96===t||123===t||124===t||125===t||126===t||161===t||t>=162&&t<=165||166===t||167===t||169===t||171===t||172===t||174===t||176===t||177===t||182===t||187===t||191===t||215===t||247===t||t>=8208&&t<=8213||t>=8214&&t<=8215||8216===t||8217===t||8218===t||t>=8219&&t<=8220||8221===t||8222===t||8223===t||t>=8224&&t<=8231||t>=8240&&t<=8248||8249===t||8250===t||t>=8251&&t<=8254||t>=8257&&t<=8259||8260===t||8261===t||8262===t||t>=8263&&t<=8273||8274===t||8275===t||t>=8277&&t<=8286||t>=8592&&t<=8596||t>=8597&&t<=8601||t>=8602&&t<=8603||t>=8604&&t<=8607||8608===t||t>=8609&&t<=8610||8611===t||t>=8612&&t<=8613||8614===t||t>=8615&&t<=8621||8622===t||t>=8623&&t<=8653||t>=8654&&t<=8655||t>=8656&&t<=8657||8658===t||8659===t||8660===t||t>=8661&&t<=8691||t>=8692&&t<=8959||t>=8960&&t<=8967||8968===t||8969===t||8970===t||8971===t||t>=8972&&t<=8991||t>=8992&&t<=8993||t>=8994&&t<=9e3||9001===t||9002===t||t>=9003&&t<=9083||9084===t||t>=9085&&t<=9114||t>=9115&&t<=9139||t>=9140&&t<=9179||t>=9180&&t<=9185||t>=9186&&t<=9254||t>=9255&&t<=9279||t>=9280&&t<=9290||t>=9291&&t<=9311||t>=9472&&t<=9654||9655===t||t>=9656&&t<=9664||9665===t||t>=9666&&t<=9719||t>=9720&&t<=9727||t>=9728&&t<=9838||9839===t||t>=9840&&t<=10087||10088===t||10089===t||10090===t||10091===t||10092===t||10093===t||10094===t||10095===t||10096===t||10097===t||10098===t||10099===t||10100===t||10101===t||t>=10132&&t<=10175||t>=10176&&t<=10180||10181===t||10182===t||t>=10183&&t<=10213||10214===t||10215===t||10216===t||10217===t||10218===t||10219===t||10220===t||10221===t||10222===t||10223===t||t>=10224&&t<=10239||t>=10240&&t<=10495||t>=10496&&t<=10626||10627===t||10628===t||10629===t||10630===t||10631===t||10632===t||10633===t||10634===t||10635===t||10636===t||10637===t||10638===t||10639===t||10640===t||10641===t||10642===t||10643===t||10644===t||10645===t||10646===t||10647===t||10648===t||t>=10649&&t<=10711||10712===t||10713===t||10714===t||10715===t||t>=10716&&t<=10747||10748===t||10749===t||t>=10750&&t<=11007||t>=11008&&t<=11055||t>=11056&&t<=11076||t>=11077&&t<=11078||t>=11079&&t<=11084||t>=11085&&t<=11123||t>=11124&&t<=11125||t>=11126&&t<=11157||11158===t||t>=11159&&t<=11263||t>=11776&&t<=11777||11778===t||11779===t||11780===t||11781===t||t>=11782&&t<=11784||11785===t||11786===t||11787===t||11788===t||11789===t||t>=11790&&t<=11798||11799===t||t>=11800&&t<=11801||11802===t||11803===t||11804===t||11805===t||t>=11806&&t<=11807||11808===t||11809===t||11810===t||11811===t||11812===t||11813===t||11814===t||11815===t||11816===t||11817===t||t>=11818&&t<=11822||11823===t||t>=11824&&t<=11833||t>=11834&&t<=11835||t>=11836&&t<=11839||11840===t||11841===t||11842===t||t>=11843&&t<=11855||t>=11856&&t<=11857||11858===t||t>=11859&&t<=11903||t>=12289&&t<=12291||12296===t||12297===t||12298===t||12299===t||12300===t||12301===t||12302===t||12303===t||12304===t||12305===t||t>=12306&&t<=12307||12308===t||12309===t||12310===t||12311===t||12312===t||12313===t||12314===t||12315===t||12316===t||12317===t||t>=12318&&t<=12319||12320===t||12336===t||64830===t||64831===t||t>=65093&&t<=65094}function Vi(t){t.forEach(function(t){if(delete t.location,Ye(t)||We(t))for(var e in t.options)delete t.options[e].location,Vi(t.options[e].value);else Ke(t)&&ti(t.style)||(Ze(t)||Xe(t))&&ei(t.style)?delete t.style.location:Qe(t)&&Vi(t.children)})}function qi(t,e){void 0===e&&(e={}),e=r({shouldParseSkeletons:!0,requiresOtherClause:!0},e);var i=new Ri(t,e).parse();if(i.err){var s=SyntaxError(Oe[i.err.kind]);throw s.location=i.err.location,s.originalMessage=i.err.message,s}return(null==e?void 0:e.captureLocation)||Vi(i.val),i.val}!function(t){t.MISSING_VALUE="MISSING_VALUE",t.INVALID_VALUE="INVALID_VALUE",t.MISSING_INTL_API="MISSING_INTL_API"}(Ni||(Ni={}));var Ki,Zi=function(t){function e(e,i,r){var s=t.call(this,e)||this;return s.code=i,s.originalMessage=r,s}return i(e,t),e.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},e}(Error),Xi=function(t){function e(e,i,r,s){return t.call(this,'Invalid values for "'.concat(e,'": "').concat(i,'". Options are "').concat(Object.keys(r).join('", "'),'"'),Ni.INVALID_VALUE,s)||this}return i(e,t),e}(Zi),Yi=function(t){function e(e,i,r){return t.call(this,'Value for "'.concat(e,'" must be of type ').concat(i),Ni.INVALID_VALUE,r)||this}return i(e,t),e}(Zi),Wi=function(t){function e(e,i){return t.call(this,'The intl string context variable "'.concat(e,'" was not provided to the string "').concat(i,'"'),Ni.MISSING_VALUE,i)||this}return i(e,t),e}(Zi);function Ji(t){return"function"==typeof t}function Qi(t,e,i,r,s,n,o){if(1===t.length&&Ve(t[0]))return[{type:Ki.literal,value:t[0].value}];for(var a=[],l=0,h=t;l<h.length;l++){var c=h[l];if(Ve(c))a.push({type:Ki.literal,value:c.value});else if(Je(c))"number"==typeof n&&a.push({type:Ki.literal,value:i.getNumberFormat(e).format(n)});else{var d=c.value;if(!s||!(d in s))throw new Wi(d,o);var p=s[d];if(qe(c))p&&"string"!=typeof p&&"number"!=typeof p||(p="string"==typeof p||"number"==typeof p?String(p):""),a.push({type:"string"==typeof p?Ki.literal:Ki.object,value:p});else if(Ze(c)){var u="string"==typeof c.style?r.date[c.style]:ei(c.style)?c.style.parsedOptions:void 0;a.push({type:Ki.literal,value:i.getDateTimeFormat(e,u).format(p)})}else if(Xe(c)){u="string"==typeof c.style?r.time[c.style]:ei(c.style)?c.style.parsedOptions:r.time.medium;a.push({type:Ki.literal,value:i.getDateTimeFormat(e,u).format(p)})}else if(Ke(c)){(u="string"==typeof c.style?r.number[c.style]:ti(c.style)?c.style.parsedOptions:void 0)&&u.scale&&(p*=u.scale||1),a.push({type:Ki.literal,value:i.getNumberFormat(e,u).format(p)})}else{if(Qe(c)){var g=c.children,_=c.value,b=s[_];if(!Ji(b))throw new Yi(_,"function",o);var m=b(Qi(g,e,i,r,s,n).map(function(t){return t.value}));Array.isArray(m)||(m=[m]),a.push.apply(a,m.map(function(t){return{type:"string"==typeof t?Ki.literal:Ki.object,value:t}}))}if(Ye(c)){if(!(v=c.options[p]||c.options.other))throw new Xi(c.value,p,Object.keys(c.options),o);a.push.apply(a,Qi(v.value,e,i,r,s))}else if(We(c)){var v;if(!(v=c.options["=".concat(p)])){if(!Intl.PluralRules)throw new Zi('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',Ni.MISSING_INTL_API,o);var y=i.getPluralRules(e,{type:c.pluralType}).select(p-(c.offset||0));v=c.options[y]||c.options.other}if(!v)throw new Xi(c.value,p,Object.keys(c.options),o);a.push.apply(a,Qi(v.value,e,i,r,s,p-(c.offset||0)))}else;}}}return function(t){return t.length<2?t:t.reduce(function(t,e){var i=t[t.length-1];return i&&i.type===Ki.literal&&e.type===Ki.literal?i.value+=e.value:t.push(e),t},[])}(a)}function tr(t,e){return e?Object.keys(t).reduce(function(i,s){var n,o;return i[s]=(n=t[s],(o=e[s])?r(r(r({},n||{}),o||{}),Object.keys(n).reduce(function(t,e){return t[e]=r(r({},n[e]),o[e]||{}),t},{})):n),i},r({},t)):t}function er(t){return{create:function(){return{get:function(e){return t[e]},set:function(e,i){t[e]=i}}}}}!function(t){t[t.literal=0]="literal",t[t.object=1]="object"}(Ki||(Ki={}));var ir=function(){function t(e,i,s,o){void 0===i&&(i=t.defaultLocale);var a,l=this;if(this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(t){var e=l.formatToParts(t);if(1===e.length)return e[0].value;var i=e.reduce(function(t,e){return t.length&&e.type===Ki.literal&&"string"==typeof t[t.length-1]?t[t.length-1]+=e.value:t.push(e.value),t},[]);return i.length<=1?i[0]||"":i},this.formatToParts=function(t){return Qi(l.ast,l.locales,l.formatters,l.formats,t,void 0,l.message)},this.resolvedOptions=function(){var t;return{locale:(null===(t=l.resolvedLocale)||void 0===t?void 0:t.toString())||Intl.NumberFormat.supportedLocalesOf(l.locales)[0]}},this.getAst=function(){return l.ast},this.locales=i,this.resolvedLocale=t.resolveLocale(i),"string"==typeof e){if(this.message=e,!t.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");var h=o||{};h.formatters;var c=function(t,e){var i={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(i[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(i[r[s]]=t[r[s]])}return i}(h,["formatters"]);this.ast=t.__parse(e,r(r({},c),{locale:this.resolvedLocale}))}else this.ast=e;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=tr(t.formats,s),this.formatters=o&&o.formatters||(void 0===(a=this.formatterCache)&&(a={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:He(function(){for(var t,e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return new((t=Intl.NumberFormat).bind.apply(t,n([void 0],e,!1)))},{cache:er(a.number),strategy:Ge.variadic}),getDateTimeFormat:He(function(){for(var t,e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return new((t=Intl.DateTimeFormat).bind.apply(t,n([void 0],e,!1)))},{cache:er(a.dateTime),strategy:Ge.variadic}),getPluralRules:He(function(){for(var t,e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return new((t=Intl.PluralRules).bind.apply(t,n([void 0],e,!1)))},{cache:er(a.pluralRules),strategy:Ge.variadic})})}return Object.defineProperty(t,"defaultLocale",{get:function(){return t.memoizedDefaultLocale||(t.memoizedDefaultLocale=(new Intl.NumberFormat).resolvedOptions().locale),t.memoizedDefaultLocale},enumerable:!1,configurable:!0}),t.memoizedDefaultLocale=null,t.resolveLocale=function(t){if(void 0!==Intl.Locale){var e=Intl.NumberFormat.supportedLocalesOf(t);return e.length>0?new Intl.Locale(e[0]):new Intl.Locale("string"==typeof t?t:t[0])}},t.__parse=qi,t.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},t}(),rr={en:Pe,de:Ie};function sr(t,e,...i){const r=e.replace(/['"]+/g,"");var s;try{s=t.split(".").reduce((t,e)=>t[e],rr[r])}catch(e){s=t.split(".").reduce((t,e)=>t[e],rr.en)}if(void 0===s&&(s=t.split(".").reduce((t,e)=>t[e],rr.en)),!i.length)return s;const n={};for(let t=0;t<i.length;t+=2){let e=i[t];e=e.replace(/^{([^}]+)?}$/,"$1"),n[e]=i[t+1]}try{return new ir(s,e).format(n)}catch(t){return"Translation "+t}}var nr="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const or=1,ar=2,lr=t=>(...e)=>({_$litDirective$:t,values:e});let hr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const cr=lr(class extends hr{constructor(t){if(super(t),t.type!==or||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const r=!!e[t];r===this.st.has(t)||this.nt?.has(t)||(r?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return Y}});
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function*dr(t,e){if(void 0!==t){let i=0;for(const r of t)yield e(r,i++)}}
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const pr="important",ur=" !"+pr,gr=lr(class extends hr{constructor(t){if(super(t),t.type!==or||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const r=t[i];return null==r?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const r=e[t];if(null!=r){this.ft.add(t);const e="string"==typeof r&&r.endsWith(ur);t.includes("-")||e?i.setProperty(t,e?r.slice(0,-11):r,e?pr:""):i[t]=r}}return Y}}),{I:_r}=ct,br=t=>t,mr=()=>document.createComment(""),vr=(t,e,i)=>{const r=t._$AA.parentNode,s=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=r.insertBefore(mr(),s),n=r.insertBefore(mr(),s);i=new _r(e,n,t,t.options)}else{const e=i._$AB.nextSibling,n=i._$AM,o=n!==t;if(o){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==n._$AU&&i._$AP(e)}if(e!==s||o){let t=i._$AA;for(;t!==e;){const e=br(t).nextSibling;br(r).insertBefore(t,s),t=e}}}return i},yr=(t,e,i=t)=>(t._$AI(e,i),t),fr={},xr=(t,e=fr)=>t._$AH=e,Er=t=>{t._$AR(),t._$AA.remove()},wr=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),wr(t,e);return!0},$r=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},Sr=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),Tr(e)}};
/**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function Pr(t){void 0!==this._$AN?($r(this),this._$AM=t,Sr(this)):this._$AM=t}function Ar(t,e=!1,i=0){const r=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(r))for(let t=i;t<r.length;t++)wr(r[t],!1),$r(r[t]);else null!=r&&(wr(r,!1),$r(r));else wr(this,t)}const Tr=t=>{t.type==ar&&(t._$AP??=Ar,t._$AQ??=Pr)};class Cr extends hr{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),Sr(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(wr(this,t),$r(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const Dr=new WeakMap;let kr=0;const Ir=new Map,Hr=new WeakSet,Br=()=>new Promise(t=>requestAnimationFrame(t)),Mr=(t,e)=>{const i=t-e;return 0===i?void 0:i},Fr=(t,e)=>{const i=t/e;return 1===i?void 0:i},Lr={left:(t,e)=>{const i=Mr(t,e);return{value:i,transform:null==i||isNaN(i)?void 0:`translateX(${i}px)`}},top:(t,e)=>{const i=Mr(t,e);return{value:i,transform:null==i||isNaN(i)?void 0:`translateY(${i}px)`}},width:(t,e)=>{let i;0===e&&(e=1,i={width:"1px"});const r=Fr(t,e);return{value:r,overrideFrom:i,transform:null==r||isNaN(r)?void 0:`scaleX(${r})`}},height:(t,e)=>{let i;0===e&&(e=1,i={height:"1px"});const r=Fr(t,e);return{value:r,overrideFrom:i,transform:null==r||isNaN(r)?void 0:`scaleY(${r})`}}},Or={duration:333,easing:"ease-in-out"},Nr=["left","top","width","height","opacity","color","background"],Rr=new WeakMap;const Ur=lr(class extends Cr{constructor(t){if(super(t),this.t=!1,this.i=null,this.o=null,this.h=!0,this.shouldLog=!1,t.type===ar)throw Error("The `animate` directive must be used in attribute position.");this.createFinished()}createFinished(){this.resolveFinished?.(),this.finished=new Promise(t=>{this.l=t})}async resolveFinished(){this.l?.(),this.l=void 0}render(t){return W}getController(){return Dr.get(this.u)}isDisabled(){return this.options.disabled||this.getController()?.disabled}update(t,[e]){const i=void 0===this.u;return i&&(this.u=t.options?.host,this.u.addController(this),this.u.updateComplete.then(t=>this.t=!0),this.element=t.element,Rr.set(this.element,this)),this.optionsOrCallback=e,(i||"function"!=typeof e)&&this.m(e),this.render(e)}m(t){t=t??{};const e=this.getController();void 0!==e&&((t={...e.defaultOptions,...t}).keyframeOptions={...e.defaultOptions.keyframeOptions,...t.keyframeOptions}),t.properties??=Nr,this.options=t}p(){const t={},e=this.element.getBoundingClientRect(),i=getComputedStyle(this.element);return this.options.properties.forEach(r=>{const s=e[r]??(Lr[r]?void 0:i[r]),n=Number(s);t[r]=isNaN(n)?s+"":n}),t}v(){let t,e=!0;return this.options.guard&&(t=this.options.guard(),e=((t,e)=>{if(Array.isArray(t)){if(Array.isArray(e)&&e.length===t.length&&t.every((t,i)=>t===e[i]))return!1}else if(e===t)return!1;return!0})(t,this._)),this.h=this.t&&!this.isDisabled()&&!this.isAnimating()&&e&&this.element.isConnected,this.h&&(this._=Array.isArray(t)?Array.from(t):t),this.h}hostUpdate(){"function"==typeof this.optionsOrCallback&&this.m(this.optionsOrCallback()),this.v()&&(this.A=this.p(),this.i=this.i??this.element.parentNode,this.o=this.element.nextSibling)}async hostUpdated(){if(!this.h||!this.element.isConnected||this.options.skipInitial&&!this.isHostRendered)return;let t;this.prepare(),await Br;const e=this.P(),i=this.V(this.options.keyframeOptions,e),r=this.p();if(void 0!==this.A){const{from:i,to:s}=this.O(this.A,r,e);this.log("measured",[this.A,r,i,s]),t=this.calculateKeyframes(i,s)}else{const i=Ir.get(this.options.inId);if(i){Ir.delete(this.options.inId);const{from:s,to:n}=this.O(i,r,e);t=this.calculateKeyframes(s,n),t=this.options.in?[{...this.options.in[0],...t[0]},...this.options.in.slice(1),t[1]]:t,kr++,t.forEach(t=>t.zIndex=kr)}else this.options.in&&(t=[...this.options.in,{}])}this.animate(t,i)}resetStyles(){void 0!==this.j&&(this.element.setAttribute("style",this.j??""),this.j=void 0)}commitStyles(){this.j=this.element.getAttribute("style"),this.webAnimation?.commitStyles(),this.webAnimation?.cancel()}reconnected(){}async disconnected(){if(!this.h)return;if(void 0!==this.options.id&&Ir.set(this.options.id,this.A),void 0===this.options.out)return;if(this.prepare(),await Br(),this.i?.isConnected){const t=this.o&&this.o.parentNode===this.i?this.o:null;if(this.i.insertBefore(this.element,t),this.options.stabilizeOut){const t=this.p();this.log("stabilizing out");const e=this.A.left-t.left,i=this.A.top-t.top;!("static"===getComputedStyle(this.element).position)||0===e&&0===i||(this.element.style.position="relative"),0!==e&&(this.element.style.left=e+"px"),0!==i&&(this.element.style.top=i+"px")}}const t=this.V(this.options.keyframeOptions);await this.animate(this.options.out,t),this.element.remove()}prepare(){this.createFinished()}start(){this.options.onStart?.(this)}didFinish(t){t&&this.options.onComplete?.(this),this.A=void 0,this.animatingProperties=void 0,this.frames=void 0,this.resolveFinished()}P(){const t=[];for(let e=this.element.parentNode;e;e=e?.parentNode){const i=Rr.get(e);i&&!i.isDisabled()&&i&&t.push(i)}return t}get isHostRendered(){const t=Hr.has(this.u);return t||this.u.updateComplete.then(()=>{Hr.add(this.u)}),t}V(t,e=this.P()){const i={...Or};return e.forEach(t=>Object.assign(i,t.options.keyframeOptions)),Object.assign(i,t),i}O(t,e,i){t={...t},e={...e};const r=i.map(t=>t.animatingProperties).filter(t=>void 0!==t);let s=1,n=1;return r.length>0&&(r.forEach(t=>{t.width&&(s/=t.width),t.height&&(n/=t.height)}),void 0!==t.left&&void 0!==e.left&&(t.left=s*t.left,e.left=s*e.left),void 0!==t.top&&void 0!==e.top&&(t.top=n*t.top,e.top=n*e.top)),{from:t,to:e}}calculateKeyframes(t,e,i=!1){const r={},s={};let n=!1;const o={};for(const i in e){const a=t[i],l=e[i];if(i in Lr){const t=Lr[i];if(void 0===a||void 0===l)continue;const e=t(a,l);void 0!==e.transform&&(o[i]=e.value,n=!0,r.transform=`${r.transform??""} ${e.transform}`,void 0!==e.overrideFrom&&Object.assign(r,e.overrideFrom))}else a!==l&&void 0!==a&&void 0!==l&&(n=!0,r[i]=a,s[i]=l)}return r.transformOrigin=s.transformOrigin=i?"center center":"top left",this.animatingProperties=o,n?[r,s]:void 0}async animate(t,e=this.options.keyframeOptions){this.start(),this.frames=t;let i=!1;if(!this.isAnimating()&&!this.isDisabled()&&(this.options.onFrames&&(this.frames=t=this.options.onFrames(this),this.log("modified frames",t)),void 0!==t)){this.log("animate",[t,e]),i=!0,this.webAnimation=this.element.animate(t,e);const r=this.getController();r?.add(this);try{await this.webAnimation.finished}catch(t){}r?.remove(this)}return this.didFinish(i),i}isAnimating(){return"running"===this.webAnimation?.playState||this.webAnimation?.pending}log(t,e){this.shouldLog&&!this.isDisabled()&&console.log(t,this.options.id,e)}}),zr=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.get(t)||window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:r}=e;return{kind:i,elements:r,finisher(e){window.customElements.get(t)||window.customElements.define(t,e)}}})(t,e);let jr=class extends ut{constructor(){super(...arguments),this.camImgString="none",this._handleToggleClick=()=>{this.toggleVideo&&this.toggleVideo()}}willUpdate(t){super.willUpdate(t),(t.has("showVideo")||t.has("cameraEntity"))&&(this.camImgString=this.showVideo&&this.cameraEntity?`url('${function(t){const e=t.attributes.access_token;return`${window.location.origin}/api/camera_proxy_stream/${t.entity_id}?token=${e}`}(this.cameraEntity)}')`:"none")}render(){const t={display:this.showVideo?"block":"none"};return X`
      <div
        class="ac-printercard-cameraview"
        style=${gr(t)}
        @click=${this._handleToggleClick}
      >
        ${this.showVideo?this._renderInner():W}
      </div>
    `}_renderInner(){const t={"background-image":this.camImgString};return X` <div
      class="ac-camera-wrapper"
      style=${gr(t)}
    ></div>`}static get styles(){return p`
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
    `}};s([vt({attribute:"show-video"})],jr.prototype,"showVideo",void 0),s([vt({attribute:"toggle-video"})],jr.prototype,"toggleVideo",void 0),s([vt({attribute:"camera-entity"})],jr.prototype,"cameraEntity",void 0),s([yt()],jr.prototype,"camImgString",void 0),jr=s([zr("anycubic-printercard-camera_view")],jr);let Gr=class extends ut{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this._handleClick=()=>{this.disabled||xt(this,"ac-toggle-change",{checked:!this.checked})}}render(){return X`
      <button
        class="ac-toggle ${this.checked?"ac-toggle-on":""}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <span class="ac-toggle-knob"></span>
      </button>
    `}static get styles(){return p`
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
    `}};s([vt({type:Boolean})],Gr.prototype,"checked",void 0),s([vt({type:Boolean})],Gr.prototype,"disabled",void 0),Gr=s([zr("anycubic-ui-toggle-switch")],Gr);const Vr="secondary_",qr="multi_color_box_runout_refill",Kr=Vr+qr,Zr="ace_spools",Xr=Vr+Zr;let Yr=class extends ut{constructor(){super(...arguments),this.box_id=0,this._runoutRefillId=qr,this._spoolsEntityId=Zr,this.spoolList=[],this.selectedIndex=-1,this.selectedMaterialType="",this.selectedColor=[0,0,0],this._changingRunout=!1,this._openDryingModal=()=>{xt(this,"ac-mcbdry-modal",{modalOpen:!0,box_id:this.box_id})},this._handleRunoutRefillChanged=t=>{this._changingRunout||(this._changingRunout=!0,this.hass.callService("switch","toggle",{entity_id:Vt(this.printerEntities,"switch",this._runoutRefillId)}).then(()=>{this._changingRunout=!1}).catch(t=>{this._changingRunout=!1}))},this._editSpool=t=>{const e=t.currentTarget.index,i=t.currentTarget.material_type,r=t.currentTarget.color;xt(this,"ac-mcb-modal",{modalOpen:!0,box_id:this.box_id,spool_index:e,material_type:i,color:r})}}willUpdate(t){if(super.willUpdate(t),t.has("language")&&(this._buttonRefill=sr("card.buttons.runout_refill",this.language),this._buttonDry=sr("card.buttons.dry",this.language)),t.has("box_id")&&(1===this.box_id?(this._runoutRefillId=Kr,this._spoolsEntityId=Xr):(this._runoutRefillId=qr,this._spoolsEntityId=Zr)),t.has("box_id")||t.has("hass")||t.has("printerEntities")||t.has("printerEntityIdPart")){const t=ie(this.hass,this.printerEntities,this.printerEntityIdPart,this._spoolsEntityId,"not loaded",{spool_info:[]}).attributes.spool_info;this.spoolList=Array.isArray(t)?t:[],this._runoutRefillState=Wt(this.hass,this.printerEntities,this.printerEntityIdPart,this._runoutRefillId)}}render(){var t;return X`
      <div class="ac-printercard-mcbview">
        <div class="ac-printercard-mcbmenu ac-printercard-menuleft">
          <div class="ac-switch">
            <div class="ac-switch-label">${this._buttonRefill}</div>
            <anycubic-ui-toggle-switch
              .checked=${"on"===(null===(t=this._runoutRefillState)||void 0===t?void 0:t.state)}
              .disabled=${this._changingRunout||!this._runoutRefillState||"unavailable"===this._runoutRefillState.state}
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
    `}_renderSpools(){return dr(this.spoolList,(t,e)=>{const i={"background-color":t.spool_loaded?`rgb(${t.color[0]}, ${t.color[1]}, ${t.color[2]})`:"#aaa"};return X`
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
                style=${gr(i)}
              >
                <div class="ac-spool-color-num">${e+1}</div>
              </div>
            </div>
            <div class="ac-spool-material-type">
              ${t.spool_loaded?t.material_type:"---"}
            </div>
          </div>
        `})}static get styles(){return p`
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
    `}};s([vt()],Yr.prototype,"hass",void 0),s([vt()],Yr.prototype,"language",void 0),s([vt({attribute:"printer-entities"})],Yr.prototype,"printerEntities",void 0),s([vt({attribute:"printer-entity-id-part"})],Yr.prototype,"printerEntityIdPart",void 0),s([vt()],Yr.prototype,"box_id",void 0),s([yt()],Yr.prototype,"_runoutRefillId",void 0),s([yt()],Yr.prototype,"_spoolsEntityId",void 0),s([yt()],Yr.prototype,"spoolList",void 0),s([yt()],Yr.prototype,"selectedIndex",void 0),s([yt()],Yr.prototype,"selectedMaterialType",void 0),s([yt()],Yr.prototype,"selectedColor",void 0),s([yt()],Yr.prototype,"_runoutRefillState",void 0),s([yt()],Yr.prototype,"_buttonRefill",void 0),s([yt()],Yr.prototype,"_buttonDry",void 0),s([yt()],Yr.prototype,"_changingRunout",void 0),Yr=s([zr("anycubic-printercard-multicolorbox_view")],Yr);class Wr{constructor(t){this.scale_factor=t}val(t){return this.scale_factor*t}og(t){return t/this.scale_factor}scaleFactor(){return this.scale_factor}}const Jr={top:{width:340,height:20},bottom:{width:340,height:52.3},left:{width:30,height:400},right:{width:30,height:380},buildplate:{maxWidth:250,maxHeight:260,verticalOffset:55},xAxis:{stepper:!0,width:400,offsetLeft:-30,height:30,extruder:{width:60,height:100}}};class Qr{constructor(t,{target:e,config:i,callback:r,skipInitial:s}){this.t=new Set,this.o=!1,this.i=!1,this.h=t,null!==e&&this.t.add(e??t),this.l=i,this.o=s??this.o,this.callback=r,window.ResizeObserver?(this.u=new ResizeObserver(t=>{this.handleChanges(t),this.h.requestUpdate()}),t.addController(this)):console.warn("ResizeController error: browser does not support ResizeObserver.")}handleChanges(t){this.value=this.callback?.(t,this.u)}hostConnected(){for(const t of this.t)this.observe(t)}hostDisconnected(){this.disconnect()}async hostUpdated(){!this.o&&this.i&&this.handleChanges([]),this.i=!1}observe(t){this.t.add(t),this.u.observe(t,this.l),this.i=!0,this.h.requestUpdate()}unobserve(t){this.t.delete(t),this.u.unobserve(t)}disconnect(){this.u.disconnect()}target(t){return ts(this,t)}}const ts=lr(class extends Cr{constructor(){super(...arguments),this.observing=!1}render(t,e){}update(t,[e,i]){this.controller=e,this.part=t,this.observe=i,!1===i?(e.unobserve(t.element),this.observing=!1):!1===this.observing&&(e.observe(t.element),this.observing=!0)}disconnected(){this.controller?.unobserve(this.part.element),this.observing=!1}reconnected(){!1!==this.observe&&!1===this.observing&&(this.controller?.observe(this.part.element),this.observing=!0)}}),es={keyframeOptions:{duration:2e3,direction:"alternate",composite:"add"},properties:["left"]},is={keyframeOptions:{duration:100,composite:"add"},properties:["top"]};let rs=class extends ut{constructor(){super(...arguments),this._progressNum=0,this.animKeyframeGantry=0,this._isPrinting=!1,this._gantryAnimOptions=()=>Object.assign(Object.assign({},es),{onComplete:this._moveGantry,disabled:!(this.dimensions&&this._isPrinting)}),this._onResizeEvent=()=>{if(this._rootElement){const t=this._rootElement.clientHeight,e=this._rootElement.clientWidth;this._setDimensions(e,t)}},this._moveGantry=()=>{this.animKeyframeGantry=this._isPrinting?Number(!this.animKeyframeGantry):0}}connectedCallback(){super.connectedCallback(),this.resizeObserver=new Qr(this,{callback:this._onResizeEvent}),this.dimensions&&this._isPrinting&&this._moveGantry()}disconnectedCallback(){super.disconnectedCallback()}willUpdate(t){if(super.willUpdate(t),t.has("scaleFactor")&&this._onResizeEvent(),t.has("hass")||t.has("printerEntities")||t.has("printerEntityIdPart")){const t=ee(this.hass,this.printerEntities,this.printerEntityIdPart,"job_image_url");this.imagePreviewUrl!==t&&(this.imagePreviewUrl=t,this.imagePreviewBgUrl=this.imagePreviewUrl?`url('${t}')`:void 0),this._progressNum=Number(ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_progress",0).state)/100;const e=ce(ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_state").state.toLowerCase());this.dimensions&&!this._isPrinting&&e&&this._moveGantry(),this._isPrinting=e}}update(t){if(super.update(t),(t.has("dimensions")||t.has("animKeyframeGantry")||t.has("hass"))&&this.dimensions){const e=-1*this._progressNum*this.dimensions.BuildArea.height;Ht(this._elAcAPr_xaxis,Object.assign(Object.assign({},this.dimensions.XAxis),{top:this.dimensions.XAxis.top+e})),Ht(this._elAcAPr_gantry,Object.assign(Object.assign({},this.dimensions.Gantry),{left:0!==this.animKeyframeGantry?this.dimensions.Gantry.left+this.dimensions.BuildPlate.width:this.dimensions.Gantry.left,top:this.dimensions.Gantry.top+e})),Ht(this._elAcAPr_animprint,{height:100*this._progressNum+"%"}),t.has("dimensions")&&this.dimensions&&(Ht(this._elAcAPr_scalable,Object.assign({},this.dimensions.Scalable)),Ht(this._elAcAPr_frame,Object.assign({},this.dimensions.Frame)),Ht(this._elAcAPr_hole,Object.assign({},this.dimensions.Hole)),Ht(this._elAcAPr_buildarea,Object.assign({},this.dimensions.BuildArea)),Ht(this._elAcAPr_buildplate,Object.assign({},this.dimensions.BuildPlate)),Ht(this._elAcAPr_nozzle,Object.assign({},this.dimensions.Nozzle)))}}render(){const t={"background-image":this.imagePreviewBgUrl};return X`
      <div class="ac-printercard-animatedprinter">
        ${this.dimensions?X` <div class="ac-apr-scalable">
                <div class="ac-apr-frame">
                  <div class="ac-apr-hole"></div>
                </div>
                <div class="ac-apr-buildarea">
                  <div class="ac-apr-animprint">
                    ${this.imagePreviewBgUrl?X`
                            <div
                              class="ac-apr-imgprev"
                              style=${gr(t)}
                            ></div>
                          `:W}
                  </div>
                </div>
                <div class="ac-apr-buildplate"></div>
                <div
                  class="ac-apr-xaxis"
                  ${Ur(Object.assign({},is))}
                ></div>
                <div
                  class="ac-apr-gantry"
                  ${Ur(Object.assign({},is))}
                  ${Ur(this._gantryAnimOptions)}
                >
                  <div class="ac-apr-nozzle"></div>
                </div>
              </div>`:W}
      </div>
    `}_setDimensions(t,e){this.dimensions=function(t,e,i){const r=e.height/(t.top.height+t.bottom.height+t.left.height),s=e.width/(t.top.width+t.left.width+t.right.width),n=new Wr(Math.min(r,s)*i),o=n.val(t.top.width),a=n.val(t.top.height+t.bottom.height+t.left.height),l=n.val(t.top.width-(t.left.width+t.right.width)),h=n.val(t.left.height),c=n.val(t.left.width),d=n.val(t.top.height),p=n.val(t.top.height-t.buildplate.verticalOffset)+h,u=p+n.val((t.xAxis.extruder.height-t.xAxis.height)/2-(t.xAxis.extruder.height+12)),g=n.val(t.buildplate.maxWidth),_=n.val(t.buildplate.maxHeight),b=n.val(t.left.width+(n.og(l)-t.buildplate.maxWidth)/2),m=p-n.val(t.buildplate.maxHeight),v=g,y=b,f=p,x=n.val(t.xAxis.width),E=n.val(t.xAxis.height),w=n.val(t.xAxis.offsetLeft),$=x,S=E,P=n.val(t.xAxis.extruder.width),A=n.val(t.xAxis.extruder.height),T=y-P/2,C=T+g,D=n.val(12),k=n.val(12),I=f-A-k;return{Scalable:{width:o,height:a},Frame:{width:o,height:a},Hole:{width:l,height:h,left:c,top:d},BuildArea:{width:g,height:_,left:b,top:m},BuildPlate:{width:v,left:y,top:f},XAxis:{width:x,height:E,left:w,top:I+.7*A-E/2},Track:{width:$,height:S},Basis:{Y:p,X:u},Gantry:{width:P,height:A,left:T,top:I},Nozzle:{width:D,height:k,left:(P-D)/2,top:A},GantryMaxLeft:C}}(this.printerConfig,{width:t,height:e},this.scaleFactor||1)}static get styles(){return p`
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
    `}};s([ft(".ac-printercard-animatedprinter")],rs.prototype,"_rootElement",void 0),s([ft(".ac-apr-scalable")],rs.prototype,"_elAcAPr_scalable",void 0),s([ft(".ac-apr-frame")],rs.prototype,"_elAcAPr_frame",void 0),s([ft(".ac-apr-hole")],rs.prototype,"_elAcAPr_hole",void 0),s([ft(".ac-apr-buildarea")],rs.prototype,"_elAcAPr_buildarea",void 0),s([ft(".ac-apr-animprint")],rs.prototype,"_elAcAPr_animprint",void 0),s([ft(".ac-apr-buildplate")],rs.prototype,"_elAcAPr_buildplate",void 0),s([ft(".ac-apr-xaxis")],rs.prototype,"_elAcAPr_xaxis",void 0),s([ft(".ac-apr-gantry")],rs.prototype,"_elAcAPr_gantry",void 0),s([ft(".ac-apr-nozzle")],rs.prototype,"_elAcAPr_nozzle",void 0),s([vt()],rs.prototype,"hass",void 0),s([vt({attribute:"scale-factor"})],rs.prototype,"scaleFactor",void 0),s([vt({attribute:"printer-config"})],rs.prototype,"printerConfig",void 0),s([vt({attribute:"printer-entities"})],rs.prototype,"printerEntities",void 0),s([vt({attribute:"printer-entity-id-part"})],rs.prototype,"printerEntityIdPart",void 0),s([yt()],rs.prototype,"dimensions",void 0),s([yt()],rs.prototype,"resizeObserver",void 0),s([yt()],rs.prototype,"_progressNum",void 0),s([yt()],rs.prototype,"animKeyframeGantry",void 0),s([yt()],rs.prototype,"_isPrinting",void 0),s([yt()],rs.prototype,"imagePreviewUrl",void 0),s([yt()],rs.prototype,"imagePreviewBgUrl",void 0),rs=s([zr("anycubic-printercard-animated_printer")],rs);let ss=class extends ut{constructor(){super(...arguments),this._viewClick=()=>{this.toggleVideo&&this.toggleVideo()}}render(){return X`
      <div class="ac-printercard-printerview" @click=${this._viewClick}>
        <anycubic-printercard-animated_printer
          .hass=${this.hass}
          .scaleFactor=${this.scaleFactor}
          .printerEntities=${this.printerEntities}
          .printerEntityIdPart=${this.printerEntityIdPart}
          .printerConfig=${Jr}
        ></anycubic-printercard-animated_printer>
      </div>
    `}static get styles(){return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }

      .ac-printercard-printerview {
        height: 100%;
        box-sizing: border-box;
      }
    `}};s([vt()],ss.prototype,"hass",void 0),s([vt({attribute:"toggle-video",type:Function})],ss.prototype,"toggleVideo",void 0),s([vt({attribute:"printer-entities"})],ss.prototype,"printerEntities",void 0),s([vt({attribute:"printer-entity-id-part"})],ss.prototype,"printerEntityIdPart",void 0),s([vt({attribute:"scale-factor"})],ss.prototype,"scaleFactor",void 0),ss=s([zr("anycubic-printercard-printer_view")],ss);
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const ns=(t,e,i)=>{const r=new Map;for(let s=e;s<=i;s++)r.set(t[s],s);return r},os=lr(class extends hr{constructor(t){if(super(t),t.type!==ar)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let r;void 0===i?i=e:void 0!==e&&(r=e);const s=[],n=[];let o=0;for(const e of t)s[o]=r?r(e,o):o,n[o]=i(e,o),o++;return{values:n,keys:s}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,r]){const s=(t=>t._$AH)(t),{values:n,keys:o}=this.dt(e,i,r);if(!Array.isArray(s))return this.ut=o,n;const a=this.ut??=[],l=[];let h,c,d=0,p=s.length-1,u=0,g=n.length-1;for(;d<=p&&u<=g;)if(null===s[d])d++;else if(null===s[p])p--;else if(a[d]===o[u])l[u]=yr(s[d],n[u]),d++,u++;else if(a[p]===o[g])l[g]=yr(s[p],n[g]),p--,g--;else if(a[d]===o[g])l[g]=yr(s[d],n[g]),vr(t,l[g+1],s[d]),d++,g--;else if(a[p]===o[u])l[u]=yr(s[p],n[u]),vr(t,s[d],s[p]),p--,u++;else if(void 0===h&&(h=ns(o,u,g),c=ns(a,d,p)),h.has(a[d]))if(h.has(a[p])){const e=c.get(o[u]),i=void 0!==e?s[e]:null;if(null===i){const e=vr(t,s[d]);yr(e,n[u]),l[u]=e}else l[u]=yr(i,n[u]),vr(t,s[d],i),s[e]=null;u++}else Er(s[p]),p--;else Er(s[d]),d++;for(;u<=g;){const e=vr(t,l[g+1]);yr(e,n[u]),l[u++]=e}for(;d<=p;){const t=s[d++];null!==t&&Er(t)}return this.ut=o,xr(t,l),Y}});let as=class extends ut{render(){const t={width:String(this.progress)+"%"};return X`
      <div class="ac-stat-line">
        <p class="ac-stat-heading">${this.name}</p>
        <div class="ac-stat-value">
          <div class="ac-progress-bar">
            <div class="ac-stat-text">${this.value}</div>
            <div
              class="ac-progress-line"
              style=${gr(t)}
            ></div>
          </div>
        </div>
      </div>
    `}static get styles(){return p`
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
    `}};s([vt({type:String})],as.prototype,"name",void 0),s([vt({type:Number})],as.prototype,"value",void 0),s([vt({type:Number})],as.prototype,"progress",void 0),as=s([zr("anycubic-printercard-progress-line")],as);let ls=class extends ut{constructor(){super(...arguments),this.unit=""}render(){return X`
      <div class="ac-stat-line">
        <p class="ac-stat-text ac-stat-heading">${this.name}</p>
        <p class="ac-stat-text">${this.value}${this.unit}</p>
      </div>
    `}static get styles(){return p`
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
    `}};s([vt({type:String})],ls.prototype,"name",void 0),s([vt({type:String})],ls.prototype,"value",void 0),s([vt({type:String})],ls.prototype,"unit",void 0),ls=s([zr("anycubic-printercard-stat-line")],ls);let hs=class extends ut{render(){return X`<anycubic-printercard-stat-line
      .name=${this.name}
      .value=${be(this.temperatureEntity,this.temperatureUnit,this.round)}
    ></anycubic-printercard-stat-line>`}static get styles(){return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }
    `}};s([vt({type:String})],hs.prototype,"name",void 0),s([vt({attribute:"temperature-entity"})],hs.prototype,"temperatureEntity",void 0),s([vt({type:Boolean})],hs.prototype,"round",void 0),s([vt({attribute:"temperature-unit",type:String})],hs.prototype,"temperatureUnit",void 0),hs=s([zr("anycubic-printercard-stat-temperature")],hs);let cs=class extends ut{constructor(){super(...arguments),this.currentTime=0,this.lastIntervalId=-1}willUpdate(t){super.willUpdate(t),(t.has("timeEntity")||t.has("isSeconds"))&&(-1!==this.lastIntervalId&&clearInterval(this.lastIntervalId),this.currentTime=function(t,e=!1){let i;if(t.state)if(t.state.includes(", ")){const[e,r]=t.state.split(", "),[s,n,o]=r.split(":"),a=e.match(/\d+/);i=60*+(a?a[0]:0)*60*24+60*+s*60+60*+n+ +o}else if(t.state.includes(":")){const[e,r,s]=t.state.split(":");i=60*+e*60+60*+r+ +s}else i=e?+t.state:60*+t.state;else i=0;return i}(this.timeEntity,this.isSeconds),this.lastIntervalId=setInterval(()=>{this._incTime()},1e3))}connectedCallback(){super.connectedCallback(),-1===this.lastIntervalId&&(this.lastIntervalId=setInterval(()=>{this._incTime()},1e3))}disconnectedCallback(){super.disconnectedCallback(),-1!==this.lastIntervalId&&(clearInterval(this.lastIntervalId),this.lastIntervalId=-1)}render(){return X`<anycubic-printercard-stat-line
      .name=${this.name}
      .value=${ge(this.currentTime,this.timeType,this.round,this.use_24hr,this.timeZone)}
    ></anycubic-printercard-stat-line>`}_incTime(){(0===this.currentTime||this.currentTime&&!isNaN(this.currentTime))&&(this.currentTime=Math.max(0,Number(this.currentTime)+this.direction))}static get styles(){return p`
      :host {
        box-sizing: border-box;
        width: 100%;
      }
    `}};s([vt({attribute:"time-entity"})],cs.prototype,"timeEntity",void 0),s([vt({attribute:"time-type"})],cs.prototype,"timeType",void 0),s([vt({type:String})],cs.prototype,"name",void 0),s([vt({type:Number})],cs.prototype,"direction",void 0),s([vt({type:Boolean})],cs.prototype,"round",void 0),s([vt({type:Boolean})],cs.prototype,"use_24hr",void 0),s([vt({attribute:"time-zone"})],cs.prototype,"timeZone",void 0),s([vt({attribute:"is-seconds",type:Boolean})],cs.prototype,"isSeconds",void 0),s([yt()],cs.prototype,"currentTime",void 0),s([yt()],cs.prototype,"lastIntervalId",void 0),cs=s([zr("anycubic-printercard-stat-time")],cs);let ds=class extends ut{constructor(){super(...arguments),this.round=!0,this.temperatureUnit=$t.C,this.progressPercent=0,this._timeCounterActive=!1,this._valDryProgress=0}willUpdate(t){var e;if(super.willUpdate(t),t.has("hass")||t.has("printerEntities")||t.has("printerEntityIdPart")){this._timeCounterActive=!0===se(this.hass,this.printerEntities,this.printerEntityIdPart,"job_in_progress",!0,!1,!1)&&!0!==se(this.hass,this.printerEntities,this.printerEntityIdPart,"job_is_paused",!0,!1,!1),this._entETA=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_time_remaining"),this._entElapsed=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_time_elapsed"),this._entRemaining=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_time_remaining"),this._entBedCurrent=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"hotbed_temperature"),this._entHotendCurrent=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"nozzle_temperature"),this._entBedTarget=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"target_hotbed_temperature"),this._entHotendTarget=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"target_nozzle_temperature"),this._entAceTempCurrent=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"ace_current_temperature"),this._entAceTempTarget=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"dry_status_target_temperature"),this._valStatus=Mt(ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_state").state),this._valOnline=se(this.hass,this.printerEntities,this.printerEntityIdPart,"printer_online","Online","Offline","unknown"),this._valAvailability=Mt(ie(this.hass,this.printerEntities,this.printerEntityIdPart,"current_status").state),this._valJobName=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_name").state,this._valCurrentLayer=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_current_layer").state;const t=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_speed_mode","",{available_modes:[],print_speed_mode_code:-1}),i=ve(t),r=null!==(e=t.attributes.print_speed_mode_code)&&void 0!==e?e:0;this._valSpeedMode=r>=0&&r in i?i[r]:"Unknown",this._valFanSpeed=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"fan_speed",0).state,this._valDryStatus=se(this.hass,this.printerEntities,this.printerEntityIdPart,"dry_status_is_drying",this._labelDrying,this._labelNotDrying,this._labelUnknownState);const s=Number(ie(this.hass,this.printerEntities,this.printerEntityIdPart,"dry_status_total_duration",0).state),n=Number(ie(this.hass,this.printerEntities,this.printerEntityIdPart,"dry_status_remaining_time",0).state);this._valDryRemain=isNaN(n)?"":`${n} Mins`,this._valDryProgress=!isNaN(s)&&s>0?n/s*100:0,this._valOnTime=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_on_time",0).state,this._valOffTime=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_off_time",0).state,this._valBottomTime=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_bottom_time",0).state,this._valModelHeight=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_model_height",0).state,this._valBottomLayers=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_bottom_layers",0).state,this._valZUpHeight=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_z_up_height",0).state,this._valZUpSpeed=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_z_up_speed",0).state,this._valZDownSpeed=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_z_down_speed",0).state}(t.has("language")||t.has("monitoredStats"))&&(this._statTranslations=this.monitoredStats.reduce((t,e)=>(t[e]=sr(`card.monitored_stats.${e}`,this.language),t),{})),t.has("language")&&(this._labelDrying=sr("card.drying_settings.state_drying",this.language),this._labelNotDrying=sr("card.drying_settings.state_not_drying",this.language),this._labelUnknownState=sr("common.states.unknown",this.language))}render(){return X`
      <div class="ac-stats-box ac-stats-section">
        ${this.showPercent?X`
                <div class="ac-stats-box ac-stats-part-percent">
                  <p class="ac-stats-part-percent-text">
                    ${this.round?Math.round(this.progressPercent):this.progressPercent}%
                  </p>
                </div>
              `:null}
        <div class="ac-stats-box ac-stats-section">${this._renderStats()}</div>
      </div>
    `}_renderStats(){return os(this.monitoredStats,t=>t,(t,e)=>{var i,r,s;switch(t){case Ct.Status:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valStatus}
              ></anycubic-printercard-stat-line>
            `;case Ct.ETA:return X`
              <anycubic-printercard-stat-time
                .timeEntity=${this._entETA}
                .timeType=${t}
                .name=${this._statTranslations[t]}
                .direction=${0}
                .round=${this.round}
                .use_24hr=${this.use_24hr}
                .timeZone=${null===(i=this.hass.config)||void 0===i?void 0:i.time_zone}
              ></anycubic-printercard-stat-time>
            `;case Ct.Elapsed:return X`
              <anycubic-printercard-stat-time
                .timeEntity=${this._entElapsed}
                .timeType=${t}
                .name=${this._statTranslations[t]}
                .direction=${this._timeCounterActive?1:0}
                .round=${this.round}
                .use_24hr=${this.use_24hr}
                .timeZone=${null===(r=this.hass.config)||void 0===r?void 0:r.time_zone}
              ></anycubic-printercard-stat-time>
            `;case Ct.Remaining:return X`
              <anycubic-printercard-stat-time
                .timeEntity=${this._entRemaining}
                .timeType=${t}
                .name=${this._statTranslations[t]}
                .direction=${this._timeCounterActive?-1:0}
                .round=${this.round}
                .use_24hr=${this.use_24hr}
                .timeZone=${null===(s=this.hass.config)||void 0===s?void 0:s.time_zone}
              ></anycubic-printercard-stat-time>
            `;case Ct.BedCurrent:return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entBedCurrent}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;case Ct.HotendCurrent:return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entHotendCurrent}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;case Ct.BedTarget:return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entBedTarget}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;case Ct.HotendTarget:return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entHotendTarget}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;case Ct.AceTempCurrent:return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entAceTempCurrent}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;case Ct.AceTempTarget:return X`
              <anycubic-printercard-stat-temperature
                .name=${this._statTranslations[t]}
                .temperatureEntity=${this._entAceTempTarget}
                .round=${this.round}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stat-temperature>
            `;case Ct.PrinterOnline:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valOnline}
              ></anycubic-printercard-stat-line>
            `;case Ct.Availability:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valAvailability}
              ></anycubic-printercard-stat-line>
            `;case Ct.ProjectName:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valJobName}
              ></anycubic-printercard-stat-line>
            `;case Ct.CurrentLayer:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valCurrentLayer}
              ></anycubic-printercard-stat-line>
            `;case Ct.SpeedMode:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valSpeedMode}
              ></anycubic-printercard-stat-line>
            `;case Ct.FanSpeed:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valFanSpeed}
                .unit=${"%"}
              ></anycubic-printercard-stat-line>
            `;case Ct.DryingStatus:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valDryStatus}
              ></anycubic-printercard-stat-line>
            `;case Ct.DryingTime:return X`
              <anycubic-printercard-progress-line
                .name=${this._statTranslations[t]}
                .value=${this._valDryRemain}
                .progress=${this._valDryProgress}
              ></anycubic-printercard-progress-line>
            `;case Ct.OnTime:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valOnTime}
                .unit=${"s"}
              ></anycubic-printercard-stat-line>
            `;case Ct.OffTime:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valOffTime}
                .unit=${"s"}
              ></anycubic-printercard-stat-line>
            `;case Ct.BottomTime:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valBottomTime}
                .unit=${"s"}
              ></anycubic-printercard-stat-line>
            `;case Ct.ModelHeight:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valModelHeight}
                .unit=${"mm"}
              ></anycubic-printercard-stat-line>
            `;case Ct.BottomLayers:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valBottomLayers}
                .unit=${"layers"}
              ></anycubic-printercard-stat-line>
            `;case Ct.ZUpHeight:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valZUpHeight}
                .unit=${"mm"}
              ></anycubic-printercard-stat-line>
            `;case Ct.ZUpSpeed:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valZUpSpeed}
              ></anycubic-printercard-stat-line>
            `;case Ct.ZDownSpeed:return X`
              <anycubic-printercard-stat-line
                .name=${this._statTranslations[t]}
                .value=${this._valZDownSpeed}
              ></anycubic-printercard-stat-line>
            `;default:return X`
              <anycubic-printercard-stat-line
                .name=${"Unknown"}
                .value=${"<unknown>"}
              ></anycubic-printercard-stat-line>
            `}})}static get styles(){return p`
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
    `}};s([vt()],ds.prototype,"hass",void 0),s([vt()],ds.prototype,"language",void 0),s([vt({attribute:"monitored-stats"})],ds.prototype,"monitoredStats",void 0),s([vt({attribute:"show-percent",type:Boolean})],ds.prototype,"showPercent",void 0),s([vt({type:Boolean})],ds.prototype,"round",void 0),s([vt({type:Boolean})],ds.prototype,"use_24hr",void 0),s([vt({attribute:"temperature-unit",type:String})],ds.prototype,"temperatureUnit",void 0),s([vt({attribute:"printer-entities"})],ds.prototype,"printerEntities",void 0),s([vt({attribute:"printer-entity-id-part"})],ds.prototype,"printerEntityIdPart",void 0),s([vt({attribute:"progress-percent"})],ds.prototype,"progressPercent",void 0),s([yt()],ds.prototype,"_statTranslations",void 0),s([yt()],ds.prototype,"_labelDrying",void 0),s([yt()],ds.prototype,"_labelNotDrying",void 0),s([yt()],ds.prototype,"_labelUnknownState",void 0),s([yt()],ds.prototype,"_entETA",void 0),s([yt()],ds.prototype,"_entElapsed",void 0),s([yt()],ds.prototype,"_entRemaining",void 0),s([yt()],ds.prototype,"_entBedCurrent",void 0),s([yt()],ds.prototype,"_entHotendCurrent",void 0),s([yt()],ds.prototype,"_entBedTarget",void 0),s([yt()],ds.prototype,"_entHotendTarget",void 0),s([yt()],ds.prototype,"_entAceTempCurrent",void 0),s([yt()],ds.prototype,"_entAceTempTarget",void 0),s([yt()],ds.prototype,"_timeCounterActive",void 0),s([yt()],ds.prototype,"_valStatus",void 0),s([yt()],ds.prototype,"_valOnline",void 0),s([yt()],ds.prototype,"_valAvailability",void 0),s([yt()],ds.prototype,"_valJobName",void 0),s([yt()],ds.prototype,"_valCurrentLayer",void 0),s([yt()],ds.prototype,"_valSpeedMode",void 0),s([yt()],ds.prototype,"_valFanSpeed",void 0),s([yt()],ds.prototype,"_valDryStatus",void 0),s([yt()],ds.prototype,"_valDryRemain",void 0),s([yt()],ds.prototype,"_valDryProgress",void 0),s([yt()],ds.prototype,"_valOnTime",void 0),s([yt()],ds.prototype,"_valOffTime",void 0),s([yt()],ds.prototype,"_valBottomTime",void 0),s([yt()],ds.prototype,"_valModelHeight",void 0),s([yt()],ds.prototype,"_valBottomLayers",void 0),s([yt()],ds.prototype,"_valZUpHeight",void 0),s([yt()],ds.prototype,"_valZUpSpeed",void 0),s([yt()],ds.prototype,"_valZDownSpeed",void 0),ds=s([zr("anycubic-printercard-stats-component")],ds);const ps=p`
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
`;let us=class extends ut{constructor(){super(...arguments),this._isActive=!1,this._setActive=()=>{this._isActive=!0},this._setInactive=()=>{this._isActive=!1}}render(){const t={filter:this._isActive?"brightness(80%)":"brightness(100%)"};return X`
      <button
        class="ac-ui-seld-select"
        style=${gr(t)}
        @mouseenter=${this._setActive}
        @mousedown=${this._setActive}
        @mouseup=${this._setInactive}
        @mouseleave=${this._setInactive}
      >
        ${this.item}
      </button>
    `}static get styles(){return p`
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
    `}};s([vt()],us.prototype,"item",void 0),s([yt()],us.prototype,"_isActive",void 0),us=s([zr("anycubic-ui-select-dropdown-item")],us);let gs=class extends ut{constructor(){super(...arguments),this._active=!1,this._hidden=!1,this._showOptions=()=>{this._hidden=!1},this._hideOptions=()=>{this._hidden=!0},this._setActive=()=>{this._active=!0},this._setInactive=()=>{this._active=!1},this._selectItem=t=>{if(!this.availableOptions)return;const e=t.currentTarget.item_key;this._selectedItem=this.availableOptions[e],xt(this,"ac-select-dropdown",{key:e,value:this.availableOptions[e]}),this._hidden=!0}}willUpdate(t){super.willUpdate(t),t.has("initialItem")&&(this._selectedItem=this.initialItem)}firstUpdated(){this._hidden=!0,this._active=!1,this.requestUpdate()}render(){const t={backgroundColor:this._active?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.15)"},e={opacity:this._hidden?0:1,transform:this._hidden?"scaleY(0.0)":"scaleY(1.0)"};return this.availableOptions?X`
          <button
            class="ac-ui-select-button"
            style=${gr(t)}
            @click=${this._showOptions}
            @mouseenter=${this._setActive}
            @mouseleave=${this._setInactive}
          >
            ${this._selectedItem?this._selectedItem:this.placeholder}
            <ha-svg-icon .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}></ha-svg-icon>
          </button>
          <div class="ac-ui-select-options" style=${gr(e)}>
            ${this._renderOptions()}
          </div>
        `:W}_renderOptions(){return dr(Object.keys(this.availableOptions),(t,e)=>X`
          <anycubic-ui-select-dropdown-item
            .item=${this.availableOptions[t]}
            .item_key=${t}
            @click=${this._selectItem}
          ></anycubic-ui-select-dropdown-item>
        `)}static get styles(){return p`
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
    `}};s([vt({attribute:"available-options"})],gs.prototype,"availableOptions",void 0),s([vt()],gs.prototype,"placeholder",void 0),s([vt({attribute:"initial-item"})],gs.prototype,"initialItem",void 0),s([yt()],gs.prototype,"_selectedItem",void 0),s([yt()],gs.prototype,"_active",void 0),s([yt()],gs.prototype,"_hidden",void 0),gs=s([zr("anycubic-ui-select-dropdown")],gs);const _s={keyframeOptions:{duration:250,direction:"alternate",easing:"ease-in-out"},properties:["height","opacity","scale"]},bs="drying_start_preset_1",ms="drying_start_preset_2",vs="drying_start_preset_3",ys="drying_start_preset_4",fs="drying_start_preset_5",xs="dry_stop",Es="drying_temperature_input",ws="drying_time_input",$s="dry_start_custom",Ss="secondary_",Ps=Ss+bs,As=Ss+ms,Ts=Ss+vs,Cs=Ss+ys,Ds=Ss+fs,ks=xs,Is=Ss+Es,Hs=Ss+ws,Bs=$s;let Ms=class extends ut{constructor(){super(...arguments),this.inline=!1,this.box_id=0,this._dryingPresetId1=bs,this._dryingPresetId2=ms,this._dryingPresetId3=vs,this._dryingPresetId4=ys,this._dryingPresetId5=fs,this._dryingStopId=xs,this._customTempId=Es,this._customDurationId=ws,this._customStartId=$s,this._hasDryingPreset1=!1,this._hasDryingPreset2=!1,this._hasDryingPreset3=!1,this._hasDryingPreset4=!1,this._hasDryingPreset5=!1,this._hasDryingStop=!1,this._hasCustomDrying=!1,this._dryingPresetTemp1="",this._dryingPresetDur1="",this._dryingPresetTemp2="",this._dryingPresetDur2="",this._dryingPresetTemp3="",this._dryingPresetDur3="",this._dryingPresetTemp4="",this._dryingPresetDur4="",this._dryingPresetTemp5="",this._dryingPresetDur5="",this._customTemp=50,this._customTempMin=40,this._customTempMax=70,this._userEditCustomTemp=!1,this._customDuration=240,this._customDurationMin=30,this._customDurationMax=480,this._userEditCustomDuration=!1,this._startingCustomDrying=!1,this._isOpen=!1,this._handleDryingPreset1=()=>{this._pressHassButton(this._dryingPresetId1),this._closeModal()},this._handleDryingPreset2=()=>{this._pressHassButton(this._dryingPresetId2),this._closeModal()},this._handleDryingPreset3=()=>{this._pressHassButton(this._dryingPresetId3),this._closeModal()},this._handleDryingPreset4=()=>{this._pressHassButton(this._dryingPresetId4),this._closeModal()},this._handleDryingPreset5=()=>{this._pressHassButton(this._dryingPresetId5),this._closeModal()},this._handleDryingStop=()=>{this._pressHassButton(this._dryingStopId),this._closeModal()},this._handleCustomTempChange=t=>{const e=t.currentTarget.value;this._customTemp=e,this._userEditCustomTemp=!0},this._handleCustomDurationChange=t=>{const e=t.currentTarget.value;this._customDuration=e,this._userEditCustomDuration=!0},this._handleStartCustomDrying=()=>{const t=jt(this.printerEntities,this.printerEntityIdPart,"number",this._customTempId),e=jt(this.printerEntities,this.printerEntityIdPart,"number",this._customDurationId);t&&e&&(this._startingCustomDrying=!0,Promise.all([this.hass.callService("number","set_value",{entity_id:t.entity_id,value:this._customTemp}),this.hass.callService("number","set_value",{entity_id:e.entity_id,value:this._customDuration})]).then(()=>{this._pressHassButton(this._customStartId)}).then(()=>{this._startingCustomDrying=!1,this._userEditCustomTemp=!1,this._userEditCustomDuration=!1}).catch(t=>{this._startingCustomDrying=!1}),this._closeModal())},this._handleModalEvent=t=>{const e=t;e.stopPropagation(),e.detail.modalOpen&&(this._isOpen=!0,this.box_id=Number(e.detail.box_id))},this._closeModal=t=>{t&&t.stopPropagation(),this._isOpen=!1,this.box_id=0},this._cardClick=t=>{t.stopPropagation()}}firstUpdated(){this.inline||this.addEventListener("click",t=>{this._closeModal(t)})}connectedCallback(){var t;super.connectedCallback(),this.inline||null===(t=this.parentElement)||void 0===t||t.addEventListener("ac-mcbdry-modal",this._handleModalEvent)}disconnectedCallback(){var t;this.inline||null===(t=this.parentElement)||void 0===t||t.removeEventListener("ac-mcbdry-modal",this._handleModalEvent),super.disconnectedCallback()}willUpdate(t){var e,i,r,s;if(super.willUpdate(t),t.has("language")&&(this._heading=sr("card.drying_settings.heading",this.language),this._buttonTextPreset=sr("card.drying_settings.button_preset",this.language),this._buttonTextMinutes=sr("card.drying_settings.button_minutes",this.language),this._buttonStopDrying=sr("card.drying_settings.button_stop_drying",this.language),this._hintNothingAvailable=sr("card.drying_settings.hint_nothing_available",this.language),this._customHeading=sr("card.drying_settings.custom_heading",this.language),this._customLabelTemp=sr("card.drying_settings.custom_label_temp",this.language),this._customLabelDuration=sr("card.drying_settings.custom_label_duration",this.language),this._customButtonStart=sr("card.drying_settings.custom_button_start",this.language)),t.has("box_id")&&(this._userEditCustomTemp=!1,this._userEditCustomDuration=!1,1===this.box_id?(this._dryingPresetId1=Ps,this._dryingPresetId2=As,this._dryingPresetId3=Ts,this._dryingPresetId4=Cs,this._dryingPresetId5=Ds,this._dryingStopId=ks,this._customTempId=Is,this._customDurationId=Hs,this._customStartId=Bs):(this._dryingPresetId1=bs,this._dryingPresetId2=ms,this._dryingPresetId3=vs,this._dryingPresetId4=ys,this._dryingPresetId5=fs,this._dryingStopId=xs,this._customTempId=Es,this._customDurationId=ws,this._customStartId=$s)),t.has("box_id")||t.has("hass")||t.has("selectedPrinterDevice")||t.has("printerEntities")||t.has("printerEntityIdPart")){const t=Qt(this.hass,this.printerEntities,this.printerEntityIdPart,this._dryingPresetId1);this._hasDryingPreset1=te(t),this._dryingPresetTemp1=String(t.attributes.temperature),this._dryingPresetDur1=String(t.attributes.duration);const n=Qt(this.hass,this.printerEntities,this.printerEntityIdPart,this._dryingPresetId2);this._hasDryingPreset2=te(n),this._dryingPresetTemp2=String(n.attributes.temperature),this._dryingPresetDur2=String(n.attributes.duration);const o=Qt(this.hass,this.printerEntities,this.printerEntityIdPart,this._dryingPresetId3);this._hasDryingPreset3=te(o),this._dryingPresetTemp3=String(o.attributes.temperature),this._dryingPresetDur3=String(o.attributes.duration);const a=Qt(this.hass,this.printerEntities,this.printerEntityIdPart,this._dryingPresetId4);this._hasDryingPreset4=te(a),this._dryingPresetTemp4=String(a.attributes.temperature),this._dryingPresetDur4=String(a.attributes.duration);const l=Qt(this.hass,this.printerEntities,this.printerEntityIdPart,this._dryingPresetId5);this._hasDryingPreset5=te(l),this._dryingPresetTemp5=String(l.attributes.temperature),this._dryingPresetDur5=String(l.attributes.duration);const h=Qt(this.hass,this.printerEntities,this.printerEntityIdPart,this._dryingStopId);this._hasDryingStop=te(h);const c=Qt(this.hass,this.printerEntities,this.printerEntityIdPart,this._customStartId);if(this._hasCustomDrying=te(c),!this._userEditCustomTemp){const t=ne(this.hass,this.printerEntities,this.printerEntityIdPart,this._customTempId,50,{min:40,max:70});this._customTemp=Number(t.state),this._customTempMin=Number(null!==(e=t.attributes.min)&&void 0!==e?e:40),this._customTempMax=Number(null!==(i=t.attributes.max)&&void 0!==i?i:70)}if(!this._userEditCustomDuration){const t=ne(this.hass,this.printerEntities,this.printerEntityIdPart,this._customDurationId,240,{min:30,max:480});this._customDuration=Number(t.state),this._customDurationMin=Number(null!==(r=t.attributes.min)&&void 0!==r?r:30),this._customDurationMax=Number(null!==(s=t.attributes.max)&&void 0!==s?s:480)}}}update(t){super.update(t),this.inline||this._isOpen?this.style.display="block":this.style.display="none"}render(){if(this.inline)return X`<div class="ac-drying-inline">${this._renderCard()}</div>`;return X`
      <div
        class="ac-modal-container"
        style=${gr({height:"auto",opacity:1,scale:1})}
        ${Ur(Object.assign({},_s))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this._renderCard()}
        </div>
      </div>
    `}_renderCard(){const t=!(this._hasDryingPreset1||this._hasDryingPreset2||this._hasDryingPreset3||this._hasDryingPreset4||this._hasDryingPreset5||this._hasDryingStop||this._hasCustomDrying);return X`
      <div>
        <div class="ac-drying-header">${this._heading}</div>
        ${t?X`<p class="ac-drying-hint">${this._hintNothingAvailable}</p>`:W}
        <div class="ac-drying-buttonscont">
          ${this._hasDryingPreset1?X`
                  <div class="ac-drying-buttoncont">
                    <ha-control-button @click=${this._handleDryingPreset1}>
                      ${this._buttonTextPreset} 1<br />
                      ${this._dryingPresetDur1} ${this._buttonTextMinutes} @
                      ${this._dryingPresetTemp1}°C
                    </ha-control-button>
                  </div>
                `:W}
          ${this._hasDryingPreset2?X`
                  <div class="ac-drying-buttoncont">
                    <ha-control-button @click=${this._handleDryingPreset2}>
                      ${this._buttonTextPreset} 2<br />
                      ${this._dryingPresetDur2} ${this._buttonTextMinutes} @
                      ${this._dryingPresetTemp2}°C
                    </ha-control-button>
                  </div>
                `:W}
          ${this._hasDryingPreset3?X`
                  <div class="ac-drying-buttoncont">
                    <ha-control-button @click=${this._handleDryingPreset3}>
                      ${this._buttonTextPreset} 3<br />
                      ${this._dryingPresetDur3} ${this._buttonTextMinutes} @
                      ${this._dryingPresetTemp3}°C
                    </ha-control-button>
                  </div>
                `:W}
          ${this._hasDryingPreset4?X`
                  <div class="ac-drying-buttoncont">
                    <ha-control-button @click=${this._handleDryingPreset4}>
                      ${this._buttonTextPreset} 4<br />
                      ${this._dryingPresetDur4} ${this._buttonTextMinutes} @
                      ${this._dryingPresetTemp4}°C
                    </ha-control-button>
                  </div>
                `:W}
          ${this._hasDryingPreset5?X`
                  <div class="ac-drying-buttoncont">
                    <ha-control-button @click=${this._handleDryingPreset5}>
                      ${this._buttonTextPreset} 5<br />
                      ${this._dryingPresetDur5} ${this._buttonTextMinutes} @
                      ${this._dryingPresetTemp5}°C
                    </ha-control-button>
                  </div>
                `:W}
          ${this._hasDryingStop?X`
                  <div class="ac-flex-break"></div>
                  <div class="ac-drying-buttoncont">
                    <ha-control-button @click=${this._handleDryingStop}>
                      ${this._buttonStopDrying}
                    </ha-control-button>
                  </div>
                `:W}
        </div>
        ${this._hasCustomDrying?this._renderCustomDrying():W}
      </div>
    `}_renderCustomDrying(){return X`
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
    `}_pressHassButton(t){const e=jt(this.printerEntities,this.printerEntityIdPart,"button",t);e&&this.hass.callService("button","press",{entity_id:e.entity_id}).then().catch(t=>{})}static get styles(){return p`
      ${ps}

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
    `}};s([vt()],Ms.prototype,"hass",void 0),s([vt()],Ms.prototype,"language",void 0),s([vt({attribute:"selected-printer-device"})],Ms.prototype,"selectedPrinterDevice",void 0),s([vt({attribute:"printer-entities"})],Ms.prototype,"printerEntities",void 0),s([vt({attribute:"printer-entity-id-part"})],Ms.prototype,"printerEntityIdPart",void 0),s([vt({type:Boolean,reflect:!0})],Ms.prototype,"inline",void 0),s([vt({type:Number})],Ms.prototype,"box_id",void 0),s([yt()],Ms.prototype,"_dryingPresetId1",void 0),s([yt()],Ms.prototype,"_dryingPresetId2",void 0),s([yt()],Ms.prototype,"_dryingPresetId3",void 0),s([yt()],Ms.prototype,"_dryingPresetId4",void 0),s([yt()],Ms.prototype,"_dryingPresetId5",void 0),s([yt()],Ms.prototype,"_dryingStopId",void 0),s([yt()],Ms.prototype,"_customTempId",void 0),s([yt()],Ms.prototype,"_customDurationId",void 0),s([yt()],Ms.prototype,"_customStartId",void 0),s([yt()],Ms.prototype,"_hasDryingPreset1",void 0),s([yt()],Ms.prototype,"_hasDryingPreset2",void 0),s([yt()],Ms.prototype,"_hasDryingPreset3",void 0),s([yt()],Ms.prototype,"_hasDryingPreset4",void 0),s([yt()],Ms.prototype,"_hasDryingPreset5",void 0),s([yt()],Ms.prototype,"_hasDryingStop",void 0),s([yt()],Ms.prototype,"_hasCustomDrying",void 0),s([yt()],Ms.prototype,"_dryingPresetTemp1",void 0),s([yt()],Ms.prototype,"_dryingPresetDur1",void 0),s([yt()],Ms.prototype,"_dryingPresetTemp2",void 0),s([yt()],Ms.prototype,"_dryingPresetDur2",void 0),s([yt()],Ms.prototype,"_dryingPresetTemp3",void 0),s([yt()],Ms.prototype,"_dryingPresetDur3",void 0),s([yt()],Ms.prototype,"_dryingPresetTemp4",void 0),s([yt()],Ms.prototype,"_dryingPresetDur4",void 0),s([yt()],Ms.prototype,"_dryingPresetTemp5",void 0),s([yt()],Ms.prototype,"_dryingPresetDur5",void 0),s([yt()],Ms.prototype,"_customTemp",void 0),s([yt()],Ms.prototype,"_customTempMin",void 0),s([yt()],Ms.prototype,"_customTempMax",void 0),s([yt()],Ms.prototype,"_userEditCustomTemp",void 0),s([yt()],Ms.prototype,"_customDuration",void 0),s([yt()],Ms.prototype,"_customDurationMin",void 0),s([yt()],Ms.prototype,"_customDurationMax",void 0),s([yt()],Ms.prototype,"_userEditCustomDuration",void 0),s([yt()],Ms.prototype,"_startingCustomDrying",void 0),s([yt()],Ms.prototype,"_isOpen",void 0),s([yt()],Ms.prototype,"_heading",void 0),s([yt()],Ms.prototype,"_buttonTextPreset",void 0),s([yt()],Ms.prototype,"_buttonTextMinutes",void 0),s([yt()],Ms.prototype,"_buttonStopDrying",void 0),s([yt()],Ms.prototype,"_hintNothingAvailable",void 0),s([yt()],Ms.prototype,"_customHeading",void 0),s([yt()],Ms.prototype,"_customLabelTemp",void 0),s([yt()],Ms.prototype,"_customLabelDuration",void 0),s([yt()],Ms.prototype,"_customButtonStart",void 0),Ms=s([zr("anycubic-printercard-multicolorbox_modal_drying")],Ms);const Fs=t=>Ns(255,Math.round(Number(t))),Ls=t=>Fs(255*t),Os=t=>Ns(1,t/255),Ns=(t,e)=>Math.max(0,Math.min(t,e)),Rs=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4),Us=(t,e,i)=>{let r=e-t;return r>180?r-=360:r<-180&&(r+=360),(t+r*i+360)%360},zs=t=>Math.round(1e3*t)/1e3,js=(t,e)=>[t[0][0]*e[0]+t[0][1]*e[1]+t[0][2]*e[2],t[1][0]*e[0]+t[1][1]*e[1]+t[1][2]*e[2],t[2][0]*e[0]+t[2][1]*e[1]+t[2][2]*e[2]],Gs=t=>void 0===t?1:("string"==typeof t&&t.indexOf("%")>0&&(t=Number(t.split("%")[0])/100),t=Number(Number(t).toFixed(3)),isNaN(t)?1:Ns(1,t)),Vs={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blue:"#0000FF",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",darkgreen:"#006400",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",fuchsia:"#FF00FF",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",lightgreen:"#90EE90",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",lime:"#00FF00",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",navy:"#000080",oldlace:"#FDF5E6",olive:"#808000",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"};class qs{constructor(t,e,i,r){return qs.isBaseConstructor(t)?(this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),void 0!==t.a&&(this.a=Gs(t.a)),this):qs.parse(t,e,i,r)}static parse(t,e,i,r){if(qs.isBaseConstructor(t))return new qs(t);if(void 0!==e&&void 0!==i){let s=Fs(t);return e=Fs(e),i=Fs(i),void 0!==r&&(r=Gs(r)),new qs({r:s,g:e,b:i,a:r})}if(Array.isArray(t))return qs.fromArray(t);if("string"==typeof t){let i;if(void 0!==e&&Number(e)<=1&&Number(e)>=0&&(i=Number(e)),t.startsWith("#"))return qs.fromHex(t,i);if(Vs[t.toLowerCase()])return qs.fromNamed(t,i);if(t.startsWith("rgb"))return qs.fromRgbString(t);if("transparent"===t){let t,e,i,r;return t=e=i=r=0,new qs({r:t,g:e,b:i,a:r})}return null}return"object"==typeof t?(void 0!==t.a&&(this.a=Gs(t.a)),void 0!==t.h?void 0!==t.l&&void 0!==t.c?qs.fromOklch(t):void 0!==t.v?qs.fromHsv(t):void 0!==t.l?qs.fromHsl(t):void 0!==t.w?qs.fromHwb(t):null:void 0!==t.c?qs.fromCMYK(t):this):qs.fromArray([0,0,0])}static isBaseConstructor(t){return"object"==typeof t&&void 0!==t.r&&void 0!==t.g&&void 0!==t.b}static fromNamed(t,e){return qs.fromHex(Vs[t.toLowerCase()],e)}static fromArray(t){t=t.filter(t=>""!==t&&isFinite(t));const e={r:Fs(t[0]),g:Fs(t[1]),b:Fs(t[2])};return void 0!==t[3]&&(e.a=Gs(t[3])),new qs(e)}static fromHex(t,e){3!==(t=t.replace("#","")).length&&4!==t.length||(t=t.split("").map(t=>t+t).join(""));let i=t.match(/[A-Za-z0-9]{2}/g).map(t=>parseInt(t,16));return 4===i.length?i[3]/=255:void 0!==e&&(i[3]=e),qs.fromArray(i)}static fromRgbString(t){if(t.includes(","))return qs.fromArray(t.split("(")[1].split(")")[0].split(","));const e=t.replace("/"," ").split("(")[1].replace(")","").split(" ").filter(t=>""!==t&&isFinite(Number(t)));return qs.fromArray(e)}static fromHsv({h:t,s:e,v:i}){e/=100,i/=100;const r=Math.floor(t/60%6),s=t/60-r,n=i*(1-e),o=i*(1-s*e),a=i*(1-(1-s)*e),l=[[i,a,n],[o,i,n],[n,i,a],[n,o,i],[a,n,i],[i,n,o]][r].map(t=>Math.round(256*t));return new qs({r:Fs(l[0]),g:Fs(l[1]),b:Fs(l[2])})}static fromHsl({h:t,s:e,l:i}){e/=100,i/=100;const r=(1-Math.abs(2*i-1))*e,s=r*(1-Math.abs(t/60%2-1)),n=i-r/2;let o=0,a=0,l=0;return 0<=t&&t<60?(o=r,a=s,l=0):60<=t&&t<120?(o=s,a=r,l=0):120<=t&&t<180?(o=0,a=r,l=s):180<=t&&t<240?(o=0,a=s,l=r):240<=t&&t<300?(o=s,a=0,l=r):300<=t&&t<360&&(o=r,a=0,l=s),new qs({r:Ls(n+o),g:Ls(n+a),b:Ls(n+l)})}static fromCMYK({c:t,m:e,y:i,k:r,a:s}){r=Number(r)/100;const n=t=>Ls(1-Math.min(1,Number(t)/100*(1-r)+r));return new qs({r:n(t),g:n(e),b:n(i),a:s})}static fromHwb({h:t,w:e,b:i,a:r}){let s;if(e=Number(e)/100,i=Number(i)/100,e+i>=1){const t=e/(e+i);s=[t,t,t]}else{const r=(t=>{t=(t%360+360)%360;const e=1-Math.abs(t/60%2-1);return t<60?[1,e,0]:t<120?[e,1,0]:t<180?[0,1,e]:t<240?[0,e,1]:t<300?[e,0,1]:[1,0,e]})(Number(t)),n=1-e-i;s=r.map(t=>t*n+e)}return new qs({r:Ls(s[0]),g:Ls(s[1]),b:Ls(s[2]),a:r})}static fromOklch({l:t,c:e,h:i,a:r}){t=Ns(1,Number(t)),e=Math.max(0,Number(e));const s=(i=Number(i)%360)*Math.PI/180,n=e*Math.cos(s),o=e*Math.sin(s),a=js([[4.0767416621,-3.3077115913,.2309699292],[-1.2684380046,2.6097574011,-.3413193965],[-.0041960863,-.7034186147,1.707614701]],[(t+.3963377774*n+.2158037573*o)**3,(t-.1055613458*n-.0638541728*o)**3,(t-.0894841775*n-1.291485548*o)**3]).map(t=>Fs(255*(t=>t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)(Math.max(0,t))));return new qs({r:a[0],g:a[1],b:a[2],a:Gs(r)})}get alpha(){return void 0===this.a?1:this.a}get rgb(){return[this.r,this.g,this.b]}get rgba(){return[this.r,this.g,this.b,this.alpha]}get rgbObj(){let{r:t,g:e,b:i}=this;return{r:t,g:e,b:i,a:this.alpha}}get css(){return this.rgbString}get rgbString(){return void 0===this.a?`rgb(${this.rgb.join(",")})`:`rgba(${this.rgba.join(",")})`}get rgbaString(){return`rgba(${this.rgba.join(",")})`}get hex(){return`#${this.rgb.map(t=>t.toString(16).padStart(2,"0")).join("")}`.toUpperCase()}get hexa(){return this.rgbaHex}get rgbaHex(){let t=this.rgba;return t[3]=Ls(t[3]),`#${t.map(t=>t.toString(16).padStart(2,"0")).join("")}`.toUpperCase()}get hsv(){const t=Os(this.r),e=Os(this.g),i=Os(this.b),r=Math.min(t,e,i),s=Math.max(t,e,i);let n;const o=s,a=s-r;n=0===a?0:s===t?(e-i)/a*60%360:s===e?(i-t)/a*60+120:s===i?(t-e)/a*60+240:0,n<0&&(n+=360);const l=0===s?0:1-r/s;return{h:Math.round(n),s:Math.round(100*l),v:Math.round(100*o),a:this.alpha}}get hsla(){return this.hsl}get hsva(){return this.hsv}get hsl(){const t=Os(this.r),e=Os(this.g),i=Os(this.b),r=Math.max(t,e,i),s=Math.min(t,e,i);let n,o;const a=(r+s)/2;if(r===s)n=o=0;else{const l=r-s;switch(o=a>.5?l/(2-r-s):l/(r+s),r){case t:n=(e-i)/l+(e<i?6:0);break;case e:n=(i-t)/l+2;break;case i:n=(t-e)/l+4}n/=6}return{h:Math.round(360*n),s:Math.round(100*o),l:Math.round(100*a),a:this.alpha}}get cmyk(){let t,e,i,r;const s=parseFloat(this.r)/255,n=parseFloat(this.g)/255,o=parseFloat(this.b)/255;r=1-Math.max(s,n,o),1===r?t=e=i=0:(t=(1-s-r)/(1-r),e=(1-n-r)/(1-r),i=(1-o-r)/(1-r)),t=Math.round(100*t),e=Math.round(100*e),i=Math.round(100*i),r=Math.round(100*r);const a={c:t,m:e,y:i,k:r};return void 0!==this.a&&(a.a=this.alpha),a}get cmyka(){return this.cmyk}get hwba(){return this.hwb}get hwb(){const t=Os(this.r),e=Os(this.g),i=Os(this.b),r=Math.max(t,e,i),s=Math.min(t,e,i),n=Math.round(100*s),o=Math.round(100*(1-r));return{h:this.hsl.h,w:n,b:o,a:this.alpha}}get oklch(){const{r:t,g:e,b:i,a:r}=this,s=[t/255,e/255,i/255].map(Rs),n=js([[.4122214708,.5363325363,.0514459929],[.2119034982,.6806995451,.1073969566],[.0883024619,.2817188376,.6299787005]],s).map(Math.cbrt),[o,a,l]=js([[.2104542553,.793617785,-.0040720468],[1.9779984951,-2.428592205,.4505937099],[.0259040371,.7827717662,-.808675766]],n),h=Math.sqrt(a**2+l**2);let c=180*Math.atan2(l,a)/Math.PI;return c<0&&(c+=360),{l:o,c:h,h:c,a:r}}get oklchString(){const{l:t,c:e,h:i}=this.oklch;return`oklch(${zs(t)} ${zs(e)} ${zs(i)})`}get oklchaString(){const{l:t,c:e,h:i,a:r}=this.oklch;return`oklch(${zs(t)} ${zs(e)} ${zs(i)} / ${r})`}get hslString(){const t=this.hsl;return`hsl(${t.h}, ${t.s}%, ${t.l}%)`}get hslaString(){const t=this.hsl;return`hsla(${t.h}, ${t.s}%, ${t.l}%, ${t.a})`}get hsvString(){const{h:t,s:e,v:i}=this.hsv;return`hsv(${t}, ${e}%, ${i}%)`}get cmykString(){const t=this.cmyk;return`cmyk(${t.c}%, ${t.m}%, ${t.y}%, ${t.k}%)`}get cmykaString(){const t=this.cmyk;return`cmyka(${t.c}%, ${t.m}%, ${t.y}%, ${t.k}%, ${t.a})`}get hwbString(){const{h:t,w:e,b:i}=this.hwb;return`hwb(${t} ${e}% ${i}%)`}get hwbaString(){const{h:t,w:e,b:i,a:r}=this.hwb;return`hwb(${t} ${e}% ${i}% / ${r})`}get isGrayScale(){return this.r===this.g&&this.g===this.b}toString(t="rgb",e={}){const i=!!e.modern;if("hwb"===t||"hwba"===t){const{h:e,w:r,b:s}=this.hwb,n=this.alpha,o=void 0!==this.a;return i?o||"hwba"===t?`hwb(${e} ${r}% ${s}% / ${n})`:`hwb(${e} ${r}% ${s}%)`:o||"hwba"===t?`hwb(${e}, ${r}%, ${s}%, ${n})`:`hwb(${e}, ${r}%, ${s}%)`}if(i&&("rgb"===t||void 0===t))return void 0===this.a?`rgb(${this.r} ${this.g} ${this.b})`:`rgb(${this.r} ${this.g} ${this.b} / ${this.alpha})`;if(i&&("hsl"===t||"hsla"===t)){const e=this.hsl;return void 0===this.a&&"hsl"===t?`hsl(${e.h} ${e.s}% ${e.l}%)`:`hsl(${e.h} ${e.s}% ${e.l}% / ${e.a})`}switch(t){case"rgb":default:return this.rgbString;case"hex":return this.hex;case"rgbaHex":return this.hexa;case"hsl":return this.hslString;case"hsla":return this.hslaString;case"hsv":return this.hsvString;case"cmyk":return this.cmykString;case"cmyka":return this.cmykaString;case"oklch":return this.oklchString;case"oklcha":return this.oklchaString}}mix(t,e=.5,i="rgb"){if("oklch"===i){const i=this.oklch,r=qs.parse(t).oklch,s=Gs(e);return qs.fromOklch({l:i.l+(r.l-i.l)*s,c:i.c+(r.c-i.c)*s,h:Us(i.h,r.h,s),a:this.alpha+(qs.parse(t).alpha-this.alpha)*s})}if("hsl"===i){const i=this.hsl,r=qs.parse(t).hsl,s=Gs(e);return qs.fromHsl({h:Us(i.h,r.h,s),s:i.s+(r.s-i.s)*s,l:i.l+(r.l-i.l)*s,a:this.alpha+(qs.parse(t).alpha-this.alpha)*s})}const r=this.rgba;r[3]=Ls(r[3]);const s=qs.parse(t).rgba;s[3]=Ls(s[3]),e=Gs(e);const n=r.map((t,i)=>{const r=s[i],n=r<t,o=n?t-r:r-t,a=Math.round(o*e);return n?t-a:a+t});return n[3]=Os(n[3]),qs.fromArray(n)}adjustSatLum(t,e,i){const r=this.hsl;let s=r[t],n=(i?s:100-s)*e;return r[t]=Ns(100,i?s-n:s+n),r.a=this.a,qs.parse(r)}lighten(t,e="hsl"){if("oklch"===e){const e=this.oklch;return qs.fromOklch({l:Ns(1,e.l+(1-e.l)*t),c:e.c,h:e.h,a:this.alpha})}return this.adjustSatLum("l",t,!1)}darken(t,e="hsl"){if("oklch"===e){const e=this.oklch;return qs.fromOklch({l:Ns(1,e.l-e.l*t),c:e.c,h:e.h,a:this.alpha})}return this.adjustSatLum("l",t,!0)}saturate(t,e=!1,i="hsl"){if("oklch"===i){const i=this.oklch,r=e?i.c*(1-Math.abs(t)):i.c*(1+t);return qs.fromOklch({l:i.l,c:Math.max(0,r),h:i.h,a:this.alpha})}return 0===t?this:(t<0&&(e=!0,t=-t),this.adjustSatLum("s",t,e))}desaturate(t,e="hsl"){if("oklch"===e){const e=this.oklch;return qs.fromOklch({l:e.l,c:Math.max(0,e.c*(1-t)),h:e.h,a:this.alpha})}const{h:i,l:r}=this.hsl;return t>=1?qs.fromHsl({h:i,l:r,s:0}):qs.fromHsl({h:i,l:r,s:Ns(100,r*(1-t))})}grayscale(){return this.desaturate(1)}rotate(t){return this.hue(t)}hue(t){const e=this.hsl;return e.h=Math.round(e.h+t)%360,e.a=this.a,qs.parse(e)}fadeIn(t,e){let i=this.alpha;const{r,g:s,b:n}=this;let o=(1-i)*t;return i=e?i-o:i+o,qs.parse({r,g:s,b:n,a:i})}fadeOut(t){return this.fadeIn(t,!0)}negate(){let t=this.rgb.map(t=>255-t);return void 0!==this.a&&t.push(this.alpha),qs.fromArray(t)}toAlpha(t){return qs.parse({...this.rgbObj,a:t})}toHSVSaturation(t){return qs.parse({...this.hsv,s:t})}toHSLSaturation(t){return qs.parse({...this.hsl,s:t})}toLuminance(t){return qs.parse({...this.hsl,l:t})}toHue(t){return qs.fromHsl({...this.hsl,h:t%360})}toValue(t){return qs.parse({...this.hsv,v:t})}toOklchLightness(t){const e=this.oklch;return e.l=Ns(1,Number(t)),qs.fromOklch(e)}toChroma(t){const e=this.oklch;return e.c=Math.max(0,Number(t)),qs.fromOklch(e)}getShades(t=10,e="hsl",i=.95,r=.05){if(t<2)return[this];const s=[],n=(i-r)/(t-1);if("hsl"===e){const{h:e,s:r}=this.hsl;for(let o=0;o<t;o++){const t=100*i-o*n*100;s.push(qs.fromHsl({h:e,s:r,l:t}))}}else{const{h:e,c:r,a:o}=this.oklch;for(let a=0;a<t;a++){const t=i-a*n;s.push(qs.fromOklch({l:t,c:r,h:e,a:o}))}}return s}get relativeLuminance(){const t=t=>{const e=t/255;return e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)};return.2126*t(this.r)+.7152*t(this.g)+.0722*t(this.b)}contrast(t){const e=this.relativeLuminance,i=qs.parse(t).relativeLuminance,[r,s]=e>=i?[e,i]:[i,e];return(r+.05)/(s+.05)}isReadable(t,{level:e="AA",size:i="normal"}={}){const r=this.contrast(t);return"AAA"===e?"large"===i?r>=4.5:r>=7:"large"===i?r>=3:r>=4.5}equals(t){const e=qs.parse(t);return this.r===e.r&&this.g===e.g&&this.b===e.b&&this.alpha===e.alpha}complementary(){return[this,this.hue(180)]}analogous(t=30){return[this.hue(-t),this,this.hue(t)]}triadic(){return[this,this.hue(120),this.hue(240)]}tetradic(t=60){return[this,this.hue(t),this.hue(180),this.hue(180+t)]}static nearestNamed(t){const e=t instanceof qs?t:qs.parse(t);let i=null,r=1/0;for(const[t,s]of Object.entries(Vs)){const n=qs.fromHex(s),o=(n.r-e.r)**2+(n.g-e.g)**2+(n.b-e.b)**2;o<r&&(r=o,i=t)}return i}nearestNamed(){return qs.nearestNamed(this)}}const Ks=(t,e,i="color-update")=>{const r=i.includes("color")?{color:e}:e,s=new CustomEvent(i,{bubbles:!0,composed:!0,detail:r});t.dispatchEvent(s)},Zs=(t=3,e)=>{let i=0,r=100,s=50,n=null,o=!1;e&&(r=e.s,e.hasOwnProperty("v")?(n=e.v,s=null,o=!0):s=e.l);const a=[];let l,h;const c=(t,e)=>`${t.css} ${(100*e).toFixed(1)}%`;for(;i<360;)l=qs.parse(o?{h:i,s:r,v:n}:{h:i,s:r,l:s}),h=i/360,a.push(c(l,h)),i+=t;return i=359,l=qs.parse(o?{h:i,s:r,v:n}:{h:i,s:r,l:s}),h=1,a.push(c(l,h)),a.join(", ")},Xs=X`<svg
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
</svg>`;class Ys extends ut{static properties={hue:{type:Number},color:{type:Object},gradient:{type:String,attribute:!1},sliderStyle:{type:String,attribute:!1},sliderBounds:{type:Object},width:{type:Number,attribute:!1}};static styles=p`
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
  `;constructor(){super(),this.gradient={backgroundImage:`linear-gradient(90deg, ${Zs(24)})`},this.width=400,this.sliderStyle={display:"none"}}firstUpdated(){const t=this.renderRoot.querySelector("lit-movable");t.onmovestart=()=>{Ks(this.renderRoot,{sliding:!0},"sliding-hue")},t.onmoveend=()=>{Ks(this.renderRoot,{sliding:!1},"sliding-hue")},t.onmove=({posLeft:t})=>this.selectHue({offsetX:t}),this.sliderStyle=this.sliderCss(this.hue)}get sliderBounds(){const t=this.width/360,e=Number(this.hue)*t;return{min:0-e,max:this.width-e,posLeft:e}}get sliderCss(){return t=>{this.color.hsx&&(t=this.color.hsx.h),void 0===t&&(t=this.color.hsl.h);return{backgroundColor:qs.parse({h:t,s:100,l:50}).css}}}willUpdate(t){if(t.get("hue")&&isFinite(this.hue)){if(this.color?.hsx)return;const t=this.hue;this.sliderStyle=this.sliderCss(t)}}selectHue(t){const e=360/this.width,i=t.offsetX,r=Math.max(0,Math.min(359,Math.round(i*e))),s=this.renderRoot.querySelector("a"),n=new CustomEvent("hue-update",{bubbles:!0,composed:!0,detail:{h:r}});s.dispatchEvent(n),this.sliderStyle=this.sliderCss(r)}render(){return X` <div
      style=${gr(this.gradient)}
      class="bar"
      @click="${this.selectHue}"
    >
      <lit-movable
        horizontal="${this.sliderBounds.min}, ${this.sliderBounds.max}"
        posLeft="${this.sliderBounds.posLeft}"
      >
        <a class="slider" style=${gr(this.sliderCss(this.h))}></a>
      </lit-movable>
    </div>`}}customElements.get("hue-bar")||customElements.define("hue-bar",Ys);const Ws=p`
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
`,Js=p`
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
`,Qs=p`
  color: var(--input-active-color);
  background-color: var(--input-active-bg);
  border-color: var(--input-active-border-color);
  outline: 0;
  box-shadow: var(--input-active-box-shadow);
`,tn=p`
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
    ${Js}
  }
  :host .form-control:focus {
    ${Qs}
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
    ${Ws}
    z-index: 0;
  }
`,en=p`
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
    ${Js}
  }

  :host .form-control:focus {
    ${Qs}
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
    ${Ws}
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  :host div.active .transparent-checks {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`,rn={r:"R (red) channel",g:"G (green) channel",b:"B (blue) channel",h:"H (hue) channel",s:"S (saturation) channel",v:"V (value / brightness) channel",l:"L (luminosity) channel",a:"A (alpha / opacity) channel"};class sn extends ut{static properties={group:{type:String},channel:{type:String},color:{type:Object},isHsl:{type:Boolean},c:{type:Object,state:!0,attribute:!1},previewGradient:{type:Object,state:!0,attribute:!1},active:{type:Boolean,state:!0,attribute:!1},max:{type:Number,state:!0,attribute:!1},v:{type:Number,state:!0,attribute:!1}};static styles=en;clickPreview(t){const e=Math.max(0,Math.min(t.offsetX,128));let i=Math.round(e/128*this.max);"a"===this.channel&&(i=Number((e/127).toFixed(2))),this.valueChange(null,i),this.setActive(!1)}valueChange=(t,e=null)=>{e=e??Number(this.renderRoot.querySelector("input").value),"a"===this.channel&&(e/=100),this.c[this.channel]=e;const i=qs.parse(this.c);"rgb"!==this.group&&(i.hsx=this.c),this.c="rgb"===this.group?this.color.rgbObj:this.isHsl?this.color.hsl:this.color.hsv,Ks(this.renderRoot,i)};setActive(t){this.active=t,t&&this.renderRoot.querySelector("input").select()}constructor(){super()}setPreviewGradient(){let t;t="rgb"===this.group?this.color.rgbObj:this.color.hsx?this.color.hsx:this.isHsl?this.color.hsl:this.color.hsv,this.c=t;const e=this.group,i=this.channel,r="a"===i;this.v=t[i],r&&(this.v*=100);let s,n,o=255;if("rgb"!==e||"a"===i){if("h"===i)return o=this.max=359,void(this.previewGradient={"--preview":`linear-gradient(90deg, ${Zs(24,t)})`,"--pct":t.h/o*100+"%"});o=r?1:100}if(this.max=o,s={...t},n=s,s[this.channel]=0,s=qs.parse(s),n[this.channel]=o,n=qs.parse(n),"l"===this.channel){const e={...t};e.l=50,this.previewGradient={"--preview":`linear-gradient(90deg, ${s.hex}, ${qs.parse(e).hex}, ${n.hex})`,"--pct":t[this.channel]/o*100+"%"}}else this.previewGradient={"--preview":`linear-gradient(90deg, ${r?s.css:s.hex}, ${r?n.css:n.hex})`,"--pct":t[this.channel]/o*100+"%"}}willUpdate(t){this.setPreviewGradient()}render(){const t="a"===this.channel?X`<div class="transparent-checks"></div>`:null,e="a"===this.channel?100:this.max;return X` <div class="${cr({active:this.active})}">
      <label for="channel_${this.ch}">${this.channel.toUpperCase()}</label>
      <input
        id="channel_${this.ch}"
        aria-label="${rn[this.channel]}"
        class="form-control"
        .value="${Math.round(this.v)}"
        type="number"
        min="0"
        max="${e}"
        @input="${this.valueChange}"
        @focus="${()=>this.setActive(!0)}"
        @blur="${()=>this.setActive(!1)}"
      />
      <div
        class="preview-bar"
        style="${gr(this.previewGradient)}"
        @mousedown="${this.clickPreview}"
      >
        <div class="pct"></div>
        ${t}
      </div>
    </div>`}}customElements.get("color-input-channel")||customElements.define("color-input-channel",sn);class nn extends ut{static properties={color:{type:Object},isHsl:{type:Boolean},size:{type:Number},debounceMode:{type:Boolean},ctx:{type:Object,state:!0,attribute:!1},hsw:{type:Object,state:!0,attribute:!1},circlePos:{type:Object,state:!0,attribute:!1}};static styles=p`
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
  `;constructor(){super(),this.isHsl=!0,this.circlePos={top:0,left:0,bounds:{x:"",y:""}},this.size=160}setColor(t){Ks(this.renderRoot,t)}setCircleCss(t,e){const i=`${t}`,r=`${e}`,s={x:`0, ${this.size}`,y:`0,${this.size}`};this.circlePos={top:r,left:i,bounds:s}}pickCoord({offsetX:t,offsetY:e}){const i=t,r=e,{size:s,hsw:n,isHsl:o,color:a}=this;let l=(s-r)/s;l=Math.round(100*l);const h=Math.round(i/s*100),c={h:n.h,s:h,[o?"l":"v"]:l},d=o?qs.fromHsl(c):qs.fromHsv(c);this.setCircleCss(i,r),d.a=a.alpha,d.hsx=c,d.fromHSLCanvas=!0,this.setColor(d)}debouncePaintDetail(t){clearTimeout(this.bouncer),this.bouncer=setTimeout(()=>this.paintHSL(t,!0),50),this.paintHSL(t,!1)}paintHSL(t,e=null){if(this.debounceMode&&null===e)return this.debouncePaintDetail(t);const{ctx:i,color:r,isHsl:s,size:n}=this;if(!i)return;const o=r;(t=t??s?o.hsl:o.hsv).w=s?t.l:t.v;const{h:a,s:l,w:h}=t,c=this.hsw={h:a,s:l,w:h},d=n/100,p=s?(t,e,i)=>`hsl(${t}, ${e}%, ${100-i}%)`:(t,e,i)=>qs.fromHsv({h:t,s:e,v:100-i}).hex,u=!1===e?4:1;for(let t=0;t<100;t+=u)for(let e=0;e<100;e+=u)i.fillStyle=p(a,t,e),i.fillRect(t,e,t+u,e+u);this.setCircleCss(c.s*d,n-t.w*d)}willUpdate(t){if(t.has("color")||t.has("isHsl")){if(this.color?.hsx)return this.color.fromHSLCanvas?void delete this.color.fromHSLCanvas:this.paintHSL(this.color.hsx);this.paintHSL()}}firstUpdated(t){const e=this.renderRoot.querySelector("canvas");this.ctx=e.getContext("2d"),this.paintHSL()}circleMove({posTop:t,posLeft:e}){this.pickCoord({offsetX:e,offsetY:t})}render(){const t={height:this.size+"px",width:this.size+"px"},{top:e,left:i,bounds:r}=this.circlePos;return X` <div
      class="outer"
      @click="${this.pickCoord}"
      style="${gr(t)}"
    >
      <canvas height="100" width="100"></canvas>
      <lit-movable
        boundsX="${r.x}"
        boundsY="${r.y}"
        posTop="${e}"
        posLeft="${i}"
        .onmove="${t=>this.circleMove(t)}"
      >
        <div class="circle"></div>
      </lit-movable>
    </div>`}}customElements.get("hsl-canvas")||customElements.define("hsl-canvas",nn);const on=t=>isFinite(t)?Number(t):Number(t.replace(/[^0-9.\-]/g,"")),an=t=>(t=Number(t),(isNaN(t)||[void 0,null].includes(t))&&(t=0),t);class ln{constructor(t,e){this.x=an(t),this.y=an(e)}static fromPointerEvent(t){const{pageX:e,pageY:i}=t;return new ln(e,i)}static fromElementStyle(t){const e=on(t.style.left??0),i=on(t.style.top??0);return new ln(e,i)}static fromObject({x:t,y:e}){return new ln(t,e)}get top(){return this.y}set top(t){this.y=t}get left(){return this.x}set left(t){this.x=t}}class hn{constructor(t=-1/0,e=1/0){this.min=t,this.max=e,this.attr=""}get constrained(){return this.min===this.max}get unconstrained(){return this.min===-1/0&&this.max===1/0}static fromString(t=null,e=0){if(!t)return new hn;if("null"===t)return new hn(0,0);const[i,r]=t.split(",").map(t=>Number(t.trim())+e),s=new hn(i,r);return s.attr=t,s}}class cn extends ut{_target;_targetSelector=null;_boundsX=new hn;_boundsY=new hn;isMoving=!1;moveState={};_vertical=null;_horizontal=null;_posTop=null;_posLeft=null;_grid=1;pointerId;constructor(){super(),this._onPointerMove=t=>{this.isMoving&&t.pointerId===this.pointerId&&this.motionHandler(t)},this._onPointerUp=t=>{t.pointerId===this.pointerId&&this.unbind(t)}}get vertical(){return this._vertical}set vertical(t){this.boundsY=t,this.boundsX="null",this._vertical=t}get horizontal(){return this._horizontal}set horizontal(t){this.boundsX=t,this.boundsY="null",this._horizontal=t}set posTop(t){t=Number(t),this._posTop=t,this.target&&(this.target.style.top=t+"px")}get posTop(){return this._posTop}set posLeft(t){t=Number(t),this._posLeft=t,this.target&&(this.target.style.left=t+"px")}get posLeft(){return this._posLeft}get grid(){return this._grid}set grid(t){this._grid=t>0&&t<1/0?t:1}get bounds(){return{left:this._boundsX,top:this._boundsY}}set targetSelector(t){this._targetSelector=t,this._retryTarget=null===document.querySelector(t),this._target=document.querySelector(t)}get targetSelector(){return this._targetSelector}get target(){return this._target??this}set target(t){this._target=t}get boundsX(){return this._boundsX}set boundsX(t){this._boundsX=hn.fromString(t,on(this.target?.style.left??0)),this.bounds.left=this._boundsX}get boundsY(){return this._boundsY}set boundsY(t){this._boundsY=hn.fromString(t,on(this.target?.style.top??0)),this.bounds.top=this._boundsY}static properties={posLeft:{type:Number},posTop:{type:Number},target:{type:Object,attribute:!1,state:!0},targetSelector:{type:String},bounds:{type:Object,attribute:!1,state:!0},boundsX:{type:String},boundsY:{type:String},vertical:{type:String},horizontal:{type:String},grid:{type:Number},shiftBehavior:{type:Boolean},disabled:{type:Boolean},eventsOnly:{type:Boolean},listening:{type:Boolean},onmovestart:{type:Object},onmoveend:{type:Object},onmove:{type:Object}};firstUpdated(t){this._retryTarget&&(this.target=document.querySelector(this.targetSelector));const{bounds:e,target:i,posTop:r,posLeft:s}=this,{offsetLeft:n,offsetTop:o,style:{left:a,top:l}}=this.target;i.classList.add("--movable-base"),this.renderRoot.addEventListener("pointerdown",t=>this.pointerdown(t)),i.style.position="absolute",i.style.cursor="pointer",s?i.style.left=s+"px":!a&&n&&(i.style.left=n+"px",e.left.constrained&&(e.left.min=e.left.max=n)),r?i.style.top=r+"px":!l&&o&&(i.style.top=o+"px",e.top.constrained&&(e.top.min=e.top.max=o))}reposition(t){if("object"==typeof t){const{eventsOnly:e,target:i}=this;this.posTop=t.top,this.posLeft=t.left,i&&!e&&(i.style.left=t.left+"px",i.style.top=t.top+"px")}else this.isMoving=t}moveInit(t){const e=this.moveState,{target:i,bounds:r}=this;e.mouseCoord=ln.fromPointerEvent(t),e.startCoord=ln.fromElementStyle(i),e.moveDist=new ln(0,0),e.totalDist=new ln(0,0),e.clickOffset=(t=>{const e=ln.fromPointerEvent(t),i=t.target.getBoundingClientRect(),r=e.x-(i.left+document.body.scrollLeft),s=e.y-(i.top+document.body.scrollTop);return new ln(r,s)})(t),e.coords=ln.fromObject(e.startCoord),e.maxX=isFinite(r.left.min)&&isFinite(r.left.max)?r.left.min+r.left.max:1/0,e.maxY=isFinite(r.top.min)&&isFinite(r.top.max)?r.top.min+r.top.max:1/0,this.isMoving=!0,this.reposition(!0),this.eventBroker("movestart",t)}eventBroker(t,e){this.moveState.posTop=this.posTop,this.moveState.posLeft=this.posLeft;const i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:{...e,...this.moveState,element:this}});this.renderRoot.dispatchEvent(i);const r=this[`on${t}`];r&&r({...e,...this.moveState,me:this})}unbind(t){null!=this.pointerId&&document.body.hasPointerCapture(this.pointerId)&&document.body.releasePointerCapture(this.pointerId),this.pointerId=null,document.body.removeEventListener("pointermove",this._onPointerMove),document.body.removeEventListener("pointerup",this._onPointerUp),document.body.removeEventListener("pointercancel",this._onPointerUp),this.listening=!1,this.moveEnd(t)}moveEnd(t){this.isMoving&&(this.isMoving=this.moveState.isMoving=!1,this.reposition(!1),this.eventBroker("moveend",t))}motionHandler(t){t.stopPropagation();const e=ln.fromPointerEvent(t),i=this.moveState,{grid:r,bounds:s,shiftBehavior:n,boundsX:o,boundsY:a}=this;if(i.moveDist=ln.fromObject({x:e.x-i.mouseCoord.x,y:e.y-i.mouseCoord.y}),i.mouseCoord=e,i.totalDist=ln.fromObject({x:i.totalDist.x+i.moveDist.x,y:i.totalDist.y+i.moveDist.y}),i.coords=ln.fromObject({x:Math.round(i.totalDist.x/r)*r+i.startCoord.x,y:Math.round(i.totalDist.y/r)*r+i.startCoord.y}),n&&t.shiftKey&&o.unconstrained&&a.unconstrained){const{x:t,y:e}=i.totalDist;Math.abs(t)>Math.abs(e)?i.coords.top=i.startCoord.y:i.coords.left=i.startCoord.x}else i.coords.y=Math.min(Math.max(s.top.min,i.coords.top),s.top.max),i.coords.x=Math.min(Math.max(s.left.min,i.coords.left),s.left.max);isFinite(i.maxX)&&(i.pctX=Math.max(s.left.min,i.coords.left)/i.maxX),isFinite(i.maxY)&&(i.pctY=Math.max(s.top.min,i.coords.top)/i.maxY),this.reposition(i.coords),this.eventBroker("move",t)}disconnectedCallback(){this.unbind({}),super.disconnectedCallback()}pointerdown(t){this.disabled||(document.body.setPointerCapture(t.pointerId),t.preventDefault(),t.stopPropagation(),void 0!==t.pointerId&&(this.pointerId=t.pointerId),this.listening||(document.body.addEventListener("pointerup",this._onPointerUp),document.body.addEventListener("pointercancel",this._onPointerUp),document.body.addEventListener("pointermove",this._onPointerMove)),this.listening=!0,this.moveInit(t))}render(){return X`<slot></slot>`}}window.customElements.get("lit-movable")||window.customElements.define("lit-movable",cn);class dn extends ut{static properties={color:{type:Object,state:!0,attribute:!1},hex:{type:String,state:!0,attribute:!1},value:{type:String},isHsl:{type:Boolean,state:!0,attribute:!1},copied:{type:String},debounceMode:{type:Boolean},buttonDisabled:{attribute:"button-disabled",type:Boolean}};static styles=tn;_color;constructor(){super(),this._color=qs.parse(Vs.slateblue),this.isHsl=!0,this.buttonDisabled=!1}firstUpdated(t){this.debounceMode=!1,t.has("value")&&(this.color=qs.parse(this.value))}updated(t){if(t.has("value")&&this.value){const t=qs.parse(this.value);!t||this._color&&t.hex===this._color.hex||(this.color=t)}}get color(){return this._color}set color(t){(t=t.hsx?t:t.rgba?qs.parse(...t.rgba):qs.parse(t))&&(this.hex=t.hex,this._color=t,Ks(this.renderRoot,t,"colorchanged"))}updateColor({detail:{color:t}}){this.color=t}setColor(t){const e=this.renderRoot.querySelector("input#hex").value,i=qs.parse(e);i?this.color=i:console.log(`ignored unparsable input: ${e}`)}setHue({detail:{h:t}}){let{s:e,l:i,a:r}=this.color.hsl;1===r&&(r=void 0),this.color={h:t,s:e,l:i,a:r}}setHsl(t){this.isHsl=t}okColor(){Ks(this.renderRoot,this.color,"colorpicked")}showCopyDialog(){if(this.copied=null,this.dlg=this.dlg??this.renderRoot.querySelector("dialog"),this.dlg.open)return this.dlg.classList.remove("open"),this.dlg.close();this.dlg.show(),this.dlg.classList.add("open")}clipboard(t){const e=this.color.toString(t);window.navigator.clipboard.writeText(e).then(()=>{this.hideCopyDialog(e)})}hideCopyDialog(t){if(t)return this.copied=t,setTimeout(()=>this.dlg.classList.remove("open"),400),void setTimeout(()=>this.hideCopyDialog(),1200);this.dlg.classList.remove("open"),this.dlg.close(),this.copied=null}setSliding({detail:t}){this.debounceMode=t.sliding}render(){const t=this.isHsl?["h","s","l"]:["h","s","v"],e={button:!0,active:!this.isHsl,l:!0},i={button:!0,active:this.isHsl,r:!0},r={backgroundColor:this.color},s=this.copied?{textAlign:"center",display:"block"}:{display:"none"},n=this.debounceMode;return X` <div class="outer">
      <hue-bar
        @sliding-hue="${this.setSliding}"
        hue="${this.color.hsx?this.color.hsx.h:this.color.hsl.h}"
        @hue-update="${this.setHue}"
        .color="${this.color}"
      ></hue-bar>
      <div class="d-flex">
        <div class="col w-30">
          ${["r","g","b","a"].map(t=>X`
              <color-input-channel
                group="rgb"
                channel="${t}"
                isHsl="${this.isHsl}"
                .color="${this.color}"
                @color-update="${this.updateColor}"
              />
            `)}
          <div class="hex">
            <dialog @blur="${()=>this.hideCopyDialog()}" tabindex="0">
              <sub class="copied" style="${gr(s)}"
                >copied <em>${this.copied}</em></sub
              >
              ${this.copied?X``:X`
                    <a
                      class="copy-item"
                      @click=${t=>this.clipboard("hex",t)}
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
                        ${Xs}
                      </button>
                    </a>
                    <a
                      class="copy-item"
                      @click=${t=>this.clipboard("css",t)}
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
                        ${Xs}
                      </button>
                    </a>
                    <a
                      class="copy-item"
                      id="copyHsl"
                      @click=${t=>this.clipboard(this.color.alpha<1?"hsla":"hsl",t)}
                    >
                      <input
                        class="form-control"
                        disabled="disabled"
                        value="${this.color.toString(this.color.alpha<1?"hsla":"hsl")}"
                      />
                      <button
                        title="Copy HSL String"
                        class="button"
                        tabindex="0"
                      >
                        ${Xs}
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
              ${Xs}
              <span>&#11205;</span>
            </a>
          </div>
        </div>
        <div class="col w-30">
          ${t.map(t=>X`
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
              class="${cr(e)}"
              @click="${()=>this.setHsl(!1)}"
              >HSV</a
            ><a
              title="Use hue / saturation / luminosity mode"
              class="${cr(i)}"
              @click="${()=>this.setHsl(!0)}"
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
                <span style="${gr(r)}"></span>
                <span class="checky"></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>`}}window.customElements.get("color-picker")||window.customElements.define("color-picker",dn);const pn="anycubic_cloud",un={keyframeOptions:{duration:250,direction:"alternate",easing:"ease-in-out"},properties:["height","opacity","scale"]},gn=["#ffffff","#000000","#c0c0c0","#ff0000","#ff8000","#ffff00","#00a000","#00c0c0","#0000ff","#8000ff","#ff00ff","#8b4513"];let _n=class extends ut{constructor(){super(...arguments),this.box_id=0,this.spoolList=[],this.spool_index=-1,this._isOpen=!1,this._changingSlot=!1,this._colourPresetChange=t=>{this.color=t.currentTarget.preset,this._elColorPicker&&(this._elColorPicker.color=this.color)},this._handleModalEvent=t=>{var e;const i=t;i.stopPropagation(),i.detail.modalOpen&&(this._isOpen=!0,this.box_id=Number(i.detail.box_id),this.spool_index=Number(i.detail.spool_index),this.material_type=null!==(e=ye(i.detail.material_type))&&void 0!==e?e:Dt.PLA,this.color=i.detail.color)},this._handleDropdownEvent=t=>{const e=t;e.stopPropagation(),e.detail.value&&(this.material_type=ye(e.detail.value))},this._handleColourEvent=t=>{const e=t;e.stopPropagation(),e.detail.color&&(this.color=e.detail.color.rgb)},this._handleColourPickEvent=t=>{this._handleColourEvent(t),this._changingSlot||this._submitSlotChanges()},this._handleSaveButton=()=>{this._submitSlotChanges()},this._closeModal=t=>{t&&t.stopPropagation(),this._isOpen=!1,this.spool_index=-1,this.material_type=void 0,this.color=void 0,this.box_id=0},this._cardClick=t=>{t.stopPropagation()}}firstUpdated(){this.addEventListener("click",t=>{this._closeModal(t)}),this.addEventListener("ac-select-dropdown",this._handleDropdownEvent),this.addEventListener("colorchanged",this._handleColourEvent),this.addEventListener("colorpicked",this._handleColourPickEvent)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.parentElement)||void 0===t||t.addEventListener("ac-mcb-modal",this._handleModalEvent)}disconnectedCallback(){var t;null===(t=this.parentElement)||void 0===t||t.removeEventListener("ac-mcb-modal",this._handleModalEvent),super.disconnectedCallback()}willUpdate(t){super.willUpdate(t),t.has("language")&&(this._heading=sr("card.spool_settings.heading",this.language),this._labelSelectMaterial=sr("card.spool_settings.label_select_material",this.language),this._labelSelectColour=sr("card.spool_settings.label_select_colour",this.language),this._labelPresetColour=sr("card.spool_settings.label_preset_colour",this.language),this._buttonSave=sr("common.actions.save",this.language))}update(t){super.update(t),this._isOpen?this.style.display="block":this.style.display="none"}render(){return X`
      <div
        class="ac-modal-container"
        style=${gr({height:"auto",opacity:1,scale:1})}
        ${Ur(Object.assign({},un))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this.color?this._renderCard():W}
        </div>
      </div>
    `}_renderCard(){return this.spool_index>=0?X`
          <div>
            <div class="ac-slot-title">
              ${this._heading}: ${this.spool_index+1}
            </div>
            <div>
              <div>
                <p class="ac-modal-label">${this._labelSelectMaterial}:</p>
                <anycubic-ui-select-dropdown
                  .availableOptions=${Dt}
                  .placeholder=${Dt.PLA}
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
        `:W}_renderPresets(){var t;return X`
      <div>
        <p class="ac-modal-label">${this._labelPresetColour}:</p>
        <div class="ac-mcb-presets">
          ${dr(null!==(t=this.slotColors)&&void 0!==t?t:gn,(t,e)=>X`
              <div
                class="ac-mcb-preset-color"
                style=${gr({"background-color":t})}
                .preset=${t}
                @click=${this._colourPresetChange}
              >
                &nbsp;
              </div>
            `)}
        </div>
      </div>
    `}_submitSlotChanges(){if(this.selectedPrinterDevice&&this.material_type&&this.spool_index>=0&&this.color&&this.color.length>=3){const t=`multi_color_box_set_slot_${this.material_type.toLowerCase()}`;this._changingSlot=!0,this.hass.callService(pn,t,{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,box_id:this.box_id,slot_number:this.spool_index+1,slot_color_red:this.color[0],slot_color_green:this.color[1],slot_color_blue:this.color[2]}).then(()=>{this._changingSlot=!1}).catch(t=>{this._changingSlot=!1}),this._closeModal()}}static get styles(){return p`
      ${ps}

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
    `}};s([ft("color-picker")],_n.prototype,"_elColorPicker",void 0),s([vt()],_n.prototype,"hass",void 0),s([vt()],_n.prototype,"language",void 0),s([vt({attribute:"selected-printer-device"})],_n.prototype,"selectedPrinterDevice",void 0),s([vt({attribute:"slot-colors"})],_n.prototype,"slotColors",void 0),s([yt()],_n.prototype,"box_id",void 0),s([yt()],_n.prototype,"spoolList",void 0),s([yt()],_n.prototype,"spool_index",void 0),s([yt()],_n.prototype,"material_type",void 0),s([yt()],_n.prototype,"color",void 0),s([yt()],_n.prototype,"_isOpen",void 0),s([yt()],_n.prototype,"_heading",void 0),s([yt()],_n.prototype,"_labelSelectMaterial",void 0),s([yt()],_n.prototype,"_labelSelectColour",void 0),s([yt()],_n.prototype,"_labelPresetColour",void 0),s([yt()],_n.prototype,"_buttonSave",void 0),s([yt()],_n.prototype,"_changingSlot",void 0),_n=s([zr("anycubic-printercard-multicolorbox_modal_spool")],_n);const bn={keyframeOptions:{duration:250,direction:"alternate",easing:"ease-in-out"},properties:["height","opacity","scale"]},mn="multi_color_box_runout_refill";let vn=class extends ut{constructor(){super(...arguments),this.box_id=0,this.spoolList=[],this._spoolsUnavailable=!1,this._changingRunout=!1,this._isOpen=!1,this._handleRunoutRefillChanged=t=>{if(this._changingRunout)return;const e=jt(this.printerEntities,this.printerEntityIdPart,"switch",1===this.box_id?"secondary_multi_color_box_runout_refill":mn);e&&(this._changingRunout=!0,this.hass.callService("switch","toggle",{entity_id:e.entity_id}).then(()=>{this._changingRunout=!1}).catch(t=>{this._changingRunout=!1}))},this._editSpool=t=>{const e=t.currentTarget.index,i=t.currentTarget.material_type,r=t.currentTarget.color;this._isOpen=!1,xt(this,"ac-mcb-modal",{modalOpen:!0,box_id:this.box_id,spool_index:e,material_type:i,color:r})},this._handleModalEvent=t=>{const e=t;e.stopPropagation(),e.detail.modalOpen&&(this._isOpen=!0,this.box_id=Number(e.detail.box_id))},this._closeModal=t=>{t&&t.stopPropagation(),this._isOpen=!1},this._cardClick=t=>{t.stopPropagation()}}firstUpdated(){this.addEventListener("click",t=>{this._closeModal(t)})}connectedCallback(){var t;super.connectedCallback(),null===(t=this.parentElement)||void 0===t||t.addEventListener("ac-mcbsettings-modal",this._handleModalEvent)}disconnectedCallback(){var t;null===(t=this.parentElement)||void 0===t||t.removeEventListener("ac-mcbsettings-modal",this._handleModalEvent),super.disconnectedCallback()}willUpdate(t){if(super.willUpdate(t),t.has("language")&&(this._heading=sr("card.ace_settings.heading",this.language),this._labelRunoutRefill=sr("card.buttons.runout_refill",this.language),this._labelSpools=sr("card.ace_settings.label_spools",this.language),this._hintSpoolsUnavailable=sr("card.ace_settings.hint_spools_unavailable",this.language)),t.has("box_id")||t.has("hass")||t.has("printerEntities")||t.has("printerEntityIdPart")){const t=ie(this.hass,this.printerEntities,this.printerEntityIdPart,1===this.box_id?"secondary_ace_spools":"ace_spools","not loaded",{spool_info:[]}).attributes.spool_info;this.spoolList=Array.isArray(t)?t:[],this._spoolsUnavailable=0===this.spoolList.length,this._runoutRefillState=Wt(this.hass,this.printerEntities,this.printerEntityIdPart,1===this.box_id?"secondary_multi_color_box_runout_refill":mn)}}update(t){super.update(t),this._isOpen?this.style.display="block":this.style.display="none"}render(){return X`
      <div
        class="ac-modal-container"
        style=${gr({height:"auto",opacity:1,scale:1})}
        ${Ur(Object.assign({},bn))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this._isOpen?this._renderCard():W}
        </div>
      </div>
    `}_renderCard(){var t;return X`
      <div class="ac-slot-title">${this._heading}</div>
      <div class="ac-settings-switch-row">
        <span>${this._labelRunoutRefill}</span>
        <anycubic-ui-toggle-switch
          .checked=${"on"===(null===(t=this._runoutRefillState)||void 0===t?void 0:t.state)}
          .disabled=${this._changingRunout||!this._runoutRefillState||"unavailable"===this._runoutRefillState.state}
          @ac-toggle-change=${this._handleRunoutRefillChanged}
        ></anycubic-ui-toggle-switch>
      </div>
      <p class="ac-modal-label">${this._labelSpools}</p>
      ${this._spoolsUnavailable?X`<p class="ac-settings-hint">${this._hintSpoolsUnavailable}</p>`:W}
      <div class="ac-settings-spool-list">
        ${dr(this._displaySpoolList(),(t,e)=>{const i={"background-color":t.spool_loaded?`rgb(${t.color[0]}, ${t.color[1]}, ${t.color[2]})`:"#aaa"};return X`
              <button
                class="ac-settings-spool-row"
                .index=${e}
                .material_type=${t.material_type}
                .color=${t.color}
                @click=${this._editSpool}
              >
                <span
                  class="ac-settings-spool-ring"
                  style=${gr(i)}
                  >${e+1}</span
                >
                <span class="ac-settings-spool-material">
                  ${t.spool_loaded?t.material_type:"---"}
                </span>
              </button>
            `})}
      </div>
    `}_displaySpoolList(){return this.spoolList.length>0?this.spoolList:[0,1,2,3].map(()=>({material_type:"PLA",color:[170,170,170],status:0,spool_loaded:!1}))}static get styles(){return p`
      ${ps}

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
    `}};s([vt()],vn.prototype,"hass",void 0),s([vt()],vn.prototype,"language",void 0),s([vt({attribute:"printer-entities"})],vn.prototype,"printerEntities",void 0),s([vt({attribute:"printer-entity-id-part"})],vn.prototype,"printerEntityIdPart",void 0),s([vt()],vn.prototype,"box_id",void 0),s([yt()],vn.prototype,"spoolList",void 0),s([yt()],vn.prototype,"_spoolsUnavailable",void 0),s([yt()],vn.prototype,"_runoutRefillState",void 0),s([yt()],vn.prototype,"_changingRunout",void 0),s([yt()],vn.prototype,"_isOpen",void 0),s([yt()],vn.prototype,"_heading",void 0),s([yt()],vn.prototype,"_labelRunoutRefill",void 0),s([yt()],vn.prototype,"_labelSpools",void 0),s([yt()],vn.prototype,"_hintSpoolsUnavailable",void 0),vn=s([zr("anycubic-printercard-multicolorbox_modal_settings")],vn);const yn={keyframeOptions:{duration:250,direction:"alternate",easing:"ease-in-out"},properties:["height","opacity","scale"]};let fn=class extends ut{constructor(){super(...arguments),this.availableSpeedModes={},this.isFDM=!1,this.currentSpeedModeKey=0,this.currentSpeedModeDescr=void 0,this._userEditSpeedMode=!1,this.currentFanSpeed=0,this._userEditFanSpeed=!1,this.currentAuxFanSpeed=0,this._userEditAuxFanSpeed=!1,this.currentBoxFanSpeed=0,this._userEditBoxFanSpeed=!1,this.currentTargetTempNozzle=0,this.minTargetTempNozzle=0,this.maxTargetTempNozzle=0,this._userEditTargetTempNozzle=!1,this.currentTargetTempHotbed=0,this.minTargetTempHotbed=0,this.maxTargetTempHotbed=0,this._userEditTargetTempHotbed=!1,this._isOpen=!1,this._pressingRetract=!1,this._pressingExtrude=!1,this._pressingFinishJob=!1,this._changingSettings=!1,this._setConfirmationMode=t=>{this._confirmationType=t.currentTarget.confirmation_type,this._confirmMessage=sr("card.print_settings.confirm_message",this.language,"action",sr("common.actions."+this._confirmationType,this.language))},this._pressFinishJob=()=>{this._pressingFinishJob=!0,this.hass.callService("button","press",{entity_id:Vt(this.printerEntities,"button","clear_completed_print_job")}).then(()=>{this._pressingFinishJob=!1}).catch(t=>{this._pressingFinishJob=!1})},this._pressRetractFilament=()=>{this._pressingRetract=!0,this.hass.callService("button","press",{entity_id:Vt(this.printerEntities,"button","retract_filament")}).then(()=>{this._pressingRetract=!1}).catch(t=>{this._pressingRetract=!1})},this._pressExtrudeFilament=()=>{this._pressingExtrude=!0,this.hass.callService("button","press",{entity_id:Vt(this.printerEntities,"button","extrude_filament")}).then(()=>{this._pressingExtrude=!1}).catch(t=>{this._pressingExtrude=!1})},this._handleConfirmApprove=()=>{switch(this._confirmationType){case kt.PAUSE:this._pressHassButton("pause_print");break;case kt.RESUME:this._pressHassButton("resume_print");break;case kt.CANCEL:this._pressHassButton("stop_print")}this._confirmationType=void 0,this._closeModal()},this._handleConfirmCancel=()=>{this._confirmationType=void 0},this._handleFanSpeedChange=t=>{const e=t.currentTarget.value;this.currentFanSpeed=e,this._userEditFanSpeed=!0},this._handleAuxFanSpeedChange=t=>{const e=t.currentTarget.value;this.currentAuxFanSpeed=e,this._userEditAuxFanSpeed=!0},this._handleBoxFanSpeedChange=t=>{const e=t.currentTarget.value;this.currentBoxFanSpeed=e,this._userEditBoxFanSpeed=!0},this._handleFanSpeedKeyDown=t=>{"Enter"===t.code?(t.preventDefault(),this._submitChangedFanSpeed()):this._userEditFanSpeed=!0},this._handleAuxFanSpeedKeyDown=t=>{"Enter"===t.code?(t.preventDefault(),this._submitChangedAuxFanSpeed()):this._userEditAuxFanSpeed=!0},this._handleBoxFanSpeedKeyDown=t=>{"Enter"===t.code?(t.preventDefault(),this._submitChangedBoxFanSpeed()):this._userEditBoxFanSpeed=!0},this._handleTargetTempNozzleChange=t=>{const e=t.currentTarget.value;this.currentTargetTempNozzle=e,this._userEditTargetTempNozzle=!0},this._handleTargetTempHotbedChange=t=>{const e=t.currentTarget.value;this.currentTargetTempHotbed=e,this._userEditTargetTempHotbed=!0},this._handleTargetTempNozzleKeyDown=t=>{"Enter"===t.code?(t.preventDefault(),this._submitChangedTargetTempNozzle()):this._userEditTargetTempNozzle=!0},this._handleTargetTempHotbedKeyDown=t=>{"Enter"===t.code?(t.preventDefault(),this._submitChangedTargetTempHotbed()):this._userEditTargetTempHotbed=!0},this._handleModalEvent=t=>{const e=t;e.stopPropagation(),e.detail.modalOpen&&(this._isOpen=!0,this._resetUserEdits())},this._handleDropdownEvent=t=>{const e=t;e.stopPropagation(),this._userEditSpeedMode=!0,void 0!==e.detail.key&&(this.currentSpeedModeKey=e.detail.key,this.currentSpeedModeDescr=this.currentSpeedModeKey>=0&&this.currentSpeedModeKey in this.availableSpeedModes?this.availableSpeedModes[this.currentSpeedModeKey]:void 0)},this._handleSaveFanSpeedButton=()=>{this._submitChangedFanSpeed(),this._resetUserEdits()},this._handleSaveAuxFanSpeedButton=()=>{this._submitChangedAuxFanSpeed(),this._resetUserEdits()},this._handleSaveBoxFanSpeedButton=()=>{this._submitChangedBoxFanSpeed(),this._resetUserEdits()},this._handleSaveSpeedModeButton=()=>{this._submitChangedSpeedMode(),this._resetUserEdits()},this._handleSaveTargetTempNozzleButton=()=>{this._submitChangedTargetTempNozzle(),this._resetUserEdits()},this._handleSaveTargetTempHotbedButton=()=>{this._submitChangedTargetTempHotbed(),this._resetUserEdits()},this._closeModal=t=>{t&&t.stopPropagation(),this._isOpen=!1,this._resetUserEdits()},this._cardClick=t=>{t.stopPropagation()}}firstUpdated(){this.addEventListener("ac-select-dropdown",this._handleDropdownEvent),this.addEventListener("click",t=>{this._closeModal(t)})}connectedCallback(){var t;super.connectedCallback(),null===(t=this.parentElement)||void 0===t||t.addEventListener("ac-printset-modal",this._handleModalEvent)}disconnectedCallback(){var t;null===(t=this.parentElement)||void 0===t||t.removeEventListener("ac-printset-modal",this._handleModalEvent),super.disconnectedCallback()}willUpdate(t){var e;if(super.willUpdate(t),t.has("language")&&(this._labelNozzleTemperature=sr("card.print_settings.label_nozzle_temp",this.language),this._labelHotbedTemperature=sr("card.print_settings.label_hotbed_temp",this.language),this._labelFanSpeed=sr("card.print_settings.label_fan_speed",this.language),this._labelAuxFanSpeed=sr("card.print_settings.label_aux_fan_speed",this.language),this._labelBoxFanSpeed=sr("card.print_settings.label_box_fan_speed",this.language),this._buttonYes=sr("common.actions.yes",this.language),this._buttonNo=sr("common.actions.no",this.language),this._buttonPrintPause=sr("card.print_settings.print_pause",this.language),this._buttonPrintResume=sr("card.print_settings.print_resume",this.language),this._buttonPrintCancel=sr("card.print_settings.print_cancel",this.language),this._buttonFinishJob=sr("card.print_settings.print_finish_job",this.language),this._buttonRetractFilament=sr("card.print_settings.retract_filament",this.language),this._buttonExtrudeFilament=sr("card.print_settings.extrude_filament",this.language),this._buttonSaveSpeedMode=sr("card.print_settings.save_speed_mode",this.language),this._buttonSaveTargetNozzle=sr("card.print_settings.save_target_nozzle",this.language),this._buttonSaveTargetHotbed=sr("card.print_settings.save_target_hotbed",this.language),this._buttonSaveFanSpeed=sr("card.print_settings.save_fan_speed",this.language),this._buttonSaveAuxFanSpeed=sr("card.print_settings.save_aux_fan_speed",this.language),this._buttonSaveBoxFanSpeed=sr("card.print_settings.save_box_fan_speed",this.language)),t.has("hass")||t.has("printerEntities")||t.has("printerEntityIdPart")){if(this.isFDM=ae(this.hass,this.printerEntities,this.printerEntityIdPart),this._userEditFanSpeed||(this.currentFanSpeed=Number(ie(this.hass,this.printerEntities,this.printerEntityIdPart,"fan_speed",0).state)),!this._userEditTargetTempNozzle){const t=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"target_nozzle_temperature",0,{limit_min:0,limit_max:0});this.currentTargetTempNozzle=Number(t.state),this.minTargetTempNozzle=t.attributes.limit_min,this.maxTargetTempNozzle=t.attributes.limit_max}if(!this._userEditTargetTempHotbed){const t=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"target_hotbed_temperature",0,{limit_min:0,limit_max:0});this.currentTargetTempHotbed=Number(t.state),this.minTargetTempHotbed=t.attributes.limit_min,this.maxTargetTempHotbed=t.attributes.limit_max}if(!this._userEditSpeedMode){const t=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_speed_mode","",{available_modes:[],print_speed_mode_code:-1});this.availableSpeedModes=ve(t),this.currentSpeedModeKey=null!==(e=t.attributes.print_speed_mode_code)&&void 0!==e?e:-1,this.currentSpeedModeDescr=this.currentSpeedModeKey>=0&&this.currentSpeedModeKey in this.availableSpeedModes?this.availableSpeedModes[this.currentSpeedModeKey]:void 0}}}update(t){super.update(t),this._isOpen?this.style.display="block":this.style.display="none"}render(){return X`
      <div
        class="ac-modal-container"
        style=${gr({height:"auto",opacity:1,scale:1})}
        ${Ur(Object.assign({},yn))}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this._renderCard()}
        </div>
      </div>
    `}_renderCard(){return this._confirmationType?this._renderConfirm():this._renderSettings()}_renderConfirm(){return X`
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
    `}_renderSettings(){return X`
      <div>
        <div class="ac-settings-header">Print Settings</div>
        <div>
          <div class="ac-settings-row ac-settings-buttonrow">
            <ha-control-button
              .confirmation_type=${kt.PAUSE}
              @click=${this._setConfirmationMode}
            >
              ${this._buttonPrintPause}
            </ha-control-button>
          </div>
          <div class="ac-settings-row ac-settings-buttonrow">
            <ha-control-button
              .confirmation_type=${kt.RESUME}
              @click=${this._setConfirmationMode}
            >
              ${this._buttonPrintResume}
            </ha-control-button>
          </div>
          <div class="ac-settings-row ac-settings-buttonrow">
            <ha-control-button
              .confirmation_type=${kt.CANCEL}
              @click=${this._setConfirmationMode}
            >
              ${this._buttonPrintCancel}
            </ha-control-button>
          </div>
          ${this.isFDM?X`
                  <div class="ac-settings-row ac-settings-buttonrow">
                    ${Vt(this.printerEntities,"button","clear_completed_print_job")?X` <ha-control-button
                            .disabled=${this._pressingFinishJob}
                            @click=${this._pressFinishJob}
                          >
                            ${this._buttonFinishJob}
                          </ha-control-button>`:W}
                  </div>
                  <div class="ac-settings-row ac-settings-buttonrow-split">
                    ${Vt(this.printerEntities,"button","retract_filament")?X` <ha-control-button
                            .disabled=${this._pressingRetract}
                            @click=${this._pressRetractFilament}
                          >
                            ${this._buttonRetractFilament}
                          </ha-control-button>`:W}
                    ${Vt(this.printerEntities,"button","extrude_filament")?X` <ha-control-button
                            .disabled=${this._pressingExtrude}
                            @click=${this._pressExtrudeFilament}
                          >
                            ${this._buttonExtrudeFilament}
                          </ha-control-button>`:W}
                  </div>
                `:W}
          ${this.isFDM?X`
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
                      <label class="ac-input-label"
                        >${this._labelFanSpeed}</label
                      >
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
                `:W}
        </div>
      </div>
    `}_pressHassButton(t){const e=Vt(this.printerEntities,"button",t);e&&(this._changingSettings=!0,this.hass.callService("button","press",{entity_id:e}).then(()=>{this._changingSettings=!1}).catch(()=>{this._changingSettings=!1}))}_resetUserEdits(){this._userEditFanSpeed=!1,this._userEditAuxFanSpeed=!1,this._userEditBoxFanSpeed=!1,this._userEditTargetTempNozzle=!1,this._userEditTargetTempHotbed=!1,this._userEditSpeedMode=!1}_submitChangedSpeedMode(){if(this._userEditSpeedMode&&this.selectedPrinterDevice){const t="change_print_speed_mode";this._changingSettings=!0,this.hass.callService(pn,t,{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,speed_mode:this.currentSpeedModeKey}).then(()=>{this._changingSettings=!1}).catch(t=>{this._changingSettings=!1}),this._closeModal()}}_submitChangedFanSpeed(){if(this._userEditFanSpeed&&this.selectedPrinterDevice){const t="change_print_fan_speed";this._changingSettings=!0,this.hass.callService(pn,t,{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,speed:this.currentFanSpeed}).then(()=>{this._changingSettings=!1}).catch(t=>{this._changingSettings=!1}),this._closeModal()}}_submitChangedAuxFanSpeed(){if(this._userEditAuxFanSpeed&&this.selectedPrinterDevice){const t="change_print_aux_fan_speed";this._changingSettings=!0,this.hass.callService(pn,t,{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,speed:this.currentAuxFanSpeed}).then(()=>{this._changingSettings=!1}).catch(t=>{this._changingSettings=!1}),this._closeModal()}}_submitChangedBoxFanSpeed(){if(this._userEditBoxFanSpeed&&this.selectedPrinterDevice){const t="change_print_box_fan_speed";this._changingSettings=!0,this.hass.callService(pn,t,{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,speed:this.currentBoxFanSpeed}).then(()=>{this._changingSettings=!1}).catch(t=>{this._changingSettings=!1}),this._closeModal()}}_submitChangedTargetTempNozzle(){if(this._userEditTargetTempNozzle&&this.selectedPrinterDevice){const t="change_print_target_nozzle_temperature";this._changingSettings=!0,this.hass.callService(pn,t,{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,temperature:this.currentTargetTempNozzle}).then(()=>{this._changingSettings=!1}).catch(t=>{this._changingSettings=!1}),this._closeModal()}}_submitChangedTargetTempHotbed(){if(this._userEditTargetTempHotbed&&this.selectedPrinterDevice){const t="change_print_target_hotbed_temperature";this._changingSettings=!0,this.hass.callService(pn,t,{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,temperature:this.currentTargetTempHotbed}).then(()=>{this._changingSettings=!1}).catch(t=>{this._changingSettings=!1}),this._closeModal()}}static get styles(){return p`
      ${ps}

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
    `}};s([vt()],fn.prototype,"hass",void 0),s([vt()],fn.prototype,"language",void 0),s([vt({attribute:"selected-printer-device"})],fn.prototype,"selectedPrinterDevice",void 0),s([vt({attribute:"printer-entities"})],fn.prototype,"printerEntities",void 0),s([vt({attribute:"printer-entity-id-part"})],fn.prototype,"printerEntityIdPart",void 0),s([yt()],fn.prototype,"availableSpeedModes",void 0),s([yt()],fn.prototype,"isFDM",void 0),s([yt()],fn.prototype,"currentSpeedModeKey",void 0),s([yt()],fn.prototype,"currentSpeedModeDescr",void 0),s([yt()],fn.prototype,"_userEditSpeedMode",void 0),s([yt()],fn.prototype,"currentFanSpeed",void 0),s([yt()],fn.prototype,"_userEditFanSpeed",void 0),s([yt()],fn.prototype,"currentAuxFanSpeed",void 0),s([yt()],fn.prototype,"_userEditAuxFanSpeed",void 0),s([yt()],fn.prototype,"currentBoxFanSpeed",void 0),s([yt()],fn.prototype,"_userEditBoxFanSpeed",void 0),s([yt()],fn.prototype,"currentTargetTempNozzle",void 0),s([yt()],fn.prototype,"minTargetTempNozzle",void 0),s([yt()],fn.prototype,"maxTargetTempNozzle",void 0),s([yt()],fn.prototype,"_userEditTargetTempNozzle",void 0),s([yt()],fn.prototype,"currentTargetTempHotbed",void 0),s([yt()],fn.prototype,"minTargetTempHotbed",void 0),s([yt()],fn.prototype,"maxTargetTempHotbed",void 0),s([yt()],fn.prototype,"_userEditTargetTempHotbed",void 0),s([yt()],fn.prototype,"_confirmationType",void 0),s([yt()],fn.prototype,"_isOpen",void 0),s([yt()],fn.prototype,"_confirmMessage",void 0),s([yt()],fn.prototype,"_labelNozzleTemperature",void 0),s([yt()],fn.prototype,"_labelHotbedTemperature",void 0),s([yt()],fn.prototype,"_labelFanSpeed",void 0),s([yt()],fn.prototype,"_labelAuxFanSpeed",void 0),s([yt()],fn.prototype,"_labelBoxFanSpeed",void 0),s([yt()],fn.prototype,"_buttonYes",void 0),s([yt()],fn.prototype,"_buttonNo",void 0),s([yt()],fn.prototype,"_buttonPrintPause",void 0),s([yt()],fn.prototype,"_buttonPrintResume",void 0),s([yt()],fn.prototype,"_buttonPrintCancel",void 0),s([yt()],fn.prototype,"_buttonFinishJob",void 0),s([yt()],fn.prototype,"_buttonRetractFilament",void 0),s([yt()],fn.prototype,"_buttonExtrudeFilament",void 0),s([yt()],fn.prototype,"_pressingRetract",void 0),s([yt()],fn.prototype,"_pressingExtrude",void 0),s([yt()],fn.prototype,"_pressingFinishJob",void 0),s([yt()],fn.prototype,"_buttonSaveSpeedMode",void 0),s([yt()],fn.prototype,"_buttonSaveTargetNozzle",void 0),s([yt()],fn.prototype,"_buttonSaveTargetHotbed",void 0),s([yt()],fn.prototype,"_buttonSaveFanSpeed",void 0),s([yt()],fn.prototype,"_buttonSaveAuxFanSpeed",void 0),s([yt()],fn.prototype,"_buttonSaveBoxFanSpeed",void 0),s([yt()],fn.prototype,"_changingSettings",void 0),fn=s([zr("anycubic-printercard-printsettings_modal")],fn);const xn={keyframeOptions:{duration:250,direction:"normal",easing:"ease-in-out"},properties:["height","opacity","scale"]},En=me(),wn=[Ct.DryingStatus,Ct.AceTempCurrent,Ct.AceTempTarget,Ct.DryingTime];let $n=class extends ut{constructor(){super(...arguments),this.monitoredStats=En,this.round=!0,this.temperatureUnit=$t.C,this._showVideo=!1,this.cameraEntityState=void 0,this.isHidden=!1,this.isPrinting=!1,this.hiddenOverride=!1,this.lightIsOn=!1,this.statusColor="#ffc107",this.progressPercent=0,this._togglingLight=!1,this._togglingPower=!1,this.deviceType=Et.PRINTER,this.linkedDevices=[],this._fwUpdateAvailable=!1,this._togglingBridgeMqtt=!1,this._refreshingBridge=!1,this._toggleVideo=()=>{this._showVideo=!(!this.cameraEntityState||this._showVideo)},this._openPrintSettingsModal=()=>{xt(this._printerCardContainer,"ac-printset-modal",{modalOpen:!0})},this._openAceSettingsModal=()=>{xt(this._printerCardContainer,"ac-mcbsettings-modal",{modalOpen:!0,box_id:Ut(this.printerEntities)})},this._toggleLightEntity=()=>{this._effectiveLightEntityId&&(this._togglingLight=!0,this.hass.callService("homeassistant","toggle",{entity_id:this._effectiveLightEntityId}).then(()=>{this._togglingLight=!1}).catch(t=>{this._togglingLight=!1}))},this._togglePowerEntity=()=>{this.powerEntityId&&(this._togglingPower=!0,this.hass.callService("homeassistant","toggle",{entity_id:this.powerEntityId}).then(()=>{this._togglingPower=!1}).catch(t=>{this._togglingPower=!1}))},this._toggleHiddenOveride=()=>{this.hiddenOverride=!this.hiddenOverride},this._toggleBridgeMqtt=()=>{const t=jt(this.printerEntities,this.printerEntityIdPart,"switch","manual_mqtt_connection_enabled");t&&(this._togglingBridgeMqtt=!0,this.hass.callService("switch","toggle",{entity_id:t.entity_id}).then(()=>{this._togglingBridgeMqtt=!1}).catch(t=>{this._togglingBridgeMqtt=!1}))},this._pressBridgeRefresh=()=>{const t=jt(this.printerEntities,this.printerEntityIdPart,"button","manual_mqtt_connection_refresh");t&&(this._refreshingBridge=!0,this.hass.callService("button","press",{entity_id:t.entity_id}).then(()=>{this._refreshingBridge=!1}).catch(t=>{this._refreshingBridge=!1}))},this._handleLinkedDeviceClick=t=>{if(!this.route)return;const e=t.currentTarget.printer_id,i=this.route.prefix;history.pushState(null,"",`${i}/${e}/main`),xt(window,"location-changed",{replace:!1})}}willUpdate(t){var e,i;super.willUpdate(t),t.has("language")&&(this._buttonPrintSettings=sr("card.buttons.print_settings",this.language),this._labelBridgeMqtt=sr("card.bridge.mqtt_connection",this.language),this._labelBridgeRefresh=sr("card.bridge.refresh_connection",this.language),this._labelGoToPrinter=sr("card.linked_devices.go_to_printer",this.language),this._labelGoToAce=sr("card.linked_devices.go_to_ace",this.language),this._labelUpdateAvailable=sr("card.badges.update_available",this.language),this._buttonAceSettings=sr("card.buttons.ace_settings",this.language)),t.has("monitoredStats")&&(this.monitoredStats=(e=this.monitoredStats,i=En,void 0===e?i:e)),(t.has("selectedPrinterDevice")||t.has("selectedPrinterID"))&&(this.deviceType=Nt(this.selectedPrinterDevice)),(t.has("hass")||t.has("selectedPrinterID")||t.has("selectedPrinterDevice"))&&(this.printerEntities=Rt(this.hass,this.selectedPrinterID),this.deviceType===Et.ACE?this.printerEntityIdPart=Xt(this.printerEntities):this.deviceType===Et.BRIDGE?this.printerEntityIdPart=Yt(this.printerEntities):this.printerEntityIdPart=Zt(this.printerEntities)),(t.has("printers")||t.has("selectedPrinterDevice"))&&(this.linkedDevices=function(t,e){if(!t||!e)return[];if(Nt(e)===Et.ACE){const i=e.via_device_id?t[e.via_device_id]:void 0;return i?[i]:[]}return Object.values(t).filter(t=>t.via_device_id===e.id)}(this.printers,this.selectedPrinterDevice)),(t.has("hass")||t.has("alwaysShow")||t.has("hiddenOverride")||t.has("selectedPrinterID")||t.has("selectedPrinterDevice"))&&(this.deviceType===Et.BRIDGE?this._willUpdateBridge():this.deviceType===Et.ACE?this._willUpdateAce():this._willUpdatePrinter())}_willUpdatePrinter(){var t,e,i;this.progressPercent=this._percentComplete(),this.cameraEntityId&&(this.cameraEntityState=Ft(this.hass,{entity_id:this.cameraEntityId}));const r=Vt(this.printerEntities,"light","printer_light"),s=!!r&&!!Ft(this.hass,{entity_id:r});this._effectiveLightEntityId=null!==(t=this.lightEntityId)&&void 0!==t?t:s?r:void 0,this.lightIsOn=Ot(this.hass,{entity_id:null!==(e=this._effectiveLightEntityId)&&void 0!==e?e:""},!0,!1);const n=ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_state","unknown").state.toLowerCase();this.isPrinting=ce(n);const o=null===(i=this.alwaysShow)||void 0===i||i;this.isHidden=!o&&(!this.hiddenOverride&&!this.isPrinting),this.statusColor=function(t){return"preheating"===t?"#ffc107":ce(t)?"#4caf50":"unknown"===t?"#f44336":"operational"===t||"finished"===t?"#00bcd4":"#f44336"}(n),this._fwUpdateAvailable="Update Available"===oe(this.hass,this.printerEntities,this.printerEntityIdPart,"printer_firmware")}_willUpdateAce(){this.isHidden=!1,this._fwUpdateAvailable="Update Available"===oe(this.hass,this.printerEntities,this.printerEntityIdPart,"ace_firmware");const t=se(this.hass,this.printerEntities,this.printerEntityIdPart,"drying_active",!0,!1,!1);this.statusColor=t?"#4caf50":"#8a8a8a"}_willUpdateBridge(){this.isHidden=!1,this._bridgeMqttState=Wt(this.hass,this.printerEntities,this.printerEntityIdPart,"manual_mqtt_connection_enabled"),this._bridgeRefreshState=Jt(this.hass,this.printerEntities,this.printerEntityIdPart,"manual_mqtt_connection_refresh"),this.statusColor=this._bridgeMqttState&&"on"===this._bridgeMqttState.state?"#4caf50":"#8a8a8a"}render(){switch(this.deviceType){case Et.BRIDGE:return this._renderBridgeCard();case Et.ACE:return this._renderAceCard();default:return this._renderPrinterCard()}}_renderPrinterCard(){const t={"ac-hidden":!this._showVideo};return X`
      <div class="ac-printer-card">
        <div class="ac-printer-card-mainview">
          ${this._renderHeader()} ${this._renderPrinterContainer()}
          ${this._renderLinkedDevicesRow()}
        </div>
        <anycubic-printercard-camera_view
          class=${cr(t)}
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
    `}_renderAceCard(){var t;const e={"background-color":this.statusColor};return X`
      <div class="ac-printer-card ac-simple-card">
        <div class="ac-printer-card-mainview">
          <div class="ac-printer-card-header ac-h-justifycenter">
            <div
              class="ac-printer-card-header-status-dot"
              style=${gr(e)}
            ></div>
            <p class="ac-printer-card-header-status-text">
              ${null===(t=this.selectedPrinterDevice)||void 0===t?void 0:t.name}
            </p>
            ${this._renderFwBadge()}
          </div>
          <div
            class="ac-printer-card-infocontainer"
            ${Ur(Object.assign({},xn))}
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
                .box_id=${Ut(this.printerEntities)}
                .inline=${!0}
              ></anycubic-printercard-multicolorbox_modal_drying>
            </div>
            <div class="ac-printer-card-info-statscontainer">
              <anycubic-printercard-stats-component
                .hass=${this.hass}
                .language=${this.language}
                .monitoredStats=${wn}
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
                <ha-svg-icon .path=${nr}></ha-svg-icon>
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
          .box_id=${Ut(this.printerEntities)}
        ></anycubic-printercard-multicolorbox_modal_settings>
      </div>
    `}_renderBridgeCard(){var t,e;const i={"background-color":this.statusColor};return X`
      <div class="ac-printer-card ac-simple-card">
        <div class="ac-printer-card-mainview">
          <div class="ac-printer-card-header ac-h-justifycenter">
            <div
              class="ac-printer-card-header-status-dot"
              style=${gr(i)}
            ></div>
            <p class="ac-printer-card-header-status-text">
              ${null===(t=this.selectedPrinterDevice)||void 0===t?void 0:t.name}
            </p>
          </div>
          <div class="ac-bridge-card-body">
            <div class="ac-switch-row">
              <span class="ac-switch-row-label">${this._labelBridgeMqtt}</span>
              <anycubic-ui-toggle-switch
                .checked=${"on"===(null===(e=this._bridgeMqttState)||void 0===e?void 0:e.state)}
                .disabled=${this._togglingBridgeMqtt||!this._bridgeMqttState||"unavailable"===this._bridgeMqttState.state}
                @ac-toggle-change=${this._toggleBridgeMqtt}
              ></anycubic-ui-toggle-switch>
            </div>
            <ha-control-button
              .disabled=${this._refreshingBridge||!this._bridgeRefreshState||"unavailable"===this._bridgeRefreshState.state}
              @click=${this._pressBridgeRefresh}
            >
              <ha-svg-icon .path=${"M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"}></ha-svg-icon>
              ${this._labelBridgeRefresh}
            </ha-control-button>
          </div>
          ${this._renderLinkedDevicesRow()}
        </div>
      </div>
    `}_renderFwBadge(){return this._fwUpdateAvailable?X`<span class="ac-badge-update">${this._labelUpdateAvailable}</span>`:W}_renderLinkedDevicesRow(){if(!this.linkedDevices.length)return W;const t=this.deviceType===Et.ACE?this._labelGoToPrinter:this._labelGoToAce;return X`
      <div class="ac-linked-devices">
        ${dr(this.linkedDevices,e=>X`
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
    `}_renderHeader(){var t;const e={"ac-h-justifycenter":!(this.powerEntityId&&this._effectiveLightEntityId)},i={"background-color":this.statusColor};return X`
      <div class="ac-printer-card-header ${cr(e)}">
        ${this.powerEntityId?X`
                <button
                  class="ac-printer-card-button-small"
                  .disabled=${this._togglingPower}
                  @click=${this._togglePowerEntity}
                >
                  <ha-svg-icon .path=${"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13"}></ha-svg-icon>
                </button>
              `:W}

        <button
          class="ac-printer-card-button-name"
          @click=${this._toggleHiddenOveride}
        >
          <div
            class="ac-printer-card-header-status-dot"
            style=${gr(i)}
          ></div>
          <p class="ac-printer-card-header-status-text">
            ${null===(t=this.selectedPrinterDevice)||void 0===t?void 0:t.name}
          </p>
          ${this._renderFwBadge()}
        </button>
        ${this._effectiveLightEntityId?X`
                <button
                  class="ac-printer-card-button-small"
                  .disabled=${this._togglingLight}
                  @click=${this._toggleLightEntity}
                >
                  <ha-svg-icon
                    .path=${this.lightIsOn?"M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z":"M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z"}
                  ></ha-svg-icon>
                </button>
              `:W}
      </div>
    `}_renderPrinterContainer(){const t={"ac-card-vertical":!!this.vertical},e={height:this.isHidden?"1px":"auto",opacity:this.isHidden?0:1,scale:this.isHidden?0:1},i={width:this.vertical?"100%":this.scaleFactor?String(50*this.scaleFactor)+"%":"50%"},r={width:this.vertical?"100%":this.scaleFactor?String(50/this.scaleFactor)+"%":"50%"};return X`
      <div
        class="ac-printer-card-infocontainer ${cr(t)}"
        style=${gr(e)}
        ${Ur(Object.assign({},xn))}
      >
        <div
          class="ac-printer-card-info-animcontainer ${cr(t)}"
          style=${gr(i)}
        >
          <anycubic-printercard-printer_view
            .hass=${this.hass}
            .printerEntities=${this.printerEntities}
            .printerEntityIdPart=${this.printerEntityIdPart}
            .scaleFactor=${this.scaleFactor}
            .toggleVideo=${this._toggleVideo}
          ></anycubic-printercard-printer_view>
          ${this.vertical?X`<p class="ac-printer-card-info-vertprog">
                  ${this.round?Math.round(this.progressPercent):this.progressPercent}%
                </p>`:W}
        </div>
        <div
          class="ac-printer-card-info-statscontainer ${cr(t)}"
          style=${gr(r)}
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
    `}_renderPrintSettingsContainer(){const t={"ac-card-vertical":!!this.vertical},e={height:this.isHidden?"1px":"auto",opacity:this.isHidden?0:1,scale:this.isHidden?0:1};return this.showSettingsButton||this.isPrinting?X`
          <div
            class="ac-printer-card-infocontainer ${cr(t)}"
            style=${gr(e)}
            ${Ur(Object.assign({},xn))}
          >
            <div
              class="ac-printer-card-settingssection ${cr(t)}"
            >
              <button
                class="ac-printer-card-button-settings"
                @click=${this._openPrintSettingsModal}
              >
                <ha-svg-icon .path=${nr}></ha-svg-icon>
                ${this._buttonPrintSettings}
              </button>
            </div>
          </div>
        `:W}_percentComplete(){return Number(ie(this.hass,this.printerEntities,this.printerEntityIdPart,"job_progress",-1).state)}static get styles(){return p`
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
    `}};s([ft(".ac-printer-card")],$n.prototype,"_printerCardContainer",void 0),s([vt()],$n.prototype,"hass",void 0),s([vt()],$n.prototype,"language",void 0),s([vt({attribute:"monitored-stats"})],$n.prototype,"monitoredStats",void 0),s([vt({attribute:"selected-printer-id"})],$n.prototype,"selectedPrinterID",void 0),s([vt({attribute:"selected-printer-device"})],$n.prototype,"selectedPrinterDevice",void 0),s([vt()],$n.prototype,"printers",void 0),s([vt()],$n.prototype,"route",void 0),s([vt({type:Boolean})],$n.prototype,"round",void 0),s([vt({type:Boolean})],$n.prototype,"use_24hr",void 0),s([vt({attribute:"show-settings-button",type:Boolean})],$n.prototype,"showSettingsButton",void 0),s([vt({attribute:"always-show",type:Boolean})],$n.prototype,"alwaysShow",void 0),s([vt({attribute:"temperature-unit",type:String})],$n.prototype,"temperatureUnit",void 0),s([vt({attribute:"light-entity-id",type:String})],$n.prototype,"lightEntityId",void 0),s([vt({attribute:"power-entity-id",type:String})],$n.prototype,"powerEntityId",void 0),s([vt({attribute:"camera-entity-id",type:String})],$n.prototype,"cameraEntityId",void 0),s([vt({type:Boolean})],$n.prototype,"vertical",void 0),s([vt({attribute:"scale-factor"})],$n.prototype,"scaleFactor",void 0),s([vt({attribute:"slot-colors"})],$n.prototype,"slotColors",void 0),s([yt()],$n.prototype,"_showVideo",void 0),s([yt()],$n.prototype,"cameraEntityState",void 0),s([yt()],$n.prototype,"isHidden",void 0),s([yt()],$n.prototype,"isPrinting",void 0),s([yt()],$n.prototype,"hiddenOverride",void 0),s([yt()],$n.prototype,"lightIsOn",void 0),s([yt()],$n.prototype,"statusColor",void 0),s([yt()],$n.prototype,"printerEntities",void 0),s([yt()],$n.prototype,"printerEntityIdPart",void 0),s([yt()],$n.prototype,"progressPercent",void 0),s([yt()],$n.prototype,"_buttonPrintSettings",void 0),s([yt()],$n.prototype,"_togglingLight",void 0),s([yt()],$n.prototype,"_togglingPower",void 0),s([yt()],$n.prototype,"deviceType",void 0),s([yt()],$n.prototype,"linkedDevices",void 0),s([yt()],$n.prototype,"_effectiveLightEntityId",void 0),s([yt()],$n.prototype,"_fwUpdateAvailable",void 0),s([yt()],$n.prototype,"_bridgeMqttState",void 0),s([yt()],$n.prototype,"_bridgeRefreshState",void 0),s([yt()],$n.prototype,"_togglingBridgeMqtt",void 0),s([yt()],$n.prototype,"_refreshingBridge",void 0),s([yt()],$n.prototype,"_labelBridgeMqtt",void 0),s([yt()],$n.prototype,"_labelBridgeRefresh",void 0),s([yt()],$n.prototype,"_labelGoToPrinter",void 0),s([yt()],$n.prototype,"_labelGoToAce",void 0),s([yt()],$n.prototype,"_labelUpdateAvailable",void 0),s([yt()],$n.prototype,"_buttonAceSettings",void 0),$n=s([zr("anycubic-printercard-card")],$n);const Sn=[...me(),Ct.PrinterOnline,Ct.Availability,Ct.ProjectName,Ct.CurrentLayer],Pn=[...me(),Ct.HotendCurrent,Ct.BedCurrent,Ct.HotendTarget,Ct.BedTarget,Ct.SpeedMode,Ct.FanSpeed,Ct.PrinterOnline,Ct.Availability,Ct.ProjectName,Ct.CurrentLayer],An=[Ct.DryingStatus,Ct.AceTempCurrent,Ct.AceTempTarget,Ct.DryingTime],Tn=["printer_name","printer_id","printer_mac","printer_model","printer_fw_version","printer_fw_update_available","printer_online","printer_available","printer_mqtt_active","curr_nozzle_temp","curr_hotbed_temp","target_nozzle_temp","target_hotbed_temp","job_state","job_progress"],Cn=["printer_name","printer_model","ace_fw_version","ace_fw_update_available","drying_active","drying_progress"],Dn=["printer_name","printer_model"],kn=Array.from(new Set([...Tn,...Cn,...Dn]));let In=class extends ut{constructor(){super(...arguments),this.deviceType=Et.PRINTER,this.isFDM=!1,this.monitoredStats=Sn,this.infoFieldKeys=Tn}willUpdate(t){var e;super.willUpdate(t),t.has("language")&&(this._statTranslations=kn.reduce((t,e)=>(t[e]=sr(`panels.main.cards.main.fields.${e}`,this.language),t),{})),(t.has("selectedPrinterDevice")||t.has("selectedPrinterID"))&&(this.deviceType=Nt(this.selectedPrinterDevice),this.printerID=(e=this.selectedPrinterDevice)?e.serial_number:void 0,this.printerMAC=function(t){return t&&t.connections.length>0&&t.connections[0].length>1?t.connections[0][1]:null}(this.selectedPrinterDevice)),(t.has("selectedPrinterID")||t.has("selectedPrinterDevice")||t.has("hass"))&&(this.printerEntities=Rt(this.hass,this.selectedPrinterID),this.deviceType===Et.ACE?(this.printerEntityIdPart=Xt(this.printerEntities),this.infoFieldKeys=Cn):this.deviceType===Et.BRIDGE?(this.printerEntityIdPart=Yt(this.printerEntities),this.infoFieldKeys=Dn):(this.printerEntityIdPart=Zt(this.printerEntities),this.infoFieldKeys=Tn)),(t.has("hass")||t.has("selectedPrinterID")||t.has("selectedPrinterDevice"))&&(this.deviceType===Et.ACE?(this._updateAceInfo(),this.monitoredStats=An):this.deviceType===Et.BRIDGE?this.monitoredStats=Sn:(this._updatePrinterInfo(),this.monitoredStats=this.isFDM?Pn:Sn))}_updatePrinterInfo(){this.isFDM=ae(this.hass,this.printerEntities,this.printerEntityIdPart),this.printerStateFwUpdateAvailable=oe(this.hass,this.printerEntities,this.printerEntityIdPart,"printer_firmware"),this.printerStateAvailable=se(this.hass,this.printerEntities,this.printerEntityIdPart,"is_available","Available","Unavailable"),this.printerStateOnline=se(this.hass,this.printerEntities,this.printerEntityIdPart,"printer_online","Online","Offline"),this.printerStateMqttActive=se(this.hass,this.printerEntities,this.printerEntityIdPart,"mqtt_connection_active","Active","Inactive","unknown"),this.printerStateCurrNozzleTemp=re(this.hass,this.printerEntities,this.printerEntityIdPart,"nozzle_temperature"),this.printerStateCurrHotbedTemp=re(this.hass,this.printerEntities,this.printerEntityIdPart,"hotbed_temperature"),this.printerStateTargetNozzleTemp=re(this.hass,this.printerEntities,this.printerEntityIdPart,"target_nozzle_temperature"),this.printerStateTargetHotbedTemp=re(this.hass,this.printerEntities,this.printerEntityIdPart,"target_hotbed_temperature");const t=re(this.hass,this.printerEntities,this.printerEntityIdPart,"job_progress");this.jobStateProgress=void 0!==t?`${t}%`:"0%",this.jobStatePrintState=function(t,e,i,r,s=!1){const n=jt(e,0,"sensor",r);if(n){const e=Lt(t,n);return s?Mt(e):e}}(this.hass,this.printerEntities,this.printerEntityIdPart,"job_state",!0)}_updateAceInfo(){var t;this.aceStateFwVersion=null===(t=this.selectedPrinterDevice)||void 0===t?void 0:t.sw_version,this.aceStateFwUpdateAvailable=oe(this.hass,this.printerEntities,this.printerEntityIdPart,"ace_firmware"),this.aceStateDryingActive=se(this.hass,this.printerEntities,this.printerEntityIdPart,"drying_active","Drying","Not Drying"),this.aceStateDryingRemaining=re(this.hass,this.printerEntities,this.printerEntityIdPart,"drying_remaining_time"),this.aceStateDryingTotal=re(this.hass,this.printerEntities,this.printerEntityIdPart,"drying_total_duration"),this.aceDryingProgress=void 0!==this.aceStateDryingRemaining&&void 0!==this.aceStateDryingTotal?(this.aceStateDryingTotal>0?Math.round(1e4*(1-this.aceStateDryingRemaining/this.aceStateDryingTotal))/100:0).toFixed(2)+"%":void 0}_renderInfoRow(t,e){return X`
      <div class="info-row">
        <span class="info-heading"> ${this._statTranslations[t]}:</span>
        <span class="info-detail">${e}</span>
      </div>
    `}_renderOptionalInfoRow(t,e){return void 0!==e?this._renderInfoRow(t,e):null}_renderExtraInfo(){return this.deviceType===Et.BRIDGE?X`
        ${this._renderInfoRow("printer_name",this.selectedPrinterDevice?this.selectedPrinterDevice.name:null)}
        ${this._renderInfoRow("printer_model",this.selectedPrinterDevice?this.selectedPrinterDevice.model:null)}
      `:this.deviceType===Et.ACE?X`
        ${this._renderInfoRow("printer_name",this.selectedPrinterDevice?this.selectedPrinterDevice.name:null)}
        ${this._renderInfoRow("printer_model",this.selectedPrinterDevice?this.selectedPrinterDevice.model:null)}
        ${this._renderOptionalInfoRow("ace_fw_version",this.aceStateFwVersion)}
        ${this._renderOptionalInfoRow("ace_fw_update_available",this.aceStateFwUpdateAvailable)}
        ${this._renderOptionalInfoRow("drying_active",this.aceStateDryingActive)}
        ${this._renderOptionalInfoRow("drying_progress",this.aceDryingProgress)}
      `:X`
      ${this._renderInfoRow("printer_name",this.selectedPrinterDevice?this.selectedPrinterDevice.name:null)}
      ${this._renderInfoRow("printer_id",this.printerID)}
      ${this._renderInfoRow("printer_mac",this.printerMAC)}
      ${this._renderInfoRow("printer_model",this.selectedPrinterDevice?this.selectedPrinterDevice.model:null)}
      ${this._renderInfoRow("printer_fw_version",this.selectedPrinterDevice?this.selectedPrinterDevice.sw_version:null)}
      ${this._renderInfoRow("printer_fw_update_available",this.printerStateFwUpdateAvailable)}
      ${this._renderInfoRow("printer_online",this.printerStateOnline)}
      ${this._renderInfoRow("printer_available",this.printerStateAvailable)}
      ${this._renderOptionalInfoRow("printer_mqtt_active",this.printerStateMqttActive)}
      ${this.isFDM?X`
              ${this._renderInfoRow("curr_nozzle_temp",this.printerStateCurrNozzleTemp)}
              ${this._renderInfoRow("curr_hotbed_temp",this.printerStateCurrHotbedTemp)}
              ${this._renderInfoRow("target_nozzle_temp",this.printerStateTargetNozzleTemp)}
              ${this._renderInfoRow("target_hotbed_temp",this.printerStateTargetHotbedTemp)}
            `:W}
      ${this._renderInfoRow("job_state",this.jobStatePrintState)}
      ${this._renderInfoRow("job_progress",this.jobStateProgress)}
    `}render(){var t,e,i,r,s;return X`
      <printer-card elevation="2">
        <anycubic-printercard-card
          .hass=${this.hass}
          .language=${this.language}
          .printers=${this.printers}
          .route=${this.route}
          .selectedPrinterID=${this.selectedPrinterID}
          .selectedPrinterDevice=${this.selectedPrinterDevice}
          .vertical=${null!==(t=this.panel.config.vertical)&&void 0!==t&&t}
          .round=${null!==(e=this.panel.config.round)&&void 0!==e&&e}
          .use_24hr=${null===(i=this.panel.config.use_24hr)||void 0===i||i}
          .temperatureUnit=${this.panel.config.temperatureUnit}
          .lightEntityId=${this.panel.config.lightEntityId}
          .powerEntityId=${this.panel.config.powerEntityId}
          .cameraEntityId=${this.panel.config.cameraEntityId}
          .monitoredStats=${null!==(r=this.panel.config.monitoredStats)&&void 0!==r?r:this.monitoredStats}
          .scaleFactor=${this.panel.config.scaleFactor}
          .slotColors=${this.panel.config.slotColors}
          .showSettingsButton=${null===(s=this.panel.config.showSettingsButton)||void 0===s||s}
          .alwaysShow=${this.panel.config.alwaysShow}
        ></anycubic-printercard-card>
        <div class="ac-extra-printer-info">${this._renderExtraInfo()}</div>
      </printer-card>
    `}static get styles(){return p`
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
    `}};s([vt()],In.prototype,"hass",void 0),s([vt()],In.prototype,"language",void 0),s([vt({type:Boolean,reflect:!0})],In.prototype,"narrow",void 0),s([vt()],In.prototype,"route",void 0),s([vt()],In.prototype,"panel",void 0),s([vt()],In.prototype,"printers",void 0),s([vt({attribute:"selected-printer-id"})],In.prototype,"selectedPrinterID",void 0),s([vt({attribute:"selected-printer-device"})],In.prototype,"selectedPrinterDevice",void 0),s([yt()],In.prototype,"deviceType",void 0),s([yt()],In.prototype,"printerEntities",void 0),s([yt()],In.prototype,"printerEntityIdPart",void 0),s([yt()],In.prototype,"printerID",void 0),s([yt()],In.prototype,"printerMAC",void 0),s([yt()],In.prototype,"printerStateFwUpdateAvailable",void 0),s([yt()],In.prototype,"printerStateAvailable",void 0),s([yt()],In.prototype,"printerStateOnline",void 0),s([yt()],In.prototype,"printerStateMqttActive",void 0),s([yt()],In.prototype,"printerStateCurrNozzleTemp",void 0),s([yt()],In.prototype,"printerStateCurrHotbedTemp",void 0),s([yt()],In.prototype,"printerStateTargetNozzleTemp",void 0),s([yt()],In.prototype,"printerStateTargetHotbedTemp",void 0),s([yt()],In.prototype,"jobStateProgress",void 0),s([yt()],In.prototype,"jobStatePrintState",void 0),s([yt()],In.prototype,"aceStateFwVersion",void 0),s([yt()],In.prototype,"aceStateFwUpdateAvailable",void 0),s([yt()],In.prototype,"aceStateDryingActive",void 0),s([yt()],In.prototype,"aceStateDryingRemaining",void 0),s([yt()],In.prototype,"aceStateDryingTotal",void 0),s([yt()],In.prototype,"aceDryingProgress",void 0),s([yt()],In.prototype,"isFDM",void 0),s([yt()],In.prototype,"monitoredStats",void 0),s([yt()],In.prototype,"infoFieldKeys",void 0),s([yt()],In.prototype,"_statTranslations",void 0),In=s([_t("anycubic-view-main")],In);const Hn=p`
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
`;class Bn extends ut{constructor(){super(...arguments),this._isRefreshing=!1,this._supportsMQTT=!1,this._httpResponse=!1,this.refreshList=()=>{this._listRefreshEntity&&(this._isRefreshing=!0,this.hass.callService("button","press",{entity_id:this._listRefreshEntity.entity_id}).then(()=>{this._isRefreshing=!1}).catch(t=>{this._isRefreshing=!1}))},this.deleteFile=t=>{}}willUpdate(t){super.willUpdate(t),t.has("language")&&(this._noMqttMessage=sr("common.messages.mqtt_unsupported",this.language)),(t.has("hass")||t.has("selectedPrinterID"))&&(this.printerEntities=Rt(this.hass,this.selectedPrinterID),this.printerEntityIdPart=Zt(this.printerEntities),this._supportsMQTT=function(t,e){const i=Ft(t,jt(e,0,"binary_sensor","mqtt_connection_active"));return!!i&&!!i.attributes.supports_mqtt_login}(this.hass,this.printerEntities,this.printerEntityIdPart))}render(){return X`
      <div class="files-card" elevation="2">
        <button
          .disabled=${!this._httpResponse&&!this._supportsMQTT||this._isRefreshing}
          class="file-refresh-button"
          @click=${this.refreshList}
        >
          <ha-icon
            class="file-refresh-icon"
            icon="mdi:refresh"
          >
          </ha-icon>
        </button>
        ${this._httpResponse||this._supportsMQTT?W:X` <div class="no-mqtt-msg">${this._noMqttMessage}</div> `}
        <ul class="files-container">
        ${this._fileArray?this._fileArray.map(t=>X`
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
                `):null}
      </div>
    `}static get styles(){return p`
      ${Hn}
    `}}s([vt()],Bn.prototype,"hass",void 0),s([vt()],Bn.prototype,"language",void 0),s([vt({type:Boolean,reflect:!0})],Bn.prototype,"narrow",void 0),s([vt()],Bn.prototype,"route",void 0),s([vt()],Bn.prototype,"panel",void 0),s([vt({attribute:"selected-printer-id"})],Bn.prototype,"selectedPrinterID",void 0),s([vt({attribute:"selected-printer-device"})],Bn.prototype,"selectedPrinterDevice",void 0),s([yt()],Bn.prototype,"printerEntities",void 0),s([yt()],Bn.prototype,"printerEntityIdPart",void 0),s([yt()],Bn.prototype,"_fileArray",void 0),s([yt()],Bn.prototype,"_listRefreshEntity",void 0),s([yt()],Bn.prototype,"_isRefreshing",void 0),s([yt()],Bn.prototype,"_isDeleting",void 0),s([yt()],Bn.prototype,"_noMqttMessage",void 0),s([yt()],Bn.prototype,"_supportsMQTT",void 0),s([yt()],Bn.prototype,"_httpResponse",void 0);let Mn=class extends Bn{constructor(){super(...arguments),this._httpResponse=!0,this.deleteFile=t=>{const e=t.currentTarget.file_info;this.selectedPrinterDevice&&e.id&&(this._isDeleting=!0,this.hass.callService(pn,"delete_file_cloud",{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,file_id:e.id}).then(()=>{this._isDeleting=!1}).catch(t=>{this._isDeleting=!1}))}}willUpdate(t){if(super.willUpdate(t),t.has("hass")||t.has("selectedPrinterID")){const t=Ft(this.hass,Gt(this.printerEntities,"sensor","file_list_cloud"));this._fileArray=t?t.attributes.file_info:void 0,this._listRefreshEntity=function(t){return Gt(t,"button","request_file_list_cloud")}(this.printerEntities)}}};s([yt()],Mn.prototype,"_fileArray",void 0),s([yt()],Mn.prototype,"_httpResponse",void 0),Mn=s([_t("anycubic-view-files_cloud")],Mn);let Fn=class extends Bn{constructor(){super(...arguments),this.deleteFile=t=>{const e=t.currentTarget.file_info;this.selectedPrinterDevice&&e.name&&(this._isDeleting=!0,this.hass.callService(pn,"delete_file_local",{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,filename:e.name}).then(()=>{this._isDeleting=!1}).catch(t=>{this._isDeleting=!1}))}}willUpdate(t){if(super.willUpdate(t),t.has("hass")||t.has("selectedPrinterID")){const t=Ft(this.hass,Gt(this.printerEntities,"sensor","file_list_local"));this._fileArray=t?t.attributes.file_info:void 0,this._listRefreshEntity=function(t){return Gt(t,"button","request_file_list_local")}(this.printerEntities)}}};Fn=s([_t("anycubic-view-files_local")],Fn);let Ln=class extends Bn{constructor(){super(...arguments),this.deleteFile=t=>{const e=t.currentTarget.file_info;this.selectedPrinterDevice&&e.name&&(this._isDeleting=!0,this.hass.callService(pn,"delete_file_udisk",{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id,filename:e.name}).then(()=>{this._isDeleting=!1}).catch(t=>{this._isDeleting=!1}))}}willUpdate(t){if(super.willUpdate(t),t.has("hass")||t.has("selectedPrinterID")){const t=Ft(this.hass,Gt(this.printerEntities,"sensor","file_list_udisk"));this._fileArray=t?t.attributes.file_info:void 0,this._listRefreshEntity=function(t){return Gt(t,"button","request_file_list_udisk")}(this.printerEntities)}}};Ln=s([_t("anycubic-view-files_udisk")],Ln);const On=p`
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
`;var Nn;!function(t){t.Light="light",t.Medium="medium",t.Heavy="heavy"}(Nn||(Nn={}));class Rn extends ut{constructor(){super(...arguments),this._scriptData={},this._serviceName="",this._buttonProgress=!1,this._scriptDataChanged=t=>{const e=Object.assign(Object.assign({},this._scriptData),t.detail.value),i=Object.assign({},e.data||{});delete i.printer_id;const r=this.selectedPrinterDevice;r&&r.id===this.selectedPrinterID?(i.device_id=r.id,i.config_entry=r.primary_config_entry):(delete i.device_id,delete i.config_entry),this._scriptData=Object.assign(Object.assign({},e),{data:i}),this._error=void 0},this._runScript=t=>{const e=t.currentTarget;this._error=void 0,t.stopPropagation();const i=this.selectedPrinterDevice;if(!i||i.id!==this.selectedPrinterID||this._buttonProgress)return;const r=Object.assign(Object.assign({},this._scriptData.data||{}),{device_id:i.id,config_entry:i.primary_config_entry});delete r.printer_id,this._buttonProgress=!0,((t=Nn.Medium)=>{const e=new Event("haptic");e.detail=t,window&&window.dispatchEvent(e)})(),this.hass.callService(pn,this._serviceName,r).then(()=>{e.actionSuccess(),this._buttonProgress=!1}).catch(t=>{this._error=t.message,e.actionError(),this._buttonProgress=!1})}}firstUpdated(){(async()=>{var t,e,i,r,s,n,o,a;if(customElements.get("ha-service-control"))return;const l=document.createElement("partial-panel-resolver").getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(i=null===(e=null===(t=null==l?void 0:l.routes)||void 0===t?void 0:t.a)||void 0===e?void 0:e.load)||void 0===i?void 0:i.call(e));const h=document.createElement("developer-tools-router"),c=null===(r=null==h?void 0:h.routerOptions)||void 0===r?void 0:r.routes;(null==c?void 0:c.service)&&await(null===(n=null===(s=null==c?void 0:c.service)||void 0===s?void 0:s.load)||void 0===n?void 0:n.call(s)),(null==c?void 0:c.action)&&await(null===(a=null===(o=null==c?void 0:c.action)||void 0===o?void 0:o.load)||void 0===a?void 0:a.call(o))})().catch(t=>{this._error=t instanceof Error?t.message:String(t)})}willUpdate(t){if(super.willUpdate(t),t.has("language")&&(this._buttonPrint=sr("common.actions.print",this.language)),t.has("selectedPrinterDevice")||t.has("selectedPrinterID"))if(this.selectedPrinterDevice){const t=`${pn}.${this._serviceName}`;this._scriptData=Object.assign(Object.assign({},this._scriptData),{action:t,service:t,data:Object.assign(Object.assign({},this._scriptData.data||{}),{config_entry:this.selectedPrinterDevice.primary_config_entry,device_id:this.selectedPrinterDevice.id})})}else{const t=Object.assign({},this._scriptData.data||{});delete t.device_id,delete t.printer_id,delete t.config_entry,this._scriptData=Object.assign(Object.assign({},this._scriptData),{data:t})}}render(){return X`
      <ac-print-view elevation="2">
        <ha-service-control
          hidePicker
          .hass=${this.hass}
          .value=${this._scriptData}
          .showAdvanced=${!0}
          .narrow=${this.narrow}
          @value-changed=${this._scriptDataChanged}
        ></ha-service-control>
        ${void 0!==this._error?X`<ha-alert alert-type="error">${this._error}</ha-alert>`:W}
        <ha-progress-button
          class="print-button"
          raised
          @click=${this._runScript}
          .progress=${this._buttonProgress}
          .disabled=${!this.selectedPrinterDevice||this.selectedPrinterDevice.id!==this.selectedPrinterID||this._buttonProgress}
        >
          <ha-svg-icon .path=${"M8,5.14V19.14L19,12.14L8,5.14Z"}></ha-svg-icon>
          ${this._buttonPrint}
        </ha-progress-button>
      </ac-print-view>
    `}static get styles(){return p`
      ${On}
    `}}s([vt({attribute:!1})],Rn.prototype,"hass",void 0),s([vt()],Rn.prototype,"language",void 0),s([vt({type:Boolean,reflect:!0})],Rn.prototype,"narrow",void 0),s([vt()],Rn.prototype,"route",void 0),s([vt()],Rn.prototype,"panel",void 0),s([vt({attribute:"selected-printer-id"})],Rn.prototype,"selectedPrinterID",void 0),s([vt({attribute:"selected-printer-device"})],Rn.prototype,"selectedPrinterDevice",void 0),s([yt()],Rn.prototype,"_scriptData",void 0),s([yt()],Rn.prototype,"_error",void 0),s([yt()],Rn.prototype,"_serviceName",void 0),s([yt()],Rn.prototype,"_buttonPrint",void 0),s([yt()],Rn.prototype,"_buttonProgress",void 0);let Un=class extends Rn{constructor(){super(...arguments),this._serviceName="print_and_upload_no_cloud_save"}};s([yt()],Un.prototype,"_serviceName",void 0),Un=s([_t("anycubic-view-print-no_cloud_save")],Un);let zn=class extends Rn{constructor(){super(...arguments),this._serviceName="print_and_upload_save_in_cloud"}};s([yt()],zn.prototype,"_serviceName",void 0),zn=s([_t("anycubic-view-print-save_in_cloud")],zn);var jn="0.9.31";window.console.info(`%c ANYCUBIC-PANEL %c v${jn} `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),t.AnycubicCloudPanel=class extends ut{constructor(){super(...arguments),this.selectedPage="main",this.deviceType=Et.PRINTER,this._handleLocationChange=()=>{window.location.pathname.includes("anycubic-cloud")&&this.requestUpdate()},this._handlePrinterClick=t=>{((t,e,i=!1)=>{const r=`${t.route.prefix}/${e?`${e}/main`:""}`;i?history.replaceState(null,"",r):history.pushState(null,"",r),xt(window,"location-changed",{replace:i})})(this,t.currentTarget.printer_id),this.requestUpdate()},this.handlePageSelected=t=>{const e=t.detail.item.getAttribute("page-name");e!==he(this.route)?(de(this,e),this.requestUpdate()):scrollTo(0,0)}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this._handleLocationChange)}disconnectedCallback(){window.removeEventListener("location-changed",this._handleLocationChange),super.disconnectedCallback()}willUpdate(t){var e,i;super.willUpdate(t),t.has("hass")&&this.hass.language!==this.language&&(this.language=this.hass.language,this._tabMain=sr("panels.main.title",this.language),this._tabFilesLocal=sr("panels.files_local.title",this.language),this._tabFilesUdisk=sr("panels.files_udisk.title",this.language),this._tabFilesCloud=sr("panels.files_cloud.title",this.language),this._tabPrintNoSave=sr("panels.print_no_cloud_save.title",this.language),this._tabPrintSave=sr("panels.print_save_in_cloud.title",this.language),this._tabDebug=sr("panels.debug.title",this.language),this._mainTitle=sr("title",this.language),this._selectPrinter=sr("panels.initial.printer_select",this.language),this._typeLabelPrinter=sr("panels.initial.type_printer",this.language),this._typeLabelAce=sr("panels.initial.type_ace",this.language),this._typeLabelBridge=sr("panels.initial.type_bridge",this.language)),(t.has("route")||t.has("hass"))&&(this.printers=function(t){const e={};for(const i in t.devices){const r=t.devices[i];"Anycubic"===r.manufacturer&&(e[r.id]=r)}return e}(this.hass),this.selectedPage=he(this.route),this.selectedPrinterID=le(this.route),this.selectedPrinterDevice=(e=this.printers,i=this.selectedPrinterID,e&&i?e[i]:void 0),this.deviceType=Nt(this.selectedPrinterDevice),this.deviceType!==Et.PRINTER&&"main"!==this.selectedPage&&"debug"!==this.selectedPage&&(this.selectedPage="main",de(this,"main")))}render(){return this.getInitialView()}renderPrinterPage(){return X`
      <div class="header">
        ${this.renderToolbar()}
        <ha-tabs
          scrollable
          attr-for-selected="page-name"
          .selected=${this.selectedPage}
          @iron-activate=${this.handlePageSelected}
        >
          <paper-tab page-name="main"> ${this._tabMain} </paper-tab>
          ${this.deviceType===Et.PRINTER?X`
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
                `:null}
          ${null}
        </ha-tabs>
      </div>
      <div class="view">${this.getView(this.route)}</div>
    `}_deviceTypeLabel(t){const e=Nt(t);return e===Et.ACE?this._typeLabelAce:e===Et.BRIDGE?this._typeLabelBridge:this._typeLabelPrinter}renderToolbar(){return X`
      <div class="toolbar">
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div class="main-title">${this._mainTitle}</div>
        <div class="version">v${jn}</div>
      </div>
    `}getInitialView(){return this.selectedPrinterID?this.renderPrinterPage():X`
        <div class="header">${this.renderToolbar()}</div>
        <printer-select elevation="2">
          <p>${this._selectPrinter}</p>
          <ul class="printers-container">
            ${this.printers?Object.keys(this.printers).map(t=>{const e=this.printers;return X`<li
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
                    </li>`}):null}
          </ul>
        </printer-select>
      `}getView(t){switch(this.selectedPage){case"local-files":return X`
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
        `;case"udisk-files":return X`
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
        `;case"cloud-files":return X`
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
        `;case"print-no_cloud_save":return X`
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
        `;case"print-save_in_cloud":return X`
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
        `;case"main":return X`
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
        `;case"debug":return X`
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
        `;default:return X`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a
              page from the menu above to continue.
            </div>
          </ha-card>
        `}}static get styles(){return p`
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
    `}},s([vt()],t.AnycubicCloudPanel.prototype,"hass",void 0),s([vt({type:Boolean,reflect:!0})],t.AnycubicCloudPanel.prototype,"narrow",void 0),s([vt()],t.AnycubicCloudPanel.prototype,"route",void 0),s([vt()],t.AnycubicCloudPanel.prototype,"panel",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"printers",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"selectedPage",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"selectedPrinterID",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"selectedPrinterDevice",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"deviceType",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"language",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_tabMain",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_tabFilesLocal",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_tabFilesUdisk",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_tabFilesCloud",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_tabPrintNoSave",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_tabPrintSave",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_tabDebug",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_mainTitle",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_selectPrinter",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_typeLabelPrinter",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_typeLabelAce",void 0),s([yt()],t.AnycubicCloudPanel.prototype,"_typeLabelBridge",void 0),t.AnycubicCloudPanel=s([_t("anycubic-cloud-panel")],t.AnycubicCloudPanel)}({});
