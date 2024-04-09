import { SimulatedClock } from 'xstate/lib/SimulatedClock';
export async function advanceByTime(ms: number) {
  await Promise.resolve();
  vi.advanceTimersByTime(ms);
}

export async function incrementByTime(clock: SimulatedClock, ms: number) {
  return Promise.resolve().then(() => {
    clock.increment(ms);
  });
  // clock.setTimeout(() => {}, ms);
}
