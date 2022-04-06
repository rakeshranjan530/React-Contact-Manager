import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddContact = () => {
    const [error, setError] = useState(null)
    const [volatile, setVolatile] = useState({
        name: '',
        photo: '',
        number: '',
        whatsapp: '',
        group: ''
    })

    const handleChange = (e) => {
        const { name, value,checked } = e.target;
        setError(null)
        setVolatile((state) => ({
            ...state,
            [name]: checked ? (value === 'true') : value
        }))
        
    }

    const handleClick = (e) => {
        e.preventDefault();
        const { name, photo, number, whatsapp, group } = volatile || '';
        if (name === '' || photo === '' || number === '' || whatsapp === '' || group === '') {
            setError("Please enter all details");
            return;
        }
        let localData = localStorage.getItem("data");
        localData = JSON.parse(localData) || [];
        let arr = [...localData];

        const data = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            photo,
            number,
            whatsapp,
            group
        }
        arr.push(data);
        setVolatile((state) => ({
            ...state,
            name: '',
            number: '',
            photo: '',
            whatsapp:'',
            group: ''
        }))
        try {
            localStorage.setItem("data", JSON.stringify(arr));
        } catch (error) {
            console.log("Getting error in local Storage")
        }
    }
    return (
        <>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success">Create contact</p>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-md-4">
                            <form>
                                <div className="mb-2">
                                    <input onChange={handleChange} value={volatile?.name} name="name" className="form-control" placeholder="Name" type="text" />
                                </div>
                                <div className="mb-2">
                                    <input onChange={handleChange} value={volatile?.photo} name="photo" className="form-control" placeholder="Photo url" type="text" />
                                </div>
                                <div className="mb-2">
                                    <input onChange={handleChange} value={volatile?.number} name="number" className="form-control" placeholder="Mobile" type="number" />
                                </div>
                                <div className="mb-2">
                                    <select className="form-control" value={volatile?.group} onChange={handleChange} name="group">
                                        <option value="">Select a group</option>
                                        <option value="Family">Family</option>
                                        <option value="Friend">Friends</option>
                                        <option value="Office">Office</option>
                                        <option value="home">Home</option>
                                    </select>
                                </div>
                                <div className="mb-2 d-flex align-items-baseline">
                                    <input type="radio" name="whatsapp" value={true} onChange={handleChange} />
                                    <label className="ms-1">Yes</label>
                                    <input className="ms-2" type="radio" name="whatsapp" value={false} onChange={handleChange} />
                                    <label className="ms-1">No</label>
                                    <p className="h5 ms-5"> Whatsapp</p>
                                </div>
                                {error && (<p className="text-danger">{error}</p>)}
                                <div className="mb-2">
                                    <input className="btn btn-success" onClick={(e) => handleClick(e)} value="Create" type="submit" />
                                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AddContact;