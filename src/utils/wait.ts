export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const randomWait = async (
  minSeconds = 1,
  maxSeconds = 5,
): Promise<void> => {
  const delay =
    Math.floor(Math.random() * (maxSeconds - minSeconds + 1) + minSeconds) *
    1000;

  await wait(delay);
};
