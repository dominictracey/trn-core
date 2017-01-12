import React, { PropTypes, Component } from 'react';
import ReactTagInput from 'react-tag-input';

import { Components, registerComponent } from 'meteor/nova:core';

const ReactTags = ReactTagInput.WithContext;

const CategoriesAttachedTeams = (props, context) => props.document && props.document.attachedTeams ? (
  <div className="form-group row">
    <label className="control-label col-sm-3">{props.label}</label>
    <div className="col-sm-9">
      <div className="tags-field">
        <ReactTags
          tags={props.document.attachedTeams.map((team,index) => ({id: index+1,  text: team.name}))}
          handleAddition={f => f}
          handleDelete={f => f}
          readOnly={true}
        />
      </div>
    </div>
  </div>
) : null;

CategoriesAttachedTeams.propTypes = {
  label: React.PropTypes.string,
  document: React.PropTypes.object,
}

registerComponent('CategoriesAttachedTeams', CategoriesAttachedTeams);
