import { useState } from "react";

type Position = {
  x: number;
  y: number;
};

type Direction = "N" | "E" | "S" | "W";

const RobotControl = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>("N");

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
        <button className="bg-secondary hover:bg-secondary hover:brightness-90 text-white px-4 py-2 rounded transition-colors">
          Move Forward
        </button>
        <button className="text-white px-4 py-2 rounded transition-colors">
          Rotate CW
        </button>
        <button className="text-white px-4 py-2 rounded transition-colors">
          Rotate CCW
        </button>
      </div>
    </div>
  );
};

export default RobotControl;
