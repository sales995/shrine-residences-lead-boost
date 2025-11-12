import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    // Immediately mark above-the-fold elements as visible
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
      observer.observe(el);
    });

    // Smooth scrolling for anchor links - delegated for better performance
    const handleSmoothScroll = (e: Event) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement;
      if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    document.addEventListener('click', handleSmoothScroll);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);
};