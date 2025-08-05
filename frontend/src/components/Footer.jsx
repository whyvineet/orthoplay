import React, { useContext } from 'react';
import {
    Github,
    Linkedin,
    Instagram,
    Mic,
    Book,
    Smile,
    Users,
    Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { darkMode } = useContext(ThemeContext);

    const socialLinks = [
        {
            name: "Instagram",
            href: "https://instagram.com/whyvineet",
            icon: Instagram,
            color: "hover:text-pink-400",
        },
        {
            name: "GitHub",
            href: "https://github.com/whyvineet/orthoplay",
            icon: Github,
            color: darkMode ? "hover:text-white" : "hover:text-gray-900",
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/whyvineet",
            icon: Linkedin,
            color: "hover:text-blue-400",
        },
    ];

    const footerLinks = [
        {
            title: "Game",
            links: [
                {
                    name: "Play",
                    href: "/",
                    icon: Mic,
                    color: "text-indigo-400",
                },
                {
                    name: "How To Play",
                    href: "/how-to-play",
                    icon: Book,
                    color: "text-blue-400",
                },
            ],
        },
        {
            title: "About",
            links: [
                {
                    name: "About Us",
                    href: "/about",
                    icon: Smile,
                    color: "text-yellow-400",
                },
                {
                    name: "Our contributors",
                    href: "/our-contributors",
                    icon: Users,
                    color: "text-green-400",
                },
            ],
        },
    ];

    return (
        <footer className={`pt-12 pb-6 ${
            darkMode 
                ? "bg-gray-900/70 text-gray-300" 
                : "bg-white/50 text-gray-600"
        }`}>
            <div className="max-w-6xl mx-auto px-4">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                            Orthoplay
                        </h2>
                        <p className={`mt-4 max-w-md ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                            Orthoplay is a voice-based word learning game designed to make
                            vocabulary building fun and engaging. Hear the word, guess the
                            spelling, and learn as you play!
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`transition-colors duration-200 ${social.color} ${
                                        darkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Link Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className={`font-semibold mb-4 ${
                                darkMode ? "text-gray-200" : "text-gray-800"
                            }`}>
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className={`hover:text-gray-900 transition-colors duration-200 flex items-center gap-2 group ${
                                                darkMode 
                                                    ? "text-gray-300 hover:text-gray-100" 
                                                    : "text-gray-600 hover:text-gray-900"
                                            }`}
                                        >
                                            <link.icon
                                                className={`w-4 h-4 ${link.color}`}
                                            />
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className={`border-t mt-8 pt-8 ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                }`}>
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className={`text-center md:text-left text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                            <p>© {currentYear} Orthoplay. All rights reserved.</p>
                        </div>

                        <div className={`flex items-center text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                            <span>Made with</span>
                            <Heart className="w-4 h-4 mx-1 text-red-500" />
                            <span>
                                by{" "}
                                <a
                                    href="https://github.com/whyvineet/orthoplay"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`hover:text-blue-600 transition-colors ${
                                        darkMode ? "text-blue-400" : "text-blue-500"
                                    }`}
                                >
                                    Vineet Kumar
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;