const Footer = () => {
  return (
    <footer className="mt-48 py-24 bg-black text-white">
      <div className="reading-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-6">
            <div className="text-4xl font-extrabold tracking-tighter uppercase font-sans">
              SOFT <span className="text-gray-500 font-thin italic">LINES</span>
            </div>
            <p className="text-gray-400 text-xs font-black tracking-widest uppercase opacity-80">
              © {new Date().getFullYear()} Minimalist Archive. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-12">
            {['Twitter', 'GitHub', 'LinkedIn'].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500 hover:text-white transition-all duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
