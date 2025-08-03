import FB from '../../public/sela/facebook.png';
import TG from '../../public/sela/telegram.png';
import LI from '../../public/sela/linkedin.png';
import BE from '../../public/sela/behance.svg';

interface SocialIconsProps {
  socialLinks: {
    linkedin: string;
    telegram: string;
    facebook: string;
    behance: string;
  };
}

export const SocialIcons = ({ socialLinks }: SocialIconsProps) => {
  const icons = [
    { icon: LI, link: socialLinks.linkedin, color: "#1075B5" },
    { icon: TG, link: socialLinks.telegram, color: "#2EACE0" },
    { 
      icon: BE, 
      link: socialLinks.behance, 
      color: "#1669FE" 
    },
    { icon: FB, link: socialLinks.facebook, color: "#006CE4" },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {icons.map(({ icon: Icon, link, color }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={`rounded-full ${index === 3 ? 'bg-gradient-to-t from-[#0064E2] to-[#2FB2FF]' : ''}`} style={{ backgroundColor: color, width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img alt="social" src={Icon} className='w-6 h-6 rounded-full' />
          </div>
        </a>
      ))}
    </div>
  );
};