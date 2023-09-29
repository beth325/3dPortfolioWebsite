"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("three"),r=require("@react-three/fiber");function n(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var i=n(e),c=n(t);const o=new c.Color;function s(e){return"top"in e}function a({canvasSize:e,scene:t,index:n,children:c,frames:a,rect:u,track:l}){const h=r.useThree((e=>e.get)),f=r.useThree((e=>e.camera)),g=r.useThree((e=>e.scene)),d=r.useThree((e=>e.setEvents));let p=0;return r.useFrame((r=>{var n,i;(a===1/0||p<=a)&&(u.current=null==(n=l.current)?void 0:n.getBoundingClientRect(),p++);if(u.current){const{position:{left:n,bottom:a,width:l,height:h},isOffscreen:d}=function(e,t){const{right:r,top:n,left:i,bottom:c,width:o,height:a}=t,u=t.bottom<0||n>e.height||r<0||t.left>e.width;if(s(e)){const t=e.top+e.height-c;return{position:{width:o,height:a,left:i-e.left,top:n,bottom:t,right:r},isOffscreen:u}}return{position:{width:o,height:a,top:n,left:i,bottom:e.height-c,right:r},isOffscreen:u}}(e,u.current),p=l/h;(i=f)&&i.isOrthographicCamera?f.left===l/-2&&f.right===l/2&&f.top===h/2&&f.bottom===h/-2||(Object.assign(f,{left:l/-2,right:l/2,top:h/2,bottom:h/-2}),f.updateProjectionMatrix()):f.aspect!==p&&(f.aspect=p,f.updateProjectionMatrix()),r.gl.setViewport(n,a,l,h),r.gl.setScissor(n,a,l,h),r.gl.setScissorTest(!0),d?(r.gl.getClearColor(o),r.gl.setClearColor(o,r.gl.getClearAlpha()),r.gl.clear(!0,!0)):r.gl.render(c?g:t,f),r.gl.setScissorTest(!0)}}),n),i.useEffect((()=>{const e=h().events.connected;return d({connected:l.current}),()=>d({connected:e})}),[]),i.useEffect((()=>{s(e)||console.warn("Detected @react-three/fiber canvas size does not include position information. <View /> may not work as expected. Upgrade to @react-three/fiber ^8.1.0 for support.\n See https://github.com/pmndrs/drei/issues/944")}),[]),i.createElement(i.Fragment,null,c)}exports.View=({track:e,index:t=1,frames:n=1/0,children:o})=>{const s=i.useRef(null),{size:u,scene:l}=r.useThree(),[h]=i.useState((()=>new c.Scene)),f=i.useCallback(((t,r)=>{if(e.current&&t.target===e.current){const{width:e,height:n,left:i,top:c}=s.current,o=t.clientX-i,a=t.clientY-c;r.pointer.set(o/e*2-1,-a/n*2+1),r.raycaster.setFromCamera(r.pointer,r.camera)}}),[s]),[g,d]=i.useReducer((()=>!0),!1);return i.useEffect((()=>{var t;s.current=null==(t=e.current)?void 0:t.getBoundingClientRect(),d()}),[]),i.createElement(i.Fragment,null,g&&r.createPortal(i.createElement(a,{canvasSize:u,frames:n,scene:l,track:e,rect:s,index:t},o),h,{events:{compute:f,priority:t},size:{width:s.current.width,height:s.current.height}}))};