import React, { PropTypes, Component } from 'react';
import FRC from 'formsy-react-components';
import Categories from 'meteor/nova:categories';
import PostsCategoriesSelector from './PostsCategoriesSelector.jsx';

const Input = FRC.Input;

class Tags extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);

    const tags = props.value ? props.value.map(optionId => {
      return {
        id: optionId,
        text: _.findWhere(props.options, {value: optionId}).label
      };
    }) : [];

    this.state = {
      tags: tags,
      suggestions: _.pluck(props.options, "label"),
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
    const option = _.findWhere(this.props.options, {label: tag});

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
    
    // name = name of the field (= categories)
    // label = label of the field
    const {name, label, options} = this.props;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
        <div className="col-sm-9 tags-field-wrapper">
          {Categories.availableTypes.map((categoryType, index) => (
              <PostsCategoriesSelector
                key={index}
                categoryType={categoryType} // e.g. {value: "comp", label: "Competition"},
                categories={options.filter(cat => cat.type === categoryType.value)}
              />
            )
          )}
          <Input name={name} type="hidden" readOnly value={this.state.value} />
        </div>
      </div>
    );
  }
}

Tags.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  label: React.PropTypes.string
}

export default Tags;
