import ScrollProgress from "@/registry/components/magicui/scroll-progress";

const dummyContent = Array.from({ length: 10 }, (_, i) => (
  <p key={i}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam
    lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra
    nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget
    libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut
    porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies
    a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
));

const ScrollProgressDemo = () => {
  return (
    <div>
      <ScrollProgress className="top-[65px]" />
      <strong>Note: The scroll progress is shown below the navbar of the page.</strong>
      {dummyContent}
    </div>
  );
};

export default ScrollProgressDemo;
