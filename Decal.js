import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import * as THREE from 'three';
import { applyProps } from '@react-three/fiber';
import { DecalGeometry } from 'three-stdlib';

function isArray(vec) {
  return Array.isArray(vec);
}

function vecToArray(vec = [0, 0, 0]) {
  if (isArray(vec)) {
    return vec;
  } else if (vec instanceof THREE.Vector3 || vec instanceof THREE.Euler) {
    return [vec.x, vec.y, vec.z];
  } else {
    return [vec, vec, vec];
  }
}

function Decal({
  debug,
  mesh,
  children,
  position,
  rotation,
  scale,
  ...props
}) {
  const ref = React.useRef(null);
  const helper = React.useRef(null);
  React.useLayoutEffect(() => {
    const parent = (mesh == null ? void 0 : mesh.current) || ref.current.parent;
    const target = ref.current;

    if (!(parent instanceof THREE.Mesh)) {
      throw new Error('Decal must have a Mesh as parent or specify its "mesh" prop');
    }

    const state = {
      position: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      scale: new THREE.Vector3(1, 1, 1)
    };

    if (parent) {
      applyProps(state, {
        position,
        scale
      }); // Zero out the parents matrix world for this operation

      const matrixWorld = parent.matrixWorld.clone();
      parent.matrixWorld.identity();

      if (!rotation || typeof rotation === 'number') {
        const o = new THREE.Object3D();
        o.position.copy(state.position);
        o.lookAt(parent.position);
        if (typeof rotation === 'number') o.rotateZ(rotation);
        applyProps(state, {
          rotation: o.rotation
        });
      } else {
        applyProps(state, {
          rotation
        });
      }

      target.geometry = new DecalGeometry(parent, state.position, state.rotation, state.scale);
      if (helper.current) applyProps(helper.current, state); // Reset parents matix-world

      parent.matrixWorld = matrixWorld;
      return () => {
        target.geometry.dispose();
      };
    }
  }, [mesh, ...vecToArray(position), ...vecToArray(scale), ...vecToArray(rotation)]);
  return /*#__PURE__*/React.createElement("mesh", {
    ref: ref
  }, children || /*#__PURE__*/React.createElement("meshStandardMaterial", _extends({
    transparent: true,
    polygonOffset: true,
    polygonOffsetFactor: -10
  }, props)), debug && /*#__PURE__*/React.createElement("mesh", {
    ref: helper
  }, /*#__PURE__*/React.createElement("boxGeometry", null), /*#__PURE__*/React.createElement("meshNormalMaterial", {
    wireframe: true
  }), /*#__PURE__*/React.createElement("axesHelper", null)));
}

export { Decal };
