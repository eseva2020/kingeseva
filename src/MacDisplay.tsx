// Perspective-matched HTML layer over the supplied, unmodified Mac photograph.
export function DesktopDisplay({ label }: { label: string }) {
  return <div className="about-art mac-reference-art" role="img" aria-label={label}>
    <svg viewBox="0 0 987 810" className="mac-reference-scene" aria-hidden="true">
      <image href="/assets/mac-reference.png" width="987" height="810" />
      <foreignObject x="0" y="0" width="987" height="810" overflow="visible">
        <div className="mac-website-window" style={{transform:'matrix3d(0.441806882175,0.13110129326,0,0.000199222004,0.032801302594,0.463467637389,0,-0.000029937532,0,0,1,0,60,48,0,1)'}}>
          <div className="mac-browser-bar"><span className="mac-window-dots">● ● ●</span><span className="mac-browser-address">KING e-Seva Services</span></div>
          <img src="/assets/website-home-screen.webp" alt="" width="1440" height="900" loading="lazy"/>
        </div>
      </foreignObject>
    </svg>
  </div>;
}
