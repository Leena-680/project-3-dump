// Initial chart update
document.addEventListener('DOMContentLoaded', function () {
  const gradeDropdown = document.getElementById('gradeDropdown');
  updateCharts();

  gradeDropdown.onchange = function () {
      updateCharts();
  };
});

//Fetch data from flask
async function fetchData() {
  const response = await fetch('/data');
  const data = await response.json();
  return data;
}

//Update charts
async function updateCharts() {
  const selectedGrade = document.getElementById('gradeDropdown').value;
      const data = await fetchData();
      const gradeData = data.find(d => d.finalGrade === selectedGrade);

      if (gradeData) {
          plotGauge('avgStudyTimeGauge', 'Average Study Time (hours)', gradeData.avgStudyTime, 5);
          plotGauge('avgTravelTimeGauge', 'Average Travel Time (mins)', gradeData.avgTravelTime, 20);
          plotGauge('sumClassFailuresGauge', 'Total Class Failures', gradeData.sumClassFailures, 70);
      }
  }

//Draw gauge
function plotGauge(id, title, value, maxValue) {
  let trace = {
      type: "indicator",
      mode: "gauge+number",
      value: value,
      title: { text: title, font: { size: 24 } },
      gauge: {
          axis: { range: [null, maxValue], tickwidth: 1, tickcolor: "black" },
          bar: { color: "#2199b4" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "black",
          steps: [
              { range: [0, maxValue * 0.5], color: "#C3F3C0" },
              { range: [maxValue * 0.5, maxValue * 0.75], color: "#7EE081" },
              { range: [maxValue * 0.75, maxValue], color: "#62A87C" }
          ],
      }
  };

  let layout = {
      width: 450,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "white",
      font: { color: "darkblue", family: "Arial" }
  };

  Plotly.newPlot(id, [trace], layout);
}
