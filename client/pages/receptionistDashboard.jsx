import { useState, useEffect , setState} from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import Layout from "../components/Layout";
import ErrorAlert from "../components/ErrorAlert";

import { useRouter } from "next/router";
import QRScanner from "../components/QRScanner";
import SignInPopUp from "../components/SignInPopUp";
import SignOutPopUp from "../components/SignOutPopUp";

const ReceptionistDashboard = () => {
    
    const [currentVisitorID,setCurrentVisitorID] = useState("");
    const [currentInviteID,setCurrentInviteID] = useState("");
    
    const [visitorData, setIsVisitorData] = useState([]);
    const [showErrorAlert, scanPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    let today = new Date();
    const formatYmd = today => today.toISOString().slice(0, 10);
    let todayString = formatYmd(new Date());

    const router = useRouter();
    const { loading, error, data } = useQuery(gql`
        query {
            getInvitesByDate( date: "${todayString}" ) {
                inviteID
                inviteDate
                idNumber
                visitorName
                inviteState
            }
        }
    `);

    function refreshPage() {
        window.location.reload(true);
      }

    const search = (inviteID) => {
        //TODO (Stefan)
    };

    const scan = (inviteID) => {
       // this.state={scanPopup: !this.state.scanPopup}
       //TODO (Larisa)
    };

    const signOut = (inviteID) => {
        //TODO (Tabitha)
        //change the state of the invite
        //free the parking
    };


    useEffect(() => {
        if (!loading && !error) {
            const invites = data.getInvitesByDate;
            setIsVisitorData(invites);
        } else if (error) {
            if (error.message === "Unauthorized") {
                router.push("/expire");
                return;
            }

            setIsVisitorData([
                {
                    visitorEmail: "ERROR",
                    idDocType: "ERROR",
                    isNumber: "ERROR",
                },
            ]);
        }
    }, [loading, error, router, data]);

    //////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <Layout>
            <input type="text" placeholder="Search.." className="ml-5 input input-bordered input-primary w-4/6" />
            <button onClick={search} className="ml-5 mt-5 mb-5 btn btn-primary">Search</button>
            <a href="#QRScan-modal" className="modal-button mr-5 mt-5 mb-5 float-right btn btn-primary">Scan to Search</a>
            <h1 className="mt-5 mb-5 p-3 text-left text-4xl font-bold base-100">
                Today&apos;s Invites
            </h1>
            
            {/* <div className="mx-5 grid grid-cols-3 gap-4 content-evenly h-10 bg-base-300 rounded-md content-center">
                <div className="ml-2">Invitation Id</div>
                <div className="">Visitor Id</div>
                <div className=""></div>
            </div> */}
            <div className="flex h-full items-center justify-center overflow-x-auto p-3">    
                {loading ? (
                    <progress className="progress progress-primary w-56">
                        progress
                    </progress>
                ) : (
                    //TODO (Larisa) dont use table
                    <table className="mb-5 table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Visitor Name</th>
                                <th>Visitor ID</th>
                                <th></th>
                            </tr>
                </thead>
                        {visitorData.length > 0 ? (
                            <tbody>
                                {visitorData.map((visit, idx) => {
                                        
                                            return(
                                                <tr className="hover" key={idx}>
                                                    <th>{idx + 1}</th>
                                                    <td>{visit.visitorName}</td>
                                                    <td>{visit.idNumber}</td>
                                                    
                                                    {visit.inviteState === "inActive" ? (
                                                    <td>
                                                        <a
                                                            href="#signIn-modal"
                                                            className="btn modal-button text-white border-0 bg-green-800 max-w-md"
                                                            onClick={()=> {setCurrentVisitorID(visit.idNumber); 
                                                                setCurrentInviteID(visit.inviteID);
                                                                }}
                                                        >
                                                            Sign In
                                                        </a>
                                                    </td>
                                                    ):(
                                                    <td>
                                                        <a
                                                            href="#signOut-modal"
                                                            className="btn modal-button text-white border-0 bg-red-800 max-w-md"
                                                            onClick={()=> {setCurrentVisitorID(visit.idNumber); 
                                                                setCurrentInviteID(visit.inviteID);
                                                                }}
                                                        >Sign Out  
                                                        </a>
                                                    </td>
                                                    )}
                                                </tr>
                                            )
                                            
                                })}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <th>Nothing to show...</th>
                                </tr>
                            </tbody>
                        )}
                   </table>
                )}
            </div>
            <ErrorAlert message={errorMessage} showConditon={showErrorAlert} />

            
            <div className="modal cursor-pointer" id="signIn-modal">
                <div className="modal-box">
                    <SignInPopUp visitorID={currentVisitorID} inviteID={currentInviteID} />
                </div>                
            </div>

            <div className="modal cursor-pointer" id="signOut-modal">
                <div className="modal-box">
                    <SignOutPopUp visitorID={currentVisitorID} inviteID={currentInviteID} />
                </div>                
            </div>

            <div className="modal fade" id="QRScan-modal">
                <div className="modal-box flex flex-wrap">
                    <QRScanner />
                </div>                
            </div>

            
        </Layout>
    );
};

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
        },
    };
}

export default ReceptionistDashboard;