<template lang="html">
  <div class="quill-editor-box">
    <div class="quill-editor-title">
      <input v-model="title" :placeholder="'标题'" />
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
// import Ripple from 'components/ripple'
export default {
  components: {
    quillEditor,
    // Ripple
  },
  data () {
    return {
      title: '',
      content: '',
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
      }
    }
  },
  methods: {
    onEditorChange ({editor, html, text}) {
      // this.content = html
    }
  }
}
</script>

<style lang="scss">
.quill-editor-box {
  background: #fff;
  // border: 1px solid #ccc;

  .quill-editor-title {
    border: solid 1px #ccc;
    border-bottom: none;

    input {
      border: none;
      width: 100%;
      height: 40px;
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
      min-height: 600px;
    }
  }
}
</style>
