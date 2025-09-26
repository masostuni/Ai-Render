// FIX: Provide full implementation for the GalleryPanel component.
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { CloseIcon } from './icons';

const galleryItems = [
  { id: 1, src: 'https://storage.googleapis.com/gemini-ui-params/demo/img/gallery/modern_1.jpeg', alt: 'Modern living room' },
  { id: 2, src: 'https://storage.googleapis.com/gemini-ui-params/demo/img/gallery/minimalist_1.jpeg', alt: 'Minimalist bedroom' },
  { id: 3, src: 'https://storage.googleapis.com/gemini-ui-params/demo/img/gallery/bohemian_1.jpeg', alt: 'Bohemian dining area' },
  { id: 4, src: 'https://storage.googleapis.com/gemini-ui-params/demo/img/gallery/industrial_1.jpeg', alt: 'Industrial kitchen' },
  { id: 5, src: 'https://storage.googleapis.com/gemini-ui-params/demo/img/gallery/coastal_1.jpeg', alt: 'Coastal bathroom' },
  { id: 6, src: 'https://storage.googleapis.com/gemini-ui-params/demo/img/gallery/farmhouse_1.jpeg', alt: 'Farmhouse living room' },
];

interface GalleryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const GalleryPanel: React.FC<GalleryPanelProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-full overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{t('gallery_title')}</h2>
            <p className="text-sm text-slate-500">{t('gallery_description')}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors">
            <CloseIcon className="w-6 h-6 text-slate-600" />
          </button>
        </div>
        {/* Grid */}
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="aspect-square bg-slate-100 rounded-md overflow-hidden shadow-sm">
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPanel;
