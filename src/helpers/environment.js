let APIURL = '',

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = "http://localhost:3000";
        break;
        case "dynamic-client.herokuapp.com":
            APIURL = "https://dynamic-client.herokuapp.com"
}

export default APIURL;