// Same file in MOBILE/ADMIN project - Must keep equal!!!!
const envs = {};

const rollbarToken = 'NONE';

envs.development = {
    baseUrl: 'https://php.appmasters.io/republica/dev/api/public/api',
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
    baseUrl: 'https://php.appmasters.io/republica/dev/api/public/api',
    rollbarToken,
    uploadCareToken: '',
    cloudinary: {
        cloudName: 'NONE',
        uploadPreset: 'NONE'
    }
};

envs.staging = {
    baseUrl: 'https://php.appmasters.io/republica/dev/api/public/api',
    rollbarToken,
    uploadCareToken: '',
    cloudinary: {
        cloudName: 'NONE',
        uploadPreset: 'NONE'
    }
};

export default envs;
