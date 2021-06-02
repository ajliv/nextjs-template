/// <reference types="next" />
/// <reference types="next/types/global" />

// Import SVG files as URL strings and React components
declare module '*.svg' {
    const svg: string;
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default svg;
}
