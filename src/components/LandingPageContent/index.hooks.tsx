import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";

gsap.registerPlugin(useGSAP);

export const useLandingPageContent = () => {
  const [t] = useTypedTranslations();

  const logoRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLElement>(null);
  const subTitleRef = useRef<HTMLElement>(null);
  const githubIconRef = useRef<HTMLElement>(null);
  const linkedInIconRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const _gsap = gsap.timeline({
      onStart: () => {
        if (logoRef.current) logoRef.current.style.display = "block";
        if (titleRef.current) titleRef.current.style.display = "block";
        if (subTitleRef.current) subTitleRef.current.style.display = "block";
        if (githubIconRef.current)
          githubIconRef.current.style.display = "block";
        if (linkedInIconRef.current)
          linkedInIconRef.current.style.display = "block";
      },
    });
    _gsap.from(logoRef.current, {
      y: -1600,
      duration: 1.5,
      opacity: 0,
    });
    _gsap.from(titleRef.current, {
      x: -100,
      duration: 0.5,
      opacity: 0,
    });
    _gsap.from(subTitleRef.current, {
      y: 60,
      duration: 1,
      opacity: 0,
    });
    _gsap.from(githubIconRef.current, {
      duration: 0.5,
      opacity: 0,
    });
  });

  return {
    t,
    logoRef,
    titleRef,
    subTitleRef,
    githubIconRef,
  };
};
