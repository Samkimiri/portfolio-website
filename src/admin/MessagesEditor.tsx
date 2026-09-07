import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import {
  deleteSubmission,
  listContactSubmissions,
  setSubmissionRead,
  type ContactSubmission,
} from "../lib/contactSubmissions";
import { cardClasses } from "./shared";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function MessagesEditor() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await listContactSubmissions();
    setMessages(data);
    setError(error);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(message: ContactSubmission) {
    setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, read: !m.read } : m)));
    await setSubmissionRead(message.id, !message.read);
  }

  async function remove(message: ContactSubmission) {
    if (!confirm(`Delete the message from ${message.name}? This can't be undone.`)) return;
    setMessages((prev) => prev.filter((m) => m.id !== message.id));
    await deleteSubmission(message.id);
  }

  if (loading) return <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading messages…</p>;

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-800 dark:text-red-300">
        Couldn&apos;t load messages: {error}
        {error.toLowerCase().includes("does not exist") && (
          <p className="mt-1">
            The <code className="font-mono">contact_submissions</code> table doesn&apos;t exist yet — run{" "}
            <code className="font-mono">supabase/schema.sql</code> in your Supabase SQL editor.
          </p>
        )}
      </div>
    );
  }

  if (messages.length === 0) {
    return <p className="text-sm text-neutral-500 dark:text-neutral-400">No messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${cardClasses} ${message.read ? "opacity-70" : "border-emerald-500/40"}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                {message.name} {!message.read && <span className="ml-1 text-xs font-normal text-emerald-600 dark:text-emerald-400">New</span>}
              </p>
              <a href={`mailto:${message.email}`} className="text-sm text-neutral-500 hover:underline dark:text-neutral-400">
                {message.email}
              </a>
              <p className="text-xs text-neutral-400 dark:text-neutral-600">{formatDate(message.created_at)}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => toggleRead(message)}
                aria-label={message.read ? "Mark as unread" : "Mark as read"}
                title={message.read ? "Mark as unread" : "Mark as read"}
                className="rounded-full border border-neutral-300 p-2 text-neutral-500 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400"
              >
                {message.read ? <Mail size={14} /> : <MailOpen size={14} />}
              </button>
              <button
                type="button"
                onClick={() => remove(message)}
                aria-label="Delete message"
                title="Delete message"
                className="rounded-full border border-neutral-300 p-2 text-neutral-500 hover:border-red-400 hover:text-red-600 dark:border-neutral-700 dark:text-neutral-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300">{message.message}</p>
        </div>
      ))}
    </div>
  );
}
