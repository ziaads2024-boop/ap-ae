import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

// Messages sent from /contact/ (contact_submissions; admins read via RLS).
export default function ContactMessagesTab() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('id, name, email, subject, message, status, created_at')
        .order('created_at', { ascending: false })
        .limit(200);
      if (error) throw error;
      return data || [];
    },
  });

  const setStatus = async (id: string, status: string) => {
    await supabase.from('contact_submissions').update({ status }).eq('id', id);
    qc.invalidateQueries({ queryKey: ['contact-submissions'] });
  };

  if (isLoading) return <p className="p-6 text-sm text-muted-foreground">Loading messages…</p>;
  if (error) return <p className="p-6 text-sm text-red-700">Could not load messages: {(error as Error).message}</p>;

  return (
    <div className="space-y-4 p-1">
      <div>
        <h2 className="text-xl font-semibold">Contact messages</h2>
        <p className="text-sm text-muted-foreground">Sent from the public contact form. Reply by email.</p>
      </div>
      {data!.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
      <ul className="space-y-3">
        {data!.map((m) => (
          <li key={m.id} className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{m.name} <span className="font-normal text-muted-foreground">· {m.subject}</span></p>
              <span className="text-xs text-muted-foreground">{format(new Date(m.created_at), 'd MMM yyyy, HH:mm')} · {m.status || 'new'}</span>
            </div>
            <p className="mt-2 whitespace-pre-line text-sm">{m.message}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {m.email && (
                <Button asChild size="sm" variant="outline">
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || 'your message to AppointPanda'}`)}`}><Mail className="mr-1 h-4 w-4" /> Reply to {m.email}</a>
                </Button>
              )}
              {m.status !== 'done' && <Button size="sm" variant="secondary" onClick={() => setStatus(m.id, 'done')}>Mark done</Button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
