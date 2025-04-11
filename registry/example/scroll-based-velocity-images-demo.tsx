import { VelocityScrollImages } from "@/registry/magicui/scroll-based-velocity-images";

export default function ScrollBasedVelocityImagesDemo() {
  return (
    <VelocityScrollImages
      defaultVelocity={5}
      numRows={2}
      images={[
        {
          src: "/showcase/aomni.png",
          alt: "Image 1",
          width: 380,
          height: 214,
        },
        {
          src: "/showcase/infisical.png",
          alt: "Hero Image 2",
          width: 380,
          height: 214,
        },
        {
          src: "/showcase/million.png",
          alt: "Hero Image 3",
          width: 380,
          height: 214,
        },
      ]}
    />
  );
}
