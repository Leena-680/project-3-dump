async function fetchData(endpoint) {
    const response = await fetch(`http://127.0.0.1:5000/${endpoint}`);
    return response.json();
}

function createChart(canvasId, data, label, dataKey, chartLabel) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item[label]),
            datasets: [{
                label: chartLabel,
                data: data.map(item => item[dataKey]),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.onload = async () => {
    const gradeData = await fetchData('data');
    createChart('gradeChart', gradeData, 'finalGrade', 'avgStudyTime', 'Average Study Time');

    const genderData = await fetchData('data-by-gender');
    createChart('genderChart', genderData, 'sex', 'avgStudyTime', 'Average Study Time');
};
