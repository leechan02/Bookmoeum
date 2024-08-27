interface Button2Props {
  img?: string;
  label: string;
  onClick?: () => void;
}

export default function Button2({ img, label, onClick }: Button2Props) {
  return (
    <button
      className='w-[400px] inline-flex justify-center items-center gap-2 py-2 px-4 rounded-full bg-transparent border-secondary border-2'
      onClick={onClick}
    >
      {img && <img src={img} className='w-6 h-6 text-primary flex-shrink-0' />}
      <span className='text-primary font-medium text-base mt-0.5'>{label}</span>
    </button>
  );
}
