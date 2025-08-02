import { SocialIcons } from './SocialIcons';
import portfolioData from '../data/portfolio.json';
import IMG from '../../public/sela/footer.png';

export const Footer = () => {
  return (
    <footer className="bg-background/80 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black flex flex-col justify-center items-center text-center space-y-6 w-full" style={{backgroundImage: `url(${IMG})`, height: '300px', backgroundSize: 'cover'}}>
          {/* Profile Image with Name Overlay */}
          {/* Available for Work Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className='text-white'>
            Available For Work</p>
          </div>
          
          {/* Email */}
          <div className="text-center">
            <a 
              href="mailto:phalsila93@gmail.com"
              className="text-2xl md:text-4xl font-bold text-foreground hover:text-primary transition-colors duration-300 underline decoration-primary/30 hover:decoration-primary text-white"
            >
              PHALSILA93@GMAIL.COM
            </a>
          </div>
        </div>
      </div>
      {/* Social Icons */}
          <div className="flex justify-center mt-20">
            <SocialIcons socialLinks={portfolioData.personal.socialLinks} />
          </div>
          
          {/* Copyright */}
          <div className="pt-8">
            <p className="text-foreground font-bold text-sm text-center">
              © 2025 Selafolio | All Right Reserved
            </p>
          </div>
    </footer>
  );
};