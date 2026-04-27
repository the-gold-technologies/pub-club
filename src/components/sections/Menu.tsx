'use client';

import { ChefHat, Beer } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const menuCategories = [
  {
    title: "Starters",
    items: [
      { name: "Truffle Arancini", desc: "Wild mushroom, black truffle, aged parmesan, saffron aioli", price: "£14" },
      { name: "Seared Scallops", desc: "Pea purée, crispy pancetta, mint oil, lemon zest", price: "£18" },
    ]
  },
  {
    title: "Pub Classics",
    items: [
      { name: "Classic Fish & Chips", desc: "Beer-battered haddock, triple-cooked chips, mushy peas", price: "£19" },
      { name: "Seven Stars Cheeseburger", desc: "Dry-aged beef, cave-aged cheddar, brioche bun, fries", price: "£18" },
    ]
  },
  {
    title: "Mains",
    items: [
      { name: "Pan-Roasted Halibut", desc: "Samphire, crushed jersey royals, Champagne beurre blanc", price: "£36" },
      { name: "Dry-Aged Ribeye 10oz", desc: "Triple cooked chips, roasted vine tomatoes, peppercorn sauce", price: "£42" },
    ]
  },
  {
    title: "Sunday Roast",
    subtitle: "Served every Sunday 12:00 – 18:00",
    items: [
      { name: "Roast Sirloin of Beef", desc: "Duck fat roast potatoes, seasonal greens, Yorkshire pudding", price: "£28" },
      { name: "Leg of Lamb", desc: "Mint sauce, honey-roasted parsnips, gravy", price: "£26" },
    ]
  },
  {
    title: "Desserts",
    items: [
      { name: "Orange & Cognac Crème Brulée", desc: "Homemade shortbread, fresh berries", price: "£12" },
      { name: "Dark Chocolate Fondant", desc: "Salted caramel, vanilla bean ice cream", price: "£11" },
    ]
  },
  {
    title: "Drinks",
    items: [
      { name: "Local Ales · Lagers · Ciders", desc: "Supporting producers from across the region", price: "From £6" },
      { name: "Wine · Soft Drinks", desc: "Carefully chosen range for every palate", price: "Various" },
    ]
  }
];

export default function Menu() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.menu-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-header', start: 'top 82%', toggleActions: 'play none none none' }
        }
      );

      // Menu cards
      gsap.fromTo('.menu-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-card', start: 'top 82%', toggleActions: 'play none none none' }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="menu" className="py-24 bg-dark-950 border-t border-light/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="menu-header mb-16 flex flex-col gap-6 border-b border-dark-800/60 pb-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-medium flex items-center gap-3">
              <span className="font-serif text-2xl text-dark-700 leading-none">05</span>
              <span className="w-6 h-[1px] bg-gold-600/50"></span>
              Seasonal Selection
            </span>
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight mb-4">
              Our <em className="not-italic italic text-gold-500 font-light">Menu</em>
            </h3>
            <p className="text-dark-200 leading-relaxed font-light text-lg max-w-3xl">
              At The Seven Stars, our kitchen starts with fresh, quality ingredients and builds outward from there, honouring the classics while keeping things interesting with seasonal specials and the occasional inspired detour into South Asian and Mediterranean territory.
            </p>
            <p className="text-dark-300 leading-relaxed font-light text-base max-w-2xl mt-2 italic flex items-center gap-3">
              <Beer size={18} className="text-gold-500/60" />
              We take our drinks as seriously as our food. The Seven Stars stocks a carefully chosen range of local ales, lagers and ciders while supporting producers from across the region.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuCategories.map((cat, i) => (
            <div key={i} className="menu-card glass-card rounded-3xl p-8 md:p-10 hover:border-gold-500/30 transition-all duration-500 group">
               <div className="flex justify-between items-end mb-8 border-b border-dark-800 pb-4">
                 <h4 className="text-2xl font-serif text-gold-400 uppercase tracking-widest">{cat.title}</h4>
                 {cat.subtitle && <span className="text-[10px] text-dark-400 uppercase tracking-widest mb-1">{cat.subtitle}</span>}
               </div>
               <div className="space-y-8">
                 {cat.items.map((item, j) => (
                   <div key={j} className="menu-item">
                     <div className="flex justify-between items-baseline mb-2">
                       <h5 className="text-base font-medium text-white uppercase tracking-wider group-hover:text-gold-500 transition-colors">{item.name}</h5>
                       <span className="text-lg font-serif text-gold-500">{item.price}</span>
                     </div>
                     <p className="text-dark-400 font-light text-xs italic">{item.desc}</p>
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#contact" className="inline-flex items-center px-10 py-4 bg-dark-900 hover:bg-gold-600 border border-gold-600/30 text-white hover:text-dark-990 uppercase tracking-[0.2em] text-xs font-bold transition-all rounded-full">
            Enquire For Private Dining
          </a>
        </div>
      </div>
    </section>
  );
}
