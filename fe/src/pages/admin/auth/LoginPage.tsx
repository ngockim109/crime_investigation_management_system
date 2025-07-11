import { setAccessToken, setRefreshToken } from "@/redux/reduxAuth"
import axios from "axios"
import { el } from "date-fns/locale"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export interface LoginResponse {
    statusCode: number;
    message: string;
    data: {
        access_token: string;
        refresh_token: string;
        user: {
            user_name: string;
            full_name: string;
            date_of_birth: string; // ISO string
            day_attended: string;  // ISO string
            phone_number: string;
            status: string;
            zone: string;
            role: {
                role_id: string;
                description: string;
                permissions: any[]; // Có thể thay 'any' bằng type cụ thể nếu có
                created_at: string | null;
                updated_at: string | null;
                isDeleted: boolean;
            };
        };
    };
}

const LoginPage = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    const dispatch = useDispatch();

    //   //const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
    //   useEffect(() => {
    //     //đã login => redirect to '/'
    //     if (isAuthenticated) {
    //       // navigate('/');
    //       window.location.href = '/';
    //     }
    //   }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'username') {
            setUsername(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }
    const handleShow = () => {
        setShowPassword(!showPassword)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            username,
            password
        })
        const data: LoginResponse = response.data

        if (data.statusCode < 400) {
            dispatch(setAccessToken(data.data.access_token))
            dispatch(setRefreshToken(data.data.refresh_token))
            toast.success("Login Successfull")
            navigate("/admin/user")
        }
        else{
            toast.error("Login Failure")
        }
    }
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="h-screen w-screen" style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/images/login.png")'
        }}>
            <div className="absolute top-1/2 left-1/2 -translate-1/2">
                <div className="w-150 rounded-2xl bg-white px-12.5 py-24.5">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="text-center mb-6">
                            <p className="font-semibold text-4xl">PD SYSTEM</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="text-lg">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-1 text-lg font-medium">
                                Password
                            </label>
                            <div className="flex items-center border pr-3.5 rounded-lg">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                    className="w-full flex-1  px-4 py-2  focus:outline-none "
                                />

                                <span onClick={() => handleShow()}>
                                    {showPassword ? <Eye></Eye> : <EyeOff></EyeOff>}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="text-2xl px-5.5 py-3 bg-black text-white rounded-2xl"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default LoginPage