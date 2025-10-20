export function setupDataViz(tracker) {
  // Attach visualization and UI methods to the tracker instance
  tracker.renderTimelineChart = renderTimelineChart;
  tracker.renderTypeChart = renderTypeChart;
  tracker.renderHeatmap = renderHeatmap;
  tracker.toggleSidebar = toggleSidebar;
  tracker.updateCharts = updateCharts;
  tracker.closeSidebar = closeSidebar;
  tracker.animateEntrance = animateEntrance;
}

function renderTimelineChart() {
  const container = d3.select("#timeline-chart");
  container.selectAll("*").remove();

  if (this.chartData.timeline.length === 0) return;

  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const width = 360 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const svg = container
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Add title
  container
    .insert("h4", "svg")
    .text("Reports Over Time (Last 30 Days)")
    .style("margin", "0 0 15px 0")
    .style("color", "#2c3e50");

  const categoriesInChart = Object.keys(this.categories);
  const xScale = d3
    .scaleBand()
    .domain(this.chartData.timeline.map((d) => d.date))
    .range([0, width])
    .padding(0.1);

  const maxCount = d3.max(this.chartData.timeline, (d) =>
    d3.sum(categoriesInChart, (cat) => d[cat.toLowerCase()])
  );
  const yScale = d3.scaleLinear().domain([0, maxCount]).range([height, 0]);

  // Create stacked data
  const stack = d3.stack().keys(categoriesInChart.map((c) => c.toLowerCase()));

  const stackedData = stack(this.chartData.timeline);

  const colors = Object.fromEntries(
    Object.entries(this.categories).map(([key, value]) => [
      key.toLowerCase(),
      value.color,
    ])
  );

  // Draw bars
  g.selectAll(".layer")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("class", "layer")
    .attr("fill", (d) => colors[d.key])
    .selectAll("rect")
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.data.date))
    .attr("y", height)
    .attr("height", 0)
    .attr("width", xScale.bandwidth())
    .transition()
    .duration(800)
    .delay((d, i) => i * 50)
    .attr("y", (d) => yScale(d[1]))
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]));

  // Add axes
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickFormat(""));

  g.append("g").call(d3.axisLeft(yScale).ticks(5));
}

function renderTypeChart() {
  const container = d3.select("#type-chart");
  container.selectAll("*").remove();

  const data = Object.entries(this.chartData.types).map(([key, count]) => ({
    type: key.toUpperCase(),
    count: count,
    color: this.categories[key.toUpperCase()]?.color || "#ccc",
  }));

  if (data.every((d) => d.count === 0)) return;

  // Add title
  container
    .append("h4")
    .text("Report Types Distribution")
    .style("margin", "0 0 15px 0")
    .style("color", "#2c3e50");

  const width = 360;
  const height = 200;
  const radius = Math.min(width, height) / 2 - 20;

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const pie = d3
    .pie()
    .value((d) => d.count)
    .sort(null);

  const arc = d3
    .arc()
    .innerRadius(radius * 0.4)
    .outerRadius(radius);

  const arcs = g
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("fill", (d) => d.data.color)
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .transition()
    .duration(800)
    .attrTween("d", function (d) {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t) {
        return arc(interpolate(t));
      };
    });

  arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .text((d) => (d.data.count > 0 ? d.data.count : ""))
    .style("opacity", 0)
    .transition()
    .delay(800)
    .duration(300)
    .style("opacity", 1);
}

function renderHeatmap() {
  const container = d3.select("#heatmap-chart");
  container.selectAll("*").remove();

  // Add title
  container
    .append("h4")
    .text("Activity by Hour of Day")
    .style("margin", "0 0 15px 0")
    .style("color", "#2c3e50");

  const width = 360;
  const height = 60;
  const cellSize = width / 24;

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height + 40);

  const maxValue = d3.max(this.chartData.hourly);
  const colorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([0, maxValue || 1]);

  const cells = svg
    .selectAll(".hour-cell")
    .data(this.chartData.hourly)
    .enter()
    .append("g")
    .attr("class", "hour-cell");

  cells
    .append("rect")
    .attr("x", (d, i) => i * cellSize)
    .attr("y", 20)
    .attr("width", cellSize - 1)
    .attr("height", height - 20)
    .attr("fill", "#f0f0f0")
    .transition()
    .duration(600)
    .delay((d, i) => i * 25)
    .attr("fill", (d) => colorScale(d));

  cells
    .append("text")
    .attr("x", (d, i) => i * cellSize + cellSize / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text((d, i) => (i % 4 === 0 ? i : ""));

  // Add tooltip
  cells.append("title").text((d, i) => `${i}:00 - ${d} reports`);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const isOpen = sidebar.classList.contains("open");

  if (isOpen) {
    this.closeSidebar();
  } else {
    sidebar.style.display = "block";
    sidebar.classList.add("open");
    gsap.from("#chart-container > *", {
      x: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.2,
    });
    if (this.updateCharts) {
      this.updateCharts();
    }
  }
}

function updateCharts() {
  this.processChartData();
  this.renderTimelineChart();
  this.renderTypeChart();
  this.renderHeatmap();
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("open");
  setTimeout(() => {
    if (!sidebar.classList.contains("open")) {
      sidebar.style.display = "none";
    }
  }, 400);
}

function animateEntrance() {
  gsap.from("#header", {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.from(".stat-item", {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.3,
    ease: "back.out(1.7)",
  });
  gsap.from("#map-container", {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power2.out",
  });
  gsap.from(".legend", {
    x: 100,
    opacity: 0,
    duration: 0.6,
    delay: 0.8,
  });
}
