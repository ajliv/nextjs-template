/// <reference types="next" />
/// <reference types="next/types/global" />

// Import SVG files as React components (@svgr/webpack loader)
declare module '*.svg' {
    const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVGComponent;
}
