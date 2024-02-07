'use client'
import styles from "./page.module.css";
import TheForm from "./the-react-form";
// import TheForm from "the-react-form";
import React, {useState} from "react";

export default function Home() {
  const [form, setForm] = useState({})
  const [formObject, setFormObject] = useState({
    Name: {
        value: '',
        placeholder: 'Enter your name',
        required: true,
    },
    Password: {
      value: '',
      placeholder: 'Enter your password',
      required: true,
      type: 'password'
    },
    Surname: {
        value: '',
        placeholder: 'Enter your surname',
        required: true,
    }, 
    'Select Gender': {
        values: ['Male', 'Female', 'Other'],
        value: 'Male',
        placeholder: 'Select your gender',
        type: 'select',
        required: true,
    },
    'User Type': {
        value: 'Admin',
        type: 'radio',
        values: ['Admin', 'User'],
        required: true,
    },
    Note: {
      value: '',
      type: 'textarea',
      placeholder: 'Enter your note',
      required: true,
      height: '300px'
    },
    'Select Date': {
        value: '',
        type: 'datepicker',
        required: true
    },
    'Upload CV': {
        required: true,
        type: 'upload',
        value: ''
    }
  })

  const onSubmit = (form) => {
    console.log(form, 'submit');

    setForm(form)
    // Request here with 'form'.
  }

  return (
    <main className={styles.main}>
      <TheForm formSettings={formObject} onSubmit={onSubmit} CTAButtonTitle="Submit Form!" />
      <object data={form['Upload CV']}
            type="application/pdf" width="1000px" height="800px">
      </object>
    </main>
  );
}
