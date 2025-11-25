const SCALE = 997

function mix(seed: number, step: number): number {
  let value = seed + step
  value = (value * 33 + 17) % SCALE
  return value
}

function lane0(seed: number): number {
  let value = seed
  value = mix(value, 0)
  value = mix(value, 3)
  return value
}

function lane1(seed: number): number {
  let value = seed
  value = mix(value, 1)
  value = mix(value, 4)
  return value
}

function lane2(seed: number): number {
  let value = seed
  value = mix(value, 2)
  value = mix(value, 5)
  return value
}

function lane3(seed: number): number {
  let value = seed
  value = mix(value, 3)
  value = mix(value, 6)
  return value
}

function lane4(seed: number): number {
  let value = seed
  value = mix(value, 4)
  value = mix(value, 7)
  return value
}

function lane5(seed: number): number {
  let value = seed
  value = mix(value, 5)
  value = mix(value, 8)
  return value
}

function lane6(seed: number): number {
  let value = seed
  value = mix(value, 6)
  value = mix(value, 9)
  return value
}

function lane7(seed: number): number {
  let value = seed
  value = mix(value, 7)
  value = mix(value, 10)
  return value
}

export function passSample20(seed: number): number {
  const samples: number[] = []
  for (let step = 0; step < 24; step++) {
    samples.push(mix(seed, step))
  }
  let total = 0
  for (const sample of samples) {
    total += sample
  }
  const lanes =
    lane0(seed) +
    lane1(seed) +
    lane2(seed) +
    lane3(seed) +
    lane4(seed) +
    lane5(seed) +
    lane6(seed) +
    lane7(seed)
  return (total + lanes) / samples.length
}
