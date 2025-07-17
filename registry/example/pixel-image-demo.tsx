import PixelImage from "@/registry/magicui/pixel-image";

export default function Home() {
  return (
    <div>
      <PixelImage
        src="/pixel-image-demo.jpg"
        customGrid={{ rows: 4, cols: 6 }}
        grayscaleAnimation={true}
      />
    </div>
  );
}
