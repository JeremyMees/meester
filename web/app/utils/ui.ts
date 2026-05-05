export function generateIndex(index: number) {
  const correctedIndex = index + 1
  return correctedIndex < 10 ? `0${correctedIndex}` : `${correctedIndex}`
}
