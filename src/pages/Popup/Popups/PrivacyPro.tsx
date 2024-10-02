import React, { useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Man from '../../../assets/img/man.png';
import { CSSProperties } from 'react';
// @ts-ignore
import SettingPopup from './SettingPopup';




interface PrivacyProProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
    setTabBtnState: React.Dispatch<React.SetStateAction<boolean>>;
    tabBtnState: boolean;
    setSiteBtnState: React.Dispatch<React.SetStateAction<boolean>>;
    siteBtnState: boolean;
}


const PrivacyPro: React.FC<PrivacyProProps> = (props) => {

    // All Styling of this Page
    const mainDiv: CSSProperties = {
        width: "200px",
        backgroundColor: "skyblue",
        padding: "20px 20px",
    };
    const header: CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        textAlign: "center",
    };
    const btnStyle: CSSProperties = {
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        position: "absolute",
        right: "0",
    };
    const body: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
    };
    const privacyBtnDiv: CSSProperties = {
        display: "flex",
        border: "2px solid",
        width: "100px",
        height: "30px",
    };
    const para: CSSProperties = {
        backgroundColor: "pink",
        color: "white",
        width: "60%",
        margin: "0px",
        fontSize: "15px",
        textAlign: "center",
        padding: "5px 0",
        fontWeight: "bold",
    };
    const btn: CSSProperties = {
        backgroundColor: "green",
        color: "white",
        width: "40%",
    };


    // Destructuring Props
    const { setActiveComponent, tabBtnState, setTabBtnState, siteBtnState, setSiteBtnState } = props;

    // Setting Button State to open and close settings
    const [settingBtnState, setSettingBtnState] = useState(false);
    // Function to update setting Button State 
    const handleSettingClick = () => {
        setSettingBtnState(prevState => !prevState);
    }

    // Function to save the state in chrome.storage.session
    const saveState = (key: string, value: boolean) => {
        chrome.storage.local.set({ [key]: value }, () => {
        });
    };
    // Load the states from chrome.storage.session when the component mounts
    useEffect(() => {
        chrome.storage.local.get(['tabBtnState', 'siteBtnState'], (result) => {
            if (result.tabBtnState !== undefined) {
                setTabBtnState(result.tabBtnState);
            }
            if (result.siteBtnState !== undefined) {
                setSiteBtnState(result.siteBtnState);
            }
        });
    }, []);

    // Handle Tab button click
    const handleTabClick = () => {
        const newTabBtnState = !tabBtnState;
        setTabBtnState(newTabBtnState);
        saveState('tabBtnState', newTabBtnState); // Save the new state in session
    };

    // Handle Site button click
    const handleSiteClick = () => {
        const newSiteBtnState = !siteBtnState;
        setSiteBtnState(newSiteBtnState);
        saveState('siteBtnState', newSiteBtnState); // Save the new state in session
        if (newSiteBtnState == false) {
            chrome.runtime.sendMessage({ action: "removePrivacy" }, () => {
                console.log("removing message sent");
            })
        }
    };

    return (
        <>
            <div style={mainDiv}>
                <div style={header}>
                    <h1 style={{ margin: "0", width: "100%" }}>Privacy Pro</h1>
                    <button
                        onClick={handleSettingClick}
                        style={btnStyle}
                    >
                        <SettingsIcon style={{ fontSize: "30px" }} />
                    </button>
                </div>
                {settingBtnState && <SettingPopup setActiveComponent={setActiveComponent} />}
                <div style={body}>
                    <Avatar
                        alt="Avatar Img"
                        src={Man}
                        sx={{ width: 80, height: 80 }}
                    />

                    <div style={privacyBtnDiv}>
                        <p style={para}>Tabs</p>
                        <button
                            onClick={handleTabClick}
                            style={btn}
                        >
                            {tabBtnState ? "ON" : "OFF"}
                        </button>
                    </div>

                    <div style={privacyBtnDiv}>
                        <p style={para}>Sites</p>
                        <button
                            onClick={handleSiteClick}
                            style={btn}
                        >
                            {siteBtnState ? "ON" : "OFF"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPro;
