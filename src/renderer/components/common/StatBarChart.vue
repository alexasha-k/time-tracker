<template>
  <div class="stat-bar">
    <svg ref="barchart"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: ['items'],
  methods: {
    drawBarChart: function () {
      const svg = d3.select(this.$refs.barchart)
      const width = this.$refs.barchart.parentElement.clientWidth
      const height = 60
      const paddingBottom = 30
      const paddingRight = 10
      const colorScale = [
        '#cd0074',
        '#ff5402',
        '##2ED702',
        '#3D9DD0',
        '#FA4056'
      ]
      svg.attr('width', width).attr('height', height)
      let keys = d3
        .nest()
        .key(function (d) {
          return d.group
        })
        .object(this.items)

      let keysList = d3.keys(keys)

      const keysArr = []
      keysArr.push(keys)

      const stack = d3
        .stack()
        .keys(keysList)
        .value((d, key) => d3.sum(d[key], d => d.endTime - d.startTime))

      const series = stack(keysArr)

      const domainMax = d3.max(series, d => d3.max(d, d => d[1]))
      const workDayInMs = 28800000 // 8 hours

      const x = d3
        .scaleLinear()
        .domain([0, d3.max([domainMax, workDayInMs])])
        .range([0, width - paddingRight])

      const xAxis = d3
        .axisBottom(x)
        .tickValues([14400000, 28800000])
        .tickFormat(d => d / 3600000)

      const rectGroup = svg
        .append('g')
        .selectAll('g')
        .data(series)
        .join('g')
        .attr('fill', (d, i) => colorScale[i])
      rectGroup
        .selectAll('title')
        .data(d => d)
        .enter()
        .append('title')
        .text(d => {
          console.log(d.data)
          return d[3]
        })
      rectGroup
        .selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('x', d => x(d[0]))
        .attr('y', 0)
        .attr('height', height - paddingBottom)
        .attr('width', (d, i) => x(d[1] - d[0]))

      svg
        .append('g')
        .classed('barchart-axis', true)
        .attr('transform', 'translate(0,30)')
        .call(xAxis)
    }
  },
  mounted () {
    this.drawBarChart()
  }
}
</script>

<style lang="scss" scoped>
/deep/ .barchart-axis {
  .domain,
  .tick line {
    color: #e6e6e6;
  }
  .tick text {
    opacity: 0.7;
  }
}
</style>
