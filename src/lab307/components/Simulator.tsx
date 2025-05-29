import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import clsx from "clsx";
import { useGameObjects } from "../context";
import { Lab307GameObject } from "../types.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.ts";
import { Modal } from "../../components";
import { useGeneratorObjects, useOscilographObjects } from "../objectHooks";
import { RotatingRegulator } from "./Regulator.tsx";
import { SCALE_COEFF } from "../hooks";
import { HysteresisLoop } from "./HysteresisLoop.tsx";

import hintImg from "../assets/hing.png";
import { usePointsContext } from "../context/PointsContext.tsx";
import { useTranslation } from "react-i18next";

type MouseState = 'idle' | 'grab' | 'grabbing' | 'click'

const mouseStateClassnames = {
    idle: 'cursor-default',
    grab: 'cursor-grab',
    grabbing: 'cursor-grabbing',
    click: 'cursor-pointer',
}

const displayWidth = 1200
const displayHeight = 650
const scale = 1.2 / 0.6


export function Simulator() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ mouseState, setMouseState ] = useState<MouseState>('idle');
    const { t } = useTranslation();

    const {
        gameObjects,
        sprites,
        positionX,
        positionY,
        scaleX,
        scaleY,
        setPositionX,
        setPositionY,
        setScaleX,
        setScaleY,
        generatorFrequency,
        generatorVpp,
        isOscilographTurnedOn,
        isOutputTurnedOn,
        isGeneratorTurnedOn,
        generatorOutputMode,
        isAcquireModeTurnedOn
    } = useGameObjects()

    const { setXc, setXm, setYr, setYm } = usePointsContext()

    const shouldShowHisteresis = useMemo(() => {
        console.log(+generatorFrequency, +generatorVpp)
        const shouldShow = isOscilographTurnedOn && isGeneratorTurnedOn && generatorOutputMode === 'sine'
            && isAcquireModeTurnedOn && isOutputTurnedOn
        setXc(undefined)
        setXm(undefined)
        setYr(undefined)
        setYm(undefined)
        if (shouldShow) {
            setPositionX(Math.random() * 2 - 1)
            setPositionY(Math.random() * 2 - 1)
            setScaleX(Math.random() * 2 - 1)
            setScaleY(Math.random() * 2 - 1)
        }
        return shouldShow
    }, [ isOscilographTurnedOn,
        isOutputTurnedOn,
        isGeneratorTurnedOn,
        generatorOutputMode,
        isAcquireModeTurnedOn
    ])

    const render = useCallback(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        canvas.width = CANVAS_WIDTH * scale;
        canvas.height = CANVAS_HEIGHT * scale;

        if (!ctx) return;
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

    const getMousePosition = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * scale,
            y: (event.clientY - rect.top) * scale,
        };
    };

    const checkObjectClicked = (obj: Lab307GameObject, mousePos: { x: number, y: number }) => (
        !obj.isStatic && obj.onClick &&
        mousePos.x >= obj.x &&
        mousePos.x <= obj.x + obj.width &&
        mousePos.y >= obj.y &&
        mousePos.y <= obj.y + obj.height
    );

    const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const mousePos = getMousePosition(event);
        const object = gameObjects.find((obj) => checkObjectClicked(obj, mousePos))
        if (!object) return
        object.onClick?.()
    };

    const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const mousePos = getMousePosition(event);
        const object = gameObjects.find((obj) => checkObjectClicked(obj, mousePos));
        setMouseState(object?.onClick ? 'click' : 'idle');
    };

    useGeneratorObjects()
    useOscilographObjects()

    const SCREEN_WIDTH_THRESHOLD = 1536;
    const shouldAdjustPosition = window.innerWidth < SCREEN_WIDTH_THRESHOLD;
    const positionAdjustment = shouldAdjustPosition ? 3.8 : 0;

    return (
        <div className={clsx("w-full border-primary border-2 rounded-xl h-[650px] relative py-3",
            mouseStateClassnames[ mouseState ])}>
            <button className="button-filled absolute top-3 left-3"
                    onClick={() => (document.getElementById('simulator-hint') as HTMLDialogElement).showModal()}>{t('simulator.hint')}
            </button>
            <RotatingRegulator x={68.3 + positionAdjustment} y={26.5} size={36 * SCALE_COEFF / 2} min={-1}
                               max={1} initialValue={positionX}
                               knobColor={isOscilographTurnedOn ? '#70EC70' : '#fff'} onChange={setPositionX}/>
            <RotatingRegulator x={71 + positionAdjustment} y={26.5} size={36 * SCALE_COEFF / 2} min={-1}
                               max={1} initialValue={positionY}
                               knobColor={isOscilographTurnedOn ? '#70EC70' : '#fff'} onChange={setPositionY}/>
            <RotatingRegulator x={67.9 + positionAdjustment} y={33} size={50 * SCALE_COEFF / 2} min={-1}
                               max={1} initialValue={scaleX}
                               knobColor={isOscilographTurnedOn ? '#70EC70' : '#fff'} onChange={setScaleX}/>
            <RotatingRegulator x={70.8 + positionAdjustment} y={33} size={50 * SCALE_COEFF / 2} min={-1}
                               max={1} initialValue={scaleY}
                               knobColor={isOscilographTurnedOn ? '#70EC70' : '#fff'} onChange={setScaleY}/>
            <Modal id="simulator-hint">
                <div className="max-w-5xl w-full p-2">
                    <h3 className="text-3xl text-center font-bold">t('simulator.hint')</h3>
                    <img src={hintImg} alt="Simulator hint" className="max-w-full h-auto pt-4 rounded-xl shadow-lg border border-accent"/>
                </div>
            </Modal>
            <canvas
                ref={canvasRef}
                width={displayWidth * scale}
                height={displayHeight * scale}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                className="mx-auto"
                style={{
                    width: `${displayWidth}px`,
                    height: `${displayHeight}px`,
                }}
            />
            {shouldShowHisteresis && generatorVpp && generatorFrequency
                &&
                <HysteresisLoop
                    kx={scaleX}
                    ky={scaleY}
                    dx={positionX}
                    dy={positionY}
                />
            }
        </div>
    );
}
