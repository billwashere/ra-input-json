import React from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import { Field } from 'redux-form';
import uniqueId from 'lodash.uniqueid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import defaultProps from 'recompose/defaultProps'
import PropTypes from 'prop-types';
import { addField } from 'ra-core';

class RaJSONEditor extends React.Component {
  render(){
    const {
      source,
      ...rest
    } = this.props;
    return (
      <div>
        {rest.viewOnly ? (<JSONInput
              id = {`${uniqueId}-outer-box`}
              placeholder = { (rest.record[source] && JSON.parse(rest.record[source])) || null}
              theme = "light_mitsuketa_tribute"
              locale = { locale }
              height = '250px'
              width="100%"
              {...rest}
            />) : (<Field name={source} component={this.renderTextField}  label="jsonEditor" {...rest} />)}
      </div>
    )
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
    const {
      source,
      width,
      labelStyle,
      required,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        <Typography component="span" style={labelStyle || {marginTop: "8px", marginBottom: "8px", color: "#919191", fontSize: ".8e", lineHeight: "1em"}}>
        {label} {required && " *"}
        </Typography>
          <Paper style={{width: width || "50%"}}>
            <JSONInput
              id = {`${uniqueId}-outer-box`}
              placeholder = { (input.value && JSON.parse(input.value)) || null}
              theme = "light_mitsuketa_tribute"
              locale = { locale }
              height = '250px'
              width="100%"
              onChange={this.changeHandler(input.onChange)}
              onKeyPressUpdate={false}
              {...rest}
            />
          </Paper>
      </React.Fragment>
    );
  }

  changeHandler = onChange => ({json, error, jsObject}) => {
    error === false && onChange(jsObject ? JSON.stringify(jsObject) : '');
  }

}

RaJSONEditor.propTypes = {
  source: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
}

export const JSONEView = defaultProps({viewOnly: true})(RaJSONEditor);
export const JSONEditor = addField(RaJSONEditor);
