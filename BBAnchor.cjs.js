"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),r=require("react"),t=require("three"),n=require("@react-three/fiber");function u(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function c(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach((function(t){if("default"!==t){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:function(){return e[t]}})}})),r.default=e,Object.freeze(r)}var o=u(e),a=c(r),i=c(t);const f=new i.Box3,l=new i.Vector3;exports.BBAnchor=({anchor:e,...r})=>{const t=a.useRef(null),u=a.useRef(null);return a.useEffect((()=>{var e,r;null!=(e=t.current)&&null!=(r=e.parent)&&r.parent&&(u.current=t.current.parent,t.current.parent.parent.add(t.current))}),[]),n.useFrame((()=>{u.current&&(f.setFromObject(u.current),f.getSize(l),t.current.position.set(u.current.position.x+l.x*e[0]/2,u.current.position.y+l.y*e[1]/2,u.current.position.z+l.z*e[2]/2))})),a.createElement("group",o.default({ref:t},r))};