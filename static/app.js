// Fetch data from Flask endpoint
async function fetchData() {
    const response = await fetch('/data');
    const data = await response.json();
    return data;
  }
  
  // Update gauge chart based on selected grade
  function updateGauge() {
    const selectedGrade = document.getElementById('gradeDropdown').value;
    fetchData().then(data => {
      const selectedData = data.find(d => d.finalGrade === selectedGrade);
      if (selectedData) {
        drawGauge(selectedData.avgStudyTime);
      }
    });
  }
  
  // Draw the gauge chart
  function drawGauge(value) {
    const gaugeElement = document.getElementById('gaugeChart');
    gaugeElement.innerHTML = '';
  
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    const svg = d3.select('#gaugeChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
  
    const range = [1, 2, 3, 4, 5];
    const arc = d3.arc()
      .innerRadius(60)
      .outerRadius(100)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);
  
    svg.selectAll('path')
      .data(range)
      .enter().append('path')
      .attr('d', arc)
      .attr('transform', (d) => `rotate(${(d - 1) * 60})`)
      .style('fill', (d) => (d <= value) ? 'green' : 'lightgray');
  
    // Indicate selected value
    svg.append('text')
      .text(value.toFixed(1))
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', 'black');
  }
  
  // Initialize the gauge chart with default grade
  updateGauge();
  