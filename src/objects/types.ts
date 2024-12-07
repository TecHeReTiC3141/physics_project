export enum GameObjectId {
    'GATE_LEFT' = 'GATE_LEFT',
    'GATE_RIGHT' = 'GATE_RIGHT',
    'RAIL' = 'RAIL',
    'CART' = 'CART',
    'TABLO' = 'TABLO',
    'PUMP' = 'PUMP',
    'ADD_BOARD' = 'ADD_BOARD',
    'REMOVE_BOARD' = 'REMOVE_BOARD',
    'BOARDS' = 'BOARDS'
}

export type GameObject = {
    id: GameObjectId
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
    draw?: (ctx: CanvasRenderingContext2D) => void
}