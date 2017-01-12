import React, { PropTypes, Component } from 'react';
import ReactTagInput from 'react-tag-input';
import { Button } from 'react-bootstrap';

import { Components, registerComponent } from 'meteor/nova:core';

const ReactTags = ReactTagInput.WithContext;

const PostsCategoriesSelector = (props, context) => {
  
  const { 
    categoryType, // used for the label
    tags, // current tags to show
    categoriesSuggestions, // used for suggestions
    handleDelete, // from the wrapper
    handleAddition, // from the wrapper
    handleClearSelection,
    tagsLimit,
  } = props;

  // show the clear selection if there is no more suggestion or if the tags limit has been reached
  const limitReached = categoriesSuggestions.length === 0 || (typeof tagsLimit === 'number' && tags.length >= tagsLimit);

  return (
    <div className={`tags-field ${limitReached ? "tags-field--full" : ""}`}>
      <ReactTags
        autofocus={false}
        tags={tags}
        suggestions={_.pluck(categoriesSuggestions, "name")}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        minQueryLength={1}
        placeholder={`Add a ${categoryType.label}`}
        readOnly={limitReached}
      />
      {limitReached ? <Button className="tags-field-clear" bsSize="small" bsStyle="primary" onClick={() => handleClearSelection(categoryType)}><Components.Icon name="close" /></Button>: null}
    </div>
  );
}

PostsCategoriesSelector.propTypes = {
  name: React.PropTypes.string,
  categoryType: React.PropTypes.object,
  categoriesSuggestions: React.PropTypes.array,
  value: React.PropTypes.any,
  tags: React.PropTypes.any,
}

registerComponent('PostsCategoriesSelector', PostsCategoriesSelector);
