"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[134],{7205:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(885),o=n(1413),i=n(2791),a=n(291),s=n(184),u=function(e,t){switch(t.type){case"CHANGE":return(0,o.Z)((0,o.Z)({},e),{},{value:t.val,isValid:(0,a.Gu)(t.val,t.validators)});case"TOUCH":return(0,o.Z)((0,o.Z)({},e),{},{isTouched:!0});default:return e}},l=i.forwardRef((function(e,t){var n=(0,i.useReducer)(u,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),o=(0,r.Z)(n,2),a=o[0],l=o[1],c=e.id,d=e.onInput,p=a.value,f=a.isValid;(0,i.useEffect)((function(){d(c,p,f)}),[c,p,f,d]);var h,v=function(t){l({type:"CHANGE",val:t.target.value,validators:e.validators})},m=function(){l({type:"TOUCH"})},y=(0,i.useRef)(),b=function(){y.current.focus()};switch((0,i.useImperativeHandle)(t,(function(){return{focus:b}})),e.element){case"input":h=(0,s.jsx)("input",{ref:y,id:e.id,type:e.type,placeholder:e.placeholder,value:a.value,onChange:v,onBlur:m,step:e.step});break;case"flex-input":h=(0,s.jsx)("span",{ref:y,id:e.id,type:e.type,placeholder:e.placeholder,value:a.value,onChange:v,onBlur:m,step:e.step,contentEditable:!0});break;default:h=(0,s.jsxs)("textarea",{id:e.id,rows:e.rows||3,onChange:v,onBlur:m,value:a.value,children:[e.children," "]})}return(0,s.jsxs)("div",{className:"input ".concat(!a.isValid&&a.isTouched&&"invalid"),children:[(0,s.jsx)("label",{htmlFor:e.id,children:e.label}),h,!a.isValid&&a.isTouched&&(0,s.jsx)("p",{className:"error-message ".concat(e.errorClass),style:e.errorStyle,children:e.errorText})]})}))},2671:function(e,t,n){n(2791);var r=n(8707),o=n(6575),i=n(184);t.Z=function(e){return(0,i.jsx)(r.Z,{element:"popup",onClose:e.onClose,header:"An Error Occurred!",show:!!e.error,footer:(0,i.jsx)(o.Z,{onClick:e.onClose,className:"btn-popup btn--danger",children:"Okay"}),children:(0,i.jsx)("p",{children:e.error})})}},8707:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(1413),o=n(885),i=n(2791),a=n(4164),s=n(184),u=function(e){return a.createPortal((0,s.jsx)("div",{className:"backdrop",onClick:e.onClose}),document.getElementById("backdrop-hook"))},l=function(e){var t;if("popup"===e.element)t=(0,s.jsxs)("div",{className:"modal popup ".concat(e.className," ").concat(!e.show&&"popup-hidden"),style:e.style,children:[(0,s.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:(0,s.jsx)("h2",{children:e.header||"Warning"})}),(0,s.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[(0,s.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),(0,s.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});else t=(0,s.jsx)("div",{className:"modal ".concat(!e.show&&"popup-hidden"," ").concat(e.className),style:e.style,children:e.children});return a.createPortal(t,document.getElementById("modal-hook"))},c=function(e){var t=(0,i.useState)(!1),n=(0,o.Z)(t,2),a=n[0],c=n[1];return(0,i.useEffect)((function(){var t;return e.show?c(!0):t=setTimeout((function(){c(!1)}),350),function(){clearTimeout(t)}}),[e.show]),(0,s.jsxs)(i.Fragment,{children:[e.show&&(0,s.jsx)(u,{onClose:e.onClose}),a&&(0,s.jsx)(l,(0,r.Z)((0,r.Z)({},e),{},{children:e.children}))]})}},7993:function(e,t,n){n.d(t,{c:function(){return u}});var r=n(885),o=n(4942),i=n(1413),a=n(2791),s=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var r in e.inputs)n=r===t.inputId?n&&t.isValid:n&&e.inputs[r].isValid;return(0,i.Z)((0,i.Z)({},e),{},{inputs:(0,i.Z)((0,i.Z)({},e.inputs),{},(0,o.Z)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},u=function(e,t){var n=(0,a.useReducer)(s,{inputs:e,isValid:t}),o=(0,r.Z)(n,2),i=o[0],u=o[1];return[i,(0,a.useCallback)((function(e,t,n){u({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),(0,a.useCallback)((function(e,t){u({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},291:function(e,t,n){n.d(t,{Ox:function(){return f},IT:function(){return d},qE:function(){return p},CP:function(){return c},hg:function(){return l},Gu:function(){return h}});var r=n(181);var o="REQUIRE",i="MINLENGTH",a="MAXLENGTH",s="EMAIL",u="PASSWORD",l=function(){return{type:o}},c=function(e){return{type:i,val:e}},d=function(e){return{type:a,val:e}},p=function(e){return{type:"MIN",val:e}},f=function(){return{type:s}},h=function(e,t){var n,l=!0,c=function(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=(0,r.Z)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){u=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(u)throw a}}}}(t);try{for(c.s();!(n=c.n()).done;){var d=n.value;d.type===o&&(l=l&&e.trim().length>0),d.type===i&&(l=l&&e.trim().length>=d.val),d.type===a&&(l=l&&e.trim().length<=d.val),"MIN"===d.type&&(l=l&&+e>=d.val),"MAX"===d.type&&(l=l&&+e<=d.val),d.type===s&&(l=l&&/^\S+@\S+\.\S+$/.test(e)),d.type===u&&(l=l&&!e.toLowerCase().includes("password"))}}catch(p){c.e(p)}finally{c.f()}return l}},7134:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var r=n(5861),o=n(885),i=n(7757),a=n.n(i),s=n(2791),u=n(9271),l=n(7993),c=n(9508),d=n(291),p=n(9502),f=n(2671),h=n(4255),v=n(8707),m=n(7205),y=n(6575),b=n(1297),j=n(184),x={deposit:{value:"0",isValid:!0}},C=function(e){var t=(0,u.k6)(),n=(0,s.useContext)(p.Z),i=(0,l.c)(x,!0),C=(0,o.Z)(i,3),Z=C[0],g=C[1],w=C[2],N=(0,c.x)(),O=N.isLoading,E=N.error,k=N.sendRequest,T=N.clearError,V=function(){var e=(0,r.Z)(a().mark((function e(r){var o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.prev=1,e.next=4,k("".concat("http://localhost:5000/api","/users/deposit"),"PATCH",JSON.stringify({balance:+Z.inputs.deposit.value}),{Authorization:"Bearer "+n.token,"Content-Type":"application/json"});case 4:o=e.sent,console.log(o.update),t.push("/"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),w(x,!0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return(0,j.jsxs)(s.Fragment,{children:[(0,j.jsx)(f.Z,{error:E,onClose:T}),(0,j.jsx)(v.Z,{show:n.isDepositFormShown,onClose:n.hideDepositForm,className:"modal-deposit",children:(0,j.jsxs)("form",{className:"form-deposit",onSubmit:V,children:[O&&(0,j.jsx)(h.Z,{asOverlay:!0,style:{borderRadius:"6px"}}),(0,j.jsx)("h2",{className:"deposit-heading",children:"Deposit Money"}),(0,j.jsx)(m.Z,{element:"input",id:"deposit",label:"$",type:"number",step:".01",onInput:g,validators:[(0,d.qE)(0)],errorText:"amount must be greater than or equal to 0",initialValue:Z.inputs.deposit.value,initialValid:Z.inputs.deposit.isValid}),(0,j.jsx)(y.Z,{type:"submit",className:"btn btn--white",onClick:n.hideDepositForm,disabled:!Z.isValid||E,children:"Submit"}),(0,j.jsx)(y.Z,{className:"btn-close",onClick:n.hideDepositForm,children:(0,j.jsx)(b.Z,{})})]})})]})}},4942:function(e,t,n){function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Z:function(){return r}})},1413:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(4942);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);
//# sourceMappingURL=134.4c2d6ed6.chunk.js.map