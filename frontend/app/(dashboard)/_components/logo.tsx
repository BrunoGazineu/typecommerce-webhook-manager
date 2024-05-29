import Image from 'next/image';
import logo from "@/public/images/logos/TypeCommerce.png"

export default function Logo() {
    return (
        <Image 
            height={29}
            width={160}
            priority={true}
            alt="Logo"
            src={logo}
        />
    )
}