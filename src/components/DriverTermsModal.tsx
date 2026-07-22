import React from "react";

interface DriverTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: () => void;
}

export function DriverTermsModal({
  isOpen,
  onClose,
  onOpenApply,
}: DriverTermsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl bg-background border border-border text-foreground shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-8 bg-background sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-taxi font-display font-bold text-sm">
              P
            </span>
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                Driver Partner Qualifications & Terms
              </h3>
              <p className="text-xs text-muted-foreground">
                Full Eligibility, Operating Standards & Compensation Policy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground hover:bg-taxi hover:text-ink transition-colors font-bold text-base"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-8 text-left text-sm leading-relaxed text-muted-foreground">
          {/* Section 1 */}
          <section className="space-y-3">
            <h4 className="font-display text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-taxi" />
              1. Minimum Qualifications & Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-2xl border border-border/80 p-4 bg-card">
                <div className="font-semibold text-foreground mb-1">
                  Age & Documentation
                </div>
                <p className="text-xs">
                  Applicant must be at least 21 years of age and hold a valid, non-expired Indian Commercial or LMV Driving License with at least 3 years of active driving history.
                </p>
              </div>
              <div className="rounded-2xl border border-border/80 p-4 bg-card">
                <div className="font-semibold text-foreground mb-1">
                  Background Verification (PCC)
                </div>
                <p className="text-xs">
                  Mandatory Police Clearance Certificate (PCC) with zero prior criminal records, major traffic violations, or license suspensions in the last 5 years.
                </p>
              </div>
              <div className="rounded-2xl border border-border/80 p-4 bg-card">
                <div className="font-semibold text-foreground mb-1">
                  Vehicle Competency
                </div>
                <p className="text-xs">
                  Demonstrated proficiency in driving high-end manual and automatic transmission sedans, SUVs, and luxury electric vehicles.
                </p>
              </div>
              <div className="rounded-2xl border border-border/80 p-4 bg-card">
                <div className="font-semibold text-foreground mb-1">
                  Language & Etiquette
                </div>
                <p className="text-xs">
                  Professional demeanor, fluency in regional languages, basic English comprehension, and strict adherence to client confidentiality.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-border/60 pt-6">
            <h4 className="font-display text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-taxi" />
              2. Earnings, Incentives & Direct Payouts
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong className="text-foreground">Weekly Payouts:</strong> Direct bank transfer of all earned trip fares every Monday morning.
              </li>
              <li>
                <strong className="text-foreground">100% Tips Retention:</strong> All client gratuities given in cash or via app are retained fully by the driver.
              </li>
              <li>
                <strong className="text-foreground">Peak Hour & Night Incentives:</strong> Additional surge bonuses for airport runs, late night dispatches, and outstation trips.
              </li>
              <li>
                <strong className="text-foreground">Overtime Compensation:</strong> Guaranteed hourly base pay plus overtime allowances for extended bookings.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-border/60 pt-6">
            <h4 className="font-display text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-taxi" />
              3. Uniform Code & Professional Conduct
            </h4>
            <div className="rounded-2xl bg-secondary/50 p-4 border border-border text-xs space-y-2">
              <p>
                As a PILOTED Chauffeur, you represent the highest standard of personal driving service:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>Must wear the official PILOTED uniform (Dark trousers, ironed uniform shirt/polo, polished shoes).</li>
                <li>Zero-tolerance policy for alcohol, drugs, or smoking during or immediately prior to shifts.</li>
                <li>Strict client privacy: No phone photography, video recording, or unauthorized disclosure of client whereabouts.</li>
                <li>Careful vehicle handling: Smooth braking, defensive driving, and respectful treatment of the client's private car.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-border/60 pt-6">
            <h4 className="font-display text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-taxi" />
              4. Commercial Insurance Protection
            </h4>
            <p className="text-xs">
              During an active PILOTED dispatch, all trips are insured under our master commercial liability policy. Drivers are protected against third-party liability claims provided all operating guidelines are strictly followed.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-border px-6 py-4 sm:px-8 bg-background flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            By applying, you agree to PILOTED's Partner Terms of Service.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-border text-xs font-semibold uppercase tracking-wider hover:bg-secondary transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenApply();
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-ink text-taxi text-xs font-bold uppercase tracking-wider hover:bg-taxi hover:text-ink transition-colors shadow-sm"
            >
              Apply Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
