import RotatingCircles from "@/registry/components/magicui/rotating-circles";

const RotatingCirclesDemo = () => {
  return (
    <>
      <div className="mb-8 mt-8 text-center">
        <p className="text-wrap text-2xl font-bold text-gray-700">
          All the chains that matter in one place
        </p>
      </div>
      <RotatingCircles>
        <p className=" text-center font-bold text-gray-700">
          You can scroll up and down to rotate the circles 🔄
        </p>
        <div className="mt-2 animate-bounce text-center">👇</div>
      </RotatingCircles>
    </>
  );
};

export default RotatingCirclesDemo;
