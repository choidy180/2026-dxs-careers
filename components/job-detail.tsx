"use client";

import styled from "styled-components";
import type { Job } from "@/lib/jobs";
import {
  Arrow,
  Container,
  Eyebrow,
  Meta,
  PrimaryLink,
  Tag,
  TagList,
  TextLink,
} from "./ui";

const Main = styled.main`
  padding: 38px 0 90px;
  @media (max-width: 600px) {
    padding: 26px 0 40px;
  }
`;
const Heading = styled.div`
  padding: 40px 0 38px;
  border-bottom: 1px solid var(--line);
  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: -0.045em;
    line-height: 1.3;
    font-weight: 700;
    margin: 14px 0 9px;
  }
  p.english {
    color: #90969e;
    font-size: 1rem;
    margin-bottom: 22px;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 312px;
  gap: 86px;
  padding-top: 44px;
  align-items: start;
  @media (max-width: 1000px) {
    gap: 42px;
    grid-template-columns: minmax(0, 1fr) 280px;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;
const Article = styled.article`
  min-width: 0;
  section + section {
    margin-top: 42px;
  }
  h2 {
    font-size: 1.3rem;
    letter-spacing: -0.03em;
    font-weight: 700;
    margin-bottom: 16px;
  }
  p,
  li {
    font-size: 1rem;
    color: #565d67;
    line-height: 1.9;
    word-break: keep-all;
  }
  ul {
    margin: 0;
    padding-left: 20px;
  }
  li {
    padding-left: 3px;
    margin-bottom: 8px;
  }
  li::marker {
    color: #828b98;
    font-size: 0.75em;
  }
`;
const Mission = styled.p`
  color: var(--ink) !important;
  font-size: 1.1rem !important;
  font-weight: 600;
  margin-bottom: 14px !important;
`;
const Aside = styled.aside`
  position: sticky;
  top: 118px;
  border: 1px solid var(--line);
  padding: 27px;
  border-radius: 8px;
  h2 {
    font-size: 1.1rem;
    margin-bottom: 23px;
    font-weight: 600;
  }
  dl {
    display: grid;
    grid-template-columns: 72px 1fr;
    row-gap: 15px;
    font-size: 0.875rem;
    margin: 0 0 28px;
  }
  dt {
    color: var(--muted);
  }
  dd {
    margin: 0;
    text-align: right;
    color: #343b45;
    font-weight: 500;
  }
  a {
    width: 100%;
  }
  p {
    font-size: 0.75rem;
    color: var(--muted);
    text-align: center;
    margin-top: 12px;
  }
  @media (max-width: 760px) {
    position: static;
    grid-row: 1;
    padding: 22px;
    dl {
      grid-template-columns: 80px 1fr;
      row-gap: 9px;
    }
    h2 {
      margin-bottom: 16px;
    }
    dd {
      text-align: left;
    }
    p {
      margin-top: 10px;
    }
  }
`;
const Steps = styled.ol`
  list-style: none;
  padding: 0 !important;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 21px !important;
  li {
    padding: 15px 10px !important;
    border-top: 2px solid #dfe6ef;
    margin: 0 !important;
    font-size: 0.875rem !important;
    color: var(--ink) !important;
  }
  span {
    display: block;
    color: var(--blue);
    font-size: 0.75rem;
    margin-bottom: 5px;
    font-weight: 600;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Bottom = styled.div`
  margin-top: 46px;
  padding-top: 26px;
  border-top: 1px solid var(--line);
`;

export default function JobDetail({ job }: { job: Job }) {
  return (
    <Main id="main">
      <Container>
        <TextLink href="/#positions">
          <Arrow direction="left" size={17} />
          전체 채용 공고
        </TextLink>
        <Heading>
          <Eyebrow>{job.teamEnglish}</Eyebrow>
          <h1>{job.title}</h1>
          <p className="english">{job.englishTitle}</p>
          <Meta>
            <span>{job.team}</span>
            <span>{job.experience}</span>
            <span>{job.employment}</span>
            <span>{job.location}</span>
          </Meta>
        </Heading>
        <Layout>
          <Article>
            <section>
              <h2>우리 팀을 소개합니다</h2>
              <Mission>{job.mission}</Mission>
              <p>{job.intro}</p>
            </section>
            <section>
              <h2>이런 일을 함께해요</h2>
              <ul>
                {job.responsibilities.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>이런 분을 찾고 있어요</h2>
              <ul>
                {job.qualifications.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>이런 경험이 있다면 더 좋아요</h2>
              <ul>
                {job.preferred.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>우리가 사용하는 기술</h2>
              <TagList>
                {job.stack.map((x) => (
                  <Tag key={x}>{x}</Tag>
                ))}
              </TagList>
            </section>
            <section>
              <h2>합류 여정</h2>
              <p>서로의 경험과 생각을 알아가는 시간으로 준비했습니다.</p>
              <Steps>
                <li>
                  <span>01</span>서류 검토
                </li>
                <li>
                  <span>02</span>직무 인터뷰
                </li>
                <li>
                  <span>03</span>컬처 인터뷰
                </li>
                <li>
                  <span>04</span>최종 합류
                </li>
              </Steps>
            </section>
            <section>
              <h2>지원 전 확인해주세요</h2>
              <ul>
                <li>이력서는 자유 양식으로 제출해주세요.</li>
                <li>
                  직접 참여한 프로젝트와 본인의 역할이 담긴 포트폴리오를 함께
                  보내주셔도 좋습니다.
                </li>
                <li>
                  공고는 채용이 완료되면 마감될 수 있으며, 전형은 상황에 따라
                  조정될 수 있습니다.
                </li>
              </ul>
            </section>
            <Bottom>
              <TextLink href="/#positions">
                <Arrow direction="left" size={17} />
                다른 포지션 살펴보기
              </TextLink>
            </Bottom>
          </Article>
          <Aside aria-label="채용 정보">
            <h2>포지션 한눈에 보기</h2>
            <dl>
              <dt>소속</dt>
              <dd>{job.team}</dd>
              <dt>경력</dt>
              <dd>{job.experience}</dd>
              <dt>고용형태</dt>
              <dd>{job.employment}</dd>
              <dt>근무지</dt>
              <dd>{job.location}</dd>
              <dt>모집기간</dt>
              <dd>채용 시 마감</dd>
            </dl>
            <PrimaryLink href={`/careers/${job.slug}/apply/`}>
              지원하기
              <Arrow size={18} />
            </PrimaryLink>
            <p>당신의 새로운 시작을 기다립니다.</p>
          </Aside>
        </Layout>
      </Container>
    </Main>
  );
}
