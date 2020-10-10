<template>
  <div>
    <tinymce-editor :init="init" v-model="contents"></tinymce-editor>
  </div>
</template>

<script>
// import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "@/assets/langs/zh_CN.js";
export default {
  data() {
    return {
      contents: "",
      init: {
        height: 500,
        language: "zh_CN",
        menubar: false,
        plugins: [
          "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize lineheight formatpainter axupimgs"
        ],
        toolbar: [
          "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
        styleselect formatselect fontselect fontsizeselect | bullist numlist  |fullscreen| blockquote subscript superscript removeformat | \
        table image media charmap emoticons hr pagebreak insertdatetime print preview  ",
          "bdmap indent2em lineheight formatpainter axupimgs  "
        ],
        images_upload_handler: function(blobInfo, success, failure) {
          var file = blobInfo.blob();
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function() {
            if (file.size > 1048576) {
              failure("图片请不要大于 1MB");
            } else {
              success(reader.result);
            }
          };
        }
      }
    };
  },
  components: {
    "tinymce-editor": Editor
  },
  methods: {}
};
</script>

<style></style>
