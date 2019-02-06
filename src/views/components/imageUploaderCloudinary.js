import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import ActionDelete from '@material-ui/icons/Delete';
import ReactCloudinaryUploader from '@app-masters/react-cloudinary-uploader';

import { Rollbar, AppBootstrap } from '@app-masters/js-lib';
import Typography from '@material-ui/core/Typography/Typography';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';

class ImageUploaderCloudinary extends Component {
    constructor (props) {
        super(props);
        this.openSelectImageDialog = this.openSelectImageDialog.bind(this);
    }

    openSelectImageDialog () {
        let config = AppBootstrap.getConfig().cloudinary;

        let options = {
            cloud_name: config.cloudName,
            upload_preset: this.props.preset ? config.uploadPreset[this.props.preset].name : config.uploadPreset,
            multiple: this.props.multiple,
            returnJustUrl: true,
            buttonCaption: 'Carregar foto',
            cropping: 'server',
            croppingShowBackButton: false,
            croppingDefaultSelectionRatio: 0.9,
            croppingAspectRatio: this.props.preset ? (config.uploadPreset[this.props.preset].width / config.uploadPreset[this.props.preset].height) : 1
        };

        ReactCloudinaryUploader.open(options).then(images => {
            if (options.multiple) {
                let actualImages = this.props.value || [];
                actualImages = actualImages.concat(images);
                this.props.onChange(actualImages);
            } else {
                if (this.props.preset) {
                    const transform = 'w_' + config.uploadPreset[this.props.preset].width;
                    images = images.replace('/upload', '/upload/' + transform);
                }
                this.props.onChange(images);
            }
        }).catch(err => {
            if (err && err.message && err.message !== 'User closed widget') {
                Rollbar.log(err);
                window.alert('Houve um erro inesperado e os programadores responsáveis já foram avisados. \n\n Detalhes técnicos: ' + err.message);
            }
        });
    }

    render () {
        let presetObj = null;
        if (this.props.preset) {
            presetObj = AppBootstrap.getConfig().cloudinary.uploadPreset[this.props.preset];
        }
        let images = null;
        if (this.props.value && this.props.value.constructor.name === 'Array') {
            images = this.renderMultiple(this.props.value);
        } else if (this.props.value) {
            images = this.renderImage(this.props.value);
        }

        return (
            <div>
                <div>
                    <InputLabel shrink>{this.props.title}</InputLabel>
                    {presetObj &&
                    <Typography variant='caption' color='textSecondary'>
                        {`${presetObj.width}px por ${presetObj.height}px`}
                    </Typography>}
                </div>
                {images}
                <div>
                    <Button
                        color='primary'
                        onClick={this.openSelectImageDialog}
                    >
                        {(!this.props.value || this.props.value.length === 0) ? 'Adicionar Imagem' : 'Alterar Imagem'}
                    </Button>
                </div>
                {!this.props.error && <FormHelperText error>{this.props.helperText}</FormHelperText>}
            </div>
        );
    }

    renderMultiple (images) {
        // console.log("renderMultiple", images);
        return (<div>
            <div style={{
                display: 'flex',
                flexFlow: 'wrap row',
                justifyContent: images.length >= 3 ? 'space-around' : 'start',
                alignContent: 'flex-start',
                width: '100%',
                paddingTop: '10px',
                boxSizing: 'border-box'
                // borderStyle: 'solid',
                // borderWidth: 1,
                // borderColor: '#e10bda'
            }}>
                {images.map((image, index) => {
                    return this.renderImage(image, index);
                })}
            </div>
        </div>
        );
    }

    renderImage (image, index) {
        // return (<div>{image}</div>);
        if (index === undefined) {
            index = Math.ceil(Math.random() * 1000);
            // d
        }
        return (
            <div
                key={index}
                style={{
                    // flexDirection: 'column',
                    // justifyContent: 'center',
                    width: 160,
                    marginBottom: 20,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#d2d2d2'
                }}>
                <div style={{ height: 160, overflow: 'hidden' }}>
                    <img style={{ objectFit: 'cover', width: '100%', height: 160 }} src={image} />
                </div>
                <div style={{ display: 'flex', flexFlow: 'wrap column', alignItems: 'flex-end', padding: 5 }}>
                    <ActionDelete
                        style={{ flex: 1, height: 30 }}
                        color={'gray'}
                        onClick={() => {
                            //    this.props.onChange(null);
                            this.deleteImage(image);
                        }}
                    />
                </div>
            </div>
        );
    }

    deleteImage (image) {
        // console.log("delete", image);
        let files = this.props.value;
        if (files.constructor === String) {
            files = '';
        } else {
            let i = files.indexOf(image);
            // console.log("i", i);
            files.splice(i, 1);
            // console.log(files.length);
            // console.log(this.props.value.length);
        }
        this.props.onChange(files);
    }
}

export default ImageUploaderCloudinary;
