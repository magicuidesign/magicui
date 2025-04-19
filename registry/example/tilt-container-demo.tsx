import { Tilt } from "../magicui/tilt-container";

const TiltContainerDemo = () => {
  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareOpacity={0.3}>
      <img
        src="/placeholder.svg?height=300&width=400"
        alt="Example"
        className="rounded-lg max-w-sm  h-full object-cover"
      />
    </Tilt>
  );
};

export default TiltContainerDemo;
