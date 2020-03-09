$('.ui.accordion')
  .accordion({
    exclusive: false
  })
;
$('.ui.selection')
  .dropdown()
;
var dataEditor = CodeMirror(document.getElementsByClassName('editor')[0],{
  value: "  {enable: true, show: true}\n",
  mode: {name: 'javascript', json: true},
  lineNumbers: true,
  lineWrapping: true,
  theme: 'mdn-like'
});
dataEditor.setSize('100%', 700);
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
function createGrid(ele, ds, config) {
  return new FusionGrid(ele, ds, config);
}
function updateGrid () {
  if (currentGridConfig.columns) firstGrid.setColumns(currentGridConfig.columns);
  if (currentGridConfig.rowoptions) firstGrid.setRowOptions(currentGridConfig.rowoptions);
  if (currentGridConfig.layout) firstGrid.setLayout(currentGridConfig.layout);
  if (currentGridConfig.pagination) firstGrid.setPagination(currentGridConfig.pagination);
}
function getIndentedText (val) {
  return beautifier.js(val, { indent_size: 2 });
}
var firstGridContainer = document.getElementsByClassName('grid-container')[0],
  dsObj = new FusionDataStore(),
  dtObj = dsObj.createDataTable(data, schema),
  firstConfig = {},
  columnLength,
  currentGridConfig,
  firstGrid = createGrid(firstGridContainer, dtObj, firstConfig);

// only for the first time
firstGrid.render();
columnLength = firstGrid._parsedGridConfig.columns.length;
currentGridConfig = JSON.parse(JSON.stringify(firstGrid._parsedGridConfig));
dataEditor.setValue(getIndentedText(JSON.stringify(currentGridConfig)));


function updateConfig (e) {
  let key = e.target.dataset.value,
    value;
  key = key && +key;
  if (e.target.type === "checkbox") {value = e.target.checked;}
  switch(key) {
    case 2:
        if(value) {
          let columns = currentGridConfig.columns;
          for (let index = 0; index < columns.length; index++) {
            columns[index].headertext = columns[index].field.toUpperCase();
          }
        } else {
          let columns = currentGridConfig.columns;
          for (let index = 0; index < columns.length; index++) {
            if(columns[index].headertext) delete columns[index].headertext;
          }
        }
      break;
    case 3:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          columns[index].class = 'fg-column-basic';
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          if(columns[index].class) delete columns[index].class;
        }
      }
      break;
    case 4:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          columns[index].style = {'background-color': '#ffdbe7'};
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          if(columns[index].style) delete columns[index].style;
        }
      }
      break;
    case 5:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          columns[index].headerclass = 'fg-column-header';
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          if(columns[index].headerclass) delete columns[index].headerclass;
        }
      }
      break;
    case 6:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          columns[index].headerstyle = {'background-color': '#ff97b9'};
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          if(columns[index].headerstyle) delete columns[index].headerstyle;
        }
      }
      break;
    case 7:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          columns[index].cellclass = 'fg-column-cell';
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          if(columns[index].cellclass) delete columns[index].cellclass;
        }
      }
      break;
    case 8:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          columns[index].cellstyle = {'background-color': '#eaffeb'};
        }
        columns[4].cellstyle = function (params) {
          if (params.cellValue.toLowerCase() === 'female') {
            return {'background-color': '#ff8899'};
          } else {
            return {'background-color': '#5fbcf3'};
          }
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 0; index < columns.length; index++) {
          if(columns[index].cellstyle) delete columns[index].cellstyle;
        }
      }
      break;
    case 9:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 1; index < columns.length; index++) {
          columns[index].width = 65;
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 1; index < columns.length; index++) {
          if(columns[index].width) delete columns[index].width;
        }
      }
      break;
    case 10:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 1; index < columns.length; index++) {
          columns[index].minwidth = 100;
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 1; index < columns.length; index++) {
          if(columns[index].minwidth) delete columns[index].minwidth;
        }
      }
      break;
    case 11:
      if(value) {
        let columns = currentGridConfig.columns;
        for (let index = 1; index < columns.length; index++) {
          columns[index].maxwidth = 150;
        }
      } else {
        let columns = currentGridConfig.columns;
        for (let index = 1; index < columns.length; index++) {
          if(columns[index].maxwidth) delete columns[index].maxwidth;
        }
      }
      break;
    case 12:
      if(value) {
        let columns = currentGridConfig.columns;
        columns[0].formatter = function (params) {
          return '$' + parseFloat(params.cellValue).toFixed(2);
        }
      } else {
        let columns = currentGridConfig.columns;
        if(columns[0].formatter) delete columns[0].formatter;
      }
      break;
    case 13:
      if(value) {
        let columns = currentGridConfig.columns;
        columns[3].type='html';
        columns[3].template = function (params) {
          return (`<span>
            <i class="mail icon testBtn"></i> ${params.cellValue}
          </span>`);
        }
      } else {
        let columns = currentGridConfig.columns;
        if(columns[3].type) delete columns[3].type;
        if(columns[3].template) delete columns[3].template;
      }
      break;
    case 14:
      if(value) {
        let columns = currentGridConfig.columns;
        columns[0].type='chart';

      } else {
        let columns = currentGridConfig.columns;
        if(columns[0].type) delete columns[0].type;
      }
      break;
    default: break;
  }
  updateGrid();
  dataEditor.setValue(getIndentedText(JSON.stringify(currentGridConfig)));
}