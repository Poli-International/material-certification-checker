/*
═══════════════════════════════════════════════════════════════
MATERIAL CERTIFICATION DECODER - STUDIO VAULT MODULE
Poli International
═══════════════════════════════════════════════════════════════
*/

(function() {
  'use strict';

  function tr(key, params) {
    if (typeof window !== 'undefined') {
      if (typeof window.t === 'function') return window.t(key, params);
      if (window.i18n && typeof window.i18n.t === 'function') return window.i18n.t(key, params);
    }
    return key;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const STORAGE_KEY = 'cert_checker_studio_records_v2';

  class StudioVault {
    constructor() {
      this.storageKey = STORAGE_KEY;
    }

    getRecords() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    saveRecords(records) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(records));
      } catch (e) {
        console.warn('LocalStorage save failed', e);
      }
    }

    addRecord(record) {
      const records = this.getRecords();
      records.unshift(record);
      this.saveRecords(records);
      return record;
    }

    deleteRecord(id) {
      const records = this.getRecords().filter(r => r.id !== id);
      this.saveRecords(records);
      return records;
    }

    clearVault() {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (e) {
        console.warn('LocalStorage clear failed', e);
      }
    }

    getCountFormatted() {
      const count = this.getRecords().length;
      if (count === 1) {
        return tr('studio_vault.records_count_single', { count });
      }
      return tr('studio_vault.records_count', { count });
    }

    renderList(containerId, countBadgeId, onSelectRecord) {
      const container = document.getElementById(containerId);
      const countBadge = countBadgeId ? document.getElementById(countBadgeId) : null;

      if (!container) return;

      const records = this.getRecords();
      if (countBadge) {
        countBadge.textContent = this.getCountFormatted();
      }

      if (records.length === 0) {
        container.innerHTML = `
          <div class="studio-record__empty">
            <p>${escapeHTML(tr('studio_vault.empty_vault'))}</p>
          </div>
        `;
        return;
      }

      container.innerHTML = records.map(rec => `
        <div class="studio-record__item" data-record-id="${escapeHTML(rec.id)}">
          <div class="studio-record__item-header">
            <span class="studio-record__item-id">${escapeHTML(rec.id)}</span>
            <span class="studio-record__item-date">${escapeHTML(rec.date)}</span>
          </div>
          <div class="studio-record__item-body">
            <strong class="studio-record__item-claim">"${escapeHTML(rec.evaluatedClaim.slice(0, 70))}${rec.evaluatedClaim.length > 70 ? '...' : ''}"</strong>
            <span class="studio-record__item-tier">[${escapeHTML(rec.tierTitle ? rec.tierTitle.split(':')[0] : '')}]</span>
          </div>
          <div class="studio-record__item-actions no-print">
            <button type="button" class="btn btn--secondary btn--small view-rec-btn" data-id="${escapeHTML(rec.id)}">
              ${escapeHTML(tr('studio_vault.view_record'))}
            </button>
            <button type="button" class="btn btn--secondary btn--small delete-rec-btn" data-id="${escapeHTML(rec.id)}" title="${escapeHTML(tr('studio_vault.delete_record'))}">
              🗑️
            </button>
          </div>
        </div>
      `).join('');

      container.querySelectorAll('.view-rec-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const rec = this.getRecords().find(r => r.id === id);
          if (rec && typeof onSelectRecord === 'function') {
            onSelectRecord(rec);
          }
        });
      });

      container.querySelectorAll('.delete-rec-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          this.deleteRecord(id);
          this.renderList(containerId, countBadgeId, onSelectRecord);
          const detail = document.getElementById('studio-record-detail');
          if (detail) detail.innerHTML = '';
        });
      });
    }

    exportJSON() {
      const records = this.getRecords();
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
      const a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', `studio-vault-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }

  window.StudioVault = new StudioVault();
})();
