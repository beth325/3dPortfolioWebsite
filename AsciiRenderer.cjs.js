"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("@react-three/fiber"),r=require("three-stdlib");function o(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var n=o(e);exports.AsciiRenderer=function({renderIndex:e=1,bgColor:o="black",fgColor:l="white",characters:s=" .:-+*=%@#",invert:c=!0,color:i=!1,resolution:d=.15}){const{size:u,gl:m,scene:a,camera:f}=t.useThree(),E=n.useMemo((()=>{const e=new r.AsciiEffect(m,s,{invert:c,color:i,resolution:d});return e.domElement.style.position="absolute",e.domElement.style.top="0px",e.domElement.style.left="0px",e.domElement.style.pointerEvents="none",e}),[s,c,i,d]);n.useLayoutEffect((()=>{E.domElement.style.color=l,E.domElement.style.backgroundColor=o}),[l,o]),n.useEffect((()=>(m.domElement.style.opacity="0",m.domElement.parentNode.appendChild(E.domElement),()=>{m.domElement.style.opacity="1",m.domElement.parentNode.removeChild(E.domElement)})),[E]),n.useEffect((()=>{E.setSize(u.width,u.height)}),[E,u]),t.useFrame((e=>{E.render(a,f)}),e)};