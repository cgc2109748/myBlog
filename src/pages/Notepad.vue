<template lang="html">
  <div class="note-pad">
    <Steps :current="dataJson.length" direction="vertical">
       <Step v-for="(item, index) in dataJson"
             :title="item.title"
             :date="item.date"
             :index="index"
             status="finish"
             :text="item.text"
             @click.native="edit(item._id)">
         <div slot="content">
           <div class="steps-delete" @click.stop="remove(item._id)">
             <i class="fa fa-remove"></i>
           </div>
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
    },
    edit (id) {
      router.push({
        path: '/',
        query: {
          id: id
        }
      })
    },
    remove (id) {
      invoke ('api/Notes.delete', {id: id})
        .then((res) => {
            Message.success({
              message: res.msg
            })
            this.loadData()
        })
        .catch((err) => {
          Message.error({
            message: res.msg
          })
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
.steps-main {
  .steps-delete {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 10px;
    font-size: 16px;
    color: #FFF;
    transition: all .3s;
  }

  &:hover {
    .steps-delete {
      color: #999;

      &:hover {
        color: #20a0ff;
      }
    }
  }

}
</style>
