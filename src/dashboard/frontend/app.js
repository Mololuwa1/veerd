const API_BASE = 'http://localhost:3000';

const CHANNEL_ICONS = {
  email: '\u2709\uFE0F',
  push: '\uD83D\uDD14',
  reddit: '\uD83E\uDDAB',
  twitter: '\uD83D\uDCAC',
  tiktok: '\uD83C\uDFAC',
};

const CHANNELS = ['email', 'push', 'reddit', 'twitter', 'tiktok'];

let state = {
  items: {},
  analytics: null,
  activeTab: 'email',
  editingId: null,
  editContent: '',
  loading: true,
};

// ── API calls ──

async function fetchQueue() {
  try {
    const res = await fetch(`${API_BASE}/queue`);
    const data = await res.json();
    state.items = data.items || {};
    state.loading = false;
    render();
  } catch (err) {
    console.error('Failed to fetch queue:', err);
    state.loading = false;
    render();
  }
}

async function fetchAnalytics() {
  try {
    const res = await fetch(`${API_BASE}/analytics`);
    state.analytics = await res.json();
    render();
  } catch (err) {
    console.error('Failed to fetch analytics:', err);
  }
}

async function approveItem(id) {
  await fetch(`${API_BASE}/queue/${id}/approve`, { method: 'POST' });
  fetchQueue();
}

async function rejectItem(id) {
  await fetch(`${API_BASE}/queue/${id}/reject`, { method: 'POST' });
  fetchQueue();
}

async function saveEdit(id) {
  let content;
  try {
    content = JSON.parse(state.editContent);
  } catch {
    content = { text: state.editContent };
  }

  await fetch(`${API_BASE}/queue/${id}/edit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  state.editingId = null;
  state.editContent = '';
  fetchQueue();
}

// ── Rendering ──

function formatContent(content) {
  if (typeof content === 'string') return content;
  if (!content) return '';

  const parts = [];
  if (content.subject) parts.push(`Subject: ${content.subject}`);
  if (content.previewText) parts.push(`Preview: ${content.previewText}`);
  if (content.title) parts.push(`Title: ${content.title}`);
  if (content.body && typeof content.body === 'string') parts.push(`\n${content.body}`);
  if (content.hook) parts.push(`Hook: ${content.hook}`);
  if (Array.isArray(content.body)) parts.push(`\n${content.body.map(b => `\u2022 ${b}`).join('\n')}`);
  if (content.cta) parts.push(`\nCTA: ${content.cta}`);
  if (content.caption) parts.push(`Caption: ${content.caption}`);
  if (content.responseBody) parts.push(content.responseBody);
  if (Array.isArray(content.tweets)) parts.push(content.tweets.join('\n\n---\n\n'));
  if (content.contentType) parts.push(`Type: ${content.contentType}`);
  if (content.triggerType) parts.push(`Trigger: ${content.triggerType}`);
  if (Array.isArray(content.hashtags)) parts.push(`\n${content.hashtags.join(' ')}`);

  return parts.join('\n') || JSON.stringify(content, null, 2);
}

function charCount(content) {
  const text = formatContent(content);
  return text.length;
}

function renderCard(item) {
  const content = item.generated_content || item.generatedContent;
  const isEditing = state.editingId === item.id;
  const statusClass = `status-${item.status}`;

  return `
    <div class="card" data-id="${item.id}">
      <div class="card-header">
        <div class="card-channel">
          <span class="channel-icon">${CHANNEL_ICONS[item.channel] || '\uD83D\uDCDD'}</span>
          <strong>${item.channel}</strong>
          <span class="${statusClass}" style="font-size:12px; text-transform:capitalize">${item.status}</span>
        </div>
        <span class="card-trigger">${item.trigger_type || item.triggerType || 'manual'}</span>
      </div>

      ${isEditing ? `
        <div class="editor">
          <textarea id="edit-${item.id}">${typeof content === 'string' ? content : JSON.stringify(content, null, 2)}</textarea>
          <div class="editor-actions">
            <button class="btn btn-save" onclick="handleSaveEdit('${item.id}')">Save</button>
            <button class="btn btn-cancel" onclick="handleCancelEdit()">Cancel</button>
          </div>
        </div>
      ` : `
        <div class="card-body">${formatContent(content)}</div>
      `}

      <div class="card-meta">
        <span class="char-count">${charCount(content)} chars</span>
        <div class="card-actions">
          ${item.status === 'pending' ? `
            <button class="btn btn-edit" onclick="handleEdit('${item.id}')">Edit</button>
            <button class="btn btn-approve" onclick="handleApprove('${item.id}')">Approve</button>
            <button class="btn btn-reject" onclick="handleReject('${item.id}')">Reject</button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function render() {
  const root = document.getElementById('root');

  const channelItems = state.items[state.activeTab] || [];
  const pendingItems = channelItems.filter(i => i.status === 'pending');
  const totalPending = Object.values(state.items)
    .flat()
    .filter(i => i.status === 'pending').length;

  const analytics = state.analytics;

  root.innerHTML = `
    <div class="header">
      <h1><span>Veerd</span> Content Queue</h1>
      <div class="header-stats">
        <span class="pending-badge">${totalPending} pending</span>
        <span>Last refreshed: ${new Date().toLocaleTimeString()}</span>
      </div>
    </div>

    <div class="tabs">
      ${CHANNELS.map(ch => {
        const count = (state.items[ch] || []).filter(i => i.status === 'pending').length;
        return `<button class="tab ${state.activeTab === ch ? 'active' : ''}" onclick="handleTabChange('${ch}')">
          ${CHANNEL_ICONS[ch]} ${ch.charAt(0).toUpperCase() + ch.slice(1)}
          <span class="count">${count}</span>
        </button>`;
      }).join('')}
    </div>

    <div class="content">
      ${state.loading ? `
        <div class="loading">Loading content queue...</div>
      ` : channelItems.length === 0 ? `
        <div class="empty-state">
          <p>No content in the ${state.activeTab} queue yet.</p>
          <p style="font-size:13px; margin-top:8px">Content will appear here when generators run.</p>
        </div>
      ` : `
        ${channelItems.map(item => renderCard(item)).join('')}
      `}

      ${analytics ? `
        <div class="analytics">
          <h3>Last 7 Days</h3>
          <div class="analytics-grid">
            <div class="stat-card">
              <div class="stat-value">${analytics.approvalRate}%</div>
              <div class="stat-label">Approval Rate</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${analytics.rejectionRate}%</div>
              <div class="stat-label">Rejection Rate</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${analytics.totals?.approved || 0}</div>
              <div class="stat-label">Approved</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${analytics.totals?.pending || 0}</div>
              <div class="stat-label">Pending</div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ── Event handlers (global) ──

window.handleTabChange = function(tab) {
  state.activeTab = tab;
  render();
};

window.handleApprove = function(id) {
  approveItem(id);
};

window.handleReject = function(id) {
  rejectItem(id);
};

window.handleEdit = function(id) {
  const items = Object.values(state.items).flat();
  const item = items.find(i => i.id === id);
  if (!item) return;

  const content = item.generated_content || item.generatedContent;
  state.editingId = id;
  state.editContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
  render();
};

window.handleSaveEdit = function(id) {
  const textarea = document.getElementById(`edit-${id}`);
  if (textarea) state.editContent = textarea.value;
  saveEdit(id);
};

window.handleCancelEdit = function() {
  state.editingId = null;
  state.editContent = '';
  render();
};

// ── Init ──

fetchQueue();
fetchAnalytics();

// Auto-refresh every 30 seconds
setInterval(() => {
  fetchQueue();
  fetchAnalytics();
}, 30000);
