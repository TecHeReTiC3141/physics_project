import { useState, useRef, useEffect, FC } from 'react';

interface RotatingRegulatorProps {
  x: number;
  y: number;
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  size?: number;
  knobColor?: string;
  indicatorColor?: string;
}

export const RotatingRegulator: FC<RotatingRegulatorProps> = ({
                                                                x, y,
                                                                min = 0,
                                                                max = 100,
                                                                initialValue = 0,
                                                                onChange,
                                                                size = 100,
                                                                knobColor = '#333',
                                                                indicatorColor = '#000',
                                                              }) => {
  const [ angle, setAngle ] = useState<number>(0);
  const [ isDragging, setIsDragging ] = useState<boolean>(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const prevAngle = useRef<number>(0);
  const rotationCount = useRef<number>(0);

  // Convert value to angle (0° to 360° range)
  const valueToAngle = (value: number) => {
    const normalized = (value - min) / (max - min);
    return normalized * 360;
  };

  // Convert angle to value
  const angleToValue = (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360 / 360;
    return min + normalized * (max - min);
  };

  // Initialize angle based on initialValue
  useEffect(() => {
    setAngle(valueToAngle(initialValue));
    prevAngle.current = valueToAngle(initialValue);
  }, [ initialValue ]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };
  const calculateAngle = (clientX: number, clientY: number) => {
    if (!knobRef.current) return angle;

    const rect = knobRef.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY; // Inverted Y axis

    let newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Convert from -180°-180° to 0°-360°
    if (newAngle < 0) newAngle += 360;

    // Handle continuous rotation
    const angleDiff = newAngle - prevAngle.current;

    if (angleDiff > 180) {
      rotationCount.current -= 1;
    } else if (angleDiff < -180) {
      rotationCount.current += 1;
    }

    prevAngle.current = newAngle;
    return newAngle + (rotationCount.current * 360);
    return newAngle
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newAngle = calculateAngle(e.clientX, e.clientY);
    updateAngle(newAngle);
  };

  const updateAngle = (newAngle: number) => {
    setAngle(newAngle);
    onChange?.(angleToValue(newAngle));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={knobRef}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: knobColor,
        cursor: 'grab',
        transform: `rotate(${angle}deg)`,
        transition: isDragging ? 'none' : 'transform 0.1s ease',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className="border border-gray-800"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        style={{
          position: 'absolute',
          width: '8%',
          height: '15%',
          backgroundColor: indicatorColor,
          borderRadius: '5px',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};
