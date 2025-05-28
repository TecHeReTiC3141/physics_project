import { useEffect, useMemo, useRef, useState } from "react";
import { useGameObjects } from "../context";

type HysteresisLoopProps = {
    kx: number;
    ky: number;
    dx: number;
    dy: number;
    pointsCount?: number;
}

// Параметры формулы
const a = 0.2;
const w = 0.04;
const n = 3;
const m = 3;

// Границы графика
const xMin = -2 * Math.PI;
const xMax = 2 * Math.PI;
const yMin = -1;
const yMax = 1;

interface CanvasSignalProps {
    kx: number;
    ky: number;
    dx: number;
    dy: number;
    pointsCount?: number;
    width?: number;
    height?: number;
}

const CanvasSignalGraph: React.FC<CanvasSignalProps> = ({
                                                            kx,
                                                            ky,
                                                            dx,
                                                            dy,
                                                            pointsCount = 1000,
                                                        }) => {

    const { generatorFrequency, generatorVpp } = useGameObjects()


    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Проверка корректности данных
    const animationRef = useRef<number>();
    const [noiseEnabled, setNoiseEnabled] = useState(false);

    const width = 170
    const height = 35

    // Проверка корректности данных
    const isCorrectGeneratorData =
        20 <= +generatorFrequency &&
        +generatorFrequency < 40 &&
        Math.abs(+generatorVpp - 20) <= 1;

    const generateSignalData = (addNoise = false) => {
        const data = [];
        const step = (xMax - xMin) / pointsCount;

        for (let i = 0; i <= pointsCount; i++) {
            const x = xMin + i * step;
            let xValue = a * Math.pow(Math.cos(x + w), m) + kx * Math.pow(Math.sin(x + w), n) + dx;
            let yValue = ky * Math.sin(x) + dy;

            // Добавляем шум если данные некорректны и включен шум
            if (!isCorrectGeneratorData && addNoise) {
                const noiseX = (Math.random() - 0.5) * 0.1;
                const noiseY = (Math.random() - 0.5) * 0.1;
                xValue += noiseX;
                yValue += noiseY;
            }

            data.push({ x, xValue, yValue });
        }
        return data;
    };

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Очищаем canvas
        ctx.clearRect(0, 0, width, height);

        // Настройки стилей
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Масштабирование
        const xScale = width / (xMax - xMin);
        const yScale = height / (yMax - yMin);

        // Функция преобразования координат
        const toCanvasX = (x: number) => (x - xMin) * xScale;
        const toCanvasY = (y: number) => height - (y - yMin) * yScale;

        // Рисуем оси координат
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;

        // Ось X (горизонтальная)
        const zeroY = toCanvasY(0);
        ctx.beginPath();
        ctx.moveTo(0, zeroY);
        ctx.lineTo(width, zeroY);
        ctx.stroke();

        // Ось Y (вертикальная)
        const zeroX = toCanvasX(0);
        ctx.beginPath();
        ctx.moveTo(zeroX, 0);
        ctx.lineTo(zeroX, height);
        ctx.stroke();

        // Генерируем данные с учетом шума
        const currentData = generateSignalData(noiseEnabled);

        // Рисуем график X(t)
        ctx.beginPath();
        ctx.strokeStyle = '#8884d8';
        ctx.lineWidth = 2;

        let firstPointX = true;
        for (const point of currentData) {
            const canvasX = toCanvasX(point.x);
            const canvasY = toCanvasY(point.xValue);

            // Пропускаем точки вне диапазона Y
            if (point.xValue < yMin || point.xValue > yMax) {
                firstPointX = true;
                continue;
            }

            if (firstPointX) {
                ctx.moveTo(canvasX, canvasY);
                firstPointX = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();

        // Рисуем график Y(t)
        ctx.beginPath();
        ctx.strokeStyle = '#82ca9d';
        ctx.lineWidth = 2;

        let firstPointY = true;
        for (const point of currentData) {
            const canvasX = toCanvasX(point.x);
            const canvasY = toCanvasY(point.yValue);

            // Пропускаем точки вне диапазона Y
            if (point.yValue < yMin || point.yValue > yMax) {
                firstPointY = true;
                continue;
            }

            if (firstPointY) {
                ctx.moveTo(canvasX, canvasY);
                firstPointY = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();
    };

    useEffect(() => {
        // Включаем/выключаем шум в зависимости от корректности данных
        setNoiseEnabled(!isCorrectGeneratorData);
    }, [isCorrectGeneratorData]);

    useEffect(() => {
        if (!noiseEnabled) {
            // Если шум выключен, рисуем один раз
            drawCanvas();
            return;
        }

        // Если шум включен, запускаем анимацию 60 FPS
        const animate = () => {
            drawCanvas();
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current!);
            }
        };
    }, [noiseEnabled, width, height, kx, ky, dx, dy, pointsCount]);


    return (
        <div>
            <canvas
                className="absolute left-5 top-5 "
                ref={canvasRef}
                width={width}
                height={height}
            />
        </div>
    );
};

export const HysteresisLoop = ({
                                                           kx,
                                                           ky,
                                                           dx,
                                                           dy,
                                                           pointsCount = 500,
                                                       }: HysteresisLoopProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const [noiseEnabled, setNoiseEnabled] = useState(false);
    const scale = 50;

    const width = 168
    const height = 124

    const { generatorFrequency, generatorVpp } = useGameObjects()

    const isCorrectGeneratorData =
        20 <= +generatorFrequency &&
        +generatorFrequency < 40 &&
        Math.abs(+generatorVpp - 20) <= 1;

    const drawHysteresisLoop = (addNoise = false) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Очищаем canvas
        ctx.clearRect(0, 0, width, height);

        // Центр canvas
        const centerX = width / 2;
        const centerY = height / 2;

        // Рисуем перекрестье (оси X и Y пунктиром)
        ctx.beginPath();
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);

        // Ось X (горизонтальная)
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);

        // Ось Y (вертикальная)
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);

        ctx.stroke();
        ctx.setLineDash([]);

        // Генерируем точки с шумом
        const points = [];
        for (let i = 0; i <= pointsCount; i++) {
            const t = (2 * Math.PI * i) / pointsCount;

            // Базовые значения
            let x = a * Math.pow(Math.cos(t + w), m) + kx * Math.pow(Math.sin(t + w), n) + dx;
            let y = ky * Math.sin(t) + dy;

            // Добавляем шум если нужно
            if (addNoise) {
                x += (Math.random() - 0.5) * 0.1; // Шум ±0.1
                y += (Math.random() - 0.5) * 0.1;
            }

            // Преобразуем в полярные координаты
            const r = Math.sqrt(x * x + y * y);
            const theta = Math.atan2(y, x);

            points.push({ r, theta });
        }

        // Рисуем петлю
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        points.forEach((point, index) => {
            const x = centerX + point.r * scale * Math.cos(point.theta);
            const y = centerY + point.r * scale * Math.sin(point.theta);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.closePath();
        ctx.stroke();
    };

    useEffect(() => {
        setNoiseEnabled(!isCorrectGeneratorData);
    }, [isCorrectGeneratorData]);

    useEffect(() => {
        if (!noiseEnabled) {
            drawHysteresisLoop(false);
            return;
        }

        const animate = () => {
            drawHysteresisLoop(true);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current!);
            }
        };
    }, [noiseEnabled, kx, ky, dx, dy, pointsCount]);

    return (
        <div className="absolute top-7 2xl:left-[46%] left-[45.2%]">
            <CanvasSignalGraph kx={kx} ky={ky} dx={dx} dy={dy} />
            <canvas
                className="absolute left-5 top-[55px] border-t border-gray-400"
                ref={canvasRef}
                width={width}
                height={height}
            />
        </div>
    );
};
