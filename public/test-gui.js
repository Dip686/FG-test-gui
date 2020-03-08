$('.ui.accordion')
  .accordion()
;
var dataEditor = CodeMirror(document.getElementsByClassName('editor')[0],{
  value: "  {enable: true, show: true}\n",
  mode: {name: 'javascript', json: true},
  lineNumbers: true,
  lineWrapping: true
});
dataEditor.setSize('100%', 600);
// holds number of config segments
var configSegmentCount = 1;
function showWidgetOrEditor (id, editorInstance) {
  let classStr,
    removeClassStr,
    widgets = document.getElementsByClassName('config-widget'),
    editors = document.getElementsByClassName('edit-config-window'),
    editIcon = document.getElementsByClassName('editBtn'),
    testIcon = document.getElementsByClassName('testBtn');

  for (let index = 0; index < configSegmentCount; index++) {
    if (index === editorInstance) {
      if (id === 1) {
        classStr = testIcon[index].parentElement.getAttribute('class');
        removeClassStr = editIcon[index].parentElement.getAttribute('class');
        classStr+= " active";
        removeClassStr = removeClassStr.replace('active', '');
        widgets[index].style.display = 'block';
        editors[index].style.display = 'none';
        testIcon[index].parentElement.setAttribute('class', classStr);
        editIcon[index].parentElement.setAttribute('class', removeClassStr);
      } else if (id === 2) {
        classStr = editIcon[index].parentElement.getAttribute('class');
        removeClassStr = testIcon[index].parentElement.getAttribute('class');
        classStr+= " active";
        removeClassStr = removeClassStr.replace('active', '');
        editors[index].style.display = 'block';
        widgets[index].style.display = 'none';
        dataEditor.refresh();
        editIcon[index].parentElement.setAttribute('class', classStr);
        testIcon[index].parentElement.setAttribute('class', removeClassStr);
        
      }
    }
  }

}