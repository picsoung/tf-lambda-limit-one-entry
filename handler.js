'use strict';
 const tf = require('@typeform/api-client')
 const typeform = tf.createClient({
   token: process.env.TF_TOKEN
 })

module.exports.addLimitLogic = async (event, context, callback) => {
  console.log(JSON.parse(event.body))
  // extract answer to be limited
  const evt = JSON.parse(event.body)
  const answer = evt.form_response.answers.find(a => a.field.id === process.env.FIELD_ID)
  const type = answer.type
  const new_value = answer[ type ]

  const form_definition = await typeform.forms.get({uid: process.env.FORM_ID})
  let { logic = {} } = form_definition

  let new_action = {
      "action": "jump",
      "details": {
        "to": {
          "type": "field",
          "value": process.env.ALREADY_FILLED_FIELD_REF
        }
      },
      "condition": {
        "op": "equal",
        "vars": [
          {
            "type": "field",
            "value": process.env.FIELD_REF
          },
          {
            "type": "constant",
            "value": new_value
          }
        ]
      }
    }

  //extract logic
  if(logic.length){ //existing logic definition

    // extract logic for this field
    let jump = logic.find(l => l.type==="field" && l.ref===process.env.FIELD_REF)

    // add condition to this jump
    jump.actions.unshift(new_action)
  }else{
    form_definition.logic = {
      type: "field",
      ref:  process.env.FIELD_ID,
      actions:[new_action]
    }
  }

  typeform.forms.update({
    uid: process.env.FORM_ID,
    override: true,
    data: form_definition
  }).then(response => {
      console.log("RESPONSE", response)
  }).catch(err => {
      console.log('err', err)
  })

  const resp = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Form updated',
      input: event.body,
    }),
  };

  callback(null, resp);
};
