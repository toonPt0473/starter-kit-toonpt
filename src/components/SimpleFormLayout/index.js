/**
*
* SimpleFormLayout
*
*/

import React from 'react'
// import styled from 'styled-components';
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Button, Form } from 'antd'

class SimpleFormLayout extends React.PureComponent { // eslint-disable-line
  handleSubmit = (values) => {
    const {
      onSubmit,
    } = this.props
    onSubmit(values)
  }
  render
  render() {
    const {
      children,
      record,
      renderAction,
      error,
      validate,
      autoSave,
      // ...componentRestProps,
    } = this.props
    return (
      <Formik
        initialValues={record}
        // style={{ flex: 1, ...this.props.style }}
        validate={validate}
        render={({
          setFieldValue,
          values,
          errors,
          touched,
          // validateForm,
          isValid,
          // ...formikRestProps
        }) => (
          <Form>
            {React.Children.map(children, child => {
              const {
                name,
                ...rest
              } = child.props
              // console.log(name, errors,touched,values)
              return React.cloneElement(child, {
                onChange: (value) => {
                  setFieldValue(name, value)
                  if (autoSave) {
                    const v = {
                      ...values,
                      [name]: value,
                    }
                    this.handleSubmit(v)
                  }
                },
                value: values[name],
                touched: touched[name],
                error: errors[name],
                ...rest,
              })
            })}
            {
              autoSave
                ? null
                : (
                    renderAction
                      ? renderAction({
                        values,
                        errors,
                        touched,
                        isValid,
                        onSubmit: () => isValid && this.handleSubmit(values),
                      })
                      : (
                        <Button
                          disabled={!isValid}
                          onClick={() => isValid && this.handleSubmit(values)}
                        >
                          Submit
                        </Button>
                      )
                  )
            }
            {
              error ? <h4>{error}</h4> : null
            }
          </Form>
        )}
      />
    )
  }
}

SimpleFormLayout.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  renderAction: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  record: PropTypes.shape({

  }),
  error: PropTypes.any, // eslint-disable-line
  validate: PropTypes.any, // eslint-disable-line
  autoSave: PropTypes.bool,
}
SimpleFormLayout.defaultProps = {
  renderAction: null,
  record: {},
  autoSave: false,
}
export default SimpleFormLayout
