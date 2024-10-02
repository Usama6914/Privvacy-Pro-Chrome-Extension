import React, { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { CSSProperties } from 'react';



// Interface to predefine type of props
interface SitesProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
    siteBtnState: boolean;
}


const Sites: React.FC<SitesProps> = (props) => {
    // destructuring props
    const { setActiveComponent, siteBtnState } = props

    // All Styling of this page
    const mainDiv: CSSProperties = {
        width: "200px",
        backgroundColor: "skyblue",
        padding: "10px 20px 20px"
    }
    const header: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
        // textAlign: "center"
    }
    const btnStyle: CSSProperties = {
        border: "1px solid",
        borderRadius: "50%",
        backgroundColor: "transparent",
        cursor: "pointer",
        position: "absolute",
        left: "10px",
        padding: "3px",
        display: "flex"
    }
    const body: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
    }
    const saveBtn: CSSProperties = {
        backgroundColor: "pink",
        // color: "white",
        padding: "7px 15px",
        border: "none",
        borderRadius: "5px"
    }
    const chkBoxDiv: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "10px",
        fontSize: "20px",
        fontWeight: "600"
    }
    const chkBox: CSSProperties = {
        transform: "scale(1.7)",
        marginRight: "10px"
    }


    // Funcntion to send Message to Background.js
    const sendMessage = (message: string) => {
        chrome.runtime.sendMessage({ action: message })
    }

    // fuuncton which is called when save button is clicked
    const sitePrivacy = () => {
        if (siteBtnState) {
            if (selectedOption == "blur all") {
                sendMessage("apply Privacy to all sites")
            } else if (selectedOption == "selective blur") {
                sendMessage("apply Privacy to selective sites")
            }
        }
    }


    // State for radio buttons to store the selected value
    const [selectedOption, setSelectedOption] = useState('');

    // Handle change when a radio button is selected
    const handleOptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedOption(e.target.value);
    };


    return (
        <>
            <div style={mainDiv}>
                <div style={header}>
                    <button
                        onClick={() => {
                            setActiveComponent(null)
                        }}
                        style={btnStyle}><KeyboardArrowLeftIcon /></button>
                    <h1>Sites</h1>
                </div>
                <div style={body}>
                    <div style={chkBoxDiv}>
                        <div><input style={chkBox}
                            type="radio"
                            id="blurAll"
                            value="blur all"
                            name='operation'
                            onChange={handleOptionChange}
                        />
                            <label htmlFor="blurAll">Blur All</label>
                        </div>
                        <div><input style={chkBox}
                            type="radio"
                            id="selectiveBlur"
                            value="selective blur"
                            name='operation'
                            onChange={handleOptionChange}
                        />
                            <label htmlFor="selectiveBlur">Selective Blur</label>
                        </div>
                    </div>
                    <button
                        onClick={sitePrivacy}
                        style={saveBtn}>Save</button>
                </div>
            </div>
        </>
    )
}

export default Sites