/*
 * Store Manager Controller - Admin Dashboard
 */

const StoreManager = {
    productsListener: null,
    salesListener: null,
    expensesListener: null,
    shiftsListener: null,
    rolesListener: null,
    configListener: null,

    products: [],
    sales: [],
    expenses: [],
    roles: [],
    shifts: [],
    storeConfig: { compassionSharePercentage: 20 },
    posCart: [],

    openStoreManager() {
        NewAdmin.showToast('info', 'BroPro Store Admin Opening...');
        if (!document.getElementById('storeModal')) {
            this.injectModal();
        }
        document.getElementById('storeModal').classList.add('active');
        this.initClipboardPaste();
        this.switchTab('dashboard');
        this.loadData();
    },

    closeStoreManager() {
        const modal = document.getElementById('storeModal');
        if (modal) modal.classList.remove('active');
        this.cleanupListeners();
    },

    cleanupListeners() {
        if (this.productsListener) { this.productsListener(); this.productsListener = null; }
        if (this.salesListener) { this.salesListener(); this.salesListener = null; }
        if (this.expensesListener) { this.expensesListener(); this.expensesListener = null; }
        if (this.shiftsListener) { this.shiftsListener(); this.shiftsListener = null; }
        if (this.rolesListener) { this.rolesListener(); this.rolesListener = null; }
        if (this.configListener) { this.configListener(); this.configListener = null; }
    },

    injectModal() {
        const modalHtml = `
            <div class="modal-overlay" id="storeModal" onclick="if(event.target === this) StoreManager.closeStoreManager()" style="z-index: 99999;">
                <div class="gm-modal-content" style="max-width: 100vw; width: 100vw; max-height: 100vh; height: 100vh; border-radius: 0; display: flex; flex-direction: column; margin: 0;">

                    <!-- PREMIUM HEADER -->
                    <div style="background: linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(217,119,6,0.08) 50%, rgba(180,83,9,0.12) 100%); border-bottom: 1px solid rgba(245,158,11,0.25); padding: 1.2rem 2rem; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 52px; height: 52px; border-radius: 16px; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 4px 20px rgba(245,158,11,0.4);">🏬</div>
                            <div>
                                <h2 style="margin: 0; font-size: 1.6rem; font-weight: 800; color: #fef3c7; letter-spacing: -0.02em;">BroPro Store Admin</h2>
                                <p style="margin: 0; font-size: 0.95rem; color: rgba(254,243,199,0.5); font-weight: 400;">Inventory • Sales • Finance • Team</p>
                            </div>
                        </div>
                        <button onclick="StoreManager.closeStoreManager()" style="width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 1.3rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">✕</button>
                    </div>

                    <!-- PREMIUM TAB BAR -->
                    <div class="store-tabs" style="display: flex; background: linear-gradient(180deg, rgba(11,19,34,0.95) 0%, rgba(6,11,19,1) 100%); border-bottom: 1px solid rgba(255,255,255,0.06); overflow-x: auto; flex-shrink: 0; padding: 0 1rem; gap: 0.25rem; -webkit-overflow-scrolling: touch;">
                        <button class="store-tab-btn active" onclick="StoreManager.switchTab('dashboard')" data-tab="dashboard">
                            <span class="store-tab-icon">📊</span><span class="store-tab-label">Dashboard</span>
                        </button>
                        <button class="store-tab-btn" onclick="StoreManager.switchTab('inventory')" data-tab="inventory">
                            <span class="store-tab-icon">📦</span><span class="store-tab-label">Inventory</span>
                        </button>
                        <button class="store-tab-btn" onclick="StoreManager.switchTab('pos')" data-tab="pos">
                            <span class="store-tab-icon">🛒</span><span class="store-tab-label">POS Terminal</span>
                        </button>
                        <button class="store-tab-btn" onclick="StoreManager.switchTab('expenses')" data-tab="expenses">
                            <span class="store-tab-icon">💸</span><span class="store-tab-label">Expenses</span>
                        </button>
                        <button class="store-tab-btn" onclick="StoreManager.switchTab('team')" data-tab="team">
                            <span class="store-tab-icon">👥</span><span class="store-tab-label">Team</span>
                        </button>
                        <button class="store-tab-btn" onclick="StoreManager.switchTab('compassion')" data-tab="compassion">
                            <span class="store-tab-icon">🕊️</span><span class="store-tab-label">Compassion</span>
                        </button>
                    </div>

                    <!-- MAIN BODY -->
                    <div class="gm-body" style="overflow-y: auto; flex: 1; padding: 2rem 2.5rem;" id="storeModalBody">
                        
                        <!-- ===== DASHBOARD TAB ===== -->
                        <div id="tab-dashboard" class="store-tab-content">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                                <h3 style="font-size: 1.5rem; font-weight: 700; color: #fbbf24; margin: 0;">📊 Financial Overview</h3>
                                <select id="dashboardPeriod" onchange="StoreManager.renderDashboard()" style="background: rgba(255,255,255,0.06); color: var(--text-primary); border: 1px solid rgba(255,255,255,0.12); padding: 0.75rem 1.25rem; border-radius: 12px; font-size: 1rem; font-weight: 500; cursor: pointer; min-width: 160px;">
                                    <option value="this_month">This Month</option>
                                    <option value="last_month">Last Month</option>
                                    <option value="this_year">This Year</option>
                                    <option value="all_time" selected>All Time</option>
                                </select>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem;">
                                <div style="background: linear-gradient(145deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.03) 100%); border: 1px solid rgba(16,185,129,0.2); padding: 1.5rem 1.75rem; border-radius: 18px; backdrop-filter: blur(10px);">
                                    <div style="color: rgba(167,243,208,0.7); font-size: 1rem; font-weight: 500; margin-bottom: 0.5rem;">💰 Revenue (Money In)</div>
                                    <div id="dashRevenue" style="font-size: 2.2rem; font-weight: 800; color: #34d399; letter-spacing: -0.03em;">₹0</div>
                                </div>
                                <div style="background: linear-gradient(145deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.03) 100%); border: 1px solid rgba(239,68,68,0.2); padding: 1.5rem 1.75rem; border-radius: 18px; backdrop-filter: blur(10px);">
                                    <div style="color: rgba(252,165,165,0.7); font-size: 1rem; font-weight: 500; margin-bottom: 0.5rem;">📤 Expenses (Money Out)</div>
                                    <div id="dashExpenses" style="font-size: 2.2rem; font-weight: 800; color: #f87171; letter-spacing: -0.03em;">₹0</div>
                                </div>
                                <div style="background: linear-gradient(145deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.03) 100%); border: 1px solid rgba(59,130,246,0.2); padding: 1.5rem 1.75rem; border-radius: 18px; backdrop-filter: blur(10px);">
                                    <div style="color: rgba(147,197,253,0.7); font-size: 1rem; font-weight: 500; margin-bottom: 0.5rem;">📈 Net Profit</div>
                                    <div id="dashProfit" style="font-size: 2.2rem; font-weight: 800; color: #60a5fa; letter-spacing: -0.03em;">₹0</div>
                                    <div id="dashMargin" style="font-size: 1rem; color: #93c5fd; font-weight: 600; margin-top: 0.25rem;">0% Margin</div>
                                </div>
                                <div style="background: linear-gradient(145deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.03) 100%); border: 1px solid rgba(139,92,246,0.2); padding: 1.5rem 1.75rem; border-radius: 18px; backdrop-filter: blur(10px);">
                                    <div style="color: rgba(196,181,253,0.7); font-size: 1rem; font-weight: 500; margin-bottom: 0.5rem;">🕊️ Compassion Share</div>
                                    <div id="dashCompassion" style="font-size: 2.2rem; font-weight: 800; color: #a78bfa; letter-spacing: -0.03em;">₹0</div>
                                </div>
                            </div>
                            
                            <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">📋 Recent Sales Activity</h3>
                            <div id="recentSalesList" style="max-height: 400px; overflow-y: auto; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; background: rgba(255,255,255,0.02);">
                                <div style="padding: 3rem; text-align: center; color: var(--text-tertiary); font-size: 1.1rem;">Loading sales data...</div>
                            </div>
                        </div>

                        <!-- ===== INVENTORY TAB ===== -->
                        <div id="tab-inventory" class="store-tab-content" style="display: none;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                                <h3 style="font-size: 1.5rem; font-weight: 700; color: #fbbf24; margin: 0;">📦 Inventory Management</h3>
                                <button onclick="StoreManager.toggleAddProductForm()" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; padding: 0.85rem 1.75rem; border-radius: 14px; cursor: pointer; font-size: 1.05rem; font-weight: 700; box-shadow: 0 4px 15px rgba(59,130,246,0.3); transition: all 0.2s;">+ Add Product</button>
                            </div>
                            
                            <div id="addProductForm" style="display: none; background: linear-gradient(145deg, rgba(59,130,246,0.06) 0%, rgba(37,99,235,0.03) 100%); padding: 2rem; border-radius: 18px; border: 1px solid rgba(59,130,246,0.15); margin-bottom: 1.5rem;">
                                <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem; color: #93c5fd;">New Product Details</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                                    <input type="text" id="prodTitle" placeholder="Product Title" class="sm-input">
                                    <div>
                                        <select id="prodCategory" class="sm-input" onchange="StoreManager.handleCategoryChange('add')">
                                            <option value="Stationery">✏️ Stationery</option>
                                            <option value="Books">📚 Books</option>
                                            <option value="Uniforms">👔 Uniforms</option>
                                            <option value="Merchandise">🎒 Merchandise</option>
                                            <option value="Snacks">🍫 Snacks</option>
                                            <option value="Other">📎 Other</option>
                                        </select>
                                        <input type="text" id="prodCategoryCustom" placeholder="Enter custom category name..." class="sm-input" style="display: none; margin-top: 0.5rem;">
                                    </div>
                                    <input type="text" id="prodSKU" placeholder="SKU Code (Optional)" class="sm-input">
                                    <input type="number" id="prodCost" placeholder="Cost Price (₹)" class="sm-input">
                                    <input type="number" id="prodPrice" placeholder="Selling Price (₹)" class="sm-input">
                                    <input type="number" id="prodQty" placeholder="Stock Quantity" class="sm-input">
                                    <input type="number" id="prodThreshold" placeholder="Low Stock Alert At..." value="5" class="sm-input">
                                    <label style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-secondary); font-size: 1rem; font-weight: 500; padding: 0.5rem 0;">
                                        <input type="checkbox" id="prodOnline" style="width: 22px; height: 22px; accent-color: #3b82f6; cursor: pointer;"> Available Online
                                    </label>
                                    <input type="text" id="prodDesc" placeholder="Product Description (Optional)" style="grid-column: span 2;" class="sm-input">
                                    
                                    <!-- Product Image Upload / Paste / Drop Zone -->
                                    <div style="grid-column: span 2; background: rgba(255,255,255,0.02); border: 2px dashed rgba(59,130,246,0.3); border-radius: 14px; padding: 1.25rem; transition: all 0.2s;" id="prodImgDropZone">
                                        <div style="display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap;">
                                            <!-- Preview Box -->
                                            <div id="prodImgPreviewBox" style="display: none; position: relative; width: 90px; height: 90px; border-radius: 12px; overflow: hidden; border: 2px solid #3b82f6; flex-shrink: 0; background: #000; cursor: pointer;" onclick="StoreManager.openCropper('add')" title="Click to crop image">
                                                <img id="prodImgPreview" src="" style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;">
                                                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0"><span style="color: white; font-size: 1.5rem;">✂️</span></div>
                                                <button type="button" onclick="event.stopPropagation(); StoreManager.clearProductImage('add')" style="position: absolute; top: 4px; right: 4px; background: rgba(239,68,68,0.9); color: white; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; font-size: 11px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 2;">✕</button>
                                            </div>
                                            
                                            <div style="flex: 1; min-width: 220px;">
                                                <div style="font-weight: 700; font-size: 0.95rem; color: #93c5fd; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
                                                    🖼️ Product Image Tools <span style="font-weight:400; font-size:0.75rem; color:var(--text-tertiary);">(Upload, crop, paste, or copy)</span>
                                                </div>
                                                <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.4rem;">
                                                    <label style="background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.1)); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); padding: 0.5rem 0.85rem; border-radius: 10px; cursor: pointer; font-size: 0.82rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
                                                        📁 Choose File
                                                        <input type="file" id="prodImgFile" accept="image/*" style="display: none;" onchange="StoreManager.handleImageFile(event, 'add')">
                                                    </label>
                                                </div>
                                                
                                                <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                                                    <input type="text" id="prodImageUrl" placeholder="Or paste image URL (https://...)" class="sm-input" style="flex: 1; min-width: 180px; font-size: 0.82rem; padding: 0.5rem 0.75rem;" oninput="StoreManager.handleImageUrlChange(event, 'add')">
                                                    <select id="copyFromExistingSelect" onchange="if(this.value) StoreManager.copyFromExistingProduct(this.value, 'add')" class="sm-input" style="width: auto; font-size: 0.82rem; padding: 0.5rem 0.75rem;">
                                                        <option value="">📋 Copy image from existing product...</option>
                                                    </select>
                                                </div>
                                                <div style="font-size: 0.73rem; color: var(--text-tertiary); margin-top: 0.35rem;">
                                                    📋 <strong>Pro Tip:</strong> Press <strong>Cmd+V / Ctrl+V</strong> anywhere to paste clipboard images!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
                                    <button onclick="StoreManager.toggleAddProductForm()" style="background: rgba(255,255,255,0.06); color: var(--text-secondary); border: 1px solid rgba(255,255,255,0.1); padding: 0.85rem 1.75rem; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 600;">Cancel</button>
                                    <button onclick="StoreManager.addProduct()" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.85rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 700; box-shadow: 0 4px 15px rgba(16,185,129,0.3);">💾 Save Product</button>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 1.5rem;">
                                <input type="text" id="inventorySearch" onkeyup="StoreManager.renderInventory()" placeholder="🔍  Search products by name or SKU..." class="sm-input" style="font-size: 1.1rem; padding: 1rem 1.25rem;">
                            </div>
                            
                            <div id="inventoryList" style="display: flex; flex-direction: column; gap: 0.75rem;">
                                <div style="text-align: center; padding: 3rem; color: var(--text-tertiary); font-size: 1.1rem;">Loading inventory...</div>
                            </div>
                        </div>

                        <!-- ===== POS TERMINAL TAB ===== -->
                        <div id="tab-pos" class="store-tab-content" style="display: none;">
                            <h3 style="font-size: 1.5rem; font-weight: 700; color: #fbbf24; margin-bottom: 1.25rem;">🛒 Point of Sale Terminal</h3>
                            <div style="display: flex; gap: 1.5rem; min-height: 60vh;">
                                <!-- Product Grid -->
                                <div style="flex: 2; display: flex; flex-direction: column; gap: 1rem;">
                                    <input type="text" id="posSearch" onkeyup="StoreManager.renderPOSGrid()" placeholder="🔍  Search products for billing..." class="sm-input" style="font-size: 1.1rem; padding: 1rem 1.25rem;">
                                    <div id="posGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; overflow-y: auto; flex: 1; align-content: start; padding-right: 0.5rem;">
                                    </div>
                                </div>
                                
                                <!-- Cart Panel -->
                                <div style="flex: 1; min-width: 320px; background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; overflow: hidden;">
                                    <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 700; font-size: 1.15rem; color: #fbbf24;">🧾 Current Cart</div>
                                    <div id="posCartList" style="flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
                                        <div style="text-align:center; color: var(--text-tertiary); font-size: 1rem; padding: 2rem 0;">Cart is empty — tap products to add</div>
                                    </div>
                                    <div style="padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2);">
                                        <input type="text" id="posCustomer" placeholder="Customer Name (Optional)" class="sm-input" style="margin-bottom: 0.75rem;">
                                        <select id="posPayment" class="sm-input" style="margin-bottom: 1rem;">
                                            <option value="Cash">💵 Cash</option>
                                            <option value="UPI">📱 UPI</option>
                                            <option value="Wallet">👛 BroPro Wallet</option>
                                        </select>
                                        <div style="display: flex; justify-content: space-between; font-size: 1.6rem; font-weight: 800; margin-bottom: 1.25rem; padding: 0 0.25rem;">
                                            <span>Total:</span>
                                            <span id="posTotal" style="color: #34d399;">₹0</span>
                                        </div>
                                        <button onclick="StoreManager.completeSale()" style="width:100%; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 1.15rem; border-radius: 14px; font-weight: 800; font-size: 1.2rem; cursor: pointer; box-shadow: 0 4px 20px rgba(16,185,129,0.35); transition: all 0.2s; letter-spacing: 0.01em;">✅ Complete Sale</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ===== EXPENSES TAB ===== -->
                        <div id="tab-expenses" class="store-tab-content" style="display: none;">
                            <h3 style="font-size: 1.5rem; font-weight: 700; color: #fbbf24; margin-bottom: 1.5rem;">💸 Expense Tracking (Money Out)</h3>
                            
                            <div style="background: linear-gradient(145deg, rgba(239,68,68,0.06) 0%, rgba(239,68,68,0.02) 100%); padding: 2rem; border-radius: 18px; border: 1px solid rgba(239,68,68,0.15); margin-bottom: 2rem;">
                                <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; color: #fca5a5;">Record New Expense</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                                    <input type="text" id="expTitle" placeholder="What was purchased?" class="sm-input">
                                    <input type="number" id="expAmount" placeholder="Amount (₹)" class="sm-input">
                                    <select id="expCategory" class="sm-input">
                                        <option value="RESTOCK">📦 Restock Inventory</option>
                                        <option value="PACKAGING">📋 Packaging</option>
                                        <option value="LOGISTICS">🚚 Logistics / Delivery</option>
                                        <option value="OTHER">📎 Other</option>
                                    </select>
                                    <input type="date" id="expDate" class="sm-input" value="\${new Date().toISOString().split('T')[0]}">
                                    <input type="text" id="expNotes" placeholder="Notes (Optional)" style="grid-column: span 2;" class="sm-input">
                                </div>
                                <div style="margin-top: 1.5rem; text-align: right;">
                                    <button onclick="StoreManager.addExpense()" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 0.85rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 700; box-shadow: 0 4px 15px rgba(239,68,68,0.3);">📤 Record Expense</button>
                                </div>
                            </div>
                            
                            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-secondary);">Expense History</h4>
                            <div id="expenseList" style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 450px; overflow-y: auto;">
                                <div style="text-align: center; padding: 3rem; color: var(--text-tertiary); font-size: 1.1rem;">Loading expenses...</div>
                            </div>
                        </div>

                        <!-- ===== TEAM TAB ===== -->
                        <div id="tab-team" class="store-tab-content" style="display: none;">
                            <h3 style="font-size: 1.5rem; font-weight: 700; color: #fbbf24; margin-bottom: 1.5rem;">👥 Team & Role Management</h3>
                            
                            <!-- Role Assignment Form -->
                            <div style="background: linear-gradient(145deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 100%); padding: 1.75rem; border-radius: 18px; border: 1px solid rgba(59,130,246,0.15); margin-bottom: 2rem;">
                                <div style="font-size: 1.15rem; font-weight: 700; color: #93c5fd; margin-bottom: 1.25rem;">🔐 Assign New Role</div>
                                
                                <!-- Email -->
                                <div style="margin-bottom: 1rem;">
                                    <label style="display: block; color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; margin-bottom: 0.4rem;">📧 Member Email</label>
                                    <input type="email" id="teamEmail" placeholder="Enter student email address..." class="sm-input" style="width: 100%;">
                                </div>
                                
                                <!-- Role Type Selector -->
                                <div style="margin-bottom: 1rem;">
                                    <label style="display: block; color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; margin-bottom: 0.6rem;">👤 Role Type</label>
                                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                                        <label style="display: flex; align-items: center; gap: 0.5rem; background: rgba(59,130,246,0.08); border: 2px solid rgba(59,130,246,0.25); padding: 0.75rem 1.25rem; border-radius: 12px; cursor: pointer; transition: all 0.2s; font-weight: 600; color: #93c5fd;" id="roleLabel_BPS_MANAGER">
                                            <input type="radio" name="teamRole" value="BPS_MANAGER" checked onchange="StoreManager.onRoleChange()" style="accent-color: #3b82f6; width: 18px; height: 18px;">
                                            📋 BPS Manager
                                        </label>
                                        <label style="display: flex; align-items: center; gap: 0.5rem; background: rgba(16,185,129,0.08); border: 2px solid rgba(16,185,129,0.25); padding: 0.75rem 1.25rem; border-radius: 12px; cursor: pointer; transition: all 0.2s; font-weight: 600; color: #6ee7b7;" id="roleLabel_BPS_ASSISTANT">
                                            <input type="radio" name="teamRole" value="BPS_ASSISTANT" onchange="StoreManager.onRoleChange()" style="accent-color: #10b981; width: 18px; height: 18px;">
                                            🛒 BPS Assistant
                                        </label>
                                    </div>
                                </div>
                                
                                <!-- Permission Checkboxes -->
                                <div id="permissionsPanel" style="margin-bottom: 1.25rem;">
                                    <label style="display: block; color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; margin-bottom: 0.6rem;">🔑 Permissions <span style='font-size:0.75rem;color:var(--text-tertiary);font-weight:400;'>(Admin chooses what to grant)</span></label>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem;" id="permCheckboxes">
                                        <label class="perm-check" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 0.6rem 0.85rem; border-radius: 10px; cursor: pointer; font-size: 0.9rem; color: var(--text-secondary); transition: all 0.2s;">
                                            <input type="checkbox" value="ADD_PRODUCT" checked style="accent-color: #3b82f6; width: 16px; height: 16px;"> 📦 Add Product
                                        </label>
                                        <label class="perm-check" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 0.6rem 0.85rem; border-radius: 10px; cursor: pointer; font-size: 0.9rem; color: var(--text-secondary); transition: all 0.2s;">
                                            <input type="checkbox" value="EDIT_PRODUCT" checked style="accent-color: #3b82f6; width: 16px; height: 16px;"> ✏️ Edit Product
                                        </label>
                                        <label class="perm-check" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 0.6rem 0.85rem; border-radius: 10px; cursor: pointer; font-size: 0.9rem; color: var(--text-secondary); transition: all 0.2s;">
                                            <input type="checkbox" value="POS_TERMINAL" checked style="accent-color: #3b82f6; width: 16px; height: 16px;"> 🛒 POS Terminal
                                        </label>
                                        <label class="perm-check" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 0.6rem 0.85rem; border-radius: 10px; cursor: pointer; font-size: 0.9rem; color: var(--text-secondary); transition: all 0.2s;">
                                            <input type="checkbox" value="EXPENSE_TRACKING" checked style="accent-color: #3b82f6; width: 16px; height: 16px;"> 💸 Expense Tracking
                                        </label>
                                        <label class="perm-check" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 0.6rem 0.85rem; border-radius: 10px; cursor: pointer; font-size: 0.9rem; color: var(--text-secondary); transition: all 0.2s;">
                                            <input type="checkbox" value="VIEW_DASHBOARD" checked style="accent-color: #3b82f6; width: 16px; height: 16px;"> 📊 View Dashboard
                                        </label>
                                        <label class="perm-check" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(245,158,11,0.05); border: 1px solid rgba(245,158,11,0.2); padding: 0.6rem 0.85rem; border-radius: 10px; cursor: pointer; font-size: 0.9rem; color: #fbbf24; transition: all 0.2s;" title="Off by default. Admin must explicitly grant this.">
                                            <input type="checkbox" value="VIEW_ALL_TIME_FINANCIALS" style="accent-color: #f59e0b; width: 16px; height: 16px;"> 📈 View All-Time Financials
                                        </label>
                                    </div>
                                </div>
                                
                                <!-- Submit -->
                                <div style="display: flex; justify-content: flex-end;">
                                    <button onclick="StoreManager.addTeamMember()" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; padding: 0.85rem 2rem; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 700; box-shadow: 0 4px 15px rgba(59,130,246,0.3); white-space: nowrap; transition: all 0.2s;">🔐 Assign Role</button>
                                </div>
                            </div>
                            
                            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-secondary);">🟢 Active Team Members</h4>
                            <div id="teamList" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2.5rem;">
                                <div style="text-align: center; padding: 2rem; color: var(--text-tertiary); font-size: 1.1rem;">Loading team...</div>
                            </div>
                            
                            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-secondary);">📋 Recent Shift Handovers</h4>
                            <div id="shiftList" style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 350px; overflow-y: auto;">
                                <div style="text-align: center; padding: 2rem; color: var(--text-tertiary); font-size: 1.1rem;">Loading shift records...</div>
                            </div>
                        </div>

                        <!-- ===== COMPASSION TAB ===== -->
                        <div id="tab-compassion" class="store-tab-content" style="display: none;">
                            <div style="text-align: center; margin-bottom: 2.5rem;">
                                <div style="font-size: 3rem; margin-bottom: 0.75rem;">🕊️</div>
                                <h3 style="font-size: 1.8rem; font-weight: 800; color: #c4b5fd; margin-bottom: 0.5rem;">Compassion Fund Transfer</h3>
                                <p style="color: var(--text-tertiary); font-size: 1.05rem;">Transfer store profits directly to the Compassion Fund</p>
                            </div>
                            
                            <div style="background: linear-gradient(145deg, rgba(139,92,246,0.08) 0%, rgba(124,58,237,0.04) 100%); padding: 2.5rem; border-radius: 24px; border: 1px solid rgba(139,92,246,0.2); max-width: 560px; margin: 0 auto;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(139,92,246,0.12);">
                                    <span style="color: var(--text-secondary); font-size: 1.1rem; font-weight: 500;">Total Un-transferred Profit:</span>
                                    <strong id="compUntransferred" style="color: #34d399; font-size: 1.6rem; font-weight: 800;">₹0</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                                    <span style="color: var(--text-secondary); font-size: 1.1rem; font-weight: 500;">Configured Share (%):</span>
                                    <strong id="compShare" style="color: #60a5fa; font-size: 1.4rem; font-weight: 800;">20%</strong>
                                </div>
                                
                                <div style="margin-bottom: 2rem;">
                                    <label style="display: block; color: var(--text-secondary); margin-bottom: 0.75rem; font-size: 1.05rem; font-weight: 600;">💰 Custom Transfer Amount (₹)</label>
                                    <input type="number" id="compTransferAmount" class="sm-input" style="font-size: 1.5rem; text-align: center; padding: 1rem; font-weight: 700;">
                                </div>
                                
                                <button onclick="StoreManager.transferToCompassion()" style="width:100%; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border: none; padding: 1.25rem; border-radius: 16px; font-weight: 800; font-size: 1.2rem; cursor: pointer; box-shadow: 0 6px 25px rgba(139,92,246,0.35); transition: all 0.2s; letter-spacing: 0.01em;">🕊️ Transfer to Compassion Fund</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Interactive Image Cropper Modal -->
            <div id="cropperModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999999; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); justify-content: center; align-items: center;">
                <div style="background: #111827; border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 1.75rem; max-width: 480px; width: 90%; color: white; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3 style="margin: 0; color: #fbbf24; font-size: 1.3rem; font-weight: 700;">✂️ Crop Product Image</h3>
                        <button onclick="StoreManager.closeCropper()" style="background: rgba(255,255,255,0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.1rem;">✕</button>
                    </div>
                    
                    <div style="position: relative; width: 100%; height: 280px; background: #000; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                        <canvas id="cropCanvas" style="max-width: 100%; max-height: 100%;"></canvas>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--text-secondary);">
                            <span>🔍 Zoom Level:</span>
                            <input type="range" id="cropZoomRange" min="0.5" max="3" step="0.05" value="1" oninput="StoreManager.updateCropPreview()" style="width: 70%; accent-color: #3b82f6;">
                        </div>
                        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
                            <button type="button" onclick="StoreManager.rotateCropImage(-90)" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer;">🔄 Rotate L</button>
                            <button type="button" onclick="StoreManager.rotateCropImage(90)" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer;">🔄 Rotate R</button>
                            <button type="button" onclick="StoreManager.resetCropState()" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer;">↺ Reset</button>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
                        <button type="button" onclick="StoreManager.closeCropper()" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: var(--text-secondary); padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 600; cursor: pointer;">Cancel</button>
                        <button type="button" onclick="StoreManager.applyCrop()" style="background: linear-gradient(135deg, #10b981, #059669); border: none; color: white; padding: 0.75rem 1.75rem; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(16,185,129,0.3);">✂️ Save Crop</button>
                    </div>
                </div>
            </div>
            <!-- Edit Product Modal (Admin) -->
            <div id="editProductAdminModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999998; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); justify-content: center; align-items: center;">
                <div style="background: #111827; border: 1px solid rgba(59,130,246,0.25); border-radius: 20px; padding: 2rem; max-width: 600px; width: 92%; color: white; max-height: 90vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                        <h3 style="margin: 0; color: #93c5fd; font-size: 1.4rem; font-weight: 700;">✏️ Edit Product Details</h3>
                        <button onclick="document.getElementById('editProductAdminModal').style.display='none'" style="background: rgba(255,255,255,0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.1rem;">✕</button>
                    </div>
                    
                    <input type="hidden" id="editAdminProdId">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                        <input type="text" id="editAdminProdTitle" placeholder="Product Title" class="sm-input">
                        <div>
                            <select id="editAdminProdCategory" class="sm-input" onchange="StoreManager.handleCategoryChange('edit')">
                                <option value="Stationery">✏️ Stationery</option>
                                <option value="Books">📚 Books</option>
                                <option value="Uniforms">👔 Uniforms</option>
                                <option value="Merchandise">🎒 Merchandise</option>
                                <option value="Snacks">🍫 Snacks</option>
                                <option value="Other">📎 Other</option>
                            </select>
                            <input type="text" id="editAdminProdCategoryCustom" placeholder="Enter custom category name..." class="sm-input" style="display: none; margin-top: 0.5rem;">
                        </div>
                        <input type="text" id="editAdminProdSKU" placeholder="SKU Code" class="sm-input">
                        <input type="number" id="editAdminProdCost" placeholder="Cost Price (₹)" class="sm-input">
                        <input type="number" id="editAdminProdPrice" placeholder="Selling Price (₹)" class="sm-input">
                        <input type="number" id="editAdminProdQty" placeholder="Stock Quantity" class="sm-input">
                        <input type="number" id="editAdminProdThreshold" placeholder="Low Stock Threshold" class="sm-input">
                        <label style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-secondary); font-size: 0.95rem; font-weight: 500;">
                            <input type="checkbox" id="editAdminProdOnline" style="width: 20px; height: 20px; accent-color: #3b82f6;"> Available Online
                        </label>
                        <input type="text" id="editAdminProdDesc" placeholder="Description" style="grid-column: span 2;" class="sm-input">
                    </div>

                    <!-- Edit Image Dropzone -->
                    <div style="background: rgba(255,255,255,0.02); border: 2px dashed rgba(59,130,246,0.3); border-radius: 14px; padding: 1.25rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap;">
                            <div id="editImgPreviewBox" style="display: none; position: relative; width: 85px; height: 85px; border-radius: 12px; overflow: hidden; border: 2px solid #3b82f6; flex-shrink: 0; background: #000; cursor: pointer;" onclick="StoreManager.openCropper('edit')" title="Click to crop image">
                                <img id="editImgPreview" src="" style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;">
                                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0"><span style="color: white; font-size: 1.5rem;">✂️</span></div>
                                <button type="button" onclick="event.stopPropagation(); StoreManager.clearProductImage('edit')" style="position: absolute; top: 4px; right: 4px; background: rgba(239,68,68,0.9); color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 10px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 2;">✕</button>
                            </div>
                            
                            <div style="flex: 1; min-width: 220px;">
                                <div style="font-weight: 700; font-size: 0.9rem; color: #93c5fd; margin-bottom: 0.4rem;">
                                    🖼️ Update Product Image
                                </div>
                                <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.4rem;">
                                    <label style="background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); padding: 0.45rem 0.8rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
                                        📁 Choose File
                                        <input type="file" id="editAdminProdImgFile" accept="image/*" style="display: none;" onchange="StoreManager.handleImageFile(event, 'edit')">
                                    </label>
                                </div>
                                <input type="text" id="editAdminProdImageUrl" placeholder="Or paste image URL (https://...)" class="sm-input" style="width: 100%; font-size: 0.8rem; padding: 0.5rem;" oninput="StoreManager.handleImageUrlChange(event, 'edit')">
                                <div style="font-size: 0.7rem; color: var(--text-tertiary); margin-top: 0.3rem;">📋 Pro Tip: Press Cmd+V / Ctrl+V anywhere on this modal to paste clipboard image!</div>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                        <button type="button" onclick="document.getElementById('editProductAdminModal').style.display='none'" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: var(--text-secondary); padding: 0.85rem 1.75rem; border-radius: 12px; font-weight: 600; cursor: pointer;">Cancel</button>
                        <button type="button" onclick="StoreManager.submitEditProduct()" style="background: linear-gradient(135deg, #10b981, #059669); border: none; color: white; padding: 0.85rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(16,185,129,0.3);">💾 Save Changes</button>
                    </div>
                </div>
            </div>
            <style>
                /* === STORE MANAGER PREMIUM STYLES === */
                .store-tab-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-tertiary);
                    padding: 1rem 1.25rem;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    border-bottom: 3px solid transparent;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    transition: all 0.25s ease;
                    position: relative;
                }
                .store-tab-icon { font-size: 1.25rem; }
                .store-tab-label { font-size: 1rem; }
                .store-tab-btn.active {
                    color: #fbbf24;
                    border-bottom-color: #f59e0b;
                    background: rgba(245,158,11,0.06);
                }
                .store-tab-btn:hover:not(.active) {
                    color: var(--text-primary);
                    background: rgba(255,255,255,0.03);
                }
                .sm-input {
                    width: 100%;
                    padding: 0.85rem 1rem;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.04);
                    color: white;
                    border: 1px solid rgba(255,255,255,0.1);
                    font-size: 1rem;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 500;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    outline: none;
                }
                .sm-input:focus {
                    border-color: rgba(245,158,11,0.5);
                    box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
                }
                .sm-input::placeholder { color: rgba(255,255,255,0.3); }
                
                @media (max-width: 768px) {
                    #storeModal .gm-body { padding: 1.25rem !important; }
                    #tab-pos > div:first-child { flex-direction: column !important; }
                    #tab-pos > div:first-child > div:last-child { min-width: unset !important; }
                    .store-tab-label { display: none; }
                    .store-tab-icon { font-size: 1.5rem; }
                    .store-tab-btn { padding: 1rem; }
                }
            </style>
        `;
        document.getElementById('modalsContainer').insertAdjacentHTML('beforeend', modalHtml);
    },

    switchTab(tabId) {
        document.querySelectorAll('.store-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.store-tab-btn[data-tab="${tabId}"]`).classList.add('active');
        
        document.querySelectorAll('.store-tab-content').forEach(content => content.style.display = 'none');
        document.getElementById(`tab-${tabId}`).style.display = 'block';

        if (tabId === 'dashboard') this.renderDashboard();
        if (tabId === 'inventory') this.renderInventory();
        if (tabId === 'pos') this.renderPOSGrid();
        if (tabId === 'expenses') this.renderExpenses();
        if (tabId === 'team') this.renderTeam();
        if (tabId === 'compassion') this.renderCompassion();
    },

    escapeHtml(s) {
        if (typeof s !== 'string') return s;
        const d = document.createElement('div');
        d.textContent = s || '';
        return d.innerHTML;
    },

    async loadData() {
        if (!NewAdmin.db) return;
        
        // Products Listener
        this.productsListener = NewAdmin.db.collection('broproStore_products').onSnapshot(snap => {
            this.products = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            this.renderInventory();
            this.renderPOSGrid();
        }, e => console.error(e));

        // Sales Listener
        this.salesListener = NewAdmin.db.collection('broproStore_sales').orderBy('timestamp', 'desc').onSnapshot(snap => {
            this.sales = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            this.renderDashboard();
            this.renderCompassion();
        }, e => console.error(e));

        // Expenses Listener
        this.expensesListener = NewAdmin.db.collection('broproStore_expenses').orderBy('timestamp', 'desc').onSnapshot(snap => {
            this.expenses = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            this.renderDashboard();
            this.renderExpenses();
            this.renderCompassion();
        }, e => console.error(e));

        // Roles Listener
        this.rolesListener = NewAdmin.db.collection('broproStore_roles').onSnapshot(snap => {
            this.roles = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            this.renderTeam();
        }, e => console.error(e));

        // Shifts Listener
        this.shiftsListener = NewAdmin.db.collection('broproStore_shifts').orderBy('timestamp', 'desc').onSnapshot(snap => {
            this.shifts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            this.renderTeam();
        }, e => console.error(e));

        // Config Listener
        this.configListener = NewAdmin.db.collection('broproStore_config').doc('config').onSnapshot(snap => {
            if (snap.exists) {
                this.storeConfig = Object.assign(this.storeConfig, snap.data());
            } else {
                NewAdmin.db.collection('broproStore_config').doc('config').set({ compassionSharePercentage: 20 });
            }
            this.renderCompassion();
            this.renderDashboard();
        }, e => console.error(e));
    },

    // ==================== DASHBOARD ====================
    renderDashboard() {
        const period = document.getElementById('dashboardPeriod')?.value || 'all_time';
        
        const now = new Date();
        let filteredSales = this.sales;
        let filteredExpenses = this.expenses;

        if (period === 'this_month') {
            filteredSales = this.sales.filter(s => s.month === now.getMonth() + 1 && s.year === now.getFullYear());
            filteredExpenses = this.expenses.filter(e => {
                if(!e.date) return false;
                const d = new Date(e.date);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            });
        } else if (period === 'last_month') {
            let lm = now.getMonth();
            let ly = now.getFullYear();
            if (lm === 0) { lm = 12; ly--; }
            filteredSales = this.sales.filter(s => s.month === lm && s.year === ly);
            filteredExpenses = this.expenses.filter(e => {
                if(!e.date) return false;
                const d = new Date(e.date);
                return d.getMonth() + 1 === lm && d.getFullYear() === ly;
            });
        } else if (period === 'this_year') {
            filteredSales = this.sales.filter(s => s.year === now.getFullYear());
            filteredExpenses = this.expenses.filter(e => {
                if(!e.date) return false;
                return new Date(e.date).getFullYear() === now.getFullYear();
            });
        }

        const rev = filteredSales.reduce((acc, s) => acc + (s.totalAmount || 0), 0);
        const exp = filteredExpenses.reduce((acc, e) => acc + (e.amount || 0), 0);
        const profit = rev - exp;
        const margin = rev > 0 ? ((profit / rev) * 100).toFixed(1) : 0;
        const compShare = profit > 0 ? (profit * (this.storeConfig.compassionSharePercentage / 100)) : 0;

        if(document.getElementById('dashRevenue')) document.getElementById('dashRevenue').innerText = '₹' + rev.toLocaleString('en-IN');
        if(document.getElementById('dashExpenses')) document.getElementById('dashExpenses').innerText = '₹' + exp.toLocaleString('en-IN');
        if(document.getElementById('dashProfit')) document.getElementById('dashProfit').innerText = '₹' + profit.toLocaleString('en-IN');
        if(document.getElementById('dashMargin')) document.getElementById('dashMargin').innerText = margin + '% Margin';
        if(document.getElementById('dashCompassion')) document.getElementById('dashCompassion').innerText = '₹' + compShare.toLocaleString('en-IN');

        const listEl = document.getElementById('recentSalesList');
        if(listEl) {
            const recent = this.sales.slice(0, 10);
            if (!recent.length) {
                listEl.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-tertiary);">No recent sales</div>';
            } else {
                listEl.innerHTML = recent.map(s => {
                    const time = s.timestamp ? new Date(s.timestamp.toDate()).toLocaleString() : '';
                    return `
                        <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 500; color: var(--text-primary);">₹${s.totalAmount} via ${s.paymentMethod || 'Cash'}</div>
                                <div style="font-size: 0.8rem; color: var(--text-tertiary);">${s.items?.length || 0} items • ${this.escapeHtml(s.customerName || 'Walk-in')}</div>
                            </div>
                            <div style="font-size: 0.8rem; color: var(--text-tertiary);">${time}</div>
                        </div>
                    `;
                }).join('');
            }
        }
    },

    // ==================== IMAGE HANDLING ====================
    currentAddImage: '',
    currentEditImage: '',
    pasteListenerAttached: false,
    cropMode: 'add',
    cropImageObj: null,
    cropRotation: 0,
    cropZoom: 1,
    cropPanX: 0,
    cropPanY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,

    // Smart image compression - reduces size without visible quality loss
    smartCompress(dataUrl, maxDimension = 800, quality = 0.82) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                let width = img.naturalWidth || img.width;
                let height = img.naturalHeight || img.height;

                // Only downscale if larger than maxDimension
                if (width > maxDimension || height > maxDimension) {
                    const ratio = Math.min(maxDimension / width, maxDimension / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                // Enable high-quality downscaling
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                // Use JPEG for photos, check if transparent for PNG
                const result = canvas.toDataURL('image/jpeg', quality);

                // Log compression stats
                const originalKB = Math.round(dataUrl.length * 0.75 / 1024);
                const compressedKB = Math.round(result.length * 0.75 / 1024);
                console.log(`[ImageCompressor] ${originalKB}KB → ${compressedKB}KB (${Math.round((1 - compressedKB/originalKB) * 100)}% reduction)`);

                resolve(result);
            };
            img.onerror = () => reject(new Error('Failed to load image for compression'));
            img.src = dataUrl;
        });
    },

    // Read a File object into a base64 data URL
    readFileAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    },

    // Load any image source into a clean, untainted Image object
    loadImageForCropping(src) {
        if (!src) return Promise.reject(new Error('Empty image source'));

        return new Promise((resolve, reject) => {
            const img = new Image();

            // For data URLs, load directly (always untainted)
            if (src.startsWith('data:')) {
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('Failed to load base64 image'));
                img.src = src;
                return;
            }

            // For remote URLs, convert to clean data URL via offscreen canvas
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                try {
                    const c = document.createElement('canvas');
                    c.width = img.naturalWidth || img.width || 400;
                    c.height = img.naturalHeight || img.height || 400;
                    const cx = c.getContext('2d');
                    cx.drawImage(img, 0, 0);
                    const cleanUrl = c.toDataURL('image/jpeg', 0.92);
                    const cleanImg = new Image();
                    cleanImg.onload = () => resolve(cleanImg);
                    cleanImg.onerror = () => resolve(img); // fallback
                    cleanImg.src = cleanUrl;
                } catch (e) {
                    resolve(img); // fallback if CORS blocks
                }
            };
            img.onerror = () => {
                // Retry without crossOrigin
                const fb = new Image();
                fb.onload = () => resolve(fb);
                fb.onerror = () => reject(new Error('Image load failed'));
                fb.src = src;
            };
            img.src = src;
        });
    },

    // Open the cropper modal with a given image source
    async openCropper(mode = 'add') {
        this.cropMode = mode;
        let targetSrc = mode === 'add' ? this.currentAddImage : this.currentEditImage;

        // Fallback: try URL input field
        if (!targetSrc && mode === 'edit') {
            const v = document.getElementById('editAdminProdImageUrl')?.value.trim();
            if (v) targetSrc = v;
        }
        if (!targetSrc && mode === 'add') {
            const v = document.getElementById('prodImageUrl')?.value.trim();
            if (v) targetSrc = v;
        }

        if (!targetSrc) {
            NewAdmin.showToast('error', 'No image available to crop.');
            return;
        }

        try {
            NewAdmin.showToast('info', 'Loading image for cropping...');
            const img = await this.loadImageForCropping(targetSrc);
            this.cropImageObj = img;
            this.cropRotation = 0;
            this.cropZoom = 1;
            this.cropPanX = 0;
            this.cropPanY = 0;

            const zoomEl = document.getElementById('cropZoomRange');
            if (zoomEl) zoomEl.value = '1';

            const modal = document.getElementById('cropperModal');
            if (modal) { modal.style.display = 'flex'; }

            // Initialize drag-to-pan on canvas
            this.initCropperDrag();

            // Render with small delay to ensure modal is visible
            requestAnimationFrame(() => {
                this.renderCropCanvas();
                setTimeout(() => this.renderCropCanvas(), 50);
            });
        } catch (err) {
            console.error('Cropper load error:', err);
            NewAdmin.showToast('error', 'Could not load image for cropping.');
        }
    },

    initCropperDrag() {
        const canvas = document.getElementById('cropCanvas');
        if (!canvas || canvas._dragInitialized) return;
        canvas._dragInitialized = true;

        const getPos = (e) => {
            if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            return { x: e.clientX, y: e.clientY };
        };

        const onStart = (e) => {
            e.preventDefault();
            this.isDragging = true;
            const pos = getPos(e);
            this.dragStartX = pos.x - this.cropPanX;
            this.dragStartY = pos.y - this.cropPanY;
            canvas.style.cursor = 'grabbing';
        };

        const onMove = (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const pos = getPos(e);
            this.cropPanX = pos.x - this.dragStartX;
            this.cropPanY = pos.y - this.dragStartY;
            this.renderCropCanvas();
        };

        const onEnd = () => {
            this.isDragging = false;
            canvas.style.cursor = 'grab';
        };

        canvas.addEventListener('mousedown', onStart);
        canvas.addEventListener('mousemove', onMove);
        canvas.addEventListener('mouseup', onEnd);
        canvas.addEventListener('mouseleave', onEnd);
        canvas.addEventListener('touchstart', onStart, { passive: false });
        canvas.addEventListener('touchmove', onMove, { passive: false });
        canvas.addEventListener('touchend', onEnd);
        canvas.style.cursor = 'grab';
    },

    closeCropper() {
        const modal = document.getElementById('cropperModal');
        if (modal) { modal.style.display = 'none'; }
    },

    rotateCropImage(deg) {
        this.cropRotation = (this.cropRotation + deg + 360) % 360;
        this.renderCropCanvas();
    },

    resetCropState() {
        this.cropRotation = 0;
        this.cropZoom = 1;
        this.cropPanX = 0;
        this.cropPanY = 0;
        const zoomEl = document.getElementById('cropZoomRange');
        if (zoomEl) zoomEl.value = '1';
        this.renderCropCanvas();
    },

    updateCropPreview() {
        const zoomEl = document.getElementById('cropZoomRange');
        this.cropZoom = parseFloat(zoomEl ? zoomEl.value : 1) || 1;
        this.renderCropCanvas();
    },

    renderCropCanvas() {
        const canvas = document.getElementById('cropCanvas');
        if (!canvas || !this.cropImageObj) return;

        const ctx = canvas.getContext('2d');
        const size = 280;
        canvas.width = size;
        canvas.height = size;

        // Dark background
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, size, size);

        ctx.save();
        ctx.translate(size / 2 + this.cropPanX, size / 2 + this.cropPanY);
        ctx.rotate((this.cropRotation * Math.PI) / 180);
        ctx.scale(this.cropZoom, this.cropZoom);

        const img = this.cropImageObj;
        const imgW = img.naturalWidth || img.width || 1;
        const imgH = img.naturalHeight || img.height || 1;
        const imgRatio = imgW / imgH;

        let drawW, drawH;
        if (imgRatio > 1) {
            drawW = size;
            drawH = size / imgRatio;
        } else {
            drawH = size;
            drawW = size * imgRatio;
        }

        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();

        // Draw crop guide overlay (square center frame)
        ctx.save();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        const guideMargin = 10;
        ctx.strokeRect(guideMargin, guideMargin, size - guideMargin * 2, size - guideMargin * 2);
        ctx.restore();
    },

    applyCrop() {
        const canvas = document.getElementById('cropCanvas');
        if (!canvas || !this.cropImageObj) {
            NewAdmin.showToast('error', 'No image loaded in cropper.');
            return;
        }

        try {
            // Export at 400x400 for product thumbnails
            const exportSize = 400;
            const cropCanvas = document.createElement('canvas');
            cropCanvas.width = exportSize;
            cropCanvas.height = exportSize;
            const ctx = cropCanvas.getContext('2d');

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, exportSize, exportSize);

            // Scale pan values from preview size (280) to export size (400)
            const scaleFactor = exportSize / 280;
            ctx.save();
            ctx.translate(exportSize / 2 + this.cropPanX * scaleFactor, exportSize / 2 + this.cropPanY * scaleFactor);
            ctx.rotate((this.cropRotation * Math.PI) / 180);
            ctx.scale(this.cropZoom, this.cropZoom);

            const img = this.cropImageObj;
            const imgW = img.naturalWidth || img.width || 1;
            const imgH = img.naturalHeight || img.height || 1;
            const imgRatio = imgW / imgH;

            let drawW, drawH;
            if (imgRatio > 1) {
                drawW = exportSize;
                drawH = exportSize / imgRatio;
            } else {
                drawH = exportSize;
                drawW = exportSize * imgRatio;
            }

            ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
            ctx.restore();

            const croppedDataUrl = cropCanvas.toDataURL('image/jpeg', 0.85);
            this.setProductImage(croppedDataUrl, this.cropMode);
            this.closeCropper();
            NewAdmin.showToast('success', '✅ Image cropped & saved!');
        } catch (e) {
            console.error('Crop export error:', e);
            NewAdmin.showToast('error', 'Crop failed: ' + e.message);
        }
    },

    async copyProductImageToClipboard(imageUrl) {
        if (!imageUrl) {
            NewAdmin.showToast('error', 'No product image available to copy');
            return;
        }
        try {
            NewAdmin.showToast('info', 'Copying image to clipboard...');
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = imageUrl;
            });
            const c = document.createElement('canvas');
            c.width = img.naturalWidth || img.width;
            c.height = img.naturalHeight || img.height;
            const cx = c.getContext('2d');
            cx.drawImage(img, 0, 0);
            c.toBlob(async (blob) => {
                if (blob && navigator.clipboard && window.ClipboardItem) {
                    try {
                        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                        NewAdmin.showToast('success', '📋 Image copied to clipboard!');
                        return;
                    } catch (e) {}
                }
                await navigator.clipboard.writeText(imageUrl);
                NewAdmin.showToast('success', '📋 Image link copied!');
            }, 'image/png');
        } catch (err) {
            try {
                await navigator.clipboard.writeText(imageUrl);
                NewAdmin.showToast('success', '📋 Image link copied!');
            } catch (e) {
                NewAdmin.showToast('error', 'Unable to copy image');
            }
        }
    },

    copyFromExistingProduct(productId, mode = 'add') {
        const prod = this.products.find(p => p.id === productId);
        if (prod && prod.imageUrl) {
            this.setProductImage(prod.imageUrl, mode);
            NewAdmin.showToast('success', `📋 Image copied from ${prod.title}!`);
            setTimeout(() => this.openCropper(mode), 300);
        } else {
            NewAdmin.showToast('error', 'Selected product has no image');
        }
    },

    populateExistingProductsDropdown() {
        const select = document.getElementById('copyFromExistingSelect');
        if (!select) return;
        select.innerHTML = '<option value="">📋 Copy image from existing product...</option>';
        this.products.filter(p => p.imageUrl).forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.categoryEmoji || '📦'} ${p.title}`;
            select.appendChild(opt);
        });
    },

    // Legacy compressImage for File objects (used by handleImageFile and paste)
    compressImage(file, maxDimension = 800, quality = 0.82) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataUrl = await this.readFileAsDataUrl(file);
                const compressed = await this.smartCompress(dataUrl, maxDimension, quality);
                resolve(compressed);
            } catch (e) {
                reject(e);
            }
        });
    },

    async handleImageFile(event, mode = 'add') {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            NewAdmin.showToast('info', 'Processing image...');
            const dataUrl = await this.compressImage(file);
            this.setProductImage(dataUrl, mode);
            // Auto-open cropper
            setTimeout(() => this.openCropper(mode), 300);
        } catch (e) {
            console.error('Image processing failed:', e);
            NewAdmin.showToast('error', 'Failed to process image');
        }
    },

    handleImageUrlChange(event, mode = 'add') {
        const url = event.target.value.trim();
        if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image/'))) {
            this.setProductImage(url, mode);
            if (this.urlCropTimeout) clearTimeout(this.urlCropTimeout);
            this.urlCropTimeout = setTimeout(() => {
                this.openCropper(mode);
            }, 800);
        } else if (!url) {
            this.clearProductImage(mode);
        }
    },

    setProductImage(dataUrlOrUrl, mode = 'add') {
        if (mode === 'add') {
            this.currentAddImage = dataUrlOrUrl;
            const pBox = document.getElementById('prodImgPreviewBox');
            const pImg = document.getElementById('prodImgPreview');
            if (pBox && pImg) {
                pImg.src = dataUrlOrUrl;
                pBox.style.display = 'block';
            }
        } else {
            this.currentEditImage = dataUrlOrUrl;
            const pBox = document.getElementById('editImgPreviewBox');
            const pImg = document.getElementById('editImgPreview');
            if (pBox && pImg) {
                pImg.src = dataUrlOrUrl;
                pBox.style.display = 'block';
            }
        }
    },

    clearProductImage(mode = 'add') {
        if (mode === 'add') {
            this.currentAddImage = '';
            const pBox = document.getElementById('prodImgPreviewBox');
            const pImg = document.getElementById('prodImgPreview');
            const pFile = document.getElementById('prodImgFile');
            const pUrl = document.getElementById('prodImageUrl');
            if (pBox) pBox.style.display = 'none';
            if (pImg) pImg.src = '';
            if (pFile) pFile.value = '';
            if (pUrl) pUrl.value = '';
        }
    },

    initClipboardPaste() {
        if (this.pasteListenerAttached) return;
        this.pasteListenerAttached = true;

        window.addEventListener('paste', async (e) => {
            const modal = document.getElementById('storeModal');
            if (!modal || !modal.classList.contains('active')) return;

            const items = e.clipboardData?.items;
            if (!items) return;

            const addForm = document.getElementById('addProductForm');
            const editModal = document.getElementById('editProductAdminModal');
            const isAddVisible = addForm && addForm.style.display !== 'none';
            const isEditVisible = editModal && getComputedStyle(editModal).display !== 'none';

            // 1. Raw image file paste (screenshot / clipboard image blob)
            for (const item of items) {
                if (item.type.indexOf('image') !== -1) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (file) {
                        try {
                            NewAdmin.showToast('info', 'Pasted image detected! Compressing...');
                            const dataUrl = await this.compressImage(file);
                            const targetMode = isEditVisible ? 'edit' : 'add';
                            if (!isEditVisible && !isAddVisible) {
                                this.toggleAddProductForm();
                            }
                            this.setProductImage(dataUrl, targetMode);
                            // Auto-open cropper
                            setTimeout(() => this.openCropper(targetMode), 300);
                        } catch (err) {
                            console.error('Paste error:', err);
                            NewAdmin.showToast('error', 'Failed to process pasted image');
                        }
                    }
                    return;
                }
            }

            // 2. Text paste (URL string)
            const text = e.clipboardData?.getData('text')?.trim();
            if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image/'))) {
                const targetMode = isEditVisible ? 'edit' : 'add';
                this.setProductImage(text, targetMode);
                const urlInput = document.getElementById(targetMode === 'edit' ? 'editAdminProdImageUrl' : 'prodImageUrl');
                if (urlInput) urlInput.value = text.startsWith('data:') ? '' : text;
                NewAdmin.showToast('success', '📋 Image URL pasted!');
                setTimeout(() => this.openCropper(targetMode), 400);
            }
        });
    },

    // ==================== INVENTORY ====================
    toggleAddProductForm() {
        const form = document.getElementById('addProductForm');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    },

    handleCategoryChange(mode = 'add') {
        const selectId = mode === 'add' ? 'prodCategory' : 'editAdminProdCategory';
        const customId = mode === 'add' ? 'prodCategoryCustom' : 'editAdminProdCategoryCustom';
        const select = document.getElementById(selectId);
        const custom = document.getElementById(customId);
        if (select && custom) {
            if (select.value === 'Other') {
                custom.style.display = 'block';
                custom.focus();
            } else {
                custom.style.display = 'none';
                custom.value = '';
            }
        }
    },

    async addProduct() {
        const title = document.getElementById('prodTitle').value;
        let cat = document.getElementById('prodCategory').value;
        if (cat === 'Other') {
            const customVal = document.getElementById('prodCategoryCustom')?.value.trim();
            cat = customVal || 'Other';
        }
        const sku = document.getElementById('prodSKU').value;
        const cost = parseFloat(document.getElementById('prodCost').value) || 0;
        const price = parseFloat(document.getElementById('prodPrice').value) || 0;
        const qty = parseInt(document.getElementById('prodQty').value) || 0;
        const threshold = parseInt(document.getElementById('prodThreshold').value) || 5;
        const online = document.getElementById('prodOnline').checked;
        const desc = document.getElementById('prodDesc').value;

        if (!title || price <= 0) {
            NewAdmin.showToast('error', 'Title and valid Selling Price are required.');
            return;
        }

        try {
            NewAdmin.showToast('info', 'Adding product...');
            const imageUrl = this.currentAddImage || document.getElementById('prodImageUrl')?.value.trim() || null;
            await NewAdmin.db.collection('broproStore_products').add({
                title, category: cat, sku, costPrice: cost, sellingPrice: price,
                stockQty: qty, lowStockThreshold: threshold, isOnlineAvailable: online, description: desc,
                imageUrl: imageUrl,
                addedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            NewAdmin.showToast('success', 'Product added successfully!');
            document.getElementById('addProductForm').style.display = 'none';
            // clear form
            ['prodTitle','prodSKU','prodCost','prodPrice','prodQty','prodDesc','prodCategoryCustom'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            document.getElementById('prodCategory').value = 'Stationery';
            this.handleCategoryChange('add');
            this.clearProductImage('add');
        } catch(e) {
            console.error(e);
            NewAdmin.showToast('error', e.message);
        }
    },

    renderInventory() {
        const search = document.getElementById('inventorySearch')?.value.toLowerCase() || '';
        const listEl = document.getElementById('inventoryList');
        if (!listEl) return;

        this.populateExistingProductsDropdown();

        let filtered = this.products.filter(p => p.title.toLowerCase().includes(search) || (p.sku && p.sku.toLowerCase().includes(search)));

        if (!filtered.length) {
            listEl.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; color: var(--text-tertiary); background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06);">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">📦</div>
                    <div style="font-size: 1.2rem; font-weight: 600; color: var(--text-secondary);">No products found</div>
                    <div style="font-size: 0.95rem; margin-top: 0.25rem;">Try adjusting your search or add a new product.</div>
                </div>
            `;
            return;
        }

        listEl.innerHTML = filtered.map(p => {
            let badge = '';
            if (p.stockQty <= 0) badge = '<span style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-left: 0.75rem;">🚫 Out of Stock</span>';
            else if (p.stockQty <= p.lowStockThreshold) badge = '<span style="background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-left: 0.75rem;">⚠️ Low Stock</span>';
            else badge = '<span style="background: rgba(16,185,129,0.12); color: #34d399; border: 1px solid rgba(16,185,129,0.25); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-left: 0.75rem;">In Stock</span>';

            const onlineBadge = p.isOnlineAvailable ? '<span style="background: rgba(59,130,246,0.12); color: #60a5fa; border: 1px solid rgba(59,130,246,0.25); padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; margin-left: 0.5rem;">🌐 Online</span>' : '';

            let imgHtml = `<div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; flex-shrink: 0;">📦</div>`;
            if (p.imageUrl) {
                imgHtml = `<div style="width: 52px; height: 52px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(59,130,246,0.3); flex-shrink: 0; background: #000;"><img src="${this.escapeHtml(p.imageUrl)}" style="width: 100%; height: 100%; object-fit: cover;"></div>`;
            }

            const copyImgBtn = p.imageUrl ? `<button onclick="StoreManager.copyProductImageToClipboard('${p.imageUrl}')" style="background: rgba(245,158,11,0.12); color: #fbbf24; border: 1px solid rgba(245,158,11,0.25); width: 42px; height: 42px; border-radius: 12px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" title="Copy Product Image to Clipboard">📋</button>` : '';

            return `
                <div style="background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1.25rem; backdrop-filter: blur(10px);">
                    ${imgHtml}
                    <div style="flex: 1;">
                        <div style="font-weight: 700; font-size: 1.15rem; color: #fff; display: flex; align-items: center; flex-wrap: wrap; gap: 0.25rem;">
                            ${this.escapeHtml(p.title)} ${badge} ${onlineBadge}
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.4rem; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
                            <span>🏷️ SKU: <strong style="color: #cbd5e1;">${this.escapeHtml(p.sku || 'N/A')}</strong></span>
                            <span>•</span>
                            <span>📂 ${this.escapeHtml(p.category)}</span>
                            <span>•</span>
                            <span>📦 Stock: <strong style="color: ${p.stockQty <= 0 ? '#f87171' : '#34d399'}; font-size: 1rem;">${p.stockQty}</strong></span>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="text-align: right; margin-right: 0.5rem;">
                            <div style="color: #34d399; font-weight: 800; font-size: 1.3rem;">₹${p.sellingPrice}</div>
                            <div style="font-size: 0.85rem; color: var(--text-tertiary);">Cost: ₹${p.costPrice}</div>
                        </div>
                        <button onclick="StoreManager.openEditProductModal('${p.id}')" style="background: rgba(59,130,246,0.12); color: #60a5fa; border: 1px solid rgba(59,130,246,0.25); width: 42px; height: 42px; border-radius: 12px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" title="Edit Product">✏️</button>
                        ${copyImgBtn}
                        <button onclick="StoreManager.deleteProduct('${p.id}')" style="background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.25); width: 42px; height: 42px; border-radius: 12px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" title="Delete Product">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    openEditProductModal(id) {
        const prod = this.products.find(p => p.id === id);
        if (!prod) return;

        document.getElementById('editAdminProdId').value = id;
        document.getElementById('editAdminProdTitle').value = prod.title || '';
        
        const standardCats = ['Stationery', 'Books', 'Uniforms', 'Merchandise', 'Snacks'];
        const catSelect = document.getElementById('editAdminProdCategory');
        const catCustom = document.getElementById('editAdminProdCategoryCustom');
        const prodCat = prod.category || 'Stationery';

        if (standardCats.includes(prodCat)) {
            catSelect.value = prodCat;
            if (catCustom) {
                catCustom.style.display = 'none';
                catCustom.value = '';
            }
        } else {
            catSelect.value = 'Other';
            if (catCustom) {
                catCustom.style.display = 'block';
                catCustom.value = prodCat === 'Other' ? '' : prodCat;
            }
        }
        document.getElementById('editAdminProdSKU').value = prod.sku || '';
        document.getElementById('editAdminProdCost').value = prod.costPrice || 0;
        document.getElementById('editAdminProdPrice').value = prod.sellingPrice || 0;
        document.getElementById('editAdminProdQty').value = prod.stockQty || 0;
        document.getElementById('editAdminProdThreshold').value = prod.lowStockThreshold || 5;
        document.getElementById('editAdminProdOnline').checked = !!prod.isOnlineAvailable;
        document.getElementById('editAdminProdDesc').value = prod.description || '';

        this.clearProductImage('edit');
        if (prod.imageUrl) {
            this.setProductImage(prod.imageUrl, 'edit');
            const editUrlInput = document.getElementById('editAdminProdImageUrl');
            if (editUrlInput) editUrlInput.value = prod.imageUrl.startsWith('data:') ? '' : prod.imageUrl;
        }

        document.getElementById('editProductAdminModal').style.display = 'flex';
    },

    async submitEditProduct() {
        const id = document.getElementById('editAdminProdId').value;
        const title = document.getElementById('editAdminProdTitle').value.trim();
        let cat = document.getElementById('editAdminProdCategory').value;
        if (cat === 'Other') {
            const customVal = document.getElementById('editAdminProdCategoryCustom')?.value.trim();
            cat = customVal || 'Other';
        }
        const sku = document.getElementById('editAdminProdSKU').value.trim();
        const cost = parseFloat(document.getElementById('editAdminProdCost').value) || 0;
        const price = parseFloat(document.getElementById('editAdminProdPrice').value) || 0;
        const qty = parseInt(document.getElementById('editAdminProdQty').value) || 0;
        const threshold = parseInt(document.getElementById('editAdminProdThreshold').value) || 5;
        const online = document.getElementById('editAdminProdOnline').checked;
        const desc = document.getElementById('editAdminProdDesc').value.trim();
        const imageUrl = this.currentEditImage || document.getElementById('editAdminProdImageUrl')?.value.trim() || null;

        if (!id || !title || price <= 0) {
            NewAdmin.showToast('error', 'Title and valid Selling Price are required.');
            return;
        }

        try {
            NewAdmin.showToast('info', 'Updating product...');
            await NewAdmin.db.collection('broproStore_products').doc(id).update({
                title: title,
                category: cat,
                sku: sku,
                costPrice: cost,
                sellingPrice: price,
                stockQty: qty,
                lowStockThreshold: threshold,
                isOnlineAvailable: online,
                description: desc,
                imageUrl: imageUrl,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            NewAdmin.showToast('success', 'Product updated successfully!');
            document.getElementById('editProductAdminModal').style.display = 'none';
            this.clearProductImage('edit');
        } catch(e) {
            console.error(e);
            NewAdmin.showToast('error', e.message);
        }
    },

    async deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await NewAdmin.db.collection('broproStore_products').doc(id).delete();
            NewAdmin.showToast('success', 'Product deleted');
        } catch(e) {
            console.error(e);
            NewAdmin.showToast('error', e.message);
        }
    },

    // ==================== POS ====================
    renderPOSGrid() {
        const search = document.getElementById('posSearch')?.value.toLowerCase() || '';
        const gridEl = document.getElementById('posGrid');
        if (!gridEl) return;

        let filtered = this.products.filter(p => p.title.toLowerCase().includes(search) || (p.sku && p.sku.toLowerCase().includes(search)));

        if (!filtered.length) {
            gridEl.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-tertiary); background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06);">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
                    <div style="font-size: 1.1rem; font-weight: 600;">No matching products for billing</div>
                </div>
            `;
            return;
        }

        gridEl.innerHTML = filtered.map(p => {
            const outOfStock = p.stockQty <= 0;
            return `
                <div onclick="${outOfStock ? '' : `StoreManager.addToCart('${p.id}')`}" style="background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid ${outOfStock ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)'}; border-radius: 16px; padding: 1.15rem; cursor: ${outOfStock ? 'not-allowed' : 'pointer'}; opacity: ${outOfStock ? '0.4' : '1'}; display: flex; flex-direction: column; justify-content: space-between; min-height: 130px; transition: all 0.2s; position: relative;">
                    <div style="font-weight: 700; color: #fff; font-size: 1.05rem; line-height: 1.3;">${this.escapeHtml(p.title)}</div>
                    <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: flex-end;">
                        <span style="color: #34d399; font-weight: 800; font-size: 1.25rem;">₹${p.sellingPrice}</span>
                        <span style="font-size: 0.85rem; color: ${outOfStock ? '#f87171' : 'var(--text-tertiary)'}; font-weight: 600;">${outOfStock ? 'Out' : 'Qty: ' + p.stockQty}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    addToCart(id) {
        const prod = this.products.find(p => p.id === id);
        if (!prod || prod.stockQty <= 0) return;

        const existing = this.posCart.find(i => i.id === id);
        if (existing) {
            if (existing.qty >= prod.stockQty) {
                NewAdmin.showToast('error', 'Cannot add more than available stock!');
                return;
            }
            existing.qty++;
        } else {
            this.posCart.push({ id, title: prod.title, price: prod.sellingPrice, cost: prod.costPrice, qty: 1, maxQty: prod.stockQty });
        }
        this.renderCart();
    },

    updateCartQty(id, delta) {
        const item = this.posCart.find(i => i.id === id);
        if (!item) return;
        
        item.qty += delta;
        if (item.qty <= 0) {
            this.posCart = this.posCart.filter(i => i.id !== id);
        } else if (item.qty > item.maxQty) {
            item.qty = item.maxQty;
            NewAdmin.showToast('error', 'Max stock reached');
        }
        this.renderCart();
    },

    renderCart() {
        const listEl = document.getElementById('posCartList');
        const totalEl = document.getElementById('posTotal');
        if (!listEl || !totalEl) return;

        if (!this.posCart.length) {
            listEl.innerHTML = '<div style="text-align:center; color: var(--text-tertiary); font-size: 1rem; padding: 3rem 0;">Cart is empty — tap products to add</div>';
            totalEl.innerText = '₹0';
            return;
        }

        let total = 0;
        listEl.innerHTML = this.posCart.map(item => {
            const sub = item.price * item.qty;
            total += sub;
            return `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 0.85rem 1rem; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; font-size: 1rem; color: #fff;">${this.escapeHtml(item.title)}</div>
                        <div style="color: #34d399; font-size: 0.9rem; font-weight: 700; margin-top: 0.2rem;">₹${item.price} × ${item.qty} = ₹${sub}</div>
                    </div>
                    <div style="display: flex; gap: 0.4rem; align-items: center;">
                        <button onclick="StoreManager.updateCartQty('${item.id}', -1)" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: center;">-</button>
                        <span style="width: 26px; text-align: center; font-weight: 700; font-size: 1.05rem;">${item.qty}</span>
                        <button onclick="StoreManager.updateCartQty('${item.id}', 1)" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: center;">+</button>
                    </div>
                </div>
            `;
        }).join('');
        
        totalEl.innerText = '₹' + total.toLocaleString('en-IN');
    },

    async completeSale() {
        if (!this.posCart.length) {
            NewAdmin.showToast('error', 'Cart is empty');
            return;
        }

        const customer = document.getElementById('posCustomer').value;
        const method = document.getElementById('posPayment').value;
        
        let totalAmount = 0;
        let totalCost = 0;
        
        this.posCart.forEach(i => {
            totalAmount += i.price * i.qty;
            totalCost += (i.cost || 0) * i.qty;
        });

        const netProfit = totalAmount - totalCost;
        const compassionShare = netProfit > 0 ? (netProfit * (this.storeConfig.compassionSharePercentage / 100)) : 0;
        const now = new Date();

        if (!confirm(`Complete sale for ₹${totalAmount}?`)) return;

        try {
            NewAdmin.showToast('info', 'Processing sale...');
            
            const batch = NewAdmin.db.batch();
            
            // 1. Record Sale
            const saleRef = NewAdmin.db.collection('broproStore_sales').doc();
            batch.set(saleRef, {
                items: this.posCart,
                totalAmount,
                totalCost,
                netProfit,
                compassionShare,
                paymentMethod: method,
                customerName: customer,
                date: now.toISOString().split('T')[0],
                month: now.getMonth() + 1,
                year: now.getFullYear(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                soldBy: firebase.auth().currentUser.uid
            });

            // 2. Update stock
            this.posCart.forEach(item => {
                const pRef = NewAdmin.db.collection('broproStore_products').doc(item.id);
                batch.update(pRef, {
                    stockQty: firebase.firestore.FieldValue.increment(-item.qty)
                });
            });

            await batch.commit();

            NewAdmin.showToast('success', '✅ Sale completed successfully!');
            this.posCart = [];
            this.renderCart();
            document.getElementById('posCustomer').value = '';

        } catch(e) {
            console.error(e);
            NewAdmin.showToast('error', 'Sale failed: ' + e.message);
        }
    },

    // ==================== EXPENSES ====================
    async addExpense() {
        const title = document.getElementById('expTitle').value;
        const amount = parseFloat(document.getElementById('expAmount').value) || 0;
        const category = document.getElementById('expCategory').value;
        const date = document.getElementById('expDate').value;
        const notes = document.getElementById('expNotes').value;

        if (!title || amount <= 0 || !date) {
            NewAdmin.showToast('error', 'Title, Valid Amount, and Date are required.');
            return;
        }

        try {
            NewAdmin.showToast('info', 'Recording expense...');
            await NewAdmin.db.collection('broproStore_expenses').add({
                title, amount, category, date, notes,
                addedBy: firebase.auth().currentUser.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            NewAdmin.showToast('success', 'Expense recorded!');
            document.getElementById('expTitle').value = '';
            document.getElementById('expAmount').value = '';
            document.getElementById('expNotes').value = '';
        } catch(e) {
            console.error(e);
            NewAdmin.showToast('error', e.message);
        }
    },

    renderExpenses() {
        const listEl = document.getElementById('expenseList');
        if (!listEl) return;

        if (!this.expenses.length) {
            listEl.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; color: var(--text-tertiary); background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06);">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">💸</div>
                    <div style="font-size: 1.2rem; font-weight: 600; color: var(--text-secondary);">No expenses recorded yet</div>
                </div>
            `;
            return;
        }

        listEl.innerHTML = this.expenses.map(e => {
            const d = e.date || (e.timestamp ? new Date(e.timestamp.toDate()).toISOString().split('T')[0] : '');
            return `
                <div style="background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; backdrop-filter: blur(10px);">
                    <div>
                        <div style="font-weight: 700; font-size: 1.15rem; color: #fff;">${this.escapeHtml(e.title)}</div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.3rem; display: flex; gap: 0.75rem; align-items: center;">
                            <span>📅 ${d}</span>
                            <span>•</span>
                            <span style="background: rgba(239,68,68,0.12); color: #fca5a5; padding: 2px 8px; border-radius: 6px; font-weight: 600; font-size: 0.8rem;">${this.escapeHtml(e.category)}</span>
                        </div>
                        ${e.notes ? `<div style="font-size: 0.9rem; color: var(--text-tertiary); margin-top: 0.35rem; font-style: italic;">"${this.escapeHtml(e.notes)}"</div>` : ''}
                    </div>
                    <div style="color: #f87171; font-weight: 800; font-size: 1.4rem;">₹${e.amount.toLocaleString('en-IN')}</div>
                </div>
            `;
        }).join('');
    },

    // ==================== TEAM ====================

    // Permission constants
    VALID_PERMISSIONS: ['ADD_PRODUCT', 'EDIT_PRODUCT', 'POS_TERMINAL', 'EXPENSE_TRACKING', 'VIEW_DASHBOARD', 'VIEW_ALL_TIME_FINANCIALS'],
    DEFAULT_MANAGER_PERMS: ['ADD_PRODUCT', 'EDIT_PRODUCT', 'POS_TERMINAL', 'EXPENSE_TRACKING', 'VIEW_DASHBOARD'],
    DEFAULT_ASSISTANT_PERMS: ['POS_TERMINAL'],

    // Role change handler — toggle permission checkboxes based on role selection
    onRoleChange() {
        const role = document.querySelector('input[name="teamRole"]:checked')?.value;
        const panel = document.getElementById('permissionsPanel');
        const checkboxes = document.querySelectorAll('#permCheckboxes input[type="checkbox"]');

        if (role === 'BPS_ASSISTANT') {
            // Lock to POS_TERMINAL only
            checkboxes.forEach(cb => {
                if (cb.value === 'POS_TERMINAL') {
                    cb.checked = true;
                    cb.disabled = true;
                } else {
                    cb.checked = false;
                    cb.disabled = true;
                }
            });
            panel.style.opacity = '0.6';
        } else {
            // Manager — all editable, defaults checked
            checkboxes.forEach(cb => {
                cb.disabled = false;
                cb.checked = this.DEFAULT_MANAGER_PERMS.includes(cb.value);
            });
            panel.style.opacity = '1';
        }
    },

    // Get selected permissions from the form
    getSelectedPermissions() {
        const checkboxes = document.querySelectorAll('#permCheckboxes input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => cb.value).filter(p => this.VALID_PERMISSIONS.includes(p));
    },

    async addTeamMember() {
        const emailInput = document.getElementById('teamEmail');
        const email = emailInput?.value.trim().toLowerCase();
        if (!email) {
            NewAdmin.showToast('error', 'Please enter a valid email address.');
            return;
        }

        // Email format validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            NewAdmin.showToast('error', 'Please enter a valid email format.');
            return;
        }

        const role = document.querySelector('input[name="teamRole"]:checked')?.value;
        if (!role || !['BPS_MANAGER', 'BPS_ASSISTANT'].includes(role)) {
            NewAdmin.showToast('error', 'Please select a valid role.');
            return;
        }

        const permissions = this.getSelectedPermissions();
        if (permissions.length === 0) {
            NewAdmin.showToast('error', 'At least one permission must be selected.');
            return;
        }

        const roleLabel = role === 'BPS_MANAGER' ? 'BPS Manager' : 'BPS Assistant';

        try {
            NewAdmin.showToast('info', `Assigning ${roleLabel} role...`);

            let name = email.split('@')[0];
            let uid = email;

            try {
                const uSnap = await NewAdmin.db.collection('users').where('email', '==', email).limit(1).get();
                if (!uSnap.empty) {
                    uid = uSnap.docs[0].id;
                    const udata = uSnap.docs[0].data();
                    name = udata.displayName || udata.name || name;
                    // Also update users document for seamless cross-collection role matching
                    await NewAdmin.db.collection('users').doc(uid).update({
                        role: role,
                        permissions: permissions
                    }).catch(() => {});
                }
            } catch (userLookupErr) {
                console.warn('User lookup warning:', userLookupErr);
            }

            const roleDocData = {
                email: email,
                uid: uid,
                name: name,
                role: role,
                permissions: permissions,
                addedBy: firebase.auth().currentUser?.uid || 'admin',
                addedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Unconditional direct write to Cloud Firestore
            await NewAdmin.db.collection('broproStore_roles').doc(email).set(roleDocData, { merge: true });

            // Background API sync
            try {
                const idToken = await firebase.auth().currentUser?.getIdToken();
                fetch('/api/store-roles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': idToken ? `Bearer ${idToken}` : ''
                    },
                    body: JSON.stringify({ action: 'ADD_ROLE', email: email, role: role, permissions: permissions })
                }).catch(() => {});
            } catch (apiErr) {}

            NewAdmin.showToast('success', `✅ ${roleLabel} role granted to ${email}`);
            if (emailInput) emailInput.value = '';
        } catch(e) {
            console.error('Add team member error:', e);
            NewAdmin.showToast('error', 'Failed to assign role: ' + (e.message || e));
        }
    },

    async editTeamMember(email) {
        const member = this.roles.find(r => r.id === email);
        if (!member) return;

        const currentPerms = member.permissions || this.DEFAULT_MANAGER_PERMS;
        const permLabels = {
            'ADD_PRODUCT': '📦 Add Product',
            'EDIT_PRODUCT': '✏️ Edit Product',
            'POS_TERMINAL': '🛒 POS Terminal',
            'EXPENSE_TRACKING': '💸 Expense Tracking',
            'VIEW_DASHBOARD': '📊 View Dashboard',
            'VIEW_ALL_TIME_FINANCIALS': '📈 View All-Time Financials'
        };

        const checkboxHtml = this.VALID_PERMISSIONS.map(p => {
            const checked = currentPerms.includes(p) ? 'checked' : '';
            return `<label style="display:flex;align-items:center;gap:6px;font-size:0.95rem;color:var(--text-secondary);">
                <input type="checkbox" value="${p}" ${checked} class="edit-perm-cb" style="accent-color:#3b82f6;width:16px;height:16px;"> ${permLabels[p] || p}
            </label>`;
        }).join('');

        const roleLabel = member.role === 'BPS_MANAGER' ? '📋 BPS Manager' : member.role === 'BPS_ASSISTANT' ? '🛒 BPS Assistant' : '👤 ' + (member.role || 'Member');

        // Create edit modal
        let editOverlay = document.getElementById('editPermOverlay');
        if (editOverlay) editOverlay.remove();

        editOverlay = document.createElement('div');
        editOverlay.id = 'editPermOverlay';
        editOverlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:999999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);';
        editOverlay.innerHTML = `
            <div style="background:var(--bg-secondary,#111827);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:2rem;max-width:440px;width:90%;">
                <h3 style="color:#fbbf24;font-size:1.3rem;font-weight:700;margin:0 0 0.25rem;">✏️ Edit Permissions</h3>
                <div style="color:var(--text-secondary);font-size:0.95rem;margin-bottom:0.5rem;">${this.escapeHtml(member.name || member.email)} • ${roleLabel}</div>
                <div style="color:var(--text-tertiary);font-size:0.85rem;margin-bottom:1.25rem;">📧 ${this.escapeHtml(member.email)}</div>
                <div style="display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1.5rem;">${checkboxHtml}</div>
                <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
                    <button onclick="document.getElementById('editPermOverlay').remove()" style="background:rgba(255,255,255,0.06);color:var(--text-secondary);border:1px solid rgba(255,255,255,0.1);padding:0.7rem 1.5rem;border-radius:10px;cursor:pointer;font-weight:600;">Cancel</button>
                    <button onclick="StoreManager.savePermissions('${email}')" style="background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;padding:0.7rem 1.5rem;border-radius:10px;cursor:pointer;font-weight:700;box-shadow:0 4px 12px rgba(59,130,246,0.3);">💾 Save Changes</button>
                </div>
            </div>
        `;
        document.body.appendChild(editOverlay);
    },

    async savePermissions(email) {
        const checkboxes = document.querySelectorAll('.edit-perm-cb:checked');
        const permissions = Array.from(checkboxes).map(cb => cb.value).filter(p => this.VALID_PERMISSIONS.includes(p));

        if (permissions.length === 0) {
            NewAdmin.showToast('error', 'At least one permission required.');
            return;
        }

        try {
            await NewAdmin.db.collection('broproStore_roles').doc(email).update({
                permissions: permissions
            });
            NewAdmin.showToast('success', '✅ Permissions updated successfully');
            document.getElementById('editPermOverlay')?.remove();
        } catch(e) {
            console.error('Permission update error:', e);
            NewAdmin.showToast('error', 'Failed to update permissions: ' + e.message);
        }
    },

    async removeTeamMember(id) {
        if (!confirm('Revoke storekeeper access?')) return;
        try {
            let success = false;
            try {
                const idToken = await firebase.auth().currentUser?.getIdToken();
                const res = await fetch('/api/store-roles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': idToken ? `Bearer ${idToken}` : ''
                    },
                    body: JSON.stringify({ action: 'REMOVE_ROLE', email: id })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) success = true;
                }
            } catch (err) {}

            if (!success) {
                await NewAdmin.db.collection('broproStore_roles').doc(id).delete();
            }
            NewAdmin.showToast('success', 'Access revoked');
        } catch(e) {
            console.error(e);
            NewAdmin.showToast('error', e.message);
        }
    },

    renderTeam() {
        const tList = document.getElementById('teamList');
        const sList = document.getElementById('shiftList');
        if (!tList || !sList) return;

        const permLabels = {
            'ADD_PRODUCT': '📦 Add',
            'EDIT_PRODUCT': '✏️ Edit',
            'POS_TERMINAL': '🛒 POS',
            'EXPENSE_TRACKING': '💸 Expenses',
            'VIEW_DASHBOARD': '📊 Dashboard',
            'VIEW_ALL_TIME_FINANCIALS': '📈 All Time'
        };

        if (!this.roles.length) {
            tList.innerHTML = `
                <div style="text-align: center; padding: 2.5rem; color: var(--text-tertiary); background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06);">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👥</div>
                    <div style="font-size: 1.1rem; font-weight: 600;">No team members assigned yet</div>
                    <div style="font-size: 0.9rem; margin-top: 0.25rem;">Use the form above to assign BPS Manager or Assistant roles.</div>
                </div>
            `;
        } else {
            tList.innerHTML = this.roles.map(r => {
                // Role badge
                let roleBadge;
                if (r.role === 'BPS_MANAGER') {
                    roleBadge = '<span style="background:rgba(59,130,246,0.15);color:#93c5fd;padding:3px 10px;border-radius:8px;font-size:0.78rem;font-weight:700;letter-spacing:0.02em;">📋 BPS MANAGER</span>';
                } else if (r.role === 'BPS_ASSISTANT') {
                    roleBadge = '<span style="background:rgba(16,185,129,0.15);color:#6ee7b7;padding:3px 10px;border-radius:8px;font-size:0.78rem;font-weight:700;letter-spacing:0.02em;">🛒 BPS ASSISTANT</span>';
                } else {
                    roleBadge = '<span style="background:rgba(245,158,11,0.15);color:#fbbf24;padding:3px 10px;border-radius:8px;font-size:0.78rem;font-weight:700;letter-spacing:0.02em;">👤 ' + this.escapeHtml(r.role || 'LEGACY') + '</span>';
                }

                // Permission pills
                const perms = r.permissions || [];
                const permPills = perms.map(p => {
                    const label = permLabels[p] || p;
                    return `<span style="background:rgba(255,255,255,0.05);color:var(--text-tertiary);padding:2px 8px;border-radius:6px;font-size:0.72rem;font-weight:600;white-space:nowrap;">${label}</span>`;
                }).join('');

                return `
                <div style="background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.25rem 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
                        <div style="flex:1;min-width:200px;">
                            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 0.35rem;">
                                <span style="font-weight: 700; font-size: 1.1rem; color: #fff;">${this.escapeHtml(r.name || 'Team Member')}</span>
                                ${roleBadge}
                            </div>
                            <div style="font-size: 0.9rem; color: #93c5fd; font-weight: 500;">📧 ${this.escapeHtml(r.email)}</div>
                            ${perms.length ? `<div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.6rem;">${permPills}</div>` : ''}
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center; flex-shrink: 0;">
                            <button onclick="StoreManager.editTeamMember('${r.id}')" style="background: rgba(59,130,246,0.12); color: #93c5fd; border: 1px solid rgba(59,130,246,0.25); padding: 0.5rem 1rem; border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s;">✏️ Edit</button>
                            <button onclick="StoreManager.removeTeamMember('${r.id}')" style="background: rgba(239,68,68,0.12); color: #f87171; border: 1px solid rgba(239,68,68,0.25); padding: 0.5rem 1rem; border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s;">🚫 Revoke</button>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        }

        if (!this.shifts.length) {
            sList.innerHTML = `
                <div style="text-align: center; padding: 2.5rem; color: var(--text-tertiary); background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06);">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📋</div>
                    <div style="font-size: 1.1rem; font-weight: 600;">No shift handover records yet</div>
                </div>
            `;
        } else {
            sList.innerHTML = this.shifts.map(s => {
                const time = s.timestamp ? new Date(s.timestamp.toDate()).toLocaleString() : '';
                const discrepancy = (s.physicalCash || 0) - (s.systemCash || 0);
                const discStr = discrepancy === 0 ? '<span style="color:#34d399; font-weight: 700;">✅ Cash Match</span>' : `<span style="color:#f87171; font-weight: 700;">⚠️ Discrepancy: ₹${discrepancy}</span>`;
                return `
                    <div style="background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.15rem 1.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                        <div>
                            <div style="font-weight: 700; font-size: 1.1rem; color: #fff;">👤 ${this.escapeHtml(s.storekeeperName || s.storekeeperEmail || 'Team Member')}</div>
                            <div style="font-size: 0.85rem; color: var(--text-tertiary); margin-top: 0.25rem;">🕒 ${time}</div>
                        </div>
                        <div style="text-align: right; font-size: 0.95rem;">
                            <div style="color: var(--text-secondary); margin-bottom: 0.25rem;">System: <strong>₹${s.systemCash || 0}</strong> | Physical: <strong>₹${s.physicalCash || 0}</strong></div>
                            ${discStr}
                        </div>
                    </div>
                `;
            }).join('');
        }
    },

    // ==================== COMPASSION ====================
    renderCompassion() {
        const unEl = document.getElementById('compUntransferred');
        const shareEl = document.getElementById('compShare');
        const amtInput = document.getElementById('compTransferAmount');
        if (!unEl || !shareEl || !amtInput) return;

        shareEl.innerText = this.storeConfig.compassionSharePercentage + '%';

        // Calculate total net profit all time
        const totalProfit = this.sales.reduce((acc, s) => acc + (s.netProfit || 0), 0);
        // Calculate total expenses all time
        const totalExp = this.expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
        const actualProfit = totalProfit - totalExp;
        
        // Calculate expected compassion share
        let expectedShare = actualProfit > 0 ? actualProfit * (this.storeConfig.compassionSharePercentage / 100) : 0;
        
        unEl.innerText = '₹' + expectedShare.toLocaleString('en-IN');
        amtInput.value = expectedShare > 0 ? Math.round(expectedShare) : 0;
    },

    async transferToCompassion() {
        const amt = parseFloat(document.getElementById('compTransferAmount').value);
        if (!amt || amt <= 0) {
            NewAdmin.showToast('error', 'Enter a valid amount to transfer');
            return;
        }

        if (!confirm(`Transfer ₹${amt} from Store to Compassion Fund?`)) return;

        try {
            NewAdmin.showToast('info', 'Processing transfer...');
            
            const batch = NewAdmin.db.batch();
            
            // 1. Add to Compassion Fund Txns
            const cTxnRef = NewAdmin.db.collection('compassionFund_transactions').doc();
            batch.set(cTxnRef, {
                type: 'donation',
                amount: amt,
                desc1: 'BroPro Store Profit Share',
                desc2: `Transfer by ${firebase.auth().currentUser.displayName || 'Admin'}`,
                addedBy: firebase.auth().currentUser.uid,
                addedByName: firebase.auth().currentUser.displayName || 'Admin',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                addedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // 2. Update Compassion Master Config
            const cConfRef = NewAdmin.db.collection('compassionFund').doc('config');
            batch.update(cConfRef, {
                totalBalance: firebase.firestore.FieldValue.increment(amt),
                totalDonations: firebase.firestore.FieldValue.increment(amt)
            });

            // 3. Record Audit log in Store
            const sTransRef = NewAdmin.db.collection('broproStore_compassionTransfers').doc();
            batch.set(sTransRef, {
                amount: amt,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                transferredBy: firebase.auth().currentUser.uid
            });

            await batch.commit();

            NewAdmin.showToast('success', '✅ Successfully transferred to Compassion Fund!');
            document.getElementById('compTransferAmount').value = '0';
        } catch(e) {
            console.error(e);
            NewAdmin.showToast('error', 'Transfer failed: ' + e.message);
        }
    }
};

window.StoreManager = StoreManager;
