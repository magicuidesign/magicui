import { anime } from 'react-anime'
import { cn } from "@/lib/utils"

const handleDotClick = (e: any, width: number, height: number) => {
    anime({
        targets: ".dot-point",
        scale: [
            { value: 1.35, easing: "easeOutSine", duration: 250 },
            { value: 1, easing: "easeInOutQuad", duration: 500 }
        ],
        translateY: [
            { value: -15, easing: "easeOutSine", duration: 250 },
            { value: 1, easing: "easeInOutQuad", duration: 500 }
        ],
        opacity: [
            { value: 0.7, easing: "easeOutSine", duration: 250 },
            { value: 0.35, easing: "easeInOutQuad", duration: 500 }
        ],
        delay: anime.stagger(100, {
            grid: [width, height],
            from: e.target.dataset.index
        })
    })
}

interface WavyDotPatternProps {
    className?: string
    gridWidth?: number
    gridHeight?: number
    dotWidth?: number,
    dotHeight?: number
}

export const WavyDotPattern = ({
    className,
    gridWidth,
    gridHeight,
    dotWidth,
    dotHeight
  }: WavyDotPatternProps) => {
    
    const GRID_WIDTH = gridWidth ? gridWidth : 30
    const GRID_HEIGHT = gridHeight ? gridHeight : 30

    const DOT_WIDTH = dotWidth ? "w-[" + dotWidth + "px]" : "w-[8px]"
    const DOT_HEIGHT = dotHeight ? "h-[" + dotHeight + "px]" : "h-[8px]"
  
    let index = 0;
    
    const dots = [];
  
    for (let i = 0; i < GRID_WIDTH; i++) {
      
        for (let j = 0; j < GRID_HEIGHT; j++) {
        dots.push(
          <div
            className = "p-[0.8rem] rounded-[8px]"
            onClick = { (e) => handleDotClick(e, GRID_WIDTH, GRID_HEIGHT) }
            data-index = { index }
            key = { `${i}-${j}` }
          >
            <div 
                className = { cn(
                    "dot-point", 
                    "rounded-xl opacity-35 bg-gradient-to-r from-[#d9cab3] to-black hover:from-black hover:to-black hover:opacity-100",
                    DOT_WIDTH,
                    DOT_HEIGHT
                )}
                data-index = { index }
            />
          </div>
        );
        index++;
      }
    }
  
    return (
      <div
        style = { { gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` } }
        className = { cn("z-0 absolute grid max-w-3/4", className) }
      >
        { dots.map((dot) => dot) }
      </div>
    );
  };
  

export default WavyDotPattern;