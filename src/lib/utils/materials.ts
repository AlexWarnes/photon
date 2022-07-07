export const glazeProps = {
  roughness: 0.15,
  transmission: 1,
  thickness: 2,
}

export const randomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
