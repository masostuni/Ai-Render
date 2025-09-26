// FIX: Provide full implementation for the App component.
import React, { useState } from 'react';
import InputPanel from './components/InputPanel';
import ImageComparison from './components/ArchitectureDiagram';
import LanguageSwitcher from './components/LanguageSwitcher';
import UserMenu from './components/UserMenu';
import GalleryPanel from './components/GalleryPanel';
import { GalleryIcon } from './components/icons';
import { useTranslation } from './hooks/useTranslation';
import * as geminiService from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { t } = useTranslation();

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      setGeneratedImage(null); // Clear previous generation
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async (prompt: string, image: { data: string; mimeType: string }) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const newImageBase64 = await geminiService.generateImage(prompt, image);
      if (newImageBase64) {
        setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
      } else {
        setError('The model did not return an image. Please try again.');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-cyan-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 4.6L17.6 19H6.4L12 6.6z"></path></svg>
                </div>
                <h1 className="text-xl font-bold text-slate-800">{t('header_title')}</h1>
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-4">
                <button onClick={() => setIsGalleryOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-cyan-500 transition-colors p-2 rounded-md hover:bg-slate-100">
                    <GalleryIcon className="w-5 h-5"/>
                    <span className="hidden md:block">{t('gallery_button')}</span>
                </button>
                <LanguageSwitcher />
                <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <InputPanel
            onGenerate={handleGenerate}
            onImageSelect={handleImageSelect}
            isLoading={isLoading}
            originalImage={originalImage}
          />
          <ImageComparison
            originalImage={originalImage}
            generatedImage={generatedImage}
          />
        </div>
        {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-200 text-red-800 rounded-md">
                <p><span className="font-bold">{t('error_title')}:</span> {error}</p>
            </div>
        )}
      </main>

      <GalleryPanel isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </div>
  );
};

export default App;
