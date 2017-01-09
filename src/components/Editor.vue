<template >
  <main class="site-main">
    <div class="editor-wrapper container-fluid">
      <div v-show="toggleNav" class="documents-nav col-md-2">
        <ul class="nav nav-pills nav-stacked">
          <li v-on:click="setActiveDocument(document)" v-bind:class="{active: document === activeDocument}" v-for="document in documents">
            <a>{{document.title}} <span v-if="!document.public" class="badge">Private</span></a>
          </li>
        </ul>
      </div>
      <div class="editor" v-bind:class="editorClass()">
        <editor v-model="content" @init="editorInit" lang="markdown" theme="twilight"></editor>
        <ul class="options list-unstyled text-right">
          <li>
            <button v-on:click="toggleNav = !toggleNav" id="toggle-nav" class="btn btn-default btn-sm">
              <i class="fa" v-bind:class="toggleNav ? 'fa-window-maximize': 'fa-columns'"></i>
              <span class="text">{{toggleNav ? 'Hide' : 'Show'}} Nav</span>
            </button>
          </li>
          <li>
            <button v-on:click="togglePreview = !togglePreview" id="toggle-preview" class="btn btn-default btn-sm">
              <i class="fa fa-window-close-o" v-bind:class="togglePreview ? 'fa-window-close-o' : 'fa-window-restore'"></i>
              <span class="text">{{togglePreview ? 'Hide' : 'Show'}} Preview</span>
            </button>
          </li>
          <li>
            <button v-on:click="documentPersion(activeDocument)" id="toggle-private" class="btn btn-default btn-sm">
              <i class="fa" v-bind:class="publicFile ? 'fa-eye' : 'fa-eye-slash'"></i>
              <span class="text">Make {{publicFile ? 'public' : 'private'}}</span>
            </button>
          </li>
          <li>
            <button id="download" class="btn btn-default btn-sm">
              <i class="fa fa-download"></i>
              <span class="text">Download</span>
            </button>
          </li>
          <li>
            <button id="delete" class="btn btn-danger btn-sm">
              <i class="fa fa-trash"></i>
              <span class="text">Delete</span>
            </button>
          </li>
        </ul>
      </div>
      <div v-show="togglePreview" class="preview col-md-5">
        <div id="output" class="output container" v-html="md(content)"></div>
      </div>
    </div>
  </main>
</template>

<script>
import debounce from 'lodash/debounce'
import Remarkable from 'remarkable'
const md = new Remarkable()
const URL = 'https://baas.kinvey.com/appdata/kid_B1l1-6XHe/Documents'

export default {
  name: 'Editor',
  components: {
    editor: require('vue2-ace-editor')
  },
  data () {
    return {
      content: '',
      toggleNav: true,
      togglePreview: true,
      publicFile: false,
      documents: [],
      activeDocument: null
    }
  },
  watch: {
    content () {
      this.saveDocument()
    }
  },
  methods: {
    saveDocument: debounce(function () {
      if (this.activeDocument === null) {
        return
      }
      this.activeDocument.text = this.content
      this.$http.put(`${URL}/${this.activeDocument._id}`, this.activeDocument, {
        headers: {
          Authorization: 'Basic a2lkX0IxbDEtNlhIZTozNmNiOWI2YjM3YTE0ZDA1OTE4YWY1ZGM2OGIwOWI0NQ=='
        }
      })
      .then(response => {
        console.log('saved')
      })
      .catch(err => {
        // TODO: Do something here.
        console.log(err)
      })
    }, 500),
    editorInit (editor) {
      require('../../node_modules/brace/mode/markdown')
      require('../../node_modules/brace/theme/twilight')

      editor.setFontSize(18)
      editor.setHighlightActiveLine(false)
      editor.renderer.setShowGutter(false)
    },
    md (content) {
      return md.render(content)
    },
    editorClass () {
      let className = null
      if (this.toggleNav) {
        className = 'col-md-5'
      } else if (!this.toggleNav) {
        className = 'col-md-6'
      }
      if (this.togglePreview) {
        className = 'col-md-5'
      } else if (!this.togglePreview) {
        className = 'col-md-10'
      }
      if (!this.toggleNav && !this.togglePreview) {
        className = 'col-md-12'
      }
      return className
    },
    setActiveDocument (document) {
      this.activeDocument = document
      this.content = document.text
    },
    documentPersion (document) {
      if (document === null) {
        return
      }
      document.public = !document.public
      this.$http.put(`${URL}/${document._id}`, document, {
        headers: {
          Authorization: 'Basic a2lkX0IxbDEtNlhIZTozNmNiOWI2YjM3YTE0ZDA1OTE4YWY1ZGM2OGIwOWI0NQ=='
        }
      })
      .then(response => {
        this.publicFile = !this.publicFile
      })
      .catch(err => {
        // TODO: Do something here.
        console.log(err)
      })
    }
  },
  created () {
    const fetchDocuments = () => this.$http.get(URL, {
      headers: {
        Authorization: 'Basic a2lkX0IxbDEtNlhIZTozNmNiOWI2YjM3YTE0ZDA1OTE4YWY1ZGM2OGIwOWI0NQ=='
      }
    })
    .then(response => {
      this.documents = response.data
    })
    .catch(err => {
      console.log(err)
    })
    debounce(fetchDocuments, 150)()
  }
}
</script>

<style scoped>
/**
 * editor
 */
.editor-wrapper {
  padding: 0;
  height: 100vh;
}
/* nav */
.editor-wrapper .documents-nav {
  padding: 0;
  height: 100%;
  padding-bottom: 5em;
  overflow-y: auto;
}
.editor-wrapper .documents-nav .nav li a {
  padding-top: 1em;
  padding-bottom: 1em;
  cursor: pointer;
}
.editor-wrapper .documents-nav .nav li.active a {
  padding-top: 2em;
  padding-bottom: 2em;
  border-left: .5em solid #F77E40;
}
/* editor */
.editor-wrapper .editor {
  position: relative;
  height: 100%;
  padding: 3.5em 1em 0;
  background-color: #141414;
}
.editor-wrapper .editor .input {
  height: 100%;
  width: 100%;
  max-width: 960px;
  padding: 0;
}
/* options */
.editor-wrapper .editor .options {
  position: absolute;
  padding: .5em;
  right: 0;
  top: 0;
  opacity: .5;
}
.editor-wrapper .editor .options li {
  display: inline-block;
}
.editor-wrapper .editor .options li button .fa {
  margin-right: .25em;
}
.editor-wrapper .editor .options:hover {
  opacity: 1;
}
/* output */
.editor-wrapper .preview {
  position: relative;
  height: 100%;
  padding: 1em;
  background-color: #fff;
}
.editor-wrapper .preview .output {
  height: 100%;
  width: 100%;
  padding: 0;
}
</style>
