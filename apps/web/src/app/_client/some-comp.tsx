"use client";

import { api } from "@/lib/trpc/react";

const SomeCompo = () => {
  const { data } = api.health.healthCheck.useQuery();

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default SomeCompo;
