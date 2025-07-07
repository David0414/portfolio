import TitleHeader from "../components/TitleHeader";
import { techStackIcons } from "../constants";

const TechStack = () => {
  const isMobile = window.innerWidth < 768;
  const iconsToRender = isMobile ? techStackIcons.slice(0, 8) : techStackIcons;

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 xl:gap-8">
          {iconsToRender.map((techStackIcon, index) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-90"
            >
              <div className="tech-card-content flex flex-col items-center justify-center p-4">
                <div className="tech-icon-wrapper mb-3">
                  <img
                    src={techStackIcon.imgPath}
                    alt={techStackIcon.name}
                    className="tech-icon w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="text-center w-full">
                  <p className="text-lg md:text-xl text-white font-semibold">{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
