"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),r=require("react"),t=require("@react-three/fiber"),a=require("three-mesh-bvh"),n=require("../materials/MeshRefractionMaterial.cjs.js");function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function o(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach((function(t){if("default"!==t){var a=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,a.get?a:{enumerable:!0,get:function(){return e[t]}})}})),r.default=e,Object.freeze(r)}require("three"),require("./shaderMaterial.cjs.js");var u=i(e),s=o(r);exports.MeshRefractionMaterial=function({aberrationStrength:e=0,fastChroma:i=!0,envMap:o,...c}){t.extend({MeshRefractionMaterial:n.MeshRefractionMaterial});const l=r.useRef(),{size:f}=t.useThree(),M=r.useMemo((()=>{var r,t;const a={},n=(u=o)&&u.isCubeTexture;var u;const s=(null!==(r=n?null==(t=o.image[0])?void 0:t.width:o.image.width)&&void 0!==r?r:1024)/4,c=Math.floor(Math.log2(s)),l=Math.pow(2,c),f=3*Math.max(l,112),M=4*l;return n&&(a.ENVMAP_TYPE_CUBEM=""),a.CUBEUV_TEXEL_WIDTH=""+1/f,a.CUBEUV_TEXEL_HEIGHT=""+1/M,a.CUBEUV_MAX_MIP=`${c}.0`,e>0&&(a.CHROMATIC_ABERRATIONS=""),i&&(a.FAST_CHROMA=""),a}),[e,i]);return r.useLayoutEffect((()=>{var e,r,t;const n=null==(e=l.current)||null==(r=e.__r3f)||null==(t=r.parent)?void 0:t.geometry;n&&l.current.bvh.updateFrom(new a.MeshBVH(n.toNonIndexed(),{lazyGeneration:!1,strategy:a.SAH}))}),[]),t.useFrame((({camera:e})=>{l.current.viewMatrixInverse=e.matrixWorld,l.current.projectionMatrixInverse=e.projectionMatrixInverse})),s.createElement("meshRefractionMaterial",u.default({key:JSON.stringify(M),defines:M,ref:l,resolution:[f.width,f.height],aberrationStrength:e,envMap:o},c))};