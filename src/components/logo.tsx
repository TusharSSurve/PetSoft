import Image from "next/image";
import logo from '../../public/icon.svg'
import Link from "next/link";
export default function Logo() {
  return (
    <Link href='/'>
      <Image src={logo} alt="PetSoft Logo" />
    </Link>
  )
}
