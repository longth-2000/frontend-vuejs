import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mounted () {
    this.renderChart({
      labels: ['VueJs'],
      datasets: [
        {
          backgroundColor: [
            '#2d4226',
          ],
          data: [40, 20]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}