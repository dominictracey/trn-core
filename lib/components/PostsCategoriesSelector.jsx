import React, { PropTypes, Component } from 'react';
import ReactTagInput from 'react-tag-input';

const ReactTags = ReactTagInput.WithContext;

class PostsCategoriesSelector extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    
    const tags = props.value ? props.value.map(optionId => {
      return {
        id: optionId,
        text: _.findWhere(props.categories, {value: optionId}).name
      };
    }) : [];

    this.state = {
      tags: tags,
      suggestions: _.pluck(props.categories, "name"),
      value: props.value || []
    };
  }

  handleDelete(i) {

    const tags = this.state.tags;
    tags.splice(i, 1);

    const value = this.state.value;
    value.splice(i,1);

    this.setState({
      tags: tags,
      value: value
    });
  }

  handleAddition(tag) {

    // first, check if added tag is part of the possible options
    const option = _.findWhere(this.props.categories, {name: tag});

    if (option) {

      // add tag to state (for tag widget)
      const tags = this.state.tags;
      tags.push({
          id: tags.length + 1,
          text: tag
      });

      // add value to state (to store in db)
      const value = this.state.value;
      value.push(option.value);

      this.setState({
        tags: tags,
        value: value
      });
    }

  }

  render() {

    const {categoryType, categories } = this.props;

    return (
      <div className="tags-field">
        <ReactTags
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          minQueryLength={1}
          placeholder={`Add a ${categoryType.label}`}
        />
      </div>
    );
  }
}

PostsCategoriesSelector.propTypes = {
  name: React.PropTypes.string,
  categoryType: React.PropTypes.object,
  categories: React.PropTypes.any,
  value: React.PropTypes.any,
}

export default PostsCategoriesSelector;
