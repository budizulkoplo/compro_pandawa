import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            width={24}
            height={24}
            src="/images/logo-removebg.png"
            alt="App Logo"
            {...props}
        />
    );
}
