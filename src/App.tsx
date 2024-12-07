import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from "clsx";
import { GameObjectsProvider, useGameObjects } from "./context";
import { useCart, useGates, usePump, useTablo } from "./objects";
import { GameObjectId } from "./objects/types.ts";
import { RAIL_X_RIGHT } from "./objects/constants.ts";

type MouseState = 'idle' | 'grab' | 'grabbing' | 'click'

const mouseStateClassnames = {
    idle: 'cursor-default',
    grab: 'cursor-grab',
    grabbing: 'cursor-grabbing',
    click: 'cursor-pointer',
}

function App() {
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
        isPumpTurnedOn
    } = useGameObjects()

    const render = useCallback(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 800;

        const cart = getGameObject(GameObjectId.CART);
        if (isPumpTurnedOn && cart && cart.x < RAIL_X_RIGHT - cart.width) {
            updateGameObject(GameObjectId.CART, { x: cart.x + 2.5 });
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (draggedObjectId) {
            const { x, y, width, height } = gameObjects.find((obj) => obj.id === draggedObjectId);
            ctx.fillStyle = 'yellow';
            ctx.fillRect(x - 5, y - 5, width + 10, height + 10);
        }
        gameObjects.forEach((obj) => {
            ctx.fillStyle = obj.color;
            if (obj.draw) obj.draw(ctx)
            else ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
        });
    }, [gameObjects, draggedObjectId])

    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            render();
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [render]);

    const getMousePosition = (event) => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const onMouseDown = (event) => {
        const mousePos = getMousePosition(event);
        const object = gameObjects.find(
            (obj) =>
                mousePos.x >= obj.x &&
                mousePos.x <= obj.x + obj.width &&
                mousePos.y >= obj.y &&
                mousePos.y <= obj.y + obj.height
        );
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
            const object = gameObjects.find(
                (obj) =>
                    mousePos.x >= obj.x &&
                    mousePos.x <= obj.x + obj.width &&
                    mousePos.y >= obj.y &&
                    mousePos.y <= obj.y + obj.height
            );
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
            newObject.x = mousePos.x - offset.x
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
    usePump()
    useTablo()

    return (
        <div className="container mx-auto flex items-center justify-center">
            <div className={clsx("border border-gray-800 w-[1200px] h-[800px]",
                mouseStateClassnames[mouseState])}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                />
            </div>
        </div>
    );
}

const withWrap = () =>
    <GameObjectsProvider>
        <App/>
    </GameObjectsProvider>

export { withWrap as App }
