
'use client'

import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Input, Select, Button, Radio, DatePicker, Upload } from 'antd'
const { TextArea } = Input;
import './style.css';

const TheForm = ({formSettings = {}, onSubmit, elementTypes = 'outlined', CTAButtonTitle='Submit', inValidMessage='The fields shown are required! Please fill in.'}) => {
    const [isFormValid, setFormValidState] = useState(null);
    const [formObject, setFormObject] = useState(formSettings);
    const [fileList, setFileList] = useState([]);

    const handleSubmit = (e) => {
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
            const returnedObject = {};
            Object.keys(formObject).forEach(formKey => returnedObject[formKey] = formObject[formKey].value);
            onSubmit(returnedObject);
        }
    }

    const handleChange = (val, formKey) => {
        const tempformObject = {...formObject, [formKey]: {
            ...formObject[formKey],
            value: val,
            status: status === 'error' && val === '' ? 'error' : ''
        }};

        setFormObject(tempformObject);
    }

    const handleUpload = (file, formKey) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileContent = event.target.result;
          setFormObject({...formObject, [formKey]: {
            ...formObject[formKey],
            value: fileContent
          }})
        };
        reader.readAsText(file);
      };
    
      // Dosya değişikliği durumunda gerçekleştirilecek işlemler
    const handleUploadChange = (info) => {
        let fileList = [...info.fileList];
    
        // Sadece son eklenen dosyayı al
        fileList = fileList.slice(-1);

        console.log(fileList);
    
        setFileList(fileList);
      };

    return (
        <div className='the-form'>
            {Object.keys(formObject).map(formKey => {
                if (formObject[formKey].type === 'radio') {
                    return <div key={formKey}>
                        <p>{formKey}: </p>
                        <Radio.Group {...formObject[formKey]} onChange={e => handleChange(e.target.value, formKey)} >
                            {formObject[formKey].values.map(radioValue => <Radio key={radioValue} value={radioValue}> {radioValue} </Radio>)}
                        </Radio.Group>
                </div>
                }

                else if (formObject[formKey].type === 'select') {
                    return <div key={formKey}>
                        <p>{formKey}: </p>
                        <Select 
                            {...formObject[formKey]}
                            style={{width: '100%'}}
                            defaultValue={formObject[formKey].value} 
                            options={formObject[formKey].values.map(val => ({value:val , label: val}))} 
                            onChange={newVal => handleChange(newVal, formKey)} 
                            variant={elementTypes}
                            />
                    </div>
                }

                else if (formObject[formKey].type === 'textarea') {
                    return <div key={formKey}>
                        <p>{formKey}: </p>
                        <TextArea {...formObject[formKey]} allowClear onChange={e => handleChange(e.target.value, formKey)} style={{height: formObject[formKey].height}} variant={elementTypes} />
                    </div>
                }

                else if (formObject[formKey].type === 'datepicker') {
                    return <div key={formKey}>
                        <p>{formKey}: </p>
                        <DatePicker {...formObject[formKey]} onChange={(date, _) => handleChange(date, formKey)} style={{width: '100%'}} variant={elementTypes} />
                    </div>
                }

                else if (formObject[formKey].type === 'password') {
                    return <div key={formKey}>
                        <p>{formKey}: </p>
                        <Input.Password {...formObject[formKey]} onChange={e => handleChange(e.target.value, formKey)} variant={elementTypes} />
                    </div>
                }

                else if (formObject[formKey].type === 'upload') {
                    return <div key={formKey}>
                        <p>{formKey}: </p>
                        <Upload onChange={handleUploadChange} beforeUpload={file => handleUpload(file, formKey)} fileList={fileList}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </div>
                }

                return <div key={formKey}>
                    <p>{formKey}: </p>
                    <Input {...formObject[formKey]} onChange={e => handleChange(e.target.value, formKey)} variant={elementTypes} />
                </div>
            })}
            {isFormValid === false ? <p className='error-message'>{inValidMessage}</p> : <></>}
            <Button onClick={handleSubmit} type='primary' className='cta-button'>{CTAButtonTitle}</Button>
        </div>
    )
}

export default TheForm;