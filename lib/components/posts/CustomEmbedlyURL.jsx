import { Components, registerComponent } from 'meteor/vulcan:core';
import { withMutation } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import FRC from 'formsy-react-components';

const Input = FRC.Input;

class CustomEmbedlyURL extends Component {

  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.successEmbedlyCallback = this.successEmbedlyCallback.bind(this);

    // if a value is passed by the form or a title is already present in the document, consider that embedly data has been already fetched to avoid overwriting the user data unexpectedly
    const existingDocument = props.value || props.document && props.document.title;

    this.state = {
      loading: false,
      embedlyFetched: existingDocument ? true : false,
    };
  }

  // clean the media property of the document if it exists: this field is handled server-side in an async callback
  async componentDidMount() {
    try {
      if (this.props.document && !_.isEmpty(this.props.document.media)) {
        await this.context.updateCurrentValues({media: {}});
      }
    } catch(error) {
      console.error('Error cleaning "media" property', error)
    }
  }

  // called whenever the URL input field loses focus
  async handleBlur() {
    if (!this.state.loading) {
      try {
        // value from formsy input ref
        const url = this.input.getValue();

        if (url.length) {
          await this.setState({loading: true});

          // the URL has changed, get new title, body, thumbnail & media for this url
          const result = await this.props.getEmbedlyData({url});

          // uncomment for debug
          console.log('Embedly Data', result);

          await this.context.updateCurrentValues({
            title: result.data.getEmbedlyData.title || "",
            body: result.data.getEmbedlyData.description || "",
            thumbnailUrl: result.data.getEmbedlyData.thumbnailUrl || "",
          });

          // this could be a modification on the core EmbedlyURL
          await this.successEmbedlyCallback(result);

          await this.setState({
            loading: false,
            embedlyFetched: true,
          });

          await this.context.clearForm({ clearErrors: true }); // remove errors & keep the current values
        }
      } catch(error) {
        await this.setState({loading: false});
        console.error(error); // eslint-disable-line
        this.context.throwError(error.message);
      }
    }
  }

  async successEmbedlyCallback(result) {
    try {
      if (result.data.getEmbedlyData.media && result.data.getEmbedlyData.media.type === 'video') {
        await this.context.updateCurrentValues({postType: 'video'}); // update post type if it's a video
      }
    } catch(e) {
      console.log(e);
    }
  }

  render() {

    const wrapperStyle = {
      position: "relative"
    };

    const loadingStyle = {
      position: "absolute",
      pointerEvents: "none",
      top: "15px",
      right: "30px"
    };

    loadingStyle.display = this.state.loading ? "block" : "none";

    // see https://facebook.github.io/react/warnings/unknown-prop.html
    const {document: currentDoc, control, getEmbedlyData, ...rest} = this.props; // eslint-disable-line no-unused-vars
    const onBlur = this.state.embedlyFetched ? f => f : this.handleBlur;

    const buttonAfter = this.state.embedlyFetched ? (
      <button className="btn btn-default" type="button" onClick={this.handleBlur}>
        <Components.Icon name={this.state.loading ? "spinner" : "refresh"} />
      </button>
    ) : null;

    return (
      <div className="embedly-url-field" style={wrapperStyle}>
        <Input
          {...rest}
          onBlur={onBlur}
          type="text"
          ref={ref => this.input = ref}
          buttonAfter={buttonAfter}
        />
        {!this.state.embedlyFetched && <div className="embedly-url-field-loading" style={loadingStyle}><Components.Loading /></div>}
      </div>
    );
  }
}

CustomEmbedlyURL.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  label: React.PropTypes.string
}

CustomEmbedlyURL.contextTypes = {
  updateCurrentValues: React.PropTypes.func,
  throwError: React.PropTypes.func,
  clearForm: React.PropTypes.func,
}

registerComponent('CustomEmbedlyURL', CustomEmbedlyURL, withMutation({name: 'getEmbedlyData', args: {url: 'String'}}));
