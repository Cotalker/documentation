---
name: Bug report
about: 'Use this template to report a new bug'
title: 'Bug report: '
labels: Bug report
assignees:
     - guillevalin
     - jdurandpaz
body:
     - type: markdown
     attributes:
          value: |
               If you are looking for support, please check out our [Documentation](https://doc.cotalker.com/)
               or consider asking a question on [Discussions](https://github.com/Cotalker/documentation/discussions)

               If you have found a bug or if our documentation doesn't have an answer
               to what you're looking for, then fill out the template below.

     - type: dropdown
          id: affected_system
          attributes:
          label: Affected system
          description: Please let us know which of our systems is affecting your Cotalker experience
               multiple: true
          validations:
               required: true
          options:
               - Cotalker Web Application
               - Cotalker Android Application
               - Cotalker iOS Application
               - Cotalker Api
     - type: dropdown
          id: affected_system
          attributes:
               label: Affected environment
               description: Only change this answer if you have access to a special Cotalker environment such as Staging or Development, please indicate which environment it corresponds to.
          multiple: true
          required: true
          options:
               - Production
               - Staging
               - Development

     - type: input
          id: app_version
          attributes:
               label: App version
               description: If this bug occurs in our web application, android or ios, please indicate the version
               placeholder: "16.4.5"
          validations:
               required: true

     - type: textarea
          id: details
          attributes:
               label: Details
               description: Further details about the bug
               placeholder: |
                    When I try to send a message...
          validations:
               required: true

     - type: textarea
          id: steps_reproduce
          attributes:
               label: Steps to reproduce
               description: Please tell us exactly how to reproduce the problem you are running into
               placeholder: |
                    1. ...
                    2. ...
                    3. ...
          validations:
               required: true

     - type: textarea
          id: expected_result
          attributes:
               label: Expected result
               description: Please explain to us what the expected result is after performing the steps described in the previous point
               placeholder: |
                    After pressing the "Send" button the message should
          validations:
               required: true
  
       - type: textarea
          id: additional_data
          attributes:
               label: Additional data
               description: Please, provide us with any additional information that you think may help our team to identify and correct the issue you are reporting
               placeholder: |
                    - Company: ...<!-- id:... domain:... -->
                    - Group: ...<!-- id:... code:... -->
                    - Task: ...<!-- id:... code:... -->
                    - Channel: ...<!-- id:... code:... -->
                    - User: ...<!-- id:... email:... -->
          validations:
               required: true

     - type: markdown
          attributes:
          value: "Thanks for reporting a bug!"
---
