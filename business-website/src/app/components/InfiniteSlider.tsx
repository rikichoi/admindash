import {
  Chrome,
  CodepenIcon,
  Codesandbox,
  Facebook,
  Feather,
  Framer,
  Github,
  Gitlab,
  Twitch,
} from "lucide-react";
import React from "react";

export default function InfiniteSlider() {
  const LOGOS = [
    <Chrome key="Chrome" width={24} height={24} className="text-slate-800" />,
    <CodepenIcon
      key="CodepenIcon"
      width={24}
      height={24}
      className="text-slate-800"
    />,
    <Codesandbox
      key="Codesandbox"
      width={24}
      height={24}
      className="text-slate-800"
    />,
    <Facebook
      key="Facebook"
      width={24}
      height={24}
      className="text-slate-800"
    />,
    <Feather key="Feather" width={24} height={24} className="text-slate-800" />,
    <Framer key="Framer" width={24} height={24} className="text-slate-800" />,
    <Github key="Github" width={24} height={24} className="text-slate-800" />,
    <Gitlab key="Gitlab" width={24} height={24} className="text-slate-800" />,
    <Twitch key="Twitch" width={24} height={24} className="text-slate-800" />,
  ];
  return (
    <div className="relative m-auto max-w-4xl pt-10 pb-5 overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <div className="animate-infinite-slider flex w-[calc(250px*10)]">
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[125px] items-center justify-center"
            key={index}
          >
            {logo}
          </div>
        ))}
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[125px] items-center justify-center"
            key={index}
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
