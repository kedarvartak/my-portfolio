import { renderToStaticMarkup } from 'react-dom/server';

const svgString = renderToStaticMarkup(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4v16M4 12l8 8M4 12l8-8" />
  </svg>
);

const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
const svgUrl = URL.createObjectURL(svgBlob);

export default svgUrl; 