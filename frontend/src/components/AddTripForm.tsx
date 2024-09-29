import React,{useState,useEffect} from "react";
import {useCollection} from "@squidcloud/react";
import "./AddTripForm.css";
import {Trip} from "../type";

function AddTrip(){
    const [ country ,setCountry]=useState("");
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");
    const [countries, setCountries]=useState([]);
    const tripCollection=useCollection<Trip>("trip");
    
    useEffect(()=>{
        fetch(" https://restcountries.com/v3.1/all").then((response)=> {
            if(response.ok) return response.json();
        }).then((data)=>{
             const countryNames=data.map((country: any)=>country.name.common)
             setCountries(countryNames)
        }).catch((error)=> console.error(error))
    
    },[]);
    const addtrip=()=>{
        const tripId= crypto.randomUUID();
        tripCollection.doc(tripId).insert({
             id: tripId,
             country,
             startDate: new Date(startDate),
             endDate: new Date(endDate),
             notes: []

        })
    }

    return <div className="trip-container">
        <h1>Add Trip</h1>
        <div className="trip-form">
            <select value={country} onChange={(e)=> setCountry(e.target.value)} >
                <option value="" disabled >
                    Select Country
                </option>
                {countries.map((country:any)=>(
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            <input type="date" value={startDate} onChange={(e)=> setStartDate(e.target.value)}/>
            <input type="date" value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
            <button onClick={addtrip}>Add Trip</button>
        </div>
    </div>
}

export default AddTrip;
