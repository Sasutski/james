'use client';

import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

const BlockGenerator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Get background color based on color scheme
  const getBackgroundColor = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? '#121212' : '#f8f8f8';
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Clean up previous sketch if it exists
    if (sketchRef.current) {
      sketchRef.current.remove();
    }

    // Create new p5 sketch
    const sketch = (p: p5) => {
      // Configuration
      const isDark = getBackgroundColor() === '#121212';
      let cellSize = 36; // Slightly smaller cells to fit more
      const cols = 16; // Increased from 12 to 16 for more horizontal blocks
      const rows = 6; // Kept the same number of rows
      const blocks: Block[] = [];
      let time = 0;
      let lastClickTime = 0;
      let clickPosition = { x: 0, y: 0 };
      let isAnimating = false;

      // Height limit - used for smooth transitions near max height
      const MAX_HEIGHT = 80;

      // Vertical offset to move blocks higher (reduced from 0.75 to 0.6)
      const verticalOffset = 0.6;

      // Calculate appropriate cell size based on container width
      const calculateCellSize = () => {
        const containerWidth = containerRef.current?.offsetWidth || 600;
        return Math.min(36, containerWidth / (cols * 1.2) - 2);
      };

      class Block {
        x: number;
        y: number;
        height: number;
        targetHeight: number;
        baseHeight: number;
        hue: number;
        colorOffset: number;
        phase: number;

        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
          // Reduce initial heights to keep blocks from being too tall
          this.baseHeight = p.map(p.noise(x * 0.3, y * 0.3), 0, 1, 5, 25);
          this.height = 0;
          this.targetHeight = this.baseHeight;
          this.hue = p.map(p.noise(x * 0.1, y * 0.1, 100), 0, 1, 0, 360);
          this.colorOffset = p.random(0, 20);
          this.phase = p.random(0, p.TWO_PI);
        }

        update() {
          // Smooth animation to target height with easing near the max
          const diff = this.targetHeight - this.height;

          // Apply different lerp rates based on proximity to max height
          // This creates a smoother transition when approaching the max height
          if (this.targetHeight > MAX_HEIGHT * 0.8 || this.height > MAX_HEIGHT * 0.8) {
            // Slower, gentler approach when near max height
            this.height = p.lerp(this.height, this.targetHeight, 0.05);
          } else {
            // Normal approach otherwise
            this.height = p.lerp(this.height, this.targetHeight, 0.1);
          }

          // Apply wave effect on click
          const distance = p.dist(
            clickPosition.x,
            clickPosition.y,
            p.width / 2 + (this.x - this.y) * cellSize,
            Math.max(
              30,
              p.height * verticalOffset + (this.x + this.y) * cellSize / 4 - this.height
            )
          );
          const timeSinceClick = p.millis() - lastClickTime;

          if (timeSinceClick < 1500) {
            const waveRadius = timeSinceClick / 4;
            const waveWidth = 100;
            if (distance > waveRadius - waveWidth && distance < waveRadius) {
              const waveStrength = p.map(distance, waveRadius - waveWidth, waveRadius, 1, 0);

              // Calculate wave height but apply it smoothly
              const rawWaveHeight =
                35 *
                waveStrength *
                p.sin(p.map(distance, waveRadius - waveWidth, waveRadius, 0, p.PI));

              // Smoother application of wave height
              const availableSpace = MAX_HEIGHT - this.height;
              const safeWaveHeight =
                availableSpace > 0 ? Math.min(rawWaveHeight, availableSpace * 0.8) : 0;

              this.height += safeWaveHeight;
              isAnimating = true;
            }
          }

          // Apply subtle breathing effect with decreased amplitude near max height
          const breathingFactor = p.map(this.height, 0, MAX_HEIGHT, 1, 0.2);
          this.height += p.sin(time * 0.8 + this.phase) * 1.5 * breathingFactor;

          // Soft constraint to gradually approach limit rather than hard stop
          if (this.height > MAX_HEIGHT) {
            const excess = this.height - MAX_HEIGHT;
            this.height = MAX_HEIGHT + excess * 0.2; // Allow slight overshoot with dampening
          }

          // Ensure we never go below zero
          if (this.height < 0) this.height = 0;
        }

        draw() {
          // Calculate screen position with padding to keep blocks in view
          // Add minimum top padding to ensure blocks don't hit the ceiling
          const padding = cellSize * 2;
          const topPadding = 30; // Minimum pixels from the top
          const screenX = p.width / 2 + (this.x - this.y) * cellSize;
          const screenY = Math.max(
            topPadding,
            p.height * verticalOffset + (this.x + this.y) * cellSize / 4 - this.height
          );

          // Skip rendering if block is outside the visible area with some margin
          if (
            screenX < -padding ||
            screenX > p.width + padding ||
            screenY < -padding ||
            screenY > p.height + padding
          ) {
            return;
          }

          // Calculate isometric positions
          const topLeft = { x: screenX - cellSize / 2, y: screenY - cellSize / 4 };
          const topRight = { x: screenX + cellSize / 2, y: screenY - cellSize / 4 };
          const bottomRight = { x: screenX + cellSize / 2, y: screenY + cellSize / 4 };
          const bottomLeft = { x: screenX - cellSize / 2, y: screenY + cellSize / 4 };

          // Choose color based on theme and position
          p.colorMode(p.HSB);

          let baseColor;
          if (isDark) {
            // More vibrant colors for dark mode
            baseColor = p.color(
              (this.hue + this.colorOffset + time * 2) % 360,
              70,
              65 + this.height / 5,
              0.9
            );
          } else {
            // Softer colors for light mode
            baseColor = p.color(
              (this.hue + this.colorOffset + time * 2) % 360,
              45,
              90 - this.height / 10,
              0.85
            );
          }

          // Top face
          p.fill(baseColor);
          p.noStroke();
          p.beginShape();
          p.vertex(topLeft.x, topLeft.y);
          p.vertex(topRight.x, topRight.y);
          p.vertex(bottomRight.x, bottomRight.y);
          p.vertex(bottomLeft.x, bottomLeft.y);
          p.endShape(p.CLOSE);

          // Only draw sides if height is significant
          if (this.height > 3) {
            // Right face
            const rightShade = p.color(
              p.hue(baseColor),
              p.saturation(baseColor),
              p.brightness(baseColor) * 0.8
            );
            p.fill(rightShade);
            p.beginShape();
            p.vertex(bottomRight.x, bottomRight.y);
            p.vertex(bottomRight.x, bottomRight.y + this.height);
            p.vertex(screenX, screenY + this.height + cellSize / 4);
            p.vertex(bottomLeft.x, bottomLeft.y + this.height);
            p.vertex(bottomLeft.x, bottomLeft.y);
            p.endShape(p.CLOSE);

            // Left face
            const leftShade = p.color(
              p.hue(baseColor),
              p.saturation(baseColor),
              p.brightness(baseColor) * 0.6
            );
            p.fill(leftShade);
            p.beginShape();
            p.vertex(topLeft.x, topLeft.y);
            p.vertex(topLeft.x, topLeft.y + this.height);
            p.vertex(bottomLeft.x, bottomLeft.y + this.height);
            p.vertex(bottomLeft.x, bottomLeft.y);
            p.endShape(p.CLOSE);
          }
        }

        randomize() {
          // Lower the maximum height to prevent blocks from reaching too high
          this.baseHeight = p.map(
            p.noise(this.x * 0.5 + time, this.y * 0.5 + time),
            0,
            1,
            8, // Slightly lower minimum
            40 // Keep same maximum
          );

          // Apply smooth transition to new target height
          this.targetHeight = this.baseHeight;
          this.colorOffset = p.random(0, 30);
        }
      }

      function createBlocks() {
        blocks.length = 0;
        cellSize = calculateCellSize();

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            // Use an elliptical pattern instead of circular for more blocks on sides
            // (x/a)² + (y/b)² < 1 where a and b are the semi-major and semi-minor axes
            const ellipseX = (x - cols / 2) / (cols / 1.8); // Wider horizontally
            const ellipseY = (y - rows / 2) / (rows / 2);
            const distFromCenter = ellipseX * ellipseX + ellipseY * ellipseY;

            if (distFromCenter < 1) {
              blocks.push(new Block(x - cols / 2, y - rows / 2));
            }
          }
        }

        // Fill in some of the gaps at the edges for a fuller look
        for (let i = 0; i < 10; i++) {
          // Add some random blocks just outside the ellipse
          const randX = p.random(-cols / 2, cols / 2);
          const randY = p.random(-rows / 2, rows / 2);

          const ellipseX = randX / (cols / 1.8);
          const ellipseY = randY / (rows / 2);
          const distFromCenter = ellipseX * ellipseX + ellipseY * ellipseY;

          if (distFromCenter >= 1 && distFromCenter < 1.2) {
            blocks.push(new Block(randX, randY));
          }
        }
      }

      function randomizeBlocks() {
        p.noiseSeed(p.millis()); // Regenerate noise pattern
        blocks.forEach((block) => block.randomize());
        isAnimating = true;
      }

      p.setup = () => {
        p.createCanvas(containerRef.current!.offsetWidth, 300);
        p.colorMode(p.HSB);
        p.noStroke();
        p.smooth();

        // Initialize noise
        p.noiseSeed(p.random(10000));
        createBlocks();

        // Initial animation
        lastClickTime = p.millis();
        clickPosition = { x: p.width / 2, y: p.height * verticalOffset };

        // Setup mouse click handler
        p.mouseClicked = () => {
          if (
            p.mouseX > 0 &&
            p.mouseX < p.width &&
            p.mouseY > 0 &&
            p.mouseY < p.height
          ) {
            lastClickTime = p.millis();
            clickPosition = { x: p.mouseX, y: p.mouseY };
            randomizeBlocks();
            return false;
          }
        };
      };

      p.draw = () => {
        p.background(getBackgroundColor());
        time = p.millis() * 0.001; // Time in seconds

        // Sort blocks by position for proper rendering (isometric sorting)
        blocks.sort((a, b) => a.x + a.y - (b.x + b.y));

        // Update and draw all blocks
        blocks.forEach((block) => {
          block.update();
          block.draw();
        });

        // Check if animation is complete
        isAnimating = false;
        for (const block of blocks) {
          if (Math.abs(block.height - block.targetHeight) > 0.5) {
            isAnimating = true;
            break;
          }
        }

        // If no animation is happening, we can reduce frame rate to save CPU
        if (!isAnimating) {
          p.frameRate(30);
        } else {
          p.frameRate(60);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(containerRef.current!.offsetWidth, 300);
        createBlocks();
      };
    };

    // Initialize the sketch
    sketchRef.current = new p5(sketch, containerRef.current!);

    // Force a resize after the DOM settles
    setTimeout(() => {
      if (sketchRef.current) {
        sketchRef.current.resizeCanvas(containerRef.current!.offsetWidth, 300);
      }
    }, 100);

    // Cleanup function
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (sketchRef.current) {
        sketchRef.current.resizeCanvas(containerRef.current!.offsetWidth, 300);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[300px] mb-8 cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative bg-transparent"
      aria-label="Interactive block pattern generator - click to regenerate"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering && (
        <div
          className="absolute bg-black/75 text-white px-3 py-1 rounded text-sm pointer-events-none select-none"
          style={{
            left: `${hoverPosition.x + 10}px`,
            top: `${hoverPosition.y + 10}px`,
            opacity: 0.9,
            backdropFilter: 'blur(4px)',
            transform: 'translateZ(0)',
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          <b>Interactive blocks</b> - click to respond
        </div>
      )}
    </div>
  );
};

export default BlockGenerator;