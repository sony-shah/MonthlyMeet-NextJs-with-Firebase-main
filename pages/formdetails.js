import React from 'react'
import { useRouter } from "next/router";
import Form from '../component/Form';
import style from '../styles/Home.module.css'
import FormDetails from '../component/FormDetails';

function formdetails() {
    return (
        <div>
            <FormDetails />
        </div>
    )
}

export default formdetails
