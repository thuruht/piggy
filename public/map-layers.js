const TILE_LAYERS = {
  OpenStreetMap: {
    url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: { attribution: "© OpenStreetMap contributors" },
  },
  "Carto Dark": {
    url: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    options: { attribution: "© OpenStreetMap contributors, © CARTO" },
  },
  "ESRI Satellite": {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution:
        "© Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    },
  },
};

const OVERLAY_LAYERS = {
  "Railway Lines": {
    url: "https://{a-c}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
    options: { attribution: "© OpenRailwayMap" },
  },
};

const activeLayers = {
  base: null,
  overlays: new Map(),
};

function switchBaseLayer(map, name) {
  if (activeLayers.base) {
    map.removeLayer(activeLayers.base);
  }
  const layerConfig = TILE_LAYERS[name];
  const newBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: layerConfig.url,
      attributions: layerConfig.options.attribution,
    }),
  });

  map.getLayers().insertAt(0, newBaseLayer);
  activeLayers.base = newBaseLayer;
  document.getElementById("current-layer-name").textContent = name;
}

function toggleOverlay(map, name, isEnabled) {
  if (isEnabled) {
    if (!activeLayers.overlays.has(name)) {
      const layerConfig = OVERLAY_LAYERS[name];
      const newOverlay = new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: layerConfig.url,
          attributions: layerConfig.options.attribution,
        }),
      });
      map.addLayer(newOverlay);
      activeLayers.overlays.set(name, newOverlay);
    }
  } else {
    if (activeLayers.overlays.has(name)) {
      map.removeLayer(activeLayers.overlays.get(name));
      activeLayers.overlays.delete(name);
    }
  }
}

export function createLayerControl(map) {
  const baseLayerContainer = document.getElementById("base-layer-controls");
  const overlayContainer = document.getElementById("overlay-controls");

  for (const name in TILE_LAYERS) {
    const option = document.createElement("div");
    option.className = "layer-option";
    option.innerHTML = `
      <input type="radio" name="base-layer" id="base-${name.replace(
        /\s/g,
        "-"
      )}" value="${name}">
      <label for="base-${name.replace(/\s/g, "-")}">${name}</label>
    `;
    baseLayerContainer.appendChild(option);
  }

  baseLayerContainer.querySelector(
    'input[value="OpenStreetMap"]'
  ).checked = true;
  activeLayers.base = map.getLayers().getArray()[0];

  for (const name in OVERLAY_LAYERS) {
    const option = document.createElement("div");
    option.className = "layer-option";
    option.innerHTML = `
      <input type="checkbox" id="overlay-${name.replace(
        /\s/g,
        "-"
      )}" value="${name}">
      <label for="overlay-${name.replace(/\s/g, "-")}">${name}</label>
    `;
    overlayContainer.appendChild(option);
  }

  document
    .getElementById("layer-dropdown-menu")
    .addEventListener("change", (e) => {
      if (e.target.name === "base-layer") {
        switchBaseLayer(map, e.target.value);
      } else if (e.target.type === "checkbox") {
        toggleOverlay(map, e.target.value, e.target.checked);
      }
    });

  document
    .getElementById("layer-dropdown-btn")
    .addEventListener("click", () => {
      const menu = document.getElementById("layer-dropdown-menu");
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
}
