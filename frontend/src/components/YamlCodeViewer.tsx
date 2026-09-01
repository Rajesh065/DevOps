import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

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
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-md my-3">
      {/* Header bar */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-blue-400" />
          <span className="text-slate-200 font-semibold text-xs">{filename}</span>
          <span className="text-[10px] text-slate-400 px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 uppercase font-mono">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 px-2.5 py-1 rounded hover:bg-slate-800 transition-colors border border-slate-700"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code contents with line numbers */}
      <div className={`p-4 overflow-x-auto overflow-y-auto ${maxHeight} text-xs leading-relaxed`}>
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const isComment = line.trim().startsWith('#');
              const isKey = line.includes(':') && !isComment;

              return (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="w-8 pr-4 text-right text-slate-500 select-none text-[11px] align-top">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre">
                    <span
                      className={
                        isComment
                          ? 'text-slate-500 italic'
                          : isKey
                          ? 'text-sky-300'
                          : 'text-slate-100'
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
