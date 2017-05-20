<template lang="html">
  <div class="note-pad">
    <Steps :current="dataJson.length" direction="vertical">
       <Step v-for="(item, index) in dataJson"
             :title="item.title"
             :date="item.date"
             :index="index"
             status="finish"
             :text="item.text"
             @click.native="show(item)">
         <div slot="content">
           <div class="steps-delete">
             <i class="fa fa-edit" @click.stop="edit(item._id)"></i>
             <i class="fa fa-remove" @click.stop="remove(item._id)"></i>
           </div>
           {{item.text}}
         </div>
       </Step>
   </Steps>
   <modal
   ref="noteModal"
   v-model="showModal"
   width="800">
   <div slot="header" style="text-align:center">
     {{modalTitle}}
  </div>
  <div slot="footer">
      <v-button color="primary" type="primary" @click="ok">返回</v-button>
  </div>
 </modal>
  </div>
</template>

<script>
import {invoke, getApiJson} from 'src/api'
import Steps from 'components/steps'
import Modal from 'components/modal'
import vButton from 'components/button'
export default {
  data () {
    return {
      dataJson: [],
      showModal: false,
      modalTitle: ''
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
    show (item) {
      this.showModal = true
      this.modalTitle = item.title
      $('.modal-body').html(item.content)
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
    },
    ok () {
      this.showModal = false
    }
  },
  components: {
    Steps,
    Step: Steps.Step,
    Modal,
    vButton
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
.modal-body {
  img {
    max-width: 100%;
  }
}
</style>
