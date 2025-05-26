import { useEffect, useMemo, useRef } from "react";

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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const width = 170
    const height = 40

    const signalData = useMemo(() => {
        const data = [];
        const step = (xMax - xMin) / pointsCount;

        for (let i = 0; i <= pointsCount; i++) {
            const x = xMin + i * step;
            const xValue = a * Math.pow(Math.cos(x + w), m) + kx * Math.pow(Math.sin(x + w), n) + dx;
            const yValue = ky * Math.sin(x) + dy;

            data.push({ x, xValue, yValue });
        }
        return data;
    }, [kx, ky, dx, dy, pointsCount]);

    useEffect(() => {
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

        // Рисуем график X(t)
        ctx.beginPath();
        ctx.strokeStyle = '#8884d8';
        ctx.lineWidth = 2;

        let firstPointX = true;
        for (const point of signalData) {
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
        for (const point of signalData) {
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

    }, [signalData, width, height]);

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
    const scale = 50;

    const width = 168
    const height = 124

    useEffect(() => {
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

        // Устанавливаем пунктирный стиль (5px линия, 5px пробел)
        ctx.setLineDash([5, 5]);

        // Ось X (горизонтальная)
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);

        // Ось Y (вертикальная)
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);

        ctx.stroke();

        // Возвращаем сплошную линию для основной графики
        ctx.setLineDash([]);

        // Генерируем точки для петли гистерезиса
        const points = [];
        for (let i = 0; i <= pointsCount; i++) {
            const t = (2 * Math.PI * i) / pointsCount;

            // Вычисляем X и Y по формулам
            const x = a * Math.pow(Math.cos(t + w), m) + kx * Math.pow(Math.sin(t + w), n) + dx;
            const y = ky * Math.sin(t) + dy;

            // Преобразуем в полярные координаты (r, θ)
            const r = Math.sqrt(x * x + y * y);
            const theta = Math.atan2(y, x);

            points.push({ r, theta });
        }

        // Рисуем петлю гистерезиса
        ctx.beginPath();
        // ctx.strokeStyle = '#cede30';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        points.forEach((point, index) => {
            // Преобразуем полярные координаты в декартовы для canvas
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

    }, [kx, ky, dx, dy, pointsCount, width, height]);

    return (
        <div className="absolute top-7 left-[705px]">
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
