import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { MdOutlineFormatColorFill } from "react-icons/md";

type ColorPaletteProps = {
  variable?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Palette = ({
  variable = "primary",
  size = "md",
  value,
  onChange,
}: ColorPaletteProps) => {
  const colors = [
    { shade: 25, variable: `--${variable}-25` },
    { shade: 50, variable: `--${variable}-50` },
    { shade: 100, variable: `--${variable}-100` },
    { shade: 200, variable: `--${variable}-200` },
    { shade: 300, variable: `--${variable}-300` },
    { shade: 400, variable: `--${variable}-400` },
    { shade: 500, variable: `--${variable}-500` },
    { shade: 600, variable: `--${variable}-600` },
    { shade: 700, variable: `--${variable}-700` },
    { shade: 800, variable: `--${variable}-800` },
    { shade: 900, variable: `--${variable}-900` },
    { shade: 950, variable: `--${variable}-950` },
  ];

  let boxSize = 200;
  let chartSize = 200;

  switch (size) {
    case "sm":
      boxSize = 100;
      chartSize = 100;
      break;
    case "md":
      boxSize = 150;
      chartSize = 150;
      break;
    case "lg":
      boxSize = 200;
      chartSize = 200;
      break;
    default:
      boxSize = 200;
      chartSize = 200;
  }

  const segmentAngle = 360 / colors.length;

  const gradientStops = colors
    .map((color, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      return `rgba(var(${color.variable})) ${startAngle}deg ${endAngle}deg`;
    })
    .join(", ");

  const createLabels = () => {
    return colors.map((color, index) => {
      // Shift the index by 2 positions
      const shiftedIndex = (index + 9.5) % colors.length;
      const angle = shiftedIndex * segmentAngle * (Math.PI / 180);

      const labelRadius = chartSize / 2 - (size === "sm" ? 13 : 20);
      const x = Math.cos(angle) * labelRadius + boxSize / 2;
      const y = Math.sin(angle) * labelRadius + boxSize / 2;

      // Determine label color based on shade
      const labelColorVariable =
        color.shade <= 400 ? `--${variable}-900` : `--${variable}-50`;
      return (
        <div
          key={color.shade}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 font-semibold ${
            size === "sm"
              ? "text-[8px]"
              : size === "md"
                ? "text-[10px]"
                : "text-xs"
          }`}
          style={{
            left: `${x}px`,
            top: `${y}px`,
            color: `rgba(var(${labelColorVariable}))`,
          }}
        >
          {color.shade}
        </div>
      );
    });
  };

  const createHalfCircularText = (text: string, radius: number) => {
    const characters = text.split("");
    const angleStep = -180 / (characters.length - 1);

    return characters.map(
      (
        char:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | null
          | undefined,
        index: Key | null | undefined
      ) => {
        const angle = -180 + angleStep * (index as number); // Start from left and go to right
        const angleInRadians = (angle * Math.PI) / 180;
        const x = radius * Math.cos(angleInRadians);
        const y = radius * Math.sin(angleInRadians);

        return (
          <span
            key={index}
            className={`absolute transfor ${
              size === "sm"
                ? "hidden"
                : size === "md"
                  ? "text-[10px]"
                  : "text-xs"
            }`}
            style={{
              left: `0%`, // Center horizontally
              top: `50%`, // Center vertically
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`,
              color: `rgba(var(--${variable}-100))`,
            }}
          >
            {char}
          </span>
        );
      }
    );
  };

  return (
    <div
      className="relative"
      style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: `${chartSize}px`,
          height: `${chartSize}px`,
          top: `${(boxSize - chartSize) / 2}px`,
          left: `${(boxSize - chartSize) / 2}px`,
          backgroundImage: `conic-gradient(${gradientStops})`,
        }}
      ></div>
      {/* Input container */}
      <label
        className="absolute cursor-pointer  group rounded-full flex items-center justify-center"
        style={{
          width: `${chartSize / 2}px`,
          height: `${chartSize / 2}px`,
          top: `${boxSize / 2 - chartSize / 4}px`,
          left: `${boxSize / 2 - chartSize / 4}px`,
          background: `rgba(var(--${variable}-500))`,
        }}
      >
        <input
          type="color"
          className="w-full h-full opacity-0 cursor-pointer"
          value={value}
          onChange={onChange}
        />

        {/* Circular Text */}
        <div className="relative w-full h-full">
          <span
            className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 text-3xl group-hover:text-gray-100 transition-all duration-300`}
          >
            <MdOutlineFormatColorFill />
          </span>
          {createHalfCircularText(variable, chartSize / 4 - 10)}
        </div>
      </label>
      {createLabels()}
    </div>
  );
};

export default Palette;
