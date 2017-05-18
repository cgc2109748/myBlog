<template lang="html">
  <div class="note-pad">
    <Steps :current="dataJson.length" direction="vertical">
       <Step v-for="(item, index) in dataJson" :title="item.title" :date="item.date" :index="index" status="finish" :text="item.text">
         <div slot="content">
           {{item.text}}
         </div>
       </Step>
   </Steps>
  </div>
</template>

<script>
import {invoke, getApiJson} from 'src/api'
import Steps from 'components/steps'
export default {
  data () {
    return {
      dataJson: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      getApiJson('api/Notes.query', {})
        .then((res) => {
          this.dataJson = res.records
        })
    }
  },
  components: {
    Steps,
    Step: Steps.Step
  }
}
</script>

<style lang="scss">

</style>
