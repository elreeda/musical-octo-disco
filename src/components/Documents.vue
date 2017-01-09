<template>
  <main class="site-main container">
    <div class="row" v-bind:class="browseDocumentsRoute ? 'latest-documents' : 'documents'">
      <div v-if="documents.length === 0" class="text-center spinner">
        <span class="spinner">
          <i class="fa fa-spinner"></i>
          <span class="text">Loading...</span>
        </span>
      </div>
      <div class="document" v-bind:class="browseDocumentsRoute ? 'col-lg-6' : 'col-lg-4 col-md-6 col-sm-12'" v-for="document in documents">
        <h3>{{document.title}}</h3>
        <p>{{document.text}}</p>
      </div>
    </div>

    <div v-if="this.$route.path !== '/browse-documents'" class="browse-link row text-center text-capitalize">
      <router-link to="/browse-documents" class="btn btn-primary">browse documents</router-view>
    </div>
  </main>
</template>

<script>
import debounce from 'lodash/debounce'
const URL = 'https://baas.kinvey.com/appdata/kid_B1l1-6XHe/Documents?public=true'

export default {
  name: 'documents',
  data () {
    return {
      browseDocumentsRoute: this.$route.path !== '/browse-documents',
      documents: []
    }
  },
  methods: {},
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/**
 * spinner
 */
.spinner {
  display: inline-block;
  font-size: 15px;
}
@-webkit-keyframes spin {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.spinner .fa {
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  margin-right: .25em;
}
.latest-documents .text-center {
  margin: 30px 0;
  width: 100%;
}
/**
 * landing
 */
.site-main .latest-documents  {
  margin-bottom: 2em;
}
.site-main .latest-documents .document {
  margin-bottom: 1em;
}

/**
 * documents
 */
.site-main .documents {
  margin-bottom: 2em;
}
.site-main .documents .document {
  margin-bottom: 1em;
}
</style>
