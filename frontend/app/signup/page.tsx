"use client"
import AuthForm from "@/components/auth/AuthForm";
import * as Yup from "yup"

const SignupSchema = Yup.object({
    name: Yup.string().min(2).required(),
    email:Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});

export default function SignupPage(){
    return(
        <AuthForm
        type="signup"
        initialValues={{name:"", email:"", password:""}}
        validationSchema={SignupSchema}
        />
    );
}