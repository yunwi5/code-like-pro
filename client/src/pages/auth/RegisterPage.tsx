import { Helmet } from 'react-helmet';
import { AppProperty } from '../../constants/app';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>Register | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Registration page of ${AppProperty.APP_NAME} where users can create a new account.`}
                />
            </Helmet>
            <main className="flex justify-center min-h-[80vh] px-3 md:px-5 xl:px-10 py-10 text-gray-700">
                <RegisterForm />
            </main>
        </>
    );
};

export default RegisterPage;
