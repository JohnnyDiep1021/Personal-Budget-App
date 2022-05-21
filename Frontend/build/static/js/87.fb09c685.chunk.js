"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[87],{8087:function(e,n,t){t.r(n),t.d(n,{default:function(){return g}});var r=t(5861),a=t(885),o=t(7757),i=t.n(o),l=t(2791),s=t(7993),u=t(9508),c=t(291),d=t(9502),p=t(6388),f=t(2671),h=t(8707),m=t(7205),v=t(6575),y=t(4255),b=t(1297),j=t(184),x={from:{value:null,isValid:!1},to:{value:null,isValid:!1},amount:{value:"0",isValid:!0}},g=function(e){var n=(0,l.useContext)(d.Z),t=(0,u.x)(),o=t.isLoading,g=t.error,C=t.message,Z=t.sendRequest,w=t.clearError,T=t.clearMessage,V=(0,s.c)(x,!1),N=(0,a.Z)(V,3),I=N[0],O=N[1],E=N[2],k=function(){var e=(0,r.Z)(i().mark((function e(t){var r,a,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),r=I.inputs.from.value,a=I.inputs.to.value,e.prev=3,e.next=6,Z("".concat("http://localhost:5000/api","/envelopes/transfer/").concat(r,"/").concat(a),"POST",JSON.stringify({amount:+I.inputs.amount.value}),{Authorization:"Bearer "+n.token,"Content-Type":"application/json"});case 6:o=e.sent,console.log(o),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),E(x,!1);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(n){return e.apply(this,arguments)}}();return(0,j.jsxs)(l.Fragment,{children:[(0,j.jsx)(f.Z,{error:g,onClose:w}),(0,j.jsx)(p.Z,{message:C,onClose:function(){T("/")}}),(0,j.jsx)(h.Z,{show:n.isTransferFormShown,onClose:n.hideTransferForm,className:"modal-transfer",children:(0,j.jsxs)("form",{className:"form-transfer",onSubmit:k,children:[o&&(0,j.jsx)(y.Z,{asOverlay:!0,style:{borderRadius:"12px"}}),(0,j.jsx)("h2",{className:"transfer-heading",children:"Transfer Budget"}),(0,j.jsx)(m.Z,{element:"input",id:"from",label:"from:",type:"number",placeholder:"envelopeId",onInput:O,validators:[(0,c.hg)(),(0,c.IT)(6)],errorText:"fromEnvelopeId cannot be omitted",initialValue:I.inputs.from.value,initialValid:I.inputs.from.isValid}),(0,j.jsx)(m.Z,{element:"input",id:"to",label:"to:",type:"number",placeholder:"envelopeId",onInput:O,validators:[(0,c.hg)(),(0,c.IT)(6)],errorText:"toEnvelopeId cannot be omitted",initialValue:I.inputs.to.value,initialValid:I.inputs.to.isValid}),(0,j.jsx)(m.Z,{element:"input",id:"amount",label:"$",type:"number",placeholder:"Enter the amount",onInput:O,validators:[(0,c.qE)(0)],errorText:"amount must be greater than or equal to 0",initialValue:I.inputs.amount.value,initialValid:I.inputs.amount.isValid}),(0,j.jsx)(v.Z,{type:"submit",className:"btn btn--white",disabled:!I.isValid,onClick:n.hideTransferForm,children:"Transfer"}),(0,j.jsx)(v.Z,{className:"btn-close",onClick:n.hideTransferForm,children:(0,j.jsx)(b.Z,{})})]})})]})}},7205:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(885),a=t(1413),o=t(2791),i=t(291),l=t(184),s=function(e,n){switch(n.type){case"CHANGE":return(0,a.Z)((0,a.Z)({},e),{},{value:n.val,isValid:(0,i.Gu)(n.val,n.validators)});case"TOUCH":return(0,a.Z)((0,a.Z)({},e),{},{isTouched:!0});default:return e}},u=o.forwardRef((function(e,n){var t=(0,o.useReducer)(s,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),a=(0,r.Z)(t,2),i=a[0],u=a[1],c=e.id,d=e.onInput,p=i.value,f=i.isValid;(0,o.useEffect)((function(){d(c,p,f)}),[c,p,f,d]);var h,m=function(n){u({type:"CHANGE",val:n.target.value,validators:e.validators})},v=function(){u({type:"TOUCH"})},y=(0,o.useRef)(),b=function(){y.current.focus()};switch((0,o.useImperativeHandle)(n,(function(){return{focus:b}})),e.element){case"input":h=(0,l.jsx)("input",{ref:y,id:e.id,type:e.type,placeholder:e.placeholder,value:i.value,onChange:m,onBlur:v,step:e.step});break;case"flex-input":h=(0,l.jsx)("span",{ref:y,id:e.id,type:e.type,placeholder:e.placeholder,value:i.value,onChange:m,onBlur:v,step:e.step,contentEditable:!0});break;default:h=(0,l.jsxs)("textarea",{id:e.id,rows:e.rows||3,onChange:m,onBlur:v,value:i.value,children:[e.children," "]})}return(0,l.jsxs)("div",{className:"input ".concat(!i.isValid&&i.isTouched&&"invalid"),children:[(0,l.jsx)("label",{htmlFor:e.id,children:e.label}),h,!i.isValid&&i.isTouched&&(0,l.jsx)("p",{className:"error-message ".concat(e.errorClass),style:e.errorStyle,children:e.errorText})]})}))},2671:function(e,n,t){t(2791);var r=t(8707),a=t(6575),o=t(184);n.Z=function(e){return(0,o.jsx)(r.Z,{element:"popup",onClose:e.onClose,header:"An Error Occurred!",show:!!e.error,footer:(0,o.jsx)(a.Z,{onClick:e.onClose,className:"btn-popup btn--danger",children:"Okay"}),children:(0,o.jsx)("p",{children:e.error})})}},6388:function(e,n,t){t(2791);var r=t(8707),a=t(6575),o=t(184);n.Z=function(e){return(0,o.jsx)(r.Z,{element:"popup",onClose:e.onClose,header:"Message",headerClass:"msg-header",show:!!e.message,footer:(0,o.jsx)(a.Z,{onClick:e.onClose,className:"btn-popup btn--sucess",children:"Okay"}),children:(0,o.jsx)("p",{children:e.message})})}},8707:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(1413),a=t(885),o=t(2791),i=t(4164),l=t(184),s=function(e){return i.createPortal((0,l.jsx)("div",{className:"backdrop",onClick:e.onClose}),document.getElementById("backdrop-hook"))},u=function(e){var n;if("popup"===e.element)n=(0,l.jsxs)("div",{className:"modal popup ".concat(e.className," ").concat(!e.show&&"popup-hidden"),style:e.style,children:[(0,l.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:(0,l.jsx)("h2",{children:e.header||"Warning"})}),(0,l.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[(0,l.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),(0,l.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});else n=(0,l.jsx)("div",{className:"modal ".concat(!e.show&&"popup-hidden"," ").concat(e.className),style:e.style,children:e.children});return i.createPortal(n,document.getElementById("modal-hook"))},c=function(e){var n=(0,o.useState)(!1),t=(0,a.Z)(n,2),i=t[0],c=t[1];return(0,o.useEffect)((function(){var n;return e.show?c(!0):n=setTimeout((function(){c(!1)}),350),function(){clearTimeout(n)}}),[e.show]),(0,l.jsxs)(o.Fragment,{children:[e.show&&(0,l.jsx)(s,{onClose:e.onClose}),i&&(0,l.jsx)(u,(0,r.Z)((0,r.Z)({},e),{},{children:e.children}))]})}},7993:function(e,n,t){t.d(n,{c:function(){return s}});var r=t(885),a=t(4942),o=t(1413),i=t(2791),l=function(e,n){switch(n.type){case"INPUT_CHANGE":var t=!0;for(var r in e.inputs)t=r===n.inputId?t&&n.isValid:t&&e.inputs[r].isValid;return(0,o.Z)((0,o.Z)({},e),{},{inputs:(0,o.Z)((0,o.Z)({},e.inputs),{},(0,a.Z)({},n.inputId,{value:n.value,isValid:n.isValid})),isValid:t});case"SET_DATA":return{inputs:n.inputs,isValid:n.formIsValid};default:return e}},s=function(e,n){var t=(0,i.useReducer)(l,{inputs:e,isValid:n}),a=(0,r.Z)(t,2),o=a[0],s=a[1];return[o,(0,i.useCallback)((function(e,n,t){s({type:"INPUT_CHANGE",value:n,isValid:t,inputId:e})}),[]),(0,i.useCallback)((function(e,n){s({type:"SET_DATA",inputs:e,formIsValid:n})}),[])]}},291:function(e,n,t){t.d(n,{Ox:function(){return f},IT:function(){return d},qE:function(){return p},CP:function(){return c},hg:function(){return u},Gu:function(){return h}});var r=t(181);var a="REQUIRE",o="MINLENGTH",i="MAXLENGTH",l="EMAIL",s="PASSWORD",u=function(){return{type:a}},c=function(e){return{type:o,val:e}},d=function(e){return{type:i,val:e}},p=function(e){return{type:"MIN",val:e}},f=function(){return{type:l}},h=function(e,n){var t,u=!0,c=function(e,n){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=(0,r.Z)(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,s=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return l=e.done,e},e:function(e){s=!0,i=e},f:function(){try{l||null==t.return||t.return()}finally{if(s)throw i}}}}(n);try{for(c.s();!(t=c.n()).done;){var d=t.value;d.type===a&&(u=u&&e.trim().length>0),d.type===o&&(u=u&&e.trim().length>=d.val),d.type===i&&(u=u&&e.trim().length<=d.val),"MIN"===d.type&&(u=u&&+e>=d.val),"MAX"===d.type&&(u=u&&+e<=d.val),d.type===l&&(u=u&&/^\S+@\S+\.\S+$/.test(e)),d.type===s&&(u=u&&!e.toLowerCase().includes("password"))}}catch(p){c.e(p)}finally{c.f()}return u}},4942:function(e,n,t){function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}t.d(n,{Z:function(){return r}})},1413:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(4942);function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){(0,r.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}}}]);
//# sourceMappingURL=87.fb09c685.chunk.js.map