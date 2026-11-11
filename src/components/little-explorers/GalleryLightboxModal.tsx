import React from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { GalleryPhoto } from '../../data/littleExplorersData';

interface GalleryLightboxModalProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}) => {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-stone-300 hover:text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-white border border-stone-700/60 hover:bg-stone-800 transition-all z-20"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-white border border-stone-700/60 hover:bg-stone-800 transition-all z-20"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Image Frame */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-stone-900 shadow-2xl border border-stone-800 max-h-[75vh]">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-auto max-h-[75vh] object-contain mx-auto"
          />
        </div>

        {/* Caption & Metadata Bar */}
        <div className="w-full mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-stone-300 px-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {photo.category}
              </span>
              <h3 className="text-base font-serif font-bold text-white">{photo.title}</h3>
            </div>
            <p className="text-xs text-stone-300 mt-1">{photo.caption}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-400 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{photo.location}</span>
            <span className="mx-2">•</span>
            <span>{currentIndex + 1} of {photos.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
