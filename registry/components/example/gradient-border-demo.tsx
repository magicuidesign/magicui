import GradiantBorder from "../magicui/gradient-border";

const GradiantBorderDemo: React.FC = () => {
  return (
    <GradiantBorder>
      <input
        type="text"
        className=" w-full rounded-lg border-2 border-gray-100  bg-white p-2 focus:border-white focus:outline-none"
        placeholder="🌟 Enter your name"
      />
    </GradiantBorder>
  );
};
export default GradiantBorderDemo;
