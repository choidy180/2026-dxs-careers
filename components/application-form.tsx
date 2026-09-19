"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import styled from "styled-components";
import type { Job } from "@/lib/jobs";
import {
  Arrow,
  Container,
  Eyebrow,
  FileIcon,
  PrimaryLink,
  TextLink,
} from "./ui";

type Values = {
  name: string;
  email: string;
  phone: string;
  experience: string;
  portfolio: string;
  introduction: string;
};
type Errors = Partial<Record<keyof Values | "resume" | "consent", string>>;
const empty: Values = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  portfolio: "",
  introduction: "",
};
const experienceOptions = ["신입", "1년 미만", "1–3년", "3–5년", "5년 이상"];
const MAX_SIZE = 10 * 1024 * 1024;

const Main = styled.main`
  padding: 36px 0 80px;
  @media (max-width: 600px) {
    padding-top: 25px;
  }
`;
const Narrow = styled(Container)`
  max-width: 1050px;
`;
const Title = styled.div`
  padding: 34px 0 30px;
  border-bottom: 1px solid var(--line);
  h1 {
    font-size: 2.4rem;
    line-height: 1.3;
    letter-spacing: -0.05em;
    font-weight: 700;
    margin: 12px 0 14px;
  }
  p:last-child {
    color: var(--muted);
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
  }
`;
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 72px;
  align-items: start;
  padding-top: 38px;
  @media (max-width: 900px) {
    gap: 35px;
    grid-template-columns: minmax(0, 1fr) 240px;
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;
const Form = styled.form`
  min-width: 0;
`;
const Section = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0 0 38px;
  min-width: 0;
  legend {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin-bottom: 23px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  legend span {
    font-size: 0.75rem;
    color: var(--blue);
    font-weight: 600;
  }
`;
const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px 20px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const Field = styled.div`
  min-width: 0;
  & + & {
    margin-top: 22px;
  }
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 9px;
  }
  label em {
    font-style: normal;
    color: var(--blue);
    margin-left: 3px;
  }
  label small {
    font-size: 0.8125rem;
    color: var(--muted);
    font-weight: 400;
    margin-left: 7px;
  }
  ${FieldGrid} &+& {
    margin-top: 0;
  }
`;
const control = `width:100%;border:1px solid #d9dee5;background:#fff;border-radius:6px;color:var(--ink);padding:12px 14px;font-size:1rem;min-height:48px;transition:border-color .15s;outline-offset:2px;`;
const Input = styled.input`
  ${control} &::placeholder {
    color: #9097a1;
  }
  &:focus {
    border-color: var(--blue);
    outline: 1px solid var(--blue);
  }
  &[aria-invalid="true"] {
    border-color: #cf3d43;
  }
`;
const Select = styled.select`
  ${control} &:focus {
    border-color: var(--blue);
  }
  &[aria-invalid="true"] {
    border-color: #cf3d43;
  }
`;
const Textarea = styled.textarea`
  ${control} min-height:145px;
  resize: vertical;
  &::placeholder {
    color: #9097a1;
  }
  &:focus {
    border-color: var(--blue);
    outline: 1px solid var(--blue);
  }
`;
const Hint = styled.p`
  color: var(--muted);
  font-size: 0.8125rem;
  line-height: 1.65;
  margin-top: 8px;
`;
const ErrorText = styled.p`
  color: #bb2935;
  font-size: 0.8125rem;
  margin-top: 6px;
`;
const Upload = styled.div<{ $dragging: boolean; $error: boolean }>`
  border: 1px dashed
    ${(p) => (p.$error ? "#cf3d43" : p.$dragging ? "var(--blue)" : "#cdd4df")};
  border-radius: 7px;
  min-height: 150px;
  background: ${(p) => (p.$dragging ? "var(--pale-blue)" : "#fafbfc")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 25px 20px;
  gap: 7px;
  color: #8994a4;
  text-align: center;
  transition: background 0.2s;
  position: relative;
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
  }
  &:focus-within {
    outline: 2px solid var(--blue);
    outline-offset: 3px;
  }
`;
const UploadLabel = styled.label`
  cursor: pointer !important;
  margin: 0 !important;
  display: block !important;
  color: var(--ink) !important;
  font-size: 0.875rem !important;
  span {
    color: var(--blue);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
  }
`;
const FileSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  border: 1px solid var(--line);
  background: #f7f9fc;
  padding: 16px;
  border-radius: 6px;
  color: var(--blue);
  div {
    min-width: 0;
    flex: 1;
  }
  strong {
    display: block;
    overflow-wrap: anywhere;
    color: var(--ink);
    font-size: 0.875rem;
    font-weight: 500;
  }
  small {
    font-size: 0.75rem;
    color: var(--muted);
  }
  button {
    background: none;
    border: 0;
    padding: 8px;
    color: #707986;
    font-size: 0.8125rem;
  }
`;
const CharacterCount = styled.div`
  text-align: right;
  color: var(--muted);
  font-size: 0.75rem;
  margin-top: 5px;
`;
const ConsentBox = styled.div`
  border-top: 1px solid var(--line);
  padding-top: 24px;
  label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }
  input {
    width: 18px;
    height: 18px;
    accent-color: var(--blue);
    margin: 3px 0 0;
    flex-shrink: 0;
  }
  details {
    margin: 12px 0 0 28px;
    color: var(--muted);
    font-size: 0.8125rem;
  }
  summary {
    cursor: pointer;
    width: fit-content;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  details p {
    margin-top: 12px;
    background: var(--soft);
    padding: 14px;
    border-radius: 4px;
    line-height: 1.8;
  }
`;
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;
const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  border: 0;
  border-radius: 8px;
  background: var(--blue);
  color: white;
  font-weight: 600;
  min-height: 54px;
  padding: 14px 28px;
  &:hover {
    background: #004fcb;
  }
  @media (max-width: 480px) {
    gap: 15px;
    padding: 14px 20px;
  }
`;
const Side = styled.aside`
  position: sticky;
  top: 115px;
  @media (max-width: 720px) {
    position: static;
    grid-row: 1;
  }
`;
const PositionCard = styled.div`
  background: var(--soft);
  padding: 24px;
  border-radius: 8px;
  h2 {
    font-size: 1.2rem;
    line-height: 1.45;
    letter-spacing: -0.025em;
    margin: 10px 0 18px;
  }
  dl {
    display: grid;
    grid-template-columns: 60px 1fr;
    row-gap: 10px;
    font-size: 0.875rem;
    margin: 0;
  }
  dt {
    color: var(--muted);
  }
  dd {
    margin: 0;
    text-align: right;
  }
  & > a {
    margin-top: 20px;
  }
  @media (max-width: 720px) {
    padding: 20px;
    h2 {
      margin-bottom: 10px;
    }
    dl {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 18px;
    }
    dt {
      display: none;
    }
    dd {
      text-align: left;
    }
  }
`;
const Notice = styled.div`
  padding: 19px 4px 0;
  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 7px;
  }
  p {
    font-size: 0.8125rem;
    line-height: 1.8;
    color: var(--muted);
  }
  @media (max-width: 720px) {
    padding-top: 15px;
  }
`;
const Complete = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 85px 0 50px;
  text-align: center;
  h1 {
    font-size: 2rem;
    letter-spacing: -0.04em;
    line-height: 1.45;
    margin: 24px 0 18px;
  }
  p {
    color: var(--muted);
    line-height: 1.8;
    font-size: 1rem;
  }
  .complete-detail {
    background: var(--soft);
    padding: 22px;
    margin: 28px 0;
    border-radius: 8px;
    text-align: left;
  }
  .complete-detail strong {
    display: block;
    font-size: 1rem;
  }
  .complete-detail span {
    display: block;
    font-size: 0.875rem;
    color: var(--muted);
    margin-top: 5px;
    overflow-wrap: anywhere;
  }
  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  button {
    border: 0;
    background: none;
    color: var(--muted);
    font-size: 0.875rem;
    padding: 10px;
  }
`;
const Check = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blue);
  background: var(--pale-blue);
  border-radius: 50%;
  width: 72px;
  height: 72px;
  margin: 0 auto;
`;

export default function ApplicationForm({ job }: { job: Job }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [resume, setResume] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [complete, setComplete] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (complete) successRef.current?.focus();
  }, [complete]);

  useEffect(() => {
    type DraftTool = {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => Promise<object>;
    };
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: DraftTool,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool || complete) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: "stage_application_draft",
            title: "지원서 기본 정보 입력",
            description:
              "현재 지원폼의 기본 정보만 입력합니다. 파일 선택, 개인정보 동의, 작성 완료는 수행하지 않으며 서버로 정보를 전송하지 않습니다.",
            inputSchema: {
              type: "object",
              properties: {
                name: { type: "string", maxLength: 60 },
                email: { type: "string", maxLength: 150 },
                phone: { type: "string", maxLength: 25 },
                experience: { type: "string", enum: experienceOptions },
                portfolio: { type: "string", maxLength: 500 },
                introduction: { type: "string", maxLength: 1000 },
              },
              minProperties: 1,
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            async execute(input) {
              if (!input || typeof input !== "object" || Array.isArray(input))
                throw new Error("입력은 객체여야 합니다.");
              const draft = input as Record<string, unknown>;
              const limits: Record<string, number> = {
                name: 60,
                email: 150,
                phone: 25,
                experience: 20,
                portfolio: 500,
                introduction: 1000,
              };
              if (!Object.keys(draft).length)
                throw new Error("한 개 이상의 필드가 필요합니다.");
              for (const [key, value] of Object.entries(draft)) {
                if (
                  !Object.hasOwn(limits, key) ||
                  typeof value !== "string" ||
                  value.length > limits[key]
                )
                  throw new Error("지원하지 않는 필드 또는 값입니다.");
                if (key === "experience" && !experienceOptions.includes(value))
                  throw new Error("올바른 경력 구분을 선택해주세요.");
              }
              setValues((current) => ({
                ...current,
                ...(draft as Partial<Values>),
              }));
              setErrors({});
              await new Promise<void>((resolve) =>
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => resolve()),
                ),
              );
              return {
                staged: true,
                fields: Object.keys(draft),
                submitted: false,
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {
      /* 일반 브라우저에서는 등록 없이 동일한 UI를 사용합니다. */
    }
    return () => lifecycle.abort();
  }, [complete]);

  function update(key: keyof Values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }
  function selectFile(file: File | undefined) {
    if (!file) return;
    let message = "";
    if (!/\.(pdf|doc|docx)$/i.test(file.name))
      message = "PDF, DOC, DOCX 파일을 선택해주세요.";
    else if (file.size > MAX_SIZE)
      message = "파일 크기는 10MB 이하여야 합니다.";
    else if (file.size === 0) message = "내용이 있는 파일을 선택해주세요.";
    if (message) {
      setErrors((current) => ({ ...current, resume: message }));
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setResume(file);
    setErrors((current) => ({ ...current, resume: undefined }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "이름을 입력해주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "올바른 이메일 주소를 입력해주세요.";
    if (
      !/^\+?[\d\s()-]+$/.test(values.phone) ||
      values.phone.replace(/\D/g, "").length < 9 ||
      values.phone.replace(/\D/g, "").length > 15
    )
      next.phone = "올바른 휴대전화 번호를 입력해주세요.";
    if (!experienceOptions.includes(values.experience))
      next.experience = "경력 구분을 선택해주세요.";
    if (!resume) next.resume = "이력서 파일을 선택해주세요.";
    if (values.portfolio.trim()) {
      try {
        const url = new URL(values.portfolio);
        if (!["https:", "http:"].includes(url.protocol)) throw new Error();
      } catch {
        next.portfolio = "https://로 시작하는 올바른 주소를 입력해주세요.";
      }
    }
    if (!consent) next.consent = "개인정보 수집·이용 동의 항목을 확인해주세요.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    // UI 전용: 네트워크 요청, 파일 업로드, 브라우저 영구 저장을 수행하지 않습니다.
    setComplete(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function error(key: keyof Errors) {
    return errors[key] ? (
      <ErrorText id={`${key}-error`} role="alert">
        {errors[key]}
      </ErrorText>
    ) : null;
  }
  const fieldProps = (key: keyof Values) => ({
    id: key,
    name: key,
    value: values[key],
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => update(key, e.target.value),
  });

  if (complete)
    return (
      <Main id="main">
        <Narrow>
          <Complete>
            <Check>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="m9 16.2-4.2-4.2-1.4 1.4L9 19l12-12-1.4-1.4z" />
              </svg>
            </Check>
            <h1 ref={successRef} tabIndex={-1}>
              지원서 작성이 완료되었습니다.
            </h1>
            <p>
              지원서 작성 흐름을 모두 확인했어요.
              <br />
              현재는 미리보기 화면으로, 실제 지원서는 접수되지 않았습니다.
            </p>
            <div className="complete-detail">
              <Eyebrow>{job.teamEnglish}</Eyebrow>
              <strong>{job.title}</strong>
              <span>
                {values.name} · {values.email}
              </span>
              <span>이력서: {resume?.name}</span>
            </div>
            <div className="actions">
              <PrimaryLink href="/">
                채용 공고로 돌아가기
                <Arrow size={17} />
              </PrimaryLink>
              <button type="button" onClick={() => setComplete(false)}>
                입력 내용 수정
              </button>
            </div>
          </Complete>
        </Narrow>
      </Main>
    );

  return (
    <Main id="main">
      <Narrow>
        <TextLink href={`/careers/${job.slug}/`}>
          <Arrow direction="left" size={17} />
          공고로 돌아가기
        </TextLink>
        <Title>
          <Eyebrow>YOUR NEXT CHAPTER STARTS HERE</Eyebrow>
          <h1>우리의 다음을 함께 만들어주세요.</h1>
          <p>당신의 경험과 가능성을 들려주세요.</p>
        </Title>
        <FormGrid>
          <Form ref={formRef} onSubmit={submit} noValidate>
            <Section>
              <legend>
                <span>01</span>기본 정보
              </legend>
              <FieldGrid>
                <Field>
                  <label htmlFor="name">
                    이름<em aria-hidden="true">*</em>
                  </label>
                  <Input
                    {...fieldProps("name")}
                    autoComplete="name"
                    placeholder="홍길동"
                    maxLength={60}
                    required
                  />
                  {error("name")}
                </Field>
                <Field>
                  <label htmlFor="experience">
                    경력 구분<em aria-hidden="true">*</em>
                  </label>
                  <Select {...fieldProps("experience")} required>
                    <option value="">선택해주세요</option>
                    {experienceOptions.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </Select>
                  {error("experience")}
                </Field>
                <Field>
                  <label htmlFor="email">
                    이메일<em aria-hidden="true">*</em>
                  </label>
                  <Input
                    {...fieldProps("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="hello@example.com"
                    maxLength={150}
                    required
                  />
                  {error("email")}
                </Field>
                <Field>
                  <label htmlFor="phone">
                    휴대전화<em aria-hidden="true">*</em>
                  </label>
                  <Input
                    {...fieldProps("phone")}
                    type="tel"
                    autoComplete="tel"
                    placeholder="010-0000-0000"
                    maxLength={25}
                    required
                  />
                  {error("phone")}
                </Field>
              </FieldGrid>
            </Section>
            <Section>
              <legend>
                <span>02</span>지원 서류
              </legend>
              <Field>
                <label htmlFor="resume">
                  이력서<em aria-hidden="true">*</em>
                </label>
                {resume ? (
                  <FileSummary>
                    <FileIcon />
                    <div>
                      <strong>{resume.name}</strong>
                      <small>
                        {Math.max(0.01, resume.size / 1024 / 1024).toFixed(2)}{" "}
                        MB · 선택 완료
                      </small>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setResume(null);
                        if (fileRef.current) fileRef.current.value = "";
                        requestAnimationFrame(() => fileRef.current?.focus());
                      }}
                      aria-label="이력서 파일 삭제"
                    >
                      삭제
                    </button>
                  </FileSummary>
                ) : (
                  <Upload
                    $dragging={dragging}
                    $error={Boolean(errors.resume)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      if (e.dataTransfer.files.length > 1) {
                        setErrors((current) => ({
                          ...current,
                          resume: "이력서는 한 개의 파일로 선택해주세요.",
                        }));
                        return;
                      }
                      selectFile(e.dataTransfer.files[0]);
                    }}
                  >
                    <FileIcon />
                    <input
                      ref={fileRef}
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      aria-label="이력서 파일 선택"
                      aria-invalid={Boolean(errors.resume)}
                      aria-describedby={
                        errors.resume
                          ? "resume-error resume-hint"
                          : "resume-hint"
                      }
                      onChange={(e) => selectFile(e.target.files?.[0])}
                    />
                    <UploadLabel htmlFor="resume">
                      <span>파일 선택</span> 또는 이곳에 파일을 놓아주세요
                    </UploadLabel>
                    <Hint id="resume-hint">PDF, DOC, DOCX · 최대 10MB</Hint>
                  </Upload>
                )}
                {error("resume")}
              </Field>
              <Field>
                <label htmlFor="portfolio">
                  포트폴리오 링크<small>선택</small>
                </label>
                <Input
                  {...fieldProps("portfolio")}
                  type="url"
                  placeholder="https://"
                  maxLength={500}
                />
                <Hint>
                  GitHub, Notion 또는 개인 웹사이트 링크를 남겨주세요.
                </Hint>
                {error("portfolio")}
              </Field>
            </Section>
            <Section>
              <legend>
                <span>03</span>당신의 이야기
              </legend>
              <Field>
                <label htmlFor="introduction">
                  간단한 자기소개<small>선택</small>
                </label>
                <Textarea
                  {...fieldProps("introduction")}
                  maxLength={1000}
                  placeholder="함께하고 싶은 이유나 자신 있게 소개하고 싶은 경험을 자유롭게 적어주세요."
                />
                <CharacterCount>
                  {values.introduction.length.toLocaleString()} / 1,000
                </CharacterCount>
              </Field>
            </Section>
            <ConsentBox>
              <label htmlFor="consent">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setErrors((current) => ({
                      ...current,
                      consent: undefined,
                    }));
                  }}
                  required
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={
                    errors.consent ? "consent-error" : undefined
                  }
                />
                <span>[필수] 개인정보 수집 및 이용에 동의합니다.</span>
              </label>
              <details>
                <summary>동의 내용 확인</summary>
                <p>
                  이 항목은 채용 지원폼의 예시입니다. 수집 예정 항목: 이름,
                  이메일, 연락처, 경력 및 제출 서류. 이용 목적: 채용 전형 진행과
                  결과 안내. 실제 서비스에서는 보유 기간 등 확정된 개인정보 처리
                  기준을 안내해야 합니다. 현재 미리보기에서는 입력한 정보와
                  파일을 서버에 전송하거나 저장하지 않습니다.
                </p>
              </details>
              {error("consent")}
            </ConsentBox>
            <Actions>
              <TextLink href={`/careers/${job.slug}/`}>돌아가기</TextLink>
              <Submit type="submit">
                작성 완료
                <Arrow size={18} />
              </Submit>
            </Actions>
          </Form>
          <Side>
            <PositionCard>
              <Eyebrow>{job.teamEnglish}</Eyebrow>
              <h2>{job.title}</h2>
              <dl>
                <dt>경력</dt>
                <dd>{job.experience}</dd>
                <dt>형태</dt>
                <dd>{job.employment}</dd>
                <dt>근무지</dt>
                <dd>{job.location}</dd>
              </dl>
              <TextLink href={`/careers/${job.slug}/`}>
                공고 다시 보기
                <Arrow direction="upRight" size={16} />
              </TextLink>
            </PositionCard>
            <Notice>
              <h3>지원 전 확인해주세요</h3>
              <p>
                <span style={{ color: "var(--blue)" }}>*</span> 표시는 필수 입력
                항목입니다.
                <br />
                이력서는 자유 양식으로 준비해주세요.
              </p>
            </Notice>
            <Notice>
              <h3>지원폼 미리보기</h3>
              <p>
                입력한 정보와 파일은 전송되지 않으며, 실제 채용 지원으로
                접수되지 않습니다.
              </p>
            </Notice>
          </Side>
        </FormGrid>
      </Narrow>
    </Main>
  );
}
