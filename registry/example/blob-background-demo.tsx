import { BlobBackground } from "@/registry/magicui/blob-background";

export default function BlobBackgroundDemo() {
  return (
    <BlobBackground
      blobCount={8}
      blobSize={250}
      range={150}
      speed={3000}
      blur={60}
    />
  );
}
