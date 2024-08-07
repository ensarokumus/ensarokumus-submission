import { useState } from "react";

type Position = {
  x: number;
  y: number;
};

type Direction = "N" | "E" | "S" | "W";

const RobotControl = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>("N");

  const directions: Direction[] = ["N", "E", "S", "W"];

  const moveForward = () => {
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
  };

  const rotate = (clockwise: boolean) => {
    const currentIndex = directions.indexOf(direction);
    // modulo operation below allows rotation in any direction
    const newIndex = (currentIndex + (clockwise ? 1 : -1) + 4) % 4;
    setDirection(directions[newIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-5 sm:p-10 gap-3">
      <h1 className="text-4xl font-bold text-primary">
        Bellroy | robot challenge
      </h1>
      <p className="text-[1.75rem] mb-8 text-gray-800">
        Control the Bellrobot with the buttons below!
      </p>
      <div className="grid grid-cols-5 gap-1 mb-4">
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
              {isRobot && direction}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={moveForward}
          className="bg-secondary hover:bg-secondary hover:brightness-90 text-white px-4 py-2 rounded transition-colors"
        >
          Move Forward
        </button>
        <button
          onClick={() => rotate(true)}
          className="text-white px-4 py-2 rounded transition-colors"
        >
          Rotate CW
        </button>
        <button
          onClick={() => rotate(false)}
          className="text-white px-4 py-2 rounded transition-colors"
        >
          Rotate CCW
        </button>
      </div>
    </div>
  );
};

export default RobotControl;
