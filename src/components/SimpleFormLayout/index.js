/**
*
* SimpleFormLayout
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'
import styles from './SimpleFormLayout.module.css'

const BtnContainer = styled.div`
  text-align: center;
  width: 100%;
`

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xl: { span: 24 },
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xl: { span: 24 },
    xs: { span: 24 },
    sm: { span: 24 },
  },
}
class SimpleFormLayout extends React.PureComponent { // eslint-disable-line
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      onSubmit,
    } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        onSubmit(values)
      }
    })
  }
  render
  render() {
    const {
      children,
      record,
      // renderAction,
      submitError,
      validate = {},
    } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form} >
        {
          React.Children.map(children, child => {
            const {
              name,
              label,
              required,
              type,
              ...rest
            } = child.props
            return (
              <FormItem
                {...formItemLayout}
                label={label}
              >
                {getFieldDecorator(name, {
                  initialValue: record[name],
                  rules: [{
                    required, message: `Please fill ${name}!`,
                  }, {
                    validator: validate[name],
                  }],
                })(React.cloneElement(child, {
                  ...rest,
                }))}
              </FormItem>
            )
          })
        }
        <BtnContainer>
          <Button
            htmlType="submit"
            type="primary"
            block
          >
            Submit
          </Button>
        </BtnContainer>
        {
          submitError && <h4>{submitError}</h4>
        }
      </Form>
    )
  }
}

SimpleFormLayout.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitError: PropTypes.string,
  renderAction: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  record: PropTypes.shape({

  }),
  validate: PropTypes.shape({

  }),
}
SimpleFormLayout.defaultProps = {
  renderAction: null,
  record: {},
  validate: {},
  submitError: null,
}
export default Form.create()(SimpleFormLayout)
