"use client";
import styled from "styled-components";
import { Container, PrimaryLink } from "@/components/ui";
const Content = styled(Container)`
  padding: 100px 0;
  text-align: center;
  h1 {
    font-size: 2rem;
    letter-spacing: -0.04em;
    margin-bottom: 15px;
  }
  p {
    color: var(--muted);
    margin-bottom: 30px;
  }
`;
export default function NotFound() {
  return (
    <main id="main">
      <Content>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>주소를 확인하거나 채용 공고에서 다시 시작해주세요.</p>
        <PrimaryLink href="/">채용 공고 보기</PrimaryLink>
      </Content>
    </main>
  );
}
