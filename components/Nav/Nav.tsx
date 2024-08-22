import Link from "next/link";
import Logo from "/public/Logo.svg"

export default function Nav() {
  return (
    <div>
      <Logo />
      <Link href="/"><a>홈</a></Link>
      
    </div>
  );
}

