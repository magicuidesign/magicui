import { TextAnimate } from "@/registry/magicui/text-animate";

export default function TextAnimateDemo() {
  return (
    <TextAnimate animation="blurInUp" by="character" once>
      Blur in by character
    </TextAnimate>
  );
}
