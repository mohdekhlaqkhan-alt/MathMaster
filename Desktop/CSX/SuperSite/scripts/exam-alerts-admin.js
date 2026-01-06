/**
 * ============================================
 * BROPRO - EXAM ALERTS ADMIN MODULE
 * Moderation interface for Exam Alert System
 * ============================================
 */

const BroProExamAlertsAdmin = {
    isAdmin: false,
    pendingAlerts: [],
    approvedAlerts: [],

    // API Configuration
    API_BASE: 'https://asia-south1-supersite-2dcf9.cloudfunctions.net',

    // Firebase reference
    db: null,

    // ============================================
    // INITIALIZATION
    // ============================================

    init() {
        // Wait for Firebase to be ready
        if (window.firebase && firebase.firestore) {
            this.db = firebase.firestore();
        }

        // Check admin status
        if (window.firebase && firebase.auth) {
            firebase.auth().onAuthStateChanged(user => {
                if (user && user.email === 'mohdekhlaqkhan@gmail.com') {
                    this.isAdmin = true;
                    console.log('📢 Exam Alerts Admin: Initialized');
                }
            });
        }
    },

    // ============================================
    // OPEN MODERATION PANEL
    // ============================================

    openModerationPanel() {
        if (!this.isAdmin) {
            alert('⛔ Access Denied! Admin only.');
            return;
        }

        // Create modal if not exists
        let modal = document.getElementById('examAlertsModerationModal');
        if (!modal) {
            modal = this.createModerationModal();
            document.body.appendChild(modal);
        }

        modal.classList.add('active');
        this.loadPendingAlerts();
        this.loadApprovedAlerts();
    },

    closeModerationPanel() {
        const modal = document.getElementById('examAlertsModerationModal');
        if (modal) modal.classList.remove('active');
    },

    // ============================================
    // CREATE MODERATION MODAL
    // ============================================

    createModerationModal() {
        const modal = document.createElement('div');
        modal.id = 'examAlertsModerationModal';
        modal.className = 'modal-overlay exam-alerts-modal';
        modal.onclick = (e) => { if (e.target === modal) this.closeModerationPanel(); };

        modal.innerHTML = `
            <div class="exam-alerts-modal-content">
                <div class="modal-header">
                    <h2>📢 Exam Alerts Moderation</h2>
                    <button class="modal-close" onclick="BroProExamAlertsAdmin.closeModerationPanel()">×</button>
                </div>
                
                <div class="modal-tabs">
                    <button class="modal-tab active" onclick="BroProExamAlertsAdmin.switchTab('pending')">
                        🕐 Pending Review
                        <span class="tab-badge" id="pendingCount">0</span>
                    </button>
                    <button class="modal-tab" onclick="BroProExamAlertsAdmin.switchTab('approved')">
                        ✅ Approved
                        <span class="tab-badge" id="approvedCount">0</span>
                    </button>
                    <button class="modal-tab" onclick="BroProExamAlertsAdmin.switchTab('actions')">
                        ⚡ Actions
                    </button>
                </div>

                <div class="modal-body">
                    <!-- Pending Tab -->
                    <div class="tab-content active" id="pendingTab">
                        <div class="alerts-list" id="pendingAlertsList">
                            <div class="loading-state">
                                <div class="spinner"></div>
                                <p>Loading pending alerts...</p>
                            </div>
                        </div>
                    </div>

                    <!-- Approved Tab -->
                    <div class="tab-content" id="approvedTab">
                        <div class="alerts-list" id="approvedAlertsList">
                            <div class="loading-state">
                                <div class="spinner"></div>
                                <p>Loading approved alerts...</p>
                            </div>
                        </div>
                    </div>

                    <!-- Actions Tab -->
                    <div class="tab-content" id="actionsTab">
                        <div class="actions-grid">
                            <div class="action-card" onclick="BroProExamAlertsAdmin.triggerFetch()">
                                <div class="action-icon">🔄</div>
                                <h3>Trigger Fetch</h3>
                                <p>Manually run the exam news scraper</p>
                            </div>
                            <div class="action-card" onclick="BroProExamAlertsAdmin.checkHealth()">
                                <div class="action-icon">💚</div>
                                <h3>Health Check</h3>
                                <p>Verify the system is running</p>
                            </div>
                            <div class="action-card" onclick="BroProExamAlertsAdmin.addManualAlert()">
                                <div class="action-icon">➕</div>
                                <h3>Add Manual Alert</h3>
                                <p>Create a custom exam alert</p>
                            </div>
                            <div class="action-card" onclick="window.open('/exams/alerts/', '_blank')">
                                <div class="action-icon">👁️</div>
                                <h3>View Live Page</h3>
                                <p>Open the public Exam Alerts page</p>
                            </div>
                        </div>
                        <div class="system-status" id="systemStatus"></div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        this.injectStyles();

        return modal;
    },

    // ============================================
    // INJECT STYLES
    // ============================================

    injectStyles() {
        if (document.getElementById('examAlertsAdminStyles')) return;

        const style = document.createElement('style');
        style.id = 'examAlertsAdminStyles';
        style.textContent = `
            .exam-alerts-modal .exam-alerts-modal-content {
                width: 95%;
                max-width: 900px;
                max-height: 90vh;
                background: linear-gradient(145deg, #1a1a2e, #16213e);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            .exam-alerts-modal .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .exam-alerts-modal .modal-header h2 {
                margin: 0;
                font-size: 1.25rem;
                color: white;
            }

            .exam-alerts-modal .modal-close {
                width: 36px;
                height: 36px;
                border: none;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s;
            }

            .exam-alerts-modal .modal-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .exam-alerts-modal .modal-tabs {
                display: flex;
                gap: 0.5rem;
                padding: 0 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .exam-alerts-modal .modal-tab {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem 1.25rem;
                border: none;
                background: transparent;
                color: var(--text-secondary);
                font-size: 0.9rem;
                font-weight: 500;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                transition: all 0.3s;
            }

            .exam-alerts-modal .modal-tab:hover {
                color: white;
            }

            .exam-alerts-modal .modal-tab.active {
                color: white;
                border-bottom-color: var(--primary);
            }

            .exam-alerts-modal .tab-badge {
                background: rgba(139, 92, 246, 0.3);
                padding: 0.15rem 0.5rem;
                border-radius: 10px;
                font-size: 0.7rem;
                font-weight: 600;
            }

            .exam-alerts-modal .modal-body {
                flex: 1;
                overflow-y: auto;
                padding: 1.5rem;
            }

            .exam-alerts-modal .tab-content {
                display: none;
            }

            .exam-alerts-modal .tab-content.active {
                display: block;
            }

            .exam-alerts-modal .loading-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 3rem;
                color: var(--text-secondary);
            }

            .exam-alerts-modal .spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(255, 255, 255, 0.1);
                border-top-color: var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .exam-alerts-modal .alert-item {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1rem;
                transition: all 0.3s;
            }

            .exam-alerts-modal .alert-item:hover {
                border-color: rgba(255, 255, 255, 0.2);
            }

            .exam-alerts-modal .alert-item.urgent {
                border-color: rgba(239, 68, 68, 0.3);
                background: rgba(239, 68, 68, 0.05);
            }

            .exam-alerts-modal .alert-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 0.75rem;
            }

            .exam-alerts-modal .alert-exam {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .exam-alerts-modal .exam-icon {
                font-size: 1.75rem;
            }

            .exam-alerts-modal .exam-name {
                font-weight: 600;
                color: white;
            }

            .exam-alerts-modal .exam-category {
                font-size: 0.75rem;
                color: var(--text-secondary);
            }

            .exam-alerts-modal .alert-badges {
                display: flex;
                gap: 0.5rem;
            }

            .exam-alerts-modal .badge {
                padding: 0.25rem 0.5rem;
                border-radius: 6px;
                font-size: 0.7rem;
                font-weight: 600;
            }

            .exam-alerts-modal .badge.urgent {
                background: rgba(239, 68, 68, 0.2);
                color: #ef4444;
            }

            .exam-alerts-modal .badge.type {
                background: rgba(59, 130, 246, 0.2);
                color: #3b82f6;
            }

            .exam-alerts-modal .alert-title {
                color: white;
                font-size: 0.95rem;
                line-height: 1.4;
                margin-bottom: 0.5rem;
            }

            .exam-alerts-modal .alert-summary {
                color: var(--text-secondary);
                font-size: 0.85rem;
                line-height: 1.5;
                margin-bottom: 0.75rem;
            }

            .exam-alerts-modal .alert-actions {
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }

            .exam-alerts-modal .action-btn {
                flex: 1;
                padding: 0.6rem 1rem;
                border: none;
                border-radius: 8px;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }

            .exam-alerts-modal .action-btn.approve {
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
            }

            .exam-alerts-modal .action-btn.reject {
                background: rgba(239, 68, 68, 0.2);
                color: #ef4444;
            }

            .exam-alerts-modal .action-btn.delete {
                background: rgba(239, 68, 68, 0.1);
                color: #ef4444;
                flex: 0.5;
            }

            .exam-alerts-modal .action-btn:hover {
                transform: translateY(-1px);
            }

            .exam-alerts-modal .actions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }

            .exam-alerts-modal .action-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.5rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
            }

            .exam-alerts-modal .action-card:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
            }

            .exam-alerts-modal .action-icon {
                font-size: 2.5rem;
                margin-bottom: 0.75rem;
            }

            .exam-alerts-modal .action-card h3 {
                color: white;
                font-size: 1rem;
                margin-bottom: 0.25rem;
            }

            .exam-alerts-modal .action-card p {
                color: var(--text-secondary);
                font-size: 0.8rem;
            }

            .exam-alerts-modal .system-status {
                margin-top: 1.5rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
            }

            .exam-alerts-modal .empty-state {
                text-align: center;
                padding: 3rem;
                color: var(--text-secondary);
            }

            .exam-alerts-modal .empty-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
        `;

        document.head.appendChild(style);
    },

    // ============================================
    // TAB SWITCHING
    // ============================================

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.exam-alerts-modal .modal-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.closest('.modal-tab').classList.add('active');

        // Update tab content
        document.querySelectorAll('.exam-alerts-modal .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');
    },

    // ============================================
    // LOAD PENDING ALERTS
    // ============================================

    async loadPendingAlerts() {
        const container = document.getElementById('pendingAlertsList');
        if (!container || !this.db) return;

        try {
            const snapshot = await this.db.collection('examAlerts')
                .where('status', '==', 'pending')
                .orderBy('createdAt', 'desc')
                .limit(50)
                .get();

            this.pendingAlerts = [];
            snapshot.forEach(doc => {
                this.pendingAlerts.push({ id: doc.id, ...doc.data() });
            });

            // Update count badge
            document.getElementById('pendingCount').textContent = this.pendingAlerts.length;

            if (this.pendingAlerts.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">✅</div>
                        <h3>All caught up!</h3>
                        <p>No pending alerts to review</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = this.pendingAlerts.map(alert => this.renderAlertItem(alert, 'pending')).join('');

        } catch (error) {
            console.error('Error loading pending alerts:', error);
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">❌</div>
                    <p>Failed to load: ${error.message}</p>
                    <button onclick="BroProExamAlertsAdmin.loadPendingAlerts()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary); border: none; border-radius: 8px; color: white; cursor: pointer;">Retry</button>
                </div>
            `;
        }
    },

    // ============================================
    // LOAD APPROVED ALERTS
    // ============================================

    async loadApprovedAlerts() {
        const container = document.getElementById('approvedAlertsList');
        if (!container || !this.db) return;

        try {
            const snapshot = await this.db.collection('examAlerts')
                .where('status', '==', 'approved')
                .orderBy('createdAt', 'desc')
                .limit(30)
                .get();

            this.approvedAlerts = [];
            snapshot.forEach(doc => {
                this.approvedAlerts.push({ id: doc.id, ...doc.data() });
            });

            // Update count badge
            document.getElementById('approvedCount').textContent = this.approvedAlerts.length;

            if (this.approvedAlerts.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📭</div>
                        <h3>No approved alerts</h3>
                        <p>Approve some alerts from the Pending tab</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = this.approvedAlerts.map(alert => this.renderAlertItem(alert, 'approved')).join('');

        } catch (error) {
            console.error('Error loading approved alerts:', error);
            container.innerHTML = `<div class="empty-state"><p>Failed to load</p></div>`;
        }
    },

    // ============================================
    // RENDER ALERT ITEM
    // ============================================

    renderAlertItem(alert, mode) {
        const alertTypeLabels = {
            notification: '📢 Notification',
            application: '✍️ Application',
            admit_card: '🎫 Admit Card',
            exam_date: '📅 Exam Date',
            result: '📊 Result',
            answer_key: '🔑 Answer Key'
        };

        const urgentClass = alert.isUrgent ? 'urgent' : '';

        return `
            <div class="alert-item ${urgentClass}" data-id="${alert.id}">
                <div class="alert-header">
                    <div class="alert-exam">
                        <span class="exam-icon">${alert.icon || '📋'}</span>
                        <div>
                            <div class="exam-name">${alert.examShortName || alert.examName || 'Exam'}</div>
                            <div class="exam-category">${alert.category || 'school'}</div>
                        </div>
                    </div>
                    <div class="alert-badges">
                        ${alert.isUrgent ? '<span class="badge urgent">🚨 Urgent</span>' : ''}
                        <span class="badge type">${alertTypeLabels[alert.alertType] || '📢 Update'}</span>
                    </div>
                </div>
                <h4 class="alert-title">${this.escapeHtml(alert.title || '')}</h4>
                <p class="alert-summary">${this.escapeHtml(alert.summary || alert.title || '')}</p>
                ${alert.sourceUrl ? `<a href="${alert.sourceUrl}" target="_blank" style="color: var(--primary); font-size: 0.8rem;">🔗 View Source</a>` : ''}
                <div class="alert-actions">
                    ${mode === 'pending' ? `
                        <button class="action-btn approve" onclick="BroProExamAlertsAdmin.approveAlert('${alert.id}')">
                            ✅ Approve
                        </button>
                        <button class="action-btn reject" onclick="BroProExamAlertsAdmin.rejectAlert('${alert.id}')">
                            ❌ Reject
                        </button>
                    ` : `
                        <button class="action-btn delete" onclick="BroProExamAlertsAdmin.deleteAlert('${alert.id}')">
                            🗑️ Delete
                        </button>
                    `}
                </div>
            </div>
        `;
    },

    // ============================================
    // MODERATION ACTIONS
    // ============================================

    async approveAlert(alertId) {
        if (!this.db) return;

        try {
            await this.db.collection('examAlerts').doc(alertId).update({
                status: 'approved',
                moderatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                moderatedBy: 'admin'
            });

            this.showToast('success', '✅ Alert approved!');
            this.loadPendingAlerts();
            this.loadApprovedAlerts();

        } catch (error) {
            this.showToast('error', '❌ Failed: ' + error.message);
        }
    },

    async rejectAlert(alertId) {
        if (!this.db) return;

        try {
            await this.db.collection('examAlerts').doc(alertId).update({
                status: 'rejected',
                moderatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                moderatedBy: 'admin'
            });

            this.showToast('success', '❌ Alert rejected');
            this.loadPendingAlerts();

        } catch (error) {
            this.showToast('error', '❌ Failed: ' + error.message);
        }
    },

    async deleteAlert(alertId) {
        if (!confirm('Are you sure you want to delete this alert?')) return;

        try {
            await this.db.collection('examAlerts').doc(alertId).delete();
            this.showToast('success', '🗑️ Alert deleted');
            this.loadApprovedAlerts();

        } catch (error) {
            this.showToast('error', '❌ Failed: ' + error.message);
        }
    },

    // ============================================
    // ACTIONS
    // ============================================

    async triggerFetch() {
        const statusEl = document.getElementById('systemStatus');
        statusEl.innerHTML = '<p style="color: var(--primary);">🔄 Triggering exam fetch...</p>';

        try {
            // Call the Cloud Function
            const response = await fetch(`${this.API_BASE}/healthCheck`);
            const data = await response.json();

            if (data.status === 'healthy') {
                // Now trigger the actual fetch via callable function
                // For now, show success
                statusEl.innerHTML = `
                    <h4 style="color: #22c55e;">✅ System Healthy</h4>
                    <p>Service: ${data.service}</p>
                    <p>Exams Monitored: ${data.examsMonitored}</p>
                    <p style="color: var(--text-secondary); font-size: 0.8rem;">Note: To trigger a manual fetch, use Firebase Console → Functions → triggerExamFetch</p>
                `;
            }

        } catch (error) {
            statusEl.innerHTML = `<p style="color: #ef4444;">❌ Error: ${error.message}</p>`;
        }
    },

    async checkHealth() {
        const statusEl = document.getElementById('systemStatus');
        statusEl.innerHTML = '<p style="color: var(--primary);">🔍 Checking system health...</p>';

        try {
            const response = await fetch(`${this.API_BASE}/healthCheck`);
            const data = await response.json();

            statusEl.innerHTML = `
                <h4 style="color: #22c55e; margin-bottom: 0.5rem;">💚 System Status: ${data.status.toUpperCase()}</h4>
                <div style="display: grid; gap: 0.5rem; font-size: 0.9rem;">
                    <p>🏷️ Service: ${data.service}</p>
                    <p>📦 Version: ${data.version}</p>
                    <p>🎯 Exams Monitored: ${data.examsMonitored}</p>
                    <p>🕐 Checked: ${new Date(data.timestamp).toLocaleString()}</p>
                </div>
            `;

        } catch (error) {
            statusEl.innerHTML = `
                <h4 style="color: #ef4444;">❌ System Offline</h4>
                <p>${error.message}</p>
            `;
        }
    },

    addManualAlert() {
        const examName = prompt('Enter Exam Name (e.g., "JNV Class 9"):');
        if (!examName) return;

        const title = prompt('Enter Alert Title:');
        if (!title) return;

        const alertType = prompt('Alert Type (notification/application/admit_card/result/exam_date):') || 'notification';
        const isUrgent = confirm('Is this urgent?');

        // Save to Firestore
        this.db.collection('examAlerts').add({
            examName: examName,
            examShortName: examName.split(' ')[0],
            title: title,
            summary: title,
            alertType: alertType,
            isUrgent: isUrgent,
            category: 'school',
            icon: '📋',
            status: 'approved', // Admin manual entries are auto-approved
            isOfficial: true,
            sourceType: 'Admin Manual Entry',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            this.showToast('success', '✅ Alert created!');
            this.loadApprovedAlerts();
        }).catch(err => {
            this.showToast('error', '❌ Failed: ' + err.message);
        });
    },

    // ============================================
    // UTILITIES
    // ============================================

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    showToast(type, message) {
        // Try to use existing admin toast
        if (window.BroProAdmin && BroProAdmin.showAdminToast) {
            BroProAdmin.showAdminToast(type, message);
            return;
        }

        // Fallback
        alert(message);
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    BroProExamAlertsAdmin.init();
});

// Make globally accessible
window.BroProExamAlertsAdmin = BroProExamAlertsAdmin;
