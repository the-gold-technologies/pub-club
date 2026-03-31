'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left info panel: slides from left
      gsap.fromTo('.contact-info',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-info', start: 'top 80%', toggleActions: 'play none none none' }
        }
      );

      // Right form card: slides from right
      gsap.fromTo('.contact-form',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 80%', toggleActions: 'play none none none' }
        }
      );

      // Form fields: stagger fade in after card appears
      gsap.fromTo('.contact-field',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: '.contact-form', start: 'top 75%', toggleActions: 'play none none none' }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="py-24 bg-dark-950 relative border-t border-light/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Info */}
          <div className="contact-info space-y-12">
            <div>
              <h2 className="text-gold-500 tracking-[0.2em] uppercase text-sm font-semibold mb-2">Get in Touch</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white">
                Visit <span className="italic">Us</span>
              </h3>
            </div>

            <div className="space-y-8 glass-card rounded-3xl p-10">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-gold-500 mr-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="text-white uppercase tracking-wider text-sm font-medium mb-2">Address</h4>
                  <p className="text-dark-300 font-light leading-relaxed">
                    123 Countryside Lane, <br />
                    Rolling Hills Estate, <br />
                    Oxfordshire, OX1 2AB, UK
                  </p>
                </div>
              </div>

              <div className="flex items-start border-t border-dark-800 pt-8">
                <svg className="w-6 h-6 text-gold-500 mr-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-white uppercase tracking-wider text-sm font-medium mb-2">Opening Hours</h4>
                  <p className="text-dark-300 font-light leading-relaxed">
                    Mon - Thu: 12:00 PM - 11:00 PM <br />
                    Fri - Sat: 12:00 PM - 1:00 AM <br />
                    Sun: 12:00 PM - 10:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start border-t border-dark-800 pt-8">
                <svg className="w-6 h-6 text-gold-500 mr-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="text-white uppercase tracking-wider text-sm font-medium mb-2">Contact</h4>
                  <p className="text-dark-300 font-light leading-relaxed">
                    reservations@sevenstars.com <br />
                    +44 123 456 7890
                  </p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Form */}
          <div className="contact-form glass-card rounded-3xl p-10 self-start">
            <h4 className="contact-field text-2xl font-serif text-white mb-8 border-b border-dark-800 pb-4">Book a Table</h4>
            <form className="space-y-6">
              <div className="contact-field grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-dark-300 mb-2">Name</label>
                  <input type="text" className="w-full bg-dark-900 border border-dark-800 p-3 text-white focus:outline-none focus:border-gold-500 transition-colors rounded-xl" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-dark-300 mb-2">Email</label>
                  <input type="email" className="w-full bg-dark-900 border border-dark-800 p-3 text-white focus:outline-none focus:border-gold-500 transition-colors rounded-xl" placeholder="john@example.com" />
                </div>
              </div>
              <div className="contact-field grid grid-cols-2 gap-6">
                 <div>
                  <label className="block text-xs uppercase tracking-widest text-dark-300 mb-2">Date</label>
                  <input type="date" className="w-full bg-dark-900 border border-dark-800 p-3 text-white focus:outline-none focus:border-gold-500 transition-colors rounded-xl [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-dark-300 mb-2">Guests</label>
                  <select className="w-full bg-dark-900 border border-dark-800 p-3 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none rounded-xl">
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4 People</option>
                    <option>5+ People</option>
                  </select>
                </div>
              </div>
              <div className="contact-field">
                <label className="block text-xs uppercase tracking-widest text-dark-300 mb-2">Message (Optional)</label>
                <textarea rows={4} className="w-full bg-dark-900 border border-dark-800 p-3 text-white focus:outline-none focus:border-gold-500 transition-colors rounded-xl" placeholder="Special requirements..." />
              </div>
              <button type="submit" className="contact-field w-full py-4 bg-gold-600 hover:bg-gold-500 text-dark-990 uppercase tracking-widest text-sm font-semibold transition-all shadow-[0_0_15px_rgba(202,158,90,0.2)] hover:shadow-[0_0_25px_rgba(202,158,90,0.4)] rounded-full">
                Request Booking
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
