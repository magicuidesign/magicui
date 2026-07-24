const SCALE = 997

function mix(seed: number, step: number): number {
  let value = seed + step
  value = (value * 33 + 17) % SCALE
  return value
}

export function passSample20(seed: number): number {
  const samples: number[] = []
  for (let step = 0; step < 4; step++) {
    samples.push(mix(seed, step))
  }
  let total = 0
  for (const sample of samples) {
    total += sample
  }
  return total / samples.length
}
