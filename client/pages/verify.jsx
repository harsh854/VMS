import { useEffect } from "react";
import { useRouter } from "next/router";
import { useApolloClient, gql } from "@apollo/client";
import { alert } from "react-custom-alert";

import Layout from "../components/Layout.jsx";

const Verify = () => {
    const client = useApolloClient();
    const router = useRouter();

    useEffect(() => {
        const { id, email } = router.query;
        if (
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
                id
            )
        ) {
            client
                .mutate({
                    mutation: gql`
                    mutation {
                        verify(verifyID: "${id}", email: "${email}") 
                    }
                `,
                })
                .then((res) => {
                    router.push("/authorize");
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            console.error("Invalid ID");
        }
    }, [router, client]);
    
    const resendEmail = (e) => {
        e.currentTarget.classList.add("loading");
        const { email } = router.query;

        if(email) {
            client.query({
                query: gql`
                    query {
                        resendEmail(email: "${email}")
                    }
                `
            }).then((res) => {
                e.target.classList.remove("loading");
            }).catch((err) => {
                e.target.classList.remove("loading");
            });
        }

    };

    return (
        <Layout>
            <div className="flex min-h-[80vh] flex-col items-center justify-center">
                <ul className="steps mb-3 mt-2 text-xs md:text-base">
                    <li className="step step-primary">
                        Tell Us About Yourself
                    </li>
                    <li className="step step-primary">Verify Email</li>
                    <li className="step">Authorize Account</li>
                </ul>

                <div className="mockup-window flex flex-col justify-center space-y-10 border bg-base-300 p-10">
                    <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
                        Please check your email to verify your account
                    </h1>
                    <button onClick={resendEmail} className="btn btn-primary">Resend Email</button>
                </div>
            </div>
        </Layout>
    );
};

export default Verify;
