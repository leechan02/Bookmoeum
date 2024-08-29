"use client";
import { FiBook, FiBox, FiHome } from "react-icons/fi";
import WhereInfo from "./WhereInfo";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function WhereSection() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: ['-40%', '0%', '40%', '0%', '-40%'],
        y: ['-40%', '40%', '-40%', '40%', '-40%'],
        transition: {
          x: {
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          },
          y: {
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          },
          opacity: { duration: 0.5 }
        }
      });
    } else {
      controls.start({
        opacity: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [isInView, controls]);

  return (
    <div ref={sectionRef} className='min-h-screen flex justify-center items-center py-12 relative overflow-hidden'>
      <motion.img 
        src="/IconMille.svg" 
        alt="Background Icon" 
        className="absolute w-16 h-16 rounded-full"
        style={{
          right: '20%',  // 오른쪽에서 10% 떨어진 위치
          top: '25%',    // 위에서 25% 떨어진 위치
        }}
        initial={{ opacity: 0 }}
        animate={controls}
      />
      <div className='grid place-items-center gap-3 md:gap-6 z-10'>
        <div className='text-primary text-xs md:text-sm font-medium'>
          책을 찾아볼 수 있는 곳
        </div>
        <WhereInfo count={4} label='서점' Icon={FiBook} />
        <WhereInfo count='1,475' label='도서관' Icon={FiHome} />
        <WhereInfo count={2} label='전자책' Icon={FiBox} />
      </div>
    </div>
  );
}