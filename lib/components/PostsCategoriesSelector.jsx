import React, { PropTypes, Component } from 'react';
import ReactTagInput from 'react-tag-input';
import { Button } from 'react-bootstrap';

import { Components } from 'meteor/nova:core';

const ReactTags = ReactTagInput.WithContext;

class PostsCategoriesSelector extends Component {

  constructor(props) {
    super(props);
  
    // this.state = {
    //   tags: props.tags,
    //   suggestions: _.pluck(props.categories, "name"),
    //   value: props.value || []
    // };
  }

  render() {

    const { 
      categoryType, // used for the label
      tags, // current tags to show
      categories, // used for suggestions
      value = [], 
      handleDelete, // from the wrapper
      handleAddition, // from the wrapper
      handleClearSelection,
    } = this.props;

    return (
      <div className={`tags-field ${!categories.length ? "tags-field--full" : ""}`}>
        <ReactTags
          autofocus={false}
          tags={tags}
          suggestions={_.pluck(categories, "name")}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          minQueryLength={1}
          placeholder={`Add a ${categoryType.label}`}
          readOnly={!categories.length}
        />
        {!categories.length ? <Button className="tags-field-clear" bsSize="small" bsStyle="primary" onClick={() => handleClearSelection(categoryType)} ref={categoryType}><Components.Icon name="close" /></Button>: null}
      </div>
    );
  }
}

PostsCategoriesSelector.propTypes = {
  name: React.PropTypes.string,
  categoryType: React.PropTypes.object,
  categories: React.PropTypes.any,
  value: React.PropTypes.any,
  tags: React.PropTypes.any,
}

export default PostsCategoriesSelector;
