import React from 'react'
import { CSSProperties } from 'react';


// Interface to predefne the type of props
interface SettingPopupProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
}

const SettingPopup: React.FC<SettingPopupProps> = (props) => {
    // Destrcturing Props
    const { setActiveComponent } = props

    // All CSS styling of this page
    const settingStyle: CSSProperties = {
        position: "absolute",
        top: "30px",
        right: "40px",
        zIndex: "100",
        width: "70px",
        borderRadius: "15px",
        padding: "10px 20px",
        border: "none",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "white",
    }
    const settingBtn: CSSProperties = {
        padding: "5px 0",
        width: "70px",
        backgroundColor: "pink",
        color: "white",
        fontWeight: "bold",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }

    return (
        <>
            <div style={settingStyle}>
                <h2 style={{ margin: "0" }}>Settings</h2>
                <button
                    onClick={() => {
                        setActiveComponent('tab')
                    }}
                    style={settingBtn}>Tabs</button>
                <button
                    onClick={() => {
                        setActiveComponent('site')
                    }}
                    style={settingBtn}>Website</button>
                <button
                    onClick={() => {
                        setActiveComponent('url')
                    }}
                    style={settingBtn}>Urls</button>
            </div>

        </>
    )
}

export default SettingPopup