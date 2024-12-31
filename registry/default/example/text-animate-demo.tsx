import { TextAnimate } from "@/registry/default/magicui/text-animate";

export default function TextAnimateDemo() {
  return (
    <div className="text-4xl font-bold">
      <TextAnimate animation="slideUp">Slide up</TextAnimate>
      <TextAnimate animation="slideDown">Slide down</TextAnimate>
      <TextAnimate animation="slideLeft" by="character">
        Slide left by character
      </TextAnimate>
      <TextAnimate animation="slideRight" by="word">
        Slide right by word
      </TextAnimate>
      text-4xl font-bold
      <TextAnimate animation="blurFade">Blur fade</TextAnimate>
      <TextAnimate animation="blurFade" by="word">
        Blur fade by word
      </TextAnimate>
      <TextAnimate animation="blurFade" by="character">
        Blur fade by character
      </TextAnimate>
      <TextAnimate animation="scaleUp">Scale up</TextAnimate>
      <TextAnimate animation="scaleDown">Scale down</TextAnimate>
      <TextAnimate animation="scaleUp" by="character">
        Scale up by character
      </TextAnimate>
      <TextAnimate animation="pullup">Pull up</TextAnimate>
      <TextAnimate animation="pullup" by="character">
        Pull up by character
      </TextAnimate>
      <TextAnimate animation="pullup" by="word">
        Pull up by word
      </TextAnimate>
    </div>
  );
}
