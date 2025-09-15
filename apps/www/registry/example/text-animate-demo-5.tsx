import { TextAnimate } from "@/registry/magicui/text-animate";

export default function TextAnimateDemo5() {
  return (
    <TextAnimate animation="fadeIn" by="line" as="p">
      {`Fade in by line as paragraph\n\nFade in by line as paragraph\n\nFade in by line as paragraph`}
    </TextAnimate>
  );
}
