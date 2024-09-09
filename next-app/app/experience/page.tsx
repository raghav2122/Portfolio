import Link from "next/link";
import React from "react";
import { allExperiences } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function ExperiencePage() {
  const views = (
    await redis.mget<number[]>(
      ...allExperiences.map((p) => ["pageviews", "experience", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allExperiences[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const sorted = allExperiences
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Experience
          </h2>
          <p className="mt-4 text-zinc-400">
            All the experience I have worked on, from personal experience to open-source
            contributions.
          </p>
        </div>
        <div className="flex flex-col gap-8 w-[60%] mx-auto lg:mx-0">
          {sorted.map((experience) => (
            <Card key={experience.slug}>
              <Article experience={experience} views={views[experience.slug] ?? 0} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
