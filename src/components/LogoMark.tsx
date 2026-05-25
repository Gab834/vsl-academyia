export function LogoMark({ size = 72 }: { size?: number }) {
  const h = size
  const w = size * 1.1

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 110 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Purple accent — dot do "i" */}
      <rect
        x="4" y="8" width="22" height="14" rx="3"
        transform="rotate(-18 15 15)"
        fill="#7B5CF6"
      />
      {/* Traço esquerdo — corpo do "i" */}
      <polygon
        points="8,94 24,34 40,34 24,94"
        fill="#3B6EFF"
      />
      {/* Perna esquerda do "A" */}
      <polygon
        points="44,94 70,10 84,10 72,48 56,94"
        fill="#3B6EFF"
      />
      {/* Perna direita do "A" */}
      <polygon
        points="72,48 84,10 110,94 94,94"
        fill="#3B6EFF"
      />
    </svg>
  )
}

export function LogoFull({ height = 40 }: { height?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <LogoMark size={height} />
      <span style={{
        fontSize: height * 0.65,
        fontWeight: 800,
        letterSpacing: "-0.04em",
        color: "#EEEEF5",
        lineHeight: 1,
        fontFamily: "var(--font-inter)",
      }}>
        Academy<span style={{ color: "#3B6EFF" }}>.ia</span>
      </span>
    </div>
  )
}
