import { notFound } from "next/navigation";
import { jobs, getJob } from "@/lib/jobs";
import ApplicationForm from "@/components/application-form";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const job = getJob((await params).slug);
  return { title: job ? `${job.title} 지원하기` : "공고를 찾을 수 없습니다" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  return <ApplicationForm job={job} />;
}
