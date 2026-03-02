import React from 'react'
import logo from "../../assets/icons/icon2.svg";
import { useNavigate } from "react-router-dom";
// import { useStateContext } from '../../contexts/ContextProvider';

const TermsAndCondition = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };
    return (
        <div className="px-6 py-12 bg-gray-100 text-gray-900">
            <div>
                <img onClick={handleNavigation} src={logo} alt="" className='cursor-pointer mx-auto mb-4' />
            </div>
            <h1 className="text-4xl font-bold text-center mb-8">MyPromoSphere Terms and Conditions</h1>

            <p className="text-sm text-gray-500 mb-4"><strong>Last Updated:</strong> 10/10/2024</p>

            <p className="mb-6">
                Welcome to MyPromoSphere! These Terms and Conditions outline the rules and regulations for using our website and services.
            </p>

            <p className="mb-6">
                By accessing or using MyPromoSphere (referred to as "the platform," "we," "us," or "our"), you agree to comply with these terms.
                If you do not agree with any part of these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. Definitions</h2>
            <ul className="list-disc list-inside mb-6">
                <li><strong>MyPromoSphere</strong>: A platform designed for business promotion, social interaction, and advertising services.</li>
                <li><strong>User</strong>: Any individual or business entity accessing or using the services provided by MyPromoSphere.</li>
                <li><strong>Content</strong>: Any information, data, text, images, video, or other materials uploaded, shared, or posted by users on MyPromoSphere.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p className="mb-4">By using MyPromoSphere, you represent and warrant that:</p>
            <ul className="list-disc list-inside mb-6">
                <li>You are at least 16 years of age or have the legal capacity to enter into these Terms if you are under 16 with parental consent.</li>
                <li>You have the authority to agree to these Terms on behalf of yourself or the entity you represent.</li>
                <li>Your use of the platform does not violate any applicable laws or regulations.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">3. Account Registration and Security</h2>
            <p className="mb-6">
                Users are required to create an account to access certain features of MyPromoSphere. You are responsible for maintaining
                the confidentiality of your account information and agree to notify us immediately of any unauthorized access or use.
                MyPromoSphere will not be liable for any loss or damage arising from unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
            <p className="mb-4">By using the platform, you agree:</p>
            <ul className="list-disc list-inside mb-6">
                <li>Not to post, share, or upload any unlawful, defamatory, abusive, or inappropriate content.</li>
                <li>Not to engage in any activity that interferes with or disrupts the functioning of MyPromoSphere or the services of its users.</li>
                <li>To comply with all applicable local, national, and international laws when using the platform.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">5. Content Ownership and Rights</h2>
            <p className="mb-6">
                You retain ownership of any content you submit to MyPromoSphere. However, by posting content on the platform, you grant
                us a worldwide, royalty-free, non-exclusive license to use, distribute, modify, and display that content in connection
                with providing and promoting MyPromoSphere’s services. MyPromoSphere reserves the right to remove any content that
                violates these Terms or is deemed inappropriate.
            </p>

            <h2 className="text-2xl font-semibold mb-4">6. Payment and Fees</h2>
            <p className="mb-6">
                Certain services on MyPromoSphere may require payment. By purchasing these services, you agree to pay the applicable fees.
                MyPromoSphere may, from time to time, modify its pricing structure. Notice of changes will be posted on the platform.
            </p>

            <h2 className="text-2xl font-semibold mb-4">7. Termination of Use</h2>
            <p className="mb-6">
                We reserve the right to suspend or terminate your access to MyPromoSphere at any time, with or without cause, if you violate these
                Terms or engage in prohibited conduct. Termination does not relieve you of your obligation to pay any outstanding fees or other amounts owed.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="mb-6">
                To the fullest extent permitted by law, MyPromoSphere will not be liable for any direct, indirect, incidental, or consequential damages arising
                from the use or inability to use the platform. We make no warranties or representations about the accuracy or completeness of content or
                services provided through the platform.
            </p>

            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p className="mb-6">
                You agree to indemnify, defend, and hold MyPromoSphere harmless from any claims, losses, liabilities, damages, expenses, including attorney's fees,
                arising out of your use of the platform, your violation of these Terms, or your infringement of any rights of another party.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. Changes to the Terms</h2>
            <p className="mb-6">
                MyPromoSphere reserves the right to modify these Terms at any time. Changes will be effective upon posting to the platform.
                Continued use of the platform after any changes constitute your acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p className="mb-6">
                These Terms and any disputes arising out of or related to them shall be governed by and construed in accordance with the laws in Nigeria.
            </p>

            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="mb-6">
                If you have any questions or concerns about these Terms and Conditions, please contact us at <a className='jost text-purple' href="mailto:mypromosphere@gmail.com">mypromosphere@gmail.com</a>.
            </p>

            <p className="mt-10 text-center text-sm">
                By using MyPromoSphere, you agree to be bound by these Terms and Conditions. Thank you for promoting your business with us!
            </p>
        </div>
    )
}

export default TermsAndCondition