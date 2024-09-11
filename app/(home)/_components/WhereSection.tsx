import { FiBook, FiBox, FiHome } from "react-icons/fi";
import WhereInfo from "./WhereInfo";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface CustomImage {
  src: string;
  width: number;
  height: number;
}

interface WhereSectionProps {
  customImages?: CustomImage[];
}

const ImageMotion: React.FC<{ image: CustomImage; index: number }> = ({ image, index }) => {
  return (
    <motion.img 
      src={image.src}
      alt={`Icon ${index}`}
      className="rounded-full drop-shadow-md"
      style={{
        width: `${image.width}px`,
        height: `${image.height}px`,
      }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    />
  );
};

export default function WhereSection({ customImages }: WhereSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
    }
  }, [isInView, controls]);

  return (
    <div ref={sectionRef} className='min-h-screen flex flex-col justify-center items-center py-12 relative overflow-hidden'>
      <motion.div 
        className='grid place-items-center gap-3 md:gap-6 z-10'
        initial={{ opacity: 0, y: -50 }}
        animate={controls}
      >
        <div className='text-primary text-xs md:text-sm font-medium'>
          책을 찾아볼 수 있는 곳
        </div>
        <WhereInfo count={4} label='서점' Icon={FiBook} />
        <WhereInfo count='1,475' label='도서관' Icon={FiHome} />
        <WhereInfo count={1} label='전자책' Icon={FiBox} />
      </motion.div>
      
      {isInView && customImages && (
        <motion.div 
          className='flex justify-center items-center gap-4 mt-8 flex-wrap px-10'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {customImages.map((image, index) => (
            <ImageMotion key={index} image={image} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
}