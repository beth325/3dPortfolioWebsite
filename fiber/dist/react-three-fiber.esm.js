import { c as createEvents, e as extend, u as useMutableCallback, a as createRoot, i as isRef, E as ErrorBoundary, B as Block, b as useIsomorphicLayoutEffect, d as unmountComponentAtNode } from './index-37bd4d5c.esm.js';
export { t as ReactThreeFiber, w as _roots, v as act, o as addAfterEffect, n as addEffect, p as addTail, m as advance, j as applyProps, f as context, c as createEvents, g as createPortal, a as createRoot, k as dispose, e as extend, q as flushGlobalEffects, s as getRootState, l as invalidate, h as reconciler, r as render, d as unmountComponentAtNode, A as useFrame, C as useGraph, x as useInstanceHandle, D as useLoader, y as useStore, z as useThree } from './index-37bd4d5c.esm.js';
import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import * as THREE from 'three';
import useMeasure from 'react-use-measure';
import { FiberProvider, useContextBridge } from 'its-fine';
import 'react-reconciler/constants';
import 'zustand';
import 'react-reconciler';
import 'scheduler';
import 'suspend-react';

const DOM_EVENTS = {
  onClick: ['click', false],
  onContextMenu: ['contextmenu', false],
  onDoubleClick: ['dblclick', false],
  onWheel: ['wheel', true],
  onPointerDown: ['pointerdown', true],
  onPointerUp: ['pointerup', true],
  onPointerLeave: ['pointerleave', true],
  onPointerMove: ['pointermove', true],
  onPointerCancel: ['pointercancel', true],
  onLostPointerCapture: ['lostpointercapture', true]
};

/** Default R3F event manager for web */
function createPointerEvents(store) {
  const {
    handlePointer
  } = createEvents(store);
  return {
    priority: 1,
    enabled: true,
    compute(event, state, previous) {
      // https://github.com/pmndrs/react-three-fiber/pull/782
      // Events trigger outside of canvas when moved, use offsetX/Y by default and allow overrides
      state.pointer.set(event.offsetX / state.size.width * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1);
      state.raycaster.setFromCamera(state.pointer, state.camera);
    },
    connected: undefined,
    handlers: Object.keys(DOM_EVENTS).reduce((acc, key) => ({
      ...acc,
      [key]: handlePointer(key)
    }), {}),
    update: () => {
      var _internal$lastEvent;
      const {
        events,
        internal
      } = store.getState();
      if ((_internal$lastEvent = internal.lastEvent) != null && _internal$lastEvent.current && events.handlers) events.handlers.onPointerMove(internal.lastEvent.current);
    },
    connect: target => {
      var _events$handlers;
      const {
        set,
        events
      } = store.getState();
      events.disconnect == null ? void 0 : events.disconnect();
      set(state => ({
        events: {
          ...state.events,
          connected: target
        }
      }));
      Object.entries((_events$handlers = events.handlers) != null ? _events$handlers : []).forEach(([name, event]) => {
        const [eventName, passive] = DOM_EVENTS[name];
        target.addEventListener(eventName, event, {
          passive
        });
      });
    },
    disconnect: () => {
      const {
        set,
        events
      } = store.getState();
      if (events.connected) {
        var _events$handlers2;
        Object.entries((_events$handlers2 = events.handlers) != null ? _events$handlers2 : []).forEach(([name, event]) => {
          if (events && events.connected instanceof HTMLElement) {
            const [eventName] = DOM_EVENTS[name];
            events.connected.removeEventListener(eventName, event);
          }
        });
        set(state => ({
          events: {
            ...state.events,
            connected: undefined
          }
        }));
      }
    }
  };
}

const CanvasImpl = /*#__PURE__*/React.forwardRef(function Canvas({
  children,
  fallback,
  resize,
  style,
  gl,
  events = createPointerEvents,
  eventSource,
  eventPrefix,
  shadows,
  linear,
  flat,
  legacy,
  orthographic,
  frameloop,
  dpr,
  performance,
  raycaster,
  camera,
  onPointerMissed,
  onCreated,
  ...props
}, forwardedRef) {
  // Create a known catalogue of Threejs-native elements
  // This will include the entire THREE namespace by default, users can extend
  // their own elements by using the createRoot API instead
  React.useMemo(() => extend(THREE), []);
  const Bridge = useContextBridge();
  const [containerRef, containerRect] = useMeasure({
    scroll: true,
    debounce: {
      scroll: 50,
      resize: 0
    },
    ...resize
  });
  const canvasRef = React.useRef(null);
  const divRef = React.useRef(null);
  const [canvas, setCanvas] = React.useState(null);
  React.useImperativeHandle(forwardedRef, () => canvasRef.current);
  const handlePointerMissed = useMutableCallback(onPointerMissed);
  const [block, setBlock] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Suspend this component if block is a promise (2nd run)
  if (block) throw block;
  // Throw exception outwards if anything within canvas throws
  if (error) throw error;
  const root = React.useRef(null);
  if (containerRect.width > 0 && containerRect.height > 0 && canvas) {
    if (!root.current) root.current = createRoot(canvas);
    root.current.configure({
      gl,
      events,
      shadows,
      linear,
      flat,
      legacy,
      orthographic,
      frameloop,
      dpr,
      performance,
      raycaster,
      camera,
      size: containerRect,
      // Pass mutable reference to onPointerMissed so it's free to update
      onPointerMissed: (...args) => handlePointerMissed.current == null ? void 0 : handlePointerMissed.current(...args),
      onCreated: state => {
        // Connect to event source
        state.events.connect == null ? void 0 : state.events.connect(eventSource ? isRef(eventSource) ? eventSource.current : eventSource : divRef.current);
        // Set up compute function
        if (eventPrefix) {
          state.setEvents({
            compute: (event, state) => {
              const x = event[eventPrefix + 'X'];
              const y = event[eventPrefix + 'Y'];
              state.pointer.set(x / state.size.width * 2 - 1, -(y / state.size.height) * 2 + 1);
              state.raycaster.setFromCamera(state.pointer, state.camera);
            }
          });
        }
        // Call onCreated callback
        onCreated == null ? void 0 : onCreated(state);
      }
    });
    root.current.render( /*#__PURE__*/React.createElement(Bridge, null, /*#__PURE__*/React.createElement(ErrorBoundary, {
      set: setError
    }, /*#__PURE__*/React.createElement(React.Suspense, {
      fallback: /*#__PURE__*/React.createElement(Block, {
        set: setBlock
      })
    }, children))));
  }
  useIsomorphicLayoutEffect(() => {
    setCanvas(canvasRef.current);
  }, []);
  React.useEffect(() => {
    if (canvas) return () => unmountComponentAtNode(canvas);
  }, [canvas]);

  // When the event source is not this div, we need to set pointer-events to none
  // Or else the canvas will block events from reaching the event source
  const pointerEvents = eventSource ? 'none' : 'auto';
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: divRef,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents,
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      display: 'block'
    }
  }, fallback)));
});

/**
 * A DOM canvas which accepts threejs elements as children.
 * @see https://docs.pmnd.rs/react-three-fiber/api/canvas
 */
const Canvas = /*#__PURE__*/React.forwardRef(function CanvasWrapper(props, ref) {
  return /*#__PURE__*/React.createElement(FiberProvider, null, /*#__PURE__*/React.createElement(CanvasImpl, _extends({}, props, {
    ref: ref
  })));
});

export { Canvas, createPointerEvents as events };
