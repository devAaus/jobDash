
import JobSection from "@/components/home/JobSection";
import { getJob } from "@/services/axios.service";

export default async function Home() {

  const jobs = await getJob()
  return (
    <main>
      <section className="w-full min-h-[450px] h-auto flex flex-col items-center justify-center gap-4 bg-black rounded-xl">
        <div className="text-background mt-14 max-w-[900px] mx-auto p-2">
          <h3 className="font-bold text-4xl md:text-5xl md:leading-tight tracking-wide text-center">
            Join the most popular jobs and companies.
          </h3>
          <p className="mt-4 text-lg text-center">
            We&apos;ve helped over 2,500 freshers to get into the most popular jobs.
          </p>
        </div>
      </section>

      <section className="py-12">
        <JobSection jobs={jobs} />
      </section>

    </main>
  );
}
