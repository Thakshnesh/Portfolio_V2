import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { MessageItem } from '../../types';
import { X, Mail, Clock, ShieldCheck, Trash2, CheckCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MessagesViewerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { playClick, playSelect } = useAudio();

  const fetchMessages = async () => {
    setLoading(true);
    const data = await api.getMessages();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const handleMarkRead = async (id: string) => {
    playClick();
    await api.markRead(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl glass-panel bg-[#091124]/95 border border-blue-500/40 p-5 sm:p-6 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-blue-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span>Contact Messages Inbox</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono">
                  {messages.length} inquiries
                </span>
              </h3>
              <p className="text-xs text-slate-400">Live submissions recorded in backend database</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              title="Refresh"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
              <span>Fetching inbox from backend...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Mail className="w-10 h-10 mx-auto mb-2 text-slate-500 opacity-60" />
              <p className="text-sm">No messages yet. Send a test message via the contact form!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl border transition-all ${
                  msg.read
                    ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                    : 'bg-blue-950/40 border-blue-500/40 text-white shadow-lg shadow-blue-900/20'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{msg.name}</span>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                          NEW
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {msg.subject && (
                  <div className="text-xs font-semibold text-blue-200 mb-1">
                    Subject: {msg.subject}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-2.5 rounded-lg border border-white/5">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-[10px] text-slate-500 font-mono">IP: {msg.ip || 'Client'}</span>
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Mark as read</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-blue-500/20 flex justify-between items-center text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-blue-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Connected to Express & SQLite Store
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
