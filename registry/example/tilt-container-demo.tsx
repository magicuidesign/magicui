import { Tilt } from "../magicui/tilt-container";

const TiltContainerDemo = () => {
  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareOpacity={0.3}>
      <div className="border border-gray-200 rounded-lg w-[400] p-6 bg-white shadow-xl dark:bg-gray-800">
        <span className="pointer-events-none z-10 text-black text-center text-6xl font-semibold tracking-tight dark:text-white">
          Tilt Container
        </span>
      </div>
    </Tilt>
  );
};

export default TiltContainerDemo;
