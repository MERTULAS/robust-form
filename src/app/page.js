'use client'
import styles from "./page.module.css";
import TheForm from "./the-react-form";
import React, {useState} from "react";

export default function Home() {
  const [formObject, setFormObject] = useState({
    Name: {
        value: 'm',
        placeholder: 'Enter your name',
        required: true,
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
    }
  })

  const onSubmit = (form) => {
    console.log(form, 'submit');
  }

  return (
    <main className={styles.main}>
      <TheForm formSettings={formObject} onSubmit={onSubmit}/>
    </main>
  );
}
