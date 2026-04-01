import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

const AutoCarousel = React.forwardRef(
  (
    {
      images = [],
      interval = 4000,
      showControls = true,
      showDots = true,
      className,
      imageClassName,
      overlayContent,
      autoPlay = true,
      fadeTransition = true,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(autoPlay);
    const [isHovered, setIsHovered] = React.useState(false);
    const timerRef = React.useRef(null);

    const scrollTo = React.useCallback(
      (index) => {
        if (emblaApi) emblaApi.scrollTo(index);
      },
      [emblaApi]
    );

    const scrollPrev = React.useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const togglePlayPause = React.useCallback(() => {
      setIsPlaying((prev) => !prev);
    }, []);

    React.useEffect(() => {
      if (!emblaApi) return;

      const onSelect = () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("select", onSelect);
      onSelect();

      return () => {
        emblaApi.off("select", onSelect);
      };
    }, [emblaApi]);

    React.useEffect(() => {
      if (!isPlaying || isHovered) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      timerRef.current = setInterval(() => {
        scrollNext();
      }, interval);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [isPlaying, isHovered, interval, scrollNext]);

    React.useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") scrollPrev();
        if (e.key === "ArrowRight") scrollNext();
        if (e.key === " ") {
          e.preventDefault();
          togglePlayPause();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [scrollPrev, scrollNext, togglePlayPause]);

    if (!images || images.length === 0) {
      return (
        <div className={cn("flex items-center justify-center bg-muted h-96", className)}>
          <p className="text-muted-foreground">No images available</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("relative group", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div ref={emblaRef} className="overflow-hidden w-full h-full">
          <div className="flex h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 relative"
                style={{ height: "100%" }}
              >
                <AnimatePresence mode="wait">
                  {fadeTransition && currentIndex === index ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <img
                        src={image.src || image}
                        alt={image.alt || `Slide ${index + 1}`}
                        className={cn(
                          "w-full h-full object-cover",
                          imageClassName
                        )}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </motion.div>
                  ) : (
                    <img
                      src={image.src || image}
                      alt={image.alt || `Slide ${index + 1}`}
                      className={cn(
                        "w-full h-full object-cover",
                        imageClassName
                      )}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  )}
                </AnimatePresence>
                {overlayContent && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {typeof overlayContent === "function"
                      ? overlayContent(image, index)
                      : overlayContent}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {showControls && images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </>
        )}

        {showDots && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

AutoCarousel.displayName = "AutoCarousel";

export { AutoCarousel };
