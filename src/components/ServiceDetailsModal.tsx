import React from "react";

export type ServicePackageDetails = {
  id: string;
  name: string;
  tag: string;
  lead: string;
  unit: string;
  bullets: string[];
  tone: "bone" | "taxi" | "ink" | "dark";
  isComingSoon?: boolean;
  fullDetails: {
    description: string;
    whatsIncluded: string[];
    packageSpecs: { label: string; value: string }[];
    termsAndConditions: string[];
  };
};

interface ServiceDetailsModalProps {
  packageData: ServicePackageDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
}

export function ServiceDetailsModal({
  packageData,
  isOpen,
  onClose,
  onExplore,
}: ServiceDetailsModalProps) {
  if (!isOpen || !packageData) return null;

  const { name, tag, fullDetails, isComingSoon } = packageData;

  const handleExploreClick = () => {
    onClose();
    onExplore();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-background border border-border text-foreground shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-8 bg-card sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-taxi font-display font-bold text-sm shadow-inner">
              P
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                  {name} Service Package
                </h3>
                {isComingSoon && (
                  <span className="rounded-full bg-taxi/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-taxi-deep border border-taxi/40">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
                {tag} — PILOTED Service Details & Policy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground hover:bg-taxi hover:text-ink transition-colors font-bold text-base cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-7 text-left text-sm leading-relaxed text-muted-foreground">
          {/* Overview */}
          <section className="space-y-2">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-taxi" />
              Service Overview
            </h4>
            <p className="text-foreground/90 leading-relaxed text-base pt-1">
              {fullDetails.description}
            </p>
          </section>

          {/* Package Specifications */}
          <section className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-taxi" />
              Package Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {fullDetails.packageSpecs.map((spec, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/80 p-4 bg-card/60 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="font-display text-base font-bold text-foreground mt-1">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* What's Included */}
          <section className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-taxi" />
              What's Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {fullDetails.whatsIncluded.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border/60 p-3 bg-card/40"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-taxi text-ink font-bold text-[10px] mt-0.5">
                    ✓
                  </span>
                  <span className="text-xs text-foreground font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Terms & Conditions */}
          <section className="space-y-3 pt-2">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-taxi" />
              Terms & Conditions
            </h4>
            <ul className="space-y-2 rounded-2xl border border-border p-4 bg-secondary/30">
              {fullDetails.termsAndConditions.map((term, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-taxi font-bold">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border px-6 py-4 sm:px-8 bg-card">
          <span className="text-xs text-muted-foreground text-center sm:text-left">
            Bookings and transparent quotes process directly in the PILOTED mobile app.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleExploreClick}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-ink text-taxi font-bold text-xs uppercase tracking-wider hover:bg-taxi hover:text-ink transition-colors cursor-pointer shadow-md"
            >
              {isComingSoon ? "Get Notified in App" : "Book on App"} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
