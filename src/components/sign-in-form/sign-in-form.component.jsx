import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component';

import {signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';


import './sign-in-form.styles.scss';

const defaultFormField = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const {email, password} = formField;

    const resetFormField = () => {
        setFormField(defaultFormField);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormField();
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password': 
                    alert('Incorrect password for email')
                    break;
                case 'auth/user-not-found': 
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormField({...formField, [name]:value})
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="email"
                    type="email"
                    required
                    onChange={handleChange}    
                    name="email"
                    value={email}
                />
                <FormInput 
                    label="password"
                    type="password"
                    required
                    onChange={handleChange}    
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">
                        Sign In
                    </Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPES_CLASSES.google}> 
                        Google Sign In 
                    </Button>
                </div>
            </form>
        </div> 
    )
}

export default SignInForm;