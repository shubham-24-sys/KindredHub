import React, { useEffect, useRef, useState } from 'react';
import { NGO, Certificate } from '../data/mockData';

interface GiveSupportModalProps {
  ngos: NGO[];
  initialNGOId?: string;
  onClose: () => void;
  onDonationComplete: (newCertificate: Certificate) => void;
  onTrack?: () => void;
}

export const GiveSupportModal: React.FC<GiveSupportModalProps> = ({
  ngos,
  initialNGOId,
  onClose,
  onDonationComplete,
  onTrack
}) => {
  const [selectedNGOId, setSelectedNGOId] = useState(initialNGOId || ngos[0].id);
  const [selectedPackage, setSelectedPackage] = useState<'tier1' | 'tier2' | 'tier3' | 'custom'>('tier1');
  const [customAmount, setCustomAmount] = useState('1200');
  const [donorName, setDonorName] = useState('Aditya Kharat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successCert, setSuccessCert] = useState<Certificate | null>(null);

  const selectedNGO = ngos.find(n => n.id === selectedNGOId) || ngos[0];

  const packages = [
    {
      id: 'tier1',
      title: '1 Tangible Impact Kit',
      amount: 1200,
      description: '1 complete STEM learning bundle + solar lamp or 3 veterinary medical vaccinations'
    },
    {
      id: 'tier2',
      title: '3 Impact Units (Popular)',
      amount: 3600,
      description: '3 comprehensive kits deployed directly to ward students or 20 native saplings with drip lines'
    },
    {
      id: 'tier3',
      title: 'Community Sustainer Pool',
      amount: 6000,
      description: 'Emergency shelter winterization supplies or 120 warm wholesome nutritious meals'
    },
    {
      id: 'custom',
      title: 'Custom Impact Grant',
      amount: Number(customAmount) || 0,
      description: 'Specify custom zero-fee contribution'
    }
  ];

  const currentAmount =
    selectedPackage === 'custom'
      ? Number(customAmount)
      : packages.find(p => p.id === selectedPackage)?.amount || 1200;

  // Custom grants must be a whole number of rupees, at least ₹1
  const isAmountValid =
    selectedPackage !== 'custom' || (Number.isInteger(currentAmount) && currentAmount >= 1);

  // Pending "processing" timer: cleared on unmount so closing the modal can't mint a certificate
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing || !isAmountValid) return;
    setIsProcessing(true);

    timerRef.current = setTimeout(() => {
      const randomHex = Math.random().toString(16).substring(2, 10);
      const newCert: Certificate = {
        id: `cert-${Date.now()}`,
        hash: `0x${randomHex}${Date.now().toString(16)}`,
        ngoName: selectedNGO.name,
        donorName: donorName || 'Kindred Supporter',
        cause: selectedNGO.causeLabel,
        itemDescription: `${packages.find(p => p.id === selectedPackage)?.title} funded with zero intermediary deduction`,
        amount: `₹${currentAmount.toLocaleString('en-IN')}`,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
        gpsCoordinates: selectedNGO.gps,
        status: 'Verified on Public Ledger',
        auditorName: 'Automated Cryptographic Escrow & Field Officer Signoff',
        blockNumber: `#${Math.floor(8900 + Math.random() * 100)}-${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`
      };

      setIsProcessing(false);
      setSuccessCert(newCert);
      onDonationComplete(newCert);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#becabc]/30 overflow-hidden relative my-6">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#becabc]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#d3ffd5] text-[#00652c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">volunteer_activism</span>
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg text-[#181c1a]">
                Direct Zero-Fee Dispatch
              </h2>
              <p className="text-xs text-[#6f7a6e]">100% arrives at verified NGO bank accounts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f4f1] hover:bg-[#ecefeb] text-[#6f7a6e] hover:text-[#181c1a] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        {successCert ? (
          <div className="p-6 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-[#95f8a7] text-[#00210a] flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-[36px] fill-1">verified</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-[#181c1a]">
                Impact Successfully Dispatched!
              </h3>
              <p className="text-xs text-[#3f493f] max-w-md mx-auto leading-relaxed">
                Your direct grant has been locked into the Kindred public ledger with zero intermediary cuts. An immutable cryptographic certificate has been minted.
              </p>
            </div>

            {/* Generated Certificate Mini Preview */}
            <div className="p-4 rounded-2xl bg-[#f1f4f1] border border-[#becabc]/30 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono font-bold text-[#00652c]">
                <span>{successCert.blockNumber}</span>
                <span>{successCert.amount} (100% Direct)</span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#181c1a]">
                {successCert.itemDescription}
              </p>
              <div className="text-[11px] text-[#6f7a6e]">
                <span>Recipient: {successCert.ngoName}</span> • <span>GPS: {successCert.gpsCoordinates}</span>
              </div>
              <div className="pt-2 border-t border-[#becabc]/30 font-mono text-[10px] text-[#6f7a6e] truncate">
                Ledger Proof Hash: {successCert.hash}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              {onTrack && (
                <button
                  onClick={onTrack}
                  className="py-3 px-6 bg-[#d3ffd5] hover:bg-[#95f8a7] text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Track my donation
                </button>
              )}
              <button
                onClick={onClose}
                className="py-3 px-6 bg-[#00652c] hover:bg-[#15803d] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Done & View in Feed
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="p-6 space-y-5">
            {/* NGO Target Selector */}
            <div className="space-y-1.5">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#181c1a] uppercase tracking-wider">
                Recipient Non-Profit
              </label>
              <select
                value={selectedNGOId}
                onChange={e => setSelectedNGOId(e.target.value)}
                className="w-full bg-[#f1f4f1] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold p-3 rounded-xl border border-[#becabc]/30 focus:outline-none focus:ring-2 focus:ring-[#15803d] cursor-pointer"
              >
                {ngos.map(n => (
                  <option key={n.id} value={n.id}>
                    {n.name} ({n.causeLabel} • {n.cityLabel})
                  </option>
                ))}
              </select>
            </div>

            {/* Impact Packages Bento */}
            <div className="space-y-2">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#181c1a] uppercase tracking-wider">
                Select Tangible Grant Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {packages.map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id as any)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPackage === pkg.id
                        ? 'bg-[#d3ffd5]/40 border-[#00652c] ring-1 ring-[#00652c]'
                        : 'bg-[#f7faf6] border-[#becabc]/30 hover:bg-[#f1f4f1]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#181c1a]">
                          {pkg.title}
                        </span>
                        {pkg.id !== 'custom' && (
                          <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#00652c]">
                            ₹{pkg.amount.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#3f493f] leading-snug">{pkg.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedPackage === 'custom' && (
                <div className="pt-2">
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 font-bold text-sm text-[#181c1a]">₹</span>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      inputMode="numeric"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      placeholder="Enter custom amount in INR"
                      className="w-full pl-8 pr-4 py-2.5 bg-[#f1f4f1] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-sm font-bold rounded-xl border border-[#becabc]/30 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>
                  {!isAmountValid && (
                    <p className="mt-1.5 text-xs text-[#ba1a1a]">
                      Enter a whole amount of at least ₹1.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Donor Name input */}
            <div className="space-y-1">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#181c1a] uppercase tracking-wider">
                Certificate Benefactor Name
              </label>
              <input
                type="text"
                value={donorName}
                onChange={e => setDonorName(e.target.value)}
                placeholder="Name to appear on verified deed"
                className="w-full bg-[#f1f4f1] text-[#181c1a] text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#becabc]/30 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                required
              />
            </div>

            {/* Zero-Fee Transparency Breakdown */}
            <div className="p-3.5 bg-[#f1f4f1] rounded-2xl border border-[#becabc]/20 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[#3f493f]">
                <span>Recipient NGO ({selectedNGO.name})</span>
                <span className="font-semibold text-[#181c1a]">₹{currentAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-[#3f493f]">
                <span>Platform Overhead Cut</span>
                <span className="font-bold text-[#00652c]">₹0 (Zero Fees)</span>
              </div>
              <div className="flex items-center justify-between text-[#3f493f]">
                <span>Cryptographic Deed Generation</span>
                <span className="font-bold text-[#00652c]">Free (Included)</span>
              </div>
              <div className="pt-1.5 border-t border-[#becabc]/30 flex items-center justify-between font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#181c1a]">
                <span>Total Dispatched</span>
                <span className="text-[#00652c]">₹{currentAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={isProcessing || !isAmountValid}
              className="w-full py-3.5 px-6 rounded-xl bg-[#15803d] hover:bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  <span>Broadcasting Zero-Fee Dispatch to Ledger...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Confirm & Mint Verifiable Impact Deed</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
