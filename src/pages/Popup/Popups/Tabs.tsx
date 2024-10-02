import React, { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { CSSProperties } from 'react';


// interface to predefine type of props
interface TabsProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
    tabBtnState: boolean;

}

const Tabs: React.FC<TabsProps> = (props) => {
    // Destructuring Props
    const { setActiveComponent, tabBtnState } = props

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
    const chkBoxDiv: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "5px",
        fontSize: "20px",
        fontWeight: "600"
    }
    const chkBox: CSSProperties = {
        transform: "scale(1.7)",
        marginRight: "10px"
    }
    const inpField: CSSProperties = {
        height: "25px",
        border: "none",
        borderRadius: "5px",
        padding: "0 5px"
    }
    const applyBtn: CSSProperties = {
        backgroundColor: "pink",
        // color: "white",
        padding: "7px 15px",
        border: "none",
        borderRadius: "5px"
    }



    // State for radio button to store the selected value
    const [selectedOption, setSelectedOption] = useState('');

    // Handle change when a radio button is selected
    const handleOptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedOption(e.target.value);
    };

    // function to send message to background.js
    const sendMessage = (message: string, tabName: string) => {
        chrome.runtime.sendMessage({ action: message, tabName: tabName })
    }

    // Fnction called when save button is clicked
    const tabPrivacy = () => {
        if (tabBtnState) {
            // Get the input element and assert its type
            const inputElement = document.getElementById("tabName") as HTMLInputElement | null;

            // Check if the element exists
            if (inputElement) {
                const tabName: string = inputElement.value; // Get the value as a string
                console.log(tabName);
                if (selectedOption == "blur all") {
                    sendMessage("apply Privacy to all", tabName)
                } else if (selectedOption == "selective blur") {
                    sendMessage("apply Privacy to selective", tabName)
                }
            } else {
                console.error("Element with id 'tabName' not found.");
            }

        }
    }







    return (
        <>
            <div style={mainDiv}>
                <div style={header}>
                    <button
                        onClick={() => {
                            setActiveComponent(null)
                        }}
                        style={btnStyle}><KeyboardArrowLeftIcon /></button>
                    <h1>Tabs</h1>
                </div>
                <div style={body}>
                    <div style={chkBoxDiv}>
                        <input style={inpField} type="text" id='tabName' placeholder='Enter Tab Name' />
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
                    <button onClick={tabPrivacy} style={applyBtn}>Apply Now</button>
                </div>
            </div>
        </>
    )
}

export default Tabs