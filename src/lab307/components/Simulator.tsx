import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from "clsx";
import { useGameObjects } from "../context";
import { Lab307GameObject } from "../types.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.ts";
import { Modal } from "../../components";
import { useGeneratorObjects } from "../objectHooks";

type MouseState = 'idle' | 'grab' | 'grabbing' | 'click'

const mouseStateClassnames = {
  idle: 'cursor-default',
  grab: 'cursor-grab',
  grabbing: 'cursor-grabbing',
  click: 'cursor-pointer',
}

export function Simulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ mouseState, setMouseState ] = useState<MouseState>('idle');

  const {
    gameObjects,
    sprites
  } = useGameObjects()

  const render = useCallback(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach((obj) => {
      ctx.fillStyle = obj.color;
      if (obj.draw) {
        obj.draw(ctx);
      } else if (sprites[ obj.id ]) {
        ctx.drawImage(sprites[ obj.id ]!, obj.x, obj.y, obj.width, obj.height)
      } else {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      }

    });
  }, [ gameObjects, sprites ])

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

  const checkObjectClicked = (obj: Lab307GameObject, mousePos: { x: number, y: number }) => (
    !obj.isStatic && obj.onClick &&
    mousePos.x >= obj.x &&
    mousePos.x <= obj.x + obj.width &&
    mousePos.y >= obj.y &&
    mousePos.y <= obj.y + obj.height
  );

  const onMouseDown = (event) => {
    const mousePos = getMousePosition(event);
    const object = gameObjects.find((obj) => checkObjectClicked(obj, mousePos))
    if (!object) return
    object.onClick?.()
  };

  const onMouseMove = (event) => {
    const mousePos = getMousePosition(event);
    const object = gameObjects.find((obj) => checkObjectClicked(obj, mousePos));
    setMouseState(object?.onClick ? 'click' : 'idle');
  };

  useGeneratorObjects()

  return (
    <div className={clsx("w-full border-primary border-2 rounded-xl h-[650px] relative py-3",
      mouseStateClassnames[ mouseState ])}>
      <button className="button-filled absolute top-3 left-3"
              onClick={() => (document.getElementById('simulator-hint') as HTMLDialogElement).showModal()}>Подсказка
      </button>
      <Modal id="simulator-hint">
        <h3 className="text-3xl text-center font-bold">Подсказка</h3>
        {/*<img src={hint as string} alt="Simulator hint" className="w-[1300px] h-[520px] pt-4"/>*/}
      </Modal>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        className="mx-auto"
      />
    </div>
  );
}
