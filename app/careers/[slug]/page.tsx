import { notFound } from "next/navigation";
import { jobs, getJob } from "@/lib/jobs";
import JobDetail from "@/components/job-detail";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const job = getJob((await params).slug);
  return {
    title: job ? `${job.title} · ${job.team}` : "공고를 찾을 수 없습니다",
    description: job?.intro,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  return <JobDetail job={job} />;
}
