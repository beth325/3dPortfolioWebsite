"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("@react-three/fiber"),r=require("react"),n=require("three-stdlib");function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function c(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var s=o(e),i=c(r);const u=i.forwardRef((({domElement:e,selector:r,onChange:o,onLock:c,onUnlock:u,enabled:a=!0,makeDefault:l,...d},f)=>{const{camera:h,...m}=d,v=t.useThree((e=>e.setEvents)),E=t.useThree((e=>e.gl)),b=t.useThree((e=>e.camera)),p=t.useThree((e=>e.invalidate)),k=t.useThree((e=>e.events)),L=t.useThree((e=>e.get)),g=t.useThree((e=>e.set)),j=h||b,y=e||k.connected||E.domElement,[O]=i.useState((()=>new n.PointerLockControls(j)));return i.useEffect((()=>{if(a){O.connect(y);const e=L().events.compute;return v({compute(e,t){const r=t.size.width/2,n=t.size.height/2;t.pointer.set(r/t.size.width*2-1,-n/t.size.height*2+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),()=>{O.disconnect(),v({compute:e})}}}),[a,O]),i.useEffect((()=>{const e=e=>{p(),o&&o(e)};O.addEventListener("change",e),c&&O.addEventListener("lock",c),u&&O.addEventListener("unlock",u);const t=()=>O.lock(),n=r?Array.from(document.querySelectorAll(r)):[document];return n.forEach((e=>e&&e.addEventListener("click",t))),()=>{O.removeEventListener("change",e),c&&O.addEventListener("lock",c),u&&O.addEventListener("unlock",u),n.forEach((e=>e?e.removeEventListener("click",t):void 0))}}),[o,c,u,r,O,p]),i.useEffect((()=>{if(l){const e=L().controls;return g({controls:O}),()=>g({controls:e})}}),[l,O]),i.createElement("primitive",s.default({ref:f,object:O},m))}));exports.PointerLockControls=u;
