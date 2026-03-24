import { supabase } from './config/supabase';
import type { Channel, QueueStatus } from './types';

export async function addToQueue(
  channel: Channel,
  contentType: string,
  triggerType: string,
  generatedContent: Record<string, unknown>,
): Promise<string> {
  const { data, error } = await supabase
    .from('content_queue')
    .insert({
      channel,
      content_type: contentType,
      trigger_type: triggerType,
      generated_content: generatedContent,
      status: 'pending' as QueueStatus,
      created_at: new Date().toISOString(),
      approved_at: null,
      posted_at: null,
      edit_history: [],
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to add to queue: ${error.message}`);
  return data.id;
}

export async function updateQueueStatus(
  id: string,
  status: QueueStatus,
): Promise<void> {
  const updates: Record<string, unknown> = { status };
  if (status === 'approved') updates.approved_at = new Date().toISOString();
  if (status === 'posted') updates.posted_at = new Date().toISOString();

  const { error } = await supabase
    .from('content_queue')
    .update(updates)
    .eq('id', id);

  if (error) throw new Error(`Failed to update queue item: ${error.message}`);
}

export async function getQueueItems(status?: QueueStatus) {
  let query = supabase
    .from('content_queue')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch queue: ${error.message}`);
  return data;
}
