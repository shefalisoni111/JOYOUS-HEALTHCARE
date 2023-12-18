<template>
  <div>
    <div id="editparent">
      <div id="editControls">
        <div class="btn-group">
          <a
            class="btn btn-xs btn-default"
            data-role="undo"
            href="#"
            title="Undo"
            ><i class="bi bi-arrow-counterclockwise"></i
          ></a>
          <a
            class="btn btn-xs btn-default"
            data-role="redo"
            href="#"
            title="Redo"
            ><i class="bi bi-arrow-clockwise"></i
          ></a>
        </div>
        <div class="btn-group">
          <a
            class="btn btn-xs btn-default"
            data-role="bold"
            href="#"
            title="Bold"
            ><i class="bi bi-type-bold"></i
          ></a>
          <a
            class="btn btn-xs btn-default"
            data-role="italic"
            href="#"
            title="Italic"
            ><i class="bi bi-type-italic"></i
          ></a>
          <a
            class="btn btn-xs btn-default"
            data-role="underline"
            href="#"
            title="Underline"
            ><i class="bi bi-type-underline"></i
          ></a>
          <a
            class="btn btn-xs btn-default"
            data-role="strikeThrough"
            href="#"
            title="Strikethrough"
            ><i class="bi bi-type-strikethrough"></i
          ></a>
        </div>
        <div class="btn-group">
          <a
            class="btn btn-xs btn-default"
            data-role="indent"
            href="#"
            title="Blockquote"
            ><i class="bi bi-text-indent-left"></i
          ></a>
          <a
            class="btn btn-xs btn-default"
            data-role="insertUnorderedList"
            href="#"
            title="Unordered List"
            ><i class="bi bi-list-ul"></i
          ></a>
          <a
            class="btn btn-xs btn-default"
            data-role="insertOrderedList"
            href="#"
            title="Ordered List"
            ><i class="bi bi-list-ol"></i
          ></a>
        </div>
        <div class="btn-group">
          <a
            class="btn btn-xs btn-default"
            data-role="h1"
            href="#"
            title="Heading 1"
            ><i class="bi bi-type-h1"></i><sup>1</sup></a
          >
          <a
            class="btn btn-xs btn-default"
            data-role="h2"
            href="#"
            title="Heading 2"
            ><i class="bi bi-type-h2"></i><sup>2</sup></a
          >
          <a
            class="btn btn-xs btn-default"
            data-role="h3"
            href="#"
            title="Heading 3"
            ><i class="bi bi-type-h3"></i><sup>3</sup></a
          >
          <a
            class="btn btn-xs btn-default"
            data-role="p"
            href="#"
            title="Paragraph"
            ><i class="bi bi-text-paragraph"></i
          ></a>
        </div>
      </div>
      <div id="editor" contenteditable></div>
      <textarea
        name="ticketDesc"
        id="editorCopy"
        required="required"
        style="display: none"
      ></textarea>
    </div>
  </div>
</template>

<script>
jQuery(document).ready(function ($) {
  $("#editControls a").click(function (e) {
    e.preventDefault();
    switch ($(this).data("role")) {
      case "h1":
      case "h2":
      case "h3":
      case "p":
        document.execCommand("formatBlock", false, $(this).data("role"));
        break;
      default:
        document.execCommand($(this).data("role"), false, null);
        break;
    }

    var textval = $("#editor").html();
    $("#editorCopy").val(textval);
  });

  $("#editor")
    .keyup(function () {
      var value = $(this).html();
      $("#editorCopy").val(value);
    })
    .keyup();

  $("#checkIt").click(function (e) {
    e.preventDefault();
    alert($("#editorCopy").val());
  });
});
</script>

<style scoped>
#editor {
  resize: vertical;
  overflow: auto;
  line-height: 1.5;

  background-image: none;
  border: 0;
  border: 1px solid #f0e5e5;
  min-height: 150px;
  box-shadow: none;
  padding: 8px 16px;
  margin: 0 auto;
  font-size: 14px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
}
#editor:focus {
  background-color: #f0f0f0;

  box-shadow: none;
  outline: 0 none;
}

/* ==========================================================================
   Buttons
   ========================================================================== */
.btn {
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 1em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: none;
  border-bottom: 0.15em solid black;
  padding: 0.65em 1.3em;
}
.btn-xs {
  font-size: 0.8em;
  padding: 0.6em 1.81em;
}

.btn-default {
  border-color: #d9d9d9;
}
.btn-default:hover {
  background: linear-gradient(#f2f2f2, #e6e6e6);
}

.btn-group > .btn:not(:last-child):not(.dropdown-toggle),
.btn-group > .btn.dropdown-toggle-split:first-child,
.btn-group > .btn-group:not(:last-child) > .btn {
  border-radius: 0;
}

.btn {
  border-radius: 0;
  border: 1px solid rgb(232, 229, 229);
}
</style>
