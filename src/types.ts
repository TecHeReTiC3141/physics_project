export type GameObject<ID> = {
  id: ID
  x: number
  y: number
  width: number
  height: number
  color: string
  isStatic?: boolean
  onlyX?: boolean
  onlyY?: boolean
  affectedByRotation?: boolean
  onClick?: () => void
  active?: boolean
  draw?: (ctx: CanvasRenderingContext2D) => void
}