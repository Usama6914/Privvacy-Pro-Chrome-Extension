import React, { useState } from 'react';
import PrivacyPro from './Popups/PrivacyPro';
import Urls from './Popups/Urls';
import Sites from './Popups/Sites';
import Tabs from './Popups/Tabs'


function Popup() {
	const [activeComponent, setActiveComponent] = useState<string | null>(null);
	const [tabBtnState, setTabBtnState] = useState(false)
	const [siteBtnState, setSiteBtnState] = useState(false);


	const renderActiveComponent = () => {
		switch (activeComponent) {
			case 'tab':
				return <Tabs
					setActiveComponent={setActiveComponent}
					tabBtnState={tabBtnState}
				/>;
			case 'site':
				return <Sites
					setActiveComponent={setActiveComponent}
					siteBtnState={siteBtnState}
				/>;
			case 'url':
				return <Urls setActiveComponent={setActiveComponent} />;
			default:
				return <PrivacyPro
					setActiveComponent={setActiveComponent}
					tabBtnState={tabBtnState}
					setTabBtnState={setTabBtnState}
					siteBtnState={siteBtnState}
					setSiteBtnState={setSiteBtnState}
				/>;
		}
	};



	return <>
		{renderActiveComponent()}
	</>;
}

export default Popup;
