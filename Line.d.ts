import * as React from 'react';
import { Vector2, Vector3, Color, ColorRepresentation } from 'three';
import { ReactThreeFiber } from '@react-three/fiber';
import { LineMaterial, LineMaterialParameters, Line2, LineSegments2 } from 'three-stdlib';
export declare type LineProps = {
    points: Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>;
    vertexColors?: Array<Color | [number, number, number]>;
    lineWidth?: number;
    segments?: boolean;
} & Omit<LineMaterialParameters, 'vertexColors' | 'color'> & Omit<ReactThreeFiber.Object3DNode<Line2, typeof Line2>, 'args'> & Omit<ReactThreeFiber.Object3DNode<LineMaterial, [LineMaterialParameters]>, 'color' | 'vertexColors' | 'args'> & {
    color?: ColorRepresentation;
};
export declare const Line: React.ForwardRefExoticComponent<Pick<LineProps, "visible" | "attach" | "children" | "key" | "onUpdate" | "position" | "up" | "scale" | "rotation" | "matrix" | "quaternion" | "layers" | "dispose" | "type" | "id" | "uuid" | "name" | "parent" | "modelViewMatrix" | "normalMatrix" | "matrixWorld" | "matrixAutoUpdate" | "matrixWorldAutoUpdate" | "matrixWorldNeedsUpdate" | "castShadow" | "receiveShadow" | "frustumCulled" | "renderOrder" | "animations" | "userData" | "customDepthMaterial" | "customDistanceMaterial" | "isObject3D" | "onBeforeRender" | "onAfterRender" | "applyMatrix4" | "applyQuaternion" | "setRotationFromAxisAngle" | "setRotationFromEuler" | "setRotationFromMatrix" | "setRotationFromQuaternion" | "rotateOnAxis" | "rotateOnWorldAxis" | "rotateX" | "rotateY" | "rotateZ" | "translateOnAxis" | "translateX" | "translateY" | "translateZ" | "localToWorld" | "worldToLocal" | "lookAt" | "add" | "remove" | "removeFromParent" | "clear" | "getObjectById" | "getObjectByName" | "getObjectByProperty" | "getObjectsByProperty" | "getWorldPosition" | "getWorldQuaternion" | "getWorldScale" | "getWorldDirection" | "raycast" | "traverse" | "traverseVisible" | "traverseAncestors" | "updateMatrix" | "updateMatrixWorld" | "updateWorldMatrix" | "toJSON" | "clone" | "copy" | "addEventListener" | "hasEventListener" | "removeEventListener" | "dispatchEvent" | "color" | keyof import("@react-three/fiber/dist/declarations/src/core/events").EventHandlers | "material" | "geometry" | "blending" | "transparent" | "dashed" | "points" | "fog" | "alphaTest" | "alphaToCoverage" | "blendDst" | "blendDstAlpha" | "blendEquation" | "blendEquationAlpha" | "blendSrc" | "blendSrcAlpha" | "clipIntersection" | "clippingPlanes" | "clipShadows" | "colorWrite" | "defines" | "depthFunc" | "depthTest" | "depthWrite" | "stencilWrite" | "stencilFunc" | "stencilRef" | "stencilWriteMask" | "stencilFuncMask" | "stencilFail" | "stencilZFail" | "stencilZPass" | "isMaterial" | "needsUpdate" | "opacity" | "polygonOffset" | "polygonOffsetFactor" | "polygonOffsetUnits" | "precision" | "premultipliedAlpha" | "forceSinglePass" | "dithering" | "side" | "shadowSide" | "toneMapped" | "vertexColors" | "version" | "onBeforeCompile" | "customProgramCacheKey" | "setValues" | "morphTargetInfluences" | "morphTargetDictionary" | "isMesh" | "updateMorphTargets" | "getVertexPosition" | "computeLineDistances" | "uniforms" | "vertexShader" | "fragmentShader" | "linewidth" | "wireframe" | "wireframeLinewidth" | "lights" | "clipping" | "derivatives" | "extensions" | "defaultAttributeValues" | "index0AttributeName" | "uniformsNeedUpdate" | "glslVersion" | "isShaderMaterial" | "dashSize" | "gapSize" | "format" | "dashScale" | "dashOffset" | "resolution" | "worldUnits" | "isLine2" | "isLineSegments2" | "isLineMaterial" | "lineWidth" | "segments"> & React.RefAttributes<Line2 | LineSegments2>>;
