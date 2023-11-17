import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface ParticlesProps {
  className?: string;
}

const Particles: React.FC<ParticlesProps> = ({ className, ...props }) => {
  return (
    <div
      style={
        {
          "--svg-animation":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 122 116'%3E%3Cpath id='b' stroke='%23fff' stroke-linecap='round' stroke-width='0' d='M17.9256 115C17.434 111.774 13.1701 104.086 13.4282 95.6465C13.6862 87.207 18.6628 76.0721 17.9256 64.3628C17.1883 52.6535 8.7772 35.9512 9.00452 25.3907C9.23185 14.8302 16.2114 5.06512 17.9256 1'%3E%3C/path%3E%3Cpath id='d' stroke='%23fff' stroke-linecap='round' stroke-width='0' d='M84.1628 115C85.2376 112.055 94.5618 98.8394 93.9975 91.1338C93.4332 83.4281 82.5505 73.2615 84.1628 62.5704C85.775 51.8793 96.4803 35.4248 95.9832 25.7826C95.4861 16.1404 87.9113 4.71163 84.1628 1'%3E%3C/path%3E%3Cpath id='f' stroke='%23fff' stroke-linecap='round' stroke-width='0' d='M37.0913 115C37.9604 111.921 44.4347 99.4545 45.3816 92.9773C48.9305 68.7011 35.7877 73.9552 37.0913 62.7781C38.3949 51.6011 47.3889 36.9895 46.9869 26.9091C46.585 16.8286 40.1222 4.88034 37.0913 1'%3E%3C/path%3E%3Cpath id='h' stroke='%23fff' stroke-linecap='round' stroke-width='0' d='M112.443 115C111.698 112.235 108.25 106.542 107.715 93.7582C107.241 82.4286 107.229 83.9543 112.443 66.1429C116.085 44.0408 100.661 42.5908 101.006 33.539C101.35 24.4871 109.843 4.48439 112.443 1'%3E%3C/path%3E%3Cg%3E%3Ccircle r='1.5' fill='%23D9D9D9'%3E%3CanimateMotion dur='12s' repeatCount='indefinite'%3E%3Cmpath href='%23b'%3E%3C/mpath%3E%3C/animateMotion%3E%3C/circle%3E%3C/g%3E%3Cg%3E%3Ccircle r='1' fill='%23fff' fill-opacity='1' shape-rendering='crispEdges'%3E%3CanimateMotion dur='8s' repeatCount='indefinite'%3E%3Cmpath href='%23d'%3E%3C/mpath%3E%3C/animateMotion%3E%3C/circle%3E%3C/g%3E%3Cg%3E%3Ccircle r='.5' fill='%23fff' fill-opacity='1' shape-rendering='crispEdges'%3E%3CanimateMotion dur='10s' repeatCount='indefinite'%3E%3Cmpath href='%23f'%3E%3C/mpath%3E%3C/animateMotion%3E%3C/circle%3E%3C/g%3E%3Cg%3E%3Ccircle r='.8' fill='%23fff' fill-opacity='1' shape-rendering='crispEdges'%3E%3CanimateMotion dur='6s' repeatCount='indefinite'%3E%3Cmpath href='%23h'%3E%3C/mpath%3E%3C/animateMotion%3E%3C/circle%3E%3C/g%3E%3C/svg%3E\")",
        } as CSSProperties
      }
      className={cn(
        "[--halo-opacity:0.7]",
        `absolute h-full w-full bg-[100%_100%,_50%] opacity-[var(--halo-opacity)] [mask:linear-gradient(to_top,_transparent,_black,_transparent)]`,
        "[background-position:center,center_top_100%] [background-repeat:no-repeat,repeat] [background-size:100%_100%,50%] [background:var(--svg-animation),var(--svg-animation)]",
        className,
      )}
      {...props}
    />
  );
};

export default Particles;
