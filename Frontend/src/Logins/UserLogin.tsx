import Topbar from '../UserComponents/Topbar'
import Header from '../UserComponents/Header'
import LoginForm from '../UserComponents/Loginform'
import Footer from '../UserComponents/Footer'
import Copyright from '../UserComponents/Copyright'

const UserLogin = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div>
                <Topbar />
                <Header />
                <LoginForm />
            </div>
            <div>
                <Footer />
                <Copyright />
            </div>
        </div>
    )
}

export default UserLogin
