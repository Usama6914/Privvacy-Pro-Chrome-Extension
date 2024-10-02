import React from "react"
import SettingPopup from './SettingPopup'


export function privacyLayer() {
    const privacy = document.createElement("div")
    privacy.id = "privacy"
    privacy.style.position = "fixed"
    privacy.style.zIndex = "9999"
    privacy.style.width = "100%"
    privacy.style.height = "100%"
    privacy.style.top = "0"
    privacy.style.backgroundColor = "rgba(0,0,0,0.5)"
    privacy.style.backdropFilter = "blur(10px)"
    document.body.appendChild(privacy)
}

export function removePrivacyLayer() {
    const privacyDiv = document.querySelectorAll("#privacy")
    if (privacyDiv.length > 0) {
        privacyDiv.forEach(div => {
            div.remove()
        })
    }
}