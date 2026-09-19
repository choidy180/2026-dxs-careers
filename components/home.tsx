"use client";

import Link from "next/link";
import styled from "styled-components";
import { jobs } from "@/lib/jobs";
import { Arrow, Container, Eyebrow, Meta } from "./ui";

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.12fr 1fr;
  gap: 56px;
  align-items: center;
  padding: 58px 0 62px;
  @media (max-width: 1000px) {
    gap: 30px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding: 36px 0 40px;
    gap: 28px;
  }
`;
const Headline = styled.h1`
  font-size: clamp(2.2rem, 3.5vw, 3.25rem);
  font-weight: 700;
  letter-spacing: -0.055em;
  line-height: 1.28;
  margin: 21px 0 22px;
  word-break: keep-all;
  span {
    color: var(--blue);
  }
  @media (max-width: 480px) {
    font-size: 2.3rem;
  }
`;
const Intro = styled.p`
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.85;
  word-break: keep-all;
  max-width: 440px;
`;
const HeroMedia = styled.div`
  position: relative;
  height: 294px;
  background: #e6ebef;
  overflow: hidden;
  border-radius: 2px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 55% 55%;
  }
  @media (max-width: 700px) {
    height: 240px;
  }
  @media (max-width: 480px) {
    height: 200px;
  }
`;
const PhotoLabel = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background: var(--blue);
  color: white;
  padding: 10px 17px;
  font-size: 0.6875rem;
  letter-spacing: 0.13em;
  font-weight: 600;
`;
const Positions = styled.section`
  padding-bottom: 76px;
  @media (max-width: 700px) {
    padding-bottom: 50px;
  }
`;
const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 22px;
  gap: 20px;
  h2 {
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.045em;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  h2 span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--pale-blue);
    color: var(--blue);
    font-size: 0.875rem;
    border-radius: 50%;
    width: 27px;
    height: 27px;
    letter-spacing: 0;
  }
  p {
    font-size: 0.75rem;
    letter-spacing: 0.075em;
    color: var(--muted);
  }
  @media (max-width: 480px) {
    h2 {
      font-size: 1.375rem;
    }
    p {
      display: none;
    }
  }
`;
const JobRow = styled(Link)`
  display: grid;
  grid-template-columns: 170px 1fr auto 44px;
  align-items: center;
  gap: 26px;
  padding: 31px 8px;
  border-bottom: 1px solid var(--line);
  transition:
    background 0.2s,
    padding 0.2s;
  h3 {
    font-size: 1.375rem;
    letter-spacing: -0.025em;
    font-weight: 600;
    margin: 0 0 7px;
  }
  &:hover {
    background: #f7f9fd;
    padding-left: 20px;
    padding-right: 20px;
  }
  &:hover h3 {
    color: var(--blue);
  }
  &:hover .job-arrow {
    background: var(--blue);
    border-color: var(--blue);
    color: #fff;
  }
  @media (max-width: 850px) {
    grid-template-columns: 122px 1fr auto;
    gap: 18px;
    .job-status {
      display: none;
    }
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr 40px;
    gap: 12px;
    padding: 25px 0;
    .team-name {
      grid-column: 1/-1;
    }
    h3 {
      font-size: 1.25rem;
    }
    &:hover {
      padding-left: 8px;
      padding-right: 8px;
    }
  }
`;
const TeamName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  span {
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--muted);
    display: block;
    margin-top: 4px;
  }
  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    gap: 12px;
    span {
      margin: 0;
      font-size: 0.625rem;
    }
  }
`;
const JobStatus = styled.span`
  font-size: 0.875rem;
  color: var(--muted);
`;
const CircleArrow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 50%;
  transition:
    background 0.2s,
    color 0.2s;
`;
const ListNote = styled.p`
  font-size: 0.8125rem;
  color: #777d86;
  margin-top: 21px;
`;

export default function Home() {
  return (
    <main id="main">
      <Container>
        <Hero aria-labelledby="hero-title">
          <div>
            <Eyebrow>BUILD THE NEXT. TOGETHER.</Eyebrow>
            <Headline id="hero-title">
              내일의 기술,
              <br />
              <span>함께 만드는 변화.</span>
            </Headline>
            <Intro>
              제조 현장의 데이터와 AI를 연결합니다.
              <br />
              디엑스솔루션즈에서 당신의 다음을 만들어보세요.
            </Intro>
          </div>
          <HeroMedia>
            <img
              src="/images/careers-office.png"
              alt="밝은 사무 공간에서 함께 아이디어를 나누는 동료들의 연출 이미지"
              width="700"
              height="440"
              fetchPriority="high"
            />
            <PhotoLabel>CONNECT PEOPLE. BUILD POSSIBILITIES.</PhotoLabel>
          </HeroMedia>
        </Hero>
        <Positions id="positions" aria-labelledby="positions-title">
          <ListHeader>
            <h2 id="positions-title">
              채용 중인 포지션 <span>{jobs.length}</span>
            </h2>
            <p>YOUR NEXT CHAPTER</p>
          </ListHeader>
          <div>
            {jobs.map((job) => (
              <JobRow
                key={job.slug}
                href={`/careers/${job.slug}/`}
                aria-label={`${job.team} ${job.title} 채용 상세 보기`}
              >
                <TeamName className="team-name">
                  {job.team}
                  <span>{job.teamEnglish}</span>
                </TeamName>
                <div>
                  <h3>{job.title}</h3>
                  <Meta>
                    <span>{job.experience}</span>
                    <span>{job.employment}</span>
                    <span>{job.location}</span>
                  </Meta>
                </div>
                <JobStatus className="job-status">채용 시 마감</JobStatus>
                <CircleArrow className="job-arrow">
                  <Arrow size={19} />
                </CircleArrow>
              </JobRow>
            ))}
          </div>
          <ListNote>좋은 동료를 만날 때까지, 상시 채용을 진행합니다.</ListNote>
        </Positions>
      </Container>
    </main>
  );
}
