# putepamanywhere

## Dev Notes

After Analysis, we have separated the POC in 3 main steps:

1. Upload picture
2. Select a location
3. Picture (must have an EPAM logo watermark)

## TODO

WIP

### Step 1: Upload picture

Backend  requirements

1. User should be able to upload a picture
    - Validations: 
       - allow only common `image/*` formats
       - max size
    - create endpoints:
      - POST /pictures    < where the user image will be uploaded 
      - GET  /pictures    > list all images
      - GET  /pictures:id > fetch single image
   
Frontend requirements:

1. User should be able to upload a picture
