'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reactElementInfo;

var _path = require('path');

function reactElementInfo(_ref) {
  var t = _ref.types;

  var defaultPrefix = 'data-qa';
  var prefix = void 0;
  var filenameAttr = void 0;
  var nodeNameAttr = void 0;

  var visitor = {
    Program: function Program(path, state) {
      if (state.opts.prefix) {
        prefix = 'data-' + state.opts.prefix;
      } else {
        prefix = defaultPrefix;
      }
      filenameAttr = prefix + '-file';
      nodeNameAttr = prefix + '-node';
    },
    JSXOpeningElement: function JSXOpeningElement(path, state) {
      var openingElement = path.container.openingElement;
      var attributes = openingElement.attributes;

      var newAttributes = [];
      var exludedNames = state.opts.exclude || []
  
      if(openingElement.name.name === undefined || exludedNames.indexOf(openingElement.name.name) > -1) {
        return
      }
  
      if (openingElement.name && openingElement.name.name) {
        newAttributes.push(t.jSXAttribute(t.jSXIdentifier(nodeNameAttr), t.stringLiteral(openingElement.name.name)));
      }

      var name = void 0;
      if (state.file && state.file.opts) {
        if (state.file.opts.basename) {
          name = state.file.opts.basename;
        } else if (state.file.opts.filename) {
          name = (0, _path.basename)(state.file.opts.filename, (0, _path.extname)(state.file.opts.filename));
        }
      }

      if (name) {
        newAttributes.push(t.jSXAttribute(t.jSXIdentifier(filenameAttr), t.stringLiteral(name)));
      }

      attributes.push.apply(attributes, newAttributes);
    }
  };

  return {
    visitor: visitor
  };
} //  weak