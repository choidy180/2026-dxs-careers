"use client";

import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face { font-family: 'Pretendard'; src: url('/fonts/PretendardVariable.woff2') format('woff2'); font-weight: 100 900; font-style: normal; font-display: swap; }
  :root { --ink: #171a1d; --muted: #686d75; --line: #e4e7eb; --blue: #005feb; --soft: #f5f7fa; --pale-blue: #eef4ff; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; scroll-padding-top: 104px; }
  body { margin: 0; background: #fff; color: var(--ink); font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }
  button, input, select, textarea { font: inherit; }
  button, a, input, textarea, select, summary { -webkit-tap-highlight-color: transparent; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; }
  h1,h2,h3,p { margin: 0; }
  button, input, textarea, select { border-radius: 0; }
  :focus-visible { outline: 3px solid #005feb; outline-offset: 5px; }
  ::selection { background: #d8e6ff; }
  img { display: block; max-width: 100%; }
  [id] { scroll-margin-top: 100px; }
  @media (prefers-reduced-motion: reduce) { html {scroll-behavior: auto;} *,*::before,*::after {animation-duration: .01ms !important; transition-duration: .01ms !important;} }
`;

export const Container = styled.div`
  width: min(1200px, calc(100% - 96px));
  margin: 0 auto;
  @media (max-width: 800px) {
    width: calc(100% - 48px);
  }
  @media (max-width: 480px) {
    width: calc(100% - 40px);
  }
`;
export const Eyebrow = styled.p`
  color: var(--blue);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  line-height: 1.5;
`;
export const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  background: var(--blue);
  color: white;
  min-height: 54px;
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition:
    background 0.2s,
    transform 0.2s;
  &:hover {
    background: #004fcb;
    transform: translateY(-1px);
  }
`;
export const TextLink = styled(Link)`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  font-size: 0.875rem;
  color: var(--muted);
  &:hover {
    color: var(--blue);
  }
`;
export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
export const Tag = styled.span`
  display: inline-flex;
  padding: 5px 11px;
  background: var(--soft);
  color: #555c66;
  font-size: 0.875rem;
  border-radius: 4px;
`;
export const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  color: var(--muted);
  font-size: 0.875rem;
  span + span::before {
    content: "";
    width: 1px;
    height: 11px;
    margin: 0 12px;
    display: inline-block;
    background: #d8dbe0;
    vertical-align: -1px;
  }
`;

export function Arrow({
  direction = "right",
  size = 20,
}: {
  direction?: "right" | "left" | "upRight";
  size?: number;
}) {
  const rotation =
    direction === "left" ? 180 : direction === "upRight" ? -45 : 0;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)`, flexShrink: 0 }}
    >
      <path d="M14.4 4.8 21.6 12l-7.2 7.2-1.4-1.4 4.8-4.8H3v-2h14.8L13 6.2z" />
    </svg>
  );
}

export function FileIcon({ size = 25 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 2 5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
    </svg>
  );
}
