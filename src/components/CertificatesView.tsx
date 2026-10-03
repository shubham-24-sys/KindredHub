import React, { useState } from 'react';
import { Certificate } from '../data/mockData';

interface CertificatesViewProps {
  certificates: Certificate[];
  onOpenDonate: () => void;
  onNavigate: (view: string) => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({
  certificates,
  onOpenDonate,
  onNavigate
}) => {
  const [lookupHash, setLookupHash] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<Certificate | null>(null);
  const [lookupError, setLookupError] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = lookupHash.trim().toLowerCase();
    const found = certificates.find(
      c => c.hash.toLowerCase().includes(clean) || c.id.toLowerCase() === clean
    );

    if (found) {
      setVerifiedResult(found);
      setLookupError(false);
    } else {
      setLookupError(true);
      setVerifiedResult(null);
    }
  };

  const copyHash = (hash: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hash);
    }
    setCopiedId(hash);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1240px] w-full mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ecefeb] rounded-full text-[#3f493f] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px] text-[#00652c]">verified</span>
              <span>Cryptographic Proof-of-Impact Register</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-extrabold text-[#181c1a] tracking-tight">
              Verifiable Impact Certificates
            </h1>
            <p className="text-sm text-[#3f493f] mt-1 max-w-2xl">
              Every contribution dispatches funds directly to verified NGO bank accounts with zero platform cut. Each deed is tamper-proof and public ledger traceable.
            </p>
          </div>

          <button
            onClick={onOpenDonate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15803d] hover:bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            <span>Support an Initiative & Earn Deed</span>
          </button>
        </div>

        {/* Public Ledger Hash Verification Search Tool */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#becabc]/30 mb-8">
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#181c1a] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00652c] text-[20px]">manage_search</span>
              <span>On-Chain Ledger Hash Lookup</span>
            </h3>
            <p className="text-xs text-[#3f493f]">
              Paste any transaction proof hash or certificate block ID to inspect independent auditor signoffs and satellite coordinates.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f7a6e] text-[20px]">
                tag
              </span>
              <input
                type="text"
                value={lookupHash}
                onChange={e => setLookupHash(e.target.value)}
                placeholder="Enter hash e.g. 0x82f4c91a0bb38f2190ee41893c5d6e or KH-2024..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#f1f4f1] text-[#181c1a] rounded-xl text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#15803d] outline-none border border-transparent focus:border-[#15803d] transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#00652c] hover:bg-[#15803d] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Verify Ledger
            </button>
          </form>

          {/* Lookup Result Box */}
          {verifiedResult && (
            <div className="mt-4 p-4 rounded-2xl bg-[#95f8a7]/20 border border-[#79db8d]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00652c] flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
                  <span className="material-symbols-outlined text-[16px] fill-1">check_circle</span>
                  <span>100% Cryptographic Match Found</span>
                </span>
                <span className="text-[11px] font-mono text-[#00652c]">{verifiedResult.blockNumber}</span>
              </div>
              <p className="text-sm font-semibold text-[#181c1a]">{verifiedResult.itemDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#3f493f] pt-1 border-t border-[#79db8d]/30">
                <div>Recipient: <strong className="text-[#181c1a]">{verifiedResult.ngoName}</strong></div>
                <div>Amount: <strong className="text-[#00652c]">{verifiedResult.amount} (Zero Fee)</strong></div>
                <div>Auditor: <strong className="text-[#181c1a]">{verifiedResult.auditorName}</strong></div>
              </div>
            </div>
          )}

          {lookupError && (
            <div className="mt-4 p-3 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>No block entry found matching "{lookupHash}". Try clicking one of the sample certificates below.</span>
            </div>
          )}
        </div>

        {/* Certificates Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">
              Active Impact Deeds for Aditya Kharat
            </h2>
            <span className="text-xs text-[#6f7a6e]">{certificates.length} verifiable deeds</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#becabc]/30 flex flex-col justify-between gap-5 relative overflow-hidden"
              >
                {/* Certificate Background Watermark Stamp */}
                <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-[200px]">verified</span>
                </div>

                <div className="space-y-4">
                  {/* Top Seal Header */}
                  <div className="flex items-start justify-between gap-3 border-b border-[#becabc]/25 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#d3ffd5] text-[#00652c] flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                      </div>
                      <div>
                        <div className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#00652c]">
                          Deed of Humanitarian Impact
                        </div>
                        <div className="font-mono text-xs font-semibold text-[#181c1a]">{cert.blockNumber}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#d3ffd5] text-[#005323] text-[10px] font-bold">
                      {cert.status}
                    </span>
                  </div>

                  {/* Impact Detail */}
                  <div className="space-y-2">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#181c1a]">
                      {cert.itemDescription}
                    </h3>
                    <p className="text-xs text-[#3f493f]">
                      Sponsored by <strong className="text-[#181c1a]">{cert.donorName}</strong> for{' '}
                      <strong className="text-[#00652c]">{cert.ngoName}</strong>
                    </p>
                  </div>

                  {/* Metadata Specs */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-[#f1f4f1] rounded-2xl text-xs text-[#3f493f] border border-[#becabc]/20 font-['Plus_Jakarta_Sans']">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6f7a6e] block">Direct Grant</span>
                      <span className="font-bold text-[#00652c] text-sm">{cert.amount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6f7a6e] block">Platform Fee Cut</span>
                      <span className="font-bold text-[#181c1a] text-sm">₹0 (Zero Skim)</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-[#becabc]/30">
                      <span className="text-[10px] uppercase font-bold text-[#6f7a6e] block">Field Telemetry</span>
                      <span className="font-mono text-[11px] text-[#181c1a]">{cert.gpsCoordinates}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] uppercase font-bold text-[#6f7a6e] block">Independent Auditor</span>
                      <span className="text-[11px] text-[#181c1a] font-semibold">{cert.auditorName}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Hash & Actions */}
                <div className="pt-3 border-t border-[#becabc]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-[#6f7a6e] text-[16px]">fingerprint</span>
                    <span className="font-mono text-[10px] text-[#6f7a6e] truncate max-w-[220px]">
                      {cert.hash}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => copyHash(cert.hash)}
                      className="px-3 py-1.5 rounded-lg bg-[#f1f4f1] hover:bg-[#e6e9e5] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {copiedId === cert.hash ? 'Hash Copied!' : 'Copy Hash'}
                    </button>
                    <button
                      onClick={() => {
                        setLookupHash(cert.hash);
                        setVerifiedResult(cert);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-[#15803d] transition-colors cursor-pointer"
                    >
                      Inspect Audit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
