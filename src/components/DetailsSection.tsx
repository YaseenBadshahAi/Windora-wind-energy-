import { CapabilitiesSection } from './agency/CapabilitiesSection';
import { SelectedWorkSection } from './agency/SelectedWorkSection';
import { ScopeEstimatorSection } from './agency/ScopeEstimatorSection';
import { EngagementFaqSection } from './agency/EngagementFaqSection';
import { InquiryFooterSection } from './agency/InquiryFooterSection';

interface DetailsSectionProps {
  onOpenQuote: () => void;
  onOpenCustomers: () => void;
  onRequestScope: (scopeSummary: string) => void;
}

export function DetailsSection({
  onOpenQuote,
  onOpenCustomers,
  onRequestScope,
}: DetailsSectionProps) {
  return (
    <div className="bg-black text-white">
      <CapabilitiesSection />
      <SelectedWorkSection />
      <ScopeEstimatorSection onRequestScope={onRequestScope} />
      <EngagementFaqSection />
      <InquiryFooterSection
        onOpenQuote={onOpenQuote}
        onOpenCustomers={onOpenCustomers}
      />
    </div>
  );
}
