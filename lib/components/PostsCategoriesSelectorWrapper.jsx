import React, { PropTypes, Component } from 'react';
import FRC from 'formsy-react-components';
import Categories from 'meteor/nova:categories';
import { Components, registerComponent } from 'meteor/nova:core';

const Input = FRC.Input;

class PostsCategoriesSelectorWrapper extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleClearSelection = this.handleClearSelection.bind(this);
    
    const tags = props.value ? props.value.map((optionId, index) => {
      return {
        id: optionId,
        text: _.findWhere(props.options, {value: optionId}).name,
        type: _.findWhere(props.options, {value: optionId}).type,
      };
    }) : [];

    this.state = {
      tags: tags,
      suggestions: _.pluck(props.options, "name"),
      value: props.value || [],
    };
  }

  handleDelete(categoryType) {
    // react-tag-input gives us the index of the tag in its OWN list
    return index => {
      // only handle the delete of an existing tag 
      // note: index === -1 if you backspace on the empty input
      if (index >= 0) {
        // filter the tags to get the related list
        const selectedListTags = this.state.tags.filter(tag => tag.type === categoryType.value);
        
        // grab the tag to delete
        const selectedTag = selectedListTags[index];
        
        // create a new state :)
        const newTags = this.state.tags.filter(tag => tag.id !== selectedTag.id);
        const newValue = this.state.value.filter(v => v !== selectedTag.id);
        
        this.setState(prevState => ({
          tags: newTags,
          value: newValue,
        }));
      }
      
    }
  }

  handleAddition(tag) {

    // first, check if added tag is part of the possible options
    const option = _.findWhere(this.props.options, {name: tag});

    if (option) {

      // add tag to state (for tag widget)
      const tags = this.state.tags;
      
      tags.push({
        id: option.value,
        text: tag,
        type: option.type,
      });

      // add value to state (to store in db)
      const value = this.state.value;
      value.push(option.value);

      this.setState(prevState => ({
        tags,
        value,
      }));
    }

  }
  
  handleClearSelection(categoryType) {
    // filter and reorder the tags state
    const newCategoryTags = this.state.tags.filter(tag => tag.type !== categoryType.value)
    
    // recreate the value state based on the tags
    const newValue = newCategoryTags.map(tag => {
      const category = _.findWhere(this.props.options, {name: tag.text});
      return category.value;
    });
    
    this.setState(prevState => ({
      tags: newCategoryTags,
      value: newValue,
    }));
  }

  render() {
    
    // name = name of the field (= categories)
    // label = label of the field
    const {name, label, options} = this.props;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
        <div className="col-sm-9 tags-field-wrapper">
          {Categories.availableTypes.map((categoryType, index) => {
            
            // all categories of this type
            const categoriesOfThisType = options.filter(cat => cat.type === categoryType.value);
            
            // categories of this type selected
            let categoryTags = this.state.tags.filter(tag => tag.type === categoryType.value);
            
            // remaining suggestions considering the current selected categories of this type
            // ⚠️ can be mutated below: new competition selected gives only team related
            let suggestionsTags = categoriesOfThisType.filter(cat => !this.state.tags.find(tag => tag.id === cat.value));
            
            // in case we are dealing with teams, and one or more competitions are already selected, filter the teams tags to show only the attached teams
            if (categoryType.value === 'team') {
                // get the tags corresponding to the selected competitions
                const competitionsSelected = this.state.tags.filter(tag => tag.type === 'comp');
                
                if (competitionsSelected.length) {
                  // create an array of attached teams related to these competitions
                  const attachedTeamsAvailable = competitionsSelected.reduce((teams, comp) => {
                    // get the complete data about the competitions from the component options
                    const competitionCompleteData = options.find(cat => cat.value === comp.id);
                    
                    console.log('competitionCompleteData', competitionCompleteData);
                    
                    // extract the attached teams of this competition (default to [])
                    const { attachedTeams = [] } = competitionCompleteData;
                    
                    // add them to the accumulator
                    return [...teams, ...attachedTeams];
                  }, []);
                  
                  // mutate suggestions tags
                  suggestionsTags = attachedTeamsAvailable;
              }
            }
            
            return categoriesOfThisType.length ? (
              <Components.PostsCategoriesSelector
                key={index}
                categoryType={categoryType} // e.g. {value: "comp", label: "Competition"},
                tags={categoryTags}
                /*
                  tagsLimit={categoryType.value === 'comp' && 1} // tags limit set to 1 only for competitions 
                */
                categoriesSuggestions={suggestionsTags}
                handleDelete={this.handleDelete(categoryType)}
                handleAddition={this.handleAddition}
                handleClearSelection={this.handleClearSelection}
              />
            ) : <div className="tags-field" key={index}>No {categoryType.label}.</div>;
          })}
          <Input name={name} type="hidden" readOnly value={this.state.value} />
        </div>
      </div>
    );
  }
}

PostsCategoriesSelectorWrapper.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  label: React.PropTypes.string
}

registerComponent('PostsCategoriesSelectorWrapper', PostsCategoriesSelectorWrapper);
