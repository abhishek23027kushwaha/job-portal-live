import React from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ShareModal = ({ isOpen, onClose, jobTitle, url }) => {
  const [copied, setCopied] = React.useState(false);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6 text-[#25D366]" />,
      color: 'bg-green-50',
      link: `https://api.whatsapp.com/send?text=Check out this job: ${encodeURIComponent(jobTitle)} at ${encodeURIComponent(url)}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6 text-[#0A66C2]" />,
      color: 'bg-blue-50',
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-6 h-6 text-[#1DA1F2]" />,
      color: 'bg-sky-50',
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Check out this job: ' + jobTitle)}`
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6 text-[#1877F2]" />,
      color: 'bg-indigo-50',
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Share Job</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-14 h-14 ${option.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95`}>
                      {option.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{option.name}</span>
                  </a>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-500 ml-1">Page Link</p>
                <div className="relative group">
                  <div className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 truncate">
                    {url}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-2 top-1.5 p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-sm transition-all shadow-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-400 font-medium italic">Help your friends find their dream job ✨</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
