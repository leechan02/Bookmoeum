"use client";
import { FiBook, FiBox, FiHome } from "react-icons/fi";
import WhereInfo from "./WhereInfo";
import { motion, useAnimation, useInView, AnimationControls } from "framer-motion";
import { useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface CustomImage {
  src: string;
  width: number;
  height: number;
}

interface ImageMotionProps {
  position: Position;
  index: number;
  image: CustomImage;
}

const createRandomPositions = (count: number, maxWidth: number, maxHeight: number): Position[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * maxWidth - maxWidth / 2,
    y: Math.random() * maxHeight - maxHeight / 2,
  }));
};

const customPositions: Position[] = [
  { x: 0, y: 100 },
  { x: 0, y: -120 },
  { x: 100, y: 100 },
  { x: -100, y: 100 },
  { x: 100, y: -100 },
  { x: -100, y: -100 },
  { x: 150, y: 0 },
  { x: 250, y: 50 },
  { x: -250, y: -50 },
  { x: -300, y: 100 },
  { x: 300, y: -100 },
  { x: 200, y: 150 },
  { x: -200, y: 160 },
  { x: 200, y: -200 },
  { x: -200, y: -200 },
];

const ImageMotion: React.FC<ImageMotionProps> = ({ position, index, image }) => {
  const controls: AnimationControls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: [position.x, position.x + (Math.random() - 0.5) * 50, position.x],
      y: [position.y, position.y + (Math.random() - 0.5) * 50, position.y],
      transition: {
        x: {
          repeat: Infinity,
          duration: 5 + Math.random() * 5,
          ease: "easeInOut",
        },
        y: {
          repeat: Infinity,
          duration: 5 + Math.random() * 5,
          ease: "easeInOut",
        },
        opacity: { duration: 0.5 }
      }
    });
  }, [controls, position]);

  return (
    <motion.img 
      src={image.src}
      alt={`Background Icon ${index}`}
      className="absolute rounded-full drop-shadow-md"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        width: `${image.width}px`,
        height: `${image.height}px`,
      }}
      initial={{ opacity: 0 }}
      animate={controls}
    />
  );
};

interface WhereSectionProps {
  useRandomPositions?: boolean;
  customImages?: CustomImage[];
}

export default function WhereSection({ useRandomPositions = false, customImages }: WhereSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const positions = useRandomPositions
    ? createRandomPositions(8, 400, 400)
    : customPositions;

  const defaultImage: CustomImage = { src: "/IconMille.svg", width: 64, height: 64 };
  const images = customImages || Array(14).fill(defaultImage);

  return (
    <div ref={sectionRef} className='min-h-screen flex justify-center items-center py-12 relative overflow-hidden'>
      {isInView && positions.map((position, index) => (
        <ImageMotion 
          key={index} 
          position={position} 
          index={index} 
          image={images[index] || defaultImage}
        />
      ))}
      <div className='grid place-items-center gap-3 md:gap-6 z-10'>
        <div className='text-primary text-xs md:text-sm font-medium'>
          책을 찾아볼 수 있는 곳
        </div>
        <WhereInfo count={4} label='서점' Icon={FiBook} />
        <WhereInfo count='1,475' label='도서관' Icon={FiHome} />
        <WhereInfo count={1} label='전자책' Icon={FiBox} />
      </div>
    </div>
  );
}