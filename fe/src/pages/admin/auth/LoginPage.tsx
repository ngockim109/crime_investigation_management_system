// import { useEffect, useState } from "react"
// import axios from "axios"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setUserLoginInfo } from "@/features/account/accountSlice"
// import { useAppSelector } from "@/redux/hook"

// const LoginPage = () => {
//   const [username, setUsername] = useState<string>('')
//   const [password, setPassword] = useState<string>('')

//   const navigate = useNavigate()

//   const dispatch = useDispatch();

//   const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
//   useEffect(() => {
//     //đã login => redirect to '/'
//     if (isAuthenticated) {
//       // navigate('/');
//       window.location.href = '/';
//     }
//   }, [])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     if (name === 'username') {
//       setUsername(value)
//     } else if (name === 'password') {
//       setPassword(value)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const response = await axios.post('http://localhost:3000/api/auth/login', {
//       username,
//       password
//     })
//     console.log(response.data.data)
//     if (response?.data) {
//       localStorage.setItem('token', response.data.data.access_token)
//       dispatch(setUserLoginInfo(response.data.data.user))
//       navigate('/admin/permissions')
//     }
//   }
//   return (
//     <div >
//       <form
//         onSubmit={handleSubmit}
//       >
//         <div className="mb-4">
//           <label htmlFor="username" >
//             Tên đăng nhập
//           </label>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="password" className="block mb-1 font-medium">
//             Mật khẩu
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"

//         >
//           Đăng nhập
//         </button>
//       </form>
//     </div>
//   )
// }

// export default LoginPage