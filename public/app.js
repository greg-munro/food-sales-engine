"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* global enigma schema Filter include Hypercube */
var Filter = /*#__PURE__*/function () {
  function Filter(elementId, options) {
    _classCallCheck(this, Filter);

    var DEFAULT = {};
    this.elementId = elementId;
    this.options = _extends({}, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.innerHTML = "<ul id='".concat(this.elementId, "_list'></ul>");
      this.options.model.on('changed', this.render.bind(this));
      this.render();
    } else {
      console.error("no element found with id - ".concat(this.elementId));
    }
  }

  _createClass(Filter, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('list-item')) {
        var elemNumber = event.target.getAttribute('data-elem');
        this.options.model.selectListObjectValues('/qListObjectDef', [+elemNumber], true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.options.model.getLayout().then(function (layout) {
        var html = layout.qListObject.qDataPages[0].qMatrix.map(function (row) {
          return "<li data-elem=\"".concat(row[0].qElemNumber, "\" class='list-item state-").concat(row[0].qState, "'>").concat(row[0].qText, "</li>");
        }).join('');
        var el = document.getElementById("".concat(_this.elementId, "_list"));

        if (el) {
          el.innerHTML = html;
        }
      });
    }
  }]);

  return Filter;
}();

var Hypercube = /*#__PURE__*/function () {
  function Hypercube(elementId, options) {
    _classCallCheck(this, Hypercube);

    var DEFAULT = {};
    this.elementId = elementId;
    this.options = _extends({}, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.innerHTML = "<table id='".concat(this.elementId, "_table'></table>");
      this.options.model.on('changed', this.render.bind(this));
      this.render();
    } else {
      console.error("no element found with id - ".concat(this.elementId));
    }
  }

  _createClass(Hypercube, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('table-row')) {
        var elemNumber = event.target.getAttribute('data-elem');
        this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [+elemNumber], true).then(function (res) {}, function (error) {
          console.log(error, 'error');
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.options.model.getLayout().then(function (layout) {
        var html = '';
        layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (row) {
          html += '<tr>';
          html += row.map(function (cell) {
            return "<td data-elem=\"".concat(cell.qElemNumber, "\"class=\"table-row\">").concat(cell.qText, "</td>");
          }).join('');
          html += '</tr>';
        });
        var el = document.getElementById("".concat(_this2.elementId, "_table"));

        if (el) {
          el.innerHTML = html;
        }
      });
    }
  }]);

  return Hypercube;
}();
/* global Chart */


var labels = ['Carrot', 'Whole Wheat', 'Chocolate Chip', 'Arrowroot', 'Potato Chips', 'Oatmeal Raisin', 'Bran', 'Pretzels', 'Banana'];
var data = {
  labels: labels,
  datasets: [{
    label: 'Food Sales USA 2020-2021',
    backgroundColor: '#29AAF2',
    borderColor: 'rgb(255, 99, 132)',
    data: [7410.99, 3393.93, 4752.15]
  }]
};
var config = {
  type: 'bar',
  data: data,
  options: {}
};
var myChart = new Chart(document.getElementById('myChart'), config);
var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/dcde8122-0c49-4cea-a935-d30145015cd6'
});
session.open().then(function (global) {
  global.openDoc('dcde8122-0c49-4cea-a935-d30145015cd6').then(function (app) {
    app.getField('Region').then(function (field) {});
    var def = {
      qinfo: {
        qType: 'this can be whatever I put'
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: ['Region']
        },
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 1,
          qHeight: 2
        }]
      }
    };
    app.createSessionObject(def).then(function (model) {
      console.log(model);
      var f = new Filter('filter1', {
        model: model
      });
    });
    var def2 = {
      qInfo: {
        qType: 'myObject'
      },
      qHyperCubeDef: {
        qDimensions: [{
          qDef: {
            qFieldDefs: ['Product']
          }
        }],
        qMeasures: [{
          qDef: {
            qDef: 'Sum(TotalPrice)',
            qLabel: 'Sales'
          }
        }],
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 2,
          qHeight: 10
        }]
      }
    };
    app.createSessionObject(def2).then(function (model) {
      var hyperCubeTest = new Hypercube('filter2', {
        model: model
      });
      console.log(hyperCubeTest); // model.getHyperCubeData('/qHyperCubeDef')
    });
  });
});
