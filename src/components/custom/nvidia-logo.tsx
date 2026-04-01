interface NvidiaLogoProps {
  className?: string
  /** "mark" = green square + eye only | "full" = mark + wordmark */
  variant?: "mark" | "full"
}

export function NvidiaLogo({ className, variant = "full" }: NvidiaLogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="NVIDIA logo mark"
      >
        <rect width="100" height="100" fill="#76B900" />
        {/* Eye outer shape — white lens, center offset left so it bleeds out */}
        <ellipse cx="38" cy="50" rx="54" ry="26" fill="white" clipPath="url(#nv-clip-mark)" />
        {/* Spiral inner arcs — green on white */}
        <path
          d="M-4,50 C8,28 62,22 92,50"
          stroke="#76B900"
          strokeWidth="8"
          fill="none"
          clipPath="url(#nv-clip-mark)"
        />
        <path
          d="M14,50 C22,36 56,32 80,50"
          stroke="#76B900"
          strokeWidth="7"
          fill="none"
          clipPath="url(#nv-clip-mark)"
        />
        {/* Pupil */}
        <circle cx="38" cy="50" r="12" fill="#76B900" clipPath="url(#nv-clip-mark)" />
        {/* Lower swoop tail — white, below the square */}
        <path
          d="M100,62 C80,90 30,95 -4,62"
          stroke="white"
          strokeWidth="6"
          fill="none"
          clipPath="url(#nv-clip-mark)"
        />
        <defs>
          <clipPath id="nv-clip-mark">
            <rect width="100" height="100" />
          </clipPath>
        </defs>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NVIDIA"
    >
      <defs>
        <clipPath id="nv-clip-full">
          <rect width="80" height="80" />
        </clipPath>
      </defs>

      {/* ── Logo mark ── */}
      <rect width="80" height="80" fill="#76B900" />
      <ellipse cx="30" cy="40" rx="44" ry="21" fill="white" clipPath="url(#nv-clip-full)" />
      <path
        d="M-4,40 C6,22 50,18 74,40"
        stroke="#76B900"
        strokeWidth="6.5"
        fill="none"
        clipPath="url(#nv-clip-full)"
      />
      <path
        d="M10,40 C18,28 44,26 64,40"
        stroke="#76B900"
        strokeWidth="6"
        fill="none"
        clipPath="url(#nv-clip-full)"
      />
      <circle cx="30" cy="40" r="10" fill="#76B900" clipPath="url(#nv-clip-full)" />
      <path
        d="M80,50 C64,72 24,76 -4,50"
        stroke="white"
        strokeWidth="5"
        fill="none"
        clipPath="url(#nv-clip-full)"
      />

      {/* ── Wordmark: nvidia ── */}
      <text
        x="96"
        y="57"
        fontFamily="'Inter Variable', 'NVIDIA Sans', system-ui, sans-serif"
        fontWeight="800"
        fontSize="46"
        letterSpacing="-1"
        fill="currentColor"
      >
        nvidia
      </text>
    </svg>
  )
}
