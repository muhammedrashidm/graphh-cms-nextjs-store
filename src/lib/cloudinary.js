import { Cloudinary } from '@cloudinary/url-gen';


const cld = new Cloudinary({
    cloud: {
        cloudName: 'ddtsczlr0',
    }
});

export function buildImageUrl(image) {

    return cld.image(image).quality('auto').format('auto')
        
}