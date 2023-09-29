"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),r=require("three"),n=require("react"),t=require("@react-three/fiber"),o=require("./useFBO.cjs.js"),i=require("./useHelper.cjs.js"),a=require("./shaderMaterial.cjs.js"),l=require("./Edges.cjs.js"),c=require("three-stdlib");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var t=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,t.get?t:{enumerable:!0,get:function(){return e[n]}})}})),r.default=e,Object.freeze(r)}var d=s(e),m=u(r),p=u(n);function v(e=m.FrontSide){const r={value:new m.Matrix4};return Object.assign(new m.MeshNormalMaterial({side:e}),{viewMatrix:r,onBeforeCompile:e=>{e.uniforms.viewMatrix=r,e.fragmentShader="vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n           return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n         }\n"+e.fragmentShader.replace("#include <normal_fragment_maps>","#include <normal_fragment_maps>\n           normal = inverseTransformDirection( normal, viewMatrix );\n")}})}const f=a.shaderMaterial({causticsTexture:null,causticsTextureB:null,color:new m.Color,lightProjMatrix:new m.Matrix4,lightViewMatrix:new m.Matrix4},"varying vec3 vWorldPosition;   \n   void main() {\n     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);\n     vec4 worldPosition = modelMatrix * vec4(position, 1.);\n     vWorldPosition = worldPosition.xyz;\n   }","varying vec3 vWorldPosition;\n  uniform vec3 color;\n  uniform sampler2D causticsTexture; \n  uniform sampler2D causticsTextureB; \n  uniform mat4 lightProjMatrix;\n  uniform mat4 lightViewMatrix;\n   void main() {\n    // Apply caustics  \n    vec4 lightSpacePos = lightProjMatrix * lightViewMatrix * vec4(vWorldPosition, 1.0);\n    lightSpacePos.xyz /= lightSpacePos.w;\n    lightSpacePos.xyz = lightSpacePos.xyz * 0.5 + 0.5; \n    vec3 front = texture2D(causticsTexture, lightSpacePos.xy).rgb;\n    vec3 back = texture2D(causticsTextureB, lightSpacePos.xy).rgb;\n    gl_FragColor = vec4((front + back) * color, 1.0);\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n   }"),x=a.shaderMaterial({cameraMatrixWorld:new m.Matrix4,cameraProjectionMatrixInv:new m.Matrix4,normalTexture:null,depthTexture:null,lightDir:new m.Vector3(0,1,0),lightPlaneNormal:new m.Vector3(0,1,0),lightPlaneConstant:0,near:.1,far:100,modelMatrix:new m.Matrix4,worldRadius:1/40,ior:1.1,bounces:0,resolution:1024,size:10,intensity:.5},"\n  varying vec2 vUv;\n  void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  }","  \n  uniform mat4 cameraMatrixWorld;\n  uniform mat4 cameraProjectionMatrixInv;\n  uniform vec3 lightDir;\n  uniform vec3 lightPlaneNormal;\n  uniform float lightPlaneConstant;\n  uniform float near;\n  uniform float far;\n  uniform float time;\n  uniform float worldRadius;\n  uniform float resolution;\n  uniform float size;\n  uniform float intensity;\n  uniform float ior;\n  precision highp isampler2D;\n  precision highp usampler2D;\n  uniform sampler2D normalTexture;\n  uniform sampler2D depthTexture;\n  uniform float bounces;\n  varying vec2 vUv;\n  vec3 WorldPosFromDepth(float depth, vec2 coord) {\n    float z = depth * 2.0 - 1.0;\n    vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);\n    vec4 viewSpacePosition = cameraProjectionMatrixInv * clipSpacePosition;\n    // Perspective division\n    viewSpacePosition /= viewSpacePosition.w;\n    vec4 worldSpacePosition = cameraMatrixWorld * viewSpacePosition;\n    return worldSpacePosition.xyz;\n  }                  \n  float sdPlane( vec3 p, vec3 n, float h ) {\n    // n must be normalized\n    return dot(p,n) + h;\n  }\n  float planeIntersect( vec3 ro, vec3 rd, vec4 p ) {\n    return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);\n  }\n  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 pos, vec3 normal, float ior, out vec3 rayOrigin, out vec3 rayDirection) {\n    rayOrigin = ro;\n    rayDirection = rd;\n    rayDirection = refract(rayDirection, normal, 1.0 / ior);\n    rayOrigin = pos + rayDirection * 0.1;\n    return rayDirection;\n  }\n  void main() {\n    // Each sample consists of random offset in the x and y direction\n    float caustic = 0.0;\n    float causticTexelSize = (1.0 / resolution) * size * 2.0;\n    float texelsNeeded = worldRadius / causticTexelSize;\n    float sampleRadius = texelsNeeded / resolution;\n    float sum = 0.0;\n    if (texture2D(depthTexture, vUv).x == 1.0) {\n      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      return;\n    }\n    vec2 offset1 = vec2(-0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);\n    vec2 offset2 = vec2(-0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);\n    vec2 offset3 = vec2(0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);\n    vec2 offset4 = vec2(0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);\n    vec2 uv1 = vUv + offset1 * sampleRadius;\n    vec2 uv2 = vUv + offset2 * sampleRadius;\n    vec2 uv3 = vUv + offset3 * sampleRadius;\n    vec2 uv4 = vUv + offset4 * sampleRadius;\n    vec3 normal1 = texture2D(normalTexture, uv1, -10.0).rgb * 2.0 - 1.0;\n    vec3 normal2 = texture2D(normalTexture, uv2, -10.0).rgb * 2.0 - 1.0;\n    vec3 normal3 = texture2D(normalTexture, uv3, -10.0).rgb * 2.0 - 1.0;\n    vec3 normal4 = texture2D(normalTexture, uv4, -10.0).rgb * 2.0 - 1.0;\n    float depth1 = texture2D(depthTexture, uv1, -10.0).x;\n    float depth2 = texture2D(depthTexture, uv2, -10.0).x;\n    float depth3 = texture2D(depthTexture, uv3, -10.0).x;\n    float depth4 = texture2D(depthTexture, uv4, -10.0).x;\n    // Sanity check the depths\n    if (depth1 == 1.0 || depth2 == 1.0 || depth3 == 1.0 || depth4 == 1.0) {\n      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      return;\n    }\n    vec3 pos1 = WorldPosFromDepth(depth1, uv1);\n    vec3 pos2 = WorldPosFromDepth(depth2, uv2);\n    vec3 pos3 = WorldPosFromDepth(depth3, uv3);\n    vec3 pos4 = WorldPosFromDepth(depth4, uv4);\n    vec3 originPos1 = WorldPosFromDepth(0.0, uv1);\n    vec3 originPos2 = WorldPosFromDepth(0.0, uv2);\n    vec3 originPos3 = WorldPosFromDepth(0.0, uv3);\n    vec3 originPos4 = WorldPosFromDepth(0.0, uv4);\n    vec3 endPos1, endPos2, endPos3, endPos4;\n    vec3 endDir1, endDir2, endDir3, endDir4;\n    totalInternalReflection(originPos1, lightDir, pos1, normal1, ior, endPos1, endDir1);\n    totalInternalReflection(originPos2, lightDir, pos2, normal2, ior, endPos2, endDir2);\n    totalInternalReflection(originPos3, lightDir, pos3, normal3, ior, endPos3, endDir3);\n    totalInternalReflection(originPos4, lightDir, pos4, normal4, ior, endPos4, endDir4);\n    float lightPosArea = length(cross(originPos2 - originPos1, originPos3 - originPos1)) + length(cross(originPos3 - originPos1, originPos4 - originPos1));\n    float t1 = planeIntersect(endPos1, endDir1, vec4(lightPlaneNormal, lightPlaneConstant));\n    float t2 = planeIntersect(endPos2, endDir2, vec4(lightPlaneNormal, lightPlaneConstant));\n    float t3 = planeIntersect(endPos3, endDir3, vec4(lightPlaneNormal, lightPlaneConstant));\n    float t4 = planeIntersect(endPos4, endDir4, vec4(lightPlaneNormal, lightPlaneConstant));\n    vec3 finalPos1 = endPos1 + endDir1 * t1;\n    vec3 finalPos2 = endPos2 + endDir2 * t2;\n    vec3 finalPos3 = endPos3 + endDir3 * t3;\n    vec3 finalPos4 = endPos4 + endDir4 * t4;\n    float finalArea = length(cross(finalPos2 - finalPos1, finalPos3 - finalPos1)) + length(cross(finalPos3 - finalPos1, finalPos4 - finalPos1));\n    caustic += intensity * (lightPosArea / finalArea);\n    // Calculate the area of the triangle in light spaces\n    gl_FragColor = vec4(vec3(max(caustic, 0.0)), 1.0);\n  }"),h={depth:!0,minFilter:m.LinearFilter,magFilter:m.LinearFilter,encoding:m.LinearEncoding,type:m.UnsignedByteType},g={minFilter:m.LinearMipmapLinearFilter,magFilter:m.LinearFilter,encoding:m.LinearEncoding,format:m.RGBAFormat,type:m.FloatType,generateMipmaps:!0},P=p.forwardRef((({debug:e,children:r,frames:n=1,ior:a=1.1,color:s="white",causticsOnly:u=!1,backside:P=!1,backsideIOR:y=1.1,worldRadius:M=.3125,intensity:w=.05,resolution:D=2024,lightSource:T=[5,5,5],...F},S)=>{t.extend({CausticsProjectionMaterial:f});const b=p.useRef(null),j=p.useRef(null),z=p.useRef(null),R=p.useRef(null),W=t.useThree((e=>e.gl)),I=i.useHelper(e&&j,m.CameraHelper),O=o.useFBO(D,D,h),C=o.useFBO(D,D,h),V=o.useFBO(D,D,g),B=o.useFBO(D,D,g),[_]=p.useState((()=>v())),[E]=p.useState((()=>v(m.BackSide))),[A]=p.useState((()=>new x)),[N]=p.useState((()=>new c.FullScreenQuad(A)));p.useLayoutEffect((()=>{b.current.updateWorldMatrix(!1,!0)}));let k=0;const q=new m.Vector3,L=new m.Frustum,U=new m.Matrix4,H=new m.Plane,G=new m.Vector3,Q=new m.Vector3,J=new m.Box3,K=new m.Vector3;return t.useFrame(((r,t)=>{if(n===1/0||k++<n){var o,i;Array.isArray(T)?G.fromArray(T).normalize():G.copy(b.current.worldToLocal(T.current.getWorldPosition(q)).normalize()),Q.copy(G).multiplyScalar(-1);let r=[];null==(o=z.current.parent)||o.matrixWorld.identity(),J.setFromObject(z.current,!0),r.push(new m.Vector3(J.min.x,J.min.y,J.min.z)),r.push(new m.Vector3(J.min.x,J.min.y,J.max.z)),r.push(new m.Vector3(J.min.x,J.max.y,J.min.z)),r.push(new m.Vector3(J.min.x,J.max.y,J.max.z)),r.push(new m.Vector3(J.max.x,J.min.y,J.min.z)),r.push(new m.Vector3(J.max.x,J.min.y,J.max.z)),r.push(new m.Vector3(J.max.x,J.max.y,J.min.z)),r.push(new m.Vector3(J.max.x,J.max.y,J.max.z));const n=r.map((e=>e.clone()));J.getCenter(K),r=r.map((e=>e.clone().sub(K)));const t=H.set(Q,0),l=r.map((e=>t.projectPoint(e,new m.Vector3))),c=l.reduce(((e,r)=>e.add(r)),q.set(0,0,0)).divideScalar(l.length),s=l.map((e=>e.distanceTo(c))).reduce(((e,r)=>Math.max(e,r))),d=r.map((e=>e.dot(G))).reduce(((e,r)=>Math.max(e,r)));j.current.position.copy(G.clone().multiplyScalar(d).add(K)),j.current.lookAt(z.current.localToWorld(K.clone()));const p=U.lookAt(j.current.position,K,q.set(0,1,0));j.current.left=-s,j.current.right=s,j.current.top=s,j.current.bottom=-s;const v=q.set(0,s,0).applyMatrix4(p),f=(j.current.position.y+v.y)/G.y;j.current.near=.1,j.current.far=f,j.current.updateProjectionMatrix(),j.current.updateMatrixWorld();const x=n.map((e=>e.add(G.clone().multiplyScalar(-e.y/G.y)))),h=x.reduce(((e,r)=>e.add(r)),q.set(0,0,0)).divideScalar(x.length),g=2*x.map((e=>Math.hypot(e.x-h.x,e.z-h.z))).reduce(((e,r)=>Math.max(e,r)));R.current.scale.setScalar(g),R.current.position.copy(h),e&&(null==(i=I.current)||i.update()),E.viewMatrix.value=_.viewMatrix.value=j.current.matrixWorldInverse;const F=L.setFromProjectionMatrix(U.multiplyMatrices(j.current.projectionMatrix,j.current.matrixWorldInverse)).planes[4];A.cameraMatrixWorld=j.current.matrixWorld,A.cameraProjectionMatrixInv=j.current.projectionMatrixInverse,A.lightDir=Q,A.lightPlaneNormal=F.normal,A.lightPlaneConstant=F.constant,A.near=j.current.near,A.far=j.current.far,A.resolution=D,A.size=s,A.intensity=w,A.worldRadius=M,z.current.visible=!0,W.setRenderTarget(O),W.clear(),z.current.overrideMaterial=_,W.render(z.current,j.current),W.setRenderTarget(C),W.clear(),P&&(z.current.overrideMaterial=E,W.render(z.current,j.current)),z.current.overrideMaterial=null,A.ior=a,R.current.material.lightProjMatrix=j.current.projectionMatrix,R.current.material.lightViewMatrix=j.current.matrixWorldInverse,A.normalTexture=O.texture,A.depthTexture=O.depthTexture,W.setRenderTarget(V),W.clear(),N.render(W),A.ior=y,A.normalTexture=C.texture,A.depthTexture=C.depthTexture,W.setRenderTarget(B),W.clear(),P&&N.render(W),W.setRenderTarget(null),u&&(z.current.visible=!1)}})),p.useImperativeHandle(S,(()=>b.current),[]),p.createElement("group",d.default({ref:b},F),p.createElement("scene",{ref:z},p.createElement("orthographicCamera",{ref:j,up:[0,1,0]}),r),p.createElement("mesh",{renderOrder:2,ref:R,"rotation-x":-Math.PI/2},p.createElement("planeGeometry",null),p.createElement("causticsProjectionMaterial",{transparent:!0,color:s,causticsTexture:V.texture,causticsTextureB:B.texture,blending:m.CustomBlending,blendSrc:m.OneFactor,blendDst:m.SrcAlphaFactor,depthWrite:!1}),e&&p.createElement(l.Edges,null,p.createElement("lineBasicMaterial",{color:"#ffff00",toneMapped:!1}))))}));exports.Caustics=P;