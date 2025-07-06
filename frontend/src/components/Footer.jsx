const Footer = () => {
    return (
        <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-12 rounded-b-3xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="text-center text-gray-600">
                    <p className="text-xs sm:text-sm">
                        Made with ❤️ by{' '}
                        <a
                            href="https://github.com/whyvineet/orthoplay"
                            className="underline hover:text-gray-800 transition-colors"
                        >
                            Vineet Kumar
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
