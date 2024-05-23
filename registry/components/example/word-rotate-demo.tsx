import WordRotate from "@/registry/components/magicui/word-rotate";

export default async function TextRevealDemo() {
  return (
    <WordRotate
      className="text-4xl font-bold text-black dark:text-white"
      words={[
        "Web Development.",
        "UI/UX Design.",
        "Cloud Computing.",
        "Web Security.",
        "Frontend Frameworks.",
        "Backend Architectures.",
        "API Design.",
        "Content Management Systems.",
        "SEO Strategies.",
        "Web Performance Optimization.",
        "Responsive Design.",
        "JavaScript Libraries.",
      ]}
    />
  );
}
