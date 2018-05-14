'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handDeleteAll = _this.handDeleteAll.bind(_this);
        _this.handlePickOption = _this.handlePickOption.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleSingleDelete = _this.handleSingleDelete.bind(_this);
        _this.state = {
            options: _this.props.options
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log('component mount1');
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                // do nothing at all
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            console.log('component update');
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'handDeleteAll',
        value: function handDeleteAll() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleSingleDelete',
        value: function handleSingleDelete(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'handlePickOption',
        value: function handlePickOption() {
            var index = Math.floor(Math.random() * this.state.options.length);
            alert(this.state.options[index]);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                return 'Please add a valid option';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'sorry this option already exist';
            }
            this.setState(function (prevState) {
                return { options: prevState.options.concat([option]) };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, null),
                React.createElement(Action, { hasOptions: this.state.options.length != 0, handlePickOption: this.handlePickOption }),
                React.createElement(Options, { options: this.state.options, deleteAll: this.handDeleteAll, removeOption: this.handleSingleDelete }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
    options: []
};

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: 'Indecision App',
    subtitle: 'Put you life in computer\'s hand'
};

var Action = function Action(props) {
    return React.createElement(
        'button',
        {
            disabled: !props.hasOptions,
            onClick: props.handlePickOption
        },
        'What should I do?'
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'Here are your Options'
        ),
        React.createElement(
            'button',
            { onClick: props.deleteAll },
            ' Remove All'
        ),
        React.createElement(
            'ol',
            null,
            props.options.map(function (option) {
                return React.createElement(Option, { key: option, option: option, removeOption: props.removeOption });
            })
        )
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'li',
            null,
            props.option
        ),
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.removeOption(props.option);
                }
            },
            'Remove'
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.addOption = _this2.addOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'addOption',
        value: function addOption(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);
            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { onSubmit: this.addOption },
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error,
                    ' '
                ),
                React.createElement('input', { type: 'text', name: 'option' }),
                React.createElement(
                    'button',
                    null,
                    ' Add Option'
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

var appRoot = document.getElementById('app');
ReactDOM.render(React.createElement(IndecisionApp, { options: [] }), appRoot);
