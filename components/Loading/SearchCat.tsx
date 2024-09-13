export default function SearchCat() {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <video autoPlay loop muted playsInline width={300} height={300}>
        <source src='/video/SearchCat.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className="font-bold text-primary text-xl md:text-3xl">책 찾는 중...</div>
    </div>
  );
}
