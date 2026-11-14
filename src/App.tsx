import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ActionModals, type ModalType } from './components/ActionModals';
import { DetailsSection } from './components/DetailsSection';
import { Hero, type TimeMode } from './components/Hero';

export default function App() {
  const [mode, setMode] = useState<TimeMode>('night');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [prefilledScope, setPrefilledScope] = useState('');

  useEffect(() => {
    document.documentElement.dataset.time = mode;
  }, [mode]);

  const handleOpenQuote = () => {
    setPrefilledScope('');
    setActiveModal('quote');
  };

  const handleRequestScope = (scopeSummary: string) => {
    setPrefilledScope(scopeSummary);
    setActiveModal('quote');
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-black">
        <Hero
          mode={mode}
          onModeChange={setMode}
          onOpenQuote={handleOpenQuote}
        />
        <DetailsSection
          onOpenQuote={handleOpenQuote}
          onOpenCustomers={() => setActiveModal('customers')}
          onRequestScope={handleRequestScope}
        />
        <ActionModals
          activeModal={activeModal}
          prefilledScope={prefilledScope}
          onClose={() => setActiveModal(null)}
        />
      </main>
    </MotionConfig>
  );
}
