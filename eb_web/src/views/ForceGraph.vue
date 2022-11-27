<template>
  <div class="forceGraph__Container">
    <router-link :to="{ name: 'Home' }" class="goBack">Back</router-link>
    <div class="container" style="cursor: pointer" v-if="filteredData.length > 0">
      <svg ref="svg" :width="width" :height="height">
        <g>
          <line
            v-for="(link, i) in links"
            :key="i"
            :x1="link.x1"
            :x2="link.x2"
            :y1="link.y1"
            :y2="link.y2"
            style="stroke: red"
          ></line>
        </g>
        <g class="node"
           style="cursor: pointer;"
           :key="node.id"
           v-for="node in nodes">
          <circle
            :style="{fill: node.id==='center'?'purple':'blue'}"
            :cx="node.x"
            :cy="node.y"
            :r="50"
          >
          </circle>
          <text
            class="ballTxt"
            :x="node.x"
            :y="node.y"
            dx="0" dy="5"
            fill="white"
            text-anchor="middle">
            {{node.value}}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'; // eslint-disable-line

export default {
  name: 'ForceGraph',
  props: {
    filteredData: Array,
    nodes_r: Array,
    links_r: Array,
  },
  data() {
    return {
      // d3 variables
      links: this.links_r,
      nodes: this.nodes_r,
      width: document.documentElement.clientWidth - 6,
      height: document.documentElement.clientHeight - 4,
      simulation: '',
    };
  },
  mounted() {
    // calculate d3 nodes
    if (this.filteredData.length > 0) {
      this.simulation = d3.forceSimulation(this.nodes)
        .force('charge', d3.forceManyBody().strength(-100))
        .force('link', d3.forceLink(this.links).id((d) => d.id).distance(150))
        .force('collide', d3.forceCollide().radius(60).iterations(2))
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        .on('tick', () => {
          this.nodes = this.nodes.map((v) => v);
          this.links = this.links.map((v) => ({
            ...v,
            x1: v.source.x,
            y1: v.source.y,
            x2: v.target.x,
            y2: v.target.y,
          }));
        });
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.forceGraph__Container {
  width: 100vw;
  height: 100vh;
}

.container {
  width: 100vw;
  height: 100vh;
}

.inputBar {
  position: fixed;
  top: 0;
  right: 0;
}

.ballTxt {
  word-wrap: break-word;
}

.goBack {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
