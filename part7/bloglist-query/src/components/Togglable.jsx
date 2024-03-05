import { forwardRef, useImperativeHandle } from "react"
import { useState } from "react"
import PropTypes from 'prop-types'



const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showwhenVisible = {display: visible ? '': 'none'}
    
    const toggleVisiblity = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisiblity
      }
    })

    return (
      <div>
        <div style={hideWhenVisible}>
         <button onClick={toggleVisiblity} id="toggle-form">{props.buttonLabel}</button>
        </div>
        <div style={showwhenVisible}>
          {props.children}
          <button onClick={toggleVisiblity}>cancel</button>
        </div>
      </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
