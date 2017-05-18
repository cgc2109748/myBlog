<template lang="html">
  <div class="quill-editor-box">
    <div class="quill-editor-title">
      <input v-model="title" :placeholder="'标题'" />
      <v-button :disabled="isSaving" type="secondary" @click="save">保存</v-button>
    </div>
    <!-- <ripple></ripple> -->
    <quill-editor ref="TextEditor"
                  v-model="content"
                  :options="editorOption"
                  @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor  } from 'vue-quill-editor'
import vButton from 'components/button'
import {invoke, getApiJson} from 'src/api'
// import Ripple from 'components/ripple'
export default {
  components: {
    quillEditor,
    vButton
    // Ripple
  },
  data () {
    return {
      id: '',
      title: '',
      content: '',
      text: '',
      format: 'MMM Do YYYY, h:mm:ss a',
      editorOption: {
        placeholder: '写下你的心情...',
        readOnly: false,
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, ,4 ,5 ,6 ,false]}],
            [{'color': []}, {'background': []}],
            [{'font': []}],
            [{'align': []}],
            ['clean'],
            ['link', 'image', 'video']
          ],
        }
      },
      isSaving: false
    }
  },
  mounted() {
    this.id = this.$route.query.id
    if (!_.isEmpty(this.id)) {
      this.loadData()
    }
  },
  methods: {
    onEditorChange ({editor, html, text}) {
      this.content = html
      this.text = text
    },
    loadData () {
      getApiJson('api/Notes.query', {id: this.id})
        .then((res) => {
          this.title = res.records.title
          this.content = res.records.content
          this.text = res.records.text
        })
      // invoke('api/Notes.update', args)
    },
    save () {
      this.isSaving = true
      const args = {
        title: this.title,
        content: this.content,
        text: this.text,
        date: moment().format(this.format)
      }
      invoke('api/Notes.insert',args)
        .then((res) => {
          Message.success({
            message: res.msg
          })
          this.title = ''
          this.content = ''
          this.text = ''
          this.isSaving = false
        })
        .catch((err) => {
          this.isSaving = false
        })
    }
  }
}
</script>

<style lang="scss">
.quill-editor-box {
  background: #fff;
  margin-bottom: 15px;
  // border: 1px solid #ccc;

  .quill-editor-title {
    border: solid 1px #ccc;
    border-bottom: none;
    position: relative;

    .button {
      position: absolute;
      top: 0;
      right: 0;
    }

    input {
      border: none;
      width: 100%;
      height: 34px;
      text-align: center;
      font-size: 23px;
      line-height: 23px;
      cursor: text;

      &:focus {
        border: none;
      }
      &:active {
        border: none;
      }
      &:visited {
        border: none;
      }
    }
  }

  .quill-editor {

    .ql-editor {
      min-height: 800px;
    }
  }
}
</style>
