import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Phone } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useLanguage } from '@/context/LanguageContext';

const FloatingToggle: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [value, setValue] = React.useState<string>('');

  const getLocalizedText = (eng: string, hindi: string, marathi: string) => {
    if (language === 'english') return eng;
    if (language === 'hindi') return hindi;
    return marathi;
  };

  const handleValueChange = (newValue: string) => {
    if (newValue) {
      setValue(newValue);
      if (newValue === 'chat') {
        navigate('/chat');
      } else if (newValue === 'emergency') {
        navigate('/emergency-contacts');
      }
      // Reset after navigation
      setTimeout(() => setValue(''), 300);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 touch-manipulation">
      <ToggleGroup 
        type="single" 
        value={value}
        onValueChange={handleValueChange}
        className="bg-[#FF8C42] rounded-full shadow-lg p-0.5 sm:p-1 flex gap-0.5 sm:gap-1"
      >
        <ToggleGroupItem
          value="chat"
          aria-label={getLocalizedText("Chat", "चैट", "चॅट")}
          className="rounded-full p-2 sm:p-3 data-[state=on]:bg-white data-[state=on]:text-[#FF8C42] text-white transition-all hover:bg-white/10 touch-manipulation"
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="emergency"
          aria-label={getLocalizedText("Emergency", "आपातकाल", "आपत्काल")}
          className="rounded-full p-2 sm:p-3 data-[state=on]:bg-white data-[state=on]:text-[#FF8C42] text-white transition-all hover:bg-white/10 touch-manipulation"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default FloatingToggle;
