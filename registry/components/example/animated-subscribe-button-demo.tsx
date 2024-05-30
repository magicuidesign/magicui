import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button"

export default function AnimatedSubscribeButtonDemo() {
  return <AnimatedSubscribeButton
    brand="#ffbd7a"
    subscribeStatus={false}
    buttonTextColor="#000009"
    initialText="Subscribe  "
    changeText=" Subscribed"
  />;
}
