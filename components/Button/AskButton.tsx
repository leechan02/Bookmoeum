import { FiMail } from "react-icons/fi";
import IconButton from "./IconButton";

export default function AskButton() {
  const handleClick = () => {
    window.open('https://forms.gle/qRPP8pUUy3n7j8Ct6', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='fixed bottom-7 right-7 sm:bottom-10 sm:right-10 z-50 drop-shadow-md rounded-full opacity-95'>
      <IconButton
        icon={FiMail}
        iconSize={64}
        iconColor='primary'
        bgColor='secondary'
        onClick={handleClick}
      />
    </div>
  );
}