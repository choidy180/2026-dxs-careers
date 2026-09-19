import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import SiteShell from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "DX Solutions Careers | 디엑스솔루션즈 채용",
    template: "%s | DX Solutions Careers",
  },
  description:
    "내일의 기술, 함께 만드는 변화. 디엑스솔루션즈 플랫폼팀과 AI팀의 열린 포지션을 만나보세요.",
  icons: { icon: "/favicon.svg" },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <SiteShell>{children}</SiteShell>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
