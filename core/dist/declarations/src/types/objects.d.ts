import type { FluidValue } from '@react-spring/shared';
import type { Lookup, Any } from '@react-spring/types';
import type { AnimationConfig } from '../AnimationConfig';
import type { SpringValue } from '../SpringValue';
import type { Readable } from './internal';
/** The object type of the `config` prop. */
export declare type SpringConfig = Partial<AnimationConfig>;
/** The object given to the `onRest` prop and `start` promise. */
export interface AnimationResult<T extends Readable = any> {
    value: T extends Readable<infer U> ? U : never;
    /** When true, no animation ever started. */
    noop?: boolean;
    /** When true, the animation was neither cancelled nor stopped prematurely. */
    finished?: boolean;
    /** When true, the animation was cancelled before it could finish. */
    cancelled?: boolean;
}
/** The promised result of an animation. */
export declare type AsyncResult<T extends Readable = any> = Promise<AnimationResult<T>>;
/** Map an object type to allow `SpringValue` for any property */
export declare type Springify<T> = Lookup<SpringValue<unknown> | undefined> & {
    [P in keyof T]: T[P] | SpringValue<T[P]>;
};
/**
 * The set of `SpringValue` objects returned by a `useSpring` call (or similar).
 */
export declare type SpringValues<T extends Lookup = any> = [T] extends [Any] ? Lookup<SpringValue<unknown> | undefined> : {
    [P in keyof T]: SpringWrap<T[P]>;
};
declare type SpringWrap<T> = [
    Exclude<T, FluidValue>,
    Extract<T, readonly any[]>
] extends [object | void, never] ? never : SpringValue<Exclude<T, FluidValue | void>> | Extract<T, void>;
export {};
