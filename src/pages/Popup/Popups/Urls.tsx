import React from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { CSSProperties } from 'react';


// Interface to predefine type of props
interface UrlsProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
}



const Urls: React.FC<UrlsProps> = (props) => {
    // Destrcturing the props
    const { setActiveComponent } = props
    // All styling of this page
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

    // Function which is called when save button is clicked
    const handleClick = () => {
        // Getting url from user
        const urlInput = document.getElementById("saveUrl") as HTMLInputElement;
        const url = urlInput.value;
        // Getting urls saved is storage
        chrome.storage.local.get(['urls'], (result) => {
            const urls = result.urls || []
            console.log(urls);
            urls.push(url)
            // updating urls and saving in storage
            chrome.storage.local.set({ urls: urls }, () => {
                console.log("url saved");
                console.log(urls);
            })
        })
    }




    return (
        <>
            <div style={mainDiv}>
                <div style={header}>
                    <button
                        onClick={() => {
                            setActiveComponent(null)
                        }}
                        style={btnStyle}><KeyboardArrowLeftIcon />
                    </button>
                    <h1>Urls</h1>
                </div>
                <div style={body}>
                    <input type="text" id="saveUrl" />
                    <button
                        onClick={handleClick}
                        style={saveBtn}>Save
                    </button>
                    <button
                        onClick={() => {
                            chrome.storage.local.clear()
                        }}
                        style={saveBtn}>Clear Storage
                    </button>
                </div>
            </div>
        </>
    )
}

export default Urls
