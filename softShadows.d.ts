declare type SoftShadowsProps = {
    frustum?: number;
    size?: number;
    near?: number;
    samples?: number;
    rings?: number;
};
export declare const softShadows: (props?: SoftShadowsProps) => void;
export declare function SoftShadows({ frustum, size, near, samples, rings }: SoftShadowsProps): null;
export {};
