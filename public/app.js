"use strict";

/* global enigma schema */
var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/dcde8122-0c49-4cea-a935-d30145015cd6'
});
session.open().then(function (global) {
  console.log(global);
  global.openDoc('dcde8122-0c49-4cea-a935-d30145015cd6').then(function (app) {
    app.getField('Region').then(function (field) {
      field.selectValues([{
        qtext: 'East'
      }]).then(function (res) {
        console.log(res);
      });
    });
  });
});
