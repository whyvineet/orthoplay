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

const Footer = () => {
    const currentYear = new Date().getFullYear();

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
            color: "hover:text-gray-900",
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
                    href: "/",
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
        <footer className=" text-gray-600 pt-12 pb-6" style={{backgroundColor:"#e2e6ebff"}}>
            <div className="max-w-6xl mx-auto px-4 ">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                            Orthoplay
                        </h2>
                        <p className="mt-4 text-gray-600max-w-md">
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
                                    className={`text-gray-500  transition-colors duration-200 ${social.color}`}
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Link Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-gray-800 font-semibold mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2 group"
                                        >
                                            <link.icon
                                                className={`w-4 h-4 ${link.color}`}
                                            />
                                            <span>{link.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left text-sm text-gray-500 ">
                            <p>© {currentYear} Orthoplay. All rights reserved.</p>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 mx-1 text-red-500" />
                            <span>
                                by{" "}
                                <a
                                    href="https://github.com/whyvineet/orthoplay"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-600 transition-colors"
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
