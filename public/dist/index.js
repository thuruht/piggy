import{a as u}from"./chunk-QXHY36KT.js";var l=class{constructor(){this.translations={},this.currentLang="en",this.magicCode=this.generateMagicCode(),this.vectorSource=new ol.source.Vector,this.markers=[],this.stats={ice:0,pig:0,total:0,today:0},this.displayedMarkerIds=new Set,this.ws=null,this.reconnectAttempts=0,this.maxReconnectAttempts=5,this.deferredPrompt=null}generateMagicCode(){return Math.random().toString(36).substring(2,15)}async init(){this.addStyles(),this.showLoadingIndicator();try{await this.loadTranslations(),this.setupEventListeners(),this.updateUIText(),this.setupMap(),this.setupDataViz(),await this.loadMarkers(),this.animateEntrance(),this.startAutoRefresh(),this.setupRefreshButton(),this.connectWebSocket(),this.setupInstallPrompt()}catch(e){console.error("Init error:",e),this.showToast("Failed to load application","error")}finally{this.hideLoadingIndicator()}}async loadTranslations(){let e=await fetch("./pmaptranslate.json");this.translations=await e.json()}t(e){return this.translations[this.currentLang]?.[e]||e}setupMap(){let e=ol.proj.fromLonLat([-94.5786,39.0997]);try{this.map=new ol.Map({target:"map",layers:[new ol.layer.Tile({source:new ol.source.OSM}),new ol.layer.Vector({source:this.vectorSource,style:this.getMarkerStyle.bind(this)})],view:new ol.View({center:e,zoom:window.innerWidth<768?10:11})}),this.map.on("click",this.onMapClick.bind(this)),setTimeout(()=>{this.map&&this.map.updateSize()},100),u(this.map)}catch(t){console.error("Map setup error:",t),document.getElementById("map").innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Map failed to load. Please refresh.</div>'}}getMarkerStyle(e){let t=e.get("type"),o=t==="ICE"?"#ff4444":"#4444ff";return new ol.style.Style({image:new ol.style.Icon({anchor:[.5,1],src:`data:image/svg+xml,${encodeURIComponent(`
          <svg width="24" height="36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="${o}"/>
            <circle cx="12" cy="12" r="6" fill="white"/>
            <text x="12" y="16" text-anchor="middle" font-size="8" fill="${o}">${t}</text>
          </svg>
        `)}`})})}setupEventListeners(){document.getElementById("addBtn").onclick=()=>this.toggleAddMode(),document.getElementById("vizBtn").onclick=()=>this.toggleSidebar(),document.getElementById("closeSidebar").onclick=()=>this.closeSidebar(),document.getElementById("langSelect").onchange=e=>this.changeLang(e.target.value),document.querySelector(".close").onclick=()=>this.closeModal(),document.getElementById("searchBtn").addEventListener("click",()=>this.searchLocation()),document.getElementById("searchInput").addEventListener("keypress",e=>{e.key==="Enter"&&this.searchLocation()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.closeModal(),e.key==="d"&&e.ctrlKey&&(e.preventDefault(),this.toggleSidebar())})}addStyles(){let e=document.createElement("style");e.textContent=`
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

      .marker-pulse {
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.3);
        border: 2px solid #0f0;
        transform: translate(-50%, -50%);
        animation: pulse 2s ease-out;
        pointer-events: none;
        z-index: 999;
      }

      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(3);
          opacity: 0;
        }
      }
    `,document.head.appendChild(e);let t=document.createElement("div");t.id="loading-indicator",t.innerHTML=`
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading PigMap...</div>
    `,t.style.cssText=`
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
    `;let o=document.createElement("style");o.textContent=`
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
    `,document.head.appendChild(o),document.body.appendChild(t)}async onMapClick(e){if(this.addMode){let t=ol.proj.toLonLat(e.coordinate);this.showAddMarkerModal(t)}else{let t=this.map.forEachFeatureAtPixel(e.pixel,o=>o);t&&this.showMarkerDetails(t)}}showAddMarkerModal(e){document.getElementById("modal-body").innerHTML=`
      <h3 style="margin-top: 0; color: #2c3e50;">${this.t("add_new_marker")}</h3>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #555;">Report Type</label>
        <select id="markerType" style="background: white;">
          <option value="ICE">\u{1F6A8} ICE Activity</option>
          <option value="PIG">\u{1F437} PIG Activity</option>
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
        <button onclick="tracker.closeModal()" style="background: #95a5a6;">${this.t("cancel")}</button>
        <button onclick="tracker.saveMarker([${e}])" class="primary-btn">${this.t("save")}</button>
      </div>
    `;let t=document.getElementById("modal");t.style.display="block",gsap.from(".modal-content",{scale:.8,opacity:0,duration:.3,ease:"back.out(1.7)"})}async saveMarker(e){let t=document.getElementById("markerType").value,o=document.getElementById("markerTitle").value,r=document.getElementById("markerDesc").value,a=document.getElementById("mediaUpload").files;if(!o){this.showToast("Please enter a title","error");return}let n={id:Date.now().toString(),type:t,title:o,description:r,coords:e,timestamp:new Date().toISOString(),magicCode:this.magicCode,media:[]},i=document.querySelector(".modal-content .primary-btn"),p=i.textContent;i.textContent="Saving...",i.disabled=!0;try{let c=[],m=0;if(a.length>0){i.textContent=`Uploading ${a.length} file(s)...`;let g=Array.from(a).map(d=>this.uploadMedia(d,n.id));(await Promise.allSettled(g)).forEach(d=>{d.status==="fulfilled"&&d.value?c.push(d.value):m++}),n.media=c}i.textContent="Saving report...",await this.saveToCloudflare(n),this.markers.push(n),this.addMarkerToMap(n),this.updateStats(),this.updateCharts(),this.closeModal(),this.addMode=!1;let h="Report saved successfully!";m>0?(h+=` (${m} media file(s) failed to upload.)`,this.showToast(h,"error")):this.showToast(h,"success")}catch(c){console.error("Save marker critical error:",c),this.showToast("Failed to save the report. Please try again.","error")}finally{i.textContent=p,i.disabled=!1}}async uploadMedia(e,t){try{let o=await fetch("/api/upload-url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:e.name,contentType:e.type})});if(!o.ok)throw new Error(`Upload URL request failed: ${o.status}`);let r=await o.json();if(r.error)throw new Error(r.error);let a=await fetch(r.uploadUrl,{method:"PUT",body:e,headers:{"Content-Type":e.type}});if(!a.ok)throw new Error(`Upload failed: ${a.status}`);return r.publicUrl||r.uploadUrl.split("?")[0]}catch(o){return console.error("Upload failed:",o),this.showToast(`Upload failed: ${o.message}`,"error"),null}}async saveToCloudflare(e){let t=await fetch("/api/markers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){let o=await t.json().catch(()=>({error:"Unknown error"}));throw new Error(o.error||"Failed to save marker")}return t.json()}addMarkerToMap(e){if(this.displayedMarkerIds.has(e.id))return console.log(`Marker ${e.id} already displayed, skipping`),null;let t=(e.coords[1]+180)%360-180;if(isNaN(e.coords[0])||isNaN(t))return console.error("Invalid coordinates for marker:",e),null;let o=this.getMarkerColor(e),r=this.createMarkerStyle(o),a=new ol.Feature({geometry:new ol.geom.Point(ol.proj.fromLonLat([t,e.coords[0]])),...e});return a.setStyle(r),this.vectorSource.addFeature(a),this.displayedMarkerIds.add(e.id),setTimeout(()=>{let n=this.map.getPixelFromCoordinate(ol.proj.fromLonLat([t,e.coords[0]]));n&&this.animateMarkerPulse(n)},100),a}animateMarkerPulse(e){let t=document.createElement("div");t.className="marker-pulse",t.style.left=e[0]+"px",t.style.top=e[1]+"px",document.body.appendChild(t),setTimeout(()=>t.remove(),2e3)}getMarkerColor(e){let t=e.type==="ICE"?"red":"blue",o=Date.now()-new Date(e.timestamp).getTime(),r=24*60*60*1e3;return o<r?`${t}-bright`:o<7*r?t:`${t}-faded`}createMarkerStyle(e){let t={"red-bright":"#ff0000",red:"#cc0000","red-faded":"#880000","blue-bright":"#0000ff",blue:"#0000cc","blue-faded":"#000088"};return new ol.style.Style({image:new ol.style.Circle({radius:8,fill:new ol.style.Fill({color:t[e]||"#ff0000"}),stroke:new ol.style.Stroke({color:"#fff",width:2})})})}async refreshMarkers(){try{let t=await(await fetch("/api/markers")).json(),o=0;t.forEach(r=>{this.displayedMarkerIds.has(r.id)||(this.addMarkerToMap(r),o++)}),o>0?this.showToast(`Added ${o} new marker(s)`,"success"):this.showToast("Map is up to date","success")}catch(e){console.error("Refresh error:",e),this.showToast("Failed to refresh markers","error")}}startAutoRefresh(){setInterval(()=>this.refreshMarkers(),6e4)}setupRefreshButton(){let e=document.createElement("button");e.id="refresh-btn",e.className="secondary-btn",e.innerHTML="\u21BB",e.title="Refresh Map",e.addEventListener("click",()=>{e.innerHTML="...",this.refreshMarkers().finally(()=>{e.innerHTML="\u21BB"})}),document.querySelector(".controls").appendChild(e)}async loadMarkers(){try{let t=await(await fetch("/api/markers")).json();this.markers=t,this.updateStats(),t.forEach(o=>this.addMarkerToMap(o)),this.updateCharts()}catch(e){console.error("Failed to load markers:",e)}}showMarkerDetails(e){let t=e.getProperties(),o=t.media&&t.media.length>0?t.media.map(p=>`<img src="${p}" class="media-preview" onerror="this.style.display='none'">`).join(""):"",r=`upvoted_${t.id}`,a=`reported_${t.id}`,n=sessionStorage.getItem(r),i=sessionStorage.getItem(a);document.getElementById("modal-body").innerHTML=`
  <h3>${t.title}</h3>
  <div class="modal-meta">
    <span><strong>Type:</strong> ${t.type}</span>
    <span><strong>Posted:</strong> ${new Date(t.timestamp).toLocaleString()}</span>
  </div>
  <p>${t.description||"No description"}</p>
  ${o}
  
  <div class="modal-actions">
    <button id="report-btn" onclick="tracker.reportMarker('${t.id}')" ${i?"disabled":""}>
      ${i?"\u2713 Reported":"\u26A0 Report"}
    </button>
    <button id="upvote-btn" onclick="tracker.upvoteMarker('${t.id}')" ${n?"disabled":""}>
      \u{1F44D} ${n?this.t("upvoted"):this.t("upvote")} (<span id="upvote-count">${t.upvotes||0}</span>)
    </button>
  </div>

  <div id="comments"><h4>${this.t("comments")}</h4></div>
  <textarea id="newComment" placeholder="${this.t("add_comment")}"></textarea>
  <input id="commentAuthor" placeholder="${this.t("author")}">
  <button onclick="tracker.addComment('${t.id}')">${this.t("add_comment")}</button>
  
  ${this.canEdit(t)?`
    <div class="admin-actions">
      <button onclick="tracker.deleteMarker('${t.id}')">${this.t("delete")}</button>
    </div>
  `:""}
`,this.loadComments(t.id),document.getElementById("modal").style.display="block"}async upvoteMarker(e){let t=document.getElementById("upvote-btn");if(!(!t||t.disabled))try{let o=await fetch(`/api/upvotes/${e}`,{method:"POST"});if(!o.ok){let a=await o.json();throw new Error(a.error||"Upvote failed")}let r=await o.json();sessionStorage.setItem(`upvoted_${e}`,"true"),t.disabled=!0,t.innerHTML=`\u{1F44D} ${this.t("upvoted")} (<span id="upvote-count">${r.upvotes}</span>)`,this.showToast("Upvoted!","success")}catch(o){console.error("Upvote error:",o),this.showToast(o.message,"error")}}async reportMarker(e){if(confirm(this.t("confirm_report")||"Are you sure you want to report this?"))try{if(!(await fetch(`/api/markers/${e}/report`,{method:"POST"})).ok)throw new Error("Report failed");sessionStorage.setItem(`reported_${e}`,"true");let o=document.getElementById("report-btn");o&&(o.disabled=!0,o.textContent="\u2713 Reported"),this.showToast("Report submitted. Thank you.","success")}catch(t){console.error("Report error:",t),this.showToast("Failed to submit report","error")}}connectWebSocket(){try{let t=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws`;this.ws=new WebSocket(t),this.ws.onopen=()=>{console.log("WebSocket connected"),this.reconnectAttempts=0,this.showToast("Connected to live updates","success")},this.ws.onmessage=o=>{let r=JSON.parse(o.data);this.handleWebSocketMessage(r)},this.ws.onerror=o=>{console.error("WebSocket error:",o)},this.ws.onclose=()=>{console.log("WebSocket disconnected"),this.reconnectWebSocket()}}catch(e){console.error("Failed to establish WebSocket:",e)}}reconnectWebSocket(){if(this.reconnectAttempts<this.maxReconnectAttempts){let e=Math.min(1e3*Math.pow(2,this.reconnectAttempts),3e4);this.reconnectAttempts++,console.log(`Reconnecting in ${e}ms (attempt ${this.reconnectAttempts})`),setTimeout(()=>this.connectWebSocket(),e)}else this.showToast("Live updates disconnected. Refresh page to reconnect.","error")}handleWebSocketMessage(e){switch(console.log("WebSocket message:",e),e.type){case"welcome":console.log(`Connected. ${e.activeUsers} active users`),this.updateActiveUsers(e.activeUsers);break;case"marker_added":this.displayedMarkerIds.has(e.marker.id)||(this.addMarkerToMap(e.marker),this.showToast("New report added","info"),this.triggerHaptic(20));break;case"active_users":this.updateActiveUsers(e.count);break;default:console.log("Unknown message type:",e.type)}}updateActiveUsers(e){let t=document.getElementById("active-users");t||(t=document.createElement("div"),t.id="active-users",t.className="active-users-indicator",document.querySelector(".controls").appendChild(t)),t.textContent=`\u{1F465} ${e} online`}sendUserLocation(){if(this.ws&&this.ws.readyState===WebSocket.OPEN){let e=this.map.getView().getCenter(),t=ol.proj.toLonLat(e);this.ws.send(JSON.stringify({type:"user_location",location:{lat:t[1],lng:t[0]}}))}}canEdit(e){return e.magicCode===this.magicCode||localStorage.getItem(`edit_${e.id}`)==="true"}async addComment(e){let t=document.getElementById("newComment").value,o=document.getElementById("commentAuthor").value;if(!t)return;let r={markerId:e,text:t,author:o||"Anonymous"};try{if(!(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok)throw new Error("Failed to save comment");this.loadComments(e),this.showToast("Comment added"),document.getElementById("newComment").value="",document.getElementById("commentAuthor").value=""}catch(a){console.error("Comment error:",a),this.showToast("Failed to add comment","error")}}async loadComments(e){try{let o=await(await fetch(`/api/comments/${e}`)).json();document.getElementById("comments").innerHTML=o.map(r=>`
        <div class="comment">
          <div class="comment-author">${r.author}</div>
          <div class="comment-time">${new Date(r.timestamp).toLocaleString()}</div>
          <p>${r.text}</p>
        </div>
      `).join("")}catch(t){console.error("Failed to load comments:",t)}}toggleAddMode(){this.addMode=!this.addMode;let e=document.getElementById("addBtn");this.addMode?(e.innerHTML='<span class="btn-icon">\u2715</span> Done',e.style.background="linear-gradient(45deg, #95a5a6, #7f8c8d)",this.showToast(this.t("add_marker_instruction")||"Click on the map to add a report")):(e.innerHTML=`<span class="btn-icon">+</span> ${this.t("add_new_marker")}`,e.style.background="linear-gradient(45deg, #ff6b6b, #ee5a52)"),gsap.to(e,{scale:1.05,duration:.1,yoyo:!0,repeat:1})}changeLang(e){this.currentLang=e,this.updateUIText()}closeModal(){document.getElementById("modal").style.display="none"}triggerHaptic(e=20){"vibrate"in navigator&&navigator.vibrate(e)}playSound(e){try{let t=new(window.AudioContext||window.webkitAudioContext),o=t.createOscillator(),r=t.createGain();o.connect(r),r.connect(t.destination),e==="success"?(o.frequency.value=800,r.gain.setValueAtTime(.1,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.1),o.start(t.currentTime),o.stop(t.currentTime+.1)):e==="error"&&(o.frequency.value=300,r.gain.setValueAtTime(.1,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.2),o.start(t.currentTime),o.stop(t.currentTime+.2))}catch{console.log("Audio not supported")}}showToast(e,t="info"){let o=document.getElementById("toast-container"),r=document.createElement("div");r.className=`toast toast-${t}`,r.textContent=e,o.appendChild(r),setTimeout(()=>{r.style.opacity="1",r.style.transform="translateX(0)"},10),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateX(100%)",setTimeout(()=>r.remove(),500)},3e3),t==="success"?(this.triggerHaptic(20),this.playSound("success")):t==="error"&&(this.triggerHaptic([50,50,50]),this.playSound("error"))}async deleteMarker(e){if(confirm(this.t("confirm_delete")))try{if(!(await fetch(`/api/markers/${e}`,{method:"DELETE"})).ok)throw new Error("Failed to delete marker");let o=this.vectorSource.getFeatures().find(r=>r.get("id")===e);o&&this.vectorSource.removeFeature(o),this.markers=this.markers.filter(r=>r.id!==e),this.updateStats(),this.updateCharts(),this.showToast("Report deleted"),this.closeModal()}catch(t){console.error("Delete error:",t),this.showToast("Failed to delete report","error")}}setupInstallPrompt(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),this.deferredPrompt=e,this.showInstallButton()}),window.addEventListener("appinstalled",()=>{console.log("PWA installed"),this.deferredPrompt=null,this.hideInstallButton(),this.showToast("App installed! Open from your home screen.","success")})}showInstallButton(){let e=document.createElement("button");e.id="install-btn",e.className="secondary-btn",e.innerHTML="\u{1F4F1} Install App",e.addEventListener("click",()=>this.promptInstall()),document.querySelector(".controls").appendChild(e)}hideInstallButton(){let e=document.getElementById("install-btn");e&&e.remove()}async promptInstall(){if(!this.deferredPrompt)return;this.deferredPrompt.prompt();let{outcome:e}=await this.deferredPrompt.userChoice;console.log(`Install prompt outcome: ${e}`),this.deferredPrompt=null,this.hideInstallButton()}async searchLocation(){let e=document.getElementById("searchInput").value;if(!e){this.showToast("Please enter a location to search.","error");return}this.showToast(`Searching for "${e}"...`,"info");try{let t=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(e)}`);if(!t.ok)throw new Error("Network response was not ok.");let o=await t.json();if(o.length>0){let{lat:r,lon:a}=o[0];this.showToast("Location found. Moving map...","success"),this.panToLocation([parseFloat(a),parseFloat(r)])}else this.showToast(`Could not find "${e}".`,"error")}catch(t){console.error("Nominatim search error:",t),this.showToast("Failed to perform search.","error")}}panToLocation(e){this.map&&this.map.getView().animate({center:ol.proj.fromLonLat(e),zoom:14,duration:1500,easing:ol.easing.easeOut})}};l.prototype.showLoadingIndicator=function(){let s=document.getElementById("loading-indicator");s&&(s.style.display="flex")};l.prototype.hideLoadingIndicator=function(){let s=document.getElementById("loading-indicator");s&&s.remove()};l.prototype.updateUIText=function(){document.querySelectorAll("[data-translate-key]").forEach(s=>{let e=s.dataset.translateKey,t=this.t(e);if(s.id==="addBtn"){let o=this.addMode?"cancel":"add_new_marker",r=this.t(o);s.dataset.translateKey=o;for(let a of s.childNodes)if(a.nodeType===Node.TEXT_NODE&&a.textContent.trim().length>0){a.textContent=` ${r}`;break}return}if(s.tagName==="BUTTON"&&s.querySelector(".btn-icon")){for(let o of s.childNodes)if(o.nodeType===Node.TEXT_NODE&&o.textContent.trim().length>0){o.textContent=` ${t}`;break}}else s.textContent=t})};
//# sourceMappingURL=index.js.map
