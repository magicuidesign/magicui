import confetti from "canvas-confetti";

// interface ConfettiOptions extends confetti.Options {
//   particleCount?: number;
//   angle?: number;
//   spread?: number;
//   startVelocity?: number;
//   decay?: number;
//   gravity?: number;
//   drift?: number;
//   flat?: boolean;
//   ticks?: number;
//   origin?: { x: number; y: number };
//   colors?: string[];
//   shapes?: confetti.Shape[];
//   zIndex?: number;
//   disableForReducedMotion?: boolean;
//   useWorker?: boolean;
//   resize?: boolean;
//   canvas?: HTMLCanvasElement | null;
//   scalar?: number;
// }

// const Confetti = (options: ConfettiOptions) => {
//   if (
//     options.disableForReducedMotion &&
//     window.matchMedia("(prefers-reduced-motion)").matches
//   ) {
//     return;
//   }

//   const confettiInstance = options.canvas
//     ? confetti.create(options.canvas, {
//         resize: options.resize ?? true,
//         useWorker: options.useWorker ?? true,
//       })
//     : confetti;

//   confettiInstance({
//     ...options,
//   });
// };

// Confetti.shapeFromPath = (options: { path: string; [key: string]: any }) => {
//   return confetti.shapeFromPath({ ...options });
// };

// Confetti.shapeFromText = (options: { text: string; [key: string]: any }) => {
//   return confetti.shapeFromText({ ...options });
// };

// export { Confetti };

import type { ReactNode } from "react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";

// our API exposed
type Api = {
  fire: (options?: ConfettiOptions) => void;
};

type Props = React.ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};
export type Ref = Api;

const ConfettiContext = createContext<Api>({} as Api);

const Confetti = forwardRef<Ref, Props>((props, ref) => {
  const {
    options,
    globalOptions = {},
    manualstart = false,
    children,
    ...rest
  } = props;
  const instanceRef = useRef<ConfettiInstance>(null); // confetti instance

  const canvasRef = useCallback(
    // https://react.dev/reference/react-dom/components/common#ref-callback
    // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        // <canvas> is mounted => create the confetti instance
        if (instanceRef.current) return; // if not already created
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      } else {
        // <canvas> is unmounted => reset and destroy instanceRef
        instanceRef.current.reset();
        instanceRef.current = undefined;
      }
    },
    [globalOptions],
  );

  // `fire` is a function that call the instance() with `opts` merged with `options`
  const fire = useCallback(
    (opts = {}) => {
      const instance = instanceRef.current;
      instance({
        ...options,
        ...opts,
      });
    },
    [options],
  );

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire],
  );

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      fire();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

export const useConfetti = () => useContext(ConfettiContext);

export default Confetti;
