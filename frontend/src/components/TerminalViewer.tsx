import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowDown, Download, Maximize2 } from 'lucide-react';

interface TerminalViewerProps {
  title?: string;
  logs: string[];
  height?: string;
  autoScroll?: boolean;
}

export const TerminalViewer: React.FC<TerminalViewerProps> = ({
  title = "Container Console Output",
  logs,
  height = "h-80"
}) => {
  const [copied, setCopied] = useState(false);
  const [showTimestamps, setShowTimestamps] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([logs.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `pipeline-logs-${Date.now()}.log`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden font-mono text-xs flex flex-col shadow-sm">
      {/* Terminal Bar */}
      <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#30363d] flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#da3633]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#d29922]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#238636]" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-[#8b949e]" />
          <span className="text-[#e6edf3] font-semibold text-[11px] truncate max-w-md">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTimestamps(!showTimestamps)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
              showTimestamps ? 'bg-[#21262d] text-[#e6edf3] border-[#30363d]' : 'text-[#8b949e] border-transparent'
            }`}
          >
            Timestamps
          </button>
          <button
            onClick={handleDownload}
            title="Download log file"
            className="p-1 text-[#8b949e] hover:text-[#e6edf3] rounded hover:bg-[#21262d] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            title="Copy logs to clipboard"
            className="flex items-center gap-1 text-[10px] text-[#8b949e] hover:text-[#e6edf3] px-2 py-0.5 rounded hover:bg-[#21262d] transition-colors border border-[#30363d]"
          >
            {copied ? <Check className="w-3 h-3 text-[#3fb950]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Log Output Canvas */}
      <div className={`p-3.5 overflow-y-auto ${height} space-y-1 leading-relaxed bg-[#0d1117]`}>
        {logs.length === 0 ? (
          <div className="text-[#8b949e] italic py-8 text-center">No terminal logs recorded for this stage yet.</div>
        ) : (
          logs.map((log, index) => {
            const isError = log.includes('[ERROR]') || log.includes('[FAIL]') || log.includes('ERR!') || log.includes('error:');
            const isSuccess = log.includes('[SUCCESS]') || log.includes('[PASS]') || log.includes('OK') || log.includes('done');
            const isWarning = log.includes('[WARN]') || log.includes('warning:');
            const isInfo = log.includes('[INFO]') || log.includes('[EXEC]') || log.includes('[TEST]') || log.includes('[DOCKER]');

            return (
              <div key={index} className="flex items-start gap-2.5 font-mono text-[11px] hover:bg-[#161b22]/50 px-1 rounded">
                <span className="text-[#8b949e] select-none text-[10px] w-6 text-right shrink-0">
                  {index + 1}
                </span>

                <div className="flex-1 break-all">
                  <span
                    className={
                      isError
                        ? 'text-[#f85149] font-medium'
                        : isSuccess
                        ? 'text-[#3fb950]'
                        : isWarning
                        ? 'text-[#d29922]'
                        : isInfo
                        ? 'text-[#58a6ff]'
                        : 'text-[#c9d1d9]'
                    }
                  >
                    {log}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
