import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mail, MapPin, ExternalLink, Github, Linkedin, Briefcase, Cpu, Code, Award, ArrowDown, Copy, Check } from 'lucide-react';
import Lenis from 'lenis';
import CanvasBackground from './components/CanvasBackground';
import { RESUME_DATA } from './constants';

// --- Types & Data Flattening ---
type SectionType = 'HERO' | 'SECTION_TITLE' | 'EXPERIENCE' | 'PROJECT' | 'SKILLS' | 'EDUCATION' | 'CONTACT';

interface HelixItem {
  id: number;
  type: SectionType;
  data: any;
  label: string;
}

const flattenData = (): HelixItem[] => {
  let items: HelixItem[] = [];
  let idCounter = 0;

  // 1. Hero
  items.push({ id: idCounter++, type: 'HERO', data: RESUME_DATA.personal, label: '00' });

  // 2. Experience Section
  items.push({ id: idCounter++, type: 'SECTION_TITLE', data: { title: 'EXPERIENCE' }, label: '01' });
  RESUME_DATA.experience.forEach((exp, i) => {
    items.push({ id: idCounter++, type: 'EXPERIENCE', data: exp, label: `01.${i+1}` });
  });

  // 3. Projects Section
  items.push({ id: idCounter++, type: 'SECTION_TITLE', data: { title: 'PROJECTS' }, label: '02' });
  RESUME_DATA.projects.forEach((proj, i) => {
    items.push({ id: idCounter++, type: 'PROJECT', data: proj, label: `02.${i+1}` });
  });

  // 4. Skills Section
  items.push({ id: idCounter++, type: 'SECTION_TITLE', data: { title: 'SKILLS' }, label: '03' });
  items.push({ id: idCounter++, type: 'SKILLS', data: RESUME_DATA.skills, label: '03.1' });

  // 5. Education Section
  items.push({ id: idCounter++, type: 'SECTION_TITLE', data: { title: 'EDUCATION' }, label: '04' });
  items.push({ id: idCounter++, type: 'EDUCATION', data: { edu: RESUME_DATA.education, ach: RESUME_DATA.achievements }, label: '04.1' });

  // 6. Contact
  items.push({ id: idCounter++, type: 'CONTACT', data: RESUME_DATA.personal, label: '05' });

  return items;
};

// --- Spring Config ---
const SPACING = 800;       // Distance between items
const ANGLE_PER_ITEM = 90; // 90 degrees turn per item
const RADIUS = 600;        // Radius of the spiral

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const items = useMemo(() => flattenData(), []);
  const lenisRef = useRef<Lenis | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      setScrollProgress(lenis.scroll);
      requestAnimationFrame(raf);
    }

    const animationFrameId = requestAnimationFrame(raf);
    
    // Simulate load for smooth entry
    setTimeout(() => setIsLoaded(true), 100);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // World Calculation
  const currentItemIndexFloat = scrollProgress / SPACING;
  const worldTranslateY = -scrollProgress;
  const worldRotationY = -currentItemIndexFloat * ANGLE_PER_ITEM;
  const worldTranslateZ = -RADIUS; 

  const verticalCenterOffset = typeof window !== 'undefined' ? window.innerHeight * 0.45 : 0;

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <CanvasBackground />
      
      {/* Ghost Scroll Container */}
      <div 
        style={{ height: `${(items.length) * SPACING + window.innerHeight}px` }} 
        className="w-full"
      />

      {/* Persistent UI */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference text-white pointer-events-none">
         <span className="font-bold text-2xl tracking-tighter">SD.</span>
      </div>

      <div className="fixed bottom-8 right-8 z-50 text-xs font-mono text-neutral-500 hidden md:block mix-blend-difference pointer-events-none">
         SCROLL TO EXPLORE
      </div>

      {/* 3D Scene */}
      <div className="scene-container">
        <div 
          className="helix-world"
          style={{
            transform: `translateZ(${worldTranslateZ}px) rotateY(${worldRotationY}deg) translateY(${worldTranslateY + verticalCenterOffset}px)`
          }}
        >
          {items.map((item, index) => {
            const itemScrollY = index * SPACING;
            const distance = Math.abs(scrollProgress - itemScrollY);
            
            // "Sudden Appearance" Logic
            const isVisible = distance < SPACING * 0.55;
            
            // Opacity: Sharp falloff
            const opacity = isVisible ? (distance < SPACING * 0.25 ? 1 : 0.4) : 0;
            const scale = isVisible ? (distance < SPACING * 0.25 ? 1 : 0.85) : 0.6;
            
            const rotationY = index * ANGLE_PER_ITEM;

            return (
              <div
                key={item.id}
                className="helix-card"
                style={{
                  transform: `translateY(${itemScrollY}px) rotateY(${rotationY}deg) translateZ(${RADIUS}px) scale(${scale})`,
                  opacity: opacity,
                  pointerEvents: opacity > 0.9 ? 'auto' : 'none',
                }}
              >
                <div className={`
                  w-full h-full 
                  flex flex-col justify-center relative overflow-hidden
                  transition-all duration-500
                  ${opacity > 0.9 ? 'blur-0' : 'blur-sm grayscale opacity-50'}
                `}>
                   
                   {/* Card Content Container */}
                   {item.type !== 'SECTION_TITLE' && item.type !== 'HERO' ? (
                     <div className="bg-[#0a0a0a] border border-[#222] shadow-2xl p-6 md:p-12 h-auto max-h-full w-full relative">
                         
                         {/* Corner Label */}
                         <div className="absolute top-0 right-0 border-l border-b border-[#222] px-3 py-1 bg-[#111]">
                            <span className="font-mono text-[10px] text-[#666] tracking-widest">{item.label}</span>
                         </div>

                         {/* CONTENT TYPES */}
                         
                         {item.type === 'EXPERIENCE' && (
                           <div className="flex flex-col h-full justify-center">
                              <div className="mb-6 border-b border-[#222] pb-6">
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{item.data.company}</h2>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-neutral-400">
                                   <span className="text-lg italic text-neutral-300">{item.data.role}</span>
                                   <span className="hidden md:inline w-1 h-1 bg-neutral-600 rounded-full"></span>
                                   <span className="font-mono text-xs bg-[#151515] px-2 py-0.5 rounded border border-[#333]">{item.data.duration}</span>
                                </div>
                              </div>
                              <ul className="space-y-3 overflow-y-auto max-h-[40vh] pr-2 custom-scrollbar">
                                {item.data.points.map((pt: string, i: number) => (
                                  <li key={i} className="text-neutral-400 text-sm leading-relaxed border-l-2 border-[#333] pl-4 hover:border-white transition-colors duration-300">
                                     {pt}
                                  </li>
                                ))}
                              </ul>
                           </div>
                         )}

                         {item.type === 'PROJECT' && (
                           <div className="flex flex-col h-full justify-center">
                             <h2 className="text-xs font-mono text-[#666] mb-4 uppercase tracking-[0.2em]">Project Case Study</h2>
                             <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">{item.data.title}</h3>
                             <p className="text-xs font-mono text-neutral-500 mb-6 uppercase tracking-wider">{item.data.subtitle}</p>
                             
                             <div className="space-y-4 mb-6">
                                {item.data.points.slice(0, 3).map((pt: string, i: number) => (
                                   <p key={i} className="text-neutral-400 text-sm border-b border-[#1a1a1a] pb-2 last:border-0">
                                     {pt}
                                   </p>
                                ))}
                             </div>
                             
                             {item.data.link && (
                               <div className="mt-auto pt-4">
                                 <a href={item.data.link} className="inline-flex items-center gap-2 text-white text-xs font-bold border border-white/20 bg-white/5 px-4 py-2 hover:bg-white hover:text-black transition-all">
                                    VIEW PROJECT <ExternalLink size={14} />
                                 </a>
                               </div>
                             )}
                           </div>
                         )}

                         {item.type === 'SKILLS' && (
                           <div className="flex flex-col h-full justify-center">
                              <div className="grid md:grid-cols-2 gap-6">
                                 {item.data.map((cat: any, i: number) => (
                                   <div key={i} className="bg-[#111] p-4 border border-[#222]">
                                      <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                                         {i === 0 ? <Code size={14}/> : <Cpu size={14}/>} {cat.category}
                                      </h4>
                                      <div className="flex flex-wrap gap-1.5">
                                         {cat.items.map((skill: string, idx: number) => (
                                            <span key={idx} className="text-[10px] font-mono text-neutral-300 bg-[#222] px-1.5 py-0.5 rounded border border-[#333]">
                                               {skill}
                                            </span>
                                         ))}
                                      </div>
                                   </div>
                                 ))}
                              </div>
                           </div>
                         )}

                         {item.type === 'EDUCATION' && (
                           <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-xs border-b border-[#333] pb-2">
                                    <Briefcase size={14}/> Education
                                 </h3>
                                 <div className="space-y-4">
                                    {item.data.edu.map((e: any, i: number) => (
                                       <div key={i} className="group">
                                          <div className="text-white font-medium group-hover:text-[#aaa] transition-colors">{e.institute}</div>
                                          <div className="text-xs text-neutral-500">{e.degree}</div>
                                          <div className="text-[10px] font-mono text-neutral-600 mt-1">{e.year}</div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-xs border-b border-[#333] pb-2">
                                    <Award size={14}/> Honors
                                 </h3>
                                 <div className="space-y-2">
                                    {item.data.ach.map((a: any, i: number) => (
                                       <div key={i} className="bg-[#111] border border-[#222] p-3 hover:border-white/20 transition-colors">
                                          <div className="text-white text-xs font-semibold">{a.title}</div>
                                          <div className="text-[10px] text-neutral-500 mt-0.5 truncate">{a.description}</div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                         )}

                         {item.type === 'CONTACT' && (
                            <div className="flex flex-col items-center justify-center text-center h-full">
                               <h2 className="text-4xl md:text-6xl font-bold text-white leading-none mb-6">Let's Connect.</h2>
                               <a href={`mailto:${item.data.email}`} className="text-lg md:text-xl text-neutral-400 hover:text-white transition-colors border-b border-neutral-800 hover:border-white pb-1 mb-10">
                                  {item.data.email}
                               </a>
                               
                               <div className="flex gap-6 items-center">
                                  {/* Copy Email Button */}
                                  <button 
                                    onClick={() => handleCopyEmail(item.data.email)}
                                    className="group relative p-4 rounded-full border border-[#333] bg-[#111] text-white hover:bg-white hover:text-black transition-all duration-300"
                                    aria-label="Copy Email"
                                  >
                                    {copied ? <Check size={28} /> : <Mail size={28} />}
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-mono bg-white text-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {copied ? 'Copied!' : 'Copy Email'}
                                    </span>
                                  </button>

                                  {/* LinkedIn Button */}
                                  <a 
                                    href="https://www.linkedin.com/in/sunny-diwa-862b6b24b/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="group relative p-4 rounded-full border border-[#333] bg-[#111] text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300"
                                    aria-label="LinkedIn"
                                  >
                                    <Linkedin size={28} />
                                  </a>

                                  {/* GitHub Button */}
                                  <a 
                                    href="https://github.com/diwa-hack" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="group relative p-4 rounded-full border border-[#333] bg-[#111] text-white hover:bg-white hover:text-black transition-all duration-300"
                                    aria-label="GitHub"
                                  >
                                    <Github size={28} />
                                  </a>
                               </div>
                            </div>
                         )}

                     </div>
                   ) : item.type === 'SECTION_TITLE' ? (
                     // TITLE CARD STYLE
                     <div className="flex items-center justify-center h-full w-full">
                        <h1 className="text-[10vw] font-black tracking-tighter text-transparent stroke-text" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.35)' }}>
                           {item.data.title}
                        </h1>
                     </div>
                   ) : (
                     // HERO STYLE
                     <div className="relative z-10 text-center md:text-left">
                       <h1 className="text-[15vw] md:text-[12vw] font-bold tracking-tighter leading-[0.85] text-white mb-8 mix-blend-overlay select-none">
                         SUNNY<br/>DIWA
                       </h1>
                       <div className="inline-block border-l-2 border-white/20 pl-6 text-left">
                         <p className="text-xl text-neutral-400 font-light max-w-md mb-4">
                           {item.data.tagline}
                         </p>
                         <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 uppercase tracking-widest">
                           <MapPin size={12}/> {item.data.location}
                         </div>
                       </div>
                       <div className="absolute bottom-[-20vh] left-0 md:left-20 animate-bounce text-neutral-700">
                          <ArrowDown size={32} />
                       </div>
                     </div>
                   )}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;