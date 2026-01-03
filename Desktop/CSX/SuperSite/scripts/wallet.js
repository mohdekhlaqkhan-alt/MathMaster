/**
 * BroPro Wallet System - Premium Wallet Top-Up Feature
 * Handles wallet management, top-up via Cashfree, and transaction history
 */

const BroProWallet = {
    // Configuration
    config: {
        minTopUp: 1,
        maxTopUp: 9999,
        quickAmounts: [10, 50, 100, 500],
        currency: '₹'
    },

    // Initialize wallet system
    init() {
        console.log('💰 BroPro Wallet System initialized');
        this.setupWalletListeners();
        this.updateAllWalletDisplays();
    },

    // ============================================
    // WALLET BALANCE MANAGEMENT
    // ============================================

    /**
     * Get current wallet balance
     * Formula: (XP/XP_TO_RUPEE_DIVISOR) + walletAdded - walletSpent
     */
    getBalance() {
        const profile = window.BroProPlayer?.load() || {};
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const earnedFromXP = Math.floor((profile.xp || 0) / divisor);
        const addedViaPurchase = profile.walletAdded || 0;
        const spent = profile.walletSpent || 0;
        return Math.max(0, earnedFromXP + addedViaPurchase - spent);
    },

    /**
     * Get wallet breakdown for display
     */
    getBreakdown() {
        const profile = window.BroProPlayer?.load() || {};
        const divisor = window.XP_TO_RUPEE_DIVISOR || 40;
        const earnedFromXP = Math.floor((profile.xp || 0) / divisor);
        const addedViaPurchase = profile.walletAdded || 0;
        const spent = profile.walletSpent || 0;

        return {
            earnedFromXP,
            addedViaPurchase,
            spent,
            balance: Math.max(0, earnedFromXP + addedViaPurchase - spent)
        };
    },

    /**
     * Add money to wallet (after successful payment)
     */
    async addMoney(amount, orderId) {
        const profile = window.BroProPlayer?.load() || {};

        // Update local profile
        profile.walletAdded = (profile.walletAdded || 0) + amount;

        // Add to transaction history
        if (!profile.walletTransactions) {
            profile.walletTransactions = [];
        }

        profile.walletTransactions.push({
            id: `txn_${Date.now()}`,
            type: 'credit',
            amount: amount,
            source: 'cashfree',
            orderId: orderId,
            description: `Added ₹${amount} via Cashfree`,
            timestamp: new Date().toISOString(),
            balanceAfter: this.getBalance() + amount
        });

        // Keep only last 100 transactions
        if (profile.walletTransactions.length > 100) {
            profile.walletTransactions = profile.walletTransactions.slice(-100);
        }

        // Save locally
        window.BroProPlayer?.save(profile);

        // Sync to Firestore
        await this.syncToFirestore(profile);

        // Update all displays
        this.updateAllWalletDisplays();

        // Play success sound
        if (window.BroProSounds) {
            BroProSounds.play('purchase');
        }

        console.log(`💰 Added ₹${amount} to wallet. New balance: ₹${this.getBalance()}`);

        return { success: true, newBalance: this.getBalance() };
    },

    /**
     * Sync wallet data to Firestore
     */
    async syncToFirestore(profile) {
        const user = firebase.auth()?.currentUser;
        if (!user || !window.BroProAdmin?.db) return;

        const walletData = {
            walletAdded: profile.walletAdded || 0,
            walletSpent: profile.walletSpent || 0,
            lastWalletUpdate: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            // Update multiple collections for redundancy
            const db = window.BroProAdmin.db;

            await Promise.all([
                db.collection('presence').doc(user.uid).set(walletData, { merge: true }),
                db.collection('leaderboard').doc(user.uid).set(walletData, { merge: true }),
                db.collection('users').doc(user.uid).set(walletData, { merge: true })
            ]);

            console.log('💰 Wallet synced to Firestore');
        } catch (error) {
            console.error('❌ Wallet sync failed:', error);
        }
    },

    // ============================================
    // WALLET UI
    // ============================================

    /**
     * Update all wallet displays across the site
     */
    updateAllWalletDisplays() {
        const balance = this.getBalance();
        const formattedBalance = `₹${balance.toLocaleString('en-IN')}`;

        // Navbar wallet
        const navWallet = document.getElementById('navWallet');
        if (navWallet) navWallet.textContent = formattedBalance;

        // Profile wallet
        const profileWallet = document.getElementById('profileWallet');
        if (profileWallet) profileWallet.textContent = formattedBalance;

        // Chat wallet
        const chatWallet = document.getElementById('chatWalletAmount');
        if (chatWallet) chatWallet.textContent = formattedBalance;

        // Header wallet indicator
        const headerWallet = document.getElementById('headerWalletBalance');
        if (headerWallet) headerWallet.textContent = formattedBalance;

        // Wallet modal balance
        const walletModalBalance = document.getElementById('walletModalBalance');
        if (walletModalBalance) walletModalBalance.textContent = balance.toLocaleString('en-IN');
    },

    /**
     * Open the Add Money Modal
     */
    openAddMoneyModal(prefilledAmount = null, context = 'general') {
        // Check if user is logged in
        const user = firebase.auth()?.currentUser;
        if (!user) {
            if (window.openAuthModal) {
                openAuthModal();
            }
            return;
        }

        // Remove existing modal if any
        const existing = document.getElementById('walletTopUpModal');
        if (existing) existing.remove();

        const breakdown = this.getBreakdown();

        const modalHTML = `
            <div class="wallet-modal-overlay" id="walletTopUpModal" onclick="if(event.target === this) BroProWallet.closeAddMoneyModal()">
                <div class="wallet-modal-container">
                    <!-- Animated Background -->
                    <div class="wallet-modal-bg">
                        <div class="wallet-particle p1">💰</div>
                        <div class="wallet-particle p2">✨</div>
                        <div class="wallet-particle p3">💎</div>
                        <div class="wallet-particle p4">⭐</div>
                        <div class="wallet-glow"></div>
                    </div>
                    
                    <!-- Header -->
                    <div class="wallet-modal-header">
                        <div class="wallet-header-icon">
                            <span class="wallet-icon-main">💳</span>
                            <span class="wallet-icon-sparkle">✨</span>
                        </div>
                        <h2 class="wallet-modal-title">Add Money</h2>
                        <p class="wallet-modal-subtitle">Top up your wallet instantly</p>
                        <button class="wallet-close-btn" onclick="BroProWallet.closeAddMoneyModal()">✕</button>
                    </div>
                    
                    <!-- Current Balance Card -->
                    <div class="wallet-balance-card">
                        <div class="balance-label">Current Balance</div>
                        <div class="balance-amount">
                            <span class="currency">₹</span>
                            <span class="amount" id="walletModalBalance">${breakdown.balance.toLocaleString('en-IN')}</span>
                        </div>
                        <div class="balance-breakdown">
                            <span class="breakdown-item earned" title="Earned from quizzes">
                                <span class="breakdown-icon">🎮</span>
                                <span>₹${breakdown.earnedFromXP}</span>
                            </span>
                            ${breakdown.addedViaPurchase > 0 ? `
                            <span class="breakdown-item added" title="Added via purchase">
                                <span class="breakdown-icon">💳</span>
                                <span>+₹${breakdown.addedViaPurchase}</span>
                            </span>
                            ` : ''}
                            ${breakdown.spent > 0 ? `
                            <span class="breakdown-item spent" title="Spent">
                                <span class="breakdown-icon">📤</span>
                                <span>-₹${breakdown.spent}</span>
                            </span>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Quick Amount Buttons -->
                    <div class="quick-amounts-section">
                        <label class="section-label">Quick Add</label>
                        <div class="quick-amounts-grid">
                            ${this.config.quickAmounts.map(amt => `
                                <button class="quick-amount-btn ${prefilledAmount === amt ? 'selected' : ''}" 
                                        onclick="BroProWallet.selectQuickAmount(${amt})" 
                                        data-amount="${amt}">
                                    <span class="qa-currency">₹</span>
                                    <span class="qa-value">${amt}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Custom Amount Input -->
                    <div class="custom-amount-section">
                        <label class="section-label" for="customTopUpAmount">Or enter amount</label>
                        <div class="custom-amount-input">
                            <span class="input-prefix">₹</span>
                            <input type="number" 
                                   id="customTopUpAmount" 
                                   placeholder="Enter amount" 
                                   min="${this.config.minTopUp}" 
                                   max="${this.config.maxTopUp}"
                                   value="${prefilledAmount || ''}"
                                   oninput="BroProWallet.onAmountInput(this.value)">
                        </div>
                        <div class="amount-limits">
                            <span>Min: ₹${this.config.minTopUp}</span>
                            <span>Max: ₹${this.config.maxTopUp.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    
                    <!-- Summary -->
                    <div class="topup-summary" id="topupSummary" style="display: none;">
                        <div class="summary-row">
                            <span>Amount to add</span>
                            <span class="summary-amount" id="summaryAmount">₹0</span>
                        </div>
                        <div class="summary-row total">
                            <span>New Balance</span>
                            <span class="summary-new-balance" id="summaryNewBalance">₹${breakdown.balance}</span>
                        </div>
                    </div>
                    
                    <!-- Pay Button -->
                    <button class="wallet-pay-btn" id="walletPayBtn" onclick="BroProWallet.initiateTopUp()" disabled>
                        <span class="pay-btn-icon">💳</span>
                        <span class="pay-btn-text">Pay with Cashfree</span>
                        <span class="pay-btn-arrow">→</span>
                    </button>
                    
                    <!-- Trust Badges -->
                    <div class="wallet-trust-badges">
                        <span class="trust-badge">
                            <span class="trust-icon">🔒</span>
                            <span>Secure Payment</span>
                        </span>
                        <span class="trust-badge">
                            <span class="trust-icon">⚡</span>
                            <span>Instant Credit</span>
                        </span>
                        <span class="trust-badge">
                            <span class="trust-icon">🏛️</span>
                            <span>RBI Approved</span>
                        </span>
                    </div>
                    
                    <!-- No Refund Notice -->
                    <p class="wallet-notice">
                        ⚠️ Wallet top-ups are non-refundable. Use wisely!
                    </p>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add styles if not already added
        this.injectModalStyles();

        // Animate in
        requestAnimationFrame(() => {
            const modal = document.getElementById('walletTopUpModal');
            if (modal) modal.classList.add('active');
        });

        // If prefilled amount, update summary
        if (prefilledAmount) {
            this.onAmountInput(prefilledAmount);
        }

        console.log(`💰 Add Money modal opened (context: ${context})`);
    },

    /**
     * Close the Add Money Modal
     */
    closeAddMoneyModal() {
        const modal = document.getElementById('walletTopUpModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    /**
     * Handle quick amount selection
     */
    selectQuickAmount(amount) {
        // Update input
        const input = document.getElementById('customTopUpAmount');
        if (input) input.value = amount;

        // Update button states
        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            btn.classList.toggle('selected', parseInt(btn.dataset.amount) === amount);
        });

        // Update summary
        this.onAmountInput(amount);
    },

    /**
     * Handle amount input change
     */
    onAmountInput(value) {
        const amount = parseInt(value) || 0;
        const summary = document.getElementById('topupSummary');
        const payBtn = document.getElementById('walletPayBtn');
        const summaryAmount = document.getElementById('summaryAmount');
        const summaryNewBalance = document.getElementById('summaryNewBalance');

        // Clear quick amount selections if custom value
        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            btn.classList.toggle('selected', parseInt(btn.dataset.amount) === amount);
        });

        if (amount >= this.config.minTopUp && amount <= this.config.maxTopUp) {
            // Valid amount
            summary.style.display = 'block';
            summaryAmount.textContent = `₹${amount.toLocaleString('en-IN')}`;
            summaryNewBalance.textContent = `₹${(this.getBalance() + amount).toLocaleString('en-IN')}`;
            payBtn.disabled = false;
            payBtn.querySelector('.pay-btn-text').textContent = `Pay ₹${amount.toLocaleString('en-IN')}`;
        } else {
            // Invalid amount
            summary.style.display = 'none';
            payBtn.disabled = true;
            payBtn.querySelector('.pay-btn-text').textContent = 'Pay with Cashfree';
        }
    },

    /**
     * Initiate wallet top-up payment
     */
    async initiateTopUp() {
        const input = document.getElementById('customTopUpAmount');
        const amount = parseInt(input?.value) || 0;

        if (amount < this.config.minTopUp || amount > this.config.maxTopUp) {
            this.showToast('error', `Amount must be between ₹${this.config.minTopUp} and ₹${this.config.maxTopUp.toLocaleString('en-IN')}`);
            return;
        }

        const user = firebase.auth()?.currentUser;
        if (!user) {
            this.showToast('error', 'Please login first');
            return;
        }

        // Show loading state
        const payBtn = document.getElementById('walletPayBtn');
        if (payBtn) {
            payBtn.disabled = true;
            payBtn.innerHTML = `
                <span class="pay-btn-spinner"></span>
                <span class="pay-btn-text">Processing...</span>
            `;
        }

        try {
            console.log('🚀 Initiating wallet top-up:', { amount, userId: user.uid });

            // Get user details
            const profile = window.BroProPlayer?.load() || {};

            // Initialize Cashfree SDK
            if (!window.Cashfree) {
                throw new Error('Cashfree SDK not loaded');
            }

            const cashfree = Cashfree({ mode: 'production' });

            // Create order via API
            const response = await fetch('/api/create-wallet-topup-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: profile.name || user.displayName || 'User',
                    customerEmail: user.email,
                    customerPhone: profile.phone || '9999999999',
                    customerId: user.uid,
                    amount: amount
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create order');
            }

            const data = await response.json();

            if (!data.payment_session_id) {
                throw new Error('Invalid response: payment_session_id missing');
            }

            console.log('✅ Wallet Top-Up Order Created:', data.order_id);

            // Close modal before redirect
            this.closeAddMoneyModal();

            // Launch Cashfree Checkout
            cashfree.checkout({
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_self"
            });

        } catch (error) {
            console.error('💳 Top-up Error:', error);
            this.showToast('error', 'Payment failed: ' + error.message);

            // Reset button
            if (payBtn) {
                payBtn.disabled = false;
                payBtn.innerHTML = `
                    <span class="pay-btn-icon">💳</span>
                    <span class="pay-btn-text">Pay with Cashfree</span>
                    <span class="pay-btn-arrow">→</span>
                `;
            }
        }
    },

    // ============================================
    // TRANSACTION HISTORY
    // ============================================

    /**
     * Open transaction history modal
     */
    openTransactionHistory() {
        const profile = window.BroProPlayer?.load() || {};
        const transactions = profile.walletTransactions || [];

        // Remove existing modal
        const existing = document.getElementById('transactionHistoryModal');
        if (existing) existing.remove();

        const modalHTML = `
            <div class="wallet-modal-overlay" id="transactionHistoryModal" onclick="if(event.target === this) BroProWallet.closeTransactionHistory()">
                <div class="transaction-modal-container">
                    <div class="transaction-modal-header">
                        <h2>📜 Transaction History</h2>
                        <button class="wallet-close-btn" onclick="BroProWallet.closeTransactionHistory()">✕</button>
                    </div>
                    <div class="transaction-list">
                        ${transactions.length === 0 ? `
                            <div class="empty-transactions">
                                <span class="empty-icon">📭</span>
                                <p>No transactions yet</p>
                                <p class="empty-hint">Play quizzes or add money to see your history</p>
                            </div>
                        ` : transactions.slice().reverse().map(txn => `
                            <div class="transaction-item ${txn.type}">
                                <div class="txn-icon">
                                    ${txn.type === 'credit' ? '💰' : '📤'}
                                </div>
                                <div class="txn-details">
                                    <div class="txn-description">${txn.description}</div>
                                    <div class="txn-meta">
                                        <span class="txn-time">${this.formatDate(txn.timestamp)}</span>
                                        ${txn.orderId ? `<span class="txn-order">#${txn.orderId.slice(-8)}</span>` : ''}
                                    </div>
                                </div>
                                <div class="txn-amount ${txn.type}">
                                    ${txn.type === 'credit' ? '+' : '-'}₹${txn.amount}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        requestAnimationFrame(() => {
            const modal = document.getElementById('transactionHistoryModal');
            if (modal) modal.classList.add('active');
        });
    },

    /**
     * Close transaction history modal
     */
    closeTransactionHistory() {
        const modal = document.getElementById('transactionHistoryModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    // ============================================
    // ENHANCED INSUFFICIENT FUNDS POPUP
    // ============================================

    /**
     * Show premium insufficient funds popup with Add Money option
     */
    showInsufficientFunds(required, current, context = 'general') {
        // Remove existing popup
        const existing = document.getElementById('insufficientFundsPopup');
        if (existing) existing.remove();

        const shortfall = required - current;
        const suggestedTopUp = Math.ceil(shortfall / 10) * 10; // Round up to nearest 10

        const popupHTML = `
            <div class="insufficient-funds-overlay" id="insufficientFundsPopup" onclick="if(event.target === this) BroProWallet.closeInsufficientFunds()">
                <div class="insufficient-funds-card">
                    <div class="isf-icon-container">
                        <span class="isf-icon">😅</span>
                        <div class="isf-icon-ring"></div>
                    </div>
                    
                    <h3 class="isf-title">Oops! Insufficient Balance</h3>
                    
                    <div class="isf-balance-info">
                        <div class="isf-balance-row">
                            <span>Required</span>
                            <span class="isf-required">₹${required}</span>
                        </div>
                        <div class="isf-balance-row">
                            <span>Available</span>
                            <span class="isf-available">₹${current}</span>
                        </div>
                        <div class="isf-balance-row shortfall">
                            <span>Short by</span>
                            <span class="isf-shortfall">₹${shortfall}</span>
                        </div>
                    </div>
                    
                    <div class="isf-actions">
                        <button class="isf-btn primary" onclick="BroProWallet.closeInsufficientFunds(); BroProWallet.openAddMoneyModal(${suggestedTopUp}, '${context}')">
                            <span class="btn-icon">💳</span>
                            <span>Add ₹${suggestedTopUp} Now</span>
                        </button>
                        <button class="isf-btn secondary" onclick="BroProWallet.closeInsufficientFunds()">
                            <span class="btn-icon">🎮</span>
                            <span>Earn via Quizzes</span>
                        </button>
                    </div>
                    
                    <button class="isf-close" onclick="BroProWallet.closeInsufficientFunds()">Maybe Later</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Inject styles if needed
        this.injectInsufficientFundsStyles();

        requestAnimationFrame(() => {
            const popup = document.getElementById('insufficientFundsPopup');
            if (popup) popup.classList.add('active');
        });

        // Vibrate on mobile
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    },

    /**
     * Close insufficient funds popup
     */
    closeInsufficientFunds() {
        const popup = document.getElementById('insufficientFundsPopup');
        if (popup) {
            popup.classList.remove('active');
            setTimeout(() => popup.remove(), 300);
        }
    },

    // ============================================
    // UTILITIES
    // ============================================

    /**
     * Format date for display
     */
    formatDate(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;

        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    },

    /**
     * Show toast notification
     */
    showToast(type, message) {
        if (window.BroProLeaderboard?.showToast) {
            BroProLeaderboard.showToast(type, message);
        } else {
            alert(message);
        }
    },

    /**
     * Setup wallet listeners
     */
    setupWalletListeners() {
        // Listen for profile updates
        window.addEventListener('profileUpdated', () => {
            this.updateAllWalletDisplays();
        });

        // Listen for XP changes
        document.addEventListener('xpUpdated', () => {
            this.updateAllWalletDisplays();
        });
    },

    /**
     * Inject modal styles
     */
    injectModalStyles() {
        if (document.getElementById('walletModalStyles')) return;

        const styles = document.createElement('style');
        styles.id = 'walletModalStyles';
        styles.textContent = `
            /* ============================================ */
            /* PREMIUM WALLET MODAL STYLES */
            /* ============================================ */
            
            .wallet-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 30, 0.95);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                padding: 1rem;
            }
            
            .wallet-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .wallet-modal-container {
                position: relative;
                background: linear-gradient(145deg, rgba(30, 30, 60, 0.95), rgba(20, 20, 50, 0.98));
                border-radius: 28px;
                padding: 2rem;
                max-width: 420px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid rgba(139, 92, 246, 0.3);
                box-shadow: 
                    0 30px 100px rgba(139, 92, 246, 0.3),
                    0 0 0 1px rgba(255, 255, 255, 0.05),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
                transform: scale(0.9) translateY(20px);
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .wallet-modal-overlay.active .wallet-modal-container {
                transform: scale(1) translateY(0);
            }
            
            /* Animated Background */
            .wallet-modal-bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                overflow: hidden;
                border-radius: 28px;
            }
            
            .wallet-particle {
                position: absolute;
                font-size: 1.5rem;
                opacity: 0.3;
                animation: walletFloat 6s infinite ease-in-out;
            }
            
            .wallet-particle.p1 { top: 10%; left: 10%; animation-delay: 0s; }
            .wallet-particle.p2 { top: 20%; right: 15%; animation-delay: 1s; }
            .wallet-particle.p3 { bottom: 20%; left: 15%; animation-delay: 2s; }
            .wallet-particle.p4 { bottom: 30%; right: 10%; animation-delay: 3s; }
            
            @keyframes walletFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(10deg); }
            }
            
            .wallet-glow {
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%);
                animation: walletGlowPulse 4s ease-in-out infinite;
            }
            
            @keyframes walletGlowPulse {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
            }
            
            /* Header */
            .wallet-modal-header {
                position: relative;
                text-align: center;
                margin-bottom: 1.5rem;
            }
            
            .wallet-header-icon {
                position: relative;
                width: 70px;
                height: 70px;
                margin: 0 auto 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 70, 239, 0.15));
                border-radius: 50%;
                animation: iconPulse 2s ease-in-out infinite;
            }
            
            @keyframes iconPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
                50% { transform: scale(1.05); box-shadow: 0 0 30px 10px rgba(139, 92, 246, 0.2); }
            }
            
            .wallet-icon-main {
                font-size: 2rem;
            }
            
            .wallet-icon-sparkle {
                position: absolute;
                top: -5px;
                right: -5px;
                font-size: 1rem;
                animation: sparkle 1.5s ease-in-out infinite;
            }
            
            @keyframes sparkle {
                0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
                50% { opacity: 0.5; transform: scale(1.2) rotate(20deg); }
            }
            
            .wallet-modal-title {
                font-size: 1.75rem;
                font-weight: 700;
                color: white;
                margin: 0 0 0.25rem;
            }
            
            .wallet-modal-subtitle {
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.9rem;
                margin: 0;
            }
            
            .wallet-close-btn {
                position: absolute;
                top: 0;
                right: 0;
                width: 36px;
                height: 36px;
                border: none;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                transition: all 0.3s;
            }
            
            .wallet-close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }
            
            /* Balance Card */
            .wallet-balance-card {
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(217, 70, 239, 0.1));
                border-radius: 20px;
                padding: 1.25rem;
                text-align: center;
                margin-bottom: 1.5rem;
                border: 1px solid rgba(139, 92, 246, 0.2);
            }
            
            .balance-label {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.6);
                margin-bottom: 0.5rem;
            }
            
            .balance-amount {
                font-size: 2.5rem;
                font-weight: 800;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
            }
            
            .balance-amount .currency {
                font-size: 1.5rem;
                opacity: 0.8;
            }
            
            .balance-breakdown {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 0.75rem;
                flex-wrap: wrap;
            }
            
            .breakdown-item {
                display: flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 0.75rem;
                padding: 0.25rem 0.5rem;
                border-radius: 20px;
                background: rgba(255, 255, 255, 0.05);
            }
            
            .breakdown-item.earned { color: #10b981; }
            .breakdown-item.added { color: #8b5cf6; }
            .breakdown-item.spent { color: #f59e0b; }
            
            .breakdown-icon {
                font-size: 0.8rem;
            }
            
            /* Quick Amounts */
            .quick-amounts-section {
                margin-bottom: 1.25rem;
            }
            
            .section-label {
                display: block;
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.7);
                margin-bottom: 0.75rem;
                font-weight: 500;
            }
            
            .quick-amounts-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 0.5rem;
            }
            
            .quick-amount-btn {
                padding: 0.875rem 0.5rem;
                border: 2px solid rgba(139, 92, 246, 0.3);
                background: rgba(139, 92, 246, 0.05);
                border-radius: 14px;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .quick-amount-btn:hover {
                border-color: rgba(139, 92, 246, 0.6);
                background: rgba(139, 92, 246, 0.1);
                transform: translateY(-2px);
            }
            
            .quick-amount-btn.selected {
                border-color: #8b5cf6;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(217, 70, 239, 0.2));
                box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
            }
            
            .qa-currency {
                font-size: 0.7rem;
                color: rgba(255, 255, 255, 0.6);
            }
            
            .qa-value {
                font-size: 1.25rem;
                font-weight: 700;
                color: white;
            }
            
            /* Custom Amount */
            .custom-amount-section {
                margin-bottom: 1.25rem;
            }
            
            .custom-amount-input {
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.05);
                border: 2px solid rgba(139, 92, 246, 0.3);
                border-radius: 14px;
                padding: 0 1rem;
                transition: all 0.3s;
            }
            
            .custom-amount-input:focus-within {
                border-color: #8b5cf6;
                box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
            }
            
            .input-prefix {
                font-size: 1.25rem;
                color: rgba(255, 255, 255, 0.6);
                font-weight: 600;
            }
            
            .custom-amount-input input {
                flex: 1;
                background: transparent;
                border: none;
                padding: 1rem 0.5rem;
                font-size: 1.25rem;
                color: white;
                font-weight: 600;
                outline: none;
            }
            
            .custom-amount-input input::placeholder {
                color: rgba(255, 255, 255, 0.3);
            }
            
            .amount-limits {
                display: flex;
                justify-content: space-between;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.4);
                margin-top: 0.5rem;
            }
            
            /* Summary */
            .topup-summary {
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: 14px;
                padding: 1rem;
                margin-bottom: 1.25rem;
            }
            
            .summary-row {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
            }
            
            .summary-row.total {
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                margin-top: 0.5rem;
                padding-top: 0.75rem;
                font-weight: 700;
            }
            
            .summary-amount {
                color: #10b981;
                font-weight: 600;
            }
            
            .summary-new-balance {
                color: #8b5cf6;
                font-weight: 700;
                font-size: 1.1rem;
            }
            
            /* Pay Button */
            .wallet-pay-btn {
                width: 100%;
                padding: 1.125rem;
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                border: none;
                border-radius: 14px;
                color: white;
                font-size: 1.1rem;
                font-weight: 700;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                transition: all 0.3s;
                margin-bottom: 1rem;
            }
            
            .wallet-pay-btn:not(:disabled):hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4);
            }
            
            .wallet-pay-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .pay-btn-icon {
                font-size: 1.25rem;
            }
            
            .pay-btn-arrow {
                transition: transform 0.3s;
            }
            
            .wallet-pay-btn:not(:disabled):hover .pay-btn-arrow {
                transform: translateX(4px);
            }
            
            .pay-btn-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            /* Trust Badges */
            .wallet-trust-badges {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
                margin-bottom: 1rem;
            }
            
            .trust-badge {
                display: flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.6);
            }
            
            .trust-icon {
                font-size: 0.85rem;
            }
            
            /* Notice */
            .wallet-notice {
                text-align: center;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.4);
                margin: 0;
            }
            
            /* Transaction Modal */
            .transaction-modal-container {
                position: relative;
                background: linear-gradient(145deg, rgba(30, 30, 60, 0.95), rgba(20, 20, 50, 0.98));
                border-radius: 28px;
                padding: 0;
                max-width: 420px;
                width: 100%;
                max-height: 80vh;
                overflow: hidden;
                border: 1px solid rgba(139, 92, 246, 0.3);
                box-shadow: 0 30px 100px rgba(139, 92, 246, 0.3);
                transform: scale(0.9) translateY(20px);
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .wallet-modal-overlay.active .transaction-modal-container {
                transform: scale(1) translateY(0);
            }
            
            .transaction-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.25rem 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .transaction-modal-header h2 {
                font-size: 1.25rem;
                color: white;
                margin: 0;
            }
            
            .transaction-list {
                padding: 1rem;
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .transaction-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.03);
                border-radius: 14px;
                margin-bottom: 0.75rem;
                transition: all 0.3s;
            }
            
            .transaction-item:hover {
                background: rgba(255, 255, 255, 0.06);
            }
            
            .txn-icon {
                font-size: 1.5rem;
            }
            
            .txn-details {
                flex: 1;
            }
            
            .txn-description {
                color: white;
                font-weight: 500;
                font-size: 0.9rem;
            }
            
            .txn-meta {
                display: flex;
                gap: 0.5rem;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.5);
                margin-top: 0.25rem;
            }
            
            .txn-amount {
                font-weight: 700;
                font-size: 1.1rem;
            }
            
            .txn-amount.credit { color: #10b981; }
            .txn-amount.debit { color: #f59e0b; }
            
            .empty-transactions {
                text-align: center;
                padding: 3rem 1rem;
            }
            
            .empty-transactions .empty-icon {
                font-size: 3rem;
                display: block;
                margin-bottom: 1rem;
            }
            
            .empty-transactions p {
                color: rgba(255, 255, 255, 0.6);
                margin: 0.25rem 0;
            }
            
            .empty-transactions .empty-hint {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.4);
            }
            
            /* Mobile Responsiveness */
            @media (max-width: 480px) {
                .wallet-modal-container {
                    padding: 1.5rem;
                    border-radius: 24px;
                    margin: 0.5rem;
                }
                
                .wallet-modal-title {
                    font-size: 1.5rem;
                }
                
                .balance-amount {
                    font-size: 2rem;
                }
                
                .quick-amounts-grid {
                    gap: 0.375rem;
                }
                
                .quick-amount-btn {
                    padding: 0.75rem 0.25rem;
                }
                
                .qa-value {
                    font-size: 1rem;
                }
            }
        `;

        document.head.appendChild(styles);
    },

    /**
     * Inject insufficient funds popup styles
     */
    injectInsufficientFundsStyles() {
        if (document.getElementById('insufficientFundsStyles')) return;

        const styles = document.createElement('style');
        styles.id = 'insufficientFundsStyles';
        styles.textContent = `
            /* ============================================ */
            /* PREMIUM INSUFFICIENT FUNDS POPUP */
            /* ============================================ */
            
            .insufficient-funds-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 30, 0.9);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                z-index: 999998;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                padding: 1rem;
            }
            
            .insufficient-funds-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .insufficient-funds-card {
                background: linear-gradient(145deg, rgba(40, 30, 50, 0.95), rgba(30, 20, 45, 0.98));
                border-radius: 24px;
                padding: 2rem;
                max-width: 360px;
                width: 100%;
                text-align: center;
                border: 1px solid rgba(239, 68, 68, 0.3);
                box-shadow: 0 20px 60px rgba(239, 68, 68, 0.2);
                transform: scale(0.9) translateY(20px);
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .insufficient-funds-overlay.active .insufficient-funds-card {
                transform: scale(1) translateY(0);
            }
            
            .isf-icon-container {
                position: relative;
                width: 80px;
                height: 80px;
                margin: 0 auto 1.5rem;
            }
            
            .isf-icon {
                font-size: 3.5rem;
                display: block;
                animation: isf-shake 0.5s ease-in-out;
            }
            
            @keyframes isf-shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px) rotate(-5deg); }
                50% { transform: translateX(10px) rotate(5deg); }
                75% { transform: translateX(-5px) rotate(-3deg); }
            }
            
            .isf-icon-ring {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
                border: 3px solid rgba(239, 68, 68, 0.3);
                border-radius: 50%;
                animation: isf-ring-pulse 2s ease-in-out infinite;
            }
            
            @keyframes isf-ring-pulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
            }
            
            .isf-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: white;
                margin: 0 0 1.25rem;
            }
            
            .isf-balance-info {
                background: rgba(255, 255, 255, 0.03);
                border-radius: 16px;
                padding: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .isf-balance-row {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.95rem;
            }
            
            .isf-balance-row.shortfall {
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding-top: 0.75rem;
                margin-top: 0.5rem;
            }
            
            .isf-required { color: white; font-weight: 600; }
            .isf-available { color: #f59e0b; font-weight: 600; }
            .isf-shortfall { color: #ef4444; font-weight: 700; }
            
            .isf-actions {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-bottom: 1rem;
            }
            
            .isf-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem;
                border: none;
                border-radius: 14px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .isf-btn.primary {
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                color: white;
            }
            
            .isf-btn.primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
            }
            
            .isf-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .isf-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.15);
            }
            
            .isf-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.4);
                font-size: 0.85rem;
                cursor: pointer;
                padding: 0.5rem;
            }
            
            .isf-close:hover {
                color: rgba(255, 255, 255, 0.6);
            }
        `;

        document.head.appendChild(styles);
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BroProWallet.init());
} else {
    BroProWallet.init();
}

// Expose to window
window.BroProWallet = BroProWallet;
