import { Linkedin, Send, Facebook, LinkedinIcon } from "lucide-react";

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
    { icon: LinkedinIcon, link: socialLinks.linkedin, color: "bg-blue-600" },
    { icon: Send, link: socialLinks.telegram, color: "bg-blue-500" },
    { icon: Facebook, link: socialLinks.facebook, color: "bg-blue-700" },
    { 
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.48.598.41.27.733.62.97 1.05.236.43.354.95.354 1.56 0 .36-.076.68-.228.96-.15.28-.35.52-.6.72-.25.2-.54.37-.87.51-.33.14-.68.25-1.05.33v.03c.44.13.84.28 1.2.45.36.17.67.37.93.6.26.23.46.49.6.78.14.29.21.61.21.96 0 .75-.22 1.4-.66 1.95-.44.55-1.01.98-1.71 1.29-.7.31-1.47.47-2.31.47-.83 0-1.58-.16-2.26-.47-.68-.31-1.23-.74-1.65-1.29-.42-.55-.63-1.2-.63-1.95 0-.35.07-.67.21-.96.14-.29.34-.55.6-.78.26-.23.57-.43.93-.6.36-.17.76-.32 1.2-.45v-.03c-.37-.08-.72-.19-1.05-.33-.33-.14-.62-.31-.87-.51-.25-.2-.45-.44-.6-.72-.15-.28-.23-.6-.23-.96 0-.61.12-1.13.35-1.56.24-.43.56-.79.97-1.05.4-.27.88-.48 1.44-.63.56-.15 1.15-.23 1.77-.23zm-.69 2.58c-.57 0-1.03.15-1.38.45-.35.3-.53.71-.53 1.23 0 .52.18.93.53 1.23.35.3.81.45 1.38.45.56 0 1.02-.15 1.37-.45.35-.3.53-.71.53-1.23 0-.52-.18-.93-.53-1.23-.35-.3-.81-.45-1.37-.45zm.05 7.5c.61 0 1.11-.16 1.5-.47.39-.31.58-.76.58-1.34 0-.58-.19-1.03-.58-1.34-.39-.31-.89-.47-1.5-.47-.6 0-1.1.16-1.49.47-.39.31-.58.76-.58 1.34 0 .58.19 1.03.58 1.34.39.31.89.47 1.49.47z"/>
        </svg>
      ), 
      link: socialLinks.behance, 
      color: "bg-purple-600" 
    },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {icons.map(({ icon: Icon, link, color }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-icon w-10 h-10 ${color} rounded-full flex items-center justify-center text-white`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};