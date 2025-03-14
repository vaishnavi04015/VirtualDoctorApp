import { useLocation, useNavigate } from "react-router-dom";
import PdfModal from "./PdfModal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const DoctorDetails = () => {
    const nav = useNavigate();
    const location = useLocation();
    const { name, email, phone, experience, degree, expertise, gender, photo, license, address } = location.state.details;

    const Accept = () => {
        axios.patch("https://virtualdoctorapp-backend.onrender.com/docVerfication", { email })
            .then((res) => {
                toast.success(res.data, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            })
            .catch((e) => console.log(e))
        nav("/docrequests");
    }

    const Decline = () => {
        axios.delete(`https://virtualdoctorapp-backend.onrender.com/docDelete/${email}`)
            .then((res) => {
                toast.success(res.data, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            })
            .catch((e) => console.log(e))
        nav("/docrequests");
    }

    return (
        <div className="w-[50%] mx-auto mt-8 h-[70vh]">
            <h1 className="text-4xl font-bold text-center mb-4">Details</h1>
            <div className="relative flex justify-center">
                <img src={`./public/Doctordetails/${photo}`} className="absolute right-0 top-5 border-solid w-52 h-52" alt={name} />
            </div>
            <table className="w-[60%] mb-8 h-[60vh]">
                <tbody>
                    <tr className=" my-6 text-xl">
                        <td className="font-semibold">Name:</td>
                        <td>{name}</td>
                    </tr>
                    <tr className=" my-6 text-xl">
                        <td className="font-semibold">Gender:</td>
                        <td>{gender}</td>
                    </tr>
                    <tr className=" my-6 text-xl">
                        <td className="font-semibold">Expertise:</td>
                        <td>{expertise}</td>
                    </tr>
                    <tr className=" my-6 text-xl">
                        <td className="font-semibold">Experience:</td>
                        <td>{experience}</td>
                    </tr>
                    <tr className=" my-6 text-xl">
                        <td className="font-semibold">Phone:</td>
                        <td>{phone}</td>
                    </tr>
                    <tr className=" my-6 text-xl">
                        <td className="font-semibold">Email:</td>
                        <td>{email}</td>
                    </tr>
                    <tr className=" my-6 text-xl">
                        <td className="font-semibold">Address:</td>
                        <td>{address}</td>
                    </tr>
                    <tr className=" my-6 text-xl">
                        <td>
                            <PdfModal name="View Degree" fileName={degree} />
                        </td>
                        <td>
                            <PdfModal name="View License" fileName={license} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-start ml-24 space-x-4">
                <button className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold" onClick={Accept}>Accept</button>
                <button className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold" onClick={Decline}>Decline</button>
            </div>
        </div>
    );
}

export default DoctorDetails;
