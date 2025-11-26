import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ---------------------------------------------------------------------------
  // GEMINI API INTEGRATION
  // Using gemini-2.5-flash for fast text generation
  // ---------------------------------------------------------------------------
  const generateCaption = async () => {
    if (!process.env.API_KEY) {
      alert("API Key not found in environment. Simulated generation.");
      setCaption("✨ Just captured this amazing moment! #Life #Vibes (Simulated AI)");
      return;
    }

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // If image exists, we could use multimodal, but for this demo keeping it simple 
      // or assuming user wants a creative caption based on a short description if no image analysis is strictly implemented in this mock.
      // Let's assume we want a caption for a generic social media post.
      
      const prompt = selectedImage 
        ? "Write a catchy, short, and engaging social media caption for this image. Include emojis and hashtags." 
        : "Write a deep, inspiring quote for a social media status update.";

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setCaption(response.text.trim());
    } catch (error) {
      console.error("Gemini Error:", error);
      setCaption("Could not generate caption. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePost = () => {
    // Logic to save to DB (mocked)
    onClose();
    alert("Post created successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row h-[70vh] md:h-[600px] shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Left Side: Media Upload */}
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          {selectedImage ? (
            <div className="relative w-full h-full">
              <img src={selectedImage} className="w-full h-full object-cover" alt="Preview" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="text-center p-6">
              <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Drag photos and videos here</h3>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Select from computer
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*,video/*"
                onChange={handleImageSelect}
              />
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 flex flex-col bg-white dark:bg-gray-900">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
             <h2 className="font-bold">Create new post</h2>
             <button onClick={handlePost} className="text-primary font-bold hover:text-blue-700">Share</button>
          </div>
          
          <div className="p-4 flex-1">
             <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
               <span className="font-semibold text-sm">alex_wave</span>
             </div>
             
             <textarea 
               className="w-full h-32 md:h-48 resize-none outline-none bg-transparent text-sm"
               placeholder="Write a caption..."
               value={caption}
               onChange={(e) => setCaption(e.target.value)}
             ></textarea>
             
             <div className="flex justify-between items-center mt-2">
               <button 
                 onClick={generateCaption} 
                 disabled={isGenerating}
                 className="text-xs flex items-center gap-1 text-purple-500 font-semibold border border-purple-200 dark:border-purple-900 rounded-full px-3 py-1 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
               >
                 {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                 AI Caption
               </button>
               <span className="text-gray-400 text-xs">{caption.length}/2200</span>
             </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
             <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 mb-2">
                <span className="text-sm">Add Location</span>
                <span className="text-gray-400 text-lg">›</span>
             </div>
             <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                <span className="text-sm">Accessibility</span>
                <span className="text-gray-400 text-lg">›</span>
             </div>
          </div>
        </div>
        
        {/* Close Button for Mobile */}
        <button onClick={onClose} className="absolute top-2 right-2 md:hidden text-white z-50 bg-black/50 rounded-full p-2">
           <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;