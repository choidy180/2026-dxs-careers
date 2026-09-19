"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Arrow, Container, GlobalStyle } from "./ui";

const Header = styled.header`
  height: 84px;
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 20;
  @media (max-width: 600px) {
    height: 76px;
  }
  @media (max-width: 380px) {
    height: auto;
  }
`;
const HeaderInner = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  @media (max-width: 600px) {
    gap: 16px;
  }
  @media (max-width: 380px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding-top: 14px;
    padding-bottom: 8px;
  }
`;
const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;
const Wordmark = styled.span`
  font-family: Arial, sans-serif;
  font-size: 1.23rem;
  letter-spacing: -0.065em;
  font-weight: 700;
  line-height: 1.15;
  display: flex;
  align-items: center;
  gap: 7px;
  & b {
    font-size: 1.6rem;
    letter-spacing: -0.08em;
    color: var(--blue);
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    & b {
      font-size: 1.4rem;
    }
  }
`;
const Careers = styled.span`
  padding-left: 16px;
  border-left: 1px solid #d6d9dd;
  color: #747a83;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  @media (max-width: 600px) {
    display: none;
  }
`;
const Nav = styled.nav`
  display: flex;
  gap: 34px;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  a {
    padding: 8px 0;
  }
  a:hover,
  a[aria-current="page"] {
    color: var(--blue);
  }
  @media (max-width: 600px) {
    gap: 20px;
  }
  @media (max-width: 480px) {
    gap: 12px;
    font-size: 0.8125rem;
  }
  @media (max-width: 380px) {
    width: 100%;
    justify-content: space-between;
    font-size: 0.875rem;
  }
`;
const VacancyLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 9px 15px !important;
  margin-left: 8px;
  span {
    color: var(--blue);
    font-size: 0.75rem;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;
const Footer = styled.footer`
  margin-top: auto;
  border-top: 1px solid var(--line);
  padding: 33px 0;
`;
const FooterInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  color: #7b8088;
  font-size: 0.75rem;
  p:first-child {
    color: #434951;
    font-weight: 600;
    font-size: 0.875rem;
  }
  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`;
const SkipLink = styled.a`
  position: fixed;
  left: 20px;
  top: -80px;
  background: var(--blue);
  color: #fff;
  padding: 12px 20px;
  z-index: 100;
  border-radius: 4px;
  &:focus {
    top: 12px;
  }
`;
const Page = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
  }
`;

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <GlobalStyle />
      <Page>
        <SkipLink href="#main">본문으로 바로가기</SkipLink>
        <Header>
          <HeaderInner>
            <Brand href="/" aria-label="DX Solutions 채용 홈">
              <Wordmark>
                <b>DX</b> SOLUTIONS
              </Wordmark>
              <Careers>CAREERS</Careers>
            </Brand>
            <Nav aria-label="주요 메뉴">
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                채용 공고
              </Link>
              <Link
                href="/careers/platform/"
                aria-current={
                  pathname.startsWith("/careers/platform") ? "page" : undefined
                }
              >
                플랫폼팀
              </Link>
              <Link
                href="/careers/ai/"
                aria-current={
                  pathname.startsWith("/careers/ai") ? "page" : undefined
                }
              >
                AI팀
              </Link>
              <VacancyLink href="/#positions">
                열린 포지션 <span>02</span>
                <Arrow size={16} />
              </VacancyLink>
            </Nav>
          </HeaderInner>
        </Header>
        {children}
        <Footer>
          <FooterInner>
            <p>주식회사 디엑스솔루션즈</p>
            <p>
              © {new Date().getFullYear()} DX Solutions. All rights reserved.
            </p>
          </FooterInner>
        </Footer>
      </Page>
    </>
  );
}
