import { ElementType } from "react"

type KineticTextProps = {
  text: string
  as?: ElementType
  className?: string
}

export function KineticText({
  text,
  as: Tag = "h1",
  className = "",
}: KineticTextProps) {
  return (
    <Tag
      className={["flex flex-wrap font-[300]", className].join(" ")}
      style={{
        "--hover-padding": "calc(1em / 12)",
        "--text-stroke-width": "calc(1em * 125 / 6000)",
      }}
    >
      {text.split("").map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="// letters to the right // letters to the left [will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
