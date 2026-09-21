import Header from "../UserComponents/Header";
import Signupform from "../UserComponents/Signupform";
import Topbar from "../UserComponents/Topbar";
import Footer from "../UserComponents/Footer";
import Copyright from "../UserComponents/Copyright";

const UserSignup = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div>
                <Topbar />
                <Header />
                <Signupform />
            </div>
            <div>
                <Footer />
                <Copyright />
            </div>
        </div>
    );
};

export default UserSignup;
