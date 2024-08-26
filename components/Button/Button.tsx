interface ButtonProps {
  Icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

export default function Button({ Icon, label, onClick }: ButtonProps) {
  return (
    <button
      className='inline-flex justify-center items-center gap-2 py-2 px-4 rounded-full bg-primary'
      onClick={onClick}
    >
      <Icon className='w-6 h-6 text-white flex-shrink-0' />
      <span className='text-white font-medium text-base mt-0.5'>{label}</span>
    </button>
  );
}
