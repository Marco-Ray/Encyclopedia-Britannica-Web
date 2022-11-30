<template>
  <div class="forceGraph__Container">
    <div class="arrow-container">
        <!-- eslint-disable-next-line -->
        <img :src="arrowUp" alt="goBack" class="arrow-back" @click="goBack"/>
        <!-- eslint-disable-next-line -->
        <img :src="arrowDown" alt="goPage" class="arrow-down" @click="goPage"/>
      </div>
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
            class="bubble"
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
      // global variables
      dateStr: this.$route.query.dateStr,
      // d3 variables
      links: this.links_r,
      nodes: this.nodes_r,
      width: document.documentElement.clientWidth - 6,
      height: document.documentElement.clientHeight - 140,
      simulation: '',
      arrowUp: require('@/assets/button-w-up@1x.png'), // eslint-disable-line
      arrowDown: require('@/assets/button-w-down@1x.png'), // eslint-disable-line
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
    goBack() {
      this.$router.go(-1);
    },
    goPage() {
      this.$router.push({ path: '/TimeLine', query: { dateStr: this.dateStr } });
    },
  },
};
</script>

<style lang="scss" scoped>
.forceGraph__Container {
  width: 100vw;
  height: 100vh;
  background: black;
}

.arrow-back {
  position: absolute;
  top: 37px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 100;
}

.arrow-down {
  position: absolute;
  bottom: 37px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 100;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.ballTxt {
  word-wrap: break-word;
}

</style>
