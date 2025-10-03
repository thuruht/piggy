// Enhanced ICE/PIG Tracker with GSAP animations and D3 data visualizations
class ICEPIGTracker {
  constructor() {
    this.translations = {};
    this.currentLang = 'en';
    this.magicCode = this.generateMagicCode();
    this.vectorSource = new ol.source.Vector();
    this.markers = [];
    this.stats = { ice: 0, pig: 0, total: 0, today: 0 };
    // this.init(); // Initialization is now triggered in data-viz.js
  }

  generateMagicCode() {
    return Math.random().toString(36).substring(2, 15);
  }

  async init() {
    this.addStyles();
    this.showLoadingIndicator();
    try {
      await this.loadTranslations();
      this.setupEventListeners();
      this.updateUIText();
      this.setupMap();
      this.setupDataViz();
      await this.loadMarkers();
      this.animateEntrance();
    } catch (error) {
      console.error('Init error:', error);
      this.showToast('Failed to load application', 'error');
    } finally {
      this.hideLoadingIndicator();
    }
  }

  async loadTranslations() {
    const response = await fetch('./pmaptranslate.json');
    this.translations = await response.json();
  }

  t(key) {
    return this.translations[this.currentLang]?.[key] || key;
  }

  setupMap() {
    const kcCenter = ol.proj.fromLonLat([-94.5786, 39.0997]);
    
    try {
      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          new ol.layer.Vector({
            source: this.vectorSource,
            style: this.getMarkerStyle.bind(this)
          })
        ],
        view: new ol.View({
          center: kcCenter,
          zoom: window.innerWidth < 768 ? 10 : 11
        })
      });

      this.map.on('click', this.onMapClick.bind(this));
      
      // Force map resize on mobile
      setTimeout(() => {
        if (this.map) {
          this.map.updateSize();
        }
      }, 100);
    } catch (error) {
      console.error('Map setup error:', error);
      document.getElementById('map').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Map failed to load. Please refresh.</div>';
    }
  }

  getMarkerStyle(feature) {
    const type = feature.get('type');
    const color = type === 'ICE' ? '#ff4444' : '#4444ff';
    
    return new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: `data:image/svg+xml,${encodeURIComponent(`
          <svg width="24" height="36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="${color}"/>
            <circle cx="12" cy="12" r="6" fill="white"/>
            <text x="12" y="16" text-anchor="middle" font-size="8" fill="${color}">${type}</text>
          </svg>
        `)}`
      })
    });
  }

  setupUI() {
    // This function is now deprecated.
    // The UI is defined in `public/index.html` and is no longer dynamically generated.
    // Event listeners and styles are now set up in the `init` function.
  }

  setupEventListeners() {
    document.getElementById('addBtn').onclick = () => this.toggleAddMode();
    document.getElementById('vizBtn').onclick = () => this.toggleSidebar();
    document.getElementById('closeSidebar').onclick = () => this.closeSidebar();
    document.getElementById('langSelect').onchange = (e) => this.changeLang(e.target.value);
    document.querySelector('.close').onclick = () => this.closeModal();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
      if (e.key === 'd' && e.ctrlKey) {
        e.preventDefault();
        this.toggleSidebar();
      }
    });
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; }
      body { 
        margin: 0; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #333;
      }
      
      #app { height: 100vh; display: flex; flex-direction: column; }
      
      #header {
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
      }
      
      .header-content {
        padding: 15px 20px;
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
      }
      
      .logo {
        font-size: 24px;
        font-weight: 700;
        margin: 0;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .stats-bar {
        display: flex;
        gap: 20px;
        flex: 1;
      }
      
      .stat-item {
        text-align: center;
        padding: 8px 16px;
        background: rgba(255,255,255,0.8);
        border-radius: 12px;
        min-width: 80px;
        transition: all 0.3s ease;
      }
      
      .stat-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }
      
      .stat-number {
        display: block;
        font-size: 24px;
        font-weight: 700;
        color: #2c3e50;
      }
      
      .stat-label {
        display: block;
        font-size: 12px;
        color: #7f8c8d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .controls {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      
      .primary-btn, .secondary-btn {
        padding: 12px 20px;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }
      
      .primary-btn {
        background: linear-gradient(45deg, #ff6b6b, #ee5a52);
        color: white;
        box-shadow: 0 4px 15px rgba(255,107,107,0.3);
      }
      
      .primary-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255,107,107,0.4);
      }
      
      .secondary-btn {
        background: rgba(255,255,255,0.9);
        color: #333;
        border: 1px solid rgba(0,0,0,0.1);
      }
      
      .secondary-btn:hover {
        background: white;
        transform: translateY(-1px);
      }
      
      .lang-select {
        padding: 8px 12px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 20px;
        background: rgba(255,255,255,0.9);
        font-size: 14px;
      }
      
      .privacy-notice {
        text-align: center;
        padding: 8px;
        font-size: 12px;
        color: #666;
        background: rgba(255,255,255,0.7);
      }
      
      #main {
        flex: 1;
        display: flex;
        position: relative;
      }
      
      #map-container {
        flex: 1;
        position: relative;
      }
      
      #map {
        width: 100%;
        height: 100%;
      }
      
      #map-overlay {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 100;
      }
      
      .legend {
        background: rgba(255,255,255,0.95);
        padding: 15px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        backdrop-filter: blur(10px);
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 14px;
      }
      
      .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
      
      .legend-color.ice { background: #ff4444; }
      .legend-color.pig { background: #4444ff; }
      
      .sidebar {
        width: 400px;
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
        border-left: 1px solid rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.4s ease;
        overflow-y: auto;
      }
      
      .sidebar.open {
        transform: translateX(0);
      }
      
      .sidebar-header {
        padding: 20px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .close-btn:hover {
        background: rgba(0,0,0,0.1);
        color: #333;
      }
      
      #chart-container {
        padding: 20px;
      }
      
      .chart {
        margin-bottom: 30px;
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      
      .modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(5px);
      }
      
      .modal-content {
        background: white;
        margin: 5% auto;
        padding: 30px;
        border-radius: 20px;
        width: 90%;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      
      .close {
        float: right;
        font-size: 28px;
        cursor: pointer;
        color: #aaa;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }
      
      .close:hover {
        background: rgba(0,0,0,0.1);
        color: #333;
      }
      
      input, textarea, select {
        width: 100%;
        padding: 12px 16px;
        margin: 8px 0;
        border: 2px solid #e1e8ed;
        border-radius: 12px;
        font-size: 14px;
        transition: all 0.3s ease;
      }
      
      input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
      }
      
      textarea {
        height: 100px;
        resize: vertical;
        font-family: inherit;
      }
      
      .comment {
        border-bottom: 1px solid #eee;
        padding: 15px 0;
        animation: fadeInUp 0.3s ease;
      }
      
      .comment:last-child { border-bottom: none; }
      
      .comment-author {
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 4px;
      }
      
      .comment-time {
        font-size: 12px;
        color: #95a5a6;
        margin-bottom: 8px;
      }
      
      .media-preview {
        max-width: 100%;
        margin: 10px 0;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }
      
      #toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
      }
      
      .toast {
        background: rgba(255,255,255,0.95);
        padding: 15px 20px;
        border-radius: 12px;
        margin-bottom: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        backdrop-filter: blur(10px);
        border-left: 4px solid #4ecdc4;
        animation: slideInRight 0.3s ease;
      }
      
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @media (max-width: 768px) {
        .header-content { flex-direction: column; gap: 15px; }
        .stats-bar { justify-content: center; }
        .sidebar { width: 100%; }
        .modal-content { margin: 10% auto; width: 95%; }
      }
    `;
    document.head.appendChild(style);
    
    // Add loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading PigMap...</div>
    `;
    loadingDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(102,126,234,0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: white;
      font-family: inherit;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
      .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255,255,255,0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      }
      .loading-text {
        font-size: 18px;
        font-weight: 600;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    
    document.head.appendChild(spinnerStyle);
    document.body.appendChild(loadingDiv);
  }

  async onMapClick(evt) {
    if (this.addMode) {
      const coords = ol.proj.toLonLat(evt.coordinate);
      this.showAddMarkerModal(coords);
    } else {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      if (feature) {
        this.showMarkerDetails(feature);
      }
    }
  }

  showAddMarkerModal(coords) {
    document.getElementById('modal-body').innerHTML = `
      <h3 style="margin-top: 0; color: #2c3e50;">${this.t('add_new_marker')}</h3>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #555;">Report Type</label>
        <select id="markerType" style="background: white;">
          <option value="ICE">🚨 ICE Activity</option>
          <option value="PIG">🐷 PIG Activity</option>
        </select>
      </div>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #555;">Title *</label>
        <input id="markerTitle" placeholder="Brief description of the incident" required>
      </div>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #555;">Details</label>
        <textarea id="markerDesc" placeholder="Additional details, time, description..."></textarea>
      </div>
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #555;">Media (Optional)</label>
        <input id="mediaUpload" type="file" accept="image/*,video/*" multiple>
        <small style="color: #666; font-size: 12px;">Images and videos are uploaded anonymously</small>
      </div>
      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button onclick="tracker.closeModal()" style="background: #95a5a6;">${this.t('cancel')}</button>
        <button onclick="tracker.saveMarker([${coords}])" class="primary-btn">${this.t('save')}</button>
      </div>
    `;
    
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    
    gsap.from('.modal-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  }

  async saveMarker(coords) {
    const type = document.getElementById('markerType').value;
    const title = document.getElementById('markerTitle').value;
    const desc = document.getElementById('markerDesc').value;
    const files = document.getElementById('mediaUpload').files;

    if (!title) {
      this.showToast('Please enter a title', 'error');
      return;
    }

    const marker = {
      id: Date.now().toString(),
      type,
      title,
      description: desc,
      coords,
      timestamp: new Date().toISOString(),
      magicCode: this.magicCode,
      media: []
    };

    // Show loading state
    const saveBtn = document.querySelector('#modal-body button');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
      if (files.length > 0) {
        saveBtn.textContent = 'Uploading media...';
        for (let file of files) {
          const mediaUrl = await this.uploadMedia(file, marker.id);
          if (mediaUrl) {
            marker.media.push(mediaUrl);
          }
        }
      }

      saveBtn.textContent = 'Saving...';
      await this.saveToCloudflare(marker);
      this.markers.push(marker);
      this.addMarkerToMap(marker);
      this.updateStats();
      this.updateCharts();
      this.closeModal();
      this.addMode = false;
      
      gsap.from(this.vectorSource.getFeatures().slice(-1)[0], {
        scale: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
      
      this.showToast(`Report added! ${marker.media.length > 0 ? `(${marker.media.length} files)` : ''}`);
    } catch (error) {
      console.error('Save error:', error);
      this.showToast('Failed to save report', 'error');
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  }

  async uploadMedia(file, markerId) {
    try {
      const response = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type
        })
      });
      
      if (!response.ok) {
        throw new Error(`Upload URL request failed: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      const uploadResponse = await fetch(data.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      });
      
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`);
      }
      
      return data.uploadUrl.split('?')[0];
    } catch (error) {
      console.error('Upload failed:', error);
      this.showToast(`Upload failed: ${error.message}`, 'error');
      return null;
    }
  }

  async saveToCloudflare(marker) {
    await fetch('/api/markers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(marker)
    });
  }

  addMarkerToMap(marker) {
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(marker.coords)),
      ...marker
    });
    this.vectorSource.addFeature(feature);
  }

  async loadMarkers() {
    try {
      const response = await fetch('/api/markers');
      const markers = await response.json();
      this.markers = markers;
      this.updateStats();
      markers.forEach(marker => this.addMarkerToMap(marker));
      this.updateCharts();
    } catch (error) {
      console.error('Failed to load markers:', error);
    }
  }

  showMarkerDetails(feature) {
    const data = feature.getProperties();
    const mediaHtml = data.media && data.media.length > 0 
      ? data.media.map(url => `<img src="${url}" class="media-preview" onerror="this.style.display='none'">`).join('')
      : '';
    
    document.getElementById('modal-body').innerHTML = `
      <h3>${data.title}</h3>
      <p><strong>Type:</strong> ${data.type}</p>
      <p><strong>Description:</strong> ${data.description || 'No description'}</p>
      <p><strong>Posted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      ${mediaHtml}
      <div id="comments"></div>
      <textarea id="newComment" placeholder="${this.t('add_comment')}"></textarea>
      <input id="commentAuthor" placeholder="${this.t('author')}">
      <button onclick="tracker.addComment('${data.id}')">${this.t('add_comment')}</button>
      ${this.canEdit(data) ? `
        <button onclick="tracker.deleteMarker('${data.id}')">${this.t('delete')}</button>
      ` : ''}
    `;
    this.loadComments(data.id);
    document.getElementById('modal').style.display = 'block';
  }

  canEdit(marker) {
    return marker.magicCode === this.magicCode || 
           localStorage.getItem(`edit_${marker.id}`) === 'true';
  }

  async addComment(markerId) {
    const text = document.getElementById('newComment').value;
    const author = document.getElementById('commentAuthor').value;
    
    if (!text) return;

    const comment = {
      id: Date.now().toString(),
      markerId,
      text,
      author: author || 'Anonymous',
      timestamp: new Date().toISOString()
    };

    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });

    this.loadComments(markerId);
    this.showToast('Comment added');
    document.getElementById('newComment').value = '';
    document.getElementById('commentAuthor').value = '';
  }

  async loadComments(markerId) {
    try {
      const response = await fetch(`/api/comments/${markerId}`);
      const comments = await response.json();
      
      document.getElementById('comments').innerHTML = comments.map(c => `
        <div class="comment">
          <div class="comment-author">${c.author}</div>
          <div class="comment-time">${new Date(c.timestamp).toLocaleString()}</div>
          <p>${c.text}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  }

  toggleAddMode() {
    this.addMode = !this.addMode;
    const btn = document.getElementById('addBtn');
    
    if (this.addMode) {
      btn.innerHTML = `<span class="btn-icon">✕</span> Done`;
      btn.style.background = 'linear-gradient(45deg, #95a5a6, #7f8c8d)';
      this.showToast(this.t('add_marker_instruction') || 'Click on the map to add a report');
    } else {
      btn.innerHTML = `<span class="btn-icon">+</span> ${this.t('add_new_marker')}`;
      btn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
    }
    
    gsap.to(btn, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
  }

  changeLang(lang) {
    this.currentLang = lang;
    // Don't reinitialize everything, just update UI text
    this.updateUIText();
  }

  closeModal() {
    document.getElementById('modal').style.display = 'none';
  }

  async deleteMarker(id) {
    if (!confirm(this.t('confirm_delete'))) return;
    
    await fetch(`/api/markers/${id}`, { method: 'DELETE' });
    
    const feature = this.vectorSource.getFeatures().find(f => f.get('id') === id);
    if (feature) this.vectorSource.removeFeature(feature);
    
    this.markers = this.markers.filter(m => m.id !== id);
    this.updateStats();
    this.updateCharts();
    this.showToast('Report deleted');
    this.closeModal();
  }
}

ICEPIGTracker.prototype.showLoadingIndicator = function() {
  const indicator = document.getElementById('loading-indicator');
  if (indicator) indicator.style.display = 'flex';
};

ICEPIGTracker.prototype.hideLoadingIndicator = function() {
  const indicator = document.getElementById('loading-indicator');
  if (indicator) {
    indicator.remove();
  }
};

ICEPIGTracker.prototype.updateUIText = function() {
  const addBtn = document.getElementById('addBtn');
  if (addBtn && !this.addMode) {
    addBtn.innerHTML = `<span class="btn-icon">+</span> ${this.t('add_new_marker')}`;
  }
  
  // Update other UI elements
  const elements = {
    '.stat-label': ['Total Reports', 'ICE', 'PIG', 'Today'],
    '.legend-item span': ['ICE Activity', 'PIG Activity']
  };
  
  Object.keys(elements).forEach(selector => {
    const nodeList = document.querySelectorAll(selector);
    elements[selector].forEach((text, index) => {
      if (nodeList[index]) {
        nodeList[index].textContent = text;
      }
    });
  });
};

// The tracker is initialized in data-viz.js to ensure all scripts are loaded.