import React, { useState } from 'react';
import { Terminal, Copy, Check, Maximize2 } from 'lucide-react';

interface TerminalViewerProps {
  title?: string;
  logs: string[];
  height?: string;
}

export const TerminalViewer: React.FC<TerminalViewerProps> = ({
  title = "Pipeline Execution Logs",
  logs,
  height = "h-72"
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#080d1a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs flex flex-col">
      <div className="bg-[#0f172a] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-300 font-medium text-[11px]">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors px-2 py-0.5 rounded hover:bg-slate-800"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className={`p-4 overflow-y-auto ${height} space-y-1.5 leading-relaxed`}>
        {logs.length === 0 ? (
          <div className="text-slate-400 italic">No output logged yet...</div>
        ) : (
          logs.map((log, index) => {
            const isError = log.includes('[ERROR]') || log.includes('[FAIL]') || log.includes('ERR!');
            const isSuccess = log.includes('[SUCCESS]') || log.includes('[PASS]') || log.includes('OK');
            const isInfo = log.includes('[INFO]') || log.includes('[EXEC]');

            return (
              <div key={index} className="flex items-start gap-2">
                <span className="text-slate-400 select-none text-[10px] w-6 text-right">
                  {index + 1}
                </span>
                <span
                  className={
                    isError
                      ? 'text-rose-400'
                      : isSuccess
                      ? 'text-emerald-400'
                      : isInfo
                      ? 'text-sky-300'
                      : 'text-slate-300'
                  }
                >
                  {log}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
