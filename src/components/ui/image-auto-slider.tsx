import { Briefcase, Building2, GraduationCap, BadgeCheck, Sparkles } from 'lucide-react';

const placements = [
  {
    id: 1,
    name: 'K.B. Mohana Rajan',
    package: '₹3 Crore',
    dept: 'CSE',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80',
    companyIcon: <Globe className="w-4 h-4" />
  },
  {
    id: 2,
    name: 'Devi Sri S',
    package: '₹58 LPA',
    dept: 'ECE',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&q=80',
    companyIcon: <Building2 className="w-4 h-4" />
  },
  {
    id: 3,
    name: 'Kanishka R',
    package: '₹57 LPA',
    dept: 'Psychology',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&q=80',
    companyIcon: <Cpu className="w-4 h-4" />
  },
  {
    id: 4,
    name: 'Aditya S',
    package: '₹45 LPA',
    dept: 'CSE',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80',
    companyIcon: <Code className="w-4 h-4" />
  },
  {
    id: 5,
    name: 'Karthick Balashanmugam',
    package: '₹41 LPA',
    dept: 'CSE',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop&q=80',
    companyIcon: <Monitor className="w-4 h-4" />
  },
  {
    id: 6,
    name: 'R. Naveen Kumar',
    package: '₹35 LPA',
    dept: 'AI&DS',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&q=80',
    companyIcon: <Building2 className="w-4 h-4" />
  },
  {
    id: 7,
    name: 'Pradeep J',
    package: '₹21 LPA',
    dept: 'AI&DS',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&q=80',
    companyIcon: <Globe className="w-4 h-4" />
  },
  {
    id: 8,
    name: 'Janani K',
    package: '₹10 LPA',
    dept: 'ECE',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80',
    companyIcon: <Briefcase className="w-4 h-4" />
  }
];

// Re-import missing icons from lucide-react just in case
import { Globe, Cpu, Code, Monitor } from 'lucide-react';

export function ImageAutoSlider() {
  // Duplicate array for seamless infinite marquee
  const sliderItems = [...placements, ...placements];

  return (
    <div className="relative w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden rounded-3xl my-10 border border-white/5 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
      
      {/* Background Gradient & Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-400" />
          Elite Placements
          <Sparkles className="w-8 h-8 text-purple-400" />
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Our students secure top-tier roles at global tech giants. Discover the extraordinary talent emerging from our campus.
        </p>
      </div>

      <div className="relative flex items-center w-full">
        {/* Left/Right Edge Fade Overlays for seamless marquee look */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex w-full overflow-hidden group">
          <div className="flex items-center gap-6 md:gap-8 min-w-max animate-marquee group-hover:[animation-play-state:paused] pr-6 md:pr-8">
            {sliderItems.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                className="relative flex flex-col w-[280px] md:w-[320px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)]"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 rounded-full shadow-lg shadow-purple-900/50 border border-purple-400/30">
                    <BadgeCheck className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm tracking-wide">{item.package}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col gap-3 relative z-20 bg-black/40">
                  <h3 className="text-xl font-semibold text-white tracking-tight">{item.name}</h3>
                  
                  <div className="flex items-center gap-4 text-gray-300 text-sm">
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      <GraduationCap className="w-4 h-4 text-purple-400" />
                      <span>{item.dept}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      <span className="text-purple-400">{item.companyIcon}</span>
                      <span>Top Tier</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 25s;
          }
        }
      `}} />
    </div>
  );
}

export default ImageAutoSlider;
