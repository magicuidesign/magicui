import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";

// interface LinearMaskProps {
//   color?: string;
//   innerOpacity?: number;
//   outerOpacity?: number;
//   children?: ReactNode;
//   className?: string;
// }

// const LinearMask: React.FC<LinearMaskProps> = ({
//   children,
//   className,
//   color = "#fff",
// }) => {
//   const maskImage = `linear-gradient(180deg,hsla(0,0%,100%,0),${color} 28.81%,${color} 75%,hsla(0,0%,100%,0))`;

//   const styles: CSSProperties = {
//     maskImage,
//     WebkitMaskImage: maskImage,
//   };

//   return (
//     <div style={styles} className={className}>
//       {children}
//     </div>
//   );
// };

interface Props {
  className?: string;
  children?: ReactNode;
}

const LinearMask: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "[mask:linear-gradient(180deg,transparent,#fff_30%,#fff_70%,transparent)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LinearMask;
