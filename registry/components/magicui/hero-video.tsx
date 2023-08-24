import { cn } from "@/lib/utils";
import ShimmerButton from "@/registry/components/magicui/shimmer-button";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment, useState } from "react";

interface HeroVideoProps {
  children?: React.ReactNode;
  image?: string;
  className?: string;
}

const HeroVideo = ({ children, image, className }: HeroVideoProps) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div
      className={cn(
        "absolute inset-[1px] flex overflow-hidden rounded-2xl",
        className,
      )}
    >
      <img
        className="pointer-events-none h-full w-full object-cover"
        src={image}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <ShimmerButton onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 dark:text-white"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>

          {/* <span className="dark:text-white">play</span> */}
        </ShimmerButton>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          {/* Video Modal */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-full max-w-4xl transform flex-col gap-2 overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-row items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-100"
                    >
                      Magic UI Demo
                    </Dialog.Title>

                    <button onClick={closeModal}>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <video
                    autoPlay
                    className="rounded-xl border"
                    poster={image}
                    playsInline
                    src="https://cdn.magicuikit.com/globe.mp4"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default HeroVideo;
