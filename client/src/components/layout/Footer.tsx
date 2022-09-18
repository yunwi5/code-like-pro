import React from 'react';
import { Link } from 'react-router-dom';
import { AppProperty } from '../../constants/app';
import {
    FacebookIcon,
    InstagramIcon,
    GithubIcon,
    TwitterIcon,
} from '../../assets/svg-icons/social-svgs';
import HoverLabel from '../ui/labels/HoveringLabel';
import { Logo } from '../../assets';
import useWindowSize from '../../hooks/useWindowSize';

// Footer links do not have real links at the moment.
// Main purpose is to avoid duplicated styles.
const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Assessment', href: '#' },
    { label: 'Contest', href: '#' },
    { label: 'Rankings', href: '#' },
];

// List of social links and corresponding icons.
const iconWidth = '42px';
const socialIcons = [
    { icon: <InstagramIcon width={iconWidth} />, label: 'Instagram' },
    { icon: <FacebookIcon width={iconWidth} />, label: 'Facebook' },
    { icon: <TwitterIcon width={iconWidth} />, label: 'Twitter' },
    { icon: <GithubIcon width={iconWidth} />, label: 'GitHub' },
];

// Will need to include the logo in front, as soon as we design an app logo.
const Footer: React.FC = () => {
    const { width } = useWindowSize();

    return (
        <footer className="relative z-[100] flex-between flex-col lg:flex-row gap-y-3 lg:px-[4.5%] xl:px-[6.5%] py-3 border-t-2 border-gray-200 ">
            <h2 className="logo flex-start flex-col lg:flex-row gap-1 text-2xl !text-main-400">
                {/* Display large logo for smaller screen (since the layout is a column layout), display small logo for large screen */}
                <Logo size={width < 1024 ? 42 : 25} />
                {AppProperty.APP_NAME}
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-x-5 lg:ml-5 lg:mr-auto">
                <p className="whitespace-nowrap text-gray-500/90">
                    Copyright &copy; 2022 JIADY CS 399
                </p>
                <div className="flex gap-4 text-gray-600">
                    {footerLinks.map((link, idx) => (
                        <Link key={idx} className="link-underline-effect" to={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
            <ul className="flex gap-2">
                {socialIcons.map((social, idx) => (
                    <li className="cursor-pointer" key={idx}>
                        <SocialIcon {...social} />
                    </li>
                ))}
            </ul>
        </footer>
    );
};

interface SocialIconProps {
    icon: React.ReactNode;
    label: string;
    href?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, label, href }) => {
    return (
        <HoverLabel
            label={
                <Link to={href ?? '#'} className="hover:text-yellow-300">
                    {label}
                </Link>
            }
        >
            <div className="transition-all hover:scale-110 hover:brightness-125">{icon}</div>
        </HoverLabel>
    );
};

export default Footer;
