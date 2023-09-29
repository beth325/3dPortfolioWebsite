"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("react"),r=require("three"),a=require("@react-three/fiber"),n=require("react-merge-refs"),o=require("../materials/BlurPass.cjs.js"),i=require("../materials/MeshReflectorMaterial.cjs.js");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function l(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var a=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,a.get?a:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}require("../materials/ConvolutionMaterial.cjs.js");var u=s(e),d=l(t),c=s(n);a.extend({MeshReflectorMaterial:i.MeshReflectorMaterial});const p=d.forwardRef((({mixBlur:e=0,mixStrength:t=.5,resolution:n=256,blur:i=[0,0],args:s=[1,1],minDepthThreshold:l=.9,maxDepthThreshold:p=1,depthScale:m=0,depthToBlurRatioBias:h=.25,mirror:f=0,children:x,debug:M=0,distortion:b=1,mixContrast:w=1,distortionMap:g,...T},y)=>{d.useEffect((()=>{console.warn("Reflector has been deprecated and will be removed next major. Replace it with <MeshReflectorMaterial />!")}),[]);const S=a.useThree((({gl:e})=>e)),R=a.useThree((({camera:e})=>e)),j=a.useThree((({scene:e})=>e)),v=(i=Array.isArray(i)?i:[i,i])[0]+i[1]>0,B=d.useRef(null),[D]=d.useState((()=>new r.Plane)),[P]=d.useState((()=>new r.Vector3)),[E]=d.useState((()=>new r.Vector3)),[V]=d.useState((()=>new r.Vector3)),[W]=d.useState((()=>new r.Matrix4)),[F]=d.useState((()=>new r.Vector3(0,0,-1))),[O]=d.useState((()=>new r.Vector4)),[q]=d.useState((()=>new r.Vector3)),[U]=d.useState((()=>new r.Vector3)),[C]=d.useState((()=>new r.Vector4)),[_]=d.useState((()=>new r.Matrix4)),[L]=d.useState((()=>new r.PerspectiveCamera)),k=d.useCallback((()=>{if(E.setFromMatrixPosition(B.current.matrixWorld),V.setFromMatrixPosition(R.matrixWorld),W.extractRotation(B.current.matrixWorld),P.set(0,0,1),P.applyMatrix4(W),q.subVectors(E,V),q.dot(P)>0)return;q.reflect(P).negate(),q.add(E),W.extractRotation(R.matrixWorld),F.set(0,0,-1),F.applyMatrix4(W),F.add(V),U.subVectors(E,F),U.reflect(P).negate(),U.add(E),L.position.copy(q),L.up.set(0,1,0),L.up.applyMatrix4(W),L.up.reflect(P),L.lookAt(U),L.far=R.far,L.updateMatrixWorld(),L.projectionMatrix.copy(R.projectionMatrix),_.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),_.multiply(L.projectionMatrix),_.multiply(L.matrixWorldInverse),_.multiply(B.current.matrixWorld),D.setFromNormalAndCoplanarPoint(P,E),D.applyMatrix4(L.matrixWorldInverse),O.set(D.normal.x,D.normal.y,D.normal.z,D.constant);const e=L.projectionMatrix;C.x=(Math.sign(O.x)+e.elements[8])/e.elements[0],C.y=(Math.sign(O.y)+e.elements[9])/e.elements[5],C.z=-1,C.w=(1+e.elements[10])/e.elements[14],O.multiplyScalar(2/O.dot(C)),e.elements[2]=O.x,e.elements[6]=O.y,e.elements[10]=O.z+1,e.elements[14]=O.w}),[]),[z,A,I,G]=d.useMemo((()=>{const a={minFilter:r.LinearFilter,magFilter:r.LinearFilter,encoding:S.outputEncoding},s=new r.WebGLRenderTarget(n,n,a);s.depthBuffer=!0,s.depthTexture=new r.DepthTexture(n,n),s.depthTexture.format=r.DepthFormat,s.depthTexture.type=r.UnsignedShortType;const u=new r.WebGLRenderTarget(n,n,a);return[s,u,new o.BlurPass({gl:S,resolution:n,width:i[0],height:i[1],minDepthThreshold:l,maxDepthThreshold:p,depthScale:m,depthToBlurRatioBias:h}),{mirror:f,textureMatrix:_,mixBlur:e,tDiffuse:s.texture,tDepth:s.depthTexture,tDiffuseBlur:u.texture,hasBlur:v,mixStrength:t,minDepthThreshold:l,maxDepthThreshold:p,depthScale:m,depthToBlurRatioBias:h,transparent:!0,debug:M,distortion:b,distortionMap:g,mixContrast:w,"defines-USE_BLUR":v?"":void 0,"defines-USE_DEPTH":m>0?"":void 0,"defines-USE_DISTORTION":g?"":void 0}]}),[S,i,_,n,f,v,e,t,l,p,m,h,M,b,g,w]);return a.useFrame((()=>{if(null==B||!B.current)return;B.current.visible=!1;const e=S.xr.enabled,t=S.shadowMap.autoUpdate;k(),S.xr.enabled=!1,S.shadowMap.autoUpdate=!1,S.setRenderTarget(z),S.state.buffers.depth.setMask(!0),S.autoClear||S.clear(),S.render(j,L),v&&I.render(S,z,A),S.xr.enabled=e,S.shadowMap.autoUpdate=t,B.current.visible=!0,S.setRenderTarget(null)})),d.createElement("mesh",u.default({ref:c.default([B,y])},T),d.createElement("planeGeometry",{args:s}),x?x("meshReflectorMaterial",G):d.createElement("meshReflectorMaterial",G))}));exports.Reflector=p;
