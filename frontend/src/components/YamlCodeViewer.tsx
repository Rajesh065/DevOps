import React, { useState } from 'react';
import { Copy, Check, FileCode, Terminal } from 'lucide-react';

interface YamlCodeViewerProps {
  filename?: string;
  code: string;
  language?: string;
  maxHeight?: string;
}

export const YamlCodeViewer: React.FC<YamlCodeViewerProps> = ({
  filename = 'pipeline.yml',
  code,
  language = 'yaml',
  maxHeight = 'max-h-96'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden font-mono text-xs shadow-sm my-3">
      {/* Header bar */}
      <div className="bg-[#161b22] px-3.5 py-2 border-b border-[#30363d] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <FileCode className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span className="text-[#e6edf3] font-semibold text-[11px]">{filename}</span>
          <span className="text-[10px] text-[#8b949e] px-1.5 py-0.2 rounded bg-[#21262d] border border-[#30363d] uppercase">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-[#8b949e] hover:text-[#e6edf3] px-2 py-0.5 rounded hover:bg-[#21262d] transition-colors border border-[#30363d]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#3fb950]" />
              <span className="text-[#3fb950]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code contents with line numbers */}
      <div className={`p-3.5 overflow-x-auto overflow-y-auto ${maxHeight} text-[11px] leading-relaxed`}>
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const isComment = line.trim().startsWith('#');
              const isKey = line.includes(':') && !isComment;

              return (
                <tr key={idx} className="hover:bg-[#161b22]/60">
                  <td className="w-8 pr-3 text-right text-[#8b949e] select-none text-[10px] align-top opacity-60">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre">
                    <span
                      className={
                        isComment
                          ? 'text-[#8b949e] italic'
                          : isKey
                          ? 'text-[#79c0ff]'
                          : 'text-[#e6edf3]'
                      }
                    >
                      {line}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
