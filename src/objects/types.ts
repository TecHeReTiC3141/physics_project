export enum GameObjectId {
    'GATE_LEFT' = 'GATE_LEFT',
    'GATE_RIGHT' = 'GATE_RIGHT',
    'RAIL' = 'RAIL',
    'CART' = 'CART',
    'TABLO' = 'TABLO'
}

export type GameObject = {
    id: GameObjectId
    x: number
    y: number
    width: number
    height: number
    color: string
    static?: boolean
    onlyX?: boolean
    onlyY?: boolean
}