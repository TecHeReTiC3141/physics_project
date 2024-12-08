import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from "clsx";
import { useGameObjects } from "../context";
import { useCart, useGates, useTablo } from "../objects";
import { GameObject, GameObjectId } from "../objects/types.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH, RAIL_X_LEFT, RAIL_X_RIGHT } from "../constants.ts";
import { useBoards } from "../objects/Boards.ts";
import { RAIL_X_LEFT_OFFSET, RAIL_X_RIGHT_OFFSET } from "../constants.ts";

type MouseState = 'idle' | 'grab' | 'grabbing' | 'click'

const mouseStateClassnames = {
    idle: 'cursor-default',
    grab: 'cursor-grab',
    grabbing: 'cursor-grabbing',
    click: 'cursor-pointer',
}

function Simulator() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ mouseState, setMouseState ] = useState<MouseState>('idle');

    const {
        gameObjects,
        getGameObject,
        offset,
        setOffset,
        draggedObjectId,
        setDraggedObjectId,
        isDragging,
        setIsDragging,
        updateGameObject,
        isPumpTurnedOn,
        boardsCount,
        sprites
    } = useGameObjects()

    const rotateCanvas = useCallback((ctx) => {
        const angle = boardsCount * Math.PI / 180;
        const originX = RAIL_X_RIGHT - 200;
        const originY = 600;

        ctx.save();
        ctx.translate(originX, originY);
        ctx.rotate(angle);
        ctx.translate(-originX, -originY);
    }, [boardsCount])

    const render = useCallback(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const cart = getGameObject(GameObjectId.CART);
        if (isPumpTurnedOn && cart && cart.x < RAIL_X_RIGHT - cart.width) {

            const CARD_SPEED_PER_FRAME = 2 * (1 + boardsCount * .3)
            updateGameObject(GameObjectId.CART, { x: cart.x + CARD_SPEED_PER_FRAME });
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (draggedObjectId) {
            const activeObject = getGameObject(draggedObjectId)
            if (activeObject.affectedByRotation) {
                rotateCanvas(ctx)
            }

            ctx.fillStyle = '#B8E0F2';
            ctx.beginPath()
            ctx.roundRect(
                activeObject.x - 5,
                activeObject.y - 5,
                activeObject.width + 10,
                activeObject.height + 10,
                10
            );
            ctx.fill()
            if (activeObject.affectedByRotation) {
                ctx.restore();
            }
        }

        gameObjects.forEach((obj) => {
            if (obj.affectedByRotation) {
                rotateCanvas(ctx)
            }

            ctx.fillStyle = obj.color;
            if (obj.draw) {
                obj.draw(ctx);
            } else if (sprites[obj.id]) {
                ctx.drawImage(sprites[obj.id]!, obj.x, obj.y, obj.width, obj.height)
            } else {
                ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            }
            if (obj.affectedByRotation) {
                ctx.restore();
            }
        });
    }, [ gameObjects, sprites, boardsCount, isPumpTurnedOn, draggedObjectId ])

    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            render();
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [ render ]);

    const getMousePosition = (event) => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const checkObjectClicked = (obj: GameObject, mousePos: {x: number, y: number}) => {
        if (obj.isStatic && !obj.onClick) return false
        if (obj.affectedByRotation) {
            const angle = boardsCount / 1 * Math.PI / 180;
            const originX = RAIL_X_RIGHT - 200;
            const originY = 600 + 30;

            const dx = mousePos.x - originX;
            const dy = mousePos.y - originY;

            const unrotatedMouseX =
                originX + dx * Math.cos(-angle) - dy * Math.sin(-angle);
            const unrotatedMouseY =
                originY + dx * Math.sin(-angle) + dy * Math.cos(-angle);

            return (
                unrotatedMouseX >= obj.x &&
                unrotatedMouseX <= obj.x + obj.width &&
                unrotatedMouseY >= obj.y &&
                unrotatedMouseY <= obj.y + obj.height
            );
        }
        // Regular bounds check for non-rotated objects
        return (
            mousePos.x >= obj.x &&
            mousePos.x <= obj.x + obj.width &&
            mousePos.y >= obj.y &&
            mousePos.y <= obj.y + obj.height
        );
    }

    const onMouseDown = (event) => {
        const mousePos = getMousePosition(event);
        const object = gameObjects.find((obj) => checkObjectClicked(obj, mousePos))
        if (!object) return
        if (!object.isStatic) {
            setIsDragging(true);
            setMouseState('grabbing')
            setDraggedObjectId(object.id);
            setOffset({ x: mousePos.x - object.x, y: mousePos.y - object.y });
        }
        object.onClick?.()
    };

    const onMouseMove = (event) => {
        if (!isDragging) {
            const mousePos = getMousePosition(event);
            const object = gameObjects.find((obj) => checkObjectClicked(obj, mousePos));
            if (!object) {
                setMouseState('idle');
            } else if (object.onClick) {
                setMouseState('click')
            } else if (!object.isStatic) {
                setMouseState('grab');
            } else {
                setMouseState('idle');
            }
        }
        if (!isDragging || !draggedObjectId) return;

        const mousePos = getMousePosition(event);
        const newObject = getGameObject(draggedObjectId);

        if (!newObject.onlyY) {
            newObject.x = Math.min(Math.max(mousePos.x - offset.x, RAIL_X_LEFT + RAIL_X_LEFT_OFFSET),
                RAIL_X_RIGHT - newObject.width - RAIL_X_RIGHT_OFFSET )
        }
        if (!newObject.onlyX) {
            newObject.y = mousePos.y - offset.y
        }
        updateGameObject(draggedObjectId, newObject)
    };

    const onMouseUp = () => {
        setIsDragging(false);
        setDraggedObjectId(null);
    };

    useGates()
    useCart()
    useTablo()
    useBoards()

    return (
        <div className={clsx("w-full border-primary border-2 rounded-xl h-[500px] relative",
            mouseStateClassnames[ mouseState ])}>
            <button className="button-filled absolute top-3 left-3">Подсказка</button>
            <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                className="mx-auto"
            />
        </div>
    );
}


export { Simulator }
