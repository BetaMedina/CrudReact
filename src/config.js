// Same file in MOBILE/ADMIN project - Must keep equal!!!!
const envs = {};

const rollbarToken = 'NONE';

// let messages = {
// feedback: {
//     to: 'ttgt@ccc.om',
//     subject: 'Feedback de uso',
//     saveToDb: false
// }
// };

envs.development = {
    baseUrl: 'https://php.appmasters.io/republica/dev/api/public/api',
    // baseUrl: 'http://localhost/events-manager/api/public/api',
    rollbarToken,
    uploadCareToken: '',
    cloudinary: {
        cloudName: 'NONE',
        uploadPreset: 'NONE'
    }
};

envs.development_firebase = {
    baseUrl: '',
    rollbarToken,
    uploadCareToken: ''
};

envs.production = {
    baseUrl: 'https://nonstop.appmasters.io/api.staging/public/api',
    rollbarToken,
    uploadCareToken: '',
    cloudinary: {
        cloudName: 'NONE',
        uploadPreset: 'NONE'
    }
};

envs.staging = {
    baseUrl: 'https://php.appmasters.io/republica/staging/api/public/api',
    rollbarToken,
    uploadCareToken: '',
    cloudinary: {
        cloudName: 'NONE',
        uploadPreset: 'NONE'
    }
};

export default envs;
