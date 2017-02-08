import { registerComponent, Components, getActions } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import FRC from 'formsy-react-components';
import { connect } from 'react-redux'

const Input = FRC.Input;

class PostsMatchIdField extends Component {

  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      loading: false,
      value: props.value || '',
    }
    this.prefillFields = this.prefillFields.bind(this)
  }

  prefillFields(match) {
    // note: current values have more power than autofilled values
    // see https://github.com/TelescopeJS/Telescope/blob/master/packages/nova-forms/lib/Form.jsx#L390-L394
    this.context.updateCurrentValues({
      title: match.displayName,
      postType: 'match',
    });
    this.setState({
      loading: false,
    })
  }

  // called whenever the URL input field loses focus
  async handleBlur() {
    const { matches, loadMatch } = this.props
    const id = this.input.getValue();

    if (id && id.length) {

      this.setState({
        loading: true,
      })

      // do we need to fetch this match?
      if (!matches || !matches[id]) {
        await loadMatch(id)
      }
      this.prefillFields(this.props.matches[id])
    }
  }

  render() {

    const Loading = Components.Loading;

    const wrapperStyle = {
      position: "relative"
    };

    const loadingStyle = {
      position: "absolute",
      pointerEvents: "none",
      top: "15px",
      right: "15px"
    };

    loadingStyle.display = this.state.loading ? "block" : "none";

    // see https://facebook.github.io/react/warnings/unknown-prop.html
    const {document, updateCurrentValues, control, name, label, value} = this.props; // eslint-disable-line

    return (
      <div className="embedly-url-field" style={wrapperStyle}>
        <Input
          value={this.state.value}
          label={label}
          name={name}
          onBlur={this.handleBlur}
          type="text"
          ref={ref => this.input = ref}
          placeholder="Enter a TRN Match Id here."
        />
        <div className="embedly-url-field-loading" style={loadingStyle}>
          <Loading />
        </div>
      </div>
    );
  }
}

PostsMatchIdField.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  label: React.PropTypes.string,
  matches: React.PropTypes.object,
  dispatch: React.PropTypes.func,
}

PostsMatchIdField.contextTypes = {
  updateCurrentValues: React.PropTypes.func,
  throwError: React.PropTypes.func,
  actions: React.PropTypes.object,
}

const mapStateToProps = ({entities: { matches }}) => ({matches})
const mapDispatchToProps = dispatch => bindActionCreators({loadMatch: getActions().loadMatch}, dispatch);

// note: let's stick to one way to use components in the app :)
registerComponent('PostsMatchIdField', PostsMatchIdField, connect(mapStateToProps, mapDispatchToProps));
