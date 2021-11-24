const validate = values => {
    const errors = {}
    console.log(values)
    // if(!values.title) {
    //   errors.title = 'Required'
    // }
    // if(!values.createdBy) {
    //     errors.createdBy = 'Required'
    //   }
    // if (!values.description || !values.description.length) {
    //   errors.description = { _error: 'At least one field must be entered' }
    // } else {
    //   const descriptionArrayErrors = []
    //   values.description.forEach((description, descriptionIndex) => {
    //     const descErrors = {}
    //     if (!description || !description.name) {
    //         descErrors.name = 'Name Field  cannot be empty'
    //       descriptionArrayErrors[descriptionIndex] = descErrors
    //     }
    //     if (!description || !description.mainDesc) {
    //         descErrors.mainDesc = 'Description Field cannot be empty'
    //         descriptionArrayErrors[descriptionIndex] = descErrors
    //     }
    //   })
    //   if(descriptionArrayErrors.length) {
    //     errors.description = descriptionArrayErrors
    //   }
    // }
    return errors
  }
  
  export default validate