import { useEffect, useRef } from 'react'
import clsx from "clsx";
import { GameObjectsProvider, useGameObjects } from "./context";

function App() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const {gameObjects, 
        setGameObjects, 
        offset, 
        setOffset, 
        draggedObjectId,
        setDraggedObjectId,
        isDragging,
        setIsDragging,
    } = useGameObjects()
    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 800;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            gameObjects.forEach((obj) => {
                ctx.fillStyle = obj.color;
                ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            });
        };

        draw();
    }, [gameObjects]);

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
        if (object) {
            setIsDragging(true);
            setDraggedObjectId(object.id);
            setOffset({ x: mousePos.x - object.x, y: mousePos.y - object.y });
        }
    };

    const onMouseMove = (event) => {
        if (!isDragging || !draggedObjectId) return;

        const mousePos = getMousePosition(event);
        const newObjects = gameObjects.map((obj) =>
            obj.id === draggedObjectId
                ? { ...obj, x: mousePos.x - offset.x, y: mousePos.y - offset.y }
                : obj
        );
        setGameObjects(newObjects);
    };

    const onMouseUp = () => {
        setIsDragging(false);
        setDraggedObjectId(null);
    };

    return (
        <div className="container mx-auto flex items-center justify-center">
            <div className={clsx("border border-gray-800 w-[1200px] h-[800px]",
                isDragging ? "cursor-grabbing" : "cursor-grab")}>
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
