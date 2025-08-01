import { SocialIcons } from './SocialIcons';
import portfolioData from '../data/portfolio.json';

export const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Available for Work Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Available For Work
          </div>
          
          {/* Email */}
          <div className="text-center">
            <a 
              href="mailto:phalsila93@gmail.com"
              className="text-2xl md:text-4xl font-bold text-foreground hover:text-primary transition-colors duration-300 underline decoration-primary/30 hover:decoration-primary"
            >
              PHALSILA93@GMAIL.COM
            </a>
          </div>
          
          {/* Social Icons */}
          <div className="flex justify-center">
            <SocialIcons socialLinks={portfolioData.personal.socialLinks} />
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-border/30">
            <p className="text-muted-foreground text-sm">
              © 2024 {portfolioData.personal.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};