'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Upload = require('./Upload');

var _Upload2 = _interopRequireDefault(_Upload);

var _uploadList = require('./uploadList');

var _uploadList2 = _interopRequireDefault(_uploadList);

var _getFileItem = require('./getFileItem');

var _getFileItem2 = _interopRequireDefault(_getFileItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//import { UploadProps } from './interface';

function T() {
  return true;
}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    percent: 0,
    originFileObj: file,
    status: null
  };
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
function genPercentAdd() {
  var k = 0.1;
  var i = 0.01;
  var end = 0.98;
  return function (s) {
    var start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start * 100;
  };
}

function Dragger(props) {
  return _react2["default"].createElement(Upload, _extends({}, props, { type: 'drag', style: { height: props.height } }));
}

var File = {
  uid: _propTypes2["default"].number,
  size: _propTypes2["default"].number,
  name: _propTypes2["default"].string,
  lastModifiedDate: _propTypes2["default"].date,
  url: _propTypes2["default"].string,
  status: _propTypes2["default"].oneOf(['error', 'success', 'done', 'uploading', 'removed']),
  percent: _propTypes2["default"].number,
  thumbUrl: _propTypes2["default"].string,
  originFileObj: File
};

var UploadChangeParam = {
  file: File,
  fileList: _propTypes2["default"].array,
  event: _propTypes2["default"].object
};

var propTypes = {
  type: _propTypes2["default"].oneOf(['drag', 'select']),
  name: _propTypes2["default"].string,
  defaultFileList: _propTypes2["default"].array,
  fileList: _propTypes2["default"].array,
  action: _propTypes2["default"].string,
  data: _propTypes2["default"].oneOfType([_propTypes2["default"].object, _propTypes2["default"].func]),
  headers: _propTypes2["default"].oneOfType([_propTypes2["default"].object, _propTypes2["default"].string]),
  showUploadList: _propTypes2["default"].bool,
  multiple: _propTypes2["default"].bool,
  accept: _propTypes2["default"].string,
  beforeUpload: _propTypes2["default"].func,
  onChange: _propTypes2["default"].func,
  listType: _propTypes2["default"].oneOf(['text', 'picture', 'picture-card']),
  className: _propTypes2["default"].string,
  onPreview: _propTypes2["default"].func,
  onRemove: _propTypes2["default"].func,
  supportServerRender: _propTypes2["default"].bool,
  style: _propTypes2["default"].object,
  disabled: _propTypes2["default"].bool,
  clsPrefix: _propTypes2["default"].string
};

var defaultProps = {
  clsPrefix: 'u-upload',
  type: 'select',
  multiple: false,
  action: '',
  data: {},
  accept: '',
  beforeUpload: T,
  showUploadList: true,
  listType: 'text', // or pictrue
  className: '',
  disabled: false,
  supportServerRender: true
};

var Upload = function (_Component) {
  _inherits(Upload, _Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onStart = function (file) {
      var targetItem = void 0;
      var nextFileList = _this.state.fileList.concat();
      if (file.length > 0) {
        targetItem = file.map(function (f) {
          var fileObject = fileToObject(f);
          fileObject.status = 'uploading';
          return fileObject;
        });
        nextFileList = nextFileList.concat(targetItem);
      } else {
        targetItem = fileToObject(file);
        targetItem.status = 'uploading';
        nextFileList.push(targetItem);
      }
      _this.onChange({
        file: targetItem,
        fileList: nextFileList
      });
      // fix ie progress
      //if (!(window as any).FormData) {
      if (!window.FormData) {
        _this.autoUpdateProgress(0, targetItem);
      }
    };

    _this.onSuccess = function (response, file) {
      _this.clearProgressTimer();
      try {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }
      } catch (e) {/* do nothing */
      }
      var fileList = _this.state.fileList;
      var targetItem = (0, _getFileItem2["default"])(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.status = 'done';
      targetItem.response = response;
      _this.onChange({
        file: targetItem,
        fileList: fileList
      });
    };

    _this.onProgress = function (e, file) {
      var fileList = _this.state.fileList;
      var targetItem = (0, _getFileItem2["default"])(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.percent = e.percent;
      _this.onChange({
        event: e,
        file: targetItem,
        fileList: _this.state.fileList
      });
    };

    _this.onError = function (error, response, file) {
      _this.clearProgressTimer();
      var fileList = _this.state.fileList;
      var targetItem = (0, _getFileItem2["default"])(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      _this.handleRemove(targetItem);
    };

    _this.handleManualRemove = function (file) {
      _this.refs.upload.abort(file);
      file.status = 'removed'; // eslint-disable-line
      _this.handleRemove(file);
    };

    _this.onChange = function (info) {
      if (!('fileList' in _this.props)) {
        _this.setState({ fileList: info.fileList });
      }

      var onChange = _this.props.onChange;
      if (onChange) {
        onChange(info);
      }
    };

    _this.onFileDrop = function (e) {
      _this.setState({
        dragState: e.type
      });
    };

    _this.state = {
      fileList: _this.props.fileList || _this.props.defaultFileList || [],
      dragState: 'drop'
    };
    return _this;
  }

  Upload.prototype.autoUpdateProgress = function autoUpdateProgress(_, file) {
    var _this2 = this;

    var getPercent = genPercentAdd();
    var curPercent = 0;
    this.progressTimer = setInterval(function () {
      curPercent = getPercent(curPercent);
      _this2.onProgress({
        percent: curPercent
      }, file);
    }, 200);
  };

  Upload.prototype.removeFile = function removeFile(file) {
    var fileList = this.state.fileList;
    var targetItem = (0, _getFileItem2["default"])(file, fileList);
    var index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      return fileList;
    }
    return null;
  };

  Upload.prototype.handleRemove = function handleRemove(file) {
    var onRemove = this.props.onRemove;
    if (onRemove) {
      onRemove(file);
    }
    var fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file: file,
        fileList: fileList
      });
    }
  };

  Upload.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || []
      });
    }
  };

  Upload.prototype.clearProgressTimer = function clearProgressTimer() {
    clearInterval(this.progressTimer);
  };

  Upload.prototype.render = function render() {
    var _classNames2;

    var _props = this.props,
        _props$clsPrefix = _props.clsPrefix,
        clsPrefix = _props$clsPrefix === undefined ? '' : _props$clsPrefix,
        showUploadList = _props.showUploadList,
        listType = _props.listType,
        onPreview = _props.onPreview,
        type = _props.type,
        disabled = _props.disabled,
        children = _props.children,
        className = _props.className;


    var rcUploadProps = (0, _objectAssign2["default"])({}, this.props, {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess
    });
    delete rcUploadProps.className;

    var uploadList = showUploadList ? _react2["default"].createElement(_uploadList2["default"], {
      listType: listType,
      items: this.state.fileList,
      onPreview: onPreview,
      onRemove: this.handleManualRemove
    }) : null;

    if (type === 'drag') {
      var _classNames;

      var dragCls = (0, _classnames2["default"])(clsPrefix, (_classNames = {}, _defineProperty(_classNames, clsPrefix + '-drag', true), _defineProperty(_classNames, clsPrefix + '-drag-uploading', this.state.fileList.some(function (file) {
        return file.status === 'uploading';
      })), _defineProperty(_classNames, clsPrefix + '-drag-hover', this.state.dragState === 'dragover'), _defineProperty(_classNames, clsPrefix + '-disabled', disabled), _classNames));
      return _react2["default"].createElement(
        'span',
        { className: className },
        _react2["default"].createElement(
          'div',
          {
            className: dragCls,
            onDrop: this.onFileDrop,
            onDragOver: this.onFileDrop,
            onDragLeave: this.onFileDrop
          },
          _react2["default"].createElement(
            _Upload2["default"],
            _extends({}, rcUploadProps, { ref: 'upload', className: clsPrefix + '-btn' }),
            _react2["default"].createElement(
              'div',
              { className: clsPrefix + '-drag-container' },
              children
            )
          )
        ),
        uploadList
      );
    }

    var uploadButtonCls = (0, _classnames2["default"])(clsPrefix, (_classNames2 = {}, _defineProperty(_classNames2, clsPrefix + '-select', true), _defineProperty(_classNames2, clsPrefix + '-select-' + listType, true), _defineProperty(_classNames2, clsPrefix + '-disabled', disabled), _classNames2));

    var uploadButton = _react2["default"].createElement(
      'div',
      { className: uploadButtonCls, style: { display: children ? '' : 'none' } },
      _react2["default"].createElement(_Upload2["default"], _extends({}, rcUploadProps, { ref: 'upload' }))
    );

    if (listType === 'picture-card') {
      return _react2["default"].createElement(
        'span',
        { className: className },
        uploadList,
        uploadButton
      );
    }
    return _react2["default"].createElement(
      'span',
      { className: className },
      uploadButton,
      uploadList
    );
  };

  return Upload;
}(_react.Component);

Upload.propTypes = propTypes;
Upload.defaultProps = defaultProps;
Upload.Dragger = Dragger;
exports["default"] = Upload;
module.exports = exports['default'];