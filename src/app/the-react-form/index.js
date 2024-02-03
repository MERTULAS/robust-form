
'use client'

import React, { useState } from 'react'
import { Input, Select, Button, Radio, DatePicker } from 'antd'

const TheForm = ({formSettings = {}, onSubmit}) => {
    const [isFormValid, setFormValidState] = useState(false);
    const [formObject, setFormObject] = useState(formSettings);

    const handleSubmit = (e) => {
        console.log(formObject);

        const tempformObject = {...formObject};
        
        let isValid = true;

        Object.keys(tempformObject).forEach(formKey => {
            if (tempformObject[formKey].required && tempformObject[formKey].value === '') {
                tempformObject[formKey].status = 'error';
                isValid = false;
            }
            else {
                tempformObject[formKey].status = '';
            }
        });

        setFormValidState(isValid);
        setFormObject(tempformObject);

        if (isValid) {
            onSubmit(formObject);
        }
    }

    const handleChange = (val, formKey) => {
        const tempformObject = {...formObject, [formKey]: {
            ...formObject[formKey],
            value: val
        }};

        console.log(tempformObject);
        setFormObject(tempformObject);
    } 

    return (
        <div>
            {Object.keys(formObject).map(formKey => {
                if (formObject[formKey].type === 'radio') {
                    return <div key={formKey}>
                        <p>{formKey}: </p>
                        <Radio.Group {...formObject[formKey]} onChange={e => handleChange(e.target.value, formKey)}>
                            {formObject[formKey].values.map(radioValue => <Radio key={radioValue} value={radioValue}> {radioValue} </Radio>)}
                        </Radio.Group>
                </div>
                }

                else if (formObject[formKey].type === 'select') {
                    return <div key={formKey}>
                        <p>{formKey}: </p>
                        <Select 
                            {...formObject[formKey]}
                            style={{width: '200px'}} 
                            defaultValue={formObject[formKey].value} 
                            options={formObject[formKey].values.map(val => ({value:val , label: val}))} 
                            onChange={newVal => handleChange(newVal, formKey)} />
                    </div>
                }

                // else if (formObject[formKey].type === 'datepicker') {
                //     return <div key={formKey}>
                //         <p>{formKey}: </p>
                //         <DatePicker {...formObject[formKey]} onChange={(date, dateString) => handleChange(dateString, formKey)} style={{width: '100%'}} />
                //     </div>
                // }

                return <div key={formKey}>
                    <p>{formKey}: </p>
                    <Input {...formObject[formKey]} onChange={e => handleChange(e.target.value, formKey)} />
                </div>
            })}
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

export default TheForm;