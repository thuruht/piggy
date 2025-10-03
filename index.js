class ICEPIGTracker {
  constructor() {
    this.translations = {};
    this.currentLang = 'en';
    this.magicCode = this.generateMagicCode();
    this.vectorSource = new ol.source.Vector();
    this.init();
  }

  generateMagicCode() {
    return Math.random().toString(36).substring(2, 15);
  }

  async init() {
    await this.loadTranslations();
    this.setupUI();
    this.setupMap();
    this.loadMarkers();
  }

  async loadTranslations() {
    const response = await fetch('./pmaptranslate.json');
    this.translations = await response.json();
  }

  t(key) {
    return this.translations[this.currentLang]?.[key] || key;
  }

  setupMap() {
    // Kansas City coordinates
    const kcCenter = ol.proj.fromLonLat([-94.5786, 39.0997]);
    
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
        zoom: 11
      })
    });

    this.map.on('click', this.onMapClick.bind(this));
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
    document.body.innerHTML = `
      <div id="app">
        <div id="controls">
          <button id="addBtn">${this.t('add_new_marker')}</button>
          <select id="langSelect">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="zh">中文</option>
          </select>
        </div>
        <div id="map"></div>
        <div id="popup" class="popup">
          <div id="popup-content"></div>
        </div>
        <div id="modal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <div id="modal-body"></div>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.addStyles();
  }

  setupEventListeners() {
    document.getElementById('addBtn').onclick = () => this.toggleAddMode();
    document.getElementById('langSelect').onchange = (e) => this.changeLang(e.target.value);
    document.querySelector('.close').onclick = () => this.closeModal();
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #app { height: 100vh; display: flex; flex-direction: column; }
      #controls { padding: 10px; background: #f0f0f0; }
      #map { flex: 1; }
      .popup { background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
      .modal { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); }
      .modal-content { background: white; margin: 15% auto; padding: 20px; border-radius: 8px; width: 80%; max-width: 500px; }
      .close { float: right; font-size: 28px; cursor: pointer; }
      button { padding: 8px 16px; margin: 5px; border: none; border-radius: 4px; background: #007cba; color: white; cursor: pointer; }
      input, textarea, select { width: 100%; padding: 8px; margin: 5px 0; border: 1px solid #ddd; border-radius: 4px; }
    `;
    document.head.appendChild(style);
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
      <h3>${this.t('add_new_marker')}</h3>
      <select id="markerType">
        <option value="ICE">ICE</option>
        <option value="PIG">PIG</option>
      </select>
      <input id="markerTitle" placeholder="Title" required>
      <textarea id="markerDesc" placeholder="Description"></textarea>
      <input id="mediaUpload" type="file" accept="image/*,video/*" multiple>
      <button onclick="tracker.saveMarker([${coords}])">${this.t('save')}</button>
      <button onclick="tracker.closeModal()">${this.t('cancel')}</button>
    `;
    document.getElementById('modal').style.display = 'block';
  }

  async saveMarker(coords) {
    const type = document.getElementById('markerType').value;
    const title = document.getElementById('markerTitle').value;
    const desc = document.getElementById('markerDesc').value;
    const files = document.getElementById('mediaUpload').files;

    if (!title) return;

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

    // Upload media files
    for (let file of files) {
      const mediaUrl = await this.uploadMedia(file, marker.id);
      if (mediaUrl) marker.media.push(mediaUrl);
    }

    await this.saveToCloudflare(marker);
    this.addMarkerToMap(marker);
    this.closeModal();
    this.addMode = false;
  }

  async uploadMedia(file, markerId) {
    try {
      const response = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: `${markerId}/${file.name}`,
          contentType: file.type
        })
      });
      
      const { uploadUrl } = await response.json();
      
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      });
      
      return uploadUrl.split('?')[0];
    } catch (error) {
      console.error('Upload failed:', error);
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
      markers.forEach(marker => this.addMarkerToMap(marker));
    } catch (error) {
      console.error('Failed to load markers:', error);
    }
  }

  showMarkerDetails(feature) {
    const data = feature.getProperties();
    document.getElementById('modal-body').innerHTML = `
      <h3>${data.title}</h3>
      <p><strong>Type:</strong> ${data.type}</p>
      <p><strong>Description:</strong> ${data.description}</p>
      <p><strong>Posted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      ${data.media.map(url => `<img src="${url}" style="max-width:100%;margin:5px 0;">`).join('')}
      <div id="comments"></div>
      <textarea id="newComment" placeholder="${this.t('add_comment')}"></textarea>
      <input id="commentAuthor" placeholder="${this.t('author')}">
      <button onclick="tracker.addComment('${data.id}')">${this.t('add_comment')}</button>
      ${this.canEdit(data) ? `
        <button onclick="tracker.editMarker('${data.id}')">${this.t('edit')}</button>
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
    document.getElementById('newComment').value = '';
    document.getElementById('commentAuthor').value = '';
  }

  async loadComments(markerId) {
    try {
      const response = await fetch(`/api/comments/${markerId}`);
      const comments = await response.json();
      
      document.getElementById('comments').innerHTML = comments.map(c => `
        <div style="border-bottom:1px solid #eee;padding:10px 0;">
          <strong>${c.author}</strong> - ${new Date(c.timestamp).toLocaleString()}
          <p>${c.text}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  }

  toggleAddMode() {
    this.addMode = !this.addMode;
    document.getElementById('addBtn').textContent = 
      this.addMode ? this.t('cancel') : this.t('add_new_marker');
  }

  changeLang(lang) {
    this.currentLang = lang;
    this.setupUI();
    this.setupMap();
    this.loadMarkers();
  }

  closeModal() {
    document.getElementById('modal').style.display = 'none';
  }

  async deleteMarker(id) {
    if (!confirm(this.t('confirm_delete'))) return;
    
    await fetch(`/api/markers/${id}`, { method: 'DELETE' });
    
    const feature = this.vectorSource.getFeatures().find(f => f.get('id') === id);
    if (feature) this.vectorSource.removeFeature(feature);
    
    this.closeModal();
  }
}

// Initialize the tracker
window.tracker = new ICEPIGTracker();