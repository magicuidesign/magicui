import SlideInText from "@/registry/magicui/slide-in-text";

export default function SlideInTextDemo() {
  return (
    <div className="relative justify-center">
      <SlideInText
        text="Magic UI"
        className="text-blue-600 font-bold text-4xl mb-8"
        delay={0.5}
        duration={1}
        children={0.1}
      />
    </div>
  );
}
