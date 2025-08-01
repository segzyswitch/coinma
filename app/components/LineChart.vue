<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js';
import { Line } from 'vue-chartjs';

// Register required components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)

// Props
const props = defineProps({
  rateDrop: String,
});

const myData = [190, 194, 197, 199, 198, 199, 200, 203, 205, 206, 207, 208];
const isRateDown = props.rateDrop === 'down';
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
    }
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false, // remove vertical grid lines
        drawBorder: false
      }
    },
    y: {
      display: false,
      grid: {
        display: false, // remove horizontal grid lines
        drawBorder: false
      }
    }
  },
  layout: {
    padding: 0
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0 // optional: removes the dots on the line
    }
  }
}

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: isRateDown ? myData.slice().reverse() : myData,
      borderColor: isRateDown ? '#ee4d4f' : '#25c866',
      backgroundColor: isRateDown ? 'rgba(255, 77, 79, 0.2)' : 'rgba(37, 200, 102, 0.2)',
      tension: 0.4,
      fill: true,
    }
  ]
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
