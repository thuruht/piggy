import { createLayerControl } from "./map-layers.js";

export class ICEPIGTracker {
  constructor() {
    this.translations = {};
    this.currentLang = "en";
    this.magicCode = this.generateMagicCode();
    this.vectorSource = new ol.source.Vector();
    this.markers = [];
    this.stats = { ice: 0, pig: 0, total: 0, today: 0 };
    this.displayedMarkerIds = new Set();
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.deferredPrompt = null;
    // this.init(); // Initialization is now triggered in data-viz.js
  }

  generateMagicCode() {
    return Math.random().toString(36).substring(2, 15);
  }

  async init() {
    this.showLoadingIndicator();
    try {
      await this.loadTranslations();
      this.setupEventListeners();
      this.updateUIText();
      this.setupMap();
      await this.loadMarkers();
      this.animateEntrance();
      this.startAutoRefresh();
      this.setupRefreshButton();
      this.connectWebSocket();
      this.setupInstallPrompt();
    } catch (error) {
      console.error("Init error:", error);
      this.showToast("Failed to load application", "error");
    } finally {
      this.hideLoadingIndicator();
    }
  }

  async loadTranslations() {
    const response = await fetch("./pmaptranslate.json");
    this.translations = await response.json();
  }

  t(key) {
    return this.translations[this.currentLang]?.[key] || key;
  }

  setupMap() {
    const kcCenter = ol.proj.fromLonLat([-94.5786, 39.0997]);

    try {
      this.map = new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
          new ol.layer.Vector({
            source: this.vectorSource,
            style: this.getMarkerStyle.bind(this),
          }),
        ],
        view: new ol.View({
          center: kcCenter,
          zoom: window.innerWidth < 768 ? 10 : 11,
        }),
      });

      this.map.on("click", this.onMapClick.bind(this));

      // Force map resize on mobile
      setTimeout(() => {
        if (this.map) {
          this.map.updateSize();
        }
      }, 100);
      createLayerControl(this.map);
    } catch (error) {
      console.error("Map setup error:", error);
      document.getElementById("map").innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Map failed to load. Please refresh.</div>';
    }
  }

  getMarkerStyle(feature) {
    const type = feature.get("type");
    const color = type === "ICE" ? "#ff4444" : "#4444ff";

    return new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: `data:image/svg+xml,${encodeURIComponent(`
          <svg width="24" height="36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="${color}"/>
            <circle cx="12" cy="12" r="6" fill="white"/>
            <text x="12" y="16" text-anchor="middle" font-size="8" fill="${color}">${type}</text>
          </svg>
        `)}`,
      }),
    });
  }

  setupEventListeners() {
    document.getElementById("addBtn").onclick = () => this.toggleAddMode();
    document.getElementById("vizBtn").onclick = () => this.toggleSidebar();
    document.getElementById("closeSidebar").onclick = () => this.closeSidebar();
    document.getElementById("langSelect").onchange = (e) =>
      this.changeLang(e.target.value);
    document.querySelector(".close").onclick = () => this.closeModal();
    document
      .getElementById("searchBtn")
      .addEventListener("click", () => this.searchLocation());
    document.getElementById("searchInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.searchLocation();
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
      if (e.key === "d" && e.ctrlKey) {
        e.preventDefault();
        this.toggleSidebar();
      }
    });
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
    document.getElementById("modal-body").innerHTML = `
      <h3 style="margin-top: 0; color: #2c3e50;">${this.t(
        "add_new_marker"
      )}</h3>
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
        <button onclick="tracker.closeModal()" style="background: #95a5a6;">${this.t(
          "cancel"
        )}</button>
        <button onclick="tracker.saveMarker([${coords}])" class="primary-btn">${this.t(
      "save"
    )}</button>
      </div>
    `;

    const modal = document.getElementById("modal");
    modal.style.display = "block";

    gsap.from(".modal-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }

  async saveMarker(coords) {
    const type = document.getElementById("markerType").value;
    const title = document.getElementById("markerTitle").value;
    const desc = document.getElementById("markerDesc").value;
    const files = document.getElementById("mediaUpload").files;

    if (!title) {
      this.showToast("Please enter a title", "error");
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
      media: [],
    };

    const saveBtn = document.querySelector(".modal-content .primary-btn");
    const originalText = saveBtn.textContent;
    saveBtn.textContent = "Saving...";
    saveBtn.disabled = true;

    try {
      let successfulUploads = [];
      let failedUploads = 0;

      if (files.length > 0) {
        saveBtn.textContent = `Uploading ${files.length} file(s)...`;

        const uploadPromises = Array.from(files).map((file) =>
          this.uploadMedia(file, marker.id)
        );
        const results = await Promise.allSettled(uploadPromises);

        results.forEach((result) => {
          if (result.status === "fulfilled" && result.value) {
            successfulUploads.push(result.value);
          } else {
            failedUploads++;
          }
        });

        marker.media = successfulUploads;
      }

      saveBtn.textContent = "Saving report...";
      await this.saveToCloudflare(marker);

      this.markers.push(marker);
      this.addMarkerToMap(marker);
      this.updateStats();
      this.updateCharts();
      this.closeModal();
      this.addMode = false;

      let successMessage = "Report saved successfully!";
      if (failedUploads > 0) {
        successMessage += ` (${failedUploads} media file(s) failed to upload.)`;
        this.showToast(successMessage, "error"); // Show as a warning/error
      } else {
        this.showToast(successMessage, "success");
      }
    } catch (error) {
      console.error("Save marker critical error:", error);
      this.showToast("Failed to save the report. Please try again.", "error");
    } finally {
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  }

  async uploadMedia(file, markerId) {
    try {
      const response = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error(`Upload URL request failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const uploadResponse = await fetch(data.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`);
      }

      return data.publicUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      this.showToast(`Upload failed: ${error.message}`, "error");
      return null;
    }
  }

  async saveToCloudflare(marker) {
    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
      const response = await fetch("/api/markers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(marker),
      });

      if (response.ok) {
        return response.json();
      }

      if (response.status === 429) {
        console.warn("Rate limited. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
        retries--;
      } else {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || "Failed to save marker");
      }
    }

    throw new Error("Rate limit exceeded. Try again later.");
  }

  addMarkerToMap(marker) {
    if (this.displayedMarkerIds.has(marker.id)) {
      console.log(`Marker ${marker.id} already displayed, skipping`);
      return null;
    }

    let lng = ((marker.coords[1] + 180) % 360) - 180;

    if (isNaN(marker.coords[0]) || isNaN(lng)) {
      console.error("Invalid coordinates for marker:", marker);
      return null;
    }

    const color = this.getMarkerColor(marker);
    const style = this.createMarkerStyle(color);

    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, marker.coords[0]])),
      ...marker,
    });

    feature.setStyle(style);
    this.vectorSource.addFeature(feature);
    this.displayedMarkerIds.add(marker.id);

    // Add pulse animation for new markers
    setTimeout(() => {
      const pixel = this.map.getPixelFromCoordinate(
        ol.proj.fromLonLat([lng, marker.coords[0]])
      );
      if (pixel) {
        this.animateMarkerPulse(pixel);
      }
    }, 100);

    return feature;
  }

  animateMarkerPulse(pixel) {
    const pulseEl = document.createElement("div");
    pulseEl.className = "marker-pulse";
    pulseEl.style.left = pixel[0] + "px";
    pulseEl.style.top = pixel[1] + "px";
    document.body.appendChild(pulseEl);

    setTimeout(() => pulseEl.remove(), 2000);
  }

  getMarkerColor(marker) {
    const baseColor = marker.type === "ICE" ? "red" : "blue";
    const age = Date.now() - new Date(marker.timestamp).getTime();
    const dayInMs = 24 * 60 * 60 * 1000;

    if (age < dayInMs) return `${baseColor}-bright`;
    if (age < 7 * dayInMs) return baseColor;
    return `${baseColor}-faded`;
  }

  createMarkerStyle(color) {
    const colors = {
      "red-bright": "#ff0000",
      red: "#cc0000",
      "red-faded": "#880000",
      "blue-bright": "#0000ff",
      blue: "#0000cc",
      "blue-faded": "#000088",
    };

    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({ color: colors[color] || "#ff0000" }),
        stroke: new ol.style.Stroke({ color: "#fff", width: 2 }),
      }),
    });
  }

  async refreshMarkers() {
    try {
      const response = await fetch("/api/markers");
      const markers = await response.json();

      let newCount = 0;
      markers.forEach((marker) => {
        if (!this.displayedMarkerIds.has(marker.id)) {
          this.addMarkerToMap(marker);
          newCount++;
        }
      });

      if (newCount > 0) {
        this.showToast(`Added ${newCount} new marker(s)`, "success");
      } else {
        this.showToast("Map is up to date", "success");
      }
    } catch (error) {
      console.error("Refresh error:", error);
      this.showToast("Failed to refresh markers", "error");
    }
  }

  startAutoRefresh() {
    setInterval(() => this.refreshMarkers(), 60000);
  }

  setupRefreshButton() {
    const refreshBtn = document.createElement("button");
    refreshBtn.id = "refresh-btn";
    refreshBtn.className = "secondary-btn";
    refreshBtn.innerHTML = "↻";
    refreshBtn.title = "Refresh Map";
    refreshBtn.addEventListener("click", () => {
      refreshBtn.innerHTML = "...";
      this.refreshMarkers().finally(() => {
        refreshBtn.innerHTML = "↻";
      });
    });

    document.querySelector(".controls").appendChild(refreshBtn);
  }

  async loadMarkers() {
    try {
      const response = await fetch("/api/markers");
      const markers = await response.json();
      this.markers = markers;
      this.updateStats();
      markers.forEach((marker) => this.addMarkerToMap(marker));
      this.updateCharts();
    } catch (error) {
      console.error("Failed to load markers:", error);
    }
  }

  showMarkerDetails(feature) {
    const data = feature.getProperties();
    const mediaHtml =
      data.media && data.media.length > 0
        ? data.media
            .map(
              (url) =>
                `<img src="${url}" class="media-preview" onerror="this.style.display='none'">`
            )
            .join("")
        : "";

    // Check session storage for upvote/report status
    const upvoteKey = `upvoted_${data.id}`;
    const reportKey = `reported_${data.id}`;
    const alreadyUpvoted = sessionStorage.getItem(upvoteKey);
    const alreadyReported = sessionStorage.getItem(reportKey);

    document.getElementById("modal-body").innerHTML = `
  <h3>${data.title}</h3>
  <div class="modal-meta">
    <span><strong>Type:</strong> ${data.type}</span>
    <span><strong>Posted:</strong> ${new Date(
      data.timestamp
    ).toLocaleString()}</span>
  </div>
  <p>${data.description || "No description"}</p>
  ${mediaHtml}
  
  <div class="modal-actions">
    <button id="report-btn" onclick="tracker.reportMarker('${data.id}')" ${
      alreadyReported ? "disabled" : ""
    }>
      ${alreadyReported ? "✓ Reported" : "⚠ Report"}
    </button>
    <button id="upvote-btn" onclick="tracker.upvoteMarker('${data.id}')" ${
      alreadyUpvoted ? "disabled" : ""
    }>
      👍 ${
        alreadyUpvoted ? this.t("upvoted") : this.t("upvote")
      } (<span id="upvote-count">${data.upvotes || 0}</span>)
    </button>
  </div>

  <div id="comments"><h4>${this.t("comments")}</h4></div>
  <textarea id="newComment" placeholder="${this.t("add_comment")}"></textarea>
  <input id="commentAuthor" placeholder="${this.t("author")}">
  <button onclick="tracker.addComment('${data.id}')">${this.t(
      "add_comment"
    )}</button>
  
  ${
    this.canEdit(data)
      ? `
    <div class="admin-actions">
      <button onclick="tracker.deleteMarker('${data.id}')">${this.t(
          "delete"
        )}</button>
    </div>
  `
      : ""
  }
`;
    this.loadComments(data.id);
    document.getElementById("modal").style.display = "block";
  }

  async upvoteMarker(markerId) {
    const upvoteBtn = document.getElementById("upvote-btn");
    if (!upvoteBtn || upvoteBtn.disabled) return;

    try {
      const response = await fetch(`/api/upvotes/${markerId}`, {
        method: "POST",
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Upvote failed");
      }

      const data = await response.json();
      sessionStorage.setItem(`upvoted_${markerId}`, "true");

      upvoteBtn.disabled = true;
      upvoteBtn.innerHTML = `👍 ${this.t("upvoted")} (<span id="upvote-count">${
        data.upvotes
      }</span>)`;

      this.showToast("Upvoted!", "success");
    } catch (error) {
      console.error("Upvote error:", error);
      this.showToast(error.message, "error");
    }
  }

  async reportMarker(markerId) {
    if (
      !confirm(
        this.t("confirm_report") || "Are you sure you want to report this?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/markers/${markerId}/report`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Report failed");
      }

      sessionStorage.setItem(`reported_${markerId}`, "true");

      const reportBtn = document.getElementById("report-btn");
      if (reportBtn) {
        reportBtn.disabled = true;
        reportBtn.textContent = "✓ Reported";
      }

      this.showToast("Report submitted. Thank you.", "success");
    } catch (error) {
      console.error("Report error:", error);
      this.showToast("Failed to submit report", "error");
    }
  }

  connectWebSocket() {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
        this.showToast("Connected to live updates", "success");
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleWebSocketMessage(data);
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.reconnectWebSocket();
      };
    } catch (error) {
      console.error("Failed to establish WebSocket:", error);
    }
  }

  reconnectWebSocket() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      this.reconnectAttempts++;

      console.log(
        `Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`
      );
      setTimeout(() => this.connectWebSocket(), delay);
    } else {
      this.showToast(
        "Live updates disconnected. Refresh page to reconnect.",
        "error"
      );
    }
  }

  handleWebSocketMessage(data) {
    console.log("WebSocket message:", data);

    switch (data.type) {
      case "welcome":
        console.log(`Connected. ${data.activeUsers} active users`);
        this.updateActiveUsers(data.activeUsers);
        break;

      case "marker_added":
        if (!this.displayedMarkerIds.has(data.marker.id)) {
          this.addMarkerToMap(data.marker);
          this.showToast("New report added", "info");
          this.triggerHaptic(20);
        }
        break;

      case "active_users":
        this.updateActiveUsers(data.count);
        break;

      default:
        console.log("Unknown message type:", data.type);
    }
  }

  updateActiveUsers(count) {
    let userIndicator = document.getElementById("active-users");
    if (!userIndicator) {
      userIndicator = document.createElement("div");
      userIndicator.id = "active-users";
      userIndicator.className = "active-users-indicator";
      document.querySelector(".controls").appendChild(userIndicator);
    }
    userIndicator.textContent = `👥 ${count} online`;
  }

  sendUserLocation() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const center = this.map.getView().getCenter();
      const lonLat = ol.proj.toLonLat(center);

      this.ws.send(
        JSON.stringify({
          type: "user_location",
          location: {
            lat: lonLat[1],
            lng: lonLat[0],
          },
        })
      );
    }
  }

  canEdit(marker) {
    return (
      marker.magicCode === this.magicCode ||
      localStorage.getItem(`edit_${marker.id}`) === "true"
    );
  }

  async addComment(markerId) {
    const text = document.getElementById("newComment").value;
    const author = document.getElementById("commentAuthor").value;

    if (!text) return;

    const comment = {
      markerId,
      text,
      author: author || "Anonymous",
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error("Failed to save comment");
      }

      this.loadComments(markerId);
      this.showToast("Comment added");
      document.getElementById("newComment").value = "";
      document.getElementById("commentAuthor").value = "";
    } catch (error) {
      console.error("Comment error:", error);
      this.showToast("Failed to add comment", "error");
    }
  }

  async loadComments(markerId) {
    try {
      const response = await fetch(`/api/comments/${markerId}`);
      const comments = await response.json();

      document.getElementById("comments").innerHTML = comments
        .map(
          (c) => `
        <div class="comment">
          <div class="comment-author">${c.author}</div>
          <div class="comment-time">${new Date(
            c.timestamp
          ).toLocaleString()}</div>
          <p>${c.text}</p>
        </div>
      `
        )
        .join("");
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  }

  toggleAddMode() {
    this.addMode = !this.addMode;
    const btn = document.getElementById("addBtn");

    if (this.addMode) {
      btn.innerHTML = `<span class="btn-icon">✕</span> Done`;
      btn.style.background = "linear-gradient(45deg, #95a5a6, #7f8c8d)";
      this.showToast(
        this.t("add_marker_instruction") || "Click on the map to add a report"
      );
    } else {
      btn.innerHTML = `<span class="btn-icon">+</span> ${this.t(
        "add_new_marker"
      )}`;
      btn.style.background = "linear-gradient(45deg, #ff6b6b, #ee5a52)";
    }

    gsap.to(btn, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
  }

  changeLang(lang) {
    this.currentLang = lang;
    // Don't reinitialize everything, just update UI text
    this.updateUIText();
  }

  closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  triggerHaptic(pattern = 20) {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }

  playSound(type) {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === "success") {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === "error") {
        oscillator.frequency.value = 300;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.2
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      }
    } catch (error) {
      console.log("Audio not supported");
    }
  }

  showToast(message, type = "info") {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(0)";
    }, 10);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 500);
    }, 3000);

    if (type === "success") {
      this.triggerHaptic(20);
      this.playSound("success");
    } else if (type === "error") {
      this.triggerHaptic([50, 50, 50]);
      this.playSound("error");
    }
  }

  async deleteMarker(id) {
    if (!confirm(this.t("confirm_delete"))) return;

    try {
      const response = await fetch(`/api/markers/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete marker");
      }

      const feature = this.vectorSource
        .getFeatures()
        .find((f) => f.get("id") === id);
      if (feature) this.vectorSource.removeFeature(feature);

      this.markers = this.markers.filter((m) => m.id !== id);
      this.updateStats();
      this.updateCharts();
      this.showToast("Report deleted");
      this.closeModal();
    } catch (error) {
      console.error("Delete error:", error);
      this.showToast("Failed to delete report", "error");
    }
  }

  setupInstallPrompt() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    window.addEventListener("appinstalled", () => {
      console.log("PWA installed");
      this.deferredPrompt = null;
      this.hideInstallButton();
      this.showToast("App installed! Open from your home screen.", "success");
    });
  }

  showInstallButton() {
    const installBtn = document.createElement("button");
    installBtn.id = "install-btn";
    installBtn.className = "secondary-btn";
    installBtn.innerHTML = "📱 Install App";
    installBtn.addEventListener("click", () => this.promptInstall());

    document.querySelector(".controls").appendChild(installBtn);
  }

  hideInstallButton() {
    const installBtn = document.getElementById("install-btn");
    if (installBtn) {
      installBtn.remove();
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    console.log(`Install prompt outcome: ${outcome}`);
    this.deferredPrompt = null;
    this.hideInstallButton();
  }

  async searchLocation() {
    const query = document.getElementById("searchInput").value;
    if (!query) {
      this.showToast("Please enter a location to search.", "error");
      return;
    }

    this.showToast(`Searching for "${query}"...`, "info");
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const results = await response.json();

      if (results.length > 0) {
        const { lat, lon } = results[0];
        this.showToast(`Location found. Moving map...`, "success");
        this.panToLocation([parseFloat(lon), parseFloat(lat)]);
      } else {
        this.showToast(`Could not find "${query}".`, "error");
      }
    } catch (error) {
      console.error("Nominatim search error:", error);
      this.showToast("Failed to perform search.", "error");
    }
  }

  panToLocation(lonLat) {
    if (!this.map) return;

    this.map.getView().animate({
      center: ol.proj.fromLonLat(lonLat),
      zoom: 14,
      duration: 1500,
      easing: ol.easing.easeOut,
    });
  }
}

ICEPIGTracker.prototype.showLoadingIndicator = function () {
  const indicator = document.getElementById("loading-indicator");
  if (indicator) indicator.style.display = "flex";
};

ICEPIGTracker.prototype.hideLoadingIndicator = function () {
  const indicator = document.getElementById("loading-indicator");
  if (indicator) {
    indicator.remove();
  }
};

ICEPIGTracker.prototype.updateUIText = function () {
  document.querySelectorAll("[data-translate-key]").forEach((el) => {
    const key = el.dataset.translateKey;
    const translation = this.t(key);

    // Handle elements where the entire content is the translation
    if (el.children.length === 0 || el.tagName === "TITLE") {
      el.textContent = translation;
      return;
    }

    // Handle buttons with icons or other complex elements
    for (const node of el.childNodes) {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim().length > 0
      ) {
        node.textContent = ` ${translation}`;
        break;
      }
    }
  });
};

// The tracker is initialized in data-viz.js to ensure all scripts are loaded.
