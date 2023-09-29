"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),r=require("react"),t=require("three"),a=require("@react-three/fiber"),n=require("three-stdlib"),s=require("react-merge-refs");function u(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function c(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach((function(t){if("default"!==t){var a=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,a.get?a:{enumerable:!0,get:function(){return e[t]}})}})),r.default=e,Object.freeze(r)}var o=u(e),i=c(r),l=u(s);const d=i.forwardRef((({children:e,multisamping:r=8,renderIndex:s=1,disableRender:u,disableGamma:c,disableRenderPass:d,depthBuffer:f=!0,stencilBuffer:p=!1,anisotropy:h=1,encoding:m,type:g,...b},y)=>{i.useMemo((()=>a.extend({EffectComposer:n.EffectComposer,RenderPass:n.RenderPass,ShaderPass:n.ShaderPass})),[]);const E=i.useRef(),{scene:v,camera:P,gl:R,size:w,viewport:x}=a.useThree(),[j]=i.useState((()=>{const e=new t.WebGLRenderTarget(w.width,w.height,{type:g||t.HalfFloatType,format:t.RGBAFormat,encoding:m||R.outputEncoding,depthBuffer:f,stencilBuffer:p,anisotropy:h});return e.samples=r,e}));i.useEffect((()=>{var e,r;null==(e=E.current)||e.setSize(w.width,w.height),null==(r=E.current)||r.setPixelRatio(x.dpr)}),[R,w,x.dpr]),a.useFrame((()=>{var e;u||null==(e=E.current)||e.render()}),s);const C=[];return d||C.push(i.createElement("renderPass",{key:"renderpass",attach:`passes-${C.length}`,args:[v,P]})),c||C.push(i.createElement("shaderPass",{attach:`passes-${C.length}`,key:"gammapass",args:[n.GammaCorrectionShader]})),i.Children.forEach(e,(e=>{e&&C.push(i.cloneElement(e,{key:C.length,attach:`passes-${C.length}`}))})),i.createElement("effectComposer",o.default({ref:l.default([y,E]),args:[R,j]},b),C)}));exports.Effects=d,exports.isWebGL2Available=()=>{try{var e=document.createElement("canvas");return!(!window.WebGL2RenderingContext||!e.getContext("webgl2"))}catch(e){return!1}};