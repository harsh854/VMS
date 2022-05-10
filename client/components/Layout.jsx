import Link from "next/link";
import Head from "next/head";

import { motion } from "framer-motion";

import useAuth from "../store/authStore";

const Layout = ({ children }) => {
    const token = useAuth((state) => state.access_token);
    const logout = useAuth((state) => state.logout);

    const variants = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    };

    const navLinksUnAuth = [
        { content: "Login", path: "/login" },
        { content: "Sign Up", path: "/signup" },
    ];

    const navLinksAuth = [
        { content: "Create Invite", path: "/createInvite" },
        { content: "Dashboard", path: "/visitorDashboard" },
        { content: "Logout", path: "/", onClick: () => logout() },
    ];

    return (
        <div className="container mx-auto flex min-h-screen flex-col items-center font-main md:py-2">
            <Head>
                <title>VMS</title>
            </Head>
            <nav className="navbar bg-neutral md:rounded-xl">
                <div className="navbar-start">
                    <Link href="/">
                        <a className="btn btn-ghost">
                            <svg
                                width="77"
                                height="36"
                                viewBox="0 0 77 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M44.1619 28.8182L38.8885 12.2415H38.6861L33.402 28.8182L28.2884 28.8182L35.8097 7H41.7543L49.2862 28.8182H44.1619Z"
                                    fill="white"
                                />
                                <path
                                    d="M63.2678 22.5433C63.353 23.4027 63.7187 24.0703 64.3651 24.5462C65.0114 25.022 65.8885 25.2599 66.9964 25.2599C67.7493 25.2599 68.3849 25.1534 68.9034 24.9403C69.4219 24.7344 69.8196 24.4467 70.0966 24.0774C70.3665 23.7081 70.5014 23.2891 70.5014 22.8203C70.5156 22.4297 70.4339 22.0888 70.2564 21.7976C70.0717 21.5064 69.8196 21.2543 69.5 21.0412C69.1804 20.8352 68.8111 20.6541 68.392 20.4979C67.973 20.3487 67.5256 20.2209 67.0497 20.1143L65.0895 19.6456C64.1378 19.4325 63.2642 19.1484 62.4688 18.7933C61.6733 18.4382 60.9844 18.0014 60.402 17.483C59.8196 16.9645 59.3686 16.3537 59.049 15.6506C58.7223 14.9474 58.5554 14.1413 58.5483 13.2322C58.5554 11.897 58.8963 10.7393 59.571 9.75923C60.2386 8.78622 61.2045 8.02983 62.4688 7.49006C63.7259 6.95739 65.2422 6.69105 67.0178 6.69105C68.7791 6.69105 70.3132 6.96094 71.62 7.50071C72.9197 8.04048 73.9354 8.83949 74.6669 9.89773C75.3913 10.9631 75.7713 12.2805 75.8068 13.8501H71.343C71.2933 13.1186 71.0838 12.5078 70.7145 12.0178C70.3381 11.5348 69.8374 11.169 69.2124 10.9205C68.5803 10.679 67.8665 10.5582 67.071 10.5582C66.2898 10.5582 65.6115 10.6719 65.0362 10.8991C64.4538 11.1264 64.0028 11.4425 63.6832 11.8473C63.3636 12.2521 63.2038 12.7173 63.2038 13.2429C63.2038 13.733 63.3494 14.1449 63.6406 14.4787C63.9247 14.8125 64.3437 15.0966 64.8977 15.331C65.4446 15.5653 66.1158 15.7784 66.9112 15.9702L69.2869 16.5668C71.1264 17.0142 72.5788 17.7138 73.6442 18.6655C74.7095 19.6172 75.2386 20.8991 75.2315 22.5114C75.2386 23.8324 74.8871 24.9865 74.1768 25.9737C73.4595 26.9609 72.4759 27.7315 71.2259 28.2855C69.9759 28.8395 68.5554 29.1165 66.9645 29.1165C65.3452 29.1165 63.9318 28.8395 62.7244 28.2855C61.5099 27.7315 60.5653 26.9609 59.8906 25.9737C59.2159 24.9865 58.8679 23.843 58.8466 22.5433H63.2678Z"
                                    fill="white"
                                />
                                <path
                                    d="M5.83807 7.18182L11.1115 23.7585H11.3139L16.598 7.18182H21.7116L14.1903 29H8.24574L0.713778 7.18182H5.83807Z"
                                    fill="white"
                                />
                            </svg>
                        </a>
                    </Link>
                </div>
                <div className="navbar-center"></div>
                <div className="navbar-end">
                    {!token ? (
                        <ul className="dropdown-content">
                            {navLinksUnAuth.map((link, idx) => {
                                return (
                                    <Link key={idx} href={link.path}>
                                        <a className="btn">{link.content}</a>
                                    </Link>
                                );
                            })}
                        </ul>
                    ) : (
                        <ul className="dropdown-content">
                            {navLinksAuth.map((link, idx) => {
                                return (
                                    <Link key={idx} href={link.path}>
                                        <a
                                            className="btn"
                                            onClick={
                                                link.onClick && link.onClick
                                            }
                                        >
                                            {link.content}
                                        </a>
                                    </Link>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </nav>

            <motion.main
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: "linear" }}
                className="container h-full min-h-screen"
            >
                {children}
            </motion.main>

            <footer className="footer footer-center rounded-md bg-primary p-10 text-primary-content">
                <div>
                    <svg
                        width="77"
                        height="36"
                        viewBox="0 0 77 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M44.1619 28.8182L38.8885 12.2415H38.6861L33.402 28.8182L28.2884 28.8182L35.8097 7H41.7543L49.2862 28.8182H44.1619Z"
                            fill="black"
                        />
                        <path
                            d="M63.2678 22.5433C63.353 23.4027 63.7187 24.0703 64.3651 24.5462C65.0114 25.022 65.8885 25.2599 66.9964 25.2599C67.7493 25.2599 68.3849 25.1534 68.9034 24.9403C69.4219 24.7344 69.8196 24.4467 70.0966 24.0774C70.3665 23.7081 70.5014 23.2891 70.5014 22.8203C70.5156 22.4297 70.4339 22.0888 70.2564 21.7976C70.0717 21.5064 69.8196 21.2543 69.5 21.0412C69.1804 20.8352 68.8111 20.6541 68.392 20.4979C67.973 20.3487 67.5256 20.2209 67.0497 20.1143L65.0895 19.6456C64.1378 19.4325 63.2642 19.1484 62.4688 18.7933C61.6733 18.4382 60.9844 18.0014 60.402 17.483C59.8196 16.9645 59.3686 16.3537 59.049 15.6506C58.7223 14.9474 58.5554 14.1413 58.5483 13.2322C58.5554 11.897 58.8963 10.7393 59.571 9.75923C60.2386 8.78622 61.2045 8.02983 62.4688 7.49006C63.7259 6.95739 65.2422 6.69105 67.0178 6.69105C68.7791 6.69105 70.3132 6.96094 71.62 7.50071C72.9197 8.04048 73.9354 8.83949 74.6669 9.89773C75.3913 10.9631 75.7713 12.2805 75.8068 13.8501H71.343C71.2933 13.1186 71.0838 12.5078 70.7145 12.0178C70.3381 11.5348 69.8374 11.169 69.2124 10.9205C68.5803 10.679 67.8665 10.5582 67.071 10.5582C66.2898 10.5582 65.6115 10.6719 65.0362 10.8991C64.4538 11.1264 64.0028 11.4425 63.6832 11.8473C63.3636 12.2521 63.2038 12.7173 63.2038 13.2429C63.2038 13.733 63.3494 14.1449 63.6406 14.4787C63.9247 14.8125 64.3437 15.0966 64.8977 15.331C65.4446 15.5653 66.1158 15.7784 66.9112 15.9702L69.2869 16.5668C71.1264 17.0142 72.5788 17.7138 73.6442 18.6655C74.7095 19.6172 75.2386 20.8991 75.2315 22.5114C75.2386 23.8324 74.8871 24.9865 74.1768 25.9737C73.4595 26.9609 72.4759 27.7315 71.2259 28.2855C69.9759 28.8395 68.5554 29.1165 66.9645 29.1165C65.3452 29.1165 63.9318 28.8395 62.7244 28.2855C61.5099 27.7315 60.5653 26.9609 59.8906 25.9737C59.2159 24.9865 58.8679 23.843 58.8466 22.5433H63.2678Z"
                            fill="black"
                        />
                        <path
                            d="M5.83807 7.18182L11.1115 23.7585H11.3139L16.598 7.18182H21.7116L14.1903 29H8.24574L0.713778 7.18182H5.83807Z"
                            fill="black"
                        />
                    </svg>

                    <p className="font-bold">
                        Team Firestorm <br />
                        Providing reliable tech since 2022
                    </p>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
