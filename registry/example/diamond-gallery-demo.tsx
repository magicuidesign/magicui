import DiamondGallery from "@/registry/magicui/diamond-gallery";

export default function DiamondGalleryDemo() {
    return (
        <div className="w-96 h-96 mx-auto aspect-square">
            <DiamondGallery
                images={[
                    {
                        image: "/diamond-gallery-demo.jpg",
                        isLink: true,
                        href: "https://magicui.design",
                        target: "_blank",
                        rel: "noopener noreferrer",
                    },
                    {
                        image: "/diamond-gallery-demo.jpg",
                        isLink: false,
                    },
                    {
                        image: "/diamond-gallery-demo.jpg",
                        isLink: false,
                    },
                    {
                        image: "/diamond-gallery-demo.jpg",
                        isLink: false,
                    },
                ]}
            />
        </div>
    );
}
