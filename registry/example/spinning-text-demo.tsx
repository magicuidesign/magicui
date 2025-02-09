import { SpinningText } from "@/registry/magicui/spinning-text";

export default function SpinningTextBasic() {
  return (
    <SpinningText
      radius={5}
      fontSize={1.2}
      className="font-medium leading-none my-20"
    >
      {`learn more • earn more • grow more • `}
    </SpinningText>
  );
}
