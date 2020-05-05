import * as helpers from '%{ cb "/js/helpers.js" }%';

import Main from '%{ cb "/js/main.js" }%';
import ProgressDialog from '%{ cb "/js/progress_dialog.js" }%';
import Snackbar from '%{ cb "/js/snackbar.js" }%';
import Messaging from '%{ cb "/js/messaging.js" }%';
import Theme from '%{ cb "/js/theme.js" }%';

const hrefURL = new URL(window.location.href);

window.Globals = {
	serverRequest: new Request("https://diplicity-engine.appspot.com/", {
		headers: {
			"X-Diplicity-API-Level": "8",
			Accept: "application/json",
			"X-Diplicity-Client-Name": "dipact@" + hrefURL.host
		},
		mode: "cors"
	}),
	user: { Properties: {} },
	userStats: { Properties: { TrueSkill: {} } },
	userConfig: { Properties: { FCMTokens: [], MailConfig: {}, Colors: [] } },
	token: null,
	progressCount: 0,
	progressDialog: null,
	snackbar: null,
	variants: [],
	memoizeCache: {},
	messaging: Messaging,
	contrastColors: (_ => {
		let m = dippyMap($("body"));
		return m.contrasts;
	})(),
	colorOverrides: {
		nationCodes: {},
		variantCodes: {},
		positions: [],
		variants: {},
		nations: {}
	},
	backListeners: [],
	bans: {},
	loginURL: null
};

ReactDOM.render(<ProgressDialog />, document.getElementById("progress"));
ReactDOM.render(<Snackbar />, document.getElementById("snackbar"));
ReactDOM.render(
	<MaterialUI.ThemeProvider theme={Theme}>
		<Main />
	</MaterialUI.ThemeProvider>,
	document.getElementById("app")
);

window.addEventListener("popstate", ev => {
	if (window.Globals.backListeners.length > 0) {
		const listener = window.Globals.backListeners.shift();
		listener();
	} else {
		window.location.reload();
	}
});
