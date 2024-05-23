import WordPullUp from "../magicui/word-pull-up";


export default async function WordPullUpDemo() {
  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg border bg-white dark:bg-black">
      <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
        words="Building Magic UI"
      />{" "}
    </div>
  );
}