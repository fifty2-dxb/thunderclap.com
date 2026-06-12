import type { CSSProperties } from "react";

/* Cartoon thunder art — friendly bolt + spark shapes for the soft theme */
export function Bolt({
  size = 48,
  color = "var(--tart-yellow)",
  outline = "#2a2433",
  stroke = 2,
  style,
  className,
}: {
  size?: number;
  color?: string;
  outline?: string;
  stroke?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13 1.8 L4.8 13.6 L10.4 13.6 L8.7 22.2 L19.2 9.8 L13 9.8 Z"
        fill={color}
        stroke={outline}
        strokeWidth={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M12.2 5.4 L9.2 9.7"
        stroke="#fff"
        strokeOpacity="0.65"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Spark({
  size = 22,
  color = "var(--tart-lilac)",
  style,
  className,
}: {
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 1.5 C12.6 8 16 11.4 22.5 12 C16 12.6 12.6 16 12 22.5 C11.4 16 8 12.6 1.5 12 C8 11.4 11.4 8 12 1.5 Z"
        fill={color}
      />
    </svg>
  );
}
