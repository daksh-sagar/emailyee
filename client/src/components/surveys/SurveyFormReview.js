import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
  const fields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {fields}
      <div />
      <button onClick={onCancel} className="yellow darken-3 btn-flat">
        Go back
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
