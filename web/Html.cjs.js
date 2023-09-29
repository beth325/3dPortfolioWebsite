"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("react"),r=require("react-dom/client"),n=require("three"),o=require("@react-three/fiber");function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function s(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var a=i(e),c=s(t),l=s(r);const u=new n.Vector3,d=new n.Vector3,m=new n.Vector3;function f(e,t,r){const n=u.setFromMatrixPosition(e.matrixWorld);n.project(t);const o=r.width/2,i=r.height/2;return[n.x*o+o,-n.y*i+i]}const h=e=>Math.abs(e)<1e-10?0:e;function p(e,t,r=""){let n="matrix3d(";for(let r=0;16!==r;r++)n+=h(t[r]*e.elements[r])+(15!==r?",":")");return r+n}const x=(v=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>p(e,v));var v;const y=(e,t)=>{return p(e,[1/(r=t),1/r,1/r,1,-1/r,-1/r,-1/r,-1,1/r,1/r,1/r,1,1,1,1,1],"translate(-50%,-50%)");var r};const g=c.forwardRef((({children:e,eps:t=.001,style:r,className:i,prepend:s,center:p,fullscreen:v,portal:g,distanceFactor:M,sprite:b=!1,transform:P=!1,occlude:w,onOcclude:E,castShadow:W,receiveShadow:S,material:$,geometry:j,zIndexRange:z=[16777271,0],calculatePosition:O=f,as:R="div",wrapperClass:F,pointerEvents:C="auto",...T},I)=>{const{gl:A,camera:k,scene:H,size:N,raycaster:_,events:q,viewport:V}=o.useThree(),[L]=c.useState((()=>document.createElement(R))),D=c.useRef(),G=c.useRef(null),Z=c.useRef(0),B=c.useRef([0,0]),J=c.useRef(null),K=c.useRef(null),Q=(null==g?void 0:g.current)||q.connected||A.domElement.parentNode,U=c.useRef(null),X=c.useRef(!1),Y=c.useMemo((()=>w&&"blending"!==w||Array.isArray(w)&&w.length&&function(e){return e&&"object"==typeof e&&"current"in e}(w[0])),[w]);c.useLayoutEffect((()=>{const e=A.domElement;w&&"blending"===w?(e.style.zIndex=`${Math.floor(z[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)}),[w]),c.useLayoutEffect((()=>{if(G.current){const e=D.current=l.createRoot(L);if(H.updateMatrixWorld(),P)L.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const e=O(G.current,k,N);L.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return Q&&(s?Q.prepend(L):Q.appendChild(L)),()=>{Q&&Q.removeChild(L),e.unmount()}}}),[Q,P]),c.useLayoutEffect((()=>{F&&(L.className=F)}),[F]);const ee=c.useMemo((()=>P?{position:"absolute",top:0,left:0,width:N.width,height:N.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:p?"translate3d(-50%,-50%,0)":"none",...v&&{top:-N.height/2,left:-N.width/2,width:N.width,height:N.height},...r}),[r,p,v,N,P]),te=c.useMemo((()=>({position:"absolute",pointerEvents:C})),[C]);c.useLayoutEffect((()=>{var t,n;(X.current=!1,P)?null==(t=D.current)||t.render(c.createElement("div",{ref:J,style:ee},c.createElement("div",{ref:K,style:te},c.createElement("div",{ref:I,className:i,style:r,children:e})))):null==(n=D.current)||n.render(c.createElement("div",{ref:I,style:ee,className:i,children:e}))}));const re=c.useRef(!0);o.useFrame((e=>{if(G.current){k.updateMatrixWorld(),G.current.updateWorldMatrix(!0,!1);const e=P?B.current:O(G.current,k,N);if(P||Math.abs(Z.current-k.zoom)>t||Math.abs(B.current[0]-e[0])>t||Math.abs(B.current[1]-e[1])>t){const t=function(e,t){const r=u.setFromMatrixPosition(e.matrixWorld),n=d.setFromMatrixPosition(t.matrixWorld),o=r.sub(n),i=t.getWorldDirection(m);return o.angleTo(i)>Math.PI/2}(G.current,k);let r=!1;Y&&("blending"!==w?r=[H]:Array.isArray(w)&&(r=w.map((e=>e.current))));const o=re.current;if(r){const e=function(e,t,r,n){const o=u.setFromMatrixPosition(e.matrixWorld),i=o.clone();i.project(t),r.setFromCamera(i,t);const s=r.intersectObjects(n,!0);if(s.length){const e=s[0].distance;return o.distanceTo(r.ray.origin)<e}return!0}(G.current,k,_,r);re.current=e&&!t}else re.current=!t;o!==re.current&&(E?E(!re.current):L.style.display=re.current?"block":"none");const i=Math.floor(z[0]/2),s=w?Y?[z[0],i]:[i-1,0]:z;if(L.style.zIndex=`${function(e,t,r){if(t instanceof n.PerspectiveCamera||t instanceof n.OrthographicCamera){const n=u.setFromMatrixPosition(e.matrixWorld),o=d.setFromMatrixPosition(t.matrixWorld),i=n.distanceTo(o),s=(r[1]-r[0])/(t.far-t.near),a=r[1]-s*t.far;return Math.round(s*i+a)}}(G.current,k,s)}`,P){const[e,t]=[N.width/2,N.height/2],r=k.projectionMatrix.elements[5]*t,{isOrthographicCamera:n,top:o,left:i,bottom:s,right:a}=k,c=x(k.matrixWorldInverse),l=n?`scale(${r})translate(${h(-(a+i)/2)}px,${h((o+s)/2)}px)`:`translateZ(${r}px)`;let u=G.current.matrixWorld;b&&(u=k.matrixWorldInverse.clone().transpose().copyPosition(u).scale(G.current.scale),u.elements[3]=u.elements[7]=u.elements[11]=0,u.elements[15]=1),L.style.width=N.width+"px",L.style.height=N.height+"px",L.style.perspective=n?"":`${r}px`,J.current&&K.current&&(J.current.style.transform=`${l}${c}translate(${e}px,${t}px)`,K.current.style.transform=y(u,1/((M||10)/400)))}else{const t=void 0===M?1:function(e,t){if(t instanceof n.OrthographicCamera)return t.zoom;if(t instanceof n.PerspectiveCamera){const r=u.setFromMatrixPosition(e.matrixWorld),n=d.setFromMatrixPosition(t.matrixWorld),o=t.fov*Math.PI/180,i=r.distanceTo(n);return 1/(2*Math.tan(o/2)*i)}return 1}(G.current,k)*M;L.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}B.current=e,Z.current=k.zoom}}if(!Y&&U.current&&!X.current)if(P){if(J.current){const e=J.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){const{isOrthographicCamera:t}=k;if(t||j)T.scale&&(Array.isArray(T.scale)?T.scale instanceof n.Vector3?U.current.scale.copy(T.scale.clone().divideScalar(1)):U.current.scale.set(1/T.scale[0],1/T.scale[1],1/T.scale[2]):U.current.scale.setScalar(1/T.scale));else{const t=(M||10)/400,r=e.clientWidth*t,n=e.clientHeight*t;U.current.scale.set(r,n,1)}X.current=!0}}}else{const t=L.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){const e=1/V.factor,r=t.clientWidth*e,n=t.clientHeight*e;U.current.scale.set(r,n,1),X.current=!0}U.current.lookAt(e.camera.position)}}));const ne=c.useMemo((()=>({vertexShader:P?void 0:'\n          /*\n            This shader is from the THREE\'s SpriteMaterial.\n            We need to turn the backing plane into a Sprite\n            (make it always face the camera) if "transfrom" \n            is false. \n          */\n          #include <common>\n\n          void main() {\n            vec2 center = vec2(0., 1.);\n            float rotation = 0.0;\n            \n            // This is somewhat arbitrary, but it seems to work well\n            // Need to figure out how to derive this dynamically if it even matters\n            float size = 0.03;\n\n            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n            vec2 scale;\n            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\n            bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n            if ( isPerspective ) scale *= - mvPosition.z;\n\n            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;\n            vec2 rotatedPosition;\n            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n            mvPosition.xy += rotatedPosition;\n\n            gl_Position = projectionMatrix * mvPosition;\n          }\n      ',fragmentShader:"\n        void main() {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        }\n      "})),[P]);return c.createElement("group",a.default({},T,{ref:G}),w&&!Y&&c.createElement("mesh",{castShadow:W,receiveShadow:S,ref:U},j||c.createElement("planeGeometry",null),$||c.createElement("shaderMaterial",{side:n.DoubleSide,vertexShader:ne.vertexShader,fragmentShader:ne.fragmentShader})))}));exports.Html=g;
