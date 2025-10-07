import { ICEPIGTracker } from './index.js';
import { setupDataViz } from './data-viz.js';

document.addEventListener('DOMContentLoaded', () => {
  const tracker = new ICEPIGTracker();
  window.tracker = tracker; // Make it globally available if needed
  tracker.init();
  setupDataViz(tracker);
});
