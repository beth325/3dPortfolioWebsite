"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),n=require("three"),a=require("@react-three/fiber");function r(e){if(e&&e.__esModule)return e;var n=Object.create(null);return e&&Object.keys(e).forEach((function(a){if("default"!==a){var r=Object.getOwnPropertyDescriptor(e,a);Object.defineProperty(n,a,r.get?r:{enumerable:!0,get:function(){return e[a]}})}})),n.default=e,Object.freeze(n)}var o=r(e),t=r(n);const s=({frustum:e=3.75,size:n=.005,near:a=9.5,samples:r=10,rings:o=11}={})=>`#define LIGHT_WORLD_SIZE ${n}\n#define LIGHT_FRUSTUM_WIDTH ${e}\n#define LIGHT_SIZE_UV (LIGHT_WORLD_SIZE / LIGHT_FRUSTUM_WIDTH)\n#define NEAR_PLANE ${a}\n\n#define NUM_SAMPLES ${r}\n#define NUM_RINGS ${o}\n#define BLOCKER_SEARCH_NUM_SAMPLES NUM_SAMPLES\n\nvec2 poissonDisk[NUM_SAMPLES];\n\nvoid initPoissonSamples( const in vec2 randomSeed ) {\n  float ANGLE_STEP = PI2 * float( NUM_RINGS ) / float( NUM_SAMPLES );\n  float INV_NUM_SAMPLES = 1.0 / float( NUM_SAMPLES );\n\n  // jsfiddle that shows sample pattern: https://jsfiddle.net/a16ff1p7/\n  float angle = rand( randomSeed ) * PI2;\n  float radius = INV_NUM_SAMPLES;\n  float radiusStep = radius;\n\n  #pragma unroll_loop_start\n  for( int i = 0; i < ${r}; i ++ ) {\n    poissonDisk[i] = vec2( cos( angle ), sin( angle ) ) * pow( radius, 0.75 );\n    radius += radiusStep;\n    angle += ANGLE_STEP;\n  }\n  #pragma unroll_loop_end\n}\n\nfloat penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation\n  return (zReceiver - zBlocker) / zBlocker;\n}\n\nfloat findBlocker( sampler2D shadowMap, const in vec2 uv, const in float zReceiver ) {\n  // This uses similar triangles to compute what\n  // area of the shadow map we should search\n  float searchRadius = LIGHT_SIZE_UV * ( zReceiver - NEAR_PLANE ) / zReceiver;\n  float blockerDepthSum = 0.0;\n  float shadowMapDepth = 0.0;\n  int numBlockers = 0;  \n  #pragma unroll_loop_start\n  for( int i = 0; i < ${r}; i++ ) {\n    shadowMapDepth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[i] * searchRadius));\n    if ( shadowMapDepth < zReceiver ) {\n      blockerDepthSum += shadowMapDepth;\n      numBlockers ++;\n    }\n  }\n  #pragma unroll_loop_end\n\n  if( numBlockers == 0 ) return -1.0;\n  return blockerDepthSum / float( numBlockers );\n}\n\nfloat PCF_Filter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius ) {\n  float sum = 0.0;\n  float depth;\n  #pragma unroll_loop_start\n  for( int i = 0; i < ${r}; i ++ ) {\n    depth = unpackRGBAToDepth( texture2D( shadowMap, uv + poissonDisk[ i ] * filterRadius ) );\n    if( zReceiver <= depth ) sum += 1.0;\n  }\n  #pragma unroll_loop_end\n  #pragma unroll_loop_start\n  for( int i = 0; i < ${r}; i ++ ) {\n    depth = unpackRGBAToDepth( texture2D( shadowMap, uv + -poissonDisk[ i ].yx * filterRadius ) );\n    if( zReceiver <= depth ) sum += 1.0;\n  }\n  #pragma unroll_loop_end\n  return sum / ( 2.0 * float( ${r} ) );\n}\n\nfloat PCSS ( sampler2D shadowMap, vec4 coords ) {\n  vec2 uv = coords.xy;\n  float zReceiver = coords.z; // Assumed to be eye-space z in this code\n\n  initPoissonSamples( uv );\n  // STEP 1: blocker search\n  float avgBlockerDepth = findBlocker( shadowMap, uv, zReceiver );\n\n  //There are no occluders so early out (this saves filtering)\n  if( avgBlockerDepth == -1.0 ) return 1.0;\n\n  // STEP 2: penumbra size\n  float penumbraRatio = penumbraSize( zReceiver, avgBlockerDepth );\n  float filterRadius = penumbraRatio * LIGHT_SIZE_UV * NEAR_PLANE / zReceiver;\n\n  // STEP 3: filtering\n  //return avgBlockerDepth;\n  return PCF_Filter( shadowMap, uv, zReceiver, filterRadius );\n}`;let i=!1;function l(e,n,a){n.traverse((n=>{n.material&&(e.properties.remove(n.material),n.material.dispose())})),e.info.programs.length=0,e.compile(n,a)}exports.SoftShadows=function({frustum:e=3.75,size:n=.005,near:r=9.5,samples:i=10,rings:p=11}){const d=a.useThree((e=>e.gl)),u=a.useThree((e=>e.scene)),f=a.useThree((e=>e.camera));return o.useEffect((()=>{const a=t.ShaderChunk.shadowmap_pars_fragment;let o=t.ShaderChunk.shadowmap_pars_fragment;return o=o.replace("#ifdef USE_SHADOWMAP","#ifdef USE_SHADOWMAP\n"+s({frustum:e,size:n,near:r,samples:i,rings:p})),o=o.replace("#if defined( SHADOWMAP_TYPE_PCF )","\nreturn PCSS(shadowMap, shadowCoord);\n#if defined( SHADOWMAP_TYPE_PCF )"),t.ShaderChunk.shadowmap_pars_fragment=o,l(d,u,f),()=>{t.ShaderChunk.shadowmap_pars_fragment=a,l(d,u,f)}}),[e,n,r,i,p]),null},exports.softShadows=e=>{if(!i){console.warn("drei/softShadows() is deprecated, use <SoftShadows> instead"),i=!0;let n=t.ShaderChunk.shadowmap_pars_fragment;n=n.replace("#ifdef USE_SHADOWMAP","#ifdef USE_SHADOWMAP\n"+s({...e})),n=n.replace("#if defined( SHADOWMAP_TYPE_PCF )","\nreturn PCSS(shadowMap, shadowCoord);\n#if defined( SHADOWMAP_TYPE_PCF )"),t.ShaderChunk.shadowmap_pars_fragment=n}};
