import { Env } from "../types";

export function getTrackerStub(env: Env) {
  const durableId = env.LIVESTOCK_REPORTS.idFromName("tracker");
  return env.LIVESTOCK_REPORTS.get(durableId);
}
