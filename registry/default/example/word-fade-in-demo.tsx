import TextAnimate from "@/registry/default/magicui/word-fade-in";

export default function WordFadeInDemo() {
  return (
    <>
      <TextAnimate animation="blurFade">Blur fade effect</TextAnimate>
      <TextAnimate animation="slideUp">Slide up</TextAnimate>
      <TextAnimate animation="slideDown">Slide down</TextAnimate>
      <TextAnimate animation="slideLeft">Slide left</TextAnimate>
      <TextAnimate animation="slideRight">Slide right</TextAnimate>
      <TextAnimate animation="scaleUp">Scale up</TextAnimate>
      <TextAnimate animation="scaleDown">Scale down</TextAnimate>
      <TextAnimate animation="scaleUp" by="character">
        Scale up by character
      </TextAnimate>
      <TextAnimate animation="blurFade" by="word">
        Blur fade effect
      </TextAnimate>
      <TextAnimate animation="blurFade" by="character">
        Blur fade effect
      </TextAnimate>
    </>
  );
}
