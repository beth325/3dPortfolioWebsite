"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("react"),n=require("three"),r=require("three-stdlib"),o=require("@react-three/fiber"),i=require("zustand/shallow");function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function s(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var c=l(e),u=s(t),a=s(n),d=l(i);const f=u.createContext([]);exports.Select=function({box:e,multiple:t,children:n,onChange:i,border:l="1px solid #55aaff",backgroundColor:s="rgba(75, 160, 255, 0.1)",filter:p=(e=>e),...h}){const{setEvents:v,camera:b,raycaster:y,gl:m,controls:x,size:E,get:g}=o.useThree(),[w,j]=u.useState(!1),[C,P]=u.useReducer(((e,{object:t,shift:n})=>void 0===t?[]:Array.isArray(t)?t:n?e.includes(t)?e.filter((e=>e!==t)):[t,...e]:e[0]===t?[]:[t]),[]);u.useEffect((()=>{null==i||i(C)}),[C]);const O=u.useCallback((e=>{e.stopPropagation(),P({object:p([e.object])[0],shift:t&&e.shiftKey})}),[]),M=u.useCallback((e=>!w&&P({})),[w]),k=u.useRef(null);return u.useEffect((()=>{if(!e||!t)return;const n=new r.SelectionBox(b,k.current),o=document.createElement("div");o.style.pointerEvents="none",o.style.border=l,o.style.backgroundColor=s,o.style.position="fixed";const i=new a.Vector2,c=new a.Vector2,u=new a.Vector2,f=g().events.enabled,h=null==x?void 0:x.enabled;let y=!1;function w(e,t){const{offsetX:n,offsetY:r}=e,{width:o,height:i}=E;t.set(n/o*2-1,-r/i*2+1)}function j(e){e.shiftKey&&(!function(e){var t;x&&(x.enabled=!1),v({enabled:!1}),y=!0,null==(t=m.domElement.parentElement)||t.appendChild(o),o.style.left=`${e.clientX}px`,o.style.top=`${e.clientY}px`,o.style.width="0px",o.style.height="0px",i.x=e.clientX,i.y=e.clientY}(e),w(e,n.startPoint))}let C=[];function O(e){if(y){!function(e){u.x=Math.max(i.x,e.clientX),u.y=Math.max(i.y,e.clientY),c.x=Math.min(i.x,e.clientX),c.y=Math.min(i.y,e.clientY),o.style.left=`${c.x}px`,o.style.top=`${c.y}px`,o.style.width=u.x-c.x+"px",o.style.height=u.y-c.y+"px"}(e),w(e,n.endPoint);const t=n.select().sort((e=>e.uuid)).filter((e=>e.isMesh));d.default(t,C)||(C=t,P({object:p(t)}))}}function M(e){var t;y&&y&&(x&&(x.enabled=h),v({enabled:f}),y=!1,null==(t=o.parentElement)||t.removeChild(o))}return document.addEventListener("pointerdown",j,{passive:!0}),document.addEventListener("pointermove",O,{passive:!0,capture:!0}),document.addEventListener("pointerup",M,{passive:!0}),()=>{document.removeEventListener("pointerdown",j),document.removeEventListener("pointermove",O),document.removeEventListener("pointerup",M)}}),[E.width,E.height,y,b,x,m]),u.createElement("group",c.default({ref:k,onClick:O,onPointerOver:()=>j(!0),onPointerOut:()=>j(!1),onPointerMissed:M},h),u.createElement(f.Provider,{value:C},n))},exports.useSelect=function(){return u.useContext(f)};
