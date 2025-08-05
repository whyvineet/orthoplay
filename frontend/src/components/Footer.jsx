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
    Trophy,
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
                {
                    name: "Leaderboard",
                    href: "/leaderboard",
                    icon: Trophy,
                    color: "text-yellow-400",
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
        <footer className={`${
            darkMode
                ? "bg-slate-900 text-gray-300"
                : "bg-gray-50 text-gray-600"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-sm">3D</span>
                            </div>
                            <h2 className={`text-xl font-bold ${
                                darkMode ? "text-white" : "text-gray-900"
                            }`}>
                                Orthoplay
                            </h2>
                        </div>
                        <p className={`max-w-md text-sm leading-6 ${
                            darkMode ? "text-gray-400" : "text-gray-600"
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
                                        darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Link Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className={`font-medium mb-4 text-sm ${
                                darkMode ? "text-gray-200" : "text-gray-800"
                            }`}>
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className={`text-sm transition-colors duration-200 flex items-center gap-2 ${
                                                darkMode
                                                    ? "text-gray-400 hover:text-gray-300"
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
                <div className={`border-t mt-8 pt-6 ${
                    darkMode ? "border-slate-700" : "border-gray-200"
                }`}>
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <div className={`text-center md:text-left text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                            <p>© {currentYear} Orthoplay. Made with ❤️ All rights reserved.</p>
                        </div>

                        <div className={`flex items-center space-x-4 text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;