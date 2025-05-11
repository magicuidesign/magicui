import FlipButton from "../magicui/flip-button";

export default function FlipButtonVariations() {
  return (
    <div className="flex flex-col items-center justify-center space-y-7">
      <FlipButton fromTop className="text-white">
        Browse
      </FlipButton>
      <FlipButton
        flipBgColor="pink"
        className="bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500"
        flipTextColor="black"
      >
        Get one
      </FlipButton>
      <FlipButton
        flippedText="Browse Products"
        className="text-white  bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))]"
      >
        See More
      </FlipButton>
    </div>
  );
}
