// Define tile layer configurations
export const TILE_LAYERS = {
  // DARK & NIGHT MAPS
  "NASA City Lights": {
    url: "https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}",
    options: {
      attribution: "&copy; NASA",
      maxZoom: 8,
      format: "jpg",
    },
    category: "dark",
  },
  "Carto Dark": {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    options: {
      attribution: "&copy; OpenStreetMap | &copy; CARTO",
    },
    category: "dark",
  },

  // SATELLITE & IMAGERY
  "ESRI Satellite": {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution: "&copy; Esri, DigitalGlobe",
    },
    category: "satellite",
  },

  // STREET MAPS
  OpenStreetMap: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    },
    category: "street",
  },

  // Add more layers from oddity...
};

export const OVERLAY_LAYERS = {
  "Railway Lines": {
    url: "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
    options: {
      attribution: "&copy; OpenRailwayMap",
      opacity: 0.7,
      transparent: true,
    },
  },
  "Cycling Routes": {
    url: "https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png",
    options: {
      attribution: "&copy; Waymarked Trails",
      opacity: 0.8,
      transparent: true,
    },
  },
};

// Create layer control UI
export function createLayerControl(map) {
  const container = document.createElement("div");
  container.className = "layer-control";
  container.innerHTML = `
    <button class="layer-control-btn" id="layer-btn">
      <span>🗺️</span>
      <span id="current-layer">OpenStreetMap</span>
    </button>
    <div class="layer-menu" id="layer-menu" style="display:none;">
      <div class="layer-section">
        <h4>Base Layers</h4>
        <div id="base-layers"></div>
      </div>
      <div class="layer-section">
        <h4>Overlays</h4>
        <div id="overlay-layers"></div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Populate layers
  const baseLayers = document.getElementById("base-layers");
  const overlayLayers = document.getElementById("overlay-layers");

  Object.entries(TILE_LAYERS).forEach(([name, config]) => {
    const option = document.createElement("div");
    option.className = "layer-option";
    option.innerHTML = `
      <input type="radio" name="base-layer" id="layer-${name.replace(
        /\s/g,
        "-"
      )}"
        ${name === "OpenStreetMap" ? "checked" : ""}>
      <label for="layer-${name.replace(/\s/g, "-")}">${name}</label>
    `;
    baseLayers.appendChild(option);

    option.querySelector("input").addEventListener("change", () => {
      switchBaseLayer(map, name, config);
    });
  });

  Object.entries(OVERLAY_LAYERS).forEach(([name, config]) => {
    const option = document.createElement("div");
    option.className = "layer-option";
    option.innerHTML = `
      <input type="checkbox" id="overlay-${name.replace(/\s/g, "-")}">
      <label for="overlay-${name.replace(/\s/g, "-")}">${name}</label>
    `;
    overlayLayers.appendChild(option);

    option.querySelector("input").addEventListener("change", (e) => {
      toggleOverlay(map, name, config, e.target.checked);
    });
  });

  // Toggle menu
  document.getElementById("layer-btn").addEventListener("click", () => {
    const menu = document.getElementById("layer-menu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });
}

let currentBaseLayer = null;
const overlayLayersActive = new Map();

function switchBaseLayer(map, name, config) {
  if (currentBaseLayer) {
    map.removeLayer(currentBaseLayer);
  }

  currentBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: config.url,
      ...config.options,
    }),
  });

  map.getLayers().insertAt(0, currentBaseLayer);
  document.getElementById("current-layer").textContent = name;
}

function toggleOverlay(map, name, config, enabled) {
  if (enabled) {
    const overlay = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: config.url,
        ...config.options,
      }),
    });
    overlayLayersActive.set(name, overlay);
    map.addLayer(overlay);
  } else {
    const overlay = overlayLayersActive.get(name);
    if (overlay) {
      map.removeLayer(overlay);
      overlayLayersActive.delete(name);
    }
  }
}
