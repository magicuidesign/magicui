"use client";

import { cn } from "@/lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import React, { Fragment, useContext, useState } from "react";

interface HeroVideoProps {
  children?: React.ReactNode;
  image?: string;
  className?: string;
  caption?: React.ReactNode;
  video?: string;
  title?: string;
}

interface HeroVideoContextType {
  openModal?: () => void;
  closeModal?: () => void;
}

const HeroVideoContext = React.createContext<HeroVideoContextType>({});

export const HeroVideoAction = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const context = useContext(HeroVideoContext);

  if (!context) {
    throw new Error("HeroVideoAction must be used within a HeroVideo");
  }

  const { openModal } = context;

  // Create a clone of the child and inject the onClick event to it
  const childWithOnClick = React.cloneElement(children, {
    onClick: openModal,
  });

  return (
    <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
      {childWithOnClick}
    </div>
  );
};

const HeroVideo = ({ children, image, title = "Demo" }: HeroVideoProps) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Extracting children based on type
  let actionChild: React.ReactElement | null = null;
  let otherChildren: React.ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === HeroVideoAction) {
        actionChild = child;
      } else {
        otherChildren.push(child);
      }
    }
  });

  return (
    <HeroVideoContext.Provider value={{ openModal, closeModal }}>
      <div
        className={cn("absolute inset-[1px] flex overflow-hidden rounded-2xl")}
      >
        {actionChild}
        <img
          className="pointer-events-none h-full w-full object-cover"
          src={image}
        />
      </div>

      {/* Modal */}
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
                <Dialog.Panel className="flex w-full max-w-4xl transform flex-col gap-2 overflow-hidden rounded-2xl p-6 text-left align-middle transition-all">
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-100">
                      {title}
                    </h3>
                    {closeModal && (
                      <button onClick={closeModal} aria-label="Close">
                        <X className="h-6 w-6 text-gray-100" />
                      </button>
                    )}
                  </div>
                  {otherChildren}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </HeroVideoContext.Provider>
  );
};

export default HeroVideo;
