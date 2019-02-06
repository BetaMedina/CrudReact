// Same file in MOBILE/ADMIN project - Must keep equal!!!!
const envs = {};

const rollbarToken = '1478efc61b024a6faf179fa272c47aab';

let messages = {
    // feedback: {
    //     to: "ttgt@ccc.om",
    //     subject: "Feedback de uso",
    //     saveToDb: false
    // }
}

envs.development = {
    baseUrl: 'http://localhost:3000/api',
    rollbarToken,
    uploadCareToken: '',
    // cloudinary: {
    //     cloudName: 'appmasters-io',
    //     uploadPreset: ''
    // }
};

envs.development_firebase = {
    baseUrl: '',
    rollbarToken,
    uploadCareToken: ''
};

envs.production = {
    baseUrl: 'https://olinkdeprodvaiaqui.com/api',
    rollbarToken,
    uploadCareToken: '',
    cloudinary: {
        // cloudName: '',
        // uploadPreset: ''
    }
};

envs.staging = {
    baseUrl: '',
    rollbarToken,
    uploadCareToken: '',
    cloudinary: {
        // cloudName: '',
        // uploadPreset: ''
    }
};

export default envs;
