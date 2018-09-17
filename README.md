# tf-lambda-limit-one-entry
Script to limit entry on a Typeform to one per email address.

# What does it do?
You want to avoid people filling twice the same Typeform?
Using this serverless function we will update logic block on a typeform. It adds a new constraint every time someone fills the form for the best time.
If they try again they will be redirected to an error screen.

# How to use it?
Pre-requesites:
- a Typeform account, create one [here](https://)
- an AWS account, create one [here](https://aws.amazon.com)
- `aws-cli` installed and configured, [instructions](https://aws.amazon.com/cli/)
- [Serverless](https://serverless.com/framework/) framework installed locally - `npm install -g serverless`

## Get Typeform ready

1. Create a form if you don't have one.
2. Add an email field if you don't have one already.
3. Add a statement containing an explicit error message. We will display it when a user already filled the form.
4. Add sample logic between the email block and statement.
5. Get your typeform URL, and keep your form ID.
  `https://{ACCOUNT_NAME}.typeform.com/to/{FORM_ID}`
6. Hit `https://api.typeform.com/to/{FORM_ID}` directly in the browser.

![payload from Typeform API for form definition](./doc-images/api_typeform_payload.png)

7. Look at the JSON payload, under `fields` array and extract the `id` and `ref` of both the field you want to use as a unique identifier (email block) and the statement block.
8. Finally get yourself a Typeform personal token [here](https://admin.typeform.com/account#/section/tokens)

## Setup the function

1. Clone repo locally `git clone https://github.com/picsoung/tf-lambda-limit-one-entry.git`
1. `cd tf-lambda-limit-one-entry.git`
1. run `npm install`
1. Open `serverless.yml`
1. Update environment variables with your own:
    `FORM_ID: 'YOUR_FORM_ID'` # Which form you want to update
    `FIELD_ID: 'YOUR_EMAIL_FIELD_ID'` # Id of the unique field
    `FIELD_REF: 'YOUR_EMAIL_FIELD_REF'` # Ref of the unique field
    `TF_TOKEN: 'TYPEFORM_PERSONAL_TOKEN`' #Typeform API token
    `ALREADY_FILLED_FIELD_REF: 'STATEMENT_BLOCK_FIELD_REF'` # Ref for the "already filled" statement block
1. Deploy function to production `sls deploy`
1. Test it live 🤩

# Contribute
Something is mispelled, the code could be optimized, you want to add features...?
Feel free to fork this repo and summit a pull request.

First timers welcome 😃


# Build your own
This is a showcase of what's doable to enrich your typeform fields with data. Using this function as an example you build more complex interactions.

[Let us know](https://developerplatform.typeform.com/to/Xc7NMh?utm_source=github&utm_medium=repo&utm_campaign=typeform-lambda-limit-one-entry) if you are building something.
