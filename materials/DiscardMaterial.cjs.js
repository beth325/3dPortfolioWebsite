"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../core/shaderMaterial.cjs.js");require("three");const r=e.shaderMaterial({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");exports.DiscardMaterial=r;
