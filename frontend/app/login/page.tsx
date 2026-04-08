"use client"
import AuthForm from "@/components/auth/AuthForm";
import * as Yup from "yup"

const LoginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});

export default function LoginPage(){
    return(
        <AuthForm
          type="login"
          initialValues={{email:"", password:""}}
          validationSchema={LoginSchema}
        />
    );
}