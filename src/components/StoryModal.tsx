import React, { useEffect, useState } from 'react';
import { STORIES_DATA } from '../data/mockData';

interface StoryModalProps {
  storyId: string;
  onClose: () => void;
  onOpenDonate: (ngoId?: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ storyId, onClose, onOpenDonate }) => {
  const currentIndex = STORIES_DATA.findIndex(s => s.id === storyId);
  const [index, setIndex] = useState(currentIndex >= 0 ? currentIndex : 0);
  const story = STORIES_DATA[index] || STORIES_DATA[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleNext = () => {
    if (index < STORIES_DATA.length - 1) {
      setIndex(index + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        title="Close (Esc)"
      >
        <span className="material-symbols-outlined text-[24px]">close</span>
      </button>

      {/* Story Viewer Frame */}
      <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[85vh] bg-[#181c1a] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Story Background Image */}
        <img
          alt={story.headline}
          className="absolute inset-0 w-full h-full object-cover"
          src={story.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none"></div>

        {/* Top Story Header & Progress Indicators */}
        <div className="relative z-10 p-4 space-y-3">
          {/* Progress Bars */}
          <div className="flex items-center gap-1.5 w-full">
            {STORIES_DATA.map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    i < index ? 'w-full' : i === index ? 'w-full animate-pulse' : 'w-0'
                  }`}
                ></div>
              </div>
            ))}
          </div>

          {/* Author Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                alt={story.ngoName}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#15803d]"
                src={story.avatar}
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-white">
                    {story.ngoName}
                  </span>
                  <span className="material-symbols-outlined text-[#95f8a7] text-[16px] fill-1">verified</span>
                </div>
                <span className="text-[11px] text-white/80">{story.location}</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-['Plus_Jakarta_Sans'] text-[10px] font-semibold">
              Live Field Update
            </span>
          </div>
        </div>

        {/* Nav Tap Areas */}
        <div className="absolute inset-y-20 inset-x-0 z-0 flex">
          <div onClick={handlePrev} className="w-1/2 h-full cursor-pointer"></div>
          <div onClick={handleNext} className="w-1/2 h-full cursor-pointer"></div>
        </div>

        {/* Bottom Story Footer with CTA */}
        <div className="relative z-10 p-5 space-y-3">
          <div className="bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <p className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-white mb-1 leading-snug">
              {story.headline}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#95f8a7] font-mono">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              <span>Audited GPS Telemetry Locked</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenDonate(story.ngoId);
              }}
              className="flex-1 py-3 px-4 bg-[#15803d] hover:bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              <span>Send Direct Support</span>
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center justify-center cursor-pointer transition-colors"
              title="Next Story"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
