<defs>
  <linearGradient
    gradientTransform="rotate(-123, 0.5, 0.5)"
    x1="50%"
    y1="0%"
    x2="50%"
    y2="100%"
    id="grain-gradient2"
  >
    <stop stop-color="hsl(194, 83%, 49%)" stop-opacity="1" offset="-0%" /><stop
      stop-color="rgba(255,255,255,0)"
      stop-opacity="0"
      offset="100%"
    />
  </linearGradient>

  <linearGradient
    gradientTransform="rotate(123, 0.5, 0.5)"
    x1="50%"
    y1="0%"
    x2="50%"
    y2="100%"
    id="grain-gradient3"
  >
    <stop stop-color="hsl(273, 100%, 50%)" stop-opacity="1" /><stop
      stop-color="rgba(255,255,255,0)"
      stop-opacity="0"
      offset="100%"
    />
  </linearGradient>

  <filter
    id="grain-filter"
    x="-20%"
    y="-20%"
    width="140%"
    height="140%"
    filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse"
    color-interpolation-filters="sRGB"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.78"
      numOctaves="2"
      seed="2"
      stitchTiles="stitch"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      result="turbulence"
    />

    <feColorMatrix
      type="saturate"
      values="0"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      in="turbulence"
      result="colormatrix"
    />

    <feComponentTransfer
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      in="colormatrix"
      result="componentTransfer"
    >
      <feFuncR type="linear" slope="3" />
      <feFuncG type="linear" slope="3" />
      <feFuncB type="linear" slope="3" />
    </feComponentTransfer>

    <feColorMatrix
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      in="componentTransfer"
      result="colormatrix2"
      type="matrix"
      values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 20 -12"
    />
  </filter>
</defs>

<g>
  <rect width="100%" height="100%" fill="hsl(63, 100%, 60%)" /><rect
    width="100%"
    height="100%"
    fill="url(#grain-gradient3)"
  />

  <rect width="100%" height="100%" fill="url(#grain-gradient2)" /><rect
    width="100%"
    height="100%"
    fill="transparent"
    filter="url(#grain-filter)"
    opacity="0.92"
    style="mix-blend-mode: soft-light"
  />
</g>

<slot />
