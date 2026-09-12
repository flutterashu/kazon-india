import React, { useState } from 'react';
import { X, Cpu, Send, CheckCircle2, MessageSquare, UploadCloud, Shield, Sparkles } from 'lucide-react';

interface AskAnEngineerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const AskAnEngineerModal: React.FC<AskAnEngineerModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Custom Implant Geometry & 5-Axis Tolerances');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-2.5 sm:p-4 md:p-6 flex items-center justify-center">
      <div
        className={`max-w-xl w-full max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl border shadow-2xl relative transition-all overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Sticky Header */}
        <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-3 border-b border-slate-200/80 dark:border-slate-800 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono-code text-[#085F2C] dark:text-emerald-400 mb-1">
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>BIOMEDICAL & CNC ENGINEERING DESK</span>
            </div>
            <h3 className="text-base sm:text-2xl font-bold font-tech leading-tight">
              Consult With an Orthopedic Engineer
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
              Speak directly with Kazon India machining engineers about tolerances, custom geometry, or contract machining.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 -mr-1 -mt-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto px-4 sm:px-8 py-3.5 sm:py-6 flex-1">
          {!submitted ? (
            <form id="ask-engineer-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Anand Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="anand@orthoclinic.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Technical Consultation Domain
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                >
                  <option value="Custom Implant Geometry & 5-Axis Tolerances">
                    Custom Implant Geometry & 5-Axis Swiss CNC Tolerances
                  </option>
                  <option value="Trabecular 3D Porous Titanium Lattice Parameters">
                    Trabecular 3D Porous Titanium Lattice Parameters (400-600µm)
                  </option>
                  <option value="ASTM F136 vs ASTM F138 Material Selection Review">
                    ASTM F136 (Titanium) vs ASTM F138 (316L) Selection Review
                  </option>
                  <option value="Private Label OEM / ODM Precision Machining">
                    Private Label OEM / ODM Precision Contract Machining
                  </option>
                  <option value="Surgical Instrument Ergonomics & Torque Limiter Calibration">
                    Surgical Instrument Ergonomics & Torque Limiter Calibration
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Technical Query or Specific Dimensions
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your surgical application, thread pitch, required runout or fatigue requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none"
                />
              </div>

              {/* CAD / Drawing Attachment Simulation */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Attach 2D Drawing / 3D CAD (.STEP, .IGES, .STL, .PDF)
                </label>
                <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#085F2C] dark:hover:border-emerald-500 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/40 min-h-[60px]">
                  <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-[#085F2C] dark:text-emerald-400 mb-1" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 text-center">
                    {fileName ? fileName : 'Click to select CAD file or drag & drop'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Secure encrypted IP transfer (NDA protected)
                  </span>
                  <input
                    type="file"
                    accept=".step,.stp,.iges,.igs,.stl,.pdf,.dwg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </form>
          ) : (
            <div className="py-6 sm:py-8 text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#085F2C] dark:text-emerald-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-tech">
                Technical Consultation Request Received
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Our Senior Orthopedic Machining Engineer will review your query regarding <strong>{topic}</strong> and respond to <strong>{email}</strong> within 24 hours.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors min-h-[44px]"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        {!submitted && (
          <div className="px-4 sm:px-8 py-3 sm:py-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 shrink-0 bg-slate-50/80 dark:bg-slate-900/80 rounded-b-2xl sm:rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="ask-engineer-form"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-[#085F2C]/25 min-h-[44px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Technical Query</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
