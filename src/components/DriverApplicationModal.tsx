import React, { useState } from "react";

interface DriverApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DriverApplicationModal({
  isOpen,
  onClose,
}: DriverApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    address: "",
    district: "Ernakulam",
    town: "",
    pincode: "",
    licenseNo: "",
    licenseExpiry: "",
    experience: "3-5 years",
    vehicleTypes: ["Sedan", "SUV", "Automatic"],
    photo: null as File | null,
    licenseDoc: null as File | null,
    panCard: null as File | null,
    aadharCard: null as File | null,
    passportDoc: null as File | null,
  });

  const districts = [
    "Ernakulam",
    "Thiruvananthapuram",
    "Kozhikode",
    "Thrissur",
    "Kottayam",
    "Malappuram",
    "Kollam",
    "Palakkad",
    "Alappuzha",
    "Kannur",
    "Wayanad",
    "Idukki",
    "Kasaragod",
    "Pathanamthitta",
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi-NCR",
    "Hyderabad",
  ];

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      // Generate submission reference ID
      const randomId = `PILOT-DRV-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefId(randomId);
      setSubmitted(true);
      setStep(4);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-background border border-border text-foreground shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
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
                Apply for Driver Partner Position
              </h3>
              <p className="text-xs text-muted-foreground">
                {!submitted
                  ? `Step ${step} of 3: ${
                      step === 1
                        ? "Personal Details"
                        : step === 2
                        ? "Driving Record & Experience"
                        : "Document Uploads"
                    }`
                  : "Application Submitted"}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground hover:bg-taxi hover:text-ink transition-colors font-bold text-base"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Step Progress Indicator Bar */}
        {!submitted && (
          <div className="w-full bg-secondary/50 h-1.5 flex">
            <div
              className="bg-taxi h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 text-left">
          {submitted ? (
            /* Success Confirmation Screen */
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-taxi text-ink font-bold text-3xl shadow-lg animate-bounce">
                ✓
              </div>
              <h4 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                Application Submitted Successfully!
              </h4>
              <div className="rounded-2xl border border-taxi/40 bg-taxi/10 p-4 max-w-sm w-full text-center">
                <span className="text-xs uppercase tracking-widest text-muted-foreground block">
                  Reference Tracking ID
                </span>
                <span className="font-display text-xl font-bold text-foreground">
                  {refId}
                </span>
              </div>
              <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                Thank you for applying to PILOTED, <strong>{formData.fullName || "Partner"}</strong>. Our recruitment & verification team will review your credentials and contact you at <strong>{formData.phone || "your phone number"}</strong> within 24 hours for driving test scheduling and background clearance.
              </p>
              <button
                onClick={resetAndClose}
                className="mt-6 px-8 py-3 rounded-full bg-ink text-taxi font-bold text-sm uppercase tracking-wider hover:bg-taxi hover:text-ink transition-colors shadow-md"
              >
                Done
              </button>
            </div>
          ) : (
            /* Form Steps */
            <form onSubmit={handleNextStep} className="space-y-6">
              {/* STEP 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                    1. Personal Information & Location
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        required
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        District *
                      </label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      >
                        {districts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Town / City *
                      </label>
                      <input
                        type="text"
                        name="town"
                        required
                        placeholder="Kochi"
                        value={formData.town}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        placeholder="682001"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Residential Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      placeholder="Door no, Street name, Area"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground focus:border-taxi focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Driving History */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                    2. Driving Experience & License Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Driving License Number *
                      </label>
                      <input
                        type="text"
                        name="licenseNo"
                        required
                        placeholder="KL-07-20180012345"
                        value={formData.licenseNo}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        License Expiry Date *
                      </label>
                      <input
                        type="date"
                        name="licenseExpiry"
                        required
                        value={formData.licenseExpiry}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Total Driving Experience *
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-taxi focus:outline-none"
                      >
                        <option value="3-5 years">3 to 5 Years</option>
                        <option value="5-10 years">5 to 10 Years</option>
                        <option value="10+ years">More than 10 Years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Document Uploads */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                    3. Required Official Identification & Document Uploads
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Please upload clear photos or scanned PDF documents for verification. Max 10MB per file.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* File 1: Photo */}
                    <div className="rounded-2xl border border-border p-4 bg-card flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          1. Profile Photo (Passport size) *
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Clear front-facing passport photograph.
                        </p>
                      </div>
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "photo")}
                        className="mt-3 text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-taxi file:text-ink hover:file:bg-taxi-deep cursor-pointer"
                      />
                    </div>

                    {/* File 2: Driving License */}
                    <div className="rounded-2xl border border-border p-4 bg-card flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          2. Driving License (Front & Back) *
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Scanned copy or clear image of your DL.
                        </p>
                      </div>
                      <input
                        type="file"
                        required
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, "licenseDoc")}
                        className="mt-3 text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-taxi file:text-ink hover:file:bg-taxi-deep cursor-pointer"
                      />
                    </div>

                    {/* File 3: PAN Card */}
                    <div className="rounded-2xl border border-border p-4 bg-card flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          3. PAN Card *
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Required for tax & payout processing.
                        </p>
                      </div>
                      <input
                        type="file"
                        required
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, "panCard")}
                        className="mt-3 text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-taxi file:text-ink hover:file:bg-taxi-deep cursor-pointer"
                      />
                    </div>

                    {/* File 4: Aadhar Card */}
                    <div className="rounded-2xl border border-border p-4 bg-card flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          4. Aadhar Card *
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Identity & address verification proof.
                        </p>
                      </div>
                      <input
                        type="file"
                        required
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, "aadharCard")}
                        className="mt-3 text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-taxi file:text-ink hover:file:bg-taxi-deep cursor-pointer"
                      />
                    </div>

                    {/* File 5: Passport / Secondary ID */}
                    <div className="rounded-2xl border border-border p-4 bg-card flex flex-col justify-between sm:col-span-2">
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          5. Passport / Secondary Photo ID (Optional)
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Passport, Voter ID, or Secondary Govt ID.
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, "passportDoc")}
                        className="mt-3 text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-taxi file:text-ink hover:file:bg-taxi-deep cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="px-5 py-2.5 rounded-full border border-border text-xs font-semibold uppercase tracking-wider hover:bg-secondary transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-full bg-ink text-taxi font-bold text-xs uppercase tracking-wider hover:bg-taxi hover:text-ink transition-colors shadow-md"
                >
                  {step === 3 ? "Submit Application ✓" : "Next Step →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
