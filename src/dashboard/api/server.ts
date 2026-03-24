import express from 'express';
import cors from 'cors';
import { supabase } from '../../config/supabase';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ── GET /queue — all pending items grouped by channel ──
app.get('/queue', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('content_queue')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const grouped: Record<string, typeof data> = {};
    for (const item of data || []) {
      const ch = item.channel;
      if (!grouped[ch]) grouped[ch] = [];
      grouped[ch].push(item);
    }

    res.json({ items: grouped, total: data?.length || 0 });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ── POST /queue/:id/approve ──
app.post('/queue/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('content_queue')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, id, status: 'approved' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ── POST /queue/:id/reject ──
app.post('/queue/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('content_queue')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, id, status: 'rejected' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ── POST /queue/:id/edit ──
app.post('/queue/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Fetch current item to preserve edit history
    const { data: current, error: fetchError } = await supabase
      .from('content_queue')
      .select('generated_content, edit_history')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    const editHistory = current.edit_history || [];
    editHistory.push({
      editedAt: new Date().toISOString(),
      previousContent: current.generated_content,
    });

    const { error } = await supabase
      .from('content_queue')
      .update({
        generated_content: content,
        edit_history: editHistory,
      })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, id, status: 'edited' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ── GET /analytics ──
app.get('/analytics', async (_req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('content_queue')
      .select('channel, status, created_at')
      .gte('created_at', sevenDaysAgo);

    if (error) throw error;

    const analytics = {
      totals: { approved: 0, rejected: 0, pending: 0, posted: 0 },
      byChannel: {} as Record<string, Record<string, number>>,
      byDate: {} as Record<string, number>,
    };

    for (const item of data || []) {
      // Totals
      analytics.totals[item.status as keyof typeof analytics.totals]++;

      // By channel
      if (!analytics.byChannel[item.channel]) {
        analytics.byChannel[item.channel] = { approved: 0, rejected: 0, pending: 0, posted: 0 };
      }
      analytics.byChannel[item.channel][item.status]++;

      // By date
      const date = item.created_at.split('T')[0];
      analytics.byDate[date] = (analytics.byDate[date] || 0) + 1;
    }

    const total = analytics.totals.approved + analytics.totals.rejected;
    const approvalRate = total > 0 ? Math.round((analytics.totals.approved / total) * 100) : 0;
    const rejectionRate = total > 0 ? Math.round((analytics.totals.rejected / total) * 100) : 0;

    res.json({ ...analytics, approvalRate, rejectionRate });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`[Dashboard API] Running on http://localhost:${PORT}`);
});

export default app;
