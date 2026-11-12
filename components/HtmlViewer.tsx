import React, { useState, useRef } from 'react';
import { Upload, X, Maximize2, Minimize2 } from 'lucide-react';

export const HtmlViewer: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setHtmlContent(content);
            setFileName(file.name);
        };
        reader.readAsText(file);
    };

    const handleClear = () => {
        setHtmlContent(null);
        setFileName(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`flex flex-col h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : 'min-h-[600px]'}`}>
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-slate-950/50">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="text-orange-500">&lt;/&gt;</span> HTML Viewer
                    </h2>
                    {fileName && (
                        <span className="text-sm text-slate-400 px-3 py-1 bg-slate-800/50 rounded-full border border-white/5">
                            {fileName}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {!htmlContent ? (
                        <div className="relative">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".html,.htm"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="html-upload"
                            />
                            <label
                                htmlFor="html-upload"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors shadow-lg shadow-blue-500/20"
                            >
                                <Upload className="w-4 h-4" />
                                Import HTML
                            </label>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            >
                                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={handleClear}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Close File"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white relative">
                {htmlContent ? (
                    <iframe
                        srcDoc={htmlContent}
                        className="w-full h-full border-none absolute inset-0"
                        title="HTML Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center border border-white/5">
                            <Upload className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="text-sm">Import an HTML file to view it here</p>
                    </div>
                )}
            </div>
        </div>
    );
};
