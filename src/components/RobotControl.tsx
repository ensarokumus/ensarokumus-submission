import { useCallback, useEffect, useState } from "react";
import { ArrowUp, RotateCw, RotateCcw } from "lucide-react";
import BellroyIcon from "./BellroyIcon";

type Position = {
  x: number;
  y: number;
};

type Direction = "N" | "E" | "S" | "W";
const directions: Direction[] = ["N", "E", "S", "W"];

const RobotControl = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>("E");

  const moveForward = useCallback(() => {
    const moves = {
      N: { x: 0, y: -1 },
      E: { x: 1, y: 0 },
      S: { x: 0, y: 1 },
      W: { x: -1, y: 0 },
    };

    // constraints the position (x,y) of robot inside the 5x5 grid
    setPosition((prev) => {
      const newX = prev.x + moves[direction].x;
      const newY = prev.y + moves[direction].y;
      return {
        x: newX < 0 ? 0 : newX > 4 ? 4 : newX,
        y: newY < 0 ? 0 : newY > 4 ? 4 : newY,
      };
    });
  }, [direction]);

  const rotate = useCallback(
    (clockwise: boolean) => {
      const currentIndex = directions.indexOf(direction);
      // modulo operation below allows rotation in any direction
      const newIndex = (currentIndex + (clockwise ? 1 : -1) + 4) % 4;
      setDirection(directions[newIndex]);
    },
    [direction]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          moveForward();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          rotate(true);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          rotate(false);
          break;
      }
    },
    [moveForward, rotate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-5 sm:p-10 rounded">
      <div className="flex items-center justify-between gap-5 sm:gap-5">
        <svg className="w-32 sm:w-36 -mt-6">
          <BellroyIcon />
        </svg>
        <span className="text-4xl font-bold text-primary">|</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          robot challenge
        </h1>
      </div>
      <p className="text-2xl mb-5 text-gray-800 max-w-md">
        Control the Bellrobot with the buttons below or with your keyboard!
      </p>
      <div className="grid grid-cols-5 gap-1 mb-8">
        {[...Array(25)].map((_, index) => {
          const x = index % 5;
          const y = Math.floor(index / 5);
          const isRobot = x === position.x && y === position.y;
          return (
            <div
              key={index}
              className={`w-16 h-16 border ${
                isRobot ? "bg-primary text-white" : "bg-white"
              } flex items-center justify-center`}
            >
              {isRobot && (
                <ArrowUp
                  className={`text-white transform ${
                    direction === "E"
                      ? "rotate-90"
                      : direction === "S"
                      ? "rotate-180"
                      : direction === "W"
                      ? "-rotate-90"
                      : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={moveForward}
          className="flex items-center bg-secondary hover:bg-secondary hover:brightness-90 text-white px-4 py-2 rounded transition-all shadow-lg shadow-black/40 hover:shadow-black/20"
        >
          <ArrowUp className="inline mr-2 size-6" />
          <span className="ml-2 border rounded p-1 ">↑/W</span>
        </button>
        <button
          onClick={() => rotate(true)}
          className="flex items-center bg-primary hover:bg-primary hover:brightness-90 text-white px-4 py-2 rounded transition-all shadow-lg shadow-black/40 hover:shadow-black/20"
        >
          <RotateCw className="inline mr-2 size-6" />
          <span className="ml-2 border rounded p-1 ">→/D</span>
        </button>
        <button
          onClick={() => rotate(false)}
          className="flex items-center bg-primary hover:bg-primary hover:brightness-90 text-white px-4 py-2 rounded transition-all shadow-lg shadow-black/40 hover:shadow-black/20"
        >
          <RotateCcw className="inline mr-2 size-6" />
          <span className="ml-2 border rounded p-1 ">←/A</span>
        </button>
      </div>
    </div>
  );
};

export default RobotControl;
