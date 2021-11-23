let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'https://redhawk-server.herokuapp.com/';
        break;
    
    case 'redhawk-client.herokuapp.com':
        APIURL = 'https://redhawk-server.herokuapp.com/';
        break;
    
    default:
        APIURL = 'https://redhawk-server.herokuapp.com/';
}

export default APIURL;