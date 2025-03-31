'use client';

export default function LoadingOverlay({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-white/30">
      <div className="flex items-center gap-2 p-3 mt-4 rounded-2xl">
        <div className="w-5 h-5 animate-spin rounded-full border-2 border-[rgb(210,217,238)] border-t-[rgb(255,0,199)]" />
        <p className="text-[14px] text-[rgb(119,128,160)] font-medium">
          {text}
        </p>
      </div>
    </div>
  );
}
