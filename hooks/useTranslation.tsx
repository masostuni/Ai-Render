// FIX: Provide full implementation for the translation hook and provider.
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Language = 'en' | 'it';

interface Translations {
  [key: string]: {
    en: string;
    it: string;
  };
}

const translations: Translations = {
  // Header
  header_title: { en: 'AI Interior Designer', it: 'Interior Designer AI' },
  gallery_button: { en: 'Gallery', it: 'Galleria' },

  // InputPanel
  upload_image_label: { en: 'Upload your room photo', it: 'Carica la foto della tua stanza' },
  upload_image_placeholder: { en: 'Drag & drop or click to upload', it: 'Trascina e rilascia o fai clic per caricare' },
  style_label: { en: 'Choose a style', it: 'Scegli uno stile' },
  style_modern: { en: 'Modern', it: 'Moderno' },
  style_minimalist: { en: 'Minimalist', it: 'Minimalista' },
  style_bohemian: { en: 'Bohemian', it: 'Boemo' },
  style_industrial: { en: 'Industrial', it: 'Industriale' },
  style_coastal: { en: 'Coastal', it: 'Costiero' },
  style_farmhouse: { en: 'Farmhouse', it: 'Rustico' },
  prompt_label: { en: 'Describe your desired changes', it: 'Descrivi le modifiche desiderate' },
  prompt_placeholder: { en: 'e.g., add a green sofa, change the wall color to beige, more natural light', it: 'es. aggiungi un divano verde, cambia il colore del muro in beige, più luce naturale' },
  generate_button: { en: 'Generate New Design', it: 'Genera Nuovo Design' },
  generating_button: { en: 'Generating...', it: 'Generazione in corso...' },
  select_image_error: { en: 'Please select an image first.', it: 'Seleziona prima un\'immagine.' },

  // ImageComparison
  comparison_placeholder: { en: 'Upload an image and describe the changes to see the magic happen!', it: 'Carica un\'immagine e descrivi le modifiche per vedere la magia!' },
  original_image_label: { en: 'Original', it: 'Originale' },
  generated_image_label: { en: 'Generated', it: 'Generato' },
  no_original_image: { en: 'No original image uploaded.', it: 'Nessuna immagine originale caricata.' },
  generated_image_placeholder: { en: 'Your generated image will appear here.', it: 'La tua immagine generata apparirà qui.' },
  
  // Gallery
  gallery_title: { en: 'Inspiration Gallery', it: 'Galleria di Ispirazione' },
  gallery_description: { en: 'Explore stunning interior designs created by our AI.', it: 'Esplora fantastici design d\'interni creati dalla nostra AI.' },

  // General
  error_title: { en: 'An error occurred', it: 'Si è verificato un errore' },
};

type TranslationKey = keyof typeof translations;

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: TranslationKey): string => {
    return translations[key] ? translations[key][language] : key;
  }, [language]);

  const value = { language, setLanguage, t };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
