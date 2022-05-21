"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[187],{4187:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var r=n(5861),a=n(885),o=n(7757),i=n.n(o),l=n(2791),u=n(9502),s=n(9508),c=n(9271),d=n(7993),p=n(291),f=n(2671),v=n(4255),h=n(7205),y=n(1357),m=n(6575),x=n(1297),b=n(184),j=function(e){var t=(0,l.useContext)(u.Z),n=(0,c.k6)(),o=(0,c.UO)().envelopeId,j=(0,s.x)(),g=j.isLoading,V=j.error,Z=j.sendRequest,w=j.clearError,N=(0,l.useState)(),C=(0,a.Z)(N,2),T=C[0],I=C[1],O=(0,d.c)({category:{value:"",isValid:!1},budget:{value:"",isValid:!1},note1:{value:"",isValid:!1},note2:{value:"",isValid:!1},note3:{value:"",isValid:!1},note4:{value:"",isValid:!1}},!1),k=(0,a.Z)(O,3),E=k[0],S=k[1],A=k[2];(0,l.useEffect)((function(){var e=function(){var e=(0,r.Z)(i().mark((function e(){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Z("".concat("http://localhost:5000/api","/envelopes/").concat(o),"GET",null,{Authorization:"Bearer "+t.token});case 3:n=e.sent,console.log(n),I(n.envelope),A({category:{value:n.envelope.category,isValid:!0},budget:{value:n.envelope.budget,isValid:!0},note1:{value:n.envelope.notes[0].note,isValid:!0},note2:{value:n.envelope.notes[1].note,isValid:!0},note3:{value:n.envelope.notes[2].note,isValid:!0},note4:{value:n.envelope.notes[3].note,isValid:!0}},!0),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();e()}),[Z,o,A,t.token]);var P=function(){var e=(0,r.Z)(i().mark((function e(r){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.prev=1,e.next=4,Z("".concat("http://localhost:5000/api","/envelopes/").concat(o),"PATCH",JSON.stringify({category:E.inputs.category.value,budget:E.inputs.budget.value,notes:[{note:E.inputs.note1.value},{note:E.inputs.note2.value},{note:E.inputs.note3.value},{note:E.inputs.note4.value}]}),{Authorization:"Bearer "+t.token,"Content-Type":"application/json"});case 4:t.hideUpdatePage(),n.push("/envelopes"),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return g?(0,b.jsx)("div",{className:"popup-center",children:(0,b.jsx)(v.Z,{})}):T||V?(0,b.jsxs)(l.Fragment,{children:[(0,b.jsx)(f.Z,{error:V,onClose:w}),!g&&T&&(0,b.jsx)("form",{className:"update-form",onSubmit:P,children:(0,b.jsx)(y.Z,{children:(0,b.jsxs)("div",{className:"card__update",children:[(0,b.jsxs)("div",{className:"header",children:[(0,b.jsx)(h.Z,{element:"input",id:"category",type:"text",placeholder:"New category",onInput:S,validators:[(0,p.hg)(),(0,p.IT)(23)],errorText:"cannot be empty, only 23 characters",errorStyle:{textAlign:"center"},initialValue:T.category,initialValid:!0}),(0,b.jsx)(h.Z,{element:"input",id:"budget",type:"number",label:"$",onInput:S,validators:[(0,p.hg)(),(0,p.qE)(0)],errorText:"amount must be greater than or equal to 0",initialValue:"".concat(T.budget),initialValid:!0,step:"0.01"})]}),(0,b.jsxs)("div",{className:"note",children:[(0,b.jsx)("p",{className:"heading",children:"Note:"}),(0,b.jsx)(h.Z,{element:"input",id:"note1",type:"text",placeholder:"New note",onInput:S,validators:[(0,p.IT)(36)],errorText:"only 36 characters",initialValue:T.notes[0].note,initialValid:!0}),(0,b.jsx)(h.Z,{element:"input",id:"note2",type:"text",placeholder:"New note",onInput:S,validators:[(0,p.IT)(36)],errorText:"only 36 characters",initialValue:T.notes[1].note,initialValid:!0}),(0,b.jsx)(h.Z,{element:"input",id:"note3",type:"text",placeholder:"New note",onInput:S,validators:[(0,p.IT)(36)],errorText:"only 36 characters",initialValue:T.notes[2].note,initialValid:!0}),(0,b.jsx)(h.Z,{element:"input",id:"note4",type:"text",placeholder:"New note",onInput:S,validators:[(0,p.IT)(36)],errorText:"only 36 characters",initialValue:T.notes[3].note,initialValid:!0})]}),(0,b.jsx)(m.Z,{type:"submit",className:"btn btn-save btn--white",disabled:!E.isValid||V,children:"Save"}),(0,b.jsx)(m.Z,{to:"/envelopes",className:"btn-close",onClick:t.hideUpdatePage,children:(0,b.jsx)(x.Z,{})})]})})})]}):(0,b.jsx)("div",{className:"popup-center",children:(0,b.jsxs)("h2",{children:["Could not find envelope with ID-","".concat(o),"!"]})})}},1357:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(184),a=function(e){return(0,r.jsx)("div",{className:"card",style:{width:e.width,height:e.height},children:e.children})}},7205:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(885),a=n(1413),o=n(2791),i=n(291),l=n(184),u=function(e,t){switch(t.type){case"CHANGE":return(0,a.Z)((0,a.Z)({},e),{},{value:t.val,isValid:(0,i.Gu)(t.val,t.validators)});case"TOUCH":return(0,a.Z)((0,a.Z)({},e),{},{isTouched:!0});default:return e}},s=o.forwardRef((function(e,t){var n=(0,o.useReducer)(u,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),a=(0,r.Z)(n,2),i=a[0],s=a[1],c=e.id,d=e.onInput,p=i.value,f=i.isValid;(0,o.useEffect)((function(){d(c,p,f)}),[c,p,f,d]);var v,h=function(t){s({type:"CHANGE",val:t.target.value,validators:e.validators})},y=function(){s({type:"TOUCH"})},m=(0,o.useRef)(),x=function(){m.current.focus()};switch((0,o.useImperativeHandle)(t,(function(){return{focus:x}})),e.element){case"input":v=(0,l.jsx)("input",{ref:m,id:e.id,type:e.type,placeholder:e.placeholder,value:i.value,onChange:h,onBlur:y,step:e.step});break;case"flex-input":v=(0,l.jsx)("span",{ref:m,id:e.id,type:e.type,placeholder:e.placeholder,value:i.value,onChange:h,onBlur:y,step:e.step,contentEditable:!0});break;default:v=(0,l.jsxs)("textarea",{id:e.id,rows:e.rows||3,onChange:h,onBlur:y,value:i.value,children:[e.children," "]})}return(0,l.jsxs)("div",{className:"input ".concat(!i.isValid&&i.isTouched&&"invalid"),children:[(0,l.jsx)("label",{htmlFor:e.id,children:e.label}),v,!i.isValid&&i.isTouched&&(0,l.jsx)("p",{className:"error-message ".concat(e.errorClass),style:e.errorStyle,children:e.errorText})]})}))},2671:function(e,t,n){n(2791);var r=n(8707),a=n(6575),o=n(184);t.Z=function(e){return(0,o.jsx)(r.Z,{element:"popup",onClose:e.onClose,header:"An Error Occurred!",show:!!e.error,footer:(0,o.jsx)(a.Z,{onClick:e.onClose,className:"btn-popup btn--danger",children:"Okay"}),children:(0,o.jsx)("p",{children:e.error})})}},8707:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(1413),a=n(885),o=n(2791),i=n(4164),l=n(184),u=function(e){return i.createPortal((0,l.jsx)("div",{className:"backdrop",onClick:e.onClose}),document.getElementById("backdrop-hook"))},s=function(e){var t;if("popup"===e.element)t=(0,l.jsxs)("div",{className:"modal popup ".concat(e.className," ").concat(!e.show&&"popup-hidden"),style:e.style,children:[(0,l.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:(0,l.jsx)("h2",{children:e.header||"Warning"})}),(0,l.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[(0,l.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),(0,l.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});else t=(0,l.jsx)("div",{className:"modal ".concat(!e.show&&"popup-hidden"," ").concat(e.className),style:e.style,children:e.children});return i.createPortal(t,document.getElementById("modal-hook"))},c=function(e){var t=(0,o.useState)(!1),n=(0,a.Z)(t,2),i=n[0],c=n[1];return(0,o.useEffect)((function(){var t;return e.show?c(!0):t=setTimeout((function(){c(!1)}),350),function(){clearTimeout(t)}}),[e.show]),(0,l.jsxs)(o.Fragment,{children:[e.show&&(0,l.jsx)(u,{onClose:e.onClose}),i&&(0,l.jsx)(s,(0,r.Z)((0,r.Z)({},e),{},{children:e.children}))]})}},7993:function(e,t,n){n.d(t,{c:function(){return u}});var r=n(885),a=n(4942),o=n(1413),i=n(2791),l=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var r in e.inputs)n=r===t.inputId?n&&t.isValid:n&&e.inputs[r].isValid;return(0,o.Z)((0,o.Z)({},e),{},{inputs:(0,o.Z)((0,o.Z)({},e.inputs),{},(0,a.Z)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},u=function(e,t){var n=(0,i.useReducer)(l,{inputs:e,isValid:t}),a=(0,r.Z)(n,2),o=a[0],u=a[1];return[o,(0,i.useCallback)((function(e,t,n){u({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),(0,i.useCallback)((function(e,t){u({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},291:function(e,t,n){n.d(t,{Ox:function(){return f},IT:function(){return d},qE:function(){return p},CP:function(){return c},hg:function(){return s},Gu:function(){return v}});var r=n(181);var a="REQUIRE",o="MINLENGTH",i="MAXLENGTH",l="EMAIL",u="PASSWORD",s=function(){return{type:a}},c=function(e){return{type:o,val:e}},d=function(e){return{type:i,val:e}},p=function(e){return{type:"MIN",val:e}},f=function(){return{type:l}},v=function(e,t){var n,s=!0,c=function(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=(0,r.Z)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){u=!0,i=e},f:function(){try{l||null==n.return||n.return()}finally{if(u)throw i}}}}(t);try{for(c.s();!(n=c.n()).done;){var d=n.value;d.type===a&&(s=s&&e.trim().length>0),d.type===o&&(s=s&&e.trim().length>=d.val),d.type===i&&(s=s&&e.trim().length<=d.val),"MIN"===d.type&&(s=s&&+e>=d.val),"MAX"===d.type&&(s=s&&+e<=d.val),d.type===l&&(s=s&&/^\S+@\S+\.\S+$/.test(e)),d.type===u&&(s=s&&!e.toLowerCase().includes("password"))}}catch(p){c.e(p)}finally{c.f()}return s}},4942:function(e,t,n){function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Z:function(){return r}})},1413:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(4942);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);
//# sourceMappingURL=187.5951d203.chunk.js.map