import React, { useState, useRef } from 'react';
import { UploadCloud, FileVideo, ImageIcon, X, AlertCircle, RefreshCw } from 'lucide-react';

interface MediaUploaderProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  placeholderUrl?: string;
}

export function MediaUploader({ id, label, value, onChange, accept = "image/*,video/*", placeholderUrl }: MediaUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>(value && !value.startsWith('data:') ? 'url' : 'upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideo = (url?: string) => {
    if (!url) return false;
    return url.startsWith('data:video/') || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm') || url.toLowerCase().includes('.mov') || url.toLowerCase().includes('.ogg');
  };

  const compressAndSetImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with quality 0.75
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
          onChange(compressedBase64);
          setLoading(false);
        } else {
          onChange(event.target?.result as string);
          setLoading(false);
        }
      };
      img.onerror = () => {
        onChange(event.target?.result as string);
        setLoading(false);
      };
    };
    reader.onerror = () => {
      setError("Failed to read image file.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileProcess = (file: File) => {
    setError(null);
    setLoading(true);

    const isVideoFile = file.type.startsWith('video/');
    
    if (isVideoFile) {
      if (file.size > 1024 * 1024 * 0.95) { // 950KB max limit warning/block
        setError("Firestore documents have a strict 1MB limit. Your video is " + (file.size / (1024 * 1024)).toFixed(2) + "MB. Please compress it to under 950KB.");
        setLoading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
        setLoading(false);
      };
      reader.onerror = () => {
        setError("Failed to read video file.");
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('image/')) {
      // Opt-in automatic compression for images
      compressAndSetImage(file);
    } else {
      setError("Unsupported file format. Please select an image or MP4/WebM video.");
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2 text-left" id={`media-uploader-container-${id}`}>
      <div className="flex justify-between items-center bg-transparent px-1">
        <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">{label}</label>
        
        {/* Toggle between paste and upload */}
        <button
          type="button"
          onClick={() => {
            setError(null);
            setMode(mode === 'upload' ? 'url' : 'upload');
          }}
          className="text-[9px] font-bold uppercase tracking-widest text-orange-600 hover:text-black transition"
        >
          {mode === 'upload' ? "Use Web URL Instead" : "Upload Device File"}
        </button>
      </div>

      {mode === 'upload' ? (
        <div id={`uploader-box-${id}`}>
          {value ? (
            /* Selected state preview banner */
            <div className="relative group rounded-2xl border border-neutral-100 overflow-hidden bg-white shadow-md p-4 transition-all hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 flex items-center justify-center border border-neutral-200">
                  {isVideo(value) ? (
                    <video src={value} className="w-full h-full object-cover" muted loop playsInline />
                  ) : (
                    <img src={value} className="w-full h-full object-cover" alt="Preview Thumbnail" />
                  )}
                  {isVideo(value) && (
                    <div className="absolute top-1 right-1 bg-black/60 p-0.5 rounded-full text-white">
                      <FileVideo size={10} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide truncate">Media Ready</p>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    {value.startsWith('data:') 
                      ? `Locally Encoded Data (${(value.length / 1024).toFixed(1)} KB)`
                      : "Pasted Web URL Link"
                    }
                  </p>
                  {value.startsWith('data:') && value.length > 900 * 1024 && (
                    <p className="text-[9px] text-amber-500 font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> Approaching Firestore 1MB limits.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Change File"
                    className="p-2 text-neutral-400 hover:text-black bg-neutral-50 hover:bg-neutral-100 rounded-full transition"
                  >
                    <RefreshCw size={14} />
                  </button>
                  <button
                    type="button"
                    title="Remove File"
                    onClick={() => {
                      onChange('');
                      setError(null);
                    }}
                    className="p-2 text-neutral-400 hover:text-red-500 bg-neutral-50 hover:bg-neutral-100 rounded-full transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Drag and Drop Box */
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 min-h-32 ${
                dragActive 
                  ? 'border-orange-500 bg-orange-50/50 scale-[0.99] md:scale-100' 
                  : 'border-neutral-200 bg-neutral-50/30 hover:border-black'
              }`}
            >
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-4 border-neutral-200 border-t-orange-500 animate-spin" />
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Converting file assets...</p>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-neutral-100 text-neutral-400 group-hover:text-black">
                    <UploadCloud size={24} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-neutral-700">Drag or click to choose device files</p>
                    <p className="text-[9px] text-neutral-400 uppercase tracking-widest">Images or Videos (&lt;950 KB)</p>
                  </div>
                </>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            id={`file-input-${id}`}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        /* Traditional url paste */
        <div className="relative" id={`url-input-box-${id}`}>
          {value && isVideo(value) ? (
            <FileVideo className="absolute left-4 top-4 text-neutral-300" size={18} />
          ) : (
            <ImageIcon className="absolute left-4 top-4 text-neutral-300" size={18} />
          )}
          <input
            required
            id={`input-url-field-${id}`}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-neutral-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-sm"
            placeholder={placeholderUrl || "Unsplash URL / direct mp4 link"}
          />
        </div>
      )}

      {error && (
        <div id={`uploader-error-${id}`} className="p-3 bg-red-50 text-red-600 text-[10px] rounded-xl border border-red-100 flex items-start gap-2 text-left">
          <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
          <p className="font-semibold leading-relaxed">{error}</p>
        </div>
      )}
    </div>
  );
}
