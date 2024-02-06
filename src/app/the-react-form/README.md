# the-react-form

### Simple form component with validation for general use.


## Usage

The component takes several prop values. These are shown below.
-  formSettings
-- Takes a object as a shown below.
NOTE: Keys indicate form labels.

	Types: 
		-- Default (text input)
		-- 'select'
		-- 'radio'
		-- 'textarea'
		-- 'datepicker'
	```
	const formObject = {
		Name: {
			value:  '',
			placeholder:  'Enter your name',
			required:  true,
		},
		Password: {
			value:  '',
			placeholder:  'Enter your password',
			required:  true,
			type:  'password'
		},
		'Select Gender': {
			values: ['Male', 'Female', 'Other'],
			value:  'Male',
			placeholder:  'Select your gender',
			type:  'select',
			required:  true,
		},
		'User Type': {
			value:  'Admin',
			type:  'radio',
			values: ['Admin', 'User'],
			required:  true,
		},
		Note: {
			value:  '',
			type:  'textarea',
			placeholder:  'Enter your note',
			required:  true,
			height:  '300px'
		},
		'Select Date': {
			value:  '',
			type:  'datepicker',
			required:  true
		}
	}
	```
- onSubmit 
-- It is triggered by the call to action button, and if the form is valid, it is the triggered function. Returns the filled form values as a object.
```
{
    Name: "Mert"
    Note: "Hello world."
    Password: "123456"
    Select Date: M {$L:  'en',  $u:  undefined,  $d:  Wed Feb 07 2024 17:41:17 GMT+0300 (GMT+03:00),  $y:  2024,  $M:  1, …}
    Select Gender: "Male"
    User Type: "Admin"
}
```
NOTE: Date value returned as a 'moment' object.

- CTAButtonTitle
-- Sets the text of the call to action button. By default it takes the value <b>'Submit'</b>.
- inValidMessage
-- Sets the message to be displayed in case the form is invalid. Default value;  <b>'The fields shown are required! Please fill in.' is set to </b>.

```
<TheForm  formSettings={formObject}  onSubmit={onSubmit}  CTAButtonTitle="Submit Form!"  />
```
```
const  onSubmit  = (form) => {

console.log('submitted', form);

// You can make API requests here with 'form'

}
```
NOTE: If you experience any problems or have any suggestions, I would be happy if you open a github issue. Thanks.