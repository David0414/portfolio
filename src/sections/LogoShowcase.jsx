import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img
        src={icon.imgPath}
        alt={icon.name}
        className="w-20 h-20 object-contain md:w-28 md:h-28"
        loading="lazy"
      />
    </div>
  );
};

const LogoShowcase = () => (
  <div className="my-10 md:my-20 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      <div className="gradient-edge left-0" />
      <div className="gradient-edge right-0" />
    </div>

    <div className="marquee h-36 md:h-52">
      <div className="marquee-box flex items-center animate-marquee gap-5 md:gap-12">
        {[...logoIconsList, ...logoIconsList].map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
